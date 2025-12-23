import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";

export default function SouthLawnLanding() {

    return (
        <div data-theme="green">
            <Layout
                brand={{
                    title: "South Lawn RE Holdings",
                    tagline: "Stewardship of land. Quiet execution.",
                    footerLine: "Stewardship • Operations • Portfolio Execution",
                    footerNote: "Quiet execution. Long-horizon compounding.",
                }}
                nav={[
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "WSP", to: "/wsp" },
                    { type: "divider" },
                    { label: "Documentation", to: "/southlawn/docs" },
                    { label: "Pricing", to: "/southlawn/pricing" },
                    { label: "System", to: "/southlawn/system" },
                    { label: "Investor Relations", to: "/southlawn/investors" },
                ]}
            >
                <HeroSL />

                <Section
                    eyebrow="What this is"
                    title="A dedicated real estate vehicle — strictly real estate."
                    subtitle="SouthLawn does not replicate the NS core stack. It consumes NS governance and infrastructure, while maintaining real-estate-only domain engines."
                >
                    <div className="twoCol">
                        <div className="callout">
                            <h3 className="h3">Operating focus</h3>
                            <ul className="list">
                                <li>Acquisition discipline</li>
                                <li>Clean operating processes</li>
                                <li>Durable improvements</li>
                                <li>Measured performance (not anecdotes)</li>
                            </ul>
                        </div>
                        <div className="callout">
                            <h3 className="h3">Systems stance</h3>
                            <p className="p">
                                Real estate rewards patience — and it rewards precision.
                                SouthLawn runs assets as systems: repeatable workflows, clear gates, and persistent documentation.
                            </p>
                            <p className="p subtle">
                                The core functionality lives in NS. SouthLawn stays domain-pure.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Capabilities"
                    title="Built for the asset lifecycle"
                    subtitle="SouthLawn operates with three core capabilities, each supported by Northfield infrastructure."
                >
                    <div className="grid">
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Research & Feasibility</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Powered by MRFPE</p>
                            <p className="cardBody">
                                Deep market analysis and financial projection models designed specifically for multi-family retention and long-term yield.
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Capital Structuring</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Powered by PECA</p>
                            <p className="cardBody">
                                Automated entity formation and clean equity/debt stacking to ensure every asset is ring-fenced and optimized.
                            </p>
                        </div>
                        <div className="card">
                            <h3 className="h3" style={{ marginBottom: '0.5rem' }}>Portfolio Operations</h3>
                            <p className="sub" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--c-brand)' }}>Powered by PTE</p>
                            <p className="cardBody">
                                Daily health monitoring of all assets, tracking maintenance, tenant satisfaction, and financial performance against reserves.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Flow"
                    title="How SouthLawn operates"
                    subtitle="Practical, repeatable execution from research to structure to ongoing portfolio control."
                >
                    <ol className="steps">
                        <li><b>Research & projection</b> (MRFPE)</li>
                        <li><b>Acquire & structure cleanly</b> (PECA)</li>
                        <li><b>Operate & track relentlessly</b> (PTE)</li>
                        <li><b>Governance is inherited from NS</b> (permissions, approvals, auditable decisions)</li>
                    </ol>
                    <div className="ctaRow">
                        <button className="btn" type="button">Request Portfolio Access</button>
                        <Link className="btn ghost" to="/">Visit Northfield Solidarity</Link>
                    </div>
                </Section>

                <Section
                    eyebrow="Thesis"
                    title="Buy well. Operate clean. Improve intentionally."
                    subtitle="Value is created through execution quality."
                >
                    <div className="grid docsGrid">
                        {[
                            "Operational fixes (leases, process, vendor control)",
                            "Durable capex improvements",
                            "Reserve policy enforcement",
                            "Maintenance cadence as value creation",
                            "Tenant experience without chaos",
                            "Risk controls and compliance rails",
                        ].map((t) => (
                            <div key={t} className="docCard">{t}</div>
                        ))}
                    </div>
                    <div className="ctaRow">
                        <Link className="btn ghost" to="/southlawn/thesis">Read Full 2025-2026 Thesis</Link>
                    </div>
                </Section>

                <Section
                    eyebrow="Relationship"
                    title="Different domain. Same discipline."
                    subtitle="SouthLawn is an operator. Northfield Solidarity is the engine factory."
                >
                    <div className="ecosystem">
                        <div className="ecosystemCard">
                            <div className="ecosystemTitle">Northfield Solidarity</div>
                            <div className="ecosystemBody">
                                Core engines: governance, research, simulation, market integration, identity, and financial orchestration.
                            </div>
                            <Link className="btn" to="/">Visit Northfield Solidarity</Link>
                        </div>
                    </div>
                </Section>
            </Layout>
        </div>
    );
}

function HeroSL() {
    return (
        <section className="hero">
            <div className="heroInner">
                <div className="heroCopy">
                    <div className="kicker">On land, not in theory.</div>
                    <h1 className="h1">Real estate operations powered by disciplined systems.</h1>
                    <p className="lead">
                        SouthLawn RE Holdings acquires, improves, and manages real estate assets with long-horizon discipline and operational clarity.
                    </p>
                    <div className="ctaRow">
                        <Link className="btn" to="/southlawn/thesis">View Thesis</Link>
                        <Link className="btn ghost" to="/southlawn/investors">View Portfolio</Link>
                    </div>
                </div>

                <div className="heroPanel" aria-hidden="true" style={{ borderColor: 'var(--c-brand)' }}>
                    <div className="heroPanelTitle">Real Estate Engines</div>
                    <div className="heroPanelBig">MRFPE<br />PECA<br />PTE</div>
                    <div className="heroPanelSub">Research<br />Entity Structuring<br />Portfolio Control</div>
                    <div className="heroPanelLine">Quiet Execution<br />Long-Horizon Compounding</div>
                </div>
            </div>
            <div className="heroFade" aria-hidden="true" />

            <style>{`
                [data-theme="green"] .hero {
                    background: radial-gradient(circle at top right, rgba(26, 46, 26, 0.8) 0%, rgba(5, 5, 5, 0.4) 60%);
                }
                [data-theme="green"] .heroPanel {
                    background: rgba(20, 40, 20, 0.4);
                }
            `}</style>
        </section>
    );
}