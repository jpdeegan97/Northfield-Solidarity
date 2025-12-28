import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { NS_ENGINES, SL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { Globe, Code, Key, Copy, Check, Server, Database, Webhook } from 'lucide-react';

export default function ExternalApi() {
    const [copiedKey, setCopiedKey] = useState(false);

    // Mock API Key - Generate once on mount aka State initialization
    const [apiKey] = useState(() => "ns_sk_live_51M..." + Math.random().toString(36).substring(7));

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    const ORGS = [
        { id: 'NS', name: 'Northfield Solidarity', url: 'https://api.northfield.ai/v1/ns', color: 'var(--c-brand)' },
        { id: 'SL', name: 'South Lawn', url: 'https://api.southlawn.ai/v1/sl', color: 'var(--c-accent)' },
        { id: 'WSP', name: 'Wall Street Pro', url: 'https://api.wallstreet.pro/v1/wsp', color: '#d97706' },
    ];

    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1200px', width: '100%', alignItems: 'stretch' }}>

                    {/* Header */}
                    <div style={{ marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-6)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                            <div style={{ padding: 'var(--space-3)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                                <Globe size={32} style={{ color: 'var(--c-brand)' }} />
                            </div>
                            <div>
                                <h1 className="h1" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>External API Integration</h1>
                                <p className="lead" style={{ margin: 0, fontSize: '1rem' }}>Programmatic access to the Northfield ecosystem.</p>
                            </div>
                        </div>

                        {/* API Key Box */}
                        <div className="card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', textAlign: 'left', background: 'var(--c-bg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <Key size={20} style={{ color: 'var(--c-accent)' }} />
                                <div>
                                    <div className="eyebrow" style={{ marginBottom: '4px', fontSize: '0.7rem' }}>Your Public Key</div>
                                    <code style={{
                                        color: 'var(--c-brand)',
                                        background: 'var(--c-surface)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        border: '1px solid var(--c-border)',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {apiKey}
                                    </code>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="btn sm"
                                style={{ gap: '8px' }}
                            >
                                {copiedKey ? <Check size={16} /> : <Copy size={16} />}
                                {copiedKey ? 'Copied' : 'Copy Key'}
                            </button>
                        </div>
                    </div>

                    {/* Organizations */}
                    <section style={{ marginBottom: 'var(--space-8)' }}>
                        <h2 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-2)' }}>
                            <Server size={20} style={{ color: 'var(--c-text-sub)' }} /> Organization Gateways
                        </h2>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            {ORGS.map(org => (
                                <div key={org.id} className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                                    <h3 className="cardTitle" style={{ color: org.color, fontSize: '1.1rem' }}>{org.name}</h3>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', fontWeight: 600 }}>Base Endpoint</div>
                                    <code style={{
                                        display: 'block',
                                        background: 'var(--c-surface)',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        color: 'var(--c-text)',
                                        wordBreak: 'break-all',
                                        border: '1px solid var(--c-border)',
                                        fontFamily: 'var(--font-mono)',
                                        width: '100%'
                                    }}>
                                        {org.url}
                                    </code>
                                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></span>
                                        <span style={{ color: '#22c55e', fontWeight: 600 }}>Operational</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Engines API */}
                    <section style={{ marginBottom: 'var(--space-8)' }}>
                        <h2 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-2)' }}>
                            <Database size={20} style={{ color: 'var(--c-text-sub)' }} /> Engine Subgraphs
                        </h2>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                            {[...NS_ENGINES, ...SL_ENGINES].map(engine => (
                                <div key={engine.code} className="card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: 'var(--space-4)' }}>
                                    <div style={{ marginBottom: 'var(--space-3)', overflow: 'hidden', width: '100%' }}>
                                        <h4 style={{
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }} title={`${engine.code} - ${engine.name}`}>
                                            <span style={{ color: 'var(--c-brand)', marginRight: '8px' }}>{engine.code}</span>
                                            <span style={{ opacity: 0.9 }}>{engine.name}</span>
                                        </h4>
                                    </div>
                                    <div className="cardBody" style={{ fontSize: '0.8rem', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em' }}>
                                        {engine.oneLiner || engine.description}
                                    </div>

                                    {/* Integrations */}
                                    {engine.externalIntegrations && engine.externalIntegrations.length > 0 && (
                                        <div style={{ marginBottom: 'var(--space-4)', width: '100%' }}>
                                            <div className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>External Integrations</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {engine.externalIntegrations.map((ext, i) => (
                                                    <span key={i} style={{
                                                        fontSize: '0.7rem',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        background: 'var(--c-surface)',
                                                        color: 'var(--c-text-sub)',
                                                        border: '1px solid var(--c-border)',
                                                        whiteSpace: 'nowrap'
                                                    }}>{ext}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Endpoints */}
                                    {engine.endpoints && (
                                        <div style={{ width: '100%' }}>
                                            <div className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>Available Endpoints</div>
                                            <div style={{
                                                background: 'var(--c-surface)',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--c-border)',
                                                maxHeight: '180px',
                                                overflowY: 'auto'
                                            }}>
                                                {engine.endpoints.map((ep, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                        gap: '8px',
                                                        padding: '6px 8px',
                                                        borderBottom: i === engine.endpoints.length - 1 ? 'none' : '1px solid var(--c-border)',
                                                        fontSize: '0.7rem',
                                                        fontFamily: 'var(--font-mono)'
                                                    }}>
                                                        <span style={{
                                                            color: ep.method === 'GET' ? '#3b82f6' : ep.method === 'POST' ? '#22c55e' : '#f59e0b',
                                                            fontWeight: 700,
                                                            minWidth: '32px'
                                                        }}>{ep.method}</span>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ color: 'var(--c-text)' }}>{ep.path}</span>
                                                            <span style={{ fontSize: '0.65rem', color: 'var(--c-text-sub)', fontStyle: 'italic' }}>{ep.desc}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Project Webhooks */}
                    <section style={{ marginBottom: 'var(--space-8)' }}>
                        <h2 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-2)' }}>
                            <Webhook size={20} style={{ color: 'var(--c-text-sub)' }} /> Project Webhooks
                        </h2>
                        <div className="grid">
                            {NS_PROJECTS.map(proj => (
                                <div key={proj.code} className="card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', textAlign: 'left' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{proj.name}</h4>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)', marginTop: '4px' }}>Status: {proj.status}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <code style={{
                                            background: 'var(--c-surface)',
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            fontSize: '0.7rem',
                                            color: 'var(--c-accent)',
                                            border: '1px solid var(--c-border)',
                                            fontFamily: 'var(--font-mono)'
                                        }}>
                                            POST /hooks/{proj.code.toLowerCase()}
                                        </code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer Docs Link */}
                    <div style={{ textAlign: 'center', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--c-border)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>
                            Need full schema references? <a href="/docs" style={{ color: 'var(--c-brand)', textDecoration: 'underline' }}>Read the Documentation</a>.
                        </p>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
