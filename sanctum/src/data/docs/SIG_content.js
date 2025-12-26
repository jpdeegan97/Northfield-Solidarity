
export const NS_SIG_001_OVERVIEW = `
# Signal Aggregation Engine (SIG) - Overview

**System Name:** Signal Aggregation Engine (SIG)  
**Document Title:** SIG Overview  
**Document Id:** NS-SIG-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Signal Aggregation Engine (SIG)** is responsible for ingesting, normalizing, scoring, and aggregating raw signals from across the internal and external landscape.

SIG answers a single foundational question:
> What signals exist right now, how reliable are they, and how do they relate to one another?

SIG does not decide strategy, generate insights, execute actions, or govern outcomes. It exists to provide clean, trust-scored signal primitives that higher-order engines can reason over.

## 2. Role Within Northfield Solidarity
SIG sits at the base of the intelligence stack, upstream of synthesis engines.

**Primary upstream sources:**
- **MUX:** external platform events and state artifacts
- **Internal telemetry:** execution traces, performance metrics, system events
- **Third-party data feeds:** market, pricing, sentiment, macro indicators

**Primary downstream consumers:**
- **PIE:** signal synthesis into product insights
- **DRE:** long-horizon research and thematic discovery
- **SIM:** scenario inputs and parameterization
- **GGP:** audit, provenance, and governance review

**SIG is the only engine permitted to define canonical signal semantics.**

## 3. What SIG Produces
SIG produces **Signals**, which are atomic, time-bound observations with explicit provenance and trust metadata.
Each signal includes:
- A canonical signal type
- Normalized value(s)
- Source attribution
- Trust and confidence scores
- Temporal validity and decay semantics

Signals are designed to be composable, comparable, replayable, and explainable.

## 4. What SIG Does Not Do
- Interpret signals into opportunities (PIE)
- Simulate outcomes or counterfactuals (SIM)
- Execute or verify actions (DAT)
- Manage identities or permissions (IDN / PECA)
- Approve or govern decisions (GGP)

**SIG aggregates truth; others interpret it.**

## 5. Core Capabilities
- **Signal Ingestion:** Consume raw events and metrics.
- **Normalization:** Convert heterogeneous inputs into canonical signal types.
- **Trust Scoring:** Assign reliability and confidence scores.
- **Aggregation & Correlation:** Group related signals.
- **Decay & Relevance Management:** Reduce influence of stale signals.

## 6. Signal Characteristics
- **Atomic:** smallest meaningful observation
- **Time-indexed:** bound to a moment or interval
- **Source-attributed:** always traceable
- **Non-authoritative:** inputs to decision-making

## 7. Interaction With Other Engines
- **MUX:** Supplies raw external events.
- **PIE:** Consumes trust-scored signals.
- **DRE:** Explores long-horizon signal patterns.
- **SIM:** Uses signals as scenario inputs.
- **DAT:** Emits execution telemetry.
- **GGP:** Audits signal lineage.
`;

export const NS_SIG_002_TAXONOMY = `
# Signal Aggregation Engine (SIG) - Taxonomy

**Document Id:** NS-SIG-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical signal taxonomy for SIG. Establishes what constitutes a signal and how they are categorized.

## 2. Taxonomy Principles
- **Atomicity:** Smallest meaningful observation.
- **Non-Interpretive:** Describes observations, not conclusions.
- **Source-Explicit:** Must identify origin.
- **Trust-Scored:** Explicit confidence/reliability metadata.
- **Time-Bound:** Relevance decays.

## 3. Primary Signal Classes
### 4. Market Signals
Observations about market conditions, pricing, and competition.
*Examples:* \`competitor_price_observed\`, \`listing_rank_position\`.

### 5. Demand Signals
Observations indicating customer interest or intent.
*Examples:* \`search_volume\`, \`click_through_rate\`, \`conversion_event\`.

### 6. Supply Signals
Observations about availability, inventory, or capacity.
*Examples:* \`inventory_level\`, \`stockout_event\`.

### 7. Execution Signals
Observations about internal or external execution outcomes.
*Examples:* \`ad_campaign_started\`, \`fulfillment_completed\`, \`latency_spike\`.

### 8. Financial Signals
Observations related to monetary movement.
*Examples:* \`revenue_realized\`, \`refund_issued\`.
*Note:* Non-authoritative; reconciled by FLO.

### 9. Meta & System Signals
Signals about system behavior or data quality.
*Examples:* \`source_reliability_score\`, \`schema_drift_detected\`.

## 10. Cross-Cutting Dimensions
All signals include: \`signal_id\`, \`signal_type\`, \`class\`, \`source\`, \`observed_at\`, \`trust_score\`, \`confidence_score\`.

## 11. Aggregation Primitives
Time-window, source-weighted, confidence-weighted, correlation grouping.
`;

