
export const NS_FLO_001_OVERVIEW = `
# Financial Ledger Orchestrator (FLO) - Overview

**System Name:** Financial Ledger Orchestrator (FLO)  
**Document Title:** FLO Overview  
**Document Id:** NS-FLO-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Financial Ledger Orchestrator (FLO)** is responsible for producing **canonical, auditable, and reconcilable financial truth** across the Northfield Solidarity ecosystem.

FLO exists to answer:
> What money moved, why did it move, who/what authorized it, and where is the evidence?

FLO is the system layer that turns distributed engine activity into:
- a coherent ledger
- a traceable accounting narrative
- an enforcement surface for budgets and financial controls

## 2. Role Within Northfield Solidarity
FLO sits in the **financial truth and controls layer**.

**Upstream producers (examples):**
- **DAT:** spend, refunds, fees, payouts, COGS commitments
- **MUX:** payment processor events, marketplace payouts, bank transfers
- **SIM:** projected financial scenarios (non-authoritative)
- **PECA / IDN:** entity + account identity references

**Downstream consumers:**
- **GGP:** governance approval for budgets, allocations, and thresholds
- **PTE:** portfolio performance attribution
- **Humans:** finance ops, tax prep, reconciliation workflows

**FLO does not execute market actions; it records, validates, reconciles, and reports the financial outcomes of actions.**

## 3. What FLO Produces
FLO produces **Ledger Artifacts**, including:
- **Ledger Entries** (debits/credits or canonical cash-flow records)
- **Account Balances** (derived from ledger)
- **Reconciliation Reports** (internal vs external)
- **Budget / Allocation States** (authoritative spend tracking)
- **Evidence Links** (receipts, invoices, processor IDs)

All FLO outputs are **versioned**, **append-only**, **explainable**, and **replayable**.

## 4. What FLO Does Not Do
To preserve system clarity and controls, FLO does not:
- Approve governance policy (GGP)
- Decide whether opportunities are good (PIE)
- Execute actions in external systems (DAT/MUX)
- Manage identities or permissions (IDN)

**FLO records financial truth and enforces financial constraints as configured and approved.**

## 5. Core Capabilities
- **Event-to-Ledger Ingestion:** Consume financial-impacting events from engines and external systems.
- **Normalization & Classification:** Map raw events to canonical transaction types, accounts, categories, and entities.
- **Budget Tracking & Enforcement:** Maintain authoritative budget state and detect overruns.
- **Reconciliation:** Reconcile ledger entries against external statements (processor, bank, marketplace).
- **Evidence & Audit Trail:** Persist immutable evidence references and traceability links.
- **Reporting Surfaces:** Provide read models for portfolio tracking, tax prep, and governance review.

## 6. Interaction With Other Engines

| Engine | Relationship to FLO |
| :--- | :--- |
| **DAT** | Emits spend/fee/refund events; references budgets |
| **MUX** | Provides payment and payout events; external truth sources |
| **GGP** | Governs budget creation, thresholds, approvals |
| **PTE** | Consumes ledger-derived performance metrics |
| **PECA / IDN** | Provides entity/account identity references |
| **SIM** | Provides projections (non-authoritative) |

FLO is the canonical financial truth layer; other engines should reference FLO outputs rather than maintain independent ledgers.

## 7. Operational Posture
FLO is:
- **Write-controlled** (append-only ledger)
- **Audit-grade** (strong traceability requirements)
- **Replayable** (event and statement reprocessing)
- **Reconciliation-driven** (external truth comparison)

FLO favors correctness and explainability over speed.

## 8. Expected Outcomes
When FLO is operating correctly:
- Every spend and payout is attributable to a governed plan/version
- Budgets are continuously tracked and overruns are surfaced early
- Financial reconciliation is routine and automatable
- Performance reporting is consistent and trusted

**FLO makes finances governable.**
`;

