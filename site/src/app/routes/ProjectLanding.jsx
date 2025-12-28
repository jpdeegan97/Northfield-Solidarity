import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { NS_PROJECTS } from "../../data/projectRegistry.js";
import { BarChart3, Activity, FileText } from "lucide-react";

export default function ProjectLanding() {
    const { code } = useParams();

    // Direct derivation - no need for state if data is static/synchronous
    const project = NS_PROJECTS.find(p => p.code === code);

    if (!code) return <Navigate to="/docs" />;
    // If project not found, maybe redirect or show 404
    if (!project) return <div className="p-20 text-center text-white">Project {code} Not Found</div>;

    // Default theme if none provided
    const themeColor = project.themeColor || "#ffffff";
    const features = project.features || [
        { title: "Core Architecture", desc: "Foundational systems designed for scale and security." },
        { title: "Governance Integration", desc: "Native compatibility with the GGE protocol." },
        { title: "Operational Excellence", desc: "Streamlined workflows for maximum efficiency." }
    ];

    return (
        <Layout>
            <div className="bg-[#050505] text-white font-mono min-h-screen selection:bg-white/20">
                {/* Hero Section */}
                <div className="relative overflow-hidden py-32 text-center">
                    {/* Dynamic Ambient Background */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-20"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${themeColor}20, transparent 70%)`
                        }}
                    />

                    <div className="relative z-10 max-w-5xl mx-auto px-6">
                        <div
                            className="mb-8 inline-block px-3 py-1 border rounded text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm"
                            style={{
                                borderColor: `${themeColor}60`,
                                color: themeColor,
                                background: `${themeColor}10`
                            }}
                        >
                            {project.category} Project
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase">
                            {project.name.split(' ')[0]} <span style={{ color: themeColor }}>{project.name.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                            {project.pitch || project.description}
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 text-left mb-20">
                            {features.map((feat, idx) => (
                                <ProjectFeatureCard
                                    key={idx}
                                    title={feat.title}
                                    desc={feat.desc}
                                    themeColor={themeColor}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            {project.charterContent && (
                                <Link
                                    to={`/docs/${project.charterContent}`}
                                    className="px-8 py-4 font-bold rounded transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    style={{ background: themeColor, color: '#000' }}
                                >
                                    <FileText size={18} /> READ CHARTER
                                </Link>
                            )}
                            <Link
                                to={`/marketplace?project=${project.code}`}
                                className="px-8 py-4 border border-white/20 text-white font-bold rounded hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <BarChart3 size={18} /> VIEW MARKETPLACE
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats / Dashboard Section */}
                <div className="max-w-5xl mx-auto px-6 pb-32 grid gap-12">
                    <div className="border border-white/10 bg-white/5 p-8 rounded-xl backdrop-blur-md">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Activity size={24} style={{ color: themeColor }} />
                                System Status
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                                LIVE SIGNAL
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <StatusRow label="Project Status" value={(project.status || 'Unknown').toUpperCase()} themeColor={themeColor} />
                                <StatusRow label="Funding Goal" value={project.fundingGoal ? `$${project.fundingGoal.toLocaleString()}` : 'N/A'} themeColor={themeColor} />
                                <StatusRow label="Capital Raised" value={project.raised !== undefined ? `$${project.raised.toLocaleString()}` : '$0'} themeColor={themeColor} highlight />
                            </div>
                            <div className="space-y-4">
                                <StatusRow label="Backers" value={project.backers || 0} themeColor={themeColor} />
                                <StatusRow label="Docs Available" value={project.documents ? project.documents.length : (project.charterContent ? 1 : 0)} themeColor={themeColor} />
                                <StatusRow label="Network Uptime" value="99.9%" themeColor={themeColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function ProjectFeatureCard({ title, desc, themeColor }) {
    return (
        <div className="p-6 border border-white/10 rounded bg-white/5 hover:border-white/30 transition-all group hover:-translate-y-1">
            <h3
                className="text-lg font-bold mb-3 transition-colors uppercase tracking-wide"
                style={{ color: '#fff' }}
            >
                {title}
            </h3>
            <div
                className="w-12 h-1 mb-4 opacity-50 group-hover:opacity-100 transition-all"
                style={{ background: themeColor }}
            />
            <p className="text-white/50 text-sm leading-relaxed font-sans group-hover:text-white/70">
                {desc}
            </p>
        </div>
    );
}

function StatusRow({ label, value, themeColor, highlight }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <span className="text-white/40 text-sm font-mono uppercase tracking-wider">{label}</span>
            <span
                className="font-bold font-mono text-lg"
                style={{ color: highlight ? themeColor : 'white' }}
            >
                {value}
            </span>
        </div>
    );
}
