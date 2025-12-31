# 003 ARCHITECTURE

## End-to-end pipeline
Collect → Normalize → Resolve → Enrich → Brief → Score → Review → **CWP Generate** → Execute → Track → Learn

### Core components
1) **Source Connectors (allowlisted)**
- ToS/robots compliant; rate limited; backoff; caching
- store raw captures as evidence

2) **Normalization + Entity Resolution**
- canonicalize name/address/phone/domain
- dedupe and disambiguation workflows

3) **Enrichment**
- firmographics (public)
- intent signals (public)
- org signals (leadership/team pages, filings, official bios)
- contact discovery (lawful public/consented)

4) **Brief Generator**
- evidence-backed company overview
- confidence + freshness labeling

5) **Scoring**
- fit, intent, reachability, risk

6) **Operator Review Console**
- approves lead and export eligibility
- enforces “cite or omit”

7) **CWP Engine (Conversion Workflow Playbook)**
- builds:
  - **Company Report (CR)**
  - **Personnel Map (PM)** (stakeholder roles + contact paths)
  - **Conversion Timeline (CT)** (sequenced plan + branching)
  - **Outreach Asset Pack** (draft emails/call scripts)
- human approval gates (Phase 1/2)

8) **Outcome Tracker**
- records touches, replies, meetings, opt-outs, bounces
- updates connector quality and strategy effectiveness

### Storage
- Object store: raw evidence snapshots
- Relational/graph: business/contact/signal + stakeholder edges
- Search: evidence retrieval + profile search

### Compliance gates (always-on)
- source allowlist + robots/ToS checks
- tiered RBAC; Tier 3 disabled by default
- global opt-out suppression list
- audit logs for view/export/outreach steps
