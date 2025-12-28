import React, { useState } from "react";
import Layout from "../../components/Layout.jsx";
import { Link } from "react-router-dom";
import { NS_ENGINES, SL_ENGINES } from "../../data/engineRegistry.js";
import {
    Folder, FolderOpen, FileText, ChevronRight, ChevronDown,
    LayoutGrid, ListTree, Plus, BookOpen
} from "lucide-react";

import { useDocs } from "../../context/DocsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import DocModal from "../../components/DocModal.jsx";

import { NS_PROJECTS } from "../../data/projectRegistry.js";
import * as ProjectContent from "../../data/docs/projects_content.js";

// --- Components ---

const FileTreeNode = ({ label, type = "file", isOpen, onToggle, onClick, depth = 0, isActive }) => {
    return (
        <div
            onClick={type === "folder" ? onToggle : onClick}
            className={`
                flex items-center gap-2 py-1.5 px-2 cursor-pointer rounded-md transition-colors select-none text-sm
                ${isActive ? 'bg-brand/10 text-brand' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
            `}
            style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
            <span className="opacity-70 flex-shrink-0 w-4">
                {type === "folder" && (
                    isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
            </span>
            <span className={`flex-shrink-0 ${type === "folder" ? "text-amber-400" : "text-slate-500"}`}>
                {type === "folder"
                    ? (isOpen ? <FolderOpen size={16} /> : <Folder size={16} />)
                    : <FileText size={16} />
                }
            </span>
            <span className={`truncate ${type === "folder" ? "font-semibold" : ""}`}>
                {label}
            </span>
        </div>
    );
};

const FileExplorer = ({ generalDocs, orderedEngineDocs, activeProjects, onOpenFile }) => {
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (id) => {
        setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 min-h-[600px] shadow-inner">
            <div className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest px-2">File System</div>
            <div className="flex flex-col gap-0.5">
                {/* General Docs */}
                <FileTreeNode
                    label="General Documentation"
                    type="folder"
                    isOpen={openFolders['general']}
                    onToggle={() => toggleFolder('general')}
                />
                {openFolders['general'] && generalDocs.map(cat => (
                    <div key={cat.category}>
                        <FileTreeNode
                            label={cat.category}
                            type="folder"
                            depth={1}
                            isOpen={openFolders[cat.category]}
                            onToggle={() => toggleFolder(cat.category)}
                        />
                        {openFolders[cat.category] && cat.items.map(doc => (
                            <FileTreeNode
                                key={doc.id}
                                label={doc.title}
                                depth={2}
                                onClick={() => onOpenFile(cat, doc)}
                            />
                        ))}
                    </div>
                ))}

                {/* Engine Specs */}
                <div className="my-2"></div>
                <FileTreeNode
                    label="Engine Specifications"
                    type="folder"
                    isOpen={openFolders['engines']}
                    onToggle={() => toggleFolder('engines')}
                />
                {openFolders['engines'] && orderedEngineDocs.map(cat => (
                    <div key={cat.category}>
                        <FileTreeNode
                            label={cat.category}
                            type="folder"
                            depth={1}
                            isOpen={openFolders[cat.category]}
                            onToggle={() => toggleFolder(cat.category)}
                        />
                        {openFolders[cat.category] && cat.items.map(doc => (
                            <FileTreeNode
                                key={doc.id}
                                label={doc.title}
                                depth={2}
                                onClick={() => onOpenFile(cat, doc)}
                            />
                        ))}
                    </div>
                ))}

                {/* Projects */}
                {activeProjects.length > 0 && (
                    <>
                        <div className="my-2"></div>
                        <FileTreeNode
                            label="Active Projects"
                            type="folder"
                            isOpen={openFolders['projects']}
                            onToggle={() => toggleFolder('projects')}
                        />
                        {openFolders['projects'] && activeProjects.map(proj => (
                            <div key={proj.code}>
                                <FileTreeNode
                                    label={proj.name}
                                    type="folder"
                                    depth={1}
                                    isOpen={openFolders[proj.code]}
                                    onToggle={() => toggleFolder(proj.code)}
                                />
                                {openFolders[proj.code] && (
                                    <>
                                        {proj.documents ? (
                                            proj.documents.map(doc => (
                                                <FileTreeNode
                                                    key={doc.id}
                                                    label={doc.title}
                                                    depth={2}
                                                    onClick={() => onOpenFile(
                                                        { category: proj.name, items: [] },
                                                        { id: doc.id, title: doc.title, content: ProjectContent[doc.contentKey] }
                                                    )}
                                                />
                                            ))
                                        ) : (
                                            <FileTreeNode
                                                label="Project Charter"
                                                depth={2}
                                                onClick={() => onOpenFile(
                                                    { category: proj.name, items: [] },
                                                    { id: 'charter', title: 'Project Charter', content: ProjectContent[proj.charterContent] }
                                                )}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

// --- Main Page Component ---

export default function Documentation({ context }) {
    const { docsRegistry, addDoc } = useDocs();
    const { hasPermission } = useAuth();
    const registry = docsRegistry || [];

    const isSL = context === "SL";
    const isWSP = context === "WSP";
    const [viewMode, setViewMode] = useState("grid");
    const activeEngines = isSL ? SL_ENGINES : (isWSP ? [] : NS_ENGINES);
    const theme = isSL ? "green" : (isWSP ? "gold" : "water");

    const canEdit = hasPermission('builder');

    // Categorize Docs
    const orderedEngineDocs = activeEngines.map(engine => {
        const cat = registry.find(cat => cat.category.startsWith(engine.code));
        return cat ? { ...cat, category: `${engine.code} - ${engine.name}` } : null;
    }).filter(Boolean);

    const generalDocs = registry.filter(cat => !cat.category.includes("Engine"));
    const activeProjects = !isSL && !isWSP ? NS_PROJECTS : [];

    // Navigation setup
    const nav = isSL ? [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Documentation", to: "/southlawn/docs" },
        { label: "Pricing", to: "/southlawn/pricing" },
        { label: "System", to: "/southlawn/system" },
        { label: "Investor Relations", to: "/southlawn/investors" },
    ] : isWSP ? [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Documentation", to: "/wsp/docs" },
        { label: "Pricing", to: "/wsp/pricing" },
        { label: "System", to: "/wsp/system" },
        { label: "Investor Relations", to: "/wsp/investors" },
    ] : [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Documentation", to: "/docs" },
        { label: "Pricing", to: "/pricing" },
        { label: "System", to: "/system" },
        { label: "Investor Relations", to: "/investors" },
    ];

    const [activeDocModal, setActiveDocModal] = React.useState(null);

    const handleOpenFile = (cat, doc) => {
        setActiveDocModal({ category: cat, activeItem: doc });
    };

    const handleAddDoc = (categoryName) => {
        const newDoc = {
            id: `new-doc-${Date.now()}`,
            title: "Untitled Document",
            content: "# Untitled Document\n\nStart writing here...",
            desc: "New draft document."
        };
        addDoc(categoryName, newDoc);

        const catObj = registry.find(c => c.category === categoryName) || { category: categoryName, items: [newDoc] };
        setActiveDocModal({
            category: { ...catObj, items: [...(catObj.items || []), newDoc] },
            activeItem: newDoc
        });
    };

    return (
        <div data-theme={theme} className="min-h-screen bg-bg text-text">
            <Layout
                nav={nav}
                brand={isSL ? {
                    title: "South Lawn RE Holdings",
                    tagline: "Stewardship of land. Quiet execution.",
                    footerLine: "Stewardship • Operations • Portfolio Execution",
                    footerNote: "Quiet execution. Long-horizon compounding.",
                } : isWSP ? {
                    title: "WSP",
                    tagline: "Architecture for the next epoch.",
                    footerLine: "WSP • Strategic Operations",
                    footerNote: "Limited Disclosure.",
                } : undefined}
            >
                <div className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start">

                    {/* Sidebar Navigation - Only show in Grid View on Desktop */}
                    {viewMode === 'grid' && (
                        <aside className="hidden lg:block w-64 sticky top-28 flex-shrink-0 space-y-8 pr-4 border-r border-border/50 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider">Start Here</h4>
                                <nav className="space-y-1">
                                    {generalDocs.map(s => (
                                        <a key={s.category} href={`#${s.category.replace(/\s+/g, '-').toLowerCase()}`}
                                            className="block text-sm text-text-sub hover:text-brand transition-colors py-1 truncate">
                                            {s.icon} <span className="ml-2">{s.category}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider">Reference</h4>
                                <a href="#engine-registry" className="block text-sm text-text-sub hover:text-brand transition-colors py-1">
                                    ⚙️ <span className="ml-2">Engine Registry</span>
                                </a>
                            </div>

                            {activeProjects.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider">Projects</h4>
                                    <a href="#project-registry" className="block text-sm text-text-sub hover:text-brand transition-colors py-1">
                                        🏗️ <span className="ml-2">Project Registry</span>
                                    </a>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider">Engine Specs</h4>
                                <nav className="space-y-1">
                                    {orderedEngineDocs.map(s => (
                                        <a key={s.category} href={`#${s.category.replace(/\s+/g, '-').toLowerCase()}`}
                                            className="block text-sm text-text-sub hover:text-brand transition-colors py-1 truncate">
                                            {s.icon} <span className="ml-2">{s.category}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="text-brand font-bold uppercase text-xs tracking-widest mb-3">
                                {isSL ? "SouthLawn Operations" : (isWSP ? "WSP Protocols" : "Knowledge Base")}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text to-text-sub">
                                {isSL ? "SouthLawn Documentation" : (isWSP ? "Strategic Documentation" : "System Documentation")}
                            </h1>
                            <p className="text-lg text-text-sub max-w-2xl mx-auto leading-relaxed">
                                {isSL
                                    ? "Operational standards and engine references for the SouthLawn portfolio."
                                    : isWSP
                                        ? "Internal protocols for capital formation and strategic deployment."
                                        : "The single source of truth for Northfield Solidarity’s engineering standards and architectural patterns."
                                }
                            </p>

                            {/* View Toggle */}
                            <div className="flex bg-surface border border-border rounded-full p-1 mt-8 shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-brand text-white shadow' : 'text-text-sub hover:text-text'}`}
                                >
                                    <LayoutGrid size={16} /> Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('explorer')}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'explorer' ? 'bg-brand text-white shadow' : 'text-text-sub hover:text-text'}`}
                                >
                                    <ListTree size={16} /> Explorer
                                </button>
                            </div>
                        </div>

                        {viewMode === 'explorer' ? (
                            <FileExplorer
                                generalDocs={generalDocs}
                                orderedEngineDocs={orderedEngineDocs}
                                activeProjects={activeProjects}
                                onOpenFile={handleOpenFile}
                            />
                        ) : (
                            <div className="space-y-16">
                                {/* 1. General Documentation */}
                                {generalDocs.map((section) => (
                                    <section key={section.category} id={section.category.replace(/\s+/g, '-').toLowerCase()} className="pt-8 scroll-mt-32">
                                        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-8">
                                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                                <span className="p-2 bg-surface rounded-lg border border-border/50 text-xl">{section.icon}</span>
                                                {section.category}
                                            </h2>
                                            {canEdit && (
                                                <button
                                                    onClick={() => handleAddDoc(section.category)}
                                                    className="p-2 text-text-sub hover:text-brand hover:bg-surface rounded-full transition-colors"
                                                    title="Add Document"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    to={`/docs/${item.id}`}
                                                    className="group flex flex-col bg-surface hover:bg-surface/80 border border-border hover:border-brand/30 rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <BookOpen size={20} className="text-brand opacity-80" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-bg px-2 py-0.5 rounded text-text-sub">Draft</span>
                                                    </div>
                                                    <h3 className="font-bold text-lg mb-2 group-hover:text-brand transition-colors">{item.title}</h3>
                                                    <p className="text-sm text-text-sub leading-relaxed line-clamp-3">{item.desc}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                ))}

                                {/* 2. Engine Registry */}
                                <section id="engine-registry" className="pt-8 scroll-mt-32 border-t border-border/30">
                                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <span className="p-2 bg-surface rounded-lg border border-border/50 text-xl">⚙️</span>
                                        Engine Registry
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {activeEngines.map((engine) => (
                                            <div key={engine.code} className="bg-surface rounded-lg p-4 border border-border/50 hover:border-brand/40 transition-colors">
                                                <div className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-brand text-white mb-2 shadow-sm">{engine.code}</div>
                                                <div className="font-bold text-sm mb-1">{engine.name}</div>
                                                <div className="text-xs text-text-sub mb-3 truncate">{engine.category}</div>
                                                <Link to={`/system?engine=${engine.code}`} className="text-xs font-semibold text-brand hover:underline block">View System Node →</Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. Project Registry */}
                                {activeProjects.length > 0 && (
                                    <section id="project-registry" className="pt-8 scroll-mt-32 border-t border-border/30">
                                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                            <span className="p-2 bg-surface rounded-lg border border-border/50 text-xl">🏗️</span>
                                            Project Registry
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {activeProjects.map((project) => (
                                                <div key={project.code} className="bg-surface rounded-lg p-4 border border-border/50 hover:border-accent/40 transition-colors">
                                                    <div className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-accent text-slate-900 mb-2 shadow-sm">{project.code}</div>
                                                    <div className="font-bold text-sm mb-1">{project.name}</div>
                                                    <div className="text-xs text-text-sub mb-3 line-clamp-2">{project.description}</div>
                                                    <button
                                                        className="text-xs font-semibold text-accent hover:underline block text-left"
                                                        onClick={() => setActiveDocModal({
                                                            category: { category: project.name, items: [{ id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }] },
                                                            activeItem: { id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }
                                                        })}
                                                    >
                                                        Read Charter →
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* 4. Engine Specific Documentation */}
                                {orderedEngineDocs.map((section) => (
                                    <section key={section.category} id={section.category.replace(/\s+/g, '-').toLowerCase()} className="pt-8 scroll-mt-32">
                                        <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-8">
                                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                                <span className="p-2 bg-surface rounded-lg border border-border/50 text-xl">{section.icon}</span>
                                                {section.category}
                                            </h2>
                                            {canEdit && (
                                                <button
                                                    onClick={() => handleAddDoc(section.category)}
                                                    className="p-2 text-text-sub hover:text-brand hover:bg-surface rounded-full transition-colors"
                                                    title="Add Document"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="bg-surface/50 rounded-xl border border-border/50 p-6">
                                            <p className="text-text-sub mb-6 text-sm">
                                                Technical specifications, decisions, and runbooks for {section.category}.
                                            </p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {section.items.map(item => (
                                                    <button
                                                        key={item.id}
                                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group text-left w-full"
                                                        onClick={() => handleOpenFile(section, item)}
                                                    >
                                                        <FileText className="text-slate-500 group-hover:text-brand transition-colors" size={20} />
                                                        <div>
                                                            <div className="font-medium text-sm group-hover:text-white transition-colors">{item.title}</div>
                                                            <div className="text-xs text-text-sub line-clamp-1">{item.desc}</div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                ))}
                            </div>
                        )}

                        {/* Doc Modal Overlay */}
                        {activeDocModal && (
                            <DocModal
                                activeDocModal={activeDocModal}
                                setActiveDocModal={setActiveDocModal}
                            />
                        )}
                    </main>
                </div>
            </Layout>
        </div>
    );
}
