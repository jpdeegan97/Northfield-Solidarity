import React, { useState } from 'react';
import SystemTopology3D from '../../components/SystemTopology3D.jsx';
import { nsGridAreas, nsNodeCoords, nsConnections3d } from '../../data/topologyData.js';

const LAYER_GROUPS = [
    {
        title: "Core Infrastructure",
        items: [
            { id: 'entities', label: 'Entities', desc: 'Active Nodes' },
            { id: 'sectors', label: 'Sector Grid', desc: 'Geo-Spatial Mesh' },
            { id: 'apm', label: 'APM Gateway', desc: 'Policy & Routes' }
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
            { id: 'manifold', label: 'Manifold Trace', desc: 'Engine: MTR' },
            { id: 'custom_py', label: 'Python Analytics', desc: 'Local: main.py' },
            { id: 'custom_cpp', label: 'HFT Engine', desc: 'Native: libfast.so' }
        ]
    }
];

export default function FirmamentCockpit({ activeLayers, onToggleLayer, onTileWindows }) {
    // Default to empty object if undefined
    const layers = activeLayers || {};

    // UI State for the 3D interactive map
    const [activeEngine, setActiveEngine] = useState(null);
    const [showStatusBox, setShowStatusBox] = useState(false); // Dropdown toggled off by default

    // Simulate Trace Data for the widget
    const [traceLog, setTraceLog] = React.useState([]);
    const isManifoldActive = layers['manifold']; // Extract for dependency check

    React.useEffect(() => {
        if (!isManifoldActive) return;

        const interval = setInterval(() => {
            const actions = [
                "Resolved dependency: NS-GGP-001 -> NS-IDN-AUTH",
                "Graph update: +4 nodes added from CWP",
                "Flow detected: Capital Ingress -> FLO_LEDGER",
                "Re-indexing topology sector 4...",
                "Optimizing edge weights...",
            ];
            const newAction = actions[Math.floor(Math.random() * actions.length)];
            const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
            setTraceLog(prev => [`[${timestamp}] ${newAction}`, ...prev].slice(0, 8));
        }, 1500);

        return () => clearInterval(interval);
    }, [isManifoldActive]);


    const activeList = Object.entries(layers)
        .filter((entry) => entry[1]) // entry[1] is isActive
        .map(([key]) => {
            // Find label if possible
            for (const group of LAYER_GROUPS) {
                const found = group.items.find(i => i.id === key);
                if (found) return found.label;
            }
            return key; // Fallback
        });

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/40">
            {/* 3D Topology Background */}
            <div className="absolute inset-0 z-0">
                <SystemTopology3D
                    nodes={nsGridAreas}
                    connections={nsConnections3d}
                    nodeCoords={nsNodeCoords}
                    activeEngine={activeEngine || (isManifoldActive ? 'MTR' : 'GGP')} // Highlight MTR if active
                    setActiveEngine={setActiveEngine}
                    background="transparent"
                />
            </div>

            {/* HUD / Cockpit Overlay */}
            <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none z-10">

                {/* LEFT: System Status (Read Only) */}
                <div className="pointer-events-auto flex flex-col gap-4 w-64">
                    {/* DROPDOWN TRIGGER */}
                    <button
                        onClick={() => setShowStatusBox(!showStatusBox)}
                        className="flex items-center gap-2 text-xs font-bold text-brand hover:text-white transition-colors uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg w-max"
                    >
                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        System Online
                        <span className="text-[10px] opacity-50 ml-1">{showStatusBox ? '▲' : '▼'}</span>
                    </button>

                    {/* DROPDOWN CONTENT (SYSTEM STATUS BOX) */}
                    {showStatusBox && (
                        <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 fade-in">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4">
                                <h3 className="text-xs font-bold text-white/50 mb-4 tracking-widest uppercase">
                                    Active Modules
                                </h3>

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

                            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4">
                                <h3 className="text-xs font-bold text-white/50 mb-2 tracking-widest uppercase">System Health</h3>
                                <div className="flex items-end gap-1 h-16 mt-2">
                                    {[40, 65, 30, 80, 55, 90, 70, 45, 60, 75].map((h, i) => (
                                        <div key={i}
                                            className="flex-1 bg-brand rounded-t-sm"
                                            style={{ height: `${h}%`, opacity: 0.3 + (h / 200) }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="text-right text-[10px] text-brand font-mono mt-1">LIVENESS: 98.2%</div>
                            </div>
                        </div>
                    )}

                    {/* MANIFOLD TRACER WIDGET */}
                    {layers['manifold'] && (
                        <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg p-4 animate-in slide-in-from-left-4 duration-500">
                            <h3 className="text-xs font-bold text-emerald-400 mb-2 tracking-widest uppercase flex items-center justify-between">
                                <span>Manifold Trace</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#00ff9d]"></div>
                            </h3>
                            <div className="h-40 overflow-hidden relative font-mono text-[9px] text-emerald-400/80 leading-tight">
                                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                                <div className="flex flex-col gap-1.5">
                                    {traceLog.length === 0 && <span className="opacity-50 italic">Initializing stream...</span>}
                                    {traceLog.map((log, i) => (
                                        <div key={i} className="truncate border-l border-emerald-500/20 pl-2 opacity-80 hover:opacity-100">
                                            {log}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: Control Plane (Selection Pane) */}
                <div className="pointer-events-auto flex flex-col gap-4 w-80">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg flex flex-col max-h-[70vh] overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Configuration</h3>
                            <p className="text-[10px] text-white/50 mt-1">Manage active system layers and extensions.</p>
                        </div>

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
                                onClick={onTileWindows}
                                className="text-[10px] text-white/50 hover:text-[#00ff9d] px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-[#00ff9d]/30 transition-all uppercase font-bold tracking-wider"
                            >
                                GRID LAYOUT
                            </button>
                            <button className="text-[10px] text-white/50 hover:text-white px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all uppercase">
                                LOAD EXTERNAL MODULE...
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Overlay - Context Prompt */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                </div>
            </div>
        </div>
    );
}
