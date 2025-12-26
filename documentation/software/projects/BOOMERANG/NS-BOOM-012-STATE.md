# NS-BOOM-012-STATE — State Model

## Run State
`DRAFT → SPECIFIED → READY → LIVE → CLOSED → REPORTED → ARCHIVED`

## Guardrail State
- **SpendCap:** ok / warning / exceeded (auto-stop)
- **Timebox:** ok / ending soon / ended (auto-stop)
- **Policy:** ok / flagged / blocked

## Report State
`DRAFT → PUBLISHED → REVISED`

## Library State
- StrategyTemplate: draft → active → deprecated
- MarketSlice: draft → active → merged (if duplicates)
