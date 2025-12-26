# DT-013 — Runbook

**Project:** Duct Tape Sessions  
**Doc ID:** DT-013  
**Version:** v1.0  
**Status:** Draft  
**Last Updated:** December 24, 2025

---
## Daily operations checklist
- Verify today’s sessions + consent packets
- Test capture kit (battery, storage, mic levels)
- Confirm secure upload path works
- Monitor pipeline queue health
- Validate portal delivery for completed sessions

## Incident: failed upload
1) Confirm local encrypted copy exists
2) Retry upload with resumable mode
3) If still failing, switch network or alternate endpoint
4) Record incident in audit log
5) Notify client if SLA impact

## Incident: low transcript quality
1) Check audio source (mic, noise, clipping)
2) Re-run transcription with alternate model/provider
3) If still low, do a targeted human correction pass
4) Flag bundle sections with uncertainty where necessary

## Incident: consent dispute
1) Freeze publishing immediately
2) Lock access links (revoke tokens)
3) Review signed consents + session notes
4) If needed, delete assets per policy
5) Document outcome; update process to prevent recurrence

## Privacy actions
### Deletion request
- Verify requester identity
- Confirm what must be deleted (media, transcript, bundles)
- Execute deletion workflow
- Provide confirmation receipt (timestamp + scope)

### Redaction request
- Create new bundle version with redacted content
- Supersede previous version in portal
- Preserve audit history

## Security actions
- Rotate storage access tokens periodically
- Review access logs weekly
- Ensure least privilege on operator accounts

