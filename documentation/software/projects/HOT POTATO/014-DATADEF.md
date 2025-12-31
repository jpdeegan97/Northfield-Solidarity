# 014 DATADEF

## Requested fields (mapped safely)

### Business (Tier 0)
- business_name
- business_address
- business_phone (public listing)
- website/domain
- years_in_business (derived + confidence)
- industry tags (NAICS/SIC)
- purpose_summary (“what they do”)

### Owner/Leadership (Tier 1; public + evidenced only)
- owner name / leadership names/titles (official sources only)

### Contacts (Tier 2; lawful public/consented only)
- email_address (must cite source; honor opt-out)
- direct_phone (must cite source; honor opt-out)

### Funding / Opportunity (public or opt-in)
- purpose_of_funding (public statement or self-reported)
- requested_amount (public statement or self-reported)

### Sensitive / Regulated (Tier 3; restricted; disabled by default)
- credit_score (self-reported + explicit consent only)
- bankruptcy (lawful public record only with case/date/source; lawful use limits)

## CWP-specific fields
### Company Report
- intent signals timeline (cited)
- constraints and buying triggers (cited or labeled hypothesis)
- recommended angles (operator editable)

### Personnel Map (professional-only)
- stakeholder roles (buyer/champion/etc.)
- contact paths (sequence suggestions)
- communication strategy hypotheses must be non-sensitive and editable

## Required metadata
source_ref, captured_at, confidence, sensitivity_tier