export const NS_SIG_003_ARCHITECTURE = `
# Signal Aggregation Engine (SIG) - Architecture

**Document Id:** NS-SIG-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the logical architecture of SIG.

## 2. Architectural Overview
Layers: Ingress, Normalization, Scoring, Signal Store, Aggregation/Correlation, Distribution.

## 3. Core Components
- **Input Adapters (Ingress):** Kafka consumers (MUX, Telemetry) + opt. HTTP batch.
- **Raw Signal Capture Store:** Immutable raw inputs for replay.
- **Normalization Engine:** Map raw inputs to canonical types.
- **Trust & Confidence Scoring Engine:** Assign trust (integrity) and confidence (quality) scores.
- **Decay Engine:** Assign decay models (e.g., half-life).
- **Dedupe & Consistency Engine:** Prevent double-counting.
- **Canonical Signal Store:** Authoritative append-only persistence (Postgres).
- **Aggregation Engine:** Compute derived views (rebuildable).
- **Correlation Engine:** Group signals by hints (product, market).
- **Publisher:** Emit to Kafka.
- **Query API:** Read surfaces.

## 4. Data Flows
**Note:** External flow (from MUX), Internal Telemetry, Vendor Feeds.

## 5. Persistence
- **Raw Capture:** Optional, immutable.
- **Canonical Signal Facts:** Authoritative.
- **Derived Aggregates:** Rebuildable.

## 6. Observability
Ingestion rates, normalization errors, scoring anomalies.
`;

export const NS_SIG_004_LIFECYCLE = `
# Signal Aggregation Engine (SIG) - Lifecycle

**Document Id:** NS-SIG-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the end-to-end signal lifecycle.

## 2. Stages
1. **Source Admission:** Schema/config definition.
2. **Ingestion:** Kafka/Pull → Raw Capture.
3. **Preservation:** Store raw capture (optional).
4. **Normalization:** Map to canonical type (UTC, normalized units).
5. **Scoring:** Assign trust/confidence.
6. **Decay Assignment:** Set half-life/TTL.
7. **Deduplication:** Check stable keys.
8. **Persistence:** Append-only stores.
9. **Publication:** Emit to internal fabric.
10. **Aggregation/Correlation:** Update derived views.
11. **Replay:** Deterministic re-emission.

## 3. Failure Handling
- **Normalization Fail:** Quarantine.
- **Scoring Fail:** Default lowest trust + flag.
`;

export const NS_SIG_005_DECISION = `
# Signal Aggregation Engine (SIG) - Decision Framework

**Document Id:** NS-SIG-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines decision framework. SIG decisions are **local, deterministic, and non-authoritative**.

## 2. Principles
Determinism, Explainability, Locality, Append-Only.

## 3. Decision Classes
- **Source Admission:** Admit/Quarantine/Reject.
- **Normalization:** Map/Blocked.
- **Scoring:** Assign usage trust/confidence.
- **Deduplication:** Accept New/Link Existing.
- **Operational:** Pause/Resume/Replay.

## 4. Artifacts
Each decision produces an immutable artifact with \`decision_id\`, \`rationale\`, \`ruleset_version\`.

## 5. Boundaries
SIG decides signal processing. Downstream engines decide meaning/action.
`;

export const NS_SIG_006_VERSION = `
# Signal Aggregation Engine (SIG) - Versioning

**Document Id:** NS-SIG-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning semantics.

## 2. Principles
- **Signals Immutable:** Once written, facts do not change.
- **Rules Versioned:** Interpretation logic (normalization, scoring) evolves.
- **Replay Context:** Must specify ruleset.

## 3. Versioned Objects
- **Normalization Rulesets:** Schema maps.
- **Scoring Policies:** Weighting logic.
- **Dedupe Logic:** Key definitions.
- **Decay Models.**

## 4. Replay Semantics
- **Replay:** Re-emit existing signals.
- **Reprocess:** Apply new rules to raw captures → new signals.
`;

export const NS_SIG_007_DATAMODEL = `
# Signal Aggregation Engine (SIG) - Data Model

**Document Id:** NS-SIG-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Authoritative data model.

## 2. Entities
- **signal (Canonical):** ID, type, class, source, values, trust/confidence, decay.
- **signal_raw_capture:** Raw payload, hash.
- **signal_provenance:** Links to MUX/Telemetry sources.
- **signal_dedupe_ref:** Links duplicates.
- **signal_decision:** Usage decisions.
- **signal_aggregate:** Derived rollups.
- **signal_correlation_group:** Signal groupings.

## 3. Principles
- **Immutable Signals.**
- **Derived ≠ Authoritative.**
- **Explicit Provenance.**
`;

