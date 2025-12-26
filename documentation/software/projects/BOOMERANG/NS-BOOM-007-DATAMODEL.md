# NS-BOOM-007-DATAMODEL — Data Model

## Core Entities

### Run
- **BoomerangRun**(id, name, owner, created_at, status, tags[])
- **RunSpec**(run_id, version, market_slice, strategy_template, offer, constraints, success_criteria, guardrails)
- **Timebox**(run_id, start_at, end_at, timezone)
- **IterationLog**(run_id, timestamp, change_type, diff, rationale, actor)

### Assets
- **AssetBundle**(id, run_id, version, items[], checksum)
- **AssetItem**(bundle_id, type, uri, hash, notes)

### Telemetry
- **TelemetryEvent**(run_id, ts, channel, event_type, metadata)
- **FunnelMetrics**(run_id, stage, count, conversion_rate)
- **SpendMetrics**(run_id, channel, spend, impressions, clicks, cpc, cpm)
- **LeadRecord**(run_id, lead_id, source, quality_score, notes)
- **QualSignal**(run_id, ts, type, text, tags[])  *(objections, quotes, themes)*

### Reporting
- **RunReport**(run_id, version, summary, outcomes, learnings, recommendations, attachments[])
- **Scorecard**(run_id, metrics, normalized_scores, verdict)

### Library
- **StrategyTemplate**(id, name, class, description, steps, do_dont, prerequisites)
- **MarketSlice**(id, icp, geo, channel, price_band, notes)
- **OutcomeRecord**(strategy_id, market_id, run_id, scores, notes)
