import React, { useState, useEffect } from 'react';
import { X, Globe, TrendingUp, ShieldAlert, Crosshair, Zap, Activity, Users, Lock } from 'lucide-react';

const MOCK_INTELLIGENCE = {
    // Dynamic generation fallbacks
    default: {
        narrative: "Global hegemony is shifting as decentralized actors disrupt legacy supply chains. State-sponsored entities are aggressively acquiring IP in this sector throughout SE Asia and Eastern Europe. Northfield Intelligence suggests a high probability of market consolidation within the next 3 quarters.",
        players: ["Vanguard Group", "BlackRock", "State Street", "Norwegian Sovereign Fund", "Unknown PRC Entities"],
        projects: ["Project Chimera (DARPA)", "Titan-VI", "DeepBlue AI", "Strategic Reserve Alpha"],
        projections: "Volatility expected to increase by 200%. Asymmetric warfare vectors detected in regulatory frameworks."
    }
};

const getIntelligence = (sector) => {
    // Determine seed based on string char codes for consistent pseudo-randomness
    const seed = sector.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const narratives = [
        "A shadow war is currently unfolding between Euro-Atlantic regulatory bodies and Pan-Asian conglomerates. Control over this vertical dictates the flow of 'Smart Capital' for the next decade.",
        "Intelligence indicates a massive liquidity injection from sovereign wealth funds attempting to corner the market. Legacy players are bleeding market share to agile, tech-first disruptors.",
        "Deep-state actors are leveraging this sector for dual-use technologies. Financial decoupling between East and West is creating arbitrage opportunities for neutral platforms.",
        "Algorithmic dominance is the new nuclear deterrent. Who controls the data pipelines here controls the geopolitical narrative. Expect hostile takeovers of mid-cap innovators."
    ];

    const factions = [
        { name: "Global Banking Cartel", alignment: "Hostile", strength: 85 },
        { name: "Sino-Tech Axis", alignment: "Competitor", strength: 92 },
        { name: "Decentralized Collectives", alignment: "Ally", strength: 45 },
        { name: "Euro-Regulators", alignment: "Neutral", strength: 60 }
    ];

    const projects = [
        { name: "Onyx Protocol", status: "Critical", trend: "up" },
        { name: "Project Firewall", status: "Stalled", trend: "down" },
        { name: "Quantum Leap", status: "Accelerating", trend: "up" },
        { name: "Dark Pool V", status: "Secret", trend: "flat" }
    ];

    return {
        narrative: narratives[seed % narratives.length],
        factions: factions.sort(() => 0.5 - Math.random()).slice(0, 3), // Simple shuffle
        projects: projects.sort(() => 0.5 - Math.random()).slice(0, 3),
        riskLevel: ["CRITICAL", "HIGH", "MODERATE", "ELEVATED"][seed % 4],
        marketCap: `$${(seed % 100) / 10 + 1.2} Trillion`,
        nodeId: Math.floor(Math.random() * 9000) + 1000
    };
};

