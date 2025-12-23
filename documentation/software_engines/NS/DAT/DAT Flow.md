# DAT Internal Architecture Diagram

```mermaid
---
    config:
      theme: redux
---
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
```
