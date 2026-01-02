import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";
import { Activity, Heart, Dumbbell, Zap, Flame, Shield } from "lucide-react";

export default function IronLogicLanding() {

    return (
        <div data-theme="crimson">
            <Layout
                brand={{
                    title: "Iron Logic",
                    tagline: "Somatic Sovereignty. Biological Engineering.",
                    footerLine: "Iron Logic • Biological Systems",
                    footerNote: "The body is the first engine.",
                }}
                nav={[
                    { label: "Protocols", to: "/iron/protocols", icon: Dumbbell },
                    { label: "Diagnostics", to: "/iron/diagnostics", icon: Activity },
                    { label: "Membership", to: "/iron/join", icon: Shield },
                    { type: "divider" },
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { label: "Iron Logic", to: "/iron" },
                ]}
            >
                <HeroIL />

                <div className="max-w-5xl mx-auto px-6 py-20">
                    <div className="border border-white/10 bg-white/5 p-8 rounded-xl backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <Flame size={24} className="text-red-500" />
                                Biometric Status
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-mono opacity-50 text-white">
                                <span className="w-2 h-2 rounded-full animate-pulse bg-red-500" />
                                LIVE METRICS
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <StatusRow label="Metabolic Rate" value="2400 kcal" themeColor="#ef4444" />
                                <StatusRow label="Stress Load" value="Optimal" themeColor="#ef4444" />
                                <StatusRow label="Recovery" value="98%" themeColor="#ef4444" highlight />
                            </div>
                            <div className="space-y-4">
                                <StatusRow label="VO2 Max" value="54 ml/kg" themeColor="#ef4444" />
                                <StatusRow label="Force Output" value="High" themeColor="#ef4444" />
                                <StatusRow label="System Integrity" value="100%" themeColor="#ef4444" />
                            </div>
                        </div>

                        {/* Health Bars Visualization */}
                        <div className="border-t border-white/5 pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 text-red-500">Output Capacity</h4>
                            <div className="flex items-end gap-1 h-24 bg-black/20 rounded-lg p-4 border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                                {[40, 65, 55, 80, 45, 90, 70, 35, 60, 75, 50, 85, 65, 40, 95, 60, 70, 50, 80, 65, 45, 75, 60, 85].map((h, i) => (
                                    <div key={i}
                                        className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100 bg-red-600"
                                        style={{
                                            height: `${h}%`,
                                            opacity: 0.3 + (h / 200)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Section
                    eyebrow="Philosophy"
                    title="The body is a machine that builds itself."
                    subtitle="Most fitness is noise. Iron Logic is signal. We apply the same systems engineering to biology that Northfield applies to capital."
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-white">Kinetic Intelligence</h3>
                            <ul className="space-y-3 text-white/60">
                                <li>• Progressive Overload Tracking</li>
                                <li>• Bio-Mechanical Alignment</li>
                                <li>• Energy System Optimization</li>
                                <li>• Recovery as a Discipline</li>
                            </ul>
                        </div>
                        <div className="p-8 bg-white/5 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 text-white">Somatic Systems</h3>
                            <p className="text-white/60 leading-relaxed">
                                You cannot govern a complex organization if you cannot govern your own physiology.
                                Iron Logic provides the dashboard for your most critical asset.
                            </p>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Protocols"
                    title="Engineered for durability"
                    subtitle="Choose your operating mode."
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-red-500/50 transition-all group">
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">Hypertrophy</h3>
                            <p className="text-sm text-white/50 mb-4">Structural reinforcement and mass acquisition.</p>
                            <span className="text-xs font-mono text-red-400 uppercase tracking-widest border border-red-500/20 px-2 py-1 rounded">Protocol A-1</span>
                        </div>
                        <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-red-500/50 transition-all group">
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">Endurance</h3>
                            <p className="text-sm text-white/50 mb-4">Metabolic efficiency and mitochondrial density.</p>
                            <span className="text-xs font-mono text-red-400 uppercase tracking-widest border border-red-500/20 px-2 py-1 rounded">Protocol B-2</span>
                        </div>
                        <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-red-500/50 transition-all group">
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">Mobility</h3>
                            <p className="text-sm text-white/50 mb-4">Joint integrity and range of human motion.</p>
                            <span className="text-xs font-mono text-red-400 uppercase tracking-widest border border-red-500/20 px-2 py-1 rounded">Protocol C-3</span>
                        </div>
                    </div>
                </Section>

                <Section
                    eyebrow="Join"
                    title="Initialize your biological engine."
                    subtitle="Access the facility and the framework."
                >
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-3 bg-red-600 text-black font-bold uppercase tracking-wider rounded hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                            Request Access
                        </button>
                    </div>
                </Section>
            </Layout>

            <style>{`
                [data-theme="crimson"] {
                    --c-brand: #dc2626;
                    --c-brand-light: #ef4444;
                    --c-bg: #0f0505;
                }
                [data-theme="crimson"] .hero {
                    background: radial-gradient(circle at top center, rgba(69, 10, 10, 0.8) 0%, rgba(5, 5, 5, 0.4) 60%);
                }
            `}</style>
        </div >
    );
}

function HeroIL() {
    return (
        <section className="hero relative overflow-hidden py-32 text-center">
            <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
                <div className="text-red-500 font-mono font-bold uppercase tracking-widest text-sm mb-2">Iron Logic • Somatic Systems</div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                    FORGED IN <span className="text-red-600">FIRE</span>.
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                    The biological interface for Northfield Solidarity.
                    Optimizing the human engine for maximum leverage.
                </p>

                <div className="flex gap-4 justify-center mt-8">
                    <Link to="/iron/protocols" className="px-8 py-3 border border-red-500/50 text-red-500 font-bold uppercase tracking-wider rounded hover:bg-red-500/10 transition-colors">
                        View Protocols
                    </Link>
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
        </section>
    );
}

function StatusRow({ label, value, themeColor, highlight }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <span className="text-white/40 text-sm font-mono uppercase tracking-wider">{label}</span>
            <span
                className="font-bold font-mono text-lg"
                style={{ color: highlight ? themeColor : 'white' }}
            >
                {value}
            </span>
        </div>
    );
}
