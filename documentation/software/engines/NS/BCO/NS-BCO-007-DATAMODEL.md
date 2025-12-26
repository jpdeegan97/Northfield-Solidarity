# NS-BCO-007 — DATAMODEL

## Core entities

*   **Service:** name, owner, tier, dependencies.
*   **BIA (Business Impact Analysis):** service_id, RTO, RPO, impact notes.
*   **Risk:** scenario, likelihood, impact, controls.
*   **Control:** backup policy, replication, access controls.
*   **Runbook:** trigger, steps, validation, rollback.
*   **Exercise:** scenario, participants, results, gaps.
*   **Evidence:** links to logs/tickets/artifacts.

## Required service fields (minimum)

*   Owner + escalation contact
*   Tier (0–3)
*   RTO / RPO
*   Data stores + backup locations
*   Third-party dependencies
*   Runbook links
