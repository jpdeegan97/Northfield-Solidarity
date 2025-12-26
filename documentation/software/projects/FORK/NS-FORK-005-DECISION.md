# NS-FORK-005-DECISION — Product & Design Decisions

## Default Design Decisions
- **Always present multiple cart strategies** (cheapest/fastest/balanced/fewest stores)
- **User confirmation required** for:
  - allergens/high-risk substitutions
  - changing major ingredients (protein swaps, dairy replacements)
  - chef booking requirements (kitchen access, equipment)
- **Evidence / explainability**
  - Each meal shows which constraints it satisfies and what it optimizes for
- **Marketplace safety-first**
  - Vetting and sanitation standards are first-class product features
- **Privacy-first**
  - Location and household details minimized; shared only as needed for fulfillment

## Decision Points (configurable)
- Recipe source strategy: curated internal set vs partner catalogs vs hybrid
- Optimization weighting: user-set vs system defaults
- Checkout method: deep-link user to partner vs in-app checkout (where allowed)
- Chef model: employees vs contractors vs partner network
