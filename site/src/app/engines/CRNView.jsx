import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { hasJournalAccess } from '../../utils/access';
import { BookOpen } from 'lucide-react';

export default function CRNView({ engine }) {
    const { user } = useAuth();
    const canAccessJournal = hasJournalAccess(user);

    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-lg p-8 pointer-events-auto max-w-2xl text-center relative overflow-hidden">
                <h2 className="text-2xl font-bold text-white mb-2">{engine?.name || 'CHRONICLE'}</h2>
                <div className="text-sm font-mono text-emerald-400 mb-4">{engine?.code || 'CRN'}</div>

                <div className="flex flex-col gap-2 mb-6 text-left max-w-md mx-auto relative z-10">
                    <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded flex justify-between items-center group transition-all">
                        <span className="text-sm font-bold text-emerald-300">New Morning Brief (AM)</span>
                        <span className="text-xs text-white/50 group-hover:text-white">Start Logic &rarr;</span>
                    </button>
                    <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded flex justify-between items-center group transition-all">
                        <span className="text-sm font-bold text-emerald-300">New Evening Debrief (PM)</span>
                        <span className="text-xs text-white/50 group-hover:text-white">Start Logic &rarr;</span>
                    </button>

                    {/* Journal Integration */}
                    {canAccessJournal && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <BookOpen size={10} /> Sanctum Link Detected
                                </span>
                            </div>
                            <button className="w-full p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded flex justify-between items-center group transition-all">
                                <div className="flex flex-col items-start leading-none gap-1">
                                    <span className="text-sm font-bold text-purple-300">Access Journal</span>
                                    <span className="text-[9px] text-purple-400/60">Sanctum // Deep Dive</span>
                                </div>
                                <span className="text-xs text-white/50 group-hover:text-white">Launch &rarr;</span>
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-white/70 mb-6 relative z-10">{engine?.description}</p>
                <div className="text-xs text-white/30 italic relative z-10">Daily artifacts stored in /NS-CHRONICLE/Archive</div>

                {/* Background flourish if journal access available */}
                {canAccessJournal && (
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none rounded-full" />
                )}
            </div>
        </div>
    );
}
