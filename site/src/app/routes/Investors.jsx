import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import InteractiveGrowthChart from '../../components/InteractiveGrowthChart.jsx';

export default function Investors() {
    const [activeTab, setActiveTab] = useState('projections');

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
                    </div>

                    {/* TAB CONTENT: Projections */}
                    {activeTab === 'projections' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Live Operational Metrics</h3>
                                <div className="metrics-grid">
                                    <div className="metric-card">
                                        <div className="metric-label">Annual Recurring Revenue</div>
                                        <div className="metric-value">$840k</div>
                                        <div className="metric-delta positive">▲ 12% MoM</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Active Engines Deployed</div>
                                        <div className="metric-value">142</div>
                                        <div className="metric-delta positive">▲ 8 this week</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Gross Margins</div>
                                        <div className="metric-value">78%</div>
                                        <div className="metric-delta neutral">-- stable</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">CAC Payback</div>
                                        <div className="metric-value">5.2 mo</div>
                                        <div className="metric-delta positive">▼ 0.3 mo</div>
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
                                                <span>Committed: <strong>$1.85M</strong></span>
                                                <span>Target: <strong>$2.50M</strong></span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: '74%' }}></div>
                                            </div>
                                            <div className="funding-note">74% filled. Lead investor secured. Closing date set for Jan 30.</div>
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
                                        <div className="metric-value">$65k</div>
                                        <div className="metric-delta neutral">Net</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Runway (Current)</div>
                                        <div className="metric-value">14 mo</div>
                                        <div className="metric-delta negative">Excl. Seed</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Runway (Post-Seed)</div>
                                        <div className="metric-value">36 mo</div>
                                        <div className="metric-delta positive">Target</div>
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



                    {/* Updates Feed (Global) */}
                    <section className="ir-section">
                        <h3 className="section-label">Live Updates</h3>
                        <div className="feed-list">
                            <div className="feed-item">
                                <div className="feed-date">Today, 9:42 AM</div>
                                <div className="feed-content">
                                    <strong>New Commitment.</strong> Additional $100k committed from operator angel syndicate.
                                </div>
                            </div>
                            <div className="feed-item">
                                <div className="feed-date">Dec 20, 2025</div>
                                <div className="feed-content">
                                    <strong>Feature Ship.</strong> Project Registry launched to Documentation. Direct impact on enterprise clarity.
                                </div>
                            </div>
                            <div className="feed-item">
                                <div className="feed-date">Dec 15, 2025</div>
                                <div className="feed-content">
                                    <strong>South Lawn Expansion.</strong> 3 new doors added to portfolio. Total portfolio AUM crosses $4M.
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
            `}</style>
        </div>
    );
}
