# 011 APIMAP

## REST API (suggested)

### Lead pipeline
- POST /hp/leads/ingest
- POST /hp/leads/{id}/process
- GET  /hp/business/{id}
- GET  /hp/business/{id}/evidence
- POST /hp/business/{id}/brief
- POST /hp/business/{id}/score
- POST /hp/business/{id}/approve
- POST /hp/export

### Compliance
- POST /hp/contacts/{id}/opt_out
- POST /hp/contacts/{id}/suppress
- GET  /hp/suppression/check?identity=

### CWP (baked in)
- POST /hp/business/{id}/cwp/report          (Company Report)
- POST /hp/business/{id}/cwp/personnel-map   (Personnel Map)
- POST /hp/business/{id}/cwp/timeline        (Conversion Timeline)
- POST /hp/cwp/timeline/{timeline_id}/assets/draft
- POST /hp/cwp/timeline/{timeline_id}/activate
- POST /hp/cwp/timeline/{timeline_id}/pause
- POST /hp/cwp/timeline/{timeline_id}/events (touch/reply/meeting/etc.)
