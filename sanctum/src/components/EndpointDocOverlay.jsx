import React from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Play, Server, Code, FileJson, CheckCircle } from 'lucide-react';

const ENDPOINT_DOCS = {
    'GET /v1/sentiment/ticker': {
        method: 'GET',
        path: '/v1/sentiment/ticker',
        desc: 'Retrieve real-time sentiment analysis for a specific ticker symbol based on aggregated social media data.',
        params: [
            { name: 'symbol', type: 'string', required: true, desc: 'The ticker symbol (e.g., AAPL, BTC)' },
            { name: 'interval', type: 'string', required: false, desc: 'Time interval for aggregation (1m, 5m, 1h)' },
            { name: 'source', type: 'string', required: false, desc: 'Filter by source (twitter, reddit, all)' }
        ],
        response: {
            "symbol": "BTC",
            "score": 0.85,
            "volume": 12450,
            "sentiment": "BULLISH",
            "sources": { "twitter": 8000, "reddit": 4450 },
            "timestamp": "2024-10-24T14:30:00Z"
        }
    },
    'WSS /stream/social-spikes': {
        method: 'WSS',
        path: '/stream/social-spikes',
        desc: 'Websocket stream pushing alerts when social volume or sentiment deviates by > 2 sigma.',
        params: [
            { name: 'threshold', type: 'float', required: false, desc: 'Z-score threshold for alerts (default: 2.0)' },
            { name: 'assets', type: 'array', required: false, desc: 'List of assets to subscribe to' }
        ],
        response: {
            "type": "SPIKE_ALERT",
            "symbol": "GME",
            "deviation": 3.4,
            "sentiment_shift": -0.4,
            "url": "https://..."
        }
    },
    // Default fallback
    'DEFAULT': {
        method: 'API',
        path: '/unknown',
        desc: 'Documentation for this endpoint is currently being indexed by the documentation engine.',
        params: [],
        response: { "status": "pending_documentation" }
    }
};

export default function EndpointDocOverlay({ endpoint, onClose, accentColor = '#00ff9d' }) {
    // Basic parser to find matching doc or use default
    const doc = ENDPOINT_DOCS[endpoint] || {
        ...ENDPOINT_DOCS['DEFAULT'],
        path: endpoint,
        method: endpoint.split(' ')[0] // Guess method from string "GET /foo"
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-3xl bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#141414]">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <Server size={24} style={{ color: accentColor }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/60 border border-white/10">
                                    {doc.method}
                                </span>
                                <span className="text-xs text-white/40 uppercase tracking-widest">Endpoint Reference</span>
                            </div>
                            <h2 className="text-xl font-bold text-white font-mono">{doc.path}</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 font-mono">

                    {/* Description */}
                    <div>
                        <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Description</h3>
                        <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                            {doc.desc}
                        </p>
                    </div>

                    {/* Parameters */}
                    <div>
                        <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Request Parameters</h3>
                        {doc.params && doc.params.length > 0 ? (
                            <div className="border border-white/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-white/50">
                                        <tr>
                                            <th className="p-3 font-medium text-xs uppercase">Name</th>
                                            <th className="p-3 font-medium text-xs uppercase">Type</th>
                                            <th className="p-3 font-medium text-xs uppercase">Required</th>
                                            <th className="p-3 font-medium text-xs uppercase">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {doc.params.map((param, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="p-3 text-white font-bold">{param.name}</td>
                                                <td className="p-3 text-fuchsia-400">{param.type}</td>
                                                <td className="p-3">
                                                    {param.required ? (
                                                        <span className="text-[10px] text-red-400 border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 rounded">YES</span>
                                                    ) : (
                                                        <span className="text-[10px] text-white/30">NO</span>
                                                    )}
                                                </td>
                                                <td className="p-3 text-white/60">{param.desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-white/30 italic text-sm p-4 bg-white/5 rounded border border-white/5 border-dashed">
                                No parameters required.
                            </div>
                        )}
                    </div>

                    {/* Response Example */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest">Response Example</h3>
                            <button className="text-[10px] flex items-center gap-1 text-white/40 hover:text-white transition-colors">
                                <Copy size={12} /> Copy JSON
                            </button>
                        </div>
                        <div className="relative group">
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded font-bold border border-emerald-500/30">
                                    200 OK
                                </div>
                            </div>
                            <pre className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 text-xs text-blue-300 overflow-x-auto custom-scrollbar">
                                <code>{JSON.stringify(doc.response, null, 2)}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="p-6 border-t border-white/10 bg-[#141414] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-white/10 border border-[#141414] flex items-center justify-center text-[8px] text-white/40">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] text-white/30">Used by 12 other projects</span>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition-all hover:border-white/30 group">
                        <Play size={14} className="group-hover:text-emerald-400 transition-colors" /> Run Test Request
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
