# Pre-Production Release Checklist

- All endpoints behind TLS
- AuthZ tests for critical actions
- Rate limits on auth & expensive endpoints
- CI passed: SAST + dependency scan + image scan
- Artifacts verified (signatures if enabled)
- Rollback plan documented
- Monitoring and alerts configured
- Backups verified (restore test recently)
