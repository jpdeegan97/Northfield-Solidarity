# NS-PG-012 — Golden Baseline Config (Profiles, Budgets, Guardrails)

## 0. Purpose

This document defines NS-PG’s Golden Baseline: the default configuration profiles, connection budgets, operational guardrails, and tier overlays used to run production-grade PostgreSQL.

**Important:** exact values depend on workload and hardware. NS-PG’s baseline is expressed as:

*   **Policies** (must/should)
*   **Formulas** (derive from CPU/RAM/IO)
*   **Tier overlays** (Tier 0/1 stricter)

This baseline is intended to be implemented as config-as-code and protected by drift detection.

## 1. Baseline structure

NS-PG defines:

*   **Profiles:** dev, stage, prod
*   **Tier overlays:** tier0, tier1, tier2, tier3

**Baseline application order:**
1.  Base profile (prod)
2.  Tier overlay (tier0 etc.)
3.  Environment-specific exceptions (rare; require approval)

## 2. Non-negotiable guardrails (all production)

### 2.1 Timeouts

*   `statement_timeout`: enabled
*   `lock_timeout`: enabled
*   `idle_in_transaction_session_timeout`: enabled

*(These are enforced to prevent lock storms, leaked transactions, and runaway queries; see NS-PG-004.)*

### 2.2 Durability

*   WAL enabled (of course), PITR required (NS-PG-003)
*   Never disable durability settings to “get performance” in prod

### 2.3 Safety

*   Autovacuum enabled
*   Logging sufficient for incident response and performance triage
*   Strong authentication and TLS in transit (NS-PG-007)

## 3. Connection budgets (the Golden Budget)

### 3.1 Budget model

NS-PG treats connections as a scarce resource and budgets explicitly:

`max_connections = reserved_admin + sum(service_pool_budgets) + headroom`

Where:
*   `reserved_admin` includes: migrations, emergency access, monitoring, maintenance
*   `headroom` covers spikes, failover transitions, and operational tasks

### 3.2 Baseline policy

*   Production uses a pooler by default (NS-PG-004).
*   Application instances do not connect directly without an explicit exception.

### 3.3 Sizing heuristic (starting point)

*   Start with low hundreds (or lower) for max_connections.
*   Size pooler concurrency to protect the DB from bursts.
*   Prefer scaling read replicas or optimizing queries over increasing connections.

*(Note: if you want, we can add a concrete “RAM-per-connection” worksheet later once you lock a target instance size.)*

## 4. Profile baselines

### 4.1 dev profile

**Purpose:** developer velocity while preserving core semantics.
*   Lower retention requirements
*   Relaxed logging volume
*   Still enforce timeouts (just higher thresholds)

### 4.2 stage profile

**Purpose:** production rehearsal.
*   Mirrors prod semantics (timeouts, logging, pool budgets)
*   Used for migration rehearsals, restore tests, failover drills

### 4.3 prod profile

**Purpose:** safest defaults.
*   Strict timeouts
*   Full logging needed for incidents
*   Full backup/PITR + restore test integrations

## 5. Tier overlays (behavioral requirements)

### Tier 0 overlay (existential)
*   Shorter timeouts (stricter)
*   Higher logging fidelity for security/forensics
*   More aggressive vacuum posture where safe
*   **Restore tests:** monthly PITR + quarterly full (NS-PG-003)
*   **Failover drills if HA:** quarterly (NS-PG-009)

### Tier 1 overlay (critical)
*   Similar to Tier 0 but slightly relaxed
*   **Restore tests:** monthly

### Tier 2 overlay
*   **Restore tests:** quarterly
*   Alerting can be ticket-first depending on customer impact

### Tier 3 overlay
*   **Restore tests:** semiannual
*   Reduced operational intensity

## 6. Configuration domains (what we standardize)

### 6.1 Query/transaction safety

**Baseline policy**
*   Enforce timeouts at the DB level
*   Enforce timeouts at the client/pool level

