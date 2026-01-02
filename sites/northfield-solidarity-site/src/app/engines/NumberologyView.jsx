import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sigma, TrendingUp, Binary, Hash, HelpCircle } from 'lucide-react';

export default function NumberologyView() {
    const [pattern, setPattern] = useState([]);

    // Generate random number stream
    useEffect(() => {
        const interval = setInterval(() => {
            setPattern(prev => {
                const next = [...prev, Math.random() > 0.5 ? 1 : 0];
                if (next.length > 50) return next.slice(1);
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-[#050505] text-white font-mono overflow-hidden relative">
            {/* Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                        <Hash size={24} className="text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">NUMBEROLOGY</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-blue-500/80 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">v0.1.0</span>
                            <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Quantitative Analysis</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
                <div className="space-y-6">
                    <div className="border border-white/10 bg-white/5 p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Binary size={18} className="text-blue-400" />
                            Active Pattern Stream
                        </h2>
                        <div className="font-mono text-xs break-all text-blue-500/80 p-4 bg-black/50 rounded border border-white/5">
                            {pattern.join('')}
                        </div>
                    </div>

                    <div className="border border-white/10 bg-white/5 p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Sigma size={18} className="text-green-400" />
                            Derived Metrics
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricBox label="Entropy" value="0.84" color="green" />
                            <MetricBox label="Sigma" value="4.2" color="purple" />
                            <MetricBox label="Phi" value="1.618" color="amber" />
                            <MetricBox label="Delta" value="+0.05%" color="blue" />
                        </div>
                    </div>
                </div>

                <div className="border border-white/10 bg-white/5 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                    <HelpCircle size={48} className="text-white/10 mb-4" />
                    <h3 className="text-xl font-bold text-white/50 mb-2">Analysis Engines Idle</h3>
                    <p className="text-white/30 text-sm max-w-xs">
                        Connect data sources to begin quantitative modeling and pattern recognition.
                    </p>
                    <button className="mt-6 px-6 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded transition-colors text-xs font-bold uppercase tracking-widest">
                        Connect Source
                    </button>
                </div>
            </div>
        </div>
    );
}

function MetricBox({ label, value, color }) {
    const colors = {
        green: 'text-green-400 border-green-500/20 bg-green-500/5',
        blue: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
        purple: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
        amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    };

    return (
        <div className={`p-4 rounded border ${colors[color] || colors.blue}`}>
            <div className="text-[10px] uppercase opacity-60 mb-1">{label}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    );
}
