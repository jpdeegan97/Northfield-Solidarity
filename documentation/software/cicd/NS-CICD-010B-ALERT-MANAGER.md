# NS-CICD-010B — Alertmanager Routing Standard (CDE Integration)

## 0. Purpose

Standardize how alerts get delivered (and escalated) so NS is operable.

This doc defines:

*   Alertmanager routing structure (grouping, inhibit, silences)
*   notification channels (email / Slack / Discord / webhook)
*   CDE as the canonical delivery hub (fanout, templates, paging rules)

## 1. Architecture

```mermaid
flowchart LR
  PROM[Prometheus] --> AM[Alertmanager]
  AM -->|webhook| CDE[NS-CDE: Content Distribution Engine]
  CDE --> SL[Slack]
  CDE --> DS[Discord]
  CDE --> EM[Email]
  CDE --> SM[SMS/Voice (optional)]
  CDE --> IT[Ticketing (optional)]
```

Core idea: Alertmanager stays small and reliable; CDE owns channel logic.

## 2. Label Contract (What Alerts Must Include)

All `PrometheusRule` alerts must include:

*   `severity = page | ticket | info`
*   `team = platform | engine | security` (extend as needed)
*   `env = dev | stage | prod` (or derive from namespace)

All alerts should include in annotations:

*   `summary`
*   `description`
*   `runbook` (string ID or URL)

**NS rule:** if `severity: page`, runbook is mandatory.

## 3. Routing Strategy

### 3.1 Primary routing key

Route primarily by:

*   `severity`
*   `team`
*   `env`

### 3.2 Grouping strategy

Goal: avoid alert storms.

Default grouping:

*   `group_by: ['alertname','namespace','service','pod','instance']`
*   `group_wait: 30s`
*   `group_interval: 5m`
*   `repeat_interval: 2h` (page), `6h` (ticket), `12h` (info)

### 3.3 Inhibition (noise reduction)

If a higher-level outage exists, suppress lower-level alerts.

**Examples:**

*   If `NSNodeNotReady` is firing for a node, inhibit pod-level alerts on that node.
*   If Vault is sealed, inhibit downstream ESO/app secret errors (optional).

## 4. Alertmanager Configuration Standard

We keep Alertmanager config minimal:

*   one webhook receiver: CDE
*   optional email receiver for break-glass

### 4.1 Canonical `alertmanager.yaml` (template)

```yaml
global:
  resolve_timeout: 5m

route:
  receiver: cde-webhook
  group_by: ['alertname','namespace','service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 2h
  routes:
    - matchers:
        - severity="page"
      receiver: cde-webhook
      repeat_interval: 1h

    - matchers:
        - severity="ticket"
      receiver: cde-webhook
      repeat_interval: 6h

    - matchers:
        - severity="info"
      receiver: cde-webhook
      repeat_interval: 12h

inhibit_rules:
  - source_matchers:
      - alertname="NSNodeNotReady"
    target_matchers:
      - severity=~"page|ticket"
    equal: ['node']

receivers:
  - name: cde-webhook
    webhook_configs:
      - url: http://ns-cde.ns-prod.svc.cluster.local:8080/alertmanager
        send_resolved: true

  # optional break-glass
  - name: breakglass-email
    email_configs:
      - to: ops@northfieldsolidarity.ai
        from: alerts@northfieldsolidarity.ai
        smarthost: smtp.example:587
        auth_username: alerts@northfieldsolidarity.ai
        auth_password: "${SMTP_PASSWORD}"
        send_resolved: true
```

**Notes:**

*   In week 2+ the webhook URL should be cluster-internal.
*   Alertmanager should not call Slack/Discord directly once CDE exists.

## 5. kube-prometheus-stack Integration

### 5.1 Where this config lives

With `kube-prometheus-stack`, Alertmanager config is set via chart values.

**Standard values pattern:**

1.  store `alertmanager.yaml` in GitOps repo
2.  mount/apply via Helm values for the stack

## 6. CDE Webhook Contract

CDE must implement an Alertmanager webhook receiver at:

`POST /alertmanager`

### 6.1 Required behavior

*   accept Alertmanager webhook payload (v4)
*   dedupe events based on:
    *   fingerprint
    *   alertname + labels
*   handle both:
    *   firing
    *   resolved

### 6.2 CDE normalization model

CDE converts incoming alerts to NS canonical notification event:

*   `event_type: alert.firing | alert.resolved`
*   `severity`
*   `team`
*   `env`
*   `service`
*   `title` (from summary)
*   `body` (from description)
*   `runbook`
*   `labels` passthrough
*   `fingerprint`

## 7. CDE Fanout Routing Rules

### 7.1 Recommended channels per severity

*   `page` → Discord + SMS/Voice (optional) + high priority email
*   `ticket` → Discord + email (digest)
*   `info` → Discord low priority or daily digest

### 7.2 Environment gating

*   `dev`: never page (convert page → ticket unless explicitly allowed)
*   `prod`: page as-is

### 7.3 Quiet hours (optional)

CDE can enforce quiet hours for `ticket/info`.

### 7.4 Escalation (optional)

If page alert remains firing for >N minutes:

*   escalate to additional channel/user group

## 8. Message Templates (Standard)

CDE standard message must include:

*   `[SEVERITY] [ENV] [TEAM] alertname`
*   `summary`
*   `top labels: namespace/service/pod/node`
*   link(s):
    *   Grafana dashboard
    *   Argo app (if relevant)
    *   runbook

**Example (Discord/Slack):**

```text
[PAGE][prod][platform] NSVaultSealed
Vault is sealed for >2m
ns: ns-secrets  svc: vault
runbook: NS-RBK-VAULT-001
```

## 9. Silences Standard (How to Mute Responsibly)

### 9.1 Rules

Silences must have:

*   owner
*   reason
*   expiration

### 9.2 Where

*   **Short-term silences:** Alertmanager UI/CLI
*   **Planned maintenance:** GitOps-defined silence windows (optional later)

## 10. Testing Checklist

### 10.1 Validate Alertmanager → CDE

1.  Port-forward Alertmanager
2.  Fire a test alert (or apply a rule with always-true expr in dev)
3.  Confirm CDE receives and fans out

### 10.2 Validate resolved flow

1.  resolve the test alert
2.  ensure CDE sends “resolved” update

### 10.3 Validate dedupe

1.  same alert repeats → should not spam

## 11. “Done” Criteria

You’re done when:

*   Alertmanager sends all alerts to CDE webhook
*   CDE routes by severity/team/env
*   page alerts reach you reliably
*   resolved notifications work
*   you have a documented process for silences

## 12. Next Docs

*   NS-CDE-000 — CDE Charter (notification and distribution hub)
*   NS-CDE-011 — Notification Channel Connectors (Slack/Discord/Email/SMS)
*   NS-CDE-012 — Routing Policy DSL (severity/team/env, quiet hours, escalation)
