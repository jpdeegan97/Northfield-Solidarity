import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Zap, Activity, ArrowRight, Globe, Server, Shield, RefreshCw, Terminal, Wifi } from 'lucide-react';

export default function RELAYView({ engine }) {
    const [activeTab, setActiveTab] = useState('PIPELINES');
    const [isListening, setIsListening] = useState(true);
    const [events, setEvents] = useState([]);

    // Mock Data for Pipelines
    const pipelines = [
        { id: 'RL-001', name: 'Stripe Webhooks -> Ledger', status: 'ACTIVE', latency: '24ms', events: '1.2k/m', type: 'INGRESS' },
        { id: 'RL-002', name: 'User Events -> Analytics', status: 'ACTIVE', latency: '12ms', events: '4.5k/m', type: 'INGRESS' },
        { id: 'RL-003', name: 'System Alerts -> PagerDuty', status: 'IDLE', latency: '--', events: '0/m', type: 'EGRESS' },
        { id: 'RL-004', name: 'Order Sync -> Fulfillment', status: 'WARN', latency: '145ms', events: '320/m', type: 'INTERNAL' },
    ];

    // Mock Live Event Feed
    useEffect(() => {
        if (!isListening) return;
        const interval = setInterval(() => {
            const types = ['WEBHOOK', 'API_CALL', 'SYNC_EVENT', 'SYSTEM_SIGNAL'];
            const statuses = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'PENDING', 'FAILED'];
            const newEvent = {
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toLocaleTimeString(),
                type: types[Math.floor(Math.random() * types.length)],
                source: 'EXT_GATEWAY',
                target: 'CORE_SVC',
                status: statuses[Math.floor(Math.random() * statuses.length)],
                size: Math.floor(Math.random() * 500) + 'b'
            };
            setEvents(prev => [newEvent, ...prev].slice(0, 20));
        }, 1500);
        return () => clearInterval(interval);
    }, [isListening]);

    return (
        <div className="flex flex-col h-full w-full bg-[#050505] text-white font-sans overflow-hidden relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                        <Radio size={24} className="text-amber-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">RELAY</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-amber-500/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">v2.1.0</span>
                            <span className="text-white/30 text-xs font-mono tracking-widest uppercase">Universal Event Bus</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Total Throughput</span>
                        <span className="text-xl font-mono text-amber-500">5.8k <span className="text-sm text-white/50">evt/m</span></span>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <button
                        onClick={() => setIsListening(!isListening)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${isListening ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-white/5 border-white/10 text-white/40'}`}
                    >
                        <Wifi size={14} className={isListening ? 'animate-pulse' : ''} />
                        <span className="text-xs font-bold">{isListening ? 'LIVE' : 'PAUSED'}</span>
                    </button>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-0 relative z-10">

                {/* Left: Pipelines */}
                <div className="lg:col-span-2 border-r border-white/10 flex flex-col bg-black/20">
                    {/* Toolbar */}
                    <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4">
                        {['PIPELINES', 'SOURCES', 'DESTINATIONS', 'RULES'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-full px-2 text-[10px] font-bold tracking-wider border-b-2 transition-colors ${activeTab === tab ? 'border-amber-500 text-white' : 'border-transparent text-white/40 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 overflow-y-auto">
                        {activeTab === 'PIPELINES' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pipelines.map(pipe => (
                                    <motion.div
                                        key={pipe.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[#0f0f0f] border border-white/5 hover:border-amber-500/30 rounded-lg p-4 group transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-md ${pipe.type === 'INGRESS' ? 'bg-blue-500/10 text-blue-500' : pipe.type === 'EGRESS' ? 'bg-purple-500/10 text-purple-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                    {pipe.type === 'INGRESS' ? <Globe size={14} /> : pipe.type === 'EGRESS' ? <Server size={14} /> : <RefreshCw size={14} />}
                                                </div>
                                                <span className="text-xs font-mono text-white/30">{pipe.id}</span>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded text-[9px] font-bold border ${pipe.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                pipe.status === 'WARN' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    'bg-white/5 text-white/30 border-white/10'
                                                }`}>
                                                {pipe.status}
                                            </div>
                                        </div>

                                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{pipe.name}</h3>

                                        <div className="flex items-center gap-2 w-full my-3">
                                            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white/20 relative overflow-hidden"
                                                    style={{ width: '60%' }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_1s_infinite]" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                                            <span className="flex items-center gap-1"><Activity size={10} /> {pipe.latency}</span>
                                            <span className="flex items-center gap-1"><Zap size={10} /> {pipe.events}</span>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Add New Placeholder */}
                                <div className="bg-[#0f0f0f] border border-white/5 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-white/20 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer min-h-[140px]">
                                    <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center mb-2">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-xs font-bold tracking-widest uppercase">New Pipeline</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'SOURCES' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: 'Stripe', type: 'PAYMENT', status: 'CONNECTED', lastSync: '12s ago' },
                                    { name: 'Segment', type: 'CDP', status: 'CONNECTED', lastSync: '1s ago' },
                                    { name: 'AWS SNS', type: 'INFRA', status: 'CONNECTED', lastSync: '5m ago' },
                                    { name: 'Salesforce', type: 'CRM', status: 'ERROR', lastSync: '4h ago' },
                                    { name: 'Postgres CDC', type: 'DB', status: 'CONNECTED', lastSync: '22ms ago' },
                                ].map((source, i) => (
                                    <motion.div
                                        key={source.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#0f0f0f] border border-white/5 p-4 rounded-lg flex flex-col gap-3 hover:border-white/20 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-white/50 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors">
                                                {source.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${source.status === 'CONNECTED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white">{source.name}</h4>
                                            <p className="text-[10px] text-white/40">{source.type} • {source.status}</p>
                                        </div>
                                        <div className="mt-auto border-t border-white/5 pt-2 flex justify-between items-center bg-transparent">
                                            <span className="text-[9px] text-white/30 font-mono">SYNC: {source.lastSync}</span>
                                            <RefreshCw size={10} className="text-white/20 group-hover:text-white/60" />
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="bg-[#0f0f0f] border border-white/5 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all cursor-pointer min-h-[140px]">
                                    <Plus size={20} className="mb-2 opacity-50" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Add Source</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'DESTINATIONS' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: 'Snowflake', type: 'WAREHOUSE', status: 'CONNECTED', latency: '400ms' },
                                    { name: 'Slack', type: 'NOTIFICATIONS', status: 'CONNECTED', latency: '60ms' },
                                    { name: 'BigQuery', type: 'WAREHOUSE', status: 'IDLE', latency: '--' },
                                    { name: 'S3 Archive', type: 'STORAGE', status: 'CONNECTED', latency: '120ms' },
                                ].map((dest, i) => (
                                    <motion.div
                                        key={dest.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#0f0f0f] border border-white/5 p-4 rounded-lg flex flex-col gap-3 hover:border-white/20 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-white/50 group-hover:bg-purple-500/20 group-hover:text-purple-500 transition-colors">
                                                {dest.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className={`px-2 py-0.5 rounded text-[9px] font-bold border ${dest.status === 'CONNECTED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-white/5 text-white/30 border-white/10'}`}>
                                                {dest.status}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white">{dest.name}</h4>
                                            <p className="text-[10px] text-white/40">{dest.type}</p>
                                        </div>
                                        <div className="mt-auto border-t border-white/5 pt-2 flex justify-between items-center bg-transparent">
                                            <span className="text-[9px] text-white/30 font-mono">LATENCY: {dest.latency}</span>
                                            <Activity size={10} className="text-white/20 group-hover:text-white/60" />
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="bg-[#0f0f0f] border border-white/5 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all cursor-pointer min-h-[140px]">
                                    <Plus size={20} className="mb-2 opacity-50" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Add Destination</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'RULES' && (
                            <div className="space-y-2">
                                {[
                                    { name: 'PII Redaction', type: 'TRANSFORM', desc: 'Masks emails and credit card numbers from raw payloads.', active: true, executed: '1.2m' },
                                    { name: 'Geo-Enrichment', type: 'ENRICH', desc: 'Adds city/country based on IP address.', active: true, executed: '890k' },
                                    { name: 'Deduplication', type: 'LIFECYCLE', desc: 'Drops events with duplicate IDs within 10s window.', active: false, executed: '0' },
                                    { name: 'Block Suspicious IPs', type: 'SECURITY', desc: 'Drops requests from deny-listed IP subnets.', active: true, executed: '45k' },
                                ].map((rule, i) => (
                                    <motion.div
                                        key={rule.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#0f0f0f] border border-white/5 p-4 rounded-lg flex items-center justify-between hover:bg-white/5 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col items-center justify-center w-10">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={rule.active} readOnly className="sr-only peer" />
                                                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                                                </label>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-sm text-white">{rule.name}</h4>
                                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">{rule.type}</span>
                                                </div>
                                                <p className="text-xs text-white/40">{rule.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-mono text-white/50">{rule.executed}</div>
                                            <div className="text-[9px] text-white/20 uppercase tracking-widest">Executions</div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div className="p-4 border border-white/5 border-dashed rounded-lg flex items-center justify-center gap-2 text-white/20 hover:text-white cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all">
                                    <Plus size={16} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Create New Rule</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Live Stream */}
                <div className="bg-[#080808] flex flex-col border-l border-white/10">
                    <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-black/20">
                        <div className="flex items-center gap-2 text-amber-500">
                            <Terminal size={14} />
                            <span className="text-[10px] font-bold tracking-wider uppercase">Event Stream</span>
                        </div>
                        <button className="text-white/20 hover:text-white p-1"><Shield size={14} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-2 custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {events.map((evt) => (
                                <motion.div
                                    key={evt.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-3 rounded border border-white/5 bg-white/5 hover:bg-white/10 group cursor-default"
                                >
                                    <div className="flex justify-between items-center mb-1 opacity-50">
                                        <span>{evt.timestamp}</span>
                                        <span>{evt.id}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${evt.status === 'SUCCESS' ? 'bg-emerald-500' :
                                            evt.status === 'FAILED' ? 'bg-red-500' : 'bg-amber-500'
                                            }`} />
                                        <span className={`font-bold ${evt.status === 'SUCCESS' ? 'text-emerald-400' :
                                            evt.status === 'FAILED' ? 'text-red-400' : 'text-amber-400'
                                            }`}>{evt.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <span>{evt.source}</span>
                                        <ArrowRight size={8} />
                                        <span>{evt.target}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {events.length === 0 && (
                            <div className="text-center mt-20 text-white/20 italic">
                                Waiting for signals...
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
