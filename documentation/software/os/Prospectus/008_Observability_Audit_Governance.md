# 008 — Observability, Audit, and Governance

## Provenance: treat it as a first-class artifact
Every PRS job should emit a “provenance capsule”:
- EProgram hash
- constraints hash
- conditioning hash
- backend (TSU/GPU/CPU) + versions
- schedule parameters
- QoS request
- diagnostics summary
- caller identity (engine, user, automation)

## Replay modes
- deterministic-sim replay (debug)
- best-effort replay (recorded schedule + seed policy)
- non-replayable hardware stochastic (still auditable via capsule)

## Governance pattern (high impact actions)
1. PRS produces distributions + diagnostics.
2. Deterministic gate evaluates:
   - confidence thresholds
   - constraint satisfaction
   - policy requirements (review/approval)
3. Only then do you emit an Action.

## Conflict handling
When PRS outputs are uncertain or conflicting:
- represent conflicts explicitly
- require more evidence or human decision
- avoid “silent overwrites”

## Metrics (minimum)
- queue time, runtime, p50/p95 latency
- samples/sec, diagnostics overhead
- fallback rates (TSU→GPU-sim)
- confidence attainment rates
- failure types distribution

## Debugability
Provide:
- “explain backend choice” output
- compare outputs across backends for the same EProgram
- regression harnesses (statistical tests, not bitwise)
