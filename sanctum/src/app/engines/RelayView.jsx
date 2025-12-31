import React from 'react';
import { Radio, Activity, Wifi, ArrowRight } from 'lucide-react';

export default function RelayView() {
    const nodes = [
        { id: 'RLY-NORTH', status: 'ACTIVE', latency: '12ms', load: '45%', ip: '10.0.4.12' },
        { id: 'RLY-SOUTH', status: 'IDLE', latency: '24ms', load: '12%', ip: '10.0.4.88' },
        { id: 'RLY-EAST', status: 'ACTIVE', latency: '45ms', load: '89%', ip: '10.0.4.156' },
        { id: 'RLY-WEST', status: 'WARN', latency: '154ms', load: '94%', ip: '10.0.4.201' },
    ];

    return (
        <div className="h-full w-full bg-[#080808] text-white p-8 font-mono">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full animate-pulse">
                        <Radio className="text-blue-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-blue-500">RELAY</h1>
                        <p className="text-xs text-white/40 uppercase tracking-[0.3em]">Network Mesh & Signal Transport</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-white">4.2 Gbps</div>
                    <div className="text-[10px] text-white/30 uppercase">Aggregate Throughput</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visualizer Placeholder */}
                <div className="bg-black border border-white/10 rounded-xl p-8 relative overflow-hidden group min-h-[300px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] opacity-50" />
                    <div className="grid grid-cols-2 gap-12 relative z-10 w-full max-w-sm">
                        {nodes.map((node, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${node.status === 'WARN' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'}`} />
                                <div className="h-px w-24 bg-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 rotate-45" />
                                <span className="text-[10px] font-bold">{node.id}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-4 left-4 text-[10px] text-white/30">
                        MESH TOPOLOGY: FULLY CONNECTED
                    </div>
                </div>

                {/* Node List */}
                <div className="space-y-4">
                    {nodes.map(node => (
                        <div key={node.id} className="bg-white/5 border border-white/5 p-4 rounded-lg flex items-center justify-between hover:border-blue-500/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <Wifi size={18} className={node.status === 'WARN' ? 'text-amber-500' : 'text-blue-500'} />
                                <div>
                                    <div className="font-bold text-sm tracking-wider">{node.id}</div>
                                    <div className="text-[10px] text-white/30 flex gap-2">
                                        <span>IP: {node.ip}</span>
                                        <span className={node.status === 'WARN' ? 'text-amber-500' : 'text-emerald-500'}>{node.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 text-right">
                                <div>
                                    <div className="text-[9px] text-white/30 uppercase">Latency</div>
                                    <div className="font-mono text-xs">{node.latency}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] text-white/30 uppercase">Load</div>
                                    <div className="font-mono text-xs">{node.load}</div>
                                </div>
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 text-blue-400" />
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-4 border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 text-xs font-bold uppercase tracking-widest rounded-lg transition-all">
                        + Provision New Node
                    </button>
                </div>
            </div>
        </div>
    );
}
