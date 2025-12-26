# INCEPTION-001 — OVERVIEW
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. What it does
INCEPTION converts a structured idea intake into:
1) **Doc pack** (000–014)  
2) **Repo scaffold** (FE/BE/infra/CI)  
3) **Minimal MVP** (1–3 end-to-end flows)  
4) **Evidence bundle** (decisions, hashes, gates, results)

## 2. Inputs
Primary input: `idea.yaml` (canonical).  
Optional inputs:
- `delta.yaml` (changes only)
- seed assets (logos, copy, brand tokens)
- constraints profiles (demo / standard / secure / regulated)

## 3. Outputs
- `docs/` — markdown docs 000–014
- `scaffold/` — runnable skeleton
- `mvp/` — implemented happy-path
- `evidence/` — logs, checks, hashes, evaluation

## 4. Operating modes
- **Studio Mode:** guided, real-time generation (ideal for Duct Tape Sessions)
- **Batch Mode:** unattended generation at scale
- **Delta Mode:** update an existing instance from a change set

## 5. Definition of “MVP”
In INCEPTION, MVP means:
- demonstrates the value proposition via a working end-to-end flow,
- has basic observability (logs/metrics/traces),
- has a smoke test,
- is deployable in dev with minimal friction.

