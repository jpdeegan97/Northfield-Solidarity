# NS-CICD-010A — Alert Rules + Runbooks (Vault, ESO, Argo, Ingress, Cluster)

## 0. Purpose

Provide a starter pack of alerts + immediate runbooks for the NS platform on PowerEdge.

**Assumptions:**

*   `kube-prometheus-stack` is installed in `ns-observe`
*   you can apply `PrometheusRule` CRDs
*   Argo CD, Vault, ESO, cert-manager, ingress controller may exist (alerts are modular)

## 1. How to Apply These Alerts

Create a directory in your cluster-bootstrap / GitOps repo:

`clusters/pe-01/platform/observability/alerts/`

Apply:

```bash
kubectl apply -f ./alerts
```

Or manage via Argo CD:

1.  put these manifests in GitOps repo
2.  Argo syncs them into `ns-observe`

## 2. Alert Severity Convention

*   `severity: page` → something is broken now (human action)
*   `severity: ticket` → needs attention soon
*   `severity: info` → informational

## 3. Baseline Cluster Alerts (Always On)

File: `alerts/00-cluster-baseline.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-cluster-baseline
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.cluster.baseline
    rules:
    - alert: NSNodeNotReady
      expr: kube_node_status_condition{condition="Ready",status="true"} == 0
      for: 5m
      labels:
        severity: page
      annotations:
        summary: "Node not Ready"
        description: "Node {{ $labels.node }} is not Ready for >5m."
        runbook: "NS-RBK-CLUSTER-001"

    - alert: NSPodCrashLooping
      expr: increase(kube_pod_container_status_restarts_total[10m]) > 3
      for: 10m
      labels:
        severity: page
      annotations:
        summary: "Pod CrashLooping"
        description: "{{ $labels.namespace }}/{{ $labels.pod }} container restarts increased >3 in 10m."
        runbook: "NS-RBK-CLUSTER-002"

    - alert: NSDeploymentNotAvailable
      expr: kube_deployment_status_replicas_available < kube_deployment_spec_replicas
      for: 10m
      labels:
        severity: page
      annotations:
        summary: "Deployment replicas unavailable"
        description: "Deployment {{ $labels.namespace }}/{{ $labels.deployment }} has unavailable replicas."
        runbook: "NS-RBK-CLUSTER-003"

    - alert: NSPersistentVolumeFillingUp
      expr: (kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes) < 0.15
      for: 15m
      labels:
        severity: ticket
      annotations:
        summary: "PVC low free space"
        description: "PVC {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} has <15% free for >15m."
        runbook: "NS-RBK-CLUSTER-004"
```

## 4. Vault Alerts (Critical)

Enable only if Vault metrics are scraped.

File: `alerts/10-vault.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-vault
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.vault
    rules:
    - alert: NSVaultSealed
      expr: vault_core_unsealed == 0
      for: 2m
      labels:
        severity: page
      annotations:
        summary: "Vault is sealed"
        description: "Vault reports sealed for >2m. ExternalSecrets will eventually fail."
        runbook: "NS-RBK-VAULT-001"

    - alert: NSVaultHighErrorRate
      expr: rate(vault_audit_log_request_error[5m]) > 0
      for: 5m
      labels:
        severity: ticket
      annotations:
        summary: "Vault request errors detected"
        description: "Vault audit shows request errors. Investigate auth/policy/network."
        runbook: "NS-RBK-VAULT-002"
```

**Notes:**

*   Metric names may differ based on your Vault chart/metrics config.
*   If `vault_core_unsealed` is unavailable, substitute the metric your Vault exposes for sealed/unsealed.

## 5. External Secrets Operator Alerts

File: `alerts/20-external-secrets.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-external-secrets
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.eso
    rules:
    - alert: NSExternalSecretSyncError
      expr: increase(externalsecrets_sync_calls_error_total[10m]) > 0
      for: 10m
      labels:
        severity: page
      annotations:
        summary: "ExternalSecrets sync errors"
        description: "ESO reports sync errors in last 10m. Secrets may become stale."
        runbook: "NS-RBK-ESO-001"

    - alert: NSExternalSecretStale
      expr: time() - externalsecrets_synced_resource_last_reconcile_timestamp_seconds > 3600
      for: 30m
      labels:
        severity: ticket
      annotations:
        summary: "ExternalSecrets not reconciling"
        description: "No reconcile for >1h (per resource metric)."
        runbook: "NS-RBK-ESO-002"
```

