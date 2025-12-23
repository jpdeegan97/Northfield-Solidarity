
export const NS_PIE_001_OVERVIEW = `
# Product InsightIQ Engine (PIE) - Overview

**System Name:** Product InsightIQ Engine  
**Document Title:** Product InsightIQ Engine Overview  
**Document Id:** NS-PIE-001-OVERVIEW  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Product InsightIQ Engine (PIE)** is responsible for transforming fragmented market signals into **coherent, explainable, and decision-ready product insights**.

PIE exists to answer a single core question:
> What products, markets, or opportunities are worth serious consideration — and why?

PIE does **not** execute actions, allocate capital, or authorize decisions. Its role is to **surface truth, uncertainty, and confidence** in a structured form that downstream engines and human operators can reason about.

## 2. Role Within Northfield Solidarity
PIE sits in the **intelligence layer** of the Northfield Solidarity engine ecosystem.

It acts as the **primary synthesis engine** between:
- **SIG (Signal Aggregation Engine):** raw, normalized, trust-scored signals
- **DRE (Deep Research Engine):** long-horizon thematic and exploratory research

And downstream consumers:
- **DAT (Digital Arbitrage Tooling):** execution planning
- **SIM (Simulation & Scenario Engine):** counterfactual analysis
- **GGP (Governance Graph Processor):** approval, audit, and control
- **Humans:** strategic review and judgment

PIE converts **data exhaust** into **decision context**.

## 3. What PIE Produces
PIE produces **Insights**, which are structured, versioned artifacts composed of:
- A clear **opportunity statement**
- Supporting **evidence and signals**
- Quantified **confidence and uncertainty**
- Explicit **risks and counter-signals**
- Time-bound **relevance and decay semantics**

Outputs may take multiple forms:
- Ranked insight lists
- Event emissions to downstream engines
- Read-only query surfaces for humans

PIE outputs are always **explainable** and **auditable**.

## 4. What PIE Does Not Do
To preserve system clarity and safety, PIE explicitly does **not**:
- Execute trades, listings, or market actions (DAT)
- Simulate scenarios or financial outcomes (SIM, FLO)
- Approve or authorize actions (GGP)
- Manage identities, entities, or permissions (IDN, PECA)

**PIE proposes. Others decide and act.**

## 5. Core Capabilities
At a high level, PIE provides the following capabilities:

- **Signal Synthesis:** Aggregates and contextualizes signals from SIG and DRE.
- **Insight Generation:** Forms candidate opportunities based on correlated evidence.
- **Scoring & Ranking:** Applies consistent, versioned scoring models to compare opportunities.
- **Narrative Explanation:** Produces human-readable rationales for each insight.
- **Decay & Relevance Management:** Ensures stale insights lose prominence over time.

## 6. Interaction With Other Engines

| Engine | Relationship to PIE |
| :--- | :--- |
| **SIG** | Supplies normalized, trust-scored signals |
| **DRE** | Supplies deep research artifacts and hypotheses |
| **SIM** | Consumes PIE insights for scenario testing |
| **DAT** | Consumes approved insights for execution planning |
| **GGP** | Governs promotion, approval, and audit of insights |
| **PTE** | Tracks performance of insight-driven initiatives |

PIE never bypasses governance or execution controls.

## 7. Operational Posture
PIE is:
- **Read-heavy** for consumers
- **Write-controlled** through governed pipelines
- **Deterministic** given the same inputs and model versions
- **Replayable** for audit and model evolution

PIE is designed to support both **human-in-the-loop** and **progressive automation** workflows.

## 8. Expected Outcomes
When PIE is functioning correctly:
- High-quality opportunities surface earlier
- False positives are explainable and correctable
- Downstream engines operate with better context
- Governance decisions are faster and better-informed

**PIE reduces noise, not judgment.**
`;

