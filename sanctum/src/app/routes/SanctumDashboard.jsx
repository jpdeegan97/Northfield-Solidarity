import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import {
    Activity, ArrowUpRight, BarChart2, Bell, Box, Calendar,
    CheckCircle, Clock, Code, Cpu, Database, DollarSign,
    Eye, FileText, Globe, Layers, Lock, MapPin,
    MessageSquare, Shield, Terminal, Zap, ExternalLink
} from 'lucide-react';

import { ALL_ENGINES } from '../../data/engineRegistry';
import { NS_PROJECTS } from '../../data/projectRegistry';

/* --- SUB-COMPONENTS --- */

// 1. Daily Briefing Widget
const DailyBriefing = () => (
    <div className="col-span-12 md:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-500" /> Daily Briefing
                </h3>
                <p className="text-[10px] text-white/40 mt-1 uppercase">Pre-Flight Checklist</p>
            </div>
            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20">3 ALERTS</span>
        </div>

        <div className="space-y-3 mt-2 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-start gap-3 p-2 bg-white/5 rounded border-l-2 border-emerald-500">
                <div className="flex-1">
                    <p className="text-xs text-white/80 font-medium">Approve MINT Formation: "NS_AI_LABS"</p>
                    <p className="text-[10px] text-white/40 mt-1">Pending Signature • 2h ago</p>
                </div>
                <button className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded hover:bg-emerald-500/30">SIGN</button>
            </div>
            <div className="flex items-start gap-3 p-2 bg-white/5 rounded border-l-2 border-red-500">
                <div className="flex-1">
                    <p className="text-xs text-white/80 font-medium">SSL Certificate Expiry: ns-api.com</p>
                    <p className="text-[10px] text-red-400 mt-1">CRITICAL • Expires in 24h</p>
                </div>
                <button className="text-[10px] px-2 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30">FIX</button>
            </div>
            <div className="flex items-start gap-3 p-2 bg-white/5 rounded border-l-2 border-blue-500">
                <div className="flex-1">
                    <p className="text-xs text-white/80 font-medium">Review Q4 Strategy Draft</p>
                    <p className="text-[10px] text-white/40 mt-1">Primary Intent • Today</p>
                </div>
                <button className="text-[10px] px-2 py-1 bg-white/10 text-white/60 rounded hover:bg-white/20">VIEW</button>
            </div>
        </div>
    </div>
);

// 2. Financial Fortress HUD
const FinancialFortress = () => (
    <div className="col-span-12 md:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <DollarSign size={20} className="text-emerald-500" />
        </div>

        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Financial Fortress</h3>

        <div className="flex flex-col gap-6">
            <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total Liquidity</p>
                <div className="text-3xl font-mono font-bold text-emerald-400 tracking-tighter">
                    $2,482,105<span className="text-lg text-white/30">.00</span>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest mb-2">
                    <span className="text-white/40">Target Progress</span>
                    <span className="text-emerald-500">1.35%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[1.35%] bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                </div>
                <div className="flex justify-between text-[10px] mt-1 text-white/20 font-mono">
                    <span>$0</span>
                    <span>GOAL: $184M</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-2 rounded">
                    <p className="text-[10px] text-white/40 uppercase">Burn Rate</p>
                    <p className="text-sm font-mono text-red-400">-$12.4k/mo</p>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <p className="text-[10px] text-white/40 uppercase">Inflow</p>
                    <p className="text-sm font-mono text-emerald-400">+$28.2k/mo</p>
                </div>
            </div>
        </div>
    </div>
);

