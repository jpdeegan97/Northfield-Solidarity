import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { NS_ENGINES, SL_ENGINES } from "../../data/engineRegistry.js";
import { DOCS_REGISTRY } from "../../data/docsRegistry.js";
import SystemTopology3D from "../../components/SystemTopology3D.jsx";
import MermaidDiagram from "../../components/MermaidDiagram.jsx";
import { getDiagram } from "../../data/diagramRegistry.js";

export default function SystemExplorer({ context }) {
    const isSL = context === "SL";
    const isWSP = context === "WSP";
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultEngine = isSL ? "PTE" : (isWSP ? "WSP-1" : "GGP");
    const activeEngine = searchParams.get("engine") || defaultEngine;

    const setActiveEngine = (code) => {
        setSearchParams({ engine: code });
    };

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [showSystemModal, setShowSystemModal] = useState(false);
    const [systemModalMode, setSystemModalMode] = useState("DETAILED");

    // Helper to find engine data
    const activeRegistry = isSL ? SL_ENGINES : (isWSP ? [] : NS_ENGINES);
    const getEngine = (code) => {
        if (isWSP) {
            return {
                code: code,
                category: "Strategic",
                name: code === "WSP-1" ? "Capital Formation" : "Capital Deployment",
                description: "WSP strategic operation node.",
                responsibilities: ["Capital Allocation", "Strategy"],
                inputs: ["Market Data"],
                outputs: ["Directives"]
            };
        }
        return activeRegistry.find((e) => e.code === code) || {};
    };

    // Define the grid positions for the "Circuit Layout"
    // NS Topology
    const nsGridAreas = [
        { code: "SIG", label: "Inputs" },
        { code: "MUX", label: "Inputs" },
        { code: "DRE", label: "Research" },
        { code: "PIE", label: "Research" },
        { code: "GGP", label: "Nucleus" },
        { code: "IDN", label: "Nucleus" },
        { code: "INT", label: "State" },
        { code: "SIM", label: "Simulation" },
        { code: "DAT", label: "Execution" },
        { code: "FLO", label: "Finance" },
        { code: "BCP", label: "Blockchain" },
    ];

    // SL Topology
    const slGridAreas = [
        { code: "MRFPE", label: "Feasibility" },
        { code: "PTE", label: "Portfolio" },
        { code: "PECA", label: "Structuring" },
    ];

    // WSP Topology
    const wspGridAreas = [
        { code: "WSP-1", label: "Formation" },
        { code: "WSP-2", label: "Deployment" },
    ];

    const gridAreas = isSL ? slGridAreas : (isWSP ? wspGridAreas : nsGridAreas);
    const currentPayload = getEngine(activeEngine);

    // 3D Coordinates Configuration (X, Y, Z)
    const nsNodeCoords = {
        SIG: { x: -200, y: -250, z: 0 },
        MUX: { x: 200, y: -250, z: 0 },
        DRE: { x: -150, y: -100, z: 50 },
        PIE: { x: 150, y: -100, z: 50 },
        GGP: { x: 0, y: 0, z: 100 }, // Nucleus high
        IDN: { x: 200, y: 0, z: -50 },
        INT: { x: -200, y: 0, z: -50 },
        SIM: { x: -150, y: 150, z: 50 },
        DAT: { x: 150, y: 150, z: 50 },
        FLO: { x: 0, y: 250, z: 0 },
        BCP: { x: 0, y: -350, z: 0 },
    };

    const slNodeCoords = {
        MRFPE: { x: -200, y: 0, z: 0 },
        PTE: { x: 0, y: 0, z: 50 },
        PECA: { x: 200, y: 0, z: 0 },
    };

    const wspNodeCoords = {
        "WSP-1": { x: -100, y: 0, z: 0 },
        "WSP-2": { x: 100, y: 0, z: 0 },
    };

    const nodeCoords = isSL ? slNodeCoords : (isWSP ? wspNodeCoords : nsNodeCoords);

    // Define connections to render as 3D beams [StartCode, EndCode]
    const nsConnections3d = [
        ["SIG", "DRE"], ["MUX", "PIE"],
        ["DRE", "GGP"], ["PIE", "GGP"],
        ["GGP", "IDN"],
        ["GGP", "SIM"], ["GGP", "DAT"],
        ["GGP", "INT"],
        ["INT", "SIM"], ["INT", "DAT"],
        ["SIM", "FLO"], ["DAT", "FLO"],
        ["BCP", "SIG"], ["BCP", "FLO"]
    ];

    const slConnections3d = [
        ["MRFPE", "PTE"],
        ["PTE", "PECA"]
    ];

    const wspConnections3d = [
        ["WSP-1", "WSP-2"]
    ];

    const connections3d = isSL ? slConnections3d : (isWSP ? wspConnections3d : nsConnections3d);

    // Custom SL / WSP Nav
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

    const theme = isSL ? "green" : (isWSP ? "gold" : "water");

    return (
        <div data-theme={theme}>
            <Layout
                theme={theme}
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
                <div className="explorer-container">
                    <div className="explorer-header" style={{ marginBottom: '0', textAlign: 'center' }}>
                        <h1 className="h1" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                            {isSL ? "Operating Topology" : (isWSP ? "Strategic Architecture" : "System Topology")}
                        </h1>
                        <p className="sub" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            {isSL
                                ? "The real estate engine constellation. From research to structuring to portfolio control."
                                : isWSP
                                    ? "High-level strategic flows for WSP asset deployment."
                                    : "The engine constellation. Click a node to inspect its role in the flow."}
                        </p>
                    </div>

                    {/* System Diagram Controls */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                        <button className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }} onClick={() => setShowSystemModal(true)}>
                            View Overall System Architecture
                        </button>
                    </div>

                    <div className="topology-split">
                        {/* Left: The 3D Topology */}
                        <div className="circuit-board" style={{ padding: 0, overflow: 'hidden', background: 'transparent', border: 'none', height: '600px', display: 'block' }}>
                            <SystemTopology3D
                                nodes={gridAreas}
                                connections={connections3d}
                                nodeCoords={nodeCoords}
                                activeEngine={activeEngine}
                                setActiveEngine={setActiveEngine}
                                theme={theme}
                            />
                        </div>

                        {/* Right: The Info Panel */}
                        <div className="info-panel">
                            <div className="panel-header">
                                <div className="panel-code">{currentPayload.code}</div>
                                <div className="panel-cat">{currentPayload.category}</div>
                            </div>
                            <h2 className="panel-title">{currentPayload.name}</h2>
                            <p className="panel-desc">{currentPayload.description}</p>

                            <div className="panel-section">
                                <h4 className="panel-label">Core Responsibilities</h4>
                                <ul className="panel-list">
                                    {currentPayload.responsibilities?.map(r => <li key={r}>{r}</li>)}
                                </ul>
                            </div>

                            <div className="panel-io">
                                <div>
                                    <h4 className="panel-label">Inputs</h4>
                                    <div className="tag-cloud">
                                        {currentPayload.inputs?.map(i => <span key={i} className="tag tag-in">{i}</span>)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="panel-label">Outputs</h4>
                                    <div className="tag-cloud">
                                        {currentPayload.outputs?.map(o => <span key={o} className="tag tag-out">{o}</span>)}
                                    </div>
                                </div>
                            </div>

                            {/* Architecture Diagram */}
                            <div className="panel-section" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--c-border)' }}>
                                <h4 className="panel-label" style={{ marginBottom: '1rem' }}>Architecture Flow</h4>
                                <div style={{
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--c-border)',
                                    overflow: 'hidden'
                                }}>
                                    <MermaidDiagram code={getDiagram(activeEngine)} />
                                </div>
                            </div>


                            <div className="ctaRow" style={{ marginTop: 'auto' }}>
                                <button className="btn panel-btn" onClick={() => setShowSpecModal(true)}>Full Engine Spec</button>
                            </div>

                            {/* Engine Documentation Section */}
                            <div className="panel-section" style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--c-border)', paddingTop: 'var(--space-4)' }}>
                                <h4 className="panel-label">System Documentation</h4>
                                <div className="doc-list">
                                    {DOCS_REGISTRY.find(c => c.category.includes(activeEngine))?.items.map(doc => (
                                        <div key={doc.id} className="doc-item" onClick={() => setSelectedDoc(doc)} style={{
                                            padding: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            marginBottom: '8px',
                                            cursor: 'pointer',
                                            border: '1px solid transparent'
                                        }}>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--c-brand)' }}>{doc.title}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '4px' }}>{doc.desc}</div>
                                        </div>
                                    ))}
                                    {!DOCS_REGISTRY.find(c => c.category.includes(activeEngine)) && (
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic' }}>No documentation linked for {activeEngine} yet.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documentation Modal */}
                    {selectedDoc && (
                        <div className="doc-modal-overlay" onClick={() => setSelectedDoc(null)} style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}>
                            <div className="doc-modal-content" onClick={e => e.stopPropagation()} style={{
                                background: 'var(--c-surface)',
                                width: '100%', maxWidth: '800px',
                                maxHeight: '90vh', overflowY: 'auto',
                                borderRadius: '16px', border: '1px solid var(--c-border)',
                                padding: '2rem', position: 'relative'
                            }}>
                                <button onClick={() => setSelectedDoc(null)} style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--c-text-sub)'
                                }}>×</button>

                                <div className="kicker" style={{ marginBottom: '0.5rem' }}>{selectedDoc.id}</div>
                                <h2 className="h2" style={{ marginBottom: '1rem' }}>{selectedDoc.title}</h2>
                                <div className="prose">
                                    {selectedDoc.content.split('\n').map((line, i) => {
                                        if (line.startsWith('# ')) return <h1 key={i} className="h1" style={{ fontSize: '1.8rem', marginTop: '1.5em' }}>{line.replace('# ', '')}</h1>
                                        if (line.startsWith('## ')) return <h2 key={i} className="h2" style={{ fontSize: '1.4rem', marginTop: '1.5em' }}>{line.replace('## ', '')}</h2>
                                        if (line.startsWith('### ')) return <h3 key={i} className="h3" style={{ fontSize: '1.1rem', marginTop: '1em' }}>{line.replace('### ', '')}</h3>
                                        if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '1.5em' }}>{line.replace('- ', '')}</li>
                                        if (line.trim() === '---') return <hr key={i} style={{ margin: '2em 0', borderColor: 'var(--c-border)' }} />
                                        if (line.trim() === '') return <br key={i} />
                                        return <p key={i} style={{ marginBottom: '0.8em', lineHeight: '1.6' }}>{line}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full Spec Modal */}
                    {showSpecModal && (
                        <div className="doc-modal-overlay" onClick={() => setShowSpecModal(false)} style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)', zIndex: 1100,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}>
                            <div className="doc-modal-content" onClick={e => e.stopPropagation()} style={{
                                background: 'var(--c-surface)',
                                width: '90vw', height: '90vh',
                                borderRadius: '16px', border: '1px solid var(--c-border)',
                                display: 'flex', flexDirection: 'column',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid var(--c-border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    background: 'var(--c-bg)'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--c-brand)', fontWeight: 'bold' }}>FULL SPECIFICATION</div>
                                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{currentPayload.name} ({currentPayload.code})</h2>
                                    </div>
                                    <button onClick={() => setShowSpecModal(false)} style={{
                                        background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--c-text-sub)'
                                    }}>×</button>
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden', padding: 0, background: '#0d1117', position: 'relative' }}>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <MermaidDiagram code={getDiagram(activeEngine)} enableZoom={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full System Modal */}
                    {showSystemModal && (
                        <div className="doc-modal-overlay" onClick={() => setShowSystemModal(false)} style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)', zIndex: 1100,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}>
                            <div className="doc-modal-content" onClick={e => e.stopPropagation()} style={{
                                background: 'var(--c-surface)',
                                width: '90vw', height: '90vh',
                                borderRadius: '16px', border: '1px solid var(--c-border)',
                                display: 'flex', flexDirection: 'column',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid var(--c-border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    background: 'var(--c-bg)'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--c-brand)', fontWeight: 'bold' }}>SYSTEM ARCHITECTURE</div>
                                        <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Northfield Solidarity ({systemModalMode})</h2>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn" style={{ fontSize: '0.8rem', padding: '0.2rem 0.8rem', background: systemModalMode === 'DETAILED' ? 'var(--c-brand)' : 'transparent', border: '1px solid var(--c-border)' }} onClick={() => setSystemModalMode("DETAILED")}>Detailed</button>
                                            <button className="btn" style={{ fontSize: '0.8rem', padding: '0.2rem 0.8rem', background: systemModalMode === 'ABSTRACTED' ? 'var(--c-brand)' : 'transparent', border: '1px solid var(--c-border)' }} onClick={() => setSystemModalMode("ABSTRACTED")}>Abstracted</button>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowSystemModal(false)} style={{
                                        background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--c-text-sub)'
                                    }}>×</button>
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden', padding: 0, background: '#0d1117', position: 'relative' }}>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <MermaidDiagram code={getDiagram("MASTER_" + systemModalMode)} enableZoom={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>

            <style>{`
.explorer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-6) var(--space-4);
}

.topology-split {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-6);
    margin-top: var(--space-6);
    align-items: start;
}

/* --- Circuit Board --- */
.circuit-board {
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid var(--c-border);
    border-radius: 24px;
    padding: var(--space-6);
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}


/* --- Info Panel --- */
.info-panel {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: 20px;
    padding: var(--space-6);
    position: sticky;
    top: 100px;
    backdrop-filter: blur(10px);
    z-index: 50;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
}

.panel-code {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--c-brand);
}

.panel-cat {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--c-text-sub);
    border: 1px solid var(--c-border);
    padding: 4px 8px;
    border-radius: 4px;
}

.panel-title {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--space-3);
}

.panel-desc {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--c-text-sub);
    margin-bottom: var(--space-5);
}

.panel-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--c-text-sub);
    margin-bottom: var(--space-2);
    letter-spacing: 0.05em;
}

.panel-list {
    padding-left: 1.2rem;
    margin-bottom: var(--space-5);
}
.panel-list li { margin-bottom: 4px; }

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: var(--space-4);
}

.tag {
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    font-weight: 500;
}

.tag-in { border-left: 2px solid var(--c-accent); }
.tag-out { border-left: 2px solid var(--c-brand); }

.panel-btn {
    width: 100%;
    justify-content: center;
    margin-top: var(--space-4);
}

@media(max-width: 900px) {
    .topology-split { grid-template-columns: 1fr; }
    .node-grid { grid-template-areas: "sig mux" "dre pie" "ggp idn" "sim dat" "flo ."; }
}
`}</style>
        </div >
    );
}