export const NS_FLO_002_TAXONOMY = `
# Financial Ledger Orchestrator (FLO) - Taxonomy

**Document Id:** NS-FLO-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose of This Document
This document defines the **canonical taxonomy** for the Financial Ledger Orchestrator (FLO).

The taxonomy establishes the atomic financial primitives used to:
- Represent financial truth consistently across engines
- Enforce budgets, allocations, and constraints
- Enable reconciliation, audit, and downstream performance attribution

This taxonomy is the shared financial language for FLO, DAT, MUX, GGP, PTE, and human operators.

## 2. Taxonomy Design Principles
- **Ledger-First Truth:** all financial facts resolve to ledger entries
- **Append-Only Semantics:** financial history is never overwritten
- **Event-Derived Accounting:** ledger entries are derived from source events
- **Version & Source Attribution:** every amount ties to a cause and authority
- **Entity-Centric Accounting:** money always belongs to an entity and account

## 3. Core Financial Primitives

### 3.1 Financial Event
**Definition:** A raw or normalized event that indicates a potential financial impact.
**Examples:** \`spend.incurred\`, \`refund.received\`.
**Note:** Financial events are inputs, not authoritative truth.

### 3.2 Ledger Entry
**Definition:** The canonical, authoritative record of a financial fact.
**Characteristics:** Append-only, Immutable, Derived from one or more financial events.
**Examples:** debit: advertising expense, credit: marketplace payout.

### 3.3 Transaction
**Definition:** A logical grouping of ledger entries that represent a single financial action.
**Examples:** Marketplace sale, Supplier purchase, Refund issuance.
**Note:** Transactions ensure ledger balance and explainability.

### 3.4 Account
**Definition:** A logical container representing where money is held or tracked.
**Examples:** Bank account, Payment processor balance, Accrued fees.

### 3.5 Entity
**Definition:** A legal or logical owner of financial activity.
**Examples:** Holding company, Subsidiary, Vendor.

### 3.6 Budget
**Definition:** A governed financial limit applied to activities, plans, or time windows.
**Characteristics:** Approved by GGP, Enforced continuously, Referenced by DAT execution plans.

### 3.7 Allocation
**Definition:** A subdivision of a budget or pool of funds.
**Examples:** Campaign allocation, Product-line allocation.

### 3.8 Balance
**Definition:** A derived value representing the net sum of ledger entries for an account.
**Note:** Balances are never authoritative; they are computed from ledger entries.

## 4. Evidence & Traceability Primitives

### 4.1 Evidence Artifact
**Definition:** A reference to external proof supporting a ledger entry.
**Examples:** Receipt ID, Invoice PDF, Processor transaction ID.

### 4.2 Source Attribution
**Definition:** Metadata identifying why a ledger entry exists.
**Examples:** DAT \`execution_plan_id\`, MUX processor event ID.

## 5. Reconciliation Primitives

### 5.1 External Statement
**Definition:** A record from an external system (bank, processor, marketplace) used to reconcile against internal ledger.

### 5.2 Reconciliation Record
**Definition:** A record describing the comparison between ledger and external statement.
**Outcomes:** \`matched\`, \`missing\`, \`excess\`, \`disputed\`.

## 6. Financial State Concepts
Although FLO is append-only, it exposes financial state concepts:
- **Budget state** (available / near_limit / exhausted)
- **Allocation state**
- **Reconciliation state**

These states are derived, not stored as truth.

## 7. Relationships Between Primitives
- Financial Event → Ledger Entry
- Ledger Entry → Transaction
- Transaction → Account
- Account → Entity
- Ledger Entry → Budget / Allocation (optional)
- Ledger Entry → Evidence Artifact (optional)

## 8. Cross-Engine Alignment

| Engine | Interaction with FLO |
| :--- | :--- |
| **DAT** | Emits financial-impacting events |
| **MUX** | Supplies external payment/payout events |
| **GGP** | Governs budgets and approvals |
| **PTE** | Consumes ledger-derived performance metrics |
| **IDN / PECA** | Supplies entity/account identity |

## 9. Invariants & Safety Rules
- Ledger entries are immutable
- Every ledger entry has a source
- Budgets are enforced against ledger truth
- Balances are derived, never authoritative
- Reconciliation never mutates ledger history
`;

