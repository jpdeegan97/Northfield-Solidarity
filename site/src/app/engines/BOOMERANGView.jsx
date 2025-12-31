import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Activity, Layers, BarChart3, Globe, Crosshair, Send, Clock, PlayCircle, StopCircle, Archive } from 'lucide-react';

export default function BOOMERANGView() {
    const [activeTab, setActiveTab] = useState('CONSOLE');

    // Mock Data
    const activeProbes = [
        { id: 'RUN-alpha-09', market: 'SaaS / DevTools', strategy: 'Cold Inbound', status: 'ACTIVE', spend: '$124.50', leads: 8, signal: 'HIGH' },
        { id: 'RUN-beta-02', market: 'E-com / Pet', strategy: 'Social Ads', status: 'PAUSED', spend: '$450.00', leads: 24, signal: 'MED' },
        { id: 'RUN-gamma-11', market: 'Local / Dental', strategy: 'Direct Mail', status: 'COMPLETED', spend: '$2,100', leads: 150, signal: 'VERY HIGH' },
    ];

    const marketSlices = [
        { name: 'Tech Startups < 50', size: '15k', difficulty: 'High' },
        { name: 'Dental Practices (NE)', size: '4.2k', difficulty: 'Low' },
        { name: 'Shopify Stores (Apparel)', size: '85k', difficulty: 'Med' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#030508] text-white font-sans overflow-hidden relative selection:bg-cyan-500/30">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-cyan-900/30 bg-[#030508]/90 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Target size={24} className="text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                            BOOMERANG
                            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 tracking-widest font-mono">MARKET PROBE</span>
                        </h1>
                        <p className="text-cyan-500/50 text-xs font-mono tracking-widest uppercase mt-0.5">Tactical Market Validation & Strategy Attacks</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Total Spend</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-mono text-cyan-400">$2,674.50</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-cyan-900/40" />
                    <button
                        onClick={() => setActiveTab('RUN BUILDER')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs tracking-wide hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                        <Crosshair size={14} />
                        NEW OPERATION
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-row min-h-0 relative z-10">
                {/* Sidebar */}
                <div className="w-64 flex-none border-r border-cyan-900/20 bg-black/20 flex flex-col py-4">
                    {['CONSOLE', 'RUN BUILDER', 'TELEMETRY', 'LIBRARY'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                w-full text-left px-6 py-4 text-[10px] font-bold tracking-widest uppercase transition-all border-l-2 flex items-center gap-3
                                ${activeTab === tab
                                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500'
                                    : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            {tab === 'CONSOLE' && <Activity size={14} />}
                            {tab === 'RUN BUILDER' && <Layers size={14} />}
                            {tab === 'TELEMETRY' && <BarChart3 size={14} />}
                            {tab === 'LIBRARY' && <Archive size={14} />}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-[#030508] to-[#060b10] overflow-hidden flex flex-col relative">

                    {activeTab === 'CONSOLE' && (
                        <div className="p-8 h-full flex flex-col">
                            <div className="mb-6 flex items-end justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">Active Operations</h2>
                                    <p className="text-cyan-200/40 text-xs">Live telemetry from deployed market probes.</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[10px] text-cyan-400/60 font-mono uppercase bg-cyan-900/20 px-2 py-1 rounded border border-cyan-900/30">Syncing...</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {activeProbes.map((run, i) => (
                                    <motion.div
                                        key={run.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-[#050a0e] border border-cyan-900/30 rounded-xl p-5 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />

                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-12 rounded-full ${run.status === 'ACTIVE' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' :
                                                    run.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-500'
                                                    }`} />
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-lg text-white font-mono">{run.id}</h3>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${run.status === 'ACTIVE' ? 'bg-cyan-500/20 text-cyan-400' :
                                                            run.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                                            }`}>{run.status}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-white/50">
                                                        <span className="flex items-center gap-1"><Globe size={12} /> {run.market}</span>
                                                        <span className="flex items-center gap-1"><Zap size={12} /> {run.strategy}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Spend</div>
                                                    <div className="font-mono text-white">{run.spend}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Leads</div>
                                                    <div className="font-mono text-cyan-400 font-bold">{run.leads}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Signal</div>
                                                    <div className="font-mono text-white">{run.signal}</div>
                                                </div>

                                                <div className="flex gap-2 ml-4">
                                                    {run.status === 'ACTIVE' ? (
                                                        <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors">
                                                            <StopCircle size={18} />
                                                        </button>
                                                    ) : (
                                                        <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors">
                                                            <PlayCircle size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'RUN BUILDER' && (
                        <div className="p-8 flex items-center justify-center h-full">
                            <div className="max-w-2xl w-full">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-bold text-white mb-2">Initialize New Probe</h2>
                                    <p className="text-cyan-200/50">Configure your market attack vectors and launch parameters.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="bg-[#050a0e] border border-cyan-900/30 p-6 rounded-xl hover:border-cyan-500/30 cursor-pointer transition-all group">
                                        <Globe className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                                        <h3 className="text-lg font-bold text-white mb-1">Target Market</h3>
                                        <p className="text-xs text-white/40 mb-4">Select the slice of the market to attack.</p>
                                        <select className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none">
                                            {marketSlices.map(m => <option key={m.name}>{m.name} ({m.size})</option>)}
                                        </select>
                                    </div>
                                    <div className="bg-[#050a0e] border border-cyan-900/30 p-6 rounded-xl hover:border-cyan-500/30 cursor-pointer transition-all group">
                                        <Zap className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                                        <h3 className="text-lg font-bold text-white mb-1">Attack Strategy</h3>
                                        <p className="text-xs text-white/40 mb-4">Choose your infiltration method.</p>
                                        <select className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-amber-500 outline-none">
                                            <option>Cold Inbound (Email)</option>
                                            <option>Paid Social (Meta)</option>
                                            <option>Paid Search (Intent)</option>
                                            <option>Community Seeding</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest uppercase rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-3">
                                    <Send size={18} />
                                    Launch Run Sequence
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'TELEMETRY' && (
                        <div className="p-8 h-full overflow-y-auto">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Aggregate Telemetry</h2>
                                    <p className="text-cyan-200/50 text-xs">Performance analysis across all active and historical runs.</p>
                                </div>
                                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                                    {['7D', '30D', '90D', 'ALL'].map(range => (
                                        <button key={range} className={`px-3 py-1 rounded text-[10px] font-bold ${range === '30D' ? 'bg-cyan-500 text-black' : 'text-white/40 hover:text-white'}`}>
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {[
                                    { label: 'Total Spend', value: '$8,450', trend: '+12%', color: 'text-white' },
                                    { label: 'Leads Generated', value: '342', trend: '+24%', color: 'text-cyan-400' },
                                    { label: 'Cost Per Lead', value: '$24.70', trend: '-8%', color: 'text-emerald-400' },
                                    { label: 'Conv. Rate', value: '3.8%', trend: '+1.2%', color: 'text-amber-400' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#050a0e] border border-cyan-900/30 p-4 rounded-xl">
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">{stat.label}</div>
                                        <div className={`text-2xl font-mono font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                                        <div className="text-[10px] text-white/30 flex items-center gap-1">
                                            <span className={stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-emerald-500'}>{stat.trend}</span>
                                            vs last period
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-8 h-64 mb-8">
                                {/* Funnel Chart Mock */}
                                <div className="bg-[#050a0e] border border-cyan-900/30 p-6 rounded-xl flex flex-col">
                                    <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                                        <Activity size={14} className="text-cyan-500" />
                                        Funnel Conversion
                                    </h3>
                                    <div className="flex-1 flex items-end justify-between gap-2">
                                        {[
                                            { label: 'Impressions', val: 100 },
                                            { label: 'Visits', val: 65 },
                                            { label: 'Signups', val: 35 },
                                            { label: 'Activated', val: 15 },
                                        ].map((step, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                                <div className="w-full bg-white/5 rounded-t-lg relative group-hover:bg-white/10 transition-colors" style={{ height: `${step.val}%` }}>
                                                    <div className="absolute -top-6 w-full text-center text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {step.val}%
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-white/30 uppercase">{step.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Efficiency Chart Mock */}
                                <div className="bg-[#050a0e] border border-cyan-900/30 p-6 rounded-xl flex flex-col">
                                    <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                                        <BarChart3 size={14} className="text-amber-500" />
                                        Spend Efficiency (RoAS)
                                    </h3>
                                    <div className="flex-1 flex items-end gap-1">
                                        {[45, 62, 38, 72, 55, 68, 80, 75, 58, 42, 65, 85].map((val, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${val}%` }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex-1 bg-cyan-900/20 border-t-2 border-cyan-500/50 hover:bg-cyan-500/20 transition-colors"
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-2 flex justify-between text-[10px] text-white/20 font-mono">
                                        <span>WEEK 1</span>
                                        <span>WEEK 12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'LIBRARY' && (
                        <div className="p-8 h-full overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Knowledge Library</h2>
                                    <p className="text-cyan-200/50 text-xs">Repository of validated market strategies and audience segments.</p>
                                </div>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Search knowledge base..." className="bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/20 w-64 focus:outline-none focus:border-cyan-500/50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Proven Strategies */}
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider text-white/50">
                                        <Zap size={14} /> Proven Strategies
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Cold Email / Value First', rating: 'A+', runs: 12, avgCPA: '$45', desc: 'High-personalization outreach offering immediate value asset.' },
                                            { name: 'LinkedIn / Founder Story', rating: 'A-', runs: 8, avgCPA: '$62', desc: 'Founder-led narrative ads targeting decision makers.' },
                                            { name: 'SaaS / Directory Launch', rating: 'B+', runs: 5, avgCPA: '$80', desc: 'Launch on niche directories (ProductHunt, G2) with LTD.' },
                                            { name: 'Direct Mail / Lumpy', rating: 'C', runs: 3, avgCPA: '$120', desc: 'Physical 3D mailers to high-value local prospects.' },
                                        ].map((strat, i) => (
                                            <motion.div
                                                key={strat.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-[#050a0e] border border-cyan-900/30 p-4 rounded-xl hover:border-cyan-500/30 transition-all cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">{strat.name}</h4>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${strat.rating.startsWith('A') ? 'bg-emerald-500/20 text-emerald-400' :
                                                        strat.rating.startsWith('B') ? 'bg-cyan-500/20 text-cyan-400' : 'bg-amber-500/20 text-amber-400'
                                                        }`}>{strat.rating}</span>
                                                </div>
                                                <p className="text-xs text-white/50 mb-3">{strat.desc}</p>
                                                <div className="flex items-center gap-4 text-[10px] text-white/30 font-mono">
                                                    <span className="flex items-center gap-1"><Activity size={10} /> {strat.runs} RUNS</span>
                                                    <span className="flex items-center gap-1"><Target size={10} /> AVG CPA: {strat.avgCPA}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Validated Market Slices */}
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider text-white/50">
                                        <Globe size={14} /> Market Slices
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'SaaS Founders (Seed)', size: '12k', saturation: 'High', conversion: '2.4%' },
                                            { name: 'Dental Practice Owners', size: '145k', saturation: 'Low', conversion: '4.1%' },
                                            { name: 'Shopify / Apparel', size: '85k', saturation: 'Med', conversion: '1.8%' },
                                            { name: 'Real Estate / Luxury', size: '40k', saturation: 'Med', conversion: '0.9%' },
                                        ].map((market, i) => (
                                            <motion.div
                                                key={market.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.05) }}
                                                className="bg-[#050a0e] border border-white/5 p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">{market.name}</h4>
                                                    <span className="text-[10px] font-mono text-white/30">{market.size}</span>
                                                </div>

                                                <div className="flex items-center justify-between text-[10px] font-mono">
                                                    <div className="flex items-center gap-4">
                                                        <span className={market.saturation === 'Low' ? 'text-emerald-500' : market.saturation === 'High' ? 'text-red-400' : 'text-amber-400'}>
                                                            SATURATION: {market.saturation}
                                                        </span>
                                                        <span className="text-white/40">CONV: {market.conversion}</span>
                                                    </div>
                                                </div>

                                                {/* Saturation Bar */}
                                                <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                                                    <div
                                                        className={`h-full ${market.saturation === 'Low' ? 'bg-emerald-500' :
                                                            market.saturation === 'High' ? 'bg-red-500' : 'bg-amber-500'
                                                            }`}
                                                        style={{ width: market.saturation === 'Low' ? '20%' : market.saturation === 'High' ? '85%' : '50%' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
