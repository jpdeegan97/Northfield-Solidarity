import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import '../../styles/pricing.css';

export default function SouthLawnPricing() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const isAnnual = billingCycle === 'annual';

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
                    { label: "Documentation", to: "/southlawn/docs" },
                    { label: "Pricing", to: "/southlawn/pricing" },
                    { label: "System", to: "/southlawn/system" },
                    { label: "Investor Relations", to: "/southlawn/investors" },
                    { type: "divider" },
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { label: "Iron Logic", to: "/iron" },
                ]}
            >
                <div className="pricing-page">
                    {/* --- HERO --- */}
                    <section className="pricing-hero">
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
                            <div className="pricing-hero-content">
                                <h1 className="h1">Asset management, solved.</h1>
                                <p className="lead">
                                    Direct access to the SouthLawn operating layer. Designed for family offices, syndicators, and long-hold operators.
                                </p>
                                <div className="ctaRow">
                                    <button className="btn">Request Access</button>
                                    <a href="#structure" className="btn ghost">View Structure</a>
                                </div>
                                <ul className="hero-highlights">
                                    <li>Automated Entity Formation (PECA)</li>
                                    <li>Market Feasibility (MRFPE)</li>
                                    <li>Portfolio Health (PTE)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* --- PLANS --- */}
                    <section id="plans" className="section">
                        <div className="sectionHead center-text">
                            <h2 className="h2">Operating Tiers</h2>
                            <div className="billing-toggle-wrapper">
                                <span className={!isAnnual ? 'active' : ''}>Monthly</span>
                                <button
                                    className={`billing-toggle ${isAnnual ? 'toggled' : ''}`}
                                    onClick={() => setBillingCycle(isAnnual ? 'monthly' : 'annual')}
                                    aria-label="Toggle billing cycle"
                                >
                                    <div className="toggle-handle"></div>
                                </button>
                                <span className={isAnnual ? 'active' : ''}>Annual (save ~10%)</span>
                            </div>
                        </div>

                        <div className="pricing-grid">
                            {/* PORTFOLIO STARTER */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Portfolio Starter</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '450' : '49'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">Single Operator / &lt;10 Doors</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>1 Portfolio Workspace</li>
                                        <li>Basic Entity Structure</li>
                                        <li>Monthly Financial Rollups</li>
                                        <li>Vendor Directory</li>
                                        <li>Docs Storage (10GB)</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button className="btn ghost full-width">Start Operating</button>
                                </div>
                            </div>

                            {/* SYNDICATOR */}
                            <div className="pricing-card recommended">
                                <div className="recommended-badge">Growth</div>
                                <div className="card-header">
                                    <h3 className="cardTitle">Syndicator</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '2150' : '199'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">GPs / Mid-Sized Portfolios</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Unlimited Entities</li>
                                        <li>Investor Portal Lite</li>
                                        <li>K-1 Distribution Prep</li>
                                        <li>Deal Room & Data Rooms</li>
                                        <li>Docs Storage (1TB)</li>
                                        <li>Priority Support</li>
                                    </ul>
                                    <div className="bonus-feature">
                                        <strong>Bonus:</strong> Includes 1 Market Feasibility Study / mo
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn full-width">Scale Portfolio</button>
                                </div>
                            </div>

                            {/* INSTITUTIONAL */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Institutional</h3>
                                    <div className="price">
                                        <span className="amount">Custom</span>
                                    </div>
                                    <p className="best-for">REITs / Family Offices</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Dedicated Infrastructure</li>
                                        <li>Custom API Integrations (Yardi/AppFolio)</li>
                                        <li>Full Audit Trail & Governance</li>
                                        <li>On-Premise Option</li>
                                        <li>White-Glove Onboarding</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <Link to="/contact?topic=enterprise" className="btn ghost full-width">Contact IR</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- ADD-ONS --- */}
                    <section id="structure" className="section">
                        <div className="sectionHead">
                            <h2 className="h2">Domain Engines</h2>
                            <p className="sub">Specialized tools for the real estate lifecycle. Add them as you scale.</p>
                        </div>

                        <div className="grid">
                            {/* MRFPE */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">MRFPE (Feasibility)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$299/report</span>
                                </div>
                                <p className="cardBody">Deep market research, rent comps, and 10-year pro-forma modeling.</p>
                            </div>

                            {/* PECA */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">PECA (Structuring)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$499/entity</span>
                                </div>
                                <p className="cardBody">Automated LLC formation, EIN generation, and operating agreement drafting.</p>
                            </div>

                            {/* PTE */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">PTE (Portfolio)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$2/unit/mo</span>
                                </div>
                                <p className="cardBody">Real-time performance tracking, maintenance dispatch, and tenant comms.</p>
                            </div>
                        </div>
                    </section>

                    {/* --- FAQ --- */}
                    <section id="faq" className="section faq-section">
                        <h2 className="h2">FAQ</h2>
                        <div className="faq-list">
                            {[
                                { q: "Do you replace my Property Manager?", a: "No. SouthLawn is the asset management layer that sits above your PM software (like AppFolio or Buildium) to aggregate data across multiple managers." },
                                { q: "Can I use PECA in all 50 states?", a: "Yes, PECA handles formation filings in all 50 US states, including registered agent services." },
                                { q: "Is my data co-mingled?", a: "Never. Every portfolio is logically isolated. Institutional plans offer physical isolation via dedicated VPCs." },
                                { q: "What is the implementation timeline?", a: "For Portfolio Starter, you can be live in 10 minutes. Syndicator plans typically take 2-3 days for data migration." }
                            ].map((item, index) => (
                                <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`} onClick={() => toggleFaq(index)}>
                                    <div className="faq-question">
                                        {item.q}
                                        <span className="faq-toggle-icon">{openFaq === index ? '−' : '+'}</span>
                                    </div>
                                    <div className="faq-answer">
                                        <p>{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- FINAL CTA --- */}
                    <section className="section final-cta center-text">
                        <div className="callout">
                            <h2 className="h2">Stewardship starts here.</h2>
                            <p className="lead" style={{ margin: '0 auto var(--space-5)' }}>
                                Bring professional grade systems to your portfolio today.
                            </p>
                            <div className="ctaRow" style={{ justifyContent: 'center' }}>
                                <button className="btn">Open Account</button>
                                <Link to="/contact" className="btn ghost">Talk to our Desk</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </div>
    );
}