export const NS_PIE_002_TAXONOMY = `
# Product InsightIQ Engine (PIE) - Taxonomy

**Document Id:** NS-PIE-002-TAXONOMY  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose of This Document
This document defines the **canonical taxonomy** for the Product InsightIQ Engine (PIE).

The taxonomy establishes a **shared vocabulary and set of atomic primitives** used across PIE and its downstream consumers (SIM, DAT, GGP, PTE). Its goal is to ensure that:
- Insights are **structurally consistent**
- Reasoning is **explainable and auditable**
- No downstream system must infer meaning implicitly

All PIE data models, APIs, events, and scoring logic must conform to this taxonomy.

## 2. Core Taxonomy Principles
PIE taxonomy follows these principles:
- **Composability:** Complex insights are built from small, well-defined primitives
- **Explainability:** Every insight can be decomposed into evidence and reasoning
- **Versionability:** All primitives are versioned and historically traceable
- **Decay Awareness:** Time relevance is explicit, never implied
- **Governance Compatibility:** All primitives map cleanly into GGP controls

## 3. Top-Level PIE Objects

### 3.1 Insight
An **Insight** is the primary output of PIE. It represents a **candidate opportunity or market hypothesis** that is supported by evidence and bounded by uncertainty.

An Insight:
- Is **proposed, never executed**
- Is **versioned**
- Has a bounded lifetime
- Can be promoted, rejected, or expired

**Key Attributes:** Insight ID, Opportunity Statement, Insight Type, Confidence Score, Risk Profile, Decay Model, Status.

### 3.2 Opportunity Statement
The **Opportunity Statement** is a concise, human-readable articulation of the insight.
It answers: *What should we consider doing, and in what context?*

It must be: Action-oriented but non-prescriptive, Understandable without reading raw data, Stable across minor evidence changes.

## 4. Supporting Evidence Primitives

### 4.1 Signal Reference
A **Signal Reference** links an Insight to one or more signals produced by SIG. Signals provide **observable facts, not conclusions**.
**Attributes:** Signal ID, Source, Trust Score, Timestamp, Signal Type.

### 4.2 Research Artifact
A **Research Artifact** links an Insight to deeper analysis produced by DRE. Artifacts provide **context, background, and long-horizon reasoning**.
**Attributes:** Artifact ID, Research Topic, Confidence Annotation, Version.

### 4.3 Evidence Bundle
An **Evidence Bundle** is a logical grouping of signals and research artifacts that jointly support an Insight.
Allows downstream systems to: Inspect supporting facts, Weigh corroboration vs contradiction, Audit reasoning chains.

## 5. Reasoning & Scoring Primitives

### 5.1 Scoring Model
A **Scoring Model** defines how PIE evaluates and compares Insights.
Scoring models are: Explicit, Versioned, Replayable.

### 5.2 Confidence Score
The **Confidence Score** represents PIE’s internal belief in the Insight’s validity. It is Quantitative, Model-derived, Explicitly separated from risk.

### 5.3 Risk Profile
The **Risk Profile** captures known downside factors (Market risk, Execution complexity, Regulatory uncertainty). Risk does not negate confidence; it contextualizes it.

## 6. Time & Relevance Primitives

### 6.1 Decay Model
The **Decay Model** defines how an Insight loses relevance over time (Time-based, Event-based, Signal-driven).
Insights without fresh evidence must decay.

### 6.2 Relevance Window
The **Relevance Window** defines the time horizon in which the Insight is actionable. Outside this window, Insights are considered **historical context only**.

## 7. State & Lifecycle Primitives

### 7.1 Insight Status
An Insight transitions through explicit states: Proposed, Under Review, Approved (by GGP), Rejected, Expired.
State transitions are **auditable events**.

### 7.2 Promotion Readiness
**Promotion Readiness** indicates whether an Insight may be handed off to SIM or DAT. It is a function of Confidence thresholds, Risk tolerance, and Governance rules.
PIE never self-promotes.
`;

