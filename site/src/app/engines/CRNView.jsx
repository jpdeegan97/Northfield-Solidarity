import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Edit3, Save, Clock, Search, ChevronRight, PenTool, Hash, Layout, Flag, CheckCircle, AlertCircle, Maximize2 } from 'lucide-react';

export default function CRNView() {
    const [activeTab, setActiveTab] = useState('JOURNAL');
    const [selectedDate, setSelectedDate] = useState('Today');
    const [entryContent, setEntryContent] = useState('');

    const recentEntries = [
        { id: 'LOG-2024-10-24', date: '2024-10-24', title: 'System Architecture Review', tags: ['Arch', 'Decision'], preview: 'Decided to move forward with the micro-kernel approach...' },
        { id: 'LOG-2024-10-23', date: '2024-10-23', title: 'Investor Meeting Prep', tags: ['Business', 'Pitch'], preview: 'Key points to cover: Growth metrics, user acquisition costs...' },
        { id: 'LOG-2024-10-22', date: '2024-10-22', title: 'Dependency Audit', tags: ['Eng', 'Safety'], preview: 'Found 3 critical vulnerabilities in legacy packages...' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#0c0a09] text-white font-sans overflow-hidden relative selection:bg-amber-500/30">
            {/* Paper Texture / Noise Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-amber-900/20 bg-[#0c0a09]/95 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                        <BookOpen size={24} className="text-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                            CHRONICLE
                            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/30 tracking-widest font-mono">JOURNAL</span>
                        </h1>
                        <p className="text-amber-500/50 text-xs font-mono tracking-widest uppercase mt-0.5">Decision Log & Daily Capture</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
                        <button className="p-2 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors"><Calendar size={18} /></button>
                        <button className="p-2 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors"><Search size={18} /></button>
                    </div>
                    <div className="w-px h-8 bg-amber-900/40" />
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white font-bold text-xs tracking-wide hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/20">
                        <Edit3 size={14} />
                        NEW ENTRY
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-row min-h-0 relative z-10">
                {/* Sidebar Navigation */}
                <div className="w-72 flex-none border-r border-amber-900/20 bg-[#0f0d0b] flex flex-col">
                    <div className="p-4 border-b border-white/5">
                        <div className="flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                            <span>Recent Logs</span>
                            <Clock size={12} />
                        </div>
                        <div className="space-y-2">
                            {recentEntries.map(entry => (
                                <div key={entry.id} className="p-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/5">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-amber-500 font-mono text-[10px]">{entry.date}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white/90 group-hover:text-amber-400 mb-1 line-clamp-1">{entry.title}</h4>
                                    <p className="text-xs text-white/40 line-clamp-2">{entry.preview}</p>
                                    <div className="flex gap-1 mt-2">
                                        {entry.tags.map(t => (
                                            <span key={t} className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-white/30">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 mt-auto">
                        <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-4">
                            <h5 className="text-amber-500 text-xs font-bold mb-1">Streak Active</h5>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-mono text-white">14</span>
                                <span className="text-xs text-white/40 mb-1">days logged</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor / Content Area */}
                <div className="flex-1 bg-[#0c0a09] flex flex-col relative">
                    <div className="flex-1 overflow-y-auto p-12 max-w-4xl mx-auto w-full">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono">
                                    {selectedDate === 'Today' ? new Date().toLocaleDateString() : selectedDate}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-xs font-mono flex items-center gap-2">
                                    <Clock size={12} />
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <input
                                type="text"
                                placeholder="Entry Title..."
                                className="w-full bg-transparent text-4xl font-bold text-white placeholder-white/20 border-none outline-none mb-4"
                            />
                            <div className="flex gap-2 mb-8">
                                {['Decision', 'Meeting', 'Idea', 'System'].map(tag => (
                                    <button key={tag} className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs border border-white/5 transition-all flex items-center gap-2">
                                        <Hash size={12} /> {tag}
                                    </button>
                                ))}
                                <button className="px-3 py-1 rounded-full border border-dashed border-white/20 text-white/20 hover:text-white hover:border-white/40 text-xs transition-all">
                                    + Add Tag
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={entryContent}
                            onChange={(e) => setEntryContent(e.target.value)}
                            placeholder="Start writing..."
                            className="w-full h-[calc(100%-200px)] bg-transparent resize-none outline-none text-white/80 text-lg leading-relaxed font-sans placeholder-white/10"
                        />
                    </div>
                </div>

                {/* Right Context Panel (Collapsible theoretically, but fixed for POC) */}
                <div className="w-80 flex-none border-l border-amber-900/20 bg-[#0f0d0b] p-6 flex flex-col gap-6">
                    <div>
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Layout size={12} /> Templates
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 rounded bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-left transition-all">
                                <div className="text-amber-500 mb-2"><CheckCircle size={16} /></div>
                                <div className="text-xs font-bold text-white">AM Brief</div>
                            </button>
                            <button className="p-3 rounded bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-left transition-all">
                                <div className="text-purple-500 mb-2"><Flag size={16} /></div>
                                <div className="text-xs font-bold text-white">PM Review</div>
                            </button>
                            <button className="p-3 rounded bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-left transition-all">
                                <div className="text-red-500 mb-2"><AlertCircle size={16} /></div>
                                <div className="text-xs font-bold text-white">Decision</div>
                            </button>
                            <button className="p-3 rounded bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-left transition-all">
                                <div className="text-cyan-500 mb-2"><PenTool size={16} /></div>
                                <div className="text-xs font-bold text-white">Idea Log</div>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 bg-black/20 rounded-xl border border-white/5 p-4 relative overflow-hidden">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Context</h4>
                        <p className="text-xs text-white/30 italic">
                            Select text or link entities to see contextual connections here.
                        </p>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <BookOpen size={64} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
