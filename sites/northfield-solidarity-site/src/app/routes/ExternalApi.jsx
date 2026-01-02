import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { NS_ENGINES, SL_ENGINES } from '@shared/data/engineRegistry';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { Globe, Code, Key, Copy, Check, Server, Database, Webhook } from 'lucide-react';

const INTEGRATION_URLS = {
    "Stripe": "https://stripe.com/docs/api",
    "SendGrid": "https://docs.sendgrid.com/api-reference",
    "Twilio": "https://www.twilio.com/docs/api",
    "Shopify": "https://shopify.dev/docs/api",
    "OpenAI API": "https://platform.openai.com/docs/api-reference",
    "HuggingFace Inference": "https://huggingface.co/docs/api-inference/index",
    "Anthropic Claude": "https://docs.anthropic.com/claude/reference/getting-started-with-the-api",
    "Ethereum": "https://ethereum.org/en/developers/docs/apis/json-rpc/",
    "Polygon": "https://docs.polygon.technology/",
    "Chainlink": "https://docs.chain.link/",
    "AWS Route53": "https://docs.aws.amazon.com/route53/index.html",
    "PagerDuty": "https://developer.pagerduty.com/docs/rest-api-v2/overview/",
    "Airbyte": "https://docs.airbyte.com/api/",
    "Kafka": "https://kafka.apache.org/documentation/#api",
    "USPTO API": "https://developer.uspto.gov/",
    "IPFS": "https://docs.ipfs.tech/reference/http/api/",
    "Auth0": "https://auth0.com/docs/api",
    "AWS Cognito": "https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html",
    "Redis Streams": "https://redis.io/docs/data-types/streams/",
    "PostgreSQL": "https://www.postgresql.org/docs/",
    "Prometheus": "https://prometheus.io/docs/prometheus/latest/querying/api/",
    "Grafana": "https://grafana.com/docs/grafana/latest/developers/http_api/",
    "OpenTelemetry": "https://opentelemetry.io/docs/reference/specification/",
    "Jira": "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/",
    "Slack API": "https://api.slack.com/",
    "Notion API": "https://developers.notion.com/",
    "Cloudflare": "https://developers.cloudflare.com/api/",
    "Zillow API": "https://www.zillowgroup.com/developers/api/public-data-api/",
    "CoStar": "https://www.costargroup.com/costar-connect",
    "AppFolio": "https://www.appfolio.com/stack/partners",
    "Yardi": "https://www.yardi.com/products/yardi-api/",
    "Buildium": "https://developer.buildium.com/"
};

