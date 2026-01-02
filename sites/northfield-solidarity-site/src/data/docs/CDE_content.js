
export const NS_CDE_001_OVERVIEW = `
# Content Distribution Engine (CDE) - Overview

**System Name:** Content Distribution Engine (CDE)  
**Document Title:** CDE Overview  
**Document Id:** NS-CDE-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Content Distribution Engine (CDE)** is responsible for controlled, auditable, and optimized distribution of content artifacts across internal and external channels.

CDE exists to answer a single operational question:
> What content should be distributed, where, when, and under what constraints — and can we prove it happened correctly?

## 2. Role Within Northfield Solidarity
CDE sits at the execution-adjacent distribution layer.
It bridges:
- **PIE / DRE:** Content generation
- **GGP:** Governance
- **MUX:** Channel execution

And delivers to:
- External platforms (marketplaces, media)
- Internal systems (dashboards)

## 3. What CDE Produces
- **Distribution Plans:** What/where/when.
- **Execution Records:** Attempts and outcomes.
- **Delivery Proofs:** IDs, URLs, receipts.
- **Performance Feedback:** Downstream signals.

## 4. Core Capabilities
- **Distribution Planning:** Encode intent.
- **Channel-Oriented Execution:** Via MUX adapters.
- **Governed Release Controls:** GGP Gates.
- **Delivery Verification:** Proof capture.
- **Feedback Capture:** Signal ingestion.

## 5. Interaction With Other Engines
- **GGP:** Governs release.
- **MUX:** Executes delivery.
- **PIE/DRE:** Sources content.
- **SIG:** Aggregates feedback.
- **IDN:** Resolves attribution.

## 6. Operational Posture
- Write-controlled.
- Execution-heavy (fan-out).
- Idempotent.
- Replayable.
`;

export const NS_CDE_002_TAXONOMY = `
# Content Distribution Engine (CDE) - Taxonomy

**Document Id:** NS-CDE-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical vocabulary for CDE.

## 2. Content Classes
- **Listing:** Product or property listings.
- **Media:** Images, videos, assets.
- **Document:** Reports, disclosures.
- **Notification:** Alerts, messages.

## 3. Core Entities
- **Content Artifact:** The payload to distribute.
- **Distribution Plan:** The governed intent (distribute X to Y).
- **Distribution Intent:** The materialized execution command.
- **Execution Attempt:** A single try to distribute to a destination.
- **Delivery Proof:** Evidence of success (URL, External ID).

## 4. Execution States
- **Pending:** Scheduled.
- **Running:** In progress.
- **Success:** Delivered with proof.
- **Failed (Transient):** Retryable.
- **Failed (Permanent):** Terminal error.
- **DLQ:** Exhausted retries.

## 5. Relationships
- **Content** belongs to **Source Engine**.
- **Plan** governs **Intents**.
- **Intent** spawns **Attempts**.
- **Attempt** produces **Proof**.
`;

export const NS_CDE_003_ARCHITECTURE = `
# Content Distribution Engine (CDE) - Architecture

**Document Id:** NS-CDE-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Logical and operational architecture of CDE.

## 2. Layers
1. **Plan Intake & Validation:** Schema checks.
2. **Governance Gate:** GGP approval check.
3. **Intent Orchestration:** Fan-out logic.
4. **Execution Dispatcher:** Concurrency & Retries.
5. **Channel Adapter Interface:** Via MUX.
6. **Proof & Feedback Capture:** Persistence.
7. **Event Ledger:** Audit history.

## 3. Storage
- **PostgreSQL:** Plans, Intents, Attempts, Proofs.
- **Redis (Optional):** Hot execution state.
- **Kafka (Optional):** Event distribution.

## 4. Key Components
- **Dispatcher:** Manages idempotency and backoff.
- **Orchestrator:** Materializes approved plans.
- **Feedback Ingest:** Routes signals to SIG.
`;

export const NS_CDE_004_LIFECYCLE = `
# Content Distribution Engine (CDE) - Lifecycle

**Document Id:** NS-CDE-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
End-to-end distribution lifecycle.

## 2. Phases
1. **Content Availability:** Registered from upstream.
2. **Plan Creation:** Draft -> Submitted.
3. **Governance:** Approved / Rejected.
4. **Intent Materialization:** Approved -> Intent.
5. **Execution:** Fan-out Attempts.
6. **Proof Capture:** Success validation.
7. **Feedback:** Monitoring.
8. **Audit:** Replay.

## 3. Invariants
- No execution without approval.
- Intents are immutable.
- Attempts are append-only.
`;

export const NS_CDE_005_DECISION = `
# Content Distribution Engine (CDE) - Decision Framework

**Document Id:** NS-CDE-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Decision framework for execution correctness and safety.

## 2. Decision Classes
- **Plan Admission:** Valid structure?
- **Release Eligibility:** GGP Approved?
- **Dispatch:** Schedule/Throttle?
- **Retry/Backoff:** Transient vs Permanent?
- **Proof Validation:** Sufficient evidence?
- **Escalation:** DLQ needed?

## 3. Principles
- **Idempotency First:** Safe retries.
- **Governance Respect:** Hard gates.
- **Explainability:** Rationale artifacts.
`;

