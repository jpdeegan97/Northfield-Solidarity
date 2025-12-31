import React, { useState } from 'react';
import { Users, UserPlus, Fingerprint, History, MessageSquare, Award, Target, Network } from 'lucide-react';
import EngineHeader from '../../components/EngineHeader';

const MOCK_FOUNDERS = [
    { id: 'fnd-1', name: 'Dr. Elena Svarog', role: 'Chief Architect', archetypes: ['Visionary', 'Technical'], status: 'Active', equity: 'Founding' },
    { id: 'fnd-2', name: 'Marcus Thal', role: 'Head of Operations', archetypes: ['Operator', 'Tactician'], status: 'Active', equity: 'Founding' }
];

const MOCK_INTERACTIONS = [
    { id: 1, type: 'Meeting', topic: 'Architecture Review', date: '2h ago', sentiment: 'High Cohesion' },
    { id: 2, type: 'Decision', topic: 'Pivot to React', date: '1d ago', sentiment: 'Consensus' },
];

export default function INCView({ engine }) {
    const [founders] = useState(MOCK_FOUNDERS);
    const [activeProfile, setActiveProfile] = useState(null);

    return (
        <div className="relative w-full h-full bg-[#09090b] text-white overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <EngineHeader
                icon={() => <Users size={16} className="text-white" />}
                title={engine?.name || 'INCUBATOR'}
                subtitle="Founder Synchronization"
                color="orange"
                actions={
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded transition-all text-xs font-bold uppercase tracking-wider">
                        <UserPlus size={14} />
                        Add Profile
                    </button>
                }
            />

            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Founders List */}
                <div className="w-1/3 border-r border-white/10 bg-black/20 flex flex-col">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest">Cohort Members</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {founders.map(f => (
                            <div
                                key={f.id}
                                onClick={() => setActiveProfile(f)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all group ${activeProfile?.id === f.id
                                    ? 'bg-orange-500/10 border-orange-500/50'
                                    : 'bg-black/40 border-white/5 hover:border-orange-500/20'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`font-bold text-sm ${activeProfile?.id === f.id ? 'text-white' : 'text-white/80'}`}>{f.name}</span>
                                    <Award size={12} className={activeProfile?.id === f.id ? 'text-orange-400' : 'text-white/20'} />
                                </div>
                                <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">{f.role}</div>
                                <div className="flex gap-1 flex-wrap">
                                    {f.archetypes.map(tag => (
                                        <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Detail View */}
                <div className="flex-1 bg-black/40 p-6 overflow-y-auto">
                    {activeProfile ? (
                        <div className="max-w-3xl mx-auto space-y-6">
                            {/* Psycho-Social Profile Header */}
                            <div className="flex items-start justify-between border-b border-white/10 pb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{activeProfile.name}</h2>
                                    <div className="flex items-center gap-4 text-xs text-white/50 font-mono uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Fingerprint size={12} /> ID: {activeProfile.id}</span>
                                        <span className="flex items-center gap-1"><Target size={12} /> Status: {activeProfile.status}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold text-orange-500 opacity-20">98%</div>
                                    <div className="text-[10px] text-orange-400 uppercase tracking-widest">Synchronicity Score</div>
                                </div>
                            </div>

                            {/* Detailed Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded border border-white/10">
                                    <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Network size={14} /> Cognitive Alignment
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-white/60">Risk Tolerance</span>
                                            <span className="text-white">Aggressive</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                                            <div className="h-full bg-orange-500 w-3/4"></div>
                                        </div>

                                        <div className="flex justify-between text-xs mt-2">
                                            <span className="text-white/60">Communication Velocity</span>
                                            <span className="text-white">High</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                                            <div className="h-full bg-orange-500 w-[90%]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded border border-white/10">
                                    <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <History size={14} /> Interaction Log
                                    </h3>
                                    <div className="space-y-3">
                                        {MOCK_INTERACTIONS.map(i => (
                                            <div key={i.id} className="flex items-start gap-3 text-xs border-l-2 border-orange-500/20 pl-2">
                                                <div className="text-white/40 font-mono w-16 text-right whitespace-nowrap">{i.date}</div>
                                                <div>
                                                    <div className="text-white/90 font-bold">{i.type}: {i.topic}</div>
                                                    <div className="text-orange-300/60">{i.sentiment}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Narrative / Notes */}
                            <div className="p-6 bg-orange-900/10 border border-orange-500/20 rounded-lg">
                                <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <MessageSquare size={14} /> Founder Narrative
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed font-serif italic">
                                    "Demonstrates exceptional clarity under pressure. Primary driver of architectural decisions, but requires validation on market-facing strategies. Synchronicity with operations is currently peaking."
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white/20">
                            <Fingerprint size={48} className="mb-4 opacity-50" />
                            <h3 className="text-lg font-bold">Select a Founder Profile</h3>
                            <p className="text-xs uppercase tracking-widest mt-2">View detailed synchronicity metrics</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
