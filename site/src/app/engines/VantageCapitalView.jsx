import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VantageCapitalView() {
    const [step, setStep] = useState('landing'); // landing, analyzing, results
    const [formData, setFormData] = useState({ businessName: '', revenue: '' });

    const handleStart = () => {
        setStep('input');
    };

    const handleAnalyze = () => {
        setStep('analyzing');
        setTimeout(() => {
            setStep('results');
        }, 3000);
    };

    return (
        <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col font-sans overflow-y-auto">
            {/* Navigation */}
            <nav className="w-full h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-cyan-500" />
                    <span className="text-xl font-bold tracking-tight">VANTAGE CAPITAL</span>
                </div>
                <div className="flex gap-6 text-sm text-white/60">
                    <a href="#" className="hover:text-white transition-colors">Compare</a>
                    <a href="#" className="hover:text-white transition-colors">Resources</a>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                </div>
                <button className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium">
                    Log In
                </button>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">

                {/* Background Blobs */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                <AnimatePresence mode="wait">
                    {step === 'landing' && (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl text-center z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest"
                            >
                                Impartial Funding Intelligence
                            </motion.div>
                            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                Clarity in a crowded <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Capital Market.</span>
                            </h1>
                            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                                No applications. No credit checks. No aggressive sales agents.
                                Just a tailored Business Loan Report to help you navigate your options.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={handleStart}
                                    className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                >
                                    Get Your Report — $19.95
                                </button>
                                <button className="px-8 py-4 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 border border-white/10 transition-all">
                                    View Sample Report
                                </button>
                            </div>

                            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                                {[
                                    { title: "Analyze Offers", desc: "We ingest your current approvals and contracts to detect hidden fees." },
                                    { title: "Review Options", desc: "Speak with an impartial specialist who doesn't work on commission." },
                                    { title: "Market Match", desc: "Instantly compare your terms against our vetted lending network." }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                                        <p className="text-sm text-white/50">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-white/10 shadow-2xl z-10"
                        >
                            <h2 className="text-2xl font-bold mb-6">Initialize Analysis</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-white/40 uppercase mb-2">Business Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="e.g. Acme Corp"
                                        value={formData.businessName}
                                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/40 uppercase mb-2">Monthly Revenue</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                                        value={formData.revenue}
                                        onChange={e => setFormData({ ...formData, revenue: e.target.value })}
                                    >
                                        <option value="">Select Range...</option>
                                        <option value="10k">$10k - $50k</option>
                                        <option value="50k">$50k - $250k</option>
                                        <option value="250k">$250k+</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!formData.businessName || !formData.revenue}
                                    className="w-full py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    Start Analysis
                                </button>
                                <button
                                    onClick={() => setStep('landing')}
                                    className="w-full py-2 text-white/30 hover:text-white transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center z-10"
                        >
                            <div className="w-24 h-24 mb-6 relative">
                                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold animate-pulse">Running Market Checks...</h3>
                            <div className="mt-4 flex flex-col gap-2 text-xs text-white/40 font-mono">
                                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>Querying Lender Database (v4.2)... OK</motion.span>
                                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>Analyzing Risk Factors... OK</motion.span>
                                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }}>Optimizing Rate Structures... OK</motion.span>
                            </div>
                        </motion.div>
                    )}

                    {step === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-4xl z-10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold">Analysis Complete</h2>
                                    <p className="text-white/50">Report generated for {formData.businessName}</p>
                                </div>
                                <button
                                    onClick={() => setStep('landing')}
                                    className="text-sm text-emerald-400 hover:text-emerald-300"
                                >
                                    Run New Analysis
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Score Card */}
                                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-sm font-bold text-white/40 uppercase mb-4">Funding Readiness Score</h3>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-6xl font-bold text-emerald-500">84</span>
                                        <span className="text-xl text-white/30 mb-2">/ 100</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[84%]" />
                                    </div>
                                    <p className="mt-4 text-sm text-white/60">
                                        Your business demonstrates strong revenue consistency, placing you in the top 20% of applicants in your sector.
                                    </p>
                                </div>

                                {/* Matches Card */}
                                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                                    <h3 className="text-sm font-bold text-white/40 uppercase mb-4">Potential Matches</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Apex Lending", rate: "6.5% - 8.2%", type: "Term Loan" },
                                            { name: "Meridian Capital", rate: "1.2 x Factor", type: "MCA" },
                                            { name: "BlueSky Funding", rate: "Prime + 1.5%", type: "Line of Credit" },
                                        ].map((match, i) => (
                                            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-white/5 rounded border border-white/5">
                                                <div>
                                                    <div className="font-bold text-sm">{match.name}</div>
                                                    <div className="text-[10px] text-white/40">{match.type}</div>
                                                </div>
                                                <div className="text-right mt-2 md:mt-0">
                                                    <div className="text-emerald-400 text-xs font-mono font-bold">{match.rate}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-4 py-3 bg-white/10 text-white text-sm font-bold rounded hover:bg-white/20 transition-colors">
                                        Unlock Full Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
