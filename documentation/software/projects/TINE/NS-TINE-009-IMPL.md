# NS-TINE-009-IMPL — Implementation Notes

## Suggested MVP Stack
- **Frontend:** React Native (mobile) + Next.js (web)
- **Backend:** Java/Spring or Node for API; workers for optimization jobs
- **Data:** Postgres (core), Redis (caching), object storage (artifacts)
- **Search:** vector/lexical hybrid optional for recipe retrieval
- **Maps:** geocoding + distance matrix provider
- **Observability:** LUM instrumentation
- **Governance:** GGE policy gates for PII and marketplace flows

## Menu Engine (approach)
- Recipe retrieval: tags + diet filters + user dislikes
- Scoring: constraint satisfaction + healthiness alignment + variety + time/budget fit
- Output: multiple menu candidates + explanations

## Procurement Engine (approach)
- Ingredient normalization: canonical ingredient dictionary + unit conversions
- Offer matching: SKU/size matching with confidence score
- Optimization:
  - cheapest: minimize total cost
  - fastest: minimize ETA
  - fewest stores: minimize store count
  - balanced: weighted sum
- Substitution workflow:
  - safe substitutions auto-suggested
  - allergy-risk substitutions require explicit approval

## Marketplace Engine (approach)
- Provider onboarding: identity checks + credential verification
- Scheduling: availability + travel buffer + service area
- Payments: escrow/hold until completion; payouts on approval
- Incident handling: immediate suspend + investigation path
