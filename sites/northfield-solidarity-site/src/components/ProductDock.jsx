import React, { useState } from 'react';
import SystemTopology3D from './SystemTopology3D';
import FlatMap from './FlatMap';

// Layout Modes
const LAYOUTS = {
    WHEEL: 'WHEEL',
    BAR: 'BAR',
    LIST: 'LIST',
    ORBIT: 'ORBIT',
    SYSTEM: 'SYSTEM',
    MAP: 'MAP'
};

// NS Topology Data
const nsGridAreas = [
    { code: "SIG", label: "Inputs" },
    { code: "MUX", label: "Inputs" },
    { code: "DRE", label: "Research" },
    { code: "PIE", label: "Research" },
    { code: "GGP", label: "Nucleus" },
    { code: "IDN", label: "Nucleus" },
    { code: "INT", label: "State" },
    { code: "SIM", label: "Simulation" },
    { code: "DAT", label: "Execution" },
    { code: "FLO", label: "Finance" },
    { code: "BCP", label: "Blockchain" },
    { code: "MT", label: "Tracer" },
    { code: "FL", label: "Fantasy" },
    { code: "RL", label: "Relay" },
    { code: "AEGIS", label: "Security" },
    { code: "BOOM", label: "Growth" },
    { code: "DT", label: "Innovation" },
    { code: "INC", label: "Operations" },
    { code: "CRN", label: "Chronicle" },
    { code: "INCP", label: "Inception" },
    { code: "INV", label: "Inverse" },
];

const nsNodeCoords = {
    SIG: { x: -200, y: -250, z: 0 },
    MUX: { x: 200, y: -250, z: 0 },
    DRE: { x: -150, y: -100, z: 50 },
    PIE: { x: 150, y: -100, z: 50 },
    GGP: { x: 0, y: 0, z: 100 },
    IDN: { x: 200, y: 0, z: -50 },
    INT: { x: -200, y: 0, z: -50 },
    SIM: { x: -150, y: 150, z: 50 },
    DAT: { x: 150, y: 150, z: 50 },
    FLO: { x: 0, y: 250, z: 0 },
    BCP: { x: 0, y: -350, z: 0 },
    MT: { x: 0, y: 0, z: -150 },
    FL: { x: 0, y: 300, z: 100 },
    RL: { x: 0, y: -250, z: 50 },
    AEGIS: { x: 50, y: -50, z: 120 },
    BOOM: { x: -250, y: -250, z: 100 },
    DT: { x: -100, y: 100, z: 80 },
    INC: { x: 0, y: 100, z: 150 },
    CRN: { x: -100, y: 50, z: 120 },
    INCP: { x: 100, y: 100, z: 80 },
    INV: { x: -150, y: 50, z: 80 },
};

const nsConnections3d = [
    ["SIG", "DRE"], ["MUX", "PIE"],
    ["DRE", "GGP"], ["PIE", "GGP"],
    ["GGP", "IDN"],
    ["GGP", "SIM"], ["GGP", "DAT"],
    ["GGP", "INT"],
    ["INT", "SIM"], ["INT", "DAT"],
    ["SIM", "FLO"], ["DAT", "FLO"],
    ["BCP", "SIG"], ["BCP", "FLO"],
    ["RL", "MUX"], ["RL", "SIG"],
    ["FL", "SIM"], ["MT", "GGP"],
    ["RL", "GGP"], ["AEGIS", "GGP"], ["AEGIS", "IDN"],
    ["BOOM", "SIG"], ["BOOM", "GGP"],
    ["DT", "DRE"], ["DT", "SIG"],
    ["INC", "GGP"], ["INC", "INT"], ["INC", "DAT"], ["INC", "CRN"]
];

