# INCEPTION-002 — TAXONOMY
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. Core concepts
- **Idea Intake**: structured description of an initiative (problem, users, constraints)
- **Template Pack**: versioned blueprint for docs/scaffold generation
- **Golden Baseline**: non-negotiable conventions for all outputs
- **Generator**: engine that transforms inputs into artifacts
- **Gate**: quality check (lint/test/security/reproducibility)
- **Evidence**: artifacts proving what happened and why

## 2. Work units
- **Run**: one execution (inputs → outputs)
- **Instance**: namespaced project produced by a run (supports nesting)
- **Delta**: a change request applied to an existing instance
- **Bundle**: zipped deliverable for handoff

## 3. PROJECTCEPTION terms
- **Parent Project**: context project (e.g., a Duct Tape Session)
- **Child Project**: generated instance (e.g., a client POC)
- **Engine Instance**: same engine, re-used under a new namespace

