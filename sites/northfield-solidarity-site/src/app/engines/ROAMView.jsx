import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ROAMView({ isWindow = false }) {
    const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | prs | runbooks | terminal | logs
    const [isMobileMode, setIsMobileMode] = useState(true);
    const [actionStatus, setActionStatus] = useState(null); // null | pending | success | error
    const [modalContent, setModalContent] = useState(null); // For detailed confirmations

    // ENHANCEMENT 1: Environment Switcher
    const [env, setEnv] = useState("PROD"); // PROD | STAGE | DEV

    // ENHANCEMENT 3: Incident Mode
    const [isIncidentMode, setIsIncidentMode] = useState(false);

    // ENHANCEMENT 6: Team Presence
    const TEAM_MEMBERS = [
        { id: 'u1', initial: 'JD', color: 'bg-blue-500' },
        { id: 'u2', initial: 'AK', color: 'bg-purple-500' },
        { id: 'u3', initial: 'RO', color: 'bg-orange-500' }
    ];

    // ENHANCEMENT 9: Network Quality Simulation
    const [netQuality, setNetQuality] = useState(100);
    useEffect(() => {
        const i = setInterval(() => setNetQuality(Math.floor(80 + Math.random() * 20)), 2000);
        return () => clearInterval(i);
    }, []);

    const SYSTEM_HEALTH = isIncidentMode ? "CRITICAL" : "HEALTHY";

    const ACTIVE_DEPLOYMENT = {
        id: "dep-8492",
        repo: "ns-core/firmament",
        branch: "main",
        commit: "7f2a1b",
        status: "RUNNING",
        stage: "production",
        progress: 65,
        previewUrl: "https://preview-8492.roam.ns.dev"
    };

    // ENHANCEMENT 5: Deployment History
    const DEPLOY_HISTORY = [
        { id: "dep-8491", ago: "2h", status: "SUCCESS", version: "v1.2.0" },
        { id: "dep-8490", ago: "5h", status: "SUCCESS", version: "v1.1.9" },
        { id: "dep-8489", ago: "1d", status: "FAILED", version: "v1.1.8" },
    ];

    // ENHANCEMENT 4: Service Mesh Grid
    const SERVICES = [
        { name: 'API', status: 'ok', lat: '45ms' },
        { name: 'DB', status: 'ok', lat: '12ms' },
        { name: 'CACHE', status: 'warn', lat: '150ms' },
        { name: 'EDGE', status: 'ok', lat: '22ms' },
    ];

    const PULL_REQUESTS = [
        { id: 102, title: "feat: Add MINT telemetry", author: "jdoe", status: "open", checks: "pass", files: 12 },
        { id: 105, title: "fix: Mobile overflow in nav", author: "alice", status: "open", checks: "pass", files: 3 },
        { id: 108, title: "chore: Bump dependencies", author: "robot", status: "open", checks: "fail", files: 45 }
    ];

    const RUNBOOKS = [
        { id: 'rb-01', name: "Promote to Production", type: "deploy", desc: "Deploys current stage artifact", icon: "→", color: "text-emerald-500", border: "border-emerald-500", secure: true },
        { id: 'rb-02', name: "Restart Services", type: "mitigate", desc: "Rolling restart of api-server", icon: "↺", color: "text-orange-500", border: "border-orange-500", secure: true },
        { id: 'rb-03', name: "Clear CDN Cache", type: "maintenance", desc: "Purge all edge caches", icon: "🧹", color: "text-blue-500", border: "border-blue-500" },
        { id: 'rb-04', name: "Scale Database", type: "scale", desc: "Add read-replica (auto-term)", icon: "📈", color: "text-purple-500", border: "border-purple-500" },
        { id: 'rb-05', name: "Block Malicious IP", type: "security", desc: "Add IP to WAF deny list", icon: "🛡️", color: "text-red-400", border: "border-red-500" },
        { id: 'rb-06', name: "EMERGENCY ROLLBACK", type: "critical", desc: "Revert to last known good", icon: "⚠️", color: "text-red-500", border: "border-red-600 bg-red-900/20", secure: true }
    ];

    const handleAction = (runbook) => {
        setModalContent({
            title: runbook.name,
            message: runbook.secure
                ? `Running security check... Scan required to execute ${runbook.name}.` // ENHANCEMENT 2: Biometric Text
                : `Are you sure you want to execute ${runbook.name}?`,
            confirmLabel: "EXECUTE",
            isSecure: runbook.secure,
            onConfirm: () => {
                setModalContent(null);
                executeAction(runbook.name);
            },
            onCancel: () => setModalContent(null)
        });
    };

    const executeAction = (name) => {
        setActionStatus('pending');
        setTimeout(() => {
            setActionStatus('success');
            setTimeout(() => setActionStatus(null), 2000);
        }, 1500);
    };

    return (
        <div className={`flex flex-col h-full bg-[#050505] text-white overflow-hidden relative ${isWindow ? 'p-0' : 'p-6 items-center justify-center'}`}>

            {!isWindow && (
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setIsMobileMode(!isMobileMode)}
                        className="text-xs uppercase px-3 py-1 border border-white/20 rounded hover:bg-white/10"
                    >
                        {isMobileMode ? "Switch to Desktop" : "Switch to Phone"}
                    </button>
                </div>
            )}

            <motion.div
                layout
                className={`
                    relative flex flex-col bg-black border ${isIncidentMode ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-white/10 shadow-2xl'} overflow-hidden transition-all duration-500
                    ${isMobileMode || isWindow ? 'w-full h-full max-w-[375px] rounded-xl border-zinc-800' : 'w-[1024px] h-[600px] rounded-lg'}
                `}
                style={isWindow ? { maxWidth: '100%', borderRadius: 0 } : {}}
            >
                {/* Simulated StatusBar */}
                <div className="h-6 bg-black flex justify-between items-center px-4 text-[10px] font-mono text-white/40 select-none">
                    <span>10:15</span>
                    <div className="flex gap-1.5 items-center">
                        <span className={netQuality < 90 ? 'text-orange-500' : 'text-emerald-500'}>5G</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map(bar => (
                                <div key={bar} className={`w-0.5 h-${bar + 1} ${netQuality > (bar * 25) ? 'bg-white' : 'bg-white/20'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ENHANCEMENT 1 & 6: Header with Env Switch & Team */}
                <div className={`px-4 py-3 flex justify-between items-center backdrop-blur-md border-b transition-colors ${isIncidentMode ? 'bg-red-950/50 border-red-500/30' : 'bg-zinc-900/50 border-white/5'}`}>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <select
                                value={env}
                                onChange={(e) => setEnv(e.target.value)}
                                className={`bg-white/10 text-[10px] font-bold rounded px-1 py-0.5 outline-none hover:bg-white/20 cursor-pointer ${env === 'PROD' ? 'text-red-400' : 'text-blue-300'}`}
                            >
                                <option value="PROD">PROD</option>
                                <option value="STAGE">STAGE</option>
                                <option value="DEV">DEV</option>
                            </select>
                            {isIncidentMode && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold animate-pulse">INCIDENT</span>}
                        </div>
                        <div className="text-sm font-bold text-white">Ops Cockpit</div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Team Avatars */}
                        <div className="flex -space-x-2 mr-2">
                            {TEAM_MEMBERS.map(m => (
                                <div key={m.id} className={`w-6 h-6 rounded-full ${m.color} border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold`}>
                                    {m.initial}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsIncidentMode(!isIncidentMode)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isIncidentMode ? 'bg-red-500 animate-pulse' : 'bg-white/5 border border-white/10 hover:bg-red-500/20'}`}
                        >
                            ⚠️
                        </button>
                    </div>
                </div>

                <div className={`flex-1 overflow-y-auto ${isIncidentMode ? 'bg-red-950/10' : 'bg-zinc-950'} px-4 py-4 space-y-6 scrollbar-hide`}>

                    {activeTab === 'dashboard' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">

                            {/* ENHANCEMENT 10: Shift Handover */}
                            <div className="bg-blue-900/10 border-l-2 border-blue-500 p-3 text-[11px] text-blue-200 rounded-r flex gap-2">
                                <span className="font-bold shrink-0">📢 Handover:</span>
                                <span>DB migration scheduled for 02:00 UTC. Monitor latencies closely.</span>
                            </div>

                            {/* ENHANCEMENT 4: Service Mesh Grid */}
                            <div>
                                <h3 className="text-[10px] font-bold text-white/30 uppercase mb-2">Service Mesh</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {SERVICES.map(svc => (
                                        <div key={svc.name} className="bg-zinc-900 border border-white/5 p-3 rounded flex justify-between items-center group hover:bg-white/5 transition-colors">
                                            <div>
                                                <div className="text-[10px] text-white/40 font-bold group-hover:text-white/60">{svc.name}</div>
                                                <div className="text-xs font-mono">{svc.lat}</div>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${svc.status === 'ok' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-orange-500 animate-pulse'}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Deployment */}
                            <div className="p-4 rounded-lg bg-zinc-900 border border-white/5 active:scale-[0.98] transition-transform cursor-pointer hover:border-white/10">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-xs text-blue-400 font-bold uppercase">Deploying {env}</div>
                                    </div>
                                    <div className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded animate-pulse font-mono uppercase">Running</div>
                                </div>
                                <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${ACTIVE_DEPLOYMENT.progress}%` }}
                                        className="h-full bg-blue-500 relative"
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]" />
                                    </motion.div>
                                </div>
                                <div className="flex justify-between text-[10px] text-white/30 font-mono">
                                    <span>{ACTIVE_DEPLOYMENT.repo}</span>
                                    <span>{ACTIVE_DEPLOYMENT.progress}%</span>
                                </div>

                                {/* ENHANCEMENT 5: History */}
                                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                                    <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Recent Deploys</div>
                                    {DEPLOY_HISTORY.map(h => (
                                        <div key={h.id} className="flex justify-between items-center text-[10px] p-1.5 hover:bg-white/5 rounded transition-colors">
                                            <div className="flex items-center gap-2">
                                                <span className={h.status === 'SUCCESS' ? 'text-emerald-500' : 'text-red-500'}>
                                                    {h.status === 'SUCCESS' ? '●' : '✕'}
                                                </span>
                                                <span className="text-white/80 font-mono">{h.version}</span>
                                            </div>
                                            <span className="text-white/30">{h.ago}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'prs' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4">
                            {PULL_REQUESTS.map(pr => (
                                <div key={pr.id} className="p-3 bg-zinc-900 rounded border border-white/5 flex flex-col gap-2 hover:border-white/20 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <div className="text-xs font-bold text-white mb-0.5">#{pr.id} {pr.title}</div>
                                            {/* ENHANCEMENT 8: Expanded PR Details */}
                                            <span className="text-[10px] text-white/40 flex items-center gap-2">
                                                <span>{pr.files} files changed</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span>Updated 2m ago</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-white/40 mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">{pr.author.substring(0, 2).toUpperCase()}</div>
                                            <span>@{pr.author}</span>
                                        </div>

                                        {pr.checks === 'pass' ? (
                                            <button
                                                onClick={() => handleAction({ name: `Merge PR #${pr.id}` })}
                                                className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded border border-emerald-500/20 font-bold transition-colors"
                                            >
                                                MERGE
                                            </button>
                                        ) : (
                                            <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded">Checks Failed</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'runbooks' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3">
                            {/* ENHANCEMENT 8: Pinned Actions could go here but listing all for now */}
                            {RUNBOOKS.map(rb => (
                                <button
                                    key={rb.id}
                                    onClick={() => handleAction(rb)}
                                    className={`w-full p-3 rounded-lg bg-zinc-900 border-l-4 flex items-center justify-between hover:bg-zinc-800 active:scale-[0.98] transition-all group ${rb.border || 'border-zinc-500'}`}
                                >
                                    <div className="text-left">
                                        <div className={`font-bold text-sm flex items-center gap-2 ${rb.id === 'rb-06' ? 'text-red-500' : 'text-white'}`}>
                                            {rb.name}
                                            {rb.secure && <span className="text-[8px] border border-white/20 px-1 rounded text-white/40 group-hover:border-white/40 group-hover:text-white/60">SECURE</span>}
                                        </div>
                                        <div className="text-[10px] text-white/40">{rb.desc}</div>
                                    </div>
                                    <div className={`text-lg ${rb.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform`}>{rb.icon}</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ENHANCEMENT 7: Terminal Tab */}
                    {activeTab === 'terminal' && (
                        <div className="bg-black border border-white/10 rounded-lg p-3 font-mono text-[10px] text-emerald-400 h-full overflow-hidden flex flex-col shadow-inner">
                            <div className="flex-1 overflow-y-auto gap-1 flex flex-col pb-2">
                                <div className="opacity-50">root@roam-mobile:~$ status details</div>
                                <div>[ok] api-gateway v1.2</div>
                                <div>[ok] worker-pool [4/4]</div>
                                <div>[ok] db-shard-01 (primary)</div>
                                <div className="opacity-50 mt-2">root@roam-mobile:~$ tail -f prod.log</div>
                                <div className="text-white/60">10:42:01 [INFO] Request id=928a processed in 45ms</div>
                                <div className="text-white/60">10:42:04 [INFO] Health check from lb-02</div>
                                <div className="animate-pulse">_</div>
                            </div>
                            <div className="mt-2 flex gap-2 border-t border-white/10 pt-2">
                                <span className="text-emerald-600">{'>'}</span>
                                <input className="bg-transparent w-full outline-none text-white placeholder-white/20" placeholder="Execute command..." />
                            </div>
                        </div>
                    )}

                </div>

                <div className="h-16 border-t border-white/10 bg-zinc-950 flex justify-around items-center px-2 pb-2">
                    {[
                        { id: 'dashboard', icon: '📊', label: 'Monitor' },
                        { id: 'prs', icon: 'git-pull-request', label: 'PRs' },
                        { id: 'runbooks', icon: '⚡️', label: 'Runs' },
                        { id: 'terminal', icon: 'command', label: 'CLI' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-all ${activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                        >
                            <div className={`text-lg mb-0.5 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                                {tab.id === 'prs' ? '🐙' : tab.id === 'terminal' ? '>_' : tab.icon}
                            </div>
                            <div className="text-[9px] font-medium tracking-wide">{tab.label}</div>
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {actionStatus && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
                        >
                            <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full text-center shadow-2xl">
                                {actionStatus === 'pending' && (
                                    <>
                                        <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4" />
                                        <div className="text-sm font-bold text-white">Executing...</div>
                                    </>
                                )}
                                {actionStatus === 'success' && (
                                    <>
                                        <div className="text-5xl mb-4">✅</div>
                                        <div className="text-sm font-bold text-white">Done</div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {modalContent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                className="bg-zinc-900 border-t sm:border border-white/10 p-6 w-full sm:w-[80%] rounded-t-2xl sm:rounded-2xl pb-10 sm:pb-6 shadow-2xl"
                            >
                                <h3 className="text-lg font-bold text-white mb-2">{modalContent.title}</h3>
                                <p className="text-sm text-white/60 mb-6 flex flex-col gap-2">
                                    {modalContent.message}
                                    {/* ENHANCEMENT 2: Biometric Visual */}
                                    {modalContent.isSecure && (
                                        <span className="flex items-center gap-2 text-emerald-400 mt-2 bg-emerald-500/10 p-3 rounded justify-center animate-pulse border border-emerald-500/20">
                                            <span className="text-lg">🛡️</span>
                                            <span className="font-mono uppercase tracking-wider text-xs">Biometric Auth Verified</span>
                                        </span>
                                    )}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={modalContent.onCancel}
                                        className="flex-1 py-3 bg-zinc-800 rounded-lg text-sm font-bold hover:bg-zinc-700 transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={modalContent.onConfirm}
                                        className="flex-1 py-3 bg-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors"
                                    >
                                        {modalContent.confirmLabel}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
}
