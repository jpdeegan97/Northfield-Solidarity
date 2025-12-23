import os
import json
import asyncio
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

from core.events import parse_envelope
from components.pg_idempotency import try_mark_processed, KafkaMeta

BOOTSTRAP = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "ggp-kafka:9092")
CONSUMER_GROUP = os.getenv("KAFKA_CONSUMER_GROUP", "ggp-audit-v1")
POSTGRES_DSN = os.getenv("POSTGRES_DSN")
DLQ_TOPIC = os.getenv("DLQ_TOPIC", "ggp.core.dlq.audit")

# Start explicit and expand later; you can also subscribe by regex with aiokafka patterns.
TOPICS = [
    "ggp.core.sop.created",
    "ggp.core.sop.version_published",
]

async def dlq(producer: AIOKafkaProducer, meta: KafkaMeta, raw: dict, err: Exception):
    msg = {
        "failed_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "consumer_group": CONSUMER_GROUP,
        "source_topic": meta.topic,
        "partition": meta.partition,
        "offset": meta.offset,
        "error_type": type(err).__name__,
        "error_message": str(err)[:2000],
        "event": raw,
    }
    await producer.send_and_wait(DLQ_TOPIC, json.dumps(msg).encode("utf-8"))

async def insert_audit(pg, env, meta: KafkaMeta):
    sql = text("""
      INSERT INTO audit_event (
        event_id, event_type, occurred_at,
        producer, correlation_id, causation_id,
        actor_type, actor_id, actor_display,
        tenant_id, schema_version, payload,
        kafka_topic, kafka_partition, kafka_offset
      ) VALUES (
        :event_id, :event_type, :occurred_at,
        :producer, :correlation_id, :causation_id,
        :actor_type, :actor_id, :actor_display,
        :tenant_id, :schema_version, :payload,
        :kafka_topic, :kafka_partition, :kafka_offset
      )
      ON CONFLICT (event_id) DO NOTHING
    """)
    async with pg.begin() as conn:
        await conn.execute(sql, {
            "event_id": str(env.event_id),
            "event_type": env.event_type,
            "occurred_at": env.occurred_at,
            "producer": env.producer,
            "correlation_id": str(env.correlation_id),
            "causation_id": str(env.causation_id) if env.causation_id else None,
            "actor_type": env.actor.type,
            "actor_id": env.actor.id,
            "actor_display": env.actor.display,
            "tenant_id": env.tenant_id,
            "schema_version": env.schema_version,
            "payload": json.dumps(env.payload),
            "kafka_topic": meta.topic,
            "kafka_partition": meta.partition,
            "kafka_offset": meta.offset,
        })

async def main():
    if not POSTGRES_DSN:
        raise RuntimeError("POSTGRES_DSN is required")

    pg = create_async_engine(POSTGRES_DSN, pool_pre_ping=True)

    consumer = AIOKafkaConsumer(
        *TOPICS,
        bootstrap_servers=BOOTSTRAP,
        group_id=CONSUMER_GROUP,
        enable_auto_commit=False,
        value_deserializer=lambda b: json.loads(b.decode("utf-8")),
        auto_offset_reset="earliest",
    )
    producer = AIOKafkaProducer(bootstrap_servers=BOOTSTRAP)

    await consumer.start()
    await producer.start()
    try:
        async for msg in consumer:
            meta = KafkaMeta(topic=msg.topic, partition=msg.partition, offset=msg.offset)
            raw = msg.value

            try:
                env = parse_envelope(raw)
            except Exception as e:
                await dlq(producer, meta, raw, e)
                await consumer.commit()
                continue

            # idempotency ledger (audit should also be idempotent)
            inserted = await try_mark_processed(pg, CONSUMER_GROUP, env.event_id, env.event_type, meta)
            if not inserted:
                await consumer.commit()
                continue

            try:
                await insert_audit(pg, env, meta)
                await consumer.commit()
            except Exception as e:
                # audit is critical; DLQ then commit only after DLQ succeeds
                await dlq(producer, meta, raw, e)
                await consumer.commit()

    finally:
        await consumer.stop()
        await producer.stop()
        await pg.dispose()

if __name__ == "__main__":
    asyncio.run(main())