// 3. Entity Topology (MINT)
const EntityTopology = () => (
    <div className="col-span-12 md:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 z-10 relative">Entity Topology</h3>

        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {/* Mock Graph Visual */}
            <div className="relative w-64 h-48">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full border border-white/50 z-10"></div>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-500/20 rounded-full border border-emerald-500"></div>
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-emerald-500/20 rounded-full border border-emerald-500"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-500/20 rounded-full border border-yellow-500"></div>

                {/* Connecting Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/20">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" />
                    <line x1="50%" y1="50%" x2="75%" y2="66%" />
                    <line x1="50%" y1="50%" x2="66%" y2="33%" />
                </svg>
            </div>
        </div>

        <div className="absolute bottom-4 left-6 z-10">
            <div className="flex items-center gap-2 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 5 Active
                <span className="w-2 h-2 rounded-full bg-yellow-500 ml-2"></span> 1 Compliance Alert
            </div>
        </div>
    </div>
);

// 4. Signal Room (SIG)
const SignalRoom = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex justify-between">
            <span>Signal Intelligence</span>
            <Activity size={14} className="text-white/40" />
        </h3>

        <div className="flex-1 bg-black/50 rounded border border-white/5 p-2 font-mono text-[10px] text-emerald-500/80 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
            <div className="space-y-1 opacity-80">
                <p>&gt; SCAPING: index_funds_v2... OK</p>
                <p>&gt; MARKET_OPEN: SPX 4500.23 (+0.4%)</p>
                <p>&gt; ALERT: Competitor XYZ published "Beta Launch"</p>
                <p>&gt; TREND: "Generative Agents" +45% mention vol</p>
                <p className="animate-pulse">&gt; INGESTING...</p>
            </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {['BTC $98k', 'ETH $3.2k', 'TSLA $240', 'NVDA $905'].map((tick, i) => (
                <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/60 whitespace-nowrap">
                    {tick}
                </span>
            ))}
        </div>
    </div>
);

// 5. Engineering Stack
const EngineeringStack = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex justify-between">
            <span>Engineering Stack</span>
            <Code size={14} className="text-white/40" />
        </h3>

        <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-white/60 bg-white/5 p-2 rounded">
                <span>Infrastructure</span>
                <span className="text-emerald-500">ONLINE</span>
            </div>

            {/* Engine Matrix */}
            <div className="grid grid-cols-4 gap-2">
                {ALL_ENGINES.slice(0, 8).map(eng => (
                    <div key={eng.code} className="aspect-square bg-white/5 border border-white/10 rounded flex flex-col items-center justify-center gap-1 group hover:border-[#00ff9d]/50 transition-colors cursor-pointer" title={eng.name}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[8px] font-bold text-white/40 group-hover:text-white">{eng.code}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/40 mt-2">
                <span>Last Build: <span className="text-white">v0.9.4-alpha</span></span>
                <span>master • 2m ago</span>
            </div>
        </div>
    </div>
);

// 6. War Room (Map)
const WarRoom = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center grayscale invert" />

        <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
            <h3 className="text-sm font-bold text-white tracking-widest uppercase flex justify-between">
                <span>War Room</span>
                <Globe size={14} className="text-white/40" />
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/80 backdrop-blur border border-white/10 p-2 rounded">
                    <p className="text-[10px] text-white/40 uppercase">Active Personnel</p>
                    <p className="text-xl font-mono text-white">4</p>
                </div>
                <div className="bg-black/80 backdrop-blur border border-white/10 p-2 rounded">
                    <p className="text-[10px] text-white/40 uppercase">Physical Assets</p>
                    <p className="text-xl font-mono text-white">12</p>
                </div>
            </div>
        </div>

        {/* Fake Pins */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-75"></div>
    </div>
);

// 7. Manifold Tracer Meter
const ManifoldTracerWidget = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-2 flex justify-between">
            <span>Productivity Flow</span>
            <Zap size={14} className="text-emerald-500" />
        </h3>

        <div className="flex items-end gap-2 h-16 mb-2">
            {[40, 60, 35, 80, 55, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-500/20 border-t border-emerald-500/50 rounded-t-sm relative group">
                    <div className="absolute bottom-0 w-full bg-emerald-500/20 transition-all duration-500" style={{ height: `${h}%` }}></div>
                </div>
            ))}
        </div>

        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
            <span>Flow State: <span className="text-emerald-500">74%</span></span>
            <span>Focus: 3h 12m</span>
        </div>
    </div>
);

// 8. Governance Console
const GovernanceConsole = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden font-mono">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex justify-between">
            <span>Governance</span>
            <Shield size={14} className="text-white/40" />
        </h3>

        <div className="space-y-2 text-[10px] relative z-10">
            <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/60">System DEFCON</span>
                <span className="text-brand">LEVEL 5</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/60">Active Roles</span>
                <span className="text-white">Admin, Scout</span>
            </div>

            <div className="mt-4 opacity-50 space-y-1">
                <p className="text-emerald-500">&gt; AUTH: JP_DEEGAN success (192.168.1.1)</p>
                <p className="text-white/30">&gt; SCAN: Protocol 7 active</p>
                <p className="text-white/30">&gt; POLICY: No changes detected</p>
            </div>
        </div>
    </div>
);

