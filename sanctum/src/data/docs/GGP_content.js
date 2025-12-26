
export const NS_GGP_001_OVERVIEW = `
# Governance Graph Engine (GGE) - Overview Document

## Overview

**System Name:** Governance Graph Engine (GGE)  
**Document Name:** Governance Graph Engine (GGE) - Overview Document  
**Document Id:** NS-GGE-CT-000  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Effective Date:** TBD  
**Approved By:** Parent / HoldCo Manager  
**Review Cycle:** Annual or Upon Material Change  

---

## 1. Purpose

The Governance Graph Engine (GGE) is designed to serve as the **central orchestration and automation platform** for Northfield Solidarity’s governance framework.

**Objectives:**

*   Automate the management, integration, and versioning of SOPs
*   Maintain a living governance structure that is **audit-ready and operationally consistent**
*   Ensure that updates to policies, materiality thresholds, authority matrices, or operational components are propagated systematically
*   Provide a high-level decision-making engine that considers **dependencies, escalation paths, and materiality**

---

## 2. Overview

**GGE functions as the systematic brain of the governance ecosystem:**

*   Treats SOPs as **derived artifacts**, not primary sources
*   Stores and tracks **atomic components** (e.g., thresholds, authority rules, risk parameters)
*   Maintains a **dependency graph** of SOPs, ensuring correct update order
*   Provides a **prompt-driven decision layer** for determining impact, strategy, and versioning
*   Automatically emits **updated, versioned SOP documents** in an auditable manner

**Key Features:**

*   Component registry and version control
*   SOP dependency mapping
*   Automated impact analysis and update planning
*   Version bump logic and semantic versioning
*   Integration-ready outputs for internal systems

---

## 3. Scope

**Entities Covered:**

*   Parent / HoldCo
*   All operating subsidiaries
*   Future domestic or international entities

**Areas Covered:**

*   Financial operations (Capital, Cash, Intercompany)
*   Operational SOPs (Revenue, Fulfillment, Brand & Store)
*   Intellectual property and licensing
*   Risk, contingency, and compliance
*   Tax positioning and transfer pricing

**Exclusions:**

*   SOP content creation (human expertise is required for legal and strategic input)
*   Third-party operational execution (GGE supports orchestration, not execution)

---

## 4. Value Added

1.  **Consistency:** Eliminates drift between SOPs and actual governance practice
2.  **Scalability:** Automatically manages multiple subsidiaries and future entities
3.  **Auditability:** Maintains clear trails of changes, approvals, and version history
4.  **Efficiency:** Reduces manual review and cross-referencing work
5.  **Decision Support:** Embedded logic considers dependencies, materiality, and authority
6.  **Risk Reduction:** Ensures updates do not inadvertently violate compliance, risk, or legal boundaries

---

## 5. Components of GGE

1.  **Component Registry:** Atomic governance elements (e.g., authority matrix, materiality thresholds, risk scenarios)
2.  **SOP Dependency Graph:** Maps which SOPs depend on which components
3.  **Update Decision Prompt:** Determines update strategy, order, and versioning type
4.  **Versioning Engine:** Applies semantic versioning based on type and scope of changes
5.  **SOP Generator:** Produces updated SOPs in defined formats, ready for approval and deployment
6.  **Audit Log:** Tracks all component changes, update decisions, and SOP emissions

---

## 6. GGE Operational Workflow (High-Level)

1.  **Component Update:** New data, thresholds, or authority rules are added to the registry
2.  **Impact Analysis:** Dependency graph identifies affected SOPs
3.  **Decision Prompt:** GGE evaluates order, priority, and version bump strategy
4.  **SOP Regeneration:** SOPs are updated automatically with new references, cross-links, and versioning
5.  **Review & Approval:** Designated approvers validate the updates
6.  **Release & Logging:** Updated SOPs are published and changes are logged for auditability

---

## 7. Governance Principles Embedded in GGE

*   **SOPs are derived artifacts**: Components drive updates, not manual edits
*   **Arm’s-length authority**: Updates reflect defined authority levels
*   **Materiality-sensitive updates**: Changes are prioritized and escalated based on thresholds
*   **Auditability**: All actions are recorded
*   **Scalable orchestration**: Supports multiple subsidiaries and entities

---

## 8. Expected Outcomes

*   Living SOPs with consistent, current references across the organization
*   Reduced human error in updates and alignment
*   Clearly defined escalation and update logic
*   Ready-to-integrate governance outputs for internal and external audit
*   Foundation for future system automation and operational analytics

---

## 9. Next Development Steps

1.  Define **Component Taxonomy**
2.  Build **Update Decision Prompt** logic
3.  Formalize **Versioning Rules Engine**
4.  Sketch **System Architecture & Workflows**
5.  Begin **Pilot SOP Update Cycle**

---

## 10. Version Control

---
**End of Document**
`;

