import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { FlaskConical, Radiation, Biohazard } from 'lucide-react';

export default function NsdcExperimental() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NSDC Experimental Lab</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The "Skunkworks" division. A restricted environment for high-risk, high-reward research initiatives
                            that fall outside standard operational parameters including cognito-hazardous materials.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <FlaskConical size={32} style={{ color: '#ef4444', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Exotic Research</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Investigation into non-standard economic models and alternative governance structures.
                            </p>
                        </div>
                        <div className="card">
                            <Radiation size={32} style={{ color: '#eab308', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Containment</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Specialized protocols for handling volatile information and experimental code.
                            </p>
                        </div>
                        <div className="card">
                            <Biohazard size={32} style={{ color: '#8b5cf6', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Black Ops</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Classified internal projects with need-to-know access controls.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <h3 className="h3" style={{ color: '#f87171' }}>Restricted Access Warning</h3>
                        <p style={{ color: 'var(--c-text-sub)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                            Operations within this entity are compartmentalized. Interaction with the main ecosystem occurs only
                            via unidirectional data diodes to prevent contamination of the core consensus layer.
                        </p>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
