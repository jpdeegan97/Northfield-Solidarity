# CDE Internal Architecture Diagram

```mermaid
---
    config:
      theme: redux
---
graph TD
    %% -- Styles --
    classDef intake fill:#e0f7fa,stroke:#006064,stroke-width:2px,color:#000000;
    classDef gov fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000;
    classDef orch fill:#e8eaf6,stroke:#1a237e,stroke-width:2px,color:#000000;
    classDef exec fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000000;
    classDef adapter fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef feedback fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef event fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#000000;

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
```
