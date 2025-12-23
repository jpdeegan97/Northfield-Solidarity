# FLO Internal Architecture Diagram

```mermaid
---
    config:
      theme: redux
---
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
```
