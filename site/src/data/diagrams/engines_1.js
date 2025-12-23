export const NS_GGP_FLOW = `
flowchart TB

 subgraph FE["Frontend Layer"]
        UI["React Frontend MVP\n(Read-Only Audit & History)"]
  end
 subgraph API["API Layer"]
        ReadAPI["Read API\n(Backend-for-Frontend)"]
        WriteAPI["Write API\n(Internal/Trigger)"]
  end
 subgraph Core["Core Logic & Engines"]
        DGE["Dependency Graph Engine"]
        UDE["Update Decision Engine\n(LLM-Assisted)"]
        WVE["Workflow & Versioning Engine"]
        SOPC["SOP Compiler"]
  end
 subgraph Storage["Persistence Layer"]
        PG[("PostgreSQL\nSystem of Record")]
        Mongo[("MongoDB\nRead Models")]
  end
 subgraph EventBus["Event Backbone"]
        Outbox["Outbox Table\n(in Postgres)"]
        Publisher["Outbox Publisher\n(Worker)"]
        Kafka{"Kafka Message Bus"}
        Projector["Mongo Projector\n(Consumer)"]
  end
    UI -- GET /executions, /sops --> ReadAPI
    ReadAPI -- Query Read Views --> Mongo
    WriteAPI -- Trigger Event --> WVE
    WVE -- Consult Dependencies --> DGE
    WVE -- Request Decision --> UDE
    WVE -- Generate Artifacts --> SOPC
    WVE -- Write Canonical State\n(Executions, Components) --> PG
    WVE -- Insert Outbox Event\n(Same Transaction) --> Outbox
    Outbox -.-> Publisher
    Publisher -- Publish Event --> Kafka
    Kafka -- Consume Topic --> Projector
    Projector -- Materialize View --> Mongo
    PG -.-> PGModels["Tables:\n- executions\n- components\n- sop_versions\n- outbox_events"]
    Mongo -.-> MongoModels["Collections:\n- execution_audit_view\n- sop_history_view"]

     UI:::frontend
     ReadAPI:::api
     WriteAPI:::api
     DGE:::logic
     UDE:::logic
     WVE:::logic
     SOPC:::logic
     PG:::db
     Mongo:::db
     Outbox:::db
     Publisher:::worker
     Kafka:::event
     Projector:::worker
     PGModels:::db
     MongoModels:::db
    classDef frontend fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000000
    classDef api fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000000
    classDef logic fill:#fff8e1,stroke:#ff6f00,stroke-width:2px,color:#000000
    classDef db fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000000
    classDef event fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000
    classDef worker fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000
`;