// 9. Dream Vault
const DreamVault = () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-black border border-white/10 rounded-xl overflow-hidden relative group cursor-pointer group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542259682-9017688c3aIl')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 z-10">
            <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-1">Dream Vault</h3>
            <p className="text-xs text-white/60 uppercase tracking-widest">Eyes on the prize.</p>
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={16} className="text-white" />
        </div>
    </div>
);

// 10. System Pulse (KPI Grid)
const SystemPulse = () => (
    <div className="col-span-12 md:col-span-8 bg-black/40 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex justify-between">
            <span>System Pulse</span>
            <BarChart2 size={14} className="text-white/40" />
        </h3>

        <div className="grid grid-cols-4 gap-4">
            {[
                { label: 'Uptime', val: '99.9%', color: 'text-emerald-500' },
                { label: 'Unread', val: '0', color: 'text-white/40' },
                { label: 'Calendar', val: '2 Events', color: 'text-white' },
                { label: 'Sys Load', val: '12%', color: 'text-blue-400' },
                { label: 'Disk', val: '45%', color: 'text-white/60' },
                { label: 'Net I/O', val: '24mb/s', color: 'text-yellow-400' },
                { label: 'Tasks', val: '8 Open', color: 'text-white' },
                { label: 'Mood', val: 'Stoic', color: 'text-purple-400' },
            ].map((kpi, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-3 rounded flex flex-col justify-between aspect-square">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">{kpi.label}</span>
                    <span className={`text-lg font-mono font-bold ${kpi.color}`}>{kpi.val}</span>
                </div>
            ))}
        </div>
    </div>
);


/* --- MAIN DASHBOARD LAYOUT --- */

export default function SanctumDashboard() {
    return (
        <Layout>
            <div className="min-h-screen bg-[#050505] p-6 pb-20 overflow-y-auto">
                {/* Header */}
                <header className="mb-8 flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-[0.2em] text-white">SANCTUM <span className="text-brand">HUD</span></h1>
                        <p className="text-xs text-white/40 tracking-[0.3em] mt-2 uppercase">Situational Awareness Console v2.0</p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-2xl font-mono text-white font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto"
                >
                    {/* Row 1: High Priority */}
                    <DailyBriefing />
                    <FinancialFortress />
                    <EntityTopology />

                    {/* Row 2: Intelligence & Ops */}
                    <SignalRoom />
                    <EngineeringStack />
                    <WarRoom />

                    {/* Row 3: Metrics & Motivation */}
                    <ManifoldTracerWidget />
                    <GovernanceConsole />
                    <DreamVault />

                    {/* Row 4: Dense Data */}
                    <SystemPulse />

                    {/* Space Filler / Widget */}
                    <Link to="/builder" className="col-span-12 md:col-span-4 bg-brand/10 border border-brand/30 rounded-xl p-6 flex flex-col items-center justify-center text-brand hover:bg-brand/20 transition-colors cursor-pointer group">
                        <Layers size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                        <span className="font-bold tracking-widest uppercase text-sm">Engine Builder</span>
                    </Link>

                </motion.div>
            </div>
        </Layout>
    );
}
