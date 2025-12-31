# NS Security Charter

## Purpose
Security exists to enable speed with confidence. The goal is to build systems that are:
- hard to compromise,
- easy to operate safely,
- quick to recover.

## Non-negotiables
- No public admin surfaces.
- MFA on every human account that matters.
- Least privilege everywhere.
- Secrets never committed to git or shipped in logs.
- Standard Secure RPC for every engine.
- Policy gates in CI/CD and/or admission.

## Cultural rules
- “If it isn’t logged, it didn’t happen.”
- “If it can’t be rolled back, it can’t be merged.”
- “Exceptions expire.”

## Ownership
- NS-SEC “owns” standards and gates.
- Every engine owner owns compliance and remediation.
