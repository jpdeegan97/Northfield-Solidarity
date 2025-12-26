# NS-PG-007 — Security Model and Access Governance

PostgreSQL security is a combination of identity, authorization, network, encryption, auditability, and operational discipline. This document defines the NS-PG security posture for production-grade Postgres.

## 1. Core stance

*   **Default deny.** Nothing gets access unless explicitly granted.
*   **Least privilege and separation of duties** are mandatory for Tier 0/1.
*   **Every access path is intentional:** humans, apps, automation, migrations, and break-glass.
*   **Encryption everywhere:** in transit and at rest (including backups).
*   **Auditability is not optional:** we must be able to answer “who did what, when, from where, and why.”

## 2. Identity and authentication

### 2.1 Authentication principles

*   Prefer provider-native identity (managed Postgres IAM integrations) where available.
*   Otherwise use strong password auth (SCRAM) for app/service accounts.

### 2.2 Human access

*   Humans do not use shared credentials.
*   Humans authenticate via a controlled path (e.g., SSO → bastion → DB, or equivalent).
*   Admin access is time-bounded and logged.

### 2.3 Machine access

*   Every service has a distinct DB role/credential.
*   Rotate credentials on schedule and on suspicion.
*   Prefer short-lived credentials/tokens when feasible.

## 3. Authorization model (RBAC)

### 3.1 Role taxonomy (recommended baseline)

*   `pg_owner_{service}`: owns schema objects for a service domain (not used by apps)
*   `pg_app_rw_{service}`: app runtime read/write (minimum required privileges)
*   `pg_app_ro_{service}`: read-only runtime (reporting endpoints)
*   `pg_migrate_{service}`: migrations role (DDL privileges; bounded use)
*   `pg_analytics_ro`: analytics/BI reads (prefer replicas)
*   `pg_admin`: platform admin (very limited membership)
*   `pg_breakglass_admin`: emergency-only, heavily gated

### 3.2 Schema discipline

*   Prefer per-service schemas where multi-service DBs exist.
*   Use default privileges to prevent accidental privilege drift.

### 3.3 Separation of duties

For Tier 0/1:

*   App roles cannot create/alter schema.
*   Migration roles are separate from app roles.
*   Backup writers and restore operators are separate.

## 4. Network security

### 4.1 Exposure policy

*   Production Postgres should not be publicly reachable.
*   Use private networking, security groups/firewalls, and explicit allow-lists.

### 4.2 Access paths

*   Direct-to-DB from laptops is discouraged; prefer bastion/secure tunnel.
*   Admin access should traverse a controlled choke point.

### 4.3 Ingress control

*   Restrict by subnet/VPC and by identity.
*   Deny broad CIDR ranges unless explicitly justified.

## 5. Encryption

### 5.1 In transit

*   TLS required for production connections.
*   Strong TLS configuration and certificate lifecycle management.

### 5.2 At rest

*   Disk/storage encryption required.
*   Backups encrypted at rest and in transit (see NS-PG-003).

### 5.3 Key management

*   Keys stored in a hardened secrets system.
*   Break-glass access includes key access rules.
*   Key usage is auditable.

## 6. Data protection features (when to use)

### 6.1 Row Level Security (RLS)

Use RLS when:
*   Multi-tenant boundaries require DB-enforced separation
*   Application-layer isolation is insufficient for risk posture

RLS requirements:
*   Explicit policy reviews
*   Performance impact testing
*   Clear “bypass” controls (admin-only)

### 6.2 PII/secret handling

*   Do not store secrets in plaintext.
*   Use field-level encryption or tokenization where required.
*   Minimize PII footprint; prefer references over copies.

## 7. Auditing and logging

### 7.1 Audit goals

We need to be able to answer:
*   Who accessed what?
*   Who changed schema?
*   Who ran destructive operations?
*   What happened during an incident?

### 7.2 Logging stance

Log enough for investigations without turning logs into a DOS vector.

Always log:
*   authentication successes/failures
*   privilege changes
*   schema changes
*   connection source and principal

### 7.3 Evidence retention

*   Tier 0/1 logs retained longer and stored immutably where feasible.

## 8. Operational controls

### 8.1 Break-glass policy (Tier 0/1)

*   Break-glass is emergency-only.
*   Requires explicit approval (or defined incident criteria).
*   Time-bounded access.
*   Mandatory post-incident review.

### 8.2 Change control

*   Privilege changes require review.
*   Schema changes go through migration workflow (not ad-hoc).

### 8.3 Hardening defaults

*   Disable or restrict risky capabilities unless needed.
*   Apply safe timeouts (NS-PG-004) to admin sessions too.

## 9. Security incident response (DB-focused)

Minimum incident scenarios NS-PG must be ready for:
*   Credential leak / suspected compromise
*   Destructive queries executed (malice or mistake)
*   Ransomware posture event (attempted backup deletion)
*   Unexpected privilege escalation

Required response capabilities:
*   Rotate credentials fast
*   Lock down roles and network paths
*   Verify backup immutability
*   PITR restore readiness (NS-PG-003)
*   Evidence capture (logs, timelines, change records)

## 10. Security reviews and cadence

For Tier 0/1:

*   Quarterly access reviews (role membership + privileges)
*   Quarterly secrets rotation evidence (or policy-based rotation proof)
*   Annual “tabletop” security incident exercise involving DB compromise

## 11. Evidence requirements (Tier 0/1)

Maintain:

*   Role/privilege inventory (exported snapshot)
*   Access review records
*   Audit log retention proof
*   Break-glass usage logs (if any)
*   Encryption proof (in transit + at rest + backup encryption)
*   Incident reports and remediations

## 12. What’s next

Next we cover upgrades, migrations, and version governance (where most outages hide):

*   NS-PG-008 — Upgrades, Migrations, and Change Safety
