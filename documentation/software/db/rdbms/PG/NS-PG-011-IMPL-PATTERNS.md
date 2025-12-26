# NS-PG-011 — Implementation Patterns (Managed vs Self-Managed)

## 0. Purpose

This document gives practical implementation patterns for NS-PG reference architectures, without locking you into a single vendor. It’s written so you can implement Postgres as:

*   Managed Postgres (cloud provider / hosted)
*   Self-managed on VMs
*   Self-managed on Kubernetes

It also defines where pooling, backups/PITR, HA, and LUM observability should live.

## 1. The NS-PG portability stance

NS-PG is implementation-agnostic, but not requirement-agnostic.

No matter what you pick, you must still deliver:
*   PITR + restore testing (NS-PG-003)
*   Connection pooling + timeouts (NS-PG-004)
*   Vacuum/day-2 discipline (NS-PG-005)
*   Performance regression controls (NS-PG-006)
*   Security + access governance (NS-PG-007)
*   Safe upgrades/migrations (NS-PG-008)
*   Runbooks + incident playbooks (NS-PG-009)
*   Observability (implemented in LUM) (NS-PG-010)

## 2. Decision rubric: Managed vs Self-Managed

### Choose Managed Postgres when
*   You want fastest path to reliable HA primitives
*   You value operational leverage over deep customization
*   Your team prefers focusing on product, not DB plumbing

**Common tradeoffs:**
*   Less control over low-level tuning and storage
*   Extension availability constraints
*   Provider-driven maintenance windows and behavior

### Choose Self-Managed (VM or K8s) when
*   You need specialized configuration / extensions / topology
*   You want full control of upgrade timing and storage
*   You have strong ops maturity (or you’re building it intentionally)

**Common tradeoffs:**
*   More responsibility: HA orchestration, backups, patching, capacity, on-call

**Rule of thumb:**
Tier 0/1 can be either, but self-managed only if you commit to the full day-2 burden.

## 3. Pattern catalog

### Pattern A — Managed Postgres, Single Writer + Optional Read Replica (S1/S3)

**When:** early prod, Tier 2/3, or read scaling without full custom HA.

**Where things live:**
*   **HA/replication:** provider
*   **Backups/PITR:** provider + NS-PG evidence and restore tests
*   **Pooling:** external (recommended) or app-side pooling
*   **Observability:** LUM ingests provider metrics/logs + app traces

**NS-PG hard requirements:**
*   Independent evidence of PITR readiness (WAL/archive freshness equivalent)
*   Restore tests still run (even if provider says backups are “on”)

### Pattern B — Managed Postgres HA (Multi-AZ) (S2)

**When:** Tier 0/1 where availability matters and you want operational leverage.

**Implementation notes:**
*   Treat provider failover as the mechanism, but still:
    *   define failover criteria
    *   rehearse client reconnection behavior (thundering herd)
    *   validate post-failover correctness and performance

**Pooler placement:**
*   Put pooler in the application network plane (close to services)
*   Use a stable DB endpoint (provider endpoint/DNS) and tune reconnect jitter

### Pattern C — Self-Managed on VMs: Primary + Standby + Orchestrator (S2)

**When:** Tier 0/1 and you want maximum control with classic operational clarity.

**Suggested components (conceptual):**
*   Postgres on dedicated VMs
*   HA orchestrator (leader election, failover, fencing)
*   Shared endpoint (VIP/DNS) for the writer
*   Optional read replicas

**Strengths:**
*   Clear blast radius, fewer moving parts than Kubernetes for DB
*   Predictable performance profile

**Risks:**
*   You own everything (patching, storage, failover correctness, backups)

### Pattern D — Self-Managed on Kubernetes: Stateful Postgres + Orchestrator (S1/S2)

**When:** you want GitOps primitives and standardized packaging, and you accept higher complexity.

**Stance:**
K8s Postgres can be excellent, but only if you treat storage and failure domains seriously.

