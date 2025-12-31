import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from "../../components/Layout.jsx";
import { BookOpen, Shield, ChevronRight, Star, Hexagon, Cpu, Hash, Activity } from 'lucide-react';
import {
    NS_OS_000_CHARTER,
    NS_OS_001_NON_GOALS,
    NS_OS_002_PRIMITIVES,
    NS_OS_003_WORLDVIEW,
    PROSPECTUS_000_README,
    PROSPECTUS_001_VISION,
    PROSPECTUS_002_PRIMITIVES,
    PROSPECTUS_003_HCG,
    PROSPECTUS_004_SCHEDULER,
    PROSPECTUS_005_BACKENDS,
    PROSPECTUS_006_PRS_API,
    PROSPECTUS_007_INTEGRATION,
    PROSPECTUS_008_AUDIT,
    PROSPECTUS_009_SECURITY,
    PROSPECTUS_010_ROADMAP,
    PROSPECTUS_011_GLOSSARY,
    PROSPECTUS_012_REFERENCES
} from "../../data/docs/OS_content.js";

const PROSPECTUS_CONTENT = [
    // Philosophy Series
    { id: 'phi_charter', title: 'PHIL - 000 Charter', content: NS_OS_000_CHARTER, icon: Star },
    { id: 'phi_nongoals', title: 'PHIL - 001 Non-Goals', content: NS_OS_001_NON_GOALS, icon: Shield },
    { id: 'phi_primitives', title: 'PHIL - 002 Primitives', content: NS_OS_002_PRIMITIVES, icon: Hexagon },
    { id: 'phi_worldview', title: 'PHIL - 003 Worldview', content: NS_OS_003_WORLDVIEW, icon: Activity },

    // Technical Prospectus Series
    { id: 'tech_000', title: 'TECH - 000 Readme', content: PROSPECTUS_000_README },
    { id: 'tech_001', title: 'TECH - 001 Vision', content: PROSPECTUS_001_VISION },
    { id: 'tech_002', title: 'TECH - 002 ABI & Primitives', content: PROSPECTUS_002_PRIMITIVES },
    { id: 'tech_003', title: 'TECH - 003 Compute Graph', content: PROSPECTUS_003_HCG },
    { id: 'tech_004', title: 'TECH - 004 Scheduler', content: PROSPECTUS_004_SCHEDULER },
    { id: 'tech_005', title: 'TECH - 005 Backends', content: PROSPECTUS_005_BACKENDS },
    { id: 'tech_006', title: 'TECH - 006 PRS API', content: PROSPECTUS_006_PRS_API },
    { id: 'tech_007', title: 'TECH - 007 Integration', content: PROSPECTUS_007_INTEGRATION },
    { id: 'tech_008', title: 'TECH - 008 Audit', content: PROSPECTUS_008_AUDIT },
    { id: 'tech_009', title: 'TECH - 009 Security', content: PROSPECTUS_009_SECURITY },
    { id: 'tech_010', title: 'TECH - 010 Roadmap', content: PROSPECTUS_010_ROADMAP },
    { id: 'tech_011', title: 'TECH - 011 Glossary', content: PROSPECTUS_011_GLOSSARY },
    { id: 'tech_012', title: 'TECH - 012 References', content: PROSPECTUS_012_REFERENCES },
];

export default function OSIdeation() {
    const [activeDoc, setActiveDoc] = useState(PROSPECTUS_CONTENT[0]);

    return (
        <Layout>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#F0F2F5] text-neutral-800 font-sans selection:bg-[#D4AF37]/20">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Sidebar */}
                <aside className="w-80 flex-shrink-0 bg-white/80 backdrop-blur-md border-r border-[#D4AF37]/20 flex flex-col z-20 relative">
                    {/* Decorative Tech Line */}
                    <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

                    {/* Brand Header */}
                    <div className="p-8 border-b border-[#D4AF37]/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Hexagon className="text-[#D4AF37]" size={20} strokeWidth={2} />
                                <h1 className="text-lg font-bold tracking-widest text-[#1a1a1a]">HALO_OS</h1>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] opacity-80">
                                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                                <span>SYSTEM_ONLINE</span>
                                <span className="opacity-50">|</span>
                                <span>V.0.9.2</span>
                            </div>
                        </div>
                        {/* Bg Decoration */}
                        <div className="absolute -right-6 -top-6 text-[#D4AF37]/5 opacity-60">
                            <Cpu size={100} strokeWidth={1} />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar-light">
                        {PROSPECTUS_CONTENT.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => setActiveDoc(doc)}
                                className={`group w-full flex items-center justify-between px-4 py-3 text-xs font-mono transition-all border border-transparent ${activeDoc.id === doc.id
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#1a1a1a]'
                                    : 'hover:bg-black/5 text-neutral-500'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold ${activeDoc.id === doc.id ? 'text-[#D4AF37]' : 'text-neutral-300 group-hover:text-black/20'}`}>
                                        {doc.id.split('_')[1]?.toUpperCase().slice(0, 3) || 'DOC'}
                                    </span>
                                    <span className={activeDoc.id === doc.id ? 'font-bold tracking-tight' : 'font-medium'}>
                                        {doc.title.split(' - ')[1]}
                                    </span>
                                </span>
                                {activeDoc.id === doc.id && <ChevronRight size={12} className="text-[#D4AF37]" />}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-[#D4AF37]/10 bg-white/50 backdrop-blur-sm">
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400">
                            <span>ENCRYPTED_LINK::SECURE</span>
                            <Hash size={10} />
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-hidden relative flex flex-col">
                    {/* Top Bar */}
                    <div className="h-16 flex items-center justify-between px-12 border-b border-[#D4AF37]/10 bg-white/50 backdrop-blur-sm z-10">
                        <div className="flex items-center gap-4 text-xs font-mono text-[#D4AF37]">
                            <span>DOC_ID: {activeDoc.id.toUpperCase()}</span>
                            <span className="opacity-30">/</span>
                            <span>ACCESS_LEVEL: 5</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-2 py-1 border border-[#D4AF37]/30 rounded text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/5">
                                Confidential
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-light">
                        <div className="max-w-4xl mx-auto">
                            {/* Card Wrapper with Tech Borders */}
                            <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-12 relative">
                                {/* Tech Corners */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#D4AF37]" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#D4AF37]" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#D4AF37]" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#D4AF37]" />

                                <div className="mb-8 pb-4 border-b border-black/5 flex items-end justify-between">
                                    <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                                        {activeDoc.title.split(' - ')[1]}
                                    </h2>
                                    <div className="text-4xl font-bold text-black/5 font-mono select-none">
                                        {activeDoc.title.split(' - ')[0].split(' ')[1]}
                                    </div>
                                </div>

                                <article className="prose prose-neutral prose-sm md:prose-base max-w-none 
                                    prose-headings:font-bold prose-headings:text-neutral-900 prose-headings:tracking-tight
                                    prose-p:leading-relaxed prose-p:text-neutral-600 
                                    prose-strong:text-[#D4AF37] prose-strong:font-bold
                                    prose-li:text-neutral-600 prose-li:marker:text-[#D4AF37]
                                    prose-blockquote:border-l-[#D4AF37] prose-blockquote:bg-[#D4AF37]/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-neutral-600
                                    prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
                                    prose-code:bg-black/5 prose-code:text-[#D4AF37] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:font-medium prose-code:text-xs">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {activeDoc.content}
                                    </ReactMarkdown>
                                </article>
                            </div>

                            <div className="mt-8 flex justify-center opacity-30">
                                <div className="h-px w-24 bg-gradient-to-r from-transparent via-black to-transparent" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
