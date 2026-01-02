
export const NS_MUX_001_OVERVIEW = `
# Market Integration Layer (MUX) - Overview

**System Name:** Market Integration Layer (MUX)  
**Document Title:** MUX Overview  
**Document Id:** NS-MUX-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Market Integration Layer (MUX)** is responsible for ingesting, normalizing, validating, and exposing external market and platform truth to the Northfield Solidarity ecosystem.

MUX answers a single core question:
> What actually happened in the external world — according to the source of record?

MUX does not decide strategy, execute actions, or govern outcomes. It exists to provide authoritative external facts, with provenance and confidence, to internal engines.

## 2. Role Within Northfield Solidarity
MUX sits at the boundary between Northfield Solidarity and the outside world.

**Interfaces with:**
- Marketplaces
- Ad platforms
- Payment processors
- Banks
- Logistics providers
- Data vendors

**Supplies external truth to:**
- **FLO:** financial reconciliation and payouts
- **DAT:** execution verification and settlement
- **PIE:** market signals and validation
- **SIG:** raw signal ingestion
- **PTE:** performance attribution
- **GGP:** audit and governance review

**MUX is the only engine allowed to assert external system truth.**

## 3. What MUX Produces
MUX produces **External Artifacts**, which are structured, versioned representations of external reality:
- Transaction confirmations
- Settlement and payout records
- Statements and invoices
- Delivery and fulfillment events
- Platform status and availability signals

All artifacts include: \`source_system\`, \`external_identifiers\`, \`timestamp\`, \`integrity_checks\`, \`confidence\`.

## 4. What MUX Does Not Do
- Decide how to act on external data (DAT)
- Classify financial meaning (FLO)
- Score or rank opportunities (PIE)
- Govern policy or approvals (GGP)
- Maintain internal identity (IDN)

**MUX observes and reports.**

## 5. Core Capabilities
- **Connector Management:** Secure, isolated integrations.
- **Normalization & Validation:** Convert external schemas to canonical internal representations.
- **Integrity & Deduplication:** Prevent duplicate or tampered data.
- **Statement Ingestion:** Periodic authoritative snapshots.
- **Event Emission:** Emit normalized external events to Kafka.

## 6. Trust & Provenance
MUX tracks trust metadata (source reliability, transport integrity, completeness) for every artifact.

## 7. Operational Posture
- **Write-heavy** (ingestion).
- **Append-only** for external truth.
- **Connector-isolated** (failures contained).
- **Replayable and auditable**.
`;

export const NS_MUX_002_TAXONOMY = `
# Market Integration Layer (MUX) - Taxonomy

**Document Id:** NS-MUX-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical taxonomy for MUX artifacts. Prevents inconsistent interpretations of external reality.

## 2. Taxonomy Principles
- **External Truth First:** Represents what external systems assert.
- **Append-Only Artifacts:** Immutable snapshots.
- **Source-Specific, Canonical Shape:** Normalized artifact types.
- **Provenance Mandatory:** Origin and integrity recorded.

## 3. Primary Taxonomy Categories

### 4. Platform Event Artifacts
Discrete events (e.g., Ad click, Listing created, Order placed).
**Fields:** \`source_system\`, \`external_event_id\`, \`event_type\`, \`payload\`, \`integrity_hash\`.

### 5. Transaction & Settlement Artifacts
Financial movement confirmations (e.g., Payment captured, Payout initiated).
**Fields:** \`external_transaction_id\`, \`gross_amount\`, \`currency\`, \`settlement_status\`.

### 6. Statement & Snapshot Artifacts
Periodic authoritative snapshots (e.g., Bank statement, Invoice).
**Fields:** \`statement_id\`, \`period\`, \`snapshot_hash\`, \`completeness\`.

### 7. Fulfillment & Logistics Artifacts
Delivery status (e.g., Shipped, Delivered).
**Fields:** \`external_fulfillment_id\`, \`status\`, \`tracking_ref\`.

### 8. Platform State & Meta Artifacts
System reliability signals (e.g., API outage, Rate limit).
**Fields:** \`state_type\`, \`state_value\`, \`expected_resolution\`.

## 9. Trust & Integrity Metadata
Every artifact includes: \`ingestion_method\`, \`integrity_hash\`, \`completeness_flag\`, \`latency_ms\`.

## 10. Deduplication
Deduplicated by \`(source_system, external_id)\` and \`integrity_hash\`. Duplicates linked as references.
`;