export const NS_GGP_002_ARCHITECTURE = `
# GGE Architecture & Design Document

## Overview

**System Name:** Governance Graph Engine (GGE)  
**Document Title:** GGE Architecture & Design Document  
**Document Id:** NS-GGE-ARCHITECTURE-002  
**Version:** 0.2  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** Upon Material System Change  

---

## 1. Purpose of This Document

This document defines **version 0.2** of the Governance Graph Engine (GGE) architecture, expanding the MVP design to explicitly include a **Frontend (FE) MVP layer**.

The objective is to ensure that **auditability, transparency, and governance visibility** are first-class system features from day one — not retrofits.

---

## 2. Design Philosophy (Reaffirmed)

GGE is built on the following non-negotiable principles:

1.  **Governance-first architecture** – the system enforces rules, not users
2.  **Deterministic execution** – LLMs advise, code decides
3.  **Auditability by default** – every action is traceable
4.  **Graph-native reasoning** – dependencies determine behavior
5.  **Transparency over obscurity** – governance state must be visible
6.  **Incremental extensibility** – FE starts read-only, expands later

---

## 3. High-Level System Overview

GGE now consists of **six core layers**:

1.  Data Layer (Source of Truth)
2.  Graph & Dependency Layer
3.  Decision Intelligence Layer (LLM-assisted)
4.  Workflow & Versioning Layer
5.  SOP Compilation & Output Layer
6.  **Frontend Visibility & Audit Layer (NEW)**

---

## 4. Core Backend Components (Unchanged, Contextualized)

### 4.1 Component Registry

Stores atomic governance components:

*   Authority Matrix
*   Materiality Thresholds
*   Risk & Compliance Elements

These components **drive all downstream SOP behavior**.

---

### 4.2 Dependency Graph Engine

Maintains directed relationships between:

*   Components
*   SOPs
*   Other components

The graph determines **impact scope and update order**.

---

### 4.3 Update Decision Engine (LLM-assisted)

Provides strategic reasoning:

*   Impact classification
*   Update sequencing
*   Version bump recommendation
*   Rationale generation

All outputs are **validated and constrained** by system rules.

---

### 4.4 Workflow & Versioning Engine

Orchestrates the lifecycle of a governance update:

1.  Component Change Detected
2.  Impact Analysis
3.  Update Plan Proposed
4.  Approval Gate
5.  SOP Regeneration
6.  Release & Logging

---

### 4.5 SOP Compiler

Generates **versioned SOP artifacts**:

*   Markdown (authoritative)
*   Exportable formats (PDF, DOCX, HTML)

Each SOP version is cryptographically and logically tied to its trigger events.

---

## 5. Frontend (FE) MVP Layer (NEW)

The FE MVP is intentionally **read-only**, focused on **visibility and assurance**, not control.

### 5.1 FE Objectives

*   Provide transparency into GGE operations
*   Support audit, review, and governance oversight
*   Eliminate black-box perception of automation
*   Enable rapid historical reconstruction

---

### 5.2 FE Screen 1: GGE Audit Trail Dashboard

**Purpose:** Full visibility into every execution of GGE.

**Core Capabilities:**

*   Chronological list of GGE execution events
*   Filter by:
    *   Date range
    *   Triggering component
    *   SOP affected
    *   Executing user / system actor

**Displayed Data:**

*   Execution ID
*   Trigger source (component + version)
*   Affected SOPs
*   Decision summary
*   Approval outcomes
*   Timestamp

**Data Source:**

*   update_events
*   approval_events
*   sop_versions

---

### 5.3 FE Screen 2: SOP Version History & Registry

**Purpose:** Centralized visibility into all SOP artifacts.

**Core Capabilities:**

*   List of all SOPs
*   Expandable view of all historical versions
*   Direct access to:
    *   Published SOP documents
    *   Version metadata

**Displayed Data:**

*   SOP title & ID
*   Current active version
*   Historical versions
*   Triggering component(s)
*   Effective dates

**Data Source:**

*   sops
*   sop_versions
*   component_versions

---

## 6. FE–BE Integration Model

### 6.1 API-First Design

The FE consumes **read-only APIs** exposed by the backend:

*   \`GET /audit/events\`
*   \`GET /sops\`
*   \`GET /sops/{id}/versions\`
*   \`GET /components/{id}/history\`

No mutation endpoints are exposed in MVP.

---

## 7. Data Model (FE-Relevant Additions)

No new core tables are required.

However, the following tables are **explicitly FE-facing**:

*   update_events
*   approval_events
*   sop_versions
*   component_versions

Indexes should be optimized for:

*   Timestamp queries
*   SOP-based filtering
*   Component-based filtering

---

## 8. Python Project Structure (Updated)

---

## 9. Frontend Stack (MVP Recommendation)

**Recommended:**

*   React (TypeScript)
*   Minimal UI framework (e.g., Tailwind or equivalent)
*   Read-only authentication context

**Design Constraints:**

*   No write actions in MVP
*   No approval actions in MVP
*   Focus on clarity, traceability, and navigation

---

## 10. Governance & Security Boundaries

*   FE users cannot mutate data
*   All actions are executed via BE
*   Audit logs are immutable
*   Access control enforced at API layer

---

## 11. MVP Success Criteria (Updated)

*   Deterministic SOP regeneration
*   Full audit trail visible via FE
*   Complete SOP version history accessible
*   Clear lineage from component → decision → SOP
*   Zero manual SOP drift

---

## 12. Future FE Expansion (Explicitly Out of Scope)

*   Approval actions
*   Component editing
*   Threshold modification
*   User role management
*   External advisor portals

These are intentionally deferred to preserve governance integrity.

---

## 13. Version Control

---
**End of Document**
`;

