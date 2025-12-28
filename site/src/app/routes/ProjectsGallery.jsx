import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { NS_PROJECTS } from "../../data/projectRegistry.js";
import { ArrowRight, BarChart3, Activity } from "lucide-react";

export default function ProjectsGallery() {
    const [filter, setFilter] = useState("ALL");

    // Extract unique categories
    const categories = ["ALL", ...new Set(NS_PROJECTS.map(p => p.category))];

    const filteredProjects = filter === "ALL"
        ? NS_PROJECTS
        : NS_PROJECTS.filter(p => p.category === filter);

    return (
        <Layout>
            <div className="bg-[#050505] min-h-screen text-white font-mono p-8 md:p-16">

                {/* Header */}
                <div className="max-w-7xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                        PROJECT <span className="text-[#00ff9d]">GALLERY</span>
                    </h1>
                    <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                        Explore the active development portfolio of Northfield Solidarity.
                        From experimental prototypes to deployed engines.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="max-w-7xl mx-auto mb-12 flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border rounded transition-all ${filter === cat
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.code} project={project} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

function ProjectCard({ project }) {
    const themeColor = project.themeColor || "#ffffff";

    return (
        <Link
            to={`/project/${project.code}`}
            className="group relative bg-[#111] border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2"
        >
            {/* Top Bar / Status */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-3">
                    <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: themeColor }}
                    />
                    <span className="text-xs font-bold tracking-widest text-white/60">{project.code}</span>
                </div>
                <div
                    className="text-[10px] uppercase px-2 py-1 rounded border opacity-50"
                    style={{ color: themeColor, borderColor: themeColor }}
                >
                    {project.status}
                </div>
            </div>

            {/* Body */}
            <div className="p-8 h-64 flex flex-col justify-between relative z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

                <div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                        {project.name}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div className="flex items-end justify-between">
                    <span className="text-xs text-white/30 font-bold uppercase tracking-wider">{project.category}</span>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/50 group-hover:bg-white group-hover:text-black transition-all"
                    >
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${themeColor}, transparent 70%)` }}
            />
        </Link>
    );
}