**Notes:**

*   ESO metric names can vary by version. If these don’t exist, first confirm scraping, then adjust expressions to match actual metric names.

## 6. Argo CD Alerts (GitOps Health)

File: `alerts/30-argocd.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-argocd
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.argocd
    rules:
    - alert: NSArgoAppOutOfSync
      expr: argocd_app_info{sync_status="OutOfSync"} == 1
      for: 15m
      labels:
        severity: ticket
      annotations:
        summary: "Argo app OutOfSync"
        description: "Argo app {{ $labels.name }} is OutOfSync for >15m."
        runbook: "NS-RBK-ARGO-001"

    - alert: NSArgoAppDegraded
      expr: argocd_app_info{health_status="Degraded"} == 1
      for: 5m
      labels:
        severity: page
      annotations:
        summary: "Argo app Degraded"
        description: "Argo app {{ $labels.name }} health is Degraded."
        runbook: "NS-RBK-ARGO-002"
```

## 7. Ingress / HTTP Alerts (Gateway)

This section assumes you have controller metrics. If not, treat as optional.

File: `alerts/40-ingress.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-ingress
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.ingress
    rules:
    - alert: NSIngressHigh5xx
      expr: (sum(rate(traefik_service_requests_total{code=~"5.."}[5m])) / sum(rate(traefik_service_requests_total[5m]))) > 0.05
      for: 10m
      labels:
        severity: page
      annotations:
        summary: "High 5xx error rate at ingress"
        description: "Ingress 5xx rate >5% for 10m."
        runbook: "NS-RBK-ING-001"
```

**Notes:**

*   This expression uses Traefik metric `traefik_service_requests_total`. Adjust for NGINX if you switch.

## 8. cert-manager Alerts (TLS Health)

File: `alerts/50-cert-manager.yaml`

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: ns-cert-manager
  namespace: ns-observe
  labels:
    release: kps
spec:
  groups:
  - name: ns.certmanager
    rules:
    - alert: NSCertificateNotReady
      expr: certmanager_certificate_ready_status{condition="True"} == 0
      for: 30m
      labels:
        severity: ticket
      annotations:
        summary: "Certificate not Ready"
        description: "Certificate {{ $labels.name }} in {{ $labels.namespace }} not Ready for 30m."
        runbook: "NS-RBK-CERT-001"
