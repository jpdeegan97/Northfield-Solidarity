# 004 — Scheduler and QoS

## The routing problem
Given a graph with mixed node types, route each node to CPU/GPU/TSU to minimize cost under constraints.

## QoS inputs
- latency budget (p50/p95 targets)
- energy budget (absolute or relative)
- accuracy target (approx tolerance)
- risk class (reversible vs irreversible side effects)
- availability (TSU present? shared? queued?)
- batch size / parallelism

## Cost model (v1)
Define a simple additive cost model:

- `Cost = wL*Latency + wE*Energy + wA*Error + wR*RiskPenalty`

Where:
- Latency and Energy can be measured
- Error is estimated (calibration tables per backend)
- RiskPenalty derives from policy (e.g., high for production changes)

## Default routing rules
### Deterministic nodes
- small/branchy control: CPU
- big tensor ops / NN inference: GPU

### Sampling nodes
- if TSU available and node eligible: TSU
- else: GPU-sim
- else: CPU reference

## Eligibility rules for TSU acceleration
A sampling node is TSU-eligible if:
- EProgram uses supported factor types / constraints
- requested schedule is within backend limits
- required conditioning can be compiled to TSU format
- policy allows hardware stochasticity for this stage

## Admission control
Prevent TSU from becoming a bottleneck:
- queue limits + backpressure
- priority classes (interactive vs batch)
- preemption policy for high-priority jobs (if supported)

## Budget enforcement
- hard timeout per node
- early stopping if diagnostics indicate convergence
- degrade diagnostics_level under load (keep core results)

## “Policy gating” integration
Before side effects, enforce:
- review/approval thresholds
- confidence thresholds (e.g., minimum ESS proxy, constraint satisfaction)
- provenance requirements (must include backend, schedule, evidence hashes)

## Observed performance loops
The scheduler should learn:
- track actual latency/energy for each backend and program class
- update routing tables automatically
- detect regressions or drifts

## Failure handling
Typed failures map to actions:
- `BackendUnavailable` -> fallback immediately
- `BudgetExceeded` -> reduce samples / degrade / fallback
- `NonConvergence` -> escalate diagnostics + require human review
- `ConstraintInfeasible` -> produce an “infeasible” result with explanation rather than crash
