# NS-FORK-002-TAXONOMY — Concepts & Vocabulary

## Core Concepts
- **Intent Query:** the user’s request describing what/when/how to eat.
- **Healthiness Slider:** normalized control that biases recipes toward macros, whole foods, caloric density, etc.
- **Meal Window:** breakfast/lunch/dinner/snacks schedule constraints.
- **Menu Plan:** a time-indexed set of meals and recipes.
- **Recipe Variant:** the same base meal with substitutions (diet/allergy/cost).
- **Ingredient Ledger:** canonical list of required ingredients across the plan.
- **Pantry Profile:** user-owned inventory + staples + preferences.
- **Store Graph:** candidate stores with distance, availability, pricing, delivery windows.
- **Cart Strategy:** one plan for how to purchase ingredients (single store vs multi-store).
- **Substitution Policy:** rules for acceptable replacements.
- **Chef Marketplace:** pool of vetted providers with capabilities and service areas.
- **Service Session:** a scheduled cooking engagement (in-home).

## Constraints (common)
- Diet: vegetarian, vegan, keto, halal, kosher, gluten-free, etc.
- Allergies: peanuts, shellfish, dairy, etc.
- Budget: weekly cap, per-meal cap
- Time: max cook time, max prep time, delivery windows
- Equipment: oven/no oven, microwave only, air fryer, etc.
- Preference: spicy level, cuisine, disliked ingredients

## Output Classes
- Menu (plan + recipes)
- Procurement (carts + substitutions + delivery/pickup)
- Fulfillment (chef booking + checklists + compliance)
