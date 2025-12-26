# DT-012 — State

**Project:** Duct Tape Sessions  
**Doc ID:** DT-012  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## Session state machine
- `DRAFT` → created, not scheduled
- `SCHEDULED` → time booked
- `CHECKED_IN` → on-site/remote setup started
- `RECORDING` → capture in progress
- `CAPTURED` → recording complete
- `UPLOADING` → media ingest in progress
- `PROCESSING` → pipeline running
- `QA` → human review/redaction
- `PUBLISHED` → bundle delivered
- `CLOSED` → engagement complete
- `DELETED` → all assets deleted (where applicable)

Allowed transitions are strictly controlled (e.g., cannot publish without consent).

## Bundle state machine
- `GENERATING` → pipeline synthesizing
- `READY_FOR_QA` → synthesis complete
- `QA_APPROVED` / `QA_REJECTED`
- `PUBLISHED`
- `SUPERSEDED` (newer version exists)
- `ARCHIVED` / `DELETED`

## Deletion state
- `REQUESTED` → `IN_REVIEW` → `EXECUTING` → `CONFIRMED`

