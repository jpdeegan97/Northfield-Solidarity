import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, GitBranch, Lock } from 'lucide-react';

export default function AegisView({ engine }) {
    const [dependencies] = useState([
        { id: 'DEP-001', name: 'Auth-Core-v2', status: 'SECURE', risk: 'LOW', coverage: '94%' },
        { id: 'DEP-042', name: 'Legacy-Payment-Gateway', status: 'VULNERABLE', risk: 'HIGH', coverage: '12%' },
        { id: 'DEP-099', name: 'React-Router-Dom', status: 'STABLE', risk: 'NONE', coverage: '100%' },
        { id: 'DEP-104', name: 'GGP-Policy-Bundle', status: 'AUDITING', risk: 'MED', coverage: '67%' },
    ]);

    return (
        <div className="h-full w-full bg-[#050505] text-white p-8 font-mono overflow-auto custom-scrollbar">
            <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-emerald-400" size={24} />
                    <h1 className="text-2xl font-bold tracking-widest">AEGIS CONTROL PLANE</h1>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40 uppercase tracking-widest">
                    <span>Dependency Management</span>
                    <span>•</span>
                    <span>Vulnerability Scanning: ACTIVE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Total Managed Deps</div>
                    <div className="text-3xl font-bold text-white">1,402</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <div className="text-[10px] text-red-400 uppercase tracking-wider mb-2">Critical Vulnerabilities</div>
                    <div className="text-3xl font-bold text-red-500 flex items-center gap-3">
                        3 <AlertTriangle size={20} />
                    </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg">
                    <div className="text-[10px] text-emerald-400 uppercase tracking-wider mb-2">Policy Compliance</div>
                    <div className="text-3xl font-bold text-emerald-400">98.2%</div>
                </div>
            </div>

            <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider">Dependency Graph Audit</h3>
                    <button className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">Run Scan</button>
                </div>
                <div className="divide-y divide-white/5">
                    {dependencies.map(dep => (
                        <div key={dep.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded ${dep.status === 'VULNERABLE' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40'}`}>
                                    <GitBranch size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{dep.name}</div>
                                    <div className="text-[10px] text-white/30">{dep.id}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-[10px] text-white/30 uppercase">Risk Level</div>
                                    <div className={`text-xs font-bold ${dep.risk === 'HIGH' ? 'text-red-500' : dep.risk === 'MED' ? 'text-yellow-500' : 'text-emerald-500'}`}>{dep.risk}</div>
                                </div>
                                <div className="text-right w-20">
                                    <div className="text-[10px] text-white/30 uppercase">Test Coverage</div>
                                    <div className="text-xs font-bold text-white">{dep.coverage}</div>
                                </div>
                                <div className="flex items-center gap-2 w-24 justify-end">
                                    {dep.status === 'SECURE' && <CheckCircle size={16} className="text-emerald-500" />}
                                    {dep.status === 'VULNERABLE' && <Lock size={16} className="text-red-500" />}
                                    <span className={`text-[10px] font-bold ${dep.status === 'VULNERABLE' ? 'text-red-500' : 'text-white/60'}`}>{dep.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
