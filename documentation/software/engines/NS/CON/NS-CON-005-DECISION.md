# NS-CON-005-DECISION — Decisions

## Defaults
- Connector runtime is containerized and ephemeral; state is external.
- All runs emit standardized events and metrics.
- Incremental sync uses explicit cursors with durable checkpoints.
- Failures route to DLQ with reason codes.

## Configurable
- Delivery guarantee (at-least-once vs exactly-once where supported).
- Rate limiting strategies per connector/provider.
- Retry policy per failure class.
- Payload format outputs (JSON lines, parquet, event envelopes).

## Anti-Patterns
- Custom one-off scripts per integration.
- Storing secrets in connector configs.
- Silent schema drift without alerts.
