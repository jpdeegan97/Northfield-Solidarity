# 007 DATAMODEL

## Core objects

### Lead
- lead_id, source_id/type, business_ref
- status, timestamps
- scores: fit, intent, reachability, risk
- risk_flags[]
- evidence_refs[]

### Business
- business_id
- legal_name, dba_names[]
- addresses[], phones[], domains[]
- industry_tags[]
- years_active {value, confidence, evidence_ref}
- financing_signals[] (public/opt-in only)
- project_signals[] (permits/RFPs/hiring/press)
- org_signals[] (leadership/team pages, filings)

### Contact
- contact_id, business_id
- type: role_inbox | named_person
- name/title (Tier 1; evidence required)
- email/phone (Tier 2; evidence required)
- consent_status: unknown|opt_in|opt_out
- suppressed: boolean
- source_ref

### Evidence
- evidence_id, url, captured_at, content_hash
- extracts[]: {snippet, locator, snippet_hash}

### CWP: CompanyReport (CR)
- report_id, business_id, created_at
- summary (cited)
- intent_signals[] (cited)
- constraints[] (cited or hypothesis)
- recommended_angles[] (operator editable)
- confidence_overview

### CWP: PersonnelMap (PM)
- map_id, business_id
- people[]: {name, title, stakeholder_role, source_ref, confidence}
- edges[]: reports_to / influences / approves (evidence-only by default)
- contact_paths[]: suggested order of outreach

### CWP: ConversionTimeline (CT)
- timeline_id, business_id, objective
- steps[]: {step_id, action_type, channel, asset_id, gates, fallback, due_at}
- stop_conditions[]
- status

### CWP: OutreachAsset
- asset_id, type (email, call_script, one_pager, mini_audit)
- content
- personalization_fields_used[]
- evidence_refs[]
- disclaimers (if any)

### CWP: InteractionEvent
- event_id, timeline_id
- type (sent, delivered, reply, meeting_set, opt_out, bounce)
- timestamp
- metadata (channel, subject, tags)
