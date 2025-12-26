# NS-CON-006-VERSION — Versioning

- Connectors are versioned (semver) with compatibility notes.
- Connection instances pin a connector version by default.
- Schema discovery emits schema versions; downstream consumers can pin.
- Breaking changes require migration path + deprecation window.
