# NS-PG-009 — Runbooks and Incident Playbooks

## 0. Purpose
This document defines the minimum runbook set, a consistent incident flow, and playbooks for the most common PostgreSQL failure modes in production.

**The goal is simple: when things break at 3AM, recovery is boring.**

## 1. Incident operating model (DB-focused)

### 1.1 Roles

*   **IC (Incident Commander):** owns coordination and decisions
*   **DB Lead:** owns diagnosis and DB-level actions
*   **App Lead:** owns app-side mitigations (rate limit, feature flags, deploy rollback)
*   **Comms/Scribe:** timeline, updates, evidence capture

### 1.2 Standard incident phases

1.  **Detect** (alerts/customer reports)
2.  **Triage** (scope + severity + stop-the-bleeding)
3.  **Stabilize** (remove blockers, reduce load, restore safe state)
4.  **Recover** (restore/failover/repair)
5.  **Validate** (data correctness + performance + replication health)
6.  **Close** (customer comms, postmortem, remediation)

### 1.3 Severity hints (customize per org)

*   **SEV0:** existential / data loss / prolonged write outage / region outage
*   **SEV1:** major customer impact, partial outage, high error rate
*   **SEV2:** degraded performance, limited subset impact
*   **SEV3:** minor degradation, operational issue caught early

## 2. Runbook format (required)

Every runbook must include:

*   Trigger signals (alerts, symptoms)
*   Impact (what breaks)
*   Immediate mitigations (stop the bleeding)
*   Diagnosis steps (what to check)
*   Actions ranked by risk (low → high)
*   Validation checklist (what “fixed” means)
*   Abort/rollback criteria
*   Evidence capture (commands run, screenshots/log refs)
*   Estimated time budget (tie to RTO)

## 3. Standard “DB Triage” checklist (use in every incident)

### 3.1 Fast questions

*   Are we connection-saturated (pool queue depth, max connections hit)?
*   Are we lock-bound (blocked sessions)?
*   Are we IO-bound (disk latency, throughput, checkpoint pressure)?
*   Are we CPU-bound (hot queries/scans)?
*   Is replication lag exploding (if replicas exist)?
*   Is WAL archiving healthy (PITR at risk)?
*   Are long transactions preventing vacuum/cleanup?

### 3.2 Quick DB queries (operator snippets)

Use these as patterns; keep a “known-good” saved set per environment.

*   Long-running queries / transactions
*   Idle-in-transaction sessions
*   Lock waits: blocked vs blockers
*   Top query fingerprints (if tracked)
*   Replication lag + slot health (if applicable)

## 4. Minimum runbook set (Tier 0/1 required)

### Continuity / data safety
1.  Full restore to new environment
2.  PITR restore to marker/timestamp
3.  WAL archive stalled / gaps
4.  Backup immutability verification

### Availability / HA
5.  Failover drill (planned)
6.  Emergency failover (unplanned)
7.  Post-failover client/pool stabilization (thundering herd control)

### Performance / stability
8.  Connection pool exhaustion
9.  Lock storm / blocker termination
10. Disk full / runaway WAL
11. Autovacuum falling behind
12. Bloat remediation decision tree
13. Replication lag emergency
14. Checkpoint/WAL pressure mitigation

### Security
15. Credential compromise / suspected compromise
16. Destructive query response (malice or mistake)

### Change safety
17. Migration went bad (lock storm / performance regression)
18. Upgrade rollback

## 5. Incident playbooks (the common ones)

### 5.1 Connection Pool Exhaustion / Connection Storm

**Triggers**
*   Pool queue depth rising
*   DB near max connections
*   App timeouts acquiring connections

**Immediate mitigations**
*   Rate limit / shed load / enable circuit breakers
*   Pause batch jobs, analytics, and migrations
*   Reduce app concurrency (workers/threads) temporarily

**Diagnosis**
*   Is DB healthy but overloaded, or blocked by locks/IO?
*   Are connections stuck idle-in-transaction?

**DB actions (low → high risk)**
*   Identify idle-in-transaction and terminate offenders
*   Enforce/raise timeouts (statement/idle-in-tx/lock) if missing
*   If a few queries dominate: contain them (denylist/kill) and hotfix

**Validation**
*   Pool queue drains
*   DB connection count stabilizes
*   Error rate and latency return to baseline

**Evidence**
*   Pool metrics, DB session counts, offenders terminated, timeouts set

### 5.2 Lock Storm (Blocked by a Blocker)

**Triggers**
*   Many sessions waiting on locks
*   Latency spikes; CPU may remain modest

**Immediate mitigations**
*   Stop deploys/migrations
*   Shed load to reduce new contention

**Diagnosis**
*   Identify the top blocker (one session blocking many)
*   Confirm if blocker is a migration/DDL, long transaction, or batch job

**Actions (low → high risk)**
*   Ask app/migration owner to stop/rollback change
*   Terminate blocker (clear criteria; capture query text first)
*   If widespread: isolate traffic by feature flag / endpoint disable

