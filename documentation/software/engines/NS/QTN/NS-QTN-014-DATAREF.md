# NS-QTN-014-DATAREF — Data References & Interfaces

## Supported Inputs
- Relational DBs (Postgres, MySQL, SQL Server, Oracle)
- NoSQL (MongoDB, DynamoDB)
- Object storage (CSV/JSON/Parquet)
- Event streams (Kafka, Kinesis)
- SaaS APIs (CRM, ticketing, payments)

## Output Interfaces
- Curated tables/files (parquet/iceberg/delta or relational)
- Quarantine artifacts (partitioned by reason codes)
- Metrics streams (LUM)
- Governance exports:
  - lineage edges
  - policy gate outcomes
  - dataset classification labels

## Contract Spec (minimum)
- Schema definition (fields/types)
- Required fields and allowed null thresholds
- Valid ranges/patterns
- Uniqueness keys (if any)
- Referential checks (lookups)
- Sensitive field expectations + allowed actions
- Severity mapping + promotion rules

## Reason Code Categories (starter set)
- `SCHEMA_MISMATCH`
- `TYPE_COERCION_FAILED`
- `REQUIRED_FIELD_MISSING`
- `RANGE_VIOLATION`
- `REGEX_VIOLATION`
- `REFERENTIAL_MISSING`
- `DUPLICATE_RECORD`
- `SENSITIVE_POLICY_BLOCK`
- `ANOMALY_DETECTED`
