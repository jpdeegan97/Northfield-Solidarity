import React, { useState } from 'react';

// Mock Data: Signals
const SIGNALS = [
    { id: 'SIG-8822', source: 'TWITTER', sentiment: 'POSITIVE', confidence: 0.89, topic: 'AI Agents', timestamp: '2s ago' },
    { id: 'SIG-8821', source: 'NEWS_API', sentiment: 'NEUTRAL', confidence: 0.95, topic: 'Market Volatility', timestamp: '5s ago' },
    { id: 'SIG-8820', source: 'DISCORD', sentiment: 'NEGATIVE', confidence: 0.72, topic: 'Protocol Exploit', timestamp: '12s ago' },
    { id: 'SIG-8819', source: 'REDDIT', sentiment: 'POSITIVE', confidence: 0.65, topic: 'New Token Launch', timestamp: '22s ago' },
    { id: 'SIG-8818', source: 'ON_CHAIN', sentiment: 'NEUTRAL', confidence: 0.99, topic: 'Large Transfer', timestamp: '45s ago' },
];

const SOURCES = [
    { name: 'Twitter Firehose', status: 'ACTIVE', rate: '45/s' },
    { name: 'Bloomberg Terminal', status: 'ACTIVE', rate: '2/s' },
    { name: 'Farcaster', status: 'IDLE', rate: '0/s' },
    { name: 'Discord Scraper', status: 'DEGRADED', rate: '5/s' },
];

export default function SIGView({ engine }) {
    const [selectedSignal, setSelectedSignal] = useState(SIGNALS[0]);

    // Theme: Rose/Pink for Signal/Noise/Detection
    const THEME = {
        primary: 'text-rose-400',
        bg: 'bg-rose-500',
        border: 'border-rose-500/50',
        hoverBorder: 'hover:border-rose-500/50',
        glow: 'shadow-[0_0_10px_rgba(251,113,133,0.2)]',
        bgSoft: 'bg-rose-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Signal Stream */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Signal Ingestion
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">52 / sec</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                        {SIGNALS.map((sig) => {
                            const isSelected = selectedSignal.id === sig.id;
                            const sentimentColor = sig.sentiment === 'POSITIVE' ? 'text-emerald-400' :
                                sig.sentiment === 'NEGATIVE' ? 'text-rose-400' : 'text-blue-300';

                            return (
                                <div
                                    key={sig.id}
                                    onClick={() => setSelectedSignal(sig)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1 relative z-10">
                                        <span className="text-[10px] uppercase font-bold text-white/60">{sig.source}</span>
                                        <span className="text-[10px] font-mono text-white/30">{sig.timestamp}</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-white relative z-10 mb-2 truncate">{sig.topic}</h4>

                                    <div className="flex items-center gap-2 relative z-10 border-t border-white/5 pt-2 mt-1">
                                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full ${THEME.bg}`} style={{ width: `${sig.confidence * 100}%` }} />
                                        </div>
                                        <span className={`text-[9px] font-bold ${sentimentColor}`}>{sig.sentiment}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Signal Visualization */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-30">
                {/* Abstract shape representing signal processing could go here in 3D scene, this is just placeholder text if any */}
            </div>

            {/* RIGHT: Analysis & Sources */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Signal Detail */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Signal Analysis</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white/40 uppercase block mb-1">Confidence</span>
                            <span className={`text-xl font-mono ${THEME.primary}`}>{selectedSignal.confidence * 100}%</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white/40 uppercase block mb-1">Relevance</span>
                            <span className="text-xl font-mono text-white">High</span>
                        </div>
                    </div>
                    <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-white/70 font-mono leading-relaxed break-all">
                        RAW_PAYLOAD: {"{"}
                        <br />&nbsp;&nbsp;"src": "{selectedSignal.source}",
                        <br />&nbsp;&nbsp;"topic": "{selectedSignal.topic}",
                        <br />&nbsp;&nbsp;"hash": "0x882a...9b"
                        <br />{"}"}
                    </div>
                </div>

                {/* Bottom: Active Sources */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Ingestion Sources</h3>
                    <div className="space-y-2">
                        {SOURCES.map((src, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${src.status === 'ACTIVE' ? 'bg-emerald-500' : src.status === 'DEGRADED' ? 'bg-amber-500' : 'bg-white/20'}`} />
                                    <span className="text-xs text-white/80">{src.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-white/30">{src.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
