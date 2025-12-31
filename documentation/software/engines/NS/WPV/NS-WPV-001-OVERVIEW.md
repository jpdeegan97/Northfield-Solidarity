# 001 OVERVIEW

## One-liner
WPV converts a white paper into a **multi-layer visualization suite** (math + semantics) with **traceability** back to the original text.

## Core Outputs
1. **Document Map:** sections → claims → definitions → references.
2. **Concept Graph:** key terms/entities and their relationships.
3. **Math Graph:** equations, variables, symbols, dependencies.
4. **Process/Architecture Diagrams:** pipelines, system blocks, data flows.
5. **Evidence Map:** where each claim is supported (citations, experiments).
6. **Exports:** SVG/PNG/PDF plus a shareable “visual report”.

## Primary User Flows
- Upload → parse → preview extracted structure → generate visuals → inspect/iterate → export/share.
- “Show me the paper as a graph.”
- “Explain equation (3) and how it depends on assumptions in §2.”
- “Generate a diagram of the algorithm described in §4.2.”

## Personas
- Builder/Engineer: wants system diagrams + algorithm flow.
- Researcher: wants equation dependency + definitions.
- Investor/Operator: wants concept map + value chain + risks.
- NS internal teams: wants consistent “paper-to-graph” ingestion for DRE.

## Constraints
- PDFs are messy: multi-column, figures, math images.
- Must be robust to partial extraction and still produce useful views.
