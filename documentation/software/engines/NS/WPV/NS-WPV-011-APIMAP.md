# 011 APIMAP

## REST (suggested)

### Ingest
- `POST /wpv/docs` (upload; returns `doc_id`)
- `GET /wpv/docs/{doc_id}`

### Jobs
- `POST /wpv/docs/{doc_id}/process` (start pipeline; options)
- `GET /wpv/jobs/{job_id}`

### Graphs
- `GET /wpv/docs/{doc_id}/graph/semantic`
- `GET /wpv/docs/{doc_id}/graph/math`
- `GET /wpv/docs/{doc_id}/graph/docspan`

### Visuals
- `POST /wpv/docs/{doc_id}/visualize` (generate suite)
- `GET /wpv/docs/{doc_id}/visuals/{suite_id}`
- `GET /wpv/assets/{asset_id}`

### Review
- `POST /wpv/docs/{doc_id}/review/changeset`
- `POST /wpv/docs/{doc_id}/review/apply`

### Export
- `POST /wpv/docs/{doc_id}/export`
- `GET /wpv/exports/{export_id}`

## Auth
- Internal NS auth (service tokens)
- RBAC: viewer/editor/publisher