export const NS_PIE_003_ARCHITECTURE = `
# Product InsightIQ Engine (PIE) - Architecture

**Document Id:** NS-PIE-003-ARCHITECTURE  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines the **logical architecture** of the Product InsightIQ Engine (PIE), aligned to the canonical PIE taxonomy.

## 2. Architectural Overview
PIE is structured as a pipeline of bounded subsystems:
1. **Input Intake** (from SIG and DRE)
2. **Context Assembly**
3. **Insight Generation**
4. **Scoring & Ranking**
5. **Narrative Synthesis**
6. **Output & Publication**
7. **Persistence & Replay Support**

Each subsystem is designed to be **Deterministic**, **Independently testable**, and **Observable**.

## 3. Core Components

### 3.1 Signal Intake Adapter (SIG -> PIE)
- Pull/subscribe to normalized signals from SIG.
- Validate envelope and trust scores.
- **Note:** PIE must not rewrite SIG trust scores.

### 3.2 Research Intake Adapter (DRE -> PIE)
- Ingest Research Artifacts from DRE.
- Associate artifacts to Topics/Themes.

### 3.3 Context Assembly Layer
- Build a contextual snapshot binding Signals and Research.
- Primary Function: Produce an **Evidence Bundle** per candidate Insight.
- Where "raw facts" become a structured basis.

### 3.4 Insight Generator
- Convert Evidence Bundles into candidate **Insights**.
- Produce stable Opportunity Statement.
- Must be deterministic.

### 3.5 Scoring & Ranking Service
- Apply **Scoring Models** to candidate Insights.
- Compute Confidence Score.
- Every score references a Scoring Model version.

### 3.6 Risk Profiling Service
- Identify and annotate known risks.
- Attach a **Risk Profile**.

### 3.7 Decay & Relevance Manager
- Attach Decay Model and Relevance Window.
- Reduce ranking prominence over time.

### 3.8 Narrative & Explanation Layer
- Produce human-readable explanation tying Statement, Evidence, and Score.
- **Note:** Narrative must not introduce new "facts".

### 3.9 Output Publisher
- Emit insights to downstream consumers via Events (async) or APIs (sync).
- **Outputs:** \`pie.insight.proposed\`, \`pie.insight.updated\`, etc.
- **Note:** Promotion is governed by GGP.

## 4. Persistence & Replay Architecture
PIE requires two categories of persistence:
1. **Authoritative Insight Records:** Append-only, source of truth. (Insight versions, Evidence bundles, Scoring model versions).
2. **Derived Read Models:** Rebuildable. (Ranked lists, Dashboards).

**Replay Goals:** Rebuild derived models, Recompute scores when models change.

## 5. Interfaces & Integrations
- **PIE <-> SIG:** Consumes signals.
- **PIE <-> DRE:** Consumes artifacts.
- **PIE <-> SIM:** SIM consumes Insights for scenarios.
- **PIE <-> DAT:** DAT consumes approved insights for planning.
- **PIE <-> GGP:** GGP governs promotion/approval.
- **PIE <-> PTE:** PTE tracks performance.

## 6. Control Surfaces
Governance compatible surfaces:
- **Model Registry**
- **Threshold Controls**
- **Kill Switch**
- **Replay Controls**
`;

export const NS_PIE_004_LIFECYCLE = `
# Product InsightIQ Engine (PIE) - Lifecycle

**Document Id:** NS-PIE-004-LIFECYCLE  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines the end-to-end lifecycle of an Insight within PIE, ensuring predictability and auditability.

## 2. Design Principles
- **Explicit State Transitions:** No implicit promotion.
- **Governance First:** All promotions cross GGP.
- **Time Awareness:** Relevance is always bounded.
- **Replayability:** Historical paths can be reconstructed.
- **Non-Executional:** PIE never triggers action directly.

## 3. High-Level Flow
Signal Intake -> Context Assembly -> Insight Proposal -> Scoring/Risk -> Governance Review -> Downstream Consumption -> Feedback -> Decay/Expiry.

## 4. Insight States

### 4.1 Proposed
- Entry Condition: Evidence assembled, Statement generated.
- Not visible for execution.
- Transitions: -> Under Review, -> Rejected.

### 4.2 Under Review
- Entry Condition: Submitted for governance.
- Actors: GGP, Humans.
- Transitions: -> Approved, -> Rejected, -> Proposed (revision).

### 4.3 Approved
- Entry Condition: Governance approval granted.
- Eligible for downstream consumption (SIM, DAT).
- Transitions: -> Expired, -> Rejected.

### 4.4 Rejected
- Entry Condition: Governance/Human rejection.
- Retained for audit.
- Transitions: None (terminal).

### 4.5 Expired
- Entry Condition: Relevance window exceeded / Decay threshold crossed.
- Historical context only.
- Transitions: None (terminal).

## 5. Event Emissions
Each transition emits an immutable event: \\
\`pie.insight.proposed\`, \`pie.insight.reviewed\`, \`pie.insight.approved\`, \`pie.insight.rejected\`, \`pie.insight.expired\`.
`;

