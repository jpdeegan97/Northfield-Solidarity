# NS-PG-010 — Observability Pack (LUM Integration)

## 0. Purpose

This document defines the PostgreSQL observability requirements for NS-PG and how they should be implemented inside NS-LUM (your observability platform).

**Goal:** every alert should route cleanly into a known playbook (see NS-PG-009) and every Tier 0/1 database should be continuously measurable against readiness standards.

## 1. Core stance

*   Observability is not “dashboards.” It is:
    *   **signals → detection → diagnosis → action → evidence**
*   NS-PG observability is implemented via LUM.
*   A metric without a threshold and an owner is just trivia.

## 2. LUM integration model

### 2.1 Signal sources

*   Postgres metrics (core health + workload)
*   System/host metrics (CPU, memory, disk, network)
*   Logs (Postgres logs + pooler logs)
*   Traces (application request spans correlated to DB queries)
*   Events (deploys, migrations, failovers, maintenance actions)

### 2.2 Correlation keys (required)

Every signal emitted to LUM should include:

*   `env` (dev/stage/prod)
*   `service` (owning service)
*   `db_cluster` (logical cluster name)
*   `db_instance` (node identifier)
*   `tier` (0–3)
*   `region` / `az`
*   `release_id` (for correlation to deploys)

## 3. The “Golden Dashboards” (required)

LUM must provide the following canonical dashboards per DB cluster.

### 3.1 DB Health Overview (1 screen)

**Purpose:** “Is the DB okay?”

**Required panels:**
*   Connection count vs budget (plus pool queue depth if applicable)
*   TPS (commit/rollback) + error rate
*   Query latency distributions (p50/p95/p99)
*   CPU, memory, disk used %, disk IO latency
*   WAL generation rate + checkpoint frequency
*   Replication lag (if replicas)
*   Autovacuum activity + dead tuples trend

### 3.2 Workload & Top Queries

**Purpose:** “What is slow and why?”

**Required panels:**
*   Top query fingerprints by total time
*   Top query fingerprints by p95/p99 latency
*   Top queries by rows returned / temp usage (if available)
*   Lock waits and blocked sessions trend
*   Slow query count (by threshold)

### 3.3 Replication & HA (if applicable)

**Purpose:** “Will failover work right now?”

**Required panels:**
*   Replica lag over time
*   Replica IO saturation indicators
*   Slot/backlog indicators (if used)
*   Failover events timeline
*   Read routing health (if you do read pools)

### 3.4 Backup/PITR Readiness

**Purpose:** “Are we recoverable?”

**Required panels:**
*   Backup job success/failure (last run + trend)
*   Restore test status (last pass, last fail)
*   WAL archive freshness (time since last archive)
*   Archive backlog size/lag
*   Retention nearing expiration warnings

### 3.5 Vacuum/Bloat (Day-2)

**Purpose:** “Are we drifting toward pain?”

**Required panels:**
*   Dead tuples for top N tables
*   Vacuum/analyze recency
*   Longest transaction age
*   Idle-in-transaction sessions
*   Table and index growth rates (top N)

## 4. Alerting policy (required)

### 4.1 Alert design rules

*   Alerts must be actionable and point to a playbook.
*   Alerts must be tier-aware (Tier 0/1 paging; Tier 2/3 may be ticket-only).
*   Prefer symptom + cause alerts (e.g., “pool saturated + DB connections at cap”).

### 4.2 Mandatory paging alerts (Tier 0/1)

Each must include a link to the relevant NS-PG-009 playbook.

**Availability / saturation**
*   Pool queue depth sustained above threshold (pool exhaustion)
*   DB connections at/near cap (connection storm)

**Locks**
*   Blocked sessions sustained above threshold (lock storm)
*   Idle-in-transaction sessions above threshold

**Storage / WAL**
*   Disk usage above high watermark
*   WAL growth abnormal / checkpoint pressure abnormal (if measurable)

**Replication**
*   Replica lag above SLO threshold
*   Replica disconnected / not streaming

**Backup/PITR**
*   Backup failure (last run)
*   WAL archive stalled / archive freshness breach

**Vacuum health**
*   Autovacuum starvation on top tables (vacuum/analyze too old)
*   XID age near critical watermark (wraparound risk)

**Security**
*   Auth failure anomalies / unexpected privileged actions (where available)

### 4.3 Ticket-only alerts (baseline)

*   Trend-based bloat growth
*   Slow query budget drift
*   Index growth anomalies
*   Replica lag warning (below paging threshold)

## 5. SLOs and error budgets (recommended)

NS-PG recommends defining SLOs for Tier 0/1 clusters:

### 5.1 Availability SLO
*   DB endpoint availability (or successful transaction rate)

### 5.2 Latency SLO
*   p95 transaction latency for critical query set (NS-PG-006)

### 5.3 Recoverability SLO
*   Backup freshness SLO
*   Restore test pass recency SLO
*   WAL archive freshness SLO

### 5.4 Replication SLO (if applicable)
*   Replica lag p95 within threshold

**LUM should compute and display:**
*   Current SLO status
*   Burn rate
*   Error budget remaining

## 6. Logging requirements

### 6.1 What we must be able to answer from logs
*   Why did latency spike?
*   Which queries were slow?
*   Who connected/failed auth?
*   What changed during a migration?

### 6.2 Required log streams into LUM
*   Postgres server logs
*   Pooler logs (if used)
*   Migration runner logs
*   Backup/restore job logs

### 6.3 Log-to-playbook mapping
*   Lock waits / deadlocks → Lock Storm playbook
*   Statement timeout kills → Bad Query / Regression playbook
*   WAL/archive errors → PITR At Risk playbook

## 7. Tracing requirements (app ↔ DB)

LUM should support correlation between:
*   a request trace
*   the DB queries invoked
*   the pool acquisition wait time

Minimum recommended fields:
*   query fingerprint (not full SQL if sensitive)
*   duration
*   rows (if available)
*   error code/class
*   pool wait time

## 8. Event timelines (change correlation)

LUM must ingest “events” so charts explain themselves:
*   Deploy start/finish
*   Migration start/finish
*   Failover events
*   Backup/restore operations
*   Maintenance actions (reindex, vacuum)

This is critical for fast diagnosis.

## 9. Playbook routing (LUM → NS-PG-009)

Every paging alert must include:
*   A single primary playbook link
*   Secondary references (related playbooks)
*   The “first three checks” embedded in the alert description

**Examples:**
*   Pool queue depth high → Connection Pool Exhaustion
*   Blocked sessions high → Lock Storm
*   WAL archive stalled → Backup/PITR At Risk

## 10. Evidence requirements (Tier 0/1)

LUM must be able to produce an evidence bundle including:
*   Last 30–90 days of key health metrics (availability/latency/lag)
*   Backup success + WAL archive freshness history
*   Restore test pass/fail history
*   Access/audit logging coverage proof (from NS-PG-007 stance)
*   Incident timelines + linked playbooks + postmortem references

## 11. Rollout checklist (how to implement in LUM)

1.  Create DB cluster inventory in LUM (tags: env/service/db_cluster/tier)
2.  Enable baseline dashboards (sections 3.1–3.5)
3.  Enable Tier-aware alert routing (page vs ticket)
4.  Attach playbook links (NS-PG-009) to every alert
5.  Add event timeline ingestion (deploy/migrate/failover)
6.  Validate with a tabletop: simulate 3 alert types and confirm route-to-action works

## 12. Next document

Next we can formalize “reference implementation patterns” (managed PG vs self-managed, pooler placement, metric exporters, etc.) as:

*   NS-PG-011 — Implementation Patterns (Managed vs Self-Managed)
