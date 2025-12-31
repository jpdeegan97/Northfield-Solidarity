# 001 OVERVIEW

## One-liner
Deal Atlas turns a list of financial institutions into a **deal registry** with **searchable analytics** and evidence-backed attribution.

## Core capabilities
- Institution ingestion (name, affiliates, funds, desks)
- Deal sourcing from allowed sources (public disclosures, press releases, filings, deal databases if licensed)
- Entity resolution (institution ↔ fund ↔ borrower/issuer ↔ project)
- Deal normalization into a unified schema
- Analytics:
  - sector, geography, size, stage, instrument, tenor, pricing proxy
  - time trends, cohorts
  - syndication and relationship networks
- Change detection and alerts (new deal, amended terms, refinancings)
- Export and APIs for other NS engines (DRE, Hot Potato, etc.)

## Primary workflows
1) Add institutions → backfill historical deals → dedupe/normalize → publish registry  
2) Continuous monitoring → detect new deals → update analytics  
3) Analyst queries → generate institution profiles and “deployment thesis” summaries
