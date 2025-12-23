
export const NS_DAT_001_OVERVIEW = `
# Digital Arbitrage Tooling (DAT) - Overview

**System Name:** Digital Arbitrage Tooling (DAT)  
**Document Title:** DAT Overview  
**Document Id:** NS-DAT-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Digital Arbitrage Tooling (DAT)** engine is responsible for planning, staging, and executing governed market actions derived from approved insights.

DAT exists to answer the question:
> How do we turn an approved opportunity into a concrete, executable plan — safely, repeatably, and measurably?

DAT operates only on **approved inputs** and never invents opportunities. It translates intent into execution-ready workflows.

## 2. Role Within Northfield Solidarity
DAT sits in the **execution planning and orchestration layer** of the Northfield Solidarity ecosystem.

**Upstream inputs:**
- **PIE:** approved insights and opportunity context
- **SIM:** scenario analysis, sensitivity bounds
- **GGP:** authorization, constraints, approvals

**Downstream integrations:**
- Marketplaces
- Ad platforms
- Vendors / suppliers
- Automation and fulfillment systems

DAT is the bridge between strategy and action.

## 3. What DAT Produces
DAT produces **Execution Plans**, which are structured, versioned artifacts describing:
- What actions will be taken
- In what sequence
- Under what constraints
- With what budgets and risk limits
- With what success and rollback criteria

Execution Plans may result in:
- Dry-run simulations
- Scheduled executions
- Live automated actions

All outputs are governed, auditable, and replayable.

## 4. What DAT Does Not Do
To preserve system safety and clarity, DAT explicitly does **not**:
- Generate opportunities or insights (PIE)
- Approve actions or budgets (GGP)
- Perform financial accounting (FLO)
- Simulate hypothetical outcomes (SIM)
- Manage identity or permissions (IDN)

**DAT executes within bounds set by others.**

## 5. Core Capabilities
- **Execution Planning:** Translate approved insights into step-by-step plans.
- **Constraint Enforcement:** Respect governance, budget, timing, and risk limits.
- **Dry-Run & Staging:** Validate plans without live execution.
- **Execution Orchestration:** Coordinate APIs, jobs, and workflows.
- **Rollback & Recovery:** Provide safe abort and unwind mechanisms.
- **Telemetry Emission:** Emit execution events for observability and accounting.

## 6. Interaction With Other Engines

| Engine | Relationship to DAT |
| :--- | :--- |
| **PIE** | Supplies approved insights |
| **SIM** | Supplies scenario bounds |
| **GGP** | Governs authorization and constraints |
| **FLO** | Consumes execution financial events |
| **PTE** | Tracks execution performance |
| **SIG** | May receive execution-generated signals |

DAT never bypasses governance or accounting.

## 7. Operational Posture
DAT is:
- **Write-heavy** during execution
- **Stateful** with explicit checkpoints
- **Highly controlled** (kill switches, approvals)
- **Observable** at every step
- **Fail-safe** by design

DAT favors correctness and safety over raw speed.

## 8. Expected Outcomes
When DAT is operating correctly:
- Approved opportunities move to execution smoothly
- Risk and budget overruns are prevented
- Failures are contained and reversible
- Performance is measurable and attributable

**DAT turns insight into impact — safely.**
`;

