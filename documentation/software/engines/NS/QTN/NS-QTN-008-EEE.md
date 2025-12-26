# NS-QTN-008-EEE — Events, Entities, Edges

## Entities
Source, IngestJob, RawObject  
Contract, ContractVersion, Rule  
RunSpec, PipelineRun  
StagingRecord, CleansedRecord, CuratedRecord  
QuarantineRecord, SensitiveTag, TokenMapping

## Events
- `source.registered`
- `ingest.job.started`
- `raw.landed`
- `contract.activated`
- `pipeline.run.started`
- `record.parsed`
- `record.validated`
- `record.normalized`
- `record.scrubbed`
- `record.promoted`
- `record.quarantined`
- `drift.detected`
- `policy.violation.blocked`

## Graph Edges (for governance/lineage graphs)
- (Source) —EMITS→ (RawObject)
- (Contract) —HAS_VERSION→ (ContractVersion)
- (ContractVersion) —ENFORCES→ (Rule)
- (PipelineRun) —USES→ (ContractVersion)
- (PipelineRun) —PRODUCES→ (CuratedDataset)
- (PipelineRun) —QUARANTINES→ (QuarantineDataset)
- (Record) —TAGGED_AS→ (SensitiveClass)
- (Dataset) —DERIVED_FROM→ (Dataset)
