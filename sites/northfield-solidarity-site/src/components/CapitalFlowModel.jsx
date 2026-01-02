import React, { useState, useMemo } from 'react';

const PRICES = {
    OPERATOR: 895,
    ARCHITECT: 2995,
    SOVEREIGN: 12500,
    GHOST_RUNS: 995,
    PERSONA: 495,
    CONTEXT: 195,
    FRACTO: 15000,
    RESIDENCY: 50000, // Quarterly
    AUDIT: 8500 // One-time
};

// Growth multipliers for USERS/VOLUME at t=0.5, 1, 2, 5 years
const GROWTH_CURVES = {
    CONSERVATIVE: [1, 1.2, 1.5, 2.0, 3.5],
    BASE: [1, 1.5, 2.2, 4.0, 10.0],
    AGGRESSIVE: [1, 2.0, 3.5, 7.5, 20.0]
};

const TIME_POINTS = [
    { label: 'Now', t: 0 },
    { label: '6m', t: 0.5 },
    { label: '1y', t: 1 },
    { label: '2y', t: 2 },
    { label: '5y', t: 5 }
];

const COLORS = {
    TOTAL: '#ffffff',
    OPERATOR: '#3b82f6', // Blue
    ARCHITECT: '#a855f7', // Purple
    SOVEREIGN: '#eab308', // Gold
    ADDONS: '#22c55e',    // Green
    SERVICES: '#f97316'   // Orange
};

const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
};

