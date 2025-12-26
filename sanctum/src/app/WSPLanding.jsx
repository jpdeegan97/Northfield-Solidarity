import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";

export default function WSPLanding() {

    return (
        <div data-theme="gold">
            <Layout
                brand={{
                    title: "WSP",
                    tagline: "Architecture for the next epoch.",
                    footerLine: "WSP • Strategic Operations",
                    footerNote: "Limited Disclosure.",
                }}
                nav={[
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "WSP", to: "/wsp" },
                    { type: "divider" },
                    { label: "Documentation", to: "/wsp/docs" },
                    { label: "Pricing", to: "/wsp/pricing" },
                    { label: "System", to: "/wsp/system" },
                    { label: "Investor Relations", to: "/wsp/investors" },
                ]}
            >
                <HeroWSP />

                <Section
                    eyebrow="Entity Status"
                    title="A distinct operating vehicle."
                    subtitle="WSP operates independently of the Northfield and South Lawn mandates, focusing on specialized asset deployment."
                >
                    <div className="twoCol">
                        <div className="callout">
                            <h3 className="h3">Thesis</h3>
                            <p className="p">
                                While Northfield builds the engine and South Lawn operates real estate, WSP focuses on high-velocity strategic initiatives and alternative asset classes.
                            </p>
                        </div>
                        <div className="callout">
                            <h3 className="h3">Phase I</h3>
                            <ul className="list">
                                <li>Entity Formation</li>
                                <li>Capital Structuring</li>
                                <li>Initial Asset Identification</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Integration"
                    title="Powered by Northfield"
                    subtitle="Inheriting the governance and research capabilities of the core stack."
                >
                    <div className="grid">
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Governance</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Inherited from GGP</p>
                            <p className="cardBody">
                                Utilizing the Governance Graph Processor for decision tracking and cap table management.
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Research</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Powered by DRE</p>
                            <p className="cardBody">
                                Deep Research Engine applied to emerging market verticals.
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Identity</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Secured by IDN</p>
                            <p className="cardBody">
                                Unified identity and access control across all WSP operations.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Contact"
                    title="Inquiries"
                    subtitle="Direct communication channels are currently closed to the public."
                >
                    <div className="ctaRow">
                        <div className="badge" style={{ background: 'var(--c-surface)', color: 'var(--c-text-sub)' }}>Invite Only</div>
                    </div>
                </Section>
            </Layout>
        </div>
    );
}

function HeroWSP() {
    return (
        <section className="hero">
            <div className="heroInner">
                <div className="heroCopy">
                    <div className="kicker">Formation Stage</div>
                    <h1 className="h1">Strategic Asset Deployment.</h1>
                    <p className="lead">
                        WSP is a standalone entity leveraging the Northfield stack for speed, precision, and privacy.
                    </p>
                    <div className="ctaRow">
                        <button className="btn" type="button" disabled style={{ opacity: 0.7, cursor: 'not-allowed' }}>Access Portal</button>
                        <Link className="btn ghost" to="/">Return to Northfield</Link>
                    </div>
                </div>

                <div className="heroPanel" aria-hidden="true" style={{ borderColor: 'var(--c-brand)' }}>
                    <div className="heroPanelTitle">WSP Protocol</div>
                    <div className="heroPanelBig">WSP</div>
                    <div className="heroPanelSub">Formation</div>
                    <div className="heroPanelLine">Strategic • Private • Fast</div>
                </div>
            </div>
            <div className="heroFade" aria-hidden="true" />

            <style>{`
                [data-theme="gold"] .hero {
                    background: radial-gradient(circle at top right, rgba(41, 37, 36, 0.8) 0%, rgba(12, 10, 9, 0.4) 60%);
                }
                [data-theme="gold"] .heroPanel {
                    background: rgba(41, 37, 36, 0.4);
                    box-shadow: 0 0 30px rgba(245, 158, 11, 0.1);
                }
            `}</style>
        </section>
    );
}
