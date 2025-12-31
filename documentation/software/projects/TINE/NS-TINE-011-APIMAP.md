# NS-TINE-011-APIMAP — API Map

## Identity & Profiles
- `POST /fork/users`
- `GET /fork/users/{id}`
- `PUT /fork/users/{id}/diet-profile`
- `PUT /fork/users/{id}/pantry-profile`

## Intent & Menu
- `POST /fork/intents`
- `GET /fork/intents/{id}`
- `POST /fork/menus/generate` (intent_id → menu candidates)
- `POST /fork/menus/{id}/approve`
- `POST /fork/menus/{id}/edit` (creates new version)

## Ingredients & Ledger
- `POST /fork/menus/{id}/ledger/build`
- `GET /fork/menus/{id}/ledger`

## Stores & Procurement
- `POST /fork/stores/search` (geo + preferences)
- `POST /fork/carts/optimize` (menu_id → cart strategies)
- `POST /fork/carts/{id}/refresh`
- `POST /fork/carts/{id}/substitutions/confirm`

## Checkout
- `POST /fork/checkout/initiate` (strategy_id)
- `GET /fork/checkout/{id}/status`

## Marketplace (Chefs)
- `POST /fork/chefs/apply`
- `POST /fork/chefs/{id}/vetting/start`
- `GET /fork/chefs/search`
- `POST /fork/bookings`
- `POST /fork/bookings/{id}/confirm`
- `POST /fork/bookings/{id}/complete`
- `POST /fork/incidents`
