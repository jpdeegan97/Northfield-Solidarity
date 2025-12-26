# NS-INV-007-DATAMODEL — Data Model

## Core Tables / Collections
- **Conversation**(id, source, participants, created_at, metadata)
- **Turn**(id, conversation_id, speaker, timestamp, text, tokens_ref)
- **Span**(id, turn_id, start_token, end_token, span_type)
- **Episode**(id, conversation_id, turn_ids[], label)

- **Representation**(id, type, model, dim, checksum, created_at)
- **Vector**(id, representation_id, owner_ref, vector_blob, stats)  
  - `owner_ref` can be Turn/Span/Episode/Conversation

- **InversionRun**(id, runspec_id, status, started_at, finished_at)
- **RunSpec**(id, input_selector, models_pinned, objectives, gates)

- **Candidate**(id, run_id, class, text, score, uncertainty_band, status)
- **EvidenceLink**(candidate_id, span_id, weight, note)
- **Contradiction**(candidate_a, candidate_b, severity, rationale)

- **ExportArtifact**(id, run_id, type, uri, checksum, published_at)
- **AuditLog**(id, actor, action, object_ref, timestamp, diff)

## Candidate Classes (enum)
`FACT | PREFERENCE | CONSTRAINT | GOAL | PLAN | RISK | MEMORY_CANDIDATE | GRAPH_EDGE`
