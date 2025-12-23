# components/kafka_admin.py
"""
Kafka admin utilities for GGP.

Goals:
- Create topics deterministically from core/topics.py
- Safe defaults for dev/stage; production can disable auto-creation
- Idempotent: creating an existing topic is a no-op
- Support per-topic config overrides (retention, cleanup policy, etc.)

Usage (one-shot):
  python -m components.kafka_admin

Env:
  KAFKA_BOOTSTRAP_SERVERS=ggp-kafka:9092
  KAFKA_ADMIN_ENABLE=true|false        (default: false)
  KAFKA_TOPIC_PARTITIONS=3             (default: 3)
  KAFKA_TOPIC_REPLICATION=1            (default: 1)

Default topic config (applies unless overridden per topic):
  KAFKA_TOPIC_RETENTION_MS=604800000   (default: 7d)
  KAFKA_TOPIC_CLEANUP_POLICY=delete    (default: delete)

Recommended overrides (baked in below):
- version_published retained longer (30d)
- DLQs retained longest (90d)
"""

from __future__ import annotations

import asyncio
import os
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional

from aiokafka.admin import AIOKafkaAdminClient, NewTopic

from core import topics as core_topics


def _env_bool(name: str, default: str = "false") -> bool:
    return os.getenv(name, default).strip().lower() in {"1", "true", "yes", "y", "on"}


def _env_int(name: str, default: str) -> int:
    return int(os.getenv(name, default))


def _env_str(name: str, default: str) -> str:
    return os.getenv(name, default)


@dataclass(frozen=True)
class TopicSpec:
    name: str
    partitions: int
    replication_factor: int
    config: Dict[str, str]


# -------------------------
# Default configs
# -------------------------

def default_topic_config() -> Dict[str, str]:
    """
    Conservative defaults. Adjust per-topic via overrides.
    """
    retention_ms = str(_env_int("KAFKA_TOPIC_RETENTION_MS", "604800000"))  # 7 days
    cleanup_policy = _env_str("KAFKA_TOPIC_CLEANUP_POLICY", "delete")      # delete by default
    return {
        "retention.ms": retention_ms,
        "cleanup.policy": cleanup_policy,
    }


# -------------------------
# Per-topic overrides
# -------------------------

# Helpful constants (ms)
MS_7D = "604800000"
MS_30D = "2592000000"
MS_90D = "7776000000"

def per_topic_overrides() -> Dict[str, Dict[str, str]]:
    """
    Per-topic config overrides.

    Notes:
    - DLQ topics should persist long enough for operator review.
    - 'version_published' gets longer retention to support rebuild windows.
    - All are 'delete' cleanup policy for now.
      (We can introduce compacted topics later for derived state stores.)
    """
    return {
        core_topics.CORE_SOP_CREATED: {
            "retention.ms": MS_7D,
            "cleanup.policy": "delete",
        },
        core_topics.CORE_SOP_VERSION_PUBLISHED: {
            "retention.ms": MS_30D,
            "cleanup.policy": "delete",
        },
        core_topics.CORE_SOP_RETIRED: {
            "retention.ms": MS_30D,
            "cleanup.policy": "delete",
        },
        core_topics.CORE_DLQ_PROJECTION: {
            "retention.ms": MS_90D,
            "cleanup.policy": "delete",
        },
        core_topics.CORE_DLQ_AUDIT: {
            "retention.ms": MS_90D,
            "cleanup.policy": "delete",
        },
    }


def merged_topic_config(topic: str, base: Dict[str, str], overrides: Dict[str, Dict[str, str]]) -> Dict[str, str]:
    cfg = dict(base)
    if topic in overrides:
        cfg.update(overrides[topic])
    return cfg


def build_topic_specs(
    topic_names: Iterable[str],
    *,
    partitions: int,
    replication_factor: int,
    base_config: Optional[Dict[str, str]] = None,
    overrides: Optional[Dict[str, Dict[str, str]]] = None,
) -> List[TopicSpec]:
    base = base_config or default_topic_config()
    ov = overrides or per_topic_overrides()
    specs: List[TopicSpec] = []
    for t in topic_names:
        specs.append(
            TopicSpec(
                name=t,
                partitions=partitions,
                replication_factor=replication_factor,
                config=merged_topic_config(t, base, ov),
            )
        )
    return specs


async def ensure_topics(
    *,
    bootstrap_servers: str,
    specs: List[TopicSpec],
) -> None:
    admin = AIOKafkaAdminClient(bootstrap_servers=bootstrap_servers)
    await admin.start()
    try:
        existing = await admin.list_topics()

        to_create: List[NewTopic] = []
        for s in specs:
            if s.name in existing:
                continue
            to_create.append(
                NewTopic(
                    name=s.name,
                    num_partitions=s.partitions,
                    replication_factor=s.replication_factor,
                    topic_configs=s.config,
                )
            )

        if not to_create:
            print("[kafka_admin] All topics already exist; nothing to do.")
            return

        await admin.create_topics(to_create)
        print(f"[kafka_admin] Created topics: {', '.join([t.name for t in to_create])}")

    finally:
        await admin.close()


async def main() -> None:
    if not _env_bool("KAFKA_ADMIN_ENABLE", "false"):
        print("[kafka_admin] KAFKA_ADMIN_ENABLE is false; skipping topic creation.")
        return

    bootstrap = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "ggp-kafka:9092")

    partitions = _env_int("KAFKA_TOPIC_PARTITIONS", "3")
    replication = _env_int("KAFKA_TOPIC_REPLICATION", "1")

    topic_names = list(core_topics.ALL_KNOWN_TOPICS)

    specs = build_topic_specs(
        topic_names,
        partitions=partitions,
        replication_factor=replication,
    )

    print(f"[kafka_admin] Ensuring {len(specs)} topics on {bootstrap} ...")
    for s in specs:
        print(f"  - {s.name}: partitions={s.partitions}, repl={s.replication_factor}, config={s.config}")

    await ensure_topics(bootstrap_servers=bootstrap, specs=specs)


if __name__ == "__main__":
    asyncio.run(main())