// --- 00 START HERE ---
export const SEC_00_CHARTER = `# NS Security Charter

## Purpose
Security exists to enable speed with confidence. The goal is to build systems that are:
- hard to compromise,
- easy to operate safely,
- quick to recover.

## Non-negotiables
- No public admin surfaces.
- MFA on every human account that matters.
- Least privilege everywhere.
- Secrets never committed to git or shipped in logs.
- Standard Secure RPC for every engine.
- Policy gates in CI/CD and/or admission.

## Cultural rules
- “If it isn’t logged, it didn’t happen.”
- “If it can’t be rolled back, it can’t be merged.”
- “Exceptions expire.”

## Ownership
- NS-SEC “owns” standards and gates.
- Every engine owner owns compliance and remediation.
`;

// --- 01 THREAT MODEL ---
export const SEC_01_THREAT_MODEL = `# Threat Model (v1)

## Assets
- **Code:** IP, logic, engine definitions.
- **Data:** User PII (if any), proprietary market data, investment decisions.
- **Systems:** Compute resources (avoid becoming a botnet), keys/secrets.
- **Reputation:** Trust from LPs and partners.

## Adversaries
1. **Script Kiddies / Bots:** Automated scanners looking for low hanging fruit (open ports, default creds, misconfig).
   - *Mitigation:* Zero open ports except necessary (HTTPS), auto-patching, simple WAF/Cloudflare.
2. **Insider (Accidental):** Dev commits a key, deletes a prod DB, misconfigures a bucket.
   - *Mitigation:* IAM constraints, git hooks, backups, immutable logs.
3. **Insider (Malicious):** Disgruntled employee or compromised dev laptop.
   - *Mitigation:* Code review, MFA everywhere, separation of duties, comprehensive audit logs.
4. **Targeted Attacker (Competitor/Criminal):** Advanced persistence, supply chain attacks, lateral movement.
   - *Mitigation:* Zero Trust network, segmentation, strict supply chain controls, proactive detection.

## Key Risks (Top 5)
1. **Credential Theft / Leak:** Keys in repo or phishing.
2. **Supply Chain Compromise:** Malicious npm package or build injection.
3. **Unprotected Admin Surface:** Exposed dashboard or API leading to RCE/data exfil.
4. **Lateral Movement:** One compromised engine leads to total system compromise.
5. **Data Loss:** Ransomware or accidental deletion without recovery path.

## Accepted Risks (v1)
- We rely on single cloud provider security for physical layer.
- We rely on standard open source libraries (mitigate via dependabot/scanning).
`;

export const SEC_01_TRUST_BOUNDARIES = `# Trust Boundaries

## External vs Internal
- **Untrusted:** Public internet, user devices, third-party APIs.
- **Semi-trusted:** Internal dev machines, employee laptops (assume compromise is possible).
- **Trusted:** Production control plane, secure enclave services (if any).

## Authorization boundaries
- Identity boundary: Authentication validates "who you are".
- Permission boundary: Authorization validates "what you can do".
- Network boundary: Reachability doesn't imply permission.

## Critical boundaries
- CI/CD pipeline writing to prod registries.
- Human admin access to prod.
- Engine-to-engine calls (must verify caller identity).
`;

// --- 02 ARCHITECTURE ---
export const SEC_02_K8S_HARDENING = `# Kubernetes Hardening

## Control Checklist
- [ ] Minimize host OS footprint.
- [ ] Restrict API server access (private endpoint).
- [ ] RBAC: Audit and minimize ClusterAdmin usage.
- [ ] Pod Security Standards: Enforce 'Restricted' or 'Baseline' profile.
- [ ] Network Policies: Default deny all ingress/egress, allowlist specific paths.
- [ ] Secrets: Encrypt etcd at rest; use external secret store driver if possible.
- [ ] Admission Controllers: Verify image signatures, enforce resource quotas.
`;

