import React, { useState } from 'react';
import Layout from "../../../components/Layout.jsx";
import { Link } from "react-router-dom";
import {
    Library,
    Search,
    Book,
    Hash,
    CornerDownRight,
    LayoutDashboard,
    History,
    FileText,
    Home,
    Brain,
    School
} from "lucide-react";

// Mock Data for Codex Entries
const CODEX_ENTRIES = [
    {
        id: 'c-001',
        term: 'Amethyst Protocol',
        category: 'System Architecture',
        definition: 'The governing set of rules that aligns incentives for abundance. It prioritizes positive-sum interactions over zero-sum competition.',
        related: ['Zero-Sum Bias', 'Feedback Loop']
    },
    {
        id: 'c-002',
        term: 'Cognitive Surplus',
        category: 'Human Capital',
        definition: 'The aggregate free time and mental energy of a population that can be directed towards creative or collaborative acts rather than consumption.',
        related: ['Leverage']
    },
    {
        id: 'c-003',
        term: 'Feedback Loop',
        category: 'Cybernetics',
        definition: 'A system structure where outputs are routed back as inputs. Negative feedback stabilizes; positive feedback amplifies.',
        related: ['System Thinking', 'Amethyst Protocol']
    },
    {
        id: 'c-004',
        term: 'Leverage',
        category: 'Financial Mechanics',
        definition: 'The use of borrowed capital or tools to increase the potential return of an investment. In MTE, this extends to technological and labor leverage.',
        related: ['Cognitive Surplus', 'Compound Interest']
    },
    {
        id: 'c-005',
        term: 'Zero-Sum Bias',
        category: 'Psychology',
        definition: 'The cognitive bias where one assumes that for one person to gain, another must lose. MTE education explicitly deprograms this bias.',
        related: ['Amethyst Protocol']
    },
    {
        id: 'c-006',
        term: 'Systems Thinking',
        category: 'Methodology',
        definition: 'A holistic approach to analysis that focuses on the way that a system\'s constituent parts interrelate and how systems work over time and within the context of larger systems.',
        related: ['Feedback Loop']
    }
];

export default function Codex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(CODEX_ENTRIES.map(e => e.category))];

    const filteredEntries = CODEX_ENTRIES.filter(entry => {
        const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || entry.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

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
                    { label: "Blueprints", to: "/mte/blueprints", icon: FileText },
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
                <div className="max-w-5xl mx-auto px-6 py-12">
                    <header className="mb-12 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3 text-[#d8b4fe] mb-2 uppercase tracking-widest text-sm font-mono font-bold">
                            <Library size={16} />
                            <span>Knowledge Base</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">The Codex</h1>
                        <p className="text-[#d8b4fe]/60 text-lg max-w-2xl">
                            The central lexicon of the MTE protocol. precise definitions for precise thinking.
                        </p>
                    </header>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search definitions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c084fc] transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={20} />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                        ? 'bg-[#c084fc] text-black'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Entries Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredEntries.map(entry => (
                            <div key={entry.id} className="group p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] hover:border-[#c084fc]/50 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[#c084fc] transition-colors">
                                        {entry.term}
                                    </h3>
                                    <span className="text-xs font-mono text-[#d8b4fe]/60 border border-[#d8b4fe]/20 rounded px-2 py-1">
                                        {entry.category}
                                    </span>
                                </div>
                                <p className="text-[#d8b4fe]/80 leading-relaxed mb-6">
                                    {entry.definition}
                                </p>

                                {entry.related && entry.related.length > 0 && (
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-xs text-white/40 mb-3 uppercase tracking-wider font-bold">
                                            <Hash size={12} /> Related Concepts
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {entry.related.map((rel, idx) => (
                                                <span key={idx} className="flex items-center gap-1 text-xs text-[#c084fc] bg-[#c084fc]/10 px-2 py-1 rounded hover:bg-[#c084fc]/20 cursor-pointer transition-colors">
                                                    <CornerDownRight size={10} />
                                                    {rel}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredEntries.length === 0 && (
                        <div className="text-center py-20 text-white/40">
                            <Book size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No entries found matching your query.</p>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
