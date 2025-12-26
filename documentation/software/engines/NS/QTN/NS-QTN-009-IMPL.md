# NS-QTN-009-IMPL — Implementation Notes

## Reference Architecture (practical)
- **API Service:** manages sources, contracts, run specs, status
- **Worker Fleet:** executes parsing, rules, transforms, dedup, exports
- **Metadata Store:** Postgres for contracts, runs, audits
- **Object Store:** raw payloads, staged files, curated parquet, quarantine artifacts
- **Compute:** containerized jobs (batch) + optional stream mode
- **Indexing:** optional search over quarantine samples and schema diffs

## Processing Modes
- **Batch** (default): periodic pulls or file drops
- **Streaming**: event streams with windowed quality gates

## Rule Engine
- Start with a declarative ruleset:
  - required fields
  - type coercion rules
  - regex/pattern constraints
  - referential checks (lookup tables)
- Add custom rules via plugins.

## Sensitive Data Handling
- Detectors:
  - regex (email/phone/SSN-like)
  - dictionaries (known secret prefixes)
  - ML classifiers (optional)
- Actions:
  - mask (***)
  - drop field
  - tokenize (consistent)
  - encrypt (policy-based)

## Dedup & ER
- Baseline:
  - exact match keys
  - windowed dedup (time + keys)
- Advanced:
  - fuzzy matching + survivorship rules
  - entity graph merges (requires governance)

## Performance Tips
- Columnar formats for curated zones.
- Vectorized transforms; minimize row-by-row python loops.
- Cache reference tables and dictionaries.
- Partition by time/source/contract_version.

## Testing
- Golden datasets per contract version.
- Regression suites for sensitive detectors.
- Chaos tests for upstream schema changes.
