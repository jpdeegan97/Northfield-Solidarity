export const NS_DRE_FLOW = `
flowchart TD

    %% -- Styles --
    classDef ingest fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef store fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef synth fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000
    classDef gov fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef output fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000000
    classDef cross fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000

    %% -- 1. Collection & Ingestion Layer --
    subgraph Ingestion [Collection & Ingestion Layer]
        Crawlers[Crawlers / Agents]:::ingest
        ManualIngest[Manual Ingest API]:::ingest
        SourceMonitor[Source Monitor]:::ingest
        Fingerprinter[Fingerprinter & Timestamp]:::ingest
    end

    %% -- 2. Evidence Store & Knowledge Graph --
    subgraph KnowledgeBase [Evidence & Knowledge Graph]
        EvidenceStore[Immutable Evidence Store]:::store
        KnowledgeGraph[Knowledge Graph<br/>(Entities & Relations)]:::store
        CitationEngine[Citation Engine]:::store
    end

    %% -- 3. Synthesis & Reasoning Layer --
    subgraph Synthesis [Synthesis & Reasoning Layer]
        ClusterEngine[Cluster Engine<br/>(Themes)]:::synth
        HypothesisMgr[Hypothesis Manager]:::synth
        ConfidenceUpdater[Confidence Updater]:::synth
        NarrativeComposer[Narrative Composer]:::synth
    end

    %% -- 4. Governance & Promotion --
    subgraph Governance [Governance & Promotion]
        PromotionCoord[Promotion Coordinator]:::gov
        VersionControl[Artifact Versioning]:::gov
        GGP((GGP Engine)):::gov
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(PostgreSQL<br/>System of Record)]:::db
        GraphDB[(Graph DB / Overlay)]:::db
        EventLedger[Event Ledger]:::db
    end

    %% -- Output & Downstream --
    subgraph Downstream [Downstream Consumers]
        API[DRE Query API]:::output
        PIE((PIE)):::cross
        SIM((SIM)):::cross
        DAT((DAT)):::cross
    end

    %% -- Data Flow --

    %% Ingestion
    SourceMonitor -- "Detect Change" --> Crawlers
    Crawlers -- "Raw Data" --> Fingerprinter
    ManualIngest -- "Input Data" --> Fingerprinter
    Fingerprinter -- "Evidence Item" --> EvidenceStore

    %% Knowledge Base
    EvidenceStore -- "Persist" --> PG
    EvidenceStore -- "Extract Entities" --> KnowledgeGraph
    KnowledgeGraph -- "Persist Graph" --> GraphDB
    CitationEngine -- "Link Evidence" --> EvidenceStore

    %% Synthesis
    EvidenceStore -- "Feed" --> ClusterEngine
    ClusterEngine -- "Emerging Themes" --> HypothesisMgr
    HypothesisMgr -- "Draft Hypothesis" --> ConfidenceUpdater
    ConfidenceUpdater -- "Update Score" --> HypothesisMgr
    HypothesisMgr -- "Valid Hypothesis" --> NarrativeComposer
    NarrativeComposer -- "Draft Narrative" --> VersionControl

    %% Governance
    VersionControl -- "Snapshot" --> PG
    VersionControl -- "Request Promotion" --> PromotionCoord
    PromotionCoord -- "Approval Request" --> GGP
    GGP -- "Verdict" --> PromotionCoord

    %% Output
    PromotionCoord -- "Approved Artifact" --> API
    API -- "Themes/Hypotheses" --> PIE
    API -- "Assumptions" --> SIM
    API -- "Constraints" --> DAT

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- source<br/>- evidence_item<br/>- theme<br/>- hypothesis<br/>- research_narrative<br/>- promotion_request"]:::db
`;

