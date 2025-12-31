# 013 RUNBOOK

## Runbooks

### Onboard a new institution
1) Add institution + aliases + affiliates
2) Confirm funds/vehicles (if applicable)
3) Choose sources (public first; licensed only if permitted)
4) Run backfill for chosen timeframe
5) Review ambiguity queue and resolve entity matches
6) Publish profile and enable monitoring

### Handle ambiguous matches
- Resolve or split entities; add new alias rules; backfill affected records

### Add a new connector
1) Validate ToS/robots and licensing
2) Implement rate limiting + backoff
3) Add extraction tests and regression fixtures
4) Deploy to staging, then prod

### Correct a published deal
- Update fields with evidence, increment changelog, re-run aggregates
