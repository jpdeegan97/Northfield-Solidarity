import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import InteractiveGrowthChart from '../../components/InteractiveGrowthChart.jsx';
import CapitalFlowModel from '../../components/CapitalFlowModel.jsx';
import MermaidDiagram from '../../components/MermaidDiagram.jsx';
import { NS_ENGINES, SL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx';
import { MASTER_PLAN_INDUSTRIES } from '../../data/masterPlan.js';

const MasterPlanView = () => (
    <div className="tab-content fade-in">
        <section className="ir-section">
            <h3 className="section-label">Global Master Plan</h3>
            <p className="lead ir-subtitle" style={{ marginBottom: '3rem' }}>
                A comprehensive map of global industries, identifying systemic friction and opportunities for optimization.
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {MASTER_PLAN_INDUSTRIES.map((industry, index) => (
                    <div key={index} style={{
                        padding: '1.5rem',
                        background: 'var(--c-surface)',
                        border: '1px solid var(--c-border)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'transform 0.2s',
                    }}>
                        <h4 style={{
                            fontSize: '1.1rem',
                            color: 'var(--c-brand)',
                            marginBottom: '1rem',
                            borderBottom: '1px solid var(--c-border)',
                            paddingBottom: '0.5rem'
                        }}>
                            {industry.category}
                        </h4>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            {industry.items.map((sub, idx) => (
                                <li key={idx} style={{
                                    fontSize: '0.9rem',
                                    color: 'var(--c-text-sub)',
                                    marginBottom: '0.5rem',
                                    paddingLeft: '1rem',
                                    borderLeft: '2px solid rgba(255,255,255,0.05)'
                                }}>
                                    {sub}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

const ProgressTrack = ({ progress }) => {
    // Reconstructing from Step 765 visual context
    return (
        <div className="progress-track">
            {['concept', 'spec', 'build', 'live'].map((step) => {
                const stepIndex = ['concept', 'spec', 'build', 'live'].indexOf(step);
                const currentProgress = ['concept', 'spec', 'build', 'live'].indexOf(progress.toLowerCase());
                const active = stepIndex <= currentProgress;
                return (
                    <div key={step} className={`track-segment ${active ? 'active' : ''}`}>
                        <div className="segment-dot"></div>
                        <div className="segment-label">{step}</div>
                    </div>
                );
            })}
        </div>
    );
};

const RoadmapGroup = ({ title, items }) => (
    <div className="roadmap-group" style={{ marginBottom: '3rem' }}>
        <h4 style={{
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--c-text-sub)',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--c-border)',
            paddingBottom: '0.5rem'
        }}>{title}</h4>
        <div className="roadmap-grid">
            {items.map((item, i) => (
                <div key={i} className="roadmap-card">
                    <div className="roadmap-header">
                        <div className="roadmap-status">{item.status || 'Planned'}</div>
                    </div>
                    <div className="roadmap-title">{item.name}</div>
                    <ProgressTrack progress={item.status || 'concept'} />
                </div>
            ))}
        </div>
    </div>
);

const TIMELINE_MONTHS = [
    { month: "Jan '26", label: "Seed Close", active: true },
    { month: "Feb '26", label: "DRE Alpha" },
    { month: "Mar '26", label: "SL Expansion" },
    { month: "Apr '26", label: "Firmament Beta" },
    { month: "May '26", label: "Series A Prep" },
    { month: "Jun '26", label: "Governance V1" },
    { month: "∞", label: "OS", secret: true },
];

const RoadmapTimeline = ({ compact = false }) => {
    const navigate = useNavigate();
    const [clickPattern, setClickPattern] = useState([]);
    const [lastClickTime, setLastClickTime] = useState(0);

    // Tequila Rhythm Logic
    // Pattern: 8 clicks.
    // Intervals: S, S, L, S, S, L, L
    // S = x, L = 2x approx.
    const handleSecretClick = () => {
        const now = Date.now();

        // Reset if too much time has passed since last click (e.g., 2 seconds)
        if (now - lastClickTime > 2000 && clickPattern.length > 0) {
            setClickPattern([now]);
            setLastClickTime(now);
            return;
        }

        const newPattern = [...clickPattern, now];
        setClickPattern(newPattern);
        setLastClickTime(now);

        // Debug feedback
        // console.log("Click count:", newPattern.length);

        if (newPattern.length === 8) {
            // Validate Rhythm
            const deltas = [];
            for (let i = 1; i < newPattern.length; i++) {
                deltas.push(newPattern[i] - newPattern[i - 1]);
            }

            // Calculate average 'short' interval from indices 0, 1, 3, 4

            // Intervals: 0(1-2), 1(2-3), 2(3-4), 3(4-5), 4(5-6), 5(6-7), 6(7-8)
            // Tequila Riff: S, S, L, S, S, L, L 
            // Indices:      0, 1, 2, 3, 4, 5, 6

            const shortIntervals = [deltas[0], deltas[1], deltas[3], deltas[4]];
            const longIntervals = [deltas[2], deltas[5], deltas[6]];

            const avgShort = shortIntervals.reduce((a, b) => a + b, 0) / shortIntervals.length;
            const avgLong = longIntervals.reduce((a, b) => a + b, 0) / longIntervals.length;

            // Strictness factors
            const ratio = avgLong / avgShort;
            const isRatioValid = ratio > 1.5 && ratio < 3.0; // Ideal is ~2.0

            // Consistency check (optional but good)
            // Let's just trust the ratio for "fun" factor, don't be too strict.

            if (isRatioValid) {
                // Success!
                navigate('/os-ideation');
            } else {
                // Reset, pattern failed
                // console.log("Rhythm failed. Ratio:", ratio);
                setClickPattern([]);
            }
        } else if (newPattern.length > 8) {
            setClickPattern([now]); // Start over
        }
    };

    return (
        <div className={`timeline-container ${compact ? 'compact' : ''}`}>
            <div className="timeline-track-line"></div>
            {TIMELINE_MONTHS.map((m) => (
                <div
                    key={m.month}
                    className={`timeline-point ${m.secret ? 'secret-node' : ''}`}
                    onClick={() => m.secret && handleSecretClick()}
                    title={m.secret ? '' : m.label}
                >
                    <div className={`t-dot ${m.active ? 'active' : ''} ${m.secret && clickPattern.length > 0 ? 'pulsing' : ''}`}></div>
                    <div className="t-content">
                        <div className="t-month">{m.secret ? '' : m.month}</div>
                        <div className="t-label">{m.secret ? '' : m.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SystemImplementationGantt = () => {
    const [expanded, setExpanded] = useState(false);
    const [viewMode, setViewMode] = useState("SYSTEM"); // SYSTEM | PROJECTS
    const [horizon, setHorizon] = useState(3); // Months to show

    const [customItems, setCustomItems] = useState([]);

    const availableItems = [...NS_ENGINES, ...SL_ENGINES, ...NS_PROJECTS].sort((a, b) => a.name.localeCompare(b.name));

    const handleAddCustomItem = (code) => {
        const item = availableItems.find(i => i.code === code);
        if (item && !customItems.some(i => i.code === code)) {
            setCustomItems([...customItems, item]);
            setViewMode("PLANNER");
            setExpanded(true);
        }
    };

    // Helper to get dynamic months
    const getMonthLabels = (count) => {
        const months = [];
        const today = new Date();
        for (let i = 0; i < count; i++) {
            const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
            months.push(d.toLocaleString('default', { month: 'short' }));
        }
        return months;
    };

    const monthLabels = getMonthLabels(horizon);
    const totalUnits = horizon * 2; // 2 units per month

    // Mock Gantt Data (start=0 means Current Month)
    // Dynamic Gantt Data Construction
    const buildGanttData = (items, groupByField = 'phase') => {
        // defined order for phases if we want to sort them specifically
        const sortOrder = [
            "Phase 1: Foundation",
            "Phase 2: Alpha Engines",
            "Phase 3: Beta & Release",
            "South Lawn Expansion",
            "Firmament Web App",
            "Core Systems",
            "Internal Tools",
            "Commercial Apps",
            "Experimental"
        ];

        const groups = {};

        items.forEach(item => {
            const tl = item.timeline;
            if (!tl) return;

            // For projects, we use 'category' from timeline, for engines 'phase'
            const groupKey = tl[groupByField] || "Uncategorized";

            if (!groups[groupKey]) {
                groups[groupKey] = {
                    category: groupKey,
                    tasks: []
                };
            }

            groups[groupKey].tasks.push({
                name: item.code ? `${item.name} (${item.code})` : item.name,
                start: tl.start,
                duration: tl.duration,
                color: tl.color || "var(--c-brand)"
            });
        });

        const result = Object.values(groups);

        // Sort groups based on defined order
        result.sort((a, b) => {
            const idxA = sortOrder.indexOf(a.category);
            const idxB = sortOrder.indexOf(b.category);
            if (idxA === -1 && idxB === -1) return 0;
            if (idxA === -1) return 1;
            if (idxB === -1) return -1;
            return idxA - idxB;
        });

        return result;
    };

    const phases = buildGanttData([...NS_ENGINES, ...SL_ENGINES], 'phase');
    const projectPhases = buildGanttData(NS_PROJECTS, 'category');
    const plannerData = buildGanttData(customItems, 'phase'); // Default to phase grouping, or fallback to whatever

    let currentData;
    if (viewMode === "SYSTEM") currentData = phases;
    else if (viewMode === "PROJECTS") currentData = projectPhases;
    else currentData = plannerData;

    return (
        <div className="gantt-container" style={{
            border: '1px solid var(--c-border)',
            borderRadius: '8px',
            background: 'var(--c-bg)',
            overflow: 'hidden',
            marginBottom: '2rem'
        }}>
            <div
                className="gantt-header"
                style={{
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => setExpanded(!expanded)}
                        style={{ fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {viewMode === "SYSTEM" ? "System Implementation Timeline" : "Project Deployment Schedules"}
                        <span style={{ fontSize: '1.2rem', transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▼</span>
                    </div>

                    {/* View Mode Toggle */}
                    <div style={{ display: 'flex', background: 'var(--c-surface)', borderRadius: '4px', border: '1px solid var(--c-border)', overflow: 'hidden', marginLeft: '1rem', zIndex: 10 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); setViewMode("SYSTEM"); if (!expanded) setExpanded(true); }}
                            style={{
                                padding: '4px 12px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                background: viewMode === "SYSTEM" ? 'var(--c-brand)' : 'transparent',
                                color: viewMode === "SYSTEM" ? '#fff' : 'var(--c-text-sub)',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            SYSTEM
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setViewMode("PROJECTS"); if (!expanded) setExpanded(true); }}
                            style={{
                                padding: '4px 12px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                background: viewMode === "PROJECTS" ? 'var(--c-brand)' : 'transparent',
                                color: viewMode === "PROJECTS" ? '#fff' : 'var(--c-text-sub)',
                                border: 'none',
                                cursor: 'pointer',
                                borderLeft: '1px solid var(--c-border)'
                            }}
                        >
                            PROJECTS
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setViewMode("PLANNER"); if (!expanded) setExpanded(true); }}
                            style={{
                                padding: '4px 12px',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                background: viewMode === "PLANNER" ? 'var(--c-brand)' : 'transparent',
                                color: viewMode === "PLANNER" ? '#fff' : 'var(--c-text-sub)',
                                border: 'none',
                                cursor: 'pointer',
                                borderLeft: '1px solid var(--c-border)'
                            }}
                        >
                            PLANNER
                        </button>
                    </div>

                    {/* Planner Dropdown */}
                    {(viewMode === "PLANNER" || expanded) && (
                        <div style={{ marginLeft: '1rem' }}>
                            <select
                                style={{
                                    background: 'var(--c-surface)',
                                    color: 'var(--c-text)',
                                    border: '1px solid var(--c-border)',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '0.75rem',
                                    outline: 'none'
                                }}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        handleAddCustomItem(e.target.value);
                                        e.target.value = ""; // reset
                                    }
                                }}
                            >
                                <option value="">+ Add to Planner Lane...</option>
                                {availableItems.map((item, idx) => (
                                    <option key={`${item.code}-${idx}`} value={item.code}>
                                        {item.name} ({item.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Horizon Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--c-text-sub)' }}>
                    <span>Horizon:</span>
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', padding: '2px' }}>
                        {[3, 6, 12].map(h => (
                            <button
                                key={h}
                                onClick={(e) => { e.stopPropagation(); setHorizon(h); if (!expanded) setExpanded(true); }}
                                style={{
                                    background: horizon === h ? 'var(--c-text-sub)' : 'transparent',
                                    color: horizon === h ? 'var(--c-bg)' : 'var(--c-text-sub)',
                                    border: 'none',
                                    borderRadius: '2px',
                                    padding: '2px 8px',
                                    fontSize: '0.7rem',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                {h}M
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="gantt-body" style={{ padding: '1.5rem', overflowX: 'auto', borderTop: '1px solid var(--c-border)' }}>
                    {/* Month Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `200px repeat(${totalUnits}, 1fr)`,
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--c-border)',
                        paddingBottom: '0.5rem',
                        minWidth: '600px'
                    }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>TASK / PHASE</div>
                        {monthLabels.map(m => (
                            <div key={m} style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '0.8rem', fontWeight: '600', color: 'var(--c-text-sub)' }}>{m}</div>
                        ))}
                    </div>

                    {/* Phases and Tasks */}
                    {currentData.map((group, i) => (
                        <div key={i} style={{ marginBottom: '1.5rem', minWidth: '600px' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: 'var(--c-text-sub)',
                                marginBottom: '0.5rem',
                                paddingLeft: '0.5rem',
                                borderLeft: '3px solid var(--c-border)'
                            }}>
                                {group.category}
                            </div>
                            {group.tasks.map((task, j) => {
                                return (
                                    <div key={j} style={{
                                        display: 'grid',
                                        gridTemplateColumns: `200px repeat(${totalUnits}, 1fr)`,
                                        marginBottom: '6px',
                                        alignItems: 'center',
                                        height: '24px'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
                                            {task.name}
                                        </div>
                                        {/* Bar Track */}
                                        <div style={{ gridColumn: `2 / span ${totalUnits}`, position: 'relative', height: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: `${(task.start / totalUnits) * 100}%`,
                                                width: `${(task.duration / totalUnits) * 100}%`,
                                                height: '100%',
                                                background: task.color,
                                                borderRadius: '4px',
                                                opacity: 0.8,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--c-text-sub)', marginTop: '1rem' }}>
                        *Timeline dynamic relative to current date ({new Date().toLocaleDateString()}).
                    </div>
                </div>
            )}
        </div>
    );
};

const ENTITY_DIAGRAM = `
graph TD
    NS[Northfield Solidarity LLC<br/><span style="font-size:0.8em">HoldCo / Parent</span>]

    subgraph "Operations & Assets"
        SL[South Lawn LLC<br/><span style="font-size:0.8em">Facilities / Real Estate</span>]
        OPS[NSDC Operations LLC<br/><span style="font-size:0.8em">Customer Facing Ops</span>]
        MGMT[NS MGMT LLC<br/><span style="font-size:0.8em">Shared Services</span>]
    end

    subgraph "Intellectual Property & R&D"
        IP[NSDC IP Holdings LLC<br/><span style="font-size:0.8em">IP Owner</span>]
        LAB[NSDC Innovations Lab LLC<br/><span style="font-size:0.8em">Prototyping</span>]
        EXP[NSDC Experimental Lab LLC<br/><span style="font-size:0.8em">High Risk Sandbox</span>]
    end

    %% Ownership
    NS --> SL
    NS --> OPS
    NS --> MGMT
    NS --> IP
    NS --> LAB
    NS --> EXP

    %% Logic Flows
    IP -.->|License| OPS
    LAB -.->|Assigns IP| IP
    EXP -.->|Assigns IP| IP
    SL -.->|Leases Spaces| OPS
    MGMT -.->|Services| OPS & SL & IP

    classDef holdco fill:#0f172a,stroke:#3b82f6,color:#fff,stroke-width:2px;
    classDef op fill:#1e293b,stroke:#94a3b8,color:#fff;
    
    class NS holdco;
    class SL,OPS,MGMT,IP,LAB,EXP op;
`;

const EntityStructureView = () => (
    <div className="tab-content fade-in">
        <section className="ir-section">
            <h3 className="section-label">Organizational Structure</h3>
            <p className="lead ir-subtitle" style={{ marginBottom: '3rem' }}>
                A compartmentalized LLC structure designed to isolate liability, centralize IP ownership, and streamline operations.
            </p>

            <div style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '4rem'
            }}>
                <div style={{ height: '500px', display: 'flex', justifyContent: 'center' }}>
                    <MermaidDiagram code={ENTITY_DIAGRAM} enableZoom={true} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* HoldCo */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Northfield Solidarity LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Parent HoldCo</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Holds founder/member equity and governance controls. Owns membership interests in all subsidiaries. Does not sign customer contracts to keep liability isolated.
                    </p>
                </div>

                {/* IP Co */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#a855f7' }}>NSDC IP Holdings LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>IP Owner</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Owns all codebase, workflows, docs, trademarks, and datasets. Licenses platform IP to OpCo. Receives IP assignments from R&D Labs.
                    </p>
                </div>

                {/* OpCo */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#22c55e' }}>NSDC Operations LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Customer OpCo</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Signs customer contracts (DPA, SLA). Runs billing, support, & customer success. Holds operational vendor contracts.
                    </p>
                </div>

                {/* Real Estate */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#eab308' }}>South Lawn LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Facilities / RE</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Holds leases for physical space and facilities. Leases office/facility use to sister entities via intercompany agreements.
                    </p>
                </div>

                {/* Labs */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#f97316' }}>Innovations & Experimental Labs</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>R&D Subsidiaries</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Isolated environments for prototyping and high-risk experiments. All resulting IP is assigned up to IP Holdings LLC.
                    </p>
                </div>

                {/* MGMT */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#64748b' }}>NS MGMT LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Shared Services</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Centralized employment and contractor management. Charges sister entities via intercompany services + cost allocation.
                    </p>
                </div>

            </div>
        </section>
    </div>
);

const RoadmapView = () => {
    const [isSticky, setIsSticky] = useState(false);
    const staticRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!staticRef.current) return;
            const rect = staticRef.current.getBoundingClientRect();
            // Trigger when the bottom of the static timeline is near the header (72px)
            setIsSticky(rect.bottom < 80);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // check initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="tab-content fade-in">
            {/* Sticky Dropdown Bar */}
            <div className={`sticky-timeline-bar ${isSticky ? 'visible' : ''}`}>
                <div className="sticky-inner">
                    <div className="sticky-label">System Timeline</div>
                    <RoadmapTimeline compact={true} />
                </div>
            </div>

            <section className="ir-section">
                <h3 className="section-label">System Delivery Timeline</h3>
                <p className="lead ir-subtitle" style={{ marginBottom: '3rem' }}>
                    Development velocity and status across the Northfield ecosystem.
                </p>

                <div ref={staticRef} style={{ marginBottom: '2rem' }}>
                    <RoadmapTimeline />
                </div>

                <SystemImplementationGantt />

                <div style={{ marginBottom: '4rem' }}></div>

                <RoadmapGroup title="Core Infrastructure (NS Engines)" items={NS_ENGINES || []} />
                <RoadmapGroup title="Applications & Projects" items={NS_PROJECTS || []} />
                <RoadmapGroup title="South Lawn Operating Engines" items={SL_ENGINES || []} />

            </section>
        </div>
    );
};

const ProposalModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Proposal Submitted! The GGP Committee will review your submission.");
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--c-text-sub)',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>

                <h3 style={{ marginBottom: '0.5rem', color: 'var(--c-text)' }}>Submit Engine Proposal</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--c-text-sub)', fontSize: '0.9rem' }}>
                    Share your concept with the GGP Committee. Confidentiality guaranteed.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Proposal Title</label>
                        <input type="text" required placeholder="e.g. Decentralized Energy Grid" style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)'
                        }} />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Target Tier</label>
                        <select style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)'
                        }}>
                            <option>Tier 1: The Spark (Idea)</option>
                            <option>Tier 2: The Blueprint (Spec)</option>
                            <option>Tier 3: The Architect (Advisory)</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Abstract / Description</label>
                        <textarea required rows="4" placeholder="Describe the core mechanism and value proposition..." style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)',
                            resize: 'vertical'
                        }}></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid var(--c-border)',
                            color: 'var(--c-text-sub)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" className="btn" style={{ padding: '0.75rem 1.5rem' }}>Submit Proposal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PartnerRoyaltyView = () => {
    const [isProposalModalOpen, setProposalModalOpen] = useState(false);
    return (
        <div className="tab-content fade-in">
            <ProposalModal isOpen={isProposalModalOpen} onClose={() => setProposalModalOpen(false)} />
            <section className="ir-section highlight-bg">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="badge ir-badge">Genesis Partners Program</div>
                    <h2 className="deal-title">Turn Ideas Into Perpetual Income</h2>
                    <p className="deal-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        Partners who submit Engine blueprints or Project sparks that are accepted by Northfield Solidarity receive a <strong>perpetual royalty</strong> on the net cash flow generated by that entity.
                    </p>
                </div>

                <div className="metrics-grid" style={{ marginBottom: '3rem' }}>
                    {/* TIER 1 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--c-text-sub)' }}></div>
                        <h3 className="section-label" style={{ color: 'var(--c-text)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 1: The Spark</h3>
                        <div className="metric-value">1.0% - 2.5%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You provide a high-level concept or specific problem/solution set. We do the research, spec, build, and operations.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> Validated Idea / Problem</li>
                            <li><strong>Effort:</strong> Low (One-off submission)</li>
                            <li><strong>Vesting:</strong> Immediate upon Mainnet</li>
                        </ul>
                    </div>

                    {/* TIER 2 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden', borderColor: 'var(--c-brand)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--c-brand)' }}></div>
                        <h3 className="section-label" style={{ color: 'var(--c-brand)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 2: The Blueprint</h3>
                        <div className="metric-value" style={{ color: 'var(--c-brand)' }}>2.5% - 5.0%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You deliver a detailed spec, market analysis, or initial architecture. You help shape the MVP but don't operate it.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> Full Spec / Architecture</li>
                            <li><strong>Effort:</strong> Medium (Workshops / Docs)</li>
                            <li><strong>Vesting:</strong> Immediate upon Mainnet</li>
                        </ul>
                    </div>

                    {/* TIER 3 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden', borderColor: '#a855f7' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#a855f7' }}></div>
                        <h3 className="section-label" style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 3: The Architect</h3>
                        <div className="metric-value" style={{ color: '#a855f7' }}>5.0% - 10.0%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You bring critical IP, key relationships, or ongoing advisory. You are a pseudo-founder for this specific engine.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> IP / Network / Advisory</li>
                            <li><strong>Effort:</strong> High (Ongoing Monthly)</li>
                            <li><strong>Vesting:</strong> 1 Year Cliff / 4 Year Vest</li>
                        </ul>
                    </div>
                </div>

                <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                    <h3 className="section-label">Program Terms & Governance</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <ul className="terms-list">
                            <li><strong>Royalty Base:</strong> Net Distributable Cash Flow (post-OpEx/CapEx).</li>
                            <li><strong>Payment Frequency:</strong> Quarterly distributions via USDC or FIAT.</li>
                            <li><strong>Cap:</strong> Uncapped earnings upside.</li>
                        </ul>
                        <ul className="terms-list">
                            <li><strong>Buyout Option:</strong> NS retains right to buy out royalty at 10x ARR after Year 5.</li>
                            <li><strong>Governance:</strong> Economic interest only. No voting rights or control.</li>
                            <li><strong>Transferability:</strong> Assignable to trusts/entities with approval.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }} onClick={() => setProposalModalOpen(true)}>
                        Submit Engine Proposal
                    </button>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>
                        Proposals are reviewed by the GGP Committee weekly. Acceptance rate is currently ~4%.
                    </p>
                </div>
            </section>
        </div>
    );
};

const LoginView = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = onLogin(email);
        const authorizedRoles = [USER_ROLES.ADMIN, USER_ROLES.INVESTOR, USER_ROLES.SPECIAL_GUEST];

        if (user && authorizedRoles.includes(user.role)) {
            setError(null);
        } else {
            setError('Access Denied: This account is not authorized for Investor Relations.');
        }
    };

    return (
        <Layout>
            <div style={{
                maxWidth: '500px',
                margin: '120px auto',
                textAlign: 'center',
                padding: '3rem',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--c-surface)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <h1 style={{ marginBottom: '1rem', color: 'var(--c-text)', fontSize: '1.5rem' }}>Investor Access</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--c-text-sub)', lineHeight: '1.6' }}>
                    This portal contains confidential financial and operational data. Access is restricted to authorized partners.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter authorized email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px 16px',
                            marginBottom: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--c-border)',
                            background: 'var(--c-bg)',
                            color: 'var(--c-text)',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Access Portal
                    </button>
                </form>

                {error && (
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        {error}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default function Investors() {
    const { role, login } = useAuth();
    const [activeTab, setActiveTab] = useState('projections');

    const authorizedRoles = [USER_ROLES.ADMIN, USER_ROLES.INVESTOR, USER_ROLES.SPECIAL_GUEST];
    const isAuthorized = authorizedRoles.includes(role);

    if (!isAuthorized) {
        return <LoginView onLogin={login} />;
    }

    return (
        <div data-theme="water">
            <Layout
                nav={[
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "WSP", to: "/wsp" },
                    { type: "divider" },
                    { label: "Documentation", to: "/docs" },
                    { label: "Pricing", to: "/pricing" },
                    { label: "System", to: "/system" },
                    { label: "Investor Relations", to: "/investors" },
                ]}
            >
                <div className="investor-portal">
                    {/* Header */}
                    <div className="ir-header">
                        <div className="badge ir-badge">Series Seed: Open</div>
                        <h1 className="h1 ir-title">Northfield Capital Access</h1>
                        <p className="lead ir-subtitle">
                            Real-time transparency into our operational metrics, funding status, and capital deployment capability.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="tab-nav">
                        <button
                            className={`tab-btn ${activeTab === 'projections' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projections')}
                        >
                            Projections
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'funding' ? 'active' : ''}`}
                            onClick={() => setActiveTab('funding')}
                        >
                            Series Funding
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'partner' ? 'active' : ''}`}
                            onClick={() => setActiveTab('partner')}
                        >
                            Partner Royalty
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'capital' ? 'active' : ''}`}
                            onClick={() => setActiveTab('capital')}
                        >
                            Capital Flow Projections
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
                            onClick={() => setActiveTab('roadmap')}
                        >
                            System Roadmap
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'structure' ? 'active' : ''}`}
                            onClick={() => setActiveTab('structure')}
                        >
                            Entity Structure
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'master-plan' ? 'active' : ''}`}
                            onClick={() => setActiveTab('master-plan')}
                        >
                            Master Plan
                        </button>
                    </div>

                    {/* TAB CONTENT: Partner Royalty */}
                    {activeTab === 'partner' && <PartnerRoyaltyView />}

                    {/* TAB CONTENT: Projections */}
                    {activeTab === 'projections' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Live Operational Metrics</h3>
                                <div className="metrics-grid">
                                    <div className="metric-card">
                                        <div className="metric-label">Annual Recurring Revenue</div>
                                        <div className="metric-value">$0</div>
                                        <div className="metric-delta neutral">-- pre-revenue</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Active Engines Deployed</div>
                                        <div className="metric-value">0</div>
                                        <div className="metric-delta neutral">-- launching</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Gross Margins</div>
                                        <div className="metric-value">--</div>
                                        <div className="metric-delta neutral">--</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">CAC Payback</div>
                                        <div className="metric-value">--</div>
                                        <div className="metric-delta neutral">--</div>
                                    </div>
                                </div>
                            </section>

                            <section className="ir-section">
                                <h3 className="section-label">Projected Growth Scenarios</h3>
                                <InteractiveGrowthChart />
                                <p className="chart-caption" style={{ marginTop: '20px' }}>
                                    Adjust the slider to view Conservative, Base, and Aggressive growth projections driven by Firmament enterprise adoption.
                                </p>
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Series Funding */}
                    {activeTab === 'funding' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section highlight-bg">
                                <div className="split-layout">
                                    <div className="deal-info">
                                        <h3 className="section-label">Current Round Status</h3>
                                        <h2 className="deal-title">Series Seed</h2>
                                        <p className="deal-desc">
                                            Raising capital to scale the <strong>Deep Research Engine (DRE)</strong> and accelerate South Lawn portfolio acquisition.
                                        </p>
                                        <div className="funding-progress-container">
                                            <div className="funding-labels">
                                                <span>Committed: <strong>$0</strong></span>
                                                <span>Target: <strong>$2.50M</strong></span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: '0%' }}></div>
                                            </div>
                                            <div className="funding-note">Round opening soon.</div>
                                        </div>
                                        <div className="ctaRow">
                                            <button className="btn">Request Data Room Access</button>
                                            <button className="btn ghost">Download Deck (PDF)</button>
                                        </div>
                                    </div>
                                    <div className="deal-stats">
                                        <h3 className="section-label">Round Terms</h3>
                                        <ul className="terms-list">
                                            <li><strong>Instrument:</strong> SAFE (Post-Money)</li>
                                            <li><strong>Valuation Cap:</strong> $12M</li>
                                            <li><strong>Discount:</strong> 20%</li>
                                            <li><strong>Min Check:</strong> $25k</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Capital Flow */}
                    {activeTab === 'capital' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Capital Deployment & Projections</h3>
                                <p className="lead ir-subtitle" style={{ marginBottom: '2rem' }}>
                                    Dynamic modeling of revenue streams based on ecosystem adoption and service expansion.
                                </p>
                                <CapitalFlowModel />
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Roadmap */}
                    {activeTab === 'roadmap' && <RoadmapView />}

                    {/* TAB CONTENT: Entity Structure */}
                    {activeTab === 'structure' && <EntityStructureView />}

                    {/* TAB CONTENT: Master Plan */}
                    {activeTab === 'master-plan' && <MasterPlanView />}




                    {/* Updates Feed (Global) */}
                    <section className="ir-section">
                        <h3 className="section-label">Live Updates</h3>
                        <div className="feed-list">
                            <div className="feed-item" style={{ color: 'var(--c-text-sub)', fontStyle: 'italic', paddingLeft: '0' }}>
                                <div className="feed-content">
                                    No public updates available.
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Layout>

            <style>{`
                .investor-portal {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: var(--space-12) var(--space-4);
                }

                .ir-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .tab-nav {
                    display: flex;
                    justify-content: center;
                    gap: var(--space-4);
                    margin-bottom: 4rem;
                    border-bottom: 1px solid var(--c-border);
                    padding-bottom: 0;
                }

                .tab-btn {
                    padding: var(--space-3) var(--space-4);
                    background: none;
                    border: none;
                    color: var(--c-text-sub);
                    font-size: 0.95rem;
                    cursor: pointer;
                    font-weight: 500;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s ease;
                }

                .tab-btn:hover {
                    color: var(--c-text);
                }

                .tab-btn.active {
                    color: var(--c-brand);
                    border-bottom-color: var(--c-brand);
                }

                .tab-content.fade-in {
                    animation: fadeIn 0.4s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ir-section {
                    margin-bottom: 3rem;
                }

                .secret-node {
                    opacity: 0.1;
                    transition: all 0.3s ease;
                    cursor: default;
                }
                .secret-node:hover {
                    opacity: 1;
                    cursor: pointer;
                    transform: scale(1.1);
                }

                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
                }

                .pulsing {
                    background: red !important;
                    animation: pulse-red 0.5s infinite;
                }

                .ir-badge {
                    background: var(--c-brand);
                    color: white;
                    display: inline-block;
                    margin-bottom: var(--space-4);
                    font-size: 0.9rem;
                    letter-spacing: 0.05em;
                }

                .ir-title {
                    margin-bottom: var(--space-4);
                    font-size: 2.5rem;
                }

                .ir-subtitle {
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                    color: var(--c-text-sub);
                }

                .section-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--c-text-sub);
                    margin-bottom: var(--space-4);
                    border-bottom: 1px solid var(--c-border);
                    padding-bottom: var(--space-2);
                }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: var(--space-4);
                }

                .metric-card {
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-md);
                    padding: var(--space-5);
                }

                .metric-label {
                    font-size: 0.85rem;
                    color: var(--c-text-sub);
                    margin-bottom: var(--space-2);
                }

                .metric-value {
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin-bottom: var(--space-2);
                    color: var(--c-text);
                }

                .metric-delta {
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .metric-delta.positive { color: #10b981; } /* Green */
                .metric-delta.negative { color: #ef4444; } /* Red */
                .metric-delta.neutral { color: var(--c-text-sub); }

                /* Highlight Section */
                .highlight-bg {
                    background: rgba(56, 189, 248, 0.03); /* Subtle brand tint */
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-lg);
                    padding: var(--space-8);
                    /* margin-bottom removed to inherit from .ir-section */
                }

                .split-layout {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: var(--space-8);
                }
                @media(max-width: 768px) {
                    .split-layout { grid-template-columns: 1fr; }
                }

                .deal-title {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: var(--space-3);
                }
                
                .deal-desc {
                    margin-bottom: var(--space-6);
                    line-height: 1.6;
                    color: var(--c-text-sub);
                }

                .funding-progress-container {
                    margin-bottom: var(--space-6);
                }

                .funding-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    margin-bottom: var(--space-2);
                }

                .progress-bar {
                    height: 12px;
                    background: var(--c-border);
                    border-radius: 6px;
                    overflow: hidden;
                    margin-bottom: var(--space-2);
                }

                .progress-fill {
                    height: 100%;
                    background: var(--c-brand);
                    border-radius: 6px;
                    transition: width 1s ease-out;
                }

                .funding-note {
                    font-size: 0.8rem;
                    color: var(--c-text-sub);
                    font-style: italic;
                }

                .terms-list {
                    list-style: none;
                    padding: 0;
                }
                .terms-list li {
                    padding: 12px 0;
                    border-bottom: 1px solid var(--c-border);
                    font-size: 0.9rem;
                    display: flex;
                    justify-content: space-between;
                }
                .terms-list li:last-child { border-bottom: none; }

                /* Chart */
                .chart-container {
                    height: 250px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: var(--space-4);
                    padding: 20px 0;
                    border-bottom: 1px solid var(--c-border);
                }

                .bar-group {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                }

                .bar-track {
                    width: 40px;
                    height: 80%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                }

                .bar-fill {
                    width: 100%;
                    background: var(--c-border);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.5s ease;
                }
                .bar-fill.active {
                    background: var(--c-brand);
                }

                .bar-label {
                    margin-top: 10px;
                    font-size: 0.8rem;
                    color: var(--c-text-sub);
                }
                
                .chart-caption {
                    text-align: center;
                    font-size: 0.9rem;
                    color: var(--c-text-sub);
                    margin-bottom: var(--space-10);
                }

                /* Feed */
                .feed-list {
                    border-left: 2px solid var(--c-border);
                    padding-left: var(--space-6);
                    margin-left: var(--space-2);
                }

                .feed-item {
                    position: relative;
                    margin-bottom: var(--space-6);
                }
                .feed-item::before {
                    content: '';
                    position: absolute;
                    left: calc(-1 * var(--space-6) - 5px);
                    top: 6px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--c-brand);
                    border: 2px solid var(--c-bg);
                }

                .feed-date {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--c-text-sub);
                    margin-bottom: 4px;
                }

                .feed-content {
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                /* --- Roadmap Visualization --- */
                .roadmap-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: var(--space-4);
                }

                .roadmap-card {
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-md);
                    padding: var(--space-5);
                    transition: all 0.2s ease;
                }
                .roadmap-card:hover {
                    border-color: var(--c-brand);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }

                .roadmap-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--space-3);
                }
                
                .roadmap-status {
                    font-size: 0.75rem;
                    color: var(--c-text-sub);
                    text-transform: uppercase;
                    background: rgba(255,255,255,0.05);
                    padding: 2px 6px;
                    border-radius: 4px;
                }

                .roadmap-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: var(--space-5);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* Progress Track */
                .progress-track {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                }
                /* Line behind segments */
                .progress-track::before {
                    content: '';
                    position: absolute;
                    top: 5px; /* Half dot height */
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: var(--c-border);
                    z-index: 0;
                }

                .track-segment {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 25%;
                }

                .segment-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--c-surface); /* Hide line under dot */
                    border: 1px solid var(--c-border);
                    margin-bottom: 8px;
                    transition: all 0.3s;
                }
                
                .track-segment.active .segment-dot {
                    background: var(--c-brand);
                    border-color: var(--c-brand);
                    box-shadow: 0 0 6px var(--c-brand);
                }

                .segment-label {
                    font-size: 0.65rem;
                    color: var(--c-text-sub);
                    text-transform: uppercase;
                }
                .track-segment.active .segment-label {
                    color: var(--c-text);
                    font-weight: 600;
                }

                /* --- Global Roadmap Timeline --- */
                .timeline-container {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 0;
                    position: relative;
                    padding: 20px 0;
                }

                .timeline-track-line {
                    position: absolute;
                    top: 26px; /* center of dots */
                    left: 20px;
                    right: 20px;
                    height: 2px;
                    background: var(--c-border);
                    z-index: 0;
                }
                
                .timeline-point {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }

                .t-dot {
                    width: 14px;
                    height: 14px;
                    background: var(--c-surface);
                    border: 2px solid var(--c-border);
                    border-radius: 50%;
                    margin-bottom: 12px;
                    transition: all 0.3s;
                }
                .t-dot.active {
                    background: var(--c-brand);
                    border-color: var(--c-brand);
                    box-shadow: 0 0 0 4px var(--c-brand-light);
                }

                .t-content {
                    text-align: center;
                }

                .t-month {
                    font-size: 0.8rem;
                    color: var(--c-text-sub);
                    font-weight: 500;
                    margin-bottom: 4px;
                }
                .t-label {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--c-text);
                }

                /* Compact / Sticky Styles */
                .sticky-timeline-bar {
                    position: fixed;
                    top: -100px;
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid var(--c-border);
                    z-index: 900; /* below header (1000) */
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    justify-content: center;
                    opacity: 0;
                    pointer-events: none;
                }
                .sticky-timeline-bar.visible {
                    top: 73px; /* Header height + 1px */
                    opacity: 1;
                    pointer-events: auto;
                }

                .sticky-inner {
                    max-width: 1000px;
                    width: 100%;
                    padding: 0 var(--space-4);
                    display: flex;
                    align-items: center;
                    height: 60px;
                }

                .sticky-label {
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-right: var(--space-6);
                    color: var(--c-text-sub);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .timeline-container.compact {
                    padding: 0;
                    flex: 1;
                    display: flex; /* Override grid */
                    justify-content: space-between;
                }
                .timeline-container.compact .timeline-track-line {
                   display: none;
                }
  
                .timeline-container.compact .t-dot {
                    width: 8px;
                    height: 8px;
                    border-width: 1px;
                    margin-bottom: 0;
                    margin-right: 8px;
                }
                
                .timeline-container.compact .timeline-point {
                    flex-direction: row;
                    justify-content: center;
                }
                
                .timeline-container.compact .t-content {
                    text-align: left;
                }
                
                .timeline-container.compact .t-month {
                    display: none; 
                }
                
                .timeline-container.compact .t-label {
                    font-size: 0.8rem;
                    white-space: nowrap;
                }

            `}</style>
        </div>
    );
}
