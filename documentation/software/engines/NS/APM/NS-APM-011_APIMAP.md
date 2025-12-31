# 011 APIMap — Interfaces and Endpoints

## Control Plane (internal) endpoints
### Services
- `POST /apm/services` create service
- `GET /apm/services` list services
- `GET /apm/services/{id}` service details
- `PATCH /apm/services/{id}` update service
- `DELETE /apm/services/{id}` decommission (soft-delete)

### Routes
- `POST /apm/routes`
- `GET /apm/routes?service_id=...`
- `PATCH /apm/routes/{id}`
- `DELETE /apm/routes/{id}`

### Policies
- `POST /apm/policies`
- `GET /apm/policies`
- `GET /apm/policies/{id}`
- `PATCH /apm/policies/{id}`
- `POST /apm/policies/{id}/promote` promote to env (with approvals as required)

### Consumers & Credentials
- `POST /apm/consumers`
- `GET /apm/consumers`
- `POST /apm/credentials` issue
- `POST /apm/credentials/{id}/rotate`
- `POST /apm/credentials/{id}/revoke`

### Deployments / Rollouts
- `POST /apm/deployments` start rollout (config_version, env, strategy)
- `GET /apm/deployments`
- `GET /apm/deployments/{id}`
- `POST /apm/deployments/{id}/rollback`

### Emergency
- `POST /apm/emergency/freeze` freeze promotions + config changes
- `POST /apm/emergency/throttle` apply global throttle policy
- `POST /apm/emergency/unfreeze` return to normal mode

## Data Plane (public/internal ingress)
- `https://api.<env>.ns/<service>/<version>/...` (convention)
OR
- `https://<service>.<env>.api.ns/...` (alternative)

## Webhooks (optional)
- `POST /apm/webhooks/usage-threshold`
- `POST /apm/webhooks/credential-expiry`
- `POST /apm/webhooks/deployment-status`
