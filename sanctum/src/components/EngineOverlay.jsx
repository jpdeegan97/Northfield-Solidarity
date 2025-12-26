import React from 'react';

export default function EngineOverlay({ engine }) {
    if (!engine) return null;

    return (
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-8 max-w-2xl mx-auto shadow-2xl">
            <div className="mb-6 pb-6 border-b border-white/10">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">{engine.category || 'System'}</span>
                <h1 className="text-4xl font-black text-white mb-2">{engine.code}</h1>
                <h2 className="text-xl text-white/70 font-light">{engine.name}</h2>
            </div>

            <div className="flex flex-col gap-6">
                <p className="text-lg text-white/90 leading-relaxed font-light">{engine.oneLiner || engine.description}</p>

                {engine.responsibilities && (
                    <div className="bg-white/5 rounded p-4">
                        <h4 className="text-xs font-bold text-brand uppercase mb-3 tracking-wider">Core Operations</h4>
                        <ul className="space-y-2">
                            {engine.responsibilities.slice(0, 3).map((r, i) => (
                                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                                    <span className="text-brand mt-1">•</span>
                                    <span>{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex gap-8 mt-2">
                    <div className="flex-1">
                        <h3 className="text-xs font-bold text-white/40 uppercase mb-1">Status</h3>
                        <p className={`text-lg font-mono font-medium ${engine.status?.includes('Active') ? 'text-brand' : 'text-yellow-400'}`}>
                            {engine.status || 'Operational'}
                        </p>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xs font-bold text-white/40 uppercase mb-1">Version</h3>
                        <p className="text-lg font-mono text-white/80">v0.{engine.code.length}.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