export const NS_DAT_002_TAXONOMY = `
# Digital Arbitrage Tooling (DAT) - Taxonomy

**Document Id:** NS-DAT-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose of This Document
This document defines the **canonical taxonomy** for the Digital Arbitrage Tooling (DAT) engine.

The taxonomy establishes the atomic execution primitives used to:
- Translate approved opportunities into executable plans
- Enforce governance, budget, and risk constraints
- Ensure execution is auditable, replayable, and reversible

This taxonomy is the shared language across DAT, GGP, FLO, SIM, and PTE.

## 2. Taxonomy Design Principles
- **Execution Is Explicit:** No implicit or hidden actions
- **Plans Before Actions:** Nothing executes without a plan
- **Constraints Are First-Class:** Execution is bounded by design
- **Rollback Is Mandatory:** Every action must define recovery
- **Telemetry Is Canonical:** Every action emits measurable events

## 3. Core DAT Primitives

### 3.1 Execution Plan
**Definition:** A versioned, governed artifact describing how an approved opportunity will be executed.
**Characteristics:**
- Derived from a specific PIE Insight version
- Authorized by GGP
- Bound by explicit constraints

**Key Attributes:** \`execution_plan_id\`, \`plan_version\`, \`linked_insight_id\`, \`linked_insight_version\`, \`status\` (draft / approved / staged / executing / completed / aborted).

### 3.2 Action
**Definition:** An atomic, externally visible operation performed against a system or market.
**Examples:** Create marketplace listing, Launch ad campaign, Place supplier order, Update pricing.
**Key Attributes:** \`action_id\`, \`action_type\`, \`target_system\`, \`parameters\`.
**Note:** Actions are never executed directly; they belong to Steps.

### 3.3 Step
**Definition:** A single ordered unit of execution within a plan.
**Characteristics:**
- Executes exactly one Action
- Has explicit preconditions and postconditions

**Key Attributes:** \`step_id\`, \`execution_plan_id\`, \`step_order\`, \`action_id\`, \`step_status\` (pending / running / completed / failed / rolled_back).

### 3.4 Constraint
**Definition:** A rule that limits or bounds execution.
**Types:** Budget constraint, Time window constraint, Risk threshold, Quantity cap.
**Key Attributes:** \`constraint_id\`, \`constraint_type\`, \`constraint_parameters\`, \`enforcement_level\` (hard / soft).

### 3.5 Budget
**Definition:** A quantified financial limit applied to a plan or step.
**Characteristics:**
- Enforced pre-execution and during execution
- Reported to FLO

**Key Attributes:** \`budget_id\`, \`currency\`, \`max_amount\`, \`spent_amount\`.

### 3.6 Rollback Policy
**Definition:** A predefined recovery strategy if execution deviates from expectations.
**Types:** Automatic rollback, Manual rollback, Compensating action.
**Key Attributes:** \`rollback_policy_id\`, \`rollback_type\`, \`rollback_steps\`.

### 3.7 Execution Context
**Definition:** The immutable snapshot of state and parameters under which execution occurs.
**Includes:** Plan version, Constraint snapshot, Budget snapshot, External system states.
**Note:** Execution Context is stored for replay and audit.

## 4. Telemetry & Event Primitives

### 4.1 Execution Event
**Definition:** An immutable record emitted during execution.
**Examples:** \`step.started\`, \`step.completed\`, \`step.failed\`, \`plan.aborted\`.
**Key Attributes:** \`event_id\`, \`execution_plan_id\`, \`step_id\`, \`event_type\`, \`timestamp\`, \`correlation_id\`.

### 4.2 Financial Event
**Definition:** A monetary-impacting event emitted to FLO.
**Examples:** \`spend.incurred\`, \`refund.issued\`.
**Note:** These events are authoritative for accounting.

## 5. Execution States

### 5.1 Plan States
\`draft\`, \`approved\`, \`staged\`, \`executing\`, \`completed\`, \`aborted\`.
State transitions are governed and append-only.

### 5.2 Step States
\`pending\`, \`running\`, \`completed\`, \`failed\`, \`rolled_back\`.
Steps cannot be skipped or reordered once execution begins.

## 6. Relationships Between Primitives
- Execution Plan → many Steps
- Step → one Action
- Execution Plan → many Constraints
- Execution Plan → one Budget
- Step → optional Rollback Policy
- Execution Plan → many Execution Events

## 7. Cross-Engine Alignment

| Engine | Interaction |
| :--- | :--- |
| **PIE** | Supplies approved Insight versions |
| **SIM** | Supplies execution bounds and sensitivities |
| **GGP** | Authorizes plans and constraints |
| **FLO** | Consumes financial events |
| **PTE** | Tracks performance metrics |

## 8. Invariants & Safety Rules
- No Action executes outside a Step
- No Step executes outside an approved Plan
- No Plan executes without constraints and rollback policy
- All execution emits telemetry
- All financial impact is reported
`;

