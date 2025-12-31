# 006 VERSION

## Versioning
- Core service: MAJOR.MINOR.PATCH
- Deal schema: deal.vMAJOR.MINOR
- Institution schema: inst.vMAJOR.MINOR
- Graph schema: graph.vMAJOR.MINOR
- Connector versions: connector.<name>.MAJOR.MINOR.PATCH

## Compatibility
- UI and exports must declare supported schema versions.
- Breaking schema changes require migrations/backfills.
