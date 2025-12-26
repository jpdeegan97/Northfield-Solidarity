import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import InteractiveGrowthChart from '../../components/InteractiveGrowthChart.jsx';
import CapitalFlowModel from '../../components/CapitalFlowModel.jsx';
import MermaidDiagram from '../../components/MermaidDiagram.jsx';
import { NS_ENGINES, SL_ENGINES, NS_BMP } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx'; // Ensure this file exists or remove if not needed. Step 765 didn't show this import but Step 864 uses NS_PROJECTS

// getPhase removed


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
    { month: "∞", label: "OS", path: "/os-ideation", highlight: true },
];

const RoadmapTimeline = ({ compact = false }) => {
    const navigate = useNavigate();

    return (
        <div className={`timeline-container ${compact ? 'compact' : ''}`}>
            <div className="timeline-track-line"></div>
            {TIMELINE_MONTHS.map((m) => (
                <div
                    key={m.month}
                    className={`timeline-point ${m.highlight ? 'highlight-node' : ''}`}
                    onClick={() => m.path && navigate(m.path)}
                    title={m.label}
                    style={{ cursor: m.path ? 'pointer' : 'default' }}
                >
                    <div className={`t-dot ${m.active ? 'active' : ''} ${m.highlight ? 'pulsing' : ''}`}></div>
                    <div className="t-content">
                        <div className="t-month">{m.month}</div>
                        <div className="t-label">{m.label}</div>
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
    const [surge, setSurge] = useState(false);

    useEffect(() => {
        // "Every 5 (biz) seconds"
        const interval = setInterval(() => {
            setSurge(true);
            setTimeout(() => setSurge(false), 2500); // Surge lasts 2.5s for "liquid" feel
        }, 5000 + 2500); // Cycle: 5s rest + 2.5s active? User said "Every 5 seconds". Let's do 5s interval start-to-start or gap? "Every 5s I want you to..." implies event frequency. Let's do 8s total cycle (5s wait).

        // Actually simplest interpretation: Trigger every 5s.
        // If surge lasts 2s, we trigger at t=0, t=5, t=10.
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Run once: Expand then Contract
        const timer = setTimeout(() => {
            setSurge(true);
            setTimeout(() => setSurge(false), 1500); // Shorter hold
        }, 1000); // Initial delay

        return () => clearTimeout(timer);
    }, []);

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

    const [velocityMode, setVelocityMode] = useState('standard'); // standard | warp
    const [selectedSprint, setSelectedSprint] = useState(null);

    // Dynamic Data Generation for "Short & Realistic" Timelines
    const getColors = (cat) => {
        const map = {
            'Governance': '#a855f7',
            'Identity': '#ec4899',
            'Research': '#3b82f6',
            'Execution': '#10b981',
            'Integration': '#f59e0b',
            'SOP': '#ef4444',
            'State': '#6366f1',
            'System': '#64748b',
            'Resilience': '#f43f5e',
            'BMP': '#f472b6'
        };
        return map[cat] || 'var(--c-brand)';
    };

    const generateEnginePhases = () => {
        const groups = {};
        const allEngines = [...NS_ENGINES, ...SL_ENGINES];

        const catOrder = ['Governance', 'Identity', 'System', 'Research', 'Execution', 'Integration', 'Simulation', 'Incubator', 'Operations', 'Resilience', 'Observability', 'Portfolio', 'BMP'];

        // Sorting all engines first to sequence them properly in Warp mode
        const sortedEngines = [...allEngines].sort((a, b) => {
            const idxA = catOrder.indexOf(a.category || 'Other');
            const idxB = catOrder.indexOf(b.category || 'Other');
            return (idxA > -1 ? idxA : 99) - (idxB > -1 ? idxB : 99);
        });

        sortedEngines.forEach((eng, globalIndex) => {
            const cat = eng.category || 'Other';
            if (!groups[cat]) groups[cat] = [];

            let start, duration;

            if (velocityMode === 'warp') {
                // WARP MODE: Sequential 3-day sprints starting Dec 26
                // 3 days = 0.1 months (approx)
                start = globalIndex * 0.1;
                duration = 0.1;
            } else {
                // Standard: Overlapping waterfall
                const catRank = catOrder.indexOf(cat) > -1 ? catOrder.indexOf(cat) : 10;
                // Much tighter timeline as requested
                const startOffset = catRank * 0.1; // Reduced from 0.4
                const internalOffset = groups[cat].length * 0.05; // Reduced from 0.2
                start = startOffset + internalOffset;
                duration = 0.3 + (Math.random() * 0.2); // Reduced from 1.0+
            }

            groups[cat].push({
                name: `${eng.name} (${eng.code})`,
                code: eng.code,
                start: start,
                duration: duration,
                color: getColors(cat),
                // Generate detailed plan for modal
                plan: generateSprintPlan(eng.name, eng.code)
            });
        });

        return Object.entries(groups)
            .sort(([a], [b]) => {
                const idxA = catOrder.indexOf(a);
                const idxB = catOrder.indexOf(b);
                return (idxA > -1 ? idxA : 99) - (idxB > -1 ? idxB : 99);
            })
            .map(([category, tasks]) => ({ category, tasks }));
    };

    const generateProjectPhases = () => {
        const tasks = NS_PROJECTS.map((proj, i) => ({
            name: proj.name,
            code: proj.code,
            start: velocityMode === 'warp' ? i * 0.1 : 0.5 + (i * 0.3),
            duration: velocityMode === 'warp' ? 0.1 : 1.5,
            color: '#06b6d4',
            plan: generateSprintPlan(proj.name, proj.code)
        }));

        return [
            { category: "Active Projects", tasks: tasks.slice(0, Math.ceil(tasks.length / 2)) },
            { category: "Pipeline", tasks: tasks.slice(Math.ceil(tasks.length / 2)) }
        ];
    };

    // Helper to generate fake but realistic 25m chunks
    const generateSprintPlan = (name, code) => {
        const days = ['Day 1: Scaffolding & Core', 'Day 2: Logic & Integration', 'Day 3: Polish & Ship'];
        const sessionsPerDay = 8; // 8x 25m sessions = 4 hours deep work per day

        return days.map((day, dIdx) => ({
            day,
            sessions: Array(sessionsPerDay).fill(0).map((_, sIdx) => {
                // Procedural task generation
                const timeStr = `${9 + Math.floor(sIdx / 2)}:${sIdx % 2 === 0 ? '00' : '30'} ${sIdx < 6 ? 'AM' : 'PM'}`; // Simple time blocks

                let task = "Core Implementation";
                if (dIdx === 0) {
                    if (sIdx < 2) task = "Repo Setup & Environment Config";
                    else if (sIdx < 5) task = "Data Models & Schemas (DB)";
                    else task = "Base API Endpoints & Types";
                } else if (dIdx === 1) {
                    if (sIdx < 3) task = "Business Logic services";
                    else if (sIdx < 6) task = "Frontend Component Integration";
                    else task = "State Management Wiring";
                } else {
                    if (sIdx < 3) task = "UI Polish & Animations";
                    else if (sIdx < 6) task = "Edge Case Testing & Fixes";
                    else task = "Deployment & Documentation";
                }

                return { time: `+${sIdx * 25}m`, task: `[${code}] ${task} (${timeStr})` };
            })
        }));
    };

    const phases = generateEnginePhases();
    const projectPhases = generateProjectPhases();
    const currentData = viewMode === "SYSTEM" ? phases : projectPhases;

    return (
        <div className="gantt-container" style={{
            border: '1px solid var(--c-border)',
            borderRadius: '8px',
            background: 'var(--c-bg)',
            overflow: 'hidden',
            marginBottom: '2rem',
            position: 'relative'
        }}>
            {/* Sprint Plan Modal Overlay */}
            {selectedSprint && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }} onClick={() => setSelectedSprint(null)}>
                    <div style={{
                        width: '800px',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        background: '#0f172a',
                        border: '1px solid var(--c-brand)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 0 50px rgba(168, 85, 247, 0.2)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.2rem' }}>🚀 MVP Execution Plan: {selectedSprint.name}</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--c-brand)' }}>3-Day Sprint Strategy • Focus Blocks (25m)</div>
                            </div>
                            <button onClick={() => setSelectedSprint(null)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <div style={{ padding: '2rem', overflowY: 'auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {selectedSprint.plan.map((day, i) => (
                                    <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--c-border)' }}>
                                        <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '0.5rem' }}>{day.day}</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {day.sessions.map((sesh, j) => (
                                                <div key={j} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', alignItems: 'center' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: j % 2 === 0 ? 'var(--c-brand)' : '#3b82f6' }}></div>
                                                    <div style={{ color: 'var(--c-text-sub)', minWidth: '40px' }}>25m</div>
                                                    <div style={{ color: '#fff' }}>{sesh.task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '6px', textAlign: 'center', color: '#86efac', fontSize: '0.9rem', cursor: 'pointer' }}>
                                📅 Export 24 Focus Blocks to Google Calendar
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                cursor: 'pointer'
                            }}
                        >
                            PROJECTS
                        </button>
                    </div>

                    {/* Horizon Control - Moved & Enlarged */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                        <div style={{ display: 'flex', background: 'var(--c-surface)', borderRadius: '6px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
                            {[3, 6, 12].map(h => (
                                <button
                                    key={h}
                                    onClick={(e) => { e.stopPropagation(); setHorizon(h); if (!expanded) setExpanded(true); }}
                                    style={{
                                        background: horizon === h ? 'var(--c-text-sub)' : 'transparent',
                                        color: horizon === h ? 'var(--c-bg)' : 'var(--c-text-sub)',
                                        border: 'none',
                                        padding: '6px 14px',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        borderRight: '1px solid var(--c-border)'
                                    }}
                                >
                                    {h}M
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Velocity Warp Toggle */}
                    <div
                        onClick={(e) => { e.stopPropagation(); setVelocityMode(prev => prev === 'standard' ? 'warp' : 'standard'); if (!expanded) setExpanded(true); }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: velocityMode === 'warp' ? 'linear-gradient(90deg, #ff0080, #7928ca)' : 'rgba(255,255,255,0.05)',
                            border: velocityMode === 'warp' ? 'none' : '1px solid var(--c-border)',
                            cursor: 'pointer',
                            marginLeft: '1rem',
                            transition: 'all 0.3s'
                        }}
                        title="3-Day Sprints / Engine"
                    >
                        <span style={{ fontSize: '0.8rem' }}>🚀</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#fff' }}>
                            {velocityMode === 'warp' ? 'WARP SPEED (3-Day Sprints)' : 'STANDARD VELOCITY'}
                        </span>
                    </div>

                </div>


            </div>

            {expanded && (
                <div className="gantt-body" style={{ padding: '1.5rem', overflowX: 'auto', borderTop: '1px solid var(--c-border)' }}>
                    {/* Scale explanation */}
                    <div style={{ fontSize: '0.7rem', color: 'var(--c-text-sub)', marginBottom: '1rem', fontStyle: 'italic' }}>
                        {velocityMode === 'warp' ? 'Scale: 3.5 Days per Grid Unit' : 'Scale: 15 Days per Grid Unit'}
                    </div>

                    {/* Month Header - Only show if Standard, else show Hours */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `200px repeat(${totalUnits}, 1fr)`,
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--c-border)',
                        paddingBottom: '0.5rem',
                        minWidth: '600px'
                    }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>TASK / PHASE</div>
                        {monthLabels.map((m, idx) => (
                            <div key={idx} style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '0.8rem', fontWeight: '600', color: 'var(--c-text-sub)' }}>
                                {velocityMode === 'warp' ? `Week ${(idx + 1)}` : m}
                            </div>
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
                                        height: '24px',
                                        cursor: velocityMode === 'warp' ? 'pointer' : 'default'
                                    }} onClick={() => velocityMode === 'warp' && setSelectedSprint(task)}>
                                        <div style={{ fontSize: '0.8rem', whiteWhiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
                                            {task.name}
                                        </div>
                                        {/* Bar Track */}
                                        <div style={{ gridColumn: `2 / span ${totalUnits}`, position: 'relative', height: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: surge ? '0%' : `${(task.start / totalUnits) * 100}%`,
                                                width: surge ? '100%' : `${(task.duration / totalUnits) * 100}%`,
                                                height: '100%',
                                                background: surge ? '#00ff9d' : task.color, // Liquid brand color during surge
                                                borderRadius: '4px',
                                                opacity: surge ? 0.9 : 0.8,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Faster liquid ease
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                overflow: 'hidden'
                                            }}>
                                                {/* Infinity Overlay */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: surge ? 0.6 : 0, // More opaque
                                                    transition: 'opacity 0.3s',
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3Cpath d='M25,25 C25,10 40,10 50,25 C60,40 75,40 75,25 C75,10 60,10 50,25 C40,40 25,40 25,25 Z' fill='none' stroke='black' stroke-width='4'/%3E%3C/svg%3E")`,
                                                    backgroundSize: 'contain',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    filter: 'blur(0.5px)'
                                                }} />

                                                {/* Date Label */}
                                                <div style={{
                                                    position: 'relative',
                                                    zIndex: 2,
                                                    color: 'rgba(255,255,255,0.95)',
                                                    fontSize: '0.6rem',
                                                    fontWeight: '700',
                                                    textAlign: 'center',
                                                    width: '100%',
                                                    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                                                    whiteSpace: 'nowrap',
                                                    pointerEvents: 'none',
                                                    letterSpacing: '0.02em',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '100%'
                                                }}>
                                                    {(() => {
                                                        const today = new Date();
                                                        if (velocityMode === 'warp') {
                                                            // Warp: 1 month unit = 30 days. task.start=0.1 => 3 days.
                                                            // But wait, my manual "0.1" duration in generateEnginePhases is 1/10th of a month = 3 days.
                                                            // task.start is accumulative index * 0.1.

                                                            // Convert relative units to Day Offset
                                                            // 1 Unit (1.0) = 30 Days.
                                                            const startOffsetDays = task.start * 30;
                                                            const durDays = task.duration * 30;

                                                            const start = new Date(today);
                                                            const end = new Date(today);

                                                            start.setDate(today.getDate() + 1 + startOffsetDays); // Start tomorrow
                                                            end.setDate(start.getDate() + durDays);

                                                            const opts = { month: 'short', day: 'numeric' };
                                                            return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`;
                                                        } else {
                                                            // Standard
                                                            const start = new Date(today);
                                                            const end = new Date(today);

                                                            const startDays = Math.floor(task.start * 30.44);
                                                            const durDays = Math.floor(task.duration * 30.44);

                                                            start.setDate(today.getDate() + startDays);
                                                            end.setDate(today.getDate() + startDays + durDays);

                                                            const opts = { month: 'short', day: 'numeric' };
                                                            return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`;
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--c-text-sub)', marginTop: '1rem' }}>
                        {velocityMode === 'warp'
                            ? `*WARP SPEED: 3-Day Sprints. Click bars for MVP Plan.`
                            : `*Timeline dynamic relative to current date (${new Date().toLocaleDateString()}).`
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

const ENTITY_DIAGRAM = `
graph TD
    subgraph "Asset Protection"
        TRUST[Cook Islands Trust]
        CAYMAN[Cayman LLC]
    end

    NS[Northfield Solidarity LLC]

    subgraph "Operations & Assets"
        SL[South Lawn LLC]
        OPS[NSDC Operations LLC]
        MGMT[NS MGMT LLC]
        EDU[NSDC Educational Services LLC]
    end

    subgraph "IP & R&D"
        IP[NSDC IP Holdings]
        LAB[NSDC Innovations Lab]
        EXP[NSDC Experimental Lab]
    end

    %% Ownership
    TRUST --> CAYMAN
    CAYMAN --> NS
    NS --> SL
    NS --> OPS
    NS --> MGMT
    NS --> EDU
    NS --> IP
    NS --> LAB
    NS --> EXP

    %% Logic
    IP -.->|License| OPS & EDU
    LAB -.->|Assigns IP| IP
    EXP -.->|Assigns IP| IP
    SL -.->|Leases| OPS
    MGMT -.->|Services| OPS & SL & IP & EDU

    classDef holdco fill:#0f172a,stroke:#3b82f6,color:#fff,stroke-width:2px;
    classDef op fill:#1e293b,stroke:#94a3b8,color:#fff;
    classDef trust fill:#4c1d95,stroke:#a78bfa,color:#fff,stroke-width:2px;
    
    class NS holdco;
    class SL,OPS,MGMT,IP,LAB,EXP,EDU op;
    class TRUST,CAYMAN trust;
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

                {/* Trust - Top of Stack */}
                <div style={{ padding: '2rem', border: '1px dashed #a78bfa', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.3), rgba(0,0,0,0))' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#d8b4fe' }}>Cook Islands Trust</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a78bfa', marginBottom: '0.5rem' }}>Asset Protection Trust</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                        The ultimate beneficiary and asset protector. Sitting outside US jurisdiction to provide maximum defense against litigation and seizure.
                    </p>
                </div>

                {/* Cayman - Aggregator */}
                <div style={{ padding: '2rem', border: '1px solid #8b5cf6', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.05)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#a78bfa' }}>Cayman Aggregator LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>International HoldCo</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Intermediary holding entity ensuring tax efficiency and international flexibility before capital touches US soil.
                    </p>
                </div>

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

                {/* EDU */}
                <div style={{ padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', background: 'var(--c-surface)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#00ff9d' }}>NSDC Educational Services LLC</h3>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Education & Training</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--c-text-sub)' }}>
                        Provides educational content, training workshops, and certification programs. Utilizes IP licensed from NSDC IP Holdings.
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
                <RoadmapGroup title="Business / Media Projects (BMP)" items={NS_BMP || []} />

            </section>
        </div>
    );
};

const DevelopersUpdatesView = ({ currentUser }) => {
    // Mock Data for Developer Updates
    const [updates, setUpdates] = useState([
        {
            date: "Dec 25, 2025",
            day: "Thursday",
            summary: "Core Engine Implementation & Mock Services",
            commits: [
                { hash: "a1b2c3d", message: "feat(IDN): Added MockIdnService and integrated with IDNView for basic CRUD operations.", author: "AI" },
                { hash: "e4f5g6h", message: "feat(GGP): Created MockGgpService and refactored GGPView to display live governance streams.", author: "AI" },
                { hash: "i7j8k9l", message: "fix(Dock): Implemented global minimize functionality for ProductDock.", author: "AI" }
            ],
            notes: "Focused on removing static placeholders and enabling interactive states for the Identity and Governance engines. Backend simulation layer is now active."
        },
        {
            date: "Dec 24, 2025",
            day: "Wednesday",
            summary: "UI Polish & Tailwind Refactoring",
            commits: [
                { hash: "m0n1o2p", message: "style: Refactored ProductDock to use Tailwind classes.", author: "AI" },
                { hash: "q3r4s5t", message: "feat: Added full-screen inactivity timer for window management.", author: "AI" },
                { hash: "u6v7w8x", message: "feat: Implemented keyboard navigation for IDE tabs.", author: "AI" }
            ],
            notes: "Heavy focus on ensuring the design system is consistent. Removed legacy CSS files."
        },
        {
            date: "Dec 23, 2025",
            day: "Tuesday",
            summary: "Investor Relations Portal Expansion",
            commits: [
                { hash: "y9z0a1b", message: "feat(IR): Added corporate entity structure (Mermaid) to Investors tab.", author: "AI" },
                { hash: "c2d3e4f", message: "feat(IR): Implemented interactive roadmap timeline.", author: "AI" },
                { hash: "g5h6i7j", message: "docs: Standardized markdown styling across documentation.", author: "AI" }
            ],
            notes: "Fleshing out the business logic visualisation. The corporate structure mapping is now live."
        }
    ]);

    const [expandedDay, setExpandedDay] = useState(updates[0].date);
    const [newSummary, setNewSummary] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Verify Authorization for Posting
    const canPost = currentUser && (
        currentUser.role === USER_ROLES.ADMIN ||
        currentUser.email === 'john.deegan@northfieldsolidarity.ai'
    );

    const handleAddUpdate = (e) => {
        e.preventDefault();
        if (!newSummary || !newNotes) return;

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const dayStr = now.toLocaleDateString('en-US', { weekday: 'long' });

        const newEntry = {
            date: dateStr,
            day: dayStr,
            summary: newSummary,
            commits: [{ hash: "manual", message: "Manual Entry via Investor Portal", author: currentUser.name || "Admin" }],
            notes: newNotes
        };

        setUpdates([newEntry, ...updates]);
        setNewSummary('');
        setNewNotes('');
        setIsFormOpen(false);
        setExpandedDay(dateStr);
    };

    return (
        <div className="tab-content fade-in">
            <section className="ir-section">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="section-label">Engineering Log</h3>
                        <p className="lead ir-subtitle" style={{ marginBottom: '0' }}>
                            Daily tracking of codebase velocity, feature delivery, and architectural decisions.
                        </p>
                    </div>
                    {canPost && (
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className="text-xs border border-emerald-500/50 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded hover:bg-emerald-500/20 transition-all uppercase tracking-wider font-bold"
                        >
                            {isFormOpen ? 'Cancel Entry' : '+ Log Daily Update'}
                        </button>
                    )}
                </div>

                {isFormOpen && (
                    <div className="bg-white/5 border border-emerald-500/30 rounded-lg p-6 mb-8 animate-fade-in-down">
                        <h4 className="text-emerald-400 font-bold mb-4 uppercase text-sm tracking-wide">New Engineering Log Entry</h4>
                        <form onSubmit={handleAddUpdate}>
                            <div className="mb-4">
                                <label className="block text-xs uppercase text-white/50 mb-1">Summary Header</label>
                                <input
                                    type="text"
                                    value={newSummary}
                                    onChange={(e) => setNewSummary(e.target.value)}
                                    placeholder="e.g. Backend API Integration Complete"
                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500/50 focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs uppercase text-white/50 mb-1">Detailed Notes</label>
                                <textarea
                                    value={newNotes}
                                    onChange={(e) => setNewNotes(e.target.value)}
                                    placeholder="Enter detailed summary notes here..."
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white focus:border-emerald-500/50 focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded transition-all uppercase text-sm tracking-widest"
                            >
                                Publish Update
                            </button>
                        </form>
                    </div>
                )}

                <div className="space-y-6">
                    {updates.map((update, index) => {
                        const isExpanded = expandedDay === update.date;
                        return (
                            <div key={index} className={`
                                border border-white/10 rounded-lg overflow-hidden transition-all duration-300
                                ${isExpanded ? 'bg-white/5' : 'bg-transparent hover:bg-white/5'}
                            `}>
                                {/* Header */}
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer"
                                    onClick={() => setExpandedDay(isExpanded ? null : update.date)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            p-2 rounded font-mono text-center min-w-[60px]
                                            ${isExpanded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'}
                                        `}>
                                            <div className="text-xs uppercase">{update.date.split(' ')[0]}</div>
                                            <div className="text-lg font-bold">{update.date.split(' ')[1].replace(',', '')}</div>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium text-lg">{update.summary}</h4>
                                            <div className="text-white/40 text-sm mt-0.5">{update.day} • {update.commits.length} commits</div>
                                        </div>
                                    </div>
                                    <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''} text-white/40`}>
                                        ▼
                                    </div>
                                </div>

                                {/* Content */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-white/5 pt-4">
                                        <p className="text-white/70 italic text-sm mb-4 border-l-2 border-emerald-500/30 pl-3">
                                            "{update.notes}"
                                        </p>

                                        <div className="space-y-2">
                                            {update.commits.map((commit, cIdx) => (
                                                <div key={cIdx} className="flex gap-3 items-start font-mono text-xs">
                                                    <span className="text-emerald-500/60 min-w-[70px]">{commit.hash}</span>
                                                    <span className="text-white/80">{commit.message}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
    const { role, login, user } = useAuth();
    const [activeTab, setActiveTab] = useState('projections');

    const authorizedRoles = [USER_ROLES.ADMIN, USER_ROLES.INVESTOR, USER_ROLES.SPECIAL_GUEST];
    const isAuthorized = authorizedRoles.includes(role);

    if (!isAuthorized) {
        return <LoginView onLogin={login} />;
    }

    return (
        <div data-theme="water">
            <Layout>
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
                            className={`tab-btn ${activeTab === 'valuations' ? 'active' : ''}`}
                            onClick={() => setActiveTab('valuations')}
                        >
                            Valuations
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
                            onClick={() => setActiveTab('updates')}
                        >
                            Dev Updates
                        </button>
                    </div>

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
                            <div className="tab-content fade-in">
                                <section className="ir-section">
                                    <h3 className="section-label">Funding Strategy Evaluation</h3>
                                    <p className="lead ir-subtitle" style={{ marginBottom: '3rem' }}>
                                        Current status: <strong>Undecided</strong>. Evaluating instruments for optimal capital efficiency and governance alignment.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                                        {/* Option 1: SAFE */}
                                        <div className="funding-card">
                                            <div className="funding-header">
                                                <div className="funding-icon">📄</div>
                                                <h4 className="funding-name">SAFE (Post-Money)</h4>
                                            </div>
                                            <p className="funding-desc">
                                                The industry standard (YC). Simple Agreement for Future Equity. Fast, low legal cost, delays valuation until the next priced round. Make-or-break is the Valuation Cap.
                                            </p>
                                            <ul className="funding-pros-cons">
                                                <li className="pro">Speed to close (days)</li>
                                                <li className="pro">Minimal legal spend</li>
                                                <li className="con">Dilution risk if stacked</li>
                                            </ul>
                                        </div>

                                        {/* Option 2: Convertible Note */}
                                        <div className="funding-card">
                                            <div className="funding-header">
                                                <div className="funding-icon">⚖️</div>
                                                <h4 className="funding-name">Convertible Note</h4>
                                            </div>
                                            <p className="funding-desc">
                                                Debt that converts to equity. Carries an interest rate and maturity date. Historically common but largely replaced by SAFEs for early stage.
                                            </p>
                                            <ul className="funding-pros-cons">
                                                <li className="pro">Debt protections for investors</li>
                                                <li className="con">Interest accrual (complexity)</li>
                                                <li className="con">Maturity date pressure</li>
                                            </ul>
                                        </div>

                                        {/* Option 3: Priced Equity */}
                                        <div className="funding-card">
                                            <div className="funding-header">
                                                <div className="funding-icon">💎</div>
                                                <h4 className="funding-name">Priced Seed Round</h4>
                                            </div>
                                            <p className="funding-desc">
                                                Selling preferred stock at a fixed valuation now. "Series Seed". Cleanest cap table math but highest friction to execute.
                                            </p>
                                            <ul className="funding-pros-cons">
                                                <li className="pro">Clarity on ownership % immediately</li>
                                                <li className="pro"> Governance rights defined</li>
                                                <li className="con">Expensive ($20k+ legal) & Slow</li>
                                            </ul>
                                        </div>

                                        {/* Option 4: Reg CF */}
                                        <div className="funding-card">
                                            <div className="funding-header">
                                                <div className="funding-icon">🤝</div>
                                                <h4 className="funding-name">Reg CF (Crowd)</h4>
                                            </div>
                                            <p className="funding-desc">
                                                Raising from the community/public (up to $5M/yr). Aligns with "Solidarity" values but requires public disclosures and marketing campaign.
                                            </p>
                                            <ul className="funding-pros-cons">
                                                <li className="pro">Community buy-in / loyalty</li>
                                                <li className="con">Public disclosure requirements</li>
                                                <li className="con">Marketing heavy</li>
                                            </ul>
                                        </div>

                                        {/* Option 5: Venture Debt / Revenue Based */}
                                        <div className="funding-card">
                                            <div className="funding-header">
                                                <div className="funding-icon">💸</div>
                                                <h4 className="funding-name">RBF / Venture Debt</h4>
                                            </div>
                                            <p className="funding-desc">
                                                Non-dilutive capital repaid from future revenue. Requires predictable cash flow (likely from South Lawn operations).
                                            </p>
                                            <ul className="funding-pros-cons">
                                                <li className="pro">Zero dilution</li>
                                                <li className="pro">Founder control retained</li>
                                                <li className="con">Requires existing revenue streams</li>
                                            </ul>
                                        </div>

                                    </div>
                                </section>

                                <style>{`
                                .funding-card {
                                    background: var(--c-surface);
                                    border: 1px solid var(--c-border);
                                    border-radius: var(--radius-md);
                                    padding: 2rem;
                                    transition: all 0.2s ease;
                                    cursor: pointer;
                                }
                                .funding-card:hover {
                                    border-color: var(--c-brand);
                                    transform: translateY(-2px);
                                }
                                .funding-header {
                                    display: flex;
                                    align-items: center;
                                    gap: 1rem;
                                    margin-bottom: 1rem;
                                }
                                .funding-icon {
                                    font-size: 1.5rem;
                                }
                                .funding-name {
                                    font-size: 1.1rem;
                                    font-weight: 700;
                                    color: var(--c-text);
                                }
                                .funding-desc {
                                    font-size: 0.9rem;
                                    line-height: 1.6;
                                    color: var(--c-text-sub);
                                    margin-bottom: 1.5rem;
                                }
                                .funding-pros-cons {
                                    list-style: none;
                                    padding: 0;
                                    margin: 0;
                                    font-size: 0.85rem;
                                }
                                .funding-pros-cons li {
                                    margin-bottom: 0.5rem;
                                    padding-left: 1.2rem;
                                    position: relative;
                                }
                                .funding-pros-cons li.pro::before {
                                    content: '✓';
                                    position: absolute;
                                    left: 0;
                                    color: #10b981;
                                }
                                .funding-pros-cons li.con::before {
                                    content: '×';
                                    position: absolute;
                                    left: 0;
                                    color: #ef4444;
                                }
                            `}</style>
                            </div>                        </div>
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

                    {/* TAB CONTENT: Valuations */}
                    {activeTab === 'valuations' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Historical & Projected Valuation</h3>
                                <p className="lead ir-subtitle" style={{ marginBottom: '3rem' }}>
                                    Snapshot of valuation milestones across the Northfield ecosystem.
                                </p>
                                <div style={{
                                    background: 'var(--c-surface)',
                                    border: '1px solid var(--c-border)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '2rem',
                                    height: '300px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-around',
                                    marginBottom: '2rem'
                                }}>
                                    {[
                                        { label: "Pre-Seed", val: 5, height: '20%' },
                                        { label: "Seed (Current)", val: 12, height: '40%', active: true },
                                        { label: "Series A (Proj)", val: 40, height: '70%', proj: true },
                                        { label: "Series B (Proj)", val: 120, height: '90%', proj: true }
                                    ].map((s, i) => (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '15%' }}>
                                            <div style={{
                                                width: '100%',
                                                height: s.height,
                                                background: s.active ? 'var(--c-brand)' : s.proj ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                                                border: s.proj ? '1px dashed var(--c-border)' : 'none',
                                                borderRadius: '4px 4px 0 0',
                                                position: 'relative',
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-30px',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    fontWeight: '700',
                                                    fontSize: '1.2rem',
                                                    color: s.active ? 'var(--c-brand)' : 'inherit'
                                                }}>${s.val}M</div>
                                            </div>
                                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--c-text-sub)', textAlign: 'center' }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="metric-card">
                                        <div className="metric-label">Current Valuation</div>
                                        <div className="metric-value text-brand">$12M</div>
                                        <div className="metric-delta">Post-Money Cap</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Next Round Target</div>
                                        <div className="metric-value">$40M</div>
                                        <div className="metric-delta">Series A (Q3 '26)</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Dev Updates */}
                    {activeTab === 'updates' && <DevelopersUpdatesView currentUser={user} />}



                    {/* Updates Feed (Global) */}
                    <section className="ir-section">
                        <h3 className="section-label">Live Updates</h3>
                        <div className="feed-list">
                            <div className="feed-item" style={{ color: 'var(--c-text-sub)', fontStyle: 'italic', paddingLeft: '0' }}>
                                <div className="feed-content">
                                    I've only been working on this for a week. And my only Vacation !! what the fuck !!! ;)
                                    <br /><br />
                                    - Signed BM
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
