# 013 Runbook — NS-APM

## Day-1 checklist
- Gateway cluster deployed for dev/stage/prod
- Control plane reachable (internal)
- LUM sinks configured (logs/metrics/traces)
- Baseline redaction policy applied
- First service onboarded end-to-end

## Common operations

### Onboard a new service
1. Create service + upstreams
2. Add routes (host/path/method)
3. Attach default-safe policy template
4. Deploy to dev; test
5. Promote to stage; canary
6. Promote to prod; canary + full rollout

### Change a rate limit
1. Modify policy (route or consumer scope)
2. Validate + simulate
3. Promote via stage canary
4. Observe throttles/errors/latency
5. Promote to prod with approval (if required)

### Rotate an API key
1. Create new credential in same rotation group
2. Allow overlap window
3. Monitor usage shift
4. Revoke old key

### Emergency: traffic abuse / overload
1. Activate emergency throttle policy (global)
2. Freeze config promotions
3. Identify offending consumers/routes via LUM
4. Apply targeted consumer blocks/limits
5. Gradually relax global clamp after stability returns

### Emergency: bad config rollout
1. Observe regression indicators (error/latency spikes)
2. Rollback deployment to last-known-good config_version
3. Confirm stabilization
4. Postmortem + add lint/sim checks to prevent recurrence

## Health checks
- gateway instance health: ready/live endpoints
- config sync lag: gateway reports config_version + timestamp
- upstream health: per-route success rate and latency

## Alerting (minimum)
- gateway error rate (5xx) elevated
- p99 latency regression
- throttle spike (429) unexpected
- config rollout failure/rollback
- auth failure spike (401/403)
