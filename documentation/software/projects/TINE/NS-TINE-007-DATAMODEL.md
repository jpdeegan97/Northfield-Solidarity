# NS-TINE-007-DATAMODEL — Data Model

## Core Entities
### User & Preferences
- **User**(id, contact, locale, created_at)
- **DietProfile**(user_id, diet_type, allergies[], dislikes[], preferences, healthiness_default)
- **PantryProfile**(user_id, staples[], inventory_items[])

### Intent & Planning
- **IntentQuery**(id, user_id, duration_days, meals_per_day, schedule, budget, healthiness, constraints_json)
- **MenuPlan**(id, user_id, intent_id, version, status, created_at)
- **MenuDay**(plan_id, date, meals[])
- **Meal**(id, plan_id, day, slot, recipe_id, variant_id, notes)

### Recipes & Nutrition
- **Recipe**(id, title, cuisine, steps, time_prep, time_cook, servings, tags[])
- **RecipeVariant**(id, recipe_id, diet_tags[], substitutions, allergen_flags[])
- **NutritionEstimate**(recipe_variant_id, calories, protein, carbs, fat, fiber, sodium, confidence)

### Ingredients & Procurement
- **Ingredient**(id, canonical_name, unit, category, allergen_tags[])
- **IngredientLine**(plan_id, ingredient_id, quantity, unit, recipe_refs[])
- **Store**(id, name, geo, delivery_modes, hours)
- **Offer**(id, store_id, sku, ingredient_id, price, size, last_seen, availability)
- **CartStrategy**(id, plan_id, objective, stores[], total_estimate, eta_estimate, constraints)
- **CartItem**(strategy_id, offer_id, quantity, substitutions_allowed, notes)

### Marketplace (Chefs)
- **Chef**(id, legal_name, profile, service_area, cuisines[], skills[], rating)
- **ChefCredential**(chef_id, type, issuer, id_number_hash, expires_at, verified_at)
- **ChefVettingCase**(chef_id, status, checks[], audit_log)
- **Booking**(id, user_id, chef_id, plan_id, datetime, duration, address_ref, status, price_quote)
- **SessionChecklist**(booking_id, sanitation_steps[], completion_attestation)
- **Incident**(id, booking_id, type, severity, notes, resolution)

### Governance & Audit
- **AuditLog**(id, actor, action, object_ref, timestamp, diff)
- **PolicyGateResult**(id, run_id, gate_name, status, rationale)
