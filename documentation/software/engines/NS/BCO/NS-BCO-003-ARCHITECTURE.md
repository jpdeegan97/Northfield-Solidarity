# NS-BCO-003 — ARCHITECTURE

## 1. Program architecture (governance)

*   **BCO Owner:** accountable for program health.
*   **Service Owners:** accountable for their services meeting continuity requirements.
*   **Incident Commander (IC):** leads during incidents.
*   **Scribe/Comms Lead:** timeline + comms.

## 2. Continuity architecture (technical)

### Minimum patterns

*   **Backups:** automated, encrypted, immutable/append-only where possible.
*   **Restore validation:** scheduled restores to prove integrity.
*   **Separation of duties:** restore keys and delete permissions controlled.
*   **Dependency mapping:** service → datastore → third parties.

### Strategy patterns by tier

*   **Tier 0:** multi-AZ, potential multi-region, hot/warm standby.
*   **Tier 1:** multi-AZ + tested restore, warm standby as needed.
*   **Tier 2/3:** restore-only, longer RTO acceptable.

## 3. Communications architecture

*   **Primary:** incident channel + paging + status page.
*   **Secondary:** SMS/phone tree if chat/email down.
*   **External:** customer notifications and partner contacts.
