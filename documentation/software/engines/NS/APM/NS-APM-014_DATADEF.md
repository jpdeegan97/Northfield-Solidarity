# 014 DataDef — Telemetry & Contract Definitions

## Request log schema (minimum)
- `timestamp`
- `request_id`
- `trace_id`
- `span_id` (if available)
- `env`
- `service`
- `route_id`
- `method`
- `path_template` (avoid raw PII in paths)
- `status`
- `latency_ms`
- `bytes_in`
- `bytes_out`
- `consumer_id` / `tenant_id` (when known)
- `credential_id` (hashed/ref)
- `throttled` (bool)
- `policy_id` (decision source)
- `upstream` (target id)
- `upstream_latency_ms`
- `error_class` (timeout/reset/deny/etc.)

## Metrics (suggested)
- `apm_requests_total{service,route,status_class}`
- `apm_request_latency_ms_bucket{service,route}`
- `apm_throttles_total{service,route,scope}`
- `apm_denies_total{service,route,reason}`
- `apm_upstream_errors_total{service,route,error_class}`
- `apm_config_version{gateway_instance}` (gauge)
- `apm_config_sync_lag_seconds{gateway_instance}` (gauge)

## Tracing contract
- Ingress generates/propagates W3C `traceparent` (preferred)
- Add `request_id` header if missing
- Tag spans with `service`, `route_id`, `consumer_id` where safe

## Redaction rules
- Always redact headers: `Authorization`, `Cookie`, `Set-Cookie`, `X-Api-Key`
- JSON/body redaction via JSONPath allow/deny lists
- Prefer logging **templates** not raw values (especially for paths/query)

## Data retention (policy suggestion)
- Logs: 7–30 days depending on env and sensitivity
- Metrics: 30–180 days
- Traces: sampled; 7–14 days typical
