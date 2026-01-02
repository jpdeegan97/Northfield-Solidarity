import React, { useState, useEffect } from 'react';
import Layout from "../../../components/Layout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Activity,
    Zap,
    TrendingUp,
    LayoutDashboard,
    History,
    Library,
    FileText,
    School,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

export default function CognitionStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showInitSequence, setShowInitSequence] = useState(!!location.state?.justRegistered);
    const [initStep, setInitStep] = useState(0);

    // Mock Data for Cognitive Profile
    const STATUS = {
        level: "Level 3 - System Navigator",
        xp: 3450,
        nextLevelXp: 5000,
        streak: 12,
        metrics: {
            focus: 78,
            clarity: 85,
            resilience: 62,
            leverage: 45
        },
        activeEffects: [
            { id: 1, name: "Zero-Sum Detox", type: "buff", desc: "+15% learning efficiency in economic modules.", duration: "3 days" },
            { id: 2, name: "Information Overload", type: "debuff", desc: "-10% operational retention.", duration: "Recovering..." }
        ],
        recentMilestones: [
            { id: 1, title: "Mastered 'Feedback Loops'", date: "2 days ago" },
            { id: 2, title: "10 Day Login Streak", date: "5 days ago" },
            { id: 3, title: "First 1,000 XP", date: "2 weeks ago" }
        ]
    };

    // Auto-advance initialization sequence
    useEffect(() => {
        if (showInitSequence && initStep < 3) {
            const timer = setTimeout(() => {
                setInitStep(prev => prev + 1);
            }, 1500); // 1.5s per step
            return () => clearTimeout(timer);
        }
    }, [showInitSequence, initStep]);

    const handleEnterDashboard = () => {
        // Clear the state so refresh doesn't trigger it again
        navigate('/mte/status', { replace: true, state: {} });
        setShowInitSequence(false);
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
                    { label: "Cognition Status", to: "/mte/status", icon: Brain, active: true },
                    { type: "divider" },
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { label: "Iron Logic", to: "/iron" },
                ]}
            >
                <div className="max-w-6xl mx-auto px-6 py-12 relative">

                    {/* Initialization Overlay */}
                    <AnimatePresence>
                        {showInitSequence && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                                className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-[#c084fc]"
                            >
                                <div className="max-w-md w-full p-8 text-center space-y-8">
                                    <div className="mx-auto w-24 h-24 rounded-full border-2 border-[#c084fc] flex items-center justify-center relative">
                                        <Brain size={48} className={`text-[#c084fc] ${initStep < 3 ? 'animate-pulse' : ''}`} />
                                        {initStep < 3 && (
                                            <div className="absolute inset-0 border-t-2 border-[#c084fc] rounded-full animate-spin"></div>
                                        )}
                                    </div>

                                    <div className="h-16 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            {initStep === 0 && (
                                                <motion.div
                                                    key="step0"
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                    className="text-xl"
                                                >
                                                    ESTABLISHING SECURE UPLINK...
                                                </motion.div>
                                            )}
                                            {initStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                    className="text-xl"
                                                >
                                                    CALIBRATING COGNITIVE BASELINE...
                                                </motion.div>
                                            )}
                                            {initStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                    className="text-xl"
                                                >
                                                    SYNCING DISTRICT PARAMETERS...
                                                </motion.div>
                                            )}
                                            {initStep >= 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                    className="text-2xl font-bold text-white flex flex-col items-center gap-2"
                                                >
                                                    <span>PROTOCOL INITIALIZED.</span>
                                                    <span className="text-sm font-normal text-white/50 text-center max-w-xs mt-2">
                                                        Your educational profile has been generated. Ready for cognitive enhancement.
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {initStep >= 3 && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ scale: 1.05, backgroundColor: "#c084fc", color: "#000" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleEnterDashboard}
                                            className="px-8 py-3 bg-transparent border border-[#c084fc] text-[#c084fc] rounded font-bold uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(192,132,252,0.2)]"
                                        >
                                            Enter Dashboard
                                        </motion.button>
                                    )}

                                    {/* Terminal Feed (Decorative) */}
                                    <div className="absolute bottom-8 left-0 w-full px-4 text-center">
                                        <div className="text-[10px] text-white/20 font-mono space-y-1">
                                            <div>{`> [SYSTEM] Node.Verify(user_id)`} ... OK</div>
                                            {initStep > 0 && <div>{`> [SYSTEM] Ledger.Alloc(genesis_block)`} ... OK</div>}
                                            {initStep > 1 && <div>{`> [SYSTEM] Graph.Connect(peers)`} ... OK</div>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <header className="mb-12 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3 text-[#d8b4fe] mb-2 uppercase tracking-widest text-sm font-mono font-bold">
                            <Activity size={16} />
                            <span>Biometrics & Progress</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Cognition Status</h1>
                        <p className="text-[#d8b4fe]/60 text-lg max-w-2xl">
                            Real-time tracking of your educational velocity and mental state within the MTE protocol.
                        </p>
                    </header>

                    {/* Main HUD */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Avatar & Level */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#c084fc]"></div>
                            <div className="w-32 h-32 rounded-full border-4 border-[#c084fc] bg-black/50 flex items-center justify-center mb-6 relative">
                                <Brain size={64} className="text-[#c084fc]" />
                                <div className="absolute bottom-0 right-0 bg-[#c084fc] text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-[#1e1b4b]">
                                    Lvl 3
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{STATUS.level}</h2>
                            <p className="text-white/40 text-sm mb-6">Alex Sterling</p>

                            <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                                <div className="bg-[#c084fc] h-full" style={{ width: `${(STATUS.xp / STATUS.nextLevelXp) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between w-full text-xs text-white/40 font-mono">
                                <span>{STATUS.xp} XP</span>
                                <span>{STATUS.nextLevelXp} XP</span>
                            </div>
                        </div>

                        {/* Core Metrics */}
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Activity size={18} className="text-[#c084fc]" /> Core Attributes
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {Object.entries(STATUS.metrics).map(([key, val]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="capitalize text-white/70">{key}</span>
                                            <span className="font-mono font-bold text-white">{val}%</span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${val > 75 ? 'bg-green-500' :
                                                    val > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${val}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#c084fc]/10 flex items-center justify-center text-[#c084fc]">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">{STATUS.streak} Days</div>
                                        <div className="text-xs text-white/40 uppercase tracking-widest">Current Streak</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#c084fc]/10 flex items-center justify-center text-[#c084fc]">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">+12%</div>
                                        <div className="text-xs text-white/40 uppercase tracking-widest">WoW Growth</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Active Effects */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Active Status Effects</h3>
                            <div className="space-y-4">
                                {STATUS.activeEffects.map(effect => (
                                    <div key={effect.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-start gap-4">
                                        <div className={`mt-1 shrink-0 ${effect.type === 'buff' ? 'text-green-400' : 'text-red-400'}`}>
                                            {effect.type === 'buff' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm mb-1 ${effect.type === 'buff' ? 'text-green-400' : 'text-red-400'}`}>
                                                {effect.name}
                                            </h4>
                                            <p className="text-white/60 text-xs mb-2">{effect.desc}</p>
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 inline-block px-2 py-1 rounded">
                                                Duration: {effect.duration}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Milestones */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Recent Milestones</h3>
                            <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/5">
                                {STATUS.recentMilestones.map(milestone => (
                                    <div key={milestone.id} className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#c084fc]"></div>
                                            <span className="text-white/80 font-medium text-sm">{milestone.title}</span>
                                        </div>
                                        <span className="text-xs text-white/40 font-mono">{milestone.date}</span>
                                    </div>
                                ))}
                                <div className="p-4 text-center">
                                    <button className="text-[#c084fc] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
                                        View Full History
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
