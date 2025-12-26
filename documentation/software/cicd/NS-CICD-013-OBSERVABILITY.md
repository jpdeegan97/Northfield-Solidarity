# NS-CICD-013 — Observability Standard (Metrics, Logs, Traces, Alerts)

## 0. Purpose

Define the standing observability standard for Northfield Solidarity on PowerEdge Kubernetes:

*   Metrics (Prometheus)
*   Dashboards (Grafana)
*   Logs (Loki)
*   Alerts (Alertmanager)
*   Traces (OpenTelemetry + Tempo) — optional but recommended

This standard makes CI/CD + GitOps operable at scale: when something breaks, you can answer what, where, why, and what changed.

## 1. NS Observability Principles

### 1.1 Correlation is mandatory

Every signal must be joinable:

*   service / engine name
*   env (dev/stage/prod)
*   namespace
*   version (git SHA)
*   trace_id (when tracing enabled)

### 1.2 Reduce cardinality (or you will die)

**Rules:**

*   never put user IDs / request URLs with unbounded params into labels
*   avoid per-request labels
*   keep label set small and stable

### 1.3 Day-1 vs Day-2

*   **Day-1:** metrics + logs + basic alerts
*   **Day-2:** traces + SLOs + capacity planning

## 2. Canonical Stack

### 2.1 Metrics + alerting

*   `kube-prometheus-stack` (Prometheus, Alertmanager, Grafana)
*   `kube-state-metrics`
*   `node-exporter`

### 2.2 Logs

*   Loki
*   Promtail (or Fluent Bit) as log agent

### 2.3 Traces (optional but recommended)

*   OpenTelemetry Collector
*   Tempo (trace storage)

### 2.4 Optional add-ons

*   Blackbox exporter (HTTP/TCP probe)
*   Argo CD metrics scraped into Prometheus
*   cert-manager metrics scraped into Prometheus

## 3. Namespaces

**Standard namespaces:**

*   `ns-observe` (Prometheus/Grafana/Alertmanager)
*   `loki` (Loki)
*   `otel` (OTel collector / Tempo)

## 4. Signal Standards for NS Services

### 4.1 Required endpoints

Every NS service must expose:

*   `GET /healthz` (liveness)
*   `GET /readyz` (readiness)
*   `GET /metrics` (Prometheus format)

### 4.2 Required runtime labels (per pod)

Your Helm chart must annotate/label pods so metrics/logs can join:

*   `app.kubernetes.io/name`
*   `app.kubernetes.io/instance`
*   `app.kubernetes.io/version` (chart appVersion is fine, but also include git SHA)

**NS Standard Pod Annotation:**

`ns.git.sha: <sha>`

### 4.3 Log format

Default: JSON logs to stdout.

**Minimum fields:**

*   `ts`
*   `level`
*   `msg`
*   `service`
*   `env`
*   `git_sha`
*   `trace_id` (if tracing)
*   `span_id` (if tracing)
*   `request_id` (if you generate one)

## 5. Day-1 Implementation (Do This First)

### 5.1 Install kube-prometheus-stack

Create namespace:

```bash
kubectl create namespace ns-observe || true
```

Install:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm upgrade --install kps prometheus-community/kube-prometheus-stack \
  -n ns-observe
```

Verify:

```bash
kubectl -n ns-observe get pods
kubectl -n ns-observe get svc
```

#### 5.1.1 Storage + retention (PowerEdge)

For MVP, keep it simple:

*   Prometheus retention: 7–15 days
*   Grafana PVC: 5–10Gi
*   Alertmanager PVC: small

You can tune retention later after you see disk usage.

### 5.2 Install Loki

Namespace:

```bash
kubectl create namespace loki || true
```

Install (simple Loki stack):

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm upgrade --install loki grafana/loki \
  -n loki

helm upgrade --install promtail grafana/promtail \
  -n loki
```

Verify:

```bash
kubectl -n loki get pods
```

### 5.3 Connect Grafana to Loki

Grafana is included in `kube-prometheus-stack`.

**Standard:**

