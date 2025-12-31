# Kubernetes/k3s Hardening (Baseline)

## Control plane
- Lock kubeconfigs (permissions, rotation, no copying into random machines)
- Minimize cluster-admin bindings; audit regularly

## Workload security
- Pod Security Standards (baseline/restricted)
- Non-root, drop capabilities, read-only FS when possible
- Resource limits required

## Network
- Namespace per engine/env
- NetworkPolicy default deny; allow explicit traffic only
- Constrain egress (deny by default if possible)

## Secrets
- Prefer external secret store or encrypted GitOps
- Rotate on schedule + on incident
