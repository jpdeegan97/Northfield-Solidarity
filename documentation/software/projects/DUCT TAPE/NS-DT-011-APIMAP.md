# DT-011 — API Map

**Project:** Duct Tape Sessions  
**Doc ID:** DT-011  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## Core APIs (internal)
- **Intake API**
  - create intake, update constraints, attach consent docs
- **Session API**
  - schedule, check-in, mark complete
- **Media API**
  - create upload, finalize upload, checksum validate
- **Pipeline API**
  - start job, job status, retry job, publish bundle
- **Bundle API**
  - list bundles, get bundle, download artifact
- **Iteration API**
  - request iteration, attach scope, deliver vX.Y
- **Consent API**
  - record speaker consent, record attendee consent
- **Audit API**
  - log access, log downloads, log deletion events

## Events (recommended)
- `session.scheduled`
- `session.completed`
- `media.uploaded`
- `transcript.ready`
- `bundle.ready`
- `bundle.published`
- `bundle.downloaded`
- `deletion.requested`
- `deletion.completed`

## External integrations
- Payments (Stripe or equivalent)
- Transcription provider(s)
- Storage (S3-compatible)
- Notifications (email/SMS)

