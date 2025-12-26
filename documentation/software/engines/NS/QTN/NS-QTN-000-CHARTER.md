# NS-QTN-000-CHARTER — Engine Charter (Quarentine / QTN)

**Engine Name:** Quarentine  
**Acronym:** QTN  
**Engine Type:** Data Quality / ETL Scrubbing / Data Governance Gate  
**Version:** 0.1  
**Owner:** Northfield Solidarity — Data Platform & Governance  
**Status:** Draft / Working Spec

---

## 0. Summary
Quarentine (QTN) is the universal **data cleansing + quality gate** that sits between ingestion and storage across Northfield Solidarity systems. It enforces data contracts, normalizes formats, scrubs sensitive data per policy, deduplicates, detects anomalies, and routes uncertain/bad records into quarantine lanes for review—before any data is promoted into curated storage or downstream engines.

## 1. Mission
Ensure every dataset entering NS ecosystems is **clean enough to trust**, **safe enough to store**, and **auditable enough to govern**.

## 2. Objectives
- Provide a standard **Raw → Staging → Cleansed → Curated** lifecycle.
- Enforce **schema + contract validation** at ingestion boundaries.
- Apply **normalization** (types, units, formats, canonical enums, timezones).
- Perform **PII/PHI/secret detection** + redaction/tokenization per policy gates.
- Support **dedup & entity resolution** for common domains.
- Detect **anomalies and drift** (null storms, outliers, volume spikes).
- Produce **lineage, provenance, and audit logs** for every transformation.
- Promote only **quality-passing** data; quarantine the rest with explanations.

## 3. Non-Goals
- Replacing business-domain logic engines (DRE/GGE/etc.); QTN is a gate and cleaning layer.
- Guaranteeing “perfect truth” of data; QTN focuses on quality, consistency, safety, and contracts.
- Acting as a full MDM platform on day one (can evolve toward it).
- Solving every unstructured parsing problem (handled via specialized adapters).

## 4. Primary Users
- Platform engineers and data engineers operating ingestion pipelines.
- Product/engine teams consuming curated datasets.
- Governance operators (GGE) defining what is allowed to be stored/exported.
- Analysts needing trustworthy datasets and provenance.

## 5. Success Criteria
- High % of records promoted to curated with **low defect rate**.
- Low false positives for quarantine (good data not blocked).
- Fast time-to-detect for schema breaks and quality regressions.
- Comprehensive auditability and reproducibility.
- Policy-compliant handling of sensitive data.

## 6. Key Risks
- Over-blocking pipelines (too strict).
- Under-blocking sensitive data (privacy/security exposure).
- Coupling to one storage or one ingestion tool.
- Performance/cost blowups for heavy transformations at scale.

## 7. Guardrails
- Always keep **raw immutable landing** separate from cleansed/curated.
- Require **reason codes** for all drops/quarantines.
- Policy gates mandatory for sensitive data transformation/export.
- Version pinning for contracts and transformation rules.
