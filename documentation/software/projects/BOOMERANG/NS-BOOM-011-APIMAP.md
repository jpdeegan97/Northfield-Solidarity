# NS-BOOM-011-APIMAP — API Map

## Runs
- `POST /boom/runs`
- `GET /boom/runs`
- `GET /boom/runs/{id}`
- `POST /boom/runs/{id}/launch`
- `POST /boom/runs/{id}/close`

## RunSpec & Assets
- `POST /boom/runs/{id}/runspecs`
- `GET /boom/runs/{id}/runspecs`
- `POST /boom/runs/{id}/assets`
- `POST /boom/runs/{id}/assets/freeze`

## Iterations
- `POST /boom/runs/{id}/iterations`
- `GET /boom/runs/{id}/iterations`

## Telemetry
- `POST /boom/runs/{id}/telemetry/events`
- `POST /boom/runs/{id}/telemetry/spend/import`
- `GET /boom/runs/{id}/telemetry/summary`

## Reporting
- `POST /boom/runs/{id}/reports`
- `GET /boom/runs/{id}/reports`

## Library
- `POST /boom/strategies`
- `GET /boom/strategies`
- `POST /boom/markets`
- `GET /boom/markets`
- `GET /boom/outcomes` (filters)
