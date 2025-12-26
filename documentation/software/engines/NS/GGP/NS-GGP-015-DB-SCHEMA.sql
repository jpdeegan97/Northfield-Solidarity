-- ==============================================================================
-- NS-GGP-015-DB-SCHEMA.sql
-- Engine: Global Governance Plane (GGP)
-- Database: PostgreSQL (Authoritative Write Model)
-- 
-- Concepts:
-- 1. Components & Versioning: Implements "Governance as Code".
-- 2. Graph Dependencies: Enforces impact analysis.
-- 3. Transactional Outbox: Guarantees event publication.
-- 4. Immutable Audit: Full execution traceability.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ENUMS (Type Safety)
-- ==============================================================================

CREATE TYPE ggp_component_type AS ENUM (
    'policy',
    'rule',
    'standard',
    'procedure',
    'mandate',
    'role'
);

CREATE TYPE ggp_component_status AS ENUM (
    'draft',
    'review',
    'approved',
    'active',
    'deprecated',
    'revoked'
);

CREATE TYPE ggp_execution_status AS ENUM (
    'pending',
    'running',
    'completed',
    'failed',
    'rejected'
);

-- ==============================================================================
-- 2. CORE COMPONENTS (The "Code" of Governance)
-- ==============================================================================

-- 2.1 Component Head (Latest State)
-- Defines the existence and current metadata of a governance object.
CREATE TABLE ggp_components (
    component_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- e.g., GGP-POL-001
    name VARCHAR(255) NOT NULL,
    type ggp_component_type NOT NULL,
    owner_role_id VARCHAR(100) NOT NULL, -- Link to IDN
    current_version VARCHAR(20) NOT NULL DEFAULT '0.0.0', -- Semantic Version
    status ggp_component_status NOT NULL DEFAULT 'draft',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.2 Component Versions (Immutable History)
-- Every change to a component creates a new version record here.
-- This supports "Time Travel" queries for governance state.
CREATE TABLE ggp_component_versions (
    version_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_id UUID NOT NULL REFERENCES ggp_components(component_id),
    version VARCHAR(20) NOT NULL, -- 1.0.0
    effective_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    effective_to TIMESTAMP WITH TIME ZONE, -- Null means "current/forever"
    
    -- Content Payload (The actual rule logic or text)
    content_bucket_ref VARCHAR(255), -- Pointer to blob/doc store if large
    content_hash VARCHAR(64) NOT NULL, -- SHA-256 for integrity
    content_body JSONB, -- Inline logic (e.g. OPA Rego, JSON rules)
    
    change_reason TEXT NOT NULL,
    approved_by_execution_id UUID, -- Link to the GGP Execution that approved this
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE (component_id, version)
);

-- 2.3 Dependencies (The Graph)
-- Tracks which components depend on which others.
-- Used by UDP (Update Decision Prompt) to calculate blast radius.
CREATE TABLE ggp_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_component_id UUID NOT NULL REFERENCES ggp_components(component_id),
    target_component_id UUID NOT NULL REFERENCES ggp_components(component_id),
    dependency_type VARCHAR(50) NOT NULL, -- 'imports', 'enforces', 'extends'
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE (source_component_id, target_component_id, dependency_type)
);

-- ==============================================================================
-- 3. SOP COMPILATION (Aggregates)
-- ==============================================================================

-- 3.1 SOP Collections
CREATE TABLE ggp_sops (
    sop_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- e.g., SOP-INCIDENT-RESP
    name VARCHAR(255) NOT NULL,
    owner_role_id VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.2 SOP Versions (Snapshots)
-- An SOP Version is a specific point-in-time collection of Component Versions.
CREATE TABLE ggp_sop_versions (
    sop_version_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sop_id UUID NOT NULL REFERENCES ggp_sops(sop_id),
    version VARCHAR(20) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Snapshot of included components
    -- JSONB Array: [{ "component_id": "...", "version": "1.2.0" }]
    files_manifest JSONB NOT NULL,
    
    -- PDF/Doc artifact ref
    artifact_ref VARCHAR(255),
    
    approved_by_execution_id UUID,
    
    UNIQUE (sop_id, version)
);

-- ==============================================================================
-- 4. EXECUTION & AUDIT (The "Runtime" of Governance)
-- ==============================================================================

-- 4.1 Executions (Workflows)
-- Tracks a specific decision process (e.g. "Upgrade Policy X").
CREATE TABLE ggp_executions (
    execution_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- 'proposal', 'vote', 'udp_evaluation'
    status ggp_execution_status NOT NULL DEFAULT 'pending',
    
    triggered_by_actor_id VARCHAR(100) NOT NULL, -- Link to IDN
    context JSONB, -- Context variables (e.g. PR link, Jira ticket)
    
    outcome_decision VARCHAR(50), -- 'approve', 'deny'
    outcome_rationale TEXT, -- Summary of why
    
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 4.2 Execution Events (Immutable Log)
-- Every step in the execution (e.g. "Rule Checked", "Vote Cast").
CREATE TABLE ggp_execution_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    execution_id UUID NOT NULL REFERENCES ggp_executions(execution_id),
    event_type VARCHAR(100) NOT NULL, -- 'vote_cast', 'policy_check_passed'
    actor_id VARCHAR(100),
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    payload JSONB -- Detail of the event
);

-- ==============================================================================
-- 5. TRANSACTIONAL OUTBOX (Kafka Reliability)
-- ==============================================================================

-- Any change to the above tables MUST also insert a record here in the same transaction.
-- The Outbox Publisher services reads this table and pushes to Kafka.
CREATE TABLE ggp_outbox_events (
    outbox_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aggregate_type VARCHAR(50) NOT NULL, -- 'component', 'execution', 'sop'
    aggregate_id UUID NOT NULL,
    
    event_type VARCHAR(100) NOT NULL, -- 'ggp.component.updated', 'ggp.execution.completed'
    payload JSONB NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE, -- Null = pending
    
    attempt_count INT DEFAULT 0,
    last_error TEXT
);

-- Index for the poller
CREATE INDEX idx_ggp_outbox_pending ON ggp_outbox_events (created_at) WHERE published_at IS NULL;

-- ==============================================================================
-- 6. INDEXES & CONSTRAINTS
-- ==============================================================================

CREATE INDEX idx_component_versions_cid ON ggp_component_versions(component_id);
CREATE INDEX idx_dependencies_source ON ggp_dependencies(source_component_id);
CREATE INDEX idx_dependencies_target ON ggp_dependencies(target_component_id);
CREATE INDEX idx_executions_status ON ggp_executions(status);
CREATE INDEX idx_execution_events_exid ON ggp_execution_events(execution_id);

-- GGP Design Paradigm:
-- 1. All changes to `ggp_components` MUST append to `ggp_component_versions`.
-- 2. `ggp_sop_versions` are immutable snapshots.
-- 3. `ggp_outbox_events` ensures eventual consistency with the Read Model (MongoDB).
