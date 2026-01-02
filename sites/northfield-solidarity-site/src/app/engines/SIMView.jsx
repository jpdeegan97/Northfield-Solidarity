import React, { useState, useEffect, useMemo } from 'react';
import { Activity, Play, RefreshCw, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

// --- SYSTEM CORE: DETERMINISTIC SIMULATION ENGINE ---
const LCG = (seed) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};

const simulatePath = (seed, days, startVal, drift, vol, shockProb) => {
    const rng = LCG(seed);
    const path = [startVal];
    let current = startVal;
    for (let i = 0; i < days; i++) {
        const shock = rng() < shockProb ? 0.85 : 1.0; // 15% drop if shock
        const change = (rng() - 0.5) * vol;
        current = current * (1 + drift + change) * shock;
        path.push(current);
    }
    return path;
};

export default function SIMView({ engine }) {
    // --- STATE ---
    const [config, setConfig] = useState({
        seed: 12345,
        days: 30,
        startVal: 1000,
        drift: 0.002, // 0.2% daily
        vol: 0.05, // 5% vol
        shockProb: 0.01,
        iterations: 20
    });

    const [results, setResults] = useState({ paths: [], p50: [], p05: [], p95: [], best: 0, worst: 0, avg: 0 });
    const [isRunning, setIsRunning] = useState(false);

    // --- ENGINE LOGIC ---
    const runSimulation = () => {
        setIsRunning(true);
        // Slight delay to allow UI to show running state (simulation feel)
        setTimeout(() => {
            const newPaths = [];
            const finalValues = [];

            for (let i = 0; i < config.iterations; i++) {
                // Unique seed per path based on base seed + iteration
                const pathSeed = config.seed + i * 789;
                const path = simulatePath(pathSeed, config.days, config.startVal, config.drift, config.vol, config.shockProb);
                newPaths.push(path);
                finalValues.push(path[path.length - 1]);
            }

            // Calculate Stats (P05, P50, P95)
            // Simplified: We assume path distribution holds across time steps for visualization logic
            // Ideally we compute P-bands per day. Let's do that for the "Tunnel".
            const p50Line = [];
            const p05Line = [];
            const p95Line = [];

            for (let d = 0; d <= config.days; d++) {
                const dayValues = newPaths.map(p => p[d]).sort((a, b) => a - b);
                p05Line.push(dayValues[Math.floor(config.iterations * 0.05)]);
                p50Line.push(dayValues[Math.floor(config.iterations * 0.50)]);
                p95Line.push(dayValues[Math.floor(config.iterations * 0.95)]);
            }

            finalValues.sort((a, b) => a - b);

            setResults({
                paths: newPaths,
                p50: p50Line,
                p05: p05Line,
                p95: p95Line,
                worst: finalValues[0],
                best: finalValues[finalValues.length - 1],
                avg: finalValues.reduce((a, b) => a + b, 0) / finalValues.length
            });
            setIsRunning(false);
        }, 600);
    };

    // Auto-run on mount
    useEffect(() => {
        runSimulation();
    }, []); // eslint-disable-line

    // --- VISUALIZATION HELPERS ---
    const width = 600;
    const height = 300;
    const padding = 20;

    const getY = (val) => {
        const min = Math.min(config.startVal * 0.5, results.worst); // Anchor somewhat
        const max = Math.max(config.startVal * 1.5, results.best);
        const range = max - min || 1;
        return height - padding - ((val - min) / range) * (height - 2 * padding);
    };

    const getX = (day) => {
        return padding + (day / config.days) * (width - 2 * padding);
    };

    const makePathStr = (data) => {
        if (!data || data.length === 0) return "";
        return `M ${data.map((val, i) => `${getX(i)} ${getY(val)}`).join(' L ')}`;
    };

    const makeAreaStr = (upper, lower) => {
        if (!upper || !lower || upper.length === 0) return "";
        const top = upper.map((val, i) => `${getX(i)} ${getY(val)}`).join(' L ');
        const bottom = lower.map((val, i) => `${getX(i)} ${getY(val)}`).reverse().join(' L ');
        return `M ${top} L ${bottom} Z`;
    };

    // Theme: Violet/Purple
    const THEME = {
        primary: 'text-violet-400',
        stroke: '#a78bfa', // violet-400
        fill: '#8b5cf6', // violet-500
        bg: 'bg-violet-500/10',
        border: 'border-violet-500'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none font-mono">

            {/* LEFT: Control Plane */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/80 backdrop-blur-md border border-violet-500/30 rounded-lg p-4 flex flex-col gap-4 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity size={14} /> Model Parameters
                        </h3>
                        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-violet-400 animate-ping' : 'bg-gray-600'}`} />
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold">
                                <span>Drift (Growth)</span>
                                <span className="text-violet-300">{(config.drift * 100).toFixed(1)}%</span>
                            </div>
                            <input
                                type="range" min="-0.02" max="0.05" step="0.001"
                                value={config.drift}
                                onChange={(e) => setConfig({ ...config, drift: parseFloat(e.target.value) })}
                                className="w-full accent-violet-500 h-1 bg-white/10 rounded cursor-pointer"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold">
                                <span>Volatility</span>
                                <span className="text-violet-300">{(config.vol * 100).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range" min="0.01" max="0.20" step="0.01"
                                value={config.vol}
                                onChange={(e) => setConfig({ ...config, vol: parseFloat(e.target.value) })}
                                className="w-full accent-violet-500 h-1 bg-white/10 rounded cursor-pointer"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold">
                                <span>Black Swan Risk</span>
                                <span className="text-violet-300">{(config.shockProb * 100).toFixed(1)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="0.1" step="0.005"
                                value={config.shockProb}
                                onChange={(e) => setConfig({ ...config, shockProb: parseFloat(e.target.value) })}
                                className="w-full accent-violet-500 h-1 bg-white/10 rounded cursor-pointer"
                            />
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-white/50 uppercase font-bold">
                                <span>Iterations</span>
                                <span className="text-violet-300">{config.iterations}</span>
                            </div>
                            <input
                                type="range" min="10" max="100" step="10"
                                value={config.iterations}
                                onChange={(e) => setConfig({ ...config, iterations: parseInt(e.target.value) })}
                                className="w-full accent-violet-500 h-1 bg-white/10 rounded cursor-pointer"
                            />
                        </div>
                    </div>

                    <button
                        onClick={runSimulation}
                        disabled={isRunning}
                        className="mt-2 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-900/50 uppercase tracking-widest"
                    >
                        {isRunning ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
                        {isRunning ? 'Computing...' : 'Run Simulation'}
                    </button>

                    <div className="p-3 bg-white/5 rounded border border-white/5 flex flex-col gap-1">
                        <span className="text-[9px] uppercase text-white/40">Seed Entropy</span>
                        <div className="font-mono text-xs text-violet-300 truncate">{config.seed}</div>
                        <button onClick={() => setConfig({ ...config, seed: Math.floor(Math.random() * 100000) })} className="text-[9px] text-violet-500 hover:text-violet-400 text-left underline decoration-dotted">Randomize</button>
                    </div>
                </div>
            </div>

            {/* CENTER: Visualization */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none px-12 pb-12">
                <div className="relative w-full aspect-[2/1] bg-black/40 backdrop-blur-sm border border-violet-500/30 rounded-xl p-4 overflow-hidden group">
                    {/* Dynamic Graph */}
                    <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="simGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={THEME.fill} stopOpacity="0.4" />
                                <stop offset="100%" stopColor={THEME.fill} stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Grid Lines */}
                        <line x1="0" y1={getY(config.startVal)} x2={width} y2={getY(config.startVal)} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />

                        {/* 50% Confidence Interval Area */}
                        <path d={makeAreaStr(results.p95, results.p05)} fill="url(#simGradient)" />

                        {/* Individual Paths (Faint) */}
                        {results.paths.slice(0, 10).map((path, i) => (
                            <path key={i} d={makePathStr(path)} stroke="white" strokeOpacity="0.05" fill="none" vectorEffect="non-scaling-stroke" strokeWidth="1" />
                        ))}

                        {/* Median Path */}
                        <path d={makePathStr(results.p50)} stroke={THEME.stroke} fill="none" strokeWidth="2" />

                        {/* Worst Case */}
                        <path d={makePathStr(results.paths.find(p => p[config.days] === results.worst))} stroke="#ef4444" strokeOpacity="0.6" strokeDasharray="2 2" fill="none" strokeWidth="1" />

                    </svg>

                    {/* Overlay Stats */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                        <div className="px-2 py-1 bg-black/60 rounded border border-violet-500/30 text-xs font-bold text-violet-300">
                            P50: ${(results.avg || 0).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Results & Risk */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">

                {/* Metrics Card */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <TrendingUp size={14} className="text-violet-400" /> Outcome Range
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Best Case', val: results.best, color: 'text-emerald-400' },
                            { label: 'Median', val: results.avg, color: 'text-violet-300' },
                            { label: 'Worst Case', val: results.worst, color: 'text-red-400' }
                        ].map((item, i) => {
                            const roi = ((item.val - config.startVal) / config.startVal) * 100;
                            const isPositive = roi >= 0;
                            const roiColor = isPositive ? 'text-emerald-400' : 'text-red-500';

                            return (
                                <div key={i} className={`flex justify-between items-center p-2 bg-white/5 rounded border border-white/5 ${i === 2 ? 'border-l-red-500/50 border-l-2' : ''}`}>
                                    <span className="text-[10px] text-white/50 uppercase">{item.label}</span>
                                    <div className="text-right">
                                        <div className={`font-mono text-sm font-bold ${item.color}`}>${item.val.toFixed(0)}</div>
                                        <div className={`text-[9px] font-mono ${roiColor}`}>
                                            {isPositive ? '+' : ''}{roi.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Risk Card */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-amber-500" /> Risk Analysis
                    </h3>

                    <div className="text-[10px] font-mono text-white/70 space-y-2">
                        <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                            <div className="text-red-400 font-bold mb-1">DOWNSIDE EXPOSURE</div>
                            Value at Risk (VaR): <span className="text-white">{(100 - (results.worst / config.startVal * 100)).toFixed(1)}%</span>
                        </div>
                        <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                            <div className="text-amber-400 font-bold mb-1">VOLATILITY INDEX</div>
                            Sigma: <span className="text-white">{(config.vol * Math.sqrt(config.days)).toFixed(2)}</span>
                        </div>

                        {/* MITIGATION STRATEGIES (DAT) */}
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap size={10} className="text-amber-500" />
                                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">AI Mitigation (DAT)</span>
                            </div>

                            {(100 - (results.worst / config.startVal * 100)) > 15 ? (
                                <>
                                    <div className="p-2 bg-black/40 border border-white/10 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-white font-bold">Delta Hedge</span>
                                            <span className="text-[9px] bg-amber-500 text-black px-1 rounded font-bold">REC</span>
                                        </div>
                                        <div className="text-[9px] text-white/40 leading-tight group-hover:text-white/60">
                                            Execute delta-neutral positions to cap downside at 15%.
                                        </div>
                                    </div>
                                    <div className="p-2 bg-black/40 border border-white/10 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-white font-bold">Stop-Loss Grid</span>
                                        </div>
                                        <div className="text-[9px] text-white/40 leading-tight group-hover:text-white/60">
                                            Deploy grid orders to dampen volatility impact.
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 italic">
                                    Risk parameters within acceptable limits. No active intervention required.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