export const NS_GGP_003_TAXONOMY = `
# GGE Component Taxonomy

## Overview

**System Name:** Governance Graph Engine (GGE)  
**Document Title:** Governance Graph Engine Component Taxonomy  
**Document Id:** NS-GGE-TAXONOMY-003  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** Annual or Upon Material Change  

---

## 1. Purpose

The Component Taxonomy defines **all atomic governance elements** that form the source-of-truth for the Governance Graph Engine (GGE). These components drive SOP generation, versioning, and dependency management.

**Objectives:**

*   Ensure consistent, modular representation of governance elements
*   Support automated SOP updates through structured data
*   Define interdependencies between components, SOPs, and decision logic

---

## 2. Component Categories

1.  **Authority Components**
    *   Authority Matrix
    *   Approval levels (Execute, Approve, Review, Recommend, Override)
    *   Role definitions (Parent, Subsidiary, Finance, Compliance, Legal, Tax)
2.  **Materiality Components**
    *   Thresholds for financial transactions
    *   Risk sensitivity levels (Low, Medium, High, Emergency)
    *   Operational limits and tolerances
3.  **SOP Components**
    *   SOP metadata (Title, ID, Version, Effective Date, Review Cycle)
    *   SOP sections (Purpose, Scope, Procedures, Controls, KPIs, etc.)
    *   SOP dependency references (cross-SOP citations)
4.  **Process / Workflow Components**
    *   Inputs and outputs of each SOP
    *   Step-by-step process definitions
    *   Escalation paths
    *   Exception handling rules
5.  **Risk & Contingency Components**
    *   Risk events and scenarios
    *   Trigger thresholds
    *   Escalation and mitigation procedures
6.  **IP & Licensing Components**
    *   IP assets
    *   Licensing terms
    *   Approval and oversight requirements
7.  **Financial Components**
    *   Capital flows
    *   Intercompany transactions
    *   Revenue and cash flow rules
    *   Accounting treatment rules
8.  **Compliance & Tax Components**
    *   Regulatory rules
    *   Filing requirements
    *   Transfer pricing policies
    *   Tax elections
9.  **System & Metadata Components**
    *   Versioning schema
    *   Component creation and update history
    *   Dependency graph references
    *   Audit logs and records

---

## 3. Component Attributes

Each component should include the following attributes:

---

## 4. Component Relationships

*   **Hierarchical dependencies:** Authority components may govern multiple SOPs.
*   **Cross-SOP references:** Materiality changes impact Financial SOPs, Capital Flow, and Intercompany SOPs.
*   **Event-driven updates:** Risk or compliance events trigger automatic reassessment of related components.
*   **Version propagation:** Changes to a component trigger version bumps in dependent SOPs according to GGE rules.

---

## 5. Next Steps

1.  Assign initial Component IDs and ownership.
2.  Map dependencies for all current SOPs.
3.  Configure GGE to recognize each component and track versioning.
4.  Build automated impact analysis rules based on taxonomy.

---

## 6. Version Control

---
**End of Document**
`;

export const NS_GGP_004_LIFECYCLE = `
# Governance Graph Engine – Execution Lifecycle Specification

## Overview

**Document Title:** Governance Graph Engine – Execution Lifecycle Specification  
**Document ID:** NS-GGE-LIFECYCLE-004  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document defines the **end-to-end execution lifecycle** of the Governance Graph Engine (GGE). It specifies how governance changes are ingested, evaluated, propagated, approved, compiled into SOPs, and recorded for audit.

The lifecycle ensures:

*   Deterministic governance updates
*   Controlled version propagation
*   Full auditability
*   Clear human-in-the-loop checkpoints

---

## 2. Scope

This specification applies to:

*   All GGE executions (manual or scheduled)
*   All component changes (authority, materiality, risk, SOP, etc.)
*   All SOP compilation events
*   All audit and approval flows

Excluded:

*   External regulatory filing execution
*   Non-governance operational workflows

---

## 3. Execution Triggers

GGE execution may be triggered by:

1.  **Component Change Event**
    *   New component created
    *   Existing component updated
    *   Component deprecated
2.  **Scheduled Review Event**
    *   Periodic governance review
    *   SOP review cycle reached
3.  **Risk or Compliance Event**
    *   Risk threshold breach
    *   Regulatory change flag
4.  **Manual Invocation**
    *   Explicit execution by authorized role

Each trigger produces a **GGE Execution ID**.

---

## 4. Lifecycle Phases

### Phase 1: Ingestion & Validation

**Objective:** Validate inputs before governance impact analysis.

Steps:

*   Authenticate executor
*   Validate component schema
*   Verify permissions
*   Lock affected components

Outputs:

*   Validated component delta set
*   Execution context snapshot

---

### Phase 2: Dependency Graph Resolution

**Objective:** Identify downstream impacts.

Steps:

*   Traverse dependency graph
*   Identify impacted components
*   Identify affected SOPs
*   Classify impact severity

Outputs:

*   Impact map
*   Affected SOP list

---

### Phase 3: Version Impact Assessment

**Objective:** Determine version increments.

Steps:

*   Apply versioning rules
*   Classify changes (major/minor/patch)
*   Generate proposed new versions

Outputs:

*   Version bump plan
*   Change classification report

---

### Phase 4: Advisory Analysis (Optional)

**Objective:** Provide non-binding recommendations.

Steps:

*   Generate change summaries
*   Suggest update sequencing
*   Flag risk or compliance concerns

Outputs:

*   Advisory report

> Advisory outputs never auto-apply changes.

---

### Phase 5: Approval Workflow

**Objective:** Obtain required human approvals.

Steps:

*   Route approvals per Authority Matrix
*   Collect approvals, rejections, or comments
*   Handle escalations if required

Outputs:

*   Approval decision set

---

### Phase 6: SOP Compilation

**Objective:** Produce updated SOP artifacts.

Steps:

*   Apply approved changes
*   Regenerate SOP sections
*   Update metadata and references

Outputs:

*   New SOP versions
*   Compilation logs

---

### Phase 7: Audit Recording & Publication

**Objective:** Record immutable execution history.

Steps:

*   Write execution audit record
*   Persist version lineage
*   Publish SOPs to repository

Outputs:

*   Immutable audit trail
*   Published SOP artifacts

---

## 5. Execution States

Each execution progresses through states:

1.  Initialized
2.  Validated
3.  Analyzed
4.  Pending Approval
5.  Approved / Rejected
6.  Compiled
7.  Published
8.  Closed

State transitions are recorded immutably.

---

## 6. Failure & Rollback Handling

*   Validation failures halt execution
*   Approval rejection closes execution without publication
*   Partial compilation failures trigger rollback
*   All failures are audit logged

No destructive changes occur without approval.

---

## 7. Audit Trail Requirements

Each execution must record:

*   Execution ID
*   Trigger type
*   Executor
*   Timestamp
*   Input components
*   Impacted SOPs
*   Version changes
*   Approval decisions
*   Final outcome

---

## 8. Security & Access Control

*   Execution initiation restricted by role
*   Approval enforced via Authority Matrix
*   Read-only audit access for observers
*   No direct SOP editing outside GGE

---

## 9. Non-Goals

*   Autonomous governance changes
*   Auto-approval of material changes
*   Real-time operational enforcement

---

## 10. Version Control

---
**End of Document**
`;

