# NS-INV-014-DATAREF — Data References & Interfaces

## Inputs
- Conversation transcripts (chat, email, meeting notes)
- Metadata (timestamps, participants, project tags)
- Optional embeddings/context vectors from upstream systems

## Outputs
- JSON candidates with evidence + uncertainty
- Graph edges (GGE contract)
- “Memory candidate” bundles for human acceptance
- Docs (summaries, requirement packs, action plans)

## Security & Privacy
- Data classification: Public / Internal / Confidential / Restricted
- PII detection + redaction before export
- Access control: least privilege per project/workspace
- Full auditability for reads/writes/exports
