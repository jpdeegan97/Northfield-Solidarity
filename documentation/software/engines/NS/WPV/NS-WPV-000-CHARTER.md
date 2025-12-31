# 000 CHARTER — NS-WPV White Paper Visualizer

**Project Code:** NS-WPV  
**Project Name:** White Paper Visualizer  
**Org:** Northfield Solidarity (NS)  
**Created:** 2025-12-29  

## Mission
Turn dense research/white papers into **accurate, explorable visual explanations**—without hallucinating content—by extracting structure (math, diagrams, claims, dependencies) and rendering visuals that map directly to the source.

## The Why
White papers are high-signal but low-access: math is hard to parse, semantics are buried in prose, and diagrams are scattered. WPV makes papers **inspectable**: “show me the model”, “show me the assumptions”, “show me the data flow”.

## Non‑Negotiables
- **Faithfulness:** every visual element must trace back to source spans (citations/anchors).
- **No invented math/claims:** if unclear, show uncertainty and ask for user confirmation.
- **Reproducibility:** same input + config → same outputs.
- **Exportability:** visuals must export (SVG/PNG/PDF) and preserve references.

## Scope
- Input: PDF/HTML/LaTeX/Markdown (phase 1: PDF+Markdown).
- Output: interactive graph + derived diagrams (equation maps, dependency graphs, concept maps, flowcharts, timelines).
- Audience: internal NS engines first; later external users.

## Out of Scope (initial)
- Proving correctness of the paper’s claims.
- Full LaTeX compilation/reconstruction for all edge cases.
- Domain-specific simulation/verification.

## Success Metrics
- ≥ 90% of visuals have valid source anchors.
- Time-to-understand (user reported) reduced by ≥ 50% for target papers.
- “No hallucination” incidents: measured and driven to near-zero.

## Principles
- “**Cite or don’t draw**.”
- “**Structure before style**.”
- “**Interactive first, export always**.”