export const NS_FLO_003_ARCHITECTURE = `
# Financial Ledger Orchestrator (FLO) - Architecture

**Document Id:** NS-FLO-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
This document defines the **logical architecture** of the Financial Ledger Orchestrator (FLO).

## 2. Architectural Overview
FLO is organized into four logical layers:
1.  **Ingestion Layer:** Receives events and statements.
2.  **Normalization & Classification Layer:** Converts raw inputs into canonical transaction candidates.
3.  **Ledger Core Layer (System of Record):** Writes append-only ledger entries and transaction groupings.
4.  **Reconciliation & Reporting Layer:** Matches ledger to external truth and produces read models.

**FLO is the canonical financial truth nucleus for the ecosystem.**

## 3. Core Components

### 3.1 Event Ingestor (Engine Events)
- **Responsibility:** Consume internal financial-impacting events from engines (e.g., DAT).
- **Inputs:** Kafka topics.
- **Outputs:** \`normalized_event\` records.

### 3.2 Statement Ingestor (External Truth)
- **Responsibility:** Import external statements from banks, processors, marketplaces.
- **Inputs:** MUX-provided streams/files.
- **Outputs:** \`external_statement\` records.

### 3.3 Normalizer
- **Responsibility:** Convert raw inputs into canonical, typed normalized events.
- **Mapping:** Currency, Time normalization.

### 3.4 Classifier
- **Responsibility:** Classify normalized events into transaction types, accounts, categories, entity ownership.
- **Output:** Transaction candidates.

### 3.5 Ledger Writer (System of Record)
- **Responsibility:** Convert transaction candidates into ledger entries and transaction groups. Persist as append-only.
- **Enforces:** Immutability, Dedupe, Balanced transactions.

### 3.6 Budget & Allocation Engine
- **Responsibility:** Maintain authoritative budget state derived from ledger. Evaluate spend against caps.

### 3.7 Reconciliation Engine
- **Responsibility:** Match ledger entries to external statements. Track results: \`matched\`, \`missing\`, \`excess\`, \`disputed\`.
- **Note:** Never mutates ledger entries.

### 3.8 Evidence & Document Linker
- **Responsibility:** Store references to evidence artifacts.

### 3.9 Read Model Builder
- **Responsibility:** Build optimized query surfaces (balances, P&L, burn).

### 3.10 Reporting & Query API
- **Responsibility:** Provide stable APIs for humans, PTE, GGP.

## 4. Data & Event Flow (Logical)

### 4.1 Internal Financial Event Flow
DAT emits \`spend.incurred\` → Ingestor → Normalizer → Classifier → Ledger Writer (Persist) → Budget Engine (Update) → Read Model Builder.

### 4.2 External Statement Flow
MUX provides statement → Statement Ingestor → Reconciliation Engine (match against ledger) → Reconciliation Records.

## 5. Persistence & Replay Architecture
- **Authoritative Ledger Stores:** Ledger entries, transactions, normalized events.
- **Reconciliation Stores:** External statements, reconciliation records.
- **Derived Read Models:** Rebuildable.

**Replay Goals:** Rebuild read models, re-run classification rules, re-reconcile statements.

## 6. Interfaces & Integrations
- **FLO ↔ DAT:** DAT emits events. FLO emits budget state.
- **FLO ↔ MUX:** MUX supplies external truth.
- **FLO ↔ GGP:** GGP approves budgets.
- **FLO ↔ PTE:** PTE consumes metrics.
- **FLO ↔ IDN / PECA:** Entity ownership.

## 7. Control Surfaces
- Budget creation/activation gates (GGP)
- Manual classification overrides
- Reconciliation re-run controls
- Read model rebuild controls

## 8. Observability Requirements
Ingestion throughput, Classification success rates, Ledger write latency, Reconciliation match rates.
`;

