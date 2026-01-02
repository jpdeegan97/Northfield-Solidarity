import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, ArrowRight, Banknote, BarChart3, Building2,
    CheckCircle, ChevronDown, Clock, Download, FileText,
    Filter, Globe, History, LayoutDashboard, Link as LinkIcon,
    PieChart, RefreshCw, Search, Shield, AlertTriangle, X,
    Plus, Scale, TrendingUp
} from 'lucide-react';

// --- INITIAL DATA & TYPES ---

const INITIAL_ENTITIES = [
    { id: 'NS-HOLD', name: 'Northfield Solidarity', type: 'Holding', color: '#fbbf24' }, // Amber
    { id: 'SL-OPS', name: 'South Lawn Operations', type: 'Subsidiary', color: '#3b82f6' }, // Blue
    { id: 'NSDC-LABS', name: 'NSDC Labs', type: 'R&D', color: '#ec4899' } // Pink
];

const INITIAL_COST_CENTERS = [
    {
        id: 'CC-001', name: 'Core Infrastructure', type: 'Technology', owner: 'NSDC-LABS',
        lead: 'Dr. Sarah Chen', headcount: 12, health: 'Good', risk: 'Low',
        description: 'Critical backbone services, cloud provisioning, and network security operations.',
        tags: ['Critical', '24/7'],
        recentActions: [
            { date: '2h ago', action: 'Capacity Scaling', desc: 'Auto-scaled k8s cluster due to load spike' },
            { date: '1d ago', action: 'Vendor Audit', desc: 'Quarterly review of AWS reserved instances completed' }
        ]
    },
    {
        id: 'CC-002', name: 'Executive Staff', type: 'Payroll', owner: 'NS-HOLD',
        lead: 'Marcus Thorne', headcount: 5, health: 'Good', risk: 'Stable',
        description: 'C-Suite compensation, leadership development, and strategic planning resources.',
        tags: ['Payroll', 'Strategy'],
        recentActions: [
            { date: '4d ago', action: 'Comp Adjustment', desc: 'Q4 Performance bonuses processed' }
        ]
    },
    {
        id: 'CC-003', name: 'Legal Department', type: 'Services', owner: 'NS-HOLD',
        lead: 'Jessica Pearson', headcount: 3, health: 'Warning', risk: 'Medium',
        description: 'Corporate counsel, IP protection, and compliance monitoring.',
        tags: ['Compliance', 'Retainer'],
        recentActions: [
            { date: '12h ago', action: 'Retainer Depleted', desc: 'Alert: Litigation fund below 20% threshold' }
        ]
    },
    {
        id: 'CC-004', name: 'Marketing Campaigns', type: 'Growth', owner: 'SL-OPS',
        lead: 'David Ross', headcount: 8, health: 'Good', risk: 'High',
        description: 'User acquisition channels, brand awareness, and go-to-market experiments.',
        tags: ['Growth', 'Variable'],
        recentActions: [
            { date: '4h ago', action: 'Ad Spend Boost', desc: 'Authorized +$10k for Q4 holiday push' }
        ]
    },
    {
        id: 'CC-005', name: 'Office Leases', type: 'Facilities', owner: 'SL-OPS',
        lead: 'Elena Fisher', headcount: 2, health: 'Good', risk: 'Stable',
        description: 'Physical workspace expenses, utilities, and maintenance.',
        tags: ['Fixed', 'Ops'],
        recentActions: []
    }
];

// ... (INITIAL_BUDGETS, INITIAL_LEDGER_ENTRIES, INITIAL_SANKEY_DATA, INITIAL_RECON_ITEMS are unchanged)

const INITIAL_BUDGETS = {
    'NS-HOLD': [
        { id: 'B-001', name: 'Corp Treasury', cap: 5000000, burned: 1250000, status: 'OK', allocations: [{ ccId: 'CC-002', val: 750000 }, { ccId: 'CC-003', val: 500000 }] },
        { id: 'B-002', name: 'Legal Retainer', cap: 200000, burned: 45000, status: 'OK', allocations: [{ ccId: 'CC-003', val: 45000 }] },
    ],
    'SL-OPS': [
        { id: 'B-101', name: 'Q3 OpEx', cap: 450000, burned: 410000, status: 'NEAR_LIMIT', allocations: [{ ccId: 'CC-005', val: 300000 }, { ccId: 'CC-004', val: 110000 }] },
        { id: 'B-102', name: 'Marketing', cap: 150000, burned: 80000, status: 'OK', allocations: [{ ccId: 'CC-004', val: 80000 }] },
    ],
    'NSDC-LABS': [
        { id: 'B-201', name: 'Cloud Infra', cap: 120000, burned: 118000, status: 'EXHAUSTED', allocations: [{ ccId: 'CC-001', val: 118000 }] },
        { id: 'B-202', name: 'R&D Staff', cap: 800000, burned: 350000, status: 'OK', allocations: [{ ccId: 'CC-001', val: 350000 }] },
    ]
};

const INITIAL_LEDGER_ENTRIES = [
    { id: 'LE-1001', txId: 'TX-990-221', desc: 'AWS Infrastructure', amount: -420.00, entityId: 'NSDC-LABS', timestamp: Date.now() - 600000, type: 'OPEX', status: 'CLEARED' },
    { id: 'LE-1000', txId: 'TX-990-220', desc: 'Stripe Payout', amount: 1250.00, entityId: 'SL-OPS', timestamp: Date.now() - 3600000, type: 'REVENUE', status: 'CLEARED' },
    { id: 'LE-0999', txId: 'TX-990-219', desc: 'Legal Counsel Retainer', amount: -5000.00, entityId: 'NS-HOLD', timestamp: Date.now() - 7200000, type: 'OPEX', status: 'CLEARED' },
    { id: 'LE-0998', txId: 'TX-990-218', desc: 'Seed Funding Tranche', amount: 500000.00, entityId: 'NS-HOLD', timestamp: Date.now() - 86400000, type: 'FUNDING', status: 'CLEARED' },
];

const INITIAL_SANKEY_DATA = {
    nodes: [
        { id: 'SRC-REV', name: 'Revenue In', x: 0, y: 100, color: '#10b981' },
        { id: 'SRC-FUND', name: 'Funding', x: 0, y: 300, color: '#3b82f6' },
        { id: 'LED-MAIN', name: 'Main Ledger', x: 400, y: 200, color: '#eab308' },
        { id: 'SNK-OPS', name: 'OpEx', x: 800, y: 50, color: '#f97316' },
        { id: 'SNK-PAY', name: 'Payroll', x: 800, y: 200, color: '#ef4444' },
        { id: 'SNK-INV', name: 'Investments', x: 800, y: 350, color: '#8b5cf6' },
    ],
    links: [
        { source: 'SRC-REV', target: 'LED-MAIN', value: 40, label: 'Sales' },
        { source: 'SRC-FUND', target: 'LED-MAIN', value: 60, label: 'Capital' },
        { source: 'LED-MAIN', target: 'SNK-OPS', value: 30, label: 'SaaS/Cloud' },
        { source: 'LED-MAIN', target: 'SNK-PAY', value: 50, label: 'Salaries' },
        { source: 'LED-MAIN', target: 'SNK-INV', value: 20, label: 'Yield' },
    ]
};

