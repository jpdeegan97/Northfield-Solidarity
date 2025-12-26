# DT-009 — Implementation

**Project:** Duct Tape Sessions  
**Doc ID:** DT-009  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## MVP scope (4–6 weeks)
### Phase 1 — Manual-friendly MVP
- Booking + intake form
- Consent workflow (signed PDFs)
- Capture checklist (operator)
- Media upload to secure storage
- Transcription service integration
- Doc generation templates (Build Bundle)
- Simple delivery (secure link + zip bundle)
- Minimal audit log

### Phase 2 — Automation improvements
- Job queue for pipeline stages
- Automatic versioning + metadata injection
- Human QA interface (approve/redact/publish)
- Client portal (view/download/history)
- Daily iteration workflow (scope → produce → deliver)

## Reference components
- `dt-intake`: intake + booking service
- `dt-capture`: operator checklist + metadata capture
- `dt-ingest`: upload + checksum + encryption
- `dt-transcribe`: transcription worker
- `dt-synthesize`: structure + bundle generator
- `dt-export`: PDF/docx export worker
- `dt-portal`: delivery UI + access control
- `dt-audit`: audit trail

## Quality gates
- Audio quality check before recording
- Transcript confidence threshold (flag if low)
- Sensitive info redaction pass before publish
- Bundle sanity check: required sections present

## Security gates
- Consent must be “complete” before publish
- Per-client access control
- Time-limited download tokens

