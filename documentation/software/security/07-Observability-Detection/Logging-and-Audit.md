# Logging & Audit

## Sources to collect
- Ingress access logs
- Auth logs (login, token issuance)
- App logs (structured)
- K8s events (rbac changes, admission denials)
- CI logs (deploy actions)

## Must-have fields
- time
- actor/service id
- action
- resource
- decision
- trace_id
- ip (where relevant)

## Tamper resistance
- write-once buckets, restricted delete permissions, retention policies
