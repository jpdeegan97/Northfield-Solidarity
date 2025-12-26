# NS-SWB-011-APIMAP — API Map

Ingress:
- POST /swb/requests
- GET /swb/requests/{id}
- POST /swb/requests/{id}/cancel

Planning/Execution:
- GET /swb/requests/{id}/classification
- GET /swb/requests/{id}/gate
- GET /swb/requests/{id}/plan
- GET /swb/requests/{id}/steps

Registry:
- GET/POST /swb/models
- GET/POST /swb/tools

Policies:
- GET/POST /swb/policies
- POST /swb/policies/{id}/activate

Metrics/Audit:
- GET /swb/metrics
- GET /swb/requests/{id}/metrics
- GET /swb/audit
