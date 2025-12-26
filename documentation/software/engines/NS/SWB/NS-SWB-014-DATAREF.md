# NS-SWB-014-DATAREF — Data References & Interfaces

Inputs: Request Envelopes; model registry; route policies; tool adapters.

Outputs: result + route metadata + metrics; audit logs; optional lineage edges.

Envelope minimum: objective; inputs; output_format; constraints (max_cost/max_latency/quality_tier/determinism); governance (classification/allowed_providers/allowed_tools); caller metadata.

Security: classification drives provider eligibility and caching; redaction/tokenization before external calls when required; retention per policy.
