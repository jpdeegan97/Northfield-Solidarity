# NS-CICD-007 — Vault Hardening (TLS + Access Controls + Audit + Network)

## 0. Purpose

Harden Vault so it is safe as a cluster-critical dependency for External Secrets (NS-CICD-009) and production secret storage.

This document focuses on practical controls you can apply on PowerEdge / k3s:

*   TLS everywhere that matters
*   strict access boundaries
*   audit logging
*   minimal privileges
*   operational safety (tokens, upgrades, rotation)

## 1. Threat Model (What We’re Hardening Against)

*   Unauthorized read of secrets (worst-case)
*   Unauthorized write of secrets (supply-chain compromise)
*   Token leakage (CI logs, shell history, pod env)
*   Vault UI/API exposed too broadly
*   Lateral movement from a compromised namespace/pod
*   Operator mistakes (root token usage, ad-hoc policies)

## 2. Vault Network Exposure Standard

### 2.1 Vault is cluster-internal by default

*   Vault service stays ClusterIP only
*   Only expose UI/API via Ingress (and ideally only from trusted IPs)

### 2.2 Dedicated namespace

*   Vault in `ns-secrets`
*   ESO in `external-secrets`

### 2.3 Ingress allowlisting (mandatory for Vault UI)

Pick one:

*   Allowlist your home/office public IP(s)
*   Or require VPN to reach the Vault UI

**Standard policy:**

Vault UI is not public-internet-accessible without an allowlist.

## 3. TLS Standard

### 3.1 Minimum TLS goals

*   Client → Ingress: HTTPS
*   Ingress → Vault Service: prefer HTTPS (optional in week 2, recommended by week 3)

### 3.2 cert-manager integration

*   Use `vault.northfieldsolidarity.ai`
*   Issue cert via `letsencrypt-prod` (DNS-01 preferred)
*   Store TLS secret in `ns-secrets` (or in the namespace where ingress lives)

### 3.3 Vault listener TLS (recommended)

Configure Vault server to listen with TLS and use a cert mounted from a Kubernetes Secret.

**Implementation options:**

*   A) cert-manager creates a cert Secret → mounted into Vault pods
*   B) Internal CA (step-ca) → certs rotated internally

**NS recommendation:** A (cert-manager) for simplicity.

### 3.4 HSTS + sane TLS defaults

For internet-facing endpoints (Ingress):

*   enable HSTS (after you confirm HTTPS is stable)
*   redirect HTTP→HTTPS

## 4. Authentication Hardening

### 4.1 Remove daily reliance on root token

Root token is for:

*   initial bootstrapping
*   break-glass emergencies

**Standard:**

*   Create a dedicated `vault-admin` policy and an admin token (or OIDC group) for daily ops.
*   Store root token offline.

### 4.2 Prefer auth methods over long-lived static tokens

**Auth method order:**

1.  OIDC for humans (best)
2.  Kubernetes auth for workloads (ESO + apps)
3.  AppRole for specific non-K8s automation (careful)

**Week 2 minimum:**

*   Kubernetes auth for ESO
*   A short-lived operator token for humans

### 4.3 Token TTL + periodic tokens

*   Set short TTLs where possible
*   For critical controllers (ESO), use controlled TTL with renewals
*   Avoid “never expires” tokens unless truly necessary

## 5. Policy Hardening (Least Privilege)

### 5.1 Namespace & path scoping

Secret paths must map to environments:

*   `kv/ns/dev/...`
*   `kv/ns/stage/...`
*   `kv/ns/prod/...`

### 5.2 Separate policies per environment

*   `eso-dev` can read only `kv/ns/dev/*`
*   `eso-prod` can read only `kv/ns/prod/*`

### 5.3 Deny-by-default mindset

*   Do not grant list/read on broad prefixes unless necessary
*   Avoid wildcard writes

### 5.4 Human roles

Create distinct policies:

*   `vault-admin` (manage auth, policies, engines)
*   `vault-operator` (unseal, status, raft operations)
*   `vault-auditor` (read audit logs, view metadata)

## 6. Kubernetes Hardening Around Vault

### 6.1 Pod placement

*   Anti-affinity (spread pods across nodes)
*   Pin Vault to a dedicated node if you want stricter isolation (later)

### 6.2 Resource requests/limits

*   Ensure Vault has stable CPU/memory to avoid restarts

### 6.3 Pod Security

*   Run as non-root
*   Drop capabilities
*   Read-only root FS where possible

### 6.4 ServiceAccount controls

*   Vault auth token reviewer SA only gets what it needs
*   ESO SA only gets what it needs

## 7. NetworkPolicies (Highly Recommended)

If you enforce NetworkPolicies (requires a network plugin that supports them):

### 7.1 Vault ingress policy

Allow inbound to Vault only from:

*   Ingress controller namespace (Traefik/NGINX)
*   `external-secrets` namespace (ESO)
*   optionally operator bastion namespace

Deny everything else.

### 7.2 ESO egress policy

Allow ESO to talk to:

*   Vault service
*   Kubernetes API

Deny broad egress.

## 8. Audit Logging (Mandatory for “real” production)

### 8.1 Enable audit devices

Enable at least one:

*   file audit (persisted volume)
*   syslog (if you have it)

### 8.2 Protect audit logs

*   logs contain metadata about secret access
*   ship to your log system (Loki/ELK) with retention

## 9. Backups + DR Hardening (ties to NS-CICD-010)

### 9.1 Backup cadence

*   weekly snapshot minimum
*   daily once you have real secrets

### 9.2 Restore drills

*   monthly restore test into a scratch namespace/cluster

### 9.3 Off-box storage

*   backups must live off the PowerEdge
*   encrypt backups at rest

## 10. Operational Hardening

### 10.1 Upgrade strategy

*   pin chart versions
*   upgrade in dev/stage first
*   keep a rollback plan (chart + snapshot)

### 10.2 Unseal handling

**Week 2:**

*   manual unseal is acceptable but operationally annoying

**Week 3+:**

*   add auto-unseal (if feasible) or at minimum streamline unseal runbooks

### 10.3 Rate limiting / WAF-lite

At ingress:

*   basic rate limits on Vault UI
*   block obvious scanners
*   IP allowlist is the simplest effective control

## 11. “Done” Checklist

You are hardened enough for real usage when:

*   Vault UI is behind TLS and not publicly open (allowlist/VPN)
*   Root token is stored offline; daily ops use admin role
*   ESO uses Kubernetes auth with least-privilege policy
*   Audit logging is enabled and retained
*   Backups are off-box and restore is tested

## 12. Recommended Next Docs

*   [NS-CICD-012 — GitOps Promotion (Argo CD)](./NS-CICD-008-GITOPS-ARGO.md) (Note: Check ID consistency)
*   [NS-CICD-013 — Observability Standard (Prometheus/Loki/Tracing) for CI/CD + Cluster](./NS-CICD-009-OBSERVABILITY.md) (Note: Check ID consistency)
*   [NS-CICD-014 — Cluster Hardening Baseline (RBAC, PSP/PSS, node lockdown, firewall)](./NS-CICD-007-HARDENING.md)
