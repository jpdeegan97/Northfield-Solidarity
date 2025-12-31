import React, { useState } from 'react';
import {
    Users, Target, Shield, Zap, Search,
    LayoutGrid, List, Activity, MapPin,
    FileText, Cpu, Clock, AlertCircle, ChevronRight
} from 'lucide-react';


export default function ASCView() {
    const [viewMode, setViewMode] = useState('ROSTER'); // ROSTER, LIVE_OPS, BIOS
    const [selectedAgent, setSelectedAgent] = useState(null);

    // --- MOCK DATA: AGENTS ---
    const agents = [
        {
            id: 'ag-001', name: 'Agent Smith', role: 'Sales Lead', dept: 'Revenue', status: 'Online',
            assignment: 'Closing Acme Corp', location: 'NYC Node',
            bio: 'Top-tier closer with background in aggressive negotiation. Former hedge fund algotrader.',
            skills: ['Negotiation', 'Game Theory', 'Closing'],
            metrics: { efficiency: '99%', output: '$4.2M' }
        },
        {
            id: 'ag-002', name: 'Linus', role: 'Chief Architect', dept: 'Engineering', status: 'Deep Focus',
            assignment: 'Refactoring Core Kernel', location: 'Remote (Helsinki)',
            bio: 'Legendary systems engineer. Does not tolerate latency or bloated code.',
            skills: ['C++', 'Kernel', 'Distributed Systems'],
            metrics: { efficiency: '98%', output: '14k LOC' }
        },
        {
            id: 'ag-003', name: 'Don Draper', role: 'Creative Director', dept: 'Marketing', status: 'Offline',
            assignment: 'Q4 Brand Vision', location: 'NYC Node',
            bio: 'Visionary storyteller. Operates on intuition and whiskey. High impact, high maintenance.',
            skills: ['Brand Strategy', 'Copywriting', 'Design'],
            metrics: { efficiency: '85%', output: '4 Campaigns' }
        },
        {
            id: 'ag-004', name: 'Alfred', role: 'Chief of Staff', dept: 'Operations', status: 'Online',
            assignment: 'Global Coordination', location: 'London Node',
            bio: 'The glue that holds the organization together. Master of logistics and discretion.',
            skills: ['Logistics', 'Security', 'Management'],
            metrics: { efficiency: '100%', output: '0 Incidents' }
        },
        {
            id: 'ag-005', name: 'Sarah Connor', role: 'Strategist', dept: 'Revenue', status: 'In Meeting',
            assignment: 'Resistance Partnership', location: 'LA Node',
            bio: 'Expert in long-term strategic threats and opportunities. rigorous planning.',
            skills: ['Strategy', 'Risk Assessment', 'Combat'],
            metrics: { efficiency: '94%', output: '$1.8M' }
        },
        {
            id: 'ag-006', name: 'Ada', role: 'Data Scientist', dept: 'Engineering', status: 'Online',
            assignment: 'Predictive Models', location: 'Remote (London)',
            bio: 'Pioneer in computational algorithms. Transforming raw data into prophecy.',
            skills: ['Python', 'ML', 'Statistics'],
            metrics: { efficiency: '96%', output: '12 Models' }
        },
    ];

    // --- MOCK DATA: LIVE OPS ---
    const activeTasks = [
        { id: 101, agent: 'Agent Smith', action: 'Drafting Contract', target: 'Acme Corp', time: '2m ago' },
        { id: 102, agent: 'Linus', action: 'Pushing Commit', target: 'ns-core/kernel', time: '5m ago' },
        { id: 103, agent: 'Ada', action: 'Training Model', target: 'Sales-Predictor-v2', time: '12m ago' },
        { id: 104, agent: 'Alfred', action: 'Approving Expense', target: 'Travel Budget', time: '15m ago' },
    ];

    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white p-6 font-sans flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5 shrink-0">
                <div>
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Users className="text-blue-500" />
                        PERSONNEL COMMAND
                    </h1>
                    <p className="text-sm text-white/40 mt-1">Sanctum Oversight • Workforce Analytics</p>
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                    {['ROSTER', 'LIVE_OPS'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => { setViewMode(mode); setSelectedAgent(null); }}
                            className={`px-4 py-2 text-xs font-bold rounded-md flex items-center gap-2 transition-all ${viewMode === mode
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {mode === 'ROSTER' && <List size={14} />}
                            {mode === 'LIVE_OPS' && <Activity size={14} />}
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">

                {/* LEFT PANEL: CONTENT */}
                <div className="flex-1 flex flex-col min-h-0 bg-white/5 border border-white/5 rounded-xl overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                            <input
                                type="text"
                                placeholder="Search personnel..."
                                className="bg-black/50 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 w-64 transition-colors"
                            />
                        </div>
                        <div className="flex gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> 4 Online</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 1 Away</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> 1 Offline</span>
                        </div>
                    </div>

                    {/* View: ROSTER */}
                    {viewMode === 'ROSTER' && (
                        <div className="flex-1 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 text-xs text-white/40 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-4 font-normal">Agent Name</th>
                                        <th className="px-6 py-4 font-normal">Department</th>
                                        <th className="px-6 py-4 font-normal">Assignment (Current Focus)</th>
                                        <th className="px-6 py-4 font-normal">Status</th>
                                        <th className="px-6 py-4 font-normal text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-white/5">
                                    {agents.map(agent => (
                                        <tr
                                            key={agent.id}
                                            onClick={() => setSelectedAgent(agent)}
                                            className={`
                                                cursor-pointer transition-colors group
                                                ${selectedAgent?.id === agent.id ? 'bg-blue-500/10' : 'hover:bg-white/5'}
                                            `}
                                        >
                                            <td className="px-6 py-4 font-bold flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center text-[10px] text-white/50">
                                                    {agent.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                {agent.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold border ${agent.dept === 'Engineering' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                    agent.dept === 'Revenue' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                                        agent.dept === 'Marketing' ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' :
                                                            'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                    }`}>
                                                    {agent.dept}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-white/70">
                                                {agent.assignment}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Online' ? 'bg-emerald-500 animate-pulse' :
                                                        agent.status === 'Deep Focus' ? 'bg-purple-500' :
                                                            agent.status === 'Offline' ? 'bg-red-500' : 'bg-amber-500'
                                                        }`}></div>
                                                    <span className="text-xs text-white/50">{agent.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <ChevronRight size={16} className="text-white/20 group-hover:text-white inline-block transition-colors" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* View: LIVE OPS */}
                    {viewMode === 'LIVE_OPS' && (
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-4 flex items-center gap-2">
                                        <Activity size={14} /> System Activity
                                    </h3>
                                    <div className="space-y-4">
                                        {activeTasks.map(task => (
                                            <div key={task.id} className="flex items-center gap-4 p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-xs font-mono text-blue-400 w-12">{task.time}</div>
                                                <div className="flex-1">
                                                    <span className="font-bold text-white">{task.agent}</span>
                                                    <span className="text-white/40 mx-2">is</span>
                                                    <span className="text-white/80">{task.action}</span>
                                                </div>
                                                <div className="text-xs bg-white/10 px-2 py-1 rounded text-white/50">
                                                    {task.target}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/10 p-6 rounded-xl flex flex-col">
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-4 flex items-center gap-2">
                                        <MapPin size={14} /> Workforce Distribution
                                    </h3>
                                    <div className="flex-1 flex items-center justify-center border border-white/5 rounded bg-white/5 relative overflow-hidden">
                                        <div className="text-white/20 text-xs">[ Heatmap Placeholder ]</div>
                                        {/* Mock Dots */}
                                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-75"></div>
                                        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-150"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT PANEL: DETAILS (BIO) */}
                <div className="w-96 bg-white/5 border border-white/5 rounded-xl flex flex-col overflow-hidden">
                    {selectedAgent ? (
                        <>
                            {/* Bio Header */}
                            <div className="p-6 border-b border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <UserIconByDept dept={selectedAgent.dept} size={100} />
                                </div>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-xl border-2 border-white/10 flex items-center justify-center text-xl font-bold">
                                    {selectedAgent.name.substring(0, 2).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-black">{selectedAgent.name}</h2>
                                <p className="text-blue-400 font-medium">{selectedAgent.role}</p>
                                <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                                    <MapPin size={12} /> {selectedAgent.location}
                                </div>
                            </div>

                            {/* Bio Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-2 flex items-center gap-2">
                                        <FileText size={12} /> Psyche Profile
                                    </h3>
                                    <p className="text-sm text-white/70 leading-relaxed italic border-l-2 border-blue-500 pl-4 py-1">
                                        "{selectedAgent.bio}"
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-3 flex items-center gap-2">
                                        <Cpu size={12} /> Skills & Competencies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAgent.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-white/80">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-3 flex items-center gap-2">
                                        <Activity size={12} /> Performance Metrics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/50 p-3 rounded border border-white/5">
                                            <div className="text-[10px] text-white/40 mb-1">Efficiency</div>
                                            <div className="text-xl font-bold text-emerald-400">{selectedAgent.metrics.efficiency}</div>
                                        </div>
                                        <div className="bg-black/50 p-3 rounded border border-white/5">
                                            <div className="text-[10px] text-white/40 mb-1">Output (Cycle)</div>
                                            <div className="text-xl font-bold text-white">{selectedAgent.metrics.output}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase text-white/40 mb-3 flex items-center gap-2">
                                        <Clock size={12} /> Current Assignment
                                    </h3>
                                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <div className="font-bold text-blue-400 text-sm mb-1">{selectedAgent.assignment}</div>
                                        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2">
                                            <div className="bg-blue-500 h-full w-[70%]"></div>
                                        </div>
                                        <div className="flex justify-between mt-2 text-[10px] text-white/30">
                                            <span>In Progress</span>
                                            <span>Est. Completion: 2d</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-white/20 p-8 text-center">
                            <Users size={48} className="mb-4 opacity-50" />
                            <p className="font-bold">No Agent Selected</p>
                            <p className="text-sm mt-2">Select an agent from the roster to view their full bio and performance matrix.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

// Helper for dynamic icons
const UserIconByDept = ({ dept, size }) => {
    switch (dept) {
        case 'Engineering': return <Cpu size={size} />;
        case 'Revenue': return <Target size={size} />;
        case 'Marketing': return <Zap size={size} />;
        case 'Operations': return <Shield size={size} />;
        default: return <Users size={size} />;
    }
};
