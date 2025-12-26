# NS-QTN-006-VERSION — Versioning & Compatibility

## Versioned Assets
- Contract definitions (schema + rules + severity)
- Normalization dictionaries (enums, units, timezone policies)
- Sensitive data classifiers (patterns/models)
- Scrubbing/tokenization policies
- Dedup/ER rulesets
- Pipeline run specs

## Compatibility
- Contracts are immutable snapshots; changes create a new version.
- Pipelines can run against a pinned contract version.
- Curated datasets include metadata: contract_version, pipeline_version, run_id.

## Reprocessing
- Reprocessing is a first-class operation:
  - select run_id range or time window
  - rerun with new contract version
  - produce new curated version with lineage links