export const NS_SIG_008_EEE = `
# Signal Aggregation Engine (SIG) - End-to-End Example

**Document Id:** NS-SIG-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario
Product launch: Listing created → Ads run → Orders placed → Revenue realized.

## 2. Flow
1. **Ingest:** MUX emits listing_created. Raw capture stored.
2. **Normalize:** Mapped to \`listing_created\` (Market).
3. **Score:** Trust 0.95.
4. **Decay:** Exponential, 14d half-life.
5. **Dedupe:** New accepted.
6. **Publish:** To Kafka.
7. **Demand:** Ad clicks ingested & aggregated.
8. **Execution:** Campaign start telemetry ingested.
9. **Financial:** Settlement ingested (non-authoritative).
10. **Correlation:** Signals grouped by product_id.
11. **Replay:** Downstream model update triggers deterministic replay.
`;

export const NS_SIG_009_IMPL = `
# Signal Aggregation Engine (SIG) - Implementation Blueprint

**Document Id:** NS-SIG-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
MVP Implementation plan.

## 2. Services
- **sig-ingress:** Kafka consumer.
- **sig-normalizer:** Rules engine.
- **sig-scoring-engine:** Trust/Confidence assignment.
- **sig-decay-engine:** Decay params.
- **sig-dedupe-engine:** Linkage.
- **sig-signal-store:** Postgres.
- **sig-aggregate-engine:** Windowed rollups.
- **sig-publisher:** Kafka emitter.
- **sig-api:** Query & Control.

## 3. Stack
Python 3.12+, FastAPI, Kafka, Postgres, Redis (optional).

## 4. Rollout
1. Ingest + Store.
2. Normalize + Score.
3. Publish.
4. Aggregates.
5. Replay.
`;

export const NS_SIG_010_FE = `
# Signal Aggregation Engine (SIG) - Frontend / Operator UI

**Document Id:** NS-SIG-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operator UI for SIG. Observational first, control second.

## 2. Principles
- **Signals Immutable.**
- **Trust Is Visible.**
- **Derived ≠ Authoritative.**

## 3. Screens
- **Signal Health Dashboard:** Ingestion rates, errors.
- **Source Detail:** Reliability profile, drift events.
- **Signal Explorer:** Filter by type, source, trust.
- **Signal Detail:** Explainability view (payload, scores, provenance).
- **Aggregate Explorer:** View rollups.
- **Replay Console:** Trigger governed jobs.

## 4. Components
SignalHealthPanel, SourceReliabilityCard, SignalTable, SignalDetailPanel.
`;

export const NS_SIG_011_APIMAP = `
# Signal Aggregation Engine (SIG) - API Mapping

**Document Id:** NS-SIG-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical API map.

## 2. Surface Groups
- **Query:** \`GET /signals\`, \`GET /aggregates\`.
- **Source:** \`GET /sources\`, \`POST /sources/{id}/state\`.
- **Detail:** \`GET /signals/{id}\`, \`GET /signals/{id}/provenance\`.
- **Jobs:** \`POST /jobs/replay\`, \`POST /jobs/rebuild\`.
- **Anomalies:** \`GET /anomalies\`.

## 3. Downstream
- PIE (signals, aggregates).
- SIM (aggregates).
- GGP (decisions).
`;

export const NS_SIG_012_STATE = `
# Signal Aggregation Engine (SIG) - State Semantics

**Document Id:** NS-SIG-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
State model.

## 2. Categories
- **Authoritative Signal State:** Immutable. Logical attributes (fresh/stale) derived.
- **Source Operational State:** Disabled, Enabled, Paused, Degraded.
- **Processing/Job State:** Queued, Running, Completed, Failed.

## 3. Quarantine
Open, Reviewed, Reprocessed, Suppressed.

## 4. Derived State
Aggregates and Correlations are rebuildable.
`;

export const NS_SIG_013_RUNBOOK = `
# Signal Aggregation Engine (SIG) - Runbook

**Document Id:** NS-SIG-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures.

## 2. Procedures
- **Start:** Postgres → Kafka → Services → Ingress (disabled).
- **Enable Source:** Verify schema, enable, monitor.
- **Schema Drift:** Pause, update rules, reprocess.
- **Abnormal Scoring:** Validate source, adjust weights.
- **Replay:** Define scope, submit job.

## 3. Invariants
Never edit signal records. Remediation via replay/reprocess/state change.
`;

export const NS_SIG_014_DATADEF = `
# Signal Aggregation Engine (SIG) - Data Definitions

**Document Id:** NS-SIG-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical field-level definitions.

## 2. Signal Contract
**signal:** \`id\`, \`type\`, \`class\`, \`source\`, \`observed_at\`, \`value\`, \`trust_score\`, \`confidence_score\`, \`decay\`, \`provenance\`.

## 3. Entities
- **raw_capture:** \`capture_id\`, \`raw_ref\`, \`payload_hash\`.
- **provenance:** \`source_type\`, \`source_ref\`.
- **decision:** \`decision_id\`, \`type\`, \`outcome\`, \`rationale\`.
- **aggregate:** \`aggregate_id\`, \`type\`, \`window\`, \`value\`.

## 4. Invariants
- Signal IDs immutable.
- Scores explicit.
- Timestamps UTC.
`;
