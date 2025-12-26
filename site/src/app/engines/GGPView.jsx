import React, { useState, useEffect } from 'react';
import { ggpService } from '../../services/mock/MockGgpService';

export default function GGPView({ engine }) {
    const [executions, setExecutions] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [selectedExec, setSelectedExec] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await ggpService.getDashboardData();
            setExecutions(data.executions);
            setPolicies(data.policies);
            if (!selectedExec && data.executions.length > 0) setSelectedExec(data.executions[0]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAction = async (action) => {
        if (!selectedExec) return;
        try {
            let updated;
            if (action === 'APPROVE') {
                updated = await ggpService.approveExecution(selectedExec.id);
            } else {
                updated = await ggpService.flagExecution(selectedExec.id);
            }

            setExecutions(prev => prev.map(e => e.id === updated.id ? updated : e));
            setSelectedExec(updated);
        } catch (e) {
            console.error(e);
        }
    };

    if (isLoading && executions.length === 0) {
        return <div className="flex items-center justify-center h-full text-emerald-500 animate-pulse font-mono text-xs">SYNCHRONIZING GGP GOVERNANCE LAYER...</div>;
    }

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
                        {executions.map((exec) => {
                            const isSelected = selectedExec?.id === exec.id;
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
            {selectedExec && (
                <div className="pointer-events-auto flex flex-col gap-4 w-96">

                    {/* Top: Execution Detail */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Audit Record</h3>
                                <p className="text-[10px] text-white/40 mb-4 font-mono">{selectedExec.id}</p>
                            </div>
                            {selectedExec.status === 'PENDING' && (
                                <div className="flex gap-2">
                                    <button onClick={() => handleAction('APPROVE')} className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-1 rounded hover:bg-emerald-500/40 transition-all">APPROVE</button>
                                    <button onClick={() => handleAction('FLAG')} className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-1 rounded hover:bg-red-500/40 transition-all">FLAG</button>
                                </div>
                            )}
                        </div>

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
                            {policies.map((pol) => (
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
            )}

        </div>
    );
}
