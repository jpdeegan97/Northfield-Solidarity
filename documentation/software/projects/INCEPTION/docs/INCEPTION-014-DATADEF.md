# INCEPTION-014 — DATADEF
**Version:** 0.1.0  
**Last Updated:** 2025-12-25  

## 1. idea.yaml (canonical) — outline
```yaml
id: "idea-uuid"
title: "Short title"
problem: "What pain exists?"
audience:
  personas:
    - name: "Primary user"
      context: "Where/when they use it"
constraints:
  time_budget_minutes: 5
  security_profile: "standard" # demo|standard|secure|regulated
  deployment: "local"          # local|dev-cluster|cloud
success_metrics:
  - "Time-to-first-demo <= 5 min"
mvp_definition:
  must_do:
    - "Happy-path flow A"
assumptions:
  - "Assumption 1"
open_questions:
  - "Question 1"
outputs:
  docs: true
  scaffold: true
  mvp: true
```

## 2. delta.yaml — outline
```yaml
instance_id: "inst-uuid"
changes:
  - type: "add_feature"
    description: "Add reminders"
  - type: "modify_constraint"
    path: "constraints.time_budget_minutes"
    value: 7
```

## 3. manifest.yaml
Includes:
- generator/template versions
- input and output hashes
- file list + per-file sha256