export const NS_MUX_003_ARCHITECTURE = `
# Market Integration Layer (MUX) - Architecture

**Document Id:** NS-MUX-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the logical architecture of MUX. Focus on isolation, ingestion, and normalization.

## 2. Layers
1. **Connector Layer:** Connector Workers (polling/batch).
2. **Ingress & Capture Layer:** Ingress Gateway (webhooks), Capture Store (raw).
3. **Normalization & Integrity Layer:** Normalization Engine, Integrity Engine.
4. **Artifact Store & Replay Layer:** Canonical Artifact Store.
5. **Distribution & Query Layer:** Event Publisher, Query API.

## 3. Core Components
- **Connector Manager:** Manage credentials, scopes, isolation policies.
- **Connector Workers:** Fetch external data. Dedicated runtime per connector.
- **Ingress Gateway:** Terminate webhooks, validate signatures, persist raw capture.
- **Capture Store:** Persist immutable raw records (redacted).
- **Normalization Engine:** Map raw records to canonical artifacts.
- **Integrity & Dedupe Engine:** Validate hashes, deduplicate.
- **Artifact Store:** Persist canonical external truth.
- **Replay & Backfill Engine:** Re-emit artifacts, reprocess raw captures.

## 4. Data Flow
**Webhook:** Gateway → Capture Store → Normalize → Dedupe → Artifact Store → Kafka.
**Polling:** Worker → Capture Store → Normalize → Dedupe → Artifact Store → Kafka.

## 5. Persistence
- **Raw Capture Store:** Untrusted input.
- **Canonical Artifact Store:** Normalized external truth.

## 6. Security
- Connector credentials isolated.
- Webhook signatures validated.
- Payloads redacted.
- Least privilege workers.
`;

export const NS_MUX_004_LIFECYCLE = `
# Market Integration Layer (MUX) - Lifecycle

**Document Id:** NS-MUX-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the lifecycle of external truth flow through MUX.

## 2. Stages
1. **Connector Initialization:** Config, credentials, policies.
2. **Capture:** Ingress/Poll → Raw Capture Record.
3. **Validation:** Signature/Hash check. Reject/Quarantine if invalid.
4. **Normalization:** Convert to Canonical Artifact w/ UTC, ISO currencies.
5. **Deduplication:** Check exists. Link if duplicate.
6. **Persistence:** Append-only storage.
7. **Publication:** Emit to Kafka with provenance.
8. **Acknowledgement:** Downstream consumption.
9. **Backfill/Replay:** Reprocess or re-emit as needed.

## 3. Connector Degradation
Transitions: \`enabled\` → \`degraded\` → \`disabled\`.
Recovery auditable.

## 4. Failure Handling
- **Invalid Signature:** Reject & Quarantine.
- **Duplicate Flood:** Throttle & Dedupe.
- **Publish Fail:** Retry/Backoff.
`;

export const NS_MUX_005_DECISION = `
# Market Integration Layer (MUX) - Decision Framework

**Document Id:** NS-MUX-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines decision framework. MUX decides **admissibility and integrity**, not business meaning.

## 2. Principles
- **External Truth Supremacy.**
- **Fail Closed on Trust.**
- **Deterministic Outcomes.**

## 3. Decision Categories
- **Connector Admission:** Enable/Disable based on config/health.
- **Payload Trust:** Verify signatures/hashes. Accept/Reject.
- **Normalization:** Schema mapping success/block.
- **Deduplication:** New/Link.
- **Publication:** Publish/Block.
- **Replay:** Allow/Deny backfill.

## 4. Decision Artifacts
Persisted artifacts: \`decision_id\`, \`type\`, \`outcome\`, \`ruleset_version\`.

## 5. Cross-Engine
MUX decides admissibility. FLO decides financial meaning. DAT decides execution validity.
`;

