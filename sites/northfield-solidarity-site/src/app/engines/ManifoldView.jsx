import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Zap, Network, Share2, Database, Search } from 'lucide-react';

export default function ManifoldView({ engine, embedded }) {
    const [flowState] = useState(74); // 0-100
    const [sessionTime, setSessionTime] = useState(0);

    useEffect(() => {
        console.log("ManifoldView Mounted. Embedded:", embedded);
    }, [embedded]);
    const [traceLog, setTraceLog] = useState([]);
    const [nodeCount, setNodeCount] = useState(1243);
    const [edgeCount, setEdgeCount] = useState(3892);

    // Simulate session timer
    useEffect(() => {
        const timer = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate trace log activity
    useEffect(() => {
        const interval = setInterval(() => {
            const actions = [
                "Resolved dependency: NS-GGP-001 -> NS-IDN-AUTH",
                "Traced entity: JP_DEEGAN (Owner)",
                "Graph update: +4 nodes added from CWP",
                "Flow detected: Capital Ingress -> FLO_LEDGER",
                "Re-indexing topology sector 4...",
                "Optimizing edge weights...",
                "Latency check: 12ms",
                "Signal ingested: MARKET_OPEN",
            ];
            const newAction = actions[Math.floor(Math.random() * actions.length)];
            const timestamp = new Date().toISOString().split('T')[1].split('.')[0];

            setTraceLog(prev => [{ id: Date.now() + Math.random(), text: `[${timestamp}] ${newAction}` }, ...prev].slice(0, 15));

            // Occasionally bump stats
            if (Math.random() > 0.7) {
                setNodeCount(c => c + 1);
                setEdgeCount(c => c + Math.floor(Math.random() * 3));
            }

        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Inject custom scrollbar styles dynamically
    useEffect(() => {
        const styleId = 'manifold-scrollbar-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `;
            document.head.appendChild(style);
        }
    }, []);



    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (embedded) {
        return (
            <div className="flex flex-col gap-3 font-mono">
                {/* Stats Row */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/5 rounded border border-white/10 p-2 flex flex-col items-center">
                        <span className="text-[9px] text-white/40 uppercase">Nodes</span>
                        <span className="text-sm text-white">{nodeCount}</span>
                    </div>
                    <div className="flex-1 bg-white/5 rounded border border-white/10 p-2 flex flex-col items-center">
                        <span className="text-[9px] text-white/40 uppercase">Edges</span>
                        <span className="text-sm text-white">{edgeCount}</span>
                    </div>
                </div>

                {/* Flow State Mini */}
                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded p-2 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Flow State</span>
                    <span className="text-xs text-emerald-300">{flowState}%</span>
                </div>

                {/* Live Trace Log (Compact) */}
                <div className="bg-black rounded-lg border border-white/10 p-2 h-48 overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 bg-white/5 border-b border-white/10 p-1.5 flex justify-between items-center z-10 px-3">
                        <span className="text-white/60 uppercase tracking-wider text-[8px]">Live Feed</span>
                        <div className="flex gap-1.5 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-emerald-500 text-[8px]">ON</span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-1 h-full overflow-y-auto pb-2 custom-scrollbar">
                        {traceLog.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-white/70 border-l border-white/10 pl-2 py-0.5 text-[9px] truncate hover:text-white transition-colors"
                            >
                                <span className="text-emerald-500/50 mr-1">{log.text.split(']')[0]}]</span>
                                <span>{log.text.split(']')[1]}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full p-8 md:p-12 overflow-y-auto bg-[#09090b] text-white">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Network size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-wide">MANIFOLD TRACER</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                                System Active
                            </span>
                            <span className="text-xs text-white/40 font-mono">NS-MT-001 // v0.1.4</span>
                        </div>
                    </div>
                </div>
                <p className="text-white/50 max-w-2xl text-sm">
                    {engine?.description || "Business Graph Extraction & Topology Engine. Mapping the invisible kinetics of the Northfield Solidarity ecosystem."}
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* LEFT COL: Productivity / Flow */}
                <div className="lg:col-span-1 flex flex-col gap-6">

                    {/* Flow State Gauge */}
                    <div className="bg-black/40 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    <Zap size={16} className="text-emerald-400" />
                                    Flow State
                                </h3>
                                <p className="text-white/30 text-xs mt-1">Real-time deep work quantification</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-emerald-400">{flowState}%</span>
                            </div>
                        </div>

                        {/* Visual Gauge Bar */}
                        <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-2">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-900 to-emerald-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${flowState}%` }}
                                transition={{ type: 'spring', stiffness: 50 }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-white/30 font-mono">
                            <span>IDLE</span>
                            <span>OPTIMAL</span>
                            <span>OVERDRIVE</span>
                        </div>
                    </div>

                    {/* Session Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-white/60 mb-2">
                                <Clock size={14} />
                                <span className="text-xs uppercase tracking-wider">Session</span>
                            </div>
                            <div className="text-2xl font-mono text-white">
                                {formatTime(sessionTime)}
                            </div>
                        </div>
                        <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-white/60 mb-2">
                                <Activity size={14} />
                                <span className="text-xs uppercase tracking-wider">Velocity</span>
                            </div>
                            <div className="text-2xl font-mono text-white">
                                42 <span className="text-xs text-white/30">ops/hr</span>
                            </div>
                        </div>
                    </div>

                    {/* Output Velocity Chart (Mock) */}
                    <div className="bg-black/40 border border-white/5 rounded-xl p-6 flex-1">
                        <h3 className="text-white font-medium text-sm mb-4">Output Velocity (7 Days)</h3>
                        <div className="flex items-end justify-between gap-2 h-32">
                            {[35, 55, 40, 70, 85, 60, 75].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div
                                        className="w-full bg-emerald-500/20 border-t border-emerald-500/50 rounded-t-sm transition-all group-hover:bg-emerald-500/40 relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-white/30">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Tracer & Topology */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Topology Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Cached Nodes</p>
                                <p className="text-2xl font-mono text-white">{nodeCount.toLocaleString()}</p>
                            </div>
                            <Database size={20} className="text-white/20" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Active Edges</p>
                                <p className="text-2xl font-mono text-white">{edgeCount.toLocaleString()}</p>
                            </div>
                            <Share2 size={20} className="text-white/20" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Pending Scrapes</p>
                                <p className="text-2xl font-mono text-yellow-500">14</p>
                            </div>
                            <Search size={20} className="text-white/20" />
                        </div>
                    </div>

                    {/* Live Trace Log */}
                    <div className="flex-1 bg-black rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden relative">
                        <div className="absolute top-0 left-0 right-0 bg-white/5 border-b border-white/10 p-2 flex justify-between items-center z-10 px-4">
                            <span className="text-white/60 uppercase tracking-wider text-[10px]">Live Trace Output</span>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-emerald-500">LISTENING</span>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-1 h-full overflow-y-auto pb-4 custom-scrollbar">
                            {traceLog.map((log) => (
                                <div
                                    key={log.id}
                                    className="text-white/70 border-l border-white/10 pl-3 py-1 hover:bg-white/5 hover:text-white transition-colors cursor-default animate-in fade-in slide-in-from-left-2 duration-300"
                                >
                                    <span className="text-emerald-500/50 mr-2">{log.text.split(']')[0]}]</span>
                                    <span>{log.text.split(']')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graph Visualizer: Northfield Solidarity Organization Topology */}
                    <div className="h-96 bg-black/40 border border-white/5 rounded-xl p-4 relative overflow-hidden group">

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                        {/* Graph Container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <TopologyGraph />
                        </div>

                        {/* Overlay: Legend/Controls */}
                        <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end pointer-events-none">
                            <div className="bg-black/80 backdrop-blur border border-white/10 rounded-lg p-2 text-[10px] text-white/50 font-mono">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full border border-emerald-400 bg-emerald-500/20"></div>
                                    <span>Active Entity</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full border border-blue-400 bg-blue-500/20"></div>
                                    <span>Asset / IP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}



function TopologyGraph() {
    // Mock Data for the Graph
    const nodes = [
        { id: 'NS_LLC', label: 'Northfield Solidarity LLC', type: 'ENTITY', x: 400, y: 50 },
        { id: 'IP_HOLD', label: 'NSDC IP Holdings LLC', type: 'ENTITY', x: 600, y: 150 },
        { id: 'MGMT', label: 'NS MGMT LLC', type: 'ENTITY', x: 200, y: 150 },
        { id: 'SANCTUM', label: 'Sanctum Platform', type: 'ASSET', x: 400, y: 200 },
        { id: 'MT', label: 'Manifold Tracer', type: 'ASSET', x: 300, y: 300 },
        { id: 'FLO', label: 'Flow Engine', type: 'ASSET', x: 500, y: 300 },
        { id: 'GGP', label: 'Governance Graph', type: 'ASSET', x: 400, y: 280 },
    ];

    const edges = [
        { from: 'NS_LLC', to: 'IP_HOLD' },
        { from: 'NS_LLC', to: 'MGMT' },
        { from: 'IP_HOLD', to: 'SANCTUM' },
        { from: 'SANCTUM', to: 'MT' },
        { from: 'SANCTUM', to: 'GGP' },
        { from: 'SANCTUM', to: 'FLO' },
    ];

    // SVG Viewbox dimensions
    const width = 800;
    const height = 400;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {/* Edges */}
            {edges.map((edge, i) => {
                const source = nodes.find(n => n.id === edge.from);
                const target = nodes.find(n => n.id === edge.to);
                if (!source || !target) return null;
                return (
                    <motion.line
                        key={i}
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => (
                <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.1 }}
                >
                    {/* Pulsing Ripple for Entities */}
                    {node.type === 'ENTITY' && (
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="6"
                            fill="transparent"
                            stroke={node.id === 'NS_LLC' ? '#10b981' : '#3b82f6'} // Emerald or Blue
                            strokeWidth="1"
                            animate={{ r: [6, 12], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    )}

                    {/* Node Circle */}
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill={node.type === 'ENTITY' ? '#10b981' : '#3b82f6'} // Emerald for Entity, Blue for Asset
                        className="cursor-pointer hover:fill-white transition-colors"
                    />

                    {/* Label */}
                    <text
                        x={node.x}
                        y={node.y + 15}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.6)"
                        fontSize="8"
                        fontFamily="monospace"
                        className="pointer-events-none select-none uppercase tracking-wider"
                    >
                        {node.label}
                    </text>
                </motion.g>
            ))}
        </svg>
    );
}
