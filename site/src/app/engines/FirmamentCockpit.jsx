import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Activity, Layers, Server } from 'lucide-react';

const LAYER_GROUPS = [
    {
        title: "Core Infrastructure",
        items: [
            { id: 'entities', label: 'Entities', desc: 'Active Nodes' },
            { id: 'sectors', label: 'Sector Grid', desc: 'Geo-Spatial Mesh' }
        ]
    },
    {
        title: "Real-time Intelligence",
        items: [
            { id: 'events', label: 'Events Feed', desc: 'Live Signals' },
            { id: 'risks', label: 'Risk Perimeter', desc: 'Threat Detection' }
        ]
    },
    {
        title: "Extensions (User)",
        items: [
            { id: 'custom_py', label: 'Python Analytics', desc: 'Local: main.py' },
            { id: 'custom_cpp', label: 'HFT Engine', desc: 'Native: libfast.so' }
        ]
    }
];

export default function FirmamentCockpit({ activeLayers, onToggleLayer, onLaunch }) {
    // Default to empty object if undefined
    const layers = activeLayers || {};

    const [healthData, setHealthData] = useState([40, 65, 30, 80, 55, 90, 70, 45, 60, 75]);
    const [liveness, setLiveness] = useState(98.2);
    const [isStatusCollapsed, setIsStatusCollapsed] = useState(false);
    const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHealthData(prev => prev.map(h => {
                const change = (Math.random() - 0.5) * 30; // fluctuate by +/- 15
                return Math.max(20, Math.min(100, h + change));
            }));

            setLiveness(prev => {
                const change = (Math.random() - 0.5) * 0.4;
                return Math.max(95, Math.min(99.9, prev + change));
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const activeList = Object.entries(layers)
        .filter(([, isActive]) => isActive) // Changed for lint
        .map(([key]) => {
            // Find label if possible
            for (const group of LAYER_GROUPS) {
                const found = group.items.find(i => i.id === key);
                if (found) return found.label;
            }
            return key; // Fallback
        });

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: System Status (Read Only) */}
            <div
                className="pointer-events-auto flex flex-col gap-4 w-64"
                onWheel={(e) => e.stopPropagation()}
            >
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300">
                    {/* Header / Toggle */}
                    <div
                        className="p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between"
                        onClick={() => setIsStatusCollapsed(!isStatusCollapsed)}
                    >
                        <h3 className="text-xs font-bold text-brand tracking-widest uppercase flex items-center gap-2">
                            <Activity size={12} /> System Status
                        </h3>
                        {isStatusCollapsed ? <ChevronDown size={14} className="text-white/30" /> : <ChevronUp size={14} className="text-white/30" />}
                    </div>

                    {!isStatusCollapsed && (
                        <div className="p-4 space-y-4">
                            {/* Active Modules Section */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/50 mb-2 uppercase tracking-wide flex items-center gap-2">
                                    <Server size={10} /> Active Modules
                                </h4>
                                {activeList.length === 0 ? (
                                    <div className="text-white/30 text-xs italic">System Idle</div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        {activeList.map((label, i) => (
                                            <div key={i} className="flex items-center justify-between text-xs text-white/80 bg-white/5 p-2 rounded border-l-2 border-brand">
                                                <span className="font-mono">{label}</span>
                                                <span className="text-[10px] text-brand/80">ONLINE</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* System Health Section */}
                            <div>
                                <h4 className="text-[10px] font-bold text-white/50 mb-2 uppercase tracking-wide">Signal Health</h4>
                                <div className="flex items-end gap-1 h-16 mt-2">
                                    {healthData.map((h, i) => (
                                        <div key={i}
                                            className="flex-1 bg-brand rounded-t-sm transition-all duration-300 ease-in-out"
                                            style={{ height: `${h}%`, opacity: 0.3 + (h / 200) }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="text-right text-[10px] text-brand font-mono mt-1">
                                    LIVENESS: {liveness.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT: Control Plane (Selection Pane) */}
            <div
                className="pointer-events-auto flex flex-col gap-4 w-80"
                onWheel={(e) => e.stopPropagation()}
            >
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg flex flex-col max-h-[70vh] overflow-hidden transition-all duration-300">
                    <div
                        className="p-4 border-b border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-between"
                        onClick={() => setIsConfigCollapsed(!isConfigCollapsed)}
                    >
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <Layers size={12} /> Configuration
                            </h3>
                            {!isConfigCollapsed && <p className="text-[10px] text-white/50 mt-1">Manage active system layers.</p>}
                        </div>
                        {isConfigCollapsed ? <ChevronDown size={14} className="text-white/30" /> : <ChevronUp size={14} className="text-white/30" />}
                    </div>

                    {!isConfigCollapsed && (
                        <>
                            <div className="overflow-y-auto p-4 flex flex-col gap-6">
                                {LAYER_GROUPS.map((group, gIdx) => (
                                    <div key={gIdx}>
                                        <h4 className="text-[10px] font-bold text-white/40 uppercase mb-3 border-b border-white/5 pb-1">{group.title}</h4>
                                        <div className="space-y-1">
                                            {group.items.map((item) => {
                                                const isActive = layers[item.id];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => onToggleLayer(item.id)}
                                                        className={`
                                                            group flex items-center justify-between p-3 rounded cursor-pointer transition-all border
                                                            ${isActive
                                                                ? 'bg-brand/10 border-brand/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                                                                : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                                        `}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                                                                {item.label}
                                                            </span>
                                                            <span className="text-[10px] text-white/30 font-mono">{item.desc}</span>
                                                        </div>

                                                        {/* Toggle Switch Visual */}
                                                        <div className={`
                                                            w-8 h-4 rounded-full relative transition-colors duration-300
                                                            ${isActive ? 'bg-brand' : 'bg-white/20'}
                                                        `}>
                                                            <div className={`
                                                                absolute top-0.5 w-3 h-3 rounded-full bg-black shadow-sm transition-all duration-300
                                                                ${isActive ? 'left-4.5' : 'left-0.5'}
                                                            `} style={{ left: isActive ? '18px' : '2px' }} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 border-t border-white/10 bg-white/5 flex gap-2 justify-end">
                                <button
                                    onClick={onLaunch}
                                    className="text-[10px] font-bold text-white/50 hover:text-white px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all flex items-center gap-1 group"
                                >
                                    <span className="group-hover:animate-ping w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60"></span>
                                    LAUNCH
                                </button>
                                <button className="text-[10px] text-white/50 hover:text-white px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all">
                                    LOAD EXTERNAL MODULE...
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Bottom Overlay - Context Prompt */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none text-center">
            </div>
        </div>
    );
}
