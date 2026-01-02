import React, { useState } from 'react';

export default function EngineOverlay({ engine }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!engine) return null;

    return (
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-8 max-w-2xl mx-auto shadow-2xl">
            <div className="mb-6 pb-6 border-b border-white/10">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">{engine.category || 'System'}</span>
                <h1 className="text-4xl font-black text-white mb-2">{engine.code}</h1>
                <h2 className="text-xl text-white/70 font-light">{engine.name}</h2>
            </div>

            <div className="flex border-b border-white/10 mb-6">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-brand text-white' : 'border-transparent text-white/40 hover:text-white'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('api')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'api' ? 'border-brand text-white' : 'border-transparent text-white/40 hover:text-white'}`}
                >
                    External API
                </button>
            </div>

            {activeTab === 'overview' ? (
                <div className="flex flex-col gap-6">
                    <p className="text-lg text-white/90 leading-relaxed font-light">{engine.oneLiner || engine.description}</p>

                    {engine.responsibilities && (
                        <div className="bg-white/5 rounded p-4">
                            <h4 className="text-xs font-bold text-brand uppercase mb-3 tracking-wider">Core Operations</h4>
                            <ul className="space-y-2">
                                {engine.responsibilities.slice(0, 3).map((r, i) => (
                                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                        <span className="text-brand mt-1">•</span>
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex gap-8 mt-2">
                        <div className="flex-1">
                            <h3 className="text-xs font-bold text-white/40 uppercase mb-1">Status</h3>
                            <p className={`text-lg font-mono font-medium ${engine.status?.includes('Active') ? 'text-brand' : 'text-yellow-400'}`}>
                                {engine.status || 'Operational'}
                            </p>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xs font-bold text-white/40 uppercase mb-1">Version</h3>
                            <p className="text-lg font-mono text-white/80">v0.{engine.code.length}.0</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-[#111] border border-white/10 rounded p-4 font-mono text-sm max-h-96 overflow-y-auto custom-scrollbar">
                        <div className="text-green-400 mb-2">// {engine.code} API Integration Contracts</div>
                        <div className="text-white/40 mb-4">Base URL: https://api.northfieldsolidarity.ai/v1/{engine.code.toLowerCase()}</div>

                        {engine.inputs && engine.inputs.length > 0 && (
                            <div className="mb-6">
                                <span className="text-blue-400 font-bold block mb-2">INPUTS (POST /ingest)</span>
                                {engine.inputs.map((inp, i) => (
                                    <div key={i} className="pl-4 border-l border-white/10 mb-1 text-white/70">
                                        "{inp}"
                                    </div>
                                ))}
                            </div>
                        )}

                        {engine.outputs && engine.outputs.length > 0 && (
                            <div className="mb-6">
                                <span className="text-purple-400 font-bold block mb-2">OUTPUTS (GET /stream)</span>
                                {engine.outputs.map((out, i) => (
                                    <div key={i} className="pl-4 border-l border-white/10 mb-1 text-white/70">
                                        "{out}"
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="text-yellow-400 font-bold">EXAMPLE CURL:</span>
                            <div className="mt-2 text-white/60 bg-black/50 p-2 rounded">
                                curl -X POST https://api.northfield.ai/{engine.code.toLowerCase()}/event \<br />
                                &nbsp;&nbsp;-H "Authorization: Bearer $NS_TOKEN" \<br />
                                &nbsp;&nbsp;-d '&#123;"type": "{engine.inputs?.[0] || 'TEST_EVENT'}", "payload": &#123;...&#125;&#125;'
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
