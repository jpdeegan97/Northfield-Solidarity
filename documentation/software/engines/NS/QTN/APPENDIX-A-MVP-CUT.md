# Appendix A — Practical MVP Cut (Fastest Path)

## MVP Goal
Establish a universal, reliable **quality gate** that:
- lands immutable raw data
- enforces basic contracts
- scrubs sensitive data per policy
- quarantines failures with clear reason codes
- promotes pass records into curated storage

## MVP Scope
- Source registry (top 3 sources)
- Contract v1 spec + registry + activation
- Batch pipeline: raw → staging → curated/quarantine
- Rule engine: required fields, type checks, regex, range
- Sensitive detection: email/phone/secret-like patterns
- Scrub actions: mask + drop field + tokenize (one method to start)
- Quarantine explorer (basic UI) + reprocess endpoint
- LUM metrics: promoted%, quarantined%, top reason codes

## MVP2
- Drift detection + schema diff automation
- Dedup & entity resolution packs
- Streaming mode
- Advanced sensitive classifiers
- Human review workflows + signed overrides (GGE)
