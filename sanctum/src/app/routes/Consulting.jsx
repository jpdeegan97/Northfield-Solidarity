import React from 'react';

export default function Consulting() {
    return (
        <div className="consulting-section" style={{ borderTop: '1px solid var(--border-color)', marginTop: '4rem', paddingTop: '4rem' }}>
            <h2 className="h2" style={{ marginBottom: '2rem' }}>Consulting & Private Advisory</h2>
            <p className="lead" style={{ maxWidth: '800px', marginBottom: '3rem' }}>
                For sovereign entities and founders requiring direct operational alignment.
                Bypass the queue and work directly with the architect.
            </p>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Fractional CTO */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h3 className="cardTitle">Fractional CTO / Architect</h3>
                    <div className="price-tag" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-color)', margin: '1rem 0' }}>
                        $15,000 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ month</span>
                    </div>
                    <p style={{ flex: 1, marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Embed me into your executive team. I will audit your stack, design your technical roadmap,
                        and align your engineering culture with sovereign principles.
                        Includes weekly strategy sessions and direct access.
                    </p>
                    <a href="mailto:jp@northfieldsolidarity.com?subject=Fractional%20CTO%20Inquiry" className="btn ghost full-width">Inquire</a>
                </div>

                {/* System Audit */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h3 className="cardTitle">Governance Audit & System Mapping</h3>
                    <div className="price-tag" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-color)', margin: '1rem 0' }}>
                        $8,500 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ one-time</span>
                    </div>
                    <p style={{ flex: 1, marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        A rigorous 2-week deep dive into your current operations. I will map your hidden dependencies,
                        identify fragility, and deliver a "Sovereign Architecture" blueprint for your organization.
                    </p>
                    <a href="mailto:jp@northfieldsolidarity.com?subject=Audit%20Inquiry" className="btn ghost full-width">Book Audit</a>
                </div>

                {/* The "Ride" */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'var(--primary-color)' }}>
                    <div className="recommended-badge" style={{ alignSelf: 'flex-start', background: 'var(--primary-color)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        THE RIDE
                    </div>
                    <h3 className="cardTitle">The Founder's Residency</h3>
                    <div className="price-tag" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-color)', margin: '1rem 0' }}>
                        $50,000 <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ quarter</span>
                    </div>
                    <p style={{ flex: 1, marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Total immersion. I become your shadow co-founder. We deploy the Northfield Operating System together,
                        re-train your team, and I personally oversee your most critical launch.
                        Limited to 1 partner per quarter.
                    </p>
                    <a href="mailto:jp@northfieldsolidarity.com?subject=Residency%20Application" className="btn full-width">Apply for Residency</a>
                </div>
            </div>
        </div>
    );
}
