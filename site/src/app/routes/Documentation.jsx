import React, { useState } from "react";
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { Link } from "react-router-dom";
// import { DOCS_REGISTRY } from "../../data/docsRegistry.js"; // Removed in favor of Context
import { NS_ENGINES, SL_ENGINES } from "../../data/engineRegistry.js";
import {
    Folder, FolderOpen, FileText, ChevronRight, ChevronDown,
    LayoutGrid, ListTree, File, Plus
} from "lucide-react";

import { useDocs } from "../../context/DocsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import DocModal from "../../components/DocModal.jsx";

import { NS_PROJECTS } from "../../data/projectRegistry.js";
import * as ProjectContent from "../../data/docs/projects_content.js";

// ... FileTreeNode and FileExplorer components remain ... (omitted for brevity)
const FileTreeNode = ({ label, type = "file", isOpen, onToggle, onClick, depth = 0, isActive }) => {
    // ... same as before
    return (
        <div
            onClick={type === "folder" ? onToggle : onClick}
            style={{
                paddingLeft: `${depth * 20 + 12}px`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '6px',
                paddingBottom: '6px',
                cursor: 'pointer',
                color: isActive ? 'var(--c-brand)' : 'var(--c-text)',
                background: isActive ? 'var(--c-bg-active)' : 'transparent',
                borderRadius: '4px',
                userSelect: 'none'
            }}
            className="file-tree-node hover:bg-white/5"
        >
            {type === "folder" && (
                <span style={{ opacity: 0.5, display: 'flex' }}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
            )}
            <span style={{ color: type === "folder" ? 'var(--c-accent)' : 'inherit', display: 'flex' }}>
                {type === "folder"
                    ? (isOpen ? <FolderOpen size={16} /> : <Folder size={16} />)
                    : <FileText size={16} />
                }
            </span>
            <span style={{ fontSize: '0.9rem', opacity: type === "folder" ? 1 : 0.9 }}>
                {label}
            </span>
        </div>
    );
};

const FileExplorer = ({ generalDocs, orderedEngineDocs, activeProjects, onOpenFile }) => {
    // ... same as before but need access to standard props
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (id) => {
        setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="card p-4" style={{ minHeight: '600px', alignSelf: 'stretch' }}>
            <div className="mb-4 text-xs font-bold text-secondary uppercase tracking-wider">File System</div>
            {/* ... same implementation ... */}
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
            <div style={{ marginTop: '8px' }}></div>
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
                    <div style={{ marginTop: '8px' }}></div>
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
                                                { category: proj.name, items: [] }, // Mock category for modal
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
    );
};

