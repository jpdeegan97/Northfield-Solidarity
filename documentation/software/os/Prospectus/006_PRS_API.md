# 006 — Probabilistic Runtime Service (PRS) API

## Purpose
PRS is the **one narrow integration surface** your engines call.

It provides:
- portable probabilistic compute (sample/condition/score)
- backend routing (TSU vs GPU-sim vs CPU)
- provenance and diagnostics
- policy gating hooks (for GGE)

## Conceptual API (language-neutral)

### Submit a job
```
job_id = prs.submit({
  "eprogram": EProgram,
  "init_state": SState,
  "requests": {
    "n_samples": 2048,
    "outputs": ["samples", "quantiles", "entropy", "top_k_modes"],
    "diagnostics_level": 1
  },
  "qos": {
    "latency_ms_p95": 200,
    "energy_budget": "best_effort",
    "accuracy": "approx_ok"
  },
  "policy": {
    "risk_class": "reversible",
    "requires_review": false,
    "min_confidence": 0.7
  },
  "provenance": {
    "caller_engine": "DRE",
    "task_id": "dre.findings.2025-12-29.abc123"
  }
})
```

### Get results
```
result = prs.get(job_id)
```

Returns:
- `samples` (optional)
- `summary` (quantiles, moments, entropy)
- `diagnostics` (mixing proxies, ESS proxies, constraint checks)
- `provenance` (backend used, schedule, versions, hashes)
- `policy_report` (what gates were applied)

### Stream mode (optional)
For interactive workloads:
- stream partial samples + diagnostics as they arrive
- allow early stop if confidence threshold met

## Result types (recommended)
- `SampleSet`
- `DistributionSummary`
- `UncertaintyBundle`
- `DecisionRecommendation` (only when explicitly requested)

## Policy hooks
PRS should support a pluggable policy engine:
- before running: validate job (permissions, evidence requirements)
- before returning as “actionable”: enforce confidence thresholds, require approvals
- after running: attach audit entries and hashes

## Observability hooks
Every job emits:
- metrics (latency, queue time, energy estimate)
- traces (graph node timings)
- structured logs (backend choice reason)

## Versioning
PRS is a contract. Version it carefully:
- additive changes preferred
- deprecate slowly
- keep old ABI adapters available