export const NS_PIE_FLOW = `
graph TD

    %% -- Styles --
    classDef intake fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef score fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000;
    classDef text fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;

    %% -- 1. Intake Layer --
    subgraph Intake [Intake Layer]
        SigAdapter[Signal Intake Adapter]:::intake
        DreAdapter[Research Intake Adapter]:::intake
        ContextAssembly[Context Assembly]:::intake
    end

    %% -- 2. Insight Generation --
    subgraph Gen [Insight Generation]
        InsightGen[Insight Generator]:::logic
        CandidateInsight[Candidate Insight]:::logic
    end

    %% -- 3. Scoring & Logic --
    subgraph Scoring [Scoring & Logic]
        ScoringSvc[Scoring & Ranking Service]:::score
        RiskSvc[Risk Profiling Service]:::score
        DecayMgr[Decay & Relevance Manager]:::score
    end

    %% -- 4. Narrative Synthesis --
    subgraph Narrative [Narrative Layer]
        NarrativeGen[Narrative & Explanation]:::text
        Explainability[Explainability Engine]:::text
    end

    %% -- 5. Output & Control --
    subgraph Output [Output Layer]
        Publisher[Output Publisher]:::output
        KillSwitch[Kill Switch]:::output
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(Authoritative Store<br/>PostgreSQL)]:::db
        ReadModels[(Read Models<br/>Redis/Mongo)]:::db
    end

    %% -- External Integrations --
    subgraph External [External Systems]
        SIG((SIG Engine)):::intake
        DRE((DRE Engine)):::intake
        GGP((GGP Engine)):::output
        Consumer((Downstream)):::output
    end

    %% -- Data Flow --

    %% Intake
    SIG -- "Trust Scored Signal" --> SigAdapter
    DRE -- "Research Artifact" --> DreAdapter
    SigAdapter --> ContextAssembly
    DreAdapter --> ContextAssembly
    ContextAssembly -- "Evidence Bundle" --> InsightGen

    %% Generation
    InsightGen -- "Candidate Insight" --> CandidateInsight
    CandidateInsight -- "Persist Version" --> PG

    %% Analysis Loop
    CandidateInsight -- "Review" --> ScoringSvc
    CandidateInsight -- "Profile" --> RiskSvc
    CandidateInsight -- "Set Window" --> DecayMgr

    ScoringSvc -- "Score Result" --> NarrativeGen
    RiskSvc -- "Risk Profile" --> NarrativeGen
    DecayMgr -- "Relevance Window" --> Publisher

    %% Narrative
    NarrativeGen -- "Narrative Summary" --> Publisher
    Explainability -- "Evidence Pointers" --> Publisher

    %% Storage
    ScoringSvc -- "Save Score" --> PG
    RiskSvc -- "Save Risk" --> PG
    NarrativeGen -- "Save Narrative" --> PG
    Publisher -- "Update Read Models" --> ReadModels

    %% Output
    Publisher -- "Proposed Insight" --> GGP
    GGP -- "Approved/Rejected" --> Publisher
    Publisher -- "Published Insight" --> Consumer

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- insight<br/>- evidence_bundle<br/>- scoring_result<br/>- risk_profile<br/>- narrative"]:::db
`;

export const NS_DAT_FLOW = `
graph TD

    %% -- Styles --
    classDef control fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000000;
    classDef gov fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000;
    classDef exec fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000;
    classDef logic fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000000;

    %% -- 1. Control Plane (Planning) --
    subgraph Control [Control Plane]
        PlanBuilder[Plan Builder Service]:::control
        PlanReg[Plan Registry<br/>(System of Record)]:::control
    end

    %% -- 2. Governance Interface --
    subgraph Governance [Governance Handoff]
        GovAdapter[Governance Handoff Adapter]:::gov
        GGP((GGP Engine)):::gov
    end

    %% -- 3. Execution Plane (Orchestration) --
    subgraph Execution [Execution Plane]
        Orchestrator[Execution Orchestrator]:::exec
        StepRunner[Step Runner]:::exec
        Rollback[Rollback Coordinator]:::exec
    end

    %% -- 4. Runtime Guards (Logic) --
    subgraph Guards [Runtime Guards]
        ConstraintEng[Constraint Engine<br/>(Admission & Runtime)]:::logic
        BudgetTracker[Budget Tracker]:::logic
    end

    %% -- 5. External Interface --
    subgraph Ext [External Connectors]
        Connectors[Connector Layer]:::output
        MUX((MUX)):::output
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(Authoritative Store<br/>PostgreSQL)]:::db
        EventLog[Telemtry & Audit Log]:::db
        Redis[(Runtime State<br/>Redis)]:::db
    end

    %% -- Downstream --
    subgraph Downstream [Downstream Consumers]
        FLO((FLO)):::output
        PTE((PTE)):::output
    end

    %% -- Data Flow --

    %% Planning
    PlanBuilder -- "1. Draft Plan" --> PlanReg
    PlanReg -- "2. Submit for Approval" --> GovAdapter
    GovAdapter -- "3. Approve" --> GGP
    GGP -- "4. Approved Verdict" --> PlanReg

    %% Execution Start
    PlanReg -- "5. Fetch Approved Plan" --> Orchestrator
    Orchestrator -- "6. Check Constraints" --> ConstraintEng
    Orchestrator -- "7. Check Budget" --> BudgetTracker

    %% Execution Loop
    Orchestrator -- "8. Dispatch Step" --> StepRunner
    StepRunner -- "9. Execute Action" --> Connectors
    Connectors -- "10. Route Action" --> MUX

    %% Telemetry & Persistence
    StepRunner -- "Emit Telemetry" --> EventLog
    ConstraintEng -- "Log Decision" --> EventLog
    BudgetTracker -- "Log Spend" --> EventLog
    Orchestrator -- "Persist State" --> Redis

    %% Failures
    StepRunner -- "Failure" --> Rollback
    Rollback -- "Compensating Action" --> Connectors

    %% Outputs
    BudgetTracker -- "Financial Event" --> FLO
    EventLog -- "Perf Metrics" --> PTE
    PlanReg -- "Persist Plan Artifacts" --> PG
    EventLog -- "Persist Events" --> PG

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- execution_plan<br/>- execution_step<br/>- constraint_snapshot<br/>- budget_snapshot<br/>- rollback_policy"]:::db
`;

