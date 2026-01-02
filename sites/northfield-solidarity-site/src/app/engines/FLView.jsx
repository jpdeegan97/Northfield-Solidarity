import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Monitor, Cpu, Play, Settings, Database, Activity } from 'lucide-react';

export default function FLView({ engine }) {
    const [selectedPreset, setSelectedPreset] = useState('REALISTIC');
    const [quality, setQuality] = useState('HIGH');
    const [isStreaming, setIsStreaming] = useState(false);

    const [dataStreams, setDataStreams] = useState({
        financials: true,
        traffic: false,
        inventory: true,
        sentiment: false
    });

    const presets = [
        { id: 'REALISTIC', label: 'Photorealistic', desc: 'High fidelity ray-tracing' },
        { id: 'SCHEMATIC', label: 'Schematic', desc: 'Blueprint & wireframe mode' },
        { id: 'NOIR', label: 'Data Noir', desc: 'High contrast aesthetic' },
        { id: 'LOWPOLY', label: 'Low Poly', desc: 'Performance optimized' }
    ];

    const toggleStream = (key) => {
        setDataStreams(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col h-full w-full p-8 bg-[#0a0a0a] text-white font-sans overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                        <Box size={24} className="text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-wide">FANTASY LAND</h1>
                        <p className="text-white/40 text-xs font-mono mt-1">UNREAL ENGINE 5 // INTERACTIVE SURFACE</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-mono text-white/50">{isStreaming ? 'STREAM ONLINE' : 'DISCONNECTED'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* Left Panel: Configuration */}
                <div className="flex flex-col gap-6 lg:col-span-1 overflow-y-auto pr-2 custom-scrollbar">

                    {/* Data Integration */}
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-4 text-purple-400">
                            <Database size={16} />
                            <h3 className="text-sm font-bold uppercase tracking-wider">Data Integration</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {Object.entries(dataStreams).map(([key, active]) => (
                                <div
                                    key={key}
                                    onClick={() => toggleStream(key)}
                                    className={`
                                        flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
                                        ${active ? 'bg-purple-500/10 border-purple-500/40' : 'bg-black/20 border-white/5 hover:bg-white/5'}
                                    `}
                                >
                                    <span className="text-sm capitalize text-white/80">{key}</span>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${active ? 'bg-purple-500' : 'bg-white/10'}`}>
                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-4.5' : 'left-0.5'}`} style={{ left: active ? '18px' : '2px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rendering Options */}
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-center gap-2 mb-4 text-purple-400">
                            <Monitor size={16} />
                            <h3 className="text-sm font-bold uppercase tracking-wider">Rendering Style</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map(preset => (
                                <div
                                    key={preset.id}
                                    onClick={() => setSelectedPreset(preset.id)}
                                    className={`
                                        p-3 rounded-lg border text-left cursor-pointer transition-all
                                        ${selectedPreset === preset.id ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-black/20 border-white/5 text-white/50 hover:bg-white/5'}
                                    `}
                                >
                                    <div className="text-xs font-bold mb-1">{preset.label}</div>
                                    <div className="text-[10px] opacity-60 leading-tight">{preset.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                            <label className="text-[10px] uppercase text-white/40 font-bold mb-2 block">Quality Target</label>
                            <div className="flex bg-black/40 rounded p-1 border border-white/5">
                                {['LOW', 'MED', 'HIGH', 'ULTRA'].map(q => (
                                    <button
                                        key={q}
                                        onClick={() => setQuality(q)}
                                        className={`
                                            flex-1 py-1 text-[10px] font-mono rounded transition-colors
                                            ${quality === q ? 'bg-purple-500 text-white font-bold' : 'text-white/30 hover:bg-white/10'}
                                        `}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Launch Control */}
                    <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`
                            p-4 rounded-xl border flex items-center justify-center gap-2 font-bold tracking-widest transition-all
                            ${isStreaming
                                ? 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20'
                                : 'bg-purple-500 hover:bg-purple-400 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'}
                        `}
                    >
                        {isStreaming ? (
                            <>
                                <Activity size={18} />
                                TERMINATE SESSION
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                LAUNCH UNREAL CLIENT
                            </>
                        )}
                    </button>

                </div>

                {/* Right Panel: Viewport / Preview */}
                <div className="lg:col-span-2 bg-black rounded-xl border border-white/10 relative overflow-hidden group">

                    {/* Placeholder Grid / Streaming Content */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {isStreaming ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="w-full h-full bg-purple-900/10 flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-purple-500 border-t-white rounded-full animate-spin mb-4 mx-auto" />
                                    <p className="text-purple-300 font-mono text-sm tracking-widest">ESTABLISHING UPLINK...</p>
                                    <p className="text-white/30 text-xs mt-2">Connecting to Render Server [US-EAST-4]</p>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                            <Layers size={64} className="text-white mb-4" />
                            <p className="text-white font-mono text-sm tracking-widest">NO SIGNAL</p>
                            <p className="text-white/50 text-xs mt-2">Initiate Launch Sequence from Controller</p>
                        </div>
                    )}

                    {/* HUD Overlay (Mock) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1 items-end pointer-events-none">
                        <div className="text-[10px] font-mono text-white/30">FPS: {isStreaming ? '60' : '--'}</div>
                        <div className="text-[10px] font-mono text-white/30">LATENCY: {isStreaming ? '12ms' : '--'}</div>
                        <div className="text-[10px] font-mono text-white/30">VRAM: {isStreaming ? '4.2GB' : '--'}</div>
                    </div>

                    <div className="absolute bottom-4 left-4 p-2 bg-black/60 backdrop-blur rounded border border-white/10 text-xs font-mono text-white/50">
                        MODE: {presets.find(p => p.id === selectedPreset)?.label.toUpperCase()}
                    </div>
                </div>

            </div>
        </div>
    );
}
