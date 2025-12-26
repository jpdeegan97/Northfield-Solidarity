# NS-QTN-012-STATE — State Model

## State Machines

### PipelineRun
`CREATED → RUNNING → (SUCCEEDED | PARTIAL | FAILED)`

### Record Outcome
`RECEIVED → PARSED → VALIDATED → TRANSFORMED → (PROMOTED | QUARANTINED | DROPPED)`

### ContractVersion
`DRAFT → TESTED → ACTIVE → DEPRECATED → RETIRED`

### Quarantine Record
`OPEN → TRIAGED → (REPROCESSED | OVERRIDDEN | DISMISSED | ARCHIVED)`

## Integration with Governance & State
- **GGE** provides:
  - sensitive data classes and allowed actions per class
  - retention policies per dataset classification
  - access control policies for previews/exports
- **quickscope** receives state patches:
  - contract activated/deprecated
  - drift detected
  - promotion blocked due to policy violation
