# 011 APIMAP

## REST (suggested)

### Institutions
- POST /da/institutions
- GET  /da/institutions/{id}
- GET  /da/institutions/search?q=
- POST /da/institutions/{id}/verify

### Deals
- POST /da/deals/ingest (csv/doc/url)
- GET  /da/deals/{id}
- GET  /da/deals/search (facets)
- POST /da/deals/{id}/refresh (re-extract)

### Backfill / Monitoring
- POST /da/backfill
- GET  /da/jobs/{job_id}
- POST /da/monitoring/enable

### Analytics
- GET /da/analytics/institution/{id}
- GET /da/analytics/cohorts
- GET /da/analytics/network

### Evidence
- GET /da/evidence/{evidence_id}
