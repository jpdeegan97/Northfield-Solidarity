export const NS_INT_000_CHARTER = `
NS-INT-000 — CHARTER

1. Identity

Project / Engine Name: QuickScope

Nickname: Intervention

Domain: System-wide state, context, and real-time coherence layer for Northfield Solidarity (NS)

Owner Engine Class: Core platform engine (first-class NS engine)

Primary Consumers: GGP, Firmament, all NS engines, operator UIs, observability tooling

2. Mission

QuickScope exists to provide a single, authoritative, replayable, real-time state context for the entire NS ecosystem—so every engine and UI can reliably answer:

What is true now?

How did it become true?

Who/what changed it?

What is the current process state of long-running work?

QuickScope turns NS into a coherent, stateful “beast” with shared context, causal chains, and durable memory.

3. Problem Statement

As NS grows into many engines (SIG, DAT, PIE, SIM, IDN, FLO, MUX, CWP, Firmament, etc.), state tends to fragment:

Each engine invents its own lifecycle semantics

UIs reconcile “truth” inconsistently

Cross-engine workflows lose correlation and causal provenance

Debugging becomes archaeology

Governance evidence becomes scattered

Without a unified state fabric, NS cannot scale reliably, explainably, or in real time.

4. Scope

4.1 In Scope (What QuickScope is)

QuickScope is the State Fabric + Context Plane for NS. It provides:

Immutable Event Log (System Memory)

Append-only record of state changes across engines

Idempotent ingest and deduplication guarantees

Schema/version evolution controls

Materialized State Views (System Present)

Queryable “current state” projections derived from events

Domain-agnostic canonical projections (e.g., entity status, workflow status, request status)

Engine-specific projections when needed, using standard projector patterns

Time Travel, Replay, and Reconstruction (System Forensics)

Rebuild any view at time T

Replay event streams into sandboxes / simulators

Support audits, debugging, and retrospective governance

Real-Time Deltas and Subscriptions (System Nervous System)

Stream deltas to Firmament and operator surfaces

Topic routing by entity, engine, workflow, and correlation IDs

Backpressure-aware fanout and resumable subscriptions

Cross-Engine Correlation and Causality (System Threading)

Correlation IDs unify multi-engine work

Causation IDs link “what triggered what”

Traceable actor identity for human/agent/system actions

Edge State Caches (Local Coherence)

Lightweight local cache clients (sidecars/SDK) for engines and UIs

Low-latency reads and offline-tolerant behavior

Standard sync/resync and conflict-handling protocol

4.2 Out of Scope (What QuickScope is not)

Not a governance authority: It does not decide what is allowed (GGP does).

Not a monolithic OLTP replacement: It does not replace domain databases.

Not a data lake / analytics warehouse: It is for state coherence, not BI.

Not “just UI state”: Frontend local state remains a separate concern.

5. Principles

Event-first truth: state is derived from events, not edited in place.

Explainability by default: every state change has provenance.

Replayability: any state can be reconstructed.

Contractual interoperability: engines integrate via a canonical envelope.

Governance-gated transitions: protected state transitions consult GGP.

Edge-first performance: reads should be fast where work happens.

6. Success Criteria

QuickScope is successful when:

Firmament can render global NS state in real time (snapshot + deltas)

Any operator can answer “why is this stuck?” with causal chain + evidence

Cross-engine workflows have a single correlated thread end-to-end

Audits can reconstruct the exact state at any time

Engines integrate without inventing bespoke state conventions

7. Core Interfaces (Charter-Level)

7.1 Canonical Event Envelope (Minimum Contract)

All NS engines emit events using a canonical envelope:

event_id

event_type

engine_id

entity_id (or aggregate_id)

occurred_at (when it happened)

observed_at (when received)

correlation_id (thread)

causation_id (trigger)

actor (human/agent/system)

schema_version

policy_context_ref (governance context pointer)

payload (domain-specific)

7.2 Subscription Channels (High-Level)

Intervention exposes stream subscriptions keyed by:

engine

entity / aggregate

workflow instance

correlation_id

event_type

8. Governance Relationship to GGP

Intervention enforces structural validity (schema, versioning, idempotency).

GGP enforces semantic legitimacy (policy, approvals, permissioned transitions).

Intervention consults GGP for protected transitions (configurable event types).

9. Risks and Mitigations

Scope creep into “do everything data platform” → hard boundaries + projection patterns.

Event schema chaos → canonical envelope + schema registry + version gates.

Hot partitions / fanout overload → partitioning strategy + backpressure + edge caches.

Governance bottlenecks → asynchronous gating options with clear state semantics.

10. Roadmap (Charter-Level)

Phase 0 — Contract + Spine

Canonical envelope, schema/versioning rules

Ingest + immutable log

Basic projector framework

Phase 1 — Read Models + Firmament Integration

Snapshot API + delta streams

Firmament state channels

Edge cache client for UI

Phase 2 — Workflow State + Correlation

Workflow instance state model

Correlation/causation query and visualization hooks

Phase 3 — Advanced “quickscope” Extensions

Time-travel UX primitives

Replay-to-sandbox pipelines

Predictive state hints (optional)

11. Definition of Done (for Engine Acceptance)

Intervention is “live” when:

At least 3 NS engines publish canonical envelope events

Snapshot + delta stream works for Firmament

Correlation threading works end-to-end for a representative workflow

GGP gating for at least one protected transition class is operational
`;

