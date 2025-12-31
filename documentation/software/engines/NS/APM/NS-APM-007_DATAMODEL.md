# 007 DataModel — NS-APM

## Entities

### Service
Fields:
- `service_id` (uuid)
- `name`
- `owners` (team/user ids)
- `environments` (dev/stage/prod enablement)
- `upstreams[]` (targets, weights, health checks)
- `default_policy_id`
- `tags[]` (internal, external, pii, criticality)

### Route
Fields:
- `route_id`
- `service_id`
- `match`:
  - `host`, `path`, `methods[]`, `headers{}`, `query{}`
- `upstream_target` (service upstream selector)
- `version` (api version tag)
- `policy_id` (override)
- `timeouts` / `retries`
- `transforms` (headers, limited body transforms)

### Consumer (Tenant/App)
Fields:
- `consumer_id`
- `tenant_id`
- `name`
- `status` (active/suspended)
- `limits_profile_id`
- `contact` (owner email/alias)
- `metadata` (plan tier, contract id)

### Credential
Fields:
- `credential_id`
- `consumer_id`
- `type` (api_key, jwt_client, mtls_cert_ref)
- `hash_or_ref` (never plaintext)
- `created_at`
- `expires_at`
- `revoked_at`
- `rotation_group`

### Policy
Fields:
- `policy_id`
- `scope` (global/env/service/route/consumer/credential)
- `priority`
- `effective_from` / `effective_to`
- `rules[]` (rate limit, quota, auth, ip allow/deny, size limits, etc.)
- `audit_ref` (GGE change object id)

### TelemetrySink
Fields:
- `sink_id`
- `type` (lum_logs, lum_metrics, lum_traces)
- `sampling`
- `redaction_profile_id`
- `destinations[]`

### Deployment (Config Rollout)
Fields:
- `deployment_id`
- `config_version`
- `environment`
- `status` (canary, rolling, complete, rolled_back)
- `started_at`, `completed_at`
- `health_summary`

## Redaction profiles (critical)
- Header redaction list: `Authorization`, `Cookie`, `Set-Cookie`, etc.
- JSONPath redaction list: `$.password`, `$.token`, `$.ssn`, etc.
- Allowlist mode for high-risk routes.
