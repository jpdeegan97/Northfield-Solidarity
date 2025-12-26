# NS-QTN-010-FE — Frontend / UX

## Core Screens
1. **Source Registry**
   - list sources, owners, schedules, health
2. **Contract Registry**
   - schemas, rules, severities, version history
3. **Run Monitor**
   - run status, throughput, error counts, quarantine counts
4. **Quarantine Explorer**
   - filter by reason code, rule, source, time
   - safe record previews (redacted)
   - bulk actions: reprocess, override, annotate
5. **Diff & Drift**
   - schema diffs, distribution shifts, null storms
6. **Policy Dashboard**
   - sensitive tag counts, blocked promotions, retention states

## UX Principles
- Make “why quarantined” obvious (rule id + explanation + evidence).
- Provide safe previews (PII never displayed unless explicitly authorized).
- One-click reprocess with pinned versions.
