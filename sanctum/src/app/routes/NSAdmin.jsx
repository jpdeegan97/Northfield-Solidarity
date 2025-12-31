import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import { NS_PROJECTS } from '../../data/projectRegistry';
import { NS_ENGINES, SL_ENGINES } from '../../data/engineRegistry';
import {
    LayoutDashboard,
    Box,
    Cpu,
    Users,
    Settings,
    Activity,
    Shield,
    AlertTriangle,
    Terminal,
    Database,
    Lock,
    Power,
    RefreshCw,
    Send,
    ToggleLeft,
    ToggleRight,
    MessageSquare,
    Save
} from 'lucide-react';

const TAB_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function NSAdmin() {
    const [activeTab, setActiveTab] = useState('overview');

    // --- 1. STATE MANAGEMENT FOR CONTROLS ---
    const [projects, setProjects] = useState(NS_PROJECTS);
    const [engines, setEngines] = useState([...NS_ENGINES, ...SL_ENGINES].map(e => ({ ...e, active: true, health: 100 })));
    const [systemAlertLevel, setSystemAlertLevel] = useState('NORMAL'); // NORMAL, ELEVATED, CRITICAL
    const [broadcastMsg, setBroadcastMsg] = useState('');
    const [featureFlags, setFeatureFlags] = useState({
        betaSim: false,
        deepResearch: true,
        legacyMode: false,
        autoScaling: true
    });
    const [users, setUsers] = useState([
        { id: 1, name: "JP Deegan", role: "Administrator", clearance: 5, status: "Online" },
        { id: 2, name: "System AI", role: "Core Intelligence", clearance: 5, status: "Active" },
        { id: 3, name: "Guest Observer", role: "Observer", clearance: 1, status: "Offline" }
    ]);
    const [logs, setLogs] = useState([
        { id: 1, time: "10:42:15", level: "INFO", msg: "GGP Governance update committed" },
        { id: 2, time: "10:41:03", level: "WARN", msg: "High latency on MUX connector" },
        { id: 3, time: "10:38:59", level: "INFO", msg: "User session authenticated: jpdeegan97" }
    ]);

    // --- UTILITIES ---
    const addLog = (level, msg) => {
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        setLogs(prev => [{ id: Date.now(), time: timeString, level, msg }, ...prev.slice(0, 10)]);
    };

    const toggleEngine = (code) => {
        setEngines(prev => prev.map(e => {
            if (e.code === code) {
                const newState = !e.active;
                addLog('INFO', `Engine ${code} switched ${newState ? 'ONLINE' : 'OFFLINE'}`);
                return { ...e, active: newState };
            }
            return e;
        }));
    };

    const updateProjectStatus = (code, newStatus) => {
        setProjects(prev => prev.map(p => p.code === code ? { ...p, status: newStatus } : p));
        addLog('WARN', `Project ${code} status changed to ${newStatus.toUpperCase()}`);
    };

    const handleCommand = (cmd) => {
        addLog('CMD', `> ${cmd}`);
        if (cmd === 'clear') setLogs([]);
        else if (cmd === 'flush_cache') addLog('SUCCESS', 'System cache purged.');
        else if (cmd === 'lockdown') { setSystemAlertLevel('CRITICAL'); addLog('ALERT', 'LOCKDOWN INITIATED'); }
        else if (cmd === 'normalize') { setSystemAlertLevel('NORMAL'); addLog('INFO', 'System returned to normal.'); }
        else addLog('ERROR', `Unknown command: ${cmd}`);
    };

    // --- RENDERERS ---

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab
                    projects={projects}
                    engines={engines}
                    systemAlertLevel={systemAlertLevel}
                    logs={logs}
                    onCommand={handleCommand}
                    setSystemAlertLevel={setSystemAlertLevel}
                />;
            case 'projects':
                return <ProjectsTab projects={projects} updateStatus={updateProjectStatus} />;
            case 'engines':
                return <EnginesTab engines={engines} toggleEngine={toggleEngine} />;
            case 'users':
                return <UsersTab users={users} setUsers={setUsers} addLog={addLog} />;
            case 'system':
                return <SystemTab
                    flags={featureFlags}
                    setFlags={setFeatureFlags}
                    broadcastMsg={broadcastMsg}
                    setBroadcastMsg={setBroadcastMsg}
                    addLog={addLog}
                />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <Layout>
            <div className={`p-8 min-h-screen font-mono text-white/80 selection:bg-[#00ff9d] selection:text-black transition-colors duration-500
                ${systemAlertLevel === 'CRITICAL' ? 'bg-red-950/20' : ''}
            `}>
                {/* Header Section */}
                <header className="mb-12 border-b border-white/10 pb-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className={`w-8 h-8 ${systemAlertLevel === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-[#00ff9d]'}`} />
                                <h1 className="text-4xl font-bold tracking-tight text-white">NS ADMIN</h1>
                            </div>
                            <p className="text-[#00ff9d] text-sm tracking-[0.2em] font-bold uppercase pl-1">
                                Northfield Solidarity Command Interface
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <StatusIndicator label="SYS" status="online" />
                            <StatusIndicator label="DB" status="online" />
                            <StatusIndicator label="DEFCON" status={systemAlertLevel === 'NORMAL' ? 'online' : systemAlertLevel === 'ELEVATED' ? 'warning' : 'critical'} />
                        </div>
                    </div>
                    {broadcastMsg && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded flex items-center gap-2 animate-pulse">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">{broadcastMsg}</span>
                        </div>
                    )}
                </header>

                {/* Navigation Tabs */}
                <div className="flex gap-6 mb-8 border-b border-white/5 overflow-x-auto">
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={LayoutDashboard} label="Overview" />
                    <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={Box} label="Projects" />
                    <TabButton active={activeTab === 'engines'} onClick={() => setActiveTab('engines')} icon={Cpu} label="Engines" />
                    <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} label="Personnel" />
                    <TabButton active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={Settings} label="System" />
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={TAB_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Layout>
    );
}

