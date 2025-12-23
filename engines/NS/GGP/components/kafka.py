from __future__ import annotations

import json
import os
import socket
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, Optional
from uuid import UUID, uuid4

from aiokafka import AIOKafkaConsumer, AIOKafkaProducer


# ---------------------------
# Settings
# ---------------------------

def _env(name: str, default: Optional[str] = None) -> str:
    v = os.getenv(name, default)
    if v is None:
        raise RuntimeError(f"Missing required env var: {name}")
    return v


KAFKA_BOOTSTRAP_SERVERS = _env("KAFKA_BOOTSTRAP_SERVERS", "ggp-kafka:9092")
DEFAULT_PRODUCER_ID = os.getenv("PRODUCER_ID") or f"{socket.gethostname()}@dev"
DEFAULT_SCHEMA_VERSION = int(os.getenv("EVENT_SCHEMA_VERSION", "1"))

DEFAULT_VALUE_ENCODING = "utf-8"


# ---------------------------
# Contract types
# ---------------------------

@dataclass(frozen=True)
class Actor:
    type: str   # "user" | "service"
    id: str
    display: Optional[str] = None


@dataclass(frozen=True)
class EventEnvelope:
    event_id: str
    event_type: str
    occurred_at: str
    producer: str
    correlation_id: str
    causation_id: Optional[str]
    actor: Dict[str, Any]
    tenant_id: Optional[str]
    schema_version: int
    payload: Dict[str, Any]


# ---------------------------
# Helpers
# ---------------------------

def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def build_envelope(
    *,
    event_type: str,
    payload: Dict[str, Any],
    actor: Actor,
    producer: str = DEFAULT_PRODUCER_ID,
    correlation_id: Optional[UUID] = None,
    causation_id: Optional[UUID] = None,
    tenant_id: Optional[str] = None,
    schema_version: int = DEFAULT_SCHEMA_VERSION,
    event_id: Optional[UUID] = None,
    occurred_at: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Builds the canonical GGP Kafka event envelope.
    - event_type should equal the topic name (per your canonical spec).
    - correlation_id should be threaded through request->events.
    """
    eid = event_id or uuid4()
    cid = correlation_id or uuid4()

    env = EventEnvelope(
        event_id=str(eid),
        event_type=event_type,
        occurred_at=occurred_at or utc_now_iso(),
        producer=producer,
        correlation_id=str(cid),
        causation_id=str(causation_id) if causation_id else None,
        actor=asdict(actor),
        tenant_id=tenant_id,
        schema_version=int(schema_version),
        payload=payload,
    )
    return asdict(env)


def json_dumps(obj: Any) -> bytes:
    return json.dumps(obj, separators=(",", ":"), ensure_ascii=False).encode(DEFAULT_VALUE_ENCODING)


def make_message_key(*, correlation_id: Optional[str] = None, entity_id: Optional[str] = None) -> bytes:
    """
    Kafka keying strategy:
    - Prefer entity_id (e.g., sop_id) for ordering by entity
    - Otherwise correlation_id for ordering per request thread
    """
    if entity_id:
        return entity_id.encode(DEFAULT_VALUE_ENCODING)
    if correlation_id:
        return correlation_id.encode(DEFAULT_VALUE_ENCODING)
    return b""


# ---------------------------
# Producer wrapper
# ---------------------------

class KafkaProducer:
    def __init__(
        self,
        *,
        bootstrap_servers: str = KAFKA_BOOTSTRAP_SERVERS,
        producer_id: str = DEFAULT_PRODUCER_ID,
    ):
        self.bootstrap_servers = bootstrap_servers
        self.producer_id = producer_id
        self._producer: Optional[AIOKafkaProducer] = None

    async def start(self) -> None:
        if self._producer:
            return
        self._producer = AIOKafkaProducer(
            bootstrap_servers=self.bootstrap_servers,
            value_serializer=lambda o: json_dumps(o),
        )
        await self._producer.start()

    async def stop(self) -> None:
        if self._producer:
            await self._producer.stop()
            self._producer = None

    async def emit(
        self,
        *,
        topic: str,
        payload: Dict[str, Any],
        actor: Actor,
        correlation_id: Optional[UUID] = None,
        causation_id: Optional[UUID] = None,
        tenant_id: Optional[str] = None,
        schema_version: int = DEFAULT_SCHEMA_VERSION,
        key_entity_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Publish a single event using canonical envelope.
        Returns the envelope (useful for logging/tests).
        """
        if not self._producer:
            raise RuntimeError("KafkaProducer not started")

        envelope = build_envelope(
            event_type=topic,          # per spec: event_type equals topic
            payload=payload,
            actor=actor,
            producer=self.producer_id,
            correlation_id=correlation_id,
            causation_id=causation_id,
            tenant_id=tenant_id,
            schema_version=schema_version,
        )

        key = make_message_key(
            correlation_id=envelope.get("correlation_id"),
            entity_id=key_entity_id,
        )

        # send_and_wait ensures publish succeeded before returning
        await self._producer.send_and_wait(topic, envelope, key=key)
        return envelope

    async def emit_dlq(
        self,
        *,
        dlq_topic: str,
        original_event: Dict[str, Any],
        source_topic: str,
        partition: int,
        offset: int,
        consumer_group: str,
        error_type: str,
        error_message: str,
        retry_count: int = 0,
    ) -> None:
        """
        Standard DLQ payload (matches your projection contract).
        """
        if not self._producer:
            raise RuntimeError("KafkaProducer not started")

        dlq_payload = {
            "failed_at": utc_now_iso(),
            "consumer_group": consumer_group,
            "source_topic": source_topic,
            "partition": partition,
            "offset": offset,
            "retry_count": retry_count,
            "error_type": error_type,
            "error_message": error_message[:2000],
            "event": original_event,
        }
        await self._producer.send_and_wait(dlq_topic, json_dumps(dlq_payload), key=make_message_key(entity_id=source_topic))


# ---------------------------
# Consumer factory
# ---------------------------

def make_consumer(
    *,
    topics: Iterable[str],
    group_id: str,
    bootstrap_servers: str = KAFKA_BOOTSTRAP_SERVERS,
    auto_offset_reset: str = "earliest",
    enable_auto_commit: bool = False,
) -> AIOKafkaConsumer:
    """
    Standard consumer config for GGP services:
    - manual commits (enable_auto_commit=False)
    - earliest reset (safe for rebuilds)
    - JSON dict deserialization
    """
    return AIOKafkaConsumer(
        *list(topics),
        bootstrap_servers=bootstrap_servers,
        group_id=group_id,
        enable_auto_commit=enable_auto_commit,
        auto_offset_reset=auto_offset_reset,
        value_deserializer=lambda b: json.loads(b.decode(DEFAULT_VALUE_ENCODING)),
    )