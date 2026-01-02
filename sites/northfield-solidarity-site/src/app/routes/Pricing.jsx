import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import Layout from '../../components/Layout.jsx';
import PricingModelsViewer from '../../components/PricingModelsViewer.jsx';
import '../../styles/pricing.css';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const isAnnual = billingCycle === 'annual';

    const handleSelectPlan = (planId, planName, monthlyPrice, annualPrice) => {
        const price = isAnnual ? annualPrice : monthlyPrice;
        addToCart({
            id: planId,
            name: planName,
            price: Number(price),
            type: 'plan',
            period: isAnnual ? 'year' : 'month',
            billingCycle
        });
        navigate('/checkout');
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="pricing-page">
                    {/* --- HERO --- */}
                    <section className="pricing-hero">
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
                            <div className="pricing-hero-content">
                                <h1 className="h1">The Solidarity Operating Stack.</h1>
                                <p className="lead">
                                    You are not buying software. You are buying into a new way of operating. <br />
                                    <span style={{ opacity: 0.8 }}>Come on the ride.</span>
                                </p>
                                <div className="ctaRow">
                                    <button onClick={() => {
                                        document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
                                    }} className="btn">Join the Movement</button>
                                    <a href="#addons" className="btn ghost">Explore Add-ons</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- MEMBERSHIP PLANS --- */}
                    <section id="plans" className="section">
                        <div className="sectionHead center-text">
                            <h2 className="h2">Membership Tiers</h2>
                            <p className="sub">The foundation of your digital estate.</p>
                            <div className="billing-toggle-wrapper">
                                <span className={!isAnnual ? 'active' : ''}>Monthly</span>
                                <button
                                    className={`billing-toggle ${isAnnual ? 'toggled' : ''}`}
                                    onClick={() => setBillingCycle(isAnnual ? 'monthly' : 'annual')}
                                    aria-label="Toggle billing cycle"
                                >
                                    <div className="toggle-handle"></div>
                                </button>
                                <span className={isAnnual ? 'active' : ''}>Annual (save ~15%)</span>
                            </div>
                        </div>

                        <div className="pricing-grid">
                            {/* TIER 1: OPERATOR */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Operator</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '8995' : '895'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">Join the ride. Independent velocity.</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li><strong>Core Canvas & Product Dock</strong></li>
                                        <li>1 Active Workspace</li>
                                        <li><strong>Self-Healing Governance</strong> (Auto-repair logic)</li>
                                        <li>Basic Incubator & Chronicle engines</li>
                                        <li>Standard Support</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('operator', 'Operator Membership', 895, 8995)}
                                        className="btn ghost full-width"
                                    >
                                        Initialize
                                    </button>
                                </div>
                            </div>

                            {/* TIER 2: ARCHITECT */}
                            <div className="pricing-card recommended">
                                <div className="recommended-badge">Recommended</div>
                                <div className="card-header">
                                    <h3 className="cardTitle">Architect</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '29995' : '2995'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">For those building the future.</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Everything in Operator, plus:</li>
                                        <li>Up to 5 Seats</li>
                                        <li><strong>Digital Twin Mirror</strong> (Real-time syncing)</li>
                                        <li><strong>Knowledge Graph Serendipity</strong> (Network intel)</li>
                                        <li>Deep Research Engine (DRE) Basic Access</li>
                                        <li>Priority Support</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('architect', 'Architect Membership', 2995, 29995)}
                                        className="btn full-width"
                                    >
                                        Architect
                                    </button>
                                </div>
                            </div>

                            {/* TIER 3: SOVEREIGN */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Sovereign</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '125000' : '12500'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">The Inner Circle. Direct alignment.</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Everything in Architect, plus:</li>
                                        <li>Up to 15 Seats</li>
                                        <li><strong>Immutable Decision Chains</strong> (Full Audit)</li>
                                        <li><strong>Continuity Bond</strong> (Resilience Guarantee)</li>
                                        <li>Environment Separation (Dev/Prod)</li>
                                        <li>Dedicated Account Manager</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('sovereign', 'Sovereign Membership', 12500, 125000)}
                                        className="btn ghost full-width"
                                    >
                                        Establish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- ADD-ONS --- */}
                    <section id="addons" className="section">
                        <div className="sectionHead">
                            <h2 className="h2">Strategic Expansions</h2>
                            <p className="sub">High-leverage modules to extend your capability.</p>
                        </div>

                        <div className="grid">
                            {/* Fractal Instance Forking */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Fractal Instance Forking</h3>
                                <div className="addon-price">
                                    <span className="base-price">Usage Based</span>
                                </div>
                                <p className="cardBody">
                                    Instantly spawn child instances for new projects or franchises. Inherit governance, isolate state.
                                </p>
                            </div>

                            {/* Predictive Ghost Runs */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Predictive Ghost Runs</h3>
                                <div className="addon-price">
                                    <span className="base-price">$995/mo</span>
                                </div>
                                <p className="cardBody">
                                    Simulate decisions against market data before committing capital. Risk immunity.
                                </p>
                            </div>

                            {/* Synthetic Persona Testing */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Synthetic Persona Testing</h3>
                                <div className="addon-price">
                                    <span className="base-price">$495/mo</span>
                                </div>
                                <p className="cardBody">
                                    Wargame your product against AI stakeholders (Regulator, Customer, Competitor).
                                </p>
                            </div>

                            {/* Resource Arbitrage Pilot */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Resource Arbitrage Pilot</h3>
                                <div className="addon-price">
                                    <span className="base-price">% of Capture</span>
                                </div>
                                <p className="cardBody">
                                    Automated optimization of cloud/compute resources. We skim the savings.
                                </p>
                            </div>

                            {/* Automated Living Context */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Automated Living Context</h3>
                                <div className="addon-price">
                                    <span className="base-price">$195/mo</span>
                                </div>
                                <p className="cardBody">
                                    A morning brief that evolves with your project state. Never start cold.
                                </p>
                            </div>

                            {/* Custom Services */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">White Glove Setup</h3>
                                <div className="addon-price">
                                    <span className="base-price">From $15,000</span>
                                </div>
                                <p className="cardBody">
                                    Full system mapping and migration of your existing operational estate.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- PRICING MODELS VIEWER --- */}
                    <section className="section" id="models">
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
                            <PricingModelsViewer />
                        </div>
                    </section>

                    {/* --- FAQ --- */}
                    <section id="faq" className="section faq-section">
                        <h2 className="h2">FAQ</h2>
                        <div className="faq-list">
                            {[
                                { q: "What is the difference between Architect and Sovereign?", a: "Architect is for building structure; Sovereign is for maintaining legacy. Sovereign adds immutable audit trails and continuity guarantees." },
                                { q: "Can I add 'Ghost Runs' to the Operator tier?", a: "Yes. All Strategic Expansions are compatible with any Membership Tier." },
                                { q: "How does Fractal Forking billing work?", a: "You pay a small base fee for each child instance, plus the resource usage of that instance." },
                                { q: "Is 'Self-Healing Governance' active by default?", a: "Yes, on all tiers. It ensures your rules and permissions auto-correct if they drift from the defined standard." }
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
                            <h2 className="h2">Begin your residency.</h2>
                            <p className="lead" style={{ margin: '0 auto var(--space-5)' }}>
                                Secure your operating baseline. Expand efficiently.
                            </p>
                            <div className="ctaRow" style={{ justifyContent: 'center' }}>
                                <Link to="/signup" className="btn">Start Application</Link>
                                <Link to="/contact" className="btn ghost">Contact Syndication</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </div>
    );
}
