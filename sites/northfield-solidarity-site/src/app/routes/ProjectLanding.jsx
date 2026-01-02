import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { NS_PROJECTS } from "../../data/projectRegistry.js";
import { BarChart3, Activity, FileText } from "lucide-react";

// Project Views
import ManifoldView from "../engines/ManifoldView.jsx";
import AEGISView from "../engines/AEGISView.jsx";
import BOOMERANGView from "../engines/BOOMERANGView.jsx";
import DTView from "../engines/DTView.jsx";
import INCView from "../engines/INCView.jsx";
import FLView from "../engines/FLView.jsx";
import RELAYView from "../engines/RELAYView.jsx";
import NumberologyView from "../engines/NumberologyView.jsx";
import NeighborsView from "../engines/NeighborsView.jsx";
import TineLanding from "./project/tine/TineLanding.jsx";

// Status Panel
import ProjectStatusPanel from "../../components/ProjectStatusPanel.jsx";

// Component Map for Custom Project Views
const CUSTOM_VIEWS = {
    'NBR': NeighborsView,
    'MT': ManifoldView,
    'RL': RELAYView,
    'FL': FLView,
    'NUM': NumberologyView,
    'AEGIS': AEGISView,
    'BOOM': BOOMERANGView,
    'DT': DTView,
    'INC': INCView
};

export default function ProjectLanding() {
    const { code } = useParams();

    // Direct derivation - no need for state if data is static/synchronous
    const project = NS_PROJECTS.find(p => p.code === code);

    console.log('ProjectLanding:', { code, projectFound: !!project });

    if (!code) return <Navigate to="/docs" />;
    // If project not found, maybe redirect or show 404
    if (!project && code !== 'TINE') return <div className="p-20 text-center text-white">Project {code} Not Found</div>;

    // Special Case: TINE (Meal Logic) is handled slightly differently as it might not be in registry or has unique structure
    if (code === 'TINE') {
        return (
            <Layout>
                <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <TineLanding />
                    </div>
                    {/* TINE might not have project data, so we check */}
                    {project && <ProjectStatusPanel project={project} themeColor={project.themeColor} />}
                </div>
            </Layout>
        );
    }

    // Check for Custom View
    const CustomView = CUSTOM_VIEWS[code];
    if (CustomView) {
        console.log(`ProjectLanding: Rendering Custom View for ${code}`);
        return (
            <Layout>
                <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
                        <CustomView project={project} />
                    </div>
                    {/* Fixed System Status Panel at Bottom */}
                    <ProjectStatusPanel project={project} themeColor={project.themeColor} />
                </div>
            </Layout>
        );
    }

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

                {/* Replaced manual dashboard with Component */}
                <ProjectStatusPanel project={project} themeColor={themeColor} />

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
