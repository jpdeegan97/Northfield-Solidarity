# NS-TINE-008-EEE — Events, Entities, Edges

## Entities
User, DietProfile, PantryProfile  
IntentQuery, MenuPlan, Recipe, IngredientLine  
Store, Offer, CartStrategy, CartItem  
Chef, ChefVettingCase, Booking, Incident

## Events (examples)
- `intent.created`
- `menu.generated`
- `menu.approved`
- `ledger.built`
- `stores.queried`
- `cart.optimized`
- `cart.refreshed`
- `checkout.initiated`
- `chef.applied`
- `chef.verified`
- `booking.requested`
- `booking.confirmed`
- `session.completed`
- `incident.reported`

## Graph Edges (optional exports)
- (User) —PREFERS→ (Cuisine/Tag)
- (MenuPlan) —USES→ (RecipeVariant)
- (IngredientLine) —MATCHED_TO→ (Offer)
- (CartStrategy) —SPLITS_ACROSS→ (Store)
- (Chef) —SERVES→ (Area/Building)
- (Booking) —FULFILLS→ (MenuPlan)
