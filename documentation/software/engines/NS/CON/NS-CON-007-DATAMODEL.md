# NS-CON-007-DATAMODEL — Data Model

## Registry
- **Connector**(id, name, type[source|destination], system, description)
- **ConnectorVersion**(id, connector_id, version, capabilities_json, released_at)
- **ConnectorDoc**(version_id, docs_uri)

## Connections
- **Connection**(id, connector_version_id, name, owner, status, config_json, secret_ref, created_at)
- **ConnectionPolicy**(connection_id, allowed_scopes, network_allowlist, data_classification)

## Runs
- **Run**(id, connection_id, started_at, finished_at, status, stats_json)
- **Checkpoint**(connection_id, cursor_json, updated_at)
- **Artifact**(run_id, type, uri, checksum)

## Error Handling
- **FailureEvent**(run_id, ts, error_class, code, message_redacted, payload_ref)
- **DLQItem**(id, connection_id, payload_ref, reason_code, attempts, last_attempt_at)
