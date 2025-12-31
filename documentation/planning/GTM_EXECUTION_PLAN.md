# Sanctum Go-To-Market (GTM) Execution Plan

**Objective:** Transform the Northfield Solidarity ecosystem from a high-fidelity prototype into a market-ready, secure, and legally structured commercial product.

**Status:** DRAFT
**Owner:** J. Deegan
**Date:** 2025-12-29

---

## Phase 1: Firmament Solidity (Baseline Functionality)

*Objective: Ensure every engine and project within Firmament is visually complete, interactively functional (happy paths), and presentation-ready.*

### 1.1 Engine Audit & Standardization

- [ ] **Audit "Skeleton" Engines:** Review the following engines to ensure they have at least MVP functionality:
  - [x] **DEP** (Dependency Engine)
  - [x] **INC** (Project Incubator)
  - [x] **CRN** (Chronicle)

- [x] **Standardize UI/UX:** Implemented `EngineHeader` component and applied to skeleton engines.
- [x] **Mock Data Robustness:** Verified `DEP`, `INC`, and `CRN` use structured JSON mock data defined in-file.

### 1.2 Feature Completion (The "Happy Path")

- [ ] **Data visualization:** Ensure `DAT`, `FLO`, and `SIM` have active, moving charts (even if simulated).
- [ ] **Input Forms:** Ensure `IDN` (Identity) and `INC` (Incorporation) have working input forms with validation states.
- [ ] **Terminal Interfaces:** Ensure `IDE` and `SIG` (Signals) have working terminal-like inputs that accept commands (even if they just return canned responses).

### 1.3 "Ubiquitous" Visualizer Integration

- [ ] Verify `WPV` (White Paper Visualizer) is accessible from *all* context menus where documentation exists (completed for Marketplace/Docs, check others).

---

## Phase 2: Corporate & IP Structuring

*Objective: Formalize the legal and intellectual property foundations to protect assets and enable commercial operation.*

### 2.1 Entity Registration (LLCs)

- [ ] **Master Entity:** Formalize **Northfield Solidarity LLC** (The HoldCo).
- [ ] **Subsidiary Mapping:** Register specific LLCs for distinct risk/product buckets:
  - *NSDC Educational Services LLC* (for Academy/Content)
  - *NSDC IP Holdings LLC* (Separate IP ownership from operations)
  - *NS MGMT LLC* (Management/Advisory)
- [ ] **Operating Agreements:** Draft standard OAs for each entity, defining the relationships and royalty flows (referencing the "Partner Royalty Program" work).

### 2.2 IP Assignment & Protection

- [ ] **Code Inventory:** create a strict mapping of `Directory/Repo` -> `Owning Entity`.
- [ ] **Provisional Patents:** File provisionals for novel mechanics:
  - *Identity & Entity Nexus (IDN) Trust Models*
  - *White Paper Visualizer (WPV) Rendering Engine*
  - *Deep Research Engine (DRE) Correlation logic*
- [ ] **Trademark Search:** Run searches for "Northfield", "Firmament", "Sanctum" to ensure clear air.

---

## Phase 3: The Factory (CI/CD Pipeline)

*Objective: Automate the path from "Code Written" to "Code Deployed" to ensure clear automation for future projects.*

### 3.1 Source Control Sanitation

- [ ] **Monorepo Strategy:** Finalize valid structure (ensure `sanctum`, `site`, and `backend` are properly isolated or integrated).
- [ ] **Branching Strategy:** Enforce `main` protection. PRs required for merge.

### 3.2 Automated Pipelines (GitHub Actions / GitLab CI)

- [ ] **Build Check:** Every commit triggers a build to catch compilation errors immediately.
- [ ] **Lint & Format:** Auto-run ESLint/Prettier to deny messy code.
- [ ] **Test Runner:** Run unit tests (Jest/Vitest) on critical logic paths (IDN calculations, Finance logic).

### 3.3 Deployment Automation

- [ ] **Staging Environment:** Auto-deploy `develop` branch to a password-protected URL (e.g., `staging.northfield.so`) for review.
- [ ] **Production Release:** One-click promote from Staging to Production.

---

## Phase 4: Fortification (Security)

*Objective: Address the "no pen testing" debt. Harden the application against black hats.*

### 4.1 Vulnerability Assessment

- [ ] **Dependency Audit:** Run `npm audit` and upgrade high-severity vulnerabilities.
- [ ] **Static Analysis (SAST):** Implement SonarQube or CodeQL to find logic flaws/leaks in the codebase.
- [ ] **Secrets Sweep:** Ensure NO API keys or private certificates are hardcoded in the frontend bundles. Move all to `.env` and deployment secrets.

### 4.2 Application Hardening

- [ ] **Auth Gates:** Verify *every* sensitive route checks for a valid session token (JWT validation).
- [ ] **Rate Limiting:** Implement rate limiting on the API layer (or mock service layer) to prevent spam.
- [ ] **Input Sanitization:** ensuring no "User Input" in Firmament can execute XSS (Cross-Site Scripting).

### 4.3 Red Teaming

- [ ] **Internal Pentest:** Attempt to break the roles (e.g., try to access Admin routes as a standard investor).
- [ ] **Data Leak Check:** Verify that requesting "My Data" doesn't return "Everyone's Data".

---

## Phase 5: Backend & Scale (Upcoming)

*Objective: Replace the Frontend Mocks with Real Steel.*

- [ ] **API Spec Definition:** OpenApi (Swagger) specs for all engines.
- [ ] **Database Migration:** Move from local JSON/LocalStorage to PostgreSQL/TimescaleDB.
- [ ] **Serverless/Microservices:** Deploy individual engines (search, finance) as discrete services.
