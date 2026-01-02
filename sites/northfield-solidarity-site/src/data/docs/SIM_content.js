
export const NS_SIM_001_OVERVIEW = `
# Simulation & Scenario Engine (SIM) - Overview

**System Name:** Simulation & Scenario Engine (SIM)  
**Document Title:** SIM Overview  
**Document Id:** NS-SIM-001  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
The **Simulation & Scenario Engine (SIM)** is responsible for executing counterfactual reasoning, forward simulations, and scenario stress testing across the Northfield Solidarity ecosystem.

SIM exists to answer a core class of questions:
> If we take a particular action (or take no action), what are the plausible outcomes across time, uncertainty, and constraints?

SIM does not decide what should be done and does not execute actions. Its sole responsibility is to model possible futures, make assumptions explicit, and quantify uncertainty so that humans and downstream engines can reason safely.

## 2. Role Within Northfield Solidarity
SIM sits between insight generation and execution.

**Consumes:**
- **PIE:** insights (candidate opportunities)
- **SIG:** signals and aggregates (observed reality)
- **FLO:** financial constraints and capital state
- **DAT:** execution parameters (channels, timing, costs)

**Produces:** Scenario Artifacts consumed by:
- **GGP:** governance review and approval gating
- **DAT:** execution planning refinement
- **Humans:** strategic and risk-aware decision-making

**SIM converts opportunity into understood risk.**

## 3. What SIM Produces
SIM produces **Scenario Artifacts**, which are structured, versioned representations of modeled futures.
Each scenario includes:
- A clearly defined baseline
- One or more variants (actions or shocks)
- Modeled outcomes over time
- Explicit uncertainty bands
- Sensitivity analysis highlighting key drivers
- Identified failure modes and breakpoints

SIM outputs are **Non-authoritative**, **Explainable**, and **Deterministic**.

## 4. What SIM Does Not Do
- Approve actions or override governance (GGP)
- Execute trades, listings, or campaigns (DAT)
- Allocate or move capital (FLO)
- Generate insights from raw data (PIE, SIG)
- Manage identities or permissions (IDN, PECA)

**SIM models possibilities — it does not choose or act.**

## 5. Core Capabilities
- **Counterfactual Simulation:** Evaluate alternative decisions against a shared baseline.
- **Scenario Construction:** Combine signals, insights, and constraints into coherent futures.
- **Time-Series Projection:** Project outcomes across configurable time horizons.
- **Uncertainty & Sensitivity Analysis:** Quantify variance and identify critical assumptions.
- **Constraint Enforcement:** Respect financial, operational, temporal, and governance limits.
- **Explainable Results:** Every output includes assumptions, drivers, and confidence bounds.

## 6. Scenario Classes
- **Baseline:** continuation of observed reality
- **Optimistic / Pessimistic:** bounded outcome extremes
- **Action-Driven:** explicit execution proposals
- **Stress Test:** adverse shocks and constraint pressure
- **Comparative:** side-by-side evaluation of alternatives

## 7. Interaction With Other Engines
- **SIG:** Supplies observed signals.
- **PIE:** Supplies insight candidates.
- **DAT:** Supplies execution parameters.
- **FLO:** Supplies financial constraints.
- **GGP:** Governs scenario usage.
- **PTE:** Compares simulated vs reality.

## 8. Operational Posture
- Compute-heavy, write-light.
- Batch-oriented with on-demand runs.
- Replayable and deterministic.
`;

export const NS_SIM_002_TAXONOMY = `
# Simulation & Scenario Engine (SIM) - Taxonomy

**Document Id:** NS-SIM-002  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the canonical taxonomy for SIM. Establishes shared vocabulary for simulation artifacts, structure, assumptions, and constraints.

## 2. Taxonomy Design Principles
- **Explicit Assumptions:** Nothing is implicit.
- **Separation of Reality vs Hypothesis:** Observed ≠ Simulated.
- **Non-Authoritative Outputs:** Simulations never assert truth.
- **Deterministic Structure:** Same inputs → same outputs.

## 3. Core Artifact Classes
- **Scenario:** Named, versioned container representing a modeled future.
- **Assumption Set:** Explicit hypotheses (e.g., demand growth +12%).
- **Constraint Set:** Hard boundaries (e.g., max burn rate).
- **Variable:** Quantities changing over time (state, control, exogenous).
- **Outcome:** Modeled results (financial, operational, risk metrics).
- **Sensitivity Artifact:** Drivers of outcome variance.

## 4. Scenario Types
Baseline, Optimistic, Pessimistic, Action-Driven, Stress Test, Comparative.

## 5. Uncertainty Model
Captures variance via probability distributions, confidence intervals, and stochastic perturbations.

## 6. Sensitivity Artifact
Identifies which assumptions or variables most influence outcomes. Includes sensitivity score and directionality.
`;