export default function SectorIntelligenceModal({ isOpen, onClose, sector, category }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && sector) {
            // Simulate "Decrypting" delay
            const timer = setTimeout(() => {
                setData(getIntelligence(sector));
                setLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isOpen, sector]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-5xl h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-50"
                >
                    <X size={24} />
                </button>

                {/* Header / Top Bar */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse box-shadow-[0_0_10px_red]" />
                        <div>
                            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Global Intelligence Feed</div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                {category} <span className="text-white/20">/</span> <span className="text-[#00ff9d]">{sector}</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs font-mono text-white/40">
                        <div className="flex items-center gap-2">
                            <Lock size={12} />
                            <span>ENCRYPTED_CHANNEL_TLS_1.3</span>
                        </div>
                        <div className="text-red-500 font-bold border border-red-500/30 bg-red-500/10 px-2 py-1 rounded">
                            EYES ONLY
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center font-mono text-[#00ff9d]">
                        <Activity className="animate-pulse mb-4" size={48} />
                        <div className="text-sm uppercase tracking-widest">Decrypting Sector Intel...</div>
                        <div className="mt-2 text-xs text-white/30">Connecting to Firmament Intelligence Grid</div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 grid grid-cols-12 gap-6 font-mono text-white">

                        {/* LEFT COLUMN - WAR ROOM OVERVIEW */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

                            {/* Narrative Card */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Globe size={100} />
                                </div>
                                <h3 className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <ShieldAlert size={14} /> Geopolitical Sitrep
                                </h3>
                                <p className="text-lg leading-relaxed text-white/90 font-light border-l-2 border-[#00ff9d] pl-4">
                                    {data.narrative}
                                </p>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black border border-white/10 rounded-lg p-4">
                                    <div className="text-xs text-white/40 uppercase mb-1">Risk Level</div>
                                    <div className={`text-2xl font-bold ${data.riskLevel === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'}`}>
                                        {data.riskLevel}
                                    </div>
                                </div>
                                <div className="bg-black border border-white/10 rounded-lg p-4">
                                    <div className="text-xs text-white/40 uppercase mb-1">Total Market Velocity</div>
                                    <div className="text-2xl font-bold text-white">
                                        {data.marketCap}
                                    </div>
                                </div>
                            </div>

                            {/* Live Projects Feed */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                <h3 className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Zap size={14} /> Project Frontiers
                                </h3>
                                <div className="space-y-3">
                                    {data.projects.map((proj, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-black/50 border border-white/5 rounded hover:border-white/20 transition-all cursor-crosshair group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-1.5 h-1.5 rounded-full ${proj.trend === 'up' ? 'bg-[#00ff9d]' : 'bg-amber-500'}`} />
                                                <span className="font-bold group-hover:text-[#00ff9d] transition-colors">{proj.name}</span>
                                            </div>
                                            <div className="text-xs text-white/40 uppercase tracking-widest">{proj.status}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN - FACTIONS & PROJECTIONS */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                            {/* Key Players */}
                            <div className="bg-black border border-white/10 rounded-lg p-6">
                                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Users size={14} /> Dominant Actors
                                </h3>
                                <div className="space-y-4">
                                    {data.factions.map((fac, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-sm font-bold">{fac.name}</span>
                                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${fac.alignment === 'Hostile' ? 'bg-red-500/20 text-red-400' :
                                                    fac.alignment === 'Ally' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        'bg-white/10 text-white/60'
                                                    }`}>{fac.alignment}</span>
                                            </div>
                                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-white/40" style={{ width: `${fac.strength}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Projections */}
                            <div className="flex-1 bg-gradient-to-b from-white/5 to-black border border-white/10 rounded-lg p-6 flex flex-col">
                                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Crosshair size={14} /> Long-Range Forecast
                                </h3>
                                <div className="flex-1 border-l border-b border-white/20 relative min-h-[100px]">
                                    {/* Mock Chart Line */}
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <path
                                            d="M0 100 Q 50 80, 100 60 T 200 20"
                                            fill="none"
                                            stroke="#00ff9d"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        <path
                                            d="M0 100 L 200 100"
                                            fill="none"
                                            stroke="url(#grid-gradient)"
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-4 text-xs text-white/50 leading-relaxed">
                                    Projections indicate a consolidation phase followed by rapid vertical expansion. Recommendation: Accumulate positions during current volatility suppression.
                                </p>
                            </div>

                        </div>
                    </div>
                )}

                {/* Footer Status */}
                <div className="h-8 bg-black border-t border-white/10 flex items-center justify-between px-4 text-[10px] font-mono text-white/20 uppercase">
                    <div>Connected: NODE_{data?.nodeId || 'INIT'}</div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#00ff9d] rounded-full animate-pulse" />
                        LIVE STREAM
                    </div>
                </div>
            </div>
        </div>
    );
}
