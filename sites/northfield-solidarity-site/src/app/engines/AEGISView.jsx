import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Package, Lock, Search, RefreshCw } from 'lucide-react';

export default function AEGISView() {
    const [activeTab, setActiveTab] = useState('DEPENDENCIES');
    const [scanProgress, setScanProgress] = useState(100);
    const [isScanning, setIsScanning] = useState(false);

    // Mock Data
    const dependencies = [
        { name: 'react', version: '18.2.0', license: 'MIT', risk: 'LOW', usage: 'Core' },
        { name: 'framer-motion', version: '10.12.4', license: 'MIT', risk: 'LOW', usage: 'UI Animation' },
        { name: 'lucide-react', version: '0.263.1', license: 'ISC', risk: 'LOW', usage: 'Icons' },
        { name: 'axios', version: '1.4.0', license: 'MIT', risk: 'LOW', usage: 'Network' },
        { name: 'lodash', version: '4.17.21', license: 'MIT', risk: 'MEDIUM', usage: 'Utils', alert: 'CVE-2023-1234' },
        { name: 'moment', version: '2.29.4', license: 'MIT', risk: 'LOW', usage: 'Legacy Dates' },
    ];

    const alerts = [
        { id: 'CVE-2023-1234', pkg: 'lodash', severity: 'MEDIUM', desc: 'Prototype pollution in utility function.', date: '2023-10-12' },
        { id: 'LIC-001', pkg: 'gpl-package-x', severity: 'HIGH', desc: 'GPL v3 detected in proprietary module.', date: '2023-11-01' },
    ];

    const licenseStats = [
        { type: 'MIT', count: 45, color: 'bg-emerald-500' },
        { type: 'Apache 2.0', count: 12, color: 'bg-blue-500' },
        { type: 'ISC', count: 5, color: 'bg-indigo-500' },
        { type: 'BSD-3-Clause', count: 3, color: 'bg-cyan-500' },
        { type: 'UNLICENSED', count: 1, color: 'bg-red-500' },
    ];

    const handleScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#030906] text-white font-sans overflow-hidden relative">
            {/* Matrix/Code Rain Background Effect (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[#030906]/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <Shield size={24} className="text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            AEGIS
                            <span className="text-[10px] bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">PROTECTED</span>
                        </h1>
                        <p className="text-emerald-500/50 text-xs font-mono tracking-widest uppercase mt-0.5">Dependency Management & Graph</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Packages Scanned</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-mono text-emerald-500">2,408</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <button
                        onClick={handleScan}
                        disabled={isScanning}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-xs tracking-wide transition-all
                            ${isScanning ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50'}
                        `}
                    >
                        {isScanning ? (
                            <>
                                <RefreshCw size={14} className="animate-spin" />
                                SCANNING {scanProgress}%
                            </>
                        ) : (
                            <>
                                <Search size={14} />
                                DEEP SCAN
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-row min-h-0 relative z-10">

                {/* Sidebar Navigation */}
                <div className="w-64 flex-none border-r border-white/10 bg-black/20 flex flex-col py-4">
                    {['DEPENDENCIES', 'GRAPH', 'LICENSES', 'ALERTS', 'POLICIES'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                w-full text-left px-6 py-3 text-[10px] font-bold tracking-widest uppercase transition-all border-l-2
                                ${activeTab === tab
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500'
                                    : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                {tab}
                                {tab === 'ALERTS' && alerts.length > 0 && <span className="w-2 h-2 rounded-full bg-red-500" />}
                            </div>
                        </button>
                    ))}

                    <div className="mt-auto px-6 pb-4">
                        <div className="p-4 rounded-xl bg-[#0a110f] border border-white/5">
                            <h4 className="text-xs font-bold text-white mb-2">Health Score</h4>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-3xl font-mono text-emerald-500">98</span>
                                <span className="text-xs text-white/30 mb-1">/100</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[98%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#050a08] flex flex-col overflow-hidden relative">

                    {activeTab === 'DEPENDENCIES' && (
                        <div className="flex flex-col h-full">
                            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-white">Dependency Inventory</h2>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Filter packages..." className="bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/20 w-64 focus:outline-none focus:border-emerald-500/50" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto p-6">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] uppercase text-white/30 tracking-wider">
                                            <th className="pb-4 font-normal">Package Name</th>
                                            <th className="pb-4 font-normal">Version</th>
                                            <th className="pb-4 font-normal">License</th>
                                            <th className="pb-4 font-normal">Usage</th>
                                            <th className="pb-4 font-normal text-right">Risk Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {dependencies.map((dep, i) => (
                                            <motion.tr
                                                key={dep.name}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="py-3 pr-4 font-mono text-emerald-200 font-medium group-hover:text-emerald-400 flex items-center gap-2">
                                                    <Package size={14} className="opacity-50" />
                                                    {dep.name}
                                                    {dep.alert && <AlertTriangle size={12} className="text-amber-500" />}
                                                </td>
                                                <td className="py-3 text-white/50 font-mono text-xs">{dep.version}</td>
                                                <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/10 text-white/70">{dep.license}</span></td>
                                                <td className="py-3 text-white/50 text-xs">{dep.usage}</td>
                                                <td className="py-3 text-right">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dep.risk === 'LOW' ? 'text-emerald-500 bg-emerald-500/10' :
                                                        dep.risk === 'MEDIUM' ? 'text-amber-500 bg-amber-500/10' : 'text-red-500 bg-red-500/10'
                                                        }`}>
                                                        {dep.risk}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'GRAPH' && (
                        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-[#050a08] to-black">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Enhanced Graph Visualization */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-full h-full max-w-4xl max-h-[600px] flex items-center justify-center"
                                >
                                    {/* Central Node */}
                                    <div className="absolute z-30 flex flex-col items-center group cursor-pointer">
                                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-emerald-500/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                            <Shield size={40} className="text-emerald-400" />
                                        </div>
                                        <span className="mt-3 font-bold text-white text-sm tracking-wider bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur">APPLICATION ROOT</span>
                                    </div>

                                    {/* Orbiting Nodes (Enhanced positions and connection lines) */}
                                    {[
                                        { angle: 0, dist: 180, label: 'Auth Service', color: 'bg-blue-500', icon: Lock },
                                        { angle: 72, dist: 220, label: 'UI Library', color: 'bg-purple-500', icon: Package },
                                        { angle: 144, dist: 200, label: 'Data Layer', color: 'bg-amber-500', icon: RefreshCw },
                                        { angle: 216, dist: 240, label: 'Analytics', color: 'bg-red-500', icon: Search },
                                        { angle: 288, dist: 190, label: 'Payment Gateway', color: 'bg-indigo-500', icon: Shield },
                                    ].map((node, i) => {
                                        // Calculate position based on angle and distance (Polar to Cartesian)
                                        const rad = (node.angle * Math.PI) / 180;
                                        const x = Math.cos(rad) * node.dist;
                                        const y = Math.sin(rad) * node.dist;

                                        return (
                                            <React.Fragment key={i}>
                                                {/* Connecting Line */}
                                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                                                    <motion.line
                                                        x1="50%"
                                                        y1="50%"
                                                        x2={`calc(50% + ${x}px)`}
                                                        y2={`calc(50% + ${y}px)`}
                                                        stroke="white"
                                                        strokeWidth="1"
                                                        strokeDasharray="4,4"
                                                        className="opacity-30"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                    />
                                                </svg>

                                                {/* Node */}
                                                <motion.div
                                                    className="absolute top-1/2 left-1/2 -ml-6 -mt-6 z-20 flex flex-col items-center cursor-pointer group"
                                                    initial={{ opacity: 0, scale: 0, x: x, y: y }}
                                                    animate={{ opacity: 1, scale: 1, x: x, y: y }}
                                                    transition={{ delay: i * 0.1, type: 'spring' }}
                                                >
                                                    <div className={`w-12 h-12 rounded-full ${node.color} flex items-center justify-center border-4 border-black shadow-lg group-hover:scale-125 transition-transform`}>
                                                        <node.icon size={18} className="text-white" />
                                                    </div>
                                                    <span className="mt-2 text-[10px] text-white/50 font-bold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">{node.label}</span>
                                                </motion.div>
                                            </React.Fragment>
                                        );
                                    })}
                                </motion.div>
                            </div>
                            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur border border-white/10 p-4 rounded-xl text-xs text-white/50 shadow-2xl">
                                <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-[10px]">Legend</h5>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Core Application</div>
                                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Authentication</div>
                                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Interface</div>
                                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Data Services</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'POLICIES' && (
                        <div className="p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Governance Policies</h2>
                                    <p className="text-white/40 text-xs mt-1">Automated compliance checks run on every build.</p>
                                </div>
                                <button className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center gap-2">
                                    <Shield size={14} />
                                    RUN AUDIT
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {[
                                    { name: 'No GPL Licenses', status: 'PASS', score: '100%', desc: 'Ensures no virally licensed code enters the proprietary codebase.' },
                                    { name: 'Semantic Versioning', status: 'WARN', score: '92%', desc: 'Checks that all internal packages follow semver standards.' },
                                    { name: 'Peer Dependency Check', status: 'PASS', score: '100%', desc: 'Validates that all peer dependencies are met by the host app.' },
                                    { name: 'Security Audit', status: 'FAIL', score: '85%', desc: 'Runs npm audit and fails on HIGH/CRITICAL vulnerabilities.' },
                                    { name: 'Bundle Size Limits', status: 'PASS', score: '100%', desc: 'Enforces max bundle size of 200kb for initial chunks.' },
                                    { name: 'Deprecated Packages', status: 'PASS', score: '100%', desc: 'Scans for usage of packages marked as deprecated in registry.' },
                                ].map((policy, i) => (
                                    <motion.div
                                        key={policy.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#0a110f] border border-white/5 p-5 rounded-xl hover:border-white/10 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-white text-sm">{policy.name}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${policy.status === 'PASS' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                policy.status === 'WARN' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                {policy.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/50 mb-4 h-8">{policy.desc}</p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${policy.status === 'PASS' ? 'bg-emerald-500' :
                                                        policy.status === 'WARN' ? 'bg-amber-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: policy.score }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-white/40">{policy.score}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'LICENSES' && (
                        <div className="p-8 grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-6">License Distribution</h3>
                                <div className="space-y-4">
                                    {licenseStats.map((stat, i) => (
                                        <div key={stat.type} className="group">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-sm text-white/80 font-mono">{stat.type}</span>
                                                <span className="text-xs text-white/40">{stat.count} pkgs</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(stat.count / 66) * 100}%` }}
                                                    className={`h-full ${stat.color} group-hover:brightness-110 transition-all`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl border border-white/5 p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Lock size={18} className="text-emerald-500" />
                                    Compliance Policy
                                </h3>
                                <div className="space-y-3">
                                    {['MIT', 'ISC', 'Apache-2.0', 'BSD-3-Clause'].map(lic => (
                                        <div key={lic} className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                                            <span className="text-sm font-mono text-white/60">{lic}</span>
                                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ALLOWED</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                                        <span className="text-sm font-mono text-white/60">GPL-3.0</span>
                                        <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">BLOCKED</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                                        <span className="text-sm font-mono text-white/60">AGPL-3.0</span>
                                        <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">BLOCKED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ALERTS' && (
                        <div className="p-6">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-start gap-4">
                                <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-red-400 mb-1">Critical Vulnerabilities Detected</h3>
                                    <p className="text-sm text-red-200/60">2 packages contain vulnerabilities that exceed acceptable risk thresholds. Immediate action recommended.</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {alerts.map(alert => (
                                    <div key={alert.id} className="bg-[#0a110f] border border-white/5 p-4 rounded-lg flex gap-4 hover:border-white/20 transition-all">
                                        <div className={`w-1 h-auto rounded-full ${alert.severity === 'HIGH' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                                    {alert.pkg}
                                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/50">{alert.id}</span>
                                                </h4>
                                                <span className="text-[10px] text-white/30">{alert.date}</span>
                                            </div>
                                            <p className="text-sm text-white/60">{alert.desc}</p>
                                        </div>
                                        <button className="px-3 py-1.5 h-fit text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white transition-colors">
                                            RESOLVE
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}


