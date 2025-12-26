import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';

export default function SanctumProjectDetail() {
    const { projectId } = useParams();

    return (
        <Layout>
            <div className="flex flex-col font-mono relative h-full">
                {/* Background Ambience */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,157,0.15),transparent_60%)]" />

                {/* Navigation / Header */}
                <div className="relative z-10 flex items-center justify-between p-8 border-b border-white/10 bg-black/50 backdrop-blur-md">
                    <Link to="/" className="flex items-center gap-2 group text-white/60 hover:text-[#00ff9d] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-bold tracking-widest uppercase">Return to Sanctum</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-[#00ff9d] animate-pulse" />
                        <span className="text-xs font-bold tracking-widest text-[#00ff9d]">SECURE CONNECTION ESTABLISHED</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 relative z-10 p-12 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="flex items-start justify-between mb-16">
                            <div>
                                <h1 className="text-6xl font-bold tracking-tight text-white mb-4">PROJECT: {projectId}</h1>
                                <p className="text-white/40 text-lg max-w-2xl">
                                    Accessing restricted project data. Authorization level: ALPHA-1.
                                </p>
                            </div>
                            <div className="border border-[#00ff9d]/30 bg-[#00ff9d]/5 px-6 py-3 rounded">
                                <span className="text-[#00ff9d] font-bold tracking-widest text-sm">STATUS: ACTIVE</span>
                            </div>
                        </div>

                        {/* Modules Grid Placeholder */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Core Schema */}
                            <div className="border border-white/10 bg-white/5 p-8 rounded-lg hover:border-[#00ff9d]/30 transition-colors group cursor-pointer">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff9d]">CORE SCHEMA</h3>
                                <div className="h-1 w-12 bg-white/20 mb-6 group-hover:bg-[#00ff9d] transition-colors" />
                                <p className="text-white/40 text-sm leading-relaxed">System architecture and fundamental data models.</p>
                            </div>

                            {/* Implementation */}
                            <div className="border border-white/10 bg-white/5 p-8 rounded-lg hover:border-[#00ff9d]/30 transition-colors group cursor-pointer">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff9d]">IMPLEMENTATION</h3>
                                <div className="h-1 w-12 bg-white/20 mb-6 group-hover:bg-[#00ff9d] transition-colors" />
                                <p className="text-white/40 text-sm leading-relaxed">Active codebases, repositories, and deployment pipelines.</p>
                            </div>

                            {/* Documentation */}
                            <div className="border border-white/10 bg-white/5 p-8 rounded-lg hover:border-[#00ff9d]/30 transition-colors group cursor-pointer">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff9d]">DOCUMENTATION</h3>
                                <div className="h-1 w-12 bg-white/20 mb-6 group-hover:bg-[#00ff9d] transition-colors" />
                                <p className="text-white/40 text-sm leading-relaxed">Project prospectus, RFCs, and governance records.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
