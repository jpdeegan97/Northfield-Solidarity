import React, { useState } from 'react';

// Mock Data: Governance Executions
const EXECUTIONS = [
    { id: 'GOV-8821', type: 'SOP_UPDATE', status: 'CLEARED', timestamp: '09:15:22 UTC', initiator: 'SYSTEM', summary: 'Routine policy re-indexing for Sector 4.' },
    { id: 'GOV-8820', type: 'ACCESS_REQ', status: 'PENDING', timestamp: '09:14:05 UTC', initiator: 'J.DOE', summary: 'Requesting write access to IDN-Production.' },
    { id: 'GOV-8819', type: 'EXCEPTION', status: 'FLAGGED', timestamp: '09:10:00 UTC', initiator: 'AUTO_SENTINEL', summary: 'Traffic spike anomaly detected in MUX-Gateway.' },
    { id: 'GOV-8818', type: 'DEPLOYMENT', status: 'CLEARED', timestamp: '08:55:12 UTC', initiator: 'CI/CD', summary: 'Deployment batch #4402 authorized.' },
];

const POLICIES = [
    { id: 'POL-001', name: 'Zero Trust Root', level: 'L0', enforcement: 'HARD', status: 'ACTIVE' },
    { id: 'POL-024', name: 'Vendor API Rate Limits', level: 'L2', enforcement: 'SOFT', status: 'ACTIVE' },
    { id: 'POL-109', name: 'Emergency Shutdown', level: 'L0', enforcement: 'MANUAL', status: 'DORMANT' },
];

export default function GGPView({ engine }) {
    const [selectedExec, setSelectedExec] = useState(EXECUTIONS[0]);

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Governance Stream */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[60vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className="text-xs font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            GGP Stream
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">LIVE</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                        {EXECUTIONS.map((exec) => {
                            const isSelected = selectedExec.id === exec.id;
                            const statusColor = exec.status === 'CLEARED' ? 'text-emerald-400' :
                                exec.status === 'FLAGGED' ? 'text-red-400' : 'text-amber-400';

                            return (
                                <div
                                    key={exec.id}
                                    onClick={() => setSelectedExec(exec)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all
                                        ${isSelected
                                            ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                                            : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-white/60">{exec.id}</span>
                                        <span className="text-[10px] font-mono text-white/30">{exec.timestamp}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold ${statusColor}`}>{exec.status}</span>
                                        <span className="text-[10px] text-white/50 px-1.5 py-0.5 bg-white/5 rounded">{exec.type}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Placeholder for Node Graph or similar (Empty for now) */}
            <div className="flex-1"></div>

            {/* RIGHT: Detail Console */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">

                {/* Top: Execution Detail */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Audit Record</h3>
                    <p className="text-[10px] text-white/40 mb-4 font-mono">{selectedExec.id}</p>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 p-2 rounded border border-white/5">
                                <div className="text-[9px] text-white/40 uppercase">Initiator</div>
                                <div className="text-sm font-mono text-emerald-300">{selectedExec.initiator}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded border border-white/5">
                                <div className="text-[9px] text-white/40 uppercase">Hash</div>
                                <div className="text-sm font-mono text-white/60 truncate">0x7f8...a92</div>
                            </div>
                        </div>

                        <div className="p-3 bg-black/40 rounded border border-white/10">
                            <div className="text-[9px] text-white/40 uppercase mb-1">Summary</div>
                            <p className="text-xs text-white/80 leading-relaxed">{selectedExec.summary}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom: Active Policies (Context) */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Enforcing Policies</h3>
                    <div className="space-y-2">
                        {POLICIES.map((pol) => (
                            <div key={pol.id} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                <span className="text-xs text-white/80">{pol.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-white/30">{pol.level}</span>
                                    <span className={`w-1.5 h-1.5 rounded-full ${pol.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