export const NS_SIM_003_ARCHITECTURE = `
# Simulation & Scenario Engine (SIM) - Architecture

**Document Id:** NS-SIM-003  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the logical architecture of SIM.

## 2. Architectural Principles
- **Isolation from Execution:** No side effects.
- **Determinism:** Identical inputs + versions → identical outputs.
- **Replayability:** Audit safe.
- **Explainability:** Traceable results.

## 3. Layers
1. **Input Assembly:** Collect governed inputs, freeze snapshot.
2. **Scenario Construction:** Build baseline + variants + constraints.
3. **Simulation Execution:** Advance time, update variables (deterministic stochastic).
4. **Constraint & Risk Evaluation:** Enforce limits, detect breakpoints.
5. **Result Packaging:** Persist immutable artifacts.
6. **Distribution & Query:** Read APIs, summaries.

## 4. Components
- **Input Assembler:** Resolves refs, freezes snapshot.
- **Scenario Builder:** Constructs definition.
- **Executor:** Runs simulation loop.
- **Constraint Engine:** Checks bounds.
- **Uncertainty/Sensitivity Engines:** Compute risk metrics.
- **Result Store:** Postgres (authoritative).

## 5. Replay & Determinism
Full replay supported via frozen snapshots and recorded RNG seeds.
`;

export const NS_SIM_004_LIFECYCLE = `
# Simulation & Scenario Engine (SIM) - Lifecycle

**Document Id:** NS-SIM-004  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the end-to-end simulation lifecycle.

## 2. Stages
1. **Initiation:** Request from Human/GGP/Engine.
2. **Snapshot Assembly:** Freeze SIG/PIE/DAT/FLO inputs.
3. **Construction:** Build baseline and variants.
4. **Execution:** Run simulation (time-series generation).
5. **Evaluation:** Check constraints and risks.
6. **Packaging:** bundle results (outcomes, uncertainty, sensitivity).
7. **Governance:** Review/Consume (GGP/DAT).
8. **Replay/Compare:** Audit or re-run with new models.

## 3. Failure Handling
 Failures marking runs as failed; partial outputs preserved.
`;

export const NS_SIM_005_DECISION = `
# Simulation & Scenario Engine (SIM) - Decision Framework

**Document Id:** NS-SIM-005  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines the SIM decision framework. Decisions are **bounded, non-authoritative, and deterministic**.

## 2. Principles
Bounded Authority, Determinism, Explainability.

## 3. Decision Classes
- **Scenario Admission:** Valid request?
- **Input Resolution:** All refs available?
- **Model Selection:** Which logic applies?
- **Constraint Enforcement:** Continue or Halt path?
- **Execution Control:** Pause/Abort?
- **Outcome Classification:** Success/Failure/Risk Tier.

## 4. Artifacts
Immutable decision artifacts with \`decision_id\`, \`rationale\`, \`ruleset_version\`.
`;

export const NS_SIM_006_VERSION = `
# Simulation & Scenario Engine (SIM) - Versioning

**Document Id:** NS-SIM-006  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Defines versioning model.

## 2. Principles
- **Results Immutable:** History never changes.
- **Logic Evolves:** Models/Assumptions are versioned.
- **Explicit Binding:** Runs record specific versions used.

## 3. Versioned Components
Scenario definitions, assumption sets, constraint sets, models, execution engine, RNG seeds.

## 4. Replay Semantics
- **Deterministic Replay:** Same inputs + versions + seed = Same output.
- **Comparative Re-Execution:** Same inputs + new versions = Variance analysis.
`;

export const NS_SIM_007_DATAMODEL = `
# Simulation & Scenario Engine (SIM) - Data Model

**Document Id:** NS-SIM-007  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Authoritative data model.

## 2. Entities
- **scenario:** ID, type, baseline_ref, version.
- **assumption_set:** Explicit hypotheses.
- **constraint_set:** Hard limits.
- **scenario_input_snapshot:** Frozen refs to SIG/PIE/DAT/FLO.
- **scenario_run:** Execution instance, status, seed.
- **outcome_series:** Time-series metric values.
- **uncertainty_artifact:** Confidence intervals.
- **sensitivity_artifact:** Driver rankings.
- **sim_decision:** Decision audit trail.

## 3. Principles
- **Runs Immutable.**
- **Snapshots Frozen.**
- **ID-First Contracts.**
`;

export const NS_SIM_008_EEE = `
# Simulation & Scenario Engine (SIM) - End-to-End Example

**Document Id:** NS-SIM-008  
**Version:** 0.1  
**Status:** Draft

## 1. Scenario
**Listing Product X:** PIE suggests opportunity. SIM models risk.

## 2. Flow
1. **Initiation:** Comparative scenario requested.
2. **Snapshot:** Frozen inputs from SIG (market), DAT (plan), FLO (cash).
3. **Construction:** Baseline (no act), Variant A (list), Variant B (list + shock).
4. **Execution:** Deterministic run with constraints (burn limit).
5. **Evaluation:** Variant B breaches cash reserve at day 38.
6. **Packaging:** Outcomes, CI bands, Sensitivity (driver: conversion rate).
7. **Governance:** GGP reviews risk. Variant A acceptable, B fails.
8. **Replay:** Auditor verifies Variant A results match.
`;

