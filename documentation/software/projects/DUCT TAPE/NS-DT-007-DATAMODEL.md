# DT-007 — Data Model

**Project:** Duct Tape Sessions  
**Doc ID:** DT-007  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## Entities
### Client
- client_id
- name, contact methods
- organization (optional)
- billing profile

### Session
- session_id
- client_id
- scheduled_at, location (physical/remote)
- session_type (taxonomy)
- facilitator_id
- attendee list (optional)
- consent_status (speaker + attendees)
- capture_metadata (devices, settings, checksums)

### MediaAsset
- media_id
- session_id
- type (audio/video)
- storage_uri
- checksum
- duration
- encryption metadata

### Transcript
- transcript_id
- session_id
- provider + model/version
- diarization (boolean)
- text + timestamps (optional)
- confidence metrics

### Bundle
- bundle_id
- session_id
- version
- generated_at
- artifact list (Artifact references)
- delivery_status

### Artifact
- artifact_id
- bundle_id
- type (requirements, roadmap, etc.)
- format (md/pdf/docx)
- storage_uri
- checksum

### IterationDay
- iteration_id
- session_id
- date
- scope notes
- outputs (bundle versions)

### IPAgreement
- agreement_id
- session_id
- posture (client-owned / license / buyout)
- signed_at
- terms reference

### AuditEvent
- event_id
- actor
- action (upload/download/view/delete)
- timestamp
- session_id/bundle_id (optional)

## Relationships
- Client 1—N Session
- Session 1—N MediaAsset / Transcript / Bundle
- Bundle 1—N Artifact
- Session 0—N IterationDay
- Session 0—1 IPAgreement