**Key design points:**
*   Storage class and IO guarantees are first-class design inputs
*   Anti-affinity / topology spread across AZs
*   Explicit fencing/split-brain controls
*   Clear backup/restore job design (in-cluster jobs restoring to isolated namespace or external env)

**Common pitfalls:**
*   Underprovisioned IO
*   Noisy neighbor effects
*   “Works in dev” configs that collapse under prod vacuum/WAL pressure

## 4. Pooler placement patterns (PgBouncer-style concepts)

Pooling is a platform component; decide where it lives.

### Pooler Pattern 1 — Per-service sidecar / local pool

*   **Pros:** isolates budgets per service
*   **Cons:** harder to manage globally; config drift risk

### Pooler Pattern 2 — Shared pooler tier (recommended for many microservices)

*   **Pros:** central control, consistent budgets/timeouts
*   **Cons:** becomes a critical dependency; must be HA

### Pooler Pattern 3 — App-only pooling (library)

*   **Pros:** simpler infra
*   **Cons:** doesn’t protect DB as effectively under bursty/multi-service load

**NS-PG preference:**
*   Many services → shared pooler tier with strict budgets + LUM visibility
*   Few services → per-service pool acceptable if budgets are enforced

## 5. Backup/PITR implementation patterns

### Pattern 1 — Provider-native backups + NS-PG restore testing (managed)

*   Enable provider backups/PITR
*   Add NS-PG evidence: scheduled restore tests and validation suite

### Pattern 2 — Snapshot + WAL archive pipeline (self-managed)

*   Scheduled base backups (snapshot or basebackup)
*   Continuous WAL archiving to isolated storage
*   Immutable copy for Tier 0/1
*   Automated restore tests

### Pattern 3 — Dual-path backup (recommended for Tier 0/1)

*   Physical PITR path + periodic logical export
*   Logical export stored independently for selective recovery and portability

## 6. HA + failover patterns

### Managed HA

*   Validate provider failover behavior with drills
*   Confirm:
    *   client reconnection stability
    *   application retry/idempotency
    *   post-failover replication/lag normalization

### Self-managed HA

*   Orchestrator must enforce:
    *   single-writer guarantee
    *   fencing to prevent split-brain
    *   deterministic promotion process

**Regardless of mode:**
Failover is not “done” until validation checks pass (NS-PG-009).

## 7. LUM observability implementation notes

NS-PG observability is implemented inside LUM.

### What LUM must ingest (implementation-agnostic)
*   DB metrics (connections, latency, WAL/checkpoints, vacuum signals, replication lag)
*   Pooler metrics (queue depth, pool saturation, errors)
*   Logs (DB + pooler + migrations + backup/restore jobs)
*   Events (deploys/migrations/failovers/maintenance)
*   Traces correlated to query fingerprints (when feasible)

### Tagging (required)
All signals must include:
*   `env`, `service`, `db_cluster`, `tier`, `region`, `az`, `release_id`

## 8. IaC and GitOps patterns

**Baseline:** “config as code”

*   Parameterize DB config profiles: dev/stage/prod
*   Parameterize tier overlays: Tier 0/1 stricter timeouts, stronger validation cadence

**Drift control:**
*   Continuous drift detection against the golden baseline
*   Change approval path for prod config deltas

## 9. Standard validation packs (portable)

NS-PG expects reusable packs that run regardless of hosting model:
*   Restore validation suite (NS-PG-003)
*   Failover validation suite (NS-PG-009)
*   Performance critical query set checks (NS-PG-006)
*   Security posture checks (NS-PG-007)

## 10. Recommended baseline choices (if you want an opinion)

**If your goal is “best-in-world” with sane complexity:**
*   **Tier 0/1 default:** Managed HA (S2) + external pooler + strong NS-PG restore/failover drills

**If self-managed is required:**
*   VM-based HA (S2) first, then K8s only once storage/ops maturity is proven

## 11. Next document

If you want to keep going naturally, the next best doc is a concrete, operator-facing baseline:

*   NS-PG-012 — Golden Baseline Configuration (Profiles, Budgets, Guardrails)
