# NS-SWB-007-DATAMODEL — Data Model

Registry:
- ModelProvider(id, name, region, status)
- ModelProfile(id, provider_id, name, version, modalities, capabilities_json, context_limit, cost_profile, latency_profile, reliability_score, policy_tags)
- ToolProfile(id, name, type, permissions, cost_profile, latency_profile)

Policy & Routing:
- RoutePolicy(id, version, rules_json, allowlist_by_classification, tool_rules)
- RoutingRule(policy_id, condition, action, priority)

Requests & Runs:
- RouterRequest(id, caller, objective, constraints_json, classification, inputs_ref, status)
- ClassificationResult(request_id, task_class, modality, difficulty, risk, rationale)
- GateResult(request_id, policy_id, status, required_transforms, rationale)
- RoutePlan(id, request_id, plan_json, chosen_models, chosen_tools, fallback_chain, rationale)
- ExecutionStep(id, request_id, idx, model_id/tool_id, input_ref, output_ref, status, retries)

Metrics:
- UsageMetric(request_id, tokens_in/out, latency_ms, cost_est, provider_errors)
- OutcomeScore(request_id, success, auto_checks_json, user_feedback)
- AuditLog(id, actor, action, object_ref, timestamp, diff)
