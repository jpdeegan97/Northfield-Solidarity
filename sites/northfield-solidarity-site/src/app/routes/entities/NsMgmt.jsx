import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { Users, FileText, Globe } from 'lucide-react';

export default function NsMgmt() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NS MGMT LLC</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The central nervous system of the Northfield ecosystem. NS MGMT LLC provides centralized shared services,
                            human resources management, and administrative oversight for all subsidiary entities.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <Users size={32} style={{ color: 'var(--c-brand)', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Human Capital</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Centralized employment, contractor management, and payroll processing for the entire group.
                            </p>
                        </div>
                        <div className="card">
                            <FileText size={32} style={{ color: '#a855f7', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Admin & Compliance</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Corporate governance, regulatory filings, and intercompany agreement administration.
                            </p>
                        </div>
                        <div className="card">
                            <Globe size={32} style={{ color: '#00ff9d', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Shared Services</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                IT, legal, and operational support services billed to operating entities via cost allocation.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="h3">Operational Status</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'var(--space-4)' }}>
                            <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>ACTIVE • DELAWARE REG. #7729-XX</span>
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
