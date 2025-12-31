# NS-TINE-013-RUNBOOK — Operations Runbook

## Day-1 Checklist
- Stand up core services: API, menu engine worker, procurement worker
- Configure recipe catalog + nutrition mappings
- Set up grocery partner adapters + caching layer
- Configure geo and store coverage rules
- Implement audit logging + key metrics (LUM)
- Implement policy gates (GGE) for:
  - PII exposure controls
  - allergy/substitution risk flow
  - marketplace onboarding requirements

## Monitoring (SLO ideas)
- Menu generation latency (p95)
- Cart optimization latency (p95)
- Price refresh success rate
- Out-of-stock substitution rate
- Checkout completion rate
- Chef vetting time-to-verified
- Incident rate per 1,000 sessions

## Incident Playbooks
### Grocery API outage
- Switch to cached pricing + “limited mode”
- Disable multi-store optimization if necessary
- Communicate staleness clearly

### Allergy-risk complaints
- Freeze plan checkout
- Require explicit user confirmation for risky items
- Review recipe/ingredient tagging pipeline

### Marketplace safety incident
- Suspend provider immediately
- Preserve logs and checklists
- Escalate to investigation workflow
- Refund/credit policy path
