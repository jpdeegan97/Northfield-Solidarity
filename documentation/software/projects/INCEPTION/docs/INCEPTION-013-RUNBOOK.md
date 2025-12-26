# INCEPTION-013 — RUNBOOK
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Quick actions
### Generate a new bundle
1. validate `idea.yaml`
2. run generator
3. verify gates
4. export bundle
5. deliver

### Apply a delta
1. create `delta.yaml`
2. patch run
3. review diff summary
4. re-run smoke tests
5. export new bundle

## 2. Common failures
- schema fail → missing idea fields; check normalizer report
- contract lint fail → APIMAP mismatch; regenerate contract stubs
- smoke test fail → shrink scope to 1 happy path and re-run

## 3. Security basics
- verify outputs contain no secrets (references only)
- ensure dependency locks are pinned
- preserve evidence bundles for audit

