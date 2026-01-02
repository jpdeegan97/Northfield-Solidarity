import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Brain, Disc, Database, Lock, AlertTriangle, ArrowRight, Zap, Target, Search } from 'lucide-react';

export default function INVView() {
    const [status, setStatus] = useState('IDLE'); // IDLE, PROCESSING, COMPLETE
    const [progress, setProgress] = useState(0);
    const [detectedContext, setDetectedContext] = useState([]);

    const pipelineSteps = [
        { id: 'INGEST', label: 'Ingest Transcript', icon: FileText },
        { id: 'EMBED', label: 'Vectorize', icon: Disc },
        { id: 'INVERT', label: 'Inversion', icon: Brain },
        { id: 'VALIDATE', label: 'Probabilistic Audit', icon: Lock },
    ];

    const mockLatents = [
        { type: 'INTENT', confidence: 0.98, value: 'Build MVP for Inverse Engine' },
        { type: 'CONSTRAINT', confidence: 0.85, value: 'Must integrate with Duct Tape' },
        { type: 'ASSUMPTION', confidence: 0.62, value: 'User has access to GPU cluster' },
        { type: 'ANCHOR', confidence: 0.92, value: 'Project Code: NS-INV' },
    ];

    const handleRunInversion = () => {
        setStatus('PROCESSING');
        setProgress(0);
        setDetectedContext([]);

        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);

            if (p > 100) {
                clearInterval(interval);
                setStatus('COMPLETE');
                setDetectedContext(mockLatents);
            }
        }, 50);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#050505] text-neutral-300 font-sans overflow-hidden relative selection:bg-purple-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-[#0a0a0a] border-b border-purple-900/30 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                        <Brain size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3">
                            INVERSE
                            <span className="text-[10px] bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded font-mono border border-purple-500/30">v0.1</span>
                        </h1>
                        <p className="text-purple-400/60 text-xs font-mono uppercase tracking-tight">Latent Context Recovery</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Status</div>
                        <div className={`text-sm font-mono font-bold ${status === 'PROCESSING' ? 'text-purple-400 animate-pulse' : 'text-neutral-400'}`}>
                            {status === 'PROCESSING' ? 'DECODING...' : 'STANDBY'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6 p-6 overflow-hidden z-10">

                {/* Left Panel: Input & Control */}
                <div className="w-1/3 flex flex-col gap-6">
                    <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <Target size={14} /> Source Select
                        </h3>
                        <div className="p-4 bg-[#111] border border-neutral-800 rounded hover:border-purple-500/50 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-mono text-purple-500">DT-SES-042</span>
                                <span className="text-[10px] text-neutral-600">2h ago</span>
                            </div>
                            <p className="text-sm text-neutral-300 font-medium group-hover:text-white">"Architecture sync regarding GGP integration..."</p>
                            <div className="mt-3 flex gap-2">
                                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">Audio: 45m</span>
                                <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">Tokens: 8k</span>
                            </div>
                        </div>

                        <button
                            onClick={handleRunInversion}
                            disabled={status === 'PROCESSING'}
                            className={`
                                py-4 font-bold uppercase tracking-widest text-sm rounded transition-all flex items-center justify-center gap-3
                                ${status === 'PROCESSING'
                                    ? 'bg-purple-900/20 text-purple-500 border border-purple-500/50 cursor-wait'
                                    : 'bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-900/30'}
                            `}
                        >
                            {status === 'PROCESSING' ? <Zap size={16} className="animate-spin" /> : <Zap size={16} />}
                            {status === 'PROCESSING' ? 'Recovering...' : 'Start Inversion'}
                        </button>
                    </div>

                    {/* Pipeline Viz */}
                    <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 flex-1">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Inversion Pipeline</h3>
                        <div className="space-y-6 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-neutral-800 -z-10" />

                            {pipelineSteps.map((step, idx) => {
                                const isCurrent = status === 'PROCESSING' && (progress / 100) * pipelineSteps.length >= idx && (progress / 100) * pipelineSteps.length < idx + 1;
                                const isDone = status === 'COMPLETE' || (status === 'PROCESSING' && (progress / 100) * pipelineSteps.length >= idx + 1);

                                return (
                                    <div key={step.id} className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-[#0a0a0a]
                                            ${isCurrent ? 'border-purple-500 text-purple-500 scale-110 shadow-[0_0_10px_rgba(168,85,247,0.4)]' :
                                                isDone ? 'border-green-500 text-green-500' : 'border-neutral-800 text-neutral-700'}
                                        `}>
                                            <step.icon size={16} />
                                        </div>
                                        <div>
                                            <div className={`text-xs font-bold uppercase ${isCurrent ? 'text-white' : 'text-neutral-500'}`}>{step.label}</div>
                                            {isCurrent && <div className="text-[10px] text-purple-400 animate-pulse">Processing...</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Output */}
                <div className="flex-1 bg-[#0a0a0a] border border-neutral-800 rounded-lg p-8 overflow-y-auto relative">
                    {status === 'IDLE' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                            <Database size={64} className="mb-4 text-neutral-700" />
                            <p className="text-neutral-500 font-mono text-sm">Waiting for input stream...</p>
                        </div>
                    )}

                    {detectedContext.length > 0 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Search size={18} className="text-purple-500" /> Recovered Latent Context
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {detectedContext.map((item, i) => (
                                        <div key={i} className="p-4 bg-[#111] border border-neutral-800 rounded hover:border-neutral-600 transition-colors flex items-start gap-4">
                                            <div className={`
                                                px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide
                                                ${item.type === 'INTENT' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' :
                                                    item.type === 'CONSTRAINT' ? 'bg-red-900/30 text-red-400 border border-red-500/30' :
                                                        item.type === 'ANCHOR' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-neutral-800 text-neutral-400'}
                                            `}>
                                                {item.type}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-neutral-200 font-medium mb-1">{item.value}</div>
                                                <div className="w-full bg-neutral-900 h-1 rounded-full mt-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-purple-600"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.confidence * 100}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                    />
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <span className="text-[10px] text-neutral-600">Confidence Model v2.1</span>
                                                    <span className="text-[10px] font-mono text-purple-400">{Math.round(item.confidence * 100)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 border border-dashed border-neutral-800 rounded bg-neutral-900/20">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <AlertTriangle size={12} className="text-yellow-500" /> Audit Log
                                </h3>
                                <p className="font-mono text-[10px] text-neutral-600">
                                    Run ID: INV-RUN-9923 • Model: Llama-3-70b-Instruct • Redaction: PII-Strict • <span className="text-green-500">Verified</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
