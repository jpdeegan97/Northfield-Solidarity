# Data Controls

## Encryption
- In transit: TLS
- At rest: DB + object store encryption (or filesystem encryption)

## Access
- Separate DB roles per service (least privilege)
- No shared admin creds for apps
- Audit access to sensitive tables/buckets

## Backup & recovery
- Encrypted backups
- Restore tests on schedule
- Defined RPO/RTO targets
