# NS-SWB-001-OVERVIEW — Overview

## What SWB does
1) Interpret request (classification + constraints)  
2) Gate it (GGE policies: providers/tools/redaction/retention)  
3) Plan execution (single model or ensemble)  
4) Route to best model(s)/tools  
5) Execute with retries/fallbacks  
6) Return result + route metadata + metrics

## Inputs
Objective, payloads (text/files/images), constraints (latency/cost/quality/determinism/format), governance labels (Public/Internal/Confidential/Restricted), tool permissions.

## Outputs
Primary response, route metadata (models/tools/versions/rationale), metrics (tokens/latency/cost/retries), optional confidence/uncertainty.