const INITIAL_RECON_ITEMS = [
    { id: 'R-998', desc: 'Stripe Payout #221', amount: 4220.50, status: 'MATCHED', side: 'BOTH' },
    { id: 'R-999', desc: 'Unidentified Wire', amount: 50000.00, status: 'MISSING_INTERNAL', side: 'BANK' },
    { id: 'R-1000', desc: 'Duplicate Charge AWS', amount: -4200.00, status: 'DISPUTED', side: 'BOTH' },
];

// --- LOGIC ENGINE (Reducer) ---

const floReducer = (state, action) => {
    switch (action.type) {
        case 'INGEST_EVENT': {
            // 1. Create Ledger Entry
            const newEntry = {
                id: `LE-${10000 + state.ledger.length}`,
                txId: `TX-${Date.now().toString().slice(-6)}`,
                desc: action.payload.desc,
                amount: parseFloat(action.payload.amount),
                entityId: action.payload.entityId,
                timestamp: Date.now(),
                type: action.payload.type || 'ADJUSTMENT',
                status: 'CLEARED'
            };

            // 2. Update Budgets (if OpEx)
            let updatedBudgets = { ...state.budgets };
            if (newEntry.amount < 0 && action.payload.budgetImpact) { // Assume negative is spend
                const entityBudgets = updatedBudgets[newEntry.entityId] || [];
                updatedBudgets[newEntry.entityId] = entityBudgets.map(b => {
                    // Auto-assign to first budget for demo simplicity if matches logic
                    // In real app, action.payload.budgetId would be specific
                    return {
                        ...b,
                        burned: b.burned + Math.abs(newEntry.amount),
                        status: (b.burned + Math.abs(newEntry.amount)) >= b.cap ? 'EXHAUSTED' :
                            (b.burned + Math.abs(newEntry.amount)) >= (b.cap * 0.9) ? 'NEAR_LIMIT' : 'OK'
                    };
                });
            }

            // 3. Update Sankey Logic (Simplified Flow Simulation)
            // If expense, increase Flow from Main -> OpEx 
            // If revenue, increase Flow from Rev -> Main
            const newLinks = state.sankey.links.map(l => {
                if (newEntry.amount < 0 && l.target === 'SNK-OPS') return { ...l, value: l.value + 5 }; // Visualize impact
                if (newEntry.amount > 0 && l.source === 'SRC-REV') return { ...l, value: l.value + 5 };
                return l;
            });


            return {
                ...state,
                ledger: [newEntry, ...state.ledger],
                budgets: updatedBudgets,
                sankey: { ...state.sankey, links: newLinks },
                latestEvent: `FLO: Ledger write confirmed ${newEntry.id}`
            };
        }
        case 'RESOLVE_RECON':
            return {
                ...state,
                recon: state.recon.map(r => r.id === action.payload.id ? { ...r, status: 'MATCHED', previousStatus: r.status } : r)
            };
        case 'ROLLBACK_RECON':
            return {
                ...state,
                recon: state.recon.map(r =>
                    r.id === action.payload.id
                        ? { ...r, status: r.previousStatus || 'DISPUTED' }
                        : r
                )
            };
        case 'ARCHIVE_RECON':
            return {
                ...state,
                recon: state.recon.filter(r => r.id !== action.payload.id)
            };
        case 'ADD_COST_CENTER':
            return {
                ...state,
                costCenters: [...state.costCenters, action.payload]
            };
        case 'UPDATE_BUDGET_CAP': {
            const { entityId, budgetId, newCap } = action.payload;
            const updatedBudgets = state.budgets[entityId].map(b =>
                b.id === budgetId ? { ...b, cap: newCap } : b
            );
            return {
                ...state,
                budgets: { ...state.budgets, [entityId]: updatedBudgets }
            };
        }
        case 'DELETE_BUDGET': {
            const { entityId, budgetId } = action.payload;
            const updatedBudgets = state.budgets[entityId].filter(b => b.id !== budgetId);
            return {
                ...state,
                budgets: { ...state.budgets, [entityId]: updatedBudgets }
            };
        }
        default:
            return state;
    }
};

// --- COMPONENTS ---

// 1. Sankey Diagram (Custom SVG)
// 1. Sankey Diagram (Custom SVG)
const SankeyDiagram = ({ nodes, links, onNodeClick }) => {
    // Memoize pseudo-random durations for flow particles
    const particleDurations = useMemo(() => {
        return links.map((_, i) => 2 + ((i * 1337) % 100) / 50);
    }, [links]);

    return (
        <div className="w-full h-full relative">
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
                {links.map((link, i) => {
                    const src = nodes.find(n => n.id === link.source);
                    const dst = nodes.find(n => n.id === link.target);
                    const path = `M ${src.x} ${src.y + 20} C ${src.x + 200} ${src.y}, ${dst.x - 200} ${dst.y}, ${dst.x} ${dst.y + 20}`;
                    const dur = particleDurations[i] || 3;

                    return (
                        <g key={i}>
                            <motion.path
                                d={path}
                                fill="none"
                                stroke={src.color}
                                strokeWidth={Math.min(50, Math.max(2, link.value))}
                                strokeOpacity="0.15"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                            />
                            {/* Flow Particle */}
                            <circle r="4" fill="white">
                                <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
                            </circle>
                        </g>
                    );
                })}
                {nodes.map(node => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer" onClick={() => onNodeClick && onNodeClick(node)}>
                        <motion.g whileHover={{ scale: 1.05 }}>
                            {/* Solid flush color display as requested */}
                            <rect x="-10" y="0" width="140" height="40" rx="4" fill={node.color} stroke="none" fillOpacity="0.9" />
                            <rect x="-10" y="0" width="140" height="40" rx="4" fill="url(#gloss)" stroke="white" strokeWidth="1" strokeOpacity="0.2" fillOpacity="0.2" />
                            <text x="10" y="25" fill="#000" fontSize="12" fontWeight="bold" fontFamily="monospace" style={{ textShadow: '0px 1px 0px rgba(255,255,255,0.4)' }} pointerEvents="none">{node.name}</text>
                        </motion.g>
                    </g>
                ))}
            </svg>
        </div>
    );
};

