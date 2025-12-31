# 012 State — Runtime & Control State

## State categories

### A) Desired state (control plane)
- Services, routes, policies, consumers, telemetry sinks
- Stored in config store (source of truth)
- Versioned into immutable config bundles (`config_version`)

### B) Effective state (gateways)
- Last applied config bundle
- Local caches (route tables, policy compiled form)
- Health data (upstream status, circuit breaker state)

### C) Operational state
- Rollout status (canary/rolling/complete)
- Alerts and incident flags
- Emergency mode toggle

### D) Usage state
- Rate limit counters (burst + sustained)
- Quota counters (daily/monthly)
- Optionally stored in shared datastore with TTL + aggregation

## State transitions (key)
- Draft config → validate → stage canary → stage full → prod canary → prod full
- Emergency mode overrides precedence and may clamp counters/limits
- Rollback restores previous config bundle (last-known-good)
