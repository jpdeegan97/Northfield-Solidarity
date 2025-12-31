import React, { useState } from 'react';
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Brain, Clock, Users, GraduationCap, X, ArrowRight, LayoutDashboard, History, FileText, Library, Home, School } from "lucide-react";

const TUTORS = [
    {
        id: 'fin-101',
        name: 'Financial Literacy',
        role: 'Core Concepts',
        level: 'Beginner',
        desc: 'Master the basics of compounding, debt management, and cash flow analysis.',
        icon: BookOpen
    },
    {
        id: 'mkt-202',
        name: 'Market Mechanics',
        role: 'Trading Logic',
        level: 'Intermediate',
        desc: 'Understand order books, liquidity provision, and market structure dynamics.',
        icon: Brain
    },
    {
        id: 'sys-303',
        name: 'System Thinking',
        role: 'Operations',
        level: 'Advanced',
        desc: 'Learn to see organizations as cybernetic loops. Optimize for feedback.',
        icon: Clock
    },
    {
        id: 'lea-404',
        name: 'Leadership & Vision',
        role: 'Executive',
        level: 'Expert',
        desc: 'Develop the capacity to hold complexity and direct long-term strategy.',
        icon: Users
    }
];

export default function MTELanding() {
    const [activeTutor, setActiveTutor] = useState(null);
    const curriculumRef = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        if (location.state?.resumeTutor) {
            // Find tutor by name match from session log
            const tutorToResume = TUTORS.find(t => t.name === location.state.resumeTutor);
            if (tutorToResume) {
                setActiveTutor(tutorToResume);
                // Optional: scroll to curriculum if we want context
                setTimeout(() => {
                    curriculumRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.state]);

    const scrollToCurriculum = () => {
        curriculumRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                <HeroMTE onBegin={scrollToCurriculum} />

                <div ref={curriculumRef}>
                    <Section
                        eyebrow="Curriculum"
                        title="Intelligence on Demand"
                        subtitle="Access specialized AI tutors designed to elevate your financial and operational cognition."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {TUTORS.map(tutor => (
                                <div
                                    key={tutor.id}
                                    onClick={() => setActiveTutor(tutor)}
                                    className="group p-6 border border-white/10 rounded-lg bg-white/5 hover:border-[#c084fc] hover:bg-white/10 cursor-pointer transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-4 right-4 text-xs font-mono opacity-50 px-2 py-1 border border-white/20 rounded">
                                        {tutor.level}
                                    </div>
                                    <div className="mb-6 p-3 bg-black/20 rounded-full w-fit group-hover:bg-[#c084fc]/20 transition-colors">
                                        <tutor.icon size={24} className="text-[#c084fc]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#c084fc] transition-colors">{tutor.name}</h3>
                                    <p className="text-sm text-white/40 mb-4">{tutor.role}</p>
                                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                                        {tutor.desc}
                                    </p>
                                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#c084fc]/80 group-hover:text-[#c084fc]">
                                        Engage Tutor <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

                <Section
                    eyebrow="Methodology"
                    title="The MTE Framework"
                    subtitle="Abundance is not an accident. It is a system."
                >
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 border-l-2 border-[#c084fc] bg-gradient-to-r from-[#c084fc]/10 to-transparent">
                            <h4 className="text-lg font-bold text-white mb-2">Cognitive surplus</h4>
                            <p className="text-white/60 text-sm">We remove lower-order noise to allow focus on high-value synthesis.</p>
                        </div>
                        <div className="p-6 border-l-2 border-[#c084fc] bg-gradient-to-r from-[#c084fc]/10 to-transparent">
                            <h4 className="text-lg font-bold text-white mb-2">Pattern recognition</h4>
                            <p className="text-white/60 text-sm">Training the mind to see market fractals and cyclical opportunities.</p>
                        </div>
                        <div className="p-6 border-l-2 border-[#c084fc] bg-gradient-to-r from-[#c084fc]/10 to-transparent">
                            <h4 className="text-lg font-bold text-white mb-2">Automated execution</h4>
                            <p className="text-white/60 text-sm">Bridging the gap between knowing what to do and having it done.</p>
                        </div>
                    </div>
                </Section>

                {/* Tutor Interaction Modal */}
                {activeTutor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#c084fc]/50 rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-[#c084fc]/20 rounded-lg">
                                        <activeTutor.icon size={24} className="text-[#c084fc]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{activeTutor.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-white/40">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Online • {activeTutor.role}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setActiveTutor(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[#050505]">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#c084fc]/20 flex-shrink-0 flex items-center justify-center border border-[#c084fc]/50">
                                        <Brain size={14} className="text-[#c084fc]" />
                                    </div>
                                    <div className="space-y-2 max-w-[80%]">
                                        <div className="text-xs text-white/30 font-mono">MTE SYSTEM</div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-r-xl rounded-bl-xl text-white/80 leading-relaxed text-sm">
                                            Hello. I am the {activeTutor.name} interface for the More Than Enough protocol.
                                            <br /><br />
                                            {activeTutor.desc}
                                            <br /><br />
                                            How can I assist your learning today?
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type your query..."
                                        className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#c084fc] transition-colors font-mono text-sm"
                                        autoFocus
                                    />
                                    <button className="px-6 py-2 bg-[#c084fc] text-black font-bold rounded-lg hover:bg-[#b45309] transition-colors">
                                        SEND
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </Layout>
        </div>
    );
}

function HeroMTE({ onBegin }) {
    return (
        <section className="hero relative overflow-hidden flex flex-col justify-center items-center text-center py-32">
            <div className="heroInner relative z-10 max-w-4xl px-6">
                <div className="kicker text-[#c084fc] font-mono uppercase tracking-widest text-sm mb-4">MTE • Education Protocol</div>
                <h1 className="h1 text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    More Than <span className="text-[#c084fc]">Enough</span>.
                </h1>
                <p className="lead text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A suite of specialized tutors designed to close the gap between ambition and capability.
                    Learn the systems of abundance.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/mte/register" className="px-8 py-3 bg-[#c084fc] text-black font-bold uppercase tracking-wider rounded hover:bg-[#b45309] transition-colors hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                        Join Protocol
                    </Link>
                    <button onClick={onBegin} className="px-8 py-3 border border-[#c084fc]/50 text-[#c084fc] font-bold uppercase tracking-wider rounded hover:bg-[#c084fc]/10 transition-colors">
                        Explore Modules
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, rgba(192,132,252,0.15) 0%, transparent 70%)'
            }} />

            <style>{`
                [data-theme="amethyst"] .hero {
                    background: radial-gradient(circle at top, rgba(30, 27, 75, 1) 0%, rgba(5, 5, 5, 1) 100%);
                }
            `}</style>
        </section>
    );
}
