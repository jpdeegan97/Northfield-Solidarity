import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';

export default function SouthLawnInvestors() {
    const [activeTab, setActiveTab] = useState('portfolio');

    // South Lawn specific nav
    const nav = [
        { label: "Northfield Solidarity", to: "/pricing" },
        { label: "South Lawn", to: "/southlawn" },
        { type: "divider" },
        { label: "Documentation", to: "/southlawn/docs" },
        { label: "Pricing", to: "/southlawn/pricing" },
        { label: "System", to: "/southlawn/system" },
        { label: "Investor Relations", to: "/southlawn/investors" }, // Circular internal link
    ];

    return (
        <div data-theme="green">
            <Layout nav={nav}>
                <div className="investor-portal">
                    {/* Header */}
                    <div className="ir-header">
                        <div className="badge ir-badge">REIT Portfolio: Active</div>
                        <h1 className="h1 ir-title">South Lawn Capital</h1>
                        <p className="lead ir-subtitle">
                            Direct real estate exposure via regulated structures. View portfolio performance and active acquisitions.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="tab-nav">
                        <button
                            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
                            onClick={() => setActiveTab('portfolio')}
                        >
                            Real Estate Portfolio
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('performance')}
                        >
                            Performance
                        </button>
                    </div>

                    {/* TAB CONTENT: Portfolio */}
                    {activeTab === 'portfolio' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Live Holdings</h3>
                                <div className="metrics-grid">
                                    <div className="metric-card">
                                        <div className="metric-label">Assets Under Management</div>
                                        <div className="metric-value">$4.2M</div>
                                        <div className="metric-delta positive">▲ $0.5M this quarter</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Active Doors</div>
                                        <div className="metric-value">28</div>
                                        <div className="metric-delta positive">▲ 3 new</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Occupancy Rate</div>
                                        <div className="metric-value">96%</div>
                                        <div className="metric-delta neutral">-- stable</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-label">Avg. Yield</div>
                                        <div className="metric-value">8.4%</div>
                                        <div className="metric-delta positive">▲ 0.2%</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--c-border)' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Latest Acquisitions</h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between' }}>
                                            <span><strong>124 Maple St.</strong> (Duplex)</span>
                                            <span>Acquired Dec 10</span>
                                        </li>
                                        <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between' }}>
                                            <span><strong>890 Oak Ave.</strong> (Single Family)</span>
                                            <span>Acquired Nov 22</span>
                                        </li>
                                        <li style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', color: 'var(--c-text-sub)' }}>
                                            <span><strong>45 Willow Ln.</strong> (Triplex)</span>
                                            <span>Under Contract</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* TAB CONTENT: Performance */}
                    {activeTab === 'performance' && (
                        <div className="tab-content fade-in">
                            <section className="ir-section">
                                <h3 className="section-label">Fund Metrics</h3>
                                <p style={{ textAlign: 'center', color: 'var(--c-text-sub)', padding: '2rem' }}>Performance history and dividend schedules coming soon.</p>
                            </section>
                        </div>
                    )}
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
            `}</style>
        </div>
    );
}
