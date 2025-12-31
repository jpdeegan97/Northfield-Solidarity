# 002 — Probabilistic Primitives and ABI

This section defines a **portable ABI** that can run on CPU, GPU, or TSU, and that composes cleanly into pipelines.

## Mental model
- CPU/GPU: evaluate functions; compute features; score candidates; run deterministic transforms.
- TSU: efficiently produce samples from target distributions (or energy-based models).

## Core objects

### 1) SState (Stochastic State)
A typed container for random variables and latent state.

Minimal fields:
- `dtype` / `shape`
- `domain` (discrete / continuous / bounded)
- `constraints` (hard and soft)
- `seed_policy` (reproducibility guarantees; see below)
- `version`

### 2) EProgram (Energy / Factor Program)
A target distribution specified as an energy function or factor/hypergraph model.
This is intentionally compatible with “energy-based model” thinking.

EProgram supports:
- factors / potentials
- constraints (hard/soft)
- conditioning (observations)
- temperature and annealing schedules
- compositional operators (sum-product style, factor composition)

### 3) Sampler Contract
A uniform sampling interface:

```
sample(
  eprogram,
  sstate_init,
  n_samples,
  schedule,
  constraints,
  conditioning,
  diagnostics_level
) -> (samples, diagnostics, provenance)
```

**Diagnostics** should include:
- mixing proxies (autocorrelation estimates, ESS proxies)
- acceptance stats (if backend uses MCMC-like methods)
- entropy / KL proxies (when available)
- constraint violation counts
- runtime cost metrics (latency, energy estimate)

### 4) Conditioning
Conditioning binds evidence into the distribution:
- hard conditioning: clamp variables / fix observed values
- soft conditioning: add penalty terms to energy

### 5) Score / LogProb
A backend-neutral scoring method:

```
score(eprogram, samples) -> scores
```

### 6) Uncertainty Return Types
Never return only a point estimate if uncertainty matters.
Return:
- samples or a summary distribution
- confidence intervals / quantiles
- entropy / dispersion
- calibration metrics (when feasible)

## Reproducibility and audit
Stochastic compute is not “replayable” like deterministic compute, but it can be **auditable**.

Define a `SeedPolicy`:
- `BestEffortReplay`: record seeds, schedule, and backend version
- `DeterministicSim`: enforce deterministic GPU-sim sampling (debug mode)
- `HardwareStochastic`: accept hardware entropy; record provenance for audit

Record provenance:
- backend (TSU/GPU/CPU) + version
- schedule + hyperparameters
- conditioning inputs hashes
- EProgram hash
- any model prompts/config hashes if LLMs generated the EProgram

## Error model (make failures explicit)
Sampling failures must be typed:
- `ConstraintInfeasible`
- `NonConvergence`
- `BudgetExceeded`
- `BackendUnavailable`
- `NumericalInstability`
- `PolicyViolation`

## Composition operators
Provide operators so engines can build complex probabilistic jobs from smaller ones:
- `compose(E1, E2)` (combine energies)
- `condition(E, obs)`
- `marginalize(E, vars)`
- `map_reduce_samples(...)` (distributed sampling)
- `resample(samples, weights)` (importance sampling support)

## Why ABI-first matters
If you standardize this ABI, you can:
- integrate now with GPU-sim
- adopt TSU later
- keep engine code stable
