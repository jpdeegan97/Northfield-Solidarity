import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ALL_ENGINES } from '../data/engineRegistry';
import ProductDock from '../components/ProductDock';
import EngineOverlay from '../components/EngineOverlay';
import HolographicScene from '../components/HolographicScene';
import WindowFrame from '../components/WindowFrame';

// Engine Views
import GGPView from './engines/GGPView';
import IDNView from './engines/IDNView';
import PIEView from './engines/PIEView';
import DATView from './engines/DATView';
import MUXView from './engines/MUXView';
import SIGView from './engines/SIGView';
import SIMView from './engines/SIMView';
import FLOView from './engines/FLOView';
import DREView from './engines/DREView';
import INTView from './engines/INTView';
import CWPView from './engines/CWPView';
import BCPView from './engines/BCPView';
import LUMView from './engines/LUMView';
import PTEView from './engines/PTEView';
import MRFPEView from './engines/MRFPEView';
import PECAView from './engines/PECAView';
import FRKView from './engines/FRKView';
import INCView from './engines/INCView';
import CRNView from './engines/CRNView';
import IDEView from './engines/IDEView';
import FirmamentCockpit from './engines/FirmamentCockpit';

export default function ProductCanvas() {
    // --- MULTI-INSTANCE STATE (Tabularization) ---
    const [workspaces, setWorkspaces] = useState([{
        id: 'default',
        title: 'MAIN INSTANCE',
        windows: [],
        activeWindowId: null,
        topZ: 100,
        viewport: { x: 0, y: 0, scale: 1 },
        isFirmamentLocked: true, // "Show Firmament"
        interactionMode: 'canvas',
        // New Settings
        showStars: true,
        autoRotate: true,
        autoRotateSpeed: 0.2,
        firmamentLayers: {
            entities: true,
            events: false,
            sectors: true,
            risks: false,
        },
        filterType: 'ALL',
        dockScale: 1.0
    }]);
    const [activeWorkspaceId, setActiveWorkspaceId] = useState('default');

    // Helper: Get Current Workspace Data
    const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

    // --- STATE PROXIES ---
    const updateActive = (updates) => {
        setWorkspaces(prev => prev.map(w => w.id === activeWorkspaceId ? { ...w, ...updates } : w));
    };

    const updateSetting = (key, val) => updateActive({ [key]: val });

    // Windows
    const windows = activeWorkspace.windows;
    const setWindows = (action) => {
        setWorkspaces(prev => prev.map(w => {
            if (w.id !== activeWorkspaceId) return w;
            const newVal = typeof action === 'function' ? action(w.windows) : action;
            return { ...w, windows: newVal };
        }));
    };

    // Active Window
    const activeWindowId = activeWorkspace.activeWindowId;
    const setActiveWindowId = (id) => updateActive({ activeWindowId: id });

    // Z-Index
    const topZ = activeWorkspace.topZ;
    const setTopZ = (z) => updateActive({ topZ: z });

    // Viewport
    const viewport = activeWorkspace.viewport;
    const setViewport = (action) => {
        setWorkspaces(prev => prev.map(w => {
            if (w.id !== activeWorkspaceId) return w;
            const newVal = typeof action === 'function' ? action(w.viewport) : action;
            return { ...w, viewport: newVal };
        }));
    };

    // Settings Proxies
    const isFirmamentLocked = activeWorkspace.isFirmamentLocked;
    const setIsFirmamentLocked = (val) => updateActive({ isFirmamentLocked: val });

    const interactionMode = activeWorkspace.interactionMode;
    const setInteractionMode = (val) => updateActive({ interactionMode: val });

    const showStars = activeWorkspace.showStars;
    const autoRotate = activeWorkspace.autoRotate;
    const autoRotateSpeed = activeWorkspace.autoRotateSpeed;
    const filterType = activeWorkspace.filterType || 'ALL';
    const dockScale = activeWorkspace.dockScale || 1.0;

    const firmamentLayers = activeWorkspace.firmamentLayers;
    const toggleLayer = (layer) => {
        setWorkspaces(prev => prev.map(w => {
            if (w.id !== activeWorkspaceId) return w;
            return {
                ...w,
                firmamentLayers: {
                    ...w.firmamentLayers,
                    [layer]: !w.firmamentLayers[layer]
                }
            };
        }));
    };

    // --- INSTANCE MANAGEMENT ---
    const [renamingId, setRenamingId] = useState(null);

    const renameWorkspace = (id, newTitle) => {
        setWorkspaces(prev => prev.map(w => w.id === id ? { ...w, title: newTitle } : w));
        setRenamingId(null);
    };

    const createNewInstance = () => {
        const newId = `instance-${Date.now()}`;
        const newInstance = {
            id: newId,
            title: `INSTANCE ${workspaces.length + 1}`,
            windows: [],
            activeWindowId: null,
            topZ: 100,
            viewport: { x: 0, y: 0, scale: 1 },
            isFirmamentLocked: true,
            interactionMode: 'canvas',
            showStars: true,
            autoRotate: true,
            autoRotateSpeed: 0.2,
            firmamentLayers: {
                entities: true,
                events: false,
                sectors: true,
                risks: false,
            },
            filterType: 'ALL',
            dockScale: 1.0
        };
        setWorkspaces(prev => [...prev, newInstance]);
        setActiveWorkspaceId(newId);
    };

    const closeInstance = (e, id) => {
        e.stopPropagation();
        if (workspaces.length === 1) return;
        const newWorkspaces = workspaces.filter(w => w.id !== id);
        setWorkspaces(newWorkspaces);
        if (activeWorkspaceId === id) {
            setActiveWorkspaceId(newWorkspaces[newWorkspaces.length - 1].id);
        }
    };

    // --- HARD RESET ---
    const [isResetting, setIsResetting] = useState(false);
    const [resetPhrase, setResetPhrase] = useState('');
    const [primedCode, setPrimedCode] = useState(null);

    // --- DATA ---
    const tabs = useMemo(() => {
        const PROJECT_CODES = ['FRK', 'INC', 'CRN'];
        const projects = PROJECT_CODES.map(code => {
            const registryItem = ALL_ENGINES.find(e => e.code === code);
            return {
                code,
                name: registryItem?.name || code,
                type: 'PROJECT',
                category: 'Project',
                description: registryItem?.description || 'Active Project'
            };
        });

        const ENGINE_CODES = ['GGP', 'DRE', 'PIE', 'INT', 'MUX', 'SIG', 'IDN', 'SIM', 'DAT', 'FLO', 'BCP'];
        const engines = ENGINE_CODES.map(code => {
            const registryItem = ALL_ENGINES.find(e => e.code === code);
            return {
                code,
                name: registryItem?.name || code,
                type: 'SYSTEM',
                category: registryItem?.type || 'Engine',
                description: registryItem?.description || 'System Component'
            };
        });

        // IDE Tool
        const tools = [{
            code: 'IDE',
            name: 'Northfield IDE',
            type: 'IDE',
            category: 'Tooling',
            description: 'Integrated Development Environment'
        }];

        // Firmament is a special system view
        const firmament = [{
            code: 'FIRMAMENT',
            name: 'Firmament',
            type: 'SYSTEM',
            category: 'System',
            description: 'Global Operations'
        }];

        return [...firmament, ...projects, ...tools, ...engines];
    }, []);

    // --- DERIVED STATE ---
    const activeWindow = windows.find(w => w.id === activeWindowId);

    const visibleTabs = useMemo(() => {
        const activeFilter = activeWorkspace.filterType || 'ALL';
        if (activeFilter === 'ALL') return tabs;
        return tabs.filter(t => t.type === activeFilter);
    }, [tabs, activeWorkspace.filterType]);

    // --- WINDOW ACTIONS ---
    const topZRef = useRef(100);
    const getNextZ = () => {
        topZRef.current += 1;
        return topZRef.current;
    };

    const openWindow = (code) => {
        // IDE Handling: Check preference
        const ideMode = activeWorkspace.ideOpenMode || 'tab'; // Default to tab
        if (code === 'IDE' && ideMode === 'tab') {
            window.open('/ide', '_blank');
            return;
        }

        const engine = tabs.find(t => t.code === code) || { name: code };
        // Fix for impure ID generation using random - slightly better unique ID
        const newId = `win-${Date.now()}-${code}`;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const width = 800;
        const height = 600;

        // Check if already open (optional, user didn't specify unique-only, but usually better)
        // Allowing multiples for now as per original logic implies new ID generation.

        const newWindow = {
            id: newId,
            code: code,
            title: engine.name,
            x: centerX - (width / 2) + (windows.length * 20),
            y: centerY - (height / 2) + (windows.length * 20),
            z: getNextZ(),
            width,
            height,
            type: engine.type // Store type on window for easier lookup
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(newId);
    };

    const closeWindow = (id) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const focusWindow = (id) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, z: getNextZ() } : w));
        setActiveWindowId(id);
    };

    const moveWindow = (id, x, y) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
    };

    const togglePin = (id) => {
        setWindows(windows.map(w => {
            if (w.id === id) return { ...w, isPinned: !w.isPinned };
            return w;
        }));
    };

    const getActiveEngineData = (code) => tabs.find(t => t.code === code);

    // --- FULL SCREEN / INACTIVITY LOGIC ---
    const windowActivityRefs = useRef({});

    const handleWindowActivity = (id) => {
        windowActivityRefs.current[id] = Date.now();
    };

    const toggleFullScreen = (id) => {
        setWindows(prev => prev.map(w => {
            if (w.id !== id) return w;

            if (w.isFullScreen) {
                // Restore
                return {
                    ...w,
                    isFullScreen: false,
                    x: w.restoreState.x,
                    y: w.restoreState.y,
                    width: w.restoreState.width,
                    height: w.restoreState.height,
                    isPinned: w.restoreState.isPinned,
                    z: w.restoreState.z,
                    restoreState: null
                };
            } else {
                // Go Full Screen
                windowActivityRefs.current[id] = Date.now();
                return {
                    ...w,
                    isFullScreen: true,
                    restoreState: {
                        x: w.x,
                        y: w.y,
                        width: w.width,
                        height: w.height,
                        isPinned: w.isPinned,
                        z: w.z
                    },
                    x: 0,
                    y: 0,
                    width: '100%',
                    height: '100%',
                    isPinned: false, // Force float to cover screen
                    z: 999999
                };
            }
        }));
    };

    // Inactivity Timer Loop
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setWorkspaces(prev => prev.map(ws => {
                const hasTimeout = ws.windows.some(w =>
                    w.isFullScreen &&
                    windowActivityRefs.current[w.id] &&
                    (now - windowActivityRefs.current[w.id] > 10000)
                );

                if (!hasTimeout) return ws;

                const newWindows = ws.windows.map(w => {
                    if (w.isFullScreen &&
                        windowActivityRefs.current[w.id] &&
                        (now - windowActivityRefs.current[w.id] > 10000)) {
                        // Timeout Restore
                        return {
                            ...w,
                            isFullScreen: false,
                            x: w.restoreState.x,
                            y: w.restoreState.y,
                            width: w.restoreState.width,
                            height: w.restoreState.height,
                            isPinned: w.restoreState.isPinned,
                            z: w.restoreState.z,
                            restoreState: null
                        };
                    }
                    return w;
                });
                return { ...ws, windows: newWindows };
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // --- EFFECTS ---

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only capture if no other input is focused
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            // Initialize primedCode if null
            let explicitPrime = primedCode;
            if (explicitPrime === null) {
                if (activeWindow) {
                    // Try to map active window code to a visible tab
                    const found = visibleTabs.find(t => t.code === activeWindow.code);
                    if (found) explicitPrime = found.code;
                }
                if (!explicitPrime && visibleTabs.length > 0) {
                    explicitPrime = visibleTabs[0].code;
                }
                // If we determined a start point, use it for logic below, but we don't setState yet unless moving
            }

            // Find current index
            // If explicitPrime is still null (no visible tabs), index is -1
            const currentIndex = explicitPrime
                ? visibleTabs.findIndex(t => t.code === explicitPrime)
                : -1;

            const count = visibleTabs.length;
            if (count === 0) return;

            const safeIndex = currentIndex >= 0 ? currentIndex : 0;

            // Shortcuts
            if (e.altKey && e.code === 'KeyW') {
                e.preventDefault();
                if (activeWindowId) {
                    closeWindow(activeWindowId);
                }
                return;
            }

            if (e.altKey && e.code === 'KeyQ') {
                e.preventDefault();
                if (workspaces.length > 1) {
                    const newWorkspaces = workspaces.filter(w => w.id !== activeWorkspaceId);
                    setWorkspaces(newWorkspaces);
                    setActiveWorkspaceId(newWorkspaces[newWorkspaces.length - 1].id);
                } else {
                    // Trigger Confirmation Modal for the final instance
                    setIsResetting(true);
                }
                return;
            }

            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                const nextIndex = (safeIndex + 1) % count;
                setPrimedCode(visibleTabs[nextIndex].code);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                const prevIndex = (safeIndex - 1 + count) % count;
                setPrimedCode(visibleTabs[prevIndex].code);
            } else if (e.key === 'Enter') {
                // Open the primed code, or the currently "selected" logic
                const codeToOpen = primedCode || explicitPrime;
                if (codeToOpen) {
                    openWindow(codeToOpen);
                    setPrimedCode(null);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [visibleTabs, primedCode, activeWindowId, openWindow, activeWindow, workspaces, activeWorkspaceId]); // Added workspaces deps

    // Clear primedCode if filter changes to avoid stuck highlighting
    useEffect(() => {
        setPrimedCode(null);
    }, [activeWorkspace.filterType]);

    // Clear primedCode on mouse move to switch back to mouse selection mode naturally
    useEffect(() => {
        const handleMouseMove = () => {
            if (primedCode !== null) {
                setPrimedCode(null);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [primedCode]);


    const handleHardReset = () => {
        if (resetPhrase !== 'CONFIRM') return;
        setWorkspaces(prev => prev.map(w => {
            if (w.id !== activeWorkspaceId) return w;
            return {
                ...w,
                windows: [],
                activeWindowId: null,
                topZ: 100,
                viewport: { x: 0, y: 0, scale: 1 },
                interactionMode: 'canvas',
                isFirmamentLocked: true,
                showStars: true,
                autoRotate: true,
                autoRotateSpeed: 0.2
            };
        }));
        setIsResetting(false);
        setResetPhrase('');
    };

    // --- INTERACTION HANDLERS ---
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isCanvasDragging, setIsCanvasDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleWheel = (e) => {
        if (interactionMode === 'window') return;
        const zoomSensitivity = 0.003;
        const delta = -e.deltaY * zoomSensitivity;
        const oldScale = viewport.scale;
        const newScale = Math.max(0.1, Math.min(8, oldScale + delta));
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newX = centerX - (centerX - viewport.x) * (newScale / oldScale);
        const newY = centerY - (centerY - viewport.y) * (newScale / oldScale);
        setViewport({ x: newX, y: newY, scale: newScale });
    };

    const handleCanvasMouseDown = (e) => {
        // Only start drag if clicking directly on the background (not a window)
        setIsCanvasDragging(true);
        setDragStart({
            x: e.clientX - viewport.x,
            y: e.clientY - viewport.y
        });
    };

    const handleCanvasMouseMove = (e) => {
        if (!isCanvasDragging) return;
        setViewport(prev => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        }));
    };

    const handleCanvasMouseUp = () => {
        setIsCanvasDragging(false);
    };



    const getEngineComponent = (code) => {
        const engineData = getActiveEngineData(code);
        const props = { engine: engineData };
        switch (code) {
            case 'FIRMAMENT': return <FirmamentCockpit {...props} activeLayers={firmamentLayers} onToggleLayer={toggleLayer} />;
            case 'PIE': return <PIEView {...props} />;
            case 'DAT': return <DATView {...props} />;
            case 'MUX': return <MUXView {...props} />;
            case 'SIG': return <SIGView {...props} />;
            case 'SIM': return <SIMView {...props} />;
            case 'GGP': return <GGPView {...props} />;
            case 'IDN': return <IDNView {...props} />;
            case 'FLO': return <FLOView {...props} />;
            case 'DRE': return <DREView {...props} />;
            case 'INT': return <INTView {...props} />;
            case 'CWP': return <CWPView {...props} />;
            case 'BCP': return <BCPView {...props} />;
            case 'LUM': return <LUMView {...props} />;
            case 'PTE': return <PTEView {...props} />;
            case 'MRFPE': return <MRFPEView {...props} />;
            case 'PECA': return <PECAView {...props} />;
            case 'FRK': return <FRKView {...props} />;
            case 'INC': return <INCView {...props} />;
            case 'CRN': return <CRNView {...props} />;
            case 'IDE': return <IDEView {...props} />;
            default: return <EngineOverlay {...props} />;
        }
    };

    return (
        <div
            className={`fixed inset-0 w-full h-full overflow-hidden bg-[#050505] ${interactionMode === 'canvas' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
            onWheel={handleWheel}
            onMouseDown={interactionMode === 'canvas' ? handleCanvasMouseDown : undefined}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
        >
            {/* INSTANCE TABS */}
            <div className="absolute top-0 left-0 w-full h-8 bg-black/80 backdrop-blur-md border-b border-white/10 z-[100] flex items-center px-2 pointer-events-auto justify-between">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {workspaces.map((ws) => (
                        <div
                            key={ws.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveWorkspaceId(ws.id);
                                setIsCanvasDragging(false);
                                setRenamingId(null);
                            }}
                            onDoubleClick={(e) => { e.stopPropagation(); setRenamingId(ws.id); }}
                            className={`
                                group relative flex items-center gap-2 px-3 py-1 h-full cursor-pointer select-none transition-all
                                ${ws.id === activeWorkspaceId
                                    ? 'bg-[#00ff9d]/10 text-[#00ff9d] border-b-2 border-[#00ff9d]'
                                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'}
                            `}
                        >
                            {renamingId === ws.id ? (
                                <input
                                    autoFocus
                                    type="text"
                                    defaultValue={ws.title}
                                    onBlur={(e) => renameWorkspace(ws.id, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') renameWorkspace(ws.id, e.currentTarget.value);
                                        if (e.key === 'Escape') setRenamingId(null);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-transparent text-[10px] font-mono font-bold tracking-wider uppercase outline-none min-w-[50px] text-[#00ff9d]"
                                />
                            ) : (
                                <span className="text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
                                    {ws.title}
                                </span>
                            )}

                            {workspaces.length > 1 && !renamingId && (
                                <button
                                    onClick={(e) => closeInstance(e, ws.id)}
                                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500/20 rounded text-red-400 transition-all"
                                >
                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={(e) => { e.stopPropagation(); createNewInstance(); }}
                        className="h-full px-3 flex items-center justify-center text-white/20 hover:text-[#00ff9d] hover:bg-[#00ff9d]/10 transition-colors"
                        title="Replicate System (New Instance)"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                {/* HARD RESET BUTTON */}
                <button
                    onClick={() => setIsResetting(true)}
                    className="h-full px-4 flex items-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white font-mono font-bold text-[10px] tracking-widest transition-all border-l border-white/10"
                >
                    <span className="hidden sm:inline">RESET SPACE</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                </button>
            </div>

            {/* SETTINGS MENU (Top Right) */}
            <div className="absolute top-12 right-6 z-[60] flex flex-col items-end gap-2 pointer-events-auto">
                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className={`p-2 rounded-full border transition-all ${isSettingsOpen ? 'bg-[#00ff9d] text-black border-[#00ff9d]' : 'bg-black/60 text-[#00ff9d] border-[#00ff9d]/30 hover:bg-[#00ff9d]/10'}`}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isSettingsOpen ? 'animate-spin-slow' : ''}>
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>

                {/* Filter Selector - Always Visible */}
                <div className="flex bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10 overflow-hidden shadow-lg mt-2 scale-90 origin-right">
                    {['ALL', 'ENGINE', 'PROJECT', 'IDE'].map(type => (
                        <button
                            key={type}
                            onClick={() => updateSetting('filterType', type)}
                            className={`px-2 py-1 text-[8px] font-mono transition-colors border-r last:border-0 border-white/10 ${filterType === type ? 'bg-[#00ff9d] text-black font-bold' : 'text-[#00ff9d] hover:bg-[#00ff9d]/10'}`}
                        >
                            {type === 'ENGINE' ? 'ENG' : type === 'PROJECT' ? 'PROJ' : type}
                        </button>
                    ))}
                </div>

                {isSettingsOpen && (
                    <div className="bg-black/80 backdrop-blur-md border border-[#00ff9d]/30 p-4 rounded-lg flex flex-col gap-4 w-64 shadow-[0_0_30px_rgba(0,255,157,0.1)]">
                        {/* Interaction Mode */}
                        <div className="flex bg-black/50 p-1 rounded border border-white/10">
                            <button
                                onClick={() => setInteractionMode('canvas')}
                                className={`flex-1 py-1 text-[10px] font-mono rounded transition-colors ${interactionMode === 'canvas' ? 'bg-[#00ff9d] text-black font-bold' : 'text-[#00ff9d] hover:bg-[#00ff9d]/10'}`}
                            >
                                CANVAS
                            </button>
                            <button
                                onClick={() => setInteractionMode('window')}
                                className={`flex-1 py-1 text-[10px] font-mono rounded transition-colors ${interactionMode === 'window' ? 'bg-[#00ff9d] text-black font-bold' : 'text-[#00ff9d] hover:bg-[#00ff9d]/10'}`}
                            >
                                WINDOW
                            </button>
                        </div>

                        {/* Filter Selector */}


                        {/* Toggles */}
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center justify-between text-xs font-mono text-[#00ff9d] cursor-pointer hover:bg-white/5 p-1 rounded">
                                SHOW FIRMAMENT
                                <input
                                    type="checkbox"
                                    checked={isFirmamentLocked}
                                    onChange={(e) => setIsFirmamentLocked(e.target.checked)}
                                    className="accent-[#00ff9d]"
                                />
                            </label>

                            <label className="flex items-center justify-between text-xs font-mono text-[#00ff9d] cursor-pointer hover:bg-white/5 p-1 rounded">
                                SHOW STARS
                                <input
                                    type="checkbox"
                                    checked={showStars}
                                    onChange={(e) => updateSetting('showStars', e.target.checked)}
                                    className="accent-[#00ff9d]"
                                />
                            </label>

                            <label className="flex items-center justify-between text-xs font-mono text-[#00ff9d] cursor-pointer hover:bg-white/5 p-1 rounded">
                                AUTO ROTATE
                                <input
                                    type="checkbox"
                                    checked={autoRotate}
                                    onChange={(e) => updateSetting('autoRotate', e.target.checked)}
                                    className="accent-[#00ff9d]"
                                />
                            </label>

                            <label className="flex items-center justify-between text-xs font-mono text-[#00ff9d] cursor-pointer hover:bg-white/5 p-1 rounded">
                                IDE: NEW TAB
                                <input
                                    type="checkbox"
                                    checked={activeWorkspace.ideOpenMode !== 'window'}
                                    onChange={(e) => updateSetting('ideOpenMode', e.target.checked ? 'tab' : 'window')}
                                    className="accent-[#00ff9d]"
                                />
                            </label>
                        </div>

                        {/* Dock Scale Slider */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-[#00ff9d]/70">DOCK SCALE: {dockScale.toFixed(1)}</span>
                            <input
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={dockScale}
                                onChange={(e) => updateSetting('dockScale', parseFloat(e.target.value))}
                                className="w-full accent-[#00ff9d] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Rotation Speed */}
                        {autoRotate && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono text-[#00ff9d]/70">ROTATION SPEED: {autoRotateSpeed}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={autoRotateSpeed}
                                    onChange={(e) => updateSetting('autoRotateSpeed', parseFloat(e.target.value))}
                                    className="w-full accent-[#00ff9d] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* RESET CONFIRMATION MODAL */}
            {isResetting && (
                <div className="absolute inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-black border border-red-500 w-full max-w-md p-6 flex flex-col gap-4 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                        <div className="flex items-center gap-3 text-red-500 border-b border-red-500/30 pb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <h2 className="text-xl font-mono font-bold tracking-widest">SYSTEM PURGE</h2>
                        </div>

                        <div className="space-y-4">
                            <p className="text-white/60 text-sm font-mono leading-relaxed">
                                WARNING: This will permanently clear all windows and reset the current workspace configuration. This action cannot be undone.
                            </p>

                            <div className="space-y-2">
                                <label className="text-xs text-red-400 font-mono">TYPE 'CONFIRM' TO EXECUTE:</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={resetPhrase}
                                    onChange={(e) => setResetPhrase(e.target.value.toUpperCase())}
                                    placeholder="CONFIRM"
                                    className="w-full bg-red-900/10 border border-red-500/50 p-2 text-red-500 font-mono outline-none focus:bg-red-900/20 text-center tracking-widest uppercase placeholder-red-900/50"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleHardReset();
                                        if (e.key === 'Escape') setIsResetting(false);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setIsResetting(false)}
                                className="flex-1 py-2 text-xs font-mono text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                            >
                                ABORT
                            </button>
                            <button
                                onClick={handleHardReset}
                                disabled={resetPhrase !== 'CONFIRM'}
                                className={`flex-1 py-2 text-xs font-mono font-bold tracking-widest border transition-all ${resetPhrase === 'CONFIRM'
                                    ? 'bg-red-600 text-black border-red-600 hover:bg-red-500'
                                    : 'bg-transparent text-red-900 border-red-900 cursor-not-allowed'
                                    }`}
                            >
                                PURGE
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <color attach="background" args={['#050505']} />
                    {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <HolographicScene
                        activeCode={isFirmamentLocked ? 'FIRMAMENT' : (windows.find(w => w.id === activeWindowId)?.code || 'FIRMAMENT')}
                        activeLayers={firmamentLayers}
                        scale={viewport.scale}
                        showStars={showStars}
                        enableRotation={autoRotate}
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={autoRotate}
                        autoRotateSpeed={autoRotateSpeed}
                    />
                </Canvas>
            </div>

            {/* Window Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {windows.map((win) => {
                    const isPinned = win.isPinned;
                    const displayX = isPinned ? (win.x * viewport.scale + viewport.x) : win.x;
                    const displayY = isPinned ? (win.y * viewport.scale + viewport.y) : win.y;
                    const displayScale = isPinned ? viewport.scale : 1;

                    const getEngineData = getActiveEngineData(win.code);
                    const isProject = getEngineData?.type === 'PROJECT';

                    return (
                        <WindowFrame
                            key={win.id}
                            {...win}
                            x={displayX}
                            y={displayY}
                            scale={displayScale}
                            // pan={{ x: 0, y: 0 }} // Removing unused prop to fix lint
                            isActive={activeWindowId === win.id}
                            isPinned={isPinned}
                            onTogglePin={togglePin}
                            onPopOut={isProject ? () => window.open(`/ide?project=${win.code}`, '_blank') : undefined}
                            onClose={closeWindow}
                            onFocus={focusWindow}
                            onMove={moveWindow}
                            onToggleFullScreen={toggleFullScreen}
                            onActivity={handleWindowActivity}
                        >
                            <div
                                className="relative w-full h-full overflow-hidden isolate"
                                onWheel={(e) => interactionMode === 'window' ? e.stopPropagation() : undefined}
                            >
                                {getEngineComponent(win.code)}
                            </div>
                        </WindowFrame>
                    );
                })}
            </div>

            {/* Overlay UI (Header/Dock) */}
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between pt-12">
                <header className="w-full p-6 flex justify-between items-start pointer-events-auto">
                    <div className="flex gap-4 items-center">
                        <span className="text-[10px] font-bold text-brand tracking-widest animate-pulse">● SYSTEM ONLINE</span>
                    </div>
                </header>

                {/* Draggable Dock Container */}
                <DraggableDock>

                    <ProductDock
                        tabs={tabs}
                        activeTab={windows.find(w => w.id === activeWindowId)?.code || null}
                        primedTab={primedCode}
                        onSelect={openWindow}
                        onHover={(code) => {
                            // Optional: could sync primedCode here if desired, specific to mouse hover
                            // For now, let local dock state handle visual hover, but we clear primedCode on mousemove roughly
                        }}
                        filterType={activeWorkspace.filterType}
                        scale={dockScale}
                    />

                </DraggableDock>
            </div>
        </div>
    );
}

// Draggable Wrapper for the Dock
// Draggable Wrapper for the Dock
function DraggableDock({ children }) {
    // Initialize from localStorage or default
    const [position, setPosition] = useState(() => {
        try {
            const saved = localStorage.getItem('ns_dock_pos');
            return saved ? JSON.parse(saved) : { left: 40, bottom: 40 };
        } catch (e) {
            return { left: 40, bottom: 40 };
        }
    });

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Mouse position
    const [dragOffset, setDragOffset] = useState({ left: 0, bottom: 0 }); // Element position at start

    // Persist on change (debounced effectively by state updates stopping when not dragging)
    useEffect(() => {
        if (!isDragging) {
            localStorage.setItem('ns_dock_pos', JSON.stringify(position));
        }
    }, [position, isDragging]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setDragOffset({ left: position.left, bottom: position.bottom });
    };

    const resetPosition = (e) => {
        e.stopPropagation();
        const def = { left: 40, bottom: 40 };
        setPosition(def);
        localStorage.setItem('ns_dock_pos', JSON.stringify(def));
    };

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - dragStart.x;
            const deltaY = dragStart.y - e.clientY; // Inverted for 'bottom' anchoring

            setPosition({
                left: dragOffset.left + deltaX,
                bottom: dragOffset.bottom + deltaY
            });
        };
        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, dragOffset]);

    return (
        <div
            className="absolute pointer-events-auto flex flex-col items-start gap-2 group z-[9000]"
            style={{
                left: `${position.left}px`,
                bottom: `${position.bottom}px`,
                transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
        >
            {/* The Dock Content */}
            <div className="relative">
                {children}
            </div>

            {/* Drag Handle & Controls */}
            <div className="flex items-center gap-2 mt-2 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div
                    onMouseDown={handleMouseDown}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/40 cursor-move flex items-center justify-center transition-colors backdrop-blur-sm shadow-sm"
                    title="Drag Dock"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" fillOpacity="0.8">
                        <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z" />
                    </svg>
                </div>

                <button
                    onClick={resetPosition}
                    className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/30 border border-red-500/20 hover:border-red-500/50 flex items-center justify-center text-red-300 transition-colors backdrop-blur-sm"
                    title="Reset Position"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>
            </div>
        </div >
    );
}
