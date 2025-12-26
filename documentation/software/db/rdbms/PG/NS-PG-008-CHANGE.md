# NS-PG-008 — Upgrades, Migrations, and Change Safety

Upgrades and schema changes are where “healthy databases” go to die. NS-PG treats change as an engineered process with rehearsals, gates, and rollback paths.

This document defines how Northfield Solidarity executes:

*   PostgreSQL minor/major upgrades
*   Extension and dependency compatibility
*   Schema migrations (DDL/DML) safely at scale
*   Rollback and incident containment for bad changes

## 1. Core stance

*   Every change has a rollback story (or an explicit “no-rollback” decision with mitigation).
*   Rehearse before you ship. Production is not the test environment.
*   Prefer additive changes. Destructive changes come last.
*   Minimize locks. DDL that blocks traffic is treated as a production incident waiting to happen.
*   Version governance is real. Postgres version + extensions + client drivers are managed like product dependencies (NS-AEGIS alignment).

## 2. Change taxonomy (what kind of change is this?)

### 2.1 Postgres upgrades

*   **Patch/minor (stability/security):** usually low-risk but still requires validation.
*   **Major version (behavior changes):** higher risk; requires full rehearsal and compatibility checks.

### 2.2 Schema changes

*   **Additive DDL:** add table/column/index (generally safest)
*   **Behavioral DDL:** constraints, defaults, type changes (risk depends)
*   **Destructive DDL:** drop/rename/replace (highest risk)

### 2.3 Data migrations

*   Backfills, re-writes, data corrections, re-partitioning

### 2.4 Dependency changes

*   Extensions (version coupling)
*   Client drivers/ORM upgrades
*   Connection pool settings changes

## 3. The NS-PG “safe change” workflow

### Step 0 — Classify and tier it

*   Identify database tier (0–3) and blast radius.
*   Choose the change strategy accordingly.

### Step 1 — Pre-flight checks (required)

*   Backup health confirmed (NS-PG-003)
*   Restore readiness confirmed for Tier 0/1
*   Vacuum health acceptable (NS-PG-005)
*   Connection/timeouts in place (NS-PG-004)
*   Load/traffic envelope known (typical + peak)

### Step 2 — Rehearse in production-like stage

*   Snapshot production-like data shape (size + skew + indexes)
*   Run change with the same tools and permissions
*   Measure:
    *   lock time
    *   runtime
    *   IO/WAL growth
    *   replica lag impact

### Step 3 — Execute with gates

*   Hard timeouts for DDL sessions (statement + lock)
*   Observability dashboard open (locks, lag, IO, latency)
*   Abort criteria written down

### Step 4 — Validate

*   App smoke tests
*   Critical query set checks (NS-PG-006)
*   Replication health checks

### Step 5 — Evidence + post-change review

*   Store logs, timings, and outcomes
*   Update runbooks if anything surprised you

## 4. Major upgrade strategies (choose intentionally)

There is no single “best” approach. Choose based on tier, size, uptime needs.

### 4.1 In-place upgrade (fast, higher blast radius)

**Concept:** upgrade the same cluster.

**Use when:**
*   Small-to-medium DB
*   Maintenance window acceptable

**Requirements:**
*   Verified PITR + restore plan
*   Clear rollback plan (often restore to pre-upgrade snapshot)

### 4.2 Blue/Green (recommended for Tier 0/1)

**Concept:** bring up a parallel cluster and cut over.

**Benefits:**
*   Safer rollback (switch back)
*   Reduced downtime

**Requirements:**
*   Data sync strategy (replication or controlled cutover)
*   Cutover runbook + DNS/endpoint plan
*   Connection pool behavior tested (thundering herd control)

### 4.3 Logical replication upgrade (low downtime, more complexity)

**Concept:** replicate data into the new cluster, then cut over.

**Use when:**
*   Need minimal downtime
*   Can tolerate replication complexity

**Requirements:**
*   Publication/subscription plan
*   Cutover choreography
*   Drift detection (row counts/invariants)

### 4.4 Managed service “version upgrade”

**If using managed Postgres:**
*   Treat provider upgrade mechanism as an implementation detail.
*   Still require rehearsal, rollback plan, and evidence.

## 5. Extension and dependency governance (NS-AEGIS alignment)

Extensions can block upgrades.

NS-PG requires:
*   An approved extension list per environment
*   Extension version pinning and compatibility tracking
*   A pre-upgrade “compatibility matrix” check:
    *   Postgres version
    *   extension versions
    *   client driver/ORM versions

**Rule:** If an extension cannot be upgraded safely, that is a tier/architecture decision (or a reason to remove the extension).

## 6. Schema migration safety patterns

### 6.1 The golden rule: expand → migrate → contract

1.  **Expand (additive):** add new columns/tables/indexes
2.  **Migrate:** backfill / dual-write / dual-read
3.  **Contract (destructive):** drop old paths once verified

### 6.2 Lock-aware DDL stance

Avoid operations that take strong locks during peak.

**Rules:**
*   Add indexes using online-safe patterns where possible.
*   Prefer small, incremental changes over massive rewrites.
*   Always set:
    *   `lock_timeout`
    *   `statement_timeout`

### 6.3 Backfills and large data moves

Backfills must be designed as controlled workloads:
*   chunked processing
*   bounded concurrency
*   rate-limited
*   observable progress

**Never run a huge backfill as a single transaction.**

## 7. Performance regression gates (required for Tier 0/1)

Before shipping schema changes or major upgrades:

*   Run the critical query set and compare against baseline (NS-PG-006)
*   Validate vacuum and bloat trajectory did not worsen (NS-PG-005)

## 8. Cutover choreography (how not to melt the DB)

Cutovers often fail because of connection storms.

NS-PG cutover requirements:
*   Pool and client reconnect jitter
*   Circuit breakers / gradual ramp-up
*   Drain old connections gracefully
*   Validate:
    *   write leader correctness
    *   replica lag
    *   error rates

## 9. Rollback and “bad change” containment

### 9.1 Rollback options

*   **Traffic rollback:** revert application to previous version
*   **Schema compatibility rollback:** keep old schema paths alive (expand/contract)
*   **Cluster rollback:** switch back (blue/green)
*   **Data rollback:** PITR restore to pre-change marker (NS-PG-003)

### 9.2 Explicit “no-rollback” changes

Some changes can’t be rolled back easily. If so:
*   declare it explicitly
*   define mitigation (blue/green, PITR marker, maintenance window, extra evidence)

## 10. Runbooks (must exist)

Minimum runbooks per Tier 0/1 DB:

*   Major upgrade runbook (chosen strategy)
*   Cutover runbook (client/pool behavior included)
*   Emergency rollback runbook (traffic + schema + cluster)
*   Migration lock-storm response
*   Post-upgrade validation checklist

## 11. Evidence requirements (Tier 0/1)

Maintain:

*   Rehearsal results (timings, locks, IO/WAL growth, lag)
*   Compatibility matrix (PG + extensions + drivers)
*   Upgrade/cutover logs and decision log
*   Post-change validation report
*   Rollback readiness proof (PITR markers, restore evidence)

## 12. What’s next

Next we formalize the runbook set and incident playbooks for common Postgres failure modes:

*   NS-PG-009 — Runbooks & Incident Playbooks
