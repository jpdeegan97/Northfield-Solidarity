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
                    <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                        <div className="bg-surface p-8 rounded-lg border border-border">
                            <h3 className="text-xl font-bold mb-4">Design principles</h3>
                            <ul className="list-disc pl-5 space-y-2 text-text-sub">
                                <li>Event-driven by default</li>
                                <li>Contracts over conventions</li>
                                <li>Auditable state transitions</li>
                                <li>Human-legible governance + machine-executable flow</li>
                            </ul>
                        </div>
                        <div className="bg-surface p-8 rounded-lg border border-border">
                            <h3 className="text-xl font-bold mb-4">Primary nucleus</h3>
                            <p className="mb-4 text-text-sub">
                                <b className="text-text font-bold">GGP</b> is the engine that keeps everything legible, permissioned, and composable —
                                the governance substrate for the entire stack.
                            </p>
                            <p className="text-sm opacity-70 italic text-text-sub">
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
                    <div className="flex gap-4 mt-12 justify-center">
                        <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-brand text-white hover:brightness-110 transition-all" to="/system">Explore Engines</Link>
                        <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-transparent text-text border border-current hover:text-brand hover:border-brand transition-all" to="/docs">View Documentation</Link>
                    </div>
                </Section>

                <Section
                    eyebrow="Flow"
                    title="How the system moves"
                    subtitle="Signals → research → simulation → identity → execution → ledger → governed audit. Always."
                >
                    <ol className="list-none p-0 grid gap-4 max-w-2xl mx-auto counter-reset-step">
                        {[
                            "Signals + inputs arrive (SIG, MUX)",
                            "Research and insight forms (DRE, PIE)",
                            "Scenarios are tested (SIM)",
                            "Identity + permissions apply (IDN + GGP)",
                            "Actions execute + reconcile (DAT + FLO)",
                            "Everything is governed + audited (GGP always on)"
                        ].map((step, i) => (
                            <li key={i} className="flex gap-4 items-baseline text-lg text-text-sub">
                                <span className="text-brand font-bold text-sm tracking-wider uppercase">0{i + 1}</span>
                                <span>{step.split('(')[0]} <span className="opacity-50 font-mono text-sm">({step.split('(')[1]}</span></span>
                            </li>
                        ))}
                    </ol>
                </Section>

                <Section
                    eyebrow="Documentation"
                    title="A single source of truth"
                    subtitle="Everything is versioned, explicit, and traceable."
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            "Engine charters & boundaries",
                            "Data model (PostgreSQL + Mongo)",
                            "Event envelope + topic contracts",
                            "Idempotency + retry + DLQ standards",
                            "Deployment topology (PowerEdge / containers)",
                            "Security + IP lockdown strategy",
                        ].map((t) => (
                            <div key={t} className="p-4 bg-card-bg border border-border rounded font-medium text-center flex items-center justify-center min-h-[5rem] hover:border-brand hover:text-brand transition-colors cursor-default">{t}</div>
                        ))}
                    </div>
                </Section>

                <Section
                    eyebrow="Ecosystem"
                    title="Operating companies can branch without duplicating the core stack."
                    subtitle="South Lawn RE Holdings is a real-estate-only operator that consumes NS governance and infrastructure."
                >
                    <div className="w-full flex justify-center mt-8">
                        <div className="bg-surface border border-border p-8 rounded-xl flex flex-col gap-4 items-center text-center max-w-2xl">
                            <div className="text-2xl font-bold">South Lawn RE Holdings</div>
                            <div className="max-w-lg text-text-sub">
                                Real estate only. Domain engines focused on market research, entity creation automation, and portfolio tracking.
                            </div>
                            <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-brand text-white hover:brightness-110 transition-all" to="/southlawn">Visit South Lawn</Link>
                        </div>
                    </div>
                </Section>

            </Layout>
        </div>
    );
}

function HeroNS() {
    return (
        <section className="relative overflow-hidden py-32 bg-[radial-gradient(circle_at_top,var(--c-brand-light),transparent_60%)] text-center">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-brand font-bold uppercase text-xs tracking-widest mb-4">Be water.</div>
                    <h1 className="text-6xl font-extrabold tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-brand/50">
                        Systems that govern, adapt, and execute — without friction.
                    </h1>
                    <p className="text-xl text-text-sub max-w-2xl mx-auto mb-8 leading-relaxed">
                        Northfield Solidarity builds a modular engine stack for governance, research, market integration,
                        simulation, identity, and financial orchestration.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-brand text-white hover:brightness-110 transition-all" to="/system">Explore the System</Link>
                        <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-[#00ff9d] text-[#001a10] border border-[#00ff9d] hover:brightness-110 transition-all" to="/platform">Launch Platform</Link>
                        <Link className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md bg-transparent text-text border border-current hover:text-brand hover:border-brand transition-all" to="/docs">View Documentation</Link>
                    </div>
                </div>

                <div className="relative bg-card-bg border border-border rounded-xl p-8 shadow-2xl max-w-md w-full mt-8 hidden md:block">
                    <div className="text-sm font-semibold text-text-sub uppercase tracking-wider mb-2">Nucleus</div>
                    <div className="text-6xl font-black text-brand font-mono leading-none mb-2">GGP</div>
                    <div className="text-xl font-bold mb-4">Governance Graph Processor</div>
                    <div className="pt-4 border-t border-border text-sm text-text-sub">Permissions • Approvals • State • Audit</div>
                </div>
            </div>
        </section>
    );
}