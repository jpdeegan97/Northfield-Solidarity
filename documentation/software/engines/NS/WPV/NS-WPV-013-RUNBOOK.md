# 013 RUNBOOK

## Common Ops Tasks

### Restart stuck job
1. Inspect job state + last heartbeat
2. If worker died, requeue from last completed stage
3. Preserve intermediate artifacts to avoid re-parsing

### Diagnose parse quality issues
- Compare reading order against PDF viewer
- Spot-check span overlays
- If multi-column errors: adjust layout heuristics and add regression sample

### Diagnose “missing visuals”
- Check faithfulness gate logs: are nodes missing `source_refs`?
- Lower thresholds only if anchored

### Performance
- Cache rendered equation assets
- Batch model calls (semantic extraction)
- Parallelize per section/page

### Backups
- Object store lifecycle policies
- Snapshot manifests stored in durable DB
