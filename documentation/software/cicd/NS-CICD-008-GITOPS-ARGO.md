# NS-CICD-008 — GitOps Promotion (Argo CD)

## 0. Purpose

Adopt Argo CD as the GitOps control plane so NS projects become plug-and-play:

*   Git is the desired-state source of truth
*   Argo CD continuously reconciles the cluster to match Git
*   rollbacks are fast (`git revert` or Argo rollback)
*   environment promotion becomes a controlled “values change” instead of imperative `kubectl apply`

Argo CD can be installed and configured using official install methods and managed declaratively.

## 1. What Changes vs Today

### 1.1 Current (CI applies to cluster)

**GitLab CI:**

*   builds image
*   pushes image
*   runs `helm upgrade` directly

### 1.2 GitOps (CI updates Git; Argo deploys)

**GitLab CI:**

*   builds image
*   pushes image
*   updates a GitOps repo (new image tag / chart values)

**Argo CD:**

*   detects git change
*   syncs cluster automatically

This is what makes engines “drop-in” and repeatable.

## 2. Core Argo CD Concepts We’ll Use

*   **Application:** points at a git path (Helm/Kustomize/manifests) and a target namespace.
*   **App of Apps:** a parent Application manages child Applications for many services/environments.
*   **Sync waves:** control ordering (e.g., ESO before apps that need secrets).
*   **Declarative setup:** define Applications/Projects in manifests (no click-ops required).

## 3. Installation Standard (k3s)

### 3.1 Install Argo CD

Follow the official “Getting Started” install (namespace + manifests) and then access via port-forward, service type, or ingress.

**NS standard:**

*   **Namespace:** `argocd`
*   **Access:** ingress + TLS using NS-CICD-007 patterns (recommended), or port-forward for early MVP

### 3.2 Access model

Argo CD API server access options include port-forward and ingress (official docs).

## 4. GitOps Repo Structure (Canonical)

Create a dedicated repo (example): `ns-gitops`

```text
ns-gitops/
  clusters/
    pe-01/
      root-app.yaml               # parent app (App of Apps)
      projects/
        ns-platform-project.yaml
        ns-apps-project.yaml
      platform/
        external-secrets/         # ESO install/config
        vault/                    # Vault install/config
        cert-manager/             # optional if not already
        ingress/                  # optional
      apps/
        ns-dev/
          ggp-app.yaml
          dre-app.yaml
          ...
        ns-prod/
          ggp-app.yaml
          dre-app.yaml
          ...
  services/
    ggp/
      values/
        dev.yaml
        prod.yaml
    dre/
      values/
        dev.yaml
        prod.yaml
```

**Key idea:**

*   Service Helm charts stay in each service repo.
*   GitOps repo owns the Application definitions + environment values.

## 5. App of Apps Standard

Argo CD documents cluster bootstrapping patterns and notes that App-of-Apps is common; it also cautions that the ability to create Applications in arbitrary Projects is admin-level and should be protected.

### 5.1 Root Application (parent)

*   lives in `clusters/pe-01/root-app.yaml`
*   points to `clusters/pe-01/apps/`
*   auto-sync enabled

### 5.2 Child Applications

*   one Application per service per environment
*   sets:
    *   destination namespace (`ns-dev`, `ns-prod`)
    *   source chart path (service repo) + values file (from GitOps repo)

## 6. Ordering and Dependencies

We need platform components ready before apps:

1.  cert-manager / ingress (if managed via Argo)
2.  Vault
3.  External Secrets Operator
4.  ExternalSecret resources (per app)
5.  Apps that consume secrets

Argo CD sync waves can enforce ordering via `argocd.argoproj.io/sync-wave` annotations.

**NS rule:**

*   platform controllers: wave 0
*   ExternalSecret manifests: wave 1
*   app deployments: wave 2+

## 7. Secrets with Vault + ESO under GitOps

### 7.1 What goes in Git

*   `ExternalSecret` manifests (safe)
*   `SecretStore` / `ClusterSecretStore` (safe)

### 7.2 What never goes in Git

*   secret values
*   Vault tokens/keys

ESO security considerations exist and should be followed as you harden (namespace scoping, least privilege, etc.).

## 8. Promotion Strategy (How Image Tags Move)

You have two viable patterns:

### 8.1 Pattern A: “Commit SHA pinned” (recommended)

1.  CI builds and pushes `:$CI_COMMIT_SHA`
2.  CI opens MR (or pushes) to `ns-gitops` updating the dev/prod values file:
    *   `image.tag: <sha>`
3.  Argo CD syncs that change

**Pros:**

*   fully auditable, deterministic
*   simplest to reason about rollbacks

### 8.2 Pattern B: Argo CD Image Updater

Argo CD Image Updater can automatically update image tags for Applications by setting parameters (including `Helm --set image.tag=...`).

**Pros:**

*   less CI logic

**Cons:**

*   adds another moving component that writes changes (usually back to Git)

**NS recommendation:** Start with Pattern A, add Image Updater once stable.

## 9. GitLab CI Integration Contract (with Argo)

CI responsibilities become:

*   build/push image
*   update GitOps desired state (values)

Argo responsibilities become:

*   reconcile cluster to match Git

This removes kubeconfig secrets from CI deploy jobs (and pairs perfectly with NS-CICD-009).

## 10. Multi-tenancy and Guardrails

Use Argo CD Projects to scope what apps can do:

*   allowed repos
*   allowed destinations (namespaces)
*   allowed cluster-scoped resources

This aligns with Argo CD’s guidance that creating Applications/Projects can be powerful and should be controlled (especially with App-of-Apps).

**NS rule:**

*   `ns-platform-project`: only platform admins; manages Vault/ESO/cert-manager
*   `ns-apps-project`: app teams; can deploy only into `ns-*` namespaces

## 11. Operational Standard

### 11.1 Drift management

*   Argo shows drift and can self-heal (if enabled).

### 11.2 Rollback

*   revert the Git commit that changed the values
*   Argo syncs back automatically

### 11.3 Bootstrap

1.  install Argo once (operator)
2.  apply `root-app` manifest
3.  cluster builds itself from there (platform first, then apps)

## 12. “Done” Criteria

You’re “GitOps live” when:

*   `ns-gitops` repo exists and has a root app
*   Argo CD is reachable (port-forward or ingress)
*   one service deploy is driven solely by updating Git (no `helm upgrade` in CI)
*   ESO + Vault secrets flow works under Argo ordering (sync waves)

## 13. Next Docs

*   NS-CICD-012A — Argo CD Install on k3s (Ingress + RBAC + Projects)
*   NS-CICD-012B — GitLab → GitOps Promotion Pipeline (MR automation + approvals)
*   NS-CICD-012C — Image Updater Add-on (optional) (policy-driven tag updates)
