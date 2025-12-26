import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, Shield, Zap, RefreshCw, AlertTriangle,
    Server, Globe, Database, Lock, Terminal, Archive,
    ChevronRight, Command, Search, X, CheckCircle
} from 'lucide-react';

// --- Configuration & Mock Data ---

const DEFCON_LEVELS = {
    5: { id: 5, label: 'NORMAL', color: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500/50' },
    4: { id: 4, label: 'GUARDED', color: 'blue', bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500/50' },
    3: { id: 3, label: 'ELEVATED', color: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/50' },
    2: { id: 2, label: 'HIGH', color: 'orange', bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/50' },
    1: { id: 1, label: 'CRITICAL', color: 'red', bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600/50' },
};

const INITIAL_SYSTEMS = [
    { id: 'BCP-01', name: 'Primary DB (US-EAST)', type: 'Database', region: 'US', status: 'HEALTHY', latency: 45, history: [45, 46, 44, 45, 48, 45, 43, 45] },
    { id: 'BCP-02', name: 'Key Mgmt (HSM)', type: 'Security', region: 'Global', status: 'HEALTHY', latency: 120, history: [120, 119, 121, 120, 120, 118, 122, 120] },
    { id: 'BCP-03', name: 'CDN Edge Network', type: 'Network', region: 'Global', status: 'DEGRADED', latency: 210, history: [140, 150, 180, 200, 210, 215, 210, 208] },
    { id: 'BCP-04', name: 'Backup Power', type: 'Infra', region: 'Local', status: 'STANDBY', latency: 0, history: [0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'BCP-05', name: 'Auth Service (EU)', type: 'Security', region: 'EU', status: 'HEALTHY', latency: 85, history: [85, 84, 86, 85, 85, 88, 85, 85] },
    { id: 'BCP-06', name: 'Replica DB (ASIA)', type: 'Database', region: 'ASIA', status: 'HEALTHY', latency: 240, history: [240, 242, 238, 240, 240, 239, 241, 240] },
    { id: 'BCP-07', name: 'Message Queue (US-W)', type: 'Infra', region: 'US', status: 'HEALTHY', latency: 55, history: [55, 54, 56, 55, 53, 55, 55, 54] },
    { id: 'BCP-08', name: 'Lambda Edge (Global)', type: 'Compute', region: 'Global', status: 'HEALTHY', latency: 130, history: [130, 128, 132, 130, 129, 131, 130, 128] },
    { id: 'BCP-09', name: 'Cold Store (Glacier)', type: 'Storage', region: 'EU', status: 'STANDBY', latency: 0, history: [0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'BCP-10', name: 'Payment Gateway', type: 'Service', region: 'US', status: 'HEALTHY', latency: 65, history: [65, 67, 64, 65, 66, 65, 64, 65] },
    { id: 'BCP-11', name: 'Audit Logger', type: 'Service', region: 'Global', status: 'HEALTHY', latency: 90, history: [90, 89, 91, 90, 88, 92, 90, 89] },
    { id: 'BCP-12', name: 'VPC Peering Link', type: 'Network', region: 'ASIA', status: 'DEGRADED', latency: 180, history: [160, 165, 170, 175, 180, 178, 180, 182] },
];

const PROTOCOLS = [
    { id: 'P-99', name: 'Circuit Breaker', type: 'Critical', triggered: false, impact: 'Total Halt', description: 'Immediate cessation of all outbound traffic.' },
    { id: 'P-22', name: 'Data Vault Lock', type: 'Security', triggered: false, impact: 'Read-Only', description: 'Enforce WORM (Write Once Read Many) state on primary DB.' },
    { id: 'P-11', name: 'Failover to EU', type: 'Routing', triggered: false, impact: 'High Latency', description: 'Redirect US traffic to EU-West mirrors.' },
    { id: 'P-00', name: 'Cold Storage Dump', type: 'Preservation', triggered: false, impact: 'Offline', description: 'Dump memory to tape buffer.' },
    { id: 'P-88', name: 'DNS Blackhole', type: 'Network', triggered: false, impact: 'Unreachable', description: 'Null-route all ingress traffic DNS records.' },
    { id: 'P-77', name: 'Admin Session Kill', type: 'Security', triggered: false, impact: 'Logout', description: 'Force invalidate all active JWT tokens globally.' },
    { id: 'P-66', name: 'Air Gap Mode', type: 'Isolation', triggered: false, impact: 'Internal-Only', description: 'Physically sever external fiber connections (Simulation).' },
    { id: 'P-55', name: 'Financial Freeze', type: 'Legal', triggered: false, impact: 'Auth Lock', description: 'Suspend all transaction processing pipelines immediately.' },
    { id: 'P-44', name: 'Legal Hold', type: 'Compliance', triggered: false, impact: 'Logging', description: 'Set max-retention on all access logs for forensic audit.' },
    { id: 'P-33', name: 'API Rate Throttle', type: 'Traffic', triggered: false, impact: 'Slow', description: 'Limit all API keys to 1 req/sec strict.' },
    { id: 'P-21', name: 'Code Freeze', type: 'Deployment', triggered: false, impact: 'No Deploys', description: 'Lock CI/CD pipelines. No new artifacts.' },
    { id: 'P-10', name: 'Satellite Uplink', type: 'Redundancy', triggered: false, impact: 'Expensive', description: 'Route critical comms via Low-Earth Orbit backup.' },
];


// --- Helper Components ---

const Sparkline = ({ data, colorClass }) => {
    const max = Math.max(...data, 1);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((d - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-50">
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" className={colorClass} />
        </svg>
    );
};

const SwitchToggle = ({ armed, triggered, onArm, onTrigger, colorTheme }) => (
    <div className="flex items-center gap-2">
        <button
            onClick={onArm}
            className={`px-2 py-1 text-[9px] uppercase font-bold border rounded transition-colors ${armed ? 'bg-white/10 text-white border-white/40' : 'text-white/30 border-white/10 hover:border-white/30'}`}
        >
            {armed ? 'ARMED' : 'SAFE'}
        </button>
        <button
            onClick={armed ? onTrigger : undefined}
            disabled={!armed}
            className={`
                h-6 w-10 rounded-full border relative transition-all duration-300
                ${triggered
                    ? `bg-${colorTheme.color}-500 border-${colorTheme.color}-400 shadow-[0_0_10px_rgba(255,255,255,0.3)]`
                    : armed
                        ? 'bg-red-900/40 border-red-500/50 cursor-pointer hover:bg-red-800/60'
                        : 'bg-white/5 border-white/10 cursor-not-allowed'}
            `}
        >
            <div className={`absolute top-1 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all duration-300 ${triggered ? 'left-5' : 'left-1'}`} />
        </button>
    </div>
);

// --- Main Engine ---

export default function BCPView() {
    // State
    const [defcon, setDefcon] = useState(5);
    const [systems, setSystems] = useState(INITIAL_SYSTEMS);
    const [protocols, setProtocols] = useState(PROTOCOLS);
    const [armedProtocols, setArmedProtocols] = useState({});
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [logs, setLogs] = useState(['[SYSTEM] BCP Engine Initialized...', '[INFO] Monitoring 12 nodes globally.']);
    const [drillActive, setDrillActive] = useState(false);
    const [filterRegion, setFilterRegion] = useState('ALL');
    const [cmdOpen, setCmdOpen] = useState(false);
    const [cmdQuery, setCmdQuery] = useState('');
    const [selectedProtocolId, setSelectedProtocolId] = useState(null);

    // Layout & Positions
    // Store positions separately to avoid re-calcs on system updates
    const [nodePositions, setNodePositions] = useState({});
    const [diagramOffset, setDiagramOffset] = useState({ x: 0, y: 0 });

    // Initialize positions once on mount
    useEffect(() => {
        const initialPos = {};
        const count = INITIAL_SYSTEMS.length;
        const radius = 220;

        INITIAL_SYSTEMS.forEach((sys, i) => {
            const angle = (i / count) * 2 * Math.PI;
            initialPos[sys.id] = {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            };
        });
        setNodePositions(initialPos);
    }, []);

    const updateNodePosition = (id, dx, dy) => {
        setNodePositions(prev => ({
            ...prev,
            [id]: { x: prev[id].x + dx, y: prev[id].y + dy }
        }));
    };

    const updateDiagramOffset = (dx, dy) => {
        setDiagramOffset(prev => ({
            x: prev.x + dx,
            y: prev.y + dy
        }));
    };

    const logsEndRef = useRef(null);
    const currentTheme = DEFCON_LEVELS[defcon] || DEFCON_LEVELS[5];

    // Scroll logs
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    // Live Heartbeat & Drill Logic
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly fluctuate latency
            setSystems(prev => prev.map(sys => {
                if (sys.status === 'STANDBY') return sys;

                const flux = Math.floor(Math.random() * 10) - 4; // -4 to +5
                let newLat = Math.max(0, sys.latency + flux);

                // If Drill is active, chaotic spikes
                if (drillActive && Math.random() > 0.7) {
                    newLat += Math.floor(Math.random() * 100);
                    if (newLat > 400 && sys.status !== 'DEGRADED') {
                        addLog(`[WARN] Latency Spike detected on ${sys.name}`);
                        return { ...sys, latency: newLat, status: 'DEGRADED', history: [...sys.history.slice(1), newLat] };
                    }
                } else if (!drillActive && sys.status === 'DEGRADED' && Math.random() > 0.8) {
                    // Auto-heal if no drill
                    newLat = Math.max(40, newLat - 50);
                    if (newLat < 150) {
                        addLog(`[INFO] ${sys.name} recovered to healthy limits.`);
                        return { ...sys, latency: newLat, status: 'HEALTHY', history: [...sys.history.slice(1), newLat] };
                    }
                }

                return { ...sys, latency: newLat, history: [...sys.history.slice(1), newLat] };
            }));

            // Random background logs
            if (Math.random() > 0.8) {
                const msgs = [
                    `[HEARTBEAT] Node sync OK (${Math.floor(Math.random() * 20) + 10}ms)`,
                    '[NET] Packet integrity verified.',
                    '[SEC] Key rotation schedule check: OK.',
                    '[GRID] Power consumption stable.'
                ];
                addLog(msgs[Math.floor(Math.random() * msgs.length)]);
            }

        }, 1200);
        return () => clearInterval(interval);
    }, [drillActive]);

    // Keyboard Command
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey && e.key === 'k') {
                e.preventDefault();
                setCmdOpen(prev => !prev);
            }
            if (e.key === 'Escape') setCmdOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const addLog = (msg) => {
        setLogs(prev => [...prev.slice(-49), `${new Date().toLocaleTimeString().split(' ')[0]} ${msg}`]);
    };

    const handleProtocolAction = (id, action) => { // action: 'arm' | 'trigger'
        if (action === 'arm') {
            setArmedProtocols(prev => ({ ...prev, [id]: !prev[id] }));
        } else {
            // Trigger
            setProtocols(prev => prev.map(p => p.id === id ? { ...p, triggered: !p.triggered } : p));
            const proto = protocols.find(p => p.id === id);
            const isTurningOn = !proto.triggered;

            addLog(`[ALERT] Protocol ${proto.name} ${isTurningOn ? 'ACTIVATED' : 'DISENGAGED'} by User.`);

            if (isTurningOn) {
                setDefcon(prev => Math.max(1, prev - 1)); // Lower defcon (more critical)
                // "Fix" things visually
                setTimeout(() => {
                    setSystems(sys => sys.map(s => s.status === 'DEGRADED' ? { ...s, status: 'HEALTHY', latency: 45 } : s));
                    addLog(`[EFFECT] ${proto.name} mitigated active faults.`);
                }, 1000);
            } else {
                setDefcon(prev => Math.min(5, prev + 1)); // Raise defcon (safer)
            }
        }
    };

    const toggleDrill = () => {
        const newState = !drillActive;
        setDrillActive(newState);
        addLog(newState ? '[WARN] *** DRILL SIMULATION STARTED ***' : '[INFO] Drill simulation ended.');
        if (newState) setDefcon(3);
        else setDefcon(5);
    };

    const filteredSystems = systems.filter(s => filterRegion === 'ALL' || s.region === filterRegion);

    // Helper to reset layout
    const resetLayout = (type = 'RADIAL') => {
        const newPos = {};
        const count = systems.length;

        systems.forEach((sys, i) => {
            let x, y;
            if (type === 'GRID') {
                const cols = 4;
                const col = i % cols;
                const row = Math.floor(i / cols);
                x = (col - 1.5) * 120;
                y = (row - (Math.ceil(count / cols) / 2) + 0.5) * 100;
            } else {
                const angle = (i / count) * 2 * Math.PI;
                const radius = 220;
                x = Math.cos(angle) * radius;
                y = Math.sin(angle) * radius;
            }
            newPos[sys.id] = { x, y };
        });
        setNodePositions(newPos);
        setDiagramOffset({ x: 0, y: 0 });
    };

    return (
        <div className={`absolute inset-0 w-full h-full flex justify-between px-6 pt-20 pb-8 overflow-hidden transition-colors duration-1000 ${drillActive ? 'bg-red-950/10' : ''}`}>

            {/* --- LEFT: System Vitals (Split View) --- */}
            <div className="flex flex-col gap-4 w-[26rem] h-full pointer-events-auto z-10 relative">

                {/* Vitals List - Always Visible */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col shadow-xl flex-1 min-h-0 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-3">
                            <Activity className={`w-5 h-5 ${currentTheme.text}`} />
                            <h3 className={`text-sm font-bold tracking-widest uppercase text-white`}>
                                System Vitals
                            </h3>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border ${currentTheme.border} ${currentTheme.text}`}>
                            DEFCON {defcon}: {currentTheme.label}
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex gap-2 mb-3">
                        {['ALL', 'US', 'EU', 'ASIA', 'Global'].map(r => (
                            <button
                                key={r}
                                onClick={() => setFilterRegion(r)}
                                className={`text-[9px] px-2 py-1 rounded transition-colors ${filterRegion === r ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* System Grid */}
                    <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                        <AnimatePresence>
                            {filteredSystems.map((check) => {
                                const isSelected = selectedSystem?.id === check.id;
                                const statusColor = check.status === 'HEALTHY' ? 'text-emerald-400' :
                                    check.status === 'DEGRADED' ? 'text-orange-400' : 'text-white/40';

                                return (
                                    <motion.div
                                        key={check.id}
                                        onClick={() => setSelectedSystem(check)}
                                        className={`
                                            p-3 rounded border cursor-pointer relative overflow-hidden group transition-all
                                            ${isSelected ? `bg-white/10 ${currentTheme.border}` : 'bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10'}
                                        `}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${check.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`} />
                                                <h4 className="text-xs font-bold text-gray-200 group-hover:text-white">{check.name}</h4>
                                            </div>
                                            <span className={`text-[9px] font-mono ${statusColor}`}>{check.status}</span>
                                        </div>

                                        <div className="flex items-end justify-between mt-2">
                                            <div className="text-[10px] text-white/40 font-mono">
                                                {check.latency}ms <span className="text-white/20 mx-1">|</span> {check.region}
                                            </div>
                                            <div className="w-16 h-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Sparkline data={check.history} colorClass={statusColor} />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Inspection Panel (Conditionally Visible at Bottom) */}
                <AnimatePresence>
                    {selectedSystem && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: 20 }}
                            animate={{ height: '26rem', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shrink-0 shadow-2xl relative z-20"
                        >
                            <div className="p-5 h-full flex flex-col">
                                {/* Header / Back */}
                                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                                    <span className="text-sm font-bold text-white tracking-widest uppercase">System Inspection</span>
                                    <button
                                        onClick={() => setSelectedSystem(null)}
                                        className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                                    {/* Top Hero Stats */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded bg-white/5 border border-white/10 flex flex-col gap-1">
                                            <span className="text-[10px] text-white/40 font-bold uppercase">Latency</span>
                                            <span className={`text-xl font-mono ${selectedSystem.status === 'HEALTHY' ? 'text-emerald-400' : 'text-orange-400'}`}>
                                                {selectedSystem.latency}<span className="text-xs text-white/50">ms</span>
                                            </span>
                                        </div>
                                        <div className="p-3 rounded bg-white/5 border border-white/10 flex flex-col gap-1">
                                            <span className="text-[10px] text-white/40 font-bold uppercase">Status</span>
                                            <span className={`text-lg font-bold ${selectedSystem.status === 'HEALTHY' ? 'text-emerald-500' : 'text-orange-500'}`}>
                                                {selectedSystem.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Graph Area */}
                                    <div className="bg-black/40 rounded border border-white/5 p-3 relative h-32 shrink-0">
                                        <span className="absolute top-2 left-2 text-[9px] text-white/30 font-mono">LIVE PERFORMANCE LOG</span>
                                        <div className="w-full h-full pt-4">
                                            <Sparkline
                                                data={selectedSystem.history}
                                                colorClass={selectedSystem.status === 'HEALTHY' ? 'text-emerald-500' : 'text-orange-500'}
                                            />
                                        </div>
                                    </div>

                                    {/* Details Table */}
                                    <div className="space-y-2 text-[10px]">
                                        <div className="flex justify-between border-b border-white/5 pb-1">
                                            <span className="text-white/40">SYSTEM ID</span>
                                            <span className="text-white font-mono">{selectedSystem.id}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-1">
                                            <span className="text-white/40">NODE TYPE</span>
                                            <span className="text-white">{selectedSystem.type}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-1">
                                            <span className="text-white/40">REGION</span>
                                            <span className="text-white">{selectedSystem.region}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-2 mt-auto">
                                        <button className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center gap-2 group transition-all border border-white/5 hover:border-white/20">
                                            <RefreshCw className="w-3 h-3 text-white/40 group-hover:text-white" />
                                            <span className="text-[10px] font-bold text-white/60 group-hover:text-white">REBOOT</span>
                                        </button>
                                        <button className="py-2 px-3 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center gap-2 group transition-all border border-white/5 hover:border-white/20">
                                            <Terminal className="w-3 h-3 text-white/40 group-hover:text-white" />
                                            <span className="text-[10px] font-bold text-white/60 group-hover:text-white">SSH</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* --- CENTER: Topology Visualization --- */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                {/* View Controls (Floating) */}
                <div className="absolute top-4 right-4 flex gap-2 z-40">
                    <button onClick={() => resetLayout('RADIAL')} className="px-2 py-1 bg-black/50 border border-white/10 rounded text-[10px] text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                        RESET RADIAL
                    </button>
                    <button onClick={() => resetLayout('GRID')} className="px-2 py-1 bg-black/50 border border-white/10 rounded text-[10px] text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                        RESET GRID
                    </button>
                </div>

                {/* Central Map Node Structure */}
                <div className="relative w-full h-full max-w-4xl max-h-4xl flex items-center justify-center">

                    {/* Central Hub */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 z-20"
                        style={{ x: diagramOffset.x, y: diagramOffset.y, marginLeft: -48, marginTop: -48 }}
                        drag
                        dragMomentum={false}
                        onDrag={(_, info) => updateDiagramOffset(info.delta.x, info.delta.y)}
                        whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
                        whileHover={{ cursor: 'grab', scale: 1.05 }}
                    >
                        <div className={`w-24 h-24 rounded-full border-2 ${currentTheme.border} bg-black/80 backdrop-blur flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.6)]`}>
                            <Globe className={`w-10 h-10 ${currentTheme.text} animate-pulse`} />
                            {/* Orbiting Rings */}
                            <div className={`absolute inset-0 rounded-full border border-dashed ${currentTheme.border} animate-[spin_12s_linear_infinite] opacity-30 w-[140%] h-[140%] -top-[20%] -left-[20%]`} />
                            <div className={`absolute inset-0 rounded-full border border-dotted ${currentTheme.border} animate-[spin_20s_linear_infinite_reverse] opacity-20 w-[180%] h-[180%] -top-[40%] -left-[40%]`} />
                        </div>
                    </motion.div>

                    {/* CONNECTIONS LAYER (SVG) - Rendered behind nodes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        <defs>
                            <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <g style={{ transform: 'translate(50%, 50%)' }} className="overflow-visible"> {/* Center coordinate system */}
                            {systems.map(sys => {
                                const pos = nodePositions[sys.id] || { x: 0, y: 0 };
                                const isHealthy = sys.status === 'HEALTHY';
                                return (
                                    <line
                                        key={`line-${sys.id}`}
                                        x1={diagramOffset.x} y1={diagramOffset.y}
                                        x2={pos.x + diagramOffset.x} y2={pos.y + diagramOffset.y}
                                        stroke={isHealthy ? '#10b981' : '#f97316'}
                                        strokeWidth={isHealthy ? 1 : 2}
                                        strokeOpacity={isHealthy ? 0.2 : 0.6}
                                        className="transition-all duration-300"
                                    />
                                );
                            })}
                        </g>
                    </svg>

                    {/* NODES LAYER */}
                    {systems.map((sys) => {
                        const pos = nodePositions[sys.id] || { x: 0, y: 0 };
                        const isSelected = selectedSystem?.id === sys.id;

                        return (
                            <motion.div
                                key={sys.id}
                                className="absolute top-1/2 left-1/2 z-30"
                                initial={false}
                                animate={{ x: pos.x + diagramOffset.x, y: pos.y + diagramOffset.y }}
                                drag
                                dragMomentum={false}
                                onDrag={(_, info) => {
                                    // Update visual position continuously for line sync
                                    updateNodePosition(sys.id, info.delta.x, info.delta.y);
                                }}
                                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                                whileHover={{ scale: 1.1, zIndex: 40 }}
                                style={{ x: pos.x, y: pos.y, cursor: 'grab', touchAction: 'none' }}
                            >
                                <div
                                    className={`
                                        w-12 h-12 -ml-6 -mt-6 rounded-full bg-black border-2
                                        ${isSelected ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110' : sys.status === 'HEALTHY' ? 'border-emerald-500/30' : 'border-orange-500'} 
                                        flex items-center justify-center relative transition-colors shadow-lg
                                    `}
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent drag release glitches if any
                                        setSelectedSystem(sys);
                                    }}
                                >
                                    {sys.type === 'Database' && <Database className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Security' && <Lock className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Network' && <Globe className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Infra' && <Zap className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Compute' && <Server className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Storage' && <Archive className="w-5 h-5 text-white/70" />}
                                    {sys.type === 'Service' && <Activity className="w-5 h-5 text-white/70" />}

                                    {/* Status Indicator Dot */}
                                    <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black ${sys.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-orange-500 animate-ping'}`} />
                                </div>

                                {/* Label */}
                                <div className={`
                                    absolute top-8 left-1/2 transform -translate-x-1/2 
                                    text-[10px] font-mono whitespace-nowrap bg-black/70 px-2 py-0.5 rounded border border-white/10
                                    transition-opacity pointer-events-none
                                    ${isSelected ? 'text-white border-white/40 opacity-100' : 'text-white/50 opacity-60'}
                                `}>
                                    {sys.name}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Event Log Console (Bottom Center) */}
                <div className="absolute bottom-6 left-6 right-6 h-32 bg-black/90 border border-white/10 rounded-lg font-mono text-xs p-3 overflow-hidden flex flex-col pointer-events-auto z-40 shadow-2xl backdrop-blur-md">
                    <div className="flex justify-between items-center text-white/30 mb-2 border-b border-white/10 pb-1">
                        <span>SYSTEM LOGS // CLUSTER_01</span>
                        <span>AUTO-SCROLL: ON</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                        {logs.map((log, i) => (
                            <div key={i} className={`opacity-80 ${log.includes('WARN') || log.includes('ALERT') ? 'text-orange-400' : log.includes('INFO') ? 'text-blue-300' : 'text-emerald-50/60'}`}>
                                <span className="opacity-50 mr-2">{'>'}</span>{log}
                            </div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>

            </div>


            {/* --- RIGHT: Controls & Protocols --- */}
            <div className="flex flex-col gap-4 w-80 pointer-events-auto z-10 h-full">

                {/* Drill Control */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Simulation Control</h3>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-white/60">
                            Status: <span className={drillActive ? 'text-orange-500 font-bold' : 'text-emerald-500'}>{drillActive ? 'DRILL IN PROGRESS' : 'STANDBY'}</span>
                        </div>
                        <button
                            onClick={toggleDrill}
                            className={`px-4 py-2 rounded text-xs font-bold transition-all ${drillActive ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {drillActive ? 'ABORT DRILL' : 'INITIATE DRILL'}
                        </button>
                    </div>
                </div>

                {/* Protocols Master-Detail View */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1 flex flex-col overflow-hidden relative">

                    <AnimatePresence mode="wait">
                        {!selectedProtocolId ? (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full"
                            >
                                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex justify-between items-center">
                                    Protocols
                                    <span className="text-[9px] bg-white/10 text-white px-1.5 py-0.5 rounded">{protocols.length}</span>
                                </h3>

                                <div className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                                    {protocols.map((proto) => (
                                        <button
                                            key={proto.id}
                                            onClick={() => setSelectedProtocolId(proto.id)}
                                            className={`
                                                w-full flex items-center justify-between p-2 rounded border transition-all text-left group
                                                ${proto.triggered
                                                    ? `bg-${currentTheme.color}-900/20 border-${currentTheme.color}-500/50`
                                                    : 'bg-white/5 border-transparent hover:border-white/20 hover:bg-white/10'}
                                            `}
                                        >
                                            <div className="flex flex-col">
                                                <span className={`text-xs font-bold group-hover:text-white transition-colors ${proto.triggered ? 'text-white' : 'text-white/70'}`}>
                                                    {proto.name}
                                                </span>
                                                <span className="text-[9px] text-white/30 font-mono">{proto.id} // {proto.type}</span>
                                            </div>
                                            {proto.triggered && (
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${currentTheme.color}-500 shadow-[0_0_5px_currentColor] animate-pulse`} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col h-full"
                            >
                                {/* Header / Back */}
                                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                                    <button
                                        onClick={() => setSelectedProtocolId(null)}
                                        className="p-1 -ml-1 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 rotate-180" />
                                    </button>
                                    <span className="text-xs font-bold text-white tracking-widest uppercase">Protocol Control</span>
                                </div>

                                {/* Active Card Content - The "Current Display" */}
                                {(() => {
                                    const proto = protocols.find(p => p.id === selectedProtocolId);
                                    if (!proto) return null;
                                    return (
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h2 className="text-lg font-bold text-white leading-tight">{proto.name}</h2>
                                                        <div className="text-[10px] text-white/40 font-mono mt-1">{proto.id}</div>
                                                    </div>
                                                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold border ${proto.triggered ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-white/5 text-white/30 border-white/10'}`}>
                                                        {proto.triggered ? 'ACTIVE' : 'INACTIVE'}
                                                    </div>
                                                </div>

                                                <div className="bg-black/40 rounded p-3 border border-white/5 mb-6">
                                                    <p className="text-xs text-white/70 leading-relaxed">
                                                        {proto.description}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-[10px]">
                                                        <span className="text-white/40">TYPE: <span className="text-white">{proto.type}</span></span>
                                                        <span className={proto.triggered ? 'text-white' : 'text-orange-400'}>IMPACT: {proto.impact}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Big Control Switch */}
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Authorization</span>
                                                    <span className="text-xs text-white font-mono">
                                                        {armedProtocols[proto.id] ? 'READY TO EXECUTE' : 'SAFETY LOCK ON'}
                                                    </span>
                                                </div>
                                                <SwitchToggle
                                                    armed={armedProtocols[proto.id]}
                                                    triggered={proto.triggered}
                                                    onArm={() => handleProtocolAction(proto.id, 'arm')}
                                                    onTrigger={() => handleProtocolAction(proto.id, 'trigger')}
                                                    colorTheme={currentTheme}
                                                />
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* --- COMMAND PALETTE OVERLAY --- */}
            <AnimatePresence>
                {cmdOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]" onClick={() => setCmdOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-[600px] bg-black border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                                <Search className="w-5 h-5 text-white/50" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search systems..."
                                    className="bg-transparent border-none outline-none text-white w-full text-sm font-mono"
                                    value={cmdQuery}
                                    onChange={e => setCmdQuery(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            addLog(`[CMD] Executed: ${cmdQuery}`);
                                            setCmdOpen(false);
                                            setCmdQuery('');
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-1 text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded">
                                    <span>ESC</span>
                                </div>
                            </div>
                            <div className="p-2 text-[10px] text-white/30 font-mono">
                                <div className="px-2 py-1 hover:bg-white/5 rounded cursor-pointer flex justify-between">
                                    <span>/drill start</span>
                                    <span>Simulation</span>
                                </div>
                                <div className="px-2 py-1 hover:bg-white/5 rounded cursor-pointer flex justify-between">
                                    <span>/sys report all</span>
                                    <span>Report</span>
                                </div>
                                <div className="px-2 py-1 hover:bg-white/5 rounded cursor-pointer flex justify-between">
                                    <span>/protocol reset</span>
                                    <span>Safety</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
