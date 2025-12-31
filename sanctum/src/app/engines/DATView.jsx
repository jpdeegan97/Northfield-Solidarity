import React, { useState } from 'react';
import {
    Globe, DollarSign, Activity, Search, Filter, Share2,
    Shield, CheckCircle, AlertTriangle, ArrowUpRight,
    Briefcase, Map, BarChart3, PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DATView() {
    const [activeTab, setActiveTab] = useState('EXPLORER'); // PROFILE, EXPLORER, NETWORK
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data
    const deals = [
        { id: 1, date: '2025-10-12', target: 'Stripe', investors: ['Sequoia', 'Andreesen Horowitz'], amount: '$600M', round: 'Series H', sector: 'Fintech', confidence: 'High', source: 'SEC Filing' },
        { id: 2, date: '2025-10-10', target: 'Databricks', investors: ['T. Rowe Price', 'BlackRock'], amount: '$500M', round: 'Series I', sector: 'Data/AI', confidence: 'Med', source: 'Press Release' },
        { id: 3, date: '2025-09-28', target: 'Northvolt', investors: ['Goldman Sachs', 'VW Group'], amount: '$1.2B', round: 'Debt', sector: 'Energy', confidence: 'High', source: 'Official Blog' },
        { id: 4, date: '2025-09-15', target: 'SpaceX', investors: ['Founders Fund'], amount: '$750M', round: 'Private', sector: 'Aerospace', confidence: 'Low', source: 'Leak/Rumor' },
    ];

    return (
        <div className="h-full w-full bg-[#0b0c15] text-white p-6 font-sans flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            DEAL ATLAS <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/40 font-mono">NS-DA</span>
                        </h1>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Global Capital Deployment Registry</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {['PROFILE', 'EXPLORER', 'NETWORK'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'hover:bg-white/5 text-white/40'}`}
                        >
                            {tab === 'PROFILE' && <BarChart3 size={14} />}
                            {tab === 'EXPLORER' && <Search size={14} />}
                            {tab === 'NETWORK' && <Share2 size={14} />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {activeTab === 'EXPLORER' && (
                    <div className="flex flex-col gap-6">
                        {/* Filters */}
                        <div className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search institutions, companies, or sectors..."
                                    className="w-full bg-black/50 border border-white/10 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="px-3 py-2 bg-white/5 rounded border border-white/10 text-white/60 hover:text-white flex items-center gap-2 text-xs font-bold">
                                <Filter size={14} /> FILTER
                            </button>
                            <div className="h-6 w-px bg-white/10"></div>
                            <button className="px-3 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded flex items-center gap-2 text-xs font-bold">
                                <ArrowUpRight size={14} /> EXPORT
                            </button>
                        </div>

                        {/* Deal Table */}
                        <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-xs text-white/40 uppercase tracking-widest border-b border-white/5">
                                        <th className="p-4 font-normal">Date</th>
                                        <th className="p-4 font-normal">Target Company</th>
                                        <th className="p-4 font-normal">Investors</th>
                                        <th className="p-4 font-normal text-right">Amount</th>
                                        <th className="p-4 font-normal">Round</th>
                                        <th className="p-4 font-normal">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {deals.map((deal, i) => (
                                        <motion.tr
                                            key={deal.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                                        >
                                            <td className="p-4 text-white/60 font-mono text-xs">{deal.date}</td>
                                            <td className="p-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {deal.target}
                                                <div className="text-[10px] font-normal text-white/30">{deal.sector}</div>
                                            </td>
                                            <td className="p-4 text-white/80">
                                                <div className="flex flex-wrap gap-1">
                                                    {deal.investors.map(inv => (
                                                        <span key={inv} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">{inv}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right font-mono text-blue-300">{deal.amount}</td>
                                            <td className="p-4 text-white/60 text-xs">{deal.round}</td>
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold border ${deal.confidence === 'High' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                        deal.confidence === 'Med' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {deal.confidence === 'High' && <CheckCircle size={10} />}
                                                    {deal.confidence === 'Med' && <AlertTriangle size={10} />}
                                                    {deal.confidence === 'Low' && <Shield size={10} />}
                                                    {deal.confidence.toUpperCase()}
                                                </div>
                                                <div className="text-[9px] text-white/20 mt-1 pl-1">{deal.source}</div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'PROFILE' && (
                    <div className="grid grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="col-span-1 bg-white/5 border border-white/5 rounded-xl p-6">
                            <div className="w-16 h-16 bg-white rounded flex items-center justify-center mb-6">
                                <span className="text-black font-black text-xl">GS</span>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Goldman Sachs</h2>
                            <p className="text-white/50 text-sm mb-6">Global Investment Banking, Securities and Investment Management.</p>

                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/40 text-xs uppercase">HQ</span>
                                    <span className="text-sm">New York, NY</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/40 text-xs uppercase">AUM</span>
                                    <span className="text-sm font-mono">$2.8T</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-white/40 text-xs uppercase">Deals (L12M)</span>
                                    <span className="text-sm font-mono">142</span>
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="col-span-2 grid grid-cols-2 gap-6">
                            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
                                <h3 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                                    <PieChart size={14} /> Sector Allocation
                                </h3>
                                {/* Mock Chart Visual */}
                                <div className="flex items-center gap-4 h-full pb-8">
                                    <div className="w-32 h-32 rounded-full border-[12px] border-blue-500 border-r-purple-500 border-b-cyan-500 border-l-blue-500 relative"></div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500"></div> Tech (45%)</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-purple-500"></div> Healthcare (30%)</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-cyan-500"></div> Energy (25%)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-xl p-6">
                                <h3 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                                    <Map size={14} /> Geo Distribution
                                </h3>
                                {/* Mock Map Text */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs">
                                        <span>North America</span>
                                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[70%]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Europe</span>
                                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[20%]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span>Asia</span>
                                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[10%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'NETWORK' && (
                    <div className="h-full bg-black/50 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_70%)]"></div>

                        {/* Mock Network Graph */}
                        <div className="relative w-96 h-96 animate-[spin_60s_linear_infinite]">
                            {/* Central Node */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center border-4 border-black z-10 shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                                <span className="font-bold text-xs">GS</span>
                            </div>

                            {/* Satellites */}
                            {[1, 2, 3, 4, 5, 6].map((i) => {
                                const angle = (i / 6) * Math.PI * 2;
                                const x = 50 + Math.cos(angle) * 40;
                                const y = 50 + Math.sin(angle) * 40;
                                return (
                                    <React.Fragment key={i}>
                                        <div
                                            className="absolute w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur text-[10px] border border-white/20"
                                            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                                        >
                                            Inv {i}
                                        </div>
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                            <line
                                                x1="50%" y1="50%"
                                                x2={`${x}%`} y2={`${y}%`}
                                                stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                                            />
                                        </svg>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur rounded border border-white/10 text-xs">
                            <div className="font-bold mb-2 text-white/50">SYNDICATION STRENGTH</div>
                            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Strong (5+ co-invests)</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white/20"></div> Weak (1-2 co-invests)</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
