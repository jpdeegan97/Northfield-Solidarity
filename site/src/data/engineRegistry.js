// src/data/engineRegistry.js

export const NS_ENGINES = [
    {
        code: "GGP",
        org: "NS",
        name: "Governance Graph Processor",
        category: "Governance",
        oneLiner: "Nucleus engine for permissions, approvals, state transitions, and auditability.",
        description:
            "GGP is the governance substrate across Northfield Solidarity. It defines and enforces who can do what, when, and why, and keeps state transitions auditable and composable.",
        responsibilities: [
            "Policy & permission evaluation (authz surfaces)",
            "Approval gates and state transition rules",
            "Audit trail / decision traceability primitives",
            "Governed orchestration contracts shared across engines",
        ],
        inputs: ["Domain events", "Identity/role context", "Policies/rules", "Prior state snapshots"],
        outputs: ["Allow/deny decisions", "Approved transitions", "Audit records", "Governance events"],
        integrations: ["IDN", "FLO", "SIG", "MUX", "SIM", "DAT", "DRE", "PIE"],
        status: "Active build",
    },
    {
        code: "PIE",
        org: "NS",
        name: "Product InsightIQ Engine",
        category: "Research",
        oneLiner: "Product research intelligence and insight synthesis.",
        description:
            "PIE converts market inputs into structured product insight: what to build, what to source, what to avoid, and why — in a way that is comparable across categories and time.",
        responsibilities: [
            "Insight synthesis and scoring",
            "Research-to-roadmap structuring",
            "Competitive product mapping",
            "Decision-ready briefs",
        ],
        inputs: ["Research packs (DRE)", "Signals (SIG)", "Channel data (MUX)"],
        outputs: ["Insight objects", "Ranked opportunities", "Decision briefs"],
        integrations: ["DRE", "SIG", "MUX", "SIM"],
        status: "Planned / MVP soon",
    },
    {
        code: "DAT",
        org: "NS",
        name: "Digital Arbitrage Tooling",
        category: "Execution",
        oneLiner: "Execution tooling for digital market moves with traceable outcomes.",
        description:
            "DAT executes constrained strategies in digital marketplaces—always under governance gates and with measurable outcomes.",
        responsibilities: [
            "Strategy execution rails",
            "Position/task lifecycle tracking",
            "Guardrails and safety constraints",
        ],
        inputs: ["Approved actions (GGP)", "Signals (SIG)", "Channel connectivity (MUX)"],
        outputs: ["Execution events", "Outcome metrics", "Reconciliation inputs"],
        integrations: ["GGP", "SIG", "MUX", "FLO"],
        status: "Active build",
    },
    {
        code: "MUX",
        org: "NS",
        name: "Market Integration Layer",
        category: "Integration",
        oneLiner: "Connectors/adapters across marketplaces and channels.",
        description:
            "MUX standardizes integration with external systems: APIs, marketplaces, data sources, and operational tools—so the rest of the stack stays clean.",
        responsibilities: [
            "Connectors/adapters",
            "Normalization of external data",
            "Outbound action dispatch",
            "Retry/idempotency at integration edges",
        ],
        inputs: ["External API responses", "Outbound action requests"],
        outputs: ["Normalized events", "Action acknowledgements", "Integration telemetry"],
        integrations: ["SIG", "DAT", "PIE", "DRE", "FLO"],
        status: "Active build",
    },
    {
        code: "SIG",
        org: "NS",
        name: "Signal Aggregation Engine",
        category: "Research",
        oneLiner: "Signal ingestion, normalization, scoring, and routing.",
        description:
            "SIG ingests signals from across channels, normalizes them, scores them, and routes them into research and decision surfaces.",
        responsibilities: [
            "Signal ingestion pipelines",
            "Normalization and scoring",
            "Routing / prioritization",
            "Signal provenance tracking",
        ],
        inputs: ["Channel feeds (MUX)", "External datasets", "Manual signals"],
        outputs: ["Scored signals", "Alert/trigger events", "Signal history"],
        integrations: ["MUX", "DRE", "PIE", "SIM"],
        status: "Active build",
    },
    {
        code: "SIM",
        org: "NS",
        name: "Simulation & Scenario Engine",
        category: "Simulation",
        oneLiner: "What-if modeling, stress tests, scenario runs, and projections.",
        description:
            "SIM runs controlled experiments: scenario planning, what-if analysis, and projection comparisons before committing resources.",
        responsibilities: [
            "Scenario definition & execution",
            "Model evaluation and sensitivity checks",
            "Comparative projection outputs",
        ],
        inputs: ["Insight objects (PIE)", "Signals (SIG)", "Financial constraints (FLO)"],
        outputs: ["Scenario results", "Sensitivity reports", "Projection objects"],
        integrations: ["PIE", "SIG", "FLO", "DRE"],
        status: "Planned",
    },
    {
        code: "IDN",
        org: "NS",
        name: "Identity & Entity Nexus",
        category: "Identity",
        oneLiner: "Entities, roles, identity surfaces, and trust modeling.",
        description:
            "IDN models who/what exists in the ecosystem: people, services, entities, roles, and the trust boundaries required for governance.",
        responsibilities: [
            "Identity and role model",
            "Entity graph primitives",
            "Authn/authz boundary surfaces (with GGP)",
        ],
        inputs: ["User/service identity", "Role assignments", "Entity definitions"],
        outputs: ["Identity context", "Role claims", "Entity graph updates"],
        integrations: ["GGP", "FLO"],
        status: "Planned / foundational",
    },
    {
        code: "FLO",
        org: "NS",
        name: "Financial Ledger Orchestrator",
        category: "Finance",
        oneLiner: "Ledgering, reconciliation, and governed financial workflows.",
        description:
            "FLO records and orchestrates financial reality: ledgers, approvals, reconciliation, and traceable movement across systems.",
        responsibilities: [
            "Ledger primitives",
            "Reconciliation workflows",
            "Approval gates for financial actions",
        ],
        inputs: ["Execution outcomes (DAT)", "Approvals (GGP)", "External statements (MUX)"],
        outputs: ["Ledger entries", "Reconciliation results", "Financial audit events"],
        integrations: ["DAT", "GGP", "MUX", "SIM"],
        status: "Planned",
    },
    {
        code: "DRE",
        org: "NS",
        name: "Deep Research Engine",
        category: "Research",
        oneLiner: "Continuous deep research and knowledge mapping.",
        description:
            "DRE continuously tracks and structures bleeding-edge information into a usable internal knowledge graph for downstream engines.",
        responsibilities: [
            "Research ingestion + structuring",
            "Knowledge graph mapping",
            "Topic tracking and update routines",
        ],
        inputs: ["Documents", "Web research", "Signal bundles (SIG)"],
        outputs: ["Research packs", "Knowledge graph objects", "Summaries/briefs"],
        integrations: ["SIG", "PIE", "SIM"],
        status: "Active build (DRE concept)",
    },
    {
        code: "INT",
        org: "NS",
        name: "Intervention Engine",
        category: "State",
        oneLiner: "System-wide state fabric and context plane.",
        description:
            "Intervention (quickscope) provides a single, authoritative, replayable, real-time state context for the entire NS ecosystem. It turns NS into a coherent, stateful organism with shared context.",
        responsibilities: [
            "Immutable event log (system memory)",
            "Materialized state views (system present)",
            "Real-time delta streams for UIs",
            "Cross-engine correlation & causality",
        ],
        inputs: ["Canonical events (All Engines)", "Governance decisions (GGP)"],
        outputs: ["State snapshots", "Delta streams", "Replay/audit logs"],
        integrations: ["GGP", "Firmament", "All Engines"],
        status: "Active build",
    },
];

