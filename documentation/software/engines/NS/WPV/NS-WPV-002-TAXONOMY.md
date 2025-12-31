# 002 TAXONOMY

## Artifact Types
### Document Structure
- Section
- Subsection
- Paragraph
- Figure
- Table
- Footnote
- Reference

### Semantic Units
- Claim
- Definition
- Assumption
- Hypothesis
- Result
- Method
- Limitation
- Future Work
- Entity (person/org/tool/dataset)
- Concept (term)

### Math Units
- Equation (inline/display)
- Variable
- Operator
- Function
- Constraint
- Objective
- Theorem/Lemma/Proof (if present)

### Visual Outputs
- Concept Graph (nodes/edges)
- Math Dependency Graph
- Flowchart / Sequence / State Machine
- Architecture Diagram
- Timeline
- Table-to-chart transforms
- “Evidence links” overlay

## Confidence Levels
- High: explicit and unambiguous extraction
- Medium: inferred from nearby context
- Low: heuristic guess (must be flagged)

## Mapping Classes
- Text → Graph: dependencies/relationships
- Text → Diagram: process narratives
- Math → Graph: symbol dependencies
- Figure → Re-render: where possible (vectorization/approx)