export const NS_IDN_FLOW = `
flowchart TD

    %% -- Styles --
    classDef intake fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000
    classDef core fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000
    classDef read fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef ext fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000

    %% -- 1. Ingress & Validation --
    subgraph Ingress [Ingress & Validation]
        API[Ingress API]:::intake
        Validator[Validator & Schema Check]:::intake
    end

    %% -- 2. Core Logic (Resolution & Registry) --
    subgraph CoreLogic [Core Logic]
        Resolver[Identifier Resolution Engine]:::logic
        RegistryMgr[Registry Manager]:::logic
        GraphMgr[Relationship Graph Manager]:::logic
    end

    %% -- 3. Event Ledger Layer --
    subgraph Audit [Event Ledger]
        EventLogger[Event Logger]:::core
        DecisionStore[Decision Artifact Store]:::core
    end

    %% -- 4. Projections & Distribution --
    subgraph Reads [Projections & Query]
        Projector[Read Projector]:::read
        QueryAPI[Query & Lookup API]:::read
    end

    %% -- Persistence --
    subgraph Storage [Persistence Layer]
        PG[(PostgreSQL<br/>Registry/Events/Graph)]:::db
        Redis[(Redis<br/>Hot Cache)]:::db
    end

    %% -- External Consumers --
    subgraph External [Downstream Engines]
        GGP((GGP)):::ext
        DAT((DAT)):::ext
        FLO((FLO)):::ext
        PIE((PIE)):::ext
        SIG((SIG)):::ext
    end

    %% -- Data Flow --

    %% Ingress to Logic
    API -- "Create/Update Request" --> Validator
    Validator -- "Valid Request" --> RegistryMgr
    Validator -- "Link Request" --> Resolver

    %% Logic Processing
    RegistryMgr -- "Assign Canonical ID" --> EventLogger
    Resolver -- "Resolve Conflict" --> EventLogger
    Resolver -- "Merge/Split Decision" --> RegistryMgr
    GraphMgr -- "Edge Mutation" --> EventLogger

    %% Persistence
    EventLogger -- "Append Event" --> PG
    DecisionStore -- "Save Rationale" --> PG
    
    %% Projections
    PG -.-> Projector
    Projector -- "Build View" --> Redis
    
    %% Queries
    QueryAPI -- "Fast Lookup" --> Redis
    QueryAPI -- "Deep Graph Query" --> PG

    %% Downstream
    QueryAPI -- "Identity Truth" --> GGP
    QueryAPI -- "Entity Data" --> DAT
    QueryAPI -- "Owner Info" --> FLO
    QueryAPI -- "Subject Resolution" --> PIE
    QueryAPI -- "Signal Attribution" --> SIG

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- canonical_actor<br/>- canonical_entity<br/>- identity_event<br/>- relationship_edge<br/>- identifier_map"]:::db
`;

export const NS_CDE_FLOW = `
flowchart TD

    %% -- Styles --
    classDef intake fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef gov fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000
    classDef orch fill:#e8eaf6,stroke:#1a237e,stroke-width:2px,color:#000000
    classDef exec fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000
    classDef adapter fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef feedback fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000000
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef event fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#000000

    %% -- 1. Plan Intake & Validation --
    subgraph Intake [Plan Intake & Validation]
        Validator[Plan Validator]:::intake
        API[CDE Intake API]:::intake
    end

    %% -- 2. Governance Gate --
    subgraph Gov [Governance Gate]
        GovCheck{Governance Check}:::gov
        GGP((GGP Engine)):::gov
    end

    %% -- 3. Intent Orchestration --
    subgraph Orch [Intent Orchestration]
        IntentFactory[Intent Factory]:::orch
        ImmutableIntent[Immutable Intent]:::orch
    end

    %% -- 4. Execution Dispatcher --
    subgraph Dispatch [Execution Dispatcher]
        Scheduler[Scheduler & Backoff]:::exec
        StateMachine[Execution State Machine]:::exec
        IdemCheck{Idempotency Check}:::exec
    end

    %% -- 5. Channel Adapter Interface --
    subgraph MUX [Channel Adapters (MUX)]
        AdapterInterface[Adapter Interface]:::adapter
        ChannelA[Channel A Adapter]:::adapter
        ChannelB[Channel B Adapter]:::adapter
    end

    %% -- 6. Proof & Feedback --
    subgraph Proof [Proof & Feedback]
        ProofCapture[Proof Capture]:::feedback
        FeedbackIngest[Feedback Ingest]:::feedback
        SIG((SIG Engine)):::feedback
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(PostgreSQL<br/>System of Record)]:::db
        Redis[(Redis<br/>Hot State)]:::db
        Kafka{Kafka Event Bus}:::event
        EventLedger[Event Ledger]:::db
    end

    %% -- Data Flow --

    %% Intake
    API --> Validator
    Validator -- "Valid Plan" --> GovCheck

    %% Governance
    GovCheck -- "Request Approval" --> GGP
    GGP -- "Approved" --> GovCheck
    GovCheck -- "Authorized" --> IntentFactory

    %% Orchestration
    IntentFactory -- "Materialize" --> ImmutableIntent
    ImmutableIntent -- "Persist" --> PG
    ImmutableIntent -- "Dispatch" --> Scheduler

    %% Execution
    Scheduler --> StateMachine
    StateMachine --> IdemCheck
    IdemCheck -- "Not Executed" --> AdapterInterface
    IdemCheck -- "Already Executed" --> Scheduler

    %% Adapters
    AdapterInterface --> ChannelA
    AdapterInterface --> ChannelB

    %% Proofs
    ChannelA -- "Success Receipt" --> ProofCapture
    ChannelB -- "Success Receipt" --> ProofCapture
    ProofCapture -- "Persist Proof" --> PG
    ProofCapture -- "Emit Event" --> EventLedger

    %% Feedback
    ChannelA -.-> FeedbackIngest
    FeedbackIngest -- "Extract Signals" --> SIG
    FeedbackIngest -- "Persist Raw" --> PG

    %% Storage Connections
    StateMachine -- "Update State" --> PG
    StateMachine -- "Cache State" --> Redis
    EventLedger -- "Publish" --> Kafka

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- distribution_plan<br/>- distribution_intent<br/>- execution_attempt<br/>- delivery_proof<br/>- distribution_event"]:::db
`;