export const NS_MUX_006_VERSION = `
# Market Integration Layer (MUX) - Versioning

**Document Id:** NS-MUX-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning semantics. Applies to rules and configs, **never** to captured artifacts.

## 2. Principles
- **Artifacts Immutable:** External truth never changes.
- **Rules Versioned:** Interpretation logic evolves.
- **Replay Context:** Must specify ruleset version.

## 3. Versioned Objects
- **Connector Config:** Credentials, rate limits.
- **Normalization Ruleset:** Schema maps.
- **Integrity Rules:** Hash strategies.
- **Dedupe Logic.**

## 4. Replay Semantics
- **Replay:** Re-emit existing artifacts.
- **Reprocess:** Apply new rules to raw captures to generate *new* artifacts (or projections). Original artifacts preserved.

## 5. Compatibility
External truth never silently reinterpreted. History remains explainable.
`;

export const NS_MUX_007_DATAMODEL = `
# Market Integration Layer (MUX) - Data Model

**Document Id:** NS-MUX-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Authoritative data model for MUX.

## 2. Entities
- **raw_capture_record:** capture_id, source, payload, hash, valid_sig.
- **canonical_artifact:** artifact_id, type, source, external_id, payload, completeness.
- **platform_event_artifact:** Type-specific fields.
- **transaction_artifact:** amount, currency, status.
- **statement_artifact:** statement_id, period, hash.
- **statement_line_item:** line_id, amount, memo.
- **fulfillment_artifact:** status, tracking.
- **artifact_dedupe_ref:** Link duplicates to canonical.
- **decision_artifact:** Decision audit trail.

## 3. Principles
- **Append-Only.**
- **Separation of Raw vs Canonical.**
- **Deterministic Dedupe.**
`;

export const NS_MUX_008_EEE = `
# Market Integration Layer (MUX) - End-to-End Example (EEE)

**Document Id:** NS-MUX-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario
Ad platform click → Charge → Marketplace Order → Settlement → Bank Statement.

## 2. Stages
1. **Capture:** Webhook click. Validated. Stored Raw.
2. **Normalize:** Platform Event created.
3. **Dedupe:** New artifact accepted.
4. **Transaction:** Charge event captured. Published to FLO/DAT.
5. **Order/Fulfillment:** Marketplace events captured using separate connector.
6. **Settlement:** Processor confirms payout. Published.
7. **Statement:** Bank statement ingested. Linked to known transactions via dedupe logic.
8. **Replay:** Re-emit history for FLO rebuild.

## 3. Outcome
External truth preserved immutably. Consistent downstream.
`;

export const NS_MUX_009_IMPL = `
# Market Integration Layer (MUX) - Implementation Blueprint

**Document Id:** NS-MUX-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Implementation blueprint for MVP.

## 2. Services
- **mux-ingress:** Webhook termination.
- **mux-connector-workers:** Polling/import.
- **mux-normalizer:** Apply rulesets.
- **mux-integrity-engine:** Verify signatures/hashes.
- **mux-dedupe-engine:** Link duplicates.
- **mux-artifact-store:** Postgres persistence.
- **mux-publisher:** Kafka emission.
- **mux-api:** Controls and queries.

## 3. Stack
Python 3.12+, FastAPI, Kafka, Postgres.

## 4. Rollout
1. Ingress + Raw Capture.
2. Normalization + Dedupe.
3. Canonical Store + Kafka.
4. Replay controls.
`;