export const NS_FLO_FLOW = `
graph TD

    %% -- Styles --
    classDef intake fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef core fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000;
    classDef read fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef ext fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;

    %% -- 1. Ingestion Layer --
    subgraph Ingestion [Ingestion Layer]
        EventIngest[Event Ingestor<br/>(Engine Events)]:::intake
        StmtIngest[Statement Ingestor<br/>(External Truth)]:::intake
    end

    %% -- 2. Normalization & Classification --
    subgraph NormClass [Normalization & Classification]
        Normalizer[Normalizer]:::logic
        Classifier[Classifier]:::logic
    end

    %% -- 3. Ledger Core (System of Record) --
    subgraph Core [Ledger Core]
        LedgerWriter[Ledger Writer<br/>(Append-Only)]:::core
        BudgetEng[Budget & Allocation Engine]:::core
    end

    %% -- 4. Reconciliation & Reporting --
    subgraph ReconReport [Reconciliation & Reporting]
        ReconEng[Reconciliation Engine]:::read
        EvidenceLink[Evidence Linker]:::read
        ReadBuilder[Read Model Builder]:::read
        QueryAPI[Reporting & Query API]:::read
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(Authoritative Ledger<br/>PostgreSQL)]:::db
        ReconStore[(Reconciliation Store)]:::db
        ReadStore[(Read Models<br/>Redis/Mongo)]:::db
    end

    %% -- External Systems --
    subgraph External [External Systems]
        DAT((DAT Engine)):::ext
        MUX((MUX Engine)):::ext
        GGP((GGP Engine)):::ext
        PTE((PTE Engine)):::ext
    end

    %% -- Data Flow --

    %% Ingestion
    DAT -- "Financial Event" --> EventIngest
    MUX -- "Bank Statement" --> StmtIngest

    %% Processing
    EventIngest -- "Raw Event" --> Normalizer
    Normalizer -- "Normalized Event" --> Classifier
    Classifier -- "Transaction Candidate" --> LedgerWriter
    StmtIngest -- "External Statement" --> ReconStore

    %% Core Write & Logic
    LedgerWriter -- "Persist Entry" --> PG
    LedgerWriter -- "Update State" --> BudgetEng
    BudgetEng -- "Check Limits" --> GGP

    %% Reconciliation
    PG -.-> ReconEng
    ReconStore -.-> ReconEng
    ReconEng -- "Recon Record" --> ReconStore

    %% Read & Report
    PG -.-> ReadBuilder
    ReadBuilder -- "Materialize View" --> ReadStore
    ReadStore -.-> QueryAPI
    QueryAPI -- "Metrics" --> PTE
    QueryAPI -- "Reports" --> GGP

    %% Evidence
    EvidenceLink -- "Link Artifact" --> LedgerWriter

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- ledger_entry<br/>- transaction_group<br/>- budget_state<br/>- allocation_rule"]:::db
`;