export const NS_INT_FLOW = `
flowchart TD

    %% -- Styles --
    classDef ingest fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000
    classDef core fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000
    classDef read fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef ext fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000
    classDef edge fill:#fbe9e7,stroke:#bf360c,stroke-width:2px,color:#000000

    %% -- 1. Intervention Core --
    subgraph Core [Intervention Core Cluster]
        
        %% Ingest & Gating
        subgraph IngestLayer [Ingest & Gating]
            IngestGW[Ingest Gateway]:::ingest
            Router[Router / Partitioner]:::ingest
            GovAdapter[Governance Adapter]:::logic
        end

        %% Event Persistence
        subgraph EventLayer [Event Memory]
            EventLog[(Immutable Event Log)]:::db
        end

        %% Projections
        subgraph ProjectionLayer [Projection Runtime]
            Projectors[Projector Workers]:::logic
            StreamGW[Stream Gateway]:::logic
        end

        %% Read State
        subgraph ReadLayer [State & Query]
            MatState[(Materialized State<br/>Read Models)]:::read
            QueryAPI[Query API]:::read
            AdminAPI[Admin API]:::read
        end
    end

    %% -- 2. Intervention Edge --
    subgraph Edge [Intervention Edge / Sidecar]
        LocalCache[(Local Read Cache)]:::edge
        SyncLogic[Delta Sync & Replay]:::edge
        EdgeAPI[Local Edge API]:::edge
    end

    %% -- 3. External Connectors --
    subgraph External [External & Downstream]
        GGP((GGP Engine)):::ext
        ClientApp[Client Engine / App]:::ext
        Firmament[Firmament UI]:::ext
    end

    %% -- Data Flow --

    %% Ingestion Flow
    ClientApp -- "1. Publish Event" --> EdgeAPI
    EdgeAPI -- "2. Forward Event" --> IngestGW
    IngestGW -- "3. Check Schema" --> Router
    Router -- "4. Check Governance" --> GovAdapter
    GovAdapter -- "5. Consult Policy" --> GGP
    GGP -- "6. Verdict" --> GovAdapter
    GovAdapter -- "7. Auth/Reject" --> Router
    Router -- "8. Append" --> EventLog

    %% Projection Flow
    EventLog -- "9. Stream Log" --> Projectors
    Projectors -- "10. Update Views" --> MatState
    Projectors -- "11. Emit Deltas" --> StreamGW

    %% Query & Stream Flow
    StreamGW -- "12. Push Deltas" --> SyncLogic
    SyncLogic -- "13. Apply to Cache" --> LocalCache
    ClientApp -- "14. Fast Local Read" --> EdgeAPI
    EdgeAPI -- "15. Get from Cache" --> LocalCache
    
    %% Firmament Flow
    Firmament -- "Subscribe Global" --> StreamGW
    Firmament -- "Snapshot Query" --> QueryAPI
    QueryAPI -- "Read State" --> MatState

    %% Detailed Models (Notes)
    EventLog -.-> Models["Models:<br/>- Canonical Envelope<br/>- Event Stream<br/>- Snapshot<br/>- Delta"]:::db
`;

