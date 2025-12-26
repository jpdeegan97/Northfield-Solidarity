# NS-QTN-004-LIFECYCLE — Lifecycle

## Dataset Lifecycle
**Raw → Staging → Cleansed → Curated → Archived → Purged**

## Record Lifecycle
- **Received** (raw)
- **Parsed** (staging)
- **Validated** (rule evaluation)
- **Transformed** (normalized/scrubbed)
- **Promoted** (curated) OR **Quarantined** (failed/uncertain)

## Contract Lifecycle
- Draft contract
- Test against sample data
- Activate (versioned)
- Monitor drift + incidents
- Deprecate/replace with migration path

## Incident Lifecycle
- Detect (rule failure / drift / sensitive leak)
- Contain (block promotion / quarantine)
- Triage (root cause: upstream or rules)
- Remediate (contract/rule update)
- Backfill/reprocess (idempotent)
