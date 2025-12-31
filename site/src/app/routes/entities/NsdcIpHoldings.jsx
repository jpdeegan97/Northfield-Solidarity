import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { Copyright, Archive, ShieldCheck } from 'lucide-react';

export default function NsdcIpHoldings() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NSDC IP Holdings LLC</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The vault of the ecosystem. This entity holds title to all Intellectual Property, trademarks,
                            patents, and proprietary datasets. It does not conduct operations to maintain a pristine liability profile.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <Copyright size={32} style={{ color: '#a855f7', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>IP Ownership</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Legal owner of the codebase, documentation, and trade secrets.
                            </p>
                        </div>
                        <div className="card">
                            <Archive size={32} style={{ color: '#d97706', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Licensing</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Executes intercompany license agreements granting operational rights to NSDC Operations LLC.
                            </p>
                        </div>
                        <div className="card">
                            <ShieldCheck size={32} style={{ color: '#22c55e', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Asset Protection</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Isolated from commercial risks, ensuring the core value of the company remains secure.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="h3">Holdings Registry</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ padding: '0.75rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }}>Core Engine Codebase</div>
                            <div style={{ padding: '0.75rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }}>Northfield Operations Manual</div>
                            <div style={{ padding: '0.75rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }}>Market Intelligence Datasets</div>
                            <div style={{ padding: '0.75rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.9rem' }}>Brand & Trademarks</div>
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