export const NS_MUX_010_FE = `
# Market Integration Layer (MUX) - Frontend / Operator UI

**Document Id:** NS-MUX-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose of This Document
This document defines the frontend (FE) / operator UI specification for the Market Integration Layer (MUX).
MUX is the boundary system that captures and normalizes external truth.
The operator UI must prioritize:
- connector health and isolation
- ingestion visibility (webhooks/polling/batch)
- integrity failures and quarantine workflows
- replay and backfill controls
- traceability for downstream consumers

This is a canonical UI and interaction spec, independent of any UI framework.

## 2. FE Design Principles
- **Connector Isolation Is Visible:** Each connector has its own status and backlog.
- **Truth Is Immutable:** Operators may not edit raw capture or canonical artifacts.
- **Failures Are First-Class:** Signature failures, schema drift, and publish failures must be surfaced.
- **Replays Are Governed:** Replay/backfill actions require identity, reason, and governance ref where required.
- **Evidence & Provenance Everywhere:** Show source, ids, hashes, and capture lineage.

## 3. User Personas
- **Integration Operator:** manage connectors and ingestion.
- **Reliability / Ops:** monitor platform stability and outages.
- **Data Steward:** resolve mapping drift and quarantine review.
- **Auditor:** inspect provenance and control actions.

## 4. Canonical Screens (MVP)

### 4.1 Connector Dashboard
**Goal:** Monitor and manage connector fleet.
**Core Elements:**
- Connector cards list: \`connector_id\`, \`source_system\`, \`ingestion_method\`, \`state\`, \`last_success\`, \`error_rate\`, \`backlog\`, \`rate limit hits\`.
**Key Actions (Governed):**
- Enable / Disable connector
- Pause / Resume connector
- Trigger credential rotation workflow

### 4.2 Connector Detail
**Goal:** Deep visibility into a single connector.
**Sections:**
- Config summary (version, scopes, endpoints)
- Health and metrics
- Recent ingestion events
- Error timeline
- Rate limit statistics
**Actions:**
- Set rate limit overrides
- Enter Safe Mode for this connector

### 4.3 Ingestion Timeline
**Goal:** Inspect ingestion flow across connectors.
**Views:**
- Timeline of captures
- Filters: source, artifact_type, outcome, time range.
- Drilldown opens **Raw Capture Detail**.

### 4.4 Raw Capture Detail
**Goal:** Inspect a raw inbound payload (redacted) and its validation results.
**Sections:**
- \`capture_id\`, \`received_at\`, \`signature_valid\`, \`integrity_hash\`.
- Redaction markers.
- Linked canonical artifacts (0..n).
**Note:** Raw payload is viewable only with strict RBAC.

### 4.5 Canonical Artifact Explorer
**Goal:** Search and inspect canonical artifacts.
**Filters:** Type, source, external_id, occurred_at, integrity_hash.
**Results show:** \`artifact_id\`, \`type\`, \`source\`, \`external_id\`, \`trust metadata\`.

### 4.6 Artifact Detail (Provenance View)
**Goal:** Show full lineage for a canonical artifact.
**Sections:**
- Canonical artifact fields
- Typed payload view (normalized)
- Provenance chain: raw capture(s) → dedupe refs → decision artifacts.
- Downstream publication status (topics emitted).

### 4.7 Quarantine Inbox
**Goal:** Operational queue for suspicious or blocked inputs.
**Queues:** Invalid signature, schema unknown, integrity mismatch, publish failures.
**Actions:** Mark reviewed, reprocess with updated ruleset, suppress (governed).

### 4.8 Replay & Backfill Console (Governed)
**Goal:** Trigger and monitor replay/backfill jobs.
**Job Types:**
- Replay by: connector, artifact type, time window, external_id.
- Backfill by time window.
- Reprocess raw capture with new ruleset.
**Required fields:** requester identity, reason, governance reference.
**Shows:** job status, progress, emitted counts, failures.

### 4.9 Publication Status Panel
**Goal:** Ensure Kafka publishing is healthy.
**Shows:** per-topic publish rate, failure count, retry queue depth.

### 4.10 Platform State Monitor
**Goal:** View platform state artifacts (outages/policy changes).

## 5. Component Inventory (Suggested)
ConnectorCard, ConnectorStateBadge, ConnectorMetricsMiniPanel, IngestionTimelineTable, RawCaptureCard, CanonicalArtifactTable, ArtifactProvenanceGraphPanel, DecisionArtifactList, QuarantineQueue, ReplayJobWizard, ReplayJobTable, PublishHealthPanel, GovernedActionModal.

## 6. Data Requirements (API Needs)
### 6.1 Connector Ops
- List connectors + status
- Get connector detail + config versions
- Set connector state (governed)

### 6.2 Capture & Artifact Query
- List raw captures (filtered)
- Get raw capture detail
- List artifacts (filtered)
- Get artifact detail + lineage

### 6.3 Quarantine Ops
- List quarantine items
- Mark reviewed
- Reprocess item with ruleset

### 6.4 Replay/Backfill
- Create replay job (governed)
- List jobs
- Get job detail/status

### 6.5 Publication Health
- Topic health summary
- Failed publish attempt list

## 7. Non-Functional Requirements
- **Security:** Strict RBAC for raw payload visibility.
- **Auditability:** All operator actions logged with reason.
- **Performance:** Fast filtering over artifacts.
- **Safety:** Replay/backfill is governed and rate-limited.
`;

