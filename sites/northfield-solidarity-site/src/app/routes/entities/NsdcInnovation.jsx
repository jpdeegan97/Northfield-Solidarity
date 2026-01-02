import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { Microscope, Zap, Database } from 'lucide-react';

export default function NsdcInnovation() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NSDC Innovation Labs</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The primary Research & Development facility. Focused on prototyping next-generation engines,
                            algorithmic optimization, and architectural breakthroughs.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <Microscope size={32} style={{ color: '#f97316', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Prototyping</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Rapid development and testing of new engine concepts before commercialization.
                            </p>
                        </div>
                        <div className="card">
                            <Zap size={32} style={{ color: '#8b5cf6', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Stress Testing</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Rigorous verification of system integrity under extreme load and adversarial conditions.
                            </p>
                        </div>
                        <div className="card">
                            <Database size={32} style={{ color: '#06b6d4', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Data Modeling</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Advanced graph theory and data structure research to improved system efficiency.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="h3">IP Assignment Policy</h3>
                        <p style={{ color: 'var(--c-text-sub)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            All intellectual property generated within the Labs is automatically assigned to <strong>NSDC IP Holdings LLC</strong> upon creation
                            to ensure centralized protection and valuation.
                        </p>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
