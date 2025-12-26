# NS-CON-011-APIMAP — API Map

## Catalog
- POST /con/connectors
- POST /con/connectors/{id}/versions
- GET  /con/connectors
- GET  /con/connectors/{id}
- GET  /con/connectors/{id}/versions

## Connections
- POST /con/connections
- GET  /con/connections
- GET  /con/connections/{id}
- POST /con/connections/{id}/validate
- POST /con/connections/{id}/enable
- POST /con/connections/{id}/pause

## Runs
- POST /con/connections/{id}/run (trigger)
- GET  /con/runs/{id}
- GET  /con/connections/{id}/runs

## Checkpoints & Schema
- GET  /con/connections/{id}/checkpoint
- POST /con/connections/{id}/checkpoint/reset
- GET  /con/connections/{id}/schema
- GET  /con/connections/{id}/schema/diff

## DLQ
- GET  /con/connections/{id}/dlq
- POST /con/dlq/{item_id}/replay
- POST /con/dlq/replay (bulk)
