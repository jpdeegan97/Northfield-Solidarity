import React from 'react';
import Layout from '../../components/Layout.jsx';
import { GraduationCap, Shield, ExternalLink, School, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="max-w-4xl mx-auto py-12 px-6">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-6"
                        >
                            <GraduationCap size={48} className="text-blue-500" />
                        </motion.div>
                        <h1 className="text-4xl font-bold mb-4 tracking-tight">Education Protocols</h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Knowledge transmission vectors and academic reinforcement services.
                        </p>
                    </div>

                    {/* Ventures Grid */}
                    <div className="grid gap-8">

                        {/* More Than Enough Tutors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors group"
                        >
                            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-full md:w-1/3 aspect-video bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-900/30 transition-colors">
                                    <School size={64} className="text-blue-400 opacity-80" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-white">More Than Enough Tutors</h2>
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                            REREGISTERING
                                        </span>
                                    </div>
                                    <p className="text-slate-300 mb-6 leading-relaxed">
                                        Premium academic reinforcement and specialized tutoring services.
                                        Delivering high-efficacy learning outcomes through personalized instruction.
                                    </p>

                                    <div className="flex flex-col gap-4">
                                        {/* Liability Shield Notice */}
                                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                                            <Shield className="text-green-500 mt-0.5 shrink-0" size={18} />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-200 mb-1">Entity Isolation Protocol</h4>
                                                <p className="text-xs text-slate-500">
                                                    Operated as a legally distinct entity under <strong>NSDC Education Services LLC</strong>.
                                                    This structure ensures total liability segregation, protecting the core capital assets from operational hazards (e.g., third-degree coffee burns during adjacent angle instruction).
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <button disabled className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-500 rounded-lg text-sm font-medium cursor-not-allowed border border-slate-700">
                                                Platform Launching Soon <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Future Initiatives Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 flex flex-col items-center justify-center text-center gap-4"
                        >
                            <BookOpen size={32} className="text-slate-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-slate-400">Future Curriculum Vectors</h3>
                                <p className="text-sm text-slate-600">Additional educational silos pending governance approval.</p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </Layout>
        </div>
    );
}
