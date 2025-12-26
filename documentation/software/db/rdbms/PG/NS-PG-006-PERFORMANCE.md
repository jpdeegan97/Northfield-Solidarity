# NS-PG-006 — Performance Discipline (Indexes, Plans, Regression Control)

## 0. Purpose

Performance in PostgreSQL is not “tuning later.” It is a discipline: you control query shapes, index strategy, statistics, concurrency, and you prevent regressions with gates + evidence.

This document defines how NS-PG maintains stable latency and throughput over time.

## 1. Core stance

*   Performance is a product feature. It must be designed, measured, and protected.
*   Stability beats peak. A predictable p95/p99 is more valuable than occasional speed.
*   Indexes are contracts. Add them intentionally, measure them, and maintain them.
*   Regressions are prevented, not discovered. Use release gates, baselines, and continuous profiling.

## 2. Performance operating loop

NS-PG runs performance as a closed loop:

1.  **Observe:** collect query fingerprints, latency distributions, and resource signals.
2.  **Attribute:** identify the workload segment causing pain (query, lock, IO, vacuum, network).
3.  **Optimize:** apply the smallest safe change.
4.  **Validate:** prove improvement and confirm no regressions.
5.  **Harden:** encode the lesson as a rule, index standard, or gate.

## 3. Query design rules (application discipline)

### 3.1 Avoid common outage patterns

*   N+1 queries
*   Unbounded result sets (missing `LIMIT`)
*   Missing predicates on large tables
*   Implicit cross joins / accidental fan-out
*   Sorting huge datasets without index support

### 3.2 Pagination stance

*   Prefer **keyset pagination** for large/active datasets.
*   **Offset pagination** is acceptable for small bounded sets, but is not a default for large tables.

### 3.3 Read/write separation

*   Route analytics/reporting to replicas or a warehouse.
*   Keep OLTP primary focused on transactional workload.

### 3.4 JSON/Document usage stance

JSONB is powerful, but performance requires:

*   clear access patterns
*   explicit indexes (GIN / expression indexes)
*   careful containment/ops usage

## 4. Index discipline

### 4.1 Index is a trade

Every index:
*   speeds reads for a specific access pattern
*   slows writes (insert/update/delete)
*   increases vacuum and bloat surface area

### 4.2 Index selection rules

*   Start from the `WHERE` + `JOIN` + `ORDER BY` access pattern.
*   Index columns that support:
    *   high-selectivity filters
    *   common join keys
    *   frequent ordering constraints

### 4.3 Index types (conceptual mapping)

*   **B-tree:** default; equality + range + ordering
*   **GIN:** arrays/jsonb/tsvector membership
*   **GiST:** geometric/range/specialized search
*   **BRIN:** massive tables with natural correlation (time-series)

### 4.4 Advanced index techniques

*   **Composite indexes** for multi-column patterns
*   **Partial indexes** when a predicate is stable and selective
*   **Expression indexes** when functions/JSON paths are common
*   **Covering indexes** where appropriate (reduce heap fetches)

### 4.5 Index lifecycle management

Every new index must have:
*   the query pattern it serves
*   expected benefit
*   planned review date

Periodically identify:
*   unused/rarely used indexes
*   duplicate indexes
*   bloated indexes

## 5. Plans, statistics, and plan stability

### 5.1 The plan reality

Postgres chooses plans based on statistics and cost estimates. Plans can change due to:
*   data distribution shifts
*   stale stats
*   schema/index changes
*   parameterization changes
*   version upgrades

### 5.2 Statistics hygiene (ties to NS-PG-005)

*   `ANALYZE` must be timely for high-churn tables.
*   After large backfills/ETL, force analyze.

### 5.3 Plan analysis standard

When investigating a slow query, NS-PG requires:
*   the query fingerprint
*   current vs historical latency
*   the chosen plan (`EXPLAIN`)
*   actual execution stats when safe (`EXPLAIN ANALYZE` in non-prod or controlled prod)
*   correlation with:
    *   lock waits
    *   IO pressure
    *   vacuum/bloat signals

### 5.4 Parameterization discipline

*   Stable query shapes are preferred.
*   Be cautious with patterns that cause unpredictable plan selection.

## 6. Regression control (how we prevent surprises)

### 6.1 The “critical query set”

Each Tier 0/1 service maintains a list of critical queries (by fingerprint) that represent:
*   top customer paths
*   top write paths
*   most expensive queries by total time

### 6.2 Release gates

Before shipping schema or major code changes for Tier 0/1:
1.  run a performance check against the critical query set
2.  compare p95/p99 and total time deltas
3.  block release if regression exceeds thresholds

### 6.3 Baseline snapshots

Maintain baselines:
*   weekly query performance baseline
*   baseline plans for critical queries (informational, not rigid pinning)

### 6.4 “Red team” scenarios

Quarterly, run one adversarial performance scenario:
*   large tenant / hot partition
*   sudden traffic spike
*   lock storm induced by migration
*   replica lag + read routing stress

## 7. Partitioning and data lifecycle

Partitioning is a tool, not a default.

**Use partitioning when:**
*   tables become extremely large
*   retention/deletion is time-based
*   query patterns align with a partition key

**Rules:**
*   partition key must match common predicates
*   partition counts must remain operationally manageable
*   include a plan for index strategy per partition

## 8. Workload controls and resource protection

### 8.1 Backpressure and admission control

*   queue batch work
*   rate limit per tenant/user
*   separate “expensive” endpoints

### 8.2 Timeouts as performance protection

*   `statement_timeout` prevents catastrophic queries
*   `lock_timeout` prevents indefinite wait cascades

### 8.3 Concurrency budgeting

*   keep connection budgets conservative (NS-PG-004)
*   avoid “more connections” as the first response

## 9. Performance incident playbook (how we debug)

**When latency spikes:**

1.  **Is it lock-bound?** Look for blockers/blocked and long transactions.
2.  **Is it IO-bound?** Disk throughput/latency, WAL/checkpoint pressure.
3.  **Is it CPU-bound?** High CPU on DB, many expensive scans/joins.
4.  **Is vacuum behind?** Dead tuples, autovacuum lag, bloat trends.
5.  **Did a plan change?** Compare current plan vs baseline.
6.  **Is it connection-bound?** Pool saturation, queue depth, thundering herd.

**Resolution order:**

1.  stop the bleeding (timeouts/load shed)
2.  remove the blocker (terminate offender / reduce fan-out)
3.  apply minimal safe fix (index, query rewrite, stats refresh)
4.  validate and capture evidence

## 10. Evidence requirements (Tier 0/1)

Tier 0/1 databases must maintain:

*   A dashboard for top query fingerprints by total time + p95/p99 latency
*   A defined critical query set
*   Release gate results for schema changes
*   A quarterly performance exercise report
*   Runbooks for:
    *   plan regression diagnosis
    *   index deployment and rollback
    *   emergency query containment (kill switch / denylist)

## 11. What’s next

Next we harden the security model (RBAC, TLS, secrets, auditing):

*   NS-PG-007 — Security Model and Access Governance