**Validation**
*   Blocked sessions drop quickly
*   p95 latency normalizes
*   No new lock queues building

### 5.3 Disk Full / Runaway WAL / Checkpoint Pressure

**Triggers**
*   Disk utilization near 100%
*   WAL directory growth / archive backlog
*   Frequent checkpoints, elevated IO latency

**Immediate mitigations**
*   Stop large writes (batch jobs, backfills)
*   Reduce logging-heavy operations
*   Increase storage if possible (fastest safe path)

**Diagnosis**
*   What is growing: table data, WAL, temp files, indexes?
*   Is WAL archiving stalled causing retention?

**Actions**
*   Restore WAL archiving if stalled
*   Fix the workload creating excessive WAL
*   Plan cleanup (careful: do not delete required WAL or backups)

**Validation**
*   Disk stops climbing
*   IO latency reduces
*   WAL/archiving returns to normal cadence

### 5.4 Replication Lag Emergency

**Triggers**
*   Replica lag breaches SLO
*   Read replicas returning stale reads
*   Failover risk increases

**Immediate mitigations**
*   Route critical reads back to primary (if safe)
*   Pause heavy writes and VACUUM/maintenance jobs if they worsen lag (judgment call)

**Diagnosis**
*   Is lag from IO saturation, long transactions, lock waits, or network?
*   Are replication slots preventing cleanup?

**Actions**
*   Remove primary bottleneck (locks/IO)
*   Reduce write pressure temporarily
*   Repair/replace unhealthy replica if required

**Validation**
*   Lag trends back toward steady state
*   Read routing returns to normal

### 5.5 Autovacuum Falling Behind / Bloat Crisis

**Triggers**
*   Dead tuples rising rapidly
*   Vacuum/analyze recency stale
*   Performance degrades over hours/days

**Immediate mitigations**
*   Stop long transactions and idle-in-transaction offenders
*   Pause heavy write batches

**Diagnosis**
*   Identify top bloated tables/indexes
*   Identify long transactions blocking vacuum

**Actions**
*   Adjust vacuum aggressiveness (as per NS-PG-005 stance)
*   Targeted vacuum/analyze
*   Reindex/remediation plan (with risk assessment)

**Validation**
*   Dead tuples trend down
*   p95 latency stabilizes
*   Vacuum progress visible

### 5.6 Backup/PITR At Risk (WAL Archive Stalled)

**Triggers**
*   WAL archive lag alert
*   Archive failures
*   Missing WAL segments

**Immediate mitigations**
*   Treat as SEV1/SEV0 depending on tier
*   Freeze risky changes (migrations, large writes) until archive restored

**Diagnosis**
*   Identify failure point (credentials, storage, network, quota)
*   Measure “time until unrecoverable” window

**Actions**
*   Restore archiving pipeline
*   Confirm archive continuity
*   Run a PITR restore test as soon as stable

**Validation**
*   Archive resumes and backlog drains
*   Evidence captured

### 5.7 Suspected Credential Compromise / Destructive Activity

**Triggers**
*   Unexpected admin actions
*   Destructive queries
*   Auth anomalies

**Immediate mitigations**
*   Rotate credentials (prioritize high-priv roles)
*   Restrict network access paths
*   Verify backup immutability (NS-PG-003)

**Diagnosis**
*   Identify entry point and scope
*   Determine last known good point for PITR marker

**Actions**
*   Containment → eradication → recovery
*   Consider PITR restore if integrity is uncertain

**Validation**
*   Access locked down
*   Clean posture verified
*   Evidence preserved for forensics

### 5.8 Bad Migration / Performance Regression

**Triggers**
*   Latency spike post-deploy
*   Lock contention from DDL
*   Plan regression (NS-PG-006)

**Immediate mitigations**
*   Rollback app deployment
*   Stop migration job
*   Load shed

**Diagnosis**
*   Identify offending query/index/plan change
*   Check stats/analyze needs

**Actions**
*   Apply minimal safe fix (index, stats refresh, query hotfix)
*   If necessary, revert schema using expand/contract strategy

**Validation**
*   Critical query set back within thresholds
*   No sustained lock waits

## 6. Planned exercises (required cadence for Tier 0/1)

*   **Monthly:** restore test (full or PITR)
*   **Quarterly:** failover drill (if HA) OR “regional cutover rehearsal” (if S4)
*   **Quarterly:** performance red-team scenario
*   **Annual:** security tabletop for DB compromise

Each exercise yields:
*   timings (RTO/RPO alignment)
*   gaps and remediation tickets
*   evidence pack update

## 7. Evidence capture checklist (during every incident)

*   Timeline (what happened when)
*   Key metrics screenshots (before/during/after)
*   Offending queries/session IDs (sanitized if needed)
*   Actions taken (and who approved)
*   Validation results
*   Post-incident remediation list

## 8. Next document

If you want, the next step is an Observability Pack (dashboards + alerts + SLOs) that maps 1:1 to these playbooks:

*   NS-PG-010 — Observability Pack (Dashboards, Alerts, SLOs)
