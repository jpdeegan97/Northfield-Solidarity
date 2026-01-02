import React, { useState } from 'react';
import { Calendar, Clock, RotateCw, CheckCircle, Bookmark, ArrowRight, Layers, Target, Trophy } from 'lucide-react';

export default function INCView() {
    const [activeTab, setActiveTab] = useState('WEEKLY'); // DAILY, WEEKLY, MONTHLY
    const [cycleStatus] = useState({
        daily: 'Complete',
        weekly: 'In Progress',
        monthly: 'On Track'
    });

    const tasks = [
        { id: 1, title: 'Finalize BOOMERANG POC', status: 'done', context: 'Deep Work' },
        { id: 2, title: 'Draft Incubator Charter', status: 'done', context: 'Admin' },
        { id: 3, title: 'Review GGP Permissions', status: 'pending', context: 'Security' },
        { id: 4, title: 'Sync with DRE on Research', status: 'pending', context: 'Meeting' },
    ];

    const outcomes = [
        { id: 1, title: 'Ship 3 Engine MVPs', progress: 66, status: 'at-risk' },
        { id: 2, title: 'Standardize Dev Env', progress: 100, status: 'achieved' },
        { id: 3, title: 'Close Q4 Strategy', progress: 40, status: 'on-track' },
    ];

    const carryovers = [
        { id: 'C-01', title: 'Fix Topology layout drift', age: '3d', reason: 'CSS Complexity' },
        { id: 'C-02', title: 'Integrate IDN mock auth', age: '5d', reason: 'Deprioritized' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#111] text-neutral-200 font-sans overflow-hidden relative selection:bg-amber-500/30">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[#1a1a1a] border-b border-[#333] shadow-md z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-600 rounded flex items-center justify-center shadow-lg shadow-amber-900/20">
                        <Layers size={20} className="text-black" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3">
                            INCUBATOR
                            <span className="text-[10px] bg-[#333] text-neutral-400 px-2 py-0.5 rounded font-mono border border-white/10">v1.2</span>
                        </h1>
                        <p className="text-neutral-500 text-xs font-mono uppercase tracking-tight">System Iteration Control</p>
                    </div>
                </div>

                {/* Global Cycle Status */}
                <div className="flex items-center gap-8">
                    <CycleStatus label="Daily" status={cycleStatus.daily} />
                    <CycleStatus label="Weekly" status={cycleStatus.weekly} />
                    <CycleStatus label="Monthly" status={cycleStatus.monthly} />
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-[#161616] border-r border-[#333] flex flex-col p-4 gap-2">
                    <NavBtn id="DAILY" icon={Clock} label="Daily Loop" active={activeTab} onClick={setActiveTab} />
                    <NavBtn id="WEEKLY" icon={RotateCw} label="Weekly Iteration" active={activeTab} onClick={setActiveTab} />
                    <NavBtn id="MONTHLY" icon={Calendar} label="Monthly Direction" active={activeTab} onClick={setActiveTab} />

                    <div className="h-px bg-[#333] my-2" />

                    <div className="p-3 bg-[#222] rounded border border-[#333]">
                        <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Carryover Queue</h3>
                        <div className="space-y-2">
                            {carryovers.map(c => (
                                <div key={c.id} className="p-2 bg-[#1a1a1a] rounded border border-[#333] hover:border-amber-500/30 transition-colors group cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-amber-500">{c.id}</span>
                                        <span className="text-[10px] text-red-400 font-bold">{c.age}</span>
                                    </div>
                                    <p className="text-xs text-neutral-300 leading-tight group-hover:text-white">{c.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dashboard Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#111]">

                    {/* WEEKLY VIEW (Default for MVP POC focus) */}
                    {activeTab === 'WEEKLY' && (
                        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Hero: Current Plan */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <section className="col-span-2 bg-[#1a1a1a] rounded border border-[#333] p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Target size={120} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                <Target size={18} className="text-amber-500" /> Current Iteration Outcomes
                                            </h2>
                                            <span className="text-xs font-mono text-neutral-500">Week 42 • <span className="text-amber-500">Day 4</span></span>
                                        </div>
                                        <div className="space-y-4">
                                            {outcomes.map(outcome => (
                                                <div key={outcome.id}>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-neutral-300 font-bold">{outcome.title}</span>
                                                        <span className={`font-mono ${outcome.status === 'achieved' ? 'text-green-500' :
                                                            outcome.status === 'at-risk' ? 'text-red-500' : 'text-amber-500'
                                                            }`}>{outcome.status.toUpperCase()}</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${outcome.status === 'achieved' ? 'bg-green-500' :
                                                                outcome.status === 'at-risk' ? 'bg-red-500' : 'bg-amber-500'
                                                                }`}
                                                            style={{ width: `${outcome.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-[#1a1a1a] rounded border border-[#333] p-6 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Trophy size={14} /> Weekly Retro
                                        </h2>
                                        <div className="text-center p-4 py-8 border-2 border-dashed border-[#333] rounded mb-4 hover:border-amber-500/50 hover:bg-amber-900/10 cursor-pointer transition-all">
                                            <div className="text-4xl font-black text-neutral-600 mb-2">+2</div>
                                            <div className="text-xs text-neutral-500 uppercase">Velocity Shift</div>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-amber-600 text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-500 transition-colors">
                                        Log Win
                                    </button>
                                </section>
                            </div>

                            {/* Task/Decisions Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Backlog / Tasks */}
                                <section className="bg-[#1a1a1a] rounded border border-[#333] p-6">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center justify-between">
                                        <span className="flex items-center gap-2"><CheckCircle size={16} className="text-neutral-500" /> Active Tasks</span>
                                        <span className="text-xs text-neutral-600 font-mono">4 / 12</span>
                                    </h2>
                                    <div className="space-y-3">
                                        {tasks.map(task => (
                                            <div key={task.id} className="flex items-center gap-3 p-3 bg-[#111] border border-[#222] rounded hover:border-neutral-700 transition-colors group">
                                                <div className={`w-4 h-4 rounded-full border-2 cursor-pointer ${task.status === 'done' ? 'bg-amber-500 border-amber-500' : 'border-neutral-600'
                                                    }`} />
                                                <div className="flex-1">
                                                    <p className={`text-sm ${task.status === 'done' ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                                                        {task.title}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] uppercase font-bold text-neutral-600 bg-[#1a1a1a] px-2 py-0.5 rounded">
                                                    {task.context}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Decision Log */}
                                <section className="bg-[#1a1a1a] rounded border border-[#333] p-6">
                                    <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                                        <Bookmark size={16} className="text-blue-500" /> Recent Decisions
                                    </h2>
                                    <div className="space-y-4">
                                        <DecisionItem
                                            date="Today"
                                            title="Adopted GGP as Governance Kernel"
                                            tag="ARCH"
                                        />
                                        <DecisionItem
                                            date="Yesterday"
                                            title="Delayed Marketing Push to Q2"
                                            tag="STRAT"
                                        />
                                        <DecisionItem
                                            date="Dec 28"
                                            title="Approved Hiring Plan for Ops"
                                            tag="HR"
                                        />
                                    </div>
                                    <button className="w-full mt-6 py-2 border border-dashed border-neutral-700 text-neutral-500 text-xs font-bold uppercase hover:border-neutral-500 hover:text-neutral-300 transition-all rounded">
                                        + Log New Decision
                                    </button>
                                </section>
                            </div>

                        </div>
                    )}

                    {activeTab !== 'WEEKLY' && (
                        <div className="flex flex-col items-center justify-center h-full opacity-50">
                            <Layers size={64} className="text-neutral-700 mb-4" />
                            <h3 className="text-xl font-bold text-neutral-500 uppercase">View Construction</h3>
                            <p className="text-neutral-600">This iteration loop is currently being modeled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CycleStatus({ label, status }) {
    const getColor = (s) => {
        if (s === 'Complete') return 'text-green-500';
        if (s === 'On Track') return 'text-blue-500';
        return 'text-amber-500';
    };

    return (
        <div className="text-right">
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{label}</div>
            <div className={`text-sm font-bold ${getColor(status)}`}>{status}</div>
        </div>
    );
}

function NavBtn({ id, icon: Icon, label, active, onClick }) {
    const isActive = active === id;
    return (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center gap-3 p-3 rounded text-sm font-bold transition-all ${isActive
                ? 'bg-amber-600 text-black shadow-lg shadow-amber-900/20'
                : 'text-neutral-400 hover:bg-[#222] hover:text-white'
                }`}
        >
            <Icon size={16} />
            {label}
            {isActive && <ArrowRight size={14} className="ml-auto opacity-50" />}
        </button>
    );
}

function DecisionItem({ date, title, tag }) {
    return (
        <div className="flex gap-4 items-start group">
            <div className="w-16 pt-1 text-right text-[10px] font-mono text-neutral-500">{date}</div>
            <div className="flex-1 pb-4 border-b border-[#222] group-last:border-0">
                <p className="text-sm text-neutral-300 font-medium mb-1 group-hover:text-white transition-colors">{title}</p>
                <span className="text-[9px] font-bold bg-[#222] text-neutral-500 px-1.5 py-0.5 rounded border border-[#333] uppercase">
                    {tag}
                </span>
            </div>
        </div>
    );
}
