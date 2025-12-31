# 014 DATADEF

## Key fields in registry

### Institution
- canonical_name, aliases, type
- affiliates/parent
- funds/vehicles
- hq_geo

### Deal
- announcement_date, close_date (if known)
- amount (value + currency; allow ranges)
- deal_type, instrument
- participants (lead, co-investors, arranger)
- counterparty (borrower/issuer/company)
- sector_tags, geo
- key terms (public only; otherwise omit)
- provenance + evidence refs
- confidence

### Analytics (derived)
- deployed_amount_by_year (with caveats)
- counts by instrument/sector/geo
- co-investor network metrics
- repeat counterparty metrics

## Required metadata
- provenance_class (public|licensed|user_provided)
- captured_at
- evidence refs
- confidence score
