
import React from 'react';
import { Cloud, Server, Router, Globe, Shield, ArrowDown, ArrowRight, Laptop, Activity } from 'lucide-react';
import Section from '../../components/Section';

export default function Networking() {
    return (
        <Section title="Network Infrastructure" subtitle="Northfield Solidarity Connectivity Architecture">
            {/* Added extra padding bottom to avoid overlap with fixed widgets like ActivePersonnel */}
            <div className="w-full max-w-7xl mx-auto p-8 pb-32 relative">

                {/* Layout: Browser (Left) -> Porkbun (Middle) -> Verizon Router (Below Porkbun) -> Host (Right) -> Bottom Browser (Left Bottom) -> Bottom Host (Right Bottom) */}

                {/* We will implement two main diagrams as per the image provided: 
             1. The top flow: Browser -> DNS -> Router -> Host
             2. The bottom flow: Direct Browser -> Host flow (or similar variant)
             
             Actually, the user image shows two distinct diagrams. One top, one bottom.
             I will stack them vertically.
         */}

                {/* --- DIAGRAM 1: FULL ARCHITECTURE --- */}
                <div className="mb-24 relative">
                    <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center uppercase tracking-widest opacity-30">Primary Architecture</h3>

                    {/* Grid for Top Diagram */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

                        {/* SVG Overlay for Connectors */}
                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block z-0" style={{ overflow: 'visible' }}>
                            <defs>
                                <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#3B82F6" /></marker>
                                <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#10B981" /></marker>
                                <marker id="arrow-slate" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L6,3 z" fill="#64748B" /></marker>
                            </defs>

                            {/* Cloud at Top Center */}

                            {/* Cloud to Browser (Left) */}
                            <path d="M 50% 50 Q 20% 50 16% 120" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />

                            {/* Cloud to Host (Right) */}
                            <path d="M 50% 50 Q 80% 50 84% 120" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#arrow-green)" />

                            {/* Browser to DNS (Lookup) - Not strictly directional in image but implied */}

                            {/* Porkbun to Router (Down) */}
                            <path d="M 50% 280 L 50% 320" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />

                            {/* Router to Host (Right) */}
                            <path d="M 65% 380 L 80% 380" fill="none" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow-green)" />
                        </svg>

                        {/* Top Center Cloud */}
                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                            <Cloud className="w-24 h-24 text-blue-100 fill-blue-50" />
                            <div className="font-bold text-slate-500 bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm border border-slate-100 -mt-6">Public Internet</div>
                        </div>

                        {/* Column 1: Browser */}
                        <div className="flex flex-col gap-4 z-10 pt-12">
                            <div className="bg-slate-50 rounded-xl shadow-md border border-slate-200 p-4 h-fit relative">
                                <div className="text-center font-bold text-slate-700 mb-2">Browser</div>
                                <div className="bg-white border border-slate-300 rounded-lg p-2 shadow-inner">
                                    <div className="flex gap-1 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="border border-slate-200 bg-slate-50 rounded px-2 py-1 text-xs text-slate-400 font-mono mb-2">
                                        https://<span className="text-slate-800 font-bold">app.northfieldsolidarity.ai</span>
                                    </div>
                                    <div className="h-16 bg-slate-100 rounded flex items-center justify-center text-slate-300">
                                        content
                                    </div>
                                </div>
                                <div className="text-center mt-2 text-xs text-slate-400">DNS Lookup</div>
                            </div>
                        </div>

                        {/* Column 2: Porkbun & Router (Stacked) */}
                        <div className="flex flex-col gap-8 z-10 pt-12">

                            {/* Porkbun Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"></div>
                                <h3 className="text-lg font-bold text-slate-800 text-center mb-1">Porkbun DNS</h3>
                                <div className="text-xs text-center text-slate-500 font-mono mb-4">WAN IP: 173.70.29.17</div>

                                <div className="border border-slate-200 rounded overflow-hidden text-sm">
                                    <div className="bg-slate-50 px-3 py-1 border-b border-slate-200 text-xs font-bold text-slate-500">NAT Port Forward</div>
                                    <div className="p-2 space-y-1 font-mono text-xs">
                                        <div className="flex justify-between"><span className="font-bold">TCP: 80</span> <span>→ 192.168.1.189</span></div>
                                        <div className="flex justify-between"><span className="font-bold">TCP: 443</span> <span>→ 192.168.1.189</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Router Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-t-xl"></div>
                                <div className="flex justify-center mb-4">
                                    <div className="bg-slate-800 text-slate-400 px-4 py-1 rounded text-xs font-mono font-bold tracking-widest shadow-md">verizon</div>
                                </div>
                                <div className="text-center font-bold text-slate-700 text-sm mb-2">Verizon Router NAT Port</div>

                                <div className="space-y-2 text-xs">
                                    <div className="bg-slate-50 border border-slate-200 p-2 rounded">
                                        <div className="font-bold text-slate-500 mb-1">Original Port: 80</div>
                                        <div className="font-mono text-slate-700">Forward to 192.168.1.189</div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 p-2 rounded">
                                        <div className="font-bold text-slate-500 mb-1">Forward to Port: 80</div>
                                        <div className="font-mono text-slate-700">TCP: 443 → 192.168.1.143</div>
                                        {/* Note: I transcribed 143 from the diagram text provided in the prompt, though logically typically 189 too. Sticking to text provided. */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Host */}
                        <div className="flex flex-col gap-4 z-10 pt-12">
                            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-full relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 rounded-t-xl"></div>
                                <h3 className="text-lg font-bold text-slate-800 text-center mb-1">PE Server</h3>
                                <div className="text-xs text-center text-slate-500 mb-4">(PowerEdge)</div>

                                <div className="flex justify-center mb-6">
                                    <Server className="w-16 h-16 text-slate-800" strokeWidth={1} />
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4 text-xs font-mono relative">
                                    <div className="absolute -top-2 left-2 bg-amber-100 px-2 text-[10px] font-bold text-amber-700 border border-amber-200 rounded">Caddy Reverse Proxy</div>
                                    <div className="mt-2 text-slate-700">
                                        <span className="font-bold block">app.northfieldsolidarity.ai {"{"}</span>
                                        <span className="pl-2 block text-purple-600">encode zstd gzip</span>
                                        <span className="pl-2 block text-blue-600">reverse_proxy</span>
                                        <span className="pl-4 block text-slate-500">localhost:5173</span>
                                        <span className="font-bold block">{"}"} <span className="text-slate-400 font-normal italic"># or 8080</span></span>
                                    </div>
                                </div>

                                <div className="text-center text-xs text-slate-400 font-medium">Reverse proxy to app</div>
                            </div>
                        </div>

                    </div>

                    {/* Optional Redirect Box */}
                    <div className="mt-8 border-2 border-dashed border-amber-200 bg-amber-50 p-4 rounded-xl text-center max-w-3xl mx-auto">
                        <div className="text-sm text-amber-800 font-bold mb-1">Optional: Redirect apex</div>
                        <div className="text-xs font-mono text-amber-700 break-all">
                            northfieldsolidarity.ai, www.northfieldsolidarity.ai → https://app.northfieldsolidarity.ai permanent
                        </div>
                    </div>

                </div>


                {/* --- DIAGRAM 2: SIMPLIFIED FLOW --- */}
                <div className="relative pt-12 border-t border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-800 mb-12 text-center uppercase tracking-widest opacity-30">Direct Flow</h3>

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative max-w-5xl mx-auto">

                        {/* Left: Browser */}
                        <div className="w-64">
                            <div className="bg-slate-800 rounded-lg p-2 pb-6 shadow-xl relative">
                                <div className="flex gap-1 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                </div>
                                <div className="bg-white rounded h-20 w-full flex items-center justify-center">
                                    <span className="text-slate-200 font-bold text-xs">APP</span>
                                </div>
                                <div className="absolute -bottom-3 left-0 w-full flex justify-center">
                                    <div className="w-16 h-3 bg-slate-700 rounded-b-lg"></div>
                                </div>
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-900/20 rounded-full blur-sm"></div>
                            </div>
                            <div className="text-center mt-6 font-bold text-slate-600">Browser</div>
                            <div className="text-center text-xs text-slate-400">DNS Lookup</div>
                        </div>

                        {/* Center: Connection Info */}
                        <div className="flex-1 text-center scale-90 lg:scale-100">
                            <div className="flex flex-col items-center gap-1 mb-4">
                                <Cloud className="w-12 h-12 text-blue-200" />
                                <div className="text-xs font-bold text-slate-400">Public Internet</div>
                            </div>

                            <div className="font-mono text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 inline-block mb-3">
                                WAN IP: 173.70.29.17
                            </div>

                            <div className="relative h-1 bg-slate-200 w-full rounded my-2">
                                <div className="absolute -top-1 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                            </div>

                            <div className="flex justify-between text-xs font-mono text-slate-600 px-4">
                                <div>TCP: 80 → 192.168.1.189</div>
                                <div>TCP: 443 → 192.168.1.189</div>
                            </div>
                        </div>

                        {/* Right: PE Server */}
                        <div className="w-64 relative">
                            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 shadow-lg relative z-10">
                                <div className="flex items-center gap-2 mb-2 border-b border-sky-100 pb-2">
                                    <Server className="w-5 h-5 text-sky-600" />
                                    <span className="font-bold text-sky-800">PE Server</span>
                                </div>
                                <div className="bg-white border border-sky-100 p-2 rounded text-center">
                                    <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Ports Open</div>
                                    <div className="flex justify-center gap-2 font-mono text-xs font-bold text-slate-700">
                                        <span className="bg-green-100 px-2 rounded">80</span>
                                        <span className="bg-green-100 px-2 rounded">443</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-2 items-center gap-2">
                                <Laptop className="w-4 h-4 text-slate-400" />
                                <span className="text-xs text-slate-500 font-mono">Caddy Reverse Proxy</span>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Note */}
                    <div className="mt-12 text-center">
                        <div className="inline-block border border-dashed border-slate-300 bg-slate-50 px-6 py-3 rounded-lg text-xs font-mono text-slate-600">
                            Optional: Redirect apex <span className="font-bold">northfieldsolidarity.ai</span> → <span className="text-blue-600">https://app.northfieldsolidarity.ai</span>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}
