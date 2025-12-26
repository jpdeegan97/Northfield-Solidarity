import React, { useState } from 'react';

// Mock Data: Deep Research
const KNOWLEDGE_NODES = [
    { id: 'RES-001', title: 'Ethereum L2 Scaling', category: 'INFRASTRUCTURE', confidence: 0.98, updated: '4h ago', sources: 12 },
    { id: 'RES-005', title: 'Modular Governance Models', category: 'GOVERNANCE', confidence: 0.85, updated: '1d ago', sources: 8 },
    { id: 'RES-012', title: 'Zero-Knowledge Privacy', category: 'CRYPTOGRAPHY', confidence: 0.92, updated: '2d ago', sources: 15 },
    { id: 'RES-044', title: 'AI Agent Swarms', category: 'EMERGING_TECH', confidence: 0.77, updated: '12h ago', sources: 5 },
];

const CITATIONS = [
    { id: 'CIT-01', title: 'Vitalik Blog: Endgame', type: 'BLOG', relevance: 'HIGH' },
    { id: 'CIT-02', title: 'Arxiv: Optimistic Rollups', type: 'PAPER', relevance: 'CRITICAL' },
    { id: 'CIT-03', title: 'Flashbots Docs', type: 'DOCS', relevance: 'MEDIUM' },
];

export default function DREView({ engine }) {
    const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_NODES[0]);

    // Theme: Slate/White/Monochrome for "Deep Truth/Knowledge/Paper"
    // Using a very clean, high-contrast monochrome style to represent "The Archive"
    const THEME = {
        primary: 'text-white',
        bg: 'bg-white',
        border: 'border-white/40',
        hoverBorder: 'hover:border-white',
        glow: 'shadow-[0_0_15px_rgba(255,255,255,0.15)]',
        bgSoft: 'bg-white/10'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Research Index */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-sm bg-white animate-pulse`} />
                            Knowledge Graph
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">INDEXED: 14,202</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {KNOWLEDGE_NODES.map((node) => {
                            const isSelected = selectedNode.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    onClick={() => setSelectedNode(node)}
                                    className={`
                                        p-4 rounded border cursor-pointer transition-all group relative
                                        ${isSelected
                                            ? `bg-white/10 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                                            : `bg-black/20 border-white/10 hover:border-white/30`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold text-white/70 tracking-tight">{node.category}</div>
                                        <span className="text-[9px] font-mono text-white/30">{node.updated}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight mb-2 group-hover:text-white/90">{node.title}</h4>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-white" style={{ width: `${node.confidence * 100}%` }} />
                                            </div>
                                            <span className="text-[9px] font-mono text-white/50">{Math.round(node.confidence * 100)}% CONF</span>
                                        </div>
                                        <span className="text-[9px] text-white/30">{node.sources} SOURCES</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Document Viewer / Reader Mode */}
            <div className="flex-1 flex flex-col items-center justify-start pt-12 px-12 pointer-events-auto h-full overflow-hidden">
                <div className="max-w-2xl w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-8 shadow-2xl overflow-y-auto max-h-[75vh] no-scrollbar">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <span className="text-4xl font-serif text-white/20">“</span>
                        <h2 className="text-2xl font-bold text-white">{selectedNode.title}</h2>
                    </div>

                    <div className="prose prose-invert prose-sm">
                        <p className="text-white/80 leading-relaxed mb-4">
                            The rapid evolution of <strong>{selectedNode.title}</strong> suggests a fundamental shift in how we approach
                            decentralized consensus. Early indicators from {selectedNode.sources} distinct sources point towards a convergence
                            on modularity as the primary scaling vector.
                        </p>
                        <p className="text-white/80 leading-relaxed mb-4">
                            Unlike monolithic architectures, this approach decouples execution from settlement.
                            Security properties are inherited from the base layer, while throughput scales linearly with
                            computational resources.
                        </p>
                        <blockquote className="border-l-2 border-white/50 pl-4 italic text-white/60 my-6">
                            "Scalability is not just about throughput, but about verifiability."
                        </blockquote>
                        <h4 className="text-white font-bold mb-2 mt-6">Key Findings</h4>
                        <ul className="list-disc pl-5 text-white/70 space-y-1">
                            <li>Throughput increase of roughly 100x via rollups.</li>
                            <li>Data availability remains the primary bottleneck.</li>
                            <li>Fraud proofs (optimistic) vs Validity proofs (zk) trade-offs are narrowing.</li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono">
                        <span>ID: {selectedNode.id}</span>
                        <span>HASH: 0x82...1a</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: Context & Sources */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Source Material</h3>
                    <div className="space-y-2">
                        {CITATIONS.map((cit) => (
                            <div key={cit.id} className="p-2 border border-white/5 bg-white/5 rounded hover:bg-white/10 cursor-pointer transition-colors">
                                <div className="text-[9px] text-white/40 uppercase mb-1 flex justify-between">
                                    <span>{cit.type}</span>
                                    <span>{cit.relevance}</span>
                                </div>
                                <div className="text-xs text-white font-serif">{cit.title}</div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 border border-dashed border-white/20 text-white/40 text-xs rounded hover:border-white/40 hover:text-white/60 transition-all">
                        + ADD NEW SOURCE
                    </button>
                </div>
            </div>

        </div>
    );
}
