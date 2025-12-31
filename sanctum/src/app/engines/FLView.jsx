import React, { useState } from 'react';
import { Target, Users, TrendingUp, DollarSign, Activity, PieChart } from 'lucide-react';

export default function FLView({ engine }) {
    const [stats] = useState([
        { label: 'Active Clients', value: '142', change: '+12%', color: 'text-blue-400' },
        { label: 'MRR', value: '$84.2k', change: '+5.4%', color: 'text-emerald-400' },
        { label: 'Churn Rate', value: '1.2%', change: '-0.4%', color: 'text-emerald-400' },
        { label: 'Avg Ticket', value: '$450', change: '+2.1%', color: 'text-blue-400' },
    ]);

    const tiers = ['Starter', 'Growth', 'Enterprise'];

    return (
        <div className="h-full w-full bg-[#0f172a] text-slate-200 p-8 font-sans">
            <header className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">FANTASY LAND</h1>
                    <p className="text-slate-400 text-sm">SMB Visualization & Expansion Platform</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase rounded shadow-lg shadow-blue-500/20 transition-all">
                        Analysis
                    </button>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded border border-slate-700 transition-all">
                        Settings
                    </button>
                </div>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-blue-500/30 transition-colors">
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold">{stat.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className={`text-xs font-bold ${stat.color} bg-white/5 px-1.5 py-0.5 rounded`}>{stat.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area (Mock) */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" /> Revenue Trajectory
                        </h3>
                        <div className="flex bg-slate-800 p-1 rounded-lg">
                            {['1W', '1M', '3M', '1Y'].map(t => (
                                <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded ${t === '1M' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    {/* Mock Graph Bars */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-2 border-b border-slate-800/50">
                        {[40, 65, 55, 80, 75, 90, 60, 85, 95, 80, 100, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-sm hover:from-blue-800 hover:to-blue-400 transition-all cursor-pointer relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none mb-1">
                                    ${(h * 0.9).toFixed(1)}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-slate-500 uppercase">
                        <span>Jan</span><span>Dec</span>
                    </div>
                </div>

                {/* Right Panel: Segments */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <PieChart size={18} className="text-emerald-500" /> Customer Segments
                    </h3>
                    <div className="space-y-4">
                        {tiers.map((tier, i) => (
                            <div key={tier} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-transparent hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-slate-500' : i === 1 ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                                    <span className="text-sm font-medium text-slate-200">{tier}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{30 + (i * 15)}%</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Actions</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Activity size={14} className="text-blue-500" />
                                <span>Optimization run completed</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Users size={14} className="text-emerald-500" />
                                <span>New cohort onboarded (12)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