export const NS_DAT_003_ARCHITECTURE = `
# Digital Arbitrage Tooling (DAT) - Architecture

**Document Id:** NS-DAT-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines the **logical architecture** of the Digital Arbitrage Tooling (DAT) engine.

DAT’s architecture is designed to:
- Convert approved opportunities into execution plans
- Enforce governance, budget, and risk constraints
- Execute actions safely with checkpoints and rollback
- Emit canonical telemetry and financial events
- Preserve determinism, auditability, and replay

## 2. Architectural Overview
DAT is organized into two planes:

**1. Control Plane (Planning & Governance)**
- Creates and versions Execution Plans
- Packages plan artifacts for GGP approval
- Manages model/config versions and controls

**2. Execution Plane (Orchestration & Action)**
- Executes approved plans step-by-step
- Enforces constraints at runtime
- Emits telemetry and financial events

This separation ensures governance and configuration changes cannot directly trigger execution.

## 3. Core Components

### 3.1 Plan Builder Service
- **Responsibility:** Translate approved PIE insight versions into draft Execution Plans. Attach Steps, Actions, and Constraints.
- **Inputs:** PIE Insight, SIM bounds, Governance templates.
- **Outputs:** ExecutionPlan (draft).

### 3.2 Plan Registry (Authoritative)
- **Responsibility:** Persist authoritative plan versions (append-only).
- **Note:** System of record for execution plans.

### 3.3 Governance Handoff Adapter (DAT → GGP)
- **Responsibility:** Package plan artifacts for GGP review.
- **Key Output:** \`dat.plan.submitted_for_approval\`.

### 3.4 Constraint Engine
- **Responsibility:** Evaluate constraints pre-execution (admission control) and during execution (runtime guards).
- **Types:** Budget caps, Time windows, Quantity limits, Risk thresholds.

### 3.5 Budget Tracker
- **Responsibility:** Track spend commitments and actual spend. Prevent overruns. Embeds authoritative spend events for FLO.

### 3.6 Execution Orchestrator
- **Responsibility:** Drive step-by-step execution. Maintain checkpoints. manage retries.
- **Requirement:** Exactly-once semantics approximated with idempotency keys.

### 3.7 Connector Layer (External Adapters)
- **Responsibility:** Integrate with external systems (Connectors).
- **Design Rule:** Each connector must be idempotent or provide compensating actions.

### 3.8 Rollback Coordinator
- **Responsibility:** Execute rollback policies on failure. Manage compensating steps.

### 3.9 Telemetry & Audit Emitter
- **Responsibility:** Emit immutable execution events.

### 3.10 Read Model Builder
- **Responsibility:** Build derived views for dashboards.

## 4. Data & Event Flow (Logical)

### 4.1 Planning Flow
PIE Insight Approved → Plan Builder (draft) → Plan Registry → Governance Adapter → GGP (Approval).

### 4.2 Execution Flow
Orchestrator (fetch approved plan) → Constraint Engine (admission) → Step Execution (Connector Layer) → Telemetry → Budget Tracker (events).
On failure → Rollback Coordinator.

## 5. Persistence & Replay Architecture
DAT requires two categories of persistence:
1.  **Authoritative Plan Artifacts:** Plan versions, steps, constraints.
2.  **Authoritative Execution History:** Events, budget logs, rollback logs.

**Replay Goals:** Reconstruct execution timelines, Recompute performance, Audit enforcement.

## 6. Interfaces & Integrations
- **DAT ↔ PIE:** Consumes approved insights. Pins to versions.
- **DAT ↔ SIM:** Consumes scenario bounds.
- **DAT ↔ GGP:** GGP approves plans.
- **DAT ↔ FLO:** DAT emits financial events.
- **DAT ↔ PTE:** DAT emits performance telemetry.
- **DAT ↔ MUX:** External wiring via MUX.

## 7. Control Surfaces
- Plan submission and approval workflow
- Execution kill switch (pause/abort)
- Connector disablement (circuit breakers)
- Replay / backfill controls

## 8. Observability Requirements
DAT must be observable at all levels: Plan throughput, Execution throughput, Failure rates, Budget burn.
All metrics attributable to \`plan_id\` + \`plan_version\`.
`;

