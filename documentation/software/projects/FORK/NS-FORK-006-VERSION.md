# NS-FORK-006-VERSION — Versioning & Compatibility

## Versioned Assets
- Menu generation rules + scoring weights
- Recipe catalog + nutrition mappings
- Ingredient normalization dictionary (SKU mapping, units)
- Procurement adapters (per partner API)
- Marketplace policies (vetting requirements, service rules)

## Compatibility Rules
- API is backward compatible for N-1 versions.
- Menu plans are immutable snapshots; edits create a new version.
- Cart strategies re-price on refresh; snapshots retain original quote metadata.
