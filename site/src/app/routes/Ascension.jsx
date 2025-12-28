import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/Layout.jsx";
import { ArrowRight, Lock, Unlock, Eye, Send, PlayCircle, Users, DoorClosed, MapPin } from "lucide-react";

const GATES = [
    {
        id: 0,
        title: "THE SIGNAL",
        subtitle: "Application from the Outside",
        icon: Send,
        desc: "A ping from outside the Firmament. We filter for baseline fit and genuine interest.",
        input: "Resume / LinkedIn / Portfolio",
        time: "Gate response: 72 hours"
    },
    {
        id: 1,
        title: "THE ECHO",
        subtitle: "Async Proof of Craft",
        icon: PlayCircle,
        desc: "Confirming thinking style and clarity. A structured response to a specific prompt.",
        input: "Written Answers or Short Loom",
        time: "Timebox: 30-45 mins"
    },
    {
        id: 2,
        title: "THE TRIAL",
        subtitle: "Paid Work Simulation",
        icon: Unlock,
        desc: "A scoped, paid project aligned to the role. We observe real execution under constraints.",
        input: "Artifact + README",
        time: "Timebox: 2-6 hours (Paid)"
    },
    {
        id: 3,
        title: "THE ALIGNMENT",
        subtitle: "Operating Style Calibration",
        icon: Users,
        desc: "Verifying how we move together. Autonomy, feedback loops, and disagreement style.",
        input: "30-45 min Conversation",
        time: "Live Session"
    },
    {
        id: 4,
        title: "THE DOOR",
        subtitle: "Deep Dive Execution",
        icon: DoorClosed,
        desc: "Stress-testing judgment. A deep dive into the trial or a prior complex project.",
        input: "Final Scorecard",
        time: "60-90 min Deep Dive"
    },
    {
        id: 5,
        title: "THE CENTER",
        subtitle: "Final Landing Place",
        icon: MapPin,
        desc: "The final destination. Intentional conversation and decision at the core.",
        input: "Offer / Close",
        time: "The Beginning"
    }
];

const ROLES = [
    { id: "fe-artisan", title: "Interface Artisan", type: "Frontend / Design", desc: "Crafting the visual language of the Firmament." },
    { id: "sys-arch", title: "Systems Architect", type: "Backend / Infra", desc: "Building the engines that power the core." },
    { id: "protocol", title: "Protocol Operator", type: "Operations", desc: "Maintaining the cadence and flow of the system." },
    { id: "general", title: "Generalist / Founder", type: "Leadership", desc: "Shaping the mythos and strategy." }
];

export default function Ascension() {
    const [view, setView] = useState("map"); // map, apply
    const [activeGate, setActiveGate] = useState(0);
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <Layout>
            <div className="bg-[#050505] min-h-screen text-white font-mono flex flex-col items-center justify-center p-8 relative overflow-hidden">

                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                </div>

                <div className="max-w-6xl w-full z-10 grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">

                    {/* LEFT SIDE: VISUALS */}
                    <div className="relative aspect-square flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {view === "map" ? (
                                <GateMap key="map" activeGate={activeGate} setActiveGate={setActiveGate} />
                            ) : (
                                <ApplicationVisual key="form-visual" selectedRole={selectedRole} />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT SIDE: CONTENT / FORM */}
                    <div className="space-y-8 relative">
                        <AnimatePresence mode="wait">
                            {view === "map" ? (
                                <motion.div
                                    key="map-content"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div>
                                        <div className="inline-block px-3 py-1 border border-white/20 rounded text-xs font-bold tracking-widest mb-6 text-white/50">
                                            NS // ASCENSION PROTOCOL
                                        </div>
                                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                                            ENTER THE <br />
                                            <span className="text-white">FIRMAMENT</span>
                                        </h1>
                                        <p className="text-xl text-white/50 leading-relaxed max-w-md mb-8">
                                            A mythic, gate-based hiring journey. Passing from the edge to the center through a series of closed doors.
                                        </p>
                                    </div>

                                    {/* Active Gate Detail */}
                                    <div className="relative">
                                        <div className="border-l-2 border-white/20 pl-8 py-2">
                                            <div className="flex items-center gap-4 mb-4 text-white/40">
                                                <div className="p-2 border border-white/10 rounded bg-white/5">
                                                    {React.createElement(GATES[activeGate].icon, { size: 20 })}
                                                </div>
                                                <span className="text-sm tracking-widest font-bold">GATE {activeGate} // {GATES[activeGate].title}</span>
                                            </div>

                                            <h2 className="text-3xl font-bold mb-4">{GATES[activeGate].subtitle}</h2>
                                            <p className="text-lg text-white/70 mb-8 leading-relaxed">
                                                {GATES[activeGate].desc}
                                            </p>

                                            <div className="grid grid-cols-2 gap-8 mb-8">
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Required Input</div>
                                                    <div className="text-sm font-bold border-b border-white/10 pb-2 inline-block">{GATES[activeGate].input}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Expectation</div>
                                                    <div className="text-sm font-bold border-b border-white/10 pb-2 inline-block">{GATES[activeGate].time}</div>
                                                </div>
                                            </div>

                                            {activeGate === 0 && (
                                                <button
                                                    onClick={() => setView("apply")}
                                                    className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-white/90 transition-colors flex items-center gap-2 group"
                                                >
                                                    Start The Ascent <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            )}

                                            <div className="flex gap-2 mt-8">
                                                <button
                                                    onClick={() => setActiveGate(Math.max(0, activeGate - 1))}
                                                    disabled={activeGate === 0}
                                                    className="p-2 border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 transition-colors"
                                                >
                                                    Prev
                                                </button>
                                                <button
                                                    onClick={() => setActiveGate(Math.min(GATES.length - 1, activeGate + 1))}
                                                    disabled={activeGate === GATES.length - 1}
                                                    className="p-2 border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 transition-colors"
                                                >
                                                    Next
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <ApplicationForm
                                    key="apply-form"
                                    onBack={() => setView("map")}
                                    selectedRole={selectedRole}
                                    setSelectedRole={setSelectedRole}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

function GateMap({ activeGate, setActiveGate }) {
    return (
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
            {GATES.map((gate, index) => {
                const size = 600 - (index * 90);
                const isActive = index === activeGate;
                const isPast = index < activeGate;

                return (
                    <motion.div
                        key={gate.id}
                        className={`absolute rounded-full border flex items-center justify-center transition-colors duration-500 cursor-pointer
                            ${isActive
                                ? "border-white/40 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                : isPast
                                    ? "border-white/10 opacity-30"
                                    : "border-white/5 opacity-50 hover:border-white/20"
                            }
                        `}
                        style={{ width: size, height: size, zIndex: 10 - index }}
                        onClick={() => setActiveGate(index)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isActive || isPast || index === activeGate + 1 ? 1 : 0.4, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-ring"
                                className="absolute inset-0 rounded-full border-2 border-white/60 animate-pulse-slow"
                            />
                        )}

                        {/* Gate Label on Ring */}
                        <div className={`absolute top-4 text-[10px] tracking-[0.3em] font-bold ${isActive ? 'text-white' : 'text-white/30'}`}>
                            GATE {gate.id}
                        </div>
                    </motion.div>
                );
            })}

            {/* The Center */}
            <motion.div
                className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.5)] z-20 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setActiveGate(5)}
            >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </div>
    );
}

