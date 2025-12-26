# INCEPTION-003 — ARCHITECTURE
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Pipeline
INCEPTION is an assembly line with explicit interfaces:

1) **Intake** → `idea.yaml`  
2) **DocGen** → `/docs`  
3) **ScaffoldGen** → `/scaffold`  
4) **MVPGen** → `/mvp`  
5) **Gates** → `/evidence/gates/*`  
6) **Bundle** → zip + manifest

Design choice: each stage is deterministic given inputs + template version.

## 2. Components
### 2.1 Intake Normalizer
- validates `idea.yaml`
- fills defaults using Golden Baseline profiles
- produces `idea.normalized.yaml`

### 2.2 Template Engine
- versioned templates for docs + scaffold
- profile overlays (demo/security/regulated)
- renders required-section checklists

### 2.3 Doc Generator (DocGen)
- renders 000–014 pages
- builds cross-links and index pages
- emits doc completeness metrics

### 2.4 Scaffold Generator (ScaffoldGen)
- creates repo layout and dependency pins
- wires CI/CD templates
- creates contract stubs (OpenAPI/gRPC) aligned to APIMAP

### 2.5 MVP Generator (MVPGen)
- selects 1–3 “happy path” flows
- implements a vertical slice: FE (optional), BE endpoints, persistence, observability, smoke tests

### 2.6 Gates & Evidence
- schema validation (idea + data models)
- contract lint
- unit/smoke tests
- security baseline (secrets check + dependency scan stub)
- reproducibility stamp (versions + hashes)

## 3. Provenance & lineage
Every artifact records:
- input hash
- generator version
- template version
- dependency lock hash

This forms an artifact lineage graph suitable for GGE.

## 4. Projectception: nested instances
Support nesting via:
- `parent_instance_id` links
- scoped secrets / envs per instance
- isolated state segments per instance

Same engine, new namespace → no reinvention.

