# GGP Internal Architecture Diagram

```mermaid
graph TD
    %% -- Styles --
    classDef frontend fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000000;
    classDef api fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000000;
    classDef logic fill:#fff8e1,stroke:#ff6f00,stroke-width:2px,color:#000000;
    classDef db fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000000;
    classDef event fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000;
    classDef worker fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000000;

    %% -- Frontend Layer --
    subgraph FE [Frontend Layer]
        UI[React Frontend MVP<br/>(Read-Only Audit & History)]:::frontend
    end

    %% -- API Layer --
    subgraph API [API Layer]
        ReadAPI[Read API<br/>(Backend-for-Frontend)]:::api
        WriteAPI[Write API<br/>(Internal/Trigger)]:::api
    end

    %% -- Core Logic Layer --
    subgraph Core [Core Logic & Engines]
        DGE[Dependency Graph Engine]:::logic
        UDE[Update Decision Engine<br/>(LLM-Assisted)]:::logic
        WVE[Workflow & Versioning Engine]:::logic
        SOPC[SOP Compiler]:::logic
    end

    %% -- Data Persistence Layer (Dual Store) --
    subgraph Storage [Persistence Layer]
        PG[(PostgreSQL<br/>System of Record)]:::db
        Mongo[(MongoDB<br/>Read Models)]:::db
    end

    %% -- Event Backbone --
    subgraph EventBus [Event Backbone]
        Outbox[Outbox Table<br/>(in Postgres)]:::db
        Publisher[Outbox Publisher<br/>(Worker)]:::worker
        Kafka{Kafka Message Bus}:::event
        Projector[Mongo Projector<br/>(Consumer)]:::worker
    end

    %% -- Data Flow Connections --

    %% Read Path
    UI -- "GET /executions, /sops" --> ReadAPI
    ReadAPI -- "Query Read Views" --> Mongo

    %% Write/Trigger Path
    WriteAPI -- "Trigger Event" --> WVE
    WVE -- "Consult Dependencies" --> DGE
    WVE -- "Request Decision" --> UDE
    WVE -- "Generate Artifacts" --> SOPC
    
    %% Persistence (Transactional)
    WVE -- "Write Canonical State<br/>(Executions, Components)" --> PG
    WVE -- "Insert Outbox Event<br/>(Same Transaction)" --> Outbox

    %% Async Event Propagation
    Outbox -.-> Publisher
    Publisher -- "Publish Event" --> Kafka
    Kafka -- "Consume Topic" --> Projector
    Projector -- "Materialize View" --> Mongo

    %% Detailed Data Models (Notes)
    PG -.-> PGModels["Tables:<br/>- executions<br/>- components<br/>- sop_versions<br/>- outbox_events"]:::db
    Mongo -.-> MongoModels["Collections:<br/>- execution_audit_view<br/>- sop_history_view"]:::db
```
