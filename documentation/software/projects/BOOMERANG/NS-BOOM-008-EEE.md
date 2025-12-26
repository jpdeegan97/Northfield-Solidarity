# NS-BOOM-008-EEE — Events, Entities, Edges

## Entities
BoomerangRun, RunSpec, AssetBundle, IterationLog  
TelemetryEvent, SpendMetrics, LeadRecord, QualSignal  
RunReport, Scorecard, StrategyTemplate, MarketSlice

## Events
- `run.created`
- `runspec.published`
- `assets.frozen`
- `run.launched`
- `iteration.applied`
- `telemetry.ingested`
- `run.closed`
- `report.published`
- `library.updated`

## Edges (knowledge graph friendly)
- (Run) —USES_STRATEGY→ (StrategyTemplate)
- (Run) —TARGETS→ (MarketSlice)
- (Run) —PRODUCES→ (Report)
- (Run) —GENERATES→ (Telemetry)
- (StrategyTemplate) —PERFORMS_IN→ (MarketSlice) [via OutcomeRecord]
