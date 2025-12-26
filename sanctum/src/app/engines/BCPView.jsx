import React, { useState } from 'react';

// Mock Data: Continuity Checks
const HEALTH_CHECKS = [
    { id: 'BCP-01', system: 'Primary Database (US-EAST)', status: 'HEALTHY', latency: '45ms', redundancy: '3 AZs' },
    { id: 'BCP-02', system: 'Key Management (HSM)', status: 'HEALTHY', latency: '120ms', redundancy: 'Global' },
    { id: 'BCP-03', system: 'CDN Edge Network', status: 'DEGRADED', latency: '210ms', redundancy: 'Partial' },
    { id: 'BCP-04', system: 'Backup Generator (Power)', status: 'STANDBY', latency: '-', redundancy: 'N/A' },
];

const EMERGENCY_PROTOCOLS = [
    { id: 'P-99', name: 'Circuit Breaker (Global)', triggered: false, impact: 'Total Halt' },
    { id: 'P-22', name: 'Data Vault Lock', triggered: false, impact: 'Read-Only' },
    { id: 'P-11', name: 'Failover to EU-West', triggered: false, impact: 'High Latency' },
];

export default function BCPView({ engine }) {
    const [selectedCheck, setSelectedCheck] = useState(HEALTH_CHECKS[0]);

    // Theme: Safety Orange (Distinct from DAT's Amber/Gold)
    // Using Orange-600/500 base
    const THEME = {
        primary: 'text-orange-500',
        bg: 'bg-orange-600',
        border: 'border-orange-500/50',
        hoverBorder: 'hover:border-orange-500/50',
        glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
        bgSoft: 'bg-orange-950/40'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: System Vitals */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Continuity Grid
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">STATUS: STABLE</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 overflow-y-auto pr-2">
                        {HEALTH_CHECKS.map((check) => {
                            const isSelected = selectedCheck.id === check.id;
                            const statusColor = check.status === 'HEALTHY' ? 'text-emerald-400' :
                                check.status === 'DEGRADED' ? 'text-orange-400' : 'text-white/40';

                            return (
                                <div
                                    key={check.id}
                                    onClick={() => setSelectedCheck(check)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    {/* Background stripe for visuals */}
                                    <div className={`absolute top-0 right-0 w-1 h-full ${check.status === 'HEALTHY' ? 'bg-emerald-500/50' : 'bg-orange-500/50'}`} />

                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-xs font-bold text-white group-hover:text-orange-200">{check.system}</h4>
                                        <span className={`text-[9px] font-mono ${statusColor}`}>{check.status}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 text-[10px] text-white/50 font-mono">
                                        <span>Latency: {check.latency}</span>
                                        <span>Sites: {check.redundancy}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Topology map placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center opacity-40 pointer-events-none">
                {/* 3D Global Map placeholder */}
            </div>

            {/* RIGHT: Emergency Controls */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Drill Status */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Last Drill</h3>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-emerald-400">PASSED</span>
                        <span className="text-[10px] text-white/40">14 days ago</span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed border-t border-white/10 pt-2">
                        Simulated outages in US-EAST region. Automatic failover to EU-WEST completed in 4.2 seconds. No data loss.
                    </p>
                </div>

                {/* Bottom: Protocols */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Emergency Protocols</h3>
                    <div className="space-y-3">
                        {EMERGENCY_PROTOCOLS.map((proto) => (
                            <div key={proto.id} className="flex justify-between items-center p-3 border border-white/10 rounded bg-white/5">
                                <div>
                                    <div className="text-xs font-bold text-white">{proto.name}</div>
                                    <div className="text-[9px] text-white/40">Impact: {proto.impact}</div>
                                </div>
                                <div className="h-4 w-8 rounded-full bg-white/10 border border-white/10 relative cursor-pointer hover:bg-white/20">
                                    <div className="absolute left-0.5 top-0.5 h-3 w-3 bg-white/40 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