export const NS_DAT_004_LIFECYCLE = `
# Digital Arbitrage Tooling (DAT) - Lifecycle

**Document Id:** NS-DAT-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines the end-to-end execution lifecycle of the DAT engine, specifying plan states, step states, and governed transitions.

## 2. Lifecycle Design Principles
- **Plan-First Execution:** Actions must be packaged into a plan.
- **Governed Transitions:** Approval gates are explicit.
- **Checkpointed Execution:** Pre/post state defined.
- **Rollback-Ready:** Failures resolve to known state.
- **Deterministic Replay:** History is reconstructible.

## 3. High-Level Lifecycle Flow
Insight Intake → Plan Drafting → Governance Approval → Staging → Execution Admission → Step Execution → Completion/Abort → Reconciliation → Archival.

## 4. Execution Plan State Machine

### 4.1 Plan States
\`draft\`, \`submitted_for_approval\`, \`approved\`, \`staged\`, \`executing\`, \`completed\`, \`aborted\`, \`archived\`.

### 4.2 Key Transitions
- **draft → submitted:** Packages for GGP.
- **submitted → approved:** GGP Gate.
- **submitted → aborted:** Rejected/Withdrawn.
- **approved → staged:** Dry-run prep.
- **staged → executing:** Admission checks pass.
- **executing → completed:** All steps done.
- **executing → aborted:** Failure or Kill switch.

**Note:** Executing plans cannot move to aborted without explicit failure/kill. Archived is terminal.

## 5. Step State Machine

### 5.1 Step States
\`pending\`, \`running\`, \`completed\`, \`failed\`, \`rolled_back\`.

### 5.2 Transitions
- **pending → running:** Orchestrator start.
- **running → completed:** Success.
- **running → failed:** Failure.
- **failed → rolled_back:** Rollback success.

**Note:** Steps cannot be skipped.

## 6. Lifecycle Phase Detail

### Phase 1: Approved Insight Intake
Trigger: PIE Insight approved. DAT pins to insight version.

### Phase 2: Plan Drafting
Build Execution Plan, define steps, attach constraints. Status: \`draft\`.

### Phase 3: Governance Approval Gate
Submit to GGP. Wait for decision. Status: \`approved\` or \`aborted\`.

### Phase 4: Staging / Dry Run
Validate connectors and parameters. Status: \`staged\`.

### Phase 5: Execution Admission Checks
Evaluate constraints (Time, Caps, Risk) and Budget. If fail, remain \`staged\`.

### Phase 6: Step Execution
Loop through steps. Execute action. Emit telemetry. Handler failure via Rollback.

### Phase 7: Completion / Abort
All steps done OR Kill switch / Hard constraint violation.

### Phase 8: Post-Execution Reconciliation
Validate spend vs budget. Emit reconciliation telemetry.

### Phase 9: Archival
Freeze artifacts. Mark \`archived\`.

## 7. Event Emissions
Immutable events: \`dat.plan.drafted\`, \`dat.plan.approved\`, \`dat.plan.execution_started\`, \`dat.step.started\`, \`dat.step.completed\`, \`dat.step.failed\`, \`dat.step.rolled_back\`, \`dat.plan.completed\`, \`dat.plan.aborted\`.

## 8. Invariants
- No plan executes without GGP approval.
- Every step is idempotent or compensatable.
- Budget checks occur pre and during execution.
- Rollback is mandatory for failures.
`;

export const NS_DAT_005_DECISION = `
# Digital Arbitrage Tooling (DAT) - Decision Semantics

**Document Id:** NS-DAT-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the decision semantics used by DAT to determine plan readiness, admission control, and failure response. DAT decisioning is **operational and bounded**, not strategic.

## 2. Decision Boundary Principles
- **Operational Only:** DAT decides *how* to execute safely, not *whether* to execute.
- **No Self-Approval:** GGP is the authority.
- **Explainability:** All decisions attributable to inputs.

## 3. Decision Objects

### 3.1 Plan Readiness
Recommendation on whether a draft plan is complete for governance submission.
**Outputs:** \`ready_for_approval\` (bool), \`reasons\`.

### 3.2 Execution Admission Decision
Runtime allow/deny decision pre-execution.
**Outputs:** \`admission_allowed\` (bool), \`violations\`.

### 3.3 Step Continuation Decision
Per-step decision: \`continue\`, \`retry\`, \`rollback\`, \`abort\`.

### 3.4 Rollback Activation Decision
Decision to initiate rollback policies.

## 4. Decision Rules

### 4.1 Plan Readiness (Pre-GGP)
Requires:
- Input Pinning (Insight ID/Ver)
- Complete Step Graph (No gaps, 1 action per step)
- Constraint Completeness (Budget, Time, Risk)
- Rollback Coverage (Steps have policies)
- Connector Eligibility

### 4.2 Admission Control (Pre-Execution)
Requires:
- Plan state = \`approved\` AND \`staged\`
- Hard constraints pass
- Budget available
- Connectors healthy
- Kill switch OFF

### 4.3 Runtime Constraint Violation
- **Hard Violation:** Pause → Rollback → Abort.
- **Soft Violation:** Continue → Emit Warning.

### 4.4 Retry Rules
Allowed if: Step/Connector idempotent, Retry count < Max, Constraints pass.
Must reuse idempotency key.

### 4.5 Abort Rules
Triggered by: Manual Kill Switch, Unrecoverable Failure, Hard Constraint Violation, Budget Exhaustion.
Action: Emit abort event, Invoke Rollback.

## 5. Governance Handoff Semantics
DAT submits: Plan Ver, Constraints, Budget, Rollback Report.
GGP returns: Approval/Rejection.
DAT never executes outside approved scope.
`;

