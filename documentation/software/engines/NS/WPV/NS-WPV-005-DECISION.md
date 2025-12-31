# 005 DECISION

## Key Decisions (initial)
1. **Faithfulness Gate**
   - No element without `source_refs`.
   - If engine can’t anchor it → mark as “unverified” or omit.

2. **Graph-first internal representation**
   - Everything becomes a graph (doc structure + semantics + math).
   - Visuals are “views” over graphs, not separate truth.

3. **Human-in-the-loop for correctness**
   - Review UI is first-class.
   - Extraction should be fast; correctness finalized by review when needed.

4. **Deterministic builds**
   - Same input + model versions + config = same output.

5. **Pluggable extractors**
   - Support swapping math extractor, entity linker, diagram generator.

## Open Questions
- How aggressive should inference be for “process diagrams”?
- How to represent proofs and symbolic transformations?
- Best default “paper report” layout for sharing?
