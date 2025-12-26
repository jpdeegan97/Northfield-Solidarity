import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function SanctumDashboard() {
    const projects = [
        { id: 'MINT', name: 'PROJECT MINT', status: 'ACTIVE', desc: 'Entity / IP formation engine.' },
        { id: 'alpha', name: 'PROJECT ALPHA', status: 'ACTIVE', desc: 'Next-gen financial primitive.' },
        { id: 'beta', name: 'STEALTH OPS', status: 'IDEATION', desc: 'Secure communication layer.' },
        { id: 'gamma', name: 'VENTUR XT', status: 'DORMANT', desc: 'Unrevealed asset class.' },
        { id: 'delta', name: 'OMEGA PROTOCOL', status: 'BUILD', desc: 'Decentralized trust fabric.' },
    ];

    return (
        <Layout>
            <div className="p-8 font-mono relative">
                {/* Background Ambience */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.1),transparent_70%)]" />

                {/* Header */}
                <header className="relative z-10 flex flex-col gap-2 mb-12">
                    <h1 className="text-4xl font-bold tracking-[0.2em] text-[#00ff9d]">SANCTUM</h1>
                    <div className="w-24 h-1 bg-[#00ff9d]" />
                    <p className="text-white/40 text-sm tracking-widest uppercase mt-2">Private Venture Studio // Authorized Personnel Only</p>
                </header>

                {/* Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <Link to={`/project/${p.id}`} key={p.id}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group relative h-64 bg-white/5 border border-white/10 hover:border-[#00ff9d]/50 p-6 flex flex-col justify-between cursor-pointer transition-colors backdrop-blur-sm"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded border border-white/20 ${p.status === 'ACTIVE' ? 'text-[#00ff9d] border-[#00ff9d]/30' : p.status === 'BUILD' ? 'text-yellow-400 border-yellow-400/30' : 'text-white/40'}`}>
                                        {p.status}
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-bold tracking-widest text-white group-hover:text-[#00ff9d] transition-colors">{p.name}</h3>
                                    <p className="text-white/40 text-xs mt-2 leading-relaxed">{p.desc}</p>
                                </div>

                                <div className="flex justify-end">
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00ff9d] group-hover:text-black transition-all">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}

                    {/* 'New Project' Card */}
                    <Link to="/visualizer">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-64 border border-dashed border-white/20 hover:border-[#00ff9d]/50 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#00ff9d]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </div>
                            <span className="mt-4 text-xs font-bold tracking-widest text-white/40 group-hover:text-[#00ff9d]">ENGAGE VISUALIZER</span>
                        </motion.div>
                    </Link>

                    {/* 'New Project' Card PLaceholder for Expansion */}
                    {/* 'New Project' Card PLaceholder for Expansion */}
                    <Link to="/marketplace">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-64 border border-dashed border-white/20 hover:border-[#00ff9d]/50 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#00ff9d]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                            </div>
                            <span className="mt-4 text-xs font-bold tracking-widest text-white/40 group-hover:text-[#00ff9d]">ACCESS MARKETPLACE</span>
                        </motion.div>
                    </Link>

                    {/* Timeline Card */}
                    <Link to="/timeline">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="group relative h-64 border border-dashed border-white/20 hover:border-[#00ff9d]/50 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#00ff9d]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <span className="mt-4 text-xs font-bold tracking-widest text-white/40 group-hover:text-[#00ff9d]">TEMPORAL ORGANIZER</span>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
