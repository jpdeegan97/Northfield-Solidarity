import React from 'react';
import { Activity } from 'lucide-react';

export default function ProjectStatusPanel({ project, themeColor = "#ffffff" }) {
    if (!project) return null;

    return (
        <div className="border-t border-white/10 bg-[#050505] p-8 backdrop-blur-md">
            <div className="max-w-5xl mx-auto">
                <div className="border border-white/10 bg-white/5 p-8 rounded-xl">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                            <Activity size={24} style={{ color: themeColor }} />
                            System Status
                        </h2>
                        <div className="flex items-center gap-2 text-xs font-mono opacity-50 text-white">
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                            LIVE SIGNAL
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <StatusRow label="Project Status" value={(project.status || 'Unknown').toUpperCase()} themeColor={themeColor} />
                            <StatusRow label="Funding Goal" value={project.fundingGoal ? `$${project.fundingGoal.toLocaleString()}` : 'N/A'} themeColor={themeColor} />
                            <StatusRow label="Capital Raised" value={project.raised !== undefined ? `$${project.raised.toLocaleString()}` : '$0'} themeColor={themeColor} highlight />
                        </div>
                        <div className="space-y-4">
                            <StatusRow label="Backers" value={project.backers || 0} themeColor={themeColor} />
                            <StatusRow label="Docs Available" value={project.documents ? project.documents.length : (project.charterContent ? 1 : 0)} themeColor={themeColor} />
                            <StatusRow label="Network Uptime" value="99.9%" themeColor={themeColor} />
                        </div>
                    </div>

                    {/* Health Bars Visualization */}
                    <div className="border-t border-white/5 pt-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 text-white">Real-time Metrics</h4>
                        <div className="flex items-end gap-1 h-24 bg-black/20 rounded-lg p-4 border border-white/5 relative overflow-hidden">
                            {/* Background Grid */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                            {[40, 65, 55, 80, 45, 90, 70, 35, 60, 75, 50, 85, 65, 40, 95, 60, 70, 50, 80, 65, 45, 75, 60, 85].map((h, i) => (
                                <div key={i}
                                    className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100"
                                    style={{
                                        height: `${h}%`,
                                        backgroundColor: themeColor,
                                        opacity: 0.3 + (h / 200)
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-2 text-[10px] font-mono opacity-50 uppercase text-white">
                            <span>24h Latency: 12ms</span>
                            <span>Throughput: 842 TPS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
