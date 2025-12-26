# NS-CON-003-ARCHITECTURE — Architecture

## Components
- **Connector Catalog API:** register connectors, versions, docs, capabilities.
- **Connection Manager:** create/manage connector instances (configs + credentials refs).
- **Runtime Orchestrator:** schedules, executes, scales connector runs (containers/jobs).
- **Secret Broker:** retrieves secrets (Vault/external secrets), handles refresh.
- **State Store:** cursors/checkpoints, run history, failure states.
- **Artifact Store:** raw payload dumps, manifests, logs (if needed).
- **Event Bus:** emits run events, lineage edges, failure notifications.
- **Observability:** LUM integration (metrics/traces/logs).

## Security Boundary
- Runtime runs with least-privileged network policies.
- Secrets never written to logs; redaction enforced.
- Outbound destinations require explicit allowlist.

## Integrations
- QTN consumes CON outputs for cleansing/gating.
- GGE supplies policy gates for allowed connections and data classes.
