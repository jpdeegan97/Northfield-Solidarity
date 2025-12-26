# NS-CON-001-OVERVIEW — Overview

## What CON does
- Provides a **catalog** of connectors (source/destination).
- Runs connectors in a secure **runtime** with controlled network access.
- Manages **auth**, **secrets**, and token refresh/rotation.
- Supports **sync modes**:
  - Polling batch
  - Webhooks
  - CDC (change data capture)
  - Event streams
- Produces consistent **outputs** (payloads + metadata) to landing zones/queues.
- Provides **retries**, **backoff**, **DLQ**, and **replay**.
- Emits **metrics + lineage** for every run.

## Typical Flow
Source system → CON connector → Raw landing / queue → QTN → curated storage → downstream engines
