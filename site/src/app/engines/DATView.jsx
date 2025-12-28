import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Crosshair, Shield, Zap, Skull, TrendingUp, Lock, Eye, EyeOff, Trophy } from 'lucide-react';

// --- DATA ---
const STRATEGIES = [
    { id: 'DAT-EXEC-A1', type: 'ARBITRAGE', market: 'CRYPTO/USDC', status: 'ACTIVE', pnl: 4.2, uptime: '12h 30m', risk: 'LOW', speed: 95 },
    { id: 'DAT-EXEC-B4', type: 'LIQUIDITY', market: 'UNI-V3', status: 'PAUSED', pnl: 0.8, uptime: '4d 2h', risk: 'MED', speed: 40 },
    { id: 'DAT-EXEC-X9', type: 'MEV_CAPTURE', market: 'ETH/L2', status: 'IDLE', pnl: 0.0, uptime: '0m', risk: 'HIGH', speed: 99 },
    { id: 'DAT-EXEC-V2', type: 'VAMPIRE_BOT', market: 'ETH/SOL', status: 'ACTIVE', pnl: 12.5, uptime: '45m', risk: 'EXTREME', speed: 99 },
];

const LIVE_POSITIONS = [
    { id: 'POS-001', asset: 'ETH-PERP', side: 'LONG', size: '15.5 ETH', entry: 2240.50, current: 2255.00, roi: 0.65, slippage: 0.01 },
    { id: 'POS-002', asset: 'SOL-SPOT', side: 'SHORT', size: '500 SOL', entry: 98.20, current: 97.80, roi: 0.40, slippage: 0.12 }, // High slippage "bleed"
];

// --- COMPONENTS ---

const PnlHeartbeat = () => {
    // A simulated EKG line
    return (
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-0 opacity-30">
            <svg className="w-full h-full" preserveAspectRatio="none">
                <motion.path
                    d="M0,30 L100,30 L110,10 L120,50 L130,30 L200,30 L210,10 L220,50 L230,30 L300,30 L310,10 L320,50 L330,30 L1000,30"
                    fill="none"
                    stroke="#22c55e" // Green heartbeat
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0, x: -100 }}
                    animate={{
                        pathLength: 1,
                        opacity: [0.2, 1, 0.2],
                        x: 0
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-green-500/5 to-black/0" />
        </div>
    );
};

const KillSwitch = () => {
    const [armed, setArmed] = useState(false);

    return (
        <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${armed ? 'animate-pulse opacity-100' : ''}`}></div>
            <button
                onClick={() => setArmed(!armed)}
                className={`relative w-full py-4 border-2 font-black tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden transition-all
                    ${armed
                        ? 'bg-red-600 text-black border-red-500 animate-pulse'
                        : 'bg-black text-red-600 border-red-900/50 hover:border-red-500 hover:text-red-500'
                    }
                `}
            >
                <Skull size={20} className={armed ? 'animate-bounce' : ''} />
                {armed ? 'CONFIRM KILL' : 'KILL SWITCH'}
                {armed && <div className="absolute inset-0 bg-[url('/assets/stripes.png')] opacity-10"></div>}
            </button>
        </div>
    );
};

const StrategyCard = ({ strat, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`
            p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
            ${selected
                ? 'bg-amber-900/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-white/5 border-transparent hover:border-amber-500/30'}
        `}
    >
        {/* DNA / Stats Background */}
        <div className="absolute right-0 top-0 bottom-0 w-24 opacity-5 pointer-events-none">
            <div className="h-full w-full bg-gradient-to-l from-amber-500/20 to-transparent" />
        </div>

        <div className="flex justify-between items-start mb-1 relative z-10">
            <span className="text-[10px] font-mono text-white/50 flex items-center gap-1">
                {strat.id}
                {strat.risk === 'EXTREME' && <Zap size={10} className="text-red-500" />}
            </span>
            <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                {strat.status === 'ACTIVE' && <Activity size={10} className="text-emerald-500 animate-pulse" />}
                {strat.uptime}
            </span>
        </div>

        <div className="flex justify-between items-center mb-1 relative z-10">
            <h4 className="text-sm font-bold text-white group-hover:text-amber-100">{strat.type}</h4>
            <span className={`text-xs font-mono font-bold ${strat.pnl > 0 ? 'text-emerald-400' : 'text-white/50'}`}>
                {strat.pnl > 0 ? '+' : ''}{strat.pnl}%
            </span>
        </div>

        {/* RPG Stats Mini-Bar */}
        <div className="flex items-center gap-2 mt-2 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${strat.risk === 'EXTREME' ? 'bg-red-500' : 'bg-amber-500'}`}
                    style={{ width: `${strat.speed}%` }}
                />
            </div>
            <span className="text-[9px] font-mono text-amber-500/80">{strat.speed} SPD</span>
        </div>
    </div>
);

