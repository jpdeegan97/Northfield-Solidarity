# Trust Boundaries (Reference)

## Zones
- **Public:** Internet-facing endpoints
- **DMZ/Edge:** ingress/proxy/WAF, limited exposure
- **Workload zone:** engine services, workers
- **Data zone:** DBs, object stores, queues
- **Admin zone:** laptops, jump hosts, VPN
- **Build zone:** CI runners, artifact builders

## Boundary rules
- Public → DMZ: allowed through strict TLS + rate limits
- DMZ → Workload: only explicit routes
- Workload → Data: explicit allowlist + least privilege
- Admin → Control: VPN-only + MFA + device posture where possible
- Build → Registry/Cluster: short-lived creds + signed artifacts only
