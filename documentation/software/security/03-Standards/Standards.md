# NS Security Standards

This is the canonical “must/should/may” set.

## MUST
- MFA for all human accounts (email, git, DNS, cloud).
- No public admin endpoints.
- Least privilege RBAC (humans + services).
- Secure RPC envelope for engine-to-engine traffic.
- Centralized logging for auth + ingress + workloads.
- Secrets are stored/transported securely; never in git or logs.
- CI/CD uses protected branches and reviews for production changes.

## SHOULD
- Default deny east-west with NetworkPolicy.
- Signed artifacts + admission checks.
- SBOM generation for builds.
- Short-lived credentials (OIDC) for CI.
- Regular rotation drills and tabletop incident exercises.

## MAY (later, as scale grows)
- Service mesh mTLS everywhere.
- Dedicated WAF/CDN protections.
- Hardware-backed keys / HSM/KMS.