function ApplicationVisual({ selectedRole }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm relative"
        >
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />

            <div className="mb-6 p-4 bg-white text-black rounded-full">
                <Send size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-2">GATE 0: THE SIGNAL</h3>
            <p className="text-white/50 max-w-xs mx-auto mb-8">
                Send a signal from outside the firmament. If the frequency matches, the gate will open.
            </p>

            {selectedRole && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-4 border border-white/20 rounded bg-black/50"
                >
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Target Role</div>
                    <div className="font-bold text-lg">{ROLES.find(r => r.id === selectedRole)?.title}</div>
                </motion.div>
            )}
        </motion.div>
    );
}

function ApplicationForm({ onBack, selectedRole, setSelectedRole }) {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 p-8 rounded-lg text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/50">
                        <ArrowRight size={32} className="-rotate-45" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Signal Sent.</h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                    Your transmission has been received by the Gatekeeper.<br />
                    If the signal is clear, you will receive an Echo within 72 hours.
                </p>
                <div className="p-4 bg-black/30 rounded text-sm font-mono text-white/40 mb-8">
                    REF_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
                <button
                    onClick={onBack}
                    className="px-6 py-3 border border-white/20 rounded hover:bg-white hover:text-black transition-colors"
                >
                    Return to the Firmament
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-lg"
        >
            <button onClick={onBack} className="text-xs font-bold tracking-widest text-white/40 hover:text-white mb-6 flex items-center gap-2">
                <ArrowRight size={12} className="rotate-180" /> BACK TO MAP
            </button>

            <h2 className="text-3xl font-bold mb-8">Start The Ascent</h2>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>

                {/* Role Selection */}
                <div className="space-y-4 mb-8">
                    <label className="text-xs uppercase tracking-widest text-white/40">Select Your Path</label>
                    <div className="grid grid-cols-1 gap-2">
                        {ROLES.map(role => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`p-4 border rounded cursor-pointer transition-all ${selectedRole === role.id
                                        ? "bg-white text-black border-white"
                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold">{role.title}</span>
                                    <span className={`text-xs ${selectedRole === role.id ? 'text-black/60' : 'text-white/40'}`}>{role.type}</span>
                                </div>
                                <div className={`text-xs ${selectedRole === role.id ? 'text-black/70' : 'text-white/50'}`}>
                                    {role.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Identity</label>
                        <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/50" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Contact</label>
                        <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/50" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">Evidence (URL)</label>
                    <input required type="url" placeholder="LinkedIn / Github / Portfolio" className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/50" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40">The Signal (Your Pitch)</label>
                    <textarea required rows="4" placeholder="Why Northfield? Why now? Keep it high signal." className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/50 resize-none"></textarea>
                </div>

                <button
                    disabled={!selectedRole}
                    type="submit"
                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                >
                    Transmit Signal
                </button>

            </form>
        </motion.div>
    );
}