export const SEC_02_NETWORK_SEGMENTATION = `# Network Segmentation

## Zones
- **Public/DMZ:** Load balancers, WAF, public-facing ingress.
- **App Tier:** Workloads, stateless services. No public IPs.
- **Data Tier:** Databases, queues, storage. Only accessible from App Tier.
- **Management:** VPN/Bastion access only.

## Rules
- No direct access from Public to Data.
- East-west traffic between apps restricted by default.
- Egress filtering: Apps can only talk to known external APIs.
`;

export const SEC_02_REFERENCE_ARCH = `# Reference Architecture (Security Overlay)

## Layer 1: Edge & Ingress
- **Cloudflare / CDN:** DDoS protection, WAF, TLS termination.
- **Ingress Controller:** Strict routing, header sanitization, rate limiting.
- **Auth Gateway:** OIDC/OAuth2 for humans, mTLS/tokens for machines.

## Layer 2: Compute & Network
- **Container Isolation:** Runtime limits (resources, syscalls).
- **Network Policies:** Default deny everywhere. Allow only explicit paths (Example: GGP -> DAT).
- **No Public IP:** Workloads sit in private subnets. Only Load Balancers are public.

## Layer 3: Data & Storage
- **Encryption at Rest:** Standard provider encryption (KMS).
- **Encryption in Transit:** TLS 1.2+ everywhere.
- **Backup Strategy:** Automated snapshots, cross-region replication for critical state.

## Layer 4: Identity & Access
- **Service Identity:** Each engine has a unique ident (ServiceAccount).
- **Human Identity:** Central SSO (Google/GitHub/Okta).
- **Secrets Management:** Vault or Cloud Secret Manager. No env vars in plain text.

## Layer 5: Observability
- **Central Logs:** Aggregated logs for security analysis (SIEM-lite).
- **Audit Trails:** Separate, immutable stream for critical actions (login, deploy, money movement).

## Minimum “secure by default” requirements
- No public admin
- Default deny east-west
- All engine calls use Secure RPC envelope
- Logs are centralized and immutable-ish
`;

// --- 03 STANDARDS ---
export const SEC_03_SERVICE_IDENTITY = `# Service Identity Standards

## Principles
- Every running workload must have a distinct identity.
- Identity must be verifiable (cryptographic proof).
- Credentials are short-lived where feasible.
- Identity is included in logs and traces.

## Preferred mechanisms
- mTLS with per-service certs.
- OIDC/JWT with short TTL minted by an internal issuer.
`;

export const SEC_03_STANDARDS = `# NS Security Standards

This is the canonical “must/should/may” set.

## MUST
- MFA for all human accounts (email, git, DNS, cloud).
- No public admin endpoints.
- Least privilege RBAC (humans + services).
- Secure RPC envelope for engine-to-engine traffic.
- Centralized logging for auth + ingress + workloads.
- Secrets are stored/transported securely; never in git or logs.
- CI/CD uses protected branches and reviews for production changes.

## SHOULD
- Default deny east-west with NetworkPolicy.
- Signed artifacts + admission checks.
- SBOM generation for builds.
- Short-lived credentials (OIDC) for CI.
- Regular rotation drills and tabletop incident exercises.

## MAY (later, as scale grows)
- Service mesh mTLS everywhere.
- Dedicated WAF/CDN protections.
- Hardware-backed keys / HSM/KMS.
`;

// --- 04 CONTROLS ---
export const SEC_04_DATA = `# Data Controls

## Encryption
- In transit: TLS
- At rest: DB + object store encryption (or filesystem encryption)

## Access
- Separate DB roles per service (least privilege)
- No shared admin creds for apps
- Audit access to sensitive tables/buckets

## Backup & recovery
- Encrypted backups
- Restore tests on schedule
- Defined RPO/RTO targets
`;

