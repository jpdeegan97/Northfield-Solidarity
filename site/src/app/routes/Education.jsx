import React from 'react';
import Layout from '../../components/Layout.jsx';
import { GraduationCap, Shield, ExternalLink, School, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education() {
    return (
        <div data-theme="water" className="min-h-screen bg-slate-950">
            <Layout>
                <div className="max-w-5xl mx-auto py-12 px-6">

                    {/* Header with Stats */}
                    <div className="text-center mb-16 relative">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl mb-6 ring-1 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        >
                            <GraduationCap size={48} className="text-blue-500" />
                        </motion.div>
                        <h1 className="text-5xl font-bold mb-6 tracking-tight text-white">Education Protocols</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Knowledge transmission vectors and academic reinforcement services designed for the next generation of intelligence.
                        </p>

                        {/* Stats Ticker */}
                        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto border-t border-b border-slate-800 py-6">
                            {[
                                { label: "Active Nodes", value: "1", color: "text-green-400" },
                                { label: "Curriculum Vectors", value: "3", color: "text-blue-400" },
                                { label: "Global Reach", value: "Pending", color: "text-amber-400" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <span className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</span>
                                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ventures Grid */}
                    <div className="grid gap-8">

                        {/* More Than Enough Tutors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group"
                        >
                            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                                {/* Thumbnail */}
                                <div className="w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:border-blue-500/30 transition-colors">
                                    <div className="absolute inset-0 bg-grid-slate-800/[0.2] [mask-image:linear-gradient(0deg,white,transparent)]" />
                                    <School size={64} className="text-blue-400 relative z-10" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h2 className="text-3xl font-bold text-white tracking-tight">More Than Enough Tutors</h2>
                                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 uppercase tracking-wide">
                                            Re-registering
                                        </span>
                                    </div>
                                    <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                                        Premium academic reinforcement and specialized tutoring services.
                                        Delivering high-efficacy learning outcomes through personalized instruction.
                                    </p>

                                    <div className="flex flex-col gap-5">
                                        {/* Liability Shield Notice */}
                                        <div className="p-5 bg-slate-950/50 rounded-xl border border-slate-800 flex items-start gap-4 hover:bg-slate-950 transition-colors">
                                            <div className="p-2 bg-green-500/10 rounded-lg shrink-0">
                                                <Shield className="text-green-500" size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-200 mb-1 flex items-center gap-2">
                                                    Entity Isolation Protocol
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                </h4>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    Operated as a legally distinct entity under <strong className="text-slate-200">NSDC Education Services LLC</strong>.
                                                    This structure ensures strict liability segregation, protecting core capital assets from operational hazards (e.g., third-degree coffee burns during adjacent angle instruction).
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                                            <span className="text-xs font-mono text-slate-500">STATUS: PENDING STATE APPROVAL</span>
                                            <button disabled className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-400 rounded-lg text-sm font-semibold cursor-not-allowed border border-slate-700 hover:bg-slate-700 transition-colors">
                                                Platform Launching Soon <ExternalLink size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Future Initiatives Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
                            >
                                <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
                                    <BookOpen size={24} className="text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-200 mb-2">Curriculum Synthesis</h3>
                                <p className="text-sm text-slate-400 mb-4">
                                    AI-driven curriculum generation based on real-time industry demands and skill gap analysis.
                                </p>
                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 w-1/4 h-full rounded-full" />
                                </div>
                                <span className="text-xs text-purple-400 mt-2 block">25% Development</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/10 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]"
                            >
                                <div className="p-3 bg-slate-800 rounded-full">
                                    <AlertTriangle size={24} className="text-slate-500" />
                                </div>
                                <h3 className="text-md font-semibold text-slate-400">Restricted Sector</h3>
                                <p className="text-xs text-slate-600 max-w-[200px]">
                                    Additional educational vectors classify as Level 5 cognitohazards. Access restricted.
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    );
}
