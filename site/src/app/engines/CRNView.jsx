import React from 'react';

export default function CRNView({ engine }) {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg p-8 pointer-events-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{engine?.name || 'CHRONICLE'}</h2>
                <div className="text-sm font-mono text-emerald-400 mb-4">{engine?.code || 'CRN'}</div>

                <div className="flex flex-col gap-2 mb-6 text-left max-w-md mx-auto">
                    <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded flex justify-between items-center group transition-all">
                        <span className="text-sm font-bold text-emerald-300">New Morning Brief (AM)</span>
                        <span className="text-xs text-white/50 group-hover:text-white">Start Logic &rarr;</span>
                    </button>
                    <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded flex justify-between items-center group transition-all">
                        <span className="text-sm font-bold text-emerald-300">New Evening Debrief (PM)</span>
                        <span className="text-xs text-white/50 group-hover:text-white">Start Logic &rarr;</span>
                    </button>
                </div>

                <p className="text-white/70 mb-6">{engine?.description}</p>
                <div className="text-xs text-white/30 italic">Daily artifacts stored in /NS-CHRONICLE/Archive</div>
            </div>
        </div>
    );
}
