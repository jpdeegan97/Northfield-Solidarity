# 014 DATADEF

## Files/Formats
- Raw input: `.pdf`, `.md`, `.html`, `.tex`
- Parsed:
  - `docspan.json` (spans + bboxes + reading order)
  - `structure.json` (section tree)
- Graphs:
  - `semantic_graph.json` (nodes/edges + anchors)
  - `math_graph.json` (equations/vars + anchors)
- Visual suite:
  - `suite.json` (view configs + source refs)
  - `assets/` (SVG/PNG)
- Export bundle:
  - `report.html`
  - `report.pdf`
  - `assets/`

## Minimum Required Fields (Faithfulness)
Every node/edge/visual element must include:
- `source_refs[]`
- `confidence`
- `created_by` (engine + version)
