import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ManifoldView from './ManifoldView.jsx';
// optimized topology replaces SystemTopology3D
import OptimizedTopology from '../../components/OptimizedTopology.jsx';
import { getNSTopology } from '../../data/topologyData.js';

// --- LIST DEFINITIONS ---
const LISTS = {
    NS_ENGINES: ['APM', 'BCO', 'CDE', 'CON', 'CWP', 'DAT', 'DRE', 'FLO', 'GGP', 'IDN', 'INT', 'IPR', 'LUM', 'MUX', 'OCP', 'PIE', 'QTN', 'SIG', 'SIM', 'SWB'],
    SL_ENGINES: ['MRFPE', 'PECA', 'PTE'],
    PROJECT: [
        'NEIGHBORS', 'BOOMERANG', 'BUDDY BUDDY', 'CHRONICLE', 'CRUCIBLE', 'DEAL ATLAS', 'DOPEY',
        'DUCT TAPE', 'FIRMAMENT', 'HOT POTATO', 'INCEPTION', 'INCUBATOR', 'INVERSE',
        'MANIFOLD TRACER', 'MINDMIX', 'MINT', 'NUMBEROLOGY', 'FANTASY LAND', 'RELAY',
        'ROAM', 'TINE', 'WISHLIST', 'WPV'
    ]
};

// Start with basic map, will be augmented by registry data
// Used for display resolution fallback
const MANUAL_DEFINITIONS = {
    'CDE': { name: 'Code Delivery Engine', category: 'DevOps' },
    'BUDDY BUDDY': { name: 'Buddy Buddy', category: 'Social', code: 'BB' },
    'NEIGHBORS': { name: 'Neighbors', category: 'Project', code: 'NBR' },
    'CRUCIBLE': { name: 'Crucible', category: 'Test' },
    'DOPEY': { name: 'Dopey', category: 'Agent' },
    'MINDMIX': { name: 'MindMix', category: 'Research' },
    'BOOMERANG': { code: 'BOOM' }, // Alias
    'DUCT TAPE': { code: 'DT' },
    'INCEPTION': { code: 'INCP' },
    'INCUBATOR': { code: 'INC' },
    'INVERSE': { code: 'INV' },
    'MANIFOLD TRACER': { code: 'MT' },
    'FANTASY LAND': { code: 'FL' },
    'RELAY': { code: 'RL' },
    'DEAL ATLAS': { code: 'DA' },
    'DIGITAL ARBITRAGE TOOLING': { code: 'DAT' },
    'CHRONICLE': { code: 'CRN' },
    'FIRMAMENT': { code: 'FRMT' },
    'HOT POTATO': { code: 'HP' },
    'NUMBEROLOGY': { code: 'NUM' },
    'VANTAGE CAPITAL': { code: 'VC' }
};