```

## Runbooks (Immediate Actions)

### NS-RBK-CLUSTER-001 — Node Not Ready

1.  Identify node + reason:
    ```bash
    kubectl describe node <node>
    ```
2.  Check `kube-system` health:
    ```bash
    kubectl get pods -A | grep -E "kube-system|coredns|traefik"
    ```
5.  If node is truly down: reboot / check network / disk.

### NS-RBK-CLUSTER-002 — Pod CrashLooping

1.  Describe + events:
    ```bash
    kubectl -n <ns> describe pod <pod>
    kubectl -n <ns> get events --sort-by=.lastTimestamp | tail -50
    ```
2.  Logs:
    ```bash
    kubectl -n <ns> logs <pod> --tail=200
    ```
3.  Common causes:
    *   missing secret (ESO not synced)
    *   bad image tag
    *   insufficient resources
4.  Rollback path:
    *   If GitOps: revert GitOps change (image tag) and let Argo sync
    *   If Helm direct: `helm rollback <release> <rev>`

### NS-RBK-CLUSTER-003 — Deployment Not Available

1.  Status:
    ```bash
    kubectl -n <ns> get deploy <deploy>
    kubectl -n <ns> rollout status deploy/<deploy>
    ```
2.  Check pods and readiness:
    ```bash
    kubectl -n <ns> get pods
    kubectl -n <ns> describe pod <pod>
    ```
3.  If readiness fails: verify `/readyz` dependencies (DB/Kafka/secrets).

### NS-RBK-CLUSTER-004 — PVC Low Space

1.  Identify biggest consumers:
    *   check app logs
    *   check DB growth
2.  Expand PVC if StorageClass supports it
3.  Reduce retention (Prometheus/Loki) if this is observability storage
4.  Emergency: scale down noisy workloads

### NS-RBK-VAULT-001 — Vault Sealed

1.  Confirm status:
    ```bash
    kubectl -n ns-secrets get pods -o wide
    kubectl -n ns-secrets exec -it <vault-pod> -- sh -lc "vault status"
    ```
2.  Unseal required pods (manual):
    ```bash
    kubectl -n ns-secrets exec -it <vault-pod> -- sh -lc "vault operator unseal"
    ```
3.  Verify raft peers:
    ```bash
    kubectl -n ns-secrets exec -it <vault-leader> -- sh -lc "vault operator raft list-peers"
    ```
4.  If you can’t restore service quickly:
    *   execute snapshot restore runbook (NS-CICD-010)

### NS-RBK-VAULT-002 — Vault Errors

1.  Identify which auth method is failing (k8s auth, token, policy)
2.  Check ESO logs:
    ```bash
    kubectl -n external-secrets logs deploy/external-secrets --tail=200
    ```
3.  Check Vault audit logs (if enabled) for denied requests
4.  Validate Vault policy path scoping (dev/stage/prod)

### NS-RBK-ESO-001 — ESO Sync Errors

1.  Check ESO controller logs:
    ```bash
    kubectl -n external-secrets get pods
    kubectl -n external-secrets logs deploy/external-secrets --tail=200
    ```
2.  Inspect the failing ExternalSecret:
    ```bash
    kubectl -n <ns> describe externalsecret <name>
    ```
3.  Verify Vault reachable from cluster:
    ```bash
    kubectl -n external-secrets exec -it deploy/external-secrets -- sh -lc "wget -qO- http://vault.ns-secrets.svc.cluster.local:8200/v1/sys/health || true"
    ```
4.  Verify Vault role/policy bindings (k8s auth role, namespace, SA name)

### NS-RBK-ESO-002 — ESO Stale / Not Reconciling

1.  Ensure ESO pods are healthy:
    ```bash
    kubectl -n external-secrets get pods
    ```
2.  Check metrics scraping and controller health
3.  Restart ESO (if needed):
    ```bash
    kubectl -n external-secrets rollout restart deploy/external-secrets
    ```

### NS-RBK-ARGO-001 — App OutOfSync

1.  Open Argo UI → identify drift source
2.  Check if drift is due to manual kubectl/helm changes
3.  Sync app (if allowed) or revert the manual change
4.  If recurring, lock down cluster access and enforce GitOps-only writes

### NS-RBK-ARGO-002 — App Degraded

1.  Identify degraded resource in Argo UI
2.  Use kubectl to inspect:
    ```bash
    kubectl -n <ns> get pods
    kubectl -n <ns> describe pod <pod>
    kubectl -n <ns> logs <pod> --tail=200
    ```
3.  If caused by image tag change:
    *   revert GitOps commit

### NS-RBK-ING-001 — Ingress 5xx High

1.  Determine if 5xx is ingress-level or upstream:
    *   check ingress controller logs
    *   check upstream service logs
2.  Check endpoints exist:
    ```bash
    kubectl -n <ns> get svc
    kubectl -n <ns> get endpoints
    ```
3.  If widespread:
    *   check node pressure, DNS, CNI health

### NS-RBK-CERT-001 — Certificate Not Ready

1.  Inspect Certificate/Order/Challenge:
    ```bash
    kubectl -n <ns> describe certificate <name>
    kubectl -n <ns> get order,challenge
    ```
2.  If HTTP-01 failing:
    *   inbound port 80 not reachable → switch to DNS-01
3.  If DNS-01 failing:
    *   verify webhook solver + API creds
    *   verify TXT record propagation

## 9. Next Step (Recommended)

1.  Move these alerts into ns-gitops under `platform/observability/alerts/`
2.  Add routing: Alertmanager → email/Slack/Discord
3.  Add a “platform health” dashboard that links to these runbooks
