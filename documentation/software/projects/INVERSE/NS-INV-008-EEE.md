# NS-INV-008-EEE — Events, Entities, Edges

## Entities
- Conversation, Turn, Span, Episode
- Representation, Vector
- InversionRun, RunSpec
- Candidate, Evidence
- ExportArtifact

## Events
- `conversation.ingested`
- `representation.computed`
- `inversion.run.started`
- `candidate.proposed`
- `candidate.validated`
- `export.published`
- `gate.blocked`

## Edges (Graph Export)
- (Conversation) —HAS_TURN→ (Turn)
- (Turn) —HAS_SPAN→ (Span)
- (Span) —SUPPORTS→ (Candidate)
- (Candidate) —CONTRADICTS→ (Candidate)
- (RunSpec) —GENERATED→ (InversionRun)
- (InversionRun) —PUBLISHED→ (ExportArtifact)
