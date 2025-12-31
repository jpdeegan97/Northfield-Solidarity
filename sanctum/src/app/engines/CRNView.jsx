import React, { useState } from 'react';
import { Sun, Moon, ArrowRight, Calendar, CheckCircle2, Circle, Clock, FileText, ChevronRight } from 'lucide-react';
import EngineHeader from '../../components/EngineHeader';

// MOCK DATA: Chronicle Timeline
const MOCK_MORN_BRIEF = {
    date: '2025-12-29',
    intent: 'Solidify the core engines and prepare GTM plan.',
    priorities: [
        { id: 1, text: 'Audit "Skeleton" Engines (FRK, INC, CRN)', status: 'done' },
        { id: 2, text: 'Draft GTM Execution Plan', status: 'done' },
        { id: 3, text: 'Finalize WPV integration', status: 'done' }
    ],
    risks: 'Context switching between legal and code contexts.'
};

const MOCK_EVE_DEBRIEF = {
    date: '2025-12-28',
    summary: 'High velocity day. WPV deployment successful. Marketplace search operational.',
    score: { outcome: 9, focus: 8, energy: 7 },
    shipped: ['WPV Engine', 'Product Dock Search', 'Marketplace Asset Modal'],
    carryovers: [
        { text: 'Refine "Skeleton" engine UIs', priority: 'high' }
    ]
};

const PAST_ENTRIES = [
    { date: '2025-12-28', type: 'PM', title: 'Evening Debrief', summary: 'WPV Launched' },
    { date: '2025-12-28', type: 'AM', title: 'Morning Brief', summary: 'Focus: Visualizers' },
    { date: '2025-12-27', type: 'PM', title: 'Evening Debrief', summary: 'Marketplace Core' },
];

export default function CRNView({ engine }) {
    const [viewMode, setViewMode] = useState('CURRENT'); // CURRENT | HISTORY

    return (
        <div className="relative w-full h-full bg-[#09090b] text-white overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <EngineHeader
                icon={() => <Calendar size={16} className="text-white" />}
                title={engine?.name || 'CHRONICLE'}
                subtitle="Continuity & Journaling"
                color="amber"
                actions={
                    <div className="flex bg-black/40 p-1 rounded border border-white/10">
                        <button
                            onClick={() => setViewMode('CURRENT')}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${viewMode === 'CURRENT' ? 'bg-amber-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setViewMode('HISTORY')}
                            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${viewMode === 'HISTORY' ? 'bg-amber-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            History
                        </button>
                    </div>
                }
            />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                {viewMode === 'CURRENT' ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Morning Section */}
                        <div className="relative pl-8 border-l border-white/10">
                            <div className="absolute -left-4 top-0 w-8 h-8 bg-black border border-amber-500/50 rounded-full flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                                <Sun size={16} />
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-amber-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">Morning Brief</h2>
                                        <div className="text-xs text-amber-400/70 font-mono uppercase tracking-wider flex items-center gap-2">
                                            <Clock size={12} /> Today, 08:30 AM
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-300 font-bold uppercase">
                                        Active Plan
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Intent */}
                                    <div>
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Daily Intent</h3>
                                        <p className="text-lg text-white/90 font-serif italic leading-relaxed">"{MOCK_MORN_BRIEF.intent}"</p>
                                    </div>

                                    {/* Priorities Checklist */}
                                    <div className="bg-black/20 rounded p-4 border border-white/5">
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Top Priorities</h3>
                                        <ul className="space-y-3">
                                            {MOCK_MORN_BRIEF.priorities.map(p => (
                                                <li key={p.id} className="flex items-start gap-3 group cursor-pointer">
                                                    {p.status === 'done' ? (
                                                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                                                    ) : (
                                                        <Circle size={16} className="text-white/20 group-hover:text-amber-500 transition-colors mt-0.5" />
                                                    )}
                                                    <span className={`text-sm ${p.status === 'done' ? 'text-white/40 line-through' : 'text-white/80'}`}>{p.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Risks */}
                                    <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-500/20 rounded">
                                        <div className="text-xs font-bold text-red-400 uppercase tracking-widest whitespace-nowrap">Known Risk:</div>
                                        <div className="text-xs text-red-200/80">{MOCK_MORN_BRIEF.risks}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Arrows / Connector */}
                        <div className="pl-8 border-l border-white/10 py-4">
                            <div className="flex items-center gap-2 text-white/20 pl-4">
                                <ArrowRight size={16} className="animate-pulse" />
                                <span className="text-xs uppercase tracking-widest">In Progress</span>
                            </div>
                        </div>

                        {/* Evening Section (Placeholder/Action) */}
                        <div className="relative pl-8 border-l border-white/10">
                            <div className="absolute -left-4 top-0 w-8 h-8 bg-black border border-white/10 rounded-full flex items-center justify-center text-white/30">
                                <Moon size={16} />
                            </div>

                            <div className="border border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-all text-white/30">
                                    <FileText size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Begin Evening Debrief</h3>
                                <p className="text-white/40 text-sm max-w-sm mb-6">
                                    Close the loop. Record outcomes, decisions, and prepare carryovers for tomorrow.
                                </p>
                                <button className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded shadow-lg shadow-amber-900/20 transition-all uppercase tracking-wider text-xs">
                                    Start Session
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* History Mode */
                    <div className="max-w-4xl mx-auto">
                        <div className="relative border-l border-white/10 ml-6 space-y-8 py-4">
                            {PAST_ENTRIES.map((entry, idx) => (
                                <div key={idx} className="relative pl-8 group cursor-pointer">
                                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border border-black ${entry.type === 'AM' ? 'bg-amber-400' : 'bg-indigo-400'}`}></div>
                                    <div className="flex items-baseline justify-between mb-1">
                                        <div className="text-sm font-light text-white/60 font-mono">{entry.date} <span className={`ml-2 text-[10px] font-bold px-1.5 rounded ${entry.type === 'AM' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'}`}>{entry.type}</span></div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{entry.title}</h3>
                                    <p className="text-white/40 text-sm">{entry.summary}</p>
                                    <ChevronRight className="absolute right-0 top-2 text-white/10 group-hover:text-white/50 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
