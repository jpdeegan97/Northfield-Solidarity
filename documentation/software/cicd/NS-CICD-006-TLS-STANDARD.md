# NS-CICD-006 — Ingress + TLS Standard (cert-manager + DNS + ACME)

## 0. Purpose

Define the standing standard for routing + HTTPS on the PowerEdge Kubernetes cluster:

*   a single Ingress controller standard
*   a single hostname convention
*   cert-manager for TLS
*   ACME challenge strategy (HTTP-01 vs DNS-01)

This is the baseline that makes every NS service reachable at a stable URL with consistent TLS.

## 1. Standard Decisions (NS Defaults)

### 1.1 Ingress controller

**Default: Traefik (k3s packaged)**

*   k3s deploys Traefik by default; its packaged manifests live under `/var/lib/rancher/k3s/server/manifests/traefik.yaml` and should be customized via `HelmChartConfig`, not edited directly.
*   You may choose NGINX later, but pick one and standardize.

### 1.2 Ingress class

Canonical class name: `traefik` (if using Traefik) or `nginx` (if using NGINX).

**Important k3s nuance:**

*   Your Ingress resources should use `spec.ingressClassName` (modern) and not rely on deprecated `kubernetes.io/ingress.class` annotations. Some k3s/Traefik setups may not auto-create a default IngressClass, so you must confirm it exists.

### 1.3 TLS strategy

**Default for on-prem/homelab: DNS-01**

*   DNS-01 avoids the “Let’s Encrypt must reach port 80” constraint (HTTP-01 requires port 80).

**Fallback: HTTP-01**

*   Use only when you are confident inbound port 80 is reachable from the public internet.

## 2. Hostname Conventions (NS)

For a base domain `northfieldsolidarity.ai`:

*   `app.northfieldsolidarity.ai` → frontend
*   `api.northfieldsolidarity.ai` → API gateway / primary API
*   `ggp.northfieldsolidarity.ai` → GGP
*   `dre.northfieldsolidarity.ai` → DRE
*   `vault.northfieldsolidarity.ai` → Vault UI/API
*   `grafana.northfieldsolidarity.ai` → Grafana

**Environment scoping (recommended):**

*   dev: `*.dev.northfieldsolidarity.ai`
*   stage: `*.stage.northfieldsolidarity.ai`
*   prod: `*.northfieldsolidarity.ai`

## 3. Ingress Baseline Checks

### 3.1 Is Traefik running?

```bash
kubectl -n kube-system get deploy | grep -i traefik || true
kubectl -n kube-system get svc | grep -i traefik || true
```

### 3.2 IngressClass exists?

```bash
kubectl get ingressclass
```

If `traefik` (or your chosen class) does not exist, create one:

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: traefik
spec:
  controller: traefik.io/ingress-controller
```

Controller string can vary by install; if unsure, prefer installing/standardizing via Helm chart values for your ingress controller.

## 4. Install cert-manager

cert-manager is the canonical way to automate cert issuance and renewal.

### 4.1 Install (Helm)

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

kubectl create namespace cert-manager || true

helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --set crds.enabled=true
```

Verify:

```bash
kubectl -n cert-manager get pods
kubectl get crd | grep cert-manager | head
```

## 5. ACME Issuers (Let’s Encrypt)

You create ClusterIssuers:

*   `letsencrypt-staging` (for testing)
*   `letsencrypt-prod` (for real)

## 6. Option A — HTTP-01 (Only if port 80 is reachable)

cert-manager solves HTTP-01 by creating a temporary challenge path under `/.well-known/acme-challenge/` using your Ingress/Gateway.

### 6.1 ClusterIssuer (HTTP-01)

Example (Traefik ingress class):

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: ops@northfieldsolidarity.ai
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
    - http01:
        ingress:
          ingressClassName: traefik