export const NS_GGP_005_DECISION = `
# GGE Update Decision Prompt Specification v0.1

---

## Overview

**Document Title:** Governance Graph Engine – Update Decision Prompt Specification  
**Document ID:** NS-GGE-DECISION-005  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document defines the **Update Decision Prompt (UDP)** used by the Governance Graph Engine (GGE) to reason about governance changes.

The UDP is the **strategic reasoning layer** that:

*   Interprets component deltas
*   Evaluates dependency impact
*   Recommends SOP update scope and order
*   Proposes version increments
*   Flags risk, compliance, or authority concerns

The UDP is **advisory only**. All decisions remain subject to deterministic rules and human approval.

---

## 2. Design Principles

The Update Decision Prompt must:

*   Be deterministic-first
*   Be explainable and auditable
*   Never auto-approve changes
*   Produce structured, machine-readable output
*   Operate idempotently given identical inputs

---

## 3. Inputs to the Update Decision Prompt

Each UDP invocation receives a structured input package.

### 3.1 Execution Context

*   GGE Execution ID
*   Trigger Type (Component Change, Scheduled Review, Risk Event, Manual)
*   Executor Role
*   Timestamp

### 3.2 Component Delta Set

For each changed component:

*   Component ID
*   Component Type
*   Previous Version
*   Proposed Version
*   Nature of Change (Add / Modify / Deprecate)
*   Materiality Classification

### 3.3 Dependency Impact Map

*   Directly impacted components
*   Indirectly impacted components
*   Affected SOPs
*   Dependency depth

### 3.4 Governance Constraints

*   Authority Matrix snapshot
*   Materiality thresholds
*   Compliance rules
*   Risk tolerance levels

---

## 4. Reasoning Tasks

The UDP must perform the following reasoning tasks:

1.  **Impact Classification**
    *   Substantive vs non-substantive change
    *   Governance-critical vs informational
2.  **Version Recommendation**
    *   Major / Minor / Patch per SOP
    *   Justification for each recommendation
3.  **Update Sequencing**
    *   Determine correct SOP update order
    *   Identify prerequisite updates
4.  **Risk & Compliance Flagging**
    *   Identify elevated risk areas
    *   Flag compliance or tax implications
5.  **Approval Routing Suggestions**
    *   Recommend approval roles
    *   Identify escalation triggers

---

## 5. Output Schema

The UDP must return a structured output object.

### 5.1 Summary

*   Execution ID
*   High-level change narrative
*   Overall risk level

### 5.2 SOP Update Recommendations

For each SOP:

*   SOP ID
*   Current Version
*   Recommended New Version
*   Change Type (Major / Minor / Patch)
*   Rationale

### 5.3 Update Order

*   Ordered list of SOP IDs
*   Dependency justification

### 5.4 Risk & Compliance Flags

*   Flag Type
*   Severity
*   Affected Components/SOPs
*   Recommended Mitigation

### 5.5 Approval Suggestions

*   Required approver roles
*   Optional reviewers
*   Escalation notes

### 5.6 Confidence & Limitations

*   Areas of uncertainty
*   Assumptions made

---

## 6. Prompt Structure (Logical)

The Update Decision Prompt is structured logically as:

1.  System Context
2.  Governance Principles
3.  Component Delta Description
4.  Dependency Impact Map
5.  Explicit Reasoning Tasks
6.  Output Schema Enforcement

---

## 7. Example Prompt Skeleton (Abstracted)

---

## 8. Determinism & Audit Controls

*   UDP outputs are stored with execution records
*   Prompt version is recorded
*   Model version is recorded
*   No free-text-only outputs permitted

---

## 9. Non-Goals

*   Final decision authority
*   Automatic SOP modification
*   Regulatory interpretation

---

## 10. Version Control

---
**End of Document**
`;

export const NS_GGP_006_VERSION = `
# GGE Version Semantics & Propagation Rules Specification v0.1

---

## Overview

**Document Title:** Governance Graph Engine – Version Semantics & Propagation Rules  
**Document ID:** NS-GGE-VERSION-006  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This specification defines the rules and semantics governing how **SOP and component versions** are incremented and how changes **propagate across dependent SOPs** within the Governance Graph Engine (GGE).

Objectives:

*   Ensure deterministic versioning
*   Maintain auditability
*   Avoid silent or untracked changes
*   Provide clear rationale for major, minor, or patch bumps
*   Control propagation of changes across interdependent SOPs

---

## 2. Versioning Philosophy

*   **Atomic Versioning:** Components and SOPs are versioned independently
*   **Deterministic Propagation:** Dependency graph dictates which SOPs must update
*   **Immutable Published Versions:** No modification to published SOPs
*   **Human Oversight:** Advisory suggestions exist, but approvals are required

### Version Components

*   **Major**: Material change affecting multiple SOPs, high-risk impact, or compliance-triggered
*   **Minor**: Moderate change affecting one SOP or non-critical component updates
*   **Patch**: Minor wording, typo corrections, or non-impactful metadata changes

### Version Format

*   Semantic: \`MAJOR.MINOR.PATCH\` (e.g., \`2.3.1\`)
*   Optional pre-release or draft tag if under review

---

## 3. Trigger Events for Version Changes

1.  **Component Update**
    *   Add / Modify / Deprecate
    *   Impacts SOPs in dependency graph
2.  **SOP Content Change**
    *   Manual revision post-review
3.  **Authority or Materiality Change**
    *   Changes propagate to SOPs referencing affected components
4.  **Risk & Compliance Event**
    *   Requires SOP version update if risk thresholds are crossed

---

## 4. Propagation Rules

### 4.1 Dependency Graph Traversal

*   Identify direct and indirect SOP dependencies
*   Determine change impact severity (Major / Minor / Patch)
*   Flag SOPs for update according to dependency depth

### 4.2 Propagation Logic

1.  **Major Change:**
    *   All dependent SOPs must receive at least a minor bump
    *   High-risk SOPs flagged for mandatory review
2.  **Minor Change:**
    *   Directly impacted SOP receives minor bump
    *   Indirect SOPs reviewed for necessity of patch bump
3.  **Patch Change:**
    *   Limited to single SOP
    *   No propagation unless explicitly required

### 4.3 Escalation

*   If multiple SOPs cross materiality thresholds simultaneously, escalate to senior approver
*   Automatically record reason in audit trail

---

## 5. Version Update Workflow

1.  Detect component or SOP change
2.  Execute **Dependency Graph Traversal**
3.  Determine proposed SOP version bumps
4.  Feed to **Update Decision Prompt (UDP)** for advisory
5.  Collect approvals
6.  Apply updates and record in audit trail
7.  Publish new SOP versions

---

## 6. Audit Requirements

*   All version changes logged with:
    *   Execution ID
    *   Trigger type
    *   Component / SOP IDs
    *   Previous and new version
    *   Rationale (generated by UDP)
    *   Approver metadata
*   Version history maintained per SOP
*   No silent overwrites permitted

---

## 7. Non-Goals

*   Versioning outside GGE
*   Automatic human approval
*   External system enforcement

---

## 8. Version Control

---
**End of Document**
`;

