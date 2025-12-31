# 008 EEE — Events, Errors, Escalations

## Events (what we emit)
- `apm.gateway.request` (structured request log)
- `apm.gateway.throttle` (rate limit hit)
- `apm.gateway.deny` (policy deny)
- `apm.gateway.upstream_error` (connect/reset/timeout)
- `apm.config.deploy` (config rollout started/completed/rolled back)
- `apm.credential.rotate` (rotation events)
- `apm.security.alert` (suspicious traffic patterns)

## Errors (common categories)
### Client-side (4xx)
- 400: malformed request / schema violation (optional strict mode)
- 401: missing/invalid credentials
- 403: policy deny (ip allowlist, scope mismatch)
- 404: no route match
- 408: request timeout
- 413: payload too large
- 415: unsupported media type
- 429: throttled (rate/quotas)

### Server-side (5xx)
- 502: bad gateway / upstream connect failure
- 503: upstream unavailable or circuit-open
- 504: upstream timeout
- 500: internal gateway fault (should be rare)

## Escalations (who gets paged)
- Platform/SRE on:
  - gateway health degradation
  - widespread 5xx increase
  - config rollout failures/auto rollbacks
- Security/Governance on:
  - abnormal auth failures across many consumers
  - suspected credential compromise
  - volumetric abuse exceeding thresholds
- Service owners on:
  - upstream-specific failures (route/service scoped)

## Severity mapping (suggested)
- Sev0: broad outage (many services down) or security incident in progress
- Sev1: major service/API degraded
- Sev2: single-route degradation or throttling misconfig
- Sev3: minor issues / customer-reported anomalies

## Immediate mitigations
- Activate emergency policy (tighten global throttles)
- Freeze promotions/config changes
- Rollback to last-known-good config
- Revoke suspected credentials
