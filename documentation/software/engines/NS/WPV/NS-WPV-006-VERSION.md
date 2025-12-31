# 006 VERSION

## Versioning Scheme
- **WPV Core:** `MAJOR.MINOR.PATCH`
- **Extractors:** independent versions (semantic, math, diagram)
- **Artifact Snapshots:** immutable `snapshot_id` with manifest checksum

## Compatibility
- UI must declare supported schema versions for:
  - `DocSpanGraph`
  - `ConceptGraph`
  - `MathGraph`
  - `VisualSuite`

## Release Cadence
- Patch: bug fixes, extraction tuning, UI fixes
- Minor: new visual types, new input formats
- Major: schema changes, storage migrations
