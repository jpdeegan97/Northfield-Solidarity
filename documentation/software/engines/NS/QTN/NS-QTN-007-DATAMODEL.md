# NS-QTN-007-DATAMODEL — Data Model

## Core Entities

### Sources & Ingestion
- **Source**(id, type, connection_ref, owner, tags, created_at)
- **IngestJob**(id, source_id, schedule, mode, status)
- **RawObject**(id, source_id, uri, checksum, received_at, metadata)

### Contracts & Rules
- **Contract**(id, name, domain, status, created_at)
- **ContractVersion**(id, contract_id, version, schema_json, rules_json, activated_at)
- **Rule**(id, contract_version_id, name, severity, predicate, description)

### Pipeline Runs
- **RunSpec**(id, source_id, contract_version_id, transforms_pinned, outputs, strictness)
- **PipelineRun**(id, runspec_id, status, started_at, finished_at, stats_json)

### Records & Outcomes (logical model; physical may be tables/files)
- **StagingRecord**(run_id, record_id, payload_ref, parsed_json, parse_status)
- **CleansedRecord**(run_id, record_id, normalized_json, sensitive_tags, transform_notes)
- **CuratedRecord**(run_id, record_id, curated_json, quality_score, contract_version)

### Quarantine
- **QuarantineRecord**(run_id, record_id, stage, reason_codes[], failing_rules[], sample_evidence_ref)
- **ReasonCode**(code, category, severity, description)

### Sensitive Data
- **SensitiveTag**(id, record_id, field_path, class, confidence, detector)
- **TokenMapping**(id, token, original_hash, policy, created_at) *(if reversible tokenization)*

### Observability & Audit
- **DQMetric**(run_id, metric_name, value, dimensions, timestamp)
- **AuditLog**(id, actor, action, object_ref, timestamp, diff)
- **LineageEdge**(from_ref, to_ref, transform_id, run_id)
