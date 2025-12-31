
import React, { useState } from 'react';
import { Zap, Clock, TrendingUp, Layers, MousePointer2, ArrowRight, CheckCircle, Smartphone, Globe, PenTool, Crown, Trophy, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "../../components/Layout.jsx";

export default function SmallBusinessConsulting() {

    // Demo State for "Real-Time Alteration"
    const [demoFeatures, setDemoFeatures] = useState([
        { id: 1, text: "Customer Dashboard", color: "bg-blue-500" },
        { id: 2, text: "Inventory Tracker", color: "bg-purple-500" }
    ]);
    const [inputText, setInputText] = useState("");

    const addFeature = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const colors = ["bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-indigo-500"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setDemoFeatures([...demoFeatures, {
            id: Date.now(),
            text: inputText,
            color: randomColor
        }]);
        setInputText("");
    };

    return (
        <Layout>
            <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_70%)]"></div>

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap size={12} /> The New Standard
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                            Your Vision. <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                                Evolved In Real-Time.
                            </span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Stop adapting your business to rigid software. We build a platform that adapts to you—instantly, as your ideas happen.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center gap-2 group">
                                Start Your Evolution
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all">
                                See The Process
                            </button>
                        </div>
                    </div>
                </section>

                {/* THE KICKER: Real-Time Alteration Demo */}
                <section className="py-20 px-6 bg-white/5 border-y border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">The "Kicker": Instant Reality</h2>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    Most consultants take your requirements and disappear for 6 months.
                                    We don't. We sit with you, and as you describe your idea,
                                    <span className="text-orange-400 font-bold"> we build it right in front of your eyes.</span>
                                    <br /><br />
                                    Try it right now. Type a feature you want below.
                                </p>

                                <form onSubmit={addFeature} className="relative max-w-md">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="e.g. 'Add a booking calendar'..."
                                        className="w-full bg-black border border-white/20 rounded-lg py-3 pl-4 pr-12 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500 rounded text-white hover:bg-orange-600 transition-colors"
                                    >
                                        <Zap size={16} />
                                    </button>
                                </form>
                                <div className="mt-2 text-xs text-white/30 italic">
                                    * This is a simulation. In our sessions, we code the real logic instantly.
                                </div>
                            </div>

                            {/* Visual Output */}
                            <div className="bg-black border border-white/10 rounded-xl p-6 min-h-[400px] relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-[10px] text-white/30 font-mono">my-business-platform.app</div>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <AnimatePresence>
                                        {demoFeatures.map((feature) => (
                                            <motion.div
                                                key={feature.id}
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className={`${feature.color} bg-opacity-20 border border-white/10 p-4 rounded-lg flex flex-col gap-2`}
                                            >
                                                <div className={`w-8 h-8 rounded ${feature.color} bg-opacity-50 flex items-center justify-center`}>
                                                    <Layers size={16} className="text-white" />
                                                </div>
                                                <span className="font-bold text-sm">{feature.text}</span>
                                                <div className="h-2 w-full bg-white/10 rounded-full mt-2"></div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Cursor Overlay */}
                                <motion.div
                                    className="absolute pointer-events-none"
                                    animate={{
                                        x: [50, 200, 100, 300],
                                        y: [100, 300, 200, 150]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                                >
                                    <MousePointer2 className="text-orange-500 fill-orange-500/20" />
                                    <div className="bg-orange-500 text-black text-[10px] font-bold px-1 rounded ml-3">Consultant</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE ETHOS: The "QuickBooks Moment" */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-black mb-8">The "Oh My God" Moment</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <div className="bg-white/5 p-8 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 mb-4 text-white/40">
                                    <Clock size={20} />
                                    <h3 className="font-bold uppercase tracking-widest text-sm">Before Us</h3>
                                </div>
                                <p className="text-lg leading-relaxed text-white/70">
                                    "I spent $20k. I waited 4 months. When I finally saw the app, it wasn't what I pictured.
                                    Now I have to pay more to 'fix' it. I feel stuck."
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 p-8 rounded-xl border border-orange-500/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Zap size={100} />
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-orange-400">
                                    <CheckCircle size={20} />
                                    <h3 className="font-bold uppercase tracking-widest text-sm">With Northfield</h3>
                                </div>
                                <p className="text-lg leading-relaxed font-bold">
                                    "I had an idea during our call. He didn't write it down—he built it.
                                    By the time I finished my sentence, the button was on the screen.
                                    <span className="text-orange-400"> My business changed in 30 seconds.</span>"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICE MODEL */}
                <section className="py-20 px-6 bg-[#0a0a0a]">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Pay For Evolution, Not Specs</h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                We don't do fixed-bid contracts that lock you into bad ideas.
                                We do <strong>Development Sessions</strong>. You pay for the time, we build anything you want, instantly.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-black p-6 rounded-xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <PenTool size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">1. The Foundation</h3>
                                <p className="text-white/50 text-sm">
                                    We setup your core platform. Secure, hosted, and ready for traffic.
                                    You get a functional base to start dreaming on.
                                </p>
                            </div>
                            <div className="bg-black p-6 rounded-xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <Smartphone size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">2. The Session</h3>
                                <p className="text-white/50 text-sm">
                                    Book a Zoom call. We share screens. You talk strategy, we write code.
                                    <span className="text-orange-400"> Live deployment.</span> No waiting.
                                </p>
                            </div>
                            <div className="bg-black p-6 rounded-xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">3. The Growth</h3>
                                <p className="text-white/50 text-sm">
                                    As you scale, your software scales. Need a new dashboard? Book a session.
                                    Need AI integration? Done in an hour.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to move fast?</h2>
                    <button className="px-10 py-5 bg-white text-black text-lg font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        Book Your First Session
                    </button>
                    <p className="mt-4 text-white/40 text-sm">Limited availability for new clients.</p>
                </section>
                {/* ASCENTION PORTAL INTEGRATION */}
                <section className="py-24 px-6 bg-gradient-to-br from-black to-[#050505] border-t border-white/5">
                    <div className="max-w-6xl mx-auto flex flex-col items-center">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                                <Crown size={12} /> Elite Talent Network
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-4">Powered By Competition.</h2>
                            <p className="text-xl text-white/50 max-w-2xl mx-auto">
                                Our consultants aren't just salaried employees. They are <span className="text-white font-bold">Agents</span> who compete on a global leaderboard for equity and royalties.
                                <br />High stakes mean higher quality for you.
                            </p>
                        </div>

                        {/* Leaderboard Preview Card */}
                        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-10 relative group hover:border-amber-500/30 transition-all">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>

                            {/* Header */}
                            <div className="bg-black/40 px-6 py-4 flex justify-between items-center border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/20 rounded text-amber-400"><Trophy size={16} /></div>
                                    <span className="font-bold font-mono tracking-wider text-sm uppercase">Live Agent Leaderboard</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-white/40">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    Real-time Ranking
                                </div>
                            </div>

                            {/* Rows */}
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-4 gap-4">
                                {/* Top Agent */}
                                <div className="p-4 flex items-center gap-4">
                                    <div className="text-4xl font-black text-amber-500">#1</div>
                                    <div>
                                        <div className="font-bold text-lg">Agent Smith</div>
                                        <div className="text-xs text-white/40 uppercase">Top Closer • $2.4M Volume</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">Legendary</div>
                                    </div>
                                </div>
                                {/* Runner Up */}
                                <div className="p-4 flex items-center gap-4 opacity-70">
                                    <div className="text-4xl font-black text-white/20">#2</div>
                                    <div>
                                        <div className="font-bold text-lg">Sarah Connor</div>
                                        <div className="text-xs text-white/40 uppercase">Strategist • 8 Deals</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold border border-white/5">Elite</div>
                                    </div>
                                </div>
                            </div>

                            {/* Blur Overlay (Teaser) */}
                            <div className="bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 w-full h-24 flex items-end justify-center pb-6">
                                <span className="text-xs text-white/40 font-mono flex items-center gap-2">
                                    <Globe size={12} /> Viewing Public Snapshot
                                </span>
                            </div>
                        </div>

                        {/* CTA / Portal Link */}
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-sm text-white/40 italic">Are you an NS Agent?</p>
                            <a
                                href="/engine/ASC"
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-lg text-sm font-bold transition-all flex items-center gap-2 group"
                            >
                                <Lock size={14} className="text-amber-500" />
                                Access Ascention Portal
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform opacity-50" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
