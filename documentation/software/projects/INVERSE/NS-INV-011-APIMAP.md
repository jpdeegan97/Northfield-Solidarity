# NS-INV-011-APIMAP — API Map

## Ingest
- `POST /inv/conversations` (create conversation)
- `POST /inv/conversations/{id}/turns`

## Representations
- `POST /inv/representations/compute` (compute embeddings)
- `POST /inv/vectors/import` (import external vectors)

## Inversion Runs
- `POST /inv/runspecs`
- `POST /inv/runs` (start run)
- `GET /inv/runs/{id}`

## Candidates
- `GET /inv/runs/{id}/candidates`
- `POST /inv/candidates/{id}/validate`
- `POST /inv/candidates/{id}/reject`

## Export
- `POST /inv/exports` (publish artifact)
- `GET /inv/exports/{id}`
