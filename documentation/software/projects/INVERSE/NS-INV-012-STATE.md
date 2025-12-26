# NS-INV-012-STATE — State Model & Integration

## Internal State
- **IngestState:** received → normalized → indexed
- **RepState:** pending → computed/imported → verified
- **RunState:** created → running → scored → gated → published/blocked
- **CandidateState:** proposed → reviewed → validated/rejected

## Integration with Intervention (quickscope)
- INV can emit “state patches” describing:
  - new anchors discovered
  - invalidated assumptions
  - drift warnings
- quickscope becomes the canonical state holder; INV is a producer.
