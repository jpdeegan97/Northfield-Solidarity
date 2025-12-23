 import os
import json
import asyncio
import random
from motor.motor_asyncio import AsyncIOMotorClient
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from sqlalchemy.ext.asyncio import create_async_engine

from core.events import parse_envelope
from components.pg_idempotency import try_mark_processed, KafkaMeta

BOOTSTRAP = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "ggp-kafka:9092")
CONSUMER_GROUP = os.getenv("KAFKA_CONSUMER_GROUP", "ggp-projection-v1")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://ggp-mongo:27017")
MONGO_DB = os.getenv("MONGO_DB", "ggp")
POSTGRES_DSN = os.getenv("POSTGRES_DSN")  # required
DLQ_TOPIC = os.getenv("DLQ_TOPIC", "ggp.core.dlq.projection")

TOPICS = [
    "ggp.core.sop.created",
    "ggp.core.sop.version_published",
    # add more as you expand slices
]

MAX_RETRIES = int(os.getenv("MAX_RETRIES", "5"))

def is_transient(exc: Exception) -> bool:
    msg = str(exc).lower()
    return any(k in msg for k in ["timeout", "temporar", "connection", "network", "reset", "unavailable"])

async def backoff_sleep(attempt: int) -> None:
    base = 0.5 * (2 ** attempt)
    jitter = random.random() * 0.2 * base
    await asyncio.sleep(base + jitter)

async def publish_dlq(producer: AIOKafkaProducer, dlq_topic: str, *, original: dict, meta: KafkaMeta, err: Exception, retry_count: int):
    dlq_msg = {
        "failed_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "consumer_group": CONSUMER_GROUP,
        "source_topic": meta.topic,
        "partition": meta.partition,
        "offset": meta.offset,
        "retry_count": retry_count,
        "error_type": type(err).__name__,
        "error_message": str(err)[:2000],
        "event": original,
    }
    await producer.send_and_wait(dlq_topic, json.dumps(dlq_msg).encode("utf-8"))

async def project_event(db, env):
    et = env.event_type
    p = env.payload

    if et == "ggp.core.sop.created":
        sop_id = p["sop_id"]
        doc = {
            "_id": sop_id,
            "sop_id": sop_id,
            "title": p["title"],
            "status": p.get("status", "draft"),
            "tags": p.get("tags", []),
            "current_version": 0,
            "created_at": env.occurred_at,
            "updated_at": env.occurred_at,
        }
        await db["rm_sop_index"].update_one({"_id": sop_id}, {"$set": doc}, upsert=True)
        # optional rm_audit_trail
        await db["rm_audit_trail"].update_one(
            {"_id": str(env.event_id)},
            {"$set": {
                "_id": str(env.event_id),
                "event_id": str(env.event_id),
                "event_type": env.event_type,
                "occurred_at": env.occurred_at,
                "actor": {"type": env.actor.type, "id": env.actor.id, "display": env.actor.display},
                "correlation_id": str(env.correlation_id),
                "entity_refs": {"sop_id": sop_id},
                "summary": f"SOP created: {p['title']}",
                "severity": "info",
            }},
            upsert=True
        )

    elif et == "ggp.core.sop.version_published":
        sop_id = p["sop_id"]
        version = int(p["version"])
        _id = f"{sop_id}:{version}"

        # rm_sop_versions
        await db["rm_sop_versions"].update_one(
            {"_id": _id},
            {"$set": {
                "_id": _id,
                "sop_id": sop_id,
                "version": version,
                "content_hash": p["content_hash"],
                "content": p.get("content"),
                "content_ref": p.get("content_ref"),
                "published_at": env.occurred_at,
                "published_by": env.actor.id,
            }},
            upsert=True
        )

        # rm_sop_index
        await db["rm_sop_index"].update_one(
            {"_id": sop_id},
            {"$set": {
                "status": "published",
                "current_version": version,
                "updated_at": env.occurred_at,
            }},
            upsert=True
        )

        # optional rm_audit_trail
        await db["rm_audit_trail"].update_one(
            {"_id": str(env.event_id)},
            {"$set": {
                "_id": str(env.event_id),
                "event_id": str(env.event_id),
                "event_type": env.event_type,
                "occurred_at": env.occurred_at,
                "actor": {"type": env.actor.type, "id": env.actor.id, "display": env.actor.display},
                "correlation_id": str(env.correlation_id),
                "entity_refs": {"sop_id": sop_id},
                "summary": f"SOP published v{version}",
                "severity": "info",
            }},
            upsert=True
        )
    else:
        # Unknown event type: treat as invariant failure (DLQ)
        raise ValueError(f"Unhandled event_type for projector: {et}")

async def main():
    if not POSTGRES_DSN:
        raise RuntimeError("POSTGRES_DSN is required")

    pg = create_async_engine(POSTGRES_DSN, pool_pre_ping=True)
    mongo = AsyncIOMotorClient(MONGO_URI)
    mdb = mongo[MONGO_DB]

    consumer = AIOKafkaConsumer(
        *TOPICS,
        bootstrap_servers=BOOTSTRAP,
        group_id=CONSUMER_GROUP,
        enable_auto_commit=False,
        value_deserializer=lambda b: json.loads(b.decode("utf-8")),
        auto_offset_reset="earliest",
    )
    producer = AIOKafkaProducer(
        bootstrap_servers=BOOTSTRAP,
        value_serializer=lambda o: json.dumps(o).encode("utf-8"),
    )

    await consumer.start()
    await producer.start()
    try:
        async for msg in consumer:
            meta = KafkaMeta(topic=msg.topic, partition=msg.partition, offset=msg.offset)
            raw = msg.value

            # Phase 1: validate envelope
            try:
                env = parse_envelope(raw)
            except Exception as e:
                # envelope invalid => DLQ and commit
                await publish_dlq(producer, DLQ_TOPIC, original=raw, meta=meta, err=e, retry_count=0)
                await consumer.commit()
                continue

            # Phase 2: idempotency gate (durable)
            inserted = await try_mark_processed(pg, CONSUMER_GROUP, env.event_id, env.event_type, meta)
            if not inserted:
                # already processed => skip and commit
                await consumer.commit()
                continue

            # Phase 3: apply projection with retries for transient failures
            attempt = 0
            while True:
                try:
                    await project_event(mdb, env)
                    await consumer.commit()
                    break
                except Exception as e:
                    if is_transient(e) and attempt < MAX_RETRIES:
                        await backoff_sleep(attempt)
                        attempt += 1
                        continue

                    # Non-transient or out of retries => DLQ; commit only after DLQ success
                    await publish_dlq(producer, DLQ_TOPIC, original=raw, meta=meta, err=e, retry_count=attempt)
                    await consumer.commit()
                    break
    finally:
        await consumer.stop()
        await producer.stop()
        await pg.dispose()
        mongo.close()

if __name__ == "__main__":
    asyncio.run(main())