export const NS_PIE_005_DECISION = `
# Product InsightIQ Engine (PIE) - Decision Semantics

**Document Id:** NS-PIE-005-DECISION  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines how PIE evaluates, qualifies, and prepares Insights for governance review. PIE decisioning is **advisory and preparatory**. All authoritative decisions are owned by GGP.

## 2. Decision Boundary Principles
- **No Authority to Act:** PIE never triggers execution.
- **No Authority to Approve:** PIE cannot self-promote.
- **Explainability Required:** Outputs must be decomposable.

## 3. Decision Objects
### 3.1 Promotion Readiness
A structured recommendation indicating if an Insight is ready for governance review.
### 3.2 Decision Context
Immutable context including Evidence, Scores, Risk, and Decay status.

## 5. Decision Rules
### 5.1 Confidence Thresholds
Minimum confidence per Insight Type. Below threshold = Not Ready.
### 5.2 Risk Gating
High-risk insights may be promoted if risks are **explicit and bounded**.
### 5.3 Evidence Sufficiency
At least one high-trust signal OR multiple corroborating signals/artifacts.
### 5.4 Decay Constraints
Stale insights cannot auto-escalate.

## 6. Decision Outcomes
- **Ready for Review:** Submit to GGP.
- **Not Ready:** Remain Proposed.
- **Deprioritized:** Allow to decay.

**No decision outcome is terminal except via governance.**
`;

export const NS_PIE_006_VERSION = `
# Product InsightIQ Engine (PIE) - Versioning

**Document Id:** NS-PIE-006-VERSION  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning rules to ensure **historical traceability**, **replayability**, and **audit preservation**.

## 2. Principles
- **Semantic Changes Create New Versions.**
- **Non-Semantic Updates Do Not Rewrite History.** (Append-only).
- **Explicit Causality.** (Link to what caused the change).
- **Downstream Stability.**

## 3. Identifiers
- **\`insight_id\`**: Stable across the life of the insight.
- **\`insight_version\`**: Increments when semantic content changes.
- Authoritative key: \`(insight_id, insight_version)\`.

## 4. What Triggers a New Version
- Opportunity Statement Meaning Changes
- Insight Type Changes
- Material Evidence Composition Changes
- Material Risk Profile Changes
- Relevance Window Shifts
- Narrative Meaning Changes

## 5. What Does NOT Trigger a New Version
- Derived Read Model Rebuilds
- New Scoring Model Applied (Re-score) -> creates \`scoring_result\` record
- Decision Context Re-evaluation -> creates \`decision_context\` record
- Minor Formatting
- Decay State Updates

## 6. Sub-Artifact Versioning
- **Scoring Models:** independent versioning.
- **Evidence Bundles:** bound to Insight version.
- **Risk Profiles:** append-only records.
- **Narratives:** versioned snapshots.

## 7. Governance
PIE versioning rules must be governed by GGP.
`;

export const NS_PIE_007_DATAMODEL = `
# Product InsightIQ Engine (PIE) - Data Model

**Document Id:** NS-PIE-007-DATAMODEL  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical data model, storage strategy, and event contracts.

## 2. Persistence Strategy
- **Authoritative Store (System of Record):** Append-only, replayable. Holds Insight versions, Evidence references, Decision contexts.
- **Derived Read Models:** Rebuildable. Holds Ranked lists, Indices.

## 4. Canonical Entities (Authoritative)
- **\`insight\`**: \`insight_id\`, \`insight_version\`, \`type\`, \`statement\`, \`status\`.
- **\`evidence_bundle\`**: \`bundle_id\`, \`insight_id\`, \`version\`.
- **\`evidence_item\`**: \`item_id\`, \`bundle_id\`, \`type\`, \`ref_id\` (signal/artifact).
- **\`scoring_result\`**: \`score_id\`, \`confidence\`, \`model_version\`.
- **\`risk_profile\`**: \`risk_id\`, \`band\`, \`flags\`.
- **\`decay_model\`**: \`decay_id\`, \`window_start\`, \`window_end\`.
- **\`narrative\`**: \`narrative_id\`, \`summary\`, \`rationale\`.
- **\`decision_context\`**: \`decision_id\`, \`inputs_snapshot\`.
- **\`insight_state_transition\`**: \`transition_id\`, \`from_status\`, \`to_status\`, \`actor\`.

## 5. Derived Read Models
- **\`insight_rankings\`**: cached ranking views.
- **\`insight_search_index\`**: searchable text and tags.

## 7. Replay & Rebuild
PIE must support **Read Model Rebuild**, **Score Replay**, and **Decision Replay**. Replay never mutates history; it appends.
`;

