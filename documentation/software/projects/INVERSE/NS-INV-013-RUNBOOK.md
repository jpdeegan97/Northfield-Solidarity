# NS-INV-013-RUNBOOK — Operations Runbook

## Day-1 Checklist
- Define data sources + permissions.
- Configure redaction rules and retention.
- Stand up metadata DB + artifact store.
- Deploy worker + API.
- Add LUM metrics/traces.

## Common Issues
- **Low-quality candidates:** tighten evidence requirements; increase negative sampling.
- **Overconfident outputs:** improve calibration; widen uncertainty bands.
- **PII leakage risk:** strengthen redaction; block high-risk exports.
- **Slow runs:** cache representations; batch vector ops.

## SLO Ideas
- Run completion time per N turns.
- % candidates with evidence links.
- Gate block rate (should be explainable).
- Drift alerts per week.
