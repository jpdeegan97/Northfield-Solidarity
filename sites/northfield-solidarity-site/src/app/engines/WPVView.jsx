import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function WPVView({ isWindow = false }) {
    const [activePaper, setActivePaper] = useState(null);
    const [processing, setProcessing] = useState(false);

    const MOCK_PAPERS = [
        { id: 1, title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017 },
        { id: 2, title: "Proximal Policy Optimization Algorithms", authors: "Schulman et al.", year: 2017 },
        { id: 3, title: "Deep Residual Learning for Image Recognition", authors: "He et al.", year: 2015 }
    ];

    const handleLoadPaper = (paper) => {
        setProcessing(true);
        setActivePaper(null);
        setTimeout(() => {
            setProcessing(false);
            setActivePaper(paper);
        }, 1500);
    };

    return (
        <div className={`flex flex-col h-full bg-[#0a0a0a] text-white overflow-hidden ${isWindow ? 'p-2' : 'p-6'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white/90">
                        <span className="text-brand mr-2">WPV</span>
                        White Paper Visualizer
                    </h1>
                    <p className="text-xs text-white/40 mt-1 font-mono uppercase tracking-widest">
                        Structure Extraction & Interactive Explanation
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors">
                        IMPORT PDF
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium bg-brand/20 text-brand hover:bg-brand hover:text-black border border-brand/20 rounded transition-colors">
                        NEW SESSION
                    </button>
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Left Sidebar: Paper Selection */}
                <div className="w-1/4 min-w-[250px] bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col">
                    <div className="p-3 bg-white/5 border-b border-white/10">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">Library</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {MOCK_PAPERS.map(paper => (
                            <div
                                key={paper.id}
                                onClick={() => handleLoadPaper(paper)}
                                className={`
                                    p-3 rounded cursor-pointer transition-all border
                                    ${activePaper?.id === paper.id
                                        ? 'bg-brand/10 border-brand/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                                        : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'}
                                `}
                            >
                                <div className="font-medium text-sm text-white/90">{paper.title}</div>
                                <div className="text-xs text-white/40 mt-1">{paper.authors} ({paper.year})</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-black/40 border border-white/10 rounded-lg overflow-hidden relative flex flex-col items-center justify-center">
                    {!activePaper && !processing && (
                        <div className="text-center text-white/20">
                            <div className="text-4xl mb-2">📄</div>
                            <div className="text-sm font-mono uppercase tracking-widest">Select a paper to visualize</div>
                        </div>
                    )}

                    {processing && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                            <div className="text-xs text-brand font-mono animate-pulse">EXTRACTING STRUCTURE...</div>
                        </div>
                    )}

                    {activePaper && !processing && (
                        <div className="w-full h-full flex flex-col">
                            {/* Toolbar */}
                            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-4 bg-white/5">
                                <span className="text-xs font-bold text-white/60">{activePaper.title}</span>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="flex gap-2">
                                    {['Graph', 'Flow', 'Math', 'Concepts'].map(mode => (
                                        <button key={mode} className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors uppercase">
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Canvas */}
                            <div className="flex-1 relative overflow-hidden bg-[#111]">
                                <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
                                    {Array.from({ length: 400 }).map((_, i) => (
                                        <div key={i} className="border-[0.5px] border-white/20" />
                                    ))}
                                </div>

                                {/* Mock Nodes */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute top-1/4 left-1/4 p-4 border border-brand/50 bg-brand/10 rounded text-xs text-brand w-48 text-center shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                                        Input Embedding
                                    </div>
                                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 p-4 border border-white/20 bg-white/5 rounded text-xs text-white w-48 text-center">
                                        Multi-Head Attention
                                    </div>
                                    <div className="absolute top-1/4 right-1/4 p-4 border border-white/20 bg-white/5 rounded text-xs text-white w-48 text-center">
                                        Feed Forward
                                    </div>

                                    {/* Mock Connectors */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/20">
                                        <line x1="30%" y1="28%" x2="45%" y2="28%" strokeWidth="2" />
                                        <line x1="55%" y1="28%" x2="70%" y2="28%" strokeWidth="2" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