// 2. Budget Meter
const BudgetMeter = ({ budget, onClick }) => {
    const pct = Math.min(100, (budget.burned / budget.cap) * 100);
    const color = budget.status === 'OK' ? 'bg-emerald-500' : budget.status === 'NEAR_LIMIT' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div
            onClick={() => onClick && onClick(budget)}
            className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors group cursor-pointer"
        >
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{budget.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${color} text-black`}>{budget.status}</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-1">
                <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className={`h-full ${color}`}
                />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>${(budget.burned / 1000).toFixed(1)}k</span>
                <span>/ ${(budget.cap / 1000).toFixed(1)}k</span>

            </div>
        </div>
    );
};

// 2.5 Budget Detail Manager (The "Amazing" View)
const BudgetDetailView = ({ budget, onClose, costCenters, dispatch, viewMode, entityId }) => {
    // State for allocations
    const [lineItems, setLineItems] = useState(() => {
        // Hydrate from budget allocations if they exist, else default
        if (budget.allocations) {
            return budget.allocations.map(a => {
                const cc = costCenters.find(c => c.id === a.ccId);
                return {
                    ccId: a.ccId,
                    name: cc ? cc.name : 'Unknown CC',
                    val: a.val,
                    type: cc ? `${cc.type} // Variable` : 'Cost Center' // Fallback
                };
            });
        }
        return [
            { name: 'Core Infrastructure', val: budget.burned * 0.55 }, // Fallbacks for old data
            { name: 'Software Licenses', val: budget.burned * 0.25 },
        ];
    });

    // Form State
    const [isAdding, setIsAdding] = useState(false);
    // Modified: Logic to support creating a NEW Cost Center vs Selecting Existing
    const [createMode, setCreateMode] = useState('ALLOCATE'); // 'ALLOCATE' | 'NEW_CC'

    // Allocation Form State
    const [newAlloc, setNewAlloc] = useState({ ccId: '', val: '', type: 'Variable' });

    // New Cost Center Form State
    const [newCC, setNewCC] = useState({ name: '', type: '', owner: 'NS-HOLD' });

    const handleSaveAllocation = () => {
        if (!newAlloc.ccId || !newAlloc.val) return;

        const cc = costCenters.find(c => c.id === newAlloc.ccId);
        setLineItems(prev => [...prev, {
            ccId: newAlloc.ccId,
            name: cc.name,
            val: parseFloat(newAlloc.val),
            type: `${cc.type} // ${newAlloc.type}`
        }]);
        setNewAlloc({ ccId: '', val: '', type: 'Variable' });
        setIsAdding(false);
    };

    const handleCreateCostCenter = () => {
        if (!newCC.name || !newCC.type) return;
        const newId = `CC-${100 + Math.floor(Math.random() * 900)}`;
        const newCCEntity = { id: newId, name: newCC.name, type: newCC.type, owner: newCC.owner };

        // Dispatch to global store
        dispatch({ type: 'ADD_COST_CENTER', payload: newCCEntity });

        // Switch back to allocation mode with this new CC selected
        setCreateMode('ALLOCATE');
        setNewAlloc(prev => ({ ...prev, ccId: newId }));
    };

    // Lazy initialization for static random data (Pure)
    const [projectionData] = useState(() => {
        return [...Array(30)].map((_, i) => ({
            height: 20 + Math.random() * 40 + (i > 20 ? i * 2 : 0) // Trend up at end
        }));
    });

    // Memoized Calculations
    const { burnPct, circleCircumference, strokeDashoffset } = useMemo(() => {
        const pct = Math.min(100, Math.round((budget.burned / budget.cap) * 100));
        const circ = 2 * Math.PI * 88;
        const offset = circ * (1 - (pct / 100));
        return { burnPct: pct, circleCircumference: circ, strokeDashoffset: offset };
    }, [budget.burned, budget.cap]);

    const totalAllocated = lineItems.reduce((acc, item) => acc + item.val, 0);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 lg:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-zinc-900 w-full max-w-5xl h-[80vh] border border-white/10 rounded-3xl flex overflow-hidden shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white/50 hover:text-white z-20 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left Panel: High Level Stats & Visuals */}
                <div className="w-1/3 bg-black/40 border-r border-white/10 p-8 flex flex-col relative overflow-hidden">
                    {/* Background Ambient Glow */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-${budget.status === 'OK' ? 'emerald' : 'red'}-500/10 blur-[100px] pointer-events-none`} />

                    <div className="mb-12 relative z-10">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">
                            <span className="bg-white/10 px-2 py-0.5 rounded">Budget Control</span>
                            <span>•</span>
                            <span>{budget.id}</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2 leading-tight">{budget.name}</h2>
                        <p className="text-sm text-white/50">Fiscal Year 2024 / Q4 Allocation</p>
                    </div>

                    {/* Big Circular Stat */}
                    <div className="flex-1 flex flex-col justify-center items-center relative z-10">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Track Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="128" cy="128" r="88" stroke="currentColor" strokeWidth="16" fill="none" className="text-white/5" />
                                {/* Progress Circle */}
                                <motion.circle
                                    cx="128" cy="128" r="88"
                                    stroke="currentColor" strokeWidth="16" fill="none"
                                    className={budget.status === 'OK' ? 'text-emerald-500' : 'text-red-500'}
                                    strokeLinecap="round"
                                    strokeDasharray={circleCircumference}
                                    initial={{ strokeDashoffset: circleCircumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-6xl font-bold text-white tracking-tighter">{burnPct}%</span>
                                <span className="text-xs text-white/40 uppercase font-bold tracking-widest mt-2">{burnPct >= 100 ? 'MAXED OUT' : 'UTILIZED'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4 relative z-10">
                        <div>
                            <div className="flex justify-between text-sm text-white/60 mb-1">
                                <span>Total Cap</span>
                                <span className="text-white font-mono font-bold">${(budget.cap / 1000).toFixed(0)}k</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/60">
                                <span>Allocated</span>
                                <span className="font-mono font-bold text-white">
                                    ${(totalAllocated / 1000).toFixed(2)}k
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Detailed Editor & Breakdown */}
                <div className="flex-1 bg-zinc-900/50 p-8 overflow-y-auto custom-scrollbar flex flex-col">
                    <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Cost Center Distribution</h3>
                            <p className="text-sm text-white/40">Allocate budget to organizational cost centers.</p>
                        </div>
                        <button
                            onClick={() => { setIsAdding(true); setCreateMode('ALLOCATE'); }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'SIM' ? 'bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400' : 'bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400'}`}
                            disabled={viewMode !== 'SIM' && viewMode !== 'LIVE'} // Always enabled really but styled differently
                        >
                            <Plus className="w-4 h-4" />
                            New Allocation
                        </button>
                    </div>

                    {/* REDISTRIBUTE / SIM CONTROLS */}
                    {viewMode === 'SIM' && (
                        <div className="mb-8 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Scale className="w-4 h-4" /> Sim Projection Controls
                            </h4>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="text-[10px] text-white/50 block mb-1">Total Budget Cap Adjustment</label>
                                    <input
                                        type="range"
                                        min={budget.burned}
                                        max={budget.cap * 2}
                                        value={budget.cap}
                                        onChange={(e) => dispatch({
                                            type: 'UPDATE_BUDGET_CAP',
                                            payload: { entityId, budgetId: budget.id, newCap: parseInt(e.target.value) }
                                        })}
                                        className="w-full accent-purple-500 cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                                        <span>Min: ${budget.burned.toLocaleString()}</span>
                                        <span>Current: ${budget.cap.toLocaleString()}</span>
                                        <span>Max: ${(budget.cap * 2).toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this budget in SIM mode?')) {
                                            dispatch({ type: 'DELETE_BUDGET', payload: { entityId, budgetId: budget.id } });
                                            onClose();
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded text-xs font-bold transition-colors"
                                >
                                    Delete Budget
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 space-y-4 mb-8">
                        {isAdding && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-4"
                            >
                                {createMode === 'ALLOCATE' ? (
                                    <>
                                        <div className="text-xs font-bold text-emerald-400 mb-3 uppercase flex justify-between">
                                            <span>New Allocation</span>
                                            <span
                                                onClick={() => setCreateMode('NEW_CC')}
                                                className="cursor-pointer text-emerald-500/50 hover:text-emerald-400 underline decoration-dashed"
                                            >
                                                Create New Cost Center Entity
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex gap-3">
                                                <select
                                                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
                                                    value={newAlloc.ccId}
                                                    onChange={e => setNewAlloc({ ...newAlloc, ccId: e.target.value })}
                                                    autoFocus
                                                >
                                                    <option value="">Select Cost Center...</option>
                                                    {costCenters.map(cc => (
                                                        <option key={cc.id} value={cc.id}>{cc.name} ({cc.id})</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="number"
                                                    placeholder="Amount ($)"
                                                    className="w-32 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                                                    value={newAlloc.val}
                                                    onChange={e => setNewAlloc({ ...newAlloc, val: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex gap-3">
                                                <select
                                                    className="w-1/2 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none"
                                                    value={newAlloc.type}
                                                    onChange={e => setNewAlloc({ ...newAlloc, type: e.target.value })}
                                                >
                                                    <option value="Variable">Variable Cost (Monthly)</option>
                                                    <option value="Fixed">Fixed Cost (Monthly)</option>
                                                    <option value="CapEx">One-Time (CapEx)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() => setIsAdding(false)}
                                                className="px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveAllocation}
                                                className="px-3 py-1.5 bg-emerald-500 text-black font-bold rounded text-xs hover:bg-emerald-400 transition-colors"
                                            >
                                                Save Allocation
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-xs font-bold text-emerald-400 mb-3 uppercase flex items-center gap-2">
                                            <span className="bg-emerald-500 text-black px-1.5 rounded">NEW</span>
                                            <span>System Cost Center Entity</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="Cost Center Name (e.g. AI Research)"
                                                className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                                                value={newCC.name}
                                                onChange={e => setNewCC({ ...newCC, name: e.target.value })}
                                                autoFocus
                                            />
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Department Type (e.g. R&D)"
                                                    className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                                                    value={newCC.type}
                                                    onChange={e => setNewCC({ ...newCC, type: e.target.value })}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Owner ID"
                                                    className="w-1/3 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white/50 focus:border-emerald-500/50 outline-none"
                                                    value={newCC.owner}
                                                    onChange={e => setNewCC({ ...newCC, owner: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() => setCreateMode('ALLOCATE')}
                                                className="px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleCreateCostCenter}
                                                className="px-3 py-1.5 bg-white text-black font-bold rounded text-xs hover:bg-white/90 transition-colors"
                                            >
                                                Create & Alloc
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {lineItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-white/10 transition-colors group"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            {/* Dynamic Icon probably better but fixed for now */}
                                            <PieChart className="w-5 h-5 text-white/60" />
                                        </div>
                                        <div>
                                            <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{item.name}</div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-wider font-bold">{item.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-mono text-white font-bold">${item.val.toLocaleString()}</div>
                                        <div className="text-[10px] text-white/30">{((item.val / Math.max(1, totalAllocated)) * 100).toFixed(1)}% of allocated</div>
                                    </div>
                                </div>
                                {/* Mini Progress Bar */}
                                <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500/40 rounded-full" style={{ width: `${(item.val / Math.max(1, totalAllocated)) * 100}%` }} />
                                </div>
                            </motion.div>
                        ))}

                        <div
                            onClick={() => { setIsAdding(true); setCreateMode('NEW_CC'); }}
                            className="p-8 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/30">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-white/40">Spawn new cost center</span>
                        </div>
                    </div>

                    {/* Forecast Graph Area... (unchanged) */}
                    <div className="mt-auto pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                30-Day Spending Projection
                            </h4>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <span className="text-[10px] text-white/30">Projected</span>
                            </div>
                        </div>

                        <div className="h-32 flex items-end gap-1.5 opacity-80">
                            {projectionData.map((d, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${d.height}%` }}
                                    transition={{ delay: 0.5 + i * 0.02 }}
                                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/60 transition-colors rounded-t-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// 2.6 Cost Center Detail View (The "Everything" Pop-out)
const CostCenterDetailView = ({ costCenter, onClose, allBudgets }) => {
    // Derive financial stats from global budgets
    const associatedAllocations = useMemo(() => {
        let allocs = [];
        Object.values(allBudgets).flat().forEach(b => {
            if (b.allocations) {
                b.allocations.filter(a => a.ccId === costCenter.id).forEach(a => {
                    // Estimate burn proportional to allocation? 
                    // For simplicity, we assume the allocation 'val' is the planned cap for this CC within that budget.
                    // We don't have per-allocation burn in the data model yet, so we'll simulate it based on the parent budget's status.
                    // If budget is NEAR_LIMIT, we assume high utilization of this allocation.
                    const utilFactor = b.status === 'EXHAUSTED' ? 1.0 : b.status === 'NEAR_LIMIT' ? 0.9 : 0.4;
                    allocs.push({
                        budget: b.name,
                        budgetId: b.id,
                        total: a.val,
                        used: a.val * utilFactor
                    });
                });
            }
        });
        return allocs;
    }, [allBudgets, costCenter.id]);

    const totalBudget = associatedAllocations.reduce((acc, curr) => acc + curr.total, 0);
    const totalUsed = associatedAllocations.reduce((acc, curr) => acc + curr.used, 0);
    const burnRate = totalBudget > 0 ? (totalUsed / totalBudget) * 100 : 0;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 lg:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-zinc-900 w-full max-w-6xl h-[85vh] border border-white/10 rounded-3xl flex overflow-hidden shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white/50 hover:text-white z-20 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left Panel: Identity & People */}
                <div className="w-1/3 bg-black/40 border-r border-white/10 flex flex-col relative">
                    {/* Dynamic Background */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-${burnRate > 90 ? 'red' : 'emerald'}-500/10 to-transparent pointer-events-none`} />

                    <div className="p-8 relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/10 text-white/60 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{costCenter.type}</span>
                            <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{costCenter.id}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{costCenter.name}</h2>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">{costCenter.description}</p>

                        <div className="flex gap-2 flex-wrap mb-8">
                            {costCenter.tags?.map(tag => (
                                <span key={tag} className="text-[10px] border border-white/10 px-2 py-1 rounded-full text-white/50">{tag}</span>
                            ))}
                        </div>

                        {/* Key Personnel Cards */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Leadership & Staff</h3>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white border-2 border-zinc-900 shadow-lg">
                                    {costCenter.lead.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">{costCenter.lead}</div>
                                    <div className="text-[10px] text-emerald-400 font-bold uppercase">Head of Department</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/50">Total Headcount</span>
                                    <span className="text-white font-mono font-bold">{costCenter.headcount} FTEs</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/50">Contractors</span>
                                    <span className="text-white font-mono font-bold">2 Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid at Bottom of Left Panel */}
                    <div className="mt-auto p-8 border-t border-white/10 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Health Score</div>
                            <div className={`text-xl font-bold ${costCenter.health === 'Good' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                {costCenter.health}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-[10px] text-white/40 uppercase font-bold mb-1">Risk Factor</div>
                            <div className={`text-xl font-bold ${costCenter.risk === 'Low' ? 'text-emerald-400' : costCenter.risk === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                                {costCenter.risk}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Financials, Activity, Futures */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-zinc-950 p-8">

                    {/* Financial Overview Section */}
                    <div className="mb-10">
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="text-xl font-bold text-white">Financial Performance</h3>
                            <div className="text-right">
                                <div className="text-2xl font-mono text-white font-bold">${totalUsed.toLocaleString()}</div>
                                <div className="text-xs text-white/40">utilized of ${totalBudget.toLocaleString()} allocated</div>
                            </div>
                        </div>

                        {/* Burn Bar */}
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${burnRate}%` }}
                                className={`h-full ${burnRate > 90 ? 'bg-red-500' : burnRate > 70 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-white/30 font-mono uppercase">
                            <span>0% Utilization</span>
                            <span>Target: 85%</span>
                            <span>Cap Exceeded</span>
                        </div>
                    </div>

                    {/* Associated Budgets Table */}
                    <div className="mb-10">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Active Budget Sources</h4>
                        <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-[10px] text-white/40 uppercase">
                                        <th className="p-3 font-medium">Source Budget</th>
                                        <th className="p-3 font-medium">Allocated Cap</th>
                                        <th className="p-3 font-medium">Est. Usage</th>
                                        <th className="p-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {associatedAllocations.length > 0 ? associatedAllocations.map((alloc, i) => (
                                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-3 text-sm text-white font-bold">{alloc.budget} <span className="text-white/30 font-normal ml-1">({alloc.budgetId})</span></td>
                                            <td className="p-3 text-sm text-white/70 font-mono">${alloc.total.toLocaleString()}</td>
                                            <td className="p-3 text-sm text-white/70 font-mono">${alloc.used.toLocaleString()}</td>
                                            <td className="p-3">
                                                <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${(alloc.used / alloc.total) * 100}%` }}></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-6 text-center text-white/30 text-xs italic">No active budget allocations found for this cost center.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Activity & Scenario Planning Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Feed */}
                        <div>
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Recent Actions
                            </h4>
                            <div className="space-y-3">
                                {costCenter.recentActions?.length > 0 ? costCenter.recentActions.map((action, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded border border-white/5 flex gap-3">
                                        <div className="w-1 h-full bg-blue-500 rounded-full shrink-0"></div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1 w-full">
                                                <span className="text-xs font-bold text-white">{action.action}</span>
                                                <span className="text-[9px] text-white/30">{action.date}</span>
                                            </div>
                                            <p className="text-[10px] text-white/50 leading-snug">{action.desc}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="bg-white/5 border border-dashed border-white/10 rounded p-4 text-center text-[10px] text-white/30">
                                        No recent audit logs available.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Future / Change Management */}
                        <div>
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" /> Change Scenarios
                            </h4>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs text-white mb-2">
                                        <span className="font-bold">Projected Q1 Growth</span>
                                        <span className="text-emerald-400">+15%</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 mb-2">Based on current hiring plan approved in B-202.</div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full">
                                        <div className="h-full w-[15%] bg-emerald-500 rounded-full ml-[50%] opacity-50 relative">
                                            <div className="absolute top-0 left-0 w-full h-full bg-emerald-400 blur-[2px]"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <div className="text-xs font-bold text-white mb-2">Pending Adjustments</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        <span className="text-xs text-white/70">Reorg Proposal #882</span>
                                    </div>
                                    <p className="text-[10px] text-white/40 leading-snug">
                                        Merger with Field Ops under consideration. Would increase headcount by 4.
                                    </p>
                                </div>
                                <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] uppercase font-bold text-white transition-colors">
                                    Simulate Impact
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

// 2.8 Node Detail View (Simulated Flow Node Info)
const NodeDetailView = ({ node, links, onClose }) => {
    const inputs = links.filter(l => l.target === node.id);
    const outputs = links.filter(l => l.source === node.id);
    const totalIn = inputs.reduce((acc, l) => acc + l.value, 0);
    const totalOut = outputs.reduce((acc, l) => acc + l.value, 0);

    return (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black border border-white/20 rounded-xl p-6 w-96 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full text-white/50 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: node.color }} />
                    <h3 className="text-lg font-bold text-white">{node.name}</h3>
                </div>

                <div className="space-y-6">
                    {/* Flow Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-3 rounded border border-white/5">
                            <div className="text-[10px] text-white/50 uppercase">Total Inflow</div>
                            <div className="text-xl font-mono text-emerald-400 font-bold">{totalIn}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded border border-white/5">
                            <div className="text-[10px] text-white/50 uppercase">Total Outflow</div>
                            <div className="text-xl font-mono text-blue-400 font-bold">{totalOut}</div>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div>
                        <h4 className="text-xs font-bold text-white/70 uppercase mb-2 border-b border-white/10 pb-1">Sources (In)</h4>
                        {inputs.length ? inputs.map((l, i) => (
                            <div key={i} className="flex justify-between text-xs text-white/60 mb-1">
                                <span>{l.label || 'Unknown'}</span>
                                <span className="font-mono">{l.value}</span>
                            </div>
                        )) : <div className="text-[10px] text-white/20 italic">None</div>}
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white/70 uppercase mb-2 border-b border-white/10 pb-1">Targets (Out)</h4>
                        {outputs.length ? outputs.map((l, i) => (
                            <div key={i} className="flex justify-between text-xs text-white/60 mb-1">
                                <span>{l.label || 'Unknown'}</span>
                                <span className="font-mono">{l.value}</span>
                            </div>
                        )) : <div className="text-[10px] text-white/20 italic">None</div>}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// 2.7 Settings Modal
const SettingsModal = ({ isOpen, onClose, entities, setEntities }) => {
    if (!isOpen) return null;

    const handleColorChange = (id, newColor) => {
        setEntities(prev => prev.map(e => e.id === id ? { ...e, color: newColor } : e));
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white">System Settings</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-white/70 mb-3 uppercase tracking-wider">Entity Configuration</h4>
                        <div className="space-y-3">
                            {entities.map(ent => (
                                <div key={ent.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {/* Colored Badge */}
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shadow-inner border border-white/10" style={{ backgroundColor: ent.color, color: 'rgba(0,0,0,0.6)' }}>
                                            {ent.id.split('-')[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{ent.name}</div>
                                            <div className="text-[10px] text-white/40 font-mono">{ent.id}</div>
                                        </div>
                                    </div>

                                    {/* Custom Color Input Wrapper */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-white/30 uppercase">{ent.color}</span>
                                        <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer hover:scale-110 transition-transform shadow-sm">
                                            {/* Visible Color Swatch */}
                                            <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: ent.color }} />
                                            {/* Hidden Native Input */}
                                            <input
                                                type="color"
                                                value={ent.color}
                                                onChange={(e) => handleColorChange(ent.id, e.target.value)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0 border-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-bold transition-colors">
                        Done
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// 3. Ticker (Updated for Color Coding)
const Ticker = ({ items }) => (
    <div className="absolute top-0 left-0 right-0 h-8 bg-black/90 border-b border-white/10 overflow-hidden flex items-center">
        <div className="whitespace-nowrap flex gap-8 animate-[marquee_20s_linear_infinite] hover:pause">
            {items.map((item, i) => (
                <span key={i} style={{ color: item.color || '#34d399' }} className="text-[10px] font-mono uppercase tracking-wider flex items-center gap-2 opacity-90">
                    <Activity className="w-3 h-3" />
                    {item.text}
                </span>
            ))}
        </div>
    </div>
);

// --- MAIN VIEW ---

export default function FLOView() {
    // State
    const [entities, setEntities] = useState(INITIAL_ENTITIES);
    const [viewMode, setViewMode] = useState('LIVE'); // LIVE | SIM
    const [leftTab, setLeftTab] = useState('LEDGER'); // LEDGER | BUDGETS | RECON
    const [selectedDetailId, setSelectedDetailId] = useState(null); // ID of selected entry
    const [adjustModalOpen, setAdjustModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [expandedBudget, setExpandedBudget] = useState(null); // For Budget Manager Modal
    const [expandedCostCenter, setExpandedCostCenter] = useState(null); // For Cost Center Detail Modal
    const [expandedNode, setExpandedNode] = useState(null); // For Sankey Node Detail Modal
    const [searchQuery, setSearchQuery] = useState('');
    const [activeEntityId, setActiveEntityId] = useState('NS-HOLD');
    const [tickerItems, setTickerItems] = useState([
        { text: 'FLO SYSTEM READY', color: '#10b981' },
        { text: 'CONNECTING TO DAT STREAM...', color: '#60a5fa' }
    ]);
    const [now, setNow] = useState(() => Date.now());

    // Update time for relative timestamps
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Logic Engine State
    const [state, dispatch] = useReducer(floReducer, {
        ledger: INITIAL_LEDGER_ENTRIES,
        budgets: INITIAL_BUDGETS,
        sankey: INITIAL_SANKEY_DATA,
        recon: INITIAL_RECON_ITEMS,
        costCenters: INITIAL_COST_CENTERS,
        latestEvent: null
    });

    // ... (rest of simple states) ... 

    // Form State for Manual Adjust
    const [adjustForm, setAdjustForm] = useState({ amount: '', reason: '', memo: '', type: 'EXPENSE' });

    // Derived State
    const activeEntity = entities.find(e => e.id === activeEntityId) || entities[0];

    // Filter Ledger
    const filteredLedger = useMemo(() => {
        return state.ledger.filter(l =>
            (l.entityId === activeEntityId) && // Filter by Entity
            (l.desc.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [state.ledger, searchQuery, activeEntityId]);

    const activeBudgets = state.budgets[activeEntityId] || [];
    const selectedEntry = state.ledger.find(l => l.id === selectedDetailId); // Find actual object

    // Side Effects
    useEffect(() => {
        if (state.latestEvent) {
            const entity = entities.find(e => e.id === activeEntityId);
            setTickerItems(prev => [
                { text: `[${new Date().toLocaleTimeString().split(' ')[0]}] ${state.latestEvent}`, color: entity?.color || '#fff' },
                ...prev.slice(0, 8)
            ]);
        }
    }, [state.latestEvent, entities, activeEntityId]);

    // Simulated Auto-Events
    useEffect(() => {
        const timer = setInterval(() => {
            if (activeEntityId === 'NS-HOLD') {
                const events = [
                    { msg: 'DAT: spend.incurred $420.00 (AWS)', type: 'NSDC-LABS' },
                    { msg: 'MUX: payout.received $1,250.00 (Stripe)', type: 'SL-OPS' },
                    { msg: 'FLO: budget.check passed (B-001)', type: 'NS-HOLD' },
                    { msg: 'SYS: reconciliation.match R-998', type: 'NS-HOLD' }
                ];
                const evt = events[Math.floor(Math.random() * events.length)];
                const relatedEntity = entities.find(e => e.id === evt.type);

                setTickerItems(prev => [
                    { text: `[${new Date().toLocaleTimeString().split(' ')[0]}] ${evt.msg}`, color: relatedEntity?.color || '#fff' },
                    ...prev.slice(0, 8)
                ]);
            }
        }, 3500);
        return () => clearInterval(timer);
    }, [activeEntityId, entities]);


    const handleExecuteAdjustment = () => {
        if (!adjustForm.amount) return;

        const rawAmount = parseFloat(adjustForm.amount);
        // Correct logic: Expense is negative (-), Revenue is positive (+)
        const signedAmount = adjustForm.type === 'EXPENSE' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

        dispatch({
            type: 'INGEST_EVENT',
            payload: {
                desc: adjustForm.reason || 'Manual Adjustment',
                amount: signedAmount,
                entityId: activeEntityId,
                type: adjustForm.type || 'ADJUSTMENT', // 'EXPENSE' or 'REVENUE'
                budgetImpact: true
            }
        });
        setAdjustModalOpen(false);
        setAdjustForm({ amount: '', reason: '', memo: '', type: 'EXPENSE' });
    };


    const borderColor = viewMode === 'LIVE' ? 'border-yellow-500/50' : 'border-purple-500/50';

    return (
        <div className="absolute inset-0 w-full h-full bg-black/40 flex flex-col pt-20 pb-6 px-6 overflow-hidden">

            <SettingsModal isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} entities={entities} setEntities={setEntities} />

            {/* Global Top Bar & Ticker */}
            <Ticker items={tickerItems} />

            {/* Header Controls */}
            <div className="flex items-center justify-between mb-4 z-40 mt-4 pointer-events-auto">
                <div className="flex items-center gap-4">
                    {/* Entity Switcher */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-black/60 border border-white/20 px-3 py-1.5 rounded hover:border-white/40 transition-colors" style={{ borderColor: activeEntity?.color }}>
                            <Building2 className="w-4 h-4" style={{ color: activeEntity?.color }} />
                            <span className="text-sm font-bold text-white">{activeEntity?.name}</span>
                            <ChevronDown className="w-3 h-3 text-white/50" />
                        </button>
                        <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-white/20 rounded shadow-2xl hidden group-hover:block z-50">
                            {entities.map(ent => (
                                <button
                                    key={ent.id}
                                    onClick={() => setActiveEntityId(ent.id)}
                                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ent.color }} />
                                    {ent.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Settings Trigger */}
                    <button
                        onClick={() => setSettingsModalOpen(true)}
                        className="p-1.5 bg-black/40 border border-white/10 rounded hover:bg-white/10 hover:border-white/30 transition-all text-white/50 hover:text-white"
                        title="Configure Entities"
                    >
                        <RefreshCw className="w-4 h-4" /> {/* Using RefreshCw as a placeholder, could use Settings icon if available or just label */}
                    </button>

                    {/* Mode Toggle */}
                    <div className="bg-white/5 p-1 rounded-lg flex border border-white/10">
                        <button
                            onClick={() => setViewMode('LIVE')}
                            className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${viewMode === 'LIVE' ? 'bg-yellow-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            LIVE
                        </button>
                        <button
                            onClick={() => setViewMode('SIM')}
                            className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${viewMode === 'SIM' ? 'bg-purple-600 text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            SIM PROJECTION
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="flex items-center bg-black/50 border border-white/10 rounded px-2 py-1.5 focus-within:border-white/30 transition-colors">
                        <Search className="w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search ledger..."
                            className="bg-transparent border-none outline-none text-xs text-white ml-2 w-32 focus:w-48 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="text-[9px] bg-white/10 px-1 rounded text-white/30 ml-2">⌘K</div>
                    </div>

                    {/* Manual Adjust */}
                    <button
                        onClick={() => setAdjustModalOpen(true)}
                        className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-3 py-1.5 rounded flex items-center gap-2 transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-bold">Adjust</span>
                    </button>

                    {/* Expand/Collapse Modals */}
                    <AnimatePresence>
                        {expandedBudget && (
                            <BudgetDetailView
                                budget={expandedBudget}
                                onClose={() => setExpandedBudget(null)}
                                costCenters={state.costCenters} // Pass down cost centers
                                dispatch={dispatch} // Pass down dispatch for adding CCs
                                viewMode={viewMode} // Pass sim mode state
                                entityId={activeEntityId}
                            />
                        )}
                        {expandedCostCenter && (
                            <CostCenterDetailView
                                costCenter={expandedCostCenter}
                                allBudgets={state.budgets} // Pass global budgets for cross-ref
                                onClose={() => setExpandedCostCenter(null)}
                            />
                        )}
                        {expandedNode && (
                            <NodeDetailView
                                node={expandedNode}
                                links={state.sankey.links}
                                onClose={() => setExpandedNode(null)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex-1 flex gap-4 min-h-0 pointer-events-auto z-10">

                {/* --- LEFT PANEL: Navigation & Lists --- */}
                <div className="w-80 flex flex-col gap-4">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10">
                        {['LEDGER', 'BUDGETS', 'RECON', 'COST CENTERS'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setLeftTab(tab)}
                                className={`flex-1 pb-2 text-[10px] font-bold border-b-2 transition-colors ${leftTab === tab ? `${borderColor} text-white` : 'border-transparent text-white/30 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-black/60 backdrop-blur border border-white/10 rounded-lg p-3 overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {leftTab === 'BUDGETS' && (
                                <motion.div key="budgets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold mb-2">
                                        <span>Tracking {activeBudgets.length || 0} Budgets</span>
                                        <BarChart3 className="w-3 h-3" />
                                    </div>
                                    {activeBudgets.map(b => (
                                        <BudgetMeter
                                            key={b.id}
                                            budget={b}
                                            onClick={() => setExpandedBudget(b)}
                                        />
                                    ))}
                                </motion.div>
                            )}

                            {leftTab === 'COST CENTERS' && (
                                <motion.div key="costcenters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold mb-2">
                                        <span>Active Centers</span>
                                        <Building2 className="w-3 h-3" />
                                    </div>
                                    {state.costCenters.map(cc => (
                                        <div
                                            key={cc.id}
                                            onClick={() => setExpandedCostCenter(cc)}
                                            className="p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group relative overflow-hidden"
                                        >
                                            <div className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="w-3 h-3 text-emerald-500" />
                                            </div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{cc.name}</span>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-white/10 text-white/60">{cc.id}</span>
                                            </div>
                                            <div className="text-[10px] text-white/40 flex justify-between items-center">
                                                <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">{cc.type}</span>
                                                <span>Target: {cc.owner}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-4 border border-dashed border-white/10 rounded text-center text-[10px] text-white/30 hover:bg-white/5 cursor-not-allowed">
                                        Manage Cost Centers via Budget Views
                                    </div>
                                </motion.div>
                            )}

                            {/* ... RECON/LEDGER TABS (Collapsed for brevity in planner, but preserved in replace) ... */}
                            {leftTab === 'RECON' && (
                                <motion.div key="recon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                    <div className="p-3 bg-red-900/10 border border-red-500/30 rounded flex items-start gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold text-red-200">Reconciliation Action</h4>
                                            <p className="text-[10px] text-red-300/60 mt-1">Items require immediate attention.</p>
                                        </div>
                                    </div>
                                    {state.recon.map(item => (
                                        <div
                                            key={item.id}
                                            className={`p-2 border border-white/5 rounded hover:bg-white/5 cursor-pointer relative group ${item.status === 'MATCHED' ? 'border-emerald-500/20 bg-emerald-500/5' : ''}`}
                                            onClick={() => item.status !== 'MATCHED' && dispatch({ type: 'RESOLVE_RECON', payload: { id: item.id } })}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] text-white/50 font-mono">{item.id}</span>
                                                <span className={`text-[10px] font-bold ${item.status === 'MATCHED' ? 'text-emerald-400' : 'text-red-400'}`}>{item.status}</span>
                                            </div>
                                            <div className="text-xs text-white font-mono my-1">{item.desc}</div>
                                            <div className="flex justify-between items-end">
                                                <span className={`text-xs ${item.amount < 0 ? 'text-white/70' : 'text-emerald-400'}`}>${Math.abs(item.amount).toFixed(2)}</span>
                                                <span className="text-[9px] bg-white/10 px-1 rounded text-white/40 uppercase">{item.side}</span>
                                            </div>

                                            {/* Actions for Matched Items */}
                                            {item.status === 'MATCHED' && (
                                                <div className="mt-2 flex gap-2 border-t border-white/5 pt-2" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        onClick={() => dispatch({ type: 'ROLLBACK_RECON', payload: { id: item.id } })}
                                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 text-[9px] py-1 rounded flex items-center justify-center gap-1 transition-colors uppercase font-bold tracking-wider"
                                                    >
                                                        <History className="w-3 h-3" /> Rollback
                                                    </button>
                                                    <button
                                                        onClick={() => dispatch({ type: 'ARCHIVE_RECON', payload: { id: item.id } })}
                                                        className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[9px] py-1 rounded flex items-center justify-center gap-1 transition-colors uppercase font-bold tracking-wider"
                                                    >
                                                        <CheckCircle className="w-3 h-3" /> Archive
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {leftTab === 'LEDGER' && (
                                <motion.div key="ledger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                                    <div className="text-[10px] text-white/30 text-center py-4 italic">Live Ledger Stream Active</div>
                                    <AnimatePresence>
                                        {filteredLedger.map((entry) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                key={entry.id}
                                                className={`p-2 border-b border-white/5 hover:bg-white/5 flex justify-between items-center cursor-pointer ${selectedDetailId === entry.id ? 'bg-white/5 border-l-2 border-l-yellow-400' : ''}`}
                                                onClick={() => setSelectedDetailId(entry.id)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${entry.amount > 0 ? 'bg-emerald-500' : 'bg-red-400'}`} />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-white max-w-[120px] truncate">{entry.desc}</span>
                                                        <span className="text-[9px] text-white/40">{Math.floor((now - entry.timestamp) / 60000)}m ago</span>
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-mono font-bold ${entry.amount > 0 ? 'text-emerald-400' : 'text-white/80'}`}>
                                                    {entry.amount > 0 ? '+' : ''}${Math.abs(entry.amount).toFixed(2)}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {filteredLedger.length === 0 && <div className="text-xs text-white/30 text-center mt-4">No matching entries.</div>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- CENTER: Sankey Visualization --- */}
                <div className="flex-1 bg-black/20 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center p-8">
                    <SankeyDiagram
                        nodes={state.sankey.nodes}
                        links={state.sankey.links}
                        onNodeClick={setExpandedNode}
                    />

                    {/* Overlay Stats */}
                    <div className="absolute bottom-4 left-4 flex gap-4">
                        <div className="bg-black/80 p-2 rounded border border-white/10">
                            <span className="text-[10px] text-white/40 uppercase">Total Flow (24h)</span>
                            <div className="text-lg font-mono text-white">$4.2M</div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL: Details & Audit --- */}
                <div className="w-80 flex flex-col gap-4">
                    <div className="bg-black/80 backdrop-blur border border-white/10 rounded-lg p-5 flex-1 flex flex-col">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            Audit & Traceability
                        </h3>

                        {selectedEntry ? (
                            <div className="flex-1 animate-in fade-in slide-in-from-right-4">
                                <div className="p-3 bg-white/5 rounded border border-white/10 mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-white">{selectedEntry.txId}</span>
                                        <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold">CLEARED</span>
                                    </div>
                                    <div className={`text-2xl font-mono my-2 ${selectedEntry.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                                        {selectedEntry.amount > 0 ? '+' : ''}${Math.abs(selectedEntry.amount).toFixed(2)}
                                    </div>
                                    <div className="text-[10px] text-white/50 flex gap-2">
                                        <span>{selectedEntry.desc}</span>
                                        <span>•</span>
                                        <span>{selectedEntry.type}</span>
                                    </div>
                                </div>

                                {/* Lineage */}
                                <div className="space-y-4 relative pl-4 border-l border-white/10 ml-2">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        <div className="text-[10px] font-bold text-blue-400 mb-0.5">Event Ingested</div>
                                        <div className="text-[9px] text-white/40 font-mono">src: DAT_ENGINE // kafka_offset:9921</div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                        <div className="text-[10px] font-bold text-yellow-400 mb-0.5">Classified</div>
                                        <div className="text-[9px] text-white/40 font-mono">ruleset: v1.4.2 // type: {selectedEntry.type}</div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                        <div className="text-[10px] font-bold text-emerald-400 mb-0.5">Ledger Write</div>
                                        <div className="text-[9px] text-white/40 font-mono">block: {Math.floor(selectedEntry.timestamp / 1000)} // hash: 0x4a...22</div>
                                    </div>
                                </div>

                                {/* Evidence Vault */}
                                <div className="mt-8 border-t border-white/10 pt-4">
                                    <span className="text-[10px] text-white/40 uppercase font-bold mb-2 block">Evidence Vault</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 bg-white/5 border border-white/5 rounded flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10">
                                            <FileText className="w-4 h-4 text-white/60" />
                                            <span className="text-[9px] text-white/60">Invoice.pdf</span>
                                        </div>
                                        <div className="p-2 bg-white/5 border border-white/5 rounded flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10">
                                            <LinkIcon className="w-4 h-4 text-white/60" />
                                            <span className="text-[9px] text-white/60">Stripe ID</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                                <Search className="w-8 h-8 mb-2 opacity-50" />
                                <span className="text-xs">Select entry to inspect lineage</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Budget Manager Modal */}
            <AnimatePresence>
                {expandedBudget && (
                    <BudgetDetailView
                        budget={expandedBudget}
                        onClose={() => setExpandedBudget(null)}
                    />
                )}
            </AnimatePresence>

            {/* Manual Adjust Modal */}
            <AnimatePresence>
                {adjustModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-zinc-900 border border-white/20 rounded-xl p-6 w-full max-w-lg shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-yellow-500" />
                                    Manual Ledger Adjustment
                                </h2>
                                <button onClick={() => setAdjustModalOpen(false)}><X className="w-5 h-5 text-white/40 hover:text-white" /></button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Entity</label>
                                        <div className="p-2 bg-white/5 rounded text-sm text-white border border-white/10">{activeEntity.name}</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Date</label>
                                        <div className="p-2 bg-white/5 rounded text-sm text-white border border-white/10">{new Date().toLocaleDateString()}</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Transaction Type</label>
                                    <div className="flex gap-2 mb-2">
                                        <button
                                            onClick={() => setAdjustForm({ ...adjustForm, type: 'EXPENSE' })}
                                            className={`flex-1 py-2 text-xs font-bold rounded border ${adjustForm.type === 'EXPENSE' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-black border-white/10 text-white/40 hover:border-white/30'}`}
                                        >
                                            EXPENSE (DEBIT)
                                        </button>
                                        <button
                                            onClick={() => setAdjustForm({ ...adjustForm, type: 'REVENUE' })}
                                            className={`flex-1 py-2 text-xs font-bold rounded border ${adjustForm.type === 'REVENUE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-black border-white/10 text-white/40 hover:border-white/30'}`}
                                        >
                                            REVENUE (CREDIT)
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Reason Code</label>
                                    <select
                                        className="w-full p-2 bg-black border border-white/20 rounded text-sm text-white outline-none focus:border-yellow-500"
                                        value={adjustForm.reason}
                                        onChange={e => setAdjustForm({ ...adjustForm, reason: e.target.value })}
                                    >
                                        <option value="">Select Code...</option>
                                        <option value="Operational Expense" className="text-white">Operational Expense (OpEx)</option>
                                        <option value="Correction - Wrong Account">Correction - Wrong Account</option>
                                        <option value="Write-Off">Write-Off (GGP Approved)</option>
                                        <option value="Opening Balance">Opening Balance Adjustment</option>
                                    </select>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Amount</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full p-2 bg-black border border-white/20 rounded text-sm text-white font-mono outline-none focus:border-yellow-500"
                                            value={adjustForm.amount}
                                            onChange={e => setAdjustForm({ ...adjustForm, amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-32">
                                        <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Currency</label>
                                        <div className="p-2 bg-white/5 rounded text-sm text-white border border-white/10 text-center">USD</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase text-white/40 font-bold mb-1 block">Rationale / Memo</label>
                                    <textarea
                                        className="w-full p-2 bg-black border border-white/20 rounded text-sm text-white outline-none focus:border-yellow-500 h-24"
                                        placeholder="Detailed explanation required for audit..."
                                        value={adjustForm.memo}
                                        onChange={e => setAdjustForm({ ...adjustForm, memo: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-yellow-900/10 border border-yellow-500/20 rounded text-yellow-200 text-xs">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Warning: This action writes to the immutable ledger and cannot be deleted, only reversed.</span>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button onClick={() => setAdjustModalOpen(false)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white">Cancel</button>
                                    <button onClick={handleExecuteAdjustment} className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded text-xs transition-colors">
                                        Sign & Execute Adjustment
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
