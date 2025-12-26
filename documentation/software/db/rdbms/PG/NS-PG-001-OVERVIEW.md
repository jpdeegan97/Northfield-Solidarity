# NS-PG-001 — Platform Overview & Operating Model

## 1. What “production-grade Postgres” means in NS-PG

NS-PG treats PostgreSQL as a platform with explicit guarantees:

*   **Correctness:** transactional integrity, consistent recovery, well-defined isolation semantics.
*   **Durability:** WAL + backups + PITR that work under stress.
*   **Availability:** clear HA stance and deterministic failover behavior.
*   **Performance:** stable query performance over time (no silent regressions).
*   **Security:** least privilege, encrypted transport, controlled secrets, auditable actions.
*   **Operability:** predictable day-2 operations (vacuum health, bloat control, upgrades).

## 2. The operating model (how we run it)

### Ownership

Every production database has:

*   A named Service Owner and DB Owner
*   An on-call escalation path
*   A continuity tier (Tier 0–3) with explicit RTO/RPO

### Cadence

*   **Daily:** monitor health (replication lag, disk/WAL growth, errors), verify backups succeeded.
*   **Weekly:** review slow queries, top lock waits, bloat/vacuum anomalies.
*   **Monthly:** restore test (Tier 0/1), failover drill where applicable.
*   **Quarterly:** re-run BIA alignment, run tabletop continuity exercise, upgrade readiness review.

### Evidence-driven posture

NS-PG produces artifacts that prove reality:

*   restore logs, drill reports, config snapshots, access reviews, upgrade dry-run outcomes.

## 3. The “Golden Baseline” concept

NS-PG maintains opinionated baselines that are versioned like product releases:

*   **Baseline profiles:** dev / stage / prod
*   **Tier overlays:** Tier 0/1 stricter settings and higher validation frequency
*   **Guardrails:** standard timeouts, safe defaults, and required telemetry
*   **Drift control:** config as code + continuous drift detection

## 4. Environments and promotion

*   **Dev:** convenience-oriented, still reasonably close to prod semantics.
*   **Stage:** production-like, used for load tests, migration rehearsals, and failover practice.
*   **Prod:** strict access controls, immutable backups, strong alerting.

**Promotion requires:**

*   Migration rehearsal
*   Restore validation (at least once per release cycle for Tier 0/1)
*   Performance regression check for top critical queries

## 5. Key production realities (non-negotiable mental models)

*   PostgreSQL depends on vacuum health; ignoring it becomes downtime.
*   “Backups exist” is meaningless without restore tests.
*   Too many connections will hurt you; pooling is mandatory at scale.
*   HA is not a feature toggle; failover must be designed, tested, and operationally controlled.

## 6. Tooling stance (implementation-agnostic)

NS-PG defines interfaces and evidence requirements, and can be implemented via:

*   Managed Postgres (cloud provider)
*   Self-managed Postgres on Kubernetes or VMs

Regardless of hosting, NS-PG requires:

*   PITR capability
*   Immutable/isolated backup copy
*   Observability pack
*   Access controls and auditability

## 7. Documentation progression (natural next docs)

This project will progress in the order that matches real risk reduction:

1.  Reference Architectures (single → HA → optional multi-region)
2.  Backups + PITR + Restore Testing (the continuity backbone)
3.  Connections + Pooling (stability under load)
4.  Vacuum/Bloat/Ops (day-2 survival)
5.  Performance Discipline (indexes, plans, regression controls)
6.  Security Model (RBAC, TLS, secrets, audit)
7.  Upgrades + Migration Playbooks
8.  Runbooks + Incident Playbooks
9.  Observability Pack (dashboards + alerts + SLOs)
