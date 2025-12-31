# Supply Chain Security Program

## Goals
- Prevent malicious code from entering builds/deploys.
- Provide traceability (commit → build → artifact → deploy).

## Minimum controls
- Protected main branch; required reviews
- CI secrets minimized; short-lived creds preferred
- Dependency pinning where possible
- Container image scanning

## Next-level
- SBOM generation
- Signed images + attestations
- Admission gate in cluster
