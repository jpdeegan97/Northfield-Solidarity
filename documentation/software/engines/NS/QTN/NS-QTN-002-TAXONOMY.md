# NS-QTN-002-TAXONOMY — Concepts & Vocabulary

## Zones
- **Raw Landing:** immutable copy of source payloads (append-only).
- **Staging:** parsed/decoded (still not trusted).
- **Cleansed:** standardized formats + scrubbed sensitive data.
- **Curated:** contract-pass datasets safe for broad use.
- **Quarantine:** rejected/uncertain records with reason + evidence.

## Contracts
- **Data Contract:** schema + constraints + quality rules + SLA expectations.
- **Schema:** field names/types/structure.
- **Constraints:** required fields, ranges, regex, referential integrity.
- **Quality Rules:** completeness, validity, uniqueness, consistency, timeliness.

## Operations
- **Normalization:** canonicalization of formats and units.
- **Scrubbing:** removing/masking/tokenizing sensitive data.
- **Tokenization:** reversible or irreversible transforms (policy-dependent).
- **Pseudonymization:** replace identifiers with consistent tokens.
- **Deduplication:** remove duplicate records.
- **Entity Resolution:** merge multiple identifiers into one entity.
- **Anomaly Detection:** detect distribution/volume changes.
- **Drift:** long-term distribution shifts that may indicate upstream change.

## Outcomes
- **Promoted:** record passes gates and is written to curated.
- **Quarantined:** record blocked; stored with reason codes.
- **Dropped:** record removed (rare; must be explicit policy + audit).
