// src/data/engineRegistry.js

export const NS_ENGINES = [
    {
        code: "APM",
        org: "NS",
        name: "API Policy Manager",
        category: "Infrastructure",
        oneLiner: "Automanaged API gateway, rate limits, and policy enforcement.",
        description:
            "APM provides a centrally managed API gateway and control plane that enforces consistent policy (rate limits, quotas, auth requirements) and emits standardized telemetry for every NS API.",
        responsibilities: [
            "Service registration & route definition",
            "Rate limiting & quota management",
            "Credential issuance (API keys)",
            "Policy enforcement & telemetry"
        ],
        inputs: ["Service definitions", "Traffic signals", "Policy bundles"],
        outputs: ["Gateway config", "Telemetry stream", "Access decisions"],
        integrations: ["LUM", "IDN", "GGP"],
        status: "Active build",
        timeline: { phase: "Phase 1: Foundation", start: 2, duration: 6, color: "var(--c-brand)" }
    },
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
        timeline: { phase: "Phase 1: Foundation", start: 0, duration: 6, color: "var(--c-brand)" }
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
        timeline: { phase: "Phase 3: Beta & Release", start: 6, duration: 4, color: "#e879f9" }
    },
    {
        code: "DAT",
        org: "NS",
        name: "Digital Arbitrage Tooling",
        category: "Execution",
        oneLiner: "Automated governed market action execution.",
        description:
            "Digital Arbitrage Tooling (DAT) is responsible for planning, staging, and executing governed market actions derived from approved PIE insights. It turns intent into safe, verifiable execution.",
        responsibilities: [
            "Execution Planning",
            "Constraint Enforcement",
            "Execution Orchestration",
            "Rollback & Recovery"
        ],
        inputs: ["Insights (PIE)", "Scenarios (SIM)", "Approvals (GGP)"],
        outputs: ["Execution Plans", "Market Actions", "Financial Events"],
        integrations: ["PIE", "GGP", "SIM", "FLO", "PTE"],
        status: "Active build",
        timeline: { phase: "Phase 1: Foundation", start: 1, duration: 4, color: "var(--c-brand)" }
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
        timeline: { phase: "Phase 1: Foundation", start: 0, duration: 4, color: "var(--c-brand)" }
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
        timeline: { phase: "Phase 1: Foundation", start: 2, duration: 4, color: "var(--c-brand)" }
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
        timeline: { phase: "Phase 3: Beta & Release", start: 7, duration: 4 }
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
        timeline: { phase: "Phase 3: Beta & Release", start: 6, duration: 5 }
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
        timeline: { phase: "Phase 3: Beta & Release", start: 8, duration: 6 }
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
        timeline: { phase: "Phase 2: Alpha Engines", start: 3, duration: 5, color: "#a855f7" }
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
        timeline: { phase: "Phase 1: Foundation", start: 0, duration: 6, color: "var(--c-brand)" }
    },
    {
        code: "CWP",
        org: "NS",
        name: "Cognitive Worker Plane",
        category: "Operations",
        oneLiner: "Agentic orchestration and MSP server management.",
        description:
            "CWP is the Cognitive Worker Plane. It serves as the agentic arm of the system, managing MSP servers, diverse agents, and automated workflows.",
        responsibilities: [
            "Agent management & Orchestration",
            "Workflow instantiation & tracking",
            "Checklist enforcement",
            "Human-in-the-loop coordination",
        ],
        inputs: ["Trigger events", "Manual initiation"],
        outputs: ["Workflow capability", "Completion records", "Efficiency metrics"],
        integrations: ["GGP", "IDN", "INT"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 7, duration: 3 }
    },
    {
        code: "BCP",
        org: "NS",
        name: "Business Continuity Protocol",
        category: "Resilience",
        oneLiner: "Failover, recovery, and resilience orchestration.",
        description:
            "BCP ensures the organism survives shocks. It manages redundancy, failover states, and emergency recovery protocols to maintain continuity under stress.",
        responsibilities: [
            "Resilience monitoring",
            "Failover orchestration",
            "Backup & restoration drills",
            "System health grades",
        ],
        inputs: ["System alerts (All Engines)", "Heartbeat signals"],
        outputs: ["Failover commands", "Resilience reports", "Emergency alerts"],
        integrations: ["INT", "GGP", "Firmament"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 9, duration: 3 }
    },
    {
        code: "LUM",
        org: "NS",
        name: "Luminance Observability Engine",
        category: "Observability",
        oneLiner: "The central observability, telemetry, and reliability platform.",
        description:
            "LUM provides standardized collection, correlation, and presentation of telemetry and evidence signals across all engines. It makes execution visible, explainable, and supportable, ensuring incidents are detected early and audited reliably.",
        responsibilities: [
            "Telemetry collection (Logs, Metrics, Traces)",
            "Correction & context propagation",
            "Reliability management (SLIs/SLOs)",
            "Incident lifecycle & evidence support",
        ],
        inputs: ["Telemetry streams", "System logs", "Trace data"],
        outputs: ["Alerts", "Incident records", "Dashboard visualizations"],
        integrations: ["All Engines", "GGP"],
        status: "Active build",
        timeline: { phase: "Phase 1: Foundation", start: 1, duration: 5, color: "var(--c-brand)" }
    },



    {
        code: "BCO",
        org: "NS",
        name: "Business Continuity Operations",
        category: "Resilience",
        oneLiner: "Business continuity and resilience orchestration.",
        description: "BCO ensures business continuity through resilient operations and failover strategies.",
        responsibilities: ["Continuity planning", "Resilience orchestration"],
        inputs: ["Market signals", "Operational state"],
        outputs: ["Continuity plans", "Failover triggers"],
        integrations: ["OCP", "GGP"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 9, duration: 3 }
    },
    {
        code: "CON",
        org: "NS",
        name: "Connectors",
        category: "Integration",
        oneLiner: "Integrations, Data Ingress & Egress, and Connector Runtime.",
        description: "CON manages the runtime and definition of connectors for external data ingress and egress.",
        responsibilities: ["Connector runtime", "Data ingress/egress"],
        inputs: ["External data"],
        outputs: ["Normalized data"],
        integrations: ["MUX", "SIG"],
        status: "Active build",
        timeline: { phase: "Phase 2: Alpha Engines", start: 3, duration: 3 }
    },
    {
        code: "IPR",
        org: "NS",
        name: "IP Formalization + Registration Engine",
        category: "Legal",
        oneLiner: "Turns IP into formal, defensible, and searchable assets.",
        description: "IPR formalizes intellectual property, registering it as defensible assets within the system.",
        responsibilities: ["IP registration", "Asset formalization"],
        inputs: ["Raw IP", "Legal frameworks"],
        outputs: ["Registered IP assets"],
        integrations: ["MINT", "IDN"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 8, duration: 4 }
    },
    {
        code: "OCP",
        org: "NS",
        name: "Onchain Compute Plane",
        category: "Infrastructure",
        oneLiner: "Onchain compute and execution environment.",
        description: "OCP provides the computation layer for onchain activities and decentralized execution.",
        responsibilities: ["Onchain execution", "Compute resource management"],
        inputs: ["Execution requests"],
        outputs: ["Execution results"],
        integrations: ["BCO", "GGP"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 10, duration: 6 }
    },
    {
        code: "SWB",
        org: "NS",
        name: "Switchboard",
        category: "Intelligence",
        oneLiner: "Model Routing, Intelligence Orchestration, and Policy Gate.",
        description: "SWB orchestrates intelligence models, routing requests to the appropriate AI/ML services under policy gates.",
        responsibilities: ["Model routing", "Intelligence orchestration"],
        inputs: ["Inference requests"],
        outputs: ["Model responses"],
        integrations: ["GGP", "SIG"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 10, duration: 5 }
    },
    {
        code: "QTN",
        org: "NS",
        name: "Quarantine Engine",
        category: "Resilience",
        oneLiner: "Isolation protocols for compromised or risky entities/signals.",
        description: "Quarantine (QTN) provides immediate, governed isolation for any entity, signal, or process deemed risky or compromised.",
        responsibilities: [
            "Threat isolation & containment",
            "Forensic sandbox management",
            "Decontamination protocols",
            "Re-entry certification"
        ],
        inputs: ["Security alerts (All Engines)", "Anomalous signals (SIG)", "Manual override"],
        outputs: ["Isolation events", "Forensic reports", "Clearance tokens"],
        integrations: ["GGP", "IDN", "INT", "SIG"],
        status: "Planned",
        timeline: { phase: "Phase 3: Beta & Release", start: 8, duration: 4 }
    },
    {
        code: "WPV",
        org: "NS",
        name: "White Paper Visualizer",
        category: "Research",
        oneLiner: "Turns dense research/white papers into accurate, explorable visual explanations.",
        description: "WPV extracts structure (math, diagrams, claims, dependencies) from research papers and renders them as explorable interactive visuals without hallucination.",
        responsibilities: [
            "Structure extraction",
            "Visual rendering",
            "Source tracing",
            "Interactive exploration"
        ],
        inputs: ["PDF Papers", "Markdown"],
        outputs: ["Interactive Graphs", "Visual Explanations"],
        integrations: ["DRE", "LUM", "SIG"],
        status: "Active build",
        timeline: { phase: "Phase 2: Alpha Engines", start: 3, duration: 4, color: "var(--c-brand)" }
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
        timeline: { phase: "South Lawn Expansion", start: 6, duration: 6, color: "#eab308" }
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
        timeline: { phase: "South Lawn Expansion", start: 7, duration: 5, color: "#eab308" }
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
        timeline: { phase: "South Lawn Expansion", start: 8, duration: 6, color: "#eab308" }
    },
];

export const ALL_ENGINES = [...NS_ENGINES, ...SL_ENGINES];

export function getEngineByCode(code) {
    if (!code) return null;
    const normalized = String(code).toUpperCase();
    return ALL_ENGINES.find((e) => e.code.toUpperCase() === normalized) || null;
}