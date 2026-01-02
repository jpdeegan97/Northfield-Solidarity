import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { Terminal, Cpu, Key, Shield, ArrowRight, Activity, Globe, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, USER_ROLES, ROLE_LEVELS } from '../../context/AuthContext';

export default function DeveloperAuth() {
    const { login } = useAuth();
    const [mode, setMode] = useState('login'); // 'login' or 'provision'

    // Auth State
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [authStatus, setAuthStatus] = useState('idle'); // idle, checking, enrolling, processing_enrollment, successfull, success_enrolled
    const [detectedUser, setDetectedUser] = useState(null);

    const [terminalLines, setTerminalLines] = useState([
        '> SYSTEM_INIT...',
        '> ESTABLISHING_SECURE_UPLINK...',
        '> READY.'
    ]);

    const runTerminalSequence = (lines) => {
        let i = 0;
        setTerminalLines([]);
        const interval = setInterval(() => {
            setTerminalLines(prev => [...prev, lines[i]]);
            i++;
            if (i >= lines.length) clearInterval(interval);
        }, 400);
        return () => clearInterval(interval);
    };

    // Terminal typing effect simulation
    useEffect(() => {
        if (mode === 'provision') {
            const lines = [
                '> INITIALIZING_PROVISIONING_SEQUENCE...',
                '> ALLOCATING_VIRTUAL_ENVIRONMENT...',
                '> GENERATING_RSA_KEYS...',
                '> WAITING_FOR_USER_INPUT...'
            ];
            runTerminalSequence(lines);
        } else if (authStatus === 'idle') {
            setTerminalLines([
                '> AUTH_MODULE_LOADED.',
                '> WAITING_FOR_CREDENTIALS...',
                '> ENCRYPTION: AES-256-GCM'
            ]);
        }
    }, [mode]);

    // Status-based terminal effects
    useEffect(() => {
        if (authStatus === 'checking') {
            runTerminalSequence(['> VERIFYING_IDENTITY...', '> QUERYING_LEDGER...', '> CHECKING_PERMISSIONS...']);
        } else if (authStatus === 'enrolling') {
            runTerminalSequence(['> ! WARNING: INSUFFICIENT_PRIVILEGES', '> ROLE_DETECTED: ' + (detectedUser?.role || 'UNKNOWN').toUpperCase(), '> REQUIRED: DEVELOPER+', '> INITIATING_ENROLLMENT_PROTOCOL...']);
        } else if (authStatus === 'processing_enrollment') {
            runTerminalSequence(['> UPDATING_SMART_CONTRACT...', '> MINTING_DEV_LICENSE...', '> ASSIGNING_ACCESS_KEYS...']);
        } else if (authStatus === 'success_authorized') {
            runTerminalSequence(['> ACCESS_GRANTED.', '> PERMISSION_LEVEL: ' + ROLE_LEVELS[detectedUser?.role], '> LOADING_DASHBOARD...']);
        } else if (authStatus === 'success_enrolled') {
            runTerminalSequence(['> ENROLLMENT_COMPLETE.', '> NEW_ROLE: DEVELOPER', '> ACCESS_GRANTED.']);
        }
    }, [authStatus, detectedUser]);

    const handleLogin = (e) => {
        e.preventDefault();
        setAuthStatus('checking');

        setTimeout(() => {
            const user = login(formData.email);
            setDetectedUser(user);

            // Check Permissions
            const userLevel = ROLE_LEVELS[user.role] || 0;
            const requiredLevel = ROLE_LEVELS[USER_ROLES.DEVELOPER];

            if (userLevel < requiredLevel) {
                setAuthStatus('enrolling');
            } else {
                setAuthStatus('success_authorized');
            }
        }, 1500);
    };

    const handleEnrollmentConfirm = () => {
        setAuthStatus('processing_enrollment');
        setTimeout(() => {
            setAuthStatus('success_enrolled');
        }, 2000);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-green-500/30 selection:text-green-500 flex flex-col md:flex-row">

                {/* Left Panel: Auth Forms & Interaction */}
                <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center border-r border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent opacity-50" />

                    <div className="mb-12">
                        <Link to="/developers" className="text-xs text-white/40 hover:text-green-500 mb-6 block uppercase tracking-widest">
                            ← Return to Program
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
                            <span className="text-green-500">//</span> Dev_Console
                        </h1>
                        <p className="text-white/40 text-sm">
                            Northfield Solidarity Developer Environment v2.4.0
                        </p>
                    </div>

                    {/* Logic Render based on Status */}
                    {authStatus === 'idle' || authStatus === 'checking' ? (
                        <>
                            {/* Mode Toggle */}
                            <div className="flex bg-white/5 p-1 rounded-lg mb-8 w-fit border border-white/10">
                                <button
                                    onClick={() => setMode('login')}
                                    className={`px-6 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${mode === 'login' ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'text-white/40 hover:text-white'}`}
                                >
                                    Authenticate
                                </button>
                                <button
                                    onClick={() => setMode('provision')}
                                    className={`px-6 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${mode === 'provision' ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'text-white/40 hover:text-white'}`}
                                >
                                    Provision Node
                                </button>
                            </div>

                            {/* Forms */}
                            <div className="max-w-md w-full">
                                {mode === 'login' ? (
                                    <form className="space-y-6" onSubmit={handleLogin}>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Operator_ID / Email</label>
                                            <div className="relative">
                                                <Cpu className="absolute left-4 top-3 text-white/20" size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-black border border-white/20 rounded p-3 pl-12 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all font-mono placeholder-white/20"
                                                    placeholder="user@domain.crpt"
                                                    disabled={authStatus === 'checking'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Access_Key</label>
                                            <div className="relative">
                                                <Key className="absolute left-4 top-3 text-white/20" size={18} />
                                                <input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className="w-full bg-black border border-white/20 rounded p-3 pl-12 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all font-mono placeholder-••••••••"
                                                    placeholder="••••••••"
                                                    disabled={authStatus === 'checking'}
                                                />
                                            </div>
                                        </div>
                                        <button disabled={authStatus === 'checking'} className="w-full bg-white/5 hover:bg-green-500 hover:text-black border border-white/10 text-white font-bold py-4 rounded transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                                            {authStatus === 'checking' ? 'Verifying...' : 'Init_Session'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                ) : (
                                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Construct_ID</label>
                                                <input type="text" className="w-full bg-black border border-white/20 rounded p-3 text-sm focus:border-green-500 focus:outline-none font-mono" placeholder="Project_Name" />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Region</label>
                                                <select className="w-full bg-black border border-white/20 rounded p-3 text-sm focus:border-green-500 focus:outline-none font-mono text-white/70">
                                                    <option>us-east-1 (N. Virginia)</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Mock Form Content for Provisioning */}
                                        <div className="p-4 bg-white/5 border border-white/10 rounded text-center text-xs text-white/40">
                                            Provisioning Module Pending... Use Auth.
                                        </div>
                                    </form>
                                )}
                            </div>
                        </>
                    ) : authStatus === 'enrolling' ? (
                        <div className="max-w-md w-full border border-yellow-500/20 bg-yellow-500/5 p-8 rounded-lg animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex items-center gap-4 text-yellow-500 mb-6">
                                <AlertTriangle size={32} />
                                <div>
                                    <h3 className="font-bold text-lg">Insufficient Privileges</h3>
                                    <p className="text-xs opacity-70">Current Role: {detectedUser?.role?.toUpperCase()}</p>
                                </div>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed mb-8">
                                The requested environment requires <strong>DEVELOPER</strong> status or higher. Your ID is recognized but lacks the necessary attributes.
                            </p>
                            <div className="space-y-4">
                                <button onClick={handleEnrollmentConfirm} className="w-full bg-yellow-500 text-black font-bold py-4 rounded hover:bg-yellow-400 transition-colors uppercase tracking-widest text-xs">
                                    Enroll in Developer Program
                                </button>
                                <button onClick={() => setAuthStatus('idle')} className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white/50 py-3 rounded transition-colors uppercase tracking-widest text-[10px]">
                                    Cancel Session
                                </button>
                            </div>
                        </div>
                    ) : (authStatus === 'success_authorized' || authStatus === 'success_enrolled' || authStatus === 'processing_enrollment') ? (
                        <div className="max-w-md w-full border border-green-500/20 bg-green-500/5 p-8 rounded-lg animate-in fade-in zoom-in-95 duration-300">
                            {authStatus === 'processing_enrollment' ? (
                                <div className="text-center py-12">
                                    <Activity className="mx-auto text-green-500 animate-pulse mb-4" size={48} />
                                    <div className="text-green-500 font-bold uppercase tracking-widest text-xs">Processing Enrollment...</div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 text-green-500 mb-6">
                                        <CheckCircle size={32} />
                                        <div>
                                            <h3 className="font-bold text-lg">Session Established</h3>
                                            <p className="text-xs opacity-70">Role Verified: {authStatus === 'success_enrolled' ? 'DEVELOPER (NEW)' : detectedUser?.role?.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-black/40 rounded border border-white/10 text-xs font-mono">
                                            <div className="flex justify-between mb-2"><span>SESSION_ID:</span> <span className="text-white/50">0x{Math.random().toString(16).substr(2, 8)}</span></div>
                                            <div className="flex justify-between mb-2"><span>ENCRYPTION:</span> <span className="text-white/50">ENABLED</span></div>
                                            <div className="flex justify-between"><span>NODE:</span> <span className="text-white/50">ACTIVE</span></div>
                                        </div>
                                        <button className="w-full bg-green-500 text-black font-bold py-4 rounded hover:bg-green-400 transition-colors uppercase tracking-widest text-xs">
                                            Enter Dashboard
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : null}

                    <div className="mt-8 pt-8 border-t border-white/5 text-[10px] text-white/30 font-mono text-center">
                        SECURE_CONNECTION :: ENCRYPTED_UPLINK :: VER_2.4.0
                    </div>
                </div>

                {/* Right Panel: Simulated Environment/Terminal */}
                <div className="hidden md:flex w-1/2 bg-[#0a0a0a] relative flex-col border-l border-white/5">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Status Bar */}
                    <div className="bg-black/40 border-b border-white/5 p-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${authStatus === 'idle' ? 'bg-amber-500' : 'bg-green-500'} animate-pulse`}></div>
                                {authStatus === 'idle' ? 'STANDBY' : 'SYSTEM_ACTIVE'}
                            </span>
                            <span>LATENCY: 12ms</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2"><Globe size={10} /> GLOBAL_MESH</span>
                            <span>CPU: 4%</span>
                        </div>
                    </div>

                    {/* Terminal Window */}
                    <div className="flex-1 p-12 overflow-hidden flex flex-col justify-center">
                        <div className="border border-white/10 rounded bg-black/80 backdrop-blur-md p-6 font-mono text-sm shadow-2xl relative overflow-hidden transition-all duration-500">
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-20"></div>
                            <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                            </div>
                            <div className="space-y-2 text-green-500/80 h-32 overflow-y-auto">
                                {terminalLines.map((line, i) => (
                                    <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                        {line}
                                    </div>
                                ))}
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>

                        {/* Decorative Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-8 opacity-50">
                            <div className="p-4 border border-white/5 rounded bg-white/5">
                                <div className="text-[10px] text-white/40 mb-1">ACTIVE NODES</div>
                                <div className="text-xl font-bold text-white">4,092</div>
                            </div>
                            <div className="p-4 border border-white/5 rounded bg-white/5">
                                <div className="text-[10px] text-white/40 mb-1">TOTAL THROUGHPUT</div>
                                <div className="text-xl font-bold text-white">1.2 TB/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
