# INCEPTION-009 — IMPL
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Delivery shapes
- CLI: `inception generate --idea idea.yaml`
- Service: Studio Mode UI + API
- Pipeline step: Batch Mode in CI/CD

## 2. Determinism tactics
- normalize YAML (sorted keys)
- pin template pack versions
- pin dependencies and emit lock hashes
- avoid injecting unstable timestamps into content (offer a “stable mode”)

## 3. Gates (recommended defaults)
- idea schema validation (hard fail)
- contract lint (hard fail)
- smoke tests (hard fail)
- secrets scan (hard fail)
- dependency scan (warn/fail by profile)
- docs completeness (warn/fail by profile)

