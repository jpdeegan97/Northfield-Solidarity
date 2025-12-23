from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Dict, Optional
from uuid import UUID

@dataclass(frozen=True)
class Actor:
    type: str
    id: str
    display: Optional[str] = None

@dataclass(frozen=True)
class EventEnvelope:
    event_id: UUID
    event_type: str
    occurred_at: datetime
    producer: str
    correlation_id: UUID
    causation_id: Optional[UUID]
    actor: Actor
    tenant_id: Optional[str]
    schema_version: int
    payload: Dict[str, Any]

REQUIRED_TOP_LEVEL = {
    "event_id", "event_type", "occurred_at", "producer",
    "correlation_id", "schema_version", "payload", "actor"
}

def parse_envelope(obj: Dict[str, Any]) -> EventEnvelope:
    missing = REQUIRED_TOP_LEVEL - set(obj.keys())
    if missing:
        raise ValueError(f"Missing envelope fields: {sorted(missing)}")

    actor = obj["actor"]
    if not isinstance(actor, dict) or "type" not in actor or "id" not in actor:
        raise ValueError("Invalid actor shape")

    # parse (accept ISO8601 Z; keep it simple)
    occurred_at = datetime.fromisoformat(obj["occurred_at"].replace("Z", "+00:00"))

    return EventEnvelope(
        event_id=UUID(obj["event_id"]),
        event_type=str(obj["event_type"]),
        occurred_at=occurred_at,
        producer=str(obj["producer"]),
        correlation_id=UUID(obj["correlation_id"]),
        causation_id=UUID(obj["causation_id"]) if obj.get("causation_id") else None,
        actor=Actor(type=str(actor["type"]), id=str(actor["id"]), display=actor.get("display")),
        tenant_id=obj.get("tenant_id"),
        schema_version=int(obj["schema_version"]),
        payload=obj["payload"],
    )