```

**Notes:**

*   cert-manager supports specifying which ingress class to use for HTTP-01 (via issuer config and/or annotations like `acme.cert-manager.io/http01-ingress-class`).

### 6.2 Ingress annotations (optional)

If you need to override solver per-ingress:

*   `acme.cert-manager.io/http01-ingress-class: traefik`

## 7. Option B — DNS-01 (Recommended for PowerEdge on-prem)

DNS-01 uses DNS TXT records to validate control of the domain. cert-manager supports DNS providers and also “out-of-tree” DNS providers via webhook solvers.

### 7.1 Why DNS-01 is the default here

*   avoids inbound port 80 requirement (common failure on residential/CGNAT)
*   enables wildcard certs (e.g., `*.dev.northfieldsolidarity.ai`)

### 7.2 Porkbun DNS-01

Porkbun is not a first-party provider in cert-manager; you typically use a webhook solver (community).

**Standard approach:**

1.  Install the Porkbun webhook solver (Helm)
2.  Create a Kubernetes secret with Porkbun API keys
3.  Configure a ClusterIssuer with `dns01` webhook solver

Treat community webhook projects as infrastructure: pin versions, validate behavior in staging, and keep your API keys locked down.

### 7.3 ClusterIssuer (DNS-01 via webhook) — pattern

This is the cert-manager webhook pattern; provider-specific config will vary.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: ops@northfieldsolidarity.ai
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
    - dns01:
        webhook:
          groupName: acme.your-org.example
          solverName: porkbun
          config:
            apiKeySecretRef:
              name: porkbun-key
              key: api-key
            secretKeySecretRef:
              name: porkbun-key
              key: secret-key
```

## 8. How Services Request TLS

Two standard patterns:

### 8.1 Ingress-shim (annotate Ingress)

Add annotations to your Ingress so cert-manager creates the Certificate automatically.

Example:

```yaml
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
```

### 8.2 Explicit Certificate resources (recommended for critical services)

Create a Certificate object per hostname (and keep it in git).

Example:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ggp-tls
  namespace: ns-prod
spec:
  secretName: ggp-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - ggp.northfieldsolidarity.ai
```

## 9. Helm Chart Standard Integration (NS-CICD-004)

In `values.yaml`:

```yaml
ingress:
  enabled: true
  className: traefik
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: ggp.northfieldsolidarity.ai
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: ggp-tls
      hosts:
        - ggp.northfieldsolidarity.ai
```

**Rule:** Every internet-facing service must define TLS and a stable hostname.

## 10. Validation & Troubleshooting

### 10.1 Check cert-manager is issuing

```bash
kubectl -n cert-manager get pods
kubectl -A get certificate,certificaterequest,order,challenge | head -100
```

### 10.2 Check Ingress + TLS secret

```bash
kubectl -n ns-prod get ingress
kubectl -n ns-prod describe ingress <name>
kubectl -n ns-prod get secret <tls-secret>
```

### 10.3 Common errors

*   **HTTP-01 failing:** port 80 not reachable (use DNS-01 instead).
*   **Wrong ingress class:** solver created for different controller (set `ingressClassName` or `acme.cert-manager.io/http01-ingress-class`).

## 11. Vault TLS Standard (ties into NS-CICD-009)

**Minimum:**

*   `vault.northfieldsolidarity.ai` gets its own certificate secret
*   Vault service is cluster-internal; only UI/API exposed via ingress

**Recommended:**

*   only allow ingress from trusted IPs (Traefik middleware / NGINX annotations)

## 12. “Done” Criteria

You are done when:

*   cert-manager is installed and healthy
*   `letsencrypt-staging` and `letsencrypt-prod` issuers exist
*   at least one service in `ns-dev` and one in `ns-prod` has valid HTTPS
*   renewal works automatically (wait/observe or force re-issue in staging)

## 13. Next Docs

*   [NS-CICD-010 — Vault HA + Backup/Restore (2 PowerEdges)](./NS-CICD-010A-ALERT-RULES.md) (Check link)
*   NS-CICD-011 — Ingress Hardening (rate limits, IP allowlists, WAF-lite)
*   NS-CICD-012 — GitOps Promotion (Argo CD) (recommended)
