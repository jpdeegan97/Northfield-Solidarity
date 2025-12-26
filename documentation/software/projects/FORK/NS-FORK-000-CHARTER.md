# NS-FORK-000-CHARTER — Project Charter (FORK)

**Project Name:** FORK  
**Acronym:** FORK  
**Version:** 0.1  
**Owner:** Northfield Solidarity — Product & Platforms  
**Status:** Draft / Working Spec

---

## 0. Summary
FORK is a meal planning + procurement + (optional) in-home cooking marketplace. Users describe what they want to eat (preferences, healthiness, budget, timing, and duration). FORK generates a curated menu and converts it into one or more optimized grocery carts across nearby stores (price/speed/availability tradeoffs). In supported geographies, users can optionally book a vetted chef to prepare the planned meals in-home.

## 1. Mission
Make “what should I eat?” a solved problem by turning intent into a **plan, cart, and execution**—with transparent options and strong safety standards.

## 2. Core Value
- **Planning:** personalized, constraint-aware meal menus that actually match the user’s request.
- **Procurement:** cheapest/fastest carts with substitutions and multiple store strategies.
- **Execution:** optional chef service with vetting, sanitation, and auditability.

## 3. Objectives
- Convert user intent → **menu** → **grocery plan** → **purchase-ready carts**
- Provide **multi-objective optimization** (price, time, quality, diet constraints)
- Offer **options** (cheapest, quickest, best quality, fewest stores, best variety)
- Support **chef fulfillment** where available, with governance + compliance baked in
- Create an extensible platform for add-ons: meal-prep, leftovers, macros, pantry sync

## 4. Non-Goals
- Acting as a medical device or providing medical nutrition therapy.
- Guaranteeing allergen safety without user confirmation and supplier certainty.
- Replacing grocery platforms; FORK orchestrates and can integrate with partners.

## 5. Primary Users
- Busy professionals and families
- Fitness/health goal-driven users
- People in dense urban areas seeking in-home cooking help
- Communities/buildings that want a curated chef network

## 6. Success Criteria
- High “menu satisfaction” (user accepts or lightly edits plan)
- High cart conversion (users complete checkout)
- Accurate substitution handling (low frustration)
- Chef booking quality (repeat usage, low incident rate)
- Unit economics that scale by market (procurement + service fees)

## 7. Risks
- Price/availability volatility across stores
- Dietary/allergen misinterpretation
- Platform dependency risk on third-party APIs
- Marketplace trust/safety for in-home chefs
- Fraud (coupon abuse, chargebacks) and identity risks

## 8. Guardrails
- Clear “not medical advice” framing; guided disclaimers for allergy-risk users
- Evidence + explainability: why meals were chosen (constraints satisfied)
- Safety gates: chef background checks, certification validation, sanitation protocols
- Audit logs for menu generation, cart optimization, substitutions, and bookings
