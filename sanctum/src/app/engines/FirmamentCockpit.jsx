import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ManifoldView from './ManifoldView.jsx';
import { ALL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';

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
        title: "Active Engines",
        items: ALL_ENGINES.map(eng => ({
            id: eng.code,
            label: `${eng.code} - ${eng.name}`,
            desc: eng.category || 'Engine Unit'
        }))
    },
    {
        title: "Active Projects",
        items: NS_PROJECTS.map(proj => ({
            id: proj.code,
            label: `${proj.code} - ${proj.name}`,
            desc: proj.description || 'Active Project'
        }))
    }
];

export default function FirmamentCockpit({ activeLayers, onToggleLayer, onTileWindows, onLaunch }) {
    // Default to empty object if undefined
    const layers = activeLayers || {};

    const [showStatusBox, setShowStatusBox] = useState(false); // Dropdown toggled off by default
    const [isHudVisible, setIsHudVisible] = useState(true);

    const [healthValues, setHealthValues] = useState(() => Array(10).fill(50));

    // Animate health bars randomly
    React.useEffect(() => {
        if (!showStatusBox) return;

        const interval = setInterval(() => {
            setHealthValues(current => current.map(() => Math.floor(Math.random() * (100 - 30 + 1)) + 30));
        }, 800);

        return () => clearInterval(interval);
    }, [showStatusBox]);

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
        <div
            className={`absolute inset-0 w-full h-full overflow-hidden transition-colors duration-500 ${isHudVisible ? 'bg-black/40' : 'bg-black/0'}`}
            onWheel={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
        >
            {/* 3D Topology Background handled by ProductCanvas (no internal 3D scene here) */}

            {/* HUD / Cockpit Overlay */}
            <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 z-10 pointer-events-none">

                {/* LEFT: System Status */}
                <div className="flex flex-col gap-4 w-64 z-50 pointer-events-auto">

                    {/* MASTER VISIBILITY TOGGLE - ALWAYS VISIBLE */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsHudVisible(!isHudVisible);
                        }}
                        className={`p-2 rounded-full border transition-all flex items-center gap-2 group w-max ${isHudVisible ? 'bg-[#00ff9d] text-black border-[#00ff9d] shadow-[0_0_20px_rgba(0,255,157,0.3)]' : 'bg-black/40 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'}`}
                        title={isHudVisible ? "Hide Firmament" : "Show Firmament"}
                    >
                        {isHudVisible ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                        )}
                        <span className="text-[10px] font-bold pr-1">FIRMAMENT</span>
                    </button>

                    {/* FADABLE LEFT CONTENT */}
                    <div className={`flex flex-col gap-4 transition-all duration-500 ${isHudVisible ? 'opacity-100' : 'opacity-5 pointer-events-none filter blur-sm'}`}>
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
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="flex flex-col gap-4 overflow-hidden"
                                >
                                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 max-h-[40vh] overflow-y-auto">
                                        <h3 className="text-xs font-bold text-white/50 mb-4 tracking-widest uppercase sticky top-0 bg-black/60 backdrop-blur-md pb-2 -mt-2 pt-2 z-10">
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
                                        {/* Dynamic Health Bars */}
                                        <div className="flex items-end gap-1 h-16 mt-2">
                                            {healthValues.map((h, i) => (
                                                <div key={i}
                                                    className="flex-1 bg-brand rounded-t-sm transition-all duration-700 ease-in-out"
                                                    style={{
                                                        height: `${h}%`,
                                                        opacity: 0.3 + (h / 200)
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-right text-[10px] text-brand font-mono mt-1">LIVENESS: 98.2%</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT: Control Plane (Selection Pane) */}
                <div className={`pointer-events-auto flex flex-col gap-4 w-80 transition-all duration-500 ${isHudVisible ? 'opacity-100' : 'opacity-5 pointer-events-none filter blur-sm'}`}>
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
                                                        const isLaunchable = (group.title === "Active Engines" || group.title === "Active Projects");
                                                        if (isLaunchable && onLaunch) {
                                                            onLaunch(item.id);
                                                        } else {
                                                            onToggleLayer(item.id);
                                                        }
                                                    }}
                                                    className={`
                                                    group flex flex-col p-3 rounded cursor-pointer transition-all border
                                                    ${isActive
                                                            ? 'bg-brand/10 border-brand/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                                                            : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                                `}
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="flex flex-col">
                                                            <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
                                                                {item.label}
                                                            </span>
                                                            <span className="text-[10px] text-white/30 font-mono">{item.desc}</span>
                                                        </div>

                                                        {/* Toggle Switch Visual */}
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onToggleLayer(item.id);
                                                            }}
                                                            className={`
                                                            w-8 h-4 rounded-full relative transition-colors duration-300
                                                            ${isActive ? 'bg-brand' : 'bg-white/20'}
                                                            hover:opacity-80
                                                        `}>
                                                            <div className={`
                                                            absolute top-0.5 w-3 h-3 rounded-full bg-black shadow-sm transition-all duration-300
                                                            ${isActive ? 'left-4.5' : 'left-0.5'}
                                                        `} style={{ left: isActive ? '18px' : '2px' }} />
                                                        </div>
                                                    </div>

                                                    {/* Embedded Trace Logs for Manifold */}
                                                    {item.id === 'MT' && isActive && (
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
