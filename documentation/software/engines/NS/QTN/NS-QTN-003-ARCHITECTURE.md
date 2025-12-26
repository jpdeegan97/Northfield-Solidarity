# NS-QTN-003-ARCHITECTURE — System Architecture

## High-Level Components
- **Connector Layer:** pulls from DBs/APIs/files/streams (pluggable).
- **Landing Zone Writer:** writes immutable raw payloads.
- **Parser/Decoder:** converts payload → structured staging rows.
- **Contract Registry:** stores schemas, rules, and versions.
- **Rule Engine:** evaluates constraints + quality rules.
- **Normalizer:** canonicalizes formats/units/enums.
- **Sensitive Data Classifier:** detects PII/PHI/secrets.
- **Scrubber/Tokenizer:** applies policy transforms.
- **Dedup/ER Module:** dedup + entity resolution (optional, domain packs).
- **Anomaly/Drift Monitor:** metrics + alerts (LUM integration).
- **Promotion Controller:** writes curated outputs or routes to quarantine.
- **Audit & Lineage:** immutable logs, before/after hashes, reason codes.

## Data Flow
1. Source ingestion → Raw Landing
2. Parse/Decode → Staging
3. Validate → pass/fail + reason codes
4. Normalize → standardized staging-clean
5. Classify sensitive data → tag fields/rows
6. Apply policy scrubbing → cleansed dataset
7. Dedup/ER (if enabled) → consolidated view
8. Promote to Curated OR route to Quarantine
9. Emit metrics + lineage + audit events

## Integration Points
- **GGE:** policy gates + access controls + retention rules
- **LUM:** metrics, traces, dashboards, alerts
- **DRE:** consumes curated datasets; can request quarantine explanations
- **quickscope (Intervention):** receives state patches on contract changes and drift
