# NS-CON-009-IMPL — Implementation Notes

## Connector Interface (conceptual)
- discover_schema()
- test_connection()
- read_batch(cursor) / stream()
- write(payloads)
- checkpoint(cursor)
- classify_error(e)

## Sync Patterns
- Full refresh (snapshot)
- Incremental (timestamp/ID cursor)
- CDC (binlog/LSN)
- Webhook ingestion with signature verification
- Stream consumption (Kafka/Pulsar/Kinesis)

## Reliability
- Exponential backoff + jitter
- Error classes: auth, throttling, transient network, schema, validation, unknown
- DLQ + replay tooling
- Idempotency keys for destination writes

## Security
- OAuth refresh tokens stored only in secret store
- Connector config validation blocks unsafe settings
- Audit logs for connection changes and secret rotations
