import {
    NS_GGP_001_OVERVIEW,
    NS_GGP_002_ARCHITECTURE,
    NS_GGP_003_TAXONOMY,
    NS_GGP_004_LIFECYCLE,
    NS_GGP_005_DECISION,
    NS_GGP_006_VERSION,
    NS_GGP_007_DATAMODEL,
    NS_GGP_008_EEE,
    NS_GGP_009_IMPL,
    NS_GGP_010_FE,
    NS_GGP_011_APIMAP,
    NS_GGP_012_STATE
} from "./docs/GGP_content.js";

import {
    NS_PIE_001_OVERVIEW,
    NS_PIE_002_TAXONOMY,
    NS_PIE_003_ARCHITECTURE,
    NS_PIE_004_LIFECYCLE,
    NS_PIE_005_DECISION,
    NS_PIE_006_VERSION,
    NS_PIE_007_DATAMODEL,
    NS_PIE_008_EEE,
    NS_PIE_009_IMPL,
    NS_PIE_010_FE,
    NS_PIE_011_APIMAP,
    NS_PIE_012_STATE,
    NS_PIE_013_RUNBOOK,
    NS_PIE_014_DATADEF
} from "./docs/PIE_content.js";

import {
    NS_DAT_001_OVERVIEW,
    NS_DAT_002_TAXONOMY,
    NS_DAT_003_ARCHITECTURE,
    NS_DAT_004_LIFECYCLE,
    NS_DAT_005_DECISION,
    NS_DAT_006_VERSION,
    NS_DAT_007_DATAMODEL,
    NS_DAT_008_EEE,
    NS_DAT_009_IMPL,
    NS_DAT_010_FE,
    NS_DAT_011_APIMAP,
    NS_DAT_012_STATE,
    NS_DAT_013_RUNBOOK,
    NS_DAT_014_DATADEF
} from "./docs/DAT_content.js";

import {
    NS_FLO_001_OVERVIEW,
    NS_FLO_002_TAXONOMY,
    NS_FLO_003_ARCHITECTURE,
    NS_FLO_004_LIFECYCLE,
    NS_FLO_005_DECISION,
    NS_FLO_006_VERSION,
    NS_FLO_007_DATAMODEL,
    NS_FLO_008_EEE,
    NS_FLO_009_IMPL,
    NS_FLO_010_FE,
    NS_FLO_011_APIMAP,
    NS_FLO_012_STATE,
    NS_FLO_013_RUNBOOK,
    NS_FLO_014_DATADEF
} from "./docs/FLO_content.js";

import {
    NS_MUX_001_OVERVIEW,
    NS_MUX_002_TAXONOMY,
    NS_MUX_003_ARCHITECTURE,
    NS_MUX_004_LIFECYCLE,
    NS_MUX_005_DECISION,
    NS_MUX_006_VERSION,
    NS_MUX_007_DATAMODEL,
    NS_MUX_008_EEE,
    NS_MUX_009_IMPL,
    NS_MUX_010_FE,
    NS_MUX_011_APIMAP,
    NS_MUX_012_STATE,
    NS_MUX_013_RUNBOOK,
    NS_MUX_014_DATADEF
} from "./docs/MUX_content.js";

import {
    NS_SIG_001_OVERVIEW,
    NS_SIG_002_TAXONOMY,
    NS_SIG_003_ARCHITECTURE,
    NS_SIG_004_LIFECYCLE,
    NS_SIG_005_DECISION,
    NS_SIG_006_VERSION,
    NS_SIG_007_DATAMODEL,
    NS_SIG_008_EEE,
    NS_SIG_009_IMPL,
    NS_SIG_010_FE,
    NS_SIG_011_APIMAP,
    NS_SIG_012_STATE,
    NS_SIG_013_RUNBOOK,
    NS_SIG_014_DATADEF
} from "./docs/SIG_content.js";

