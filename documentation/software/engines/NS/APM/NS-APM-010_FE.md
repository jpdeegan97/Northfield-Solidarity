# 010 FE — Developer Portal / UI (Optional)

## Purpose
Provide self-serve onboarding and visibility without requiring direct control-plane API usage.

## Minimal portal features (MVP)
- Register service (name, owners, upstreams)
- Define routes (host/path/method)
- Attach policies (select from templates; request exceptions)
- Issue credentials (API keys) for consumers
- View usage: requests, errors, throttles (from LUM)
- View deployments: config versions and rollout status

## UX principles
- Opinionated defaults
- Clear blast radius indicators (service vs route vs global)
- “Explain this decision” view (why was request throttled/denied)

## Admin-only views
- Global emergency controls
- Policy templates management
- Sensitive redaction profiles
- Approvals (GGE integration surface)
