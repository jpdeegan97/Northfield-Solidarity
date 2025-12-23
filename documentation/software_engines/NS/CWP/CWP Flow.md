# CWP Internal Architecture Diagram

```mermaid
---
    config:
      theme: redux
---
graph TD
    %% -- Styles --
    classDef work fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000000;
    classDef agent fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000;
    classDef super fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000;
    classDef review fill:#fbe9e7,stroke:#bf360c,stroke-width:2px,color:#000000;
    classDef db fill:#eceff1,stroke:#37474f,stroke-width:2px,color:#000000;
    classDef event fill:#fffde7,stroke:#fbc02d,stroke-width:2px,color:#000000;
    classDef portal fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000000;

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
```
