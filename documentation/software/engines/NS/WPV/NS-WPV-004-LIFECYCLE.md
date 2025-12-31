# 004 LIFECYCLE

## 0. Draft
- Paper uploaded, parsing started.

## 1. Parsed
- Structure extracted: pages/spans/figures/tables.

## 2. Extracted
- Semantic & math units produced with confidence scores.

## 3. Normalized
- Canonical nodes assigned; duplicates merged; references resolved.

## 4. Visualized
- Visual suites generated (graphs/diagrams).

## 5. Reviewed (optional but recommended)
- User resolves low-confidence items and approves visuals.

## 6. Published
- Outputs exported; optional push into NS graph.

## 7. Archived
- Immutable snapshot stored with versioned artifacts.

## Failure Modes & Recovery
- Parse fail → fallback OCR / partial extraction
- Low confidence → require review gate for “publish”
- Export fail → retry with cached render inputs
