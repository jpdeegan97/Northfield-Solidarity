# NS-BCO-002 — TAXONOMY

## Service tiers

*   **Tier 0 (Existential):** identity/auth, billing, customer data plane, core APIs.
    *   *Must never go down. Immediate recovery required.*
*   **Tier 1 (Critical):** internal ops tools, CI/CD for production hotfixes, incident comms.
    *   *High priority recovery.*
*   **Tier 2 (Important):** analytics, non-critical batch jobs.
    *   *Can wait hours/days.*
*   **Tier 3 (Deferrable):** dev sandboxes, experiments.
    *   *Lowest priority.*

## Disruption categories

*   **Cyber:** ransomware, credential compromise, destructive actions.
*   **Platform:** cloud region outage, DNS failure, certificate issues.
*   **Data:** corruption, accidental deletion, bad migrations.
*   **People:** key-person loss, staffing gaps.
*   **Supply chain:** vendor failure, third-party API outage.
*   **Facilities:** power/network loss where on-prem exists.

## Artifact taxonomy

*   **Policies:** high-level rules (approved).
*   **Standards:** concrete requirements (RTO/RPO, backup cadence).
*   **Runbooks:** step-by-step execution.
*   **Evidence:** test logs, tickets, signoffs.