export default function CapitalFlowModel() {
    // --- STATE: BASE INPUTS ---
    const [usersOperator, setUsersOperator] = useState(10);
    const [usersArchitect, setUsersArchitect] = useState(2);
    const [usersSovereign, setUsersSovereign] = useState(0);

    const [ghostRuns, setGhostRuns] = useState(5);
    const [personas, setPersonas] = useState(5);
    const [contexts, setContexts] = useState(8);

    const [fracCTO, setFracCTO] = useState(0);
    const [residencies, setResidencies] = useState(0);
    const [audits, setAudits] = useState(0);

    const [growthMode, setGrowthMode] = useState('BASE');

    // --- CALCULATION HOOK ---
    const chartData = useMemo(() => {
        const curve = GROWTH_CURVES[growthMode];

        return TIME_POINTS.map((point, index) => {
            const m = curve[index]; // Multiplier for this time point

            // Calculate Counts at this time point
            const uOp = usersOperator * m;
            const uArch = usersArchitect * m;
            const uSov = usersSovereign * m;

            // Add-ons usually scale with users, but for simplicity we scale the base input by 'm' too
            // assuming attach rates hold or grow similarly.
            const cGhost = ghostRuns * m;
            const cPersona = personas * m;
            const cContext = contexts * m;

            // Services might not scale linearly with user growth (often supply constrained), 
            // but for "Potential Revenue" we'll assume we scale the team/supply.
            // Let's damp service growth slightly: sqrt(m) maybe? 
            // Or just keep it linear for the "Ride" philosophy (agency scaling).
            // Let's use a slightly lower multiplier for services to be realistic about human constraints.
            const mServices = Math.max(1, m * 0.5);

            const sCTO = fracCTO * mServices;
            const sRes = residencies * mServices; // Quarterly
            const sAud = audits * mServices;

            // Revenue Streams (Annualized)
            const revOperator = uOp * PRICES.OPERATOR * 12;
            const revArchitect = uArch * PRICES.ARCHITECT * 12;
            const revSovereign = uSov * PRICES.SOVEREIGN * 12;

            const revAddons = (
                (cGhost * PRICES.GHOST_RUNS) +
                (cPersona * PRICES.PERSONA) +
                (cContext * PRICES.CONTEXT)
            ) * 12;

            const revServices = (
                (sCTO * PRICES.FRACTO * 12) +
                (sRes * PRICES.RESIDENCY * 4) + // 4 qtrs
                (sAud * PRICES.AUDIT * 12)
            );

            const total = revOperator + revArchitect + revSovereign + revAddons + revServices;

            return {
                label: point.label,
                t: point.t,
                TOTAL: total,
                OPERATOR: revOperator,
                ARCHITECT: revArchitect,
                SOVEREIGN: revSovereign,
                ADDONS: revAddons,
                SERVICES: revServices
            };
        });
    }, [usersOperator, usersArchitect, usersSovereign, ghostRuns, personas, contexts, fracCTO, residencies, audits, growthMode]);

    // --- CHART SCALING ---
    const maxVal = Math.max(...chartData.map(d => d.TOTAL));
    // Time scale: 0 to 5 years.
    const getX = (t) => (t / 5) * 100; // % position
    const getY = (val) => 100 - ((val / maxVal) * 100); // % position from top

    // Generate Path Data
    const createPath = (key) => {
        return chartData.map((d, i) => {
            const x = getX(d.t);
            const y = getY(d[key]);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    return (
        <div className="cfm-container">
            <div className="cfm-grid">

                {/* --- CONTROLS --- */}
                <div className="cfm-controls">
                    <h3 className="control-heading">Model Inputs (Year 0)</h3>

                    <div className="input-group">
                        <label className="group-label" style={{ color: COLORS.OPERATOR }}>Operator ({usersOperator})</label>
                        <ControlSlider val={usersOperator} set={setUsersOperator} max={100} color={COLORS.OPERATOR} />

                        <label className="group-label" style={{ color: COLORS.ARCHITECT }}>Architect ({usersArchitect})</label>
                        <ControlSlider val={usersArchitect} set={setUsersArchitect} max={50} color={COLORS.ARCHITECT} />

                        <label className="group-label" style={{ color: COLORS.SOVEREIGN }}>Sovereign ({usersSovereign})</label>
                        <ControlSlider val={usersSovereign} set={setUsersSovereign} max={10} color={COLORS.SOVEREIGN} />
                    </div>

                    <div className="input-group">
                        <label className="group-label" style={{ color: COLORS.ADDONS }}>Add-ons (Aggregate)</label>
                        <ControlSlider label="Ghost Runs" val={ghostRuns} set={setGhostRuns} max={100} color={COLORS.ADDONS} />
                        <ControlSlider label="Personas" val={personas} set={setPersonas} max={100} color={COLORS.ADDONS} />
                        <ControlSlider label="Context" val={contexts} set={setContexts} max={200} color={COLORS.ADDONS} />
                    </div>

                    <div className="input-group">
                        <label className="group-label" style={{ color: COLORS.SERVICES }}>Consulting & Services</label>
                        <ControlSlider label="Fractional CTO" val={fracCTO} set={setFracCTO} max={5} color={COLORS.SERVICES} />
                        <ControlSlider label="Residency" val={residencies} set={setResidencies} max={4} color={COLORS.SERVICES} />
                        <ControlSlider label="Audits" val={audits} set={setAudits} max={10} color={COLORS.SERVICES} />
                    </div>

                    <div className="input-group">
                        <label className="group-label">Growth Trajectory</label>
                        <div className="mode-toggles">
                            {['CONSERVATIVE', 'BASE', 'AGGRESSIVE'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setGrowthMode(mode)}
                                    className={`mode-btn ${growthMode === mode ? 'active' : ''}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- CHART SECTION --- */}
                <div className="cfm-chart-col">
                    <h3 className="chart-heading">Projected Annual Revenue Run Rate</h3>

                    {/* BAR CHART (Annualized Revenue) */}
                    <div className="chart-area" style={{ height: '250px', marginBottom: '3rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '2rem' }}>
                        {chartData.filter(d => d.t > 0).map((item, i) => { // filters out "Now" t=0 if desired, or keep all
                            const heightPercent = (item.TOTAL / maxVal) * 100;
                            return (
                                <div key={i} className="bar-column">
                                    <div className="bar-val-top">{formatCurrency(item.TOTAL)}</div>
                                    <div className="bar-track">
                                        <div
                                            className="bar-fill"
                                            style={{ height: `${heightPercent}%` }}
                                        />
                                    </div>
                                    <div className="bar-label">{item.label}</div>
                                </div>
                            )
                        })}
                    </div>

                    <h3 className="chart-heading">Component Breakdown (5 Year Horizon)</h3>

                    {/* LINE CHART (Component Split) */}
                    <div className="chart-wrapper">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="chart-svc">
                            {/* Grid Lines */}
                            {[0, 25, 50, 75, 100].map(p => (
                                <line key={p} x1="0" y1={p} x2="100" y2={p} stroke="var(--c-border)" strokeWidth="0.5" strokeDasharray="2" />
                            ))}

                            {/* Paths */}
                            <path d={createPath('SERVICES')} fill="none" stroke={COLORS.SERVICES} strokeWidth="1" opacity="0.8" />
                            <path d={createPath('ADDONS')} fill="none" stroke={COLORS.ADDONS} strokeWidth="1" opacity="0.8" />
                            <path d={createPath('OPERATOR')} fill="none" stroke={COLORS.OPERATOR} strokeWidth="1.5" opacity="0.9" />
                            <path d={createPath('ARCHITECT')} fill="none" stroke={COLORS.ARCHITECT} strokeWidth="1.5" opacity="0.9" />
                            <path d={createPath('SOVEREIGN')} fill="none" stroke={COLORS.SOVEREIGN} strokeWidth="2" />

                            {/* TOTAL (Thick) */}
                            <path d={createPath('TOTAL')} fill="none" stroke={COLORS.TOTAL} strokeWidth="3" strokeLinecap="round" />

                            {/* Data Points (Total only) */}
                            {chartData.map((d, i) => (
                                <circle
                                    key={i}
                                    cx={getX(d.t)}
                                    cy={getY(d.TOTAL)}
                                    r="1.5"
                                    fill={COLORS.TOTAL}
                                    className="data-point"
                                />
                            ))}
                        </svg>

                        {/* Hover Overlay / Tooltips can be complex in pure SVG/React without library. 
                            Implementing simple labels instead. */}
                        <div className="chart-labels">
                            {chartData.map((d, i) => (
                                <div
                                    key={i}
                                    className="chart-label-group"
                                    style={{ left: `${getX(d.t)}%` }}
                                >
                                    {/* X Label */}
                                    <div className="x-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-legend">
                        <LegendItem color={COLORS.TOTAL} label="Total Flow" />
                        <LegendItem color={COLORS.SOVEREIGN} label="Sovereign" />
                        <LegendItem color={COLORS.ARCHITECT} label="Architect" />
                        <LegendItem color={COLORS.OPERATOR} label="Operator" />
                        <LegendItem color={COLORS.ADDONS} label="Add-ons" />
                        <LegendItem color={COLORS.SERVICES} label="Services" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .cfm-container {
                    background: var(--c-bg);
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    color: var(--c-text);
                }
                .cfm-grid {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 3rem;
                }
                @media (max-width: 900px) {
                    .cfm-grid { grid-template-columns: 1fr; }
                }

                .control-heading, .chart-heading {
                    font-size: 1.1rem;
                    border-bottom: 1px solid var(--c-border);
                    padding-bottom: 1rem;
                    margin-bottom: 1.5rem;
                    color: var(--c-brand);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .input-group { margin-bottom: 2rem; }
                .group-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                
                .mode-toggles { display: flex; gap: 0.5rem; }
                .mode-btn {
                    flex: 1;
                    padding: 0.5rem;
                    font-size: 0.7rem;
                    border: 1px solid var(--c-border);
                    background: transparent;
                    color: var(--c-text-sub);
                    cursor: pointer;
                    border-radius: 4px;
                }
                .mode-btn.active {
                    background: var(--c-brand);
                    color: #000;
                    border-color: var(--c-brand);
                    font-weight: bold;
                }

                /* BAR CHART STYLES (Restored) */
                .chart-area {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-around;
                    padding-top: 2rem; 
                    background: var(--c-surface);
                    border-radius: var(--radius-md);
                }
                .bar-column {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    justify-content: flex-end;
                    width: 15%;
                    position: relative;
                }
                .bar-track {
                    width: 100%;
                    height: 100%;
                    background: rgba(255,255,255,0.02);
                    border-radius: 4px;
                    display: flex;
                    align-items: flex-end;
                    position: relative;
                }
                .bar-fill {
                    width: 100%;
                    background: linear-gradient(to top, var(--c-brand), #4ade80);
                    border-radius: 44px;
                    transition: height 0.5s ease;
                    min-height: 4px;
                }
                .bar-val-top {
                    position: absolute;
                    top: -25px;
                    font-weight: bold;
                    font-size: 0.8rem;
                    color: var(--c-brand);
                    white-space: nowrap;
                }
                .bar-label {
                    margin-top: 0.5rem;
                    font-weight: bold;
                    font-size: 0.8rem;
                    color: var(--c-text-sub);
                }

                /* LINE CHART */
                .chart-wrapper {
                    position: relative;
                    height: 350px;
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-md);
                    margin-bottom: 1.5rem;
                    padding: 2rem 1rem 3rem 1rem;
                    overflow: hidden;
                }
                .chart-svc {
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                }
                
                path {
                    transition: d 0.5s ease; 
                    vector-effect: non-scaling-stroke;
                }
                circle.data-point {
                    transition: cx 0.5s ease, cy 0.5s ease;
                }

                .chart-labels {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    padding: 2rem 1rem 3rem 1rem; /* Match wrapper padding */
                    box-sizing: border-box;
                }
                .chart-label-group {
                    position: absolute;
                    height: 100%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                }
                .x-label {
                    position: absolute;
                    bottom: -25px;
                    font-size: 0.75rem;
                    color: var(--c-text-sub);
                    font-family: var(--font-mono);
                    white-space: nowrap;
                }
                .y-val {
                    /* Hidden on line chart now that bar chart shows totals */
                    display: none; 
                }

                .chart-legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    justify-content: center;
                }
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    color: var(--c-text-sub);
                }
                .legend-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
}

const ControlSlider = ({ label, val, set, max, color = 'var(--c-brand)' }) => (
    <div style={{ marginBottom: '0.75rem' }}>
        {label && <div style={{ fontSize: '0.7rem', color: 'var(--c-text-sub)', marginBottom: '2px' }}>{label}</div>}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
                type="range"
                min="0"
                max={max}
                value={val}
                onChange={(e) => set(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: color }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', minWidth: '24px', textAlign: 'right', color: color }}>{val}</span>
        </div>
    </div>
);

const LegendItem = ({ color, label }) => (
    <div className="legend-item">
        <div className="legend-dot" style={{ backgroundColor: color }}></div>
        <span>{label}</span>
    </div>
);
