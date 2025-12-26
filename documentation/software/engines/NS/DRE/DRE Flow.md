# DRE Internal Architecture Diagram

```mermaid
---
    config:
      theme: redux
---
graph TD
    %% -- Styles --
    classDef ingest fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef store fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef synth fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000;
    classDef gov fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef output fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000000;
    classDef cross fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:#000000;

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
```
