# NS-INV-002-TAXONOMY — Concepts & Vocabulary

## Core Concepts
- **Conversation:** A sequence of turns with metadata.
- **Turn:** A single message from a participant.
- **Span:** A contiguous subset of tokens within a turn.
- **Episode:** A cluster of turns about the same objective.
- **Representation:** Embeddings, pooled vectors, feature maps.
- **Context Vector:** Any vector intended to represent “state of conversation.”
- **Inversion:** Process to recover a latent structure from a representation.
- **Decoder:** Model or procedure used to generate candidates from vectors.
- **Candidate:** A hypothesized latent fact/intent/topic.
- **Evidence:** Text spans + features supporting a candidate.
- **Uncertainty:** Calibrated confidence; must be machine-readable.

## Output Classes
- **Facts** (stable; explicit)
- **Preferences** (stable-ish)
- **Constraints** (hard boundaries)
- **Plans** (procedural)
- **Risks** (safety/privacy/legal)
- **Graph Edges** (export-ready relationships)