export const NS_DAT_006_VERSION = `
# Digital Arbitrage Tooling (DAT) - Versioning

**Document Id:** NS-DAT-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning rules to ensure legitimate evolution, reproducible history, and correct downstream attribution.

## 2. Versioning Principles
- **Semantic Changes = New Version.**
- **Execution Pins Versions:** Running plans do not mutate.
- **Append-Only History.**
- **Downstream Attribution:** FLO/PTE reference specific plan versions.

## 3. Canonical Identifiers
- **\`execution_plan_id\`**: Stable identifier.
- **\`plan_version\`**: Monotonic integer.
- Authoritative key: \`(execution_plan_id, plan_version)\`.

## 4. Triggers for New Version
- Step Graph changes (add/remove/reorder)
- Action parameter changes
- Material Constraint changes (Budget, Time, Risk)
- Rollback Policy changes
- Connector/Target changes
- Insight Pin changes

## 5. Non-Triggers (No New Version)
- Derived Read Model updates
- Execution State changes
- Telemetry emission
- Retry attempts (same key)
- Non-semantic metadata (labels)

## 6. Sub-Artifact Versioning
Steps, Actions, Constraints, Budgets, and Rollback Policies are versioned implicitly via \`plan_version\`.
Execution always references the snapshot tied to the executing version.

## 7. Execution-Time Guarantees
Once executing, \`plan_version\` is locked. No artifacts change.
Mid-run changes require Abort + New Version + Re-approval.

## 8. Replay & Historical Reconstruction
DAT supports Plan Replay (reconstruct graph), Execution Replay (reconstruct timeline), and Financial Replay (reconcile spend).
`;

export const NS_DAT_007_DATAMODEL = `
# Digital Arbitrage Tooling (DAT) - Data Model

**Document Id:** NS-DAT-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical data model, storage strategy, and persistent entities.

## 2. Data Model Principles
- **Authoritative vs Derived:** Execution truth is stored separately from dashboards.
- **Append-Only:** History is never overwritten.
- **Version-Pinned:** All runtime data references \`(plan_id, version)\`.

## 3. Canonical Authoritative Entities

### 4.1 execution_plan
id, version, linked_insight_id/ver, status, created_at.

### 4.2 execution_step
step_id, plan_id, version, order, action_id, status.

### 4.3 action
action_id, type, target_system, parameters.

### 4.4 constraint_snapshot
id, plan_id, version, type, params, enforcement_level.

### 4.5 budget_snapshot
id, plan_id, version, currency, max_amount, spent_roll_up.

### 4.6 rollback_policy
id, plan_id, version, type, steps.

### 4.7 execution_context
Immutable snapshot of runtime context (hash of constraints/budget) at start.

### 4.8 execution_event
Types: \`step.*\`, \`plan.*\`. Fields: event_id, plan_id, version, type, payload, correlation_id, timestamp.

### 4.9 decision_artifact
Persisted decision outputs (readiness, admission).

## 4. Derived Read Models
- **execution_progress_view:** Current step, completion %.
- **execution_summary_view:** Total/failed steps, spend.

## 5. Relationship Diagram (Logical)
Plan (1) → Many Steps, Constraints, Events, Decisions, Rollback Policies.
Plan (1) → One Budget.

## 6. Replay & Audit
DAT supports Plan Reconstruction, Execution Replay, and Decision Replay.
DAT stores **references** to external entities (PIE Insight ID, GGP Decision ID), not duplicates.
`;

