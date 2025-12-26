# NS-BOOM-003-ARCHITECTURE — Project Architecture

## Boomerang is a project, not an engine
Boomerang is a standardized workflow that can use existing engines/tools:
- **DRE** for research units and market intelligence capture
- **LUM** for observability and metrics dashboards
- **GGE** for policy gates and compliance (brand/outreach/data handling)
- **quickscope (Intervention)** for state management of runs
- **DAT (optional)** as an execution runner, but Boomerang remains separate as the methodology + reporting product

## Logical Components
- **RunSpec Builder**
- **Asset Bundle Manager**
- **Execution Controller**
- **Telemetry Collector**
- **Report Generator**
- **Strategy Library**
- **Market × Strategy Knowledge Base**

## Data Flow
RunSpec → Assets → Launch → Telemetry → Report → Library Update → Decision
