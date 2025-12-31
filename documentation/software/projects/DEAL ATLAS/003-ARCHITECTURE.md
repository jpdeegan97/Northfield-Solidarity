# 003 ARCHITECTURE

## Pipeline
Input institutions → Source discovery → Capture → Normalize → Resolve entities → Deduplicate → Enrich → Publish registry → Analytics → Alerts

### Components
1) **Institution Registry**
- canonical institution profiles
- alias/affiliate graph
- fund/vehicle registry

2) **Source Connectors**
- Public connectors (filings, press, official announcements)
- Optional licensed connectors (only if permitted)
- Manual upload (CSV/PDF)

3) **Extraction + Normalization**
- parse deal terms into a standard schema
- store evidence snapshots (URL + captured_at + hash)

4) **Entity Resolution**
- institution/fund matching
- borrower/issuer matching
- dedupe across sources
- confidence scoring

5) **Enrichment**
- sector/NAICS tagging
- geo normalization
- instrument classification
- relationship edges (syndicates, repeat counterparties)

6) **Analytics Layer**
- OLAP-style aggregates + time series
- network graph for syndication/relationships
- institution “deployment thesis” auto-summaries (evidence-backed)

7) **API + UI**
- search/filter registry
- institution dashboards
- export endpoints

## Data stores
- Object store: raw evidence captures (HTML/PDF) and parsed artifacts
- Relational: normalized deal tables
- Graph: entity relationships (institutions, funds, syndicates)
- Search: full-text and faceted search

## Governance
- Policy gates for licensed sources and retention rules
- Audit logging of exports and access
