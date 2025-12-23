export const NS_MASTER_DETAILED = `
graph TD
    %% ==========================================
    %% GLOBAL STYLES
    %% ==========================================
    classDef engine fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000000;
    classDef storage fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef ingest fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;
    classDef external fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;

    %% =================================================================================================
    %% 1. MUX - Market Integration Exchange (Internal Detail)
    %% =================================================================================================
    subgraph MUX [MUX - Market Integration]
        direction TB
        subgraph MUX_Conn [Connector Layer]
            MUX_ConnMgr[Connector Manager]:::ingest
            MUX_Worker[Connector Workers]:::ingest
        end
        subgraph MUX_Ing [Ingress & Capture]
            MUX_IngressGW[Ingress Gateway]:::ingest
            MUX_CaptureStore[(Raw Capture Store)]:::storage
        end
        subgraph MUX_Proc [Processing]
            MUX_Norm[Normalization Engine]:::logic
            MUX_Integrity[Integrity & Dedupe]:::logic
        end
        subgraph MUX_Core [Artifact Core]
            MUX_ArtStore[(Canonical Artifact Store)]:::storage
            MUX_Replay[Replay & Backfill]:::logic
        end
        subgraph MUX_Dist [Distribution]
            MUX_Pub[Event Publisher]:::output
            MUX_Query[Query API]:::output
        end

        MUX_ConnMgr --> MUX_Worker
        MUX_Worker --> MUX_CaptureStore
        MUX_IngressGW --> MUX_CaptureStore
        MUX_CaptureStore --> MUX_Norm
        MUX_Norm --> MUX_Integrity
        MUX_Integrity --> MUX_ArtStore
        MUX_ArtStore --> MUX_Pub
        MUX_Replay --> MUX_CaptureStore
        MUX_Replay --> MUX_Pub
        MUX_Query --> MUX_ArtStore
    end

    %% =================================================================================================
    %% 2. SIG - Signal Aggregation (Internal Detail)
    %% =================================================================================================
    subgraph SIG [SIG - Signal Aggregation]
        direction TB
        subgraph SIG_Ing [Ingress]
            SIG_Adapters[Input Adapters]:::ingest
            SIG_RawStore[(Raw Capture Store)]:::storage
        end
        subgraph SIG_Proc [Processing Core]
            SIG_Norm[Normalization Engine]:::logic
            SIG_Score[Trust & Confidence Scoring]:::logic
            SIG_Decay[Decay Engine]:::logic
            SIG_Dedupe[Dedupe & Consistency]:::logic
        end
        subgraph SIG_Stor [Signal Persistence]
            SIG_CanStore[(Canonical Signal Store)]:::storage
            SIG_AggStore[(Derived Aggregates)]:::storage
        end
        subgraph SIG_Anal [Aggregation]
            SIG_AggEng[Aggregation Engine]:::logic
            SIG_CorrEng[Correlation Engine]:::logic
        end
        subgraph SIG_Dist [Distribution]
            SIG_Pub[Signal Publisher]:::output
            SIG_Query[Query API]:::output
        end

        SIG_Adapters --> SIG_RawStore
        SIG_Adapters --> SIG_Norm
        SIG_Norm --> SIG_Score
        SIG_Score --> SIG_Decay
        SIG_Decay --> SIG_Dedupe
        SIG_Dedupe --> SIG_CanStore
        SIG_CanStore --> SIG_AggEng
        SIG_CanStore --> SIG_CorrEng
        SIG_AggEng --> SIG_AggStore
        SIG_CorrEng --> SIG_AggStore
        SIG_CanStore --> SIG_Pub
        SIG_AggStore --> SIG_Pub
        SIG_Query --> SIG_CanStore
    end

    %% =================================================================================================
    %% 3. IDN - Identity Nexus (Internal Detail)
    %% =================================================================================================
    subgraph IDN [IDN - Identity Nexus]
        direction TB
        subgraph IDN_Ing [Ingress]
            IDN_API[Ingress API]:::ingest
            IDN_Val[Validator]:::ingest
        end
        subgraph IDN_Core [Core Logic]
            IDN_Res[Identifier Resolution]:::logic
            IDN_RegMgr[Registry Manager]:::logic
            IDN_Graph[Graph Manager]:::logic
        end
        subgraph IDN_Audit [Event Ledger]
            IDN_Log[Event Logger]:::logic
            IDN_DecStore[(Decision Artifacts)]:::storage
        end
        subgraph IDN_Stor [Persistence]
            IDN_PG[(PostgreSQL Registry)]:::storage
            IDN_Redis[(Redis Cache)]:::storage
        end
        subgraph IDN_Read [Projections]
            IDN_Proj[Read Projector]:::logic
            IDN_QueryAPI[Query & Lookup API]:::output
        end

        IDN_API --> IDN_Val
        IDN_Val --> IDN_RegMgr
        IDN_Val --> IDN_Res
        IDN_RegMgr --> IDN_Log
        IDN_Res --> IDN_Log
        IDN_Graph --> IDN_Log
        IDN_Log --> IDN_PG
        IDN_DecStore --> IDN_PG
        IDN_PG --> IDN_Proj
        IDN_Proj --> IDN_Redis
        IDN_QueryAPI --> IDN_Redis
        IDN_QueryAPI --> IDN_PG
    end

    %% =================================================================================================
    %% 4. FLO - Financial Ledger (Internal Detail)
    %% =================================================================================================
    subgraph FLO [FLO - Financial Ledger]
        direction TB
        subgraph FLO_Ing [Ingest]
            FLO_EvIng[Event Ingest]:::ingest
            FLO_StmtIng[Statement Ingest]:::ingest
        end
        subgraph FLO_Norm [Classify]
            FLO_NormEng[Normalizer]:::logic
            FLO_Class[Classifier]:::logic
        end
        subgraph FLO_Core [Ledger Core]
            FLO_Writer[Ledger Writer]:::logic
            FLO_Budget[Budget Engine]:::logic
        end
        subgraph FLO_Rec [Reconciliation]
            FLO_Recon[Recon Engine]:::logic
            FLO_EvLink[Evidence Linker]:::logic
        end
        subgraph FLO_Stor [Persistence]
            FLO_PG[(Ledger DB)]:::storage
            FLO_RecStore[(Recon Store)]:::storage
            FLO_ReadStore[(Read Models)]:::storage
        end
        subgraph FLO_Rep [Reporting]
            FLO_Builder[Read Model Builder]:::logic
            FLO_API[Reporting API]:::output
        end

        FLO_EvIng --> FLO_NormEng
        FLO_NormEng --> FLO_Class
        FLO_Class --> FLO_Writer
        FLO_StmtIng --> FLO_RecStore
        FLO_Writer --> FLO_PG
        FLO_Writer --> FLO_Budget
        FLO_PG --> FLO_Recon
        FLO_RecStore --> FLO_Recon
        FLO_Recon --> FLO_RecStore
        FLO_PG --> FLO_Builder
        FLO_Builder --> FLO_ReadStore
        FLO_ReadStore --> FLO_API
        FLO_EvLink --> FLO_Writer
    end

    %% =================================================================================================
    %% 5. DRE - Deep Research (Internal Detail)
    %% =================================================================================================
    subgraph DRE [DRE - Deep Research]
        direction TB
        subgraph DRE_Col [Collection]
            DRE_Crawl[Crawlers/Agents]:::ingest
            DRE_Mon[Source Monitor]:::ingest
            DRE_Print[Fingerprinter]:::ingest
        end
        subgraph DRE_KB [Knowledge Base]
            DRE_EvStore[(Evidence Store)]:::storage
            DRE_Graph[(Knowledge Graph)]:::storage
            DRE_Cite[Citation Engine]:::logic
        end
        subgraph DRE_Syn [Synthesis]
            DRE_Clust[Cluster Engine]:::logic
            DRE_Hypo[Hypothesis Mgr]:::logic
            DRE_Conf[Confidence Updater]:::logic
            DRE_Narr[Narrative Composer]:::logic
        end
        subgraph DRE_Gov [Governance]
            DRE_Prom[Promotion Coord]:::logic
            DRE_Ver[Versioning]:::logic
        end
        DRE_API[DRE Query API]:::output

        DRE_Mon --> DRE_Crawl
        DRE_Crawl --> DRE_Print
        DRE_Print --> DRE_EvStore
        DRE_EvStore --> DRE_Graph
        DRE_Cite --> DRE_EvStore
        DRE_EvStore --> DRE_Clust
        DRE_Clust --> DRE_Hypo
        DRE_Hypo --> DRE_Conf
        DRE_Conf --> DRE_Hypo
        DRE_Hypo --> DRE_Narr
        DRE_Narr --> DRE_Ver
        DRE_Ver --> DRE_Prom
        DRE_Prom --> DRE_API
    end

    %% =================================================================================================
    %% 6. PIE - Predictive Insights (Internal Detail)
    %% =================================================================================================
    subgraph PIE [PIE - Predictive Insights]
        direction TB
        subgraph PIE_Int [Intake]
            PIE_SigAdp[Signal Adapter]:::ingest
            PIE_DreAdp[Research Adapter]:::ingest
            PIE_Ctx[Context Assembly]:::logic
        end
        subgraph PIE_Gen [Generation]
            PIE_IG[Insight Generator]:::logic
            PIE_Cand[Candidate Insight]:::logic
        end
        subgraph PIE_Log [Scoring Logic]
            PIE_Score[Scoring Svc]:::logic
            PIE_Risk[Risk Profiler]:::logic
            PIE_Decay[Decay Mgr]:::logic
        end
        subgraph PIE_Narr [Narrative]
            PIE_Expl[Explainability]:::logic
            PIE_Story[Narrative Gen]:::logic
        end
        subgraph PIE_Out [Output]
            PIE_Pub[Publisher]:::output
            PIE_Kill[Kill Switch]:::output
        end
        PIE_PG[(PIE Store)]:::storage

        PIE_SigAdp --> PIE_Ctx
        PIE_DreAdp --> PIE_Ctx
        PIE_Ctx --> PIE_IG
        PIE_IG --> PIE_Cand
        PIE_Cand --> PIE_PG
        PIE_Cand --> PIE_Score
        PIE_Cand --> PIE_Risk
        PIE_Cand --> PIE_Decay
        PIE_Score --> PIE_Story
        PIE_Risk --> PIE_Story
        PIE_Decay --> PIE_Pub
        PIE_Story --> PIE_Pub
        PIE_Expl --> PIE_Pub
        PIE_Pub --> PIE_PG
    end

    %% =================================================================================================
    %% 7. DAT - Decision & Tasking (Internal Detail)
    %% =================================================================================================
    subgraph DAT [DAT - Decision & Tasking]
        direction TB
        subgraph DAT_Ctl [Control Plane]
            DAT_Plan[Plan Builder]:::logic
            DAT_Reg[Plan Registry]:::storage
        end
        subgraph DAT_Exec [Execution Plane]
            DAT_Orch[Orchestrator]:::logic
            DAT_Step[Step Runner]:::logic
            DAT_Roll[Rollback Coord]:::logic
        end
        subgraph DAT_Grd [Runtime Guards]
            DAT_Constr[Constraint Engine]:::logic
            DAT_Budget[Budget Tracker]:::logic
        end
        subgraph DAT_Ext [Connectors]
            DAT_Conn[Connector Layer]:::output
        end
        DAT_PG[(DAT DB)]:::storage
        DAT_Log[(Event Log)]:::storage
        DAT_Redis[(Runtime Redis)]:::storage

        DAT_Plan --> DAT_Reg
        DAT_Reg --> DAT_Orch
        DAT_Orch --> DAT_Redis
        DAT_Orch --> DAT_Constr
        DAT_Orch --> DAT_Budget
        DAT_Orch --> DAT_Step
        DAT_Step --> DAT_Conn
        DAT_Step --> DAT_Roll
        DAT_Roll --> DAT_Conn
        DAT_Step --> DAT_Log
        DAT_Reg --> DAT_PG
    end

    %% =================================================================================================
    %% 8. CDE - Content Distribution (Internal Detail)
    %% =================================================================================================
    subgraph CDE [CDE - Content Distribution]
        direction TB
        subgraph CDE_In [Intake]
            CDE_Val[Plan Validator]:::ingest
            CDE_API[Intake API]:::ingest
        end
        subgraph CDE_Orch [Orchestration]
            CDE_Intent_Fact[Intent Factory]:::logic
            CDE_Intent[Immutable Intent]:::logic
        end
        subgraph CDE_Disp [Dispatcher]
            CDE_Sched[Scheduler]:::logic
            CDE_SM[State Machine]:::logic
            CDE_Idem[Idempotency Check]:::logic
        end
        subgraph CDE_Mux [Adapters]
            CDE_Adp[Adapter Interface]:::output
        end
        subgraph CDE_Proof [Proof]
            CDE_ProofCap[Proof Capture]:::logic
            CDE_FeedIng[Feedback Ingest]:::ingest
        end
        CDE_PG[(CDE DB)]:::storage

        CDE_API --> CDE_Val
        CDE_Val --> CDE_Intent_Fact
        CDE_Intent_Fact --> CDE_Intent
        CDE_Intent --> CDE_PG
        CDE_Intent --> CDE_Sched
        CDE_Sched --> CDE_SM
        CDE_SM --> CDE_Idem
        CDE_Idem --> CDE_Adp
        CDE_Adp --> CDE_ProofCap
        CDE_ProofCap --> CDE_PG
        CDE_ProofCap --> CDE_FeedIng
    end

    %% =================================================================================================
    %% 9. CWP - Contingent Workforce (Internal Detail)
    %% =================================================================================================
    subgraph CWP [CWP - Contingent Workforce]
        direction TB
        subgraph CWP_Def [Definition]
            CWP_WReg[Work Registry]:::storage
            CWP_Fact[Work Factory]:::logic
        end
        subgraph CWP_Ag [Agent Mgmt]
            CWP_AReg[Agent Registry]:::storage
            CWP_Cap[Capability Resolver]:::logic
        end
        subgraph CWP_Sch [Scheduling]
            CWP_Sched[Scheduler]:::logic
            CWP_Asgn[Assignment Engine]:::logic
            CWP_SLA[SLA Enforcer]:::logic
        end
        subgraph CWP_Sup [Supervision]
            CWP_Super[Supervisor]:::logic
            CWP_Stall[Stall Detector]:::logic
        end
        subgraph CWP_Rev [Review]
            CWP_Chk[Checkpoint Mgr]:::logic
            CWP_Esc[Escalation Router]:::logic
        end

        CWP_Fact --> CWP_WReg
        CWP_AReg --> CWP_Cap
        CWP_Cap --> CWP_Asgn
        CWP_Sched --> CWP_Asgn
        CWP_Asgn --> CWP_WReg
        CWP_WReg --> CWP_Super
        CWP_Super --> CWP_SLA
        CWP_SLA --> CWP_Stall
        CWP_Stall --> CWP_Esc
        CWP_Super --> CWP_Chk
    end

    %% =================================================================================================
    %% 10. SIM - Simulation (Internal Detail)
    %% =================================================================================================
    subgraph SIM [SIM - Simulation]
        direction TB
        subgraph SIM_In [Input Assembly]
            SIM_IMgr[Input Manager]:::ingest
            SIM_Snap[Snapshot Engine]:::logic
        end
        subgraph SIM_Con [Construction]
            SIM_Bldr[Scenario Builder]:::logic
            SIM_Assump[Assumption Mgr]:::logic
            SIM_Const[Constraint Mgr]:::logic
        end
        subgraph SIM_Exec [Execution]
            SIM_Eng[Sim Engine]:::logic
            SIM_Time[Time Stepper]:::logic
            SIM_Model[Model Registry]:::logic
        end
        subgraph SIM_Res [Results]
            SIM_DefStore[(Scenario Defs)]:::storage
            SIM_ResStore[(Sim Results)]:::storage
        end
        SIM_API[Dist API]:::output

        SIM_IMgr --> SIM_Snap
        SIM_Snap --> SIM_Bldr
        SIM_Assump --> SIM_Bldr
        SIM_Const --> SIM_Bldr
        SIM_Bldr --> SIM_DefStore
        SIM_DefStore --> SIM_Eng
        SIM_Model --> SIM_Eng
        SIM_Eng --> SIM_Time
        SIM_Time --> SIM_Eng
        SIM_Eng --> SIM_ResStore
        SIM_ResStore --> SIM_API
    end

    %% =================================================================================================
    %% 11. INT - Intervention (Internal Detail)
    %% =================================================================================================
    subgraph INT [INT - Intervention]
        direction TB
        subgraph INT_Core [Core Cluster]
            INT_IGW[Ingest GW]:::ingest
            INT_Router[Router]:::logic
            INT_Log[(Immutable Event Log)]:::storage
            INT_Proj[Projectors]:::logic
            INT_Stream[Stream GW]:::output
            INT_Mat[(Materialized State)]:::storage
        end
        subgraph INT_Edge [Edge / Sidecar]
            INT_LocalCache[(Local Cache)]:::storage
            INT_Sync[Delta Sync]:::logic
            INT_EdgeAPI[Edge API]:::output
        end

        INT_EdgeAPI --> INT_IGW
        INT_IGW --> INT_Router
        INT_Router --> INT_Log
        INT_Log --> INT_Proj
        INT_Proj --> INT_Mat
        INT_Proj --> INT_Stream
        INT_Stream --> INT_Sync
        INT_Sync --> INT_LocalCache
    end

    %% =================================================================================================
    %% 12. LUM - Luminance (Internal Detail)
    %% =================================================================================================
    subgraph LUM [LUM - Observability]
        direction TB
        subgraph LUM_Col [Collection]
            LUM_Agent[Agent/SDK]:::ingest
            LUM_Web[Webhook Bridge]:::ingest
        end
        subgraph LUM_Proc [Processing]
            LUM_Schema[Schema Registry]:::logic
            LUM_Redact[Redactor]:::logic
            LUM_Enrich[Enricher]:::logic
            LUM_Route[Router]:::logic
        end
        subgraph LUM_Pipe [Pipelines]
            LUM_PLog[Logs]
            LUM_PMet[Metrics]
            LUM_PTrc[Trace]
            LUM_PAud[Audit]
        end
        subgraph LUM_Store [Tiered Storage]
            LUM_Hot[(Hot Store)]:::storage
            LUM_TSDB[(Metrics TSDB)]:::storage
            LUM_Warm[(Warm Archive)]:::storage
            LUM_Evid[(Evidence Store)]:::storage
        end
        subgraph LUM_Act [Action]
            LUM_Alert[Alert Engine]:::logic
            LUM_Inc[Incident Mgr]:::output
        end

        LUM_Agent --> LUM_Schema
        LUM_Web --> LUM_Schema
        LUM_Schema --> LUM_Redact
        LUM_Redact --> LUM_Enrich
        LUM_Enrich --> LUM_Route
        LUM_Route --> LUM_PLog
        LUM_Route --> LUM_PMet
        LUM_Route --> LUM_PTrc
        LUM_Route --> LUM_PAud
        LUM_PLog --> LUM_Hot
        LUM_PMet --> LUM_TSDB
        LUM_PTrc --> LUM_Hot
        LUM_PAud --> LUM_Evid
        LUM_Hot --> LUM_Alert
        LUM_TSDB --> LUM_Alert
        LUM_Alert --> LUM_Inc
    end

    %% =================================================================================================
    %% 13. GGP - Global Governance (Internal Detail)
    %% =================================================================================================
    subgraph GGP [GGP - Global Governance]
        direction TB
        subgraph GGP_Core [Core Logic]
            GGP_DGE[Dependency Graph]:::logic
            GGP_UDE[Update Decision Engine]:::logic
            GGP_WVE[Workflow Versioning]:::logic
            GGP_SOPC[SOP Compiler]:::logic
        end
        subgraph GGP_Store [Persistence]
            GGP_PG[(System of Record)]:::storage
            GGP_Mongo[(Read Models)]:::storage
        end
        subgraph GGP_Bus [Event Backbone]
            GGP_Out[Outbox]:::output
            GGP_Pub[Publisher]:::output
            GGP_Kafka{Kafka}:::external
        end

        GGP_WVE --> GGP_DGE
        GGP_WVE --> GGP_UDE
        GGP_WVE --> GGP_SOPC
        GGP_WVE --> GGP_PG
        GGP_WVE --> GGP_Out
        GGP_Out --> GGP_Pub
        GGP_Pub --> GGP_Kafka
    end

    %% =================================================================================================
    %% 14. BCP - Blockchain Plane (Internal Detail)
    %% =================================================================================================
    subgraph BCP [BCP - Blockchain Plane]
        direction TB
        subgraph BCP_Rel [Release]
            BCP_CD[CD Orchestrator]:::logic
            BCP_Reg[Contract Registry]:::storage
            BCP_Pol[Policy Engine]:::logic
        end
        subgraph BCP_RT [Runtime]
            BCP_RPC[RPC Providers]:::external
            BCP_Chain[(Blockchains)]:::external
            BCP_Idx[Indexers]:::ingest
        end

        BCP_Pol --> BCP_CD
        BCP_CD --> BCP_Reg
        BCP_CD --> BCP_RPC
        BCP_RPC --> BCP_Chain
        BCP_Chain --> BCP_Idx
    end

    %% =================================================================================================
    %% CROSS-ENGINE MEGA CONNECTIONS
    %% =================================================================================================

    %% MUX Feeds the World
    MUX_Pub -->|Artifacts| SIG_Adapters
    MUX_Pub -->|Statements| FLO_StmtIng
    MUX_Pub -->|Receipts| CDE_Adp

    %% SIG Feeds Intelligence
    SIG_Pub -->|Signals| DRE_Mon
    SIG_Pub -->|Signals| PIE_SigAdp
    SIG_Pub -->|Signals| SIM_IMgr
    SIG_Pub -->|Signals| CWP_Super

    %% DRE Feeds Insight
    DRE_API -->|Research| PIE_DreAdp
    DRE_API -->|Assumptions| SIM_Assump

    %% PIE Feeds Decision
    PIE_Pub -->|Insight| GGP_UDE
    PIE_Pub -->|Insight| DAT_Plan

    %% IDN Identity Resolution (referenced everywhere)
    IDN_QueryAPI -.->|Resolve| MUX_Norm
    IDN_QueryAPI -.->|Resolve| SIG_Norm
    IDN_QueryAPI -.->|Resolve| FLO_Class
    IDN_QueryAPI -.->|Auth| CWP_AReg

    %% GGP Governance Gates (The Great Filter)
    GGP_Pub -.->|Policy| CDE_Val
    GGP_Pub -.->|Policy| DAT_Plan
    GGP_Pub -.->|Policy| DRE_Prom
    GGP_Pub -.->|Policy| FLO_Budget
    GGP_Pub -.->|Policy| BCP_Pol
    GGP_Pub -.->|Policy| INT_Router

    %% FLO Financial Constraints
    FLO_API -->|Budget| DAT_Budget
    FLO_API -->|Report| GGP_UDE

    %% DAT Execution Drive
    DAT_Conn -->|Webhook| MUX_IngressGW
    DAT_Conn -->|Task| CWP_Fact
    DAT_Conn -->|Publish| CDE_API

    %% CDE Distribution
    CDE_Adp -->|External Push| MUX_IngressGW

    %% CWP Workforce
    CWP_Esc -->|Escalation| GGP_UDE
    CWP_Fact -->|Research Mission| DRE_Crawl

    %% BCP Data
    BCP_Idx -->|On-Chain Event| SIG_Adapters
    BCP_Idx -->|Tx History| FLO_EvIng

    %% LUM Panopticon (Observes All)
    MUX_Pub -.->|Telem| LUM_Agent
    SIG_Pub -.->|Telem| LUM_Agent
    FLO_API -.->|Telem| LUM_Agent
    DAT_Step -.->|Telem| LUM_Agent
    INT_Stream -.->|Telem| LUM_Agent
    GGP_Pub -.->|Telem| LUM_Agent

    %% INT Intervention (The Nervous System)
    INT_Stream -->|Realtime Update| GGP_UDE
    INT_Stream -->|Realtime Update| DAT_Orch
    INT_EdgeAPI -->|User Action| DAT_Orch

    %% External World
    World[External World]:::external
    World -->|Webhook| MUX_IngressGW
    World -->|User Input| INT_IGW
`;