export const NS_PIE_008_EEE = `
# Product InsightIQ Engine (PIE) - End-to-End Example (EEE)

**Document Id:** NS-PIE-008-EEE  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Illustrates how PIE operates in practice with a concrete scenario.

## 2. Scenario Overview
**Objective:** Identification of a potential high-margin consumer product opportunity in a niche home category.

## 3. Execution Flow
1. **Intake:**
   - **SIG:** Detected Signal A (Search Vol), Signal B (Social), Signal C (Marketplace).
   - **DRE:** Research Artifact R1 (Demographic analysis).
2. **Context Assembly:** EB-001 created referencing Signals A,B,C and Artifact R1.
3. **Insight Proposal:** INS-042 v1 created. Status: **Proposed**.
   - Statement: *"Opportunity to enter niche home category focused on [attribute]..."*
4. **Scoring & Risk:**
   - Model v1.3 applied. Confidence: 0.74.
   - Risk: Moderate execution complexity.
5. **Decision & Handoff:**
   - Promotion Readiness = **True**.
   - Submitted to **GGP**. Emits \`pie.insight.ready_for_review\`.
6. **Governance Review:**
   - GGP **Approves**.
   - State: **Approved**.
7. **Downstream:**
   - **SIM** consumes INS-042 for scenarios.
   - **DAT** consumes for planning.
8. **Feedback:**
   - PTE tracks performance (if acted upon).
9. **Decay:**
   - Months later, no new signals.
   - Insight **Expires**.

## 12. Replay & Audit
An auditor can reconstruct the Evidence Bundle and re-run Scoring Model v1.3 to reproduce the result exactly.
`;

export const NS_PIE_009_IMPL = `
# Product InsightIQ Engine (PIE) - Implementation Blueprint

**Document Id:** NS-PIE-009-IMPL  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Translates conceptual specs into an MVP implementation plan.

## 2. Principles
- **Thin Services, Strong Contracts.**
- **Append-Only Core.**
- **Deterministic Pipelines.**
- **MVP First.**

## 3. Logical Service Decomposition (MVP)
- **Signal/Research Intake Services:** Ingest and Validate.
- **Context Assembly Service:** Group into EvidenceBundles.
- **Insight Generation Service:** Create Proposed Insights.
- **Scoring Service:** Apply confidence models.
- **Risk Profiling Service:** Annotate risks.
- **Decay Service:** Manage windows and expiry.
- **Narrative Service:** Generate summaries.
- **Decision Service:** Evaluate promotion readiness.
- **Output Service:** Publish events/APIs.

## 6. API Surfaces (MVP)
- **Read:** \`GET /insights\`, \`GET /insights/{id}\`, \`GET /versions\`.
- **Control (Governed):** \`POST /controls/scoring-model/activate\`, \`POST /controls/replay\`.

## 9. Incremental Delivery
- **Phase 1 (MVP):** Single scoring model, batch generation, read-only dashboard.
- **Phase 2:** Multiple models, real-time intake.
- **Phase 3:** Human feedback, advanced decay.
`;

export const NS_PIE_010_FE = `
# Product InsightIQ Engine (PIE) - Frontend / Visualization

**Document Id:** NS-PIE-010-FE  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the frontend layer for PIE: human-readable exploration, evidence inspection, and workflow visibility.

## 2. Design Principles
- **Explainability First:** Show "why" (evidence + reasoning).
- **Progressive Disclosure:** Summary first, drill-down later.
- **Governance Awareness:** Status visibility.
- **Operational Safety:** No execution affordances in PIE.

## 4. Canonical Screens (MVP)
### 4.1 Insight Feed (Ranked List)
- Rapid triage.
- Columns: Statement, Confidence, Risk, Status, Freshness.
- Filters: Status, Type.

### 4.2 Insight Detail (Explainability View)
- Header: Statement, Version, Status.
- **Evidence Bundle:** List of Signals (with Trust) and Artifacts.
- **Scoring:** Breakdown of model features.
- **Governance:** Linkage to GGP decision.
- **Narrative:** Human readable text.

### 4.3 Version History
- List of versions with deltas and reasons (Evidence change, Model change).
- Compare side-by-side.

## 6. Component Inventory
- \`InsightCard\`, \`StatusBadge\`, \`ConfidenceMeter\`, \`RiskBadge\`, \`EvidenceList\`, \`VersionTimeline\`.
`;

