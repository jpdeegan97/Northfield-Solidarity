# 001 — Vision and Principles

## Vision
Build a **heterogeneous compute substrate** that treats **CPU, GPU, and TSU** as first-class peers and exposes
**probabilistic core primitives** as a stable, composable interface. Your existing engines plug into this substrate
to become more efficient at:
- decision-making under uncertainty
- probabilistic search / planning
- posterior sampling / ranking / risk quantification
- generative or denoising-style pipelines where sampling dominates cost

This is not “an OS” in the classical desktop sense. It is an **OS-adjacent runtime + device model + scheduler + API**
layer that can sit under your projects without infecting them with device-specific complexity.

## Goals
1. **One narrow integration surface** for your engines: a single runtime (PRS) that returns distributions/samples + diagnostics.
2. **Portable probabilistic programs**: the same model/spec can run on TSU, or fall back to GPU simulation.
3. **Determinism where it matters**: activation of decisions is policy-driven and auditable, even if sampling is stochastic.
4. **Measured efficiency**: route work based on latency, energy, accuracy targets, and resource availability.
5. **Clean composability**: sampling nodes interleave with GPU/CPU compute graph nodes in one pipeline.

## Non-goals
- Replacing Linux/macOS as a general-purpose OS.
- Making TSU do dense linear algebra (GPU remains best for that).
- Betting the entire platform on TSU availability (must run fully on CPU/GPU today).
- Enforcing one ML framework (adapter layers should exist for PyTorch/JAX/etc., but substrate stays neutral).

## Core design principles
### P1 — “Sampling is a primitive”
GPU-heavy systems often emulate sampling using massive deterministic arithmetic and PRNG. In this substrate, sampling is
a first-class operation with explicit contracts: `sample()`, `condition()`, `score()`, `diagnostics()`.

### P2 — “Backend swap, no engine rewrites”
Engines must not contain TSU-specific code paths. Engines call PRS. PRS chooses the backend: TSU, GPU-sim, CPU reference.

### P3 — “Auditability is a product feature”
Every stochastic decision in an automation chain should be explainable in terms of:
- the probabilistic program
- the constraints and evidence used
- the sampler settings (temperature/schedule)
- the diagnostics and confidence outputs
- the policy gates and approvals that promoted a result into action

### P4 — “Probabilistic + deterministic share one graph”
The unit of execution is a single heterogeneous compute graph (HCG) with:
- deterministic nodes (CPU/GPU kernels)
- sampling nodes (TSU or simulated sampler)

### P5 — “QoS-driven routing”
Routing is governed by a cost model: (latency, energy, accuracy, reversibility risk).
Everything has a fallback.

## What makes this uniquely compatible with your NS engines
You already have:
- governance (GGE)
- research/knowledge graph (DRE)
- state/action management (quickscope)
- dependency visibility (AEGIS)
- model routing (Switchboard)

This substrate gives all of them the same thing: **probabilistic compute as a service**, with clean provenance.
