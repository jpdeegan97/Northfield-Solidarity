import React from "react";
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { Link } from "react-router-dom";

export default function ProjectMint() {
    return (
        <Layout>
            <div className="bg-[#050505] text-white font-mono min-h-screen">
                <div className="relative overflow-hidden py-24 text-center">
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.1),transparent_70%)]" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <div className="mb-8 inline-block px-3 py-1 bg-[#00ff9d]/10 border border-[#00ff9d] rounded text-[#00ff9d] text-xs font-bold tracking-[0.2em]">
                            INCUBATOR PROJECT
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white">
                            PROJECT <span className="text-[#00ff9d]">MINT</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
                            Entity / IP Formation Engine.
                            <br />
                            <span className="text-sm opacity-50 mt-2 block">Automating the genesis of corporate entities and intellectual property assignment.</span>
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
                            <MintCard title="CORE SCHEMA" desc="Immutable data structures defining the new standard for assets." />
                            <MintCard title="IMPLEMENTATION" desc="Active development of the settlement layer and bridge contracts." />
                            <MintCard title="GOVERNANCE" desc="DAO-first management protocols for upgradeability." />
                        </div>

                        <div className="flex justify-center gap-4">
                            <Link to="/docs/NS-MINT-000-CHARTER" className="px-8 py-4 bg-[#00ff9d] text-black font-bold rounded hover:bg-white hover:text-black transition-colors">
                                READ CHARTER
                            </Link>
                            <Link to="/marketplace" className="px-8 py-4 border border-white/20 text-white font-bold rounded hover:bg-white/10 transition-colors">
                                ACCESS MARKETPLACE
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 pb-24 grid gap-12">
                    <div className="border border-white/10 bg-white/5 p-8 rounded-xl">
                        <h2 className="text-2xl font-bold mb-4 text-[#00ff9d]">System Status</h2>
                        <div className="flex flex-col gap-4 mb-8">
                            <StatusRow label="Network State" value="TESTNET ALFA" status="active" />
                            <StatusRow label="Validators Online" value="12" status="active" />
                            <StatusRow label="Current Block Height" value="8,492,102" />
                            <StatusRow label="Last Finality" value="1.2s" />
                        </div>

                        {/* Health Bars Visualization */}
                        <div className="border-t border-white/5 pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 text-[#00ff9d]">Validator Liveness</h4>
                            <div className="flex items-end gap-1 h-24 bg-black/20 rounded-lg p-4 border border-white/5 relative overflow-hidden">
                                {/* Background Grid */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,255,157,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                                {[40, 65, 55, 80, 45, 90, 70, 35, 60, 75, 50, 85, 65, 40, 95, 60, 70, 50, 80, 65, 45, 75, 60, 85].map((h, i) => (
                                    <div key={i}
                                        className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100"
                                        style={{
                                            height: `${h}%`,
                                            backgroundColor: '#00ff9d',
                                            opacity: 0.3 + (h / 200)
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-2 text-[10px] font-mono opacity-50 uppercase text-[#00ff9d]">
                                <span>Epoch: 204</span>
                                <span>Consensus: 99.8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function MintCard({ title, desc }) {
    return (
        <div className="basic-card p-6 border border-white/10 rounded bg-white/5 hover:border-[#00ff9d]/50 transition-colors group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00ff9d]">{title}</h3>
            <div className="w-8 h-1 bg-[#00ff9d] mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function StatusRow({ label, value, status }) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <span className="text-white/60 text-sm font-mono tracking-wide">{label}</span>
            <div className="flex items-center gap-2">
                {status === 'active' && <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />}
                <span className="text-white font-bold font-mono">{value}</span>
            </div>
        </div>
    );
}
