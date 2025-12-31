# 004 Lifecycle — NS-APM

## Lifecycle phases

### A) Service onboarding
1. Create **Service** object (owners, upstreams, env mapping)
2. Create **Route(s)** with default-safe policy attached
3. Enable **Telemetry Sink** defaults (LUM)
4. Issue **Consumer + Credential(s)** as needed
5. Deploy config to dev → validate → promote

### B) Change management (routes/policies)
1. Draft change in dev
2. Automated checks (schema, lint, simulation)
3. Canary rollout in stage
4. GGE approval for prod promotion (when required)
5. Gradual rollout + monitoring
6. Auto rollback on regression triggers

### C) Credential lifecycle
- Issue → distribute → monitor usage → rotate → revoke
- Emergency revoke path for abuse/compromise
- Support staged rotation (overlap window)

### D) Incident lifecycle
1. Detect anomaly (LUM alerts; throttle spikes; error rate)
2. Engage emergency controls (global throttle, freeze config)
3. Identify culprit (route/policy/config version)
4. Rollback + verify stabilization
5. Post-incident: add guardrails or adjust defaults

## Decommissioning
- Mark service “deprecated”
- Route becomes “410 Gone” or redirected
- Notify consumers via portal/webhook/email pipeline (if in scope)
- Remove upstream references, archive configs, keep audit trail