export const SEC_04_EDGE_API = `# Edge and API Controls

## Edge (Ingress/Proxy)
- TLS everywhere, redirect HTTP→HTTPS
- Strict headers where applicable (HSTS, etc.)
- Rate limiting on auth and expensive endpoints
- Separate hostnames for public vs private

## API baseline
- Input validation and safe error handling
- AuthN/AuthZ on every request
- Explicit tenancy isolation (if multi-tenant)
- Audit logs for sensitive actions
`;

export const SEC_04_PLATFORM = `# Platform Controls (K8s, Hosts, Runtime)

## Hosts
- Patch cadence
- Minimal services on nodes
- SSH locked down (keys, allowlist, VPN-only)

## Kubernetes
- RBAC least privilege
- Pod security policies/standards
- Admission policies (no privileged pods, approved registries)
- NetworkPolicy default deny
`;

// --- 05 SECURE RPC ---
export const SEC_05_POLICY_EXAMPLES = `# Secure RPC Policy Examples

## Example scopes
- \`aegis:read\`
- \`aegis:write\`
- \`dre:ingest\`
- \`gge:policy:apply\`

## Example allowlist
- \`ns.dre.api\` → \`ns.aegis.api\` allowed: \`aegis:read\`
- \`ns.gge.api\` → \`ns.*\` allowed: \`policy:validate\`, \`policy:apply\` (restricted)
`;

export const SEC_05_ENVELOPE = `# Secure RPC Envelope (NS Primitive)

## Why
Engine-to-engine calls are the highest leverage risk surface. Secure RPC makes them consistent.

## Contract (minimum)
Every request includes:
- \`caller_service_id\`
- \`trace_id\`
- \`issued_at\`, \`expires_at\`
- \`scopes[]\`
- replay protection (nonce or jti)

## AuthN options
- mTLS (preferred for internal mesh)
- short-TTL JWT minted by issuer (practical for early)

## AuthZ
- allowlists by service + action scope
- explicit deny-by-default

## Audit
Log allow/deny:
- caller, callee, action, decision, reason, trace_id

## Failure behavior
- return generic errors outward
- include trace_id for debugging
- never leak internal policy structure to untrusted callers
`;

// --- 06 SUPPLY CHAIN ---
export const SEC_06_CICD_HARDENING = `# CI/CD Hardening Checklist

- No long-lived cloud keys in CI
- Limit CI runner permissions
- Separate build vs deploy roles
- Require approvals for production deploy
- Store artifacts in a trusted registry only
- Scan dependencies and images
`;

export const SEC_06_PROGRAM = `# Supply Chain Security Program

## Goals
- Prevent malicious code from entering builds/deploys.
- Provide traceability (commit → build → artifact → deploy).

## Minimum controls
- Protected main branch; required reviews
- CI secrets minimized; short-lived creds preferred
- Dependency pinning where possible
- Container image scanning

## Next-level
- SBOM generation
- Signed images + attestations
- Admission gate in cluster
`;

// --- 07 OBSERVABILITY ---
export const SEC_07_ALERTS = `# Alerts (Starter Set)

## High-signal alerts
- Spike in auth failures (per IP / per account)
- Privilege escalation / RBAC changes
- New service account created
- Unapproved image deployment attempt
- Audit pipeline failure
- Unusual egress volume / destinations
`;

export const SEC_07_LOGGING = `# Logging & Audit

## Sources to collect
- Ingress access logs
- Auth logs (login, token issuance)
- App logs (structured)
- K8s events (rbac changes, admission denials)
- CI logs (deploy actions)

## Must-have fields
- time
- actor/service id
- action
- resource
- decision
- trace_id
- ip (where relevant)

## Tamper resistance
- write-once buckets, restricted delete permissions, retention policies
`;

