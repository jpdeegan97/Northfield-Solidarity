import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Box, Play, CheckCircle, Clock, Zap, Layers, Terminal } from 'lucide-react';

export default function INCPView() {
    const [status, setStatus] = useState('IDLE'); // IDLE, GENERATING, COMPLETE
    const [progress, setProgress] = useState(0);
    const [activeStage, setActiveStage] = useState(0);

    const stages = [
        { id: 1, name: 'Intake Parsing', icon: FileText, desc: 'Validating idea.yaml' },
        { id: 2, name: 'Doc Generation', icon: Layers, desc: 'Compiling 000-014 packs' },
        { id: 3, name: 'Scaffold Build', icon: Box, desc: 'Creating repo structure' },
        { id: 4, name: 'MVP Synthesis', icon: Code, desc: 'Generating happy-path code' },
    ];

    const recentInceptions = [
        { id: 'PROJ-001', name: 'Boomerang V1', type: 'Growth Engine', time: '2h ago', status: 'ready' },
        { id: 'PROJ-002', name: 'Incubator MVP', type: 'Ops Platform', time: '1d ago', status: 'ready' },
        { id: 'PROJ-003', name: 'DataMesh Connect', type: 'Integration', time: '2d ago', status: 'failed' },
    ];

    const handleStartInception = () => {
        setStatus('GENERATING');
        setProgress(0);
        setActiveStage(0);

        // Mock Progress Simulation
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);

            if (p < 25) setActiveStage(0);
            else if (p < 50) setActiveStage(1);
            else if (p < 75) setActiveStage(2);
            else if (p < 100) setActiveStage(3);

            if (p >= 100) {
                clearInterval(interval);
                setStatus('COMPLETE');
                setActiveStage(4);
            }
        }, 100);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden relative selection:bg-amber-500/30">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[#111] border-b border-[#333] shadow-md z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center shadow-lg shadow-amber-900/20">
                        <Zap size={20} className="text-black" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3">
                            INCEPTION
                            <span className="text-[10px] bg-[#333] text-neutral-400 px-2 py-0.5 rounded font-mono border border-white/10">v0.1.0</span>
                        </h1>
                        <p className="text-neutral-500 text-xs font-mono uppercase tracking-tight">Idea-to-MVP Pipeline</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Status</div>
                        <div className={`text-sm font-bold ${status === 'GENERATING' ? 'text-amber-500 animate-pulse' : 'text-green-500'}`}>
                            {status === 'GENERATING' ? 'PROCESSING' : 'SYSTEM ONLINE'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-8 gap-8 overflow-y-auto z-10 relative">

                {/* Visual Pipeline */}
                <div className="w-full bg-[#111] border border-[#333] rounded-lg p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#222]">
                        <motion.div
                            className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex justify-between items-start relative z-10 pt-4">
                        {stages.map((stage, idx) => {
                            const isActive = idx === activeStage;
                            const isPast = idx < activeStage || status === 'COMPLETE';

                            return (
                                <div key={stage.id} className="flex flex-col items-center gap-3 w-1/4 text-center">
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                        ${isActive ? 'border-amber-500 bg-amber-500/10 text-amber-500 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]' :
                                            isPast ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-[#333] bg-[#222] text-neutral-600'}
                                    `}>
                                        <stage.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                                            {stage.name}
                                        </h3>
                                        <p className="text-[10px] text-neutral-600 mt-1">{stage.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {status === 'IDLE' && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleStartInception}
                                className="group relative px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-widest rounded overflow-hidden transition-all shadow-lg shadow-amber-900/40"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Play size={16} className="fill-current" /> Start Creation
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    )}

                    {status === 'COMPLETE' && (
                        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="text-xl font-bold text-white mb-2">Generation Complete</h3>
                            <p className="text-neutral-500 text-sm mb-6">New project scaffolded successfully. Artifacts available in /output.</p>
                            <div className="flex justify-center gap-4">
                                <button className="px-4 py-2 border border-[#333] hover:border-amber-500 text-neutral-300 hover:text-white rounded text-xs font-bold uppercase transition-colors">
                                    View Docs
                                </button>
                                <button className="px-4 py-2 border border-[#333] hover:border-amber-500 text-neutral-300 hover:text-white rounded text-xs font-bold uppercase transition-colors">
                                    Open Repo
                                </button>
                                <button onClick={() => { setStatus('IDLE'); setProgress(0); setActiveStage(0); }} className="px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded text-xs font-bold uppercase transition-colors">
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Artifacts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#111] border border-[#333] rounded-lg p-6">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Clock size={14} /> Recent Inceptions
                        </h3>
                        <div className="space-y-3">
                            {recentInceptions.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-[#1a1a1a] border border-[#222] rounded hover:border-neutral-700 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.status === 'ready' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <div>
                                            <div className="text-sm font-bold text-neutral-300 group-hover:text-white">{item.name}</div>
                                            <div className="text-[10px] text-neutral-600 font-mono">{item.id} • {item.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-neutral-500 font-mono">{item.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111] border border-[#333] rounded-lg p-6">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Terminal size={14} /> System Output
                        </h3>
                        <div className="h-40 bg-[#000] p-3 rounded font-mono text-[10px] text-green-500/80 overflow-y-auto leading-relaxed border border-[#222]">
                            <p className="opacity-50">&gt; INCEPTION_DAEMON online</p>
                            <p className="opacity-50">&gt; Listening for idea.yaml inputs...</p>
                            {status !== 'IDLE' && (
                                <>
                                    <p>&gt; Validating schema... OK</p>
                                    <p>&gt; Generative core warmed up.</p>
                                    <p>&gt; Writing 14/14 docs...</p>
                                    <p>&gt; Scaffolding React/Vite/Express...</p>
                                    <p>&gt; Running smoke tests... PASS</p>
                                </>
                            )}
                            <span className="animate-pulse">_</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
