import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function WSPInvestors() {
    const { hasPermission } = useAuth();
    const canViewDetails = hasPermission(USER_ROLES.INVESTOR);
    const [activeTab, setActiveTab] = useState('overview');

    // WSP Custom Nav
    const nav = [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Documentation", to: "/wsp/docs" },
        { label: "Pricing", to: "/wsp/pricing" },
        { label: "System", to: "/wsp/system" },
        { label: "Investor Relations", to: "/wsp/investors" },
    ];

    return (
        <div data-theme="gold">
            <Layout
                nav={nav}
                brand={{
                    title: "WSP",
                    tagline: "Architecture for the next epoch.",
                    footerLine: "WSP • Strategic Operations",
                    footerNote: "Limited Disclosure.",
                }}
            >
                <div className="investor-portal">
                    <div className="ir-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="badge ir-badge" style={{ background: 'var(--c-brand)', color: '#fff', marginBottom: '1rem', display: 'inline-block' }}>
                            {canViewDetails ? 'Status: Active' : 'Status: Formation'}
                        </div>
                        <h1 className="h1 ir-title">WSP Strategic Ventures</h1>
                        <p className="lead ir-subtitle" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--c-text-sub)' }}>
                            Deploying capital into high-velocity, asymmetric opportunities protected by the Northfield governance stack.
                        </p>
                    </div>

                    <div className="tab-nav" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--c-border)' }}>
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                            style={{
                                background: 'none', border: 'none',
                                borderBottom: activeTab === 'overview' ? '2px solid var(--c-brand)' : '2px solid transparent',
                                color: activeTab === 'overview' ? 'var(--c-brand)' : 'var(--c-text-sub)',
                                padding: '1rem', cursor: 'pointer', fontWeight: 600
                            }}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
                            onClick={() => setActiveTab('portfolio')}
                            style={{
                                background: 'none', border: 'none',
                                borderBottom: activeTab === 'portfolio' ? '2px solid var(--c-brand)' : '2px solid transparent',
                                color: activeTab === 'portfolio' ? 'var(--c-brand)' : 'var(--c-text-sub)',
                                padding: '1rem', cursor: 'pointer', fontWeight: 600
                            }}
                        >
                            Target Assets
                        </button>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <section className="ir-section">
                                <h3 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--c-text-sub)', marginBottom: '1rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '0.5rem' }}>Strategy</h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                    WSP acts as the rapid-deployment arm. While South Lawn focuses on long-term stewardship, WSP is designed for agility—capturing value in volatile markets through short-to-medium term hold periods.
                                </p>
                                <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="metric-card" style={{ background: 'var(--c-surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--c-border)' }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Target IRR</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c-brand)' }}>20%+</div>
                                    </div>
                                    <div className="metric-card" style={{ background: 'var(--c-surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--c-border)' }}>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Hold Period</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>18-36 mo</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'portfolio' && (
                        <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '3rem', background: 'var(--c-surface)', borderRadius: '12px' }}>
                            {canViewDetails ? (
                                <>
                                    <h3 className="h3">Active Pipeline</h3>
                                    <div style={{ marginTop: '2rem', padding: '2rem', border: '1px dashed var(--c-border)', borderRadius: '8px', color: 'var(--c-text-sub)' }}>
                                        No active opportunities at this time.
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="h3">Confidential</h3>
                                    <p style={{ color: 'var(--c-text-sub)', marginBottom: '2rem' }}>Target asset classes are restricted to authorized partners.</p>
                                    <Link to="/wsp/contact" className="btn ghost">Request Access</Link>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </Layout>
        </div>
    );
}