export default function Documentation({ context }) {
    const { docsRegistry, addDoc } = useDocs(); // Use context
    const { hasPermission } = useAuth(); // Use auth

    // Fallback to empty array if registry isn't loaded yet (though initial state handles it)
    const registry = docsRegistry || [];

    const isSL = context === "SL";
    const isWSP = context === "WSP";
    const [viewMode, setViewMode] = useState("grid");
    const activeEngines = isSL ? SL_ENGINES : (isWSP ? [] : NS_ENGINES);
    const theme = isSL ? "green" : (isWSP ? "gold" : "water");

    const canEdit = hasPermission('builder');

    // 1. Engine Docs
    const orderedEngineDocs = activeEngines.map(engine =>
        registry.find(cat => cat.category.startsWith(engine.code))
    ).filter(Boolean);

    // 2. General Docs
    const generalDocs = registry.filter(cat =>
        !cat.category.includes("Engine")
    );

    // 3. Project Docs
    const activeProjects = !isSL && !isWSP ? NS_PROJECTS : [];

    const nav = isSL ? [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Docs", to: "/southlawn/docs" },
        { label: "Pricing", to: "/southlawn/pricing" },
        { label: "System", to: "/southlawn/system" },
        { label: "Investor Relations", to: "/southlawn/investors" },
    ] : isWSP ? [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Docs", to: "/wsp/docs" },
        { label: "Pricing", to: "/wsp/pricing" },
        { label: "System", to: "/wsp/system" },
        { label: "Investor Relations", to: "/wsp/investors" },
    ] : undefined;

    const [activeDocModal, setActiveDocModal] = React.useState(null);

    const handleOpenFile = (cat, doc) => {
        setActiveDocModal({ category: cat, activeItem: doc });
    };

    const handleAddDoc = (categoryName) => {
        // Create a new blank document and add it to the category
        const newDoc = {
            id: `new-doc-${Date.now()}`,
            title: "Untitled Document",
            content: "# Untitled Document\n\nStart writing here...",
            desc: "New draft document."
        };
        addDoc(categoryName, newDoc);

        // Find the category object to pass to modal
        const catObj = registry.find(c => c.category === categoryName) || { category: categoryName, items: [newDoc] };

        // Open it in the modal
        // Note: addedDoc needs to be in the registry for this to work perfectly 'live', 
        // but addDoc updates the context which triggers re-render, so registry passed here might need to be refreshed or we rely on the state update.
        // It's safer to just set the modal state, and since we just added it, it might not be in the 'catObj' derived from 'registry' variable from THIS render cycle.
        // But the context update triggers a re-render.
        // For IMMEDIATE feedback, let's open it manually.

        setActiveDocModal({
            category: {
                ...catObj,
                items: [...(catObj.items || []), newDoc]
            },
            activeItem: newDoc
        });
    };

    return (
        <div data-theme={theme}>
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
                <div className="docs-page-container">
                    {/* Sidebar Navigation - Only show in Grid View */}
                    {viewMode === 'grid' && (
                        <aside className="docs-sidebar">
                            <div className="sidebar-group">
                                <h4 className="sidebar-heading">Start Here</h4>
                                {generalDocs.map(s => (
                                    <a key={s.category} href={`#${s.category.replace(/\s+/g, '-').toLowerCase()}`} className="sidebar-link">
                                        {s.icon} {s.category}
                                    </a>
                                ))}
                            </div>
                            <div className="sidebar-group">
                                <h4 className="sidebar-heading">Reference</h4>
                                <a href="#engine-registry" className="sidebar-link">⚙️ Engine Registry</a>
                            </div>
                            {activeProjects.length > 0 && (
                                <div className="sidebar-group">
                                    <h4 className="sidebar-heading">Projects</h4>
                                    <a href="#project-registry" className="sidebar-link">🏗️ Project Registry</a>
                                </div>
                            )}
                            <div className="sidebar-group">
                                <h4 className="sidebar-heading">Engine Specs</h4>
                                {orderedEngineDocs.map(s => (
                                    <a key={s.category} href={`#${s.category.replace(/\s+/g, '-').toLowerCase()}`} className="sidebar-link">
                                        {s.icon} {s.category}
                                    </a>
                                ))}
                            </div>
                            {activeProjects.length > 0 && (
                                <div className="sidebar-group">
                                    <h4 className="sidebar-heading">Project Specs</h4>
                                    {activeProjects.map(p => (
                                        <a key={p.code} href={`#project-${p.code.toLowerCase()}`} className="sidebar-link">
                                            🏗️ {p.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </aside>
                    )}

                    {/* Main Content */}
                    <main className="docs-content">
                        <div className="docs-header">
                            <div className="eyebrow">{isSL ? "SouthLawn Operations" : (isWSP ? "WSP Protocols" : "Knowledge Base")}</div>
                            <h1 className="h1">{isSL ? "SouthLawn Documentation" : (isWSP ? "Strategic Documentation" : "System Documentation")}</h1>
                            <p className="lead">
                                {isSL
                                    ? "Operational standards and engine references for the SouthLawn portfolio."
                                    : isWSP
                                        ? "Internal protocols for capital formation and strategic deployment."
                                        : "The single source of truth for Northfield Solidarity’s engineering standards and architectural patterns."
                                }
                            </p>

                            {/* View Toggle */}
                            <div className="view-toggle" style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '8px' }}>
                                <button
                                    className={`btn sm ${viewMode === 'grid' ? 'primary' : 'ghost'}`}
                                    onClick={() => setViewMode('grid')}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <LayoutGrid size={16} /> Grid View
                                </button>
                                <button
                                    className={`btn sm ${viewMode === 'explorer' ? 'primary' : 'ghost'}`}
                                    onClick={() => setViewMode('explorer')}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <ListTree size={16} /> File Tree
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
                            <>
                                {/* 1. General Documentation */}
                                {generalDocs.map((section) => (
                                    <section key={section.category} id={section.category.replace(/\s+/g, '-').toLowerCase()} className="docs-section">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-3)' }}>
                                            <h2 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                                                <span style={{ opacity: 0.8, fontSize: '0.8em', marginRight: '8px' }}>{section.icon}</span>
                                                {section.category}
                                            </h2>
                                            {canEdit && (
                                                <button
                                                    className="btn icon sm ghost"
                                                    onClick={() => handleAddDoc(section.category)}
                                                    title="Add Document"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid">
                                            {section.items.map((item) => (
                                                <Link key={item.id} to={`/docs/${item.id}`} className="card doc-link-card">
                                                    <div className="cardTop">
                                                        <div className="badge">Draft</div>
                                                    </div>
                                                    <div className="cardTitle">{item.title}</div>
                                                    <p className="cardBody">{item.desc}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                ))}

                                {/* 2. Engine Registry */}
                                <section id="engine-registry" className="docs-section registry-section" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0 }}>
                                    <h2 className="section-title">
                                        <span style={{ opacity: 0.8, fontSize: '0.8em', marginRight: '8px' }}>⚙️</span>
                                        Engine Registry
                                    </h2>
                                    <div className="grid sm-grid">
                                        {activeEngines.map((engine) => (
                                            <div key={engine.code} className="card doc-link-card compact">
                                                <div className="cardTop">
                                                    <div className="badge brand-badge">{engine.code}</div>
                                                </div>
                                                <div className="cardTitle sm">{engine.name}</div>
                                                <p className="cardBody sm">{engine.category}</p>
                                                <Link to={`/system?engine=${engine.code}`} className="btn sm ghost full-width">View in System</Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* 3. Project Registry */}
                                {activeProjects.length > 0 && (
                                    <section id="project-registry" className="docs-section registry-section">
                                        <h2 className="section-title">
                                            <span style={{ opacity: 0.8, fontSize: '0.8em', marginRight: '8px' }}>🏗️</span>
                                            Project Registry
                                        </h2>
                                        <div className="grid sm-grid">
                                            {activeProjects.map((project) => (
                                                <div key={project.code} className="card doc-link-card compact">
                                                    <div className="cardTop">
                                                        <div className="badge brand-badge" style={{ background: 'var(--c-accent)' }}>{project.code}</div>
                                                    </div>
                                                    <div className="cardTitle sm">{project.name}</div>
                                                    <p className="cardBody sm">{project.description}</p>
                                                    <button
                                                        className="btn sm ghost full-width"
                                                        onClick={() => setActiveDocModal({
                                                            category: { category: project.name, items: [{ id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }] },
                                                            activeItem: { id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }
                                                        })}
                                                    >
                                                        Open Charter
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* 4. Engine Specific Documentation */}
                                {orderedEngineDocs.map((section) => (
                                    <section key={section.category} id={section.category.replace(/\s+/g, '-').toLowerCase()} className="docs-section">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-3)' }}>
                                            <h2 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                                                <span style={{ opacity: 0.8, fontSize: '0.8em', marginRight: '8px' }}>{section.icon}</span>
                                                {section.category}
                                            </h2>
                                            {canEdit && (
                                                <button
                                                    className="btn icon sm ghost"
                                                    onClick={() => handleAddDoc(section.category)}
                                                    title="Add Document"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="card p-6 flex flex-col items-start gap-4">
                                            <p className="mb-4 text-secondary">
                                                Full technical documentation, architectural decisions, and operational runbooks for the {section.category}.
                                            </p>
                                            <div className="grid full-width" style={{ marginTop: '1rem', width: '100%' }}>
                                                {section.items.map(item => (
                                                    <button
                                                        key={item.id}
                                                        className="card doc-link-card"
                                                        onClick={() => handleOpenFile(section, item)}
                                                        style={{ textAlign: 'left', border: '1px solid var(--c-border)', background: 'var(--c-bg)' }}
                                                    >
                                                        <div className="cardTitle sm">{item.title}</div>
                                                        <div className="cardBody sm">{item.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                ))}

                                {/* 5. Project Specific Documentation */}
                                {activeProjects.map((project) => (
                                    <section key={project.code} id={`project-${project.code.toLowerCase()}`} className="docs-section">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-3)' }}>
                                            <h2 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                                                <span style={{ opacity: 0.8, fontSize: '0.8em', marginRight: '8px' }}>🏗️</span>
                                                {project.name}
                                            </h2>
                                            {canEdit && (
                                                <button
                                                    className="btn icon sm ghost"
                                                    onClick={() => handleAddDoc(project.name)}
                                                    title="Add Document"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="card p-6 flex flex-col items-start gap-4">
                                            <p className="mb-4 text-secondary">
                                                Full technical documentation, architectural decisions, and operational runbooks for the {project.name}.
                                            </p>
                                            <button
                                                className="btn primary"
                                                onClick={() => setActiveDocModal({
                                                    category: { category: project.name, items: [{ id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }] },
                                                    activeItem: { id: 'charter', title: 'Project Charter', content: ProjectContent[project.charterContent] }
                                                })}
                                            >
                                                Open Project Charter
                                            </button>
                                        </div>
                                    </section>
                                ))}
                            </>
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

                <style>{`
                    .docs-page-container {
                        display: flex;
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: var(--space-6) var(--space-4);
                        gap: var(--space-8);
                        align-items: flex-start;
                    }

                    /* Sidebar */
                    .docs-sidebar {
                        width: 240px;
                        position: sticky;
                        top: 100px;
                        flex-shrink: 0;
                        padding-right: var(--space-4);
                        border-right: 1px solid var(--c-border);
                        max-height: calc(100vh - 120px);
                        overflow-y: auto;
                    }

                    .sidebar-group {
                        margin-bottom: var(--space-6);
                    }

                    .sidebar-heading {
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: var(--c-text-sub);
                        margin-bottom: var(--space-3);
                        font-weight: 700;
                    }

                    .sidebar-link {
                        display: block;
                        padding: 6px 0;
                        font-size: 0.9rem;
                        color: var(--c-text);
                        text-decoration: none;
                        transition: color 0.2s;
                    }
                    .sidebar-link:hover {
                        color: var(--c-brand);
                    }

                    /* Content */
                    .docs-content {
                        flex: 1;
                        min-width: 0; 
                    }

                    .docs-header {
                        margin-bottom: var(--space-8);
                        text-align: center;
                    }

                    .docs-section {
                        margin-bottom: var(--space-20, 5rem);
                        padding-bottom: var(--space-10);
                        scroll-margin-top: 120px; 
                    }

                    .section-title {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: var(--space-6);
                        border-bottom: 1px solid var(--c-border);
                        padding-bottom: var(--space-3);
                    }

                    .brand-badge {
                        background: var(--c-brand); 
                        color: #fff;
                    }

                    .registry-section {
                        margin-top: var(--space-10);
                        padding-top: var(--space-10);
                        border-top: 1px solid var(--c-border);
                    }
                    
                    .sm-grid {
                         grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    }
                    
                    .card.compact {
                        padding: 1rem;
                    }
                    .cardTitle.sm { font-size: 1rem; margin-bottom: 0.25rem; }
                    .cardBody.sm { font-size: 0.8rem; margin-bottom: 1rem; }
                    .full-width { width: 100%; justify-content: center; }

                    @media (max-width: 900px) {
                        .docs-page-container { flex-direction: column; }
                        .docs-sidebar { 
                            width: 100%; 
                            position: static; 
                            border-right: none; 
                            border-bottom: 1px solid var(--c-border);
                            margin-bottom: var(--space-6);
                            padding-bottom: var(--space-4);
                        }
                    }

                    /* Modal Overlay */
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.85);
                        z-index: 1000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: var(--space-6);
                        -webkit-backdrop-filter: blur(5px);
                        backdrop-filter: blur(5px);
                    }

                    .modal-content {
                        background: var(--c-bg);
                        width: 100%;
                        max-width: 1200px;
                        height: 90vh;
                        border-radius: var(--radius-lg);
                        border: 1px solid var(--c-border);
                        display: flex;
                        overflow: hidden;
                        box-shadow: var(--shadow-xl);
                        animation: fadeIn 0.2s ease-out;
                    }

                    .modal-sidebar {
                        width: 280px;
                        background: var(--c-surface);
                        border-right: 1px solid var(--c-border);
                        display: flex;
                        flex-direction: column;
                        padding: var(--space-4);
                        flex-shrink: 0;
                    }

                    .modal-sidebar-header {
                        padding-bottom: var(--space-4);
                        border-bottom: 1px solid var(--c-border);
                        margin-bottom: var(--space-4);
                    }
                    .modal-sidebar-header h3 {
                        margin: 0;
                        font-size: 1.1rem;
                        font-weight: 700;
                    }

                    .modal-nav {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                        overflow-y: auto;
                        flex: 1;
                    }

                    .modal-nav-item {
                        text-align: left;
                        background: none;
                        border: none;
                        padding: 10px 12px;
                        border-radius: var(--radius-sm);
                        cursor: pointer;
                        color: var(--c-text-sub);
                        transition: all 0.2s;
                        font-size: 0.9rem;
                    }
                    .modal-nav-item:hover {
                        background: var(--c-bg-hover);
                        color: var(--c-text);
                    }
                    .modal-nav-item.active {
                        background: var(--c-bg-active);
                        color: var(--c-brand);
                        font-weight: 600;
                    }

                    .modal-body {
                        flex: 1;
                        padding: var(--space-8);
                        overflow-y: auto;
                        background: var(--c-bg);
                    }

                    .markdown-content {
                        line-height: 1.6;
                        max-width: 800px;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.98); }
                        to { opacity: 1; transform: scale(1); }
                    }
`}</style>
            </Layout >
        </div >
    );
}
