# NS-INV-009-IMPL — Implementation Notes

## Recommended Stack (Default)
- **Core pipeline:** Python (fast iteration) + Rust modules for heavy vector ops
- **Storage:** Postgres (metadata) + object storage (vectors/artifacts)
- **Search:** hybrid lexical + vector index (optional)
- **Workflow:** queue/worker model (idempotent jobs)
- **Observability:** LUM hooks (metrics + traces)

## Inversion Methods (Phased)

### Phase A — Baselines (fast & defensible)
- Nearest-neighbor retrieval into known corpora
- Sparse feature attribution (top-k token spans driving similarity)
- Topic modeling / clustering at episode level

### Phase B — Hybrid Decoding
- Candidate generation via constrained templates (goal/constraint/preferences)
- Contrastive scoring between candidate and evidence

### Phase C — Learned Inversion
- Train a decoder model on authorized pairs (text ↔ representation)
- Calibrate uncertainty via held-out evaluation

## Quality & Calibration
- Measure precision/recall on labeled evaluation sets.
- Track drift by embedding distribution shift.
- Maintain “known-bad” adversarial suites.
