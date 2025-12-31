# 002 Taxonomy — NS-APM

## Core nouns
- **Gateway (Data Plane)**: request/response handling at the edge (TLS termination, routing, enforcement).
- **Control Plane**: stores desired configuration and distributes it to gateways.
- **Policy**: a first-class object describing enforcement rules and precedence.
- **Service**: a named upstream system behind the gateway (one or more upstream targets).
- **Route**: a match rule (host/path/method/headers) mapped to a service target/version.
- **Consumer**: an identity representing a tenant/customer/app.
- **Credential**: API key/JWT client identity material used by consumers.
- **Environment**: dev/stage/prod separation (isolated config + isolated gateway clusters).
- **Telemetry Sink**: destination configuration for logs/metrics/traces (LUM).
- **Deployment (Config Rollout)**: a versioned push of control-plane config to gateways.

## Policy scopes
- **Global**: applies everywhere (emergency controls, global defaults)
- **Environment**: dev/stage/prod overrides
- **Service**: defaults for a service
- **Route**: specific endpoint rules
- **Consumer/Tenant**: per-customer limits and allowlists
- **Credential/Token**: per-key exceptions

## Common adjectives
- **Default-safe**: baseline limits + size constraints + telemetry always on
- **Promotion**: dev → stage → prod policy/config movement
- **Canary**: partial rollout for config or routing
