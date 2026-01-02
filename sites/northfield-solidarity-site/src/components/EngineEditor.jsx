import React, { useState, useEffect } from 'react';

function generateMockCode(engine) {
    return `
# ${engine.name} (${engine.code}) - Core Logic
import northfield.core as ns
from northfield.protocols import ${engine.category}

class ${engine.code}Controller(ns.BaseController):
    """
    ${engine.description || 'Controller logic'}
    """
    def __init__(self):
        super().__init__(power_level=0.8)
        self.status = "NOMINAL"
        
    def execute_cycle(self, context):
        # Neural link optimization
        if context.signal_strength > 0.9:
            self.optimize_throughput()
            
        return {
            "status": self.status,
            "metrics": self.collect_telemetry()
        }

    def optimize_throughput(self):
        # Auto-generated stub
        pass
`.trim();
}

export default function EngineEditor({ engine, onClose }) {
    const [isDirty, setIsDirty] = useState(false);
    const [activeTab, setActiveTab] = useState('config'); // config | code
    const [codeContent, setCodeContent] = useState(generateMockCode(engine));
    const [config, setConfig] = useState({
        powerLevel: 80,
        safeMode: true,
        autoCommit: true,
        modules: [
            { id: 'mod_core', name: 'Core Logic', status: 'optimal', active: true },
            { id: 'mod_net', name: 'Network Gateway', status: 'optimal', active: true },
            { id: 'mod_log', name: 'Audit Logger', status: 'warning', active: true },
            { id: 'mod_sync', name: 'State Sync', status: 'offline', active: false },
        ]
    });

    const [logs, setLogs] = useState([
        { ts: '09:00:01', msg: 'System initialized.' },
        { ts: '09:00:05', msg: 'Core logic loaded.' },
    ]);

    // Simulate logs
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newLog = {
                    ts: new Date().toISOString().split('T')[1].split('.')[0],
                    msg: `Heartbeat check: ${Math.random() > 0.5 ? 'OK' : 'LATENCY_SPIKE'}`
                };
                setLogs(prev => [newLog, ...prev].slice(0, 10));
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleModule = (id) => {
        setConfig(prev => ({
            ...prev,
            modules: prev.modules.map(m => m.id === id ? { ...m, active: !m.active } : m)
        }));
        setIsDirty(true);
        addLog(`Module ${id} toggled.`);
    };

    const updatePower = (val) => {
        setConfig(prev => ({ ...prev, powerLevel: val }));
        setIsDirty(true);
    };

    const addLog = (msg) => {
        setLogs(prev => [{ ts: new Date().toISOString().split('T')[1].split('.')[0], msg }, ...prev].slice(0, 10));
    };

    const handleDeploy = () => {
        addLog('initiating_deployment_sequence...');
        setTimeout(() => {
            if (config.autoCommit) {
                addLog('git_commit: "feat: update engine configuration"');
                addLog('git_push: origin main... OK');
            }
            addLog('DEPLOYMENT_SUCCESSFUL');
            setIsDirty(false);
        }, 1500);
    };

    return (
        <div className="absolute inset-0 bg-[#0a0a0a] text-white font-mono flex flex-col pointer-events-auto overflow-hidden">
            {/* Header */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="font-bold text-[#00ff9d]">{engine.code}</span>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold tracking-widest">{engine.name.toUpperCase()}</h2>
                        <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isDirty ? 'bg-yellow-400 animate-pulse' : 'bg-[#00ff9d]'}`} />
                            <span className="text-[10px] text-white/40 uppercase">
                                {isDirty ? 'Unsaved Changes' : 'All Systems Nominal'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1 border border-white/5">
                        <span className="text-[10px] text-white/40">VERSION</span>
                        <span className="text-xs font-bold text-white">v2.4.0</span>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded transition-colors">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: Sidebar (Context-aware) */}
                <div className="w-1/3 border-r border-white/10 bg-black/20 relative p-6 flex flex-col">
                    <h3 className="text-xs font-bold text-white/40 mb-6 tracking-widest">
                        {activeTab === 'code' ? 'PROJECT FILES' : 'BLUEPRINT'}
                    </h3>

                    {activeTab === 'code' ? (
                        <div className="flex-1 flex flex-col gap-2">
                            {['src/core_logic.py', 'src/network_gateway.py', 'src/utils/logger.py', 'config/manifest.json', 'README.md'].map(file => (
                                <div key={file} className={`
                                    flex items-center gap-2 p-2 rounded cursor-pointer transition-colors
                                    ${file === 'src/core_logic.py' ? 'bg-[#00ff9d]/10 text-[#00ff9d]' : 'text-white/40 hover:text-white hover:bg-white/5'}
                                `}>
                                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span className="text-xs font-mono">{file}</span>
                                </div>
                            ))}

                            <div className="mt-auto p-4 rounded bg-white/5 border border-white/5">
                                <div className="text-[9px] text-white/30 uppercase mb-2">Editor Context</div>
                                <div className="text-xs font-bold text-white">{engine.category} Protocol</div>
                                <div className="text-[10px] text-white/50">{engine.code}-001</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Visual Representation of Engine */}
                            <div className="flex-1 flex items-center justify-center relative">
                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-10 pointer-events-none">
                                    {[...Array(36)].map((_, i) => <div key={i} className="border border-[#00ff9d]" />)}
                                </div>

                                {/* Core Engine Graphic */}
                                <div className="relative w-48 h-48 border border-[#00ff9d]/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                    <div className="w-32 h-32 border border-[#00ff9d]/60 rounded-full flex items-center justify-center border-dashed" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl font-bold text-[#00ff9d] opacity-20">{config.powerLevel}%</div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-white/5 p-3 rounded border border-white/5">
                                    <div className="text-[9px] text-white/40">UPTIME</div>
                                    <div className="text-lg font-bold text-white">99.9%</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded border border-white/5">
                                    <div className="text-[9px] text-white/40">LATENCY</div>
                                    <div className="text-lg font-bold text-white">12ms</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* MIDDLE: Tuning / Mechanic Deck */}
                <div className="flex-1 flex flex-col bg-[#050505]">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10 bg-black/40">
                        {['config', 'code'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-6 py-3 text-xs font-bold tracking-widest border-r border-white/10 transition-colors
                                    ${activeTab === tab ? 'bg-white/5 text-white shadow-inner' : 'text-white/40 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor View */}
                {activeTab === 'code' && (
                    <div className="flex-1 relative bg-[#0d0d0d] flex overflow-hidden">
                        {/* Line Numbers */}
                        <div className="w-10 bg-[#111] border-r border-white/5 flex flex-col items-end pr-2 py-4 text-white/20 select-none font-mono text-xs leading-6">
                            {[...Array(20)].map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        {/* Code Area */}
                        <textarea
                            value={codeContent}
                            onChange={(e) => { setCodeContent(e.target.value); setIsDirty(true); }}
                            className="flex-1 bg-transparent text-[#a3a3a3] font-mono text-xs leading-6 p-4 outline-none resize-none selection:bg-[#00ff9d]/20"
                            spellCheck="false"
                        />
                    </div>
                )}

                {/* Config View */}
                {activeTab === 'config' && (
                    <div className="p-6 overflow-y-auto flex-1">
                        <h3 className="text-xs font-bold text-white/40 mb-6 tracking-widest flex items-center gap-2">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            CONFIGURATION
                        </h3>

                        {/* Power Slider */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] uppercase font-bold text-white/60">Power Output</label>
                                <span className="text-[10px] text-[#00ff9d] font-bold">{config.powerLevel}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={config.powerLevel}
                                onChange={(e) => updatePower(parseInt(e.target.value))}
                                className="w-full accent-[#00ff9d] h-1 bg-white/20 rounded cursor-pointer appearance-none"
                            />
                            <div className="flex justify-between mt-1 px-1">
                                <div className="w-px h-2 bg-white/20" />
                                <div className="w-px h-2 bg-white/20" />
                                <div className="w-px h-2 bg-white/20" />
                                <div className="w-px h-2 bg-white/20" />
                                <div className="w-px h-2 bg-white/20" />
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="mb-8 p-4 bg-white/5 rounded border border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-xs font-bold text-white">Safe Mode</div>
                                    <div className="text-[9px] text-white/40">Prevents destructive state resets</div>
                                </div>
                                <button
                                    onClick={() => { setConfig(p => ({ ...p, safeMode: !p.safeMode })); setIsDirty(true); }}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${config.safeMode ? 'bg-[#00ff9d]' : 'bg-white/20'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${config.safeMode ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-white">Auto-Commit</div>
                                    <div className="text-[9px] text-white/40">Push changes to git on deploy</div>
                                </div>
                                <button
                                    onClick={() => { setConfig(p => ({ ...p, autoCommit: !p.autoCommit })); setIsDirty(true); }}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${config.autoCommit ? 'bg-blue-500' : 'bg-white/20'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.autoCommit ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Modules (Parts List) */}
                        <h3 className="text-xs font-bold text-white/40 mb-4 tracking-widest mt-8">INSTALLED MODULES</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {config.modules.map(mod => (
                                <div
                                    key={mod.id}
                                    onClick={() => toggleModule(mod.id)}
                                    className={`
                                        p-3 rounded border flex items-center justify-between cursor-pointer transition-all
                                        ${mod.active
                                            ? 'bg-white/5 border-white/10 hover:border-white/30'
                                            : 'opacity-50 border-transparent hover:opacity-100'}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${mod.active ? 'bg-[#00ff9d] shadow-[0_0_8px_rgba(0,255,157,0.5)]' : 'bg-red-500'}`} />
                                        <div className="text-xs font-bold">{mod.name}</div>
                                    </div>
                                    <div className="text-[9px] font-mono text-white/40">{mod.status.toUpperCase()}</div>
                                </div>
                            ))}
                            {/* Add Module Button */}
                            <div className="p-3 rounded border border-white/5 border-dashed flex items-center justify-center text-white/20 text-[10px] hover:text-[#00ff9d] hover:border-[#00ff9d]/30 cursor-pointer transition-all">
                                + INSTALL NEW MODULE
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="mt-auto p-4 border-t border-white/10 bg-black/40 backdrop-blur flex justify-between items-center">
                    <div className="text-[9px] text-white/30">
                        {isDirty ? 'CHANGES PENDING...' : 'SYSTEM SYNCED'}
                    </div>
                    <button
                        onClick={handleDeploy}
                        disabled={!isDirty}
                        className={`
                                px-6 py-2 rounded font-bold text-xs tracking-widest transition-all flex items-center gap-2
                                ${isDirty
                                ? 'bg-[#00ff9d] text-black hover:bg-[#00ff9d]/80 shadow-[0_0_20px_rgba(0,255,157,0.3)]'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'}
                            `}
                    >
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        {config.autoCommit ? 'COMMIT & DEPLOY' : 'DEPLOY ONLY'}
                    </button>
                </div>
            </div>

            {/* RIGHT: Logs */}
            <div className="w-64 border-l border-white/10 bg-[#050505] flex flex-col font-mono text-[10px]">
                <div className="p-2 border-b border-white/10 text-white/30 font-bold bg-white/5">SYSTEM LOG</div>
                <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1.5 opacity-80">
                            <span className="text-white/30 mr-2">[{log.ts}]</span>
                            <span className={log.msg.includes('red') ? 'text-red-400' : 'text-[#00ff9d]'}>
                                {log.msg} &gt;_
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
