# NS-CON-013-RUNBOOK — Runbook

## Day-1
- Deploy catalog + runtime orchestrator
- Integrate secret store and lock down access
- Add top connectors (Postgres, S3/MinIO, Kafka, one SaaS API)
- Configure LUM dashboards: run success, throughput, DLQ, throttling
- Configure alerts: auth failures spike, drift detected, DLQ growth

## Common Incidents
- OAuth token expired/invalid: rotate/refresh secret; validate connection.
- Throttling: lower rate limit, increase backoff, schedule off-peak.
- Schema drift: capture diff, update contract expectations (QTN), re-run window.
- Duplicate deliveries: verify idempotency keys and checkpoint semantics.

## Emergency Controls
- Pause connection (stop pulling/pushing)
- Force checkpoint rewind (controlled replay)
- Disable destination writes (ingress-only mode)
