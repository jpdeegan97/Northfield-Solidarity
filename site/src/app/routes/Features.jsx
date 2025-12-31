import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { NS_ENGINES, SL_ENGINES, NS_BMP } from '@shared/data/engineRegistry';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { Cpu, Shield, Layers, Zap, Database, Globe, Lock, GitMerge, ChevronDown, ChevronUp } from 'lucide-react';

export default function Features() {

    const [filter, setFilter] = useState('ALL');

    const SYSTEM_FEATURES = [
        {
            icon: Shield,
            title: "Governance-as-Code",
            desc: "Permissions, roles, and approval flows are defined in code (GGP), not database tables. Changes are PR'd, reviewed, and audited before deployment."
        },
        {
            icon: Database,
            title: "Immutable History",
            desc: "Every major state transition is journaled in Chronicle/Ledger. There is no 'update', only 'append'. Full forensic auditability by default."
        },
        {
            icon: Globe,
            title: "Universal Identity",
            desc: "One identity (IDN) travels across all engines. Context follows the user. No siloed accounts or fragmented profiles."
        },
        {
            icon: Lock,
            title: "Fractal Isolation",
            desc: "Risk is compartmentalized. Engines operate with least-privilege access. Compromise in one does not grant total system control."
        },
        {
            icon: Layers,
            title: "Multi-Context Shell",
            desc: "The interface adapts to the user's role and the current 'Reality' (Northfield, South Lawn, WSP) without page reloads."
        },
        {
            icon: GitMerge,
            title: "Resilient Continuity",
            desc: "Business Continuity Protocols (BCP) are first-class citizens. Failover states are tested, not just hypothesized."
        }
    ];

    const BUSINESS_FEATURES = [
        {
            title: "Liability Firewalling",
            desc: "Risk-heavy operations (OpsCo) are legally distinct from asset holders (HoldCo, IPCo). Lawsuits stop at the firewall."
        },
        {
            title: "IP Sovereignty",
            desc: "Intellectual Property is assigned immediately to a non-operating holding entity. It is licensed, not owned, by the risk-taking layers."
        },
        {
            title: "Tax Efficiency",
            desc: "Clear delineation between R&D expenses (Labs), OpEx (OpsCo), and Capital deployment (HoldCo) simplifies tax strategy."
        },
        {
            title: "Equity Flexibility",
            desc: "Employee pools can be targeted to specific diverse units or the top-level HoldCo, aligning incentives with specific outcomes."
        }
    ];

    const AccordionItem = ({ title, desc, icon: Icon, tag, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className={`accordion-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="acc-header">
                    <div className="acc-title-group">
                        {Icon && <Icon size={20} className="acc-icon" />}
                        <h4 className="acc-title">{title}</h4>
                        {tag && <span className="acc-tag">{tag}</span>}
                    </div>
                    {isOpen ? <ChevronUp size={18} className="acc-arrow" /> : <ChevronDown size={18} className="acc-arrow" />}
                </div>
                {isOpen && (
                    <div className="acc-body">
                        <p className="acc-desc">{desc}</p>
                        {children}
                    </div>
                )}
            </div>
        );
    };

    const EngineAccordion = ({ engine }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className={`accordion-item engine-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="acc-header">
                    <div className="acc-title-group">
                        <span className="eng-code">{engine.code}</span>
                        <h4 className="acc-title">{engine.name}</h4>
                        <span className="eng-cat">{engine.category}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="acc-arrow" /> : <ChevronDown size={18} className="acc-arrow" />}
                </div>
                {isOpen && (
                    <div className="acc-body">
                        <p className="acc-desc">{engine.description || engine.oneLiner}</p>
                        {engine.responsibilities && (
                            <div className="eng-list-wrap">
                                <strong className="eng-label">Core Responsibilities</strong>
                                <ul className="eng-list">
                                    {engine.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </div>
                        )}
                        <div className="eng-meta">
                            {engine.inputs && (
                                <div className="meta-col">
                                    <strong>Inputs:</strong> {engine.inputs.join(', ')}
                                </div>
                            )}
                            {engine.outputs && (
                                <div className="meta-col">
                                    <strong>Outputs:</strong> {engine.outputs.join(', ')}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const ProjectAccordion = ({ proj }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className={`accordion-item project-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="acc-header">
                    <div className="acc-title-group">
                        <h4 className="acc-title">{proj.name} <span className="proj-code-mute">({proj.code})</span></h4>
                        <span className={`status-pill ${proj.status === 'Active' ? 'active' : 'draft'}`}>{proj.status}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="acc-arrow" /> : <ChevronDown size={18} className="acc-arrow" />}
                </div>
                {isOpen && (
                    <div className="acc-body">
                        <p className="acc-desc">{proj.description}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="features-page">

                    {/* Header */}
                    <header className="page-header">
                        <h1 className="h1">Master Capability Matrix</h1>
                        <p className="lead">
                            A density-first catalog of the Northfield Solidarity operating estate.<br />
                            Systems, Engines, Projects, and Structural primitives.
                        </p>
                    </header>

                    {/* Navigation / Filter */}
                    <div className="filter-bar">
                        {['ALL', 'SYSTEM', 'ENGINES', 'PROJECTS', 'BUSINESS'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="accordion-stack">
                        {/* 1. SYSTEM FEATURES */}
                        {(filter === 'ALL' || filter === 'SYSTEM') && (
                            <section className="f-section">
                                <h2 className="section-title">
                                    <Cpu size={24} /> System Core Primitives
                                </h2>
                                {SYSTEM_FEATURES.map((f, i) => (
                                    <AccordionItem key={i} {...f} />
                                ))}
                            </section>
                        )}

                        {/* 2. ENGINE REGISTRY */}
                        {(filter === 'ALL' || filter === 'ENGINES') && (
                            <section className="f-section">
                                <h2 className="section-title">
                                    <Zap size={24} /> Engine Registry
                                </h2>

                                <h3 className="subsection-title">Northfield Core (NS)</h3>
                                {NS_ENGINES.map((eng, i) => <EngineAccordion key={i} engine={eng} />)}

                                <h3 className="subsection-title" style={{ marginTop: '3rem' }}>South Lawn (SL)</h3>
                                {SL_ENGINES.map((eng, i) => <EngineAccordion key={i} engine={eng} />)}
                            </section>
                        )}

                        {/* 3. PROJECTS & BMP */}
                        {(filter === 'ALL' || filter === 'PROJECTS') && (
                            <section className="f-section">
                                <h2 className="section-title">
                                    <Layers size={24} /> Projects & Experiments
                                </h2>
                                {NS_PROJECTS.map((p, i) => <ProjectAccordion key={i} proj={p} />)}
                                {NS_BMP.map((p, i) => <ProjectAccordion key={`bmp-${i}`} proj={p} />)}
                            </section>
                        )}

                        {/* 4. BUSINESS STRUCTURE */}
                        {(filter === 'ALL' || filter === 'BUSINESS') && (
                            <section className="f-section">
                                <h2 className="section-title">
                                    <Shield size={24} /> Structural & Legal
                                </h2>
                                {BUSINESS_FEATURES.map((f, i) => (
                                    <AccordionItem key={i} {...f} tag="LLC Structure" />
                                ))}
                            </section>
                        )}
                    </div>

                </div>
            </Layout>

            <style>{`
                .features-page {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .filter-bar {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 4rem;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    background: transparent;
                    border: 1px solid var(--c-border);
                    color: var(--c-text-sub);
                    padding: 0.5rem 1.5rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .filter-btn:hover {
                    border-color: var(--c-brand);
                    color: var(--c-text);
                }
                .filter-btn.active {
                    background: var(--c-brand);
                    color: white;
                    border-color: var(--c-brand);
                }

                .f-section {
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: var(--c-text);
                }
                
                .subsection-title {
                    font-size: 1rem;
                    text-transform: uppercase;
                    color: var(--c-text-sub);
                    margin-bottom: 1rem;
                    letter-spacing: 0.05em;
                    padding-left: 0.5rem;
                    border-left: 2px solid var(--c-brand);
                }

                /* Accordion Styles */
                .accordion-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .accordion-item {
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: 6px;
                    overflow: hidden;
                    transition: all 0.2s ease;
                }
                .accordion-item:hover {
                    border-color: var(--c-border-hover);
                }
                .accordion-item.open {
                    background: var(--c-surface-hover);
                    border-color: var(--c-brand);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                .acc-header {
                    padding: 1rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    background: rgba(255,255,255,0.02);
                }
                .accordion-item.open .acc-header {
                    background: rgba(var(--c-brand-rgb), 0.05);
                    border-bottom: 1px solid var(--c-border);
                }

                .acc-title-group {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex: 1;
                }

                .acc-icon { color: var(--c-brand); }
                .acc-title { font-size: 1rem; font-weight: 600; margin: 0; color: var(--c-text); }
                .acc-desc { font-size: 0.95rem; line-height: 1.6; color: var(--c-text-sub); margin-bottom: 1rem; }
                
                .acc-body {
                    padding: 1.5rem;
                    background: rgba(0,0,0,0.1);
                    animation: slideDown 0.2s ease-out;
                }
                
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .acc-arrow { color: var(--c-text-sub); transition: transform 0.2s; }
                .open .acc-arrow { transform: rotate(180deg); color: var(--c-brand); }

                /* Engine Specifics */
                .eng-code { font-family: monospace; font-weight: 700; color: var(--c-brand); background: rgba(0,0,0,0.3); padding: 2px 6px; borderRadius: 4px; font-size: 0.8rem; }
                .eng-cat { font-size: 0.75rem; text-transform: uppercase; color: var(--c-text-sub); letter-spacing: 0.05em; margin-left: auto; margin-right: 1rem; }
                
                .eng-list-wrap {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(0,0,0,0.2);
                    border-radius: 4px;
                    border-left: 2px solid var(--c-border);
                }
                .eng-label { display: block; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--c-text-sub); }
                .eng-list { padding-left: 1rem; margin: 0; font-size: 0.9rem; color: var(--c-text-sub); }
                .eng-list li { margin-bottom: 4px; }

                .eng-meta {
                    margin-top: 1rem;
                    display: flex;
                    gap: 2rem;
                    font-size: 0.85rem;
                    color: var(--c-text-sub);
                }
                .meta-col { display: flex; flex-direction: column; gap: 0.2rem; }

                /* Project Specifics */
                .proj-code-mute { font-family: monospace; color: var(--c-text-sub); font-weight: 400; font-size: 0.9em; }
                
                .status-pill {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    padding: 4px 10px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.05);
                    color: var(--c-text-sub);
                    margin-left: auto;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                }
                .status-pill.active { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
                .status-pill.draft { background: rgba(234, 179, 8, 0.15); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.2); }

                @media(max-width: 768px) {
                    .acc-title-group { flex-wrap: wrap; gap: 0.5rem; }
                    .eng-cat { display: none; }
                }

            `}</style>
        </div>
    );
}
