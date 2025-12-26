
export const NS_IDN_001_OVERVIEW = `
# Identity & Entity Nexus (IDN) - Overview

**System Name:** Identity & Entity Nexus (IDN)  
**Document Title:** IDN Overview  
**Document Id:** NS-IDN-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Identity & Entity Nexus (IDN)** is the authoritative engine responsible for identity resolution, entity modeling, and relationship integrity across the Northfield Solidarity ecosystem.

IDN exists to answer a foundational question:
> Who or what is acting, being acted upon, or being reasoned about — and how are those identities and entities related?

IDN provides canonical identity truth and entity graph coherence for all other engines.

## 2. Role Within Northfield Solidarity
IDN sits at the foundational substrate layer of the system.
All engines depend on IDN for:
- Actor identity (human, system, agent)
- Entity identity (product, property, account, vendor, customer)
- Relationship resolution (ownership, control, attribution)

**IDN identifies; others decide and act.**

## 3. What IDN Produces
IDN produces **Identity and Entity Artifacts**, including:
- Canonical Actor identities
- Canonical Entity records
- Relationship edges between entities
- Resolution decisions (merge, split, alias)
- Versioned identity states over time

## 4. What IDN Does Not Do
- Authenticate users (delegated to auth systems)
- Authorize actions (GGP)
- Execute workflows (DAT, CWP)
- Store domain-specific business logic

## 5. Core Capabilities
- **Identity Resolution:** Resolve multiple identifiers to single canonical identity.
- **Entity Modeling:** Stable entity representation.
- **Relationship Graph Management:** Typed, versioned edges.
- **Alias & Merge Handling:** Track merges/splits.
- **Temporal Identity Tracking:** Preserve state over time.

## 6. Interaction With Other Engines
- **GGP:** Uses identity context for governance.
- **SIG:** Attributes signals to entities.
- **PIE:** Groups insights by entity.
- **SIM:** Binds scenarios to entities.
- **DAT:** Executes actions on behalf of entities.
- **PECA:** Creates new entities.
- **CWP:** Manages agentic workers.

## 7. Operational Posture
- Write-controlled (governed).
- Read-heavy.
- Replayable.
`;

export const NS_IDN_002_TAXONOMY = `
# Identity & Entity Nexus (IDN) - Taxonomy

**Document Id:** NS-IDN-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical IDN taxonomy.

## 2. Principles
Canonical First, Multiplicity of Identifiers, Explicit Resolution, Temporal Truth.

## 3. Core Domains
Actor, Entity, Identifier, Alias/Resolution, Relationship, Event.

## 4. Taxonomy Categories
### Actor classes
Human, Agent, Service, Organization.

### Entity Classes
LegalEntity, PropertyEntity, ProductEntity, AccountEntity, ConceptEntity.

### Identifier Types
Email, platform_id, tax_id, account_number.

### Relationship Types
Owns, controls, manages, employed_by, associated_with.

## 5. Resolution Events
Merge, Split, IdentifierLinked, IdentifierUnlinked.
`;

export const NS_IDN_003_ARCHITECTURE = `
# Identity & Entity Nexus (IDN) - Architecture

**Document Id:** NS-IDN-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines logical architecture of IDN.

## 2. Layers
1. **Ingress & Validation:** Request handling.
2. **Canonical Registry:** Store stable ID records.
3. **Identifier Resolution:** Link identifiers deterministicly.
4. **Relationship Graph:** Maintain typed edges.
5. **Event Ledger:** Append-only history.
6. **Projection:** Read-optimized views.
7. **Distribution:** API and Event Bus.

## 3. Storage
- **Authoritative:** Postgres (Registry + Ledger).
- **Projections:** Materialized views / Redis (cache).

## 4. Components
- **Ingress:** API/Event consumer.
- **Resolver:** Conflict detection.
- **Graph:** Edge management.
- **Ledger:** Event persistence.
- **Projector:** View builder.
`;

export const NS_IDN_004_LIFECYCLE = `
# Identity & Entity Nexus (IDN) - Lifecycle

**Document Id:** NS-IDN-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
End-to-end identity lifecycle.

## 2. Stages
1. **Initiation:** Request from Human/Service.
2. **Creation:** Canonical ID assignment.
3. **Linking:** Identifier attachment + Resolution.
4. **Relationships:** Edge creation (Active/Closed).
5. **Conflict:** Detection & Quarantine.
6. **Governance:** Merge/Split operations.
7. **Projection:** Update read models.
8. **Replay:** Audit/Rebuild.

## 3. Key Concepts
- **Merge:** Two canonicals → One survivor + Redirect.
- **Split:** One canonical → Multiple + Reassignment.
`;

export const NS_IDN_005_DECISION = `
# Identity & Entity Nexus (IDN) - Decision Framework

**Document Id:** NS-IDN-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Decision framework for IDN. Decisions are **narrowly scoped, deterministic, and non-executing**.

## 2. Decision Classes
- **Canonical Creation:** Create or Reject?
- **Identifier Linking:** Link or Quarantine?
- **Conflict Detection:** Allow or Flag?
- **Relationship Validation:** Valid edge?
- **Merge/Split:** Approve or Reject?

## 3. Artifacts
Immutable artifacts with \`decision_id\`, \`rationale\`, \`ruleset_version\`.
`;

