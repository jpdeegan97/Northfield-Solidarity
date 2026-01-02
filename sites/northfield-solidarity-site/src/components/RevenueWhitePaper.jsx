import React from 'react';

const RevenueWhitePaper = () => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mt-12 mb-12 max-w-4xl mx-auto font-serif text-gray-300">
            <header className="text-center mb-12 border-b border-white/10 pb-8">
                <div className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">Northfield Capital Intelligence</div>
                <h1 className="text-3xl font-serif text-white mb-2">Northfield Solidarity: Revenue Modeling & Projection Logics</h1>
                <div className="text-sm text-gray-400 italic">January 1, 2026</div>
            </header>

            <div className="mb-12 bg-white/5 p-6 rounded italic border-l-4 border-blue-500/50">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2 not-italic">Abstract</h3>
                <p>
                    This white paper details the mathematical framework underpinning the Northfield Solidarity financial projections. It defines the discrete recursive functions used to model user acquisition, revenue stacking (MRR + Services + Expansion), and churn dynamics across three distinct growth scenarios: Conservative (Organic), Base (Enterprise), and Blitzscale (Viral).
                </p>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">1. Core Projection Methodology</h2>
                <p className="mb-4">
                    The Northfield Financial Engine (NFE) utilizes a monthly discrete-time simulation model to forecast Annualized Recurring Revenue (ARR) and capital efficiency. The model is recursive, where the state at month <i className="font-serif">t</i> is a function of the state at <i className="font-serif">t-1</i> plus stochastic variance in growth drivers.
                </p>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white/90 mb-4">1.1 User Acquisition Function</h3>
                    <p className="mb-4">The active user count <i className="font-serif">U(t)</i> is defined as:</p>
                    <div className="bg-black/20 p-4 rounded text-center font-mono text-sm border border-white/5 my-4">
                        U(t) = U(t-1) + Δ<sub>new</sub>(t) - Δ<sub>churn</sub>(t)
                    </div>
                    <p className="mt-4 mb-4">
                        Where new user acquisition <i className="font-serif">Δ<sub>new</sub>(t)</i> follows a tiered logistic growth function depending on the selected scenario <i className="font-serif">S</i>:
                    </p>
                    <div className="bg-black/20 p-4 rounded text-center font-mono text-sm border border-white/5 my-4">
                        Δ<sub>new</sub>(t) = U(t-1) · r<sub>growth</sub>(S, U(t-1))
                    </div>
                    <p className="mt-4 mb-4">
                        In the <strong>Blitzscale</strong> scenario (targeting 10,000 active nodes by Q2 '26), <i className="font-serif">r<sub>growth</sub></i> is dynamic to simulate viral saturation.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-white/90 mb-4">1.2 Revenue Composition</h3>
                    <p className="mb-4">Total Monthly Revenue <i className="font-serif">R<sub>total</sub>(t)</i> is a composite of three streams:</p>
                    <div className="bg-black/20 p-4 rounded text-center font-mono text-sm border border-white/5 my-4">
                        R<sub>total</sub>(t) = R<sub>sub</sub>(t) + R<sub>svc</sub>(t) + R<sub>exp</sub>(t)
                    </div>

                    <div className="ml-4 mt-6">
                        <h4 className="font-bold text-white/80 mb-2">1.2.1 Subscription Revenue (<i className="font-serif">R<sub>sub</sub></i>)</h4>
                        <p className="mb-2">Standard monthly licensing fees based on Average Revenue Per User (ARPU):</p>
                        <div className="bg-black/20 p-2 rounded text-center font-mono text-xs border border-white/5 my-2">
                            R<sub>sub</sub>(t) = U(t) · ARPU
                        </div>
                    </div>

                    <div className="ml-4 mt-6">
                        <h4 className="font-bold text-white/80 mb-2">1.2.2 Service & Implementation Revenue (<i className="font-serif">R<sub>svc</sub></i>)</h4>
                        <p className="mb-2">One-time revenue derived from new enterprise onboarding. We assume an Attach Rate <i className="font-serif">α</i> and an average ticket size <i className="font-serif">P<sub>setup</sub></i>:</p>
                        <div className="bg-black/20 p-2 rounded text-center font-mono text-xs border border-white/5 my-2">
                            R<sub>svc</sub>(t) = Δ<sub>new</sub>(t) · α · P<sub>setup</sub>
                        </div>
                    </div>

                    <div className="ml-4 mt-6">
                        <h4 className="font-bold text-white/80 mb-2">1.2.3 Expansion Revenue (<i className="font-serif">R<sub>exp</sub></i>)</h4>
                        <p className="mb-2">Modeled on "Land and Expand" mechanics. We assume a subset <i className="font-serif">β</i> of the existing user base (<i className="font-serif">U(t-1)</i>) increases their spend by percentage <i className="font-serif">γ</i> annually.</p>
                        <div className="bg-black/20 p-2 rounded text-center font-mono text-xs border border-white/5 my-2">
                            R<sub>exp</sub>(t) = (U(t) · β) · (ARPU · γ) / 12
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">2. Scenario Parameters</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded border border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-4">Scenario A: Conservative</h3>
                        <ul className="text-sm space-y-2 list-disc pl-4 text-gray-400">
                            <li><strong>MoM Growth:</strong> 8%</li>
                            <li><strong>ARPU:</strong> $250</li>
                            <li><strong>Churn:</strong> 5.0%</li>
                            <li><strong>Logic:</strong> Zero marketing spend, pure word-of-mouth.</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-4 rounded border border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">Scenario B: Base Case</h3>
                        <ul className="text-sm space-y-2 list-disc pl-4 text-gray-400">
                            <li><strong>MoM Growth:</strong> 15%</li>
                            <li><strong>ARPU:</strong> $450</li>
                            <li><strong>Churn:</strong> 3.0%</li>
                            <li><strong>Logic:</strong> Direct sales team active, typical SaaS ramp.</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-4 rounded border border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Scenario C: Blitzscale</h3>
                        <ul className="text-sm space-y-2 list-disc pl-4 text-gray-400">
                            <li><strong>MoM Growth:</strong> 115% (decaying)</li>
                            <li><strong>ARPU:</strong> $150</li>
                            <li><strong>Churn:</strong> 8.0%</li>
                            <li><strong>Logic:</strong> Loss-leader pricing strategy (~$150) combined with aggressive referral loops to hit 10k users in &lt;6 months.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RevenueWhitePaper;
