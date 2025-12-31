# 012 STATE

## Lead states
INGESTED → NORMALIZED → RESOLVED → ENRICHED → BRIEFED → SCORED → REVIEW_PENDING → APPROVED → EXPORTED → CONTACTED → (CONVERTED | NURTURE | DISQUALIFIED)

## CWP timeline states
CWP_DRAFT → CWP_REVIEWED → CWP_ACTIVE → (CWP_PAUSED) → CWP_COMPLETED

## Touch states
PLANNED → ATTEMPTED → DELIVERED → RESPONDED → OUTCOME_RECORDED

## Hard stops
- OPT_OUT ⇒ global suppression + pause timeline + block future exports/messages
- Evidence gate failure ⇒ cannot activate timeline