import {
    NS_SIM_001_OVERVIEW,
    NS_SIM_002_TAXONOMY,
    NS_SIM_003_ARCHITECTURE,
    NS_SIM_004_LIFECYCLE,
    NS_SIM_005_DECISION,
    NS_SIM_006_VERSION,
    NS_SIM_007_DATAMODEL,
    NS_SIM_008_EEE,
    NS_SIM_009_IMPL,
    NS_SIM_010_FE,
    NS_SIM_011_APIMAP,
    NS_SIM_012_STATE,
    NS_SIM_013_RUNBOOK,
    NS_SIM_014_DATADEF
} from "./docs/SIM_content.js";

import {
    NS_IDN_001_OVERVIEW,
    NS_IDN_002_TAXONOMY,
    NS_IDN_003_ARCHITECTURE,
    NS_IDN_004_LIFECYCLE,
    NS_IDN_005_DECISION,
    NS_IDN_006_VERSION,
    NS_IDN_007_DATAMODEL,
    NS_IDN_008_EEE,
    NS_IDN_009_IMPL,
    NS_IDN_010_FE,
    NS_IDN_011_APIMAP,
    NS_IDN_012_STATE,
    NS_IDN_013_RUNBOOK,
    NS_IDN_014_DATADEF
} from "./docs/IDN_content.js";

import {
    NS_CDE_001_OVERVIEW,
    NS_CDE_002_TAXONOMY,
    NS_CDE_003_ARCHITECTURE,
    NS_CDE_004_LIFECYCLE,
    NS_CDE_005_DECISION,
    NS_CDE_006_VERSION,
    NS_CDE_007_DATAMODEL,
    NS_CDE_008_EEE,
    NS_CDE_009_IMPL,
    NS_CDE_010_FE,
    NS_CDE_011_APIMAP,
    NS_CDE_012_STATE,
    NS_CDE_013_RUNBOOK,
    NS_CDE_014_DATADEF
} from "./docs/CDE_content.js";

import {
    NS_INT_000_CHARTER,
    NS_INT_001_OVERVIEW,
    NS_INT_005_DECISION
} from "./docs/INT_content.js";

import {
    NS_JRN_001_OVERVIEW
} from "./docs/JRN_content.js";

