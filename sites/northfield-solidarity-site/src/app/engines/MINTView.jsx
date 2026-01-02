import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MINTView({ isWindow = false }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("search"); // search | graph | telemetry
    const [selectedArtifact, setSelectedArtifact] = useState(null);

    // Mock Data
    const MOCK_ARTIFACTS = [
        {
            id: "art-001",
            title: "NS-GGP-000 Charter",
            type: "DOCUMENT",
            tags: ["governance", "protocol"],
            confidence: 0.99,
            provenance: "git:main@a1b2c3d",
            timestamp: "2025-12-30T10:00:00Z"
        },
        {
            id: "art-002",
            title: "Q4 Financial Snapshot",
            type: "DATASET",
            tags: ["finance", "flo"],
            confidence: 1.0,
            provenance: "flo:ledger#9921",
            timestamp: "2025-12-29T14:30:00Z"
        },
        {
            id: "art-003",
            title: "Market Signal: Crypto Volatility",
            type: "SIGNAL",
            tags: ["market", "risk", "sig"],
            confidence: 0.75,
            provenance: "sig:stream#vol_btc",
            timestamp: "2025-12-31T08:15:00Z"
        },
        {
            id: "art-004",
            title: "Entity Graph Dump",
            type: "GRAPH",
            tags: ["idn", "topology"],
            confidence: 0.88,
            provenance: "idn:export#daily",
            timestamp: "2025-12-31T09:00:00Z"
        }
    ];

    const filteredArtifacts = MOCK_ARTIFACTS.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className={`flex flex-col h-full bg-[#0f172a] text-white overflow-hidden ${isWindow ? 'p-0' : 'p-6'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between border-b border-white/10 ${isWindow ? 'p-3' : 'pb-4 mb-6'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-bold">
                        M
                    </div>
                    <div>
                        <h1 className={`${isWindow ? 'text-sm' : 'text-xl'} font-bold tracking-tight text-white/90`}>
                            MINT <span className="text-white/30 font-normal">| Knowledge Fabric</span>
                        </h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                    {['search', 'graph', 'telemetry'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                text-[10px] uppercase font-bold px-3 py-1 rounded transition-colors
                                ${activeTab === tab ? 'bg-emerald-500 text-black' : 'text-white/50 hover:text-white hover:bg-white/10'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Search & List */}
                <div className={`${isWindow ? 'w-1/3' : 'w-1/3'} min-w-[250px] border-r border-white/10 flex flex-col bg-black/20`}>
                    <div className="p-3 border-b border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search artifacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
                            />
                            <div className="absolute right-2 top-2 text-white/20 text-xs">⌘K</div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {filteredArtifacts.map(artifact => (
                            <motion.div
                                layoutId={artifact.id}
                                key={artifact.id}
                                onClick={() => setSelectedArtifact(artifact)}
                                className={`
                                    p-3 rounded cursor-pointer transition-all border
                                    ${selectedArtifact?.id === artifact.id
                                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-bold px-1.5 rounded ${artifact.type === 'DOCUMENT' ? 'bg-blue-500/20 text-blue-400' :
                                            artifact.type === 'SIGNAL' ? 'bg-red-500/20 text-red-400' :
                                                'bg-purple-500/20 text-purple-400'
                                        }`}>
                                        {artifact.type}
                                    </span>
                                    <span className="text-[9px] text-white/30 font-mono">{new Date(artifact.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div className="font-medium text-xs text-white/90 mb-1">{artifact.title}</div>
                                <div className="flex flex-wrap gap-1">
                                    {artifact.tags.map(t => (
                                        <span key={t} className="text-[9px] text-white/40">#{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Detail / Graph */}
                <div className="flex-1 bg-[#0f172a] relative flex flex-col p-4 overflow-y-auto">
                    {activeTab === 'search' && (
                        <>
                            {selectedArtifact ? (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 mb-4">
                                        <h2 className="text-xl font-bold text-white">{selectedArtifact.title}</h2>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                            Confidence: {(selectedArtifact.confidence * 100).toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-3 bg-white/5 rounded border border-white/10">
                                            <div className="text-[10px] uppercase text-white/40 font-bold mb-1">Provenance</div>
                                            <div className="text-xs font-mono text-white/80">{selectedArtifact.provenance}</div>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded border border-white/10">
                                            <div className="text-[10px] uppercase text-white/40 font-bold mb-1">Unique ID</div>
                                            <div className="text-xs font-mono text-white/80">{selectedArtifact.id}</div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-black/20 rounded border border-white/10 min-h-[200px]">
                                        <div className="text-[10px] uppercase text-white/40 font-bold mb-2">Content Preview</div>
                                        <div className="text-sm text-white/60 leading-relaxed">
                                            [MINT Indexer extracted content preview for <strong>{selectedArtifact.title}</strong>]
                                            <br /><br />
                                            Metadata indicates high relevance for query context.
                                            Linked entities found:
                                            <ul className="list-disc pl-4 mt-2 space-y-1">
                                                {selectedArtifact.tags.map(t => (
                                                    <li key={t}>ns.entity.{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10">View Raw</button>
                                        <button className="px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-xs text-emerald-400 border border-emerald-500/30">Trace Lineage</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-white/20">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <div className="text-sm uppercase tracking-widest">Select an artifact to inspect</div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'graph' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-50">
                            {/* Placeholder for Graph Visualization */}
                            <div className="relative w-full h-full">
                                <svg className="w-full h-full stroke-emerald-500/30">
                                    <circle cx="50%" cy="50%" r="40" fill="rgba(16,185,129,0.1)" stroke="currentColor" />
                                    <circle cx="30%" cy="30%" r="20" fill="rgba(255,255,255,0.05)" stroke="white" strokeOpacity="0.2" />
                                    <circle cx="70%" cy="60%" r="30" fill="rgba(255,255,255,0.05)" stroke="white" strokeOpacity="0.2" />
                                    <line x1="50%" y1="50%" x2="30%" y2="30%" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="70%" y2="60%" strokeWidth="1" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-emerald-500/50 font-mono text-xs uppercase tracking-widest">
                                    Knowledge Graph View
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'telemetry' && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase text-white/50">System Ingestion Rates</h3>
                            <div className="h-32 flex items-end gap-1 pb-4 border-b border-white/5">
                                {[30, 45, 60, 40, 75, 55, 80, 70, 90, 65, 50, 60].map((h, i) => (
                                    <div key={i} className="flex-1 bg-emerald-500/40 hover:bg-emerald-500 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded">
                                    <div className="text-2xl font-bold text-white">4,291</div>
                                    <div className="text-[10px] text-white/40 uppercase">Total Artifacts</div>
                                </div>
                                <div className="p-3 bg-white/5 rounded">
                                    <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                                    <div className="text-[10px] text-white/40 uppercase">Index Health</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className={`border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/30 ${isWindow ? 'px-2 py-1' : 'pt-2 mt-2'}`}>
                <div>INDEX: ONLINE</div>
                <div>INGESTION: ACTIVE</div>
                <div>V: 0.1.0-alpha</div>
            </div>
        </div>
    );
}
