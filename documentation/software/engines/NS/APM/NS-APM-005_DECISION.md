# 005 Decision — NS-APM

## Decision areas (what NS-APM standardizes)
1. **Ingress standard**: how clients enter NS APIs (domains, TLS, headers)
2. **Policy precedence**: which rules win when scopes conflict
3. **Telemetry contract**: what gets logged/measured/traced, and how PII is handled
4. **Promotion gates**: when approvals are required (GGE integration)
5. **Failure posture**: fail-open vs fail-closed by category

## Recommended defaults

### Policy precedence (highest to lowest)
1. Emergency/global kill switch
2. Environment overrides
3. Service policy
4. Route policy
5. Consumer/tenant policy
6. Credential/token policy

### Fail posture defaults
- **Auth validation failures**: fail-closed
- **Rate limit storage outage**: fail-open for internal-only routes; fail-closed for external routes (configurable)
- **Telemetry sink outage**: do not block requests; buffer/drop with counters
- **Config plane outage**: gateways continue with last-known-good config

### Default-safe baselines
- request size limit (global)
- content-type allowlist per route
- baseline rate limit per route
- structured logging + trace propagation always on
- PII redaction policies applied by default

## Decision records (template)
Each major architectural decision should be captured with:
- Context
- Options considered
- Decision
- Consequences (tradeoffs)
- Rollback plan
- Owner + date
