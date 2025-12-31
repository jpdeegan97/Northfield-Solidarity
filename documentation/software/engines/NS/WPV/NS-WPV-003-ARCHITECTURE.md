# 003 ARCHITECTURE

## High-level
**Pipeline:** Ingest → Parse → Segment → Extract → Normalize → Visualize → Review → Export

### Components
1. **Ingest Service**
   - Accepts PDF/MD/HTML/LaTeX
   - Stores raw + derived artifacts

2. **Parse & Segmentation**
   - PDF: layout analysis (pages, blocks, reading order)
   - Extract: text spans, figure regions, table regions
   - Output: `DocSpan` graph with coordinates + anchors

3. **Extraction Engines**
   - **Semantic Extractor:** claims/defs/assumptions/entities
   - **Math Extractor:** equation blocks, symbol tables, dependencies
   - **Diagram Extractor:** detects “process language” and blocks

4. **Normalizer**
   - Resolves duplicates: same concept/variable referenced multiple ways
   - Creates canonical IDs + alias sets
   - Links evidence spans to nodes

5. **Visualization Orchestrator**
   - Builds view models for each visualization type
   - Ensures every element has `source_refs[]`
   - Produces interactive JSON + render-ready SVG templates

6. **Review UI**
   - Human-in-the-loop edits: merge nodes, rename, fix edges
   - Accept/reject uncertain extractions
   - Regenerate visuals with change tracking

7. **Export Service**
   - Export bundle: HTML report + SVG/PNG/PDF
   - Generates share links / signed URLs

## Deployment Shape
- WPV Core API (stateless)
- Workers (CPU-heavy parsing; optional GPU for OCR/math image recognition)
- Object store (raw PDFs, generated assets)
- Graph store (concept/math graph)
- Search index (terms, equations, references)

## Interfaces
- REST/GraphQL API for uploads, status, retrieval
- Web UI for inspection and editing
- Internal: publish extracted graph into NS graph backbone (DRE/IDN)

## Traceability Enforcement
Every `VisualElement` must include:
- `source_refs`: list of `(doc_id, span_id, page, bbox, quote_hash)`
- `confidence`
- `created_by`: engine + version
