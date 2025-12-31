# 006 Version — NS-APM

## Versioning model
NS-APM has two primary version dimensions:

1) **Engine version** (implementation/runtime)
- Tracks releases of the gateway/control-plane software and plugins
- Example: `ns-apm-engine 0.3.0`

2) **Config version** (desired state)
- Immutable snapshots of the control-plane configuration
- Example: `config_version 2025.12.29.001`

## Semantic versioning (engine)
- MAJOR: breaking changes to APIs, config schema, or behavior
- MINOR: backward-compatible features
- PATCH: bug fixes and security fixes

## Config promotion
- Dev config versions can be frequent
- Stage promotions are canary-validated
- Prod promotions require:
  - lint + simulation checks
  - canary rollout
  - (optionally) GGE approval based on risk class

## Compatibility guarantees
- Control plane must support last N gateway versions (recommended N=2) for safe rolling upgrades.
- Config schema changes require migration tooling and “read-old/write-new” windows.

## Current doc pack build
- Generated on: 2025-12-29