export default function ProductDock({ tabs, activeTab, primedTab, onSelect, filterType, onFilterChange, scale = 1 }) {
    const [mode, setMode] = useState(LAYOUTS.LIST);
    const [isDockMinimized, setIsDockMinimized] = useState(false);
    // filterType coming from props now

    // Filter Logic
    // List Definitions from User Spec
    const LIST_DEFS = {
        NS_ENGINES: ['APM', 'BCO', 'CDE', 'CON', 'CWP', 'DAT', 'DRE', 'FLO', 'GGP', 'IDN', 'INT', 'IPR', 'LUM', 'MUX', 'OCP', 'PIE', 'QTN', 'SIG', 'SIM', 'SWB'],
        SL_ENGINES: ['MRFPE', 'PECA', 'PTE'],
        PROJECT: [
            'BOOM', 'BOOMERANG', 'BUDDY BUDDY', 'NBR', 'NEIGHBORS', 'CRN', 'CHRONICLE', 'CRUCIBLE', 'DA', 'DEAL ATLAS', 'DOPEY',
            'DT', 'DUCT TAPE', 'FRMT', 'FIRMAMENT', 'HP', 'HOT POTATO', 'INCP', 'INCEPTION', 'INC', 'INCUBATOR',
            'INV', 'INVERSE', 'MT', 'MANIFOLD TRACER', 'MINDMIX', 'MINT', 'NUM', 'NUMBEROLOGY', 'FL', 'FANTASY LAND',
            'RL', 'RELAY', 'ROAM', 'TINE', 'WL', 'WISHLIST', 'WPV', 'WHITE PAPER VISUALIZER'
        ]
    };
    // Note: Project list includes both Codes and Names just in case, but usually we filter by Code. 
    // I will normalize to Codes in checks if possible, but 'tabs' usually have 'code'. 
    // The user provided Names for some (e.g. MANIFOLD TRACER), but in the system it's 'MT'.
    // I added common codes to the list above to ensure matching.

    // Filter Logic
    const visibleTabs = React.useMemo(() => {
        if (filterType === 'ALL') {
            // Return everything that matches ANY of the lists to avoid showing garbage
            const allCodes = new Set([
                ...LIST_DEFS.NS_ENGINES,
                ...LIST_DEFS.SL_ENGINES,
                ...LIST_DEFS.PROJECT
            ]);
            // Also include any tab that might be valid but using a code alias found in the list
            return tabs.filter(t => allCodes.has(t.code) || allCodes.has(t.name) || allCodes.has(t.label));
        }

        if (filterType === 'NS_ENGINES') {
            return tabs.filter(t => LIST_DEFS.NS_ENGINES.includes(t.code));
        }
        if (filterType === 'SL_ENGINES') {
            return tabs.filter(t => LIST_DEFS.SL_ENGINES.includes(t.code));
        }
        if (filterType === 'PROJECT') {
            // Check both code and name/label for Projects since the user used full names
            return tabs.filter(t => LIST_DEFS.PROJECT.includes(t.code) || LIST_DEFS.PROJECT.includes(t.name));
        }
        if (filterType === 'ENGINES') {
            const engineCodes = [...LIST_DEFS.NS_ENGINES, ...LIST_DEFS.SL_ENGINES];
            return tabs.filter(t => engineCodes.includes(t.code));
        }

        return tabs;
    }, [tabs, filterType]);

    // Helpers
    const activeIndex = visibleTabs.findIndex(t => t.code === activeTab);
    const safeVisualIndex = activeIndex >= 0 ? activeIndex : 0;

    // --- RENDERERS ---

    // 1. SPIN WHEEL (The Arc) - Continuous Sliding
    const [dragState, setDragState] = useState({
        isDragging: false,
        startX: 0,
        startVisualIndex: 0,
        hasMoved: false
    });

    const [visualIndex, setVisualIndex] = useState(safeVisualIndex);

    // Sync visual index when active tab/filter changes

    // Sync visual index when active tab/filter changes OR primedTab changes
    React.useEffect(() => {
        // Preference: Primed tab > Active tab
        const targetTab = primedTab || activeTab;
        const newIndex = visibleTabs.findIndex(t => t.code === targetTab);

        if (newIndex >= 0) {
            setVisualIndex(newIndex);
        } else if (!primedTab && activeTab) {
            // Fallback to active if no primed
            const activeIdx = visibleTabs.findIndex(t => t.code === activeTab);
            if (activeIdx >= 0) setVisualIndex(activeIdx);
        } else {
            // Default 0
            // setVisualIndex(0); // Optional: don't reset if just hovering away?
        }
    }, [activeTab, primedTab, filterType, visibleTabs]);

    // ... (rest of renderWheel logic) ...

    const renderWheel = () => {
        return (
            <div className="relative h-[300px] w-full flex items-center justify-center pl-32 overflow-visible">
                {visibleTabs.map((tab, i) => {
                    // Position Math
                    const offset = i - visualIndex;
                    const spacing = 120; // px
                    const x = offset * spacing;
                    const y = Math.abs(offset) * 20; // Arch effect
                    const angle = offset * 5; // Rotation in degrees
                    const distFromCenter = Math.abs(offset);
                    const opacity = Math.max(0, 1 - distFromCenter * 0.25);
                    const isActiveVisual = distFromCenter < 0.5;

                    // Color Logic
                    let borderColor = 'border-white';
                    let glowColor = '';
                    let textColor = 'text-white';
                    let dotColor = 'bg-white';

                    if (tab.type === 'PROJECT') {
                        borderColor = 'border-purple-500';
                        glowColor = 'shadow-[0_0_20px_rgba(168,85,247,0.3)]';
                        textColor = 'text-purple-400';
                        dotColor = 'bg-purple-500';
                    } else if (tab.type === 'IDE') {
                        borderColor = 'border-blue-500';
                        glowColor = 'shadow-[0_0_20px_rgba(59,130,246,0.3)]';
                        textColor = 'text-blue-400';
                        dotColor = 'bg-blue-500';
                    } else if (tab.type === 'SYSTEM') {
                        borderColor = 'border-white';
                        glowColor = 'shadow-[0_0_20px_rgba(255,255,255,0.3)]';
                        textColor = 'text-white';
                        dotColor = 'bg-white';
                    }

                    const isRealActive = tab.code === activeTab;
                    const isPrimed = tab.code === primedTab;

                    const isActiveStyle = isRealActive
                        ? `bg-black/60 ${borderColor} ${glowColor}`
                        : isPrimed
                            ? `bg-black/50 ${borderColor} shadow-[0_0_15px_rgba(255,255,255,0.2)] border-white/50`
                            : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5';

                    if (opacity <= 0) return null;

                    return (
                        <div
                            key={tab.code}
                            className="absolute flex flex-col items-center justify-center cursor-pointer group pointer-events-auto transition-all duration-300 ease-out"
                            style={{
                                transform: `translate(${x}px, ${y}px) scale(${1 - distFromCenter * 0.1})`,
                                opacity: opacity,
                                zIndex: 100 - Math.round(distFromCenter * 10),
                                filter: `blur(${Math.abs(offset) * 2}px)`
                            }}
                            onClick={(e) => {
                                if (!dragState.hasMoved) {
                                    e.stopPropagation();
                                    onSelect(tab.code);
                                }
                            }}
                        >
                            {/* Card Content */}
                            <div className={`w-24 h-32 rounded-lg border backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center ${isActiveStyle}`}>
                                <div className={`text-2xl font-bold mb-2 ${isRealActive || isPrimed ? textColor : 'text-white'} drop-shadow-md`}>
                                    {tab.code.substring(0, 1)}
                                    <span className={isRealActive || isPrimed ? 'text-white' : 'text-white/50'}>
                                        {tab.code.substring(1)}
                                    </span>
                                </div>
                                <div className={`w-1.5 h-1.5 rounded-full ${isRealActive ? dotColor : isPrimed ? 'bg-white/50' : 'bg-white/20'}`} />
                            </div>

                            {/* Label */}
                            <div className={`mt-4 text-center transition-all duration-300 ${isActiveVisual ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="text-xs font-bold text-white tracking-widest uppercase truncate max-w-[120px]">{tab.name}</div>
                                <div className={`text-[9px] font-mono mt-1 ${textColor}`}>{tab.category}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };



    // 2. CLASSIC BAR (Horizontal Scroll)
    const renderBar = () => (
        <div className="flex gap-3 p-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full w-fit max-w-[95vw] mx-auto overflow-x-auto pointer-events-auto shadow-2xl items-center no-scrollbar">
            {visibleTabs.map((tab) => {
                const isActive = tab.code === activeTab;
                const isPrimed = tab.code === primedTab;

                return (
                    <button
                        key={tab.code}
                        onClick={() => onSelect(tab.code)}
                        className={`
                            relative flex flex-col items-center justify-center
                            min-w-[80px] h-14 rounded-lg transition-all duration-200 ease-out
                            ${isActive
                                ? 'bg-white/10 text-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                : 'bg-transparent text-white/40 hover:text-white hover:bg-white/5'
                            }
                            ${isPrimed && !isActive ? 'animate-pulse ring-1 ring-white/50 text-white/80' : ''}
                        `}
                    >
                        <span className="text-[10px] font-bold tracking-widest z-10">
                            {tab.code}
                        </span>
                        {/* Animated Active Indicator */}
                        <div className={`
                             absolute bottom-1 w-1 h-1 rounded-full bg-white transition-all duration-300
                             ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                         `} />
                    </button>
                );
            })}
        </div>
    );

    // 3. VERTICAL LIST
    const renderList = () => (
        <div className="flex flex-col gap-2 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl pointer-events-auto max-h-[50vh] overflow-y-auto w-64 shadow-2xl">
            {visibleTabs.map((tab) => {
                const isActive = tab.code === activeTab;
                return (
                    <div
                        key={tab.code}
                        onClick={() => onSelect(tab.code)}
                        className={`
                            flex items-center justify-between p-3 rounded border transition-all cursor-pointer
                            ${isActive
                                ? 'bg-white/10 border-white/40 text-white'
                                : 'bg-transparent border-transparent text-white/40 hover:bg-white/5'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand shadow-[0_0_5px_currentColor]' : 'bg-white/20'}`} />
                            <span className="text-xs font-bold tracking-widest w-12">{tab.code}</span>
                        </div>
                        <span className="text-xs flex-1 text-right truncate opacity-80">{tab.name}</span>
                    </div>
                );
            })}
        </div>
    );

    // 4. ORBIT (Radial/Molecular Nodes - Formerly SYSTEM)
    const renderOrbit = () => {
        // Position items in a circle around a center point
        const radius = 140; // px

        return (
            <div className="relative w-[400px] h-[400px] flex items-center justify-center pointer-events-none">
                {/* Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" />
                <div className="absolute inset-[50px] rounded-full border border-white/5 animate-reverse-spin" />

                {/* Center (Active) */}
                <div className="absolute z-20 w-32 h-32 rounded-full bg-black/50 backdrop-blur-lg border border-white/20 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_50px_rgba(255,255,255,0.1)] pointer-events-auto">
                    <div className="text-xl font-bold text-white tracking-widest">{activeTab}</div>
                    <div className="text-[9px] text-white/50 uppercase max-w-[80%] leading-tight mt-1">
                        {tabs.find(t => t.code === activeTab)?.name}
                    </div>
                </div>

                {/* Satellites */}
                {visibleTabs.map((tab, i) => {
                    if (tab.code === activeTab) return null; // Center handles active

                    const angle = (i / visibleTabs.length) * 2 * Math.PI;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div
                            key={tab.code}
                            onClick={() => onSelect(tab.code)}
                            className="absolute z-10 hover:z-30 transition-all duration-300 group cursor-pointer pointer-events-auto"
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                            }}
                        >
                            <div className="w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-white/50 hover:bg-white/10 hover:scale-125 flex items-center justify-center backdrop-blur text-[8px] font-bold text-white/60 hover:text-white transition-all shadow-lg">
                                {tab.code}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // 5. SYSTEM (3D Topology)
    const renderSystem = () => {
        return (
            <div className="w-[600px] h-[400px] pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <h3 className="text-xs font-bold text-white tracking-widest uppercase">System Topology</h3>
                    <div className="text-[10px] text-white/40">3D Interactive Map</div>
                </div>
                <SystemTopology3D
                    nodes={nsGridAreas}
                    connections={nsConnections3d}
                    nodeCoords={nsNodeCoords}
                    activeEngine={activeTab}
                    setActiveEngine={onSelect}
                    theme="water"
                    background="transparent"
                />
            </div>
        );
    };


    // 6. FLAT MAP (Geo2D)
    const renderMap = () => {
        return (
            <div className="pointer-events-auto">
                <FlatMap />
            </div>
        );
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-end pb-4 pointer-events-none">



            {/* DOCK CONTAINER: Switcher + Interface */}
            {/* DOCK CONTAINER: Switcher + Interface */}
            {/* Main container is pointer-events-none to prevent invisible blocking; children MUST be pointer-events-auto */}
            <div
                className={`relative flex items-end gap-[10px] z-50 transition-all duration-500 pointer-events-none 
                    ${mode === 'LIST' ? 'w-full justify-end px-8' :
                        ['MAP', 'SYSTEM'].includes(mode) ? 'w-full justify-start px-8' :
                            'justify-center'}`}
                style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
            >

                {/* 0. SYSTEM DOCK LABEL & COUNT (Leftmost) */}
                <div className="flex flex-col gap-1 p-2 mb-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl pointer-events-auto mr-auto">
                    <div className="text-[10px] font-bold text-white/50 tracking-widest uppercase text-center border-b border-white/10 pb-1 mb-1">
                        System Dock
                    </div>
                    <div className="text-xs font-mono font-bold text-white text-center mb-2">
                        {visibleTabs.length} <span className="text-[9px] text-white/40">NODES</span>
                    </div>

                    {/* CONNECTION LEGEND (Integrated) */}
                    <div className="border-t border-white/10 pt-2 flex flex-col gap-1.5 min-w-[120px]">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#00ff9d] opacity-80"></div>
                            <span className="text-[9px] text-[#00ff9d] uppercase">Infrastructure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-[#a855f7] opacity-80"></div>
                            <span className="text-[9px] text-[#a855f7] uppercase">Overlay</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-white opacity-40"></div>
                            <span className="text-[9px] text-white/70 uppercase">Integration</span>
                        </div>
                    </div>
                </div>

                {/* 1. Layout Switcher (Left Side) - Pointer Events AUTO */}
                <div className="flex flex-col gap-1 p-1 mb-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl pointer-events-auto">
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsDockMinimized(!isDockMinimized)}
                        className="w-6 h-4 flex items-center justify-center rounded transition-all duration-200 bg-transparent text-white/30 hover:bg-white/10 hover:text-white mb-1"
                        title={isDockMinimized ? "Restore Dock" : "Minimize Dock"}
                    >
                        {isDockMinimized ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14" /><path d="M5 12h14" />
                            </svg>
                        ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                            </svg>
                        )}
                    </button>

                    {!isDockMinimized && Object.values(LAYOUTS).map((l) => (
                        <button
                            key={l}
                            onClick={() => setMode(l)}
                            className={`
                                w-6 h-6 flex items-center justify-center rounded transition-all duration-200
                                ${mode === l
                                    ? 'bg-white text-black shadow-lg scale-105 font-bold'
                                    : 'bg-transparent text-white/30 hover:bg-white/10 hover:text-white'
                                }
                            `}
                            title={`Layout: ${l}`}
                        >
                            {/* Icons representing layouts */}
                            {l === 'WHEEL' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 0 8-8 8 8 0 0 0-8 8z" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M20 12h2" /><path d="M2 12h2" /></svg>}
                            {l === 'BAR' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="9" width="20" height="6" rx="2" /></svg>}
                            {l === 'LIST' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>}
                            {l === 'ORBIT' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 5V3" /><path d="M19 12h2" /><path d="M5 12H3" /><path d="M12 19v2" /></svg>}
                            {l === 'SYSTEM' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg>}
                            {l === 'MAP' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>}
                        </button>
                    ))}
                </div>

                {/* Filter Selector (Moved & Enlarged) */}
                {!isDockMinimized && (
                    <div className="flex flex-col gap-1 p-1 mb-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl pointer-events-auto">
                        {['ALL', 'NS_ENGINES', 'SL_ENGINES', 'PROJECT', 'ENGINES'].map(type => (
                            <button
                                key={type}
                                onClick={() => onFilterChange && onFilterChange(type)}
                                className={`
                                    px-3 py-2 text-[10px] font-mono font-bold transition-all rounded hover:scale-105 active:scale-95
                                    ${filterType === type
                                        ? 'bg-white text-black shadow-lg scale-105'
                                        : 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white'}
                                `}
                            >
                                {type.replace('_', ' ').replace('ENGINES', 'ENG')}
                            </button>
                        ))}
                    </div>
                )}

                {/* 2. Main Interface - Pointer Events None on Wrapper */}
                {!isDockMinimized && (
                    <div className="transition-all duration-500 ease-in-out pointer-events-none">
                        {mode === LAYOUTS.WHEEL && renderWheel()}
                        {mode === LAYOUTS.BAR && renderBar()}
                        {mode === LAYOUTS.LIST && renderList()}
                        {mode === LAYOUTS.ORBIT && renderOrbit()}
                        {mode === LAYOUTS.SYSTEM && renderSystem()}
                        {mode === LAYOUTS.MAP && renderMap()}
                    </div>
                )}



            </div>

        </div>
    );
}