export const NS_SIM_009_IMPL = `
# Simulation & Scenario Engine (SIM) - Implementation Blueprint

**Document Id:** NS-SIM-009  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
MVP Implementation plan.

## 2. Services
- **sim-api:** Read + Control.
- **sim-snapshotter:** Freeze inputs.
- **sim-scenario-builder:** Construct definition.
- **sim-executor:** Deterministic runner.
- **sim-constraint-engine:** Enforce limits.
- **sim-uncertainty/sensitivity-engine:** Analysis.
- **sim-result-store:** Postgres.
- **sim-job-runner:** Async execution.

## 3. Stack
Python 3.12+, FastAPI, Postgres, Async Workers.

## 4. Rollout
1. Scenario Def + Persistence.
2. Snapshot + Executor v1.
3. Constraints.
4. Uncertainty/Sensitivity.
5. Comparison API.
`;

export const NS_SIM_010_FE = `
# Simulation & Scenario Engine (SIM) - Frontend / Operator UI

**Document Id:** NS-SIM-010  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operator UI. Analysis-first, control second.

## 2. Principles
- **No Hidden Assumptions.**
- **Immutability Respect.**
- **Comparison-Centric.**

## 3. Screens
- **Scenario Dashboard:** Inventory, recent runs.
- **Scenario Builder:** Guided setup (baseline + variants).
- **Run Monitor:** Job status.
- **Run Detail:** Full explainability (inputs, models, outcomes).
- **Comparison View:** Overlay time-series, risk deltas.
- **Sensitivity View:** Ranked drivers.
- **Replay Console:** Governed jobs.

## 4. Components
ScenarioTable, ScenarioBuilderWizard, OutcomeChartPanel, CompareOverlayPanel, SensitivityRankTable.
`;

export const NS_SIM_011_APIMAP = `
# Simulation & Scenario Engine (SIM) - API Mapping

**Document Id:** NS-SIM-011  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical API map.

## 2. Surface Groups
- **Scenario:** \`GET /scenarios\`, \`POST /scenarios\`.
- **Run:** \`GET /runs\`, \`GET /runs/{id}/outcomes\`.
- **Compare:** \`POST /compare\`.
- **Jobs:** \`POST /jobs/run\`, \`POST /jobs/replay\`.
- **Export:** \`POST /export/audit-pack\`.

## 3. Downstream
- GGP (summaries).
- DAT (breakpoints).
- FLO (financial outcomes).
`;

export const NS_SIM_012_STATE = `
# Simulation & Scenario Engine (SIM) - State Semantics

**Document Id:** NS-SIM-012  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
State model.

## 2. Categories
- **Scenario Definition:** Draft → Sealed (Immutable).
- **Scenario Run:** Queued → Running → Completed/Failed/Cancelled (Terminal).
- **Job State:** Mutable, audited.

## 3. Consistency
Strong consistency for definitions/runs. Eventual for views.

## 4. Late Inputs
New runs require new snapshots. History never mutates.
`;

export const NS_SIM_013_RUNBOOK = `
# Simulation & Scenario Engine (SIM) - Runbook

**Document Id:** NS-SIM-013  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Operational procedures.

## 2. Procedures
- **Create Scenario:** Checks inputs, seals, submits run.
- **Run Failure:** Inspect decision artifact, re-run with fix.
- **Non-Determinism:** Verify seed, snapshot hash, model version.
- **Comparison:** Select runs, generate report.
- **Replay:** Deterministic verification.

## 3. Invariants
Never edit history. Replay or Re-execute only.
`;

export const NS_SIM_014_DATADEF = `
# Simulation & Scenario Engine (SIM) - Data Definitions

**Document Id:** NS-SIM-014  
**Version:** 0.1  
**Status:** Draft

## 1. Purpose
Canonical field-level definitions.

## 2. Scenario Contract
**scenario:** \`id\`, \`type\`, \`baseline_ref\`, \`version\`.
**assumption_set:** \`category\`, \`assumptions\`.
**constraint_set:** \`type\`, \`constraints\`.

## 3. Run Contract
**scenario_input_snapshot:** Frozen upstream refs.
**scenario_run:** \`id\`, \`snapshot_id\`, \`seed\`, \`status\`.
**outcome_series:** \`metric\`, \`time_index\`, \`value\`.
**sim_decision:** \`type\`, \`outcome\`, \`rationale\`.

## 4. Invariants
- Runs immutable.
- Snapshots frozen.
- Seeds recorded.
`;
