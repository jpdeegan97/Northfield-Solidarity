# 009 IMPL — Implementation Notes (Reference Design)

## Recommended build approach
Implement NS-APM as:
- **Data Plane**: stateless gateway layer (horizontal scaling)
- **Control Plane**: config API + config store + rollout orchestrator
- **Policy Engine**: embedded evaluation (fast path) + cached policy bundles

## Suggested internal modules
- `apm-controlplane-api`
- `apm-config-store`
- `apm-policy-evaluator`
- `apm-rollout-orchestrator`
- `apm-gateway-adapter` (push/pull config, health reporting)
- `apm-telemetry-exporter` (LUM integration)
- `apm-governance-bridge` (GGE change objects)

## Data plane design constraints
- Hot path must be fast: route match + policy evaluation < few ms
- Rate limit storage:
  - local in-memory for burst + shared store for sustained/quota (or fully shared with caching)
  - support per-scope counters (route, consumer, credential)
- Config update:
  - atomic swap of config bundles
  - last-known-good persistence

## Telemetry constraints
- Always include `request_id` and `trace_id`
- Redaction before emit
- Sampling policies configurable per route/environment

## Security constraints
- No plaintext secret storage
- Strict admin API authz (internal only)
- Audit every policy/config change
