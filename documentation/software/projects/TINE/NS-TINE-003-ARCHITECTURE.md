# NS-TINE-003-ARCHITECTURE — System Architecture

## High-Level Architecture
- **Frontend (Web/Mobile):** intent capture, menu review, cart comparison, booking
- **API Gateway:** auth, rate limits, routing
- **Menu Engine:** recipes + personalization + constraint solver
- **Procurement Engine:** store search + price/availability + cart optimization
- **Marketplace Engine:** chef profiles, vetting, scheduling, payments
- **Data Platform:** user profiles, pantry, menus, orders, events
- **Observability (LUM):** metrics, traces, audit logs
- **Governance (GGE):** policy gates (PII, safety, marketplace compliance)

## Core Pipeline
1. Intent → normalize → constraints
2. Generate menu candidates → score → present top options
3. Build ingredient ledger → dedupe/normalize units
4. Store search (APIs + caches) → build store graph
5. Optimize cart strategies → show options with tradeoffs
6. Checkout orchestration (via partner or user-assisted)
7. Optional: chef booking workflow + compliance gates

## Key Integrations
- Grocery: Instacart-like aggregator(s), store APIs, retailer feeds (as available)
- Maps: geocoding + distance + ETA
- Payments: card + wallet (and payouts for chefs)
- Identity: KYC-lite for marketplace providers (where needed)

## Failure Modes & Resilience
- Pricing drift: show “last updated” + refresh at checkout
- Out-of-stock: substitution proposals + user approval
- API outages: cached fallbacks + limited mode
- Marketplace incidents: escalation, refund flows, provider suspension
