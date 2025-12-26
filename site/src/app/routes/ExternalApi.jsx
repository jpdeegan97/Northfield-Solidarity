import React, { useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { NS_ENGINES, SL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { Globe, Code, Key, Copy, Check, Server, Database, Webhook } from 'lucide-react';

export default function ExternalApi() {
    const [copiedKey, setCopiedKey] = useState(false);

    // Mock API Key
    const apiKey = "ns_sk_live_51M..." + Math.random().toString(36).substring(7);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    const ORGS = [
        { id: 'NS', name: 'Northfield Solidarity', url: 'https://api.northfield.ai/v1/ns', color: '#3b82f6' },
        { id: 'SL', name: 'South Lawn', url: 'https://api.southlawn.ai/v1/sl', color: '#22c55e' },
        { id: 'WSP', name: 'Wall Street Pro', url: 'https://api.wallstreet.pro/v1/wsp', color: '#d97706' },
    ];

    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-12 px-6 font-mono text-slate-300">

                {/* Header */}
                <div className="mb-12 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Globe className="text-blue-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">External API Integration</h1>
                            <p className="text-slate-400">Programmatic access to the Northfield ecosystem.</p>
                        </div>
                    </div>

                    {/* API Key Box */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Key className="text-yellow-500" size={20} />
                            <div>
                                <div className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-1">Your Public Key</div>
                                <code className="text-green-400 bg-black/50 px-3 py-1 rounded border border-green-900/50">{apiKey}</code>
                            </div>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-colors"
                        >
                            {copiedKey ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                            {copiedKey ? 'Copied' : 'Copy Key'}
                        </button>
                    </div>
                </div>

                {/* Organizations */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Server size={20} className="text-slate-500" /> Organization Gateways
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ORGS.map(org => (
                            <div key={org.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
                                <h3 className="text-lg font-bold mb-2" style={{ color: org.color }}>{org.name}</h3>
                                <div className="text-xs text-slate-500 mb-4">Base Endpoint</div>
                                <code className="block bg-black px-3 py-2 rounded text-xs text-slate-400 break-all border border-slate-800">
                                    {org.url}
                                </code>
                                <div className="mt-4 flex items-center gap-2 text-xs">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-green-500">Operational</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Engines API */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Database size={20} className="text-slate-500" /> Engine Subgraphs
                    </h2>
                    <div className="md:masonry-2-col lg:masonry-3-col box-border mx-auto space-y-4">
                        {/* Masonry-like grid using CSS columns if supported, or simple grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...NS_ENGINES, ...SL_ENGINES].map(engine => (
                                <div key={engine.code} className="bg-slate-900/30 border border-slate-800 p-4 rounded hover:bg-slate-900/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white">{engine.name}</h4>
                                        <span className="text-xs text-slate-500 border border-slate-800 px-1 rounded">{engine.code}</span>
                                    </div>
                                    <div className="text-xs text-slate-500 mb-3 line-clamp-2">{engine.oneLiner || engine.description}</div>
                                    <div className="bg-black/40 rounded p-2 text-[10px] text-slate-400 font-mono">
                                        GET /engines/{engine.code.toLowerCase()}/state
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Project Webhooks */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Webhook size={20} className="text-slate-500" /> Project Webhooks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {NS_PROJECTS.map(proj => (
                            <div key={proj.code} className="bg-slate-900/30 border border-slate-800 p-4 rounded flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-white text-sm">{proj.name}</h4>
                                    <div className="text-xs text-slate-500 mt-1">Status: {proj.status}</div>
                                </div>
                                <div className="text-right">
                                    <code className="bg-black/40 rounded px-2 py-1 text-[10px] text-purple-400 border border-purple-900/30">
                                        POST /hooks/{proj.code.toLowerCase()}
                                    </code>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Docs Link */}
                <div className="text-center py-8 border-t border-slate-800">
                    <p className="text-sm text-slate-500">
                        Need full schema references? <a href="/docs" className="text-blue-400 hover:underline">Read the Documentation</a>.
                    </p>
                </div>

            </div>
        </Layout>
    );
}
