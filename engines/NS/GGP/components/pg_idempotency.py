from __future__ import annotations
from dataclasses import dataclass
from typing import Optional
from uuid import UUID

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

@dataclass(frozen=True)
class KafkaMeta:
    topic: Optional[str] = None
    partition: Optional[int] = None
    offset: Optional[int] = None

async def try_mark_processed(
    engine: AsyncEngine,
    consumer_group: str,
    event_id: UUID,
    event_type: str,
    meta: KafkaMeta,
) -> bool:
    """
    Returns True if inserted (new event for this consumer group),
    False if already processed.
    """
    sql = text("""
        INSERT INTO consumer_processed_event
          (consumer_group, event_id, event_type, kafka_topic, kafka_partition, kafka_offset)
        VALUES
          (:cg, :eid, :etype, :topic, :part, :offs)
        ON CONFLICT (consumer_group, event_id) DO NOTHING
    """)
    async with engine.begin() as conn:
        res = await conn.execute(sql, {
            "cg": consumer_group,
            "eid": str(event_id),
            "etype": event_type,
            "topic": meta.topic,
            "part": meta.partition,
            "offs": meta.offset,
        })
        # rowcount is 1 if inserted, 0 if conflict (for many DBs/drivers)
        return (res.rowcount or 0) == 1