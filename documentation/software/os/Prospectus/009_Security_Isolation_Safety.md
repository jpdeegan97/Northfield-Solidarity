# 009 — Security, Isolation, and Safety

## Isolation boundaries
- Engine code runs in its own process/container boundary.
- PRS runs as a service with strict authentication and authorization.
- Device drivers (GPU/TSU) remain privileged; PRS mediates access.

## AuthZ model
Requests must carry:
- engine identity
- user/automation identity (if applicable)
- policy context (risk class, approvals)

## Data handling
Sampling outputs can leak sensitive info. Enforce:
- least privilege output: summary-only for most callers
- explicit permissions for raw samples
- redaction and aggregation policies

## Side effects and safety
All actions should be:
- idempotent
- recorded (outcome artifacts)
- gated by policy

## Safe defaults
- run in simulation backend by default in dev
- require explicit opt-in for hardware stochasticity in regulated/high-impact workflows
- require review for actions affecting production systems

## Supply chain / driver trust
- pin driver/runtime versions
- record version hashes in provenance capsules
- periodic attestation checks

## Rate limiting / abuse prevention
- protect TSU device access
- per-engine quotas
- per-risk-class budgets
