# NS-PG-002 — Reference Architectures

This document defines the canonical Postgres deployment shapes NS-PG supports, when to use each, and the non-negotiable properties each must provide.

## 1. Architecture goals

Any NS-PG reference architecture must deliver:

*   **Deterministic recovery:** documented restore paths and measurable RTO/RPO.
*   **Controlled failure modes:** avoid split-brain; clear write leader.
*   **Operational clarity:** simple day-2 operations; observable health signals.
*   **Security by default:** least privilege access, encrypted transport, auditable actions.

## 2. The canonical shapes

### A) Single-Instance (Restore-First) — “S1”

**Use when:** Tier 2/3 workloads, early prod, low blast radius, cost sensitivity.

#### Topology

*   1 primary Postgres instance (single writer)
*   Backups + WAL archiving (PITR)
*   Optional read replica for reporting (non-critical)

#### Guarantees

*   Availability relies on restore/provisioning, not instant failover.
*   Continuity is achieved via fast restore + tested runbooks.

#### Non-negotiables

*   PITR enabled (base backup + WAL archive)
*   At least one isolated/immutable backup copy
*   Restore test cadence enforced
*   Connection pooling in front of DB (or strict `max_connections` discipline)

#### Common failure modes

*   Disk full / WAL explosion
*   Lock storms due to long transactions
*   Autovacuum lag causing bloat and latency

### B) HA Multi-AZ Primary + Standby (S2) — “HA-2AZ/3AZ”

**Use when:** Tier 0/1 services where downtime must be minimized.

#### Topology

*   1 primary (writer)
*   1+ synchronous or semi-synchronous standbys in separate AZs
*   HA orchestrator (or managed service failover)
*   VIP/DNS endpoint abstraction for clients

#### Guarantees

Automated failover possible, but only if:

*   Leader election is correct
*   Fencing/split-brain controls exist
*   Application can retry safely

#### Replication modes (intentional choice)

*   **Synchronous:** stronger durability, higher latency under AZ issues
*   **Asynchronous:** lower latency, accepts potential data loss within RPO

#### Non-negotiables

*   Explicit failover policy and criteria (what triggers failover)
*   Split-brain prevention (fencing + single writer guarantee)
*   Replication monitoring and alerting (lag, slot health)
*   Regular failover drills + evidence
*   PITR still required (replication is not backup)

### C) Read-Scale Cluster (S3) — “Writer + Read Pool”

**Use when:** Read-heavy workloads need horizontal scaling.

#### Topology

*   1 primary writer
*   Multiple read replicas
*   Read routing layer (app-level, proxy, or service mesh routing)

#### Guarantees

Read-after-write consistency depends on design:

*   replica lag awareness
*   session pinning to primary
*   monotonic reads patterns

#### Non-negotiables

*   Clear routing rules (what queries can hit replicas)
*   Replica lag SLOs and alerting
*   Safety rails to prevent “writes on replicas”

### D) Multi-Region (S4) — “Region Resilience”

**Use when:** Tier 0 global availability requirements justify complexity.

**Important stance:** Postgres multi-region is a spectrum; “active-active writes” is not a default assumption.

#### Topology options

*   **Active-Passive (recommended):** primary region + warm standby region
*   **Pilot-Light:** minimal standby + rapid scale-up during disaster
*   **Dual-Write / Sharded:** only if the product architecture is explicitly built for it

#### Guarantees

*   Clear RPO and DNS cutover strategy
*   Cross-region failover tested and rehearsed

#### Non-negotiables

*   Region-level PITR strategy (WAL archive available cross-region)
*   DNS/traffic management runbook
*   Customer comms templates for region events
*   Quarterly regional DR drill (minimum)

## 3. Components common to all shapes

### 3.1 Backups + PITR

*   Base backups + WAL archive = minimum.
*   At least one immutable/isolated copy.
*   Restore testing is mandatory.

### 3.2 Connection strategy

*   Pooling is the default (especially for microservices).
*   Limit application concurrency; enforce statement/idle timeouts.

### 3.3 Observability

Must surface:

*   WAL rate, checkpoint frequency, disk growth
*   Replication lag (if applicable)
*   Autovacuum health, bloat trend
*   Lock waits and long transactions
*   Top query fingerprints and p95/p99 latency

### 3.4 Security

*   TLS in transit
*   Strong auth (SCRAM) if not provider-managed
*   Least privilege roles and separation of duties
*   Auditable admin access

## 4. Selecting the right architecture (decision rubric)

Choose the simplest shape that meets:

*   **RTO:** how long can we be down?
*   **RPO:** how much data loss is acceptable?
*   **Write criticality:** can we accept a paused write plane?
*   **Cost tolerance:** HA and multi-region cost real money.
*   **Operational maturity:** complexity requires experienced operations.

**Rule of thumb:**

*   Tier 3 → S1
*   Tier 2 → S1 or S2-lite
*   Tier 1 → S2
*   Tier 0 → S2 + S4 (if justified)

## 5. Evidence requirements by architecture

### S1

*   Monthly restore test for Tier 1/0, quarterly for Tier 2, semiannual for Tier 3
*   Backup success + retention verification

### S2/S3

*   Above + failover drill evidence
*   Replica lag monitoring and incident notes

### S4

*   Above + region cutover drill evidence
*   DNS/traffic runbook signoff

## 6. What comes next

Next docs should lock the two biggest risk reducers:

*   NS-PG-003 — Backups, PITR, and Restore Testing
*   NS-PG-004 — Connections & Pooling (and safe timeouts)
