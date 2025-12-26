# INCEPTION-011 — APIMAP
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Public API (service mode)
- `POST /runs` → create run
- `GET /runs/{run_id}` → status
- `GET /runs/{run_id}/artifacts` → list artifacts
- `GET /artifacts/{artifact_id}/download` → download artifact/bundle
- `POST /instances/{instance_id}/delta` → apply delta update

## 2. AuthN/AuthZ
- operator token (studio)
- service token (batch)
- scoped permissions per instance

