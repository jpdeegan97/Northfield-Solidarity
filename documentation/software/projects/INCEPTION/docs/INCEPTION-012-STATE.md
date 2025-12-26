# INCEPTION-012 — STATE
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. State domains
- Run State: stage progress, logs, gate results
- Instance State: current version, parent link, active profile
- Template State: active template pack versions
- Registry State: published instances and artifacts (optional)

## 2. Storage options
- filesystem (MVP)
- Postgres + object storage (standard)
- GGE graph persistence for lineage (optional)

## 3. Idempotency & concurrency
- run creation uses idempotency keys
- artifacts are content-addressed (hash-based paths recommended)
- batch runs enforce quotas and parallelism limits

