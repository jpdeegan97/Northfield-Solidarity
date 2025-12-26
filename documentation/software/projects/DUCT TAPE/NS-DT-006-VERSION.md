# DT-006 — Versioning

**Project:** Duct Tape Sessions  
**Doc ID:** DT-006  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## What gets versioned
- Build Bundle documents (each deliverable file)
- Bundle as a whole (bundle version)
- Templates used to generate documents
- Pipeline code releases

## Bundle versioning
- **MAJOR.MINOR.PATCH**
  - MAJOR: breaking change in artifact structure or meaning
  - MINOR: additive enhancements (new sections, better synthesis)
  - PATCH: corrections, typos, formatting, minor clarifications

## Artifact IDs
- `session_id`: stable UUID
- `bundle_id`: derived from session_id + timestamp
- `bundle_version`: semver string
- Every exported file includes footer metadata:
  - session_id, bundle_id, version, generated_at

## Deprecation
- Old bundle versions remain accessible per retention rules unless deleted
- “Current” is always the latest delivered version

