# NS-CON-008-EEE — Events, Entities, Edges

## Events
- connector.published
- connection.created / connection.enabled / connection.paused
- run.started / run.succeeded / run.failed / run.partial
- checkpoint.updated
- schema.discovered / schema.drift.detected
- dlq.enqueued / dlq.replayed

## Entities
Connector, ConnectorVersion, Connection, Run, Checkpoint, Artifact, DLQItem

## Edges
(Connection) —USES→ (ConnectorVersion)
(Run) —FOR→ (Connection)
(Run) —EMITS→ (Artifact)
(Connection) —PRODUCES→ (DatasetRef)