**Guardrails**
*   Default isolation level is the application’s choice, but long transactions are prohibited
*   Long-running queries must be intentional and routed to the right environment (replica/warehouse)

### 6.2 WAL + checkpoint hygiene

**Baseline goals**
*   Prevent IO spikes from checkpoint storms
*   Maintain predictable WAL retention and archiving

**Guardrails**
*   WAL archiving monitored (freshness + backlog)
*   Checkpoint pressure is a first-class LUM dashboard and alert

### 6.3 Vacuum/autovacuum

**Baseline goals**
*   Prevent bloat accumulation
*   Prevent wraparound risk

**Guardrails**
*   Autovacuum is enabled
*   Vacuum starvation detection is mandatory
*   Long transactions are monitored and terminated under defined conditions

### 6.4 Logging and observability (implemented in LUM)

**Baseline goals**
*   Every incident has enough telemetry to diagnose and prove remediation

**Guardrails**
*   Log auth events and privileged actions
*   Log slow queries by duration threshold (tier-aware)
*   Export metrics needed for the Golden Dashboards (NS-PG-010)

### 6.5 Security baseline

**Guardrails**
*   TLS in transit for prod
*   Strong auth (prefer IAM/SSO integration where supported, else SCRAM)
*   Least privilege roles; separate app vs migration vs admin
*   Break-glass policy for Tier 0/1

### 6.6 Replication/HA (if applicable)

**Guardrails**
*   Replication lag SLOs and alerts
*   Failover validation checklist
*   Post-failover “client herd” control via pooler jitter/ramp-up

## 7. Baseline parameter groups (template view)

This section is intentionally expressed as groups so you can implement via Helm/Ansible/Terraform/provider params.

### Group A — Safety timeouts (prod defaults; tier overlays adjust)
*   `statement_timeout`
*   `lock_timeout`
*   `idle_in_transaction_session_timeout`

### Group B — Resource protection
*   `max_connections` (budgeted)
*   memory-related settings aligned to instance RAM
*   temp usage and sort behavior monitored

### Group C — WAL/checkpoints
*   checkpoint cadence smoothing
*   WAL size/retention aligned to PITR and write rate
*   archive command / archive integration configured and monitored

### Group D — Vacuum/analyze
*   autovacuum enabled
*   earlier triggers for high-churn tables (Tier 0/1)
*   analyze frequency suitable for planner stability

### Group E — Logging/audit
*   connection/auth logs
*   slow query logs (tier-aware)
*   deadlock/lock wait signals surfaced

### Group F — Security
*   TLS on
*   auth method enforced
*   role model + default privileges

## 8. Baseline operational guardrails (what’s enforced outside postgresql.conf)

Golden Baseline includes non-config enforcement:

### 8.1 Pooler configuration rules
*   Connection caps per service
*   Pool acquire timeout
*   Reconnect jitter and ramp-up

### 8.2 Migration runner rules
*   Separate credentials
*   Bounded concurrency
*   Statement/lock timeouts enforced

### 8.3 Backup/restore rules
*   PITR configured
*   Immutable/isolated copy (Tier 0/1)
*   Restore tests scheduled with evidence captured

## 9. Drift detection and change approval

### 9.1 Drift detection
*   LUM (or config scanner) detects drift from Golden Baseline
*   Drift creates a ticket and is triaged by severity/tier

### 9.2 Approval policy
*   Tier 0/1 prod config changes require review
*   Exceptions must be time-bounded and recorded

## 10. “Golden Baseline Acceptance Test” (GBAT)

A DB cluster is considered Baseline-Compliant only if:

*   Timeouts are present and verified
*   Backup/PITR health signals are green
*   Restore test evidence exists within policy
*   Connection budgets are documented and enforced
*   Vacuum health dashboards are live
*   LUM dashboards and alert routing are live

## 11. Practical next step

If you tell me your intended first deployment target:

1.  Managed (which provider?) or self-managed (VM/K8s?)
2.  approximate instance size (vCPU/RAM)

…I will produce a concrete baseline “v1 defaults” appendix (exact starter values) tailored to that footprint.
