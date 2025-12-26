# NS-QTN-013-RUNBOOK — Operations Runbook

## Day-1 Checklist
- Stand up metadata DB + object store buckets (raw/staging/cleansed/curated/quarantine)
- Deploy API + worker fleet
- Create initial contracts for top 3 sources
- Configure sensitive policies (GGE) and preview permissions
- Wire LUM metrics + alerts (quarantine spikes, drift, blocked promotions)

## Operational SLO Ideas
- p95 time from raw landing → curated promotion
- % promoted vs quarantined
- Mean time to detect schema break
- Mean time to remediate + reprocess
- Sensitive-data escape rate (target: 0)

## Common Issues
### Quarantine spike after upstream change
- Check schema diff and failing rules
- Temporarily switch to lenient mode (if safe) to avoid pipeline halt
- Implement migration: new contract version + reprocess

### Sensitive data detected in new field
- Block promotion
- Add detector + policy action
- Backfill scrubbed curated version

### Performance regressions
- Confirm partitioning strategy
- Increase batch sizes; reduce per-row transforms
- Cache lookups; use vectorized operations

## Emergency Controls
- Kill-switch: stop promotion for a source while continuing raw landing
- Force quarantine: route all records to quarantine for forensic review
- Override with signed approval (GGE gate) for time-critical pipelines
