# 003 Architecture — NS-APM

## High-level topology
Clients → Edge Gateway → Policy Engine → Upstream Services  
              ↘ Telemetry → LUM  
Control Plane → Config Distribution → Gateways  
Governance → GGE (approval/audit) → Promotion gates

## Components

### 1) Edge Gateway (Data Plane)
Responsibilities:
- TLS termination
- request normalization (headers, ids)
- routing (host/path/method/headers)
- rate limiting + quotas
- coarse auth checks (key/JWT presence/validity; optional OIDC introspection)
- request size limits, basic WAF-ish checks
- telemetry emission (structured logs, metrics, traces)

### 2) Control Plane
Responsibilities:
- config registry (services/routes/policies/telemetry sinks)
- config versioning + diff
- rollout orchestration (canary → full)
- rollback automation

### 3) Policy Engine
Responsibilities:
- evaluate request context (consumer, route, token claims, IP, geo)
- compute enforcement decision (allow/deny/throttle/shadow-log)
- provide explainability metadata for audits and debugging

### 4) Telemetry Pipeline (LUM)
- logs (structured; redaction-aware)
- metrics (golden signals)
- traces (propagation + sampling policies)

### 5) Optional Developer Portal
- service onboarding
- credential issuance/rotation
- usage dashboards
- API docs publication hooks

## Integration points (NS ecosystem)
- **LUM**: canonical observability platform
- **GGE**: governance objects for policy change/audit/approval
- **quickscope**: stateful rollout controls (freeze, emergency mode)
- **NS-AEGIS**: dependency controls for gateway plugins and onboarding gates
- **Switchboard**: upstream selection for model endpoints / dynamic routing use cases (optional)
