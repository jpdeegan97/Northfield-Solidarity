# 007 DATAMODEL

## Core Entities

### Document
- `doc_id`
- `title`
- `source_type` (pdf/md/html/tex)
- `ingest_time`
- `checksum`

### DocSpan
- `span_id`
- `doc_id`
- `page`
- `bbox` (x,y,w,h)
- `text`
- `reading_order`
- `span_type` (paragraph, heading, caption, etc.)

### SemanticNode
- `node_id`
- `type` (claim, definition, assumption, entity, concept)
- `label`
- `description`
- `confidence`
- `source_refs[]`

### MathNode
- `math_id`
- `type` (equation, variable, operator, function)
- `latex` (if available)
- `render` (MathML/SVG)
- `confidence`
- `source_refs[]`

### Edge
- `edge_id`
- `from_id`
- `to_id`
- `type` (defines, supports, depends_on, refers_to, derived_from)
- `confidence`
- `source_refs[]`

### VisualSuite
- `suite_id`
- `doc_id`
- `views[]` (concept_graph, math_graph, flowchart, etc.)
- `render_assets[]` (svg/png)
- `manifest` (hashes)

### SourceRef
- `doc_id`
- `span_id`
- `page`
- `bbox`
- `quote_hash` (hash of extracted snippet)

## Storage Recommendations
- Object store for binary assets (pdf/png/svg)
- Graph DB or relational + adjacency tables for nodes/edges
- Search index for full-text + symbol search
