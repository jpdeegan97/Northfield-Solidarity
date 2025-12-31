# 010 — MVP Roadmap (Simulation-first → TSU backend later)

## Phase 0 — Contract first (1–2 weeks equivalent effort)
Deliverables:
- PRS API skeleton (submit/get)
- EProgram + SState schemas
- GPU-sim backend placeholder (even if naive)
- provenance capsule and metrics baseline

Success criteria:
- at least one engine calls PRS and receives structured outputs + provenance.

## Phase 1 — Pick one “TSU-shaped” workload (2–6 weeks)
Recommended: **AEGIS mitigation planning under uncertainty** or **Switchboard routing under uncertainty**.

Deliverables:
- EProgram templates for the chosen workload
- diagnostics that correlate with “good enough” outcomes
- policy gates in GGE that decide when to act

Success criteria:
- measurable improvement over deterministic heuristics (speed or decision quality), even on GPU-sim.

## Phase 2 — Backend maturity
Deliverables:
- GPU-sim sampler optimized
- calibration + regression tests
- routing cost model with learned estimates

Success criteria:
- stable production-like behavior in simulation.

## Phase 3 — TSU integration (when hardware access exists)
Deliverables:
- TSU device plugin (driver/runtime integration)
- compiler/translator from EProgram → TSU format
- calibration for TSU vs sim outputs

Success criteria:
- backend swap with no engine changes
- documented performance/energy deltas.

## Phase 4 — Scale-out
Deliverables:
- multi-device scheduling (multiple GPUs/TSUs)
- queueing, priorities, preemption policy (if supported)
- multi-tenant governance policies

Success criteria:
- PRS becomes shared substrate for multiple engines.
