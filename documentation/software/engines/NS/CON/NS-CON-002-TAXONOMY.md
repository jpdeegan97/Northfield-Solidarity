# NS-CON-002-TAXONOMY — Concepts & Vocabulary

- **Connector:** packaged integration adapter for a system.
- **Source Connector:** reads from external system.
- **Destination Connector:** writes to external system.
- **Connector Spec:** declarative config (auth, endpoints, sync mode, mapping).
- **Connection:** an instance of a connector with credentials + config.
- **Sync Mode:** full refresh, incremental, CDC, webhook.
- **Cursor/Watermark:** state used for incremental sync (timestamp, LSN, offset).
- **Checkpoint:** persisted progress marker for restart/replay.
- **Delivery Guarantee:** at-least-once, at-most-once, exactly-once (where possible).
- **DLQ:** dead-letter queue for failed payloads.
- **Replay:** re-run a window or set of events from checkpoints/artifacts.
