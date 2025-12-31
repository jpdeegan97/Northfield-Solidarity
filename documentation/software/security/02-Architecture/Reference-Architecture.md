# Reference Security Architecture

## High-level flows
- **Internet → Edge → Workloads → Data**
- **Admin → Zero-Trust/VPN → Control Plane**
- **CI/CD → Registry → Cluster** (policy-gated)

## Core components
- Identity provider (MFA)
- VPN/Zero-trust access
- Ingress/reverse proxy (TLS, rate limits)
- Kubernetes hardening (RBAC, Pod Security, NetworkPolicy)
- Secrets management (Vault/SOPS/SealedSecrets)
- Central logging + alerting
- Supply chain controls (SBOM, signing, attestations)

## Minimum “secure by default” requirements
- No public admin
- Default deny east-west
- All engine calls use Secure RPC envelope
- Logs are centralized and immutable-ish