const ApiOverlay = ({ data, onClose }) => {
    if (!data) return null;

    const isEngine = data.type === 'engine';
    const isEndpoint = data.type === 'endpoint';

    let title = data.name;
    let subtitle = "";
    let content = "";
    let codeBlock = "";
    let codeLabel = "";

    if (isEngine) {
        title = data.data.name;
        subtitle = `Engine Contract: ${data.data.code}`;
        content = data.data.description;
        codeLabel = "JSON Contract";
        codeBlock = JSON.stringify({
            apiVersion: "1.2.4",
            service: data.data.code,
            endpoints: data.data.endpoints?.length || 0,
            sla: "99.99%",
            rateLimit: "1000 req/min",
            schema: `https://api.northfield.ai/schemas/${data.data.code.toLowerCase()}.json`
        }, null, 2);
    } else if (isEndpoint) {
        title = `${data.data.method} ${data.data.path}`;
        subtitle = `Endpoint by ${data.engineName}`;
        content = data.data.desc;
        codeLabel = "cURL Request";
        // Mock cURL
        codeBlock = `curl -X ${data.data.method} https://api.northfield.ai/v1/${data.engineCode}/${data.data.path.replace(/^\//, '')} \\
  -H "Authorization: Bearer ns_sk_..." \\
  -H "Content-Type: application/json" ${data.data.method === 'POST' ? '\\\n  -d \'{"data": "example"}\'' : ''}`;
    } else {
        // External Integration
        title = data.name;
        subtitle = "External Integration";
        content = `Integration module for ${data.name}. Handles data ingress/egress and authentication management.`;
        codeLabel = "Config";
        codeBlock = JSON.stringify({
            vendor: data.name,
            currency: "USD",
            connectionType: "REST/Webhooks",
            authMethod: "Bearer Token",
            status: "Active",
            code_ref: data.name.substring(0, 3).toUpperCase(),
            lastSync: new Date().toISOString()
        }, null, 2);
    }

    const docLink = !isEngine && !isEndpoint ? (INTEGRATION_URLS[data.name] || `https://www.google.com/search?q=${encodeURIComponent(data.name + ' API Documentation')}`) : null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }} onClick={onClose}>
            <div style={{
                width: '100%', maxWidth: '600px', backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-brand)', borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
                    <div>
                        <div className="eyebrow" style={{ color: 'var(--c-brand)', marginBottom: '4px' }}>
                            {subtitle}
                        </div>
                        <h2 className="h2" style={{ fontSize: '1.5rem', wordBreak: 'break-all' }}>{title}</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--c-text-sub)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                </div>

                {/* Content */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <p style={{ color: 'var(--c-text-sub)', lineHeight: 1.6 }}>
                        {content}
                    </p>
                </div>

                {/* Technical Specs / Contract */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="eyebrow" style={{ fontSize: '0.75rem' }}>{codeLabel}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--c-accent)', fontFamily: 'var(--font-mono)' }}>{isEndpoint ? 'BASH' : 'JSON'}</span>
                    </div>
                    <pre style={{
                        background: 'var(--c-bg)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--c-border)', overflowX: 'auto', fontSize: '0.8rem', color: 'var(--c-text)'
                    }}>
                        <code>{codeBlock}</code>
                    </pre>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--c-border)' }}>
                    {isEngine || isEndpoint ? (
                        <button className="btn" style={{ flex: 1 }}>{isEndpoint ? 'Run in Console' : 'Request Access'}</button>
                    ) : (
                        <a href={docLink} target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                            View Vendor Docs
                        </a>
                    )}
                    <button onClick={onClose} style={{ padding: '0 24px', background: 'transparent', border: '1px solid var(--c-border)', borderRadius: '4px', color: 'var(--c-text)' }}>
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

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

    const [overlayData, setOverlayData] = useState(null);

    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1200px', width: '100%', alignItems: 'stretch' }}>

                    {/* Header */}
                    <div style={{ marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-6)' }}>
                        {/* ... (Keep existing Header content unchanged) ... */}
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
                            {/* ... (Keep existing API Key Box content) ... */}
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
                        {/* ... (Keep existing Organizations content) ... */}
                        <h2 className="h3" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--c-border)', paddingBottom: 'var(--space-2)' }}>
                            <Server size={20} style={{ color: 'var(--c-text-sub)' }} /> Organization Gateways
                        </h2>
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            {ORGS.map(org => (
                                <div key={org.id} className="card" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                                    <h3 className="cardTitle" style={{ color: org.color, fontSize: '1.1rem' }}>{org.name}</h3>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', fontWeight: 600 }}>Base Endpoint</div>
                                    <code style={{ display: 'block', background: 'var(--c-surface)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--c-text)', wordBreak: 'break-all', border: '1px solid var(--c-border)', fontFamily: 'var(--font-mono)', width: '100%' }}>
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
                                <div
                                    key={engine.code}
                                    className="card"
                                    style={{ alignItems: 'flex-start', textAlign: 'left', padding: 'var(--space-4)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                    onClick={() => setOverlayData({ type: 'engine', data: engine })}
                                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ marginBottom: 'var(--space-3)', overflow: 'hidden', width: '100%' }}>
                                        <h4 style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`${engine.code} - ${engine.name}`}>
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
                                                    <span
                                                        key={i}
                                                        onClick={(e) => { e.stopPropagation(); setOverlayData({ type: 'integration', name: ext }); }}
                                                        style={{
                                                            fontSize: '0.7rem',
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            background: 'var(--c-surface)',
                                                            color: 'var(--c-text-sub)',
                                                            border: '1px solid var(--c-border)',
                                                            whiteSpace: 'nowrap',
                                                            cursor: 'pointer'
                                                        }}
                                                        onMouseOver={(e) => e.target.style.borderColor = 'var(--c-brand)'}
                                                        onMouseOut={(e) => e.target.style.borderColor = 'var(--c-border)'}
                                                    >
                                                        {ext}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Endpoints */}
                                    {engine.endpoints && (
                                        <div style={{ width: '100%' }}>
                                            <div className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>Available Endpoints</div>
                                            <div style={{ background: 'var(--c-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)', maxHeight: '180px', overflowY: 'auto' }}>
                                                {engine.endpoints.map((ep, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOverlayData({ type: 'endpoint', data: ep, engineName: engine.name, engineCode: engine.code });
                                                        }}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            gap: '8px',
                                                            padding: '6px 8px',
                                                            borderBottom: i === engine.endpoints.length - 1 ? 'none' : '1px solid var(--c-border)',
                                                            fontSize: '0.7rem',
                                                            fontFamily: 'var(--font-mono)',
                                                            cursor: 'pointer',
                                                            transition: 'background 0.2s'
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--c-bg)'}
                                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        <span style={{ color: ep.method === 'GET' ? '#3b82f6' : ep.method === 'POST' ? '#22c55e' : '#f59e0b', fontWeight: 700, minWidth: '32px' }}>{ep.method}</span>
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

                    {/* ... (Keep Project Webhooks and Footer) ... */}
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
                                        <code style={{ background: 'var(--c-surface)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.7rem', color: 'var(--c-accent)', border: '1px solid var(--c-border)', fontFamily: 'var(--font-mono)' }}>
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
            <ApiOverlay data={overlayData} onClose={() => setOverlayData(null)} />
        </div>
    );
}