export const NS_MUX_FLOW = `
graph TD

    %% -- Styles --
    classDef conn fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef ingest fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef core fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef dist fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;

    %% -- 1. Connector Layer --
    subgraph Connectors ["Connector Layer"]
        ConnMgr["Connector Manager"]:::conn
        Worker["Connector Workers<br/>Poll/Push/File"]:::conn
    end

    %% -- 2. Ingress & Capture --
    subgraph Ingress ["Ingress & Capture"]
        IngressGW["Ingress Gateway<br/>Webhook Listener"]:::ingest
        CaptureStore[("Raw Capture Store")]:::db
    end

    %% -- 3. Normalization & Integrity --
    subgraph Processing ["Processing Layer"]
        Normalizer["Normalization Engine"]:::logic
        Integrity["Integrity & Dedupe Engine"]:::logic
    end

    %% -- 4. Artifact & Replay --
    subgraph Core ["Artifact Core"]
        ArtifactStore[("Canonical Artifact Store")]:::db
        ReplayEng["Replay & Backfill Engine"]:::core
    end

    %% -- 5. Distribution --
    subgraph Dist ["Distribution Layer"]
        Publisher["Event Publisher"]:::dist
        QueryAPI["Query API"]:::dist
    end

    %% -- External Systems --
    subgraph External ["External & Downstream"]
        ExtSys["External Platforms<br/>Stripe, Plaid, etc."]:::conn
        Kafka{"Kafka Event Bus"}:::dist
        FLO(("FLO Engine")):::dist
    end

    %% -- Data Flow --

    %% Ingress Flow (Webhook)
    ExtSys -- "Webhook" --> IngressGW
    IngressGW -- "Validate & Extract" --> CaptureStore

    %% Ingress Flow (Worker)
    ExtSys -- "Poll/Fetch" --> Worker
    Worker -- "Import" --> CaptureStore

    %% Processing
    CaptureStore -- "Raw Record" --> Normalizer
    Normalizer -- "Normalized" --> Integrity
    Integrity -- "Canonical Artifact" --> ArtifactStore

    %% Distribution
    ArtifactStore -- "New Artifact" --> Publisher
    Publisher -- "Publish Event" --> Kafka
    
    %% Replay
    ReplayEng -- "Reprocess" --> CaptureStore
    ReplayEng -- "Re-emit" --> Publisher

    %% Query
    QueryAPI -- "Lookup" --> ArtifactStore
    QueryAPI -- "Status" --> ConnMgr

    %% Downstream
    Kafka -- "Consume" --> FLO
    Kafka -- "Consume" --> OtherEngines["Other Engines"]

    %% Detailed Models (Notes)
    ArtifactStore -.-> Models["Artifact Types:<br/>- platform_event<br/>- transaction<br/>- statement<br/>- snapshot"]:::db
`;

export const NS_SIG_FLOW = `
graph TD

    %% -- Styles --
    classDef input fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef store fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;
    classDef feedback fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;

    %% -- 1. Ingress Layer --
    subgraph Ingress ["Ingress Layer"]
        Adapters["Input Adapters (Kafka/HTTP)"]:::input
        RawStore[("Raw Capture Store")]:::store
    end

    %% -- 2. Normalization & Scoring --
    subgraph Processing ["Processing Core"]
        Normalizer["Normalization Engine"]:::logic
        Scoring["Trust & Confidence Scoring"]:::logic
        Decay["Decay Engine"]:::logic
        Dedupe["Dedupe & Consistency"]:::logic
    end

    %% -- 3. Signal Persistence --
    subgraph Storage ["Signal Persistence"]
        CanonicalStore[("Canonical Signal Store Authoritative")]:::store
        AggStore[("Derived Aggregates Rebuildable")]:::store
    end

    %% -- 4. Aggregation & Correlation --
    subgraph Analysis ["Aggregation & Correlation"]
        AggEngine["Aggregation Engine"]:::feedback
        CorrEngine["Correlation Engine"]:::feedback
    end

    %% -- 5. Distribution --
    subgraph Dist ["Distribution Layer"]
        Publisher["Signal Publisher"]:::output
        QueryAPI["Query API"]:::output
    end

    %% -- External Connections --
    subgraph External ["External & Downstream"]
        MUX(("MUX")):::input
        Telemetry["Internal Telemetry DAT/FLO/Infra"]:::input
        Kafka{"Kafka Event Bus"}:::output
        DRE(("DRE")):::output
        PIE(("PIE")):::output
    end

    %% -- Data Flow --

    %% Ingress
    MUX -->|"Artifact"| Adapters
    Telemetry -->|"Telemetry Event"| Adapters
    Adapters -->|"Raw Capture"| RawStore
    Adapters -->|"Stream"| Normalizer

    %% Processing Loop
    Normalizer -->|"Candidate Signal"| Scoring
    Scoring -->|"Scored Signal"| Decay
    Decay -->|"Decay Model"| Dedupe
    Dedupe -->|"Canonical Signal"| CanonicalStore

    %% Analysis & Derived Views
    CanonicalStore -->|"Feed"| AggEngine
    CanonicalStore -->|"Feed"| CorrEngine
    AggEngine -->|"Rollups"| AggStore
    CorrEngine -->|"Groups"| AggStore

    %% Distribution
    CanonicalStore -->|"New Signal"| Publisher
    AggStore -->|"Derived Updates"| Publisher
    Publisher -->|"Publish"| Kafka

    %% Downstream Consumption
    Kafka -->|"Consume Signals"| DRE
    Kafka -->|"Consume Groups"| PIE
    
    %% Query Access
    QueryAPI -->|"Lookup"| CanonicalStore
    QueryAPI -->|"Analytics"| AggStore

    %% Detailed Models (Notes)
    CanonicalStore -.-> Models["Signal Attributes: signal_type trust_score confidence decay_model"]:::store
`;

