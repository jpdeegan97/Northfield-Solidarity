import React from 'react';

export default function INCView({ engine }) {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-orange-500/30 rounded-lg p-8 pointer-events-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{engine?.name || 'PROJECT INCUBATOR'}</h2>
                <div className="text-sm font-mono text-orange-400 mb-4">{engine?.code || 'INC'}</div>

                <div className="mb-6 p-6 bg-orange-900/20 border border-orange-500/20 rounded">
                    <div className="text-xs text-orange-500 uppercase tracking-widest mb-4">Venture Funnel</div>
                    <div className="flex justify-between gap-2">
                        <div className="flex-1 p-2 bg-black/40 rounded border border-white/5">
                            <div className="text-xl font-bold text-white">0</div>
                            <div className="text-[10px] text-white/50">Candidates</div>
                        </div>
                        <div className="flex-1 p-2 bg-black/40 rounded border border-white/5">
                            <div className="text-xl font-bold text-white">0</div>
                            <div className="text-[10px] text-white/50">Validating</div>
                        </div>
                        <div className="flex-1 p-2 bg-black/40 rounded border border-white/5">
                            <div className="text-xl font-bold text-white">0</div>
                            <div className="text-[10px] text-white/50">Graduated</div>
                        </div>
                    </div>
                </div>

                <p className="text-white/70 mb-6">{engine?.description}</p>
            </div>
        </div>
    );
}
