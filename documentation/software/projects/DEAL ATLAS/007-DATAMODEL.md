# 007 DATAMODEL

## Core objects

### Institution
- institution_id
- canonical_name
- aliases[]
- type (bank|vc|pe|private_credit|family_office|gov|other)
- parent_id / affiliates[]
- funds[] (fund_id refs)
- headquarters (geo normalized)
- website
- evidence_refs[]

### Fund/Vehicle
- fund_id
- institution_id
- name, vintage_year, strategy_tags[]
- evidence_refs[]

### Deal
- deal_id
- deal_type (debt|equity|m&a|project_finance|structured|grant)
- instrument (term_loan, revolver, series_a, etc.)
- announcement_date
- close_date (optional)
- amount (value + currency + range flags)
- participants:
  - lead_institution_ids[]
  - co_investor_ids[]
  - arranger_ids[]
- counterparty:
  - borrower/issuer/company_id
- terms (optional/public):
  - tenor, rate_spread, collateral, covenants_summary (public only)
- sector_tags[]
- geo (country/state/city)
- sources[] (evidence refs)
- confidence

### Company (Counterparty)
- company_id
- name, aliases[]
- domain
- sector_tags[]
- hq_geo
- evidence_refs[]

### Evidence
- evidence_id
- url or document_id
- captured_at
- content_hash
- extracts[] (snippet + locator + snippet_hash)
- provenance_class (public|licensed|user_provided)
- usage_policy_ref (if licensed)

### Derived Analytics
- aggregates (by year, sector, geo, instrument)
- network edges (institution ↔ institution via syndication; institution ↔ company via deals)
