# NS-CON-014-DATAREF — Data References

## Supported Source Families (starter)
Relational DBs, NoSQL, object storage files, event streams, SaaS APIs, webhooks.

## Standard Output Envelope (to downstream)
- source_system
- connection_id
- extracted_at
- cursor/checkpoint info
- payload (raw or parsed)
- schema/version metadata
- signatures/checksums

## Downstream Contracts
- CON outputs land in raw/staging zones
- QTN performs cleansing/gating and promotion
- GGE defines allowed flows and retention policies