// --- 08 PENTEST ---
export const SEC_08_PROGRAM = `# Penetration Testing Program

## Rules
- Only test what you own or have explicit authorization to test.
- Always define scope and stop conditions.

## Cadence
- Automated scans: continuous / nightly
- Manual threat-led testing: quarterly or per major release

## Coverage
- Auth flows and session handling
- Engine-to-engine authZ bypass attempts
- K8s RBAC and namespace isolation
- Supply chain simulation (CI token misuse)
- Data exfil paths (SSRF, egress channels)

## Outputs
- Findings with severity, exploitability, blast radius
- Fix plan + owner
- Retest report
`;

export const SEC_08_TOOLING = `# Tooling Menu (Defensive)

- SAST: language-specific linters + security analyzers
- Dependency scanning: SCA
- Container scanning: image vulnerabilities
- K8s posture: config misconfig scanners
- DAST: staging endpoint scanning

(Choose tools based on stack; this doc avoids vendor lock-in.)
`;

// --- 09 INCIDENT RESPONSE ---
export const SEC_09_GUIDE = `# Incident Response Guide

## Phases
Detect → Triage → Contain → Eradicate → Recover → Postmortem

## Default actions on serious compromise
- Freeze deploys
- Rotate exposed credentials
- Preserve logs and evidence
- Reduce egress and isolate affected workloads
- Rebuild from known-good artifacts

## Communication
- One incident lead
- One status channel
- Timestamped timeline
`;

export const SEC_09_RUNBOOKS = `# Runbooks (Core 5)

1. Credential leak / token compromise  
2. Suspicious login / account takeover  
3. Container/workload compromise  
4. Data exposure event  
5. Supply chain compromise  

Each runbook should include: trigger, containment steps, evidence capture, rotation steps, recovery, and prevention follow-ups.
`;

// --- 10 CHECKLISTS ---
export const SEC_10_PRE_PROD = `# Pre-Production Release Checklist

- All endpoints behind TLS
- AuthZ tests for critical actions
- Rate limits on auth & expensive endpoints
- CI passed: SAST + dependency scan + image scan
- Artifacts verified (signatures if enabled)
- Rollback plan documented
- Monitoring and alerts configured
- Backups verified (restore test recently)
`;

export const SEC_10_THIS_WEEK = `# This Week: Highest-Impact Security Moves

1) MFA everywhere (domain/email/git/dns/cloud)
2) Put admin behind VPN/zero-trust; remove public admin surfaces
3) Centralize logs (ingress + auth + app)
4) K8s: namespace separation + RBAC review
5) NetworkPolicy default deny (start with staging)
6) Define Secure RPC envelope + add to one engine end-to-end
7) Secrets workflow (SOPS/SealedSecrets/Vault) + rotation plan
`;

// --- 11 TEMPLATES ---
export const SEC_11_INCIDENT_TMPL = `# Incident Template

## Summary
## Severity
## Detection
## Timeline (UTC)
## Affected assets
## Containment actions
## Root cause
## Recovery
## Follow-ups (prevent recurrence)
`;

export const SEC_11_PENTEST_TMPL = `# Pentest Report Template

## Scope
## Methodology
## Findings (table)
| ID | Severity | Title | Impact | Exploitability | Evidence | Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|

## Retest results
## Appendix
`;

export const SEC_11_RISK_REG_TMPL = `# Risk Register Template

| Risk | Description | Likelihood | Impact | Controls | Owner | Status | Notes |
|---|---|---:|---:|---|---|---|---|
`;

// --- 12 ROADMAP ---
export const SEC_12_ROADMAP = `# NS Security Roadmap

## Phase A — Baseline (days)
- MFA + VPN-only admin
- Central logs
- Initial threat model + top 10 risks

## Phase B — Harden (weeks)
- K8s RBAC + Pod security + NetworkPolicy
- Secrets workflow
- Secure RPC for engines

## Phase C — Provenance (weeks)
- SBOM + signatures + attestations
- Admission gate enforcement

## Phase D — Verify & Drill (ongoing)
- Automated scanning
- Manual pentest cadence
- Incident drills + rotation drills
`;
