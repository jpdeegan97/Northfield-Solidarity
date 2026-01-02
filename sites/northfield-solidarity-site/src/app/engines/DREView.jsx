import React, { useState, useEffect } from 'react';
import { dreService } from '../../services/mock/MockDreService';

export default function DREView() {
    const [nodes, setNodes] = useState([]);
    const [citations, setCitations] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Add Source Form State
    const [isAddingSource, setIsAddingSource] = useState(false);
    const [newSourceTitle, setNewSourceTitle] = useState('');
    const [newSourceType, setNewSourceType] = useState('BLOG');
    const [allCitations, setAllCitations] = useState([]);
    const [addSourceMode, setAddSourceMode] = useState('NEW'); // 'NEW' or 'EXISTING'

    // State for New Features
    const [viewMode, setViewMode] = useState('DOC'); // 'DOC' or 'GRAPH'
    const [showConflicts, setShowConflicts] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [isAsking, setIsAsking] = useState(false);
    const [isAnalyzingUrl, setIsAnalyzingUrl] = useState(false);
    const [isMagicEnabled, setIsMagicEnabled] = useState(true);

    // Feature 4: Magic Paste Logic
    const handleUrlAnalysis = async (e) => {
        const val = e.target.value;
        setNewSourceTitle(val);

        if (!isMagicEnabled) return;

        // Simple heuristic: if it looks like a URL/Path, trigger "magic"
        if (val.length > 10 && (val.includes('http') || val.includes('www') || val.includes('.'))) {
            setIsAnalyzingUrl(true);
            try {
                const analysis = await dreService.analyzeUrl(val);
                setNewSourceTitle(analysis.title);
                setNewSourceType(analysis.type);
            } catch (err) {
                console.error(err);
            } finally {
                setIsAnalyzingUrl(false);
            }
        }
    };

    // Feature 3: Ask the Corpus
    const handleAskInfo = async (e) => {
        e.preventDefault();
        if (!question) return;
        setIsAsking(true);
        setAnswer(null);
        try {
            const resp = await dreService.askQuestion(selectedNode.id, question);
            setAnswer(resp);
        } catch (err) {
            console.error(err);
        } finally {
            setIsAsking(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await dreService.getResearchData();
            setNodes(data.nodes);
            setAllCitations(data.citations); // capture all global citations
            // Default to first node
            if (data.nodes.length > 0) {
                const first = data.nodes[0];
                setSelectedNode(first);
                // Filter citations for this node
                const nodeCitations = await dreService.getCitationsForNode(first.id);
                setCitations(nodeCitations);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNodeSelect = async (node) => {
        setSelectedNode(node);
        const nodeCitations = await dreService.getCitationsForNode(node.id);
        setCitations(nodeCitations);
        setIsAddingSource(false);
        setAnswer(null); // Reset Q&A
        setQuestion('');
    };

    const handleAddSource = async () => {
        if (!newSourceTitle || !selectedNode) return;

        try {
            const newCitation = await dreService.addSource(selectedNode.id, {
                title: newSourceTitle,
                type: newSourceType,
                relevance: 'PENDING'
            });

            setCitations([...citations, newCitation]);
            // Update local node source count purely for visual immediate feedback
            setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, sources: n.sources + 1 } : n));

            setIsAddingSource(false);
            setNewSourceTitle('');
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddExisting = async (citation) => {
        if (!selectedNode) return;
        try {
            const newCitation = await dreService.addSource(selectedNode.id, {
                title: citation.title,
                type: citation.type,
                relevance: 'PENDING'
            });
            setCitations([...citations, newCitation]);
            setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, sources: n.sources + 1 } : n));
            setIsAddingSource(false);
        } catch (e) {
            console.error(e);
        }
    };

    const RELEVANCE_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    const getRelevanceColor = (rel) => {
        switch (rel) {
            case 'CRITICAL': return 'text-emerald-400 font-bold';
            case 'HIGH': return 'text-sky-400 font-bold';
            case 'MEDIUM': return 'text-amber-400';
            case 'LOW': return 'text-white/40';
            default: return 'text-white/40';
        }
    };

    const toggleRelevance = async (citation, e) => {
        e.stopPropagation();

        const currentIdx = RELEVANCE_LEVELS.indexOf(citation.relevance);
        const nextRelevance = currentIdx === -1
            ? 'HIGH'
            : RELEVANCE_LEVELS[(currentIdx + 1) % RELEVANCE_LEVELS.length];

        const updatedCitations = citations.map(c =>
            c.id === citation.id ? { ...c, relevance: nextRelevance } : c
        );
        setCitations(updatedCitations);

        try {
            await dreService.updateCitation(citation.id, { relevance: nextRelevance });
        } catch (error) {
            console.error("Failed to update relevance", error);
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-full text-white/50 font-mono text-xs animate-pulse">Running Deep Contextual Analysis...</div>;
    }

    if (!selectedNode) return null;

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Research Index */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-sm bg-white animate-pulse`} />
                            Knowledge Graph
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">INDEXED: {nodes.length + 14200}</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {nodes.map((node) => {
                            const isSelected = selectedNode.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    onClick={() => handleNodeSelect(node)}
                                    className={`
                                        p-4 rounded border cursor-pointer transition-all group relative
                                        ${isSelected
                                            ? `bg-white/10 border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                                            : `bg-black/20 border-white/10 hover:border-white/30`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold text-white/70 tracking-tight">{node.category}</div>
                                        <span className="text-[9px] font-mono text-white/30">{node.updated}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white leading-tight mb-2 group-hover:text-white/90">{node.title}</h4>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-white" style={{ width: `${node.confidence * 100}%` }} />
                                            </div>
                                            <span className="text-[9px] font-mono text-white/50">{Math.round(node.confidence * 100)}% CONF</span>
                                        </div>
                                        <span className="text-[9px] text-white/30">{node.sources} SOURCES</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Document Viewer / Reader Mode */}
            <div className="flex-1 flex flex-col items-center justify-start pt-12 px-12 pointer-events-auto h-full overflow-hidden relative">

                {/* View Mode Toggle */}
                <div className="absolute top-4 right-16 flex bg-black/50 rounded-lg p-1 border border-white/10 backdrop-blur z-10">
                    <button
                        onClick={() => setViewMode('DOC')}
                        className={`text-[10px] px-3 py-1 rounded transition-all ${viewMode === 'DOC' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'}`}
                    >
                        DOCUMENT
                    </button>
                    <button
                        onClick={() => setViewMode('GRAPH')}
                        className={`text-[10px] px-3 py-1 rounded transition-all ${viewMode === 'GRAPH' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'}`}
                    >
                        GRAPH
                    </button>
                </div>

                {viewMode === 'DOC' && (
                    <div className="max-w-2xl w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-8 shadow-2xl overflow-y-auto max-h-[65vh] no-scrollbar relative">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-serif text-white/20">“</span>
                                <h2 className="text-2xl font-bold text-white">{selectedNode.title}</h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowConflicts(!showConflicts)}
                                    className={`text-[10px] uppercase font-bold tracking-wider border px-3 py-1.5 rounded transition-all flex items-center gap-2 ${showConflicts ? 'text-red-400 border-red-500/50 bg-red-500/10' : 'text-white/30 border-white/10 hover:text-white hover:border-white/30'}`}
                                >
                                    ⚠ Conflicts {showConflicts ? 'ON' : 'OFF'}
                                </button>
                                <button
                                    onClick={async () => {
                                        setIsLoading(true);
                                        await new Promise(r => setTimeout(r, 1500));
                                        setIsLoading(false);
                                    }}
                                    className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded hover:bg-emerald-500/20 transition-all flex items-center gap-2"
                                >
                                    <span className="animate-spin-slow">⟳</span> Recontextualize
                                </button>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-sm">
                            <p className="text-white/80 leading-relaxed mb-4">
                                {selectedNode.content || "Loading content..."}
                            </p>

                            {/* Fake Conflict Content */}
                            <p className="text-white/80 leading-relaxed mb-4">
                                {showConflicts ? (
                                    <>
                                        Early indicators from {selectedNode.sources} distinct sources <span className="bg-red-500/20 text-red-200 px-1 rounded">point towards a convergence</span> on this topic,
                                        though <span className="bg-blue-500/20 text-blue-200 px-1 rounded">minority reports suggest divergence</span>.
                                    </>
                                ) : (
                                    `Early indicators from ${selectedNode.sources} distinct sources point towards a convergence on this topic, though minority reports suggest divergence.`
                                )}
                                Unlike monolithic approaches, this new paradigm offers distinct advantages in scalability and privacy preservation.
                            </p>

                            <blockquote className="border-l-2 border-white/50 pl-4 italic text-white/60 my-6">
                                "Deep research requires not just aggregation, but synthesis of diverse signals."
                            </blockquote>

                            <h4 className="text-white font-bold mb-2 mt-6">Key Findings</h4>
                            <ul className="list-disc pl-5 text-white/70 space-y-1">
                                <li>Analysis pending final confidence score verification ({Math.round(selectedNode.confidence * 100)}%).</li>
                                <li>Signal-to-noise ratio in current dataset is favorable.</li>
                                <li>Cross-reference validation required for {Math.floor(selectedNode.sources / 3)} outliers.</li>
                            </ul>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-mono">
                            <span>ID: {selectedNode.id}</span>
                            <span>HASH: 0x82...1a</span>
                        </div>
                    </div>
                )}

                {/* Feature 2: Graph View */}
                {viewMode === 'GRAPH' && (
                    <div className="max-w-2xl w-full h-[65vh] bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                            <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="300" cy="200" r="150" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4" />
                                <circle cx="300" cy="200" r="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
                                <line x1="150" y1="200" x2="450" y2="200" stroke="white" strokeOpacity="0.1" />
                                <line x1="300" y1="50" x2="300" y2="350" stroke="white" strokeOpacity="0.1" />
                            </svg>
                        </div>
                        {/* Mock Nodes */}
                        <div className="relative w-full h-full">
                            {/* Center Node */}
                            <div className="absolute left-[45%] top-[45%] w-20 h-20 bg-white text-black rounded-full flex items-center justify-center text-[9px] font-bold text-center p-2 z-10 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse-slow">
                                {selectedNode.title.split(' ')[0]}
                            </div>
                            {/* Orbiting Nodes */}
                            {nodes.filter(n => n.id !== selectedNode.id).slice(0, 5).map((n, i) => {
                                const angle = (i / (nodes.length - 1)) * 2 * Math.PI;
                                const radius = 120;
                                const x = 300 + radius * Math.cos(angle) - 30; // 30 is half width
                                const y = 200 + radius * Math.sin(angle) - 15;
                                return (
                                    <div
                                        key={n.id}
                                        style={{ left: `${x}px`, top: `${y}px` }}
                                        className="absolute w-16 h-8 bg-black/80 border border-white/30 rounded flex items-center justify-center text-[8px] text-center text-white/70 hover:bg-white/10 cursor-pointer hover:scale-110 transition-all"
                                        onClick={() => handleNodeSelect(n)}
                                    >
                                        {n.title.slice(0, 15)}...
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Feature 3: Ask the Corpus (Floating Question Bar) */}
                <div className="max-w-2xl w-full mt-4 bg-black/90 border border-white/20 rounded-lg p-3 backdrop-blur-md shadow-xl z-20">
                    {answer ? (
                        <div className="mb-2 p-2 bg-white/5 border border-emerald-500/30 rounded text-xs text-emerald-100 font-mono animate-fade-in-up">
                            <span className="text-emerald-500 font-bold mr-2">QUERY_RESULT:</span>
                            {answer}
                            <button onClick={() => setAnswer(null)} className="ml-4 text-[9px] underline opacity-50 hover:opacity-100">CLEAR</button>
                        </div>
                    ) : null}
                    <form onSubmit={handleAskInfo} className="flex gap-2">
                        <span className="font-mono text-emerald-500 py-1.5 px-2 text-xs">{'>'}</span>
                        <input
                            type="text"
                            className="bg-transparent border-none text-white text-xs font-mono w-full focus:outline-none placeholder-white/30"
                            placeholder="Ask the corpus a question about this topic..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isAsking}
                        />
                        {isAsking && <span className="text-xs text-white/50 animate-pulse font-mono">THINKING...</span>}
                    </form>
                </div>
            </div>

            {/* RIGHT: Context & Sources */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Source Material ({citations.length})</h3>
                    <div className="space-y-2 mb-4">
                        {citations.map((cit) => (
                            <div
                                key={cit.id}
                                onClick={(e) => toggleRelevance(cit, e)}
                                className="p-2 border border-white/5 bg-white/5 rounded hover:bg-white/10 cursor-pointer transition-colors select-none group"
                            >
                                <div className="text-[9px] text-white/40 uppercase mb-1 flex justify-between">
                                    <span>{cit.type}</span>
                                    <span className={`${getRelevanceColor(cit.relevance)} transition-colors`}>
                                        {cit.relevance}
                                    </span>
                                </div>
                                <div className="text-xs text-white font-serif group-hover:text-white/90">{cit.title}</div>
                            </div>
                        ))}
                        {citations.length === 0 && <div className="text-xs text-white/30 italic text-center py-4">No sources linked yet.</div>}
                    </div>

                    {/* Add Source UI with Feature 4: Magic Paste */}
                    {isAddingSource ? (
                        <div className="p-3 bg-white/5 border border-white/20 rounded animate-fade-in-up">
                            {/* Toggle Mode */}
                            <div className="flex mb-3 border-b border-white/10 pb-2">
                                <button
                                    onClick={() => setAddSourceMode('NEW')}
                                    className={`text-[9px] flex-1 font-bold ${addSourceMode === 'NEW' ? 'text-emerald-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    NEW (MAGIC)
                                </button>
                                <button
                                    onClick={() => setAddSourceMode('EXISTING')}
                                    className={`text-[9px] flex-1 font-bold ${addSourceMode === 'EXISTING' ? 'text-emerald-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    EXISTING
                                </button>
                            </div>

                            {addSourceMode === 'NEW' ? (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-xs font-bold text-white">Details</div>
                                        <label className="flex items-center gap-1 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={isMagicEnabled}
                                                onChange={(e) => setIsMagicEnabled(e.target.checked)}
                                                className="accent-emerald-500 w-3 h-3 cursor-pointer"
                                            />
                                            <span className={`text-[9px] font-mono tracking-wider ${isMagicEnabled ? 'text-emerald-400' : 'text-white/30'}`}>MAGIC</span>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Paste URL (Auto-Analyze)"
                                            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white mb-2 focus:border-emerald-500/50 focus:outline-none transition-colors"
                                            value={newSourceTitle}
                                            onChange={handleUrlAnalysis}
                                            autoFocus
                                        />
                                        {isAnalyzingUrl && (
                                            <div className="absolute right-2 top-1.5 text-[8px] text-emerald-400 font-mono animate-pulse">ANALYZING...</div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mb-2">
                                        <select
                                            className="bg-black/50 border border-white/10 rounded text-[10px] text-white px-1 py-1 flex-1 focus:outline-none cursor-pointer"
                                            value={newSourceType}
                                            onChange={(e) => setNewSourceType(e.target.value)}
                                        >
                                            <option value="BLOG">BLOG</option>
                                            <option value="PAPER">PAPER</option>
                                            <option value="DOCS">DOCS</option>
                                            <option value="NEWS">NEWS</option>
                                            <option value="OTHER">OTHER</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleAddSource}
                                            className="flex-1 bg-white text-black text-[10px] font-bold py-1.5 rounded hover:bg-gray-200"
                                        >
                                            ADD
                                        </button>
                                        <button
                                            onClick={() => setIsAddingSource(false)}
                                            className="flex-1 bg-transparent border border-white/20 text-white text-[10px] font-bold py-1.5 rounded hover:bg-white/10"
                                        >
                                            CANCEL
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-xs font-bold text-white mb-2">Select From Corpus</div>
                                    <div className="max-h-40 overflow-y-auto space-y-1 mb-2 pr-1 custom-scrollbar">
                                        {allCitations.filter(c => !citations.some(existing => existing.title === c.title)).length === 0 ? (
                                            <div className="text-[9px] text-white/30 italic">No other unique sources found.</div>
                                        ) : allCitations
                                            .filter(c => !citations.some(existing => existing.title === c.title))
                                            // Deduplicate by title for display
                                            .filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
                                            .map(c => (
                                                <div
                                                    key={c.id}
                                                    onClick={() => handleAddExisting(c)}
                                                    className="p-1.5 bg-black/40 border border-white/5 rounded cursor-pointer hover:bg-emerald-500/10 hover:border-emerald-500/30 group transition-all"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] text-emerald-500/70 font-mono">{c.type}</span>
                                                        <span className="text-[9px] text-white/20 group-hover:text-emerald-400">+ ADD</span>
                                                    </div>
                                                    <div className="text-[10px] text-white/80 truncate">{c.title}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button
                                        onClick={() => setIsAddingSource(false)}
                                        className="w-full bg-transparent border border-white/20 text-white text-[10px] font-bold py-1.5 rounded hover:bg-white/10"
                                    >
                                        CANCEL
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingSource(true)}
                            className="w-full py-2 border border-dashed border-white/20 text-white/40 text-xs rounded hover:border-white/40 hover:text-white/60 transition-all flex items-center justify-center gap-2"
                        >
                            <span>+</span> ADD NEW SOURCE
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}