export const SL_ENGINES = [
    {
        code: "MRFPE",
        org: "SL",
        name: "Market Research & Future Projection Engine",
        category: "Research",
        oneLiner: "Market intelligence, neighborhood trajectories, forward projections for RE decisions.",
        description:
            "MRFPE specializes in real estate market research: comps, neighborhood trajectories, demand signals, and forward-looking projections.",
        responsibilities: [
            "Comps + trend analysis",
            "Neighborhood trajectory scoring",
            "Forward projection & scenario snapshots (RE-specific)",
        ],
        inputs: ["Market datasets", "Local signals", "Comparable sales/leases"],
        outputs: ["Target zone scores", "Projection objects", "Risk flags"],
        integrations: ["PTE", "PECA", "NS core (governance)"],
        status: "Planned",
    },
    {
        code: "PECA",
        org: "SL",
        name: "Prop Entity Creation Automation",
        category: "Operations",
        oneLiner: "Entity creation workflows for assets with compliance/documentation rails.",
        description:
            "PECA automates the creation and setup of property-specific entities and documentation checklists required for clean operations.",
        responsibilities: [
            "Entity setup workflows",
            "Compliance checklist automation",
            "Document rails and storage conventions",
        ],
        inputs: ["Acquisition intent", "Asset metadata", "Jurisdiction rules"],
        outputs: ["Entity setup tasks", "Document checklists", "Audit-ready record"],
        integrations: ["PTE", "NS core (governance)"],
        status: "Planned",
    },
    {
        code: "PTE",
        org: "SL",
        name: "Portfolio Tracker Engine",
        category: "Portfolio",
        oneLiner: "Portfolio tracking: leases, capex, reserves, maintenance cycles, performance KPIs.",
        description:
            "PTE tracks portfolio reality: unit status, leases, capex planning, reserve policy, maintenance cadence, and KPI reporting.",
        responsibilities: [
            "Portfolio data model + KPIs",
            "Maintenance + capex lifecycle tracking",
            "Performance views and reporting surfaces",
        ],
        inputs: ["Lease/unit data", "Maintenance/vendor activity", "Budget/reserve policy"],
        outputs: ["KPI dashboards", "Alerts/tasks", "Portfolio audit trail"],
        integrations: ["MRFPE", "PECA", "NS core (governance)"],
        status: "Planned",
    },
];

export const ALL_ENGINES = [...NS_ENGINES, ...SL_ENGINES];

export function getEngineByCode(code) {
    if (!code) return null;
    const normalized = String(code).toUpperCase();
    return ALL_ENGINES.find((e) => e.code.toUpperCase() === normalized) || null;
}