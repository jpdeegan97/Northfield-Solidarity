# NS-QTN-001-OVERVIEW — Overview

## What QTN does
Quarentine provides a universal “cleansing bubble” (quality gate) for every data source:
- **Ingest raw** data (unchanged, append-only)
- **Validate** against contracts and schemas
- **Normalize** types, formats, units, and reference values
- **Scrub** sensitive fields (PII/PHI/secrets) per governance policies
- **Deduplicate & resolve** identities where applicable
- **Detect anomalies/drift** and alert
- **Promote** good data to curated zones
- **Quarantine** uncertain/bad data with reasons and evidence

## Where QTN sits
**Sources → Ingest (Raw Landing) → QTN (Cleanse + Gate) → Curated Storage → Downstream Engines**

## Output products
- Cleansed datasets (staging-clean)
- Curated datasets (contract-pass)
- Quarantine datasets (failed/uncertain with reason codes)
- Data quality metrics dashboards (LUM)
- Lineage graphs + audit logs (GGE + platform logs)