export const NS_DAT_008_EEE = `
# Digital Arbitrage Tooling (DAT) - End-to-End Example (EEE)

**Document Id:** NS-DAT-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario Overview
**Objective:** Launch and test a limited-run digital product listing based on an approved market opportunity using DAT.

## 2. Execution Flow

### Phase 1: Plan Drafting
- DAT creates **PLAN-9912 v1** linked to Insight **INS-7421 v3**.
- **Steps:** 1. Create Listing, 2. Enable Paid Promo, 3. Place Supplier Order.
- **Constraints:** Budget $5k, Window 14 days, Risk: Inventory Cap 100.
- State: \`draft\`.

### Phase 2: Governance Approval
- Submit to GGP.
- GGP **Approves**.
- State: \`approved\`.

### Phase 3: Staging
- Connector validation passes.
- State: \`staged\`.

### Phase 4: Execution Admission
- Start Request.
- **Checks:** Budget ok, Window ok, Kill switch off.
- Decision: Allowed. State: \`executing\`.

### Phase 5: Step Execution
- **Step 1:** Create Listing. **Success**. Telemetry: \`step.completed\`.
- **Step 2:** Enable Promo. **Failure** (API Timeout).
- **DAT Action:** Emit \`step.failed\`. Evaluate Rollback.
- **Rollback:** Disable partially created promo. **Success**.
- **DAT Decision:** Abort plan (critical path failure). State: \`aborted\`.

### Phase 6: Reconciliation
- Spend: $200 (Listing fee).
- Events sent to FLO: \`spend.incurred\`.

### Phase 7: Archival
- Freeze artifacts. State: \`archived\`.

## 3. Replay & Audit
Auditor reconstructs PLAN-9912 v1, sees approved constraints, step-by-step failure, successful rollback, and exact financial impact.
`;

export const NS_DAT_009_IMPL = `
# Digital Arbitrage Tooling (DAT) - Implementation Blueprint

**Document Id:** NS-DAT-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Implementation blueprint for the DAT MVP.

## 2. Service Decomposition (MVP)

### 3.1 dat-api (Control Plane)
Created/Version plans, Submit to GGP, Read-only views. REST/Async.

### 3.2 dat-orchestrator (Execution Plane)
Admission control, Step sequencing, Idempotent execution, Rollback.

### 3.3 dat-connector-layer
Pluggable specific integrations (Marketplace A, Vendor B).

### 3.4 dat-telemetry-emitter
Emit events to Kafka.

## 4. Technology Stack (Recommended)
- **Runtime:** Python 3.12+ (FastAPI, Celery/Asyncio).
- **Persistence:** PostgreSQL (Authoritative), MongoDB (Derived Views).
- **Messaging:** Kafka (Events, Financials).

## 5. Execution Flow
API (draft) → DB → GGP Adapter → Orchestrator (Poll/Trigger) → Admission → Execution Loop → Connectors → Telemetry.

## 6. MVP Rollout
Single-node execution. Single-plan concurrency. Limited connector set. Manual approval integration.
`;

export const NS_DAT_010_FE = `
# Digital Arbitrage Tooling (DAT) - Frontend / Operator UI

**Document Id:** NS-DAT-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the operator UI for DAT. Focus on Control, Audit, and Safety.

## 2. Design Principles
- **No Accidental Execution:** Two-step confirms.
- **Version-Pinned Visibility:** Always show Plan ID + Version.
- **Progressive Disclosure:** Summary → Detail → Logs.
- **Explainability:** Why was admission denied?

## 3. Canonical Screens (MVP)

### 4.1 Plan Registry (List)
Searchable plans. Status, Budget Cap, Last Outcome filters.

### 4.2 Plan Detail
Header (ID/Ver/Status), Step Graph, Constraints Panel, Budget Panel, Rollback Coverage, Governance History.

### 4.3 Staging / Admission View
Connector health, Validation results, Governance Gate status. Run/Re-run controls.

### 4.4 Execution Run Detail (Timeline)
Immutable timeline: Step started/completed/failed/rolled_back. Drill down into logs.

### 4.5 Kill Switch & Controls Panel
Global Pause, Abort Plan, Circuit Breakers.

## 4. Components
PlanCard, StatusBadge, budgetMeter, StepGraph, ExecutionTimeline, KillSwitchWidget.
`;

