# Secure RPC Policy Examples

## Example scopes
- `aegis:read`
- `aegis:write`
- `dre:ingest`
- `gge:policy:apply`

## Example allowlist
- `ns.dre.api` → `ns.aegis.api` allowed: `aegis:read`
- `ns.gge.api` → `ns.*` allowed: `policy:validate`, `policy:apply` (restricted)