export const NS_LUM_FLOW = `
flowchart TD

    %% -- Styles --
    classDef intake fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000
    classDef logic fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#000000
    classDef store fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000
    classDef serve fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef action fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000
    classDef producer fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000

    %% -- 1. Signal Producers --
    subgraph Producers [Signal Producers]
        Engines["Engines: GGP/FLO/IDN/etc"]:::producer
        Infra["Infra: DB/Kafka/K8s"]:::producer
        External["External: Coinbase/Google"]:::producer
    end 

    %% -- 2. Collection Layer --
    subgraph Collect [Collection Layer]
        Agent["Agent/SDK: OTel Exporters"]:::intake
        Webhook["Webhook/Event Bridge"]:::intake
    end

    %% -- 3. Normalization & Policy --
    subgraph Normalize [Normalization & Policy]
        SchemaReg["Schema Registry"]:::logic
        Redactor["Redaction/PII Filter"]:::logic
        Enricher["Correlation Enricher"]:::logic
        Router["Routing & Sampling"]:::logic
    end

    %% -- 4. Ingest Pipelines --
    subgraph Pipelines [Ingest Pipelines]
        PLog["Logs Pipeline"]:::logic
        PMetric["Metrics Pipeline"]:::logic
        PTrace["Traces Pipeline"]:::logic
        PAudit["Audit/Events Pipeline"]:::logic
    end

    %% -- 5. Storage Tiers --
    subgraph Stores [Storage Tiers]
        HotStore["Hot Store<br/>(Recent Logs/Traces)"]:::store
        MetricStore["Metrics TSDB"]:::store
        WarmStore["Warm Archive"]:::store
        EvStore["Evidence Store<br/>(Sealed/Append-Only)"]:::store
    end

    %% -- 6. Query & Surfaces --
    subgraph Serve [Query & Surfaces]
        QueryAPI["Unified Query API"]:::serve
        Dashboard["Dashboards"]:::serve
        TraceExp["Trace Explorer"]:::serve
        IncConsole["Incident Console"]:::serve
        EvViewer["Evidence Viewer"]:::serve
    end

    %% -- 7. Alerting & Response --
    subgraph Action [Alerting & Response]
        AlertEng["Alert Engine"]:::action
        IncMgr["Incident Manager"]:::action
        RunbookReg["Runbook Registry"]:::action
    end

    %% -- Data Flow --
    
    %% Produce -> Collect
    Engines -->|"Telemetry"| Agent
    Infra -->|"Logs/Metrics"| Agent
    External -->|"Callbacks"| Webhook

    %% Collect -> Normalize
    Agent -->|"Raw Signal"| SchemaReg
    Webhook -->|"Ext Signal"| SchemaReg
    SchemaReg -->|"Valid Payload"| Redactor
    Redactor -->|"Clean Payload"| Enricher
    Enricher -->|"Contextualized"| Router

    %% Normalize -> Pipelines
    Router -->|"Log Stream"| PLog
    Router -->|"Metric Stream"| PMetric
    Router -->|"Trace Stream"| PTrace
    Router -->|"Event Stream"| PAudit

    %% Pipelines -> Stores
    PLog --> HotStore
    PMetric --> MetricStore
    PTrace --> HotStore
    PAudit --> EvStore
    Router -->|"Long Term"| WarmStore

    %% Stores -> Serve
    HotStore -.-> QueryAPI
    MetricStore -.-> QueryAPI
    WarmStore -.-> QueryAPI
    EvStore -.-> EvViewer
    EvStore -.-> QueryAPI

    %% Serve -> Action
    QueryAPI -->|"Metrics/Logs"| AlertEng
    AlertEng -->|"Trigger"| IncMgr
    IncMgr -->|"Link Context"| RunbookReg

    %% Action Feedback
    IncMgr -->|"Show State"| IncConsole

    %% Governance & Access (Notes)
    EvViewer -.-> AccessPolicy["Access via<br/>IDN + GGP"]:::logic
`;

