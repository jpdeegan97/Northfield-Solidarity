export const NS_MASTER_ABSTRACTED = `
flowchart TD

    %% ==========================================
    classDef engine fill:#e3f2fd,stroke:#1565c0,stroke-width:3px,color:#000000
    classDef storage fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000
    classDef ingest fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000
    classDef external fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000

    %% ==========================================
    %% 1. MUX - Market Integration Exchange
    %% ==========================================
    subgraph MUX [MUX - Market Integration]
        direction TB
        MUX_Ingress[Ingress GW]:::ingest
        MUX_Core[Normalization]:::logic
        MUX_Store[(Artifact Store)]:::storage
        MUX_Pub[Publisher]:::output
        
        MUX_Ingress --> MUX_Core --> MUX_Store --> MUX_Pub
    end

    %% ==========================================
    %% 2. SIG - Signal Aggregation
    %% ==========================================
    subgraph SIG [SIG - Signal Aggregation]
        direction TB
        SIG_Ingress[Adapters]:::ingest
        SIG_Core[Norm & Score]:::logic
        SIG_Store[(Canonical Signal Store)]:::storage
        SIG_Agg[Aggregation]:::logic
        SIG_Pub[Publisher]:::output

        SIG_Ingress --> SIG_Core --> SIG_Store --> SIG_Agg --> SIG_Pub
        SIG_Store --> SIG_Pub
    end

    %% ==========================================
    %% 3. IDN - Identity & Nexus
    %% ==========================================
    subgraph IDN [IDN - Identity Nexus]
        direction TB
        IDN_Core[Resolution Engine]:::logic
        IDN_Store[(Identity Registry)]:::storage
        IDN_Query[Query API]:::output

        IDN_Core --> IDN_Store --> IDN_Query
    end

    %% ==========================================
    %% 4. FLO - Financial Ledger
    %% ==========================================
    subgraph FLO [FLO - Financial Ledger]
        direction TB
        FLO_Ingress[Event Ingest]:::ingest
        FLO_Core[Ledger Writer]:::logic
        FLO_Store[(Ledger DB)]:::storage
        FLO_Budget[Budget Engine]:::logic
        FLO_Query[Reporting API]:::output

        FLO_Ingress --> FLO_Core --> FLO_Store --> FLO_Budget --> FLO_Query
    end

    %% ==========================================
    %% 5. DRE - Deep Research Engine
    %% ==========================================
    subgraph DRE [DRE - Deep Research]
        direction TB
        DRE_Ingest[Crawlers/Ingest]:::ingest
        DRE_Know[Knowledge Graph]:::storage
        DRE_Synth[Synthesis]:::logic
        DRE_Pub[API]:::output

        DRE_Ingest --> DRE_Know --> DRE_Synth --> DRE_Pub
    end

    %% ==========================================
    %% 6. PIE - Predictive Insight Engine
    %% ==========================================
    subgraph PIE [PIE - Predictive Insights]
        direction TB
        PIE_Ingest[Intake]:::ingest
        PIE_Gen[Insight Generator]:::logic
        PIE_Store[(Insight Store)]:::storage
        PIE_Pub[Publisher]:::output

        PIE_Ingest --> PIE_Gen --> PIE_Store --> PIE_Pub
    end

    %% ==========================================
    %% 7. DAT - Decision & Tasking
    %% ==========================================
    subgraph DAT [DAT - Decision & Tasking]
        direction TB
        DAT_Plan[Plan Builder]:::logic
        DAT_Orch[Orchestrator]:::logic
        DAT_Store[(Plan Registry)]:::storage
        DAT_Exec[Step Runner]:::output

        DAT_Plan --> DAT_Store --> DAT_Orch --> DAT_Exec
    end

    %% ==========================================
    %% 8. CDE - Content Distribution
    %% ==========================================
    subgraph CDE [CDE - Content Distribution]
        direction TB
        CDE_Intake[Plan Validator]:::ingest
        CDE_Orch[Intent Factory]:::logic
        CDE_Disp[Dispatcher]:::output

        CDE_Intake --> CDE_Orch --> CDE_Disp
    end

    %% ==========================================
    %% 9. CWP - Contingent Workforce
    %% ==========================================
    subgraph CWP [CWP - Workforce]
        direction TB
        CWP_Reg[Registry]:::storage
        CWP_Assign[Assignment Engine]:::logic
        CWP_Sup[Supervisor]:::logic

        CWP_Reg --> CWP_Assign --> CWP_Sup
    end

    %% ==========================================
    %% 10. SIM - Simulation
    %% ==========================================
    subgraph SIM [SIM - Simulation]
        direction TB
        SIM_Input[Input Assembly]:::ingest
        SIM_Core[Sim Engine]:::logic
        SIM_Store[(Results)]:::storage

        SIM_Input --> SIM_Core --> SIM_Store
    end

    %% ==========================================
    %% 11. INT - Intervention
    %% ==========================================
    subgraph INT [INT - Intervention]
        direction TB
        INT_Ingress[Ingest GW]:::ingest
        INT_Store[(Event Log)]:::storage
        INT_Proj[Projections]:::logic
        INT_Stream[Stream GW]:::output

        INT_Ingress --> INT_Store --> INT_Proj --> INT_Stream
    end

    %% ==========================================
    %% 12. LUM - Luminance (Observability)
    %% ==========================================
    subgraph LUM [LUM - Observability]
        direction TB
        LUM_Col[Collector]:::ingest
        LUM_Proc[Norm & Enrich]:::logic
        LUM_Store[(Telemetry Store)]:::storage
        LUM_Alert[Alert Engine]:::output

        LUM_Col --> LUM_Proc --> LUM_Store --> LUM_Alert
    end

    %% ==========================================
    %% 13. GGP - Global Governance
    %% ==========================================
    subgraph GGP [GGP - Global Governance]
        direction TB
        GGP_Rules[Rule Engine]:::logic
        GGP_Decide[Decision Engine]:::logic
        GGP_Store[(Poly Store)]:::storage
        GGP_Outbox[Outbox]:::output

        GGP_Rules --> GGP_Decide --> GGP_Store --> GGP_Outbox
    end

    %% ==========================================
    %% 14. BCP - Blockchain Plane
    %% ==========================================
    subgraph BCP [BCP - Blockchain Plane]
        direction TB
        BCP_Rel[Release Orch]:::logic
        BCP_Chain[(Blockchains)]:::external
        BCP_Idx[Indexer]:::ingest
        
        BCP_Rel --> BCP_Chain --> BCP_Idx
    end

    %% ==========================================
    %% CROSS-ENGINE CONNECTIONS
    %% ==========================================

    %% MUX Feeds
    MUX_Pub -->|Artifacts| SIG_Ingress
    MUX_Pub -->|Statements| FLO_Ingress
    MUX_Pub -->|Proofs| CDE_Intake

    %% SIG Feeds
    SIG_Pub -->|Signals| DRE_Ingest
    SIG_Pub -->|Signals| PIE_Ingest
    SIG_Pub -->|Signals| SIM_Input
    SIG_Pub -->|Signals| CWP_Sup

    %% DRE Feeds
    DRE_Pub -->|Intel| PIE_Ingest
    DRE_Pub -->|Assumptions| SIM_Input

    %% PIE Feeds
    PIE_Pub -->|Insights| GGP_Decide
    PIE_Pub -->|Insights| DAT_Plan
    
    %% IDN Identity
    IDN_Query -.->|Identity| GGP_Decide
    IDN_Query -.->|Auth| CWP_Reg
    IDN_Query -.->|Auth| FLO_Core

    %% GGP Governance Gates
    GGP_Outbox -.->|Policy| CDE_Orch
    GGP_Outbox -.->|Policy| DAT_Orch
    GGP_Outbox -.->|Policy| DRE_Ingest
    GGP_Outbox -.->|Policy| FLO_Budget
    GGP_Outbox -.->|Policy| BCP_Rel

    %% FLO Financials
    FLO_Query -->|Budget| DAT_Orch
    FLO_Query -->|Report| GGP_Decide

    %% DAT Execution & Tasking
    DAT_Exec -->|Action| MUX_Ingress
    DAT_Exec -->|Task| CWP_Assign
    DAT_Exec -->|Content| CDE_Intake

    %% CDE Distribution
    CDE_Disp -->|Adapter| MUX_Ingress

    %% BCP Blockchain Data
    BCP_Idx -->|OnChain Data| SIG_Ingress
    BCP_Idx -->|Tx History| FLO_Ingress

    %% LUM Observability (Observes All)
    MUX_Pub -.->|Logs| LUM_Col
    SIG_Pub -.->|Logs| LUM_Col
    FLO_Query -.->|Logs| LUM_Col
    DAT_Exec -.->|Telemetry| LUM_Col
    INT_Stream -.->|Events| LUM_Col
    
    %% INT Interventions
    INT_Stream -->|Updates| GGP_Decide
    
    %% External Inputs
    External[External World]:::external -->|Webhooks| MUX_Ingress
    External -->|Manual| INT_Ingress
`;
