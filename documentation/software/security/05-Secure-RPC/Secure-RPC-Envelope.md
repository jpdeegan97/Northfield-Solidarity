# Secure RPC Envelope (NS Primitive)

## Why
Engine-to-engine calls are the highest leverage risk surface. Secure RPC makes them consistent.

## Contract (minimum)
Every request includes:
- `caller_service_id`
- `trace_id`
- `issued_at`, `expires_at`
- `scopes[]`
- replay protection (nonce or jti)

## AuthN options
- mTLS (preferred for internal mesh)
- short-TTL JWT minted by issuer (practical for early)

## AuthZ
- allowlists by service + action scope
- explicit deny-by-default

## Audit
Log allow/deny:
- caller, callee, action, decision, reason, trace_id

## Failure behavior
- return generic errors outward
- include trace_id for debugging
- never leak internal policy structure to untrusted callers