export const NS_INT_001_OVERVIEW = `
NS-INT-001 — OVERVIEW

1. What Intervention Is

QuickScope (Intervention) is the system-wide State Fabric and Context Plane for Northfield Solidarity.

It provides:

A single shared truth for “what is happening” across all NS engines

A durable timeline of change (immutable memory)

Real-time deltas for UIs (especially Firmament)

Correlation + causality so multi-engine work becomes one traceable thread

Edge caches so every engine/UI can read state with low latency and high resilience

Intervention is designed to make NS feel like one coherent organism rather than a set of isolated services.

2. What Intervention Is Not

It is not the governance authority (GGP remains the semantic gatekeeper).

It is not a replacement for domain databases (engines still own their OLTP stores).

It is not a data lake or analytics warehouse.

It is not “frontend state management” (though it feeds UI state).

3. Why It Exists

As NS grows, the hard problem becomes coherence:

Engines evolve at different speeds and maintain different state semantics

Cross-engine workflows lose their narrative and become hard to debug

UIs either become stale or must stitch state from many sources

Governance evidence and decision provenance fragment

Intervention solves this by enforcing a shared, replayable, streaming state substrate.

4. Core Concepts

4.1 Event as the Primitive

Intervention treats events as the canonical source of change:

Engines emit events (using a canonical envelope)

Intervention stores events immutably

State is projected/materialized from events

4.2 Materialized Views

Intervention produces queryable “now” views:

Entity-level status (e.g., active, blocked, approved, failed)

Workflow instance state (step, gate, timer, retry, compensation)

Cross-engine threads keyed by correlation_id

4.3 Correlation + Causation

Intervention standardizes:

correlation_id: the thread for a request/process spanning engines

causation_id: what directly triggered this event

This allows Firmament (and operators) to see chains like:

request_created → policy_checked → approval_granted → execution_started → settlement_posted

4.4 Edge State

Intervention assumes most consumers need fast local reads:

An Intervention Edge (sidecar/SDK) subscribes to relevant deltas

Maintains a local cache / local read model

Handles resync and replay when a consumer reconnects

5. High-Level Architecture

5.1 Intervention Core (Cluster Service)

Ingest: accept canonical events from engines

Event Log: immutable store (append-only)

Projectors: build materialized state views

Query API: snapshot, time-travel, correlation queries

Stream Gateway: SSE/WebSocket + topic routing + resumable streams

5.2 Intervention Edge (Per Engine / UI)

Subscribes to topics/deltas

Maintains local state cache

Provides a local query interface to the host engine/UI

Publishes events upstream with idempotency guarantees

6. Relationship to GGP

Intervention and GGP form a paired nucleus:

GGP decides whether a state transition is legitimate (policy, approvals, permissions).

Intervention records, projects, and distributes state transitions; it enforces structural validity and consults GGP for protected transitions.

Protected transitions (configurable event classes) require a GGP gate before becoming authoritative.

7. Primary Use Cases

7.1 Firmament Real-Time Visualization

Firmament loads a global snapshot

Subscribes to delta streams keyed by entity/workflow/correlation

Renders the “living system” state on the 3D globe

7.2 Operator “What’s Happening?” Console

Live feed of state changes

Drill-down into causal chain + evidence pointers

Jump to policy decisions that gated a transition

7.3 Replay and Forensics

Reconstruct state at time T

Replay a workflow to reproduce a failure

Compare “expected vs actual” state progression

7.4 Cross-Engine Workflow State

Represent long-running processes as first-class state objects

Support retries, compensation, approvals, timers, and escalation

8. Implementation Orientation (Non-Prescriptive)

Intervention can be implemented with:

A message backbone (e.g., Kafka) for event transport

Immutable event storage (event store pattern)

Projection services for read models

A subscription gateway for UI/engine consumers

A lightweight Edge cache client library/sidecar

Specific technology choices are deferred to NS-INT-009 (IMPL).

9. Glossary

Event Log: immutable sequence of canonical events

Projection: deterministic function from events → read model

Read Model: query-optimized “current state” representation

Delta Stream: real-time feed of state changes

Edge Cache: local consumer cache built from deltas + snapshots

Correlation ID: end-to-end thread identifier

Causation ID: direct trigger identifier

10. Summary

Intervention (quickscope) is the shared state substrate that makes NS coherent:

One timeline, one present, many consumers

Built for real-time visualization, governance traceability, and operational clarity

Engine-friendly via canonical contracts and edge-local performance
`;