export const NS_SIM_FLOW = `
graph TD

    %% -- Styles --
    classDef input fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000;
    classDef store fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;
    classDef ext fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;

    %% -- 1. Input Assembly --
    subgraph Assembly [Input Assembly Layer]
        InputMgr[Input Manager]:::input
        SnapshotEng[Snapshot Engine]:::input
    end

    %% -- 2. Construction & Logic --
    subgraph Construction [Construction & Logic]
        ScenarioBldr[Scenario Builder]:::logic
        AssumptionMgr[Assumption Manager]:::logic
        ConstraintMgr[Constraint Manager]:::logic
    end

    %% -- 3. Simulation Execution --
    subgraph Execution [Simulation Core]
        SimEngine[Simulation Engine]:::logic
        TimeStepper[Time Step Controller]:::logic
        ModelRegistry[Model Registry]:::logic
    end

    %% -- 4. Results & Persistence --
    subgraph Storage [Persistence Layer]
        DefStore[(Scenario Definitions)]:::store
        ResultStore[(Simulation Results)]:::store
    end

    %% -- 5. External Inputs --
    subgraph Upstream [Upstream Engines]
        SIG((SIG)):::ext
        PIE((PIE)):::ext
        DAT((DAT)):::ext
        FLO((FLO)):::ext
    end

    %% -- 6. Consumers --
    subgraph Downstream [Consumers]
        GGP((GGP)):::output
        Humans[Human Analysts]:::output
        API[Dist API]:::output
    end

    %% -- Data Flow --

    %% Ingestion
    SIG -- "Signals" --> InputMgr
    PIE -- "Insights" --> InputMgr
    DAT -- "Params" --> InputMgr
    FLO -- "Constraints" --> InputMgr

    %% Assembly
    InputMgr -- "Resolve" --> SnapshotEng
    SnapshotEng -- "Frozen Snapshot" --> ScenarioBldr

    %% Definition
    AssumptionMgr -- "Assumptions" --> ScenarioBldr
    ConstraintMgr -- "Constraints" --> ScenarioBldr
    ScenarioBldr -- "Scenario Def" --> DefStore

    %% Execution
    DefStore -- "Load Def" --> SimEngine
    ModelRegistry -- "Logic" --> SimEngine
    SimEngine -- "Step" --> TimeStepper
    TimeStepper -- "Next State" --> SimEngine

    %% Persistence
    SimEngine -- "Outcome" --> ResultStore

    %% Output
    ResultStore -- "Read" --> API
    API -- "Review" --> GGP
    API -- "Analysis" --> Humans

    %% Detailed Models (Notes)
    ResultStore -.-> Models["Artifacts:<br/>- scenario_run<br/>- outcome_series<br/>- uncertainty_band<br/>- failure_marker"]:::store
`;
