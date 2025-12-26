# NS-PG-004 — Connections, Pooling, and Safe Timeouts

Connections are one of the fastest ways to take Postgres down. This document defines the NS-PG stance on connection management, pooling, timeouts, and workload safety rails.

## 1. Core stance

*   Postgres is not “infinite connections.” Each connection consumes memory and CPU, and causes contention under load.
*   Pooling is the default for microservices and high-concurrency apps.
*   Timeouts are mandatory to prevent “forever queries,” idle transaction leaks, and lock storms.
*   Backpressure is healthy. It is better to reject/queue than to melt the database.

## 2. Connection model (what we standardize)

### 2.1 Three layers

1.  **Client concurrency:** threads/async tasks
2.  **Pool concurrency:** how many DB connections exist
3.  **DB concurrency:** how many queries execute at once

A stable system explicitly budgets all three.

### 2.2 Baseline rule

*   Prefer few long-lived pooled connections over many short-lived direct connections.
*   Treat the DB as a scarce resource; enforce budgets per service.

## 3. Pooling patterns

### 3.1 When to use a pool

Always use pooling when:
*   Multiple app instances exist
*   Traffic is bursty
*   You have serverless/ephemeral compute
*   You run many microservices hitting the same DB

### 3.2 Pool types (conceptual)

*   **Session pooling:** connection pinned to client session (simple; fewer surprises)
*   **Transaction pooling:** connection assigned per transaction (higher efficiency; more constraints)
*   **Statement pooling:** rare; most apps should not rely on it

### 3.3 Transaction-pooling caveats (must understand)

If using transaction pooling, you must avoid assumptions that require session stickiness, e.g.:
*   Session-level temporary tables
*   Session-local settings that must persist across transactions
*   Some patterns of prepared statements and session state

**If those are needed, use session pooling.**

## 4. Capacity budgeting (how we size connections)

### 4.1 The budget equation

Define and enforce:
*   Total DB connection budget (`max_connections` minus reserved/admin)
*   Per-service pool budgets (sum must not exceed total budget)

### 4.2 A safe default mindset

*   Start conservative; scale up only when you can prove the DB remains stable.
*   Prefer scaling replicas for reads over inflating connections for everything.

### 4.3 Reserved capacity

Reserve connections for:
*   Admin/maintenance
*   Migrations
*   Emergency access
*   Monitoring/observability

## 5. Safe timeouts (non-negotiable)

Timeouts prevent “quiet deaths” where a system is technically up but functionally dead.

### 5.1 Database-side timeouts (required baseline)

*   `statement_timeout`: kill runaway queries
*   `idle_in_transaction_session_timeout`: kill leaked transactions
*   `lock_timeout`: prevent indefinite lock waits

### 5.2 Client-side timeouts (required baseline)

*   Request timeout (per endpoint)
*   Transaction timeout (per unit of work)
*   Pool acquire timeout (don’t wait forever for a connection)

### 5.3 Policy stance

*   DB-side timeouts are the last line of defense.
*   Client-side timeouts are the first line of defense.
*   **Production systems must set both.**

## 6. Transaction safety rails

### 6.1 Avoid long transactions

Long transactions cause:
*   Bloat (vacuum can’t reclaim)
*   Lock contention
*   Replica lag
*   Increased conflict likelihood

### 6.2 Required constraints

*   Bound transaction scope tightly
*   No user-driven “open transaction” patterns
*   Avoid interactive transactions (e.g., open transaction across multiple HTTP calls)

### 6.3 Retry discipline

If using higher isolation or you expect transient failures:
*   Implement retry with jitter and strict bounds
*   Ensure operations are idempotent where possible

## 7. Lock and wait hygiene

### 7.1 The lock storm failure mode

**Symptoms:**
*   Many sessions waiting on locks
*   CPU may be low but system appears frozen
*   Latency spikes everywhere

**Mitigations:**
*   `lock_timeout`
*   kill/terminate blocker runbooks
*   detect long-running transactions and abort

### 7.2 Operational signals to monitor

*   Count of idle-in-transaction sessions
*   Longest transaction age
*   Lock wait graphs (blocked vs blockers)
*   Connection saturation (pool queue depth)

## 8. Query concurrency control

Even with limited connections, a few expensive queries can saturate the system.

**Controls:**
*   Route heavy analytics to replicas or separate warehouse
*   Use work queues for batch workloads
*   Enforce per-tenant / per-user rate limits
*   Consider advisory locks for “single-flight” critical sections

## 9. Migration and admin safety

Migrations can accidentally behave like denial-of-service.

**Rules:**
*   Run migrations with separate credentials and bounded concurrency.
*   Prefer online/low-lock migration patterns.
*   Enforce statement/lock timeouts for migration sessions.

## 10. Pool failure modes (and what to do)

### 10.1 Pool overload

*   Too many clients waiting for a connection
*   Cascading timeouts at the app layer

**Response:**
*   Shed load / rate limit
*   Reduce expensive queries
*   Confirm DB health (locks, IO, vacuum)

### 10.2 Thundering herd

*   All app instances reconnect simultaneously after failover or network event

**Mitigations:**
*   Jittered reconnect
*   Circuit breakers
*   Gradual ramp-up

## 11. Evidence requirements

For Tier 0/1 databases:

*   Documented connection budgets per service
*   Standardized timeout configuration (DB + client)
*   Dashboards showing pool saturation, lock waits, idle-in-transaction, long transactions
*   Runbooks for terminating blockers and handling pool exhaustion

## 12. What’s next

Next we tackle the day-2 reality that quietly destroys performance:

*   NS-PG-005 — Vacuum, Bloat, and Day-2 Operations