export const NS_INT_005_DECISION = `
NS-INT-005 — DECISION

1. Purpose

This document records the key architectural and product decisions for Intervention (quickscope), including rationale, alternatives considered, and the implications for NS.

2. Decision Log (Canonical)

INT-DEC-001 — Intervention is a First-Class NS Engine

Status: Approved

Decision: Create Intervention as its own engine rather than a “platform-only service.”

Rationale: Enables future creative extensions ("quickscope" capabilities), a clear ownership boundary, and first-class documentation/lifecycle.

Alternatives Considered:

Sidecar only to GGP (non-engine)

Embed state functionality into GGP

Implications:

Intervention gets its own roadmap, API surface, and governance integration points.

Must avoid scope creep into generic data platform.

INT-DEC-002 — Architecture Option B: Core Cluster + Edge Caches Everywhere

Status: Approved

Decision: Implement Intervention as a cluster Core service with local Edge caches/sidecars/SDKs for each engine/UI.

Rationale:

Low-latency reads where work happens

Resilience during partial outages

Scales subscription fanout and reduces Core query load

Alternatives Considered:

Option A: only a sidecar colocated with GGP

Implications:

Requires sync protocol (snapshot + cursor + replay)

Requires edge health/lag observability

INT-DEC-003 — Event-First Truth (Event Sourcing Pattern)

Status: Approved

Decision: Events are immutable; state is derived via projections.

Rationale:

Replayability and auditability

Deterministic reconstruction

Clean time-travel and forensics

Alternatives Considered:

Direct state mutation with periodic audit logs

Implications:

Requires projector runtime and schema evolution discipline

Requires idempotency and ordered-per-key semantics

INT-DEC-004 — Canonical Event Envelope Required Across NS

Status: Approved

Decision: All producers must emit events using a canonical envelope with correlation/causation.

Rationale:

Interoperability

End-to-end threading across engines

Consistent provenance and identity

Alternatives Considered:

Allow each engine to define its own event contract

Implications:

Requires schema registry / contract enforcement

Requires adoption work per engine

INT-DEC-005 — Ordered-Per-Key, Not Global Total Order

Status: Approved

Decision: Guarantee ordering for a key (entity/workflow/correlation), not across the whole system.

Rationale:

Scales horizontally

Matches practical distributed constraints

Alternatives Considered:

Global total order (high cost, low scale)

Implications:

Consumers must not assume global ordering

Firmament uses correlation/thread and key-based ordering

INT-DEC-006 — Delivery Semantics: At-Least-Once + Idempotency

Status: Approved

Decision: Default to at-least-once delivery; achieve effective exactly-once via idempotency + version checks.

Rationale:

Practical operational reliability

Simplifies distributed streaming

Alternatives Considered:

Exactly-once end-to-end guarantees

Implications:

Every consumer and projector must handle duplicates

Event IDs and versioning are mandatory

INT-DEC-007 — GGP Remains the Semantic Gatekeeper

Status: Approved

Decision: Intervention does not decide if transitions are “allowed.” Protected transitions consult GGP.

Rationale:

Separation of concerns

Keeps governance centralized in GGP

Alternatives Considered:

Let Intervention embed policy evaluation

Implications:

Requires GGP gate adapter

Requires policy_context_ref and gating outcomes in state

INT-DEC-008 — Protected Transition Classes

Status: Approved

Decision: Maintain a configurable list of event types/classes that require GGP gating.

Rationale:

Flexibility as NS evolves

Prevents over-gating everything

Alternatives Considered:

Gate all events

Gate none

Implications:

Requires configuration management and audit trail for gate rules

INT-DEC-009 — Projections Are Versioned Products

Status: Approved

Decision: Projections/read models are explicit artifacts with versions, deployment states, and rebuild strategies.

Rationale:

Safe evolution

Supports Firmament and operator UX stability

Alternatives Considered:

Ad-hoc projector code without lifecycle

Implications:

Requires projection registry and management tools

INT-DEC-010 — Firmament Is a First-Class Consumer

Status: Approved

Decision: Optimize Intervention for Firmament’s needs: snapshot + delta streams + visualization-ready graph projections.

Rationale:

Firmament is a flagship surface for “living system” state

Alternatives Considered:

Treat Firmament as a generic UI consumer

Implications:

Requires Firmament-specific read models (graph view)

Requires high fanout streaming posture

3. Deferred Decisions (Not Yet Locked)

INT-DEC-D-001 — Technology Choices for Event Log and Read Stores

Status: Deferred

Open Options: Postgres, Kafka + log store, specialized event store, hybrid

Decision Owner: NS platform architecture

Target Doc: NS-INT-009 (IMPL)

INT-DEC-D-002 — Sync Mode for Protected Transitions

Status: Deferred

Open Options:

synchronous gating (low latency, potential bottleneck)

asynchronous gating (quarantine then authorize)

Target Doc: NS-INT-012 (STATE) / NS-INT-009 (IMPL)

INT-DEC-D-003 — Edge Form Factor

Status: Deferred

Open Options:

sidecar container

embedded SDK

both, depending on runtime

Target Doc: NS-INT-009 (IMPL)

4. Summary

Intervention decisions establish it as:

a first-class NS engine

built on event-first truth

implemented as Core cluster + Edge caches

governed by GGP for protected transitions

optimized for real-time visualization and explainability
`;
