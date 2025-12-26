# NS-FORK-012-STATE — State Model

## State Machines

### MenuPlan State
`DRAFT → GENERATED → USER_REVIEW → APPROVED → LOCKED → COMPLETED → ARCHIVED`

### CartStrategy State
`PENDING → OPTIMIZED → PRESENTED → REFRESH_REQUIRED → CHECKOUT_IN_PROGRESS → ORDERED → FAILED/CANCELLED`

### Chef Vetting State
`APPLIED → DOCUMENTS_SUBMITTED → CHECKS_RUNNING → VERIFIED → ACTIVE → SUSPENDED/REVOKED`

### Booking State
`REQUESTED → QUOTED → CONFIRMED → IN_PROGRESS → COMPLETED → DISPUTED → CLOSED`

## Integration Notes
- Policies and safety gates should run on:
  - menu generation (allergy-risk detection)
  - substitution confirmations
  - chef onboarding and booking
- All transitions generate audit events.
