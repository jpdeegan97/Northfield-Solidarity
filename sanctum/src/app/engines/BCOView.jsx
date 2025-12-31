import React from 'react';

export default function BCOView({ engine }) {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-red-500/30 rounded-lg p-8 pointer-events-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{engine?.name || 'BUSINESS CONTINUITY OPS'}</h2>
                <div className="text-sm font-mono text-red-400 mb-4">{engine?.code || 'BCO'}</div>
                <p className="text-white/70 mb-6">{engine?.description || 'Resilience and failover operations.'}</p>
                <div className="p-2 bg-white/5 rounded border border-white/10 inline-block">
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Status: Planned</span>
                </div>
            </div>
        </div>
    );
}
