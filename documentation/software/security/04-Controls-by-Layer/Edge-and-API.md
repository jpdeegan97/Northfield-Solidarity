# Edge and API Controls

## Edge (Ingress/Proxy)
- TLS everywhere, redirect HTTP→HTTPS
- Strict headers where applicable (HSTS, etc.)
- Rate limiting on auth and expensive endpoints
- Separate hostnames for public vs private

## API baseline
- Input validation and safe error handling
- AuthN/AuthZ on every request
- Explicit tenancy isolation (if multi-tenant)
- Audit logs for sensitive actions