export const NS_CDE_006_VERSION = `
# Content Distribution Engine (CDE) - Versioning

**Document Id:** NS-CDE-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Versioning strategy for plans and execution logic.

## 2. Plan Versioning
- Plans are versioned (v1, v2...).
- Approved plans are **immutable**.
- Changes require new plan version.

## 3. Execution Logic
- Retry policies and backoff rules are versioned.
- MUX Adapter versions are recorded on attempts.

## 4. Invariants
- History is never overwritten.
- Replay uses the versioned context of the original attempt.
`;

export const NS_CDE_007_DATAMODEL = `
# Content Distribution Engine (CDE) - Data Model

**Document Id:** NS-CDE-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Authoritative schema.

## 2. Core Tables
- **content_artifact:** \`id\`, \`type\`, \`source\`.
- **distribution_plan:** \`id\`, \`status\`, \`actor\`.
- **distribution_intent:** \`id\`, \`plan_id\`, \`trigger\`.
- **execution_attempt:** \`id\`, \`intent_id\`, \`status\`, \`adapter\`.
- **delivery_proof:** \`id\`, \`attempt_id\`, \`value\`.
- **distribution_feedback:** \`id\`, \`signal\`, \`value\`.
- **distribution_event:** Append-only ledger.

## 3. Integrity
- attempts reference intents.
- intents reference plans.
- proofs reference successful attempts.
`;

export const NS_CDE_008_EEE = `
# Content Distribution Engine (CDE) - End-to-End Example

**Document Id:** NS-CDE-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario
Distribute Product Listing to Marketplace + Internal Dashboard.

## 2. Flow
1. **Registration:** PIE registers content C-3001.
2. **Plan:** Operator creates Plan P-4001 (Draft).
3. **Approval:** Governance approves. Plan -> Approved.
4. **Intent:** Orchestrator creates Intent I-5001.
5. **Fan-Out:** Attempts AT-6001 (Marketplace), AT-6002 (Dashboard).
6. **Execution (A):** Marketplace 503 -> Retry -> Success (Proof: MKP-99).
7. **Execution (B):** Dashboard Success (Proof: URL).
8. **Feedback:** Clicks ingested -> Forwarded to SIG.
`;

export const NS_CDE_009_IMPL = `
# Content Distribution Engine (CDE) - Implementation Blueprint

**Document Id:** NS-CDE-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
MVP Implementation plan.

## 2. Services
- **cde-api:** Plans & Audit.
- **cde-orchestrator:** Intent Materializer.
- **cde-dispatcher:** Execution & Retries.
- **cde-feedback:** Ingest.

## 3. Stack
Python 3.12+, FastAPI, Postgres, Redis (optional).

## 4. Execution Model
- **Claiming:** Row locks for attempts.
- **Idempotency:** Derived keys per intent/content/dest.
- **DLQ:** Logical table state for exhausted retries.
`;

export const NS_CDE_010_FE = `
# Content Distribution Engine (CDE) - Frontend / Operator UI

**Document Id:** NS-CDE-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operator visibility and control.

## 2. Screens
- **Dashboard:** Queues, failures.
- **Plan Builder:** Draft & submit.
- **Execution Monitor:** Intents & Attempts grid.
- **Attempt Detail:** Logs, proofs, decisions.
- **Proof Reconciliation:** Manual fix-up.
- **DLQ:** Manage failures.

## 3. Principles
Plan First, Governance-Aware, Execution Transparency.
`;

export const NS_CDE_011_APIMAP = `
# Content Distribution Engine (CDE) - API Mapping

**Document Id:** NS-CDE-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical API surface.

## 2. Groups
- **Content:** \`GET /content\`.
- **Plans:** \`POST /plans\`, \`POST /submit\`.
- **Execution:** \`GET /intents\`, \`GET /attempts\`.
- **Actions:** \`POST /attempts/{id}/rerun\`.
- **Proof:** \`POST /proofs/attach\`.
- **Audit:** \`POST /export/audit-pack\`.

## 3. Controls
Idempotency keys required for writes. RBAC for governed actions.
`;

export const NS_CDE_012_STATE = `
# Content Distribution Engine (CDE) - State Semantics

**Document Id:** NS-CDE-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
State model definitions.

## 2. Objects
- **Plan:** Draft -> Submitted -> Approved/Rejected.
- **Intent:** Created -> Expanded -> Completed.
- **Attempt:** Pending -> Running -> Success/Failed -> DLQ.

## 3. Invariants
- Approved plans are immutable.
- Success requires proof.
- Transitions emit events.
`;

export const NS_CDE_013_RUNBOOK = `
# Content Distribution Engine (CDE) - Runbook

**Document Id:** NS-CDE-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures.

## 2. Procedures
- **Startup:** Check GGP/MUX connectivity.
- **Plan Approval:** Handle GGP down (Draft-only mode).
- **DLQ Resolution:** Rerun or Reconcile.
- **Incident Response:** High failure rates, idempotency issues.
- **Disaster Recovery:** Restore DB + Replay.

## 3. Invariants
Never execute without approval. Never fake proofs.
`;

export const NS_CDE_014_DATADEF = `
# Content Distribution Engine (CDE) - Data Definitions

**Document Id:** NS-CDE-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Field-level definitions.

## 2. Contracts
- **content_artifact:** \`id\`, \`version\`.
- **distribution_plan:** \`id\`, \`status\`, \`actor\`.
- **execution_attempt:** \`status\`, \`retry_count\`, \`proof\`.
- **delivery_proof:** \`type\`, \`value\`.

## 3. Invariants
- All IDs UUID.
- Timestamps UTC.
- Proofs immutable.
`;
