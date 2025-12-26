# NS-BCO — Business Continuity Operations

## 0. Context on Naming
To avoid acronym collisions (e.g. with the former "Compute Plane" engine), we have standardized on:
*   **NS-OCP** — Onchain Compute Plane
*   **NS-BCO** — Business Continuity Operations

*(Migration note: Old references to `NS-BCP-*` should now be `NS-BCO-*`)*

## 1. Mission

Establish and operate a repeatable, testable, auditable continuity capability so Northfield Solidarity can:

*   Maintain delivery of critical services during disruption.
*   Recover systems and operations within defined RTO/RPO targets.
*   Minimize financial, legal, security, and reputational impact.

## 2. Program scope

**NS-BCO covers continuity across:**
*   **People:** roles, on-call, escalation, key-person contingencies.
*   **Process:** incident command, comms, approvals, change control during events.
*   **Technology:** infrastructure, platforms, data stores, CI/CD, identity, observability.
*   **Vendors:** cloud providers, third-party APIs, registrars/DNS, payment processors.
*   **Facilities:** power, network, on-prem hardware (if applicable).

**Disruption types in scope:**
Cloud/provider outages, DNS/certificate failures, cyber incidents (including destructive actions), data corruption/deletion, bad releases/migrations, supply chain/vendor failure, and regional events.

**Out of scope (but integrated):**
General product roadmap, non-continuity security architecture, and long-range corporate strategy—except where they directly impact recovery capability.

## 3. Operating objectives

1.  **Service Inventory:** Maintain a service inventory with owners, tiers, dependencies, and recovery targets.
2.  **Risk Management:** Maintain BIA (Business Impact Analysis) and a continuity-focused risk register.
3.  **Controls:** Implement continuity controls: backups, immutability/isolation, replication, and runbooks.
4.  **Validation:** Perform restore tests and DR exercises on a defined cadence; measure actual recovery time.
5.  **Audit Readiness:** Produce and retain evidence suitable for audits and customer due diligence.

## 4. Roles and accountability

*   **BCO Owner:** accountable for program health, cadence, and reporting.
*   **Service Owner:** accountable for meeting tier requirements (RTO/RPO, tests, runbooks).
*   **Incident Commander:** accountable for response leadership during continuity-impacting events.
*   **Comms Lead/Scribe:** accountable for updates, timeline, and evidence capture.

## 5. Deliverables

*   Tier model + tier assignment per service
*   BIA records per service (RTO/RPO + impact)
*   Runbooks (restore, failover, workaround)
*   Exercise reports + remediation backlog
*   Evidence packs per Tier 0/1 service

## 6. Success metrics

*   **Coverage:** % Tier 0/1 services with approved BIA + documented runbooks.
*   **Validation:** restore test pass rate and recency vs policy.
*   **Performance:** measured recovery times vs RTO/RPO targets.
*   **Readiness:** open continuity gaps by tier (time-to-close).
*   **Incident outcomes:** MTTR for continuity-impacting incidents.