export const NS_CWP_FLOW = `
flowchart TD

    %% -- Styles --
    classDef work fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000000
    classDef agent fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef super fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000
    classDef review fill:#fbe9e7,stroke:#bf360c,stroke-width:2px,color:#000000
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000
    classDef event fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#000000
    classDef portal fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000000

    %% -- 1. Work Definition & Registry --
    subgraph WorkDef [Work Definition]
        WorkReg[Work Registry<br/>(Task/Mission/Program)]:::work
        WorkFactory[Work Factory]:::work
    end

    %% -- 2. Agent Management --
    subgraph AgentMgmt [Agent Management]
        AgentReg[Agent Registry<br/>(Start/Hybrid/AI)]:::agent
        CapResolver[Capability Resolver]:::agent
    end

    %% -- 3. Assignment & Scheduling --
    subgraph Assign [Assignment & Scheduling]
        Scheduler[Scheduler & Cadence]:::work
        AssignEngine[Assignment Engine]:::work
        SLAEnforcer[SLA Enforcer]:::work
    end

    %% -- 4. Supervision Layer --
    subgraph Supervision [Supervision Layer]
        Supervisor[Supervisor Engine<br/>(State Monitor)]:::super
        StallDetector[Stall/Risk Detector]:::super
    end

    %% -- 5. Review & Escalation --
    subgraph ReviewLayer [Review & Escalation]
        CheckpointMgr[Checkpoint Manager]:::review
        EscalationRouter[Escalation Router]:::review
        ReviewPortal[Human Review Portal]:::portal
    end

    %% -- Data Persistence --
    subgraph Storage [Persistence Layer]
        PG[(PostgreSQL<br/>System of Record)]:::db
        EventLedger[Event Ledger]:::db
        Redis[(Redis<br/>Hot State)]:::db
    end

    %% -- Data Flow --

    %% Creation
    WorkFactory -- "Register Work" --> WorkReg
    WorkReg -- "Persist State" --> PG

    %% Agent Resolution
    AgentReg -- "Get Capabilities" --> CapResolver
    CapResolver -- "Eligible Agents" --> AssignEngine

    %% Assignment
    Scheduler -- "Trigger Work" --> AssignEngine
    AssignEngine -- "Match Work+Agent" --> WorkReg
    AssignEngine -- "Emit Assignment" --> EventLedger

    %% Execution Monitoring
    WorkReg -- "Status Updates" --> Supervisor
    Supervisor -- "Monitor Progress" --> SLAEnforcer
    SLAEnforcer -- "SLA Breach" --> StallDetector

    %% Risks & Escalation
    StallDetector -- "Flag Risk" --> EscalationRouter
    EscalationRouter -- "Route Escalation" --> ReviewPortal

    %% Checkpoints
    Supervisor -- "Work Complete?" --> CheckpointMgr
    CheckpointMgr -- "Require Approval" --> ReviewPortal
    ReviewPortal -- "Approve/Reject" --> CheckpointMgr
    CheckpointMgr -- "Outcome" --> WorkReg

    %% Storage
    EventLedger -- "Replay/Audit" --> PG
    Supervisor -- "Cache State" --> Redis

    %% Cross Engine
    EscalationRouter -- "Governance Issue" --> GGP((GGP))
    WorkFactory -- "Research Mission" --> DRE((DRE))
    Supervisor -- "Metrics" --> PTE((PTE))

    %% Detailed Models (Notes)
    PG -.-> PGModels["Tables:<br/>- work_item<br/>- agent<br/>- assignment<br/>- checkpoint<br/>- escalation"]:::db
`;

export const NS_BCP_FLOW = `
flowchart LR

  subgraph Dev[Developer & Product Teams]
    REPO[Code Repos\nContracts + dApps + IaC]
    SPEC[Specs + Threat Models]
  end

  subgraph BV[Build & Verification Plane]
    CI[CI Pipeline\nBuild/Test/Analyze]
    SA[Static Analysis\n+ Fuzz/Property]
    AUD[Audit Readiness\nArtifacts]
  end

  subgraph GC[Governance & Control Plane]
    GGP[GGP/GGE\nApprovals + Policy]
    IDN[IDN\nIdentity/Roles]
    CUST[Custody\nMultisig/MPC/HSM]
    POL[Policy Engine\nRelease Gates]
  end

  subgraph RD[Release & Deployment Plane]
    CD[CD/Release Orchestrator\nStaged Deploys]
    REG[Contract Registry\nProvenance + Inventory]
    RM[Release Manifest\nConfig + Networks]
  end

  subgraph RT[Runtime & Data Plane]
    RPC[RPC Providers\nRedundant Access]
    CHAIN[(Blockchains\nL1/L2/L3)]
    IDX[Indexer/Subgraph\nQuery Layer]
    SIG[SIG\nSignals/Alerts]
    FLO[FLO\nLedger Feeds]
    DRE[DRE\nEcosystem Intel]
    OBS[Dashboards/Runbooks\nOn-call]
  end

  REPO --> CI
  SPEC --> CI
  CI --> SA --> AUD

  AUD --> POL
  POL --> GGP
  IDN --> POL
  CUST --> CD
  GGP --> CD

  CI --> RM --> CD --> REG
  CD --> RPC --> CHAIN

  CHAIN --> IDX --> SIG
  CHAIN --> IDX --> FLO
  CHAIN --> IDX --> OBS

  DRE <--> SIG
  DRE <--> REPO
  REG --> OBS
`;
