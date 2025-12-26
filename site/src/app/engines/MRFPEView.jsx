import React, { useState } from 'react';

// Mock Data: Target Zones
const ZONES = [
    { id: 'Z-01', name: 'Downtown District', score: 92, trend: 'RAPID_GROWTH', risk: 'LOW' },
    { id: 'Z-02', name: 'West End Heights', score: 78, trend: 'STABILIZING', risk: 'MED' },
    { id: 'Z-03', name: 'River Industrial', score: 65, trend: 'EMERGING', risk: 'HIGH' },
];

const SIGNALS = [
    { id: 'S-101', type: 'PERMIT', desc: 'Commercial Renovation @ 120 Main', impact: 'POS' },
    { id: 'S-102', type: 'DEMOG', desc: 'Young Prof. Influx (+12% YoY)', impact: 'POS' },
    { id: 'S-103', type: 'TRANSIT', desc: 'Bus Line Reductions', impact: 'NEG' },
];

const PROJECTIONS = [
    { year: 2025, value: '+5.2%', conf: 'High' },
    { year: 2026, value: '+4.8%', conf: 'Med' },
    { year: 2027, value: '+3.1%', conf: 'Low' },
];

export default function MRFPEView() {
    const [selectedZone, setSelectedZone] = useState(ZONES[0]);

    // Theme: "Future Vision" - Cyan/Purple/Dark
    const THEME = {
        primary: 'text-cyan-400',
        sec: 'text-purple-400',
        bg: 'bg-cyan-950/30',
        border: 'border-cyan-500/30',
        highlight: 'bg-cyan-500/10'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Zone Selection */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            Target Zones
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">2025-Q1</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {ZONES.map((zone) => {
                            const isSelected = selectedZone.id === zone.id;
                            return (
                                <div
                                    key={zone.id}
                                    onClick={() => setSelectedZone(zone)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
                                        ${isSelected
                                            ? `${THEME.highlight} ${THEME.border} shadow-[0_0_15px_rgba(34,211,238,0.1)]`
                                            : `bg-white/5 border-transparent hover:border-white/20`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1 relative z-10">
                                        <h4 className="text-sm font-bold text-white truncate">{zone.name}</h4>
                                        <span className={`text-[10px] font-mono font-bold ${THEME.primary}`}>{zone.score}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-white/50 relative z-10">
                                        <span className={`px-1.5 rounded-[2px] bg-white/10 ${zone.risk === 'LOW' ? 'text-emerald-400' : zone.risk === 'MED' ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {zone.risk} RISK
                                        </span>
                                        <span className="flex-1 text-right text-white/30">{zone.trend}</span>
                                    </div>
                                    {/* Progress bar background for score */}
                                    <div
                                        className="absolute bottom-0 left-0 h-0.5 bg-cyan-500/50 transition-all duration-1000"
                                        style={{ width: `${zone.score}%` }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTERPlaceholder */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-80">
                <div className="relative p-8 border border-cyan-500/20 rounded-full w-[400px] h-[400px] flex items-center justify-center bg-black/40 backdrop-blur-xl">
                    <div className="absolute inset-0 border border-dashed border-cyan-500/10 rounded-full animate-spin-slow" />
                    <div className="absolute inset-8 border border-purple-500/10 rounded-full animate-reverse-spin" />

                    <div className="text-center">
                        <div className="text-[10px] text-cyan-400 font-mono tracking-widest mb-2">PROJECTION MODEL</div>
                        <div className="text-3xl font-bold text-white mb-1">{selectedZone.name}</div>
                        <div className="text-xs text-white/50">Growth Vector Analysis</div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Signals & Projections */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Projections Card */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className={`text-xs font-bold ${THEME.sec} uppercase tracking-widest mb-4 flex items-center justify-between`}>
                        <span>Appreciation</span>
                        <span className="text-[10px] text-white/30">3-YR</span>
                    </h3>
                    <div className="flex justify-between gap-2">
                        {PROJECTIONS.map((p) => (
                            <div key={p.year} className="flex flex-col items-center bg-white/5 p-2 rounded flex-1">
                                <span className="text-[10px] text-white/40 mb-1">{p.year}</span>
                                <span className={`text-sm font-bold ${THEME.primary}`}>{p.value}</span>
                                <span className="text-[8px] text-white/30 mt-1">{p.conf} Conf.</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Signals Feed */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Detected Signals</h3>
                    <div className="space-y-3">
                        {SIGNALS.map((s) => (
                            <div key={s.id} className="flex gap-3 items-start border-l border-white/10 pl-3 hover:border-cyan-500 transition-colors">
                                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${s.impact === 'POS' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                <div>
                                    <div className="text-[10px] font-bold text-white flex justify-between w-full">
                                        <span>{s.type}</span>
                                        <span className={`text-[8px] ${s.impact === 'POS' ? 'text-emerald-400' : 'text-red-400'}`}>{s.impact}</span>
                                    </div>
                                    <div className="text-xs text-white/70 leading-snug">{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
