import React, { useState } from 'react';

// Mock Data for PIE
const FEED_ITEMS = [
    { id: 1, type: 'trend', title: 'Generative UI Patterns', score: 98, time: '2m ago' },
    { id: 2, type: 'gap', title: 'Low-latency Data Middleware', score: 85, time: '14m ago' },
    { id: 3, type: 'comp', title: 'Competitor X launched AI agent', score: 72, time: '1h ago' },
    { id: 4, type: 'trend', title: 'Rust adoption in FinTech', score: 65, time: '3h ago' }
];

const OPPORTUNITIES = [
    {
        id: 'OPP-001',
        title: 'Autonomous Research Agents',
        stage: 'Synthesis',
        impact: 'High',
        confidence: '92%',
        desc: 'Market demand for self-driving research is peaking. PIE architecture is naturally positioned to capture this.'
    },
    {
        id: 'OPP-002',
        title: 'Real-time Signal Arbitrage',
        stage: 'Evaluation',
        impact: 'Med',
        confidence: '68%',
        desc: 'Cross-correlating social sentiment with micro-cap movement shows 400ms alpha window.'
    }
];

export default function PIEView({ engine }) {
    const [selectedOpp, setSelectedOpp] = useState(OPPORTUNITIES[0]);

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Research Feed */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[60vh]">
                    <h3 className="text-xs font-bold text-indigo-400 mb-4 tracking-widest uppercase flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Intelligence Feed
                    </h3>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {FEED_ITEMS.map((item) => (
                            <div key={item.id} className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] uppercase font-mono text-indigo-300 bg-indigo-900/40 px-1.5 py-0.5 rounded">{item.type}</span>
                                    <span className="text-[10px] text-white/40 font-mono">{item.time}</span>
                                </div>
                                <h4 className="text-sm font-medium text-white/90 group-hover:text-white leading-snug">{item.title}</h4>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${item.score}%` }} />
                                    </div>
                                    <span className="text-[10px] font-mono text-indigo-400">{item.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CENTER: Visualization Placeholder (Can add graphs later) */}
            <div className="flex-1"></div>

            {/* RIGHT: Synthesis & Decision Briefs */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4">
                    <div className="border-b border-white/10 pb-4 mb-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Active Opportunities</h3>
                        <p className="text-[10px] text-white/50 mt-1">High-conviction synthesis derived from feed.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {OPPORTUNITIES.map((opp) => {
                            const isSelected = selectedOpp.id === opp.id;
                            return (
                                <div
                                    key={opp.id}
                                    onClick={() => setSelectedOpp(opp)}
                                    className={`
                                        p-4 rounded border cursor-pointer transition-all
                                        ${isSelected
                                            ? 'bg-indigo-900/20 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                            : 'bg-white/5 border-transparent hover:bg-white/10'}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-sm font-bold text-white">{opp.title}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                            {opp.id}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="bg-black/40 rounded p-1.5 border border-white/5">
                                            <div className="text-[9px] text-white/40 uppercase">Stage</div>
                                            <div className="text-xs text-indigo-300 font-medium">{opp.stage}</div>
                                        </div>
                                        <div className="bg-black/40 rounded p-1.5 border border-white/5">
                                            <div className="text-[9px] text-white/40 uppercase">Confidence</div>
                                            <div className="text-xs text-brand font-medium">{opp.confidence}</div>
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <div className="text-xs text-white/70 leading-relaxed pt-2 border-t border-white/5 animate-in fade-in duration-300">
                                            {opp.desc}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <button className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded shadow-lg shadow-indigo-500/20 transition-all">
                        GENERATE BRIEF
                    </button>
                </div>
            </div>

        </div>
    );
}
