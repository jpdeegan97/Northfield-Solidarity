# Platform Controls (K8s, Hosts, Runtime)

## Hosts
- Patch cadence
- Minimal services on nodes
- SSH locked down (keys, allowlist, VPN-only)

## Kubernetes
- RBAC least privilege
- Pod security policies/standards
- Admission policies (no privileged pods, approved registries)
- NetworkPolicy default deny
