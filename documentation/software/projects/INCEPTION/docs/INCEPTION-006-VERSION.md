# INCEPTION-006 — VERSION
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Three version streams
- Generator Version (INCEPTION runtime)
- Template Pack Version (docs/scaffold templates)
- Output Instance Version (generated artifacts)

All use SemVer.

## 2. Breaking changes
- `idea.yaml` schema incompatibility
- required doc sections or file structure changes
- API/contract semantics changes

## 3. Reproducibility stamp
Each run records: generator + template versions, input hash, output hashes, lock hashes.

