import React from 'react';

export default function FRKView({ engine }) {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 pointer-events-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{engine?.name || 'PROJECT FORK'}</h2>
                <div className="text-sm font-mono text-purple-400 mb-4">{engine?.code || 'FRK'}</div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                    <div className="p-4 bg-purple-500/10 rounded border border-purple-500/20">
                        <h3 className="text-xs font-bold text-purple-300 uppercase mb-2">Branches</h3>
                        <div className="text-white/60 text-xs">No active divergences detected.</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded border border-purple-500/20">
                        <h3 className="text-xs font-bold text-purple-300 uppercase mb-2">Prototypes</h3>
                        <div className="text-white/60 text-xs">Sandbox initialized.</div>
                    </div>
                </div>

                <p className="text-white/70 mb-6">{engine?.description}</p>
                <div className="p-2 bg-white/5 rounded border border-white/10 inline-block">
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Status: {engine?.status}</span>
                </div>
            </div>
        </div>
    );
}
