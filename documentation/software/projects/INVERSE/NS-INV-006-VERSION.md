# NS-INV-006-VERSION — Versioning & Compatibility

## Versioned Objects
- **Schema versions** (conversation, features, candidates)
- **Model versions** (embedders, decoders, scorers)
- **Prompt versions** (if LLM-assisted)
- **RunSpec versions** (full reproducibility)

## Compatibility Rules
- Backward compatible readers for N-1 schema.
- Export formats stable and documented (graph edge schema is contract).
- Any breaking change requires migration plan.
