import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ManifoldView from './ManifoldView.jsx';
import SystemTopology3D from '../../components/SystemTopology3D.jsx';
import { nsGridAreas, nsNodeCoords, nsConnections3d } from '../../data/topologyData.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';

export default function FirmamentCockpit({ activeLayers, onToggleLayer, onTileWindows, onOpenWindow }) {
    // Default to empty object if undefined
    const layers = activeLayers || {};

    // UI State for the 3D interactive map
    const [activeEngine, setActiveEngine] = useState(null);
    const [showStatusBox, setShowStatusBox] = useState(false); // Dropdown toggled off by default

    const LAYER_GROUPS = useMemo(() => [
        {
            title: "Core Infrastructure",
            items: [
                { id: 'manifold', label: 'MANIFOLD TRACER', desc: 'Engine: MT', code: 'MT' },
                { id: 'relay', label: 'RELAY', desc: 'Engine: RL', code: 'RL' },
                { id: 'entities', label: 'Entities', desc: 'Active Nodes', code: 'IDN' },
                { id: 'sectors', label: 'Sector Grid', desc: 'Geo-Spatial Mesh', code: 'GGP' },
                { id: 'apm', label: 'APM Gateway', desc: 'Policy & Routes', code: 'APM' }
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
            title: "Active Projects",
            items: NS_PROJECTS.map(proj => ({
                id: proj.code,
                label: `${proj.code} - ${proj.name}`,
                desc: proj.description || 'Active Project',
                code: proj.code // Ensure code is passed for launch button
            }))
        },
        {
            title: "Extensions (User)",
            items: [
                { id: 'custom_py', label: 'Python Analytics', desc: 'Local: main.py' },
                { id: 'custom_cpp', label: 'HFT Engine', desc: 'Native: libfast.so' }
            ]
        }
    ], []);

    const isManifoldActive = layers['manifold']; // Extract for dependency check


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
                    activeEngine={activeEngine || (isManifoldActive ? 'MT' : 'GGP')} // Highlight MTR if active
                    setActiveEngine={setActiveEngine}
                    background="transparent"
                />
            </div>

            {/* HUD / Cockpit Overlay */}
            <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none z-10">

                {/* LEFT: System Status (Read Only) */}
                <div className="pointer-events-auto flex flex-col gap-4 w-64 z-50">
                    {/* DROPDOWN TRIGGER */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowStatusBox(!showStatusBox);
                        }}
                        className="flex items-center gap-2 text-xs font-bold text-brand hover:text-white transition-colors uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg w-max"
                    >
                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                        System Online
                        <span className="text-[10px] opacity-50 ml-1">{showStatusBox ? '▲' : '▼'}</span>
                    </button>

                    {/* DROPDOWN CONTENT (SYSTEM STATUS BOX) */}
                    <AnimatePresence>
                        {showStatusBox && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -20, height: 0 }}
                                className="flex flex-col gap-4 overflow-hidden"
                            >
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
                            </motion.div>
                        )}
                    </AnimatePresence>


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
                                                    onClick={() => {
                                                        onToggleLayer(item.id);
                                                    }}
                                                    className={`
                                                    group flex flex-col p-3 rounded cursor-pointer transition-all border
                                                    ${isActive
                                                            ? 'bg-brand/10 border-brand/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                                                            : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                                `}
                                                >
                                                    {/* Header Row */}
                                                    <div className="flex items-center justify-between w-full">
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

                                                    {/* Launch Button for Windows */}
                                                    {item.code && onOpenWindow && (
                                                        <div className="mt-2 flex justify-end">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onOpenWindow(item.code);
                                                                }}
                                                                className="text-[10px] bg-brand/20 text-brand px-2 py-1 rounded hover:bg-brand hover:text-black transition-colors uppercase font-bold tracking-wider"
                                                            >
                                                                LAUNCH WINDOW
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Embedded Trace Logs for Manifold */}
                                                    {item.id === 'manifold' && isActive && (
                                                        <div className="mt-3 pt-3 border-t border-brand/20 w-full animate-in slide-in-from-top-2 duration-300">
                                                            <ManifoldView embedded={true} />
                                                        </div>
                                                    )}
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