export const NS_FLO_004_LIFECYCLE = `
# Financial Ledger Orchestrator (FLO) - Lifecycle

**Document Id:** NS-FLO-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the end-to-end lifecycle of financial data within FLO.

## 2. Lifecycle Stages (High Level)
Financial Event → Ingestion → Normalization → Classification → Ledger Write → Budget Eval → Reconciliation → Reporting → Archival.

## 3. Stage Details

### Stage 1: Financial Event Occurs
Activity from DAT (spend), MUX (processor charges), or Manual Adjustments. Non-authoritative.

### Stage 2: Ingestion & Deduplication
Ingest via Kafka/Batch. Dedupe via source/external_id/correlation.

### Stage 3: Normalization
Standardize Currency, Time, Entity. Output: \`normalized_financial_event\`.

### Stage 4: Classification
Map to Transaction Type, Accounts, Categories. Output: \`transaction_candidate\`.

### Stage 5: Ledger Write (System of Record)
Convert candidates to **Ledger Entries** and **Transactions**.
**Rules:** Append-only, Balanced. Authoritative truth established.

### Stage 6: Budget & Allocation Evaluation
Recompute spend. Update Budget State (\`ok\` → \`near_limit\` → \`exhausted\`).

### Stage 7: Reconciliation
Compare Ledger vs External Statements. Outcome: \`matched\`, \`missing\`, \`excess\`, \`disputed\`.

### Stage 8: Reporting & Consumption
Update Read Models (Balances, P&L). PTE / GGP consume.

### Stage 9: Archival & Replay
Retain all artifacts. Replay for model rebuilds or re-classification.

## 4. Failure Handling
- **Ingestion:** Retry/DLQ.
- **Ledger Write:** Fail fast, no partial transactions.
- **Reconciliation:** Pending on missing data.

## 5. Cross-Engine Lifecycle Coordination
- **DAT** emits events, receives budget info.
- **MUX** supplies external truth.
- **GGP** governs budget creation.
`;

export const NS_FLO_005_DECISION = `
# Financial Ledger Orchestrator (FLO) - Decision Framework

**Document Id:** NS-FLO-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the decision framework for FLO. FLO decisions enforce correctness, budgets, and reconciliation, but do not approve strategy.

## 2. Decision Principles
- **Ledger Supremacy:** Ledger entries are immutable.
- **Separation of Authority:** FLO enforces, GGP approves.
- **Explainability:** All decisions produce structured rationale.
- **Fail Closed:** Ambiguity blocks mutation.

## 3. Decision Categories

### 3.1 Ingestion & Deduplication
Question: Is this event already represented?
Outcomes: \`dedupe.accept\`, \`dedupe.reject_duplicate\`.

### 3.2 Classification Decisions
Question: How to represent this normalized event financially?
Inputs: Normalized event, Ruleset version.
Outputs: Transaction Type, Debit/Credit Accounts, Entity.

### 3.3 Ledger Write Admission
Question: Can this be written?
Checks: Account attribution, Entity validity, Balance.

### 3.4 Budget & Allocation Enforcement
Question: Does this entry violate budget?
Outcomes: \`budget.ok\`, \`budget.near_limit\`, \`budget.exhausted\`.

### 3.5 Reconciliation Decisions
Question: Does statement match ledger?
Outcomes: \`match\`, \`missing\`, \`excess\`, \`disputed\`.

### 3.6 Manual Adjustments
Requires: Governance approval, Reason, Operator ID.

## 4. Decision Artifacts
Every decision produces a persisted **Decision Artifact** containing: \`decision_id\`, \`type\`, \`outcome\`, \`rationale\`, \`ruleset_version\`, \`correlation_id\`.

## 5. Determinism & Replay
Decisions must be deterministic given inputs and ruleset version.
`;

export const NS_FLO_006_VERSION = `
# Financial Ledger Orchestrator (FLO) - Versioning

**Document Id:** NS-FLO-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning semantics for FLO. Versioning applies to rules and schemas, **never** to historical ledger facts.

## 2. Versioning Principles
- **Ledger Immutability:** Entries are never versioned or edited.
- **Ruleset Versioning:** Logic evolves via versioned rulesets.
- **Replacy With Context:** Replays use ruleset active at time of decision.

## 3. Versioned Objects
- **Rulesets:** Normalization, Classification, Reconciliation.
- **Definitions:** Budget, Allocation, Manual Adjustment Policy.
- **Schemas:** Read Models.

**Ledger Entries** and **Transactions** are NOT versioned (they are immutable).

## 4. Ruleset Versioning Model
Identified by \`ruleset_name\` and \`version\`.
Lifecycle: \`draft\`, \`approved\`, \`active\`, \`deprecated\`.
Only active rulesets used for new decisions.

## 5. Schema Evolution
- **Authoritative Stores:** Additive changes only. No destructive migrations.
- **Read Models:** Rebuildable freely.

## 6. Budget & Allocation Versioning
Budgets are governance artifacts. New versions replace forward; old versions remain historically valid for prior entries.

## 7. Replay Semantics
- **Read Model Rebuild:** Latest schema.
- **Audit Replay:** Original ruleset versions.
- **What-If:** Alternative ruleset versions (no mutation).
`;

