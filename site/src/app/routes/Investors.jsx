import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout.jsx';
import InteractiveGrowthChart from '../../components/InteractiveGrowthChart.jsx';
import { NS_ENGINES, SL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';

const getPhase = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("live")) return 4;
    if (s.includes("active") || s.includes("build")) return 3;
    if (s.includes("planned") || s.includes("mvp")) return 2;
    return 1; // Draft/Concept
};

const ProgressTrack = ({ status }) => {
    const phase = getPhase(status);
    const steps = [
        { id: 1, label: "Concept" },
        { id: 2, label: "Spec" },
        { id: 3, label: "Build" },
        { id: 4, label: "Live" }
    ];

    return (
        <div className="progress-track">
            {steps.map((step, i) => (
                <div key={step.id} className={`track-segment ${step.id <= phase ? 'active' : ''}`}>
                    <div className="segment-line"></div>
                    <div className="segment-dot"></div>
                    <div className="segment-label">{step.label}</div>
                </div>
            ))}
        </div>
    );
};

const RoadmapGroup = ({ title, items }) => (
    <div style={{ marginBottom: '4rem' }}>
        <h4 style={{
            fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '1.5rem', borderBottom: '1px solid var(--c-border)',
            paddingBottom: '0.5rem', color: 'var(--c-brand)'
        }}>
            {title}
        </h4>
        <div className="roadmap-grid">
            {items.map(item => (
                <div key={item.code} className="roadmap-card">
                    <div className="roadmap-header">
                        <div className="badge sm">{item.code}</div>
                        <div className="roadmap-status">{item.status}</div>
                    </div>
                    <div className="roadmap-title">{item.name}</div>
                    <ProgressTrack status={item.status} />
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
];

const RoadmapTimeline = ({ compact = false }) => (
    <div className={`timeline-container ${compact ? 'compact' : ''}`}>
        <div className="timeline-track-line"></div>
        {TIMELINE_MONTHS.map((m) => (
            <div key={m.month} className="timeline-point">
                <div className={`t-dot ${m.active ? 'active' : ''}`}></div>
                <div className="t-content">
                    <div className="t-month">{m.month}</div>
                    <div className="t-label">{m.label}</div>
                </div>
            </div>
        ))}
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

                <div ref={staticRef} style={{ marginBottom: '4rem' }}>
                    <RoadmapTimeline />
                </div>

                <RoadmapGroup title="Core Infrastructure (NS Engines)" items={NS_ENGINES} />
                <RoadmapGroup title="Applications & Projects" items={NS_PROJECTS} />
                <RoadmapGroup title="South Lawn Operating Engines" items={SL_ENGINES} />

            </section>
        </div>
    );
};

export default function Investors() {
    const [activeTab, setActiveTab] = useState('projections');

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
                                <h3 className="section-label">Capital Deployment Model</h3>
                                <div className="metrics-grid">
                                    <div className="metric-card">
                                        <div className="metric-label">Monthly Burn</div>
                                        <div className="metric-value">$0</div>
                                        <div className="metric-delta neutral">--</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Runway (Current)</div>
                                        <div className="metric-value">--</div>
                                        <div className="metric-delta neutral">Bootstrapped</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Target Efficiency</div>
                                        <div className="metric-value">1.5x</div>
                                        <div className="metric-delta positive">Model</div>
                                    </div>
                                </div>

                                <div className="capital-breakdown" style={{ marginTop: '2rem', padding: '2rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-lg)' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Use of Funds (Next 18 Months)</h4>
                                    <div className="breakdown-item" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span>R&D / Engineering</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: '45%' }}></div></div>
                                    </div>
                                    <div className="breakdown-item" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span>Sales & Marketing</span>
                                            <span>30%</span>
                                        </div>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: '30%' }}></div></div>
                                    </div>
                                    <div className="breakdown-item" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                            <span>Portfolio Acquisition (South Lawn)</span>
                                            <span>25%</span>
                                        </div>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: '25%' }}></div></div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Roadmap */}
                    {activeTab === 'roadmap' && <RoadmapView />}



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
