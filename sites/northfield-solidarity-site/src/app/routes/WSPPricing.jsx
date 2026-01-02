import React from 'react';
import Layout from '../../components/Layout.jsx';
import '../../styles/pricing.css';
import { Link } from 'react-router-dom';

export default function WSPPricing() {

    // WSP Custom Nav
    const nav = [
        { label: "Documentation", to: "/wsp/docs" },
        { label: "Pricing", to: "/wsp/pricing" },
        { label: "System", to: "/wsp/system" },
        { label: "Investor Relations", to: "/wsp/investors" },
        { type: "divider" },
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "Wall Street Pro", to: "/wsp" },
        { label: "More Than Enough", to: "/mte" },
        { label: "Iron Logic", to: "/iron" },
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
                <div className="pricing-page">
                    <section className="pricing-hero">
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
                            <div className="pricing-hero-content">
                                <h1 className="h1">Strategic Capital Access.</h1>
                                <p className="lead">
                                    WSP operates on a closed-circuit capital model.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="section center-text">
                        <div className="pricing-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div className="card-header">
                                <h3 className="cardTitle">Membership</h3>
                                <div className="price">
                                    <span className="amount">Private</span>
                                </div>
                                <p className="best-for">Invite Only</p>
                            </div>
                            <div className="card-body">
                                <p style={{ color: 'var(--c-text-sub)' }}>
                                    Access to WSP pricing and deal flow is restricted to vetted partners.
                                </p>
                            </div>
                            <div className="card-footer">
                                <Link to="/wsp/contact" className="btn full-width">Request Invitation</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </div>
    );
}