export const NS_GGP_007_DATAMODEL = `
# GGE Audit Data Model & Frontend Read Models v0.1

---

## Cover Page

**Document Title:** Governance Graph Engine – Audit Data Model & Frontend Read Models  
**Document ID:** NS-GGE-DATAMODEL-007  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document defines the **database and API models** to support the Governance Graph Engine (GGE) **audit trail** and **frontend read models**. These models enable the MVP frontend screens for:

1.  Viewing full **GGE execution audit trail**
2.  Browsing **SOP version history** with links to published versions

The goal is to provide **deterministic, auditable, and performant views** of governance changes.

---

## 2. Audit Data Model

### 2.1 Tables / Collections

#### Table: \`gge_executions\`
#### Table: \`gge_component_changes\`
#### Table: \`gge_sop_versions\`

### 2.2 Relationships

*   \`gge_executions\` → \`gge_component_changes\` (1:N)
*   \`gge_executions\` → \`gge_sop_versions\` (1:N)
*   \`gge_component_changes\` → \`gge_sop_versions\` via impacted SOPs (N:N)

---

## 3. Frontend Read Models

### 3.1 GGE Execution Audit Trail

**Purpose:** View full execution history

**Read Model:** \`execution_audit_view\`

*   execution_id
*   trigger_type
*   executor_role
*   execution_time
*   status
*   component_changes: List
    *   component_id
    *   previous_version
    *   new_version
    *   change_type
    *   materiality
    *   rationale
*   sop_versions: List
    *   sop_id
    *   version
    *   change_type
    *   approval_status
    *   published_at

### 3.2 SOP Version History Viewer

**Purpose:** List all published SOP versions with links

**Read Model:** \`sop_history_view\`

*   sop_id
*   sop_title
*   sop_category
*   versions: List
    *   version
    *   execution_id
    *   change_type
    *   approval_status
    *   published_at
    *   summary_notes

**Frontend Functionality:**

*   Filter by SOP or category
*   Sort by version or date
*   Click to view published SOP (link to PDF/HTML)
*   Display cross-SOP dependencies (optional visual)

---

## 4. API Contract Examples

**GET /api/executions/{execution_id}**

*   Returns: \`execution_audit_view\` object

**GET /api/sops/{sop_id}/versions**

*   Returns: \`sop_history_view\` object

**Optional Filters:**

*   Date range
*   Executor
*   Trigger type
*   Materiality level

---

## 5. Security & Access Control

*   Read-only access for frontend observers
*   Role-based API access for internal review teams
*   All outputs immutable
*   No edit/write access via FE MVP

---

## 6. Version Control

---
**End of Document**
`;

