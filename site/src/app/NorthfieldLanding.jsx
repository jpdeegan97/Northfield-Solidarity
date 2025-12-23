import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import EngineGrid from "../components/EngineGrid.jsx";
import { NS_ENGINES } from "../data/engineRegistry.js";
import { Link } from "react-router-dom";

export default function NorthfieldLanding() {
    // Theme: Water

    return (
        <div data-theme="water">
            <Layout>
                <HeroNS />

                <Section
                    eyebrow="What this is"
                    title="A core engine stack for building companies that run like systems."
                    subtitle="Northfield Solidarity (NS) is where the foundational machinery lives — reusable across domains."
                >
                    <div className="twoCol">
                        <div className="callout">
                            <h3 className="h3">Design principles</h3>
                            <ul className="list">
                                <li>Event-driven by default</li>
                                <li>Contracts over conventions</li>
                                <li>Auditable state transitions</li>
                                <li>Human-legible governance + machine-executable flow</li>
                            </ul>
                        </div>
                        <div className="callout">
                            <h3 className="h3">Primary nucleus</h3>
                            <p className="p">
                                <b>GGP</b> is the engine that keeps everything legible, permissioned, and composable —
                                the governance substrate for the entire stack.
                            </p>
                            <p className="p subtle">
                                You don’t “add governance later.” You inherit it from the beginning.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Engine constellation"
                    title="Core engines (Northfield Solidarity)"
                    subtitle="These are the reusable engines. Operating companies consume them; they don’t re-invent them."
                >
                    <EngineGrid engines={NS_ENGINES} />
                    <div className="ctaRow">
                        <Link className="btn" to="/system">Explore Engines</Link>
                        <Link className="btn ghost" to="/docs">View Documentation</Link>
                    </div>
                </Section>

                <Section
                    eyebrow="Flow"
                    title="How the system moves"
                    subtitle="Signals → research → simulation → identity → execution → ledger → governed audit. Always."
                >
                    <ol className="steps">
                        <li><b>Signals + inputs arrive</b> (SIG, MUX)</li>
                        <li><b>Research and insight forms</b> (DRE, PIE)</li>
                        <li><b>Scenarios are tested</b> (SIM)</li>
                        <li><b>Identity + permissions apply</b> (IDN + GGP)</li>
                        <li><b>Actions execute + reconcile</b> (DAT + FLO)</li>
                        <li><b>Everything is governed + audited</b> (GGP always on)</li>
                    </ol>
                </Section>

                <Section
                    eyebrow="Documentation"
                    title="A single source of truth"
                    subtitle="Everything is versioned, explicit, and traceable."
                >
                    <div className="grid docsGrid">
                        {[
                            "Engine charters & boundaries",
                            "Data model (PostgreSQL + Mongo)",
                            "Event envelope + topic contracts",
                            "Idempotency + retry + DLQ standards",
                            "Deployment topology (PowerEdge / containers)",
                            "Security + IP lockdown strategy",
                        ].map((t) => (
                            <div key={t} className="docCard">{t}</div>
                        ))}
                    </div>
                </Section>

                <Section
                    eyebrow="Ecosystem"
                    title="Operating companies can branch without duplicating the core stack."
                    subtitle="South Lawn RE Holdings is a real-estate-only operator that consumes NS governance and infrastructure."
                >
                    <div className="ecosystem">
                        <div className="ecosystemCard">
                            <div className="ecosystemTitle">South Lawn RE Holdings</div>
                            <div className="ecosystemBody">
                                Real estate only. Domain engines focused on market research, entity creation automation, and portfolio tracking.
                            </div>
                            <Link className="btn" to="/southlawn">Visit South Lawn</Link>
                        </div>
                    </div>
                </Section>
            </Layout>
        </div>
    );
}

function HeroNS() {
    return (
        <section className="hero">
            <div className="heroInner">
                <div className="heroCopy">
                    <div className="kicker">Be water.</div>
                    <h1 className="h1">Systems that adapt, govern, and execute — without friction.</h1>
                    <p className="lead">
                        Northfield Solidarity builds a modular engine stack for governance, research, market integration,
                        simulation, identity, and financial orchestration.
                    </p>
                    <div className="ctaRow">
                        <Link className="btn" to="/system">Explore the System</Link>
                        <Link className="btn ghost" to="/docs">View Documentation</Link>
                    </div>
                </div>

                <div className="heroPanel" aria-hidden="true">
                    <div className="heroPanelTitle">Nucleus</div>
                    <div className="heroPanelBig">GGP</div>
                    <div className="heroPanelSub">Governance Graph Processor</div>
                    <div className="heroPanelLine">Permissions • Approvals • State • Audit</div>
                </div>
            </div>
            <div className="heroFade" aria-hidden="true" />
        </section>
    );
}