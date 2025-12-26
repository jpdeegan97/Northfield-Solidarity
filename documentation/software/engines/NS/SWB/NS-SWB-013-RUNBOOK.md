# NS-SWB-013-RUNBOOK — Operations Runbook

Day-1: deploy API/workers; define envelope; populate registry (fast/balanced/strong + redundancy); integrate GGE gate; integrate LUM; configure fallbacks; enable deterministic mode.

SLOs: p95 latency by task+tier; success rate; fallback rate; policy block rate; cost per successful request.

Incidents:
- Misrouting: inspect classification/plan; adjust rules; add verification step.
- Provider outage: auto-switch fallback; disable profile; postmortem update reliability/weights.
- Policy near-miss: block + quarantine logs; fix gate/transforms; add tests.

Emergency controls: disable external providers for Restricted; force Verified for certain callers; lock routing to pinned model.