export const NS_PIE_011_APIMAP = `
# Product InsightIQ Engine (PIE) - API Mapping

**Document Id:** NS-PIE-011-APIMAP  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Maps PIE backend API surfaces to FE and consumer needs.

## 2. Design Principles
- **Read-First.**
- **Versioned Access.**
- **Governed Controls Only.**

## 4. Screen Mapping
- **Feed:** \`GET /insights?status=...&sort=confidence\`
- **Detail:** \`GET /insights/{id}/detail?version={n}\`
- **History:** \`GET /insights/{id}/versions\`

## 5. Consumer Mapping
- **SIM:** \`GET /insights?status=approved\`
- **GGP:** \`GET /insights/{id}/decision-context\`

## 7. Governed Control APIs
Restricted to authorized actors:
- \`POST /controls/scoring-model/activate\`
- \`POST /controls/publication/pause\`
`;

export const NS_PIE_012_STATE = `
# Product InsightIQ Engine (PIE) - State Semantics

**Document Id:** NS-PIE-012-STATE  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the state model, transitions, and sub-state semantics.

## 3. Authoritative Insight Status
- **Proposed** -> **Under Review** (via PIE submit)
- **Under Review** -> **Approved** OR **Rejected** (via GGP)
- **Approved** -> **Expired** (via PIE decay)
- **Proposed** -> **Expired** (via PIE decay)

## 4. Sub-States
- **Promotion Readiness:** Evaluative boolean (Ready/Not Ready).
- **Decay State:** Fresh / Aging / Stale.
- **Governance Linkage:** Reference to GGP decision.

## 6. Consistency Model
- **Authoritative:** Append-only, strongly consistent per insight.
- **Derived:** Eventually consistent.

## 7. Late-Arriving Data
- **Proposed:** May append evidence or create new version.
- **Approved:** Does not retroactively change approved version. May trigger new version for re-review.
`;

export const NS_PIE_013_RUNBOOK = `
# Product InsightIQ Engine (PIE) - Runbook

**Document Id:** NS-PIE-013-RUNBOOK  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures, controls, and recovery actions.

## 3. System Health
- **Startup:** Verify SIG/DRE connectivity, Store access, Governance endpoints.
- **Safe Mode:** Pause publication if dependencies fail.

## 4. Normal Operations
- **Intake:** Continuous ingestion.
- **Generation:** Deterministic pipeline.
- **Scoring:** Active model applied.

## 6. Replay & Backfill
- **Read Model Rebuild:** Drop and rebuild from authoritative.
- **Score Replay:** Recompute for historical insights when model changes.
- **Decision Replay:** Re-evaluate promotion readiness.

## 7. Failure Scenarios
- **SIG/DRE Unavailable:** Enter Safe Mode, alert.
- **Store Failure:** Halt generation.

## 10. Operational Invariants
- PIE never executes actions.
- PIE never mutates historical records.
- Replay never overwrites history.
`;

export const NS_PIE_014_DATADEF = `
# Product InsightIQ Engine (PIE) - Data Definitions

**Document Id:** NS-PIE-014-DATADEF  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical field-level schemas for authoritative PIE entities.

## 4. Canonical Entity Definitions
- **Insight:** \`insight_id\` (UUID), \`version\` (Int), \`type\`, \`statement\`, \`status\`.
- **Evidence Bundle:** \`bundle_id\`, \`insight_id\`, \`version\`.
- **Evidence Item:** \`item_id\`, \`bundle_id\`, \`evidence_type\` (signal/research), \`ref_id\`, \`trust\`.
- **Scoring Result:** \`score_id\`, \`model_id\`, \`confidence\`, \`breakdown\`.
- **Risk Profile:** \`risk_id\`, \`band\` (low/med/high), \`flags\`.
- **Decay Model:** \`decay_id\`, \`window_start\`, \`window_end\`, \`type\`.
- **Narrative:** \`narrative_id\`, \`summary\`, \`rationale\`.
- **Decision Context:** \`decision_id\`, \`inputs_snapshot\`.
- **State Transition:** \`transition_id\`, \`from\`, \`to\`, \`actor\`.

## 7. Invariants
- Evidence must exist before scoring.
- Decision contexts are immutable.
- State transitions are append-only.
- All timestamps UTC.
`;