export const NS_MUX_011_APIMAP = `
# Market Integration Layer (MUX) - API Mapping

**Document Id:** NS-MUX-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose of This Document
This document defines the canonical API mapping for the Market Integration Layer (MUX).
The goal is to ensure:
- Read surfaces are complete and consistent
- Control actions are auditable and, when required, governed
- API semantics support replayability and immutability guarantees

## 2. API Design Principles
- **Immutable Truth:** APIs never “edit” capture or artifact records.
- **Governed Controls:** replay/backfill and connector toggles are guarded.
- **Traceable Responses:** trace IDs everywhere.
- **Idempotent Operations:** job creation and ingestion endpoints.
- **Least Privilege:** Raw payload access is tightly restricted.

## 3. API Surface Groups
- Connector Management
- Ingestion Visibility (captures)
- Canonical Artifact Query
- Provenance & Decision Inspection
- Quarantine Workflows
- Replay / Backfill / Reprocess Controls
- Publication Health
- Platform State Artifacts

## 4. FE Screen → API Mapping

### 4.1 Connector Dashboard
- \`GET /connectors\`

### 4.2 Connector Detail
- \`GET /connectors/{connector_id}\`
- \`GET /connectors/{connector_id}/events\`

### 4.3 Connector Controls (Governed)
- \`POST /connectors/{connector_id}/state\` (Body: target_state, reason, actor_id, gov_ref)
- \`POST /connectors/{connector_id}/rate-limit\`

### 4.4 Ingestion Timeline
- \`GET /captures\` (Query: source, connector, outcome, time)

### 4.5 Raw Capture Detail
- \`GET /captures/{capture_id}\`
- \`GET /captures/{capture_id}/payload\` (RBAC restricted)

### 4.6 Canonical Artifact Explorer
- \`GET /artifacts\` (Query: type, source, external_id, occurred_at, integrity_hash)

### 4.7 Artifact Detail (Provenance)
- \`GET /artifacts/{artifact_id}\`
- \`GET /artifacts/{artifact_id}/lineage\`
- \`GET /artifacts/{artifact_id}/typed\`

### 4.8 Quarantine Inbox
- \`GET /quarantine/items\`
- \`POST /quarantine/items/{item_id}/review\`

### 4.9 Reprocess Quarantine Item
- \`POST /quarantine/items/{item_id}/reprocess\` (Body: ruleset, reason, gov_ref)

### 4.10 Replay / Backfill Console (Governed)
- \`POST /jobs/replay\`
- \`POST /jobs/backfill\`
- \`POST /jobs/reprocess\`
- \`GET /jobs\`, \`GET /jobs/{job_id}\`

### 4.11 Publication Health
- \`GET /publishing/health\`
- \`GET /publishing/failures\`

### 4.12 Platform State Monitor
- \`GET /platform-state\`

## 5. Downstream Engine API Surfaces
### 5.1 FLO Consumption
- \`GET /statements\`, \`GET /statements/{id}/line-items\` (Optional, mostly Kafka)

### 5.2 DAT Consumption
- \`GET /fulfillment\`, \`GET /transactions\`

### 5.3 SIG Consumption
- \`GET /events\`

### 5.4 GGP Oversight
- \`GET /decisions\`, \`GET /connectors/{id}/audit-trail\`

## 6. Canonical Response Envelope
Success, data, error_code, message, correlation_id.

## 7. Error Handling
- Validation errors never mutate state.
- RBAC failures explicit.
- Partial writes forbidden.
`;

