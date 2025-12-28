# INCEPTION-015 — ROADMAP & BACKLOG

**Version:** 0.1.0  
**Last Updated:** 2025-12-26  

## 1. Active Development (v0.1)

- [x] **Project Charter Definition**: Scope, mission, and boundaries defined.
- [x] **Staging Environment UI**: `SanctumEngineBuilder.jsx` created as visual control plane.
- [ ] **Prototype Scaffolding**: Local simulation of asset generation.

## 2. Infrastructure & Integration (v0.2)

- [ ] **K8s Deployment Pipeline**: Transition from local simulation to cluster-native execution.
- [ ] **GitOps Bridge**:
  - [ ] Replace `runSync` simulation with real API calls.
  - [ ] Implement `Bridge API` to handle authenticated git operations.
  - [ ] Remove local file system write access mock.
- [ ] **Secret Management**: Integrate with Vault/SealedSecrets for generating project credentials.

## 3. Advanced Synthesis (v1.0)

- [ ] **Full Holographic Projection**: Sync project state to Firmament visualization.
- [ ] **AI-driven Scaffolding**: Use LLMs to generate increasingly complex `idea.yaml` configs.
- [ ] **Marketplace Integration**: Auto-publish generated engines to the internal marketplace.
