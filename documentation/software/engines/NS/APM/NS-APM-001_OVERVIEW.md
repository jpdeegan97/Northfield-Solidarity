# 001 Overview — NS-APM

## What it is
NS-APM is an automanaged API manager: a gateway (data plane) plus a control plane that standardizes:
- routing and versioning
- authentication entry checks
- rate limits and quotas
- logging/metrics/tracing integration (LUM)
- governance and audit (GGE)

## What it is not
- It does **not** replace service-level authorization/business rules.
- It is **not** a service mesh (though it can coexist with one).

## Primary outcomes
- One place to enforce **rate limits, quotas, abuse controls**
- One place to standardize **logs, metrics, traces**
- One place to manage **routing, versioning, canaries**
- One consistent onboarding workflow (“register service → get gateway + policy + dashboards”)

## Target users
- Internal service teams publishing APIs
- Platform/SRE maintaining edge reliability
- Security/Governance validating policy posture
- External consumers using NS APIs (where applicable)