export const NS_GGP_008_EEE = `
# Governance Graph Engine – End-to-End Example Execution

## Overview

**Document Title:** Governance Graph Engine – End-to-End Example Execution  
**Document ID:** NS-GGE-EEE-008  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD * *  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document provides a **step-by-step example** of how a governance change flows through the GGE system. It illustrates the interaction of all core components including:

*   Component Taxonomy
*   Update Decision Prompt (UDP)
*   Version Semantics & Propagation Rules
*   Audit Data Model
*   SOP compilation
*   Frontend read models

The goal is to validate design logic, identify potential gaps, and ensure auditability.

---

## 2. Scenario Overview

**Scenario:** Materiality threshold change for a financial component affecting multiple SOPs.

**Trigger:** Manual update of the materiality threshold for \`Capital Flow SOP\` component.

**Affected SOPs:**

1.  Capital Flow SOP
2.  Intercompany Transactions SOP
3.  Finance / Cash Flow SOP

**Goal:** Update impacted SOPs, ensure proper version bumps, record audit trail, and visualize results in the frontend.

---

## 3. Step-by-Step Execution

### Step 1: Component Change Event

*   Executor: Finance Manager
*   Component: \`Capital Flow Materiality Threshold\`
*   Change Type: Modify
*   Previous Value: $50,000
*   New Value: $100,000
*   Materiality Classification: Medium → High

**GGE Action:**

*   Assign Execution ID: \`EXEC-2025-001\`
*   Capture execution context

---

### Step 2: Dependency Graph Resolution

*   Identify SOPs impacted by this component
*   Determine depth of dependencies
*   Classify impact (Major/Minor/Patch)

**Impact Assessment:**

*   Capital Flow SOP → Major
*   Intercompany Transactions SOP → Minor
*   Finance / Cash Flow SOP → Minor

---

### Step 3: Update Decision Prompt (UDP) Execution

*   Input: Component delta + dependency map + governance constraints
*   Reasoning Tasks:
    *   Classify impact
    *   Recommend SOP version bumps
    *   Suggest update order
    *   Flag risk/compliance
    *   Recommend approval routing

**UDP Output (JSON structured):**

---

### Step 4: Approval Workflow

*   Notifications sent to Finance Director and Compliance Officer
*   Collect approvals
*   Update execution state: Pending Approval → Approved

---

### Step 5: SOP Compilation

*   Apply approved changes
*   Generate new SOP versions:
    *   Capital Flow SOP: v2.0.0
    *   Intercompany Transactions SOP: v1.1.0
    *   Finance / Cash Flow SOP: v1.1.0
*   Update metadata and references

---

### Step 6: Audit Recording

*   Record all changes in \`gge_executions\`, \`gge_component_changes\`, and \`gge_sop_versions\`
*   Immutable logs created for each SOP and component change
*   Execution state: Published → Closed

---

### Step 7: Frontend Visualization

**Execution Audit Trail Screen:**

*   Displays execution ID, trigger type, executor, timestamp
*   Component changes with previous and new versions
*   SOP versions with change type and approvals

**SOP Version History Screen:**

*   Lists all published SOP versions per SOP
*   Allows click-through to view full SOP PDF/HTML
*   Shows dependencies visually (optional)

---

## 4. Key Observations

*   Version propagation and sequencing works as designed
*   UDP correctly flags risk and recommends approval routing
*   Audit trail is fully populated and immutable
*   Frontend screens can render execution and SOP history with minimal query complexity

---

## 5. Next Steps

1.  Validate real-world scenarios across all SOPs
2.  Stress test multiple simultaneous component updates
3.  Implement FE MVP for audit trail and SOP version screens
4.  Integrate automated notifications for approvals

---

## 6. Version Control

---
**End of Document**
`;

export const NS_GGP_009_IMPL = `
# GGE MVP Implementation Plan v0.1

---

## Overview

**Document Title:** Governance Graph Engine – MVP Implementation Plan  
**Document ID:** NS-GGE-IMPL-009  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document provides a **detailed implementation plan** for the Governance Graph Engine (GGE) MVP. It translates the architecture, specifications, and data models into modular components, backend systems, and frontend screens ready for development.

Objectives:

*   Define MVP scope and features
*   Map backend Python modules and responsibilities
*   Define frontend read models and screens
*   Specify APIs and integration points
*   Outline database schema implementation
*   Highlight deployment and initial test strategy

---

## 2. MVP Scope

**Backend Features:**

1.  Component Taxonomy CRUD & versioning
2.  Update Decision Prompt (UDP) execution
3.  Version Semantics & Propagation Rules
4.  Dependency graph resolution
5.  Audit trail recording
6.  SOP version compilation

**Frontend Features:**

1.  GGE Execution Audit Trail
2.  SOP Version History Viewer
3.  Role-based access control (read-only MVP)

**Exclusions for MVP:**

*   Automatic SOP publication
*   Full notifications & email workflow
*   Complex visualization of dependency graphs (optional enhancement)
*   AI/ML enhancements beyond the UDP

---

## 3. System Architecture Overview

**Backend (Python Modules):**

**Database Schema:**

*   \`components\`, \`component_changes\`, \`sop_versions\`, \`executions\`, \`dependencies\`
*   Relational (Postgres) or NoSQL (MongoDB) for flexible querying
*   Indexed for execution_id, sop_id, component_id for performance

**Frontend (React or React Native for cross-platform MVP):**

*   \`ExecutionAuditScreen\` → Shows execution details + component changes + SOP updates
*   \`SOPVersionHistoryScreen\` → Lists SOP versions, change type, approval status, published_at
*   Role-aware rendering (read-only for most users)

**API Contracts:**

*   GET /api/executions/{execution_id} → returns execution_audit_view
*   GET /api/sops/{sop_id}/versions → returns sop_history_view
*   POST /api/components/{component_id}/update → triggers UDP evaluation (internal)

---

## 4. Data Flow

1.  **Component Update Trigger** → \`udp_engine\` receives structured delta
2.  **UDP Reasoning** → Evaluates impact, recommends SOP version changes, flags risk
3.  **Dependency Graph Resolution** → Determines propagation order
4.  **Versioning Module** → Applies semantic versioning rules
5.  **Audit Module** → Records all execution details and changes
6.  **SOP Manager** → Compiles new SOP versions, stores metadata
7.  **API Layer** → Serves frontend read models
8.  **Frontend** → Renders audit trail and SOP version history screens

---

## 5. Python Module Structure

---

## 6. Frontend Screen Layouts (MVP)

### 6.1 Execution Audit Trail

*   Header: Execution ID, Trigger Type, Executor, Timestamp
*   Table/List: Component changes with old/new versions, change type, materiality, rationale
*   Table/List: SOP versions updated, new version, change type, approval status, published_at

### 6.2 SOP Version History Viewer

*   Dropdown or search: SOP selection
*   Table/List: Version history, change type, approval status, publication date
*   Optional link: View published SOP PDF/HTML
*   Optional: Cross-SOP dependency graph snippet

---

## 7. Deployment & Environment

*   Python 3.11+
*   PostgreSQL / MongoDB (backend DB)
*   FastAPI / Flask for API MVP
*   React / React Native for FE MVP
*   Docker containerized for easy deployment
*   Initial single environment (Dev), extend to staging/prod later

---

## 8. Testing Strategy

*   Unit tests for each Python module
*   Integration tests for full execution flow
*   **Mock UDP inputs for deterministic outputs**
*   FE rendering tests using sample data from API
*   Ensure audit records match execution trace

---

## 9. Version Control

---
**End of Document**
`;

