# NS-QTN-005-DECISION — Product & Design Decisions

## Default Decisions
- **Raw is immutable**: never mutate landing zone.
- **No silent drops**: quarantines must include reason codes.
- **Policy-first sensitive handling**: scrub/tokenize before broad storage and export.
- **Version everything**: schemas, contracts, rules, transforms, code.
- **Idempotent processing**: re-run pipelines safely.

## Configurable Decisions
- Tokenization strategy: reversible vs irreversible (per policy).
- Dedup/ER level: none, basic, advanced domain pack.
- Strictness modes:
  - *Strict:* block on any contract violation
  - *Lenient:* quarantine only high-severity violations; pass with warnings
- Storage strategy: lakehouse tables, parquet, relational, or hybrid.

## Promotion Rules
- Promote only if:
  - schema valid
  - required fields present (within thresholds)
  - sensitive fields handled per policy
  - uniqueness/consistency checks pass
- Otherwise route to quarantine with:
  - failing rule ids
  - sample evidence (safe)
  - suggested remediation
