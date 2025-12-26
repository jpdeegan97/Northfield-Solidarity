# DT-003 — Architecture

**Project:** Duct Tape Sessions  
**Doc ID:** DT-003  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## System view
Duct Tape consists of two coordinated systems:
1) **Experience system** (people + process): facilitation, consent, capture
2) **Processing system** (software): pipeline that converts raw media into artifacts

## Components
### A) Booking & intake
- Intake form: objective, constraints, audience count, deliverable preferences
- Scheduling + payment capture
- Consent packet pre-sign (speaker + attendees)

### B) Capture layer
- Audio: primary lav or shotgun mic + backup recorder
- Video: single camera MVP; dual angle optional
- Time sync: clap sync or shared timestamp
- Storage: encrypted local + immediate secure upload

### C) Processing pipeline (MVP)
1) **Ingest**: upload to secure store, generate media checksum
2) **Transcribe**: speech-to-text with diarization (if needed)
3) **Structure**: segment into themes, claims, goals, constraints
4) **Synthesize**: produce Build Bundle documents
5) **QA**: human pass for coherence, sensitive info redaction
6) **Publish**: generate client portal package + export formats
7) **Iterate**: daily enhancement loop, versioned artifacts

### D) Delivery
- Secure portal link (time-limited)
- Downloadable bundle: PDF/MD/Docx optional
- Optional live walkthrough call

## Data and security
- Encryption at rest and in transit
- Strict access control: least privilege
- Retention defaults + deletion on request
- Audit logs for access + downloads

## Observability (for the pipeline)
- Job IDs: ingestion_id, transcription_id, bundle_id
- Metrics: time-to-transcript, time-to-bundle, failure rates
- Tracing: per-session pipeline spans
- Alerts: stuck jobs, failed uploads, export failures

## Scalability path
MVP: single-node pipeline + manual QA  
Scale: queue-based worker system (transcribe workers, synth workers, export workers)  
Enterprise: multi-tenant portal + SSO + compliance features