export const NS_DAT_011_APIMAP = `
# Digital Arbitrage Tooling (DAT) - API Mapping

**Document Id:** NS-DAT-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Maps Backend APIs to Frontend needs.

## 2. API Surface Groups

### Plans
- \`GET /plans\` (List)
- \`GET /plans/{id}?version={n}\` (Detail)
- \`POST /plans\` (Draft)
- \`POST /plans/{id}/submit\` (Governance)

### Execution
- \`POST /plans/{id}/execute\` (Start Run - Idempotent)
- \`GET /runs?plan_id={id}\` (History)
- \`GET /runs/{run_id}/events\` (Timeline)

### staging & Admission
- \`GET /plans/{id}/admission\`
- \`POST /plans/{id}/admission/check\`

### Controls (Governed)
- \`POST /controls/execution/pause\`
- \`POST /controls/plans/{id}/abort\`
- \`POST /controls/connectors/{name}/disable\`

## 3. Downstream Queries
- **FLO:** \`GET /runs/{id}/financial-events\`
- **PTE:** \`GET /runs/{id}/metrics\`
`;

export const NS_DAT_012_STATE = `
# Digital Arbitrage Tooling (DAT) - State Semantics

**Document Id:** NS-DAT-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Formalizes authoritative state machines and sub-states.

## 2. Plan State Machine
\`draft\` → \`submitted\` → \`approved\` (or \`aborted\`) → \`staged\` → \`executing\` → \`completed\` (or \`aborted\`) → \`archived\`.

## 3. Run State Machine
\`requested\` → \`admission_denied\` OR \`running\`.
\`running\` → \`paused\` / \`completed\` / \`aborted\` / \`failed\`.

## 4. Step State Machine
\`pending\` → \`running\` → \`completed\` / \`failed\`.
\`failed\` → \`rolled_back\`.

## 5. Orthogonal Sub-States
- **Admission:** allowed/denied.
- **Constraint:** ok/soft/hard.
- **Budget:** ok/exhausted.
- **Connector:** healthy/degraded/disabled.
- **Kill Switch:** paused/active.

## 6. Consistency
Authoritative state is append-only. Idempotency required for all transitions.
`;

export const NS_DAT_013_RUNBOOK = `
# Digital Arbitrage Tooling (DAT) - Runbook

**Document Id:** NS-DAT-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures for safety and recovery.

## 2. Startup Checklist
DB/Kafka/GGP/Connectors reachable. Secrets loaded. Kill switch OFF.

## 3. Normal Operations
- **Drafting:** Idempotent creation.
- **Governance:** Binding approvals.
- **Staging/Admission:** Validation before execution.
- **Execution:** Monitoring steps and retries.

## 4. Controls
- **Global Pause:** For system instability.
- **Abort Run:** For hard violations or unrecoverable failures.
- **Disable Connector:** Circuit breaker for bad integrations.

## 5. Failure Responses
- **Kafka Down:** Safe Mode.
- **Connector Fail:** Retry -> Rollback -> Abort.
- **Budget Exhaustion:** Abort run.

## 6. Replay & Backfill
Rebuild derived models from authoritative events. Replay execution timelines for audit. Reconcile financials with FLO.
`;

export const NS_DAT_014_DATADEF = `
# Digital Arbitrage Tooling (DAT) - Data Definitions

**Document Id:** NS-DAT-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Field-level schema definitions.

## 2. Canonical Entities
- **Execution Plan:** \`execution_plan_id\`, \`plan_version\`, \`linked_insight\`, \`status\`, \`ggp_decision\`.
- **Step:** \`step_id\`, \`order\`, \`action_id\`, \`status\`.
- **Action:** \`type\`, \`target\`, \`params\`.
- **Constraint Snapshot:** \`type\`, \`params\`, \`level\`.
- **Budget Snapshot:** \`currency\`, \`max\`, \`spent\`.
- **Rollback Policy:** \`type\`, \`steps\`.
- **Run:** \`run_id\`, \`status\`, \`mode\`, \`correlation_id\`.
- **Execution Context:** Snapshot hash of environment at start.
- **Execution Event:** \`type\`, \`payload\`, \`actor\`, \`timestamp\`.
- **Decision Artifact:** \`type\`, \`payload\` (readiness/admission).

## 3. Invariants
- No run without approved plan.
- Steps are contiguous 1..N.
- Idempotency keys stable.
- Hard violations are terminal.
`;
