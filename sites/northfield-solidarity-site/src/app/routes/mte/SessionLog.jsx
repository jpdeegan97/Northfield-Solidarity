import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../components/Layout.jsx";
import { History, Calendar, Clock, ArrowRight, MessageSquare, X, Brain, School, FileText } from "lucide-react";

// Mock Data for Session Log
const SESSIONS = [
    {
        id: 1,
        tutor: "System Thinking",
        topic: "Cybernetics & Feedback Loops",
        date: "Today, 10:42 AM",
        duration: "45m",
        summary: "Explored the concept of negative feedback loops in managing cash flow volatility. Discussed implementation of an automated alerting system.",
        messages: 24
    },
    {
        id: 2,
        tutor: "Financial Literacy",
        topic: "Debt Leverage Strategies",
        date: "Yesterday, 2:15 PM",
        duration: "30m",
        summary: "Reviewed the difference between good and bad debt. Analyzed a theoretical real estate leverage scenario.",
        messages: 18
    },
    {
        id: 3,
        tutor: "Market Mechanics",
        topic: "Liquidity Pools 101",
        date: "Dec 26, 9:00 AM",
        duration: "1h 10m",
        summary: "Deep dive into AMMs and how liquidity providers earn fees. Explained impermanent loss risks.",
        messages: 42
    },
    {
        id: 4,
        tutor: "Leadership & Vision",
        topic: "The 100-Year Plan",
        date: "Dec 25, 8:30 PM",
        duration: "20m",
        summary: "Drafting the initial mission statement for the family office. Focusing on multi-generational wealth preservation.",
        messages: 12
    }
];

export default function SessionLog() {
    const [selectedSession, setSelectedSession] = useState(null);
    const navigate = useNavigate();

    const handleResume = () => {
        if (selectedSession) {
            navigate('/mte', {
                state: { resumeTutor: selectedSession.tutor }
            });
        }
    };

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
                    { label: "Dashboard", to: "/mte" },
                    { label: "Student Analyzer", to: "/mte/analyzer", icon: School },
                    { label: "Session Log", to: "/mte/history", active: true },
                    { type: "divider" },
                    { label: "The Codex", to: "/mte/codex" },
                    { label: "Blueprints", to: "/mte/blueprints", icon: FileText },
                    { type: "divider" },
                    { label: "Cognition Status", to: "/mte/status" },
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
                            <History size={16} />
                            <span>System Logs</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Session History</h1>
                        <p className="text-[#d8b4fe]/60 text-lg max-w-2xl">
                            A record of your cognitive augmentation sessions. Review past insights and continue the dialogue.
                        </p>
                    </header>

                    <div className="grid gap-4">
                        {SESSIONS.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setSelectedSession(session)}
                                className="group relative bg-white/5 border border-white/10 hover:border-[#c084fc] hover:bg-white/10 rounded-xl p-6 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[#c084fc] font-bold tracking-wide text-sm bg-[#c084fc]/10 px-2 py-1 rounded">
                                                {session.tutor}
                                            </span>
                                            <span className="text-white/40 text-xs flex items-center gap-1">
                                                <Calendar size={12} />
                                                {session.date}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                                            {session.topic}
                                        </h3>
                                        <p className="text-[#d8b4fe]/70 text-sm leading-relaxed mb-4 md:mb-0">
                                            {session.summary}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1 text-xs text-white/40 font-mono border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            {session.duration}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={14} />
                                            {session.messages} msgs
                                        </div>
                                    </div>

                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                        <div className="p-3 bg-[#c084fc] text-black rounded-lg shadow-lg shadow-[#c084fc]/20 transform translate-x-4 group-hover:translate-x-0 transition-transform">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Overlay Modal */}
                    {selectedSession && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSession(null)}>
                            <div
                                className="w-full max-w-2xl bg-[#0a0a0a] border border-[#c084fc]/50 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in duration-200"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-[#c084fc]/20 rounded-lg">
                                            <Brain size={24} className="text-[#c084fc]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{selectedSession.topic}</h3>
                                            <div className="flex items-center gap-2 text-xs text-white/40">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                Archived Session • {selectedSession.tutor}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedSession(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[#050505]">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#c084fc]/20 flex-shrink-0 flex items-center justify-center border border-[#c084fc]/50">
                                            <Brain size={14} className="text-[#c084fc]" />
                                        </div>
                                        <div className="space-y-2 max-w-[80%]">
                                            <div className="text-xs text-white/30 font-mono">SYSTEM RECALL</div>
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-r-xl rounded-bl-xl text-white/80 leading-relaxed text-sm">
                                                Replaying session data from {selectedSession.date}...
                                                <br /><br />
                                                Summary: {selectedSession.summary}
                                                <br /><br />
                                                <span className="text-[#c084fc]">User feedback indicates positive reinforcement of core concepts. No further action required.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                                    <button
                                        onClick={handleResume}
                                        className="w-full py-3 bg-[#c084fc] text-black font-bold rounded-lg hover:bg-[#b45309] transition-colors uppercase tracking-widest text-sm"
                                    >
                                        Resume Session
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
