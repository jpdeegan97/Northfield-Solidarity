# NS-PG-003 — Backups, PITR, and Restore Testing (Production-Grade Standard)

Backups are not “storage.” They are a recovery system with security properties, measurable objectives, and evidence.

This standard defines how NS-PG implements:

*   Backups (physical + logical)
*   PITR (Point-in-Time Recovery) via WAL archiving
*   Restore testing and validation
*   Immutability + access controls
*   Evidence packs

## 0. Non‑negotiables

*   Replication is not backup. Replication copies operator mistakes and malware quickly.
*   Backups without restore tests are untrusted. “Green backup job” ≠ recoverable.
*   PITR is the default for production databases.
*   At least one isolated/immutable copy exists for Tier 0/1 (strongly recommended for all tiers).
*   Restore time is measured and compared to RTO; restore point compared to RPO.

## 1. Recovery objectives (RTO/RPO)

Every production DB must declare:

*   **RTO:** maximum acceptable downtime
*   **RPO:** maximum acceptable data loss window

NS-PG ties those objectives to architecture choice (S1/S2/S4) and to restore test cadence.

## 2. Backup classes and what they’re for

### 2.1 Physical backups (baseline for full recovery)

**Purpose:** fastest full-cluster recovery + PITR foundation.

Physical backups must include:

*   A base backup (full physical state)
*   A continuous WAL archive stream for PITR

Physical backups are the default for:

*   Full instance rebuild
*   Point-in-time restore after deletion/corruption

### 2.2 Logical backups (baseline for portability and selective recovery)

**Purpose:** selective restore, portability, forensic snapshots, migration safety.

Logical backups are required when:

*   You need table/schema selective recovery options
*   You perform major upgrades/migrations where portability matters

**Important:** logical backups complement PITR; they do not replace it.

## 3. PITR model (WAL archiving) — required

### 3.1 What PITR must support

For production, PITR must enable restore to:

*   A timestamp
*   A known marker (recommended): deployment ID, migration version, “known good” checkpoint

### 3.2 WAL archiving invariants

*   WAL archiving is continuous (no gaps tolerated for Tier 0/1)
*   Archive storage is in a separate failure domain from the primary
*   Archive retention covers the maximum required restore window

### 3.3 “Archive health” signals (must be monitored)

*   Last WAL segment archived time
*   WAL archive backlog size / lag
*   Archive write failures
*   Archive retention nearing eviction

## 4. Isolation + immutability (anti-ransomware posture)

### 4.1 Isolation requirement

At least one backup copy must be stored in a location that is operationally isolated from the primary DB:

*   Separate cloud account/project OR
*   Separate credentials + separate admin domain OR
*   Separate physical environment (where applicable)

### 4.2 Immutability requirement (Tier 0/1)

Tier 0/1 must have a backup copy that is:

*   Immutable / WORM / Object Lock (or equivalent), with deletion protections
*   Protected from routine admin roles (“cannot delete what you don’t control”)

### 4.3 Key management (separation of duties)

*   Backup encryption keys are managed in a hardened secret store
*   Restore capability is gated (break-glass) for Tier 0/1
*   Key usage is auditable

## 5. Encryption + integrity

### 5.1 Encryption

*   Encrypt in transit and at rest
*   Explicitly define who can decrypt backups (role separation)

### 5.2 Integrity

*   Enable checksums where applicable
*   Validate archive readability periodically (not only presence)
*   Store hashes/manifest metadata for backup sets

## 6. Retention baseline

Retention is tier-driven and can be tuned per BIA, but defaults:

### Tier 0/1

*   Base backups: daily
*   WAL: continuous
*   Retention: 30–90 days
*   Monthly anchors retained longer (forensics/rollback)

### Tier 2

*   Base backups: daily or weekly
*   WAL: continuous
*   Retention: 14–30 days

### Tier 3

*   Base backups: weekly
*   WAL: optional (recommended if feasible)
*   Retention: 7–14 days

## 7. Restore testing (the proof loop)

### 7.1 Restore test types

**Full restore test (baseline)**

*   Rebuild DB in an isolated environment
*   Run validation suite

**PITR restore test (baseline)**

*   Restore to a selected marker/time
*   Prove RPO compliance

**Selective recovery rehearsal (recommended)**

*   Demonstrate table/schema recovery path (often via logical backup + apply)

**Adversarial restore (advanced)**

*   Assume primary is compromised/untrusted
*   Validate break-glass + immutable backup restore path

### 7.2 Cadence (default)

*   **Tier 0:** monthly PITR restore + quarterly full restore + quarterly DR/failover drill (if HA/region)
*   **Tier 1:** monthly full restore (alternating PITR/full acceptable)
*   **Tier 2:** quarterly restore test
*   **Tier 3:** semiannual restore test

### 7.3 Pass/fail criteria

A restore test passes only if:

*   DB starts cleanly and is reachable
*   Schema matches expected migration version
*   Data sanity checks pass
*   App smoke tests pass (Tier 0/1)
*   Measured restore time ≤ RTO budget
*   Selected restore point satisfies RPO
*   Evidence artifacts captured and stored

## 8. Standard validation suite

Each restore test should include a versioned validation pack:

*   Connectivity and auth tests
*   Representative critical queries (read + write where safe)
*   Schema diff vs expected migrations
*   Constraint integrity checks (PK/FK/NOT NULL/CHECK)
*   Invariant checks (domain-specific)
*   Extension presence + version checks
*   Performance spot checks for top query fingerprints (optional but recommended)

## 9. Operational runbooks (must exist)

Minimum runbooks per production DB:

*   Full restore to new environment
*   PITR restore to marker/timestamp
*   Backup archive stalled / WAL gaps response
*   Credential compromise / ransomware posture response
*   Data corruption / bad migration response

Runbooks must include:

*   Triggers and severity guidance
*   Preconditions / access required (including break-glass)
*   Step-by-step actions
*   Validation checklist
*   Rollback/abort criteria
*   Evidence capture instructions
*   Expected time budget

## 10. Automation expectations

For Tier 0/1, restore testing should be automated:

*   Scheduled restore jobs into an isolated environment
*   Automated validation suite execution
*   Automatic evidence export (logs, metrics, manifests)
*   Alerts on test failure, archive lag, or retention risks

## 11. Evidence pack (audit-ready)

For each Tier 0/1 DB, maintain an evidence bundle containing:

*   Backup policy/config snapshot (schedule, retention, encryption)
*   WAL archive health history (last 30–90 days)
*   Last two restore test reports (minimum)
*   PITR drill details (chosen restore point + result)
*   Access review evidence (who can restore; break-glass approvals)
*   Incident notes if backup/archiving was impaired

## 12. Anti-patterns (outage factories)

*   “We have replicas, so we don’t need backups.”
*   Backups stored in the same administrative domain as production
*   No immutability; admin compromise can delete backups
*   No restore tests; discovering failure during an incident
*   WAL archiving enabled but not monitored (silent gaps)

## 13. What’s next

Next, we lock down the most common production destabilizer:

*   NS-PG-004 — Connections, Pooling, and Safe Timeouts
