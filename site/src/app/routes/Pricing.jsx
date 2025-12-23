import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import Layout from '../../components/Layout.jsx';
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
            <Layout
                nav={[
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn/pricing" },
                    { type: "divider" },
                    { label: "Documentation", to: "/docs" },
                    { label: "Pricing", to: "/pricing" },
                    { label: "System", to: "/system" },
                    { label: "Investor Relations", to: "/investors" },
                ]}
            >
                <div className="pricing-page">
                    {/* --- HERO --- */}
                    <section className="pricing-hero">
                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
                            <div className="pricing-hero-content">
                                <h1 className="h1">Choose your operating layer.</h1>
                                <p className="lead">
                                    Plans built around governance-first operations. Add engines when you’re ready.
                                </p>
                                <div className="ctaRow">
                                    <button onClick={() => {
                                        document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
                                    }} className="btn">Start building</button>
                                    <a href="#addons" className="btn ghost">View add-ons</a>
                                </div>
                                <ul className="hero-highlights">
                                    <li>Governed workflows and auditability</li>
                                    <li>Engine add-ons (DRE, Firmament, CWP)</li>
                                    <li>Upgrade without re-platforming</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* --- PLANS --- */}
                    <section id="plans" className="section">
                        <div className="sectionHead center-text">
                            <h2 className="h2">Plans</h2>
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
                            {/* STARTER */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Starter</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '1520' : '149'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">Solo operator / prototype</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>1 workspace</li>
                                        <li>Core registry + dashboards</li>
                                        <li>Basic entity graph</li>
                                        <li>5 integrations</li>
                                        <li>25GB storage</li>
                                        <li>Email support</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('starter', 'Starter Plan', 149, 1520)}
                                        className="btn ghost full-width"
                                    >
                                        Start building
                                    </button>
                                </div>
                            </div>

                            {/* BUILDER */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Builder</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '5090' : '499'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">Early team / real ops</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Up to 5 seats</li>
                                        <li>Governance workflows (approvals/audit)</li>
                                        <li>20 integrations</li>
                                        <li>250GB storage</li>
                                        <li>Alerts + scheduled jobs</li>
                                        <li>Standard support</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('builder', 'Builder Plan', 499, 5090)}
                                        className="btn ghost full-width"
                                    >
                                        Run operations
                                    </button>
                                </div>
                            </div>

                            {/* OPERATOR (Recommended) */}
                            <div className="pricing-card recommended">
                                <div className="recommended-badge">Recommended</div>
                                <div className="card-header">
                                    <h3 className="cardTitle">Operator</h3>
                                    <div className="price">
                                        <span className="currency">$</span>
                                        <span className="amount">{isAnnual ? '15290' : '1499'}</span>
                                        <span className="suffix">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="best-for">Serious multi-engine ops</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Up to 15 seats</li>
                                        <li>Advanced policy gates</li>
                                        <li>Environment separation (dev/prod)</li>
                                        <li>SSO-lite</li>
                                        <li>1TB storage</li>
                                        <li>Priority support</li>
                                    </ul>
                                    <div className="bonus-feature">
                                        <strong>Bonus:</strong> Firmament: first 3 live layers included
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        onClick={() => handleSelectPlan('operator', 'Operator Plan', 1499, 15290)}
                                        className="btn full-width"
                                    >
                                        Scale with governance
                                    </button>
                                </div>
                            </div>

                            {/* ENTERPRISE */}
                            <div className="pricing-card">
                                <div className="card-header">
                                    <h3 className="cardTitle">Enterprise</h3>
                                    <div className="price">
                                        <span className="amount">Custom</span>
                                    </div>
                                    <p className="best-for">Regulated / larger org</p>
                                </div>
                                <div className="card-body">
                                    <ul className="feature-list">
                                        <li>Unlimited seats</li>
                                        <li>SSO/SAML</li>
                                        <li>Dedicated VPC / on-prem option</li>
                                        <li>Custom SLAs</li>
                                        <li>Security review</li>
                                        <li>Custom integration work</li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <Link to="/contact?topic=enterprise" className="btn ghost full-width">Talk to us</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- ADD-ONS --- */}
                    <section id="addons" className="section">
                        <div className="sectionHead">
                            <h2 className="h2">Engine add-ons</h2>
                            <p className="sub">Attach to any plan. Price what’s expensive (compute, data, real-time layers) separately.</p>
                        </div>

                        <div className="grid">
                            {/* DRE */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">DRE (Deep Research Engine)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$199/mo base</span>
                                    <span className="usage-price">+ $0.08 per research unit</span>
                                </div>
                                <p className="cardBody">Aligned to LLM/search/scrape workloads.</p>
                            </div>

                            {/* FIRMAMENT */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Firmament (3D Ops Globe)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$299/mo base</span>
                                    <span className="usage-price">+ $25 per live layer/mo</span>
                                </div>
                                <p className="cardBody">Layers include heatmaps, routes, events, entity footprints, and filtered overlays.</p>
                            </div>

                            {/* CWP */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">CWP (Cognitive Work Plane)</h3>
                                <div className="addon-price">
                                    <span className="base-price">$19/seat/mo</span>
                                    <span className="usage-price">(Requires Builder+)</span>
                                </div>
                                <p className="cardBody">Scales with human + agent operators.</p>
                            </div>

                            {/* INTEGRATIONS */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Premium Integrations Pack</h3>
                                <div className="addon-price">
                                    <span className="base-price">$149/mo</span>
                                </div>
                                <p className="cardBody">ERP / Finance / CRM / Logistics connectors.</p>
                            </div>

                            {/* AUDIT VAULT */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Data Retention / Audit Vault</h3>
                                <div className="addon-price">
                                    <span className="usage-price">$99/yr per additional year retained</span>
                                </div>
                                <p className="cardBody">Long-term auditability and historical replay.</p>
                            </div>

                            {/* BYOK */}
                            <div className="card addon-card">
                                <h3 className="cardTitle">Private Model / BYOK</h3>
                                <div className="addon-price">
                                    <span className="base-price">$99 - $499/mo</span>
                                </div>
                                <p className="cardBody">Use your own keys/models; keep governance intact. Provider pass-through costs apply.</p>
                            </div>
                        </div>
                    </section>

                    {/* --- SERVICES --- */}
                    <section id="services" className="section service-section">
                        <h2 className="h3">One-time setup</h2>
                        <div className="service-list">
                            <div className="service-item">
                                <span className="service-name">Onboarding & System Mapping</span>
                                <span className="service-price">$1,500 (Starter/Builder) / $5,000+ (Operator/Ent)</span>
                            </div>
                            <div className="service-item">
                                <span className="service-name">Custom Integration Build</span>
                                <span className="service-price">$175/hr</span>
                            </div>
                        </div>
                    </section>

                    {/* --- FAQ --- */}
                    <section id="faq" className="section faq-section">
                        <h2 className="h2">FAQ</h2>
                        <div className="faq-list">
                            {[
                                { q: "What counts as a research unit?", a: "A normalized unit of compute and external data calls used by DRE. You’ll see it itemized in usage reporting." },
                                { q: "Can I start on Starter and upgrade later?", a: "Yes. Plans are designed so you can upgrade without migrating data or changing your workflows." },
                                { q: "Do add-ons require a specific plan?", a: "CWP seats require Builder+. Most other add-ons can attach to any plan." },
                                { q: "Is annual billing required?", a: "No. Annual is optional and includes a ~15% discount." },
                                { q: "Do you support on-prem or private cloud?", a: "Yes, on Enterprise with a dedicated VPC/on-prem option and custom SLAs." }
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
                            <h2 className="h2">Ready to operationalize?</h2>
                            <p className="lead" style={{ margin: '0 auto var(--space-5)' }}>
                                Pick a plan, add the engines you need, and keep everything governed from day one.
                            </p>
                            <div className="ctaRow" style={{ justifyContent: 'center' }}>
                                <Link to="/signup" className="btn">Start building</Link>
                                <Link to="/contact" className="btn ghost">Talk to us</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </div>
    );
}
