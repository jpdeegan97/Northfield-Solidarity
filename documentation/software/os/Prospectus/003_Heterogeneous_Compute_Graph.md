# 003 — Heterogeneous Compute Graph (HCG)

## Overview
All execution is represented as a single **Heterogeneous Compute Graph**, mixing:
- **D-nodes**: deterministic compute (CPU/GPU kernels)
- **S-nodes**: sampling compute (TSU backend or simulated sampler)

This eliminates “two worlds” and keeps orchestration simple.

## Node types

### D-node (Deterministic)
- feature extraction
- energy evaluation
- scoring / ranking
- embedding, transforms, matmul, NN inference
- constraint compilation

### S-node (Sampling)
- sample from EProgram
- conditional sampling
- annealing schedules
- posterior sample generation
- stochastic search steps

## Dataflow
Nodes pass typed tensors and structured objects:
- tensors: features, logits, energies
- structures: EProgram, SState, constraints, conditioning
- metadata: provenance and policy context

## Minimal graph example (ASCII)

```
[inputs] -> (D) Build features --------------------+
                 |                                 |
                 v                                 |
            (D) Build EProgram -----------------> (S) Sample on TSU/GPU-sim -> (D) Score -> (D) Select -> [outputs]
                 ^                                 |
                 |                                 v
             (D) Compile constraints <-------- diagnostics/provenance
```

## Compiler responsibilities
A “compiler” in this context is a planner that:
- normalizes EPrograms
- chooses factorization strategies
- determines which subgraphs are eligible for TSU acceleration
- inserts diagnostics and checkpoints
- enforces QoS budgets and policy constraints

## Checkpoints and determinism boundaries
- S-nodes emit diagnostics and provenance.
- Promotion to “action” should happen only through deterministic policy gates (e.g., your governance layer).

## Fallbacks
Every S-node must declare:
1. primary backend: TSU
2. fallback: GPU-sim (fast)
3. last resort: CPU reference (slow but correct)

Graph execution never fails “mysteriously”; it degrades.

## Caching
Cache where safe:
- EProgram compilation artifacts
- constraint compilation
- scoring kernels
Do not cache raw samples unless policy allows (could leak sensitive inference results).