export const NS_MUX_012_STATE = `
# Market Integration Layer (MUX) - State Semantics

**Document Id:** NS-MUX-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines state model and semantics.
MUX state model must:
- preserve immutable historical artifacts
- make connector health and ingestion progress explicit
- ensure deterministic processing and replay
- avoid hidden mutation

## 2. State Categories
- **Authoritative Artifact State** (Immutable)
- **Connector Operational State** (Mutable, auditable)
- **Processing & Job State** (Mutable, auditable)

## 3. Authoritative Artifact State (Immutable)
### 3.1 Raw Capture State
Immutable. Classifications: \`accepted\`, \`rejected\`, \`quarantined\`.
Outcomes recorded once; reviews are appended.

### 3.2 Canonical Artifact State
Immutable. May acquire additional immutable references (raw captures, dedupe refs, decisions).

## 4. Connector Operational State Machine
States:
- \`disabled\`
- \`enabled\`
- \`paused\`
- \`degraded\`

**Transitions:**
- **disabled → enabled:** Operator/Governance action.
- **enabled → paused:** Operator action.
- **enabled → degraded:** Error spikes, auth failures, schema drift.
- **degraded → enabled:** Health restored.
- **any → disabled:** Operator action.

## 5. Processing Pipeline State
Modeled as stage outcomes (Decision Artifacts): capture, integrity, normalization, dedupe, persistence, publication.

## 6. Quarantine State Machine
States: \`open\`, \`reviewed\`, \`reprocessed\`, \`suppressed\`.

## 7. Replay / Backfill Job State Machine
States: \`queued\`, \`running\`, \`completed\`, \`failed\`, \`cancelled\`.
Jobs are idempotent.

## 8. Publication State Model
At-least-once. Publish attempts recorded: \`attempted\`, \`succeeded\`, \`failed\`.

## 9. Platform State Artifacts
Immutable representations of external state (outages, policies).

## 10. Consistency Model
- **Strong consistency** for storage of raw/canonical.
- **Eventual consistency** for indices/UI.
- **Publishing:** At-least-once.

## 11. Late-Arriving Data
Creates new capture records, links to existing artifacts via dedupe (if applicable). No mutation.

## 12. Replay & Recovery
- Rebuild indices.
- Re-emit artifacts.
- Reprocess raw captures.
Truth preserved.

## 13. State Change Events
Emits: \`mux.connector.state_changed\`, \`mux.quarantine.state_changed\`, \`mux.job.state_changed\`, \`mux.publishing.failure_detected\`.
`;

export const NS_MUX_013_RUNBOOK = `
# Market Integration Layer (MUX) - Runbook

**Document Id:** NS-MUX-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Production-grade operational procedures for MUX.
Prioritizes external truth preservation, isolation, and recoverability.

## 2. Operational Invariants
- Operators must never edit raw/canonical records.
- No direct deletion of dedupe/decision artifacts.
- Remediation via state transitions, replay/backfill, or reprocessing.

## 3. Startup Procedure (Cold Start)
### 3.1 Preflight Checks
Secrets, DB, Kafka, Schema Registry, Governance service reachable.
### 3.2 Startup Order
Persistence → Kafka → Artifact Store → Integrity/Normalizer/Dedupe → Publisher → Ingress → Connector Workers (disabled).

## 4. Normal Operations
### 4.1 Enabling a Connector
Validate credentials, review scopes, enable, observe metrics.
### 4.2 Monitoring Checklist
Ingestion success/error rates, backlog, publish failures, system latency.

## 5. Incident Response Playbooks
### 5.1 Signature Verification Failures
Pause connector, verify secrets, confirm source IPs, resume.
### 5.2 Schema Drift
Pause connector, update normalization ruleset, reprocess quarantined items, resume.
### 5.3 Duplicate Floods
Inspect external system, throttle connector, validate dedupe keys.
### 5.4 Kafka Publish Failures
Pause ingress, verify Kafka, resume publisher, trigger replay if needed.

## 6. Replay & Backfill Operations
### 6.1 Replay
Define scope (connector/time), submit job, monitor, verify downstream.
### 6.2 Backfill
Pause connector (optional), execute backfill job, validate counts, resume.
### 6.3 Reprocessing
Deploy new ruleset, select captures, trigger reprocess job, verify emission.

## 7. Security & Compliance
- Rotate secrets regularly.
- Restrict raw payload visibility.
- Log all operator actions.
- Enforce governance references.

## 8. Disaster Recovery
- **DB Failure:** Restore backup, verify counts, replay Kafka if needed.
- **Kafka Failure:** Restore, replay artifacts from store.

## 9. Audit Readiness
Trace artifact to raw capture, show integrity validation, connector state history, and replayability.

## 10. Change Management
Log connector changes, version rulesets, audit replay actions.
`;

