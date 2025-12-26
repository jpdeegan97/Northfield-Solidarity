import React, { useState } from 'react';

// Mock Data: Telemetry
const LOG_STREAM = [
    { id: 'LOG-9004', time: '14:02:11.450', level: 'INFO', service: 'FLO_LEDGER', msg: 'Reconciliation check passed', traceId: 'trc-1a2b' },
    { id: 'LOG-9003', time: '14:02:10.112', level: 'WARN', service: 'MUX_API', msg: 'Rate limit approaching (85%)', traceId: 'trc-2342' },
    { id: 'LOG-9002', time: '14:01:55.901', level: 'ERROR', service: 'IDN_AUTH', msg: 'Token validation failure: Expired', traceId: 'trc-9988' },
    { id: 'LOG-9001', time: '14:01:50.005', level: 'INFO', service: 'SIG_INGEST', msg: 'Batch 442 processed successfully', traceId: 'trc-7761' },
];

const METRICS = [
    { name: 'Global Error Rate (5m)', value: '0.04%', status: 'HEALTHY' },
    { name: 'P99 Latency (API)', value: '210ms', status: 'WARNING' },
    { name: 'Active Traces', value: '1,442', status: 'HEALTHY' },
    { name: 'Evidence Blobs', value: '45.2GB', status: 'HEALTHY' },
];

const ACTIVE_INCIDENTS = [
    { id: 'INC-2025-004', title: 'High Latency in EU-West', status: 'INVESTIGATING', sev: 'SEV-2', owner: 'SRE_BOT' },
];

export default function LUMView({ engine }) {

    // Theme: "White Glass" - Prismatic, Clean, High Visibility
    // Using white/glass aesthetic to signify "Light/Illumination" (Observability)
    const THEME = {
        primary: 'text-white',
        bg: 'bg-white/10',
        border: 'border-white/20',
        hoverBorder: 'hover:border-white/50',
        glow: 'shadow-[0_0_20px_rgba(255,255,255,0.15)]',
        glass: 'backdrop-blur-xl bg-white/5'
    };

    const [selectedLog, setSelectedLog] = useState(LOG_STREAM[0]);

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Observability Signal Stream */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className={`rounded-lg border border-white/10 p-4 flex flex-col max-h-[70vh] ${THEME.glass}`}>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h3 className={`text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]`} />
                            Luminance Stream
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">LIVE</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2 no-scrollbar">
                        {LOG_STREAM.map((log) => {
                            const isSelected = selectedLog.id === log.id;
                            const levelColor = log.level === 'ERROR' ? 'text-red-400' :
                                log.level === 'WARN' ? 'text-yellow-400' : 'text-emerald-400';

                            return (
                                <div
                                    key={log.id}
                                    onClick={() => setSelectedLog(log)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all duration-200 group
                                        ${isSelected
                                            ? `bg-white/10 border-white/40 ${THEME.glow}`
                                            : `bg-transparent border-transparent hover:bg-white/5 ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-1 font-mono text-[9px] text-white/30">
                                        <span>{log.time}</span>
                                        <span>{log.service}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[9px] font-bold ${levelColor}`}>{log.level}</span>
                                        <span className="text-xs text-white truncate">{log.msg}</span>
                                    </div>
                                    <div className="text-[9px] text-white/20 font-mono text-right">{log.traceId}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Metric / Trace Visualization Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center opacity-80 pointer-events-auto">
                {/* This could be a D3/Canvas trace explorer or metric graph later */}
                <div className="relative w-full max-w-2xl text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-3xl rounded-full" />
                    <h2 className="text-4xl font-light text-white/20 tracking-widest relative z-10">
                        {selectedLog.traceId}
                    </h2>
                </div>
            </div>

            {/* RIGHT: Health & Incidents */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* Top: Incident Console */}
                <div className={`rounded-lg border border-white/10 p-5 ${THEME.glass}`}>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Active Incidents</h3>
                    {ACTIVE_INCIDENTS.map((inc) => (
                        <div key={inc.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded hover:border-red-500/50 cursor-pointer transition-colors mb-2">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-red-300">{inc.sev}</span>
                                <span className="text-[9px] text-white/40">{inc.owner}</span>
                            </div>
                            <div className="text-xs font-bold text-white mb-1">{inc.title}</div>
                            <div className="text-[9px] text-white/60 font-mono">{inc.status}</div>
                        </div>
                    ))}
                    {ACTIVE_INCIDENTS.length === 0 && (
                        <div className="text-xs text-emerald-400 text-center py-4 border border-dashed border-white/10 rounded">
                            All Systems Nominal
                        </div>
                    )}
                </div>

                {/* Bottom: SLI/SLO Metrics */}
                <div className={`rounded-lg border border-white/10 p-5 flex-1 ${THEME.glass}`}>
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">System Health</h3>
                    <div className="space-y-4">
                        {METRICS.map((metric, i) => (
                            <div key={i} className="flex justify-between items-center pb-2 border-b border-white/5 last:border-0">
                                <div>
                                    <div className="text-[10px] text-white/60 uppercase">{metric.name}</div>
                                    <div className="text-lg font-mono text-white font-light">{metric.value}</div>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${metric.status === 'HEALTHY' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-yellow-500 shadow-[0_0_8px_#eab308]'}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
