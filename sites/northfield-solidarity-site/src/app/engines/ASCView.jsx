import React, { useState } from 'react';
import {
    Trophy, TrendingUp, Users, Target, Shield, Zap,
    Crown, DollarSign, PieChart, ArrowRight, Star, Lock,
    Code, GitBranch, Terminal, LayoutDashboard, FileText,
    Briefcase, Activity, Server, Database,
    Megaphone, PenTool, Radio, Globe, BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ASCView() {
    const [userRole, setUserRole] = useState('SALES'); // SALES | DEV | MKT | EXEC | OPS
    const [activeTab, setActiveTab] = useState('DASHBOARD'); // DASHBOARD, WALLET, RESOURCES

    // --- MOCK DATA: SALES ---
    const salesStats = {
        rank: 4,
        score: 7900,
        metricLabel: "Deal Volume",
        metricValue: "$2.4M",
        nextTier: "Elite"
    };

    const salesLeaderboard = [
        { rank: 1, name: 'Agent Smith', role: 'Closer', score: 9840, primaryMetric: '12 Deals', equity: '0.4%', status: 'Legendary' },
        { rank: 2, name: 'Sarah Connor', role: 'Strategist', score: 8750, primaryMetric: '8 Deals', equity: '0.25%', status: 'Elite' },
        { rank: 3, name: 'Neo', role: 'Technologist', score: 8200, primaryMetric: '15 Deals', equity: '0.2%', status: 'Elite' },
        { rank: 4, name: 'Trinity', role: 'Operator', score: 7900, primaryMetric: '9 Deals', equity: '0.15%', status: 'Pro' },
        { rank: 5, name: 'Morpheus', role: 'Mentor', score: 7650, primaryMetric: '5 Deals', equity: '0.3%', status: 'Pro' },
        { rank: 6, name: 'Cypher', role: 'Negotiator', score: 6200, primaryMetric: '4 Deals', equity: '0.1%', status: 'Standard' },
    ];

    const salesAssets = [
        { id: 1, type: 'deck', title: 'Q4 Pitch Deck', tags: ['Slides', 'Public'] },
        { id: 2, type: 'doc', title: 'Enterprise MSA Template', tags: ['Legal', 'Contract'] },
        { id: 3, type: 'battlecard', title: 'Competitor: Oracle', tags: ['Internal', 'Intel'] },
    ];

    // --- MOCK DATA: DEV ---
    const devStats = {
        rank: 12,
        score: 4200,
        metricLabel: "Bounties Claimed",
        metricValue: "18",
        nextTier: "Architect"
    };

    const devLeaderboard = [
        { rank: 1, name: 'Linus', role: 'Kernel Eng', score: 14500, primaryMetric: '52 PRs', equity: '0.6%', status: 'Legendary' },
        { rank: 2, name: 'Ada', role: 'Data Sci', score: 12100, primaryMetric: '8 Models', equity: '0.45%', status: 'Elite' },
        { rank: 3, name: 'Grace', role: 'Backend', score: 9800, primaryMetric: '99.9% Uptime', equity: '0.35%', status: 'Elite' },
        { rank: 4, name: 'Alan', role: 'Crypto', score: 9200, primaryMetric: '4 Protocols', equity: '0.4%', status: 'Pro' },
        { rank: 5, name: 'Dennis', role: 'SysAdmin', score: 8800, primaryMetric: '0 Downtime', equity: '0.3%', status: 'Pro' },
        { rank: 6, name: 'Bjarne', role: 'Cpp Expert', score: 8500, primaryMetric: 'Legacy Fix', equity: '0.3%', status: 'Pro' },
    ];

    const devResources = [
        { id: 1, type: 'key', title: 'AWS Prod Access', tags: ['Infra', 'Restricted'] },
        { id: 2, type: 'doc', title: 'API Documentation v2', tags: ['Tech', 'Public'] },
        { id: 3, type: 'repo', title: 'Firmament Core', tags: ['Git', 'Source'] },
    ];

    // --- MOCK DATA: MARKETING (MKT) ---
    const mktStats = {
        rank: 2,
        score: 9100,
        metricLabel: "Campaign Reach",
        metricValue: "1.2M",
        nextTier: "CMO Track"
    };

    const mktLeaderboard = [
        { rank: 1, name: 'Don Draper', role: 'Creative Dir', score: 9800, primaryMetric: '4 Viral Campaigns', equity: '0.5%', status: 'Legendary' },
        { rank: 2, name: 'Peggy', role: 'Copy Chief', score: 9100, primaryMetric: '1.2M Reach', equity: '0.35%', status: 'Elite' },
        { rank: 3, name: 'Roger', role: 'Brand Amb', score: 8500, primaryMetric: '50 Events', equity: '0.3%', status: 'Pro' },
    ];

    const mktResources = [
        { id: 1, type: 'asset', title: 'Brand Guidelines 2026', tags: ['Design', 'Public'] },
        { id: 2, type: 'social', title: 'Social Media Calendar', tags: ['Schedule', 'Q4'] },
        { id: 3, type: 'collab', title: 'Influencer Spreadsheet', tags: ['Outreach', 'Contacts'] },
    ];

    // --- MOCK DATA: OPS ---
    const opsStats = {
        rank: 5,
        score: 6400,
        metricLabel: "Efficiency Rating",
        metricValue: "98%",
        nextTier: "Director"
    };

    const opsLeaderboard = [
        { rank: 1, name: 'Alfred', role: 'Chief of Staff', score: 10200, primaryMetric: '0 Incidents', equity: '0.5%', status: 'Legendary' },
        { rank: 2, name: 'Jarvis', role: 'Automation', score: 8900, primaryMetric: '5k Tasks Auto', equity: '0.4%', status: 'Elite' },
        { rank: 3, name: 'Friday', role: 'Logistics', score: 7200, primaryMetric: '100% On-Time', equity: '0.2%', status: 'Pro' },
    ];

    const opsResources = [
        { id: 1, type: 'policy', title: 'Remote Work Policy', tags: ['HR', 'Global'] },
        { id: 2, type: 'finance', title: 'Expense Reporting', tags: ['Finance', 'Tool'] },
        { id: 3, type: 'audit', title: 'Compliance Checklist', tags: ['Legal', 'Audit'] },
    ];

    // --- SHARED WALLET DATA ---
    const distributions = [
        { id: 1, date: 'Oct 15, 2025', source: 'Q3 Profit Share', amount: '$12,450.00', status: 'Paid' },
        { id: 2, date: 'Sep 30, 2025', source: 'Royalty Distribution', amount: '$450.00', status: 'Paid' },
        { id: 3, date: 'Sep 15, 2025', source: 'Performance Bonus', amount: '$2,000.00', status: 'Paid' },
    ];

    // Helpers
    const getRoleData = (role) => {
        switch (role) {
            case 'SALES': return { stats: salesStats, lb: salesLeaderboard, res: salesAssets, color: 'text-amber-500', bg: 'bg-amber-500', shadow: 'shadow-orange-500/20', grad: 'from-amber-400 to-orange-600', icon: Target };
            case 'DEV': return { stats: devStats, lb: devLeaderboard, res: devResources, color: 'text-blue-500', bg: 'bg-blue-500', shadow: 'shadow-cyan-500/20', grad: 'from-blue-400 to-cyan-600', icon: Code };
            case 'MKT': return { stats: mktStats, lb: mktLeaderboard, res: mktResources, color: 'text-pink-500', bg: 'bg-pink-500', shadow: 'shadow-pink-500/20', grad: 'from-pink-400 to-rose-600', icon: Megaphone };
            case 'OPS': return { stats: opsStats, lb: opsLeaderboard, res: opsResources, color: 'text-emerald-500', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/20', grad: 'from-emerald-400 to-green-600', icon: Shield };
            default: return { stats: salesStats, lb: salesLeaderboard, res: salesAssets, color: 'text-amber-500', bg: 'bg-amber-500', shadow: 'shadow-orange-500/20', grad: 'from-amber-400 to-orange-600', icon: Target };
        }
    };

    const currentData = getRoleData(userRole);

    return (
        <div className="h-full w-full bg-[#080808] text-white p-6 font-sans flex flex-col overflow-hidden relative">
            {/* Background Ambience */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 opacity-10 ${currentData.bg}`} />

            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10 shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg shadow-lg transition-colors duration-500 bg-gradient-to-br ${currentData.grad} ${currentData.shadow}`}>
                        <Crown size={24} className="text-black" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                            ASCENTION <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/50 font-mono tracking-widest">BETA</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-white/40 font-medium">Employee Portal</p>
                            <span className="text-white/20">•</span>
                            {/* ROLE TOGGLE */}
                            <div className="flex bg-white/5 rounded p-0.5 border border-white/5">
                                {['SALES', 'DEV', 'MKT', 'OPS'].map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setUserRole(role)}
                                        className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${userRole === role ? `${getRoleData(role).bg} text-black` : 'text-white/40 hover:text-white'}`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                    {['DASHBOARD', 'WALLET', 'RESOURCES'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${activeTab === tab
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab === 'DASHBOARD' && <LayoutDashboard size={14} />}
                            {tab === 'WALLET' && <DollarSign size={14} />}
                            {tab === 'RESOURCES' && <Briefcase size={14} />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Split Layout: Main Content (Left) + Fixed Leaderboard (Right) */}
            <div className="flex-1 min-h-0 flex gap-6 overflow-hidden z-10">

                {/* --- LEFT: Switchable Tabs --- */}
                <div className="flex-1 overflow-y-auto pr-2">

                    {/* DASHBOARD VIEW */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'DASHBOARD' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                {/* Role Specific Widgets */}
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Primary Widget */}
                                    <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h3 className="font-bold text-sm tracking-wider flex items-center gap-2 mb-4">
                                            <currentData.icon className={currentData.color} size={16} />
                                            {userRole === 'SALES' ? 'ACTIVE PIPELINE' : userRole === 'DEV' ? 'ACTIVE SPRINTS' : userRole === 'MKT' ? 'CAMPAIGN ACTIVITY' : 'OPS QUEUE'}
                                        </h3>

                                        {/* Mock List Items */}
                                        <div className="space-y-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded border border-white/5 hover:border-white/10 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-yellow-500' : 'bg-white/20'}`}></div>
                                                        <div>
                                                            <div className="font-bold text-sm">
                                                                {userRole === 'SALES' && `Enterprise Deal #${100 + i} - Acme Corp`}
                                                                {userRole === 'DEV' && `Feature Implementation: Omni-Auth #${402 + i}`}
                                                                {userRole === 'MKT' && `Q4 Brand Video - Draft v${i}`}
                                                                {userRole === 'OPS' && `Payroll Reconciliation - Batch #${880 + i}`}
                                                            </div>
                                                            <div className="text-xs text-white/40">
                                                                {userRole === 'SALES' && 'Stage: Negotiation • Prob: 80%'}
                                                                {userRole === 'DEV' && 'Status: In Review • Reviewer: @neo'}
                                                                {userRole === 'MKT' && 'Channel: YouTube • Impressions: --'}
                                                                {userRole === 'OPS' && 'Due: End of Week • Priority: High'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-mono text-sm font-bold">
                                                            {userRole === 'SALES' && '$120k'}
                                                            {userRole === 'DEV' && '350 pts'}
                                                            {userRole === 'MKT' && 'Draft'}
                                                            {userRole === 'OPS' && 'Pending'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Secondary Widget (Alerts/Feed) */}
                                    <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h3 className="font-bold text-sm tracking-wider flex items-center gap-2 mb-4">
                                            <Activity size={16} className="text-white/50" />
                                            COMM FEED
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">HQ</div>
                                                <div>
                                                    <div className="text-xs font-bold text-white">New Bonus Structure</div>
                                                    <div className="text-[10px] text-white/40 mt-1">Q4 multipliers have been applied to all payouts effective immediately.</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 opactiy-75">
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">HR</div>
                                                <div>
                                                    <div className="text-xs font-bold text-white">Equity Vesting</div>
                                                    <div className="text-[10px] text-white/40 mt-1">Your cliff date is approaching. Review your cap table status.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WALLET VIEW (Shared) */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'WALLET' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 gap-6"
                            >
                                {/* Equity Card */}
                                <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <PieChart size={120} />
                                    </div>
                                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Total Equity</h3>
                                    <div className="text-4xl font-black text-white mb-6">0.15%</div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-white/40">Vested</span>
                                            <span className="font-mono text-white">0.05%</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-white/40">Unvested</span>
                                            <span className="font-mono text-white/60">0.10%</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                                        <Lock size={12} /> VIEW CAP TABLE
                                    </button>
                                </div>

                                {/* Distributions */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold">Recent Distributions</h3>
                                        <button className="text-xs text-amber-400 hover:text-amber-300">View All History</button>
                                    </div>
                                    <div className="space-y-3">
                                        {distributions.map(tx => (
                                            <div key={tx.id} className="bg-black/40 border border-white/5 rounded-lg p-4 flex justify-between items-center hover:border-amber-500/30 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-emerald-500/10 rounded text-emerald-400">
                                                        <DollarSign size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm">{tx.source}</div>
                                                        <div className="text-xs text-white/40">{tx.date}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold font-mono text-white">{tx.amount}</div>
                                                    <div className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">{tx.status}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* RESOURCES / OPS VIEW */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'RESOURCES' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-white/5 bg-white/5">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Briefcase size={20} className={currentData.color} />
                                        {userRole} RESOURCES
                                    </h3>
                                    <p className="text-white/40 text-sm mt-1">
                                        Assets, keys, and documents specific to your clearance level.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 p-6">
                                    {currentData.res.map(resource => (
                                        <div key={resource.id} className="bg-black/20 border border-white/10 p-5 rounded-lg flex flex-col gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-start">
                                                <div className={`p-2 rounded bg-white/5 ${currentData.color}`}>
                                                    {resource.type === 'deck' && <FileText size={20} />}
                                                    {resource.type === 'doc' && <FileText size={20} />}
                                                    {resource.type === 'battlecard' && <Target size={20} />}
                                                    {resource.type === 'key' && <Lock size={20} />}
                                                    {resource.type === 'repo' && <GitBranch size={20} />}
                                                    {resource.type === 'asset' && <Megaphone size={20} />}
                                                    {resource.type === 'social' && <Globe size={20} />}
                                                    {resource.type === 'collab' && <Users size={20} />}
                                                    {resource.type === 'policy' && <Shield size={20} />}
                                                    {resource.type === 'finance' && <DollarSign size={20} />}
                                                    {resource.type === 'audit' && <FileText size={20} />}
                                                </div>
                                                <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm mb-1">{resource.title}</h4>
                                                <div className="flex gap-2">
                                                    {resource.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add New Placeholder */}
                                    <div className="border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center p-6 text-white/20 hover:text-white/40 hover:border-white/20 transition-all cursor-pointer">
                                        <Lock size={24} className="mb-2" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Request Asset</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* --- RIGHT: FIXED LEADERBOARD (Always Visible) --- */}
                <div className="w-96 shrink-0 flex flex-col gap-6">

                    {/* Your Personal Stats (Top of Sidebar) */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-5 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-white/40 text-xs font-bold uppercase mb-1">Your Rank</div>
                                <div className="text-4xl font-black text-white">#{currentData.stats.rank}</div>
                            </div>
                            <div className={`px-2 py-1 rounded text-[10px] font-bold bg-white/10 ${currentData.color}`}>
                                {currentData.stats.nextTier} Tier
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/50">Total Score</span>
                                    <span className={`font-bold ${currentData.color}`}>{currentData.stats.score.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className={`${currentData.bg} h-full w-[85%]`}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/50">{currentData.stats.metricLabel}</span>
                                    <span className="font-bold text-white">{currentData.stats.metricValue}</span>
                                </div>
                                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                    <div className={`${currentData.bg} h-full w-[65%]`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Leaderboard List */}
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col">
                        <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <h3 className="font-bold text-sm tracking-wider flex items-center gap-2">
                                <Trophy size={14} className={currentData.color} />
                                LEADERBOARD
                            </h3>
                            <span className="text-xs text-white/40">Real-time</span>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2 space-y-1">
                            {currentData.lb.map((agent, i) => (
                                <div key={agent.rank} className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${i === 3 ? 'bg-white/10 border border-white/5' : 'hover:bg-white/5'}`}>
                                    <div className={`
                                        w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-bold text-[10px]
                                        ${i === 0 ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' :
                                            i === 1 ? 'bg-slate-300 text-black' :
                                                i === 2 ? 'bg-orange-700 text-white' : 'bg-white/10 text-white/50'}
                                    `}>
                                        {agent.rank}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs truncate">{agent.name}</span>
                                            {agent.status === 'Legendary' && <Star size={10} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                                        </div>
                                        <div className="text-[10px] text-white/40 truncate">{agent.role}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-xs font-bold text-white">{agent.score.toLocaleString()}</div>
                                        <div className={`text-[9px] ${currentData.color}`}>{agent.primaryMetric}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-white/5 bg-white/5 text-[10px] text-center text-white/30">
                            Competition ends in 4d 12h
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
