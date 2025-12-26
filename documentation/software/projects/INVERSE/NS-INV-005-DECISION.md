# NS-INV-005-DECISION — Product & Design Decisions

## Key Decisions (Default Stances)
- **Evidence-first outputs**: no candidate without linked spans/features.
- **Uncertainty required**: every candidate has a probability band + rationale.
- **Human-review lane**: optional “review required” for high-risk exports.
- **Redaction-first**: PII handling happens before export.
- **Version pinning**: models + prompts + code revisions captured in RunSpec.

## Decision Points
- Embedding strategy: local vs hosted; single vs ensemble.
- Inversion methods: lightweight linear baselines + heavier neural decoders.
- Storage: feature store separation from raw transcripts.
- Governance integration: export to GGE must pass gates.
