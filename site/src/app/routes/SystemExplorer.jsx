import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import { NS_ENGINES, SL_ENGINES } from "../../data/engineRegistry.js";
import { DOCS_REGISTRY } from "../../data/docsRegistry.js";
import SystemTopology3D from "../../components/SystemTopology3D.jsx";

export default function SystemExplorer({ context }) {
    const isSL = context === "SL";
    const [searchParams] = useSearchParams();
    const initialEngine = searchParams.get("engine") || (isSL ? "PTE" : "GGP");
    const [activeEngine, setActiveEngine] = useState(initialEngine);
    const [selectedDoc, setSelectedDoc] = useState(null);

    // Zoom state not strictly needed for R3F but we keep activeEngine logic

    // Sync state with URL param
    useEffect(() => {
        const engineParam = searchParams.get("engine");
        if (engineParam) {
            setActiveEngine(engineParam);
        } else {
            setActiveEngine(isSL ? "PTE" : "GGP");
        }
    }, [searchParams, isSL]);

    // Helper to find engine data
    const activeRegistry = isSL ? SL_ENGINES : NS_ENGINES;
    const getEngine = (code) => activeRegistry.find((e) => e.code === code) || {};

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
    ];

    // SL Topology
    const slGridAreas = [
        { code: "MRFPE", label: "Feasibility" },
        { code: "PTE", label: "Portfolio" },
        { code: "PECA", label: "Structuring" },
    ];

    const gridAreas = isSL ? slGridAreas : nsGridAreas;
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
    };

    const slNodeCoords = {
        MRFPE: { x: -200, y: 0, z: 0 },
        PTE: { x: 0, y: 0, z: 50 },
        PECA: { x: 200, y: 0, z: 0 },
    };

    const nodeCoords = isSL ? slNodeCoords : nsNodeCoords;

    // Define connections to render as 3D beams [StartCode, EndCode]
    const nsConnections3d = [
        ["SIG", "DRE"], ["MUX", "PIE"],
        ["DRE", "GGP"], ["PIE", "GGP"],
        ["GGP", "IDN"],
        ["GGP", "SIM"], ["GGP", "DAT"],
        ["GGP", "INT"],
        ["INT", "SIM"], ["INT", "DAT"],
        ["SIM", "FLO"], ["DAT", "FLO"]
    ];

    const slConnections3d = [
        ["MRFPE", "PTE"],
        ["PTE", "PECA"]
    ];

    const connections3d = isSL ? slConnections3d : nsConnections3d;

    // Custom SL Nav
    const nav = isSL ? [
        { label: "Northfield Solidarity", to: "/pricing" }, // Matches SL Listing logic
        { label: "South Lawn", to: "/southlawn" },
        { type: "divider" },
        { label: "Documentation", to: "/southlawn/docs" },
        { label: "Pricing", to: "/southlawn/pricing" },
        { label: "System", to: "/southlawn/system" },
        { label: "Investor Relations", to: "/southlawn/investors" },
    ] : [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { type: "divider" },
        { label: "Documentation", to: "/docs" },
        { label: "Pricing", to: "/pricing" },
        { label: "System", to: "/system" },
        { label: "Investor Relations", to: "/investors" },
    ];

    return (
        <div data-theme={isSL ? "green" : "water"}>
            <Layout nav={nav}>
                <div className="explorer-container">
                    <div className="explorer-header" style={{ marginBottom: '0', textAlign: 'center' }}>
                        <h1 className="h1" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                            {isSL ? "Operating Topology" : "System Topology"}
                        </h1>
                        <p className="sub" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            {isSL
                                ? "The real estate engine constellation. From research to structuring to portfolio control."
                                : "The engine constellation. Click a node to inspect its role in the flow."}
                        </p>
                    </div>

                    <div className="topology-split">
                        {/* Left: The 3D Topology */}
                        <div className="circuit-board" style={{ padding: 0, overflow: 'hidden', background: 'transparent', border: 'none' }}>
                            <SystemTopology3D
                                nodes={gridAreas}
                                connections={connections3d}
                                nodeCoords={nodeCoords}
                                activeEngine={activeEngine}
                                setActiveEngine={setActiveEngine}
                                theme={isSL ? "green" : "water"}
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

                            <div className="ctaRow" style={{ marginTop: 'auto' }}>
                                <button className="btn panel-btn">Full Engine Spec</button>
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

/* --- 3D Experiment --- */
.experiment-section {
    margin-top: 120px;
    border-top: 1px solid var(--c-border);
    padding-top: var(--space-8);
}

.scene-3d-wrapper {
    height: 600px;
    perspective: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0) 70%);
}

