# NS Security Docs — Start Here

**Last updated:** 2025-12-31

These docs define the **security program** for Northfield Solidarity (NS).  
They are intentionally **not** organized like an engine/project doc pack; they live as a shared, evolving security corpus.

## North Star
Every request, workload, artifact, and deploy action is:
1) authenticated  
2) authorized (least privilege)  
3) audited (tamper-evident)  
4) isolated (blast radius minimized)  
5) recoverable (tested backups + incident playbooks)

## How to use this repo
- If you’re building a new engine: start with **Standards** + **Secure RPC**.
- If you’re deploying infra: start with **Architecture** + **Controls-by-Layer**.
- If you’re preparing release: use **Supply-Chain** + **Pentest Program**.
- If you’re responding to an incident: go to **Incident Response**.

## Document map
- **01 Threat Model:** adversaries, trust boundaries, top risks, mitigations
- **02 Architecture:** reference designs (edge, k3s/k8s, identity)
- **03 Standards:** what is required across NS (must/should/may)
- **04 Controls by Layer:** network → platform → engines → app/api → data
- **05 Secure RPC:** standard middleware/envelope for engine-to-engine calls
- **06 Supply Chain:** provenance, signing, SBOM, CI/CD hardening
- **07 Observability/Detection:** logging, alerts, dashboards
- **08 Pentest Program:** scope, cadence, tooling, reporting, retest
- **09 Incident Response:** playbooks, rotation drills, comms
- **10 Checklists:** quick “do this now” lists
- **11 Templates:** policy templates, runbook templates, report templates
- **12 Roadmap:** phased adoption plan

## Definitions
- **Admin surface:** anything that can change config, deploy code, or access secrets/data.
- **Public surface:** any endpoint reachable from the Internet without private access controls.
- **Faithful audit:** every allow/deny decision is recorded with actor, reason, trace_id.
