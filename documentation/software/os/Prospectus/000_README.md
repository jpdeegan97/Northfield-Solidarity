# NS CPU/GPU/TSU Hybrid OS — Doc Pack

Generated: 2025-12-29 (America/Denver)

This pack proposes an **OS-level compute substrate** for a **CPU + GPU + TSU (Extropic thermodynamic sampling unit)** hybrid.
It treats **probabilistic computation as a first-class primitive** (sampling, conditioning, uncertainty) and exposes a **clean,
stable integration surface** so your existing Northfield Solidarity engines can adopt TSU acceleration without being rewritten.

> Design intent: make “sampling” as normal as “matmul,” while keeping determinism/auditability where it matters.

## Contents
- **001_Vision_and_Principles.md** — goals, non-goals, and design principles
- **002_Probabilistic_Primitives_and_ABI.md** — the core probabilistic primitives (portable across CPU/GPU/TSU)
- **003_Heterogeneous_Compute_Graph.md** — a single graph model with deterministic + sampling nodes
- **004_Scheduler_and_QoS.md** — routing rules, QoS, cost model, and fallback strategies
- **005_TSU_Device_Model_and_Backends.md** — TSU as a “sampling accelerator”; simulated + real backends
- **006_PRS_API.md** — Probabilistic Runtime Service interface (the “one surface” engines call)
- **007_Engine_Integration_Map.md** — how PRS maps into GGE/DRE/quickscope/AEGIS/Switchboard/KILN/etc.
- **008_Observability_Audit_Governance.md** — provenance, replayability, conflict handling
- **009_Security_Isolation_Safety.md** — isolation boundaries, approval gates, safe side-effects
- **010_MVP_Roadmap.md** — pragmatic path: simulation-first → TSU backend later
- **011_Glossary.md**
- **012_References.md**

## Background (TSU context)
Extropic describes TSUs as inherently probabilistic hardware designed for probabilistic workloads, alongside a dev platform (XTR-0)
and software (THRML). See **012_References.md** for sources.

## How to use this pack
- Treat this as your “OS spec nucleus.” We can iterate each section into deeper sub-docs (interfaces, storage, UI, policy, etc.).
- The recommended first build is the **Probabilistic Runtime Service (PRS)** with a **GPU simulation backend**, so your engines
adopt the interface immediately and TSU hardware becomes a backend swap later.