// --- SUB-COMPONENTS ---

const StatusIndicator = ({ label, status }) => {
    let color = 'bg-[#00ff9d]';
    if (status === 'warning') color = 'bg-yellow-500';
    if (status === 'critical') color = 'bg-red-500';

    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
            <div className={`w-2 h-2 rounded-full ${color} ${status !== 'online' ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-bold tracking-wider">{label}</span>
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 pb-4 px-2 transition-all relative ${active ? 'text-[#00ff9d]' : 'text-white/40 hover:text-white/70'
            }`}
    >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-bold tracking-wider uppercase whitespace-nowrap">{label}</span>
        {active && <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]" />}
    </button>
);

const Card = ({ title, children, className = '' }) => (
    <div className={`bg-white/5 border border-white/10 rounded p-6 ${className}`}>
        {title && <h3 className="text-xs font-bold tracking-widest text-[#00ff9d] uppercase mb-4 opacity-80">{title}</h3>}
        {children}
    </div>
);

// --- TAB CONTENTS ---

const OverviewTab = ({ projects, engines, systemAlertLevel, setSystemAlertLevel, logs, onCommand }) => {
    const [cmdInput, setCmdInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCommand(cmdInput);
        setCmdInput('');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Total Projects" value={projects.length} icon={Box} />
                <StatCard label="Online Engines" value={engines.filter(e => e.active).length} icon={Cpu} />
                <StatCard label="Alert Level" value={systemAlertLevel} icon={AlertTriangle}
                    color={systemAlertLevel === 'CRITICAL' ? 'text-red-500' : systemAlertLevel === 'ELEVATED' ? 'text-yellow-400' : 'text-[#00ff9d]'}
                />
                <div className="bg-white/5 border border-white/10 p-6 rounded flex flex-col justify-center">
                    <label className="text-xs text-white/40 uppercase tracking-wider mb-2">Set Alert Level</label>
                    <div className="flex gap-2">
                        {['NORMAL', 'ELEVATED', 'CRITICAL'].map(level => (
                            <button
                                key={level}
                                onClick={() => setSystemAlertLevel(level)}
                                className={`h-2 flex-1 rounded-full transition-all ${systemAlertLevel === level
                                    ? level === 'NORMAL' ? 'bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]'
                                        : level === 'ELEVATED' ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]'
                                            : 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                                    : 'bg-white/10 hover:bg-white/20'}`}
                                title={level}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Live Terminal */}
                <Card title="System Terminal" className="font-mono text-xs h-64 flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-2 space-y-1 custom-scrollbar pr-2">
                        {logs.map((log) => (
                            <div key={log.id} className="flex gap-3">
                                <span className="text-white/30 shrink-0">{log.time}</span>
                                <span className={`font-bold shrink-0 w-16 ${log.level === 'INFO' ? 'text-blue-400' :
                                    log.level === 'WARN' ? 'text-yellow-400' :
                                        log.level === 'CMD' ? 'text-purple-400' :
                                            log.level === 'ALERT' ? 'text-red-500' :
                                                log.level === 'SUCCESS' ? 'text-[#00ff9d]' : 'text-red-400'
                                    }`}>{log.level}</span>
                                <span className="text-white/70 break-all">{log.msg}</span>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 pt-2">
                        <span className="text-[#00ff9d]">{'>'}</span>
                        <input
                            type="text"
                            value={cmdInput}
                            onChange={(e) => setCmdInput(e.target.value)}
                            placeholder="Enter system command..."
                            className="bg-transparent border-none outline-none text-white w-full placeholder-white/20"
                        />
                    </form>
                </Card>

                {/* Quick Actions */}
                <Card title="Quick Actions">
                    <div className="grid grid-cols-2 gap-4">
                        <ActionButton icon={Database} label="Flush Cache" onClick={() => onCommand('flush_cache')} />
                        <ActionButton icon={Lock} label="Lockdown" onClick={() => onCommand('lockdown')} />
                        <ActionButton icon={RefreshCw} label="Re-Index Graph" onClick={() => onCommand('reindex_graph')} />
                        <ActionButton icon={Power} label="Restart Core" onClick={() => onCommand('restart_service')} />
                    </div>
                </Card>
            </div>
        </div>
    );
};

const ProjectsTab = ({ projects, updateStatus }) => (
    <div className="grid grid-cols-1 gap-4">
        {projects.map(p => (
            <div key={p.code} className="bg-white/5 border border-white/10 p-4 rounded hover:border-[#00ff9d]/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="font-bold text-white text-lg">{p.name}</h3>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/60 font-mono">{p.code}</span>
                    </div>
                    <p className="text-sm text-white/40 mt-1">{p.oneLiner}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <select
                        value={p.status}
                        onChange={(e) => updateStatus(p.code, e.target.value)}
                        className={`text-[10px] font-bold uppercase px-2 py-1 border rounded bg-black/20 focus:outline-none focus:border-[#00ff9d] cursor-pointer ${p.status === 'Active' ? 'text-[#00ff9d] border-[#00ff9d]/30' : 'text-white/30 border-white/10'
                            }`}>
                        <option value="Ideation">Ideation</option>
                        <option value="Active">Active</option>
                        <option value="Incubator">Incubator</option>
                        <option value="Paused">Paused</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>
            </div>
        ))}
    </div>
);

const EnginesTab = ({ engines, toggleEngine }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engines.map(e => (
            <div key={e.code} className={`bg-white/5 border rounded p-4 flex flex-col justify-between h-56 transition-all ${e.active ? 'border-white/10 hover:border-[#00ff9d]/30' : 'border-red-500/20 opacity-70 grayscale-[0.5]'
                }`}>
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white group-hover:text-[#00ff9d] flex items-center gap-2">
                            {e.code}
                            {!e.active && <span className="text-[10px] text-red-500 bg-red-500/10 px-1 rounded">OFFLINE</span>}
                        </h3>
                        <button onClick={() => toggleEngine(e.code)} className="text-white/20 hover:text-white transition-colors">
                            <Power size={14} />
                        </button>
                    </div>
                    <h4 className="text-sm font-medium text-white/80 mt-1">{e.name}</h4>
                    <p className="text-xs text-white/40 mt-2 line-clamp-3 leading-relaxed">{e.description}</p>
                </div>

                <div className="space-y-3">
                    {/* Resource Sliders (Mock) */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-white/30 uppercase">
                            <span>Compute</span>
                            <span>{e.active ? '65%' : '0%'}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full bg-[#00ff9d] transition-all duration-500`} style={{ width: e.active ? '65%' : '0%' }} />
                        </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-wider text-white/50">{e.category}</span>
                        <div className={`h-1.5 w-1.5 rounded-full ${e.active ? 'bg-[#00ff9d] shadow-[0_0_5px_#00ff9d]' : 'bg-red-500'}`} />
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const UsersTab = ({ users, setUsers, addLog }) => {
    const toggleStatus = (id) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'Online' ? 'Offline' : 'Online';
                addLog('INFO', `User ${u.name} is now ${newStatus}`);
                return { ...u, status: newStatus };
            }
            return u;
        }));
    };

    const changeClearance = (id, delta) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newLevel = Math.max(1, Math.min(5, u.clearance + delta));
                addLog('WARN', `User ${u.name} clearance changed to Level ${newLevel}`);
                return { ...u, clearance: newLevel };
            }
            return u;
        }));
    };

    return (
        <Card title="Personnel Registry">
            <div className="space-y-4">
                {users.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-transparent hover:border-white/10 group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff9d]/20 to-blue-500/20 flex items-center justify-center text-xs font-bold text-white">
                                {u.name.substring(0, 2)}
                            </div>
                            <div>
                                <div className="font-bold text-sm text-white">{u.name}</div>
                                <div className="text-xs text-white/40">{u.role}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Clearance Control */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-white/30 uppercase">Level</span>
                                <div className="flex items-center bg-black/20 rounded border border-white/5">
                                    <button onClick={() => changeClearance(u.id, -1)} className="px-2 py-1 text-white/40 hover:text-white">-</button>
                                    <span className="text-xs w-4 text-center text-[#00ff9d]">{u.clearance}</span>
                                    <button onClick={() => changeClearance(u.id, 1)} className="px-2 py-1 text-white/40 hover:text-white">+</button>
                                </div>
                            </div>

                            {/* Status Toggle */}
                            <button
                                onClick={() => toggleStatus(u.id)}
                                className={`w-2 h-2 rounded-full ring-2 ring-offset-2 ring-offset-black/50 transition-all ${u.status === 'Online' || u.status === 'Active' ? 'bg-[#00ff9d] ring-[#00ff9d]/20' : 'bg-red-500 ring-red-500/20'
                                    }`}
                                title={u.status}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const SystemTab = ({ flags, setFlags, broadcastMsg, setBroadcastMsg, addLog }) => {
    const [msgInput, setMsgInput] = useState('');

    const toggleFlag = (key) => {
        setFlags(prev => {
            const newVal = !prev[key];
            addLog('INFO', `Feature Flag '${key}' set to ${newVal}`);
            return { ...prev, [key]: newVal };
        });
    };

    const handleBroadcast = (e) => {
        e.preventDefault();
        setBroadcastMsg(msgInput);
        addLog('ALERT', `Broadcast sent: "${msgInput}"`);
        setMsgInput('');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Feature Switchboard">
                <div className="space-y-4">
                    {Object.entries(flags).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-white/5 disabled-row:opacity-50">
                            <span className="text-sm text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <button onClick={() => toggleFlag(key)} className={`transition-colors ${val ? 'text-[#00ff9d]' : 'text-white/20'}`}>
                                {val ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            <Card title="Neural Interface Config">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Chat Widget Active</span>
                        <ToggleWithLocalStorage keyName="ns_chat_active" onToggle={(val) => addLog('INFO', `Chat Widget is now ${val ? 'Active' : 'Inactive'}`)} />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">System Prompt</label>
                        <PromptEditor onSave={(val) => addLog('SUCCESS', 'System Prompt updated')} />
                    </div>
                </div>
            </Card>

            <div className="space-y-6">
                <Card title="Emergency Broadcast">
                    <form onSubmit={handleBroadcast} className="flex gap-2">
                        <input
                            type="text"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Type system alert..."
                            className="flex-1 bg-black/20 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#00ff9d] outline-none"
                        />
                        <button type="submit" className="p-2 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded hover:bg-[#00ff9d]/20">
                            <Send size={16} />
                        </button>
                    </form>
                    {broadcastMsg && (
                        <div className="mt-4 flex justify-between items-center text-xs text-yellow-500 bg-yellow-500/5 p-2 rounded border border-yellow-500/10">
                            <span>Active: "{broadcastMsg}"</span>
                            <button onClick={() => setBroadcastMsg('')} className="hover:text-white">Clear</button>
                        </div>
                    )}
                </Card>

                <Card title="Data Persistence">
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-[#00ff9d]/30 text-xs font-bold uppercase">
                            <Save size={14} /> Backup Config
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold uppercase transition-colors">
                            <AlertTriangle size={14} /> Purge All
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// --- HELPERS ---
const StatCard = ({ label, value, icon: Icon, color = 'text-[#00ff9d]' }) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded flex items-center gap-4">
        <div className={`w-12 h-12 rounded bg-white/5 flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <div className={`text-2xl font-bold ${color === 'text-[#00ff9d]' ? 'text-white' : color}`}>{value}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">{label}</div>
        </div>
    </div>
);

const ActionButton = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-[#00ff9d]/50 hover:text-[#00ff9d] transition-all group cursor-pointer active:scale-95">
        <Icon className="w-6 h-6 mb-2 text-white/60 group-hover:text-[#00ff9d]" />
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </button>
);

const ToggleWithLocalStorage = ({ keyName, onToggle }) => {
    const [val, setVal] = useState(localStorage.getItem(keyName) !== 'false');

    return (
        <button onClick={() => {
            const newVal = !val;
            setVal(newVal);
            localStorage.setItem(keyName, newVal);
            window.dispatchEvent(new Event('storage'));
            if (onToggle) onToggle(newVal);
        }} className={`transition-colors ${val ? 'text-[#00ff9d]' : 'text-white/20'}`}>
            {val ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
        </button>
    );
};

const PromptEditor = ({ onSave }) => {
    const defaultPrompt = "You are the AI interface for Northfield Solidarity, a sovereign equity management system.";
    const [val, setVal] = useState(localStorage.getItem('ns_chat_prompt') || defaultPrompt);

    const handleSave = () => {
        localStorage.setItem('ns_chat_prompt', val);
        window.dispatchEvent(new Event('storage'));
        if (onSave) onSave(val);
    };

    return (
        <div className="flex gap-2">
            <textarea
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="flex-1 bg-black/20 border border-white/10 rounded p-2 text-xs text-white/80 h-24 focus:border-[#00ff9d] outline-none resize-none"
            />
            <button onClick={handleSave} className="self-end p-2 bg-[#00ff9d]/10 text-[#00ff9d] rounded hover:bg-[#00ff9d]/20 transition-colors">
                <Save size={16} />
            </button>
        </div>
    );
};