export const NS_FLO_007_DATAMODEL = `
# Financial Ledger Orchestrator (FLO) - Data Model

**Document Id:** NS-FLO-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the authoritative data model and schemas.

## 2. Data Model Principles
- **Append-Only Ledger Truth.**
- **Event-Derived Accounting.**
- **Cross-Engine ID Referencing.**

## 3. Canonical Entities (Authoritative)

### 4.1 normalized_financial_event
event_id, source_system, event_type, amount, currency, occurred_at, ingested_at, entity_id, correlation_id.

### 4.2 transaction
transaction_id, type, entity_id, created_at, ruleset_version.

### 4.3 ledger_entry
ledger_entry_id, transaction_id, account_id, direction, amount, currency, budget_id, allocation_id, source_event_id.

### 4.4 budget_definition
budget_id, entity_id, scope, max_amount, currency, ggp_decision_id, active_from/to, version.

### 4.5 allocation_definition
allocation_id, budget_id, scope, max_amount, version.

### 4.6 decision_artifact
decision_id, type, ruleset_version, outcome, rationale, evaluated_at.

### 4.7 external_statement
statement_id, source_system, period, content.

### 4.8 reconciliation_record
reconciliation_id, ledger_entry_id, statement_id, outcome, ruleset_version.

## 4. Derived Read Models
- **account_balance_view:** entity, account, currency, balance.
- **budget_state_view:** budget_id, spent, remaining, state.
- **execution_attribution_view:** plan_id, total_spend.

## 5. Relationship Diagram (Logical)
Event → Transaction (1) → Ledger Entry (N).
Ledger Entry ↔ Budget / Allocation.
Ledger Entry ↔ External Statement (via Recon Record).

## 6. Invariants
- Ledger entries immutable.
- Every entry references a normalized event.
- Reconciliation never mutates ledger.
`;

export const NS_FLO_008_EEE = `
# Financial Ledger Orchestrator (FLO) - End-to-End Example (EEE)

**Document Id:** NS-FLO-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario Overview
**Scenario:** A governed execution plan incurs advertising spend, generates sales, and receives a payout. Reconciled against processor statements.

## 2. Walkthrough

### Stage 1: Event Ingestion
FLO ingests \`spend.incurred\` ($2,500) and \`fee.charged\` ($75) from DAT.
Normalized to **normalized_financial_event**.

### Stage 2: Classification
Ruleset v3 applies.
Spend → Debit: Ad Expense, Credit: Cash.
Fee → Debit: Platform Fees, Credit: Cash.

### Stage 3: Ledger Write
Transactions and **Ledger Entries** written.
Budget **BUD-4412** updated. Spend $2,575. State: \`ok\`.

### Stage 4: External Statement
MUX provides Ad Invoice ($2,575) and Payout Report.

### Stage 5: Reconciliation
Ruleset v2 match Ad Invoice ↔ Ledger entries. Outcome: \`matched\`.

### Stage 6: Reporting
Balances updated. PTE receives attribution metrics.

### Stage 7: Audit
Auditor reconstructs source events, classification logic, ledger writes, and reconciliation proof.
`;

export const NS_FLO_009_IMPL = `
# Financial Ledger Orchestrator (FLO) - Implementation Blueprint

**Document Id:** NS-FLO-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Implementation blueprint for FLO MVP.

## 2. Service Decomposition

### 3.1 flo-api
Read queries, manual adjustments.

### 3.2 flo-ingestor
Consume internal events (Kafka), dedupe, persist normalized.

### 3.3 flo-statement-ingestor
Import external statements (MUX).

### 3.4 flo-ledger-writer
System of record. Transactional writes.

### 3.5 flo-budget-engine
Compute burn, emit state events.

### 3.6 flo-reconciliation-engine
Match ledger vs statements.

## 3. Tech Stack
Python 3.12+, FastAPI, PostgreSQL (Authoritative), Kafka.

## 4. MVP Rollout
1. Postgres Schema.
2. Ingestion + Classification (DAT).
3. Ledger Writer.
4. Budget Burn.
5. Reconciliation (Simple).
`;

