import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Database, Play, Save, Box, Workflow, Layers, RefreshCw, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import Layout from '../../components/Layout';

export default function SanctumEngineBuilder() {
    const navigate = useNavigate();
    const { activeUsers } = useSecurity();
    const [status, setStatus] = useState('IDLE');
    const [logs, setLogs] = useState([]);
    const [isPersonnelCollapsed, setIsPersonnelCollapsed] = useState(false);

    const runSync = () => {
        // TODO: Replace with GitOps API Hook once K8s pipeline is live.
        // Current implementation is a UI simulation for staging.
        // Future state: POST /api/inception/generate -> Triggers K8s Job -> Commit to Repo
        setStatus('RUNNING');
        addLog('Initializing INCEPTION protocol...');
        setTimeout(() => addLog('Scanning project directories...'), 800);
        setTimeout(() => addLog('Delta detected: NS-INCP (New)'), 1500);
        setTimeout(() => addLog('Generating scaffold for NS-INCP...'), 2400);
        setTimeout(() => {
            addLog('Inception Complete. All systems nominal.');
            setStatus('COMPLETE');
        }, 3500);
    };

    const addLog = (msg) => {
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
    };

    return (
        <Layout>
            <div className="p-8 font-mono text-white/80 dark min-h-screen">
                <header className="mb-8 pb-6 border-b border-white/10 flex items-end justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#00ff9d]/10 rounded-lg border border-[#00ff9d]/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#00ff9d]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Box size={32} className="text-[#00ff9d] relative z-10" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-white mb-1">ENGINE BUILDER</h1>
                            <p className="text-[#00ff9d] uppercase tracking-[0.2em] text-xs font-bold">Staging Environment & Asset Synthesis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-wider">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse"></div>
                            System Nominal
                        </div>
                        <div>v2.4.0-alpha</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
                    {/* Left Panel: Configuration (Col Span 8) */}
                    <div className="lg:col-span-8 space-y-6 flex flex-col h-full">
                        {/* Asset Manifest */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden flex-1 flex flex-col relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <Workflow className="text-white/5 w-32 h-32 -rotate-12" />
                            </div>

                            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center relative z-10">
                                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                                    <Layers size={16} className="text-[#00ff9d]" /> Asset Manifest
                                </h3>
                                <button className="text-[10px] font-bold bg-[#00ff9d]/10 text-[#00ff9d] px-3 py-1.5 rounded border border-[#00ff9d]/30 hover:bg-[#00ff9d] hover:text-black transition-all uppercase tracking-wider">
                                    + New Definition
                                </button>
                            </div>

                            <div className="p-8 space-y-8 flex-1 overflow-y-auto relative z-10">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold uppercase text-[#00ff9d] tracking-wider mb-2">Engine Code</label>
                                        <input type="text" placeholder="e.g. INPC" className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder-white/20 font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold uppercase text-[#00ff9d] tracking-wider mb-2">Type</label>
                                        <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-[#00ff9d] transition-all font-mono appearance-none">
                                            <option>Engine (Core)</option>
                                            <option>Project (Extension)</option>
                                            <option>Utility</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-xs font-bold uppercase text-[#00ff9d] tracking-wider">Capabilities Matrix</label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                        {[
                                            { name: 'Auth Context', default: true },
                                            { name: 'API Gateway', default: true },
                                            { name: 'Data Pipeline', default: true },
                                            { name: 'Visualization', default: true },
                                            { name: 'Physics Engine', default: false },
                                            { name: 'Vector Store', default: false },
                                            { name: 'Cron Jobs', default: true },
                                            { name: 'Websockets', default: false }
                                        ].map(cap => (
                                            <label key={cap.name} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all group ${cap.default ? 'bg-[#00ff9d]/5 border-[#00ff9d]/30' : 'bg-black border-white/5 hover:border-white/20'}`}>
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${cap.default ? 'bg-[#00ff9d] border-[#00ff9d]' : 'border-white/20 group-hover:border-[#00ff9d]'}`}>
                                                    {cap.default && <div className="w-2 h-2 bg-black rounded-sm" />}
                                                </div>
                                                <span className={`text-xs font-bold tracking-wide ${cap.default ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>{cap.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Pipelines</h4>
                                        <span className="text-[10px] text-white/40">2 Running</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border-l-2 border-[#00ff9d]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_8px_#00ff9d]"></div>
                                                <span className="text-xs font-bold text-white">NS-INCEPTION-PROTO</span>
                                            </div>
                                            <span className="text-[10px] text-white/40 font-mono">PID: 4022 • 24MB</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border-l-2 border-amber-500/50 opacity-60">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                                <span className="text-xs font-bold text-white">LEGACY-BUILD</span>
                                            </div>
                                            <span className="text-[10px] text-white/40 font-mono">SUSPENDED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-3 relative z-10">
                                <button className="flex-1 py-3 bg-[#00ff9d] text-black rounded-lg font-black hover:bg-[#00ff9d]/90 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                                    <Save size={16} /> Specify Configuration
                                </button>
                                <button className="px-6 border border-white/10 text-white/60 rounded-lg hover:bg-white/5 transition-colors font-bold uppercase text-xs tracking-wider">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Execution & Logs (Col Span 4) */}
                    <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
                        <div className="bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col flex-1 shadow-2xl">
                            <div className="p-3 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-white/60">
                                    <Terminal size={14} className="text-[#00ff9d]" /> Console Output
                                </h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                            </div>
                            <div className="flex-1 p-4 font-mono text-[11px] space-y-1.5 overflow-y-auto bg-black custom-scrollbar relative">
                                {logs.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/10 pointer-events-none">
                                        <div className="text-center">
                                            <Terminal size={48} className="mx-auto mb-4 opacity-20" />
                                            <p className="uppercase tracking-widest text-xs font-bold">System Ready</p>
                                        </div>
                                    </div>
                                )}
                                {logs.map((log, i) => (
                                    <div key={i} className="flex gap-3 hover:bg-white/5 p-1 rounded transition-colors group">
                                        <span className="text-white/20 select-none w-16 text-right group-hover:text-white/40 transition-colors">[{log.time}]</span>
                                        <div className="flex-1 break-all">
                                            <span className="text-[#00ff9d] mr-2">›</span>
                                            <span className="text-white/90">{log.msg}</span>
                                        </div>
                                    </div>
                                ))}
                                {status === 'RUNNING' && (
                                    <div className="flex gap-3 p-1 animate-pulse">
                                        <span className="text-white/20 w-16 text-right">...</span>
                                        <span className="text-[#00ff9d]">_</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
                                <button
                                    onClick={runSync}
                                    disabled={status === 'RUNNING'}
                                    className="w-full py-2.5 border border-[#00ff9d]/30 text-[#00ff9d] bg-[#00ff9d]/5 rounded font-bold hover:bg-[#00ff9d]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 backdrop-blur-sm"
                                >
                                    <RefreshCw size={14} className={status === 'RUNNING' ? 'animate-spin' : ''} />
                                    {status === 'RUNNING' ? 'Syncing Environment...' : 'Initialise Sync Sequence'}
                                </button>
                            </div>
                        </div>

                        {/* Active Personnel */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300">
                            <div
                                onClick={() => setIsPersonnelCollapsed(!isPersonnelCollapsed)}
                                className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group select-none"
                            >
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 group-hover:text-white/60 transition-colors">
                                    <Users size={14} className="text-[#00ff9d]" /> Active Operators
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-2 py-0.5 bg-[#00ff9d]/10 rounded border border-[#00ff9d]/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_8px_#00ff9d]" />
                                        <span className="text-[10px] text-[#00ff9d] font-bold tracking-wider">{activeUsers.filter(u => u.status === 'ONLINE').length} ONLINE</span>
                                    </div>
                                    {isPersonnelCollapsed ? <ChevronDown size={14} className="text-white/20" /> : <ChevronUp size={14} className="text-white/20" />}
                                </div>
                            </div>

                            {!isPersonnelCollapsed && (
                                <div className="px-5 pb-5 space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar animate-in slide-in-from-top-2 duration-200">
                                    {activeUsers.filter(u => u.status === 'ONLINE').map(u => (
                                        <div
                                            key={u.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/engine/IDN');
                                            }}
                                            className="group p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all flex items-center justify-between cursor-pointer active:scale-95"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-sm bg-white/20 group-hover:bg-[#00ff9d] transition-colors" />
                                                    <span className="text-xs font-bold text-white group-hover:text-[#00ff9d] transition-colors">
                                                        {u.name}
                                                    </span>
                                                </div>
                                                <div className="text-[9px] text-white/30 pl-3.5 uppercase tracking-wider font-mono mt-0.5">
                                                    {u.currentLocation}
                                                </div>
                                            </div>
                                            <span className="text-[9px] font-black text-black bg-white/20 group-hover:bg-[#00ff9d] px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors">
                                                {u.role === 'admin' ? 'L100' : u.role === 'operator' ? 'L80' : 'L40'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
