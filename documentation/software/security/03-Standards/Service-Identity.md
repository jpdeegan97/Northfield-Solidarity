# Service Identity Standard

## Goal
Every service has a stable, auditable identity and uses it for every call.

## Requirements
- `service_id` is globally unique (e.g., `ns.dre.api`, `ns.aegis.worker`)
- Credentials are short-lived where feasible
- Identity is included in logs and traces

## Preferred mechanisms
- mTLS with per-service certs
- OIDC/JWT with short TTL minted by an internal issuer
