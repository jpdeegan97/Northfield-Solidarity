import React, { useState } from 'react';
import {
    Globe, Shield, Terminal, Activity, Server, Key,
    Settings, Plus, Search
} from 'lucide-react';

const SERVICES = [
    { id: 'srv_01', name: 'payment-service', version: 'v1.2.0', status: 'HEALTHY', routes: 12, rpm: 450, errorRate: '0.01%' },
    { id: 'srv_02', name: 'user-identity', version: 'v2.0.1', status: 'HEALTHY', routes: 8, rpm: 1200, errorRate: '0.00%' },
    { id: 'srv_03', name: 'notification-gateway', version: 'v1.0.5', status: 'DEGRADED', routes: 4, rpm: 85, errorRate: '2.4%' },
];

const ROUTES = [
    { id: 'rt_01', method: 'POST', path: '/v1/charges', service: 'payment-service', policy: 'strict-financial' },
    { id: 'rt_02', method: 'GET', path: '/v1/users/:id', service: 'user-identity', policy: 'public-read' },
    { id: 'rt_03', method: 'POST', path: '/v1/users', service: 'user-identity', policy: 'admin-write' },
];

// Registered Public Key for the primary Storefront integration
// This is simulating a properly stored key from a secure vault
const REGISTERED_PUBLIC_KEY = 'pk_live_ns_8x92m4k5n7p2q9r3s5t8v1w0z_ver_2';

const CONSUMERS = [
    { id: 'con_01', name: 'Storefront App', keyPrefix: REGISTERED_PUBLIC_KEY, quota: '1000/min', usage: '45%' },
    { id: 'con_02', name: 'Analytics Worker', keyPrefix: 'sk_live_9p2q... (restricted)', quota: '5000/min', usage: '12%' },
];

const LOGS = [
    { time: '10:42:01', method: 'POST', path: '/v1/charges', status: 200, latency: '120ms', consumer: 'Storefront App' },
    { time: '10:42:05', method: 'GET', path: '/v1/users/u_123', status: 200, latency: '45ms', consumer: 'Storefront App' },
    { time: '10:42:08', method: 'POST', path: '/v1/notify', status: 429, latency: '8ms', consumer: 'Unknown' },
    { time: '10:42:15', method: 'POST', path: '/v1/charges', status: 200, latency: '115ms', consumer: 'Storefront App' },
];