export const NS_GGP_010_FE = `
# Governance Graph Engine – Frontend MVP Wireframes & Module Breakdown

**Document Title:** Governance Graph Engine – Frontend MVP Wireframes & Module Breakdown  
**Document ID:** NS-GGP-010-FE  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

Define **wireframes, component interactions, and React / React Native module breakdown** for the GGE frontend MVP. This includes the two main screens:

1.  GGE Execution Audit Trail
2.  SOP Version History Viewer

**Goals:**

*   Ensure UI/UX aligns with backend data models
*   Map React component hierarchy
*   Define interactions and data flows for MVP screens

---

## 2. Screen Wireframes (Text-Based)

### 2.1 GGE Execution Audit Trail Screen

**Header:**

*   Execution ID
*   Trigger Type
*   Executor Role
*   Execution Time

**Tables / Sections:**

*   **Component Changes Table**
    *   Columns: Component ID, Previous Version, New Version, Change Type, Materiality, Rationale
*   **SOP Versions Updated Table**
    *   Columns: SOP ID, Version, Change Type, Approval Status, Published Date

**Filters:**

*   Date Range
*   Trigger Type
*   Executor Role
*   Materiality Level

**Interactions:**

*   Click on SOP ID → opens SOP PDF/HTML
*   Expand component change → show detailed rationale

### 2.2 SOP Version History Viewer Screen

**Header:**

*   SOP Title
*   SOP Category

**Version Table:**

*   Columns: Version, Execution ID, Change Type, Approval Status, Published Date, Notes
*   Sortable by Version or Date

**Interactions:**

*   Dropdown to select SOP or category
*   Click version → opens published SOP
*   Optional visualization of dependencies (graph snippet)

---

## 3. React / React Native Module Breakdown

\`\`\`
gge_fe_mvp/
├── src/
│   ├── components/
│   │   ├── Header.js               # Reusable header component
│   │   ├── FilterPanel.js          # Filters for screens
│   │   ├── ComponentChangesTable.js # Table of component changes
│   │   ├── SOPVersionsTable.js      # Table of SOP version updates
│   │   ├── VersionHistoryTable.js   # SOP Version History Table
│   │   ├── DependencyGraphSnippet.js # Optional visual dependency component
│   ├── screens/
│   │   ├── ExecutionAuditScreen.js  # Full audit trail screen
│   │   ├── SOPVersionHistoryScreen.js # SOP version history screen
│   ├── services/
│   │   ├── api.js                  # Fetch functions for API endpoints
│   │   ├── auth.js                 # Role-based access helper functions
│   ├── context/
│   │   ├── ExecutionContext.js     # Store execution state & selected filters
│   │   ├── SOPContext.js           # Store SOP selections and version data
│   ├── App.js
│   ├── index.js
└── package.json
\`\`\`

---

## 4. Component Interaction Flow

1.  User selects a date range / filters → updates context
2.  ExecutionAuditScreen fetches \`execution_audit_view\` from API → renders ComponentChangesTable & SOPVersionsTable
3.  SOPVersionHistoryScreen fetches \`sop_history_view\` from API → renders VersionHistoryTable
4.  Clicking SOP or version → triggers PDF/HTML viewer (embedded or new tab)
5.  Optional DependencyGraphSnippet renders cross-SOP dependencies using fetched data

**State Management:**

*   Use React Context or Redux for MVP simplicity
*   Shared state between screens for filter selections and execution context

---

## 5. MVP Considerations

*   **Responsive Design:** Desktop-first, mobile compatible
*   **Read-only MVP:** No editing, only viewing
*   **Data Refresh:** Polling or manual refresh button for audit updates
*   **Performance:** Pagination for large tables
*   **Security:** Role-based rendering; users cannot edit or trigger executions

---

## 6. Next Steps

1.  Convert text wireframes into Figma or Sketch design for visual reference
2.  Implement API mocks for FE development
3.  Build ExecutionAuditScreen and SOPVersionHistoryScreen components
4.  Integrate React context and API services
5.  Add optional dependency visualization

---

## 7. Version Control

| Version | Date | Description | Approved By |
| :--- | :--- | :--- | :--- |
| 0.1 | TBD | Initial FE MVP wireframes and module breakdown | Parent / HoldCo Manager |

**End of Document**
`;

