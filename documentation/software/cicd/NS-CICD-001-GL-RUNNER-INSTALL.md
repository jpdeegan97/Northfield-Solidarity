# NS-CICD-001 — GitLab Runner Install (PowerEdge)

## 0. Purpose

Install and register a GitLab Runner on your PowerEdge to execute CI/CD pipelines that:

*   build container images
*   push to GitLab Container Registry
*   deploy to Kubernetes (k3s/cluster) via kubectl/helm

This is the MVP runner approach: runner runs on the server (not inside Kubernetes yet).

## 1. Runner Model (Recommended)

### 1.1 Executor choice

**Docker executor (recommended for MVP)**

*   easiest to build images
*   supports Docker-in-Docker (DinD) or host Docker socket

### 1.2 Build approach options

**Option A — Host Docker socket (simpler, faster)**

*   Runner container/job talks to host Docker daemon
*   Less isolation; acceptable for a private runner

**Option B — Docker-in-Docker (more isolated)**

*   Uses DinD service in CI jobs
*   More moving parts

**MVP recommendation:**

*   Start with Option A (host docker socket) for speed.

## 2. Prerequisites

### 2.1 OS baseline

*   SSH access
*   time synchronized (chrony)
*   outbound internet access

### 2.2 Docker installed

**Verify:**

```bash
docker --version
sudo systemctl status docker --no-pager
```

If Docker is not installed, install it first (OS-specific).

## 3. Install GitLab Runner

There are two supported install paths: package install or containerized runner.

**Recommended: Install Runner via package (systemd service)**

This yields a stable runner service managed by systemd.

### 3.1 RHEL/Rocky/Alma Linux (common PowerEdge choice)

```bash
# Add GitLab Runner repository
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash

# Install
sudo dnf install -y gitlab-runner

# Start + enable
sudo systemctl enable --now gitlab-runner
sudo systemctl status gitlab-runner --no-pager
```

### 3.2 Ubuntu/Debian

```bash
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash
sudo apt-get install -y gitlab-runner
sudo systemctl enable --now gitlab-runner
sudo systemctl status gitlab-runner --no-pager
```

## 4. Permissions: Allow runner to use Docker

If you will use the host Docker socket, ensure the `gitlab-runner` user can access Docker.

```bash
sudo usermod -aG docker gitlab-runner
sudo systemctl restart gitlab-runner

# Verify group membership (may require re-login for interactive sessions)
id gitlab-runner
```

Also verify Docker socket permissions:

```bash
ls -la /var/run/docker.sock
```

## 5. Register the Runner in GitLab

### 5.1 Get the registration token

In GitLab:

*   Project → Settings → CI/CD → Runners
*   OR Group → Settings → CI/CD → Runners

You will see a token for registration.

### 5.2 Register

Run on PowerEdge:

```bash
sudo gitlab-runner register
```

Use:

*   GitLab instance URL (e.g., `https://gitlab.com` or your self-hosted URL)
*   Registration token
*   Description: `poweredge-runner-01`
*   Tags: `poweredge,docker,mvp`
*   Executor: `docker`
*   Default image: `alpine:latest`

## 6. Configure Runner for Docker Socket Builds (Option A)

Edit runner config:

```bash
sudo nano /etc/gitlab-runner/config.toml
```

In the runner’s `[[runners]]` block, ensure you have:

```toml
[runners.docker]
  privileged = true
  volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
```

**Notes:**

*   `privileged=true` is often necessary for some build tooling.
*   This is acceptable for a dedicated private runner; treat the runner as highly privileged.

Restart:

```bash
sudo systemctl restart gitlab-runner
sudo systemctl status gitlab-runner --no-pager
```

## 7. Validate Runner from GitLab

### 7.1 Test pipeline job

Add a minimal `.gitlab-ci.yml` job:

```yaml
stages: [test]

test_runner:
  stage: test
  tags: [poweredge]
  script:
    - whoami
    - uname -a
    - docker version
```

Commit and run pipeline.

If it fails “no runner found”, ensure:

*   runner is registered to the project/group
*   job has matching tags

## 8. Container Registry Auth Test

In CI, GitLab provides:

`$CI_REGISTRY`, `$CI_REGISTRY_USER`, `$CI_REGISTRY_PASSWORD`

Add a job to verify you can login and push:

```yaml
stages: [build]

build_push_smoke:
  stage: build
  tags: [poweredge]
  script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
    - docker build -t "$CI_REGISTRY_IMAGE:smoke" .
    - docker push "$CI_REGISTRY_IMAGE:smoke"
```

## 9. Troubleshooting

### 9.1 Runner is online but jobs aren’t picked up

*   mismatch tags
*   runner scoped to group, project job missing tags
*   protected branch restrictions

### 9.2 Docker permission denied

*   runner user not in docker group
*   docker daemon not running

### 9.3 Builds hang / slow

*   enable BuildKit
*   add caching

## 10. Security Notes (MVP)

*   A runner with Docker socket access is effectively root-equivalent.
*   Use a dedicated runner machine (you are) and limit who can edit pipelines.
*   Use protected branches for prod.

## 11. Next Docs

*   [NS-CICD-002 — Kubernetes Bootstrap (k3s + ingress + storage)](./NS-CICD-002-KUBERNETES.md)
*   [NS-CICD-003 — Deploy Job Standard (helm + kubeconfig vs agent)](./NS-CICD-003-GL-DEPLOY-INTEGRATION.md)
*   [NS-CICD-004 — Package Nexus Inside Cluster (pip/conan/npm + caching)](./NS-CICD-004-HELM-CHART.md)