export default function FirmamentCockpit({ activeLayers, onToggleLayer, onTileWindows, onOpenWindow }) {
    // Default to empty object if undefined
    const layers = activeLayers || {};

    // UI State
    const [activeEngine, setActiveEngine] = useState(null);
    const [showStatusBox, setShowStatusBox] = useState(false);
    const [activeTab, setActiveTab] = useState('ALL'); // ALL, NS, SL, PROJ, ENGINES
    const [searchTerm, setSearchTerm] = useState('');

    // Generate Safe, Dynamic Topology Data
    const { nodes: allNodes, connections: safeConnections, nodeCoords } = useMemo(() => {
        return getNSTopology();
    }, []);

    // Resolve items for the list
    const resolveItem = (identifier) => {
        // 1. Check Mapping
        const fromMap = allNodes.find(n => n.code === identifier || n.label === identifier);

        if (fromMap) {
            return {
                id: fromMap.code,
                label: fromMap.label,
                desc: fromMap.category,
                code: fromMap.code,
                category: fromMap.category
            };
        }

        // 2. Check Manual definitions (aliases)
        const manual = MANUAL_DEFINITIONS[identifier];
        if (manual) {
            return {
                id: identifier, // fallback
                label: manual.name || identifier,
                desc: manual.category || 'System Node',
                code: manual.code || identifier,
                category: manual.category || 'Unknown'
            };
        }

        // Fallback
        return {
            id: identifier, // fallback ID
            label: identifier,
            desc: 'System Node',
            code: identifier,
            category: 'Unknown'
        };
    };

    // Build the lists based on tabs
    const visibleItems = useMemo(() => {
        let items = [];

        const getItems = (arr) => arr.map(id => resolveItem(id));

        if (activeTab === 'ALL') {
            const set = new Set([...LISTS.NS_ENGINES, ...LISTS.SL_ENGINES, ...LISTS.PROJECT]);
            items = getItems(Array.from(set));
        } else if (activeTab === 'NS_ENGINES') {
            items = getItems(LISTS.NS_ENGINES);
        } else if (activeTab === 'SL_ENGINES') {
            items = getItems(LISTS.SL_ENGINES);
        } else if (activeTab === 'PROJECT') {
            items = getItems(LISTS.PROJECT);
        } else if (activeTab === 'ENGINES') {
            items = getItems([...LISTS.NS_ENGINES, ...LISTS.SL_ENGINES]);
        }

        // Filter by search
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            items = items.filter(i =>
                i.label.toLowerCase().includes(lower) ||
                i.id.toLowerCase().includes(lower) ||
                i.desc.toLowerCase().includes(lower)
            );
        }

        return items;
    }, [activeTab, searchTerm, allNodes]);

    const isManifoldActive = layers['MT'] || layers['manifold'];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/40">
            {/* 3D Topology Background */}
            <div className="absolute inset-0 z-0">
                <OptimizedTopology
                    nodes={allNodes}
                    connections={safeConnections}
                    nodeCoords={nodeCoords}
                    activeEngine={activeEngine || (isManifoldActive ? 'MT' : 'GGP')}
                    setActiveEngine={setActiveEngine}
                />
            </div>

            {/* HUD / Cockpit Overlay */}
            <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none z-10">

                {/* LEFT: System Status */}
                <div className="pointer-events-auto flex flex-col gap-4 w-64 z-50">
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
                                    {Object.keys(layers).filter(k => layers[k]).length === 0 ? (
                                        <div className="text-white/30 text-xs italic">System Idle</div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            {Object.keys(layers).filter(k => layers[k]).map((k, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs text-white/80 bg-white/5 p-2 rounded border-l-2 border-brand">
                                                    <span className="font-mono">{k}</span>
                                                    <span className="text-[10px] text-brand/80">ONLINE</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT: Control Plane (Tabs) */}
                <div className="pointer-events-auto flex flex-col gap-4 w-96">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg flex flex-col max-h-[85vh] overflow-hidden">

                        {/* Header & Tabs */}
                        <div className="border-b border-white/10 bg-white/5">
                            <div className="p-4 pb-2">
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Firmament Picker</h3>
                            </div>

                            {/* Scrollable Tabs */}
                            <div className="flex overflow-x-auto custom-scrollbar px-2 pb-0">
                                {['ALL', 'NS_ENGINES', 'SL_ENGINES', 'PROJECT', 'ENGINES'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`
                                            px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap
                                            ${activeTab === tab ? 'border-brand text-white' : 'border-transparent text-white/50 hover:text-white'}
                                        `}
                                    >
                                        {tab.replace('_', ' ').replace('ENGINES', 'ENG')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="p-2 border-b border-white/10">
                            <input
                                type="text"
                                placeholder="Filter nodes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-brand focus:outline-none"
                            />
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto p-2 flex flex-col gap-2 flex-grow">
                            {visibleItems.map((item, idx) => {
                                const isActive = layers[item.id] || (item.id === 'MT' && layers['manifold']); // Support fallback for manifold legacy ID
                                return (
                                    <div
                                        key={`${item.id}-${idx}`}
                                        onClick={() => onToggleLayer(item.id)}
                                        className={`
                                            group flex flex-col p-3 rounded cursor-pointer transition-all border
                                            ${isActive
                                                ? 'bg-brand/10 border-brand/50 shadow-[0_0_10px_rgba(0,255,157,0.1)]'
                                                : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                        `}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-col overflow-hidden">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-white/60'}`}>
                                                        {item.label}
                                                    </span>
                                                    <span className="text-[9px] px-1 rounded bg-white/10 text-white/40">{item.id}</span>
                                                </div>
                                                <span className="text-[10px] text-white/30 font-mono truncate w-full">{item.desc}</span>
                                            </div>

                                            {/* Toggle Switch */}
                                            <div className={`
                                                w-8 h-4 rounded-full relative transition-colors duration-300 shrink-0 ml-2
                                                ${isActive ? 'bg-brand' : 'bg-white/20'}
                                            `}>
                                                <div className={`
                                                    absolute top-0.5 w-3 h-3 rounded-full bg-black shadow-sm transition-all duration-300
                                                    ${isActive ? 'left-4.5' : 'left-0.5'}
                                                `} style={{ left: isActive ? '18px' : '2px' }} />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        {item.code && isActive && onOpenWindow && (
                                            <div className="mt-2 flex justify-end animate-in fade-in">
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

                                        {/* Embedded Manifold View - Special Case */}
                                        {item.id === 'MT' && isActive && (
                                            <div className="mt-3 pt-3 border-t border-brand/20 w-full animate-in slide-in-from-top-2 duration-300">
                                                <ManifoldView embedded={true} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {visibleItems.length === 0 && (
                                <div className="text-center py-8 text-white/30 text-xs italic">
                                    No modules found.
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-t border-white/10 bg-white/5 flex gap-2 justify-end">
                            <button
                                onClick={onTileWindows}
                                className="text-[10px] text-white/50 hover:text-[#00ff9d] px-3 py-1 bg-white/5 rounded border border-white/5 hover:border-[#00ff9d]/30 transition-all uppercase font-bold tracking-wider"
                            >
                                GRID LAYOUT
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                </div>
            </div>
        </div>
    );
}