export const NS_GGP_011_APIMAP = `
# GGE API Endpoints to Frontend Component Mapping v0.1

---

## Cover Page

**Document Title:** Governance Graph Engine – API Endpoints to Frontend Component Mapping  
**Document ID:** NS-GGE-011-APIMAP  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document defines the mapping between **backend API endpoints** and **frontend components** for the GGE MVP. This ensures that all FE modules can retrieve the required data and maintain consistent state management.

---

## 2. API Endpoint to FE Component Mapping

| FE Screen / Component | API Endpoint | Data Returned | Notes |
| :--- | :--- | :--- | :--- |
| **ExecutionAuditScreen** | \`GET /api/executions/{execution_id}\` | \`execution_audit_view\` object | Provides full execution details including component changes and SOP versions updated. |
| **ComponentChangesTable** | Included in \`execution_audit_view\` | List of component changes | Displays Component ID, previous/new version, change type, materiality, rationale |
| **SOPVersionsTable** | Included in \`execution_audit_view\` | List of SOP version updates | Displays SOP ID, version, change type, approval status, published date |
| **SOPVersionHistoryScreen** | \`GET /api/sops/{sop_id}/versions\` | \`sop_history_view\` object | Provides SOP version history with published links |
| **VersionHistoryTable** | Included in \`sop_history_view\` | List of SOP versions | Columns: version, execution ID, change type, approval status, published date, notes |
| **DependencyGraphSnippet** | Optional \`GET /api/sops/{sop_id}/dependencies\` | dependency graph object | Visualizes cross-SOP dependencies, optional for MVP |
| **FilterPanel** | Frontend only | N/A | Updates context; used to filter tables and fetch API data based on user selections |

---

## 3. Interaction Flow

1.  User applies filters in FilterPanel → updates context
2.  ExecutionAuditScreen fetches \`/api/executions/{execution_id}\` → populates ComponentChangesTable and SOPVersionsTable
3.  SOPVersionHistoryScreen fetches \`/api/sops/{sop_id}/versions\` → populates VersionHistoryTable
4.  Optional: DependencyGraphSnippet fetches \`/api/sops/{sop_id}/dependencies\` → renders visual graph
5.  Clicking on SOP ID / version opens published SOP in viewer

---

## 4. Considerations

*   All endpoints should support pagination for large datasets
*   API responses should be consistent and immutable for audit reliability
*   Role-based filtering to ensure security and proper access control
*   Error handling: FE displays fallback messages if API fails
*   Future-proofing: API versioning to handle updates without breaking FE

---

## 5. Next Steps

1.  Implement API mocks for frontend development
2.  Validate data mapping with sample backend data
3.  Integrate FE components with API services using context or Redux
4.  Add optional dependency graph visualization in FE MVP

---

## 6. Version Control

| Version | Date | Description | Approved By |
| :--- | :--- | :--- | :--- |
| 0.1 | TBD | Initial API-to-FE Component Mapping | Parent / HoldCo Manager |

**End of Document**
`;

export const NS_GGP_012_STATE = `
# GGE Frontend MVP – State Management Plan v0.1

---

## Overview

**Document Title:** Governance Graph Engine – Frontend MVP State Management Plan  
**Document ID:** NS-GGE-012-STATE  
**Version:** 0.1  
**Prepared By:** Strategy & Governance Office  
**Approved By:** Parent / HoldCo Manager  
**Effective Date:** TBD  
**Review Cycle:** As Needed / Upon Material Change  

---

## 1. Purpose

This document defines the **state management strategy** for the GGE frontend MVP. It ensures that data retrieved from APIs is properly stored, shared across screens, and updated consistently in response to user interactions or backend changes.

---

## 2. State Management Goals

*   Provide **single source of truth** for Execution and SOP data
*   Enable **synchronized updates** across multiple screens
*   Maintain **filter and selection states** persistently during user session
*   Support **scalability** for future enhancements (dependency visualization, real-time updates)
*   Simplify **integration with API endpoints** and FE components

---

## 3. State Model Overview

### 3.1 Global State Structure (React Context / Redux)

\`\`\`javascript
state = {
  executionAudit: {
    selectedExecutionId: null,
    executionData: {},          // execution_audit_view
    componentChanges: [],       // from execution_audit_view
    sopVersionsUpdated: [],     // from execution_audit_view
    filters: {
      dateRange: {start: null, end: null},
      triggerType: null,
      executorRole: null,
      materiality: null
    },
    loading: false,
    error: null
  },
  sopVersionHistory: {
    selectedSopId: null,
    sopVersions: [],            // from sop_history_view
    filters: {
      category: null
    },
    loading: false,
    error: null
  },
  dependencyGraph: {
    data: null,                  // optional graph object
    loading: false,
    error: null
  },
  user: {
    role: null,                  // role-based rendering
    permissions: []
  }
}
\`\`\`

### 3.2 Local Component State

*   Temporary UI states (sorting, pagination, expanded rows)
*   Form inputs if needed in future MVP

---

## 4. State Management Strategy

### 4.1 Context / Redux Usage

*   **ExecutionAuditContext:** Manages state for ExecutionAuditScreen and nested components
*   **SOPVersionContext:** Manages state for SOPVersionHistoryScreen
*   **DependencyGraphContext (optional):** Manages optional dependency graph visualization
*   **UserContext:** Manages role and permission data

### 4.2 Data Fetching and Update Flow

1.  User selects execution/SOP or applies filters → dispatch action
2.  Context fetches API data → stores in global state
3.  Components subscribe to context → auto-render updated data
4.  API errors update \`error\` state → display notification / fallback
5.  Optional: real-time updates using WebSockets or polling in later iterations

### 4.3 Caching & Memoization

*   Memoize API responses to avoid redundant requests
*   Store recent executions / SOPs locally for session reuse
*   Use selectors to efficiently access nested data in context/redux

### 4.4 Loading & Error Handling

*   \`loading\` flags per context to show spinners / skeleton screens
*   \`error\` fields to display user-friendly messages
*   Component fallback UI if state is empty or errors occur

---

## 5. State Synchronization Across Screens

*   Filters applied in ExecutionAuditScreen can optionally persist to SOPVersionHistoryScreen (shared context)
*   Updates from new execution runs can trigger refresh of relevant SOP versions
*   Optional dependency visualization updates when related SOPs are selected

---

## 6. MVP Considerations

*   **Read-only MVP:** No edit operations in FE; backend is source of truth
*   **Performance:** Pagination, virtualized tables for large datasets
*   **Security:** Role-based conditional rendering; restricted API access
*   **Future Proofing:** Structure supports addition of notifications, live updates, and edit workflows

---

## 7. Next Steps

1.  Implement React Context providers and hooks for each state slice
2.  Connect ExecutionAuditScreen and SOPVersionHistoryScreen to context
3.  Integrate API service functions for data fetching
4.  Implement loading, error, and empty states
5.  Test state consistency across multiple screens and filter changes

---

## 8. Version Control

| Version | Date | Description | Approved By |
| :--- | :--- | :--- | :--- |
| 0.1 | TBD | Initial FE MVP State Management Plan | Parent / HoldCo Manager |

**End of Document**
`;
