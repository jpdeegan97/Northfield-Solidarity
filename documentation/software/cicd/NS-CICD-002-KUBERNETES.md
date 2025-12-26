# NS-CICD-002 — Kubernetes Bootstrap (PowerEdge k3s + Ingress + Storage)

## 0. Purpose

Bootstrap Kubernetes on a PowerEdge for NS deployments, with:

*   single-node k3s cluster (MVP)
*   ingress for HTTP routing
*   baseline storage class for persistent volumes
*   a foundation for GitLab-driven deployments

This doc is intentionally practical and step-driven.

## 1. MVP Cluster Shape

### 1.1 Single-node (today)

*   1 PowerEdge runs k3s (control plane + worker)
*   Good for MVP and pipelines

### 1.2 Two-node (later)

*   Add PowerEdge #2 as an additional node
*   Promote to HA control plane later if needed

## 2. Prerequisites

### 2.1 OS & networking

*   outbound internet access
*   stable hostname
*   open ports internally for k3s components

### 2.2 Disable conflicting services (if any)

*   If you already ran other orchestrators or have old iptables rules, clean them.

## 3. Install k3s (Single-node)

Run as root on the PowerEdge.

### 3.1 Install

```bash
curl -sfL https://get.k3s.io | sh -
```

### 3.2 Verify

```bash
sudo systemctl status k3s --no-pager
sudo kubectl get nodes
sudo kubectl get pods -A
```

### 3.3 Configure kubectl for your non-root user (recommended)

```bash
mkdir -p $HOME/.kube
sudo cp /etc/rancher/k3s/k3s.yaml $HOME/.kube/config
sudo chown -R $(id -u):$(id -g) $HOME/.kube
kubectl get nodes
```

## 4. Baseline Namespaces

Create canonical namespaces used by CI/CD:

```bash
kubectl create namespace ns-dev || true
kubectl create namespace ns-stage || true
kubectl create namespace ns-prod || true
kubectl get ns | grep ns-
```

## 5. Ingress Controller

k3s commonly ships with Traefik enabled by default.

### 5.1 Check if Traefik is installed

```bash
kubectl -n kube-system get deploy | grep -i traefik || true
kubectl -n kube-system get svc | grep -i traefik || true
```

### 5.2 If Traefik exists (default)

You can start using Ingress immediately.

### 5.3 If you prefer NGINX ingress

Install NGINX ingress controller (typical choice for many setups).

For MVP, keep whichever is already present unless you have a reason to standardize on NGINX.

## 6. Storage (Persistent Volumes)

### 6.1 MVP Storage Strategy

For single-node MVP:

*   Use `local-path` storage class (k3s default) for PVs
*   Check storage classes:

```bash
kubectl get storageclass
```

You should see `local-path`.

### 6.2 Recommended host disk layout

*   Put k3s data and PV data on a reliable disk
*   Ensure you have enough space for:
    *   Postgres PVCs
    *   Mongo PVCs
    *   logs

## 7. Baseline Cluster Add-ons (MVP)

### 7.1 Metrics (optional now, recommended soon)

*   Install Prometheus/Grafana later via Helm

### 7.2 Cert management

**For later:**

*   cert-manager for automated TLS

**For MVP:**

*   you can start without TLS to validate deployment flow

## 8. Container Registry Access

### 8.1 Pull from GitLab Container Registry

You can either:

*   make images public (not recommended)
*   create `imagePullSecrets` per namespace

Create a registry secret (per namespace) using GitLab deploy token or CI job token.

Example using a deploy token (recommended):

```bash
kubectl -n ns-dev create secret docker-registry gitlab-regcred \
  --docker-server=registry.gitlab.com \
  --docker-username=<DEPLOY_TOKEN_USERNAME> \
  --docker-password=<DEPLOY_TOKEN_PASSWORD>
```

Then reference it in your Helm chart as `imagePullSecrets`.

## 9. Helm Installation (Operator + CI)

Install helm on the PowerEdge and on the CI deploy image.

Operator install (example):

```bash
helm version
```

In GitLab CI you can use `alpine/helm` images.

## 10. Smoke Deploy (Hello App)

This validates the entire cluster + ingress.

### 10.1 Deploy a test app

```bash
kubectl -n ns-dev create deploy hello --image=nginx:alpine
kubectl -n ns-dev expose deploy hello --port=80
```

### 10.2 Create an ingress

If using Traefik or NGINX, this Ingress should work:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello
  namespace: ns-dev
spec:
  rules:
  - host: hello.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: hello
            port:
              number: 80
```

Apply:

```bash
kubectl apply -f hello-ingress.yaml
kubectl -n ns-dev get ingress
```

### 10.3 Test locally

Add to your laptop hosts file or curl with Host header.

Example:

```bash
curl -H "Host: hello.local" http://<POWEREDGE_LAN_IP>
```

## 11. Kubernetes Access for GitLab Deploys

Two supported approaches:

### 11.1 MVP: Kubeconfig stored in GitLab CI variables

*   Create a service account with namespace-scoped permissions
*   Export kubeconfig
*   Store base64 kubeconfig as `KUBE_CONFIG_DEV`

### 11.2 Preferred: GitLab Kubernetes Agent

*   install agent in cluster
*   configure GitLab to deploy via agent
*   This will be fully specified in `NS-CICD-003`.

## 12. Security Baseline

*   limit kubeconfig access
*   use namespaces per env
*   restrict who can run deploy jobs
*   use network policies later

## 13. Troubleshooting Quick Commands

```bash
kubectl get nodes
kubectl get pods -A
kubectl -n kube-system get pods
kubectl -n ns-dev get all
kubectl -n ns-dev describe pod <pod>
kubectl -n ns-dev logs deploy/<deploy> --tail=200
```

## 14. Next Docs

*   [NS-CICD-003 — GitLab Deploy Integration (Agent vs Kubeconfig + RBAC)](./NS-CICD-003-GL-DEPLOY-INTEGRATION.md)
*   [NS-CICD-004 — In-cluster Package Nexus (pip/conan/npm proxy)](./NS-CICD-004-HELM-CHART.md)
*   [NS-CICD-005 — Ingress + TLS Standard (cert-manager, DNS, ACME)](./NS-CICD-006-TLS-STANDARD.md)