export default function APMView({ engine }) {
    const [activeTab, setActiveTab] = useState('SERVICES'); // SERVICES | ROUTES | CONSUMERS | LOGS
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div className="absolute inset-0 w-full h-full flex bg-[#0f172a] text-slate-300 font-sans">

            {/* LEFT SIDEBAR: Navigation */}
            <div className="w-64 border-r border-white/10 bg-[#0f172a] flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Shield className="text-blue-500" />
                        {engine?.code || 'APM'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{engine?.name || 'Policy & Gateway Manager'}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavButton icon={Server} label="Services" active={activeTab === 'SERVICES'} onClick={() => setActiveTab('SERVICES')} />
                    <NavButton icon={Globe} label="Routes" active={activeTab === 'ROUTES'} onClick={() => setActiveTab('ROUTES')} />
                    <NavButton icon={Key} label="Consumers" active={activeTab === 'CONSUMERS'} onClick={() => setActiveTab('CONSUMERS')} />
                    <NavButton icon={Terminal} label="Live Traffic" active={activeTab === 'LOGS'} onClick={() => setActiveTab('LOGS')} />
                    <NavButton icon={Settings} label="Global Config" active={activeTab === 'CONFIG'} onClick={() => setActiveTab('CONFIG')} />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg flex items-center gap-3">
                        <Activity size={18} className="text-blue-400" />
                        <div>
                            <div className="text-xs font-bold text-blue-400">System Healthy</div>
                            <div className="text-[10px] text-blue-400/60">Gateway latency: 12ms</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/50">
                {/* Header Toolbar */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0f172a]/80 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-white">
                        {activeTab === 'SERVICES' && 'Service Registry'}
                        {activeTab === 'ROUTES' && 'Route Definitions'}
                        {activeTab === 'CONSUMERS' && 'Consumer Credentials'}
                        {activeTab === 'LOGS' && 'Live Traffic Inspector'}
                        {activeTab === 'CONFIG' && 'Global Policies'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-slate-800 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white focus:border-blue-500 outline-none w-64 transition-all"
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-colors">
                            <Plus size={14} />
                            {activeTab === 'SERVICES' ? 'Register Service' : activeTab === 'ROUTES' ? 'Add Route' : 'New Item'}
                        </button>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-auto p-6">
                    {activeTab === 'SERVICES' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SERVICES.map(svc => (
                                <div key={svc.id} onClick={() => setSelectedService(svc)}>
                                    <ServiceCard service={svc} />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ROUTES' && (
                        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0f172a]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-slate-400 font-medium border-b border-white/10">
                                    <tr>
                                        <th className="p-4">Method</th>
                                        <th className="p-4">Path Pattern</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Policy</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {ROUTES.map(route => (
                                        <tr key={route.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono font-bold text-blue-400">{route.method}</td>
                                            <td className="p-4 font-mono text-slate-300">{route.path}</td>
                                            <td className="p-4 text-slate-400">{route.service}</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-white/10">{route.policy}</span></td>
                                            <td className="p-4 text-right">
                                                <button className="text-slate-500 hover:text-white transition-colors"><Settings size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'LOGS' && (
                        <div className="border border-white/10 rounded-lg overflow-hidden bg-black font-mono text-sm">
                            <div className="bg-slate-800/50 p-2 border-b border-white/10 text-xs text-slate-500 flex justify-between">
                                <span>Live Stream (Tail)</span>
                                <span>Updated just now</span>
                            </div>
                            {LOGS.map((log, i) => (
                                <div key={i} className="p-3 border-b border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                    <span className="text-slate-500 w-20">{log.time}</span>
                                    <span className={`w-12 font-bold ${log.method === 'GET' ? 'text-blue-400' : 'text-green-400'}`}>{log.method}</span>
                                    <span className="flex-1 text-slate-300">{log.path}</span>
                                    <span className={`w-16 text-right ${log.status >= 400 ? 'text-red-400' : 'text-green-400'}`}>{log.status}</span>
                                    <span className="w-20 text-right text-slate-500">{log.latency}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'CONSUMERS' && (
                        <div className="grid gap-4">
                            {CONSUMERS.map(con => (
                                <div key={con.id} className="bg-[#0f172a] border border-white/10 p-4 rounded-lg flex items-center justify-between hover:border-blue-500/50 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{con.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">{con.id}</span>
                                            <span className="font-mono text-xs text-slate-500">{con.keyPrefix}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-500 text-xs uppercase">Quota</span>
                                            <span className="text-white font-mono">{con.quota}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-slate-500 text-xs uppercase">Usage</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: con.usage }}></div>
                                                </div>
                                                <span className="text-white font-mono">{con.usage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SIDEBAR: Inspector (Optional) */}
            {selectedService && (
                <div className="w-80 border-l border-white/10 bg-[#0f172a] p-6 flex flex-col absolute right-0 top-0 bottom-0 shadow-2xl z-20">
                    <button className="absolute top-4 right-4 text-slate-500 hover:text-white" onClick={() => setSelectedService(null)}>
                        &times;
                    </button>
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20">
                            <Server className="text-blue-500" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">{selectedService.name}</h2>
                        <span className="text-xs font-mono text-slate-500">{selectedService.id}</span>
                    </div>

                    <div className="space-y-6">
                        <StatGroup label="Target Version" value={selectedService.version} />
                        <StatGroup label="Throughput" value={selectedService.rpm + ' RPM'} />
                        <StatGroup label="Error Rate" value={selectedService.errorRate} warning={parseFloat(selectedService.errorRate) > 1} />

                        <div className="pt-6 border-t border-white/10">
                            <h4 className="text-sm font-bold text-white mb-3">Upstreams</h4>
                            <div className="space-y-2">
                                <div className="p-2 bg-slate-800 rounded text-xs font-mono text-slate-300 flex justify-between">
                                    <span>us-east-1a</span>
                                    <span className="text-green-400">ONLINE</span>
                                </div>
                                <div className="p-2 bg-slate-800 rounded text-xs font-mono text-slate-300 flex justify-between">
                                    <span>us-east-1b</span>
                                    <span className="text-green-400">ONLINE</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-md text-sm font-bold border border-white/10 transition-colors">
                            Manage Config
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const NavButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all
            ${active
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
        `}
    >
        <Icon size={16} />
        {label}
    </button>
);

const ServiceCard = ({ service }) => (
    <div className="bg-[#0f172a] border border-white/10 rounded-lg p-5 hover:border-blue-500/50 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-800 rounded-md group-hover:bg-blue-500/20 transition-colors">
                <Server size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className={`px-2 py-1 rounded text-[10px] font-bold border ${service.status === 'HEALTHY' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                {service.status}
            </span>
        </div>

        <h3 className="text-white font-bold text-lg mb-1">{service.name}</h3>
        <p className="text-xs text-slate-500 font-mono mb-4">{service.version}</p>

        <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/5 pt-3">
            <div>
                <span className="text-slate-500 block">Routes</span>
                <span className="text-slate-300 font-mono">{service.routes}</span>
            </div>
            <div>
                <span className="text-slate-500 block">RPM</span>
                <span className="text-slate-300 font-mono">{service.rpm}</span>
            </div>
        </div>
    </div>
);

const StatGroup = ({ label, value, warning }) => (
    <div>
        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">{label}</span>
        <span className={`text-lg font-mono font-bold ${warning ? 'text-amber-400' : 'text-white'}`}>{value}</span>
    </div>
);
