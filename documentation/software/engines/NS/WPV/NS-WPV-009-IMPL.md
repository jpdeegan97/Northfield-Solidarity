# 009 IMPL

## Implementation Plan (phased)

### Phase 0 — Skeleton
- Upload → store → create empty graphs
- Stub visual suite generator that produces placeholders

### Phase 1 — Structure + Anchors
- PDF parsing to spans with coordinates
- Basic section tree + figure/table extraction
- UI: highlight spans on click

### Phase 2 — Semantics
- Extract definitions/claims/assumptions (heuristic + LLM)
- Entity/concept linking with alias resolution
- Concept graph rendering

### Phase 3 — Math
- Extract equations (text-based first)
- Symbol table + dependency inference
- Math graph + equation explorer

### Phase 4 — Diagram inference
- Convert method sections into flowcharts (with “uncertain” edges)
- Cross-link to source spans

### Phase 5 — Export & publish
- Export HTML report + SVG/PNG/PDF
- Push to NS graph backbone

## Guardrails
- Faithfulness checks in CI for extractor outputs
- Regression suite of known papers
