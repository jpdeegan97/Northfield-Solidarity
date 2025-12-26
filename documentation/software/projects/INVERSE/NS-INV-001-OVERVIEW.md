# NS-INV-001-OVERVIEW — Overview

## What INV does
INV converts conversations into:
1) **Segments** (turns, spans, episodes)  
2) **Representations** (embeddings/context vectors/features)  
3) **Inversion outputs** (candidate latent states)  
4) **Validated artifacts** (structured results + graph edges)

## Core Output Types
- **Context Anchors:** persistent facts/preferences/constraints likely to remain stable.
- **Intent Frames:** goals + subgoals + priorities.
- **Assumption Stack:** unstated premises, implied beliefs.
- **Decision Drivers:** what variables most influenced direction.
- **Memory Candidates:** items that *should* be persisted vs ephemeral.
- **Risk Flags:** privacy/safety/compliance sensitivity.

## Quality Philosophy
INV is **probabilistic**. Outputs must be labeled as:
- **Observed** (directly in text)
- **Inferred** (supported by evidence)
- **Speculative** (weak support; keep separate)
