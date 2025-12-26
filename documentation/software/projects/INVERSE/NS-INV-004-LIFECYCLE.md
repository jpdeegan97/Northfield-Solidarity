# NS-INV-004-LIFECYCLE — Lifecycle

## Artifact Lifecycle
**Draft → Inferred → Validated → Published → Archived → Purged**

## Run Lifecycle
1. Create **RunSpec** (input set, versions pinned, objectives)
2. Execute **InversionRun** (generate candidates)
3. Score + calibrate uncertainty
4. Apply gates: PII, policy, export rules
5. Publish outputs + audit record
6. Periodic reevaluation (drift checks)

## Retention
- Raw transcripts: governed by source policy.
- Representations: retained only if necessary; prefer recompute where possible.
- Published artifacts: versioned + revocable.
