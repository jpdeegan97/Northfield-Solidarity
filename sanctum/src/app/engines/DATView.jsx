import React, { useState } from 'react';

// Mock Data: Execution Strategies (Digital Arbitrage)
const STRATEGIES = [
    { id: 'DAT-EXEC-A1', type: 'ARBITRAGE', market: 'CRYPTO/USDC', status: 'ACTIVE', pnl: '+4.2%', uptime: '12h 30m' },
    { id: 'DAT-EXEC-B4', type: 'LIQUIDITY', market: 'UNI-V3', status: 'PAUSED', pnl: '+0.8%', uptime: '4d 2h' },
    { id: 'DAT-EXEC-X9', type: 'MEV_CAPTURE', market: 'ETH/L2', status: 'IDLE', pnl: '0.0%', uptime: '0m' },
];

const LIVE_POSITIONS = [
    { id: 'POS-001', asset: 'ETH-PERP', side: 'LONG', size: '15.5 ETH', entry: '$2,240.50', current: '$2,255.00', roi: '+0.65%' },
    { id: 'POS-002', asset: 'SOL-SPOT', side: 'SHORT', size: '500 SOL', entry: '$98.20', current: '$97.80', roi: '+0.40%' },
];

export default function DATView({ engine }) {
    const [selectedStrategy, setSelectedStrategy] = useState(STRATEGIES[0]);

    // Theme: Amber/Orange for Execution/Action/Profit
    const THEME = {
        primary: 'text-amber-500',
        bg: 'bg-amber-500',
        border: 'border-amber-500/50',
        hoverBorder: 'hover:border-amber-500/50',
        glow: 'shadow-[0_0_10px_rgba(245,158,11,0.2)]',
        bgSoft: 'bg-amber-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Active Runners */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[60vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Strategies
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">NET: +5.0%</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {STRATEGIES.map((strat) => {
                            const isSelected = selectedStrategy.id === strat.id;
                            const statusColor = strat.status === 'ACTIVE' ? 'text-amber-400' : 'text-white/30';

                            return (
                                <div
                                    key={strat.id}
                                    onClick={() => setSelectedStrategy(strat)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-white/50">{strat.id}</span>
                                        <span className="text-[10px] text-white/30 font-mono">{strat.uptime}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-bold text-white group-hover:text-amber-100">{strat.type}</h4>
                                        <span className={`text-xs font-mono ${strat.pnl.startsWith('+') ? 'text-emerald-400' : 'text-white/50'}`}>
                                            {strat.pnl}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${strat.status === 'ACTIVE' ? 'bg-amber-500' : 'bg-white/20'}`} />
                                        <span className={`text-[10px] font-bold ${statusColor}`}>{strat.status}</span>
                                        <span className="text-[10px] text-white/30 ml-auto">{strat.market}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Placeholder for Charts */}
            <div className="flex-1 text-center flex flex-col justify-end pb-12 opacity-50">
                {/* <p className="text-[10px] text-white/20 font-mono">P&L CHART VISUALIZATION LAYER</p> */}
            </div>

            {/* RIGHT: Live Positions & Controls */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">

                {/* Top: Active Positions */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex justify-between">
                        Live Positions
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/50">2 OPEN</span>
                    </h3>

                    <div className="space-y-2">
                        {LIVE_POSITIONS.map((pos) => (
                            <div key={pos.id} className="p-2.5 bg-white/5 border border-white/5 rounded flex justify-between items-center text-xs">
                                <div>
                                    <div className="font-bold text-white">{pos.asset} <span className={`ml-1 text-[9px] ${pos.side === 'LONG' ? 'text-emerald-400' : 'text-red-400'}`}>{pos.side}</span></div>
                                    <div className="text-[10px] text-white/40 font-mono">{pos.size} @ {pos.entry}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono text-emerald-400">{pos.roi}</div>
                                    <div className="text-[10px] text-white/30">{pos.current}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: Execution Controls */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Command</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-2 rounded border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-900/20 transition-all">
                            HALT ALL
                        </button>
                        <button className="py-2 rounded border border-amber-500/50 bg-amber-500/10 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-all">
                            REBALANCE
                        </button>
                    </div>
                    <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded text-[10px] text-white/30 font-mono text-center">
                        Latency: 14ms · Network: OPTIMAL
                    </div>
                </div>

            </div>

        </div>
    );
}
