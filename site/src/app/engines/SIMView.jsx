import React, { useState } from 'react';

// Mock Data: Scenarios
const SCENARIOS = [
    { id: 'SCN-2025-A', name: 'Bear Market Stress Test', status: 'COMPLETED', outcome: 'SURVIVAL', score: 92, runtime: '4m 12s' },
    { id: 'SCN-2025-B', name: 'Hyper-Growth (10x User Load)', status: 'RUNNING', outcome: 'PENDING', score: '-', runtime: '1m 45s' },
    { id: 'SCN-2025-C', name: 'Regulatory Crackdown (US)', status: 'QUEUED', outcome: '-', score: '-', runtime: '-' },
];

const FORECASTS = [
    { metric: 'Treasury Runway', current: '18 mo', projected: '14 mo', delta: '-22%' },
    { metric: 'Server Load', current: '45%', projected: '88%', delta: '+95%' },
    { metric: 'Token Price', current: '$1.20', projected: '$3.50', delta: '+191%' },
];

export default function SIMView({ engine }) {
    const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);

    // Theme: Violet/Purple for "Future/What-If/Simulation"
    const THEME = {
        primary: 'text-violet-400',
        bg: 'bg-violet-500',
        border: 'border-violet-500/50',
        hoverBorder: 'hover:border-violet-500/50',
        glow: 'shadow-[0_0_15px_rgba(139,92,246,0.2)]',
        bgSoft: 'bg-violet-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Scenario Queue */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Simulations
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">2 Active</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {SCENARIOS.map((scn) => {
                            const isSelected = selectedScenario.id === scn.id;
                            const statusColor = scn.status === 'COMPLETED' ? 'text-emerald-400' :
                                scn.status === 'RUNNING' ? 'text-violet-400' : 'text-white/30';

                            return (
                                <div
                                    key={scn.id}
                                    onClick={() => setSelectedScenario(scn)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-white/40">{scn.id}</span>
                                        {scn.status === 'RUNNING' && <span className="text-[9px] animate-pulse text-violet-400">PROCESSING</span>}
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-2">{scn.name}</h4>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                        <span className={`text-[10px] font-bold ${statusColor}`}>{scn.status}</span>
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                                            <span>Score: <span className="text-white">{scn.score}</span></span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="mt-4 w-full py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all">
                        <span>+</span> NEW SCENARIO
                    </button>
                </div>
            </div>

            {/* CENTER: Visualization Placeholder (e.g. Monte Carlo distribution graph) */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-40">
                {/* 3D Graph placeholder */}
            </div>

            {/* RIGHT: Projection Results */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Selected Results */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Projected Impact</h3>
                    <p className="text-[10px] text-white/40 mb-4">Delta vs Current Reality (based on {selectedScenario.name})</p>

                    <div className="space-y-3">
                        {FORECASTS.map((fc, i) => {
                            const isPositive = fc.delta.startsWith('+');
                            // In this context, green isn't always good (e.g. load), but let's assume directionality context for color later.
                            // For visual simplicity: Violet = Projected change.
                            return (
                                <div key={i} className="flex flex-col p-2 bg-white/5 rounded border border-white/5 relative overflow-hidden">
                                    <div className="flex justify-between items-center z-10">
                                        <span className="text-xs text-white/70">{fc.metric}</span>
                                        <span className="text-xs font-bold text-violet-300">{fc.delta}</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-1 z-10">
                                        <div className="text-[10px] text-white/30">NOW: {fc.current}</div>
                                        <div className="text-sm font-mono text-white">{fc.projected}</div>
                                    </div>
                                    {/* Simple bar visual */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-violet-500/20 w-full">
                                        <div className="bg-violet-500 h-full" style={{ width: '60%' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom: Parameters */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Model Parameters</h3>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 bg-white/5 rounded text-white/60">BTC_PRICE: <span className="text-white">$150k</span></div>
                        <div className="p-2 bg-white/5 rounded text-white/60">USER_CHURN: <span className="text-white">2.5%</span></div>
                        <div className="p-2 bg-white/5 rounded text-white/60">AWS_COST: <span className="text-white">+15%</span></div>
                        <div className="p-2 bg-white/5 rounded text-white/60">REG_RISK: <span className="text-white">HIGH</span></div>
                    </div>
                </div>

            </div>

        </div>
    );
}
