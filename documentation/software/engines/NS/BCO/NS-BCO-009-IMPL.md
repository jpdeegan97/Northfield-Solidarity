# NS-BCO-009 — IMPL (Implementation Standard)

## 1. BIA implementation

*   Every service must have a BIA within 30 days of being production-critical.
*   Re-run BIA at least quarterly or after major architecture changes.

## 2. Backup/restore implementation

*   Backups encrypted at rest + in transit.
*   At least one backup copy must be logically isolated (separate account/project) or immutable.
*   **Restore tests:**
    *   Tier 0/1: monthly
    *   Tier 2: quarterly
    *   Tier 3: semi-annually

## 3. DR implementation

*   **Multi-region:** document failover criteria and DNS switching.
*   **Restore-only:** document provisioning + restore time budget.

## 4. Access and secrets

*   **Break-glass accounts:** controlled, monitored, and rotated.
*   **Backups/restore keys:** stored with strict RBAC and audit logs.