export const DOCS_REGISTRY = [
    {
        category: "GGP Engine",
        icon: "🧠",
        items: [
            { id: "ggp-overview", title: "001 Overview", desc: "System purpose, scope, and objectives.", content: NS_GGP_001_OVERVIEW },
            { id: "ggp-architecture", title: "002 Architecture", desc: "System design, layers, and components.", content: NS_GGP_002_ARCHITECTURE },
            { id: "ggp-taxonomy", title: "003 Taxonomy", desc: "Component categories and attributes.", content: NS_GGP_003_TAXONOMY },
            { id: "ggp-lifecycle", title: "004 Lifecycle", desc: "Execution phases and state transitions.", content: NS_GGP_004_LIFECYCLE },
            { id: "ggp-decision", title: "005 Decision Prompt", desc: "Logic for the Update Decision Prompt.", content: NS_GGP_005_DECISION },
            { id: "ggp-version", title: "006 Versioning", desc: "Semantics and propagation rules.", content: NS_GGP_006_VERSION },
            { id: "ggp-datamodel", title: "007 Data Model", desc: "Audit schema and frontend read models.", content: NS_GGP_007_DATAMODEL },
            { id: "ggp-eee", title: "008 Example Exec", desc: "End-to-end execution scenario.", content: NS_GGP_008_EEE },
            { id: "ggp-impl", title: "009 Implementation", desc: "MVP plan and module breakdown.", content: NS_GGP_009_IMPL },
            { id: "ggp-fe", title: "010 Frontend", desc: "Wireframes and screen layouts.", content: NS_GGP_010_FE },
            { id: "ggp-apimap", title: "011 API Mapping", desc: "Endpoint to component mapping.", content: NS_GGP_011_APIMAP },
            { id: "ggp-state", title: "012 State Mgmt", desc: "Frontend state management plan.", content: NS_GGP_012_STATE },
        ]
    },
    {
        category: "PIE Engine",
        icon: "🥧",
        items: [
            { id: "pie-overview", title: "001 Overview", desc: "Purpose and role of the Product InsightIQ Engine.", content: NS_PIE_001_OVERVIEW },
            { id: "pie-taxonomy", title: "002 Taxonomy", desc: "Canonical vocabulary and primitives.", content: NS_PIE_002_TAXONOMY },
            { id: "pie-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_PIE_003_ARCHITECTURE },
            { id: "pie-lifecycle", title: "004 Lifecycle", desc: "Insight flow from signal to expiry.", content: NS_PIE_004_LIFECYCLE },
            { id: "pie-decision", title: "005 Decision", desc: "Evaluation and promotion logic.", content: NS_PIE_005_DECISION },
            { id: "pie-version", title: "006 Versioning", desc: "Semantic versioning rules for insights.", content: NS_PIE_006_VERSION },
            { id: "pie-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_PIE_007_DATAMODEL },
            { id: "pie-eee", title: "008 Example Exec", desc: "End-to-end execution scenario.", content: NS_PIE_008_EEE },
            { id: "pie-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_PIE_009_IMPL },
            { id: "pie-fe", title: "010 Frontend", desc: "Visualization and UX specifications.", content: NS_PIE_010_FE },
            { id: "pie-apimap", title: "011 API Map", desc: "Frontend and consumer API contracts.", content: NS_PIE_011_APIMAP },
            { id: "pie-state", title: "012 State Mgmt", desc: "State transitions and consistency.", content: NS_PIE_012_STATE },
            { id: "pie-runbook", title: "013 Runbook", desc: "Operational procedures and controls.", content: NS_PIE_013_RUNBOOK },
            { id: "pie-datadef", title: "014 Data Defs", desc: "Canonical field-level schemas.", content: NS_PIE_014_DATADEF },
        ]
    },
    {
        category: "DAT Engine",
        icon: "⚡",
        items: [
            { id: "dat-overview", title: "001 Overview", desc: "Purpose and role of Digital Arbitrage Tooling.", content: NS_DAT_001_OVERVIEW },
            { id: "dat-taxonomy", title: "002 Taxonomy", desc: "Canonical vocabulary and primitives.", content: NS_DAT_002_TAXONOMY },
            { id: "dat-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_DAT_003_ARCHITECTURE },
            { id: "dat-lifecycle", title: "004 Lifecycle", desc: "Execution phases and state transitions.", content: NS_DAT_004_LIFECYCLE },
            { id: "dat-decision", title: "005 Decision", desc: "Operational decision semantics.", content: NS_DAT_005_DECISION },
            { id: "dat-version", title: "006 Versioning", desc: "Versioning rules for plans and runs.", content: NS_DAT_006_VERSION },
            { id: "dat-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_DAT_007_DATAMODEL },
            { id: "dat-eee", title: "008 Example Exec", desc: "End-to-end execution scenario.", content: NS_DAT_008_EEE },
            { id: "dat-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_DAT_009_IMPL },
            { id: "dat-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_DAT_010_FE },
            { id: "dat-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_DAT_011_APIMAP },
            { id: "dat-state", title: "012 State Mgmt", desc: "State machines and sub-states.", content: NS_DAT_012_STATE },
            { id: "dat-runbook", title: "013 Runbook", desc: "Operational procedures and controls.", content: NS_DAT_013_RUNBOOK },
            { id: "dat-datadef", title: "014 Data Defs", desc: "Canonical field-level schemas.", content: NS_DAT_014_DATADEF },
        ]
    },
    {
        category: "FLO Engine",
        icon: "💰",
        items: [
            { id: "flo-overview", title: "001 Overview", desc: "Purpose and role of Financial Ledger Orchestrator.", content: NS_FLO_001_OVERVIEW },
            { id: "flo-taxonomy", title: "002 Taxonomy", desc: "Canonical financial vocabulary.", content: NS_FLO_002_TAXONOMY },
            { id: "flo-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_FLO_003_ARCHITECTURE },
            { id: "flo-lifecycle", title: "004 Lifecycle", desc: "End-to-end financial data flow.", content: NS_FLO_004_LIFECYCLE },
            { id: "flo-decision", title: "005 Decision", desc: "Financial decision framework.", content: NS_FLO_005_DECISION },
            { id: "flo-version", title: "006 Versioning", desc: "Versioning rules for rulesets and schemas.", content: NS_FLO_006_VERSION },
            { id: "flo-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_FLO_007_DATAMODEL },
            { id: "flo-eee", title: "008 Example Exec", desc: "End-to-end financial scenario.", content: NS_FLO_008_EEE },
            { id: "flo-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_FLO_009_IMPL },
            { id: "flo-fe", title: "010 Frontend", desc: "Finance operator UI specs.", content: NS_FLO_010_FE },
            { id: "flo-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_FLO_011_APIMAP },
            { id: "flo-state", title: "012 State Mgmt", desc: "State machines and derived state.", content: NS_FLO_012_STATE },
            { id: "flo-runbook", title: "013 Runbook", desc: "Operational procedures and controls.", content: NS_FLO_013_RUNBOOK },
            { id: "flo-datadef", title: "014 Data Defs", desc: "Canonical field-level schemas.", content: NS_FLO_014_DATADEF },
        ]
    },
    {
        category: "MUX Engine",
        icon: "🔌",
        items: [
            { id: "mux-overview", title: "001 Overview", desc: "Purpose and role of Market Integration Layer.", content: NS_MUX_001_OVERVIEW },
            { id: "mux-taxonomy", title: "002 Taxonomy", desc: "Canonical external artifact vocabulary.", content: NS_MUX_002_TAXONOMY },
            { id: "mux-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_MUX_003_ARCHITECTURE },
            { id: "mux-lifecycle", title: "004 Lifecycle", desc: "End-to-end external truth flow.", content: NS_MUX_004_LIFECYCLE },
            { id: "mux-decision", title: "005 Decision", desc: "Admissibility and integrity decisions.", content: NS_MUX_005_DECISION },
            { id: "mux-version", title: "006 Versioning", desc: "Versioning rules for rulesets and configs.", content: NS_MUX_006_VERSION },
            { id: "mux-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_MUX_007_DATAMODEL },
            { id: "mux-eee", title: "008 Example Exec", desc: "End-to-end integration scenario.", content: NS_MUX_008_EEE },
            { id: "mux-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_MUX_009_IMPL },
            { id: "mux-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_MUX_010_FE },
            { id: "mux-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_MUX_011_APIMAP },
            { id: "mux-state", title: "012 State Mgmt", desc: "State machines and invariant models.", content: NS_MUX_012_STATE },
            { id: "mux-runbook", title: "013 Runbook", desc: "Operational procedures and controls.", content: NS_MUX_013_RUNBOOK },
            { id: "mux-datadef", title: "014 Data Defs", desc: "Canonical field-level schemas.", content: NS_MUX_014_DATADEF },
        ]
    },
    {
        category: "SIG Engine",
        icon: "📡",
        items: [
            { id: "sig-overview", title: "001 Overview", desc: "Purpose and role of Signal Aggregation Engine.", content: NS_SIG_001_OVERVIEW },
            { id: "sig-taxonomy", title: "002 Taxonomy", desc: "Canonical signal vocabulary.", content: NS_SIG_002_TAXONOMY },
            { id: "sig-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_SIG_003_ARCHITECTURE },
            { id: "sig-lifecycle", title: "004 Lifecycle", desc: "End-to-end signal flow.", content: NS_SIG_004_LIFECYCLE },
            { id: "sig-decision", title: "005 Decision", desc: "Signal decision framework.", content: NS_SIG_005_DECISION },
            { id: "sig-version", title: "006 Versioning", desc: "Versioning rules for logic.", content: NS_SIG_006_VERSION },
            { id: "sig-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_SIG_007_DATAMODEL },
            { id: "sig-eee", title: "008 Example Exec", desc: "End-to-end signal scenario.", content: NS_SIG_008_EEE },
            { id: "sig-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_SIG_009_IMPL },
            { id: "sig-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_SIG_010_FE },
            { id: "sig-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_SIG_011_APIMAP },
            { id: "sig-state", title: "012 State Mgmt", desc: "State machine models.", content: NS_SIG_012_STATE },
            { id: "sig-runbook", title: "013 Runbook", desc: "Operational procedures.", content: NS_SIG_013_RUNBOOK },
            { id: "sig-datadef", title: "014 Data Defs", desc: "Canonical field definitions.", content: NS_SIG_014_DATADEF },
        ]
    },
    {
        category: "SIM Engine",
        icon: "🔮",
        items: [
            { id: "sim-overview", title: "001 Overview", desc: "Purpose and role of Sim & Scenario Engine.", content: NS_SIM_001_OVERVIEW },
            { id: "sim-taxonomy", title: "002 Taxonomy", desc: "Canonical simulation vocabulary.", content: NS_SIM_002_TAXONOMY },
            { id: "sim-architecture", title: "003 Architecture", desc: "Logical architecture and layers.", content: NS_SIM_003_ARCHITECTURE },
            { id: "sim-lifecycle", title: "004 Lifecycle", desc: "End-to-end simulation flow.", content: NS_SIM_004_LIFECYCLE },
            { id: "sim-decision", title: "005 Decision", desc: "Simulation decision framework.", content: NS_SIM_005_DECISION },
            { id: "sim-version", title: "006 Versioning", desc: "Versioning rules for models and history.", content: NS_SIM_006_VERSION },
            { id: "sim-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_SIM_007_DATAMODEL },
            { id: "sim-eee", title: "008 Example Exec", desc: "End-to-end simulation scenario.", content: NS_SIM_008_EEE },
            { id: "sim-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_SIM_009_IMPL },
            { id: "sim-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_SIM_010_FE },
            { id: "sim-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_SIM_011_APIMAP },
            { id: "sim-state", title: "012 State Mgmt", desc: "State machine models.", content: NS_SIM_012_STATE },
            { id: "sim-runbook", title: "013 Runbook", desc: "Operational procedures.", content: NS_SIM_013_RUNBOOK },
            { id: "sim-datadef", title: "014 Data Defs", desc: "Canonical field definitions.", content: NS_SIM_014_DATADEF },
        ]
    },
    {
        category: "IDN Engine",
        icon: "🆔",
        items: [
            { id: "idn-overview", title: "001 Overview", desc: "Purpose and role of Identity & Entity Nexus.", content: NS_IDN_001_OVERVIEW },
            { id: "idn-taxonomy", title: "002 Taxonomy", desc: "Canonical identity vocabulary.", content: NS_IDN_002_TAXONOMY },
            { id: "idn-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_IDN_003_ARCHITECTURE },
            { id: "idn-lifecycle", title: "004 Lifecycle", desc: "End-to-end identity flow.", content: NS_IDN_004_LIFECYCLE },
            { id: "idn-decision", title: "005 Decision", desc: "Identity decision framework.", content: NS_IDN_005_DECISION },
            { id: "idn-version", title: "006 Versioning", desc: "Versioning rules for identity truth.", content: NS_IDN_006_VERSION },
            { id: "idn-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_IDN_007_DATAMODEL },
            { id: "idn-eee", title: "008 Example Exec", desc: "End-to-end identity scenario.", content: NS_IDN_008_EEE },
            { id: "idn-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_IDN_009_IMPL },
            { id: "idn-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_IDN_010_FE },
            { id: "idn-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_IDN_011_APIMAP },
            { id: "idn-state", title: "012 State Mgmt", desc: "State machine models.", content: NS_IDN_012_STATE },
            { id: "idn-runbook", title: "013 Runbook", desc: "Operational procedures.", content: NS_IDN_013_RUNBOOK },
            { id: "idn-datadef", title: "014 Data Defs", desc: "Canonical field definitions.", content: NS_IDN_014_DATADEF },
        ]
    },
    {
        category: "CDE Engine",
        icon: "📤",
        items: [
            { id: "cde-overview", title: "001 Overview", desc: "Purpose and role of Content Distribution Engine.", content: NS_CDE_001_OVERVIEW },
            { id: "cde-taxonomy", title: "002 Taxonomy", desc: "Canonical distribution vocabulary.", content: NS_CDE_002_TAXONOMY },
            { id: "cde-architecture", title: "003 Architecture", desc: "Logical architecture and subsystems.", content: NS_CDE_003_ARCHITECTURE },
            { id: "cde-lifecycle", title: "004 Lifecycle", desc: "End-to-end distribution flow.", content: NS_CDE_004_LIFECYCLE },
            { id: "cde-decision", title: "005 Decision", desc: "Distribution decision framework.", content: NS_CDE_005_DECISION },
            { id: "cde-version", title: "006 Versioning", desc: "Versioning rules for plans and logic.", content: NS_CDE_006_VERSION },
            { id: "cde-datamodel", title: "007 Data Model", desc: "Authoritative entities and storage.", content: NS_CDE_007_DATAMODEL },
            { id: "cde-eee", title: "008 Example Exec", desc: "End-to-end distribution scenario.", content: NS_CDE_008_EEE },
            { id: "cde-impl", title: "009 Implementation", desc: "MVP service decomposition.", content: NS_CDE_009_IMPL },
            { id: "cde-fe", title: "010 Frontend", desc: "Operator UI specifications.", content: NS_CDE_010_FE },
            { id: "cde-apimap", title: "011 API Map", desc: "Backend API surfaces.", content: NS_CDE_011_APIMAP },
            { id: "cde-state", title: "012 State Mgmt", desc: "State machine models.", content: NS_CDE_012_STATE },
            { id: "cde-runbook", title: "013 Runbook", desc: "Operational procedures.", content: NS_CDE_013_RUNBOOK },
            { id: "cde-datadef", title: "014 Data Defs", desc: "Canonical field definitions.", content: NS_CDE_014_DATADEF },
        ]
    },
    {
        category: "LUM Engine",
        icon: "💡",
        items: [
            { id: "lum-overview", title: "001 Overview", desc: "Purpose and role of Luminance Observability.", content: "# Luminance\n\nOverview coming soon." }
        ]
    },
    {
        category: "CWP Engine",
        icon: "📋",
        items: [
            { id: "cwp-overview", title: "001 Overview", desc: "Critical Workflows & Procedures.", content: "# CWP\n\nOverview coming soon." }
        ]
    },
    {
        category: "BCP Engine",
        icon: "🛡️",
        items: [
            { id: "bcp-overview", title: "001 Overview", desc: "Business Continuity Protocol.", content: "# BCP\n\nOverview coming soon." }
        ]
    },
    {
        category: "BCO Engine",
        icon: "🔄",
        items: [
            { id: "bco-overview", title: "001 Overview", desc: "Business Continuity Operations.", content: "# BCO\n\nOverview coming soon." }
        ]
    },
    {
        category: "CON Engine",
        icon: "🔌",
        items: [
            { id: "con-overview", title: "001 Overview", desc: "Connectors engine.", content: "# Connectors\n\nOverview coming soon." }
        ]
    },
    {
        category: "IPR Engine",
        icon: "📝",
        items: [
            { id: "ipr-overview", title: "001 Overview", desc: "IP Formalization + Registration.", content: "# IPR\n\nOverview coming soon." }
        ]
    },
    {
        category: "OCP Engine",
        icon: "💻",
        items: [
            { id: "ocp-overview", title: "001 Overview", desc: "Onchain Compute Plane.", content: "# OCP\n\nOverview coming soon." }
        ]
    },
    {
        category: "QTN Engine",
        icon: "☣️",
        items: [
            { id: "qtn-overview", title: "001 Overview", desc: "Quarantine Engine.", content: "# QTN\n\nOverview coming soon." }
        ]
    },
    {
        category: "SWB Engine",
        icon: "🎛️",
        items: [
            { id: "swb-overview", title: "001 Overview", desc: "Switchboard Engine.", content: "# SWB\n\nOverview coming soon." }
        ]
    },
    {
        category: "INT Engine",
        icon: "⚡",
        items: [
            { id: "int-charter", title: "000 Charter", desc: "Engine identity and mission.", content: NS_INT_000_CHARTER },
            { id: "int-overview", title: "001 Overview", desc: "Purpose and role of Intervention.", content: NS_INT_001_OVERVIEW },
            { id: "int-decision", title: "005 Decision", desc: "Architectural decisions log.", content: NS_INT_005_DECISION },
        ]
    },
    {
        category: "Architecture",
        icon: "🏗️",
        items: [
            {
                id: "charters-and-boundaries",
                title: "Engine charters & boundaries",
                desc: "Defining the scope and responsibility of every engine. How GGP controls flow.",
                content: `
# NSDC Engine Charter — GGP (Governance Graph Processor)

---

## 0. Overview

- **System Name:** Governance Graph Processor (GGP)  
- **Document Title:** Governance Graph Processor  
- **Document ID:** NS-GGP-000-CHARTER  
- **Version:** 0.1  
- **Prepared By:** Strategy & Governance Office  
- **Approved By:** Parent / HoldCo Manager  
- **Effective Date:** TBD  
- **Review Cycle:** Annual or Upon Material Change  

---

## 1. Engine Identity

- **Engine Name:** Governance Graph Processor  
- **Acronym:** GGP  
- **Engine Type:** Governance / Control  
- **Document Name:** NSDC Engine Charter — GGP (Governance Graph Processor)  
- **Document ID:** NS-GGP-000-CHARTER  

---

## 2. Mission Statement (One Sentence)

This engine exists to define, enforce, and audit governance rules across all NSDC engines in order to ensure compliant, risk-aware, and intentional execution of capital, data, and actions.

---

## 3. Core Responsibilities (Allowed Actions)

- Define governance policies, rules, and constraints  
- Encode approval logic and decision thresholds  
- Enforce capital limits and risk tolerances  
- Gate actions taken by execution engines (e.g., DAT, CDE)  
- Maintain audit trails of decisions and actions  
- Model relationships between entities, engines, permissions, and assets  

---

## 4. Explicit Non-Responsibilities (Forbidden Actions)

- Execute trades, arbitrage, or capital deployment  
- Generate product, market, or signal intelligence  
- Integrate directly with external marketplaces or APIs  
- Create or distribute content  
- Maintain financial ledgers or accounting records  

**GGP governs action — it does not act.**

---

## 5. Inputs (What This Engine Consumes)

| Input                  | Source Engine     | Description                              | Required |
|------------------------|-------------------|------------------------------------------|----------|
| Engine action requests | DAT, CDE, PIE     | Requests to perform governed actions     | ☑        |
| Policy definitions     | Human / Admin     | Governance rules and constraints          | ☑        |
| Entity relationships   | IDN               | Ownership, roles, permissions             | ☑        |
| Risk parameters        | FLO / Admin       | Capital and exposure thresholds           | ☐        |

---

## 6. Outputs (What This Engine Produces)

| Output                       | Target Engine(s) | Description                         | Frequency     |
|------------------------------|------------------|-------------------------------------|---------------|
| Approval / denial decisions  | DAT, CDE         | Permissioned action outcomes        | Real-time     |
| Governance rulesets          | All engines      | Enforced policies                   | On change     |
| Audit logs                   | FLO / Admin      | Immutable decision records          | Continuous    |
| Risk alerts                  | Admin / PIE      | Threshold breaches                  | Event-driven  |

---

## 7. Authority & Decision Rights

### GGP May Decide Autonomously
- Whether an action is allowed under current policy  
- Whether capital limits or risk thresholds are exceeded  
- Whether approvals are required or can be bypassed  

### GGP Must Not Decide
- What opportunities to pursue  
- Which products to build or source  
- When to execute arbitrage (only whether it is permitted)  

**GGP is the arbiter, not the strategist.**

---

## 8. Governance & Constraints (Self-Governance)

- All policies must be versioned  
- Rule changes must be auditable  
- Emergency override paths must be explicit  
- No silent policy mutation allowed  
- Human override is possible but logged  

**GGP is itself governed by traceability and reversibility.**

---

## 9. Failure Modes & Blast Radius

### Expected Failures
- Over-restrictive policies blocking execution  
- Misconfigured thresholds  
- 

### Worst-Case Failure
- Unauthorized action allowed or valid action blocked  

### Blast Radius
- System-wide decision paralysis or exposure  
- No direct financial loss without downstream engine action  

### Containment Strategy
- Fail closed by default  
- Manual override with audit trail  

---

## 10. Time Horizon & Optimization Target

- **Optimizes for:** Risk reduction, compliance, and correctness  
- **Time Horizon:** Real-time enforcement with long-term auditability  

**Speed is secondary to correctness.**

---

## 11. Interfaces & Shared Primitives

GGP relies on shared primitives including:

- Canonical entity IDs (IDN)  
- Engine identifiers  
- Policy IDs  
- Action request schemas  
- Audit log entries  

**GGP never owns the primitive — it references them.**

---

## 12. MVP Boundary (Non-Negotiable)

### MVP Includes
- Rule definition framework  
- Action approval / denial flow  
- Audit logging  
- Integration with DAT and CDE  

### MVP Excludes (Even If Easy)
- Predictive risk modeling  
- ML-based policy optimization  
- Automated regulatory interpretation  

---

## 13. Evolution Path (Conceptual Only)

- **Phase 1:** Static rules + manual approvals  
- **Phase 2:** Dynamic policies tied to capital and exposure  
- **Phase 3:** Graph-based governance with conditional delegation  

---

## 14. Engine Status

- ☑ Concept  
- ☐ Defined  
- ☐ Approved  
- ☐ MVP  
- ☐ Production  
- ☐ Deprecated  
`
            },
            {
                id: "data-model",
                title: "Data model (PostgreSQL + Mongo)",
                desc: "Hybrid persistence strategy for relational and document data.",
                content: "Detailed data model documentation coming soon..."
            },
            {
                id: "hybrid-implementation",
                title: "Hybrid Implementation (Python/C++)",
                desc: "Dual-language engine architecture for performance and flexibility.",
                content: "Documentation on the Python/C++ hybrid approach coming soon..."
            },
            {
                id: "events-and-topics",
                title: "Event envelope + topic contracts",
                desc: "Standardized message formats for Kafka/EventBridge.",
                content: "Event schema documentation coming soon..."
            },
        ]
    },
    {
        category: "Reliability",
        icon: "🛡️",
        items: [
            {
                id: "idempotency-retry-dlq",
                title: "Idempotency + retry + DLQ standards",
                desc: "Ensuring exactly-once processing and failure handling.",
                content: "Reliability standards documentation coming soon..."
            },
            {
                id: "deployment-topology",
                title: "Deployment topology",
                desc: "PowerEdge + Container strategy for on-prem/cloud hybrid.",
                content: "Deployment guides coming soon..."
            },
        ]
    },
    {
        category: "Security",
        icon: "🔒",
        items: [
            {
                id: "security",
                title: "Security + IP lockdown strategy",
                desc: "Zero-trust networking and intellectual property protection.",
                content: "Security protocols coming soon..."
            },
        ]
    },
    {
        category: "Cryptography",
        icon: "🗝️",
        items: [
            { id: "jrn-architecture", title: "Sanctum Journal", desc: "AES-256 Rotational Cryptography Architecture.", content: NS_JRN_001_OVERVIEW }
        ]
    }
];

export const getDoc = (id) => {
    for (const section of DOCS_REGISTRY) {
        const found = section.items.find(item => item.id === id);
        if (found) return found;
    }
    return null;
};
