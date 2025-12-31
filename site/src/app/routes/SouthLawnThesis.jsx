import React from "react";
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { Link } from "react-router-dom";

export default function SouthLawnThesis() {
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
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { type: "divider" },
                    { label: "Documentation", to: "/southlawn/docs" },
                    { label: "Pricing", to: "/southlawn/pricing" },
                    { label: "System", to: "/southlawn/system" },
                    { label: "Investor Relations", to: "/southlawn/investors" },
                ]}
            >
                {/* Header / Title Section */}
                <div style={{
                    padding: 'var(--space-8) var(--space-4)',
                    textAlign: 'center',
                    background: 'radial-gradient(circle at top, rgba(34, 197, 94, 0.1), transparent 70%)'
                }}>
                    <div className="eyebrow">South Lawn RE Holdings</div>
                    <h1 className="h1" style={{ maxWidth: '900px', margin: '0 auto var(--space-4)' }}>
                        How to Thrive in the 2025–2026<br />U.S. Real Estate Market
                    </h1>
                    <p className="lead" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        The market is no longer “fast money on easy leverage.” It’s a selection-and-execution market.
                    </p>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--space-4)' }}>

                    {/* Core Premise & Thesis - Side by Side */}
                    <div className="twoCol" style={{ marginBottom: 'var(--space-8)' }}>
                        <div className="callout">
                            <h3 className="h3">The Premise</h3>
                            <p className="p">
                                Prices are sticky because supply is constrained, buyers are payment-sensitive, and sellers often won’t capitulate. The edge goes to operators who can underwrite conservatively, create optionality, and win deals through certainty and craftsmanship—not hype.
                            </p>
                        </div>
                        <div className="callout" style={{ borderColor: 'var(--c-brand)', background: 'var(--c-bg)' }}>
                            <h3 className="h3" style={{ color: 'var(--c-brand)' }}>The Core Thesis</h3>
                            <p className="p">
                                Thrive by becoming the <b>“certainty buyer / certainty operator”</b> in a rate-constrained market. Prioritize cash-flow durability, focus on mispriced complexity, and build an OS that turns mediocre deals into strong outcomes.
                            </p>
                        </div>
                    </div>

                    {/* The Conditions */}
                    <div style={{ marginBottom: 'var(--space-8)' }}>
                        <h2 className="h2" style={{ fontSize: '2rem', textAlign: 'left', marginBottom: 'var(--space-4)' }}>The Conditions</h2>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <div className="card">
                                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Affordability Gates Demand</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Small rate moves swing buyer activity, but households are still payment-capped.</p>
                            </div>
                            <div className="card">
                                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Inventory vs. Prices</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Inventory is improving unevenly—not enough to break prices. Expect "slow grind" behavior.</p>
                            </div>
                            <div className="card">
                                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Depressed Volume</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Liquidity is scarce. The market rewards patience and discipline.</p>
                            </div>
                            <div className="card">
                                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Rent Growth Caution</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>Underwrite rent and exit caps with skepticism. Operational upside matters more.</p>
                            </div>
                        </div>
                    </div>

                    {/* The Winning Strategy: 6 Principles */}
                    <div style={{ marginBottom: 'var(--space-8)' }}>
                        <h2 className="h2" style={{ fontSize: '2rem', textAlign: 'left', marginBottom: 'var(--space-6)' }}>The Winning Strategy: 6 Principles</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                            <Principle
                                number="1"
                                title="Underwrite for survival first, upside second"
                                text="Base case must work without hero assumptions. Stress test: higher vacancy, flat rents, higher insurance/taxes, longer DOM, and lower exit price. Only pursue deals where you still win under conservative scenarios."
                            />
                            <Principle
                                number="2"
                                title="Buy optionality, not perfection"
                                text="Your goal is to own assets where multiple exits are viable: Hold (cash flow), refi when rates ease, sell when liquidity returns, or convert/re-tenant if needed. Avoid “single-exit” deals."
                            />
                            <Principle
                                number="3"
                                title="Target motivated complexity, not motivated sellers"
                                text="The best opportunities come from complexity: Estates, dissolutions, tired landlords, deferred maintenance, zoning, tenant issues. Win with competence and speed—not by “calling the bottom.”"
                            />
                            <Principle
                                number="4"
                                title="Engineer financing resilience"
                                text="Financing is the product. Prefer fixed/capped rate exposure. Keep DSCR healthy; avoid max leverage. Negotiate flexibility: assumable debt, seller credits, buy-downs, or seller carry."
                            />
                            <Principle
                                number="5"
                                title="Become an operator, not a speculator"
                                text="Returns come from operational excellence: Tight turns, preventive maintenance, tenant experience, expense control. Build playbooks. Track KPIs weekly: occupancy, DOM, renewal rates, maintenance cycle time."
                            />
                            <Principle
                                number="6"
                                title="Win on speed + trust + transparency"
                                text="In low-liquidity markets, sellers choose certainty: Clean offers, tight diligence, reliable close, crisp communication. A reputation for “no nonsense” execution is a compounding advantage."
                            />
                        </div>
                    </div>

                    {/* Where to Play & North Star */}
                    <div className="twoCol" style={{ alignItems: 'start', marginBottom: 'var(--space-10)' }}>
                        <div>
                            <h3 className="h3">Where to Play</h3>
                            <ul className="list" style={{ marginTop: '0' }}>
                                <li><b>Cash-flow biased assets:</b> Small multifamily, SFR portfolios, workforce housing.</li>
                                <li><b>“Refuge” affordability markets:</b> Metros where median incomes support payments without heroic growth.</li>
                                <li><b>Selective CRE exposure:</b> Follow fundamentals (tenant demand), not narratives.</li>
                            </ul>
                        </div>
                        <div className="callout" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-brand)', textAlign: 'center' }}>
                            <h3 className="h3" style={{ color: 'var(--c-brand)' }}>The North Star</h3>
                            <p className="p" style={{ marginBottom: '1rem' }}>
                                Acquire assets you can hold indefinitely, improve materially, and refinance opportunistically—without needing a perfect macro call.
                            </p>
                            <p className="p subtle" style={{ fontStyle: 'italic' }}>
                                In a sticky-price, rate-sensitive market, the winners aren’t the boldest forecasters—they’re the best operators with the most optionality.
                            </p>
                        </div>
                    </div>

                    <div className="ctaRow" style={{ marginBottom: 'var(--space-10)' }}>
                        <Link to="/southlawn" className="btn ghost">Back to South Lawn</Link>
                        <Link to="/southlawn/investors" className="btn">View Investor Portal</Link>
                    </div>

                </div>
            </Layout>
        </div>
    );
}

function Principle({ number, title, text }) {
    return (
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
            <div style={{
                flexShrink: 0,
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: 'var(--c-brand)',
                color: '#fff',
                fontWeight: '800',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem'
            }}>
                {number}
            </div>
            <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--c-text-sub)', lineHeight: 1.6 }}>{text}</p>
            </div>
        </div>
    );
}
