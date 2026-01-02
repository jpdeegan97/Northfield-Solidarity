import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { Briefcase, CreditCard, Headphones } from 'lucide-react';

export default function NsdcOperations() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NSDC Operations LLC</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The primary customer-facing operating entity. NSDC Operations handles all customer contracts,
                            service delivery, billing, and support execution for the platform.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <Briefcase size={32} style={{ color: '#22c55e', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Contracting</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Sole counterparty for all customer Data Processing Agreements (DPA) and SLAs.
                            </p>
                        </div>
                        <div className="card">
                            <CreditCard size={32} style={{ color: '#0ea5e9', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Revenue & Billing</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Manages accounts receivable, invoicing, and payment processing gateways.
                            </p>
                        </div>
                        <div className="card">
                            <Headphones size={32} style={{ color: '#f59e0b', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Customer Success</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Provides 24/7 support, ongoing account management, and implementation services.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="h3">Liability Shield</h3>
                        <p style={{ color: 'var(--c-text-sub)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            This entity is designed to contain operational liability. It does not own the core Intellectual Property,
                            instead licensing it from <strong>NSDC IP Holdings LLC</strong>. This structure protects the core asset value from strict liability claims.
                        </p>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