.scene-3d {
    width: 0;
    height: 0;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateScene 30s infinite linear;
}

.orbit-node-wrapper {
    position: absolute;
    top: 0; left: 0;
    width: 140px; height: 100px; /* Base size */
    width: 160px; height: 110px; /* Slightly larger base */
    /* Center the wrapper on the coord */
    margin-left: -80px; margin-top: -55px;
    transform-style: preserve-3d;
    transition: z-index 0s;
}

.orbit-node-wrapper.active-wrapper {
    z-index: 100; /* Bring to front */
}

.orbit-node-wrapper.nucleus .orbit-node-card {
    background: var(--c-brand);
    color: #fff;
    box-shadow: 0 0 30px var(--c-brand);
    border-color: #fff;
}

.orbit-node-card {
    width: 100%; height: 100%;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid var(--c-border);
    border-radius: 12px;
    color: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);

    /* Counter-rotate to face screen */
    animation: counterRotate 30s infinite linear reverse;
}

.orbit-node-card:hover {
   border-color: var(--c-brand);
   box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
   transform: scale(1.05);
}

/* --- LOD Low Detail Mode --- */
.lod-low .orbit-node-card {
   padding: 4px;
   border-radius: 50px; /* Make it more pill-like or round */
   background: rgba(15, 23, 42, 0.8);
}

.node-code-compact {
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 1.5rem; /* Larger font relative to small card */
    color: var(--c-brand);
    letter-spacing: -1px;
}

/* Highlight compact nodes on hover too */
.lod-low .orbit-node-card:hover { 
    transform: scale(1.2); 
    background: var(--c-brand);
}
.lod-low .orbit-node-card:hover .node-code-compact { color: #fff; }


.orbit-node-card.active {
    background: var(--c-brand);
    border-color: #fff;
    box-shadow: 0 0 30px var(--c-brand);
    transform: scale(1.15); /* Expansion */
}

.orbit-node-card.active .node-code,
.orbit-node-card.active .node-name-3d,
.orbit-node-card.active .node-label {
    color: #fff;
    opacity: 1;
}

.orbit-node-card.active .node-status {
    background: #fff;
    box-shadow: 0 0 10px #fff;
}

.node-name-3d {
    font-size: 0.7rem;
    line-height: 1.2;
    font-weight: 600;
    margin-bottom: 4px;
    opacity: 0.8;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* --- Connection Beams (Veins) --- */
.connection-beam {
    position: absolute;
    top: 0; left: 0;
    height: 3px; /* Slightly thicker for visibility */
    background: rgba(56, 189, 248, 0.1); /* Faint track */
    transform-origin: 0 50%;
    pointer-events: none;
    margin-top: -1.5px; /* Centered based on new height */
    overflow: hidden; /* Clip the pulse */
}

/* The pumping pulse */
.connection-beam::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 50%; /* Length of the pulse tail */
    height: 100%;
    
    /* "Blood" gradient - using accent color for contrast */
    background: linear-gradient(90deg, 
        transparent 0%, 
        var(--c-accent) 50%, 
        transparent 100%
    );
    
    /* Glow effect */
    filter: drop-shadow(0 0 4px var(--c-accent));
    
    /* Animation: Pumping back and forth */
    animation: veinPump 4s infinite ease-in-out alternate;
}

@keyframes veinPump {
    0% { left: -50%; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
}

@keyframes rotateScene {
    from { transform: rotateY(0deg) rotateX(10deg); }
    to { transform: rotateY(360deg) rotateX(10deg); }
}

@keyframes counterRotate {
    from { transform: rotateX(-10deg) rotateY(0deg); }
    to { transform: rotateX(-10deg) rotateY(360deg); }
}

@media(max-width: 900px) {
    .topology-split { grid-template-columns: 1fr; }
    .node-grid { grid-template-areas: "sig mux" "dre pie" "ggp idn" "sim dat" "flo ."; }
}
`}</style>
        </div >
    );
}