export const NS_FLO_010_FE = `
# Financial Ledger Orchestrator (FLO) - Frontend / Operator UI

**Document Id:** NS-FLO-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the Finance Operator UI. Prioritizes explainability, reconciliation, audit.

## 2. Canonical Screens (MVP)

### 4.1 Ledger Explorer
Search/Filter entries.

### 4.2 Transaction Detail
Summary, Entries, Upstream attribution, Ruleset version.

### 4.3 Ledger Entry Detail (Audit)
Source event, Evidence, Budget bindings, Recon status, Timeline.

### 4.4 Budget Dashboard
List budgets, burn, state.

### 4.5 Reconciliation Inbox
Queues: Missing, Excess, Disputed.

### 4.6 Manual Adjustment Request
Governed write interface.

## 3. Components
LedgerTable, TransactionCard, EvidenceBadge, BudgetMeter, ReconWorkItemCard.
`;

export const NS_FLO_011_APIMAP = `
# Financial Ledger Orchestrator (FLO) - API Mapping

**Document Id:** NS-FLO-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Maps Backend APIs to Consumers.

## 2. API Surface Groups

### Ledger & Transactions
- \`GET /ledger/entries\`
- \`GET /transactions/{id}\`
- \`GET /ledger/entries/{id}/audit\`

### Budgets
- \`GET /budgets\`, \`GET /budgets/{id}/burn\`

### Reconciliation
- \`GET /reconciliation/work-items\`
- \`POST /reconciliation/resolve\` (Governed)

### Manual Adjustments
- \`POST /ledger/manual-adjustments\` (Governed)

### Downstream (DAT/PTE)
- \`GET /ledger/attribution\`

## 3. Internal APIs
- \`POST /internal/ingest/event\`
`;

export const NS_FLO_012_STATE = `
# Financial Ledger Orchestrator (FLO) - State Semantics

**Document Id:** NS-FLO-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines state models.

## 2. State Categories
- **Authoritative:** Ledger (Immutable).
- **Derived:** Budget, Allocation, Recon.
- **Operational:** Ingestion, Gates.

## 3. Derived State Machines

### Budget State
\`ok\` → \`near_limit\` → \`exhausted\`.
Derived from ledger spend vs cap.

### Reconciliation State
\`pending\` → \`matched\` / \`missing\` / \`excess\` / \`disputed\`.

## 4. Consistency
Strong consistency for Ledger Writes. Eventual for Read Models.
`;

export const NS_FLO_013_RUNBOOK = `
# Financial Ledger Orchestrator (FLO) - Runbook

**Document Id:** NS-FLO-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures for FLO.

## 2. Startup
Check DB, Kafka, MUX, Secrets.

## 3. Normal Ops
- **Ingestion:** Monitor lag, dedupe rejects.
- **Ledger:** Monitor write latency.
- **Budget:** Monitor exhaustion events.
- **Reconciliation:** Monitor match rates.

## 4. Controls
- **Pause Ingestion/Recon:** For stability.
- **Manual Adjustment:** For corrections (Governed).
- **Rebuild Read Models:** For corruption/schema updates.

## 5. Failure Responses
- **DB Fail:** Safe Mode.
- **Kafka Fail:** Pause ingestion.
- **Double Posting:** Pause, Fix dedupe, Adjust.

## 6. Audit
Replay classification, Validate reconciliation.
`;

export const NS_FLO_014_DATADEF = `
# Financial Ledger Orchestrator (FLO) - Data Definitions

**Document Id:** NS-FLO-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical field-level schemas for FLO.

## 2. Canonical Entities
- **Normalized Event:** event_id, type, source, amount, currency, entity.
- **Transaction:** transaction_id, type, entity, source_events.
- **Ledger Entry:** entry_id, transaction_id, account, direction, amount, budget_ref, source_event_ref.
- **Budget:** budget_id, entity, cap, version, ggp_decision.
- **Allocation:** allocation_id, budget_id, cap.
- **Decision:** decision_id, type, outcome, rationale, ruleset.
- **External Statement:** statement_id, source, period.
- **Reconciliation Record:** recon_id, ledger_ref, statement_ref, outcome.

## 3. Derived Models
- **Balance View:** entity, account, balance.
- **Budget State:** budget_id, spent, state.
`;
