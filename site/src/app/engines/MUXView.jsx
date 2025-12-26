import React, { useState } from 'react';

// Mock Data: Integration Feeds
const CONNECTORS = [
    { id: 'C-01', name: 'OpenAI API', status: 'ONLINE', latency: '240ms', uptime: '99.9%', traffic: 'High' },
    { id: 'C-02', name: 'Solana RPC', status: 'DEGRADED', latency: '850ms', uptime: '98.5%', traffic: 'Med' },
    { id: 'C-03', name: 'AWS S3', status: 'ONLINE', latency: '45ms', uptime: '99.99%', traffic: 'Low' },
    { id: 'C-04', name: 'Twitter Firehose', status: 'OFFLINE', latency: '-', uptime: '0%', traffic: 'None' },
];

const REQUEST_LOG = [
    { id: 'REQ-9942', service: 'OpenAI', type: 'POST /v1/chat', status: '200 OK', duration: '120ms', time: '1s ago' },
    { id: 'REQ-9941', service: 'Solana', type: 'getBalance', status: '200 OK', duration: '450ms', time: '2s ago' },
    { id: 'REQ-9940', service: 'Internal', type: 'EVENT_BUS_PUSH', status: '500 ERR', duration: '900ms', time: '5s ago' },
    { id: 'REQ-9939', service: 'OpenAI', type: 'GET /v1/models', status: '200 OK', duration: '110ms', time: '8s ago' },
];

export default function MUXView({ engine }) {
    const [selectedConnector, setSelectedConnector] = useState(CONNECTORS[0]);

    // Theme: Cyan/Blue for Connectivity/Transport/Pipelines
    const THEME = {
        primary: 'text-cyan-400',
        bg: 'bg-cyan-500',
        border: 'border-cyan-500/50',
        hoverBorder: 'hover:border-cyan-500/50',
        glow: 'shadow-[0_0_10px_rgba(34,211,238,0.2)]',
        bgSoft: 'bg-cyan-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Connectors Status */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[60vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Active Channels
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">GW: ONLINE</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {CONNECTORS.map((conn) => {
                            const isSelected = selectedConnector.id === conn.id;
                            const statusColor = conn.status === 'ONLINE' ? 'text-emerald-400' :
                                conn.status === 'DEGRADED' ? 'text-amber-400' : 'text-red-400';

                            return (
                                <div
                                    key={conn.id}
                                    onClick={() => setSelectedConnector(conn)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-200">{conn.name}</h4>
                                        <span className={`text-[9px] px-1 rounded font-bold ${statusColor} bg-white/5`}>{conn.status}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-white/30 uppercase">Latency</span>
                                            <span className="text-xs font-mono text-white/80">{conn.latency}</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[9px] text-white/30 uppercase">Uptime</span>
                                            <span className="text-xs font-mono text-emerald-400">{conn.uptime}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Network Graph Node (Placeholder) */}
            <div className="flex-1"></div>

            {/* RIGHT: Live Traffic Log */}
            <div className="pointer-events-auto flex flex-col gap-4 w-[28rem]">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 h-full max-h-[70vh]">
                    <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-4 flex justify-between items-center">
                        Traffic Log
                        <div className="flex gap-2 text-[9px] font-mono text-white/40">
                            <span>IN: 4.2 MB/s</span>
                            <span>OUT: 1.1 MB/s</span>
                        </div>
                    </h3>

                    <div className="border border-white/5 rounded bg-black/40 overflow-hidden font-mono text-[10px]">
                        <div className="flex bg-white/5 p-2 text-white/30 font-bold border-b border-white/5">
                            <div className="w-16">TIME</div>
                            <div className="w-20">SERVICE</div>
                            <div className="flex-1">METHOD</div>
                            <div className="w-16 text-right">STATUS</div>
                        </div>
                        <div className="flex flex-col max-h-64 overflow-y-auto">
                            {REQUEST_LOG.map((req) => (
                                <div key={req.id} className="flex p-2 hover:bg-white/5 border-b border-white/5 last:border-0">
                                    <div className="w-16 text-white/40">{req.time}</div>
                                    <div className="w-20 text-cyan-300 truncate">{req.service}</div>
                                    <div className="flex-1 text-white/70 truncate pr-2">{req.type}</div>
                                    <div className={`w-16 text-right font-bold ${req.status.startsWith('2') ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {req.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 rounded border border-white/5">
                            <div className="text-[9px] text-white/40 uppercase mb-1">Total Requests (24h)</div>
                            <div className="text-lg font-mono text-white">1,402,995</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded border border-white/5">
                            <div className="text-[9px] text-white/40 uppercase mb-1">Error Rate</div>
                            <div className="text-lg font-mono text-emerald-400">0.02%</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
