# 012 STATE

## State Machine (doc processing)
- `NEW`
- `INGESTED`
- `PARSING`
- `PARSED`
- `EXTRACTING`
- `EXTRACTED`
- `NORMALIZING`
- `NORMALIZED`
- `VISUALIZING`
- `VISUALIZED`
- `REVIEW_PENDING`
- `APPROVED`
- `EXPORTING`
- `EXPORTED`
- `FAILED`

## Transition Rules
- Any stage → `FAILED` on fatal error (store error + artifacts)
- `VISUALIZED` → `REVIEW_PENDING` if low-confidence items exist above threshold
- `REVIEW_PENDING` → `APPROVED` when user accepts
- `APPROVED` → `EXPORTING` or directly `EXPORTED` if auto-export enabled
