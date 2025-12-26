# INCEPTION-007 — DATAMODEL
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Entities
- **Idea**: canonical intake.
- **Run**: one execution record (versions, hashes, gate results).
- **Instance**: a namespaced generated project (supports parent/child nesting).
- **Artifact**: docs/scaffold/mvp/evidence/bundle outputs with hashes.
- **Decision**: immutable decision record tied to artifacts.

## 2. Relationships
- Idea → Run (1..n)
- Run → Artifact (1..n)
- Instance → Artifact (1..n)
- Instance → Instance (parent/child)

