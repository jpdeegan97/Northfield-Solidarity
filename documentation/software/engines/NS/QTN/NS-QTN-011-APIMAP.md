# NS-QTN-011-APIMAP — API Map

## Sources
- `POST /qtn/sources`
- `GET /qtn/sources`
- `GET /qtn/sources/{id}`
- `PUT /qtn/sources/{id}`
- `POST /qtn/sources/{id}/ingest` (trigger ingest)

## Contracts
- `POST /qtn/contracts`
- `GET /qtn/contracts`
- `POST /qtn/contracts/{id}/versions`
- `GET /qtn/contracts/{id}/versions`
- `POST /qtn/contracts/{id}/activate` (version)

## Runs
- `POST /qtn/runspecs`
- `POST /qtn/runs` (start run)
- `GET /qtn/runs/{id}`
- `GET /qtn/runs/{id}/metrics`
- `GET /qtn/runs/{id}/artifacts`

## Quarantine
- `GET /qtn/quarantine` (filters: reason_code, rule_id, source_id, time)
- `GET /qtn/quarantine/{record_id}`
- `POST /qtn/quarantine/{record_id}/annotate`
- `POST /qtn/quarantine/reprocess` (window or selection)

## Policies & Sensitive Data
- `GET /qtn/policies`
- `GET /qtn/sensitive-tags` (aggregations)