export const NS_MUX_014_DATADEF = `
# Market Integration Layer (MUX) - Data Definitions

**Document Id:** NS-MUX-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical data definitions for MUX. Single authoritative reference for field-level semantics, invariants, and provenance.

## 2. Data Definition Principles
- **External Truth Preservation:** Represent what source asserts.
- **Append-Only:** No destructive updates.
- **Separation:** Raw ≠ Canonical.
- **Deterministic Dedupe:** Stable keys.
- **Audit Completeness:** Provenance mandatory.

## 3. Identifier Conventions
Overview: \`capture_id\`, \`artifact_id\`, \`external_id\`, \`connector_id\`, \`decision_id\`, \`job_id\`, \`correlation_id\`.
All timestamps UTC.

## 4. Canonical Entity Definitions

### 4.1 Raw Capture Record (raw_capture_record)
Immutable record of inbound payload.
**Fields:** \`capture_id\`, \`connector_id\`, \`source_system\`, \`ingestion_method\`, \`received_at\`, \`payload\` (redacted), \`signature_valid\`, \`integrity_hash\`, \`outcome\`.

### 4.2 Canonical Artifact (canonical_artifact)
Normalized external truth.
**Fields:** \`artifact_id\`, \`artifact_type\`, \`source_system\`, \`external_id\`, \`occurred_at\`, \`first_seen_at\`, \`integrity_hash\`, \`completeness\`, \`trust_metadata\`, \`capture_ids\`.

### 4.3 Platform Event Artifact (platform_event_artifact)
**Fields:** \`artifact_id\`, \`event_type\`, \`payload\`, \`correlation_hint\`.

### 4.4 Transaction Artifact (transaction_artifact)
**Fields:** \`artifact_id\`, \`transaction_type\` (charge/refund/payout/fee), \`gross_amount\`, \`currency\`, \`settlement_status\`, \`counterparty\`.

### 4.5 Statement Artifact (statement_artifact)
**Fields:** \`artifact_id\`, \`statement_id\`, \`period_start\`, \`period_end\`, \`snapshot_hash\`.

### 4.6 Statement Line Item (statement_line_item)
**Fields:** \`line_item_id\`, \`artifact_id\`, \`external_line_id\`, \`amount\`, \`currency\`, \`occurred_at\`, \`memo\`.

### 4.7 Fulfillment Artifact (fulfillment_artifact)
**Fields:** \`artifact_id\`, \`fulfillment_status\` (shipped/delivered), \`carrier\`, \`tracking_ref\`.

### 4.8 Platform State Artifact (platform_state_artifact)
**Fields:** \`artifact_id\`, \`state_type\`, \`state_value\`, \`detected_at\`, \`expected_resolution\`.

### 4.9 Deduplication Reference (artifact_dedupe_ref)
**Fields:** \`dedupe_id\`, \`artifact_id\`, \`source_system\`, \`external_id\`, \`integrity_hash\`, \`linked_at\`.

### 4.10 Decision Artifact (decision_artifact)
**Fields:** \`decision_id\`, \`decision_type\`, \`outcome\`, \`rationale\`, \`ruleset_name/version\`, \`evaluated_at\`.

## 5. Job Entities
### 5.1 Replay / Backfill Job (job_record)
**Fields:** \`job_id\`, \`job_type\`, \`scope\`, \`state\`, \`requested_by\`, \`reason\`, \`governance_ref\`.

## 6. Relationship Summary
- raw_capture_record → canonical_artifact (N:1)
- canonical_artifact → typed artifacts (1:1)
- canonical_artifact → dedupe refs (1:N)
- canonical_artifact → decision (1:N)

## 7. Cross-Engine Data Contracts (ID Only)
- **FLO:** artifact_id, statement_id
- **DAT:** artifact_id, transaction_type
- **SIG:** platform_event_artifact
- **GGP:** decision_artifact, job_record

## 8. Invariants
- No mutation.
- Dedupe is additive.
- All artifacts traceable to raw captures.
`;
