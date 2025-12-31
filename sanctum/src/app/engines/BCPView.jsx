import React, { useState, useEffect } from 'react';
import { BCP_ASSETS, BCP_TYPES } from '../../data/bcpRegistry';
import {
    Database, Shield, Globe, Zap, Archive,
    X, Activity, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS = {
    Database, Shield, Globe, Zap, Archive
};

const EMERGENCY_PROTOCOLS = [
    { id: 'P-99', name: 'Circuit Breaker (Global)', triggered: false, impact: 'Total Halt' },
    { id: 'P-22', name: 'Data Vault Lock', triggered: false, impact: 'Read-Only' },
    { id: 'P-11', name: 'Failover to EU-West', triggered: false, impact: 'High Latency' },
];

// Helper for live simulating metrics
function LiveMetric({ unit }) {
    const [val, setVal] = useState(() => Math.floor(Math.random() * 100));

    useEffect(() => {
        const interval = setInterval(() => {
            setVal(Math.floor(Math.random() * 100));
        }, 2000 + Math.random() * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-xl font-mono text-white flex items-end gap-1">
            {val}
            <span className="text-xs text-white/30 mb-1">{unit}</span>
        </div>
    );
}

export default function BCPView() {
    const [selectedAsset, setSelectedAsset] = useState(null); // For the detailed overlay
    const [highlightedId, setHighlightedId] = useState(null); // For hover/list selection

    // Theme: Safety Orange
    const THEME = {
        primary: 'text-orange-500',
        bg: 'bg-orange-600',
        border: 'border-orange-500/50',
        hoverBorder: 'hover:border-orange-500/50',
        glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
        bgSoft: 'bg-orange-950/40'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: System Vitals */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Continuity Grid
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">STATUS: STABLE</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 overflow-y-auto pr-2">
                        {BCP_ASSETS.map((asset) => {
                            const typeConfig = BCP_TYPES[asset.type] || {};
                            const Icon = ICONS[typeConfig.icon] || Activity;
                            const isSelected = selectedAsset?.id === asset.id || highlightedId === asset.id;
                            const statusColor = asset.status === 'HEALTHY' ? 'text-emerald-400' :
                                asset.status === 'DEGRADED' ? 'text-orange-400' : 'text-white/40';

                            return (
                                <div
                                    key={asset.id}
                                    onClick={() => setSelectedAsset(asset)}
                                    onMouseEnter={() => setHighlightedId(asset.id)}
                                    onMouseLeave={() => setHighlightedId(null)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    {/* Type Icon Background */}
                                    <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                                        <Icon size={64} className="text-white" />
                                    </div>

                                    {/* Status Stripe */}
                                    <div className={`absolute top-0 left-0 w-0.5 h-full ${asset.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-orange-500'}`} />

                                    <div className="flex justify-between items-start mb-1 pl-2">
                                        <h4 className="text-xs font-bold text-white group-hover:text-orange-200">{asset.system}</h4>
                                        <span className={`text-[9px] font-mono ${statusColor}`}>{asset.status}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pl-2 text-[10px] text-white/50 font-mono">
                                        <span>latency: {asset.latency}</span>
                                        <span>redundancy: {asset.redundancy}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Overlay Modal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <AnimatePresence>
                    {selectedAsset && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="pointer-events-auto w-[600px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg bg-${BCP_TYPES[selectedAsset.type]?.color || 'gray'}-500/20 text-${BCP_TYPES[selectedAsset.type]?.color || 'gray'}-400`}>
                                        {(() => {
                                            const Icon = ICONS[BCP_TYPES[selectedAsset.type]?.icon] || Activity;
                                            return <Icon size={24} />;
                                        })()}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white tracking-wide">{selectedAsset.system}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono uppercase">
                                                {selectedAsset.type}
                                            </span>
                                            <span className={`text-[10px] font-mono ${selectedAsset.status === 'HEALTHY' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                                {selectedAsset.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedAsset(null)}
                                    className="text-white/30 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Metrics Grid */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Real-time Telemetry</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {BCP_TYPES[selectedAsset.type]?.metrics.map((metric, i) => (
                                            <div key={i} className="bg-white/5 rounded p-3 border border-white/5">
                                                <div className="text-[10px] text-white/40 mb-1">{metric.label}</div>
                                                <LiveMetric unit={metric.unit} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Details & Actions */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Configuration</h4>
                                        <div className="space-y-2 text-xs font-mono">
                                            {Object.entries(selectedAsset.details || {}).map(([k, v]) => (
                                                <div key={k} className="flex justify-between border-b border-white/5 pb-1">
                                                    <span className="text-white/40 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                                                    <span className="text-white/80">{v}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between border-b border-white/5 pb-1">
                                                <span className="text-white/40">Region</span>
                                                <span className="text-white/80">{selectedAsset.region}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Manual Override</h4>
                                        <div className="flex flex-col gap-2">
                                            {BCP_TYPES[selectedAsset.type]?.actions.map((action, i) => (
                                                <button key={i} className="flex items-center gap-2 p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-all text-left group">
                                                    <Terminal size={14} className="opacity-50 group-hover:opacity-100" />
                                                    {action}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-white/5 p-3 flex justify-between items-center text-[10px] font-mono text-white/30 border-t border-white/10">
                                <span>ID: {selectedAsset.id}</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    LIVE CONNECTION
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT: Emergency Controls */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Drill Status */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Last Drill</h3>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-emerald-400">PASSED</span>
                        <span className="text-[10px] text-white/40">14 days ago</span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed border-t border-white/10 pt-2">
                        Simulated outages in US-EAST region. Automatic failover to EU-WEST completed in 4.2 seconds. No data loss.
                    </p>
                </div>

                {/* Bottom: Protocols */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Emergency Protocols</h3>
                    <div className="space-y-3">
                        {EMERGENCY_PROTOCOLS.map((proto) => (
                            <div key={proto.id} className="flex justify-between items-center p-3 border border-white/10 rounded bg-white/5">
                                <div>
                                    <div className="text-xs font-bold text-white">{proto.name}</div>
                                    <div className="text-[9px] text-white/40">Impact: {proto.impact}</div>
                                </div>
                                <div className="h-4 w-8 rounded-full bg-white/10 border border-white/10 relative cursor-pointer hover:bg-white/20">
                                    <div className="absolute left-0.5 top-0.5 h-3 w-3 bg-white/40 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