1.  create a Grafana data source for Loki
2.  point it at the Loki service in-cluster

(You can do this via UI first; later we codify it.)

### 5.4 Add ServiceMonitor support in charts

Your NS-CICD-004 Helm chart already has an optional ServiceMonitor template.

**Day-1 requirement:**

enable metrics scraping for all services in dev

Example values:

```yaml
metrics:
  enabled: true
  serviceMonitor:
    enabled: true
    interval: 15s
```

### 5.5 Baseline Alerts (Day-1)

Start with “obvious outages”:

*   Pod CrashLooping
*   Deployment replicas not available
*   Node disk pressure / filesystem near full
*   Vault sealed
*   ExternalSecret sync failing
*   Ingress errors / high 5xx rate

**Rule:** alerts must include runbook link or at minimum “what to check first”.

## 6. Day-2 Implementation (Recommended)

### 6.1 OpenTelemetry Collector

Namespace:

```bash
kubectl create namespace otel || true
```

Install OTel collector via Helm (standard chart). Configure it to:

*   receive OTLP (gRPC/HTTP)
*   export traces to Tempo
*   export metrics optionally

### 6.2 Tempo

Install Tempo to store traces.

**Key decision:**

*   start with single-binary Tempo + PVC
*   later move to object storage (MinIO/S3)

### 6.3 Tracing standard

*   all internal HTTP calls propagate W3C trace context
*   all services emit spans around:
    *   inbound request
    *   DB calls
    *   Kafka produce/consume

## 7. Dashboards Standard

### 7.1 Required dashboards

*   Cluster overview (nodes, CPU/mem/disk)
*   Namespace overview per env
*   Vault overview (sealed state, request rate, errors)
*   External Secrets overview (sync errors)
*   Argo CD overview (sync status, drift)
*   **Service golden signals (per service):**
    *   latency (p50/p95/p99)
    *   traffic (RPS)
    *   errors (4xx/5xx)
    *   saturation (CPU/mem)

### 7.2 Naming

Prefix dashboards with `NS / ...`

## 8. SLOs (Phase 2)

Once you have stable services, define SLOs:

*   availability SLO (e.g., 99.5% for MVP)
*   latency SLO (p95 < X ms)

Then:

*   alert on burn-rate (not every blip)

## 9. CI/CD + GitOps Observability

### 9.1 CI visibility

**Minimum:**

pipelines show:

*   build duration
*   deploy duration
*   success/failure

**Recommended:**

*   export GitLab runner metrics (if self-hosted)
*   track build cache hit rates

### 9.2 Argo CD visibility

Alert on:

*   app out-of-sync
*   app degraded
*   repeated sync failures

## 10. Runbook Contract (Required)

Every critical alert must have:

*   first checks
*   commands
*   rollback step

Example commands (operator):

```bash
kubectl get pods -A
kubectl -n <ns> describe pod <pod>
kubectl -n <ns> logs <pod> --tail=200
kubectl -n <ns> get events --sort-by=.lastTimestamp | tail -50
```

## 11. Hardening Notes

*   Grafana and Prometheus UIs should be behind ingress allowlists (like Vault)
*   avoid exposing Prometheus directly to the internet
*   keep retention sane; disk fills are the #1 self-hosted failure mode

## 12. “Done” Criteria

**Day-1 done when:**

*   Prometheus + Grafana installed and stable
*   Loki + promtail installed; logs visible in Grafana
*   at least one service scraped via ServiceMonitor
*   baseline alerts configured (CrashLoop, Vault sealed, ESO failures)

**Day-2 done when:**

*   traces flow through OTel → Tempo
*   dashboards cover golden signals for each service
*   SLOs defined for at least your API gateway / main service

## 13. Next Docs

*   NS-CICD-013A — Alert Rules + Runbooks (Vault/ESO/Argo/Ingress)
*   NS-CICD-013B — Tracing Standard (OTel SDK guidance for Python + C++)
*   NS-CICD-013C — Cost/Capacity Planning (retention, PVC sizing, object storage)
