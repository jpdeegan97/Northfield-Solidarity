import React, { useState } from 'react';
import { Repeat, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BoomerangView({ engine }) {
    const [balance] = useState(100);

    return (
        <div className="h-full w-full bg-[#1a0505] text-white p-8 font-mono overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_50%)]" />

            <div className="relative z-10 flex flex-col h-full">
                <header className="flex justify-between items-end border-b border-red-500/20 pb-6 mb-8">
                    <div>
                        <h1 className="text-5xl font-black text-red-500 tracking-tighter italic">BOOMERANG</h1>
                        <p className="text-xs text-red-200/50 mt-2 uppercase tracking-widest">Reciprocal Value Flow Protocol</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-mono font-bold text-white">{balance.toFixed(2)}</div>
                        <div className="text-[10px] text-red-400 uppercase tracking-wider">Karma Balance</div>
                    </div>
                </header>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* The Loop Visualizer */}
                    <div className="relative aspect-square max-w-sm mx-auto">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-dashed border-red-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[15%] border-2 border-red-500/40 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Repeat size={48} className="text-red-500" />
                        </div>

                        {/* Orbiting particles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_20px_white]" />
                        </motion.div>
                    </div>

                    {/* Action Panel */}
                    <div className="space-y-6">
                        <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-xl">
                            <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm mb-4">Pending Reciprocity</h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded border border-red-500/10 hover:border-red-500/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <ArrowRightLeft size={14} className="text-red-500 group-hover:rotate-180 transition-transform duration-500" />
                                            <div>
                                                <div className="text-xs font-bold text-white">Value Event #{1000 + i}</div>
                                                <div className="text-[9px] text-white/40">From: External_Source_A</div>
                                            </div>
                                        </div>
                                        <div className="font-mono text-sm text-red-400 font-bold">+ {i * 15}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="py-4 bg-red-600 text-white font-black uppercase tracking-wider rounded hover:bg-red-500 transition shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                                Throw
                            </button>
                            <button className="py-4 bg-black border border-red-500/30 text-red-400 font-bold uppercase tracking-wider rounded hover:bg-red-900/20 transition">
                                Catch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
