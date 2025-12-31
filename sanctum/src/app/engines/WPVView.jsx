import React, { useState } from 'react';
import { Network, FileText, Search, Share2, Maximize2, Download } from 'lucide-react';

const WPVView = ({ engine, title, content }) => {
    // Dynamic Data with Fallback
    const displayTitle = title || "NS-WPV-CHARTER.md";
    const displayContent = content || "Turn dense research into visual explanations... (No content provided)";

    // Simple mock parser for "sections" if real content isn't structured
    const [activeSection, setActiveSection] = useState('mission');

    // In a real implementation, this would parse markdown headers. 
    // Here we wrap the content in a single section if simple string, or use mock if default.
    const isDefault = !title && !content;

    const sections = isDefault ? [
        { id: 'mission', label: 'Mission', content: 'Turn dense research into visual explanations.' },
        { id: 'why', label: 'The Why', content: 'High-signal, low-access. Need inspectability.' },
        { id: 'scope', label: 'Scope', content: 'Input: PDF/MD. Output: Interactive Graph.' },
        { id: 'metrics', label: 'Success Metrics', content: '90% Anchor Validity. 50% Time Reduction.' },
    ] : [
        { id: 'start', label: 'Content', content: displayContent.substring(0, 500) + (displayContent.length > 500 ? '...' : '') }
    ];

    const graphNodes = [
        { id: 'n1', x: 50, y: 50, label: 'Input (PDF)' },
        { id: 'n2', x: 250, y: 50, label: 'Extraction' },
        { id: 'n3', x: 450, y: 50, label: 'Structure' },
        { id: 'n4', x: 450, y: 200, label: 'Visual Engine' },
        { id: 'n5', x: 650, y: 200, label: 'Output (Graph)' },
    ];

    const connections = [
        ['n1', 'n2'],
        ['n2', 'n3'],
        ['n3', 'n4'],
        ['n4', 'n5']
    ];

    return (
        <div className="w-full h-full bg-slate-950 text-white flex flex-col font-mono">
            {/* Header */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-brand/20 rounded text-brand">
                        <FileText size={18} />
                    </div>
                    <div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">Reading</div>
                        <div className="font-bold text-sm">{displayTitle}</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white" title="Search">
                        <Search size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white" title="Export">
                        <Download size={16} />
                    </button>
                    <button className="px-3 py-1.5 bg-brand text-black text-xs font-bold rounded flex items-center gap-2 hover:bg-brand/90">
                        <Network size={14} />
                        VISUALIZE
                    </button>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Source Text */}
                <div className="w-1/2 border-r border-white/10 flex flex-col bg-slate-900/20">
                    <div className="p-2 border-b border-white/5 text-[10px] text-white/40 uppercase tracking-widest flex justify-between">
                        <span>Source View</span>
                        <span>Markdown</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 font-serif text-white/80 leading-relaxed max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6 text-white">000 CHARTER — NS-WPV White Paper Visualizer</h1>

                        {sections.map(s => (
                            <div
                                key={s.id}
                                className={`mb-8 p-4 rounded transition-colors cursor-pointer border border-transparent ${activeSection === s.id ? 'bg-brand/10 border-brand/30' : 'hover:bg-white/5'}`}
                                onClick={() => setActiveSection(s.id)}
                            >
                                <h2 className="text-lg font-bold mb-2 text-brand">{s.label}</h2>
                                <p>{s.content}</p>
                            </div>
                        ))}

                        <div className="text-white/30 italic mt-8 text-sm">
                            [End of Document Endpoint]
                        </div>
                    </div>
                </div>

                {/* Right: Visual Graph */}
                <div className="w-1/2 flex flex-col relative bg-slate-950">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    <div className="p-2 border-b border-white/5 text-[10px] text-white/40 uppercase tracking-widest flex justify-between z-10 bg-slate-950/80 backdrop-blur">
                        <span>Graph View</span>
                        <span>Force-Directed</span>
                    </div>

                    <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                        <svg className="w-full h-full absolute inset-0">
                            {/* Lines */}
                            {connections.map(([start, end], i) => {
                                const sNode = graphNodes.find(n => n.id === start);
                                const eNode = graphNodes.find(n => n.id === end);
                                return (
                                    <line
                                        key={i}
                                        x1={sNode.x} y1={sNode.y}
                                        x2={eNode.x} y2={eNode.y}
                                        stroke="rgba(255,255,255,0.2)"
                                        strokeWidth="2"
                                    />
                                );
                            })}

                            {/* Nodes */}
                            {graphNodes.map(node => (
                                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                                    <circle r="6" fill="#00ff9d" className="animate-pulse" />
                                    <circle r="40" fill="transparent" stroke="rgba(0, 255, 157, 0.1)" strokeWidth="1" />
                                    <text y="20" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" className="uppercase tracking-wider opacity-60">
                                        {node.label}
                                    </text>
                                </g>
                            ))}
                        </svg>

                        {/* Floating "Sync" Indicator */}
                        <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur border border-brand/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                                <div className="text-xs font-bold text-brand">SYNC ACTIVE</div>
                            </div>
                            <div className="text-[10px] text-white/50">
                                Visuals anchor to line 12:4
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WPVView;
