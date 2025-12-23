# core/topics.py
# Canonical Kafka topic + consumer group registry for GGP.
# Per the GGP Data Contracts & Persistence Canonical Spec:
# - event_type MUST equal the topic name.
# - domains must not invent topic strings outside this module.

from __future__ import annotations


# -------------------------
# Topic naming conventions
# -------------------------
# Domain events: ggp.<bounded_context>.<entity>.<event>
# Commands:      ggp.<bounded_context>.command.<command_name>
# DLQ:           ggp.<bounded_context>.dlq.<consumer_or_topic>
#
# Slice #1 currently uses: ggp.core.*


# -------------------------
# Slice #1 (SOP) Topics
# -------------------------
CORE_SOP_CREATED: str = "ggp.core.sop.created"
CORE_SOP_VERSION_PUBLISHED: str = "ggp.core.sop.version_published"
CORE_SOP_RETIRED: str = "ggp.core.sop.retired"  # reserved for later

# Dead Letter Queues
CORE_DLQ_PROJECTION: str = "ggp.core.dlq.projection"
CORE_DLQ_AUDIT: str = "ggp.core.dlq.audit"


# -------------------------
# Consumer groups
# -------------------------
CG_PROJECTION_V1: str = "ggp-projection-v1"
CG_AUDIT_V1: str = "ggp-audit-v1"


# -------------------------
# Convenience collections
# -------------------------
SLICE1_TOPICS: tuple[str, ...] = (
    CORE_SOP_CREATED,
    CORE_SOP_VERSION_PUBLISHED,
    CORE_SOP_RETIRED,
)

DLQ_TOPICS: tuple[str, ...] = (
    CORE_DLQ_PROJECTION,
    CORE_DLQ_AUDIT,
)

ALL_KNOWN_TOPICS: tuple[str, ...] = SLICE1_TOPICS + DLQ_TOPICS