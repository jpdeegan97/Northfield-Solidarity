# 004 LIFECYCLE

## Lead lifecycle
INGESTED → NORMALIZED → RESOLVED → ENRICHED → BRIEFED → SCORED → REVIEW_PENDING → APPROVED → EXPORTED → CONTACTED → (CONVERTED | NURTURE | DISQUALIFIED)

## CWP lifecycle (per lead)
CWP_DRAFT → CWP_REVIEWED → CWP_ACTIVE → (CWP_PAUSED) → CWP_COMPLETED

### CWP completed states
- CONVERTED (your defined “win” event: meeting/LOI/invoice)
- NURTURE (not now)
- DISQUALIFIED (not a fit / unreachable / opted out)

## Retention
- raw captures: 30–90 days baseline
- suppression (opt-out): keep indefinitely (hash where possible)
- Tier 3: delete-by-default; only if explicitly collected with consent + purpose + timer
