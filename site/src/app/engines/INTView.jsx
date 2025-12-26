import React, { useState } from 'react';

// Mock Data: State Deltas
const STATE_DELTAS = [
    { id: 'DLT-99420', tick: 199402, path: 'firmament.risk.global', value: 'ELEVATED', prev: 'NORMAL', source: 'SIG_ENGINE' },
    { id: 'DLT-99419', tick: 199401, path: 'treasury.balances.usdc', value: '4250500.00', prev: '4292500.00', source: 'FLO_LEDGER' },
    { id: 'DLT-99418', tick: 199399, path: 'identity.session.usr-001', value: 'ACTIVE', prev: 'IDLE', source: 'IDN_AUTH' },
    { id: 'DLT-99415', tick: 199395, path: 'market.eth.price', value: '2245.50', prev: '2242.00', source: 'MUX_ORACLE' },
];

const ACTIVE_INTERVENTIONS = [
    { id: 'INT-01', type: 'STATE_LOCK', target: 'treasury.outbound', reason: 'Audit in progress', author: 'USR-001 (ROOT)' },
];

export default function INTView({ engine }) {
    const [selectedDelta, setSelectedDelta] = useState(STATE_DELTAS[0]);

    // Theme: Red/Ruby for "State Authority/Intervention/Stop"
    const THEME = {
        primary: 'text-red-500',
        bg: 'bg-red-500',
        border: 'border-red-500/50',
        hoverBorder: 'hover:border-red-500/50',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]',
        bgSoft: 'bg-red-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: State Stream (Deltas) */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            State Fabric
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">TICK: 199422</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                        {STATE_DELTAS.map((delta) => {
                            const isSelected = selectedDelta.id === delta.id;

                            return (
                                <div
                                    key={delta.id}
                                    onClick={() => setSelectedDelta(delta)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group font-mono
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] text-white/30">{delta.tick}</span>
                                        <span className="text-[9px] text-white/50">{delta.source}</span>
                                    </div>
                                    <div className="text-xs text-white truncate mb-1">{delta.path}</div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                        <span className="text-white/40 line-through">{delta.prev}</span>
                                        <span className="text-white/60">→</span>
                                        <span className={`${THEME.primary}`}>{delta.value}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Timeline / Replay Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-end pb-12 opacity-50 pointer-events-auto">
                <div className="w-full max-w-2xl h-16 border-t border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur">
                    <span className="text-[10px] text-white/30 font-mono">-10m</span>
                    <div className="flex-1 mx-4 h-8 flex items-center gap-1">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`w-1 h-${((i % 4) + 1) * 2} bg-white/20`} />
                        ))}
                        <div className="w-1 h-6 bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    </div>
                    <span className="text-[10px] text-red-500 font-mono font-bold">NOW</span>
                </div>
            </div>

            {/* RIGHT: Intervention Controls */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Active Interventions */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        Active Manual Overrides
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-[9px]">1</span>
                    </h3>

                    {ACTIVE_INTERVENTIONS.map((intv) => (
                        <div key={intv.id} className="p-3 bg-red-950/30 border border-red-500/30 rounded mb-2">
                            <div className="flex justify-between mb-1">
                                <span className="text-[10px] font-bold text-red-400">{intv.type}</span>
                                <span className="text-[9px] text-white/40">{intv.author}</span>
                            </div>
                            <div className="text-xs text-white/90 font-mono mb-2">{intv.target}</div>
                            <div className="text-[10px] text-white/50 italic">"{intv.reason}"</div>
                        </div>
                    ))}
                </div>

                {/* Bottom: Panic Button */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1 flex flex-col justify-end">
                    <p className="text-[10px] text-white/40 mb-4 text-center">
                        SYSTEM LEVEL INTERVENTION. USE WITH CAUTION.
                    </p>
                    <button className="w-full py-4 bg-red-600 hover:bg-red-500 border border-red-400 text-white font-bold tracking-widest rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all active:scale-95">
                        HALT WORLD STATE
                    </button>
                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-2 border border-white/10 hover:bg-white/5 text-white/50 text-xs rounded transition-all">
                            SNAPSHOT
                        </button>
                        <button className="flex-1 py-2 border border-white/10 hover:bg-white/5 text-white/50 text-xs rounded transition-all">
                            FORK
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}
