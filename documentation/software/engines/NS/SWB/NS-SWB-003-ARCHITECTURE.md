# NS-SWB-003-ARCHITECTURE — System Architecture

## Components
Ingress API; Semantic Classifier; GGE Policy Gate; Planner; Model Registry; Executor; Fallback Manager; (optional) Cache; LUM Telemetry/Audit; Outcome Evaluator.

## Flow
Request → classify → gate → plan → execute (steps + fallbacks) → evaluate → respond with metadata.
