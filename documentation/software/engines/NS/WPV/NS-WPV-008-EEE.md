# 008 EEE (Events, Errors, Escalations)

## Events
- `doc.ingested`
- `doc.parsed`
- `extract.semantic.completed`
- `extract.math.completed`
- `normalize.completed`
- `visualize.completed`
- `review.approved`
- `export.completed`

## Errors (common)
- `parse.layout_failed`
- `parse.ocr_required`
- `extract.math_unreadable`
- `extract.low_confidence_threshold`
- `export.render_failed`
- `storage.write_failed`

## Escalation Policy
- If parse fails twice → alert on-call + attach sample pages
- If hallucination/faithfulness violation detected → block publish and create incident
- If export fails → retry with backoff; after N retries, fail job and preserve intermediate artifacts

## Observability
- Per stage latency
- Confidence distributions
- % visuals with anchors
- % nodes edited by user during review