export const NS_IDN_006_VERSION = `
# Identity & Entity Nexus (IDN) - Versioning

**Document Id:** NS-IDN-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Versioning model for identity truth.

## 2. Principles
- **History Immutable:** Never rewrite past state.
- **Event-Sourced:** Versions = Replayed events.
- **Temporal Truth:** Meaning is valid for a time window.

## 3. Versioned Components
Canonical records, Identifier links, Relationships, Logic (rulesets).

## 4. Mechanism
Append-only event ledger. Identities evolve via events.
`;

export const NS_IDN_007_DATAMODEL = `
# Identity & Entity Nexus (IDN) - Data Model

**Document Id:** NS-IDN-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Authoritative data model.

## 2. Core Tables
- **actor:** \`actor_id\`, \`type\`, \`status\`.
- **entity:** \`entity_id\`, \`type\`, \`lifecycle\`.
- **identifier:** \`identifier_id\`, \`value\`, \`source\`.
- **identity_identifier_link:** \`subject_id\`, \`identifier_id\`.
- **relationship:** \`source\`, \`target\`, \`type\`, \`effective_dates\`.
- **identity_event:** Ledger of changes.
- **idn_decision:** Decision records.

## 3. Projections
- **identifier_resolution_view**
- **entity_relationship_view**
`;

export const NS_IDN_008_EEE = `
# Identity & Entity Nexus (IDN) - End-to-End Example

**Document Id:** NS-IDN-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario
New property investment.

## 2. Flow
1. **Actor Creation:** Agent provisioned (CWP). Canonical ID created.
2. **Entity Creation:** Property entity created (PECA). Canonical ID created.
3. **Relationship:** Agent 'manages' Property.
4. **Conflict:** SIG sees duplicate property ID. Quarantined.
5. **Merge:** Governance reviews and merges duplicate. Redirect created.
6. **Projection:** Updated.
7. **Audit:** Replay confirms history.
`;

export const NS_IDN_009_IMPL = `
# Identity & Entity Nexus (IDN) - Implementation Blueprint

**Document Id:** NS-IDN-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
MVP Implementation plan.

## 2. Services
- **idn-api:** Read + Governed Write.
- **idn-resolver:** Identifier logic.
- **idn-graph:** Edge management (postgres).
- **idn-event-ledger:** Persistence.
- **idn-projector:** Read views.

## 3. Stack
Python 3.12+, FastAPI, Postgres, Kafka (opt).

## 4. Rollout
1. Registry Tables.
2. Identifier Linking logic.
3. Relationship Graph.
4. Event Ledger.
5. Merge Governance.
`;

export const NS_IDN_010_FE = `
# Identity & Entity Nexus (IDN) - Frontend / Operator UI

**Document Id:** NS-IDN-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operator UI. Truth-inspection and guarded mutation.

## 2. Principles
Search-first, No silent mutations, Auditability.

## 3. Screens
- **Global Search:** Find actors/entities.
- **Actor/Entity Detail:** View truth, history, relationships.
- **Identifier Inspector:** Trace conflicts.
- **Relationship Graph:** Visual explorer.
- **Merge Workbench:** Governed merge ops.
- **Audit Timeline:** Event history.

## 4. Components
GlobalSearchBar, SearchResultsTable, RelationshipGraphPanel, MergeWorkbench.
`;

export const NS_IDN_011_APIMAP = `
# Identity & Entity Nexus (IDN) - API Mapping

**Document Id:** NS-IDN-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical API map.

## 2. Surface Groups
- **Search:** \`GET /search\`, \`GET /resolve/identifier\`.
- **Registry:** \`GET /actors/{id}\`, \`GET /entities/{id}\`.
- **Graph:** \`GET /graph/neighborhood\`.
- **Governance:** \`POST /merge/cases\`.
- **Audit:** \`GET /events\`, \`POST /export/audit-pack\`.

## 3. Guarantees
Read-optimized, Write-guarded.
`;

export const NS_IDN_012_STATE = `
# Identity & Entity Nexus (IDN) - State Semantics

**Document Id:** NS-IDN-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
State model.

## 2. Domains
- **Registry State:** Active/Suspended/Retired.
- **Link State:** Linked/Quarantined/Unlinked.
- **Relationship State:** Open/Closed (Effective-dated).
- **Merge State:** Proposed/Reviewed/Executed.

## 3. Consistency
Strong consistency for Registry. Eventual for Projections.
`;

export const NS_IDN_013_RUNBOOK = `
# Identity & Entity Nexus (IDN) - Runbook

**Document Id:** NS-IDN-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures.

## 2. Procedures
- **Create:** Verify initiator, idempotency.
- **Link:** Check collisions.
- **Merge:** Review evidence, execute, verify redirect.
- **Rebuild Projections:** Trigger on schema change.
- **Disaster Recovery:** Restore DB + Replay events.

## 3. Invariants
Never delete canonicals. Never silent reassign.
`;

export const NS_IDN_014_DATADEF = `
# Identity & Entity Nexus (IDN) - Data Definitions

**Document Id:** NS-IDN-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical field-level definitions.

## 2. Contracts
- **actor/entity:** \`id\`, \`type\`, \`status\`.
- **identifier:** \`value\`, \`source\`, \`confidence\`.
- **relationship:** \`source\`, \`target\`, \`type\`, \`effective_from/to\`.
- **identity_event:** \`type\`, \`payload\`, \`correlation_id\`.
- **idn_decision:** \`outcome\`, \`rationale\`.

## 3. Invariants
- Canonical IDs immutable.
- Timestamps UTC.
- Identifiers unique per source.
`;