// --- VISUALIZATION SUB-COMPONENTS ---

const FlowPipeline = () => {
    // Idea 18: Capital "Flow" Sankey/Pipeline
    const STAGES = [
        { label: 'IDLE CAPITAL', value: '$45,000', color: 'bg-white/10' },
        { label: 'STRATEGY POOL', value: '$32,500', color: 'bg-blue-500/20' },
        { label: 'ACTIVE ORDERS', value: '$12,400', color: 'bg-amber-500/20' },
        { label: 'SETTLEMENT', value: '$8,200', color: 'bg-emerald-500/20' },
        { label: 'REALIZED PROFIT', value: '+$1,240', color: 'bg-emerald-500' },
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="flex items-center gap-2 w-full max-w-4xl">
                {STAGES.map((stage, i) => (
                    <React.Fragment key={stage.label}>
                        {/* Stage Node */}
                        <div className="relative flex-1 group">
                            <div className={`
                                h-32 rounded-lg border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-2
                                transition-all hover:scale-105 hover:border-white/30 ${stage.color}
                            `}>
                                <div className="text-[10px] font-bold text-white/40 tracking-widest">{stage.label}</div>
                                <div className="text-xl font-mono font-bold text-white">{stage.value}</div>

                                {/* Micro-particles representing flow */}
                                <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                                    {[...Array(5)].map((_, p) => (
                                        <motion.div
                                            key={p}
                                            className="absolute w-1 h-1 bg-white rounded-full"
                                            initial={{ x: -20, y: Math.random() * 100 }}
                                            animate={{ x: 200, opacity: [0, 1, 0] }}
                                            transition={{
                                                duration: 2 + Math.random(),
                                                repeat: Infinity,
                                                delay: Math.random() * 2,
                                                ease: "linear"
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Connector Arrow */}
                        {i < STAGES.length - 1 && (
                            <div className="shrink-0 text-white/20 flex flex-col items-center">
                                <motion.div
                                    className="w-12 h-0.5 bg-gradient-to-r from-white/10 to-white/30"
                                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const TopoMap = () => {
    // Idea 11: 3D "Terrain" Order Book
    const asks = useMemo(() => [...Array(40)].map((_, i) => ({
        height: 10 + Math.random() * 50 + (i * 2)
    })), []);

    const bids = useMemo(() => [...Array(40)].map((_, i) => ({
        height: 10 + Math.random() * 50 + ((40 - i) * 2)
    })), []);

    return (
        <div className="absolute inset-0 flex items-center justify-center p-10 overflow-hidden">
            <div className="relative w-full h-64 flex items-end justify-center gap-0.5 perspective-1000">
                {/* Ask Wall (Red) */}
                {asks.map((ask, i) => (
                    <motion.div
                        key={`ask-${i}`}
                        className="w-2 bg-red-500/40 border-t border-red-500/80"
                        initial={{ height: 0 }}
                        animate={{ height: `${ask.height}%` }}
                        transition={{ duration: 1, delay: i * 0.02 }}
                    />
                ))}

                {/* Spread Gap */}
                <div className="w-10 flex items-end justify-center pb-2">
                    <span className="text-[10px] font-mono text-white/30 animate-pulse">SPREAD</span>
                </div>

                {/* Bid Wall (Green) */}
                {bids.map((bid, i) => (
                    <motion.div
                        key={`bid-${i}`}
                        className="w-2 bg-emerald-500/40 border-t border-emerald-500/80"
                        initial={{ height: 0 }}
                        animate={{ height: `${bid.height}%` }}
                        transition={{ duration: 1, delay: i * 0.02 }}
                    />
                ))}

                {/* Overlay Text */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <div className="text-xl font-black text-white/50 tracking-widest">DEPTH MAP</div>
                    <div className="text-[10px] text-white/20 font-mono">BINANCE: ETH/USDT</div>
                </div>
            </div>
        </div>
    );
};

const TrophyRoom = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-20" onClick={onClose}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border border-amber-500/30 p-8 rounded-lg max-w-2xl w-full relative overflow-hidden"
            onClick={e => e.stopPropagation()}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent" />

            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <span className="text-amber-500">🏆</span> TROPHY ROOM
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-amber-500/20 rounded flex items-center gap-4">
                    <div className="text-4xl">💎</div>
                    <div>
                        <div className="text-xs font-bold text-amber-500">BEST TRADE (DEC)</div>
                        <div className="text-white font-bold">+450% ROI</div>
                        <div className="text-[10px] text-white/30 font-mono">ETH/USDC ARB</div>
                    </div>
                </div>
                <div className="p-4 bg-white/5 border border-red-500/20 rounded flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <div className="text-4xl">💀</div>
                    <div>
                        <div className="text-xs font-bold text-red-500">WORST REKT (DEC)</div>
                        <div className="text-white font-bold">-12% SLIPPAGE</div>
                        <div className="text-[10px] text-white/30 font-mono">FARM/ETH LIQ</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-white/20 font-mono">
                [ CLICK ANYWHERE TO CLOSE ]
            </div>
        </motion.div>
    </div>
);

const NodeWeb = () => {
    // Idea 14: Strategy Correlation Web
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-10 shadow-[0_0_20px_white]" />

                {/* Satellites */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                    const rad = deg * (Math.PI / 180);
                    const x = Math.cos(rad) * 120; // radius
                    const y = Math.sin(rad) * 120;

                    return (
                        <React.Fragment key={i}>
                            {/* Connection Line */}
                            <svg className="absolute top-1/2 left-1/2 overflow-visible w-0 h-0 pointer-events-none">
                                <motion.line
                                    x1="0" y1="0" x2={x} y2={y}
                                    stroke={i % 2 === 0 ? "rgba(245, 158, 11, 0.5)" : "rgba(34, 197, 94, 0.5)"}
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                />
                            </svg>

                            {/* Node */}
                            <motion.div
                                className={`
                                      absolute w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur flex items-center justify-center
                                      text-[8px] font-mono text-white/70
                                      ${i % 2 === 0 ? 'text-amber-500 border-amber-500/30' : 'text-emerald-500 border-emerald-500/30'}
                                  `}
                                style={{ x, y, marginLeft: -24, marginTop: -24 }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.5 + i * 0.1 }}
                            >
                                STRAT-{i}
                            </motion.div>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    );
};

// ... (Other visualizations placeholders)



const PositionRow = ({ pos }) => (
    <div className="p-3 bg-white/5 border border-white/5 rounded flex justify-between items-center text-xs relative overflow-hidden group">
        {/* Slippage "Blood" Trail */}
        {pos.slippage > 0.1 && (
            <div className="absolute bottom-0 left-0 h-[2px] bg-red-500 blur-[2px]" style={{ width: `${pos.slippage * 500}%` }} />
        )}

        <div className="z-10">
            <div className="font-bold text-white flex items-center gap-2">
                {pos.asset}
                <span className={`text-[9px] px-1 rounded ${pos.side === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {pos.side}
                </span>
            </div>
            <div className="text-[10px] text-white/40 font-mono mt-0.5">{pos.size} @ {pos.entry.toLocaleString()}</div>
        </div>

        <div className="text-right z-10">
            <div className="font-mono font-bold text-emerald-400">+{pos.roi}%</div>
            <div className="text-[10px] text-white/30">${pos.current.toLocaleString()}</div>
        </div>
    </div>
);

export default function DATView({ engine }) {
    const [selectedStrat, setSelectedStrat] = useState(STRATEGIES[0]);
    const [paperMode, setPaperMode] = useState(true);
    const [activeTab, setActiveTab] = useState('FLOW'); // FLOW, TOPO, NODES

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col bg-[#050505] overflow-hidden">

            {/* --- HUD HEADER --- */}
            <header className="relative h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 z-20 shrink-0">
                {/* PnL Line Background */}
                <PnlHeartbeat />

                {/* Left: Branding */}
                <div className="flex items-center gap-4 z-10">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/50 rounded flex items-center justify-center">
                        <Crosshair className="text-amber-500" size={20} />
                    </div>
                    <div>
                        <h1 className="text-amber-500 font-black tracking-widest text-lg leading-none">DAT.EXEC</h1>
                        <span className="text-[10px] text-white/40 font-mono tracking-[0.2em]">DIGITAL ARBITRAGE</span>
                    </div>
                </div>

                {/* Center: Global PnL Velocity (The "Heartbeat" Value) */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="flex items-end gap-1 text-emerald-500">
                        <TrendingUp size={16} className="mb-1" />
                        <span className="text-2xl font-black font-mono tracking-tighter">+8.4%</span>
                        <span className="text-xs font-bold mb-1 opacity-70"> / 24h</span>
                    </div>
                </div>

                {/* Right: Controls & Paper Mode */}
                <div className="flex items-center gap-6 z-10">
                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-1 py-1 pr-4 border border-white/5">
                        <button
                            onClick={() => setPaperMode(!paperMode)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-2
                                ${paperMode ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-white/30 hover:text-white'}
                            `}
                        >
                            {paperMode ? <Shield size={12} /> : <Zap size={12} />}
                            {paperMode ? 'PAPER WARFARE' : 'LIVE FIRE'}
                        </button>
                    </div>

                    <div className="text-[10px] text-right font-mono text-white/30 leading-tight">
                        <div>LATENCY: <span className="text-emerald-500">14ms</span></div>
                        <div>GAS: <span className="text-amber-500">45 gwei</span></div>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="flex-1 flex overflow-hidden relative z-10">

                {/* LEFT PANEL: STRATEGY DNA */}
                <div className="w-80 bg-[#080808] border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Active Protocols</h3>
                        <div className="h-0.5 w-full bg-gradient-to-r from-amber-500/50 to-transparent" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {STRATEGIES.map(strat => (
                            <StrategyCard
                                key={strat.id}
                                strat={strat}
                                selected={selectedStrat.id === strat.id}
                                onClick={() => setSelectedStrat(strat)}
                            />
                        ))}
                    </div>
                    <div className="p-4 border-t border-white/10">
                        <button className="w-full py-3 border border-dashed border-white/20 rounded text-xs text-white/40 hover:text-white hover:border-white/50 transition-all flex items-center justify-center gap-2">
                            + NEW STRATEGY
                        </button>
                    </div>
                </div>

                {/* CENTER PANEL: VISUALIZATION DECK */}
                <div className="flex-1 flex flex-col bg-black/40 relative">
                    {/* Tab Nav */}
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                        {['FLOW', 'TOPO', 'NODES', 'SIM_RECS'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-[10px] font-bold border rounded backdrop-blur-sm transition-all
                                    ${activeTab === tab
                                        ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                                        : 'bg-black/40 border-white/10 text-white/30 hover:text-white'}
                                `}
                            >
                                {tab === 'SIM_RECS' ? 'SIM.OPTIMIZER' : tab}
                            </button>
                        ))}
                    </div>

                    {/* Visualization Area */}
                    <div className="flex-1 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeTab === 'FLOW' && (
                                <motion.div key="FLOW" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <FlowPipeline />
                                </motion.div>
                            )}
                            {activeTab === 'TOPO' && (
                                <motion.div key="TOPO" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <TopoMap />
                                </motion.div>
                            )}
                            {activeTab === 'NODES' && (
                                <motion.div key="NODES" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <NodeWeb />
                                </motion.div>
                            )}
                            {activeTab === 'SIM_RECS' && (
                                <motion.div key="SIM_RECS" className="absolute inset-0 p-10 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="w-full max-w-4xl grid grid-cols-2 gap-8">
                                        {/* SIM CONTEXT */}
                                        <div className="bg-black/40 border border-violet-500/30 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <Activity size={100} className="text-violet-500" />
                                            </div>
                                            <h3 className="text-violet-400 font-bold tracking-widest text-xs mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                                                SIMULATION INTELLIGENCE
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="p-3 bg-white/5 rounded border border-white/5">
                                                    <div className="text-[10px] text-white/40 uppercase mb-1">Source Model</div>
                                                    <div className="text-sm font-bold text-white">SCN-2025-A: Bear Market Stress</div>
                                                    <div className="text-[10px] bg-red-500/20 text-red-400 px-1 rounded w-fit mt-1">VaR: HIGH (22%)</div>
                                                </div>

                                                <div className="p-3 bg-white/5 rounded border border-white/5">
                                                    <div className="text-[10px] text-white/40 uppercase mb-1">Detected Anomaly</div>
                                                    <div className="text-sm font-bold text-white">Liq. Cascade Risk {'>'} 85%</div>
                                                    <div className="h-1 bg-gradient-to-r from-emerald-500 to-red-500 w-full mt-2 rounded-full" />
                                                    <div className="flex justify-between text-[9px] text-white/30 mt-1">
                                                        <span>Safe</span>
                                                        <span className="text-red-400 font-bold">CRITICAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* OPTIMIZATION ACTIONS */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="text-amber-500" size={16} />
                                                <h3 className="text-white font-bold tracking-widest text-xs">RECOMMENDED ACTIONS</h3>
                                            </div>

                                            {/* Action 1 */}
                                            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all cursor-pointer group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-amber-500 text-sm">Deploy Delta-Neutral Hedge</h4>
                                                    <span className="text-[10px] font-mono text-white/50 border border-white/10 px-1 rounded">PRIORITY 1</span>
                                                </div>
                                                <p className="text-[10px] text-white/60 mb-3 leading-relaxed">
                                                    Simulation indicates high correlation breakdown. Converting 30% of ETH holdings to USDC-neutral LP positions reduces VaR by 14%.
                                                </p>
                                                <button className="w-full py-2 bg-amber-500 text-black font-bold text-xs rounded opacity-80 group-hover:opacity-100 transition-opacity">
                                                    INITIALIZE STRATEGY
                                                </button>
                                            </div>

                                            {/* Action 2 */}
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-emerald-500/30 transition-all cursor-pointer group opacity-60 hover:opacity-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-emerald-400 text-sm">Scale Arbitrage Nodes</h4>
                                                    <span className="text-[10px] font-mono text-white/50 border border-white/10 px-1 rounded">PRIORITY 2</span>
                                                </div>
                                                <p className="text-[10px] text-white/60 mb-3 leading-relaxed">
                                                    Volatility forecast suggests spreads will widen by 40bps. Increasing node count maximizes capture rate.
                                                </p>
                                                <button className="w-full py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-bold text-xs rounded hover:bg-emerald-500 hover:text-black transition-all">
                                                    ALLOCATE COMPUTING
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Background Grid (Subtle) */}
                        <div className="absolute inset-0 pointer-events-none opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />
                    </div>
                </div>

                {/* RIGHT PANEL: EXECUTION & POSITIONS */}
                <div className="w-80 bg-[#080808] border-l border-white/10 flex flex-col">

                    {/* Positions List */}
                    <div className="flex-1 flex flex-col min-h-0 border-b border-white/10">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Live Positions</h3>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                2 OPEN
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {LIVE_POSITIONS.map(pos => <PositionRow key={pos.id} pos={pos} />)}
                        </div>
                    </div>

                    {/* Action Deck */}
                    <div className="p-5 bg-[#050505] space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/30">
                            <span>SESSION P&L</span>
                            <span className="text-emerald-500 text-sm font-bold">+$1,240.50</span>
                        </div>

                        {/* Safety Toggles */}
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white/60 flex items-center justify-center gap-1">
                                <Lock size={10} /> SAFETY ON
                            </button>
                            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] font-bold text-white/60 flex items-center justify-center gap-1">
                                <EyeOff size={10} /> STEALTH
                            </button>
                        </div>

                        {/* KILL SWITCH */}
                        <KillSwitch />
                    </div>
                </div>
            </div>
        </div>
    );
}
