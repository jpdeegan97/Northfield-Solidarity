import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

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
                ]}
            >
                <HeroWSP />

                <div className="max-w-5xl mx-auto px-6 py-20">
                    <div className="border border-white/10 bg-white/5 p-8 rounded-xl backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <Activity size={24} style={{ color: '#d97706' }} />
                                System Status
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-mono opacity-50 text-white">
                                <span className="w-2 h-2 rounded-full animate-pulse bg-amber-600" style={{ backgroundColor: '#d97706' }} />
                                LIVE SIGNAL
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <StatusRow label="Formation Stage" value="Phase I" themeColor="#d97706" />
                                <StatusRow label="Capital Goal" value="$150M" themeColor="#d97706" />
                                <StatusRow label="Deployed" value="$0" themeColor="#d97706" highlight />
                            </div>
                            <div className="space-y-4">
                                <StatusRow label="Entity Status" value="Active" themeColor="#d97706" />
                                <StatusRow label="Jurisdiction" value="Global" themeColor="#d97706" />
                                <StatusRow label="Uptime" value="99.99%" themeColor="#d97706" />
                            </div>
                        </div>

                        {/* Health Bars Visualization */}
                        <div className="border-t border-white/5 pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 text-[#d97706]">Deployment Velocity</h4>
                            <div className="flex items-end gap-1 h-24 bg-black/20 rounded-lg p-4 border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                                {[40, 65, 55, 80, 45, 90, 70, 35, 60, 75, 50, 85, 65, 40, 95, 60, 70, 50, 80, 65, 45, 75, 60, 85].map((h, i) => (
                                    <div key={i}
                                        className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100"
                                        style={{
                                            height: `${h}%`,
                                            backgroundColor: '#d97706',
                                            opacity: 0.3 + (h / 200)
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-2 text-[10px] font-mono opacity-50 uppercase text-[#d97706]">
                                <span>Risk: Low</span>
                                <span>Alpha: High</span>
                            </div>
                        </div>
                    </div>
                </div>

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

function StatusRow({ label, value, themeColor, highlight }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <span className="text-white/40 text-sm font-mono uppercase tracking-wider">{label}</span>
            <span
                className="font-bold font-mono text-lg"
                style={{ color: highlight ? themeColor : 'white' }}
            >
                {value}
            </span>
        </div>
    );
}
