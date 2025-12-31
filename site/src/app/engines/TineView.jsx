import React, { useState } from 'react';
import { ChefHat, Utensils, BookOpen, Flame, Star } from 'lucide-react';

export default function TineView() {
    const [recipes] = useState([
        { id: 1, name: 'Saffron Risotto', origin: 'Milanese', rating: 5, status: 'MASTERED' },
        { id: 2, name: 'Beef Wellington', origin: 'English', rating: 4, status: 'PRACTICING' },
        { id: 3, name: 'Pho Ga', origin: 'Vietnamese', rating: 5, status: 'MASTERED' },
        { id: 4, name: 'Mole Poblano', origin: 'Mexican', rating: 3, status: 'LEARNING' },
    ]);

    return (
        <div className="h-full w-full bg-[#0a0908] text-[#e0deda] p-8 font-serif">
            <header className="flex items-center justify-between mb-12 border-b border-[#e0deda]/20 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#e0deda]/10 rounded-full border border-[#e0deda]/20">
                        <Utensils size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">TINE</h1>
                        <p className="font-sans text-xs uppercase tracking-widest opacity-60 mt-1">Culinary Arts & Culture Database</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center px-6 border-r border-white/10">
                        <div className="text-3xl font-bold">42</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-50 font-sans">Mastered</div>
                    </div>
                    <div className="text-center px-6">
                        <div className="text-3xl font-bold">18</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-50 font-sans">In Queue</div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recipe Card */}
                <div className="bg-[#141210] border border-[#e0deda]/10 p-6 rounded-lg relative overflow-hidden group">
                    {/* Decorative background image placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Cooking" />

                    <div className="relative z-20 h-full flex flex-col justify-end">
                        <div className="bg-black/60 backdrop-blur p-4 rounded border border-white/10">
                            <h2 className="text-2xl font-bold mb-1">Weekly Exploration</h2>
                            <p className="text-sm opacity-70 font-sans mb-4">Focus: Fermentation techniques in Japanese cuisine.</p>
                            <button className="flex items-center gap-2 text-xs font-bold font-sans uppercase tracking-wider bg-white text-black px-4 py-2 rounded hover:bg-[#e0deda]">
                                <BookOpen size={14} /> Open Collection
                            </button>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4 font-sans">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 border-b border-white/10 pb-2">Active Repertoire</h3>
                    {recipes.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-4 bg-[#141210] border border-white/5 rounded hover:border-white/20 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${r.status === 'MASTERED' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-amber-900/40 text-amber-400'}`}>
                                    <ChefHat size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-lg font-serif">{r.name}</div>
                                    <div className="text-xs opacity-50 uppercase tracking-wider">{r.origin}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} className={i < r.rating ? "fill-current text-yellow-500" : "text-white/10"} />
                                    ))}
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${r.status === 'MASTERED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {r.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    <button className="w-full py-3 border border-dashed border-white/10 text-white/30 hover:text-white uppercase text-xs font-bold tracking-widest rounded transition-colors flex items-center justify-center gap-2">
                        <Flame size={14} /> Add Experiment
                    </button>
                </div>
            </div>
        </div>
    );
}
