import React, { useState } from 'react';
import Layout from "../../../components/Layout.jsx";
import {
    FileText,
    Download,
    Lock,
    Unlock,
    LayoutDashboard,
    History,
    Library,
    Brain,
    Home,
    School,
    ChevronRight,
    Star
} from "lucide-react";

const BLUEPRINTS = [
    {
        id: "bp-001",
        title: "Cognitive Arbitrage",
        description: "A framework for identifying and exploiting information asymmetries in legacy educational markets. Learn to value your own attention.",
        level: "Foundational",
        type: "PDF Guide",
        pages: 14,
        access: "unlocked",
        rating: 4.8
    },
    {
        id: "bp-002",
        title: "Debt Leverage Matrix",
        description: "Standard operating procedure for distinguishing 'good' debt (investment) from 'bad' debt (consumption). Includes Excel models.",
        level: "Intermediate",
        type: "Spreadsheet",
        pages: 3,
        access: "unlocked",
        rating: 4.9
    },
    {
        id: "bp-003",
        title: "System Thinking Primitives",
        description: "Visual library of core system archetypes: loops, delays, and leverage points. Essential for mapping complex environments.",
        level: "Foundational",
        type: "Presentation",
        pages: 28,
        access: "locked",
        rating: 4.7
    },
    {
        id: "bp-004",
        title: "Network State Constitution",
        description: "Drafting governances for digital-first communities. Based on Balaji Srinivasan's core concepts adapted for local action.",
        level: "Advanced",
        type: "PDF Guide",
        pages: 45,
        access: "locked",
        rating: 5.0
    },
    {
        id: "bp-005",
        title: "0-to-1 Project Planner",
        description: "Actionable template for launching independent ventures with zero initial capital. Focuses on sweat equity and digital leverage.",
        level: "Intermediate",
        type: "Template",
        pages: 8,
        access: "unlocked",
        rating: 4.6
    }
];

export default function Blueprints() {
    const [filter, setFilter] = useState('all');

    const filteredBlueprints = filter === 'all'
        ? BLUEPRINTS
        : BLUEPRINTS.filter(bp => bp.access === filter);

    return (
        <div data-theme="amethyst">
            <Layout
                brand={{
                    title: "More Than Enough",
                    tagline: "Education for abundance.",
                    footerLine: "MTE • Educational Systems",
                    footerNote: "Abundance is a system.",
                }}
                nav={[
                    { label: "Dashboard", to: "/mte", icon: LayoutDashboard },
                    { label: "Student Analyzer", to: "/mte/analyzer", icon: School },
                    { label: "Session Log", to: "/mte/history", icon: History },
                    { type: "divider" },
                    { label: "The Codex", to: "/mte/codex", icon: Library },
                    { label: "Blueprints", to: "/mte/blueprints", icon: FileText, active: true },
                    { type: "divider" },
                    { label: "Cognition Status", to: "/mte/status", icon: Brain },
                    { type: "divider" },
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { label: "Iron Logic", to: "/iron" },
                ]}
            >
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <header className="mb-12 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3 text-[#d8b4fe] mb-2 uppercase tracking-widest text-sm font-mono font-bold">
                            <FileText size={16} />
                            <span>Tactical Resources</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Blueprints</h1>
                        <p className="text-[#d8b4fe]/60 text-lg max-w-2xl">
                            Downloadable models, frameworks, and operating procedures for navigating the MTE ecosystem.
                        </p>
                    </header>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-8">
                        {['all', 'unlocked', 'locked'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${filter === f
                                    ? 'bg-[#c084fc] text-black'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlueprints.map(bp => (
                            <div key={bp.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-[#c084fc]/30 transition-all duration-300 flex flex-col h-full">
                                {/* Top Status Bar */}
                                <div className="p-6 pb-4 flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        {bp.access === 'locked' ? (
                                            <div className="p-2 rounded bg-red-500/10 text-red-400">
                                                <Lock size={16} />
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded bg-green-500/10 text-green-400">
                                                <Unlock size={16} />
                                            </div>
                                        )}
                                        <span className="text-xs font-mono uppercase text-white/40 tracking-wider">
                                            {bp.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500/80 text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        {bp.rating}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-6 flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                                        {bp.title}
                                    </h3>
                                    <p className="text-[#d8b4fe]/60 text-sm leading-relaxed mb-4">
                                        {bp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 uppercase border border-white/5">
                                            {bp.level}
                                        </span>
                                        <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 uppercase border border-white/5">
                                            {bp.pages} Pages
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="p-6 pt-0 mt-auto">
                                    {bp.access === 'locked' ? (
                                        <button disabled className="w-full py-3 rounded-xl bg-white/5 text-white/20 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed">
                                            <Lock size={16} /> Locked
                                        </button>
                                    ) : (
                                        <button className="w-full py-3 rounded-xl bg-[#c084fc] text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#b45309] transition-colors hover:shadow-lg hover:shadow-[#c084fc]/20 transform active:scale-[0.98]">
                                            <Download size={16} /> Download
                                        </button>
                                    )}
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#c084fc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
