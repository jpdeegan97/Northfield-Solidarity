# Threat Model v1 (Baseline)

## Scope
NS infrastructure + engines + CI/CD + data plane.

## Adversaries
1. Opportunistic Internet attacker  
2. Credential stuffer / phisher  
3. Supply chain adversary (dependencies, CI tokens, registry)  
4. Malicious or compromised internal service  
5. Operator error (misconfig, leaked secret)  

## Top attack paths (high level)
- Internet → edge misconfig → app exploit → data exfil
- Credential theft → admin access → secrets → lateral movement
- CI compromise → malicious artifact → production deploy
- Internal service compromise → authZ bypass → cross-engine escalation
- Misconfigured egress → covert exfil channel

## Trust boundaries (minimum)
- Internet ↔ Edge
- Edge ↔ Cluster data plane
- Admin plane ↔ Control plane
- CI/CD plane ↔ Registry ↔ Cluster
- Engine-to-engine calls

## Security objectives
- Prevent unauthorized access
- Limit blast radius
- Detect compromise quickly
- Rotate credentials fast
- Recover cleanly

## Risk register starter (fill in)
| Risk | Likelihood | Impact | Primary controls |
|---|---:|---:|---|
| Public admin endpoint exposure | Med | High | VPN-only admin, scans, allowlists |
| Overbroad K8s RBAC | Med | High | RBAC review, least-priv roles, audit |
| Unsigned/untrusted artifacts | Med | High | signing + admission gate |
| Secret leakage in CI/logs | Med | High | secret scanning, short-lived creds, redaction |
| Lateral movement between engines | High | High | Secure RPC + NetworkPolicy default deny |
