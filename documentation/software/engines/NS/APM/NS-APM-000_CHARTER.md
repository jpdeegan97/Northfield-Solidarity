# 000 Charter — NS-APM

## Mission
Provide a centrally managed API gateway + control plane for Northfield Solidarity that enforces consistent **policy** (rate limits, quotas, auth requirements, safety controls) and emits standardized **telemetry** (logs/metrics/traces) for every NS API.

## Why it exists
NS operates multiple engines/services that evolve quickly. Without a shared front door, we risk:
- inconsistent authentication and rate-limiting
- fragmented observability
- ad-hoc routing/versioning
- hard-to-audit production changes

NS-APM creates a uniform, governable layer that makes every API “safe by default”.

## Principles
- **Default-safe**: sane baselines apply automatically; exceptions must be explicit.
- **Governable**: all policy is auditable, reviewable, reversible (GGE-backed).
- **Simple onboarding**: registering a service should be fast and repeatable.
- **Observable by design**: telemetry is part of the contract.
- **Separation of concerns**: gateway enforces coarse policy; services enforce domain/business authorization.

## Scope
- Northbound traffic management for NS APIs (internal + external).
- Policy, routing, and telemetry standardization.
- Optional developer portal for self-serve onboarding and visibility.

## Out of scope (for now)
- Full service-mesh replacement.
- Full API monetization/marketplace.
- Deep business-permission logic (remains in services).

## Stakeholders
- Platform: operates gateway/control plane.
- Service teams: onboard services, own upstream correctness.
- Security/Governance: policy review, audits, emergency controls.
- Product/External consumers: stable APIs, predictable limits.

## Success metrics
- % of NS APIs routed through NS-APM
- Time-to-onboard a new service (target: < 30 minutes)
- Incident reduction attributable to consistent policy/telemetry
- Mean time to detect (MTTD) & rollback config regressions
