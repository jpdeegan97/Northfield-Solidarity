import React, { useState } from 'react';
import { Search, Database, Share2, Activity, Filter, Eye, Copy, ExternalLink, Shield, Hash, Clock, Server, ZoomIn, ZoomOut, Maximize, AlertTriangle, CheckCircle, Info, XCircle, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for MINT Artifacts
const MOCK_ARTIFACTS = [
    { id: 'art-001', type: 'SCHEMA', name: 'UserIdentityV2', tags: ['core', 'auth'], provenance: 'git:auth-service', confidence: 100, owner: 'Identity Team' },
    { id: 'art-002', type: 'METRIC', name: 'daily_active_nodes', tags: ['kpi', 'growth'], provenance: 'prom:aggregator', confidence: 95, owner: 'Growth' },
    { id: 'art-003', type: 'POLICY', name: 'DataRetention_EU', tags: ['compliance', 'gdpr'], provenance: 'manual:legal', confidence: 100, owner: 'Legal' },
    { id: 'art-004', type: 'EVENT', name: 'NodeHandshake', tags: ['protocol', 'p2p'], provenance: 'code:p2p-lib', confidence: 90, owner: 'Core' },
    { id: 'art-005', type: 'DATASET', name: 'MarketVol_Q4', tags: ['finance', 'historical'], provenance: 'job:batch-66', confidence: 85, owner: 'Data Science' },
];

export default function MintView() {
    const [activeTab, setActiveTab] = useState('SEARCH'); // SEARCH, GRAPH, TELEMETRY
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [status] = useState('OPERATIONAL');

    // Filter Logic
    const filteredArtifacts = MOCK_ARTIFACTS.filter(art =>
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full bg-[#050505] text-[#a1a1aa] font-mono flex flex-col text-xs overflow-hidden selection:bg-cyan-900 selection:text-white">

            {/* Header / Status Bar */}
            <header className="h-10 flex items-center justify-between px-4 border-b border-[#27272a] bg-[#09090b]">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#22d3ee]">
                        <Database size={14} />
                        <span className="font-bold tracking-widest text-sm">MINT</span>
                    </div>
                    <div className="h-4 w-[1px] bg-[#27272a]" />
                    <nav className="flex gap-4">
                        {['SEARCH', 'GRAPH', 'TELEMETRY'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`hover:text-white transition-colors ${activeTab === tab ? 'text-white font-bold underline underline-offset-4 decoration-[#22d3ee]' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] opacity-50">SHARD: us-east-1a</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#111] border border-[#27272a]">
                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'OPERATIONAL' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[9px] uppercase tracking-wider text-white">{status}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Panel: Search & List */}
                <div className={`w-80 flex flex-col border-r border-[#27272a] bg-[#0c0c0e] ${activeTab !== 'SEARCH' ? 'hidden md:flex' : ''}`}>
                    <div className="p-3 border-b border-[#27272a]">
                        <div className="relative">
                            <Search className="absolute left-2 top-2 text-[#52525b]" size={14} />
                            <input
                                type="text"
                                placeholder="Query index (keyword, id, tag)..."
                                className="w-full bg-[#18181b] border border-[#27272a] rounded px-8 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all font-mono"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute right-2 top-2 flex items-center gap-1">
                                <span className="p-0.5 rounded bg-[#27272a] text-[9px] min-w-[1.2em] text-center">⌘</span>
                                <span className="p-0.5 rounded bg-[#27272a] text-[9px] min-w-[1.2em] text-center">K</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button className="flex-1 flex items-center justify-center gap-1 py-1 bg-[#18181b] hover:bg-[#27272a] rounded border border-[#27272a] text-[10px]">
                                <Filter size={10} /> Filters
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-1 py-1 bg-[#18181b] hover:bg-[#27272a] rounded border border-[#27272a] text-[10px]">
                                Scope: Global
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="px-3 py-2 text-[10px] font-bold text-[#52525b] uppercase tracking-widest flex justify-between">
                            <span>Artifacts</span>
                            <span>{filteredArtifacts.length} found</span>
                        </div>
                        {filteredArtifacts.map(art => (
                            <div
                                key={art.id}
                                onClick={() => setSelectedArtifact(art)}
                                className={`px-3 py-3 border-b border-[#27272a] cursor-pointer hover:bg-[#18181b] transition-colors group ${selectedArtifact?.id === art.id ? 'bg-[#18181b] border-l-2 border-l-[#22d3ee]' : 'border-l-2 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-[#e4e4e7] group-hover:text-[#22d3ee] transition-colors">{art.name}</span>
                                    <span className={`text-[9px] px-1 py-0.5 rounded border ${getTypeColor(art.type)}`}>{art.type}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-[#71717a]">
                                    <span className="font-mono">{art.id}</span>
                                    <span>{art.owner}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Detail / Graph / Telemetry View */}
                <div className="flex-1 bg-[#09090b] flex flex-col relative">

                    {/* View: SEARCH (Artifact Detail) */}
                    {activeTab === 'SEARCH' && selectedArtifact ? (
                        <div className="flex flex-col h-full animate-in fade-in duration-200">
                            {/* Toolbar */}
                            <div className="h-10 border-b border-[#27272a] flex items-center justify-between px-4 bg-[#0c0c0e]">
                                <div className="flex items-center gap-2 text-[#e4e4e7]">
                                    <span className="font-bold text-sm">{selectedArtifact.name}</span>
                                    <Copy size={12} className="opacity-50 hover:opacity-100 cursor-pointer" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 hover:bg-[#27272a] rounded" title="View Graph"><Share2 size={14} /></button>
                                    <button className="p-1 hover:bg-[#27272a] rounded" title="View Raw"><Hash size={14} /></button>
                                    <button className="p-1 hover:bg-[#27272a] rounded" title="Open External"><ExternalLink size={14} /></button>
                                </div>
                            </div>

                            <div className="p-8 max-w-4xl mx-auto w-full overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Main Metadata */}
                                    <div className="md:col-span-2 space-y-6">
                                        <Section title="Overview">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <Field label="Type" value={selectedArtifact.type} />
                                                <Field label="Owner" value={selectedArtifact.owner} />
                                                <Field label="Created" value="2025-12-30 14:22:01 UTC" />
                                                <Field label="Updated" value="2025-12-31 09:15:00 UTC" />
                                            </div>
                                        </Section>

                                        <Section title="Tags">
                                            <div className="flex gap-2">
                                                {selectedArtifact.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 rounded bg-[#27272a] text-[#a1a1aa] text-[10px] uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </Section>

                                        <Section title="Definition Schema (JSON)">
                                            <pre className="bg-[#0c0c0e] p-4 rounded border border-[#27272a] text-[10px] text-[#a1a1aa] overflow-x-auto">
                                                {JSON.stringify({
                                                    "$schema": "mint/v1",
                                                    "kind": selectedArtifact.type,
                                                    "metadata": {
                                                        "name": selectedArtifact.name,
                                                        "labels": selectedArtifact.tags
                                                    },
                                                    "spec": {
                                                        "fields": [
                                                            { "name": "id", "type": "uuid" },
                                                            { "name": "email", "type": "string", "pii": true }
                                                        ]
                                                    }
                                                }, null, 2)}
                                            </pre>
                                        </Section>
                                    </div>

                                    {/* Sidebar Metadata */}
                                    <div className="space-y-6">
                                        <div className="bg-[#0c0c0e] border border-[#27272a] rounded p-4 space-y-4">
                                            <div className="flex items-center gap-2 text-[#22d3ee] mb-2">
                                                <Shield size={16} />
                                                <span className="font-bold text-xs uppercase tracking-wider">Provenance</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="opacity-50">Source</span>
                                                    <span className="font-mono text-[#e4e4e7]">{selectedArtifact.provenance}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="opacity-50">Confidence</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-1 w-16 bg-[#27272a] rounded-full overflow-hidden">
                                                            <div className="h-full bg-green-500" style={{ width: `${selectedArtifact.confidence}%` }} />
                                                        </div>
                                                        <span className={selectedArtifact.confidence > 90 ? 'text-green-500' : 'text-yellow-500'}>
                                                            {selectedArtifact.confidence}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px]">
                                                    <span className="opacity-50">Verified By</span>
                                                    <span className="text-[#e4e4e7]">NS-SIGN-KEY-09</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Section title="Related Metrics">
                                            <div className="space-y-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="flex items-center justify-between p-2 bg-[#0c0c0e] border border-[#27272a] rounded">
                                                        <div className="flex items-center gap-2">
                                                            <Activity size={12} className="text-[#a1a1aa]" />
                                                            <span className="text-[10px]">read_latency_p99</span>
                                                        </div>
                                                        <span className="font-mono text-[10px] text-[#22d3ee]">12ms</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'SEARCH' ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-[#27272a] select-none">
                            <Database size={64} strokeWidth={1} />
                            <div className="mt-4 font-bold tracking-widest text-[#52525b]">SELECT AN ARTIFACT</div>
                        </div>
                    ) : null}

                    {/* View: GRAPH */}
                    {activeTab === 'GRAPH' && (
                        <GraphExplorer
                            onSelectNode={setSelectedArtifact}
                            selectedNode={selectedArtifact}
                        />
                    )}

                    {/* View: TELEMETRY */}
                    {activeTab === 'TELEMETRY' && (
                        <TelemetryStream />
                    )}

                </div>
            </div>

            {/* Footer */}
            <footer className="h-6 bg-[#0c0c0e] border-t border-[#27272a] px-3 flex items-center justify-between text-[9px] text-[#52525b]">
                <div className="flex gap-4">
                    <span>Index Size: 14.2TB</span>
                    <span>Artifacts: 8.4M</span>
                    <span>Edges: 42M</span>
                </div>
                <div className="flex gap-2 font-mono">
                    <Server size={10} />
                    <span>MINT-CORE-V1.0.2</span>
                </div>
            </footer>
        </div>
    );
}

// Helpers
function Section({ title, children }) {
    return (
        <div>
            <h3 className="text-[10px] font-bold text-[#52525b] uppercase tracking-widest mb-3 border-b border-[#27272a] pb-1">{title}</h3>
            {children}
        </div>
    );
}

function Field({ label, value }) {
    return (
        <div>
            <div className="text-[10px] text-[#52525b] mb-1">{label}</div>
            <div className="text-[#e4e4e7] font-medium">{value}</div>
        </div>
    );
}

function getTypeColor(type) {
    const map = {
        'SCHEMA': 'text-purple-400 border-purple-500/20 bg-purple-500/10',
        'METRIC': 'text-green-400 border-green-500/20 bg-green-500/10',
        'POLICY': 'text-red-400 border-red-500/20 bg-red-500/10',
        'EVENT': 'text-orange-400 border-orange-500/20 bg-orange-500/10',
        'DATASET': 'text-blue-400 border-blue-500/20 bg-blue-500/10'
    };
    return map[type] || 'text-[#a1a1aa] border-[#27272a] bg-[#18181b]';
}

// --- TELEMETRY COMPONENTS ---

function TelemetryStream() {
    const [events, setEvents] = useState([
        { id: 'evt-001', type: 'INFO', msg: 'Mint Indexer initialized', source: 'mint-core', ts: Date.now() - 10000 },
        { id: 'evt-002', type: 'SUCCESS', msg: 'Schema UserIdentityV2 validated', source: 'schema-validator', ts: Date.now() - 8000 },
        { id: 'evt-003', type: 'WARN', msg: 'High latency on artifact retrieval', source: 'db-shard-01', ts: Date.now() - 5000 },
    ]);
    const [isPaused, setIsPaused] = useState(false);

    // Simulate incoming stream
    React.useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            const types = ['INFO', 'SUCCESS', 'WARN', 'ERROR'];
            const sources = ['mint-core', 'schema-validator', 'policy-engine', 'indexer', 'api-gateway'];
            const messages = [
                'Artifact cache miss',
                'New schema version detected',
                'Policy compliance check passed',
                'Rate limit approached for API client',
                'Index compaction started',
                'Definition validation failed'
            ];

            const newEvent = {
                id: `evt-${Date.now()}`,
                type: types[Math.floor(Math.random() * types.length)],
                source: sources[Math.floor(Math.random() * sources.length)],
                msg: messages[Math.floor(Math.random() * messages.length)],
                ts: Date.now()
            };

            setEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep last 50
        }, 2000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="flex-1 flex flex-col bg-[#050505] p-4 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 border-b border-[#27272a] pb-2">
                <div className="flex items-center gap-2 text-[#e4e4e7]">
                    <Activity size={14} className="text-[#22d3ee]" />
                    <span className="font-bold text-sm tracking-wide">LIVE TELEMETRY</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] uppercase font-bold transition-colors ${isPaused ? 'bg-[#27272a] text-[#a1a1aa] border-[#27272a]' : 'bg-[#22d3ee]/10 text-[#22d3ee] border-[#22d3ee]/20'}`}
                    >
                        {isPaused ? <Play size={10} fill="currentColor" /> : <Pause size={10} fill="currentColor" />}
                        {isPaused ? 'RESUME' : 'PAUSE'}
                    </button>
                    <div className="text-[10px] text-[#52525b] px-2">
                        {events.length} events (buffer)
                    </div>
                </div>
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-2 font-mono">
                <AnimatePresence initial={false}>
                    {events.map(evt => (
                        <motion.div
                            key={evt.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3 p-2 border-l-2 border-[#27272a] bg-[#0c0c0e] hover:bg-[#18181b] text-[11px]"
                            style={{ borderLeftColor: getEventColor(evt.type, true) }}
                        >
                            <span className="text-[#52525b] min-w-[60px]">{new Date(evt.ts).toLocaleTimeString().split(' ')[0]}</span>
                            <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold min-w-[50px] text-center bg-black/50 ${getEventColor(evt.type)}`}>
                                {evt.type}
                            </div>
                            <span className="text-[#71717a] min-w-[100px]">{evt.source}</span>
                            <span className="text-[#e4e4e7] flex-1 truncate">{evt.msg}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function getEventColor(type, hex = false) {
    if (hex) {
        switch (type) {
            case 'INFO': return '#3b82f6';
            case 'SUCCESS': return '#22c55e';
            case 'WARN': return '#eab308';
            case 'ERROR': return '#ef4444';
            default: return '#71717a';
        }
    }
    switch (type) {
        case 'INFO': return 'text-blue-400';
        case 'SUCCESS': return 'text-green-400';
        case 'WARN': return 'text-yellow-400';
        case 'ERROR': return 'text-red-400';
        default: return 'text-[#71717a]';
    }
}

// --- GRAPH EXPLORER COMPONENTS ---

const GRAPH_NODES = [
    // Core Identity
    { id: 'art-001', x: 400, y: 300, type: 'SCHEMA' },
    // Linked Policies
    { id: 'art-003', x: 250, y: 200, type: 'POLICY' },
    { id: 'pol-002', x: 550, y: 200, type: 'POLICY', name: 'AuthTimeout', owner: 'Security' },
    // Events/Telemetry
    { id: 'art-004', x: 400, y: 450, type: 'EVENT' },
    { id: 'evt-002', x: 250, y: 400, type: 'EVENT', name: 'LoginFailed', owner: 'Identity' },
    // Metrics
    { id: 'art-002', x: 600, y: 350, type: 'METRIC' },
    // Datasets
    { id: 'art-005', x: 100, y: 300, type: 'DATASET' },
];

const GRAPH_EDGES = [
    { source: 'art-001', target: 'art-003', label: 'governed_by' },
    { source: 'art-001', target: 'pol-002', label: 'governed_by' },
    { source: 'art-004', target: 'art-001', label: 'emitted_by' },
    { source: 'evt-002', target: 'art-001', label: 'emitted_by' },
    { source: 'art-002', target: 'art-001', label: 'observes' },
    { source: 'art-003', target: 'art-005', label: 'regulates' },
];

function GraphExplorer({ onSelectNode, selectedNode }) {
    const [scale, setScale] = useState(1);

    // Merge mock artifacts with graph nodes to ensure we have names/types
    const nodes = GRAPH_NODES.map(node => {
        const artifact = MOCK_ARTIFACTS.find(a => a.id === node.id);
        return {
            ...node,
            name: artifact?.name || node.name || node.id,
            owner: artifact?.owner || node.owner || 'System',
            type: artifact?.type || node.type
        };
    });

    return (
        <div className="flex-1 relative bg-[#050505] overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Graph Toolbar */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button onClick={() => setScale(s => Math.min(s + 0.1, 2))} className="p-2 bg-[#18181b] border border-[#27272a] rounded hover:text-white transition-colors">
                    <ZoomIn size={14} />
                </button>
                <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} className="p-2 bg-[#18181b] border border-[#27272a] rounded hover:text-white transition-colors">
                    <ZoomOut size={14} />
                </button>
                <button onClick={() => setScale(1)} className="p-2 bg-[#18181b] border border-[#27272a] rounded hover:text-white transition-colors">
                    <Maximize size={14} />
                </button>
            </div>

            {/* Canvas */}
            <motion.div
                className="w-full h-full flex items-center justify-center p-10"
                drag
                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                style={{ scale }}
            >
                <svg width="100%" height="100%" viewBox="0 0 800 600" className="overflow-visible">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3f3f46" />
                        </marker>
                    </defs>

                    {/* Edges */}
                    {GRAPH_EDGES.map((edge, i) => {
                        const start = nodes.find(n => n.id === edge.source);
                        const end = nodes.find(n => n.id === edge.target);
                        if (!start || !end) return null;

                        return (
                            <g key={i}>
                                <line
                                    x1={start.x} y1={start.y}
                                    x2={end.x} y2={end.y}
                                    stroke="#27272a"
                                    strokeWidth="1"
                                    markerEnd="url(#arrowhead)"
                                />
                                <text
                                    x={(start.x + end.x) / 2}
                                    y={(start.y + end.y) / 2}
                                    textAnchor="middle"
                                    fill="#52525b"
                                    fontSize="8"
                                    dy="-5"
                                    className="bg-black"
                                >
                                    {edge.label}
                                </text>
                            </g>
                        );
                    })}

                    {/* Nodes */}
                    {nodes.map(node => {
                        const isSelected = selectedNode?.id === node.id;
                        const colorClass = getTypeColor(node.type);
                        // Extract hex color approximation for SVG fill
                        let strokeColor = '#3f3f46';
                        if (colorClass.includes('purple')) strokeColor = '#a855f7';
                        if (colorClass.includes('green')) strokeColor = '#22c55e';
                        if (colorClass.includes('red')) strokeColor = '#ef4444';
                        if (colorClass.includes('blue')) strokeColor = '#3b82f6';

                        return (
                            <g
                                key={node.id}
                                onClick={(e) => { e.stopPropagation(); onSelectNode(node); }}
                                className="cursor-pointer transition-all duration-300"
                                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                            >
                                {/* Glow */}
                                {isSelected && (
                                    <circle cx={node.x} cy={node.y} r="35" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.5" className="animate-pulse" />
                                )}

                                {/* Core Circle */}
                                <circle
                                    cx={node.x} cy={node.y} r="20"
                                    fill="#09090b"
                                    stroke={isSelected ? strokeColor : '#27272a'}
                                    strokeWidth={isSelected ? 2 : 1}
                                />

                                {/* Icon / Label */}
                                <foreignObject x={node.x - 10} y={node.y - 10} width="20" height="20" className="pointer-events-none flex items-center justify-center text-white">
                                    <div className={`w-full h-full flex items-center justify-center opacity-80 ${isSelected ? 'text-white' : 'text-[#71717a]'}`}>
                                        {getActiveIcon(node.type)}
                                    </div>
                                </foreignObject>

                                {/* Text Label */}
                                <text
                                    x={node.x} y={node.y + 35}
                                    textAnchor="middle"
                                    fill={isSelected ? '#fff' : '#71717a'}
                                    fontSize="10"
                                    fontWeight={isSelected ? 'bold' : 'normal'}
                                >
                                    {node.name}
                                </text>
                                <text
                                    x={node.x} y={node.y + 45}
                                    textAnchor="middle"
                                    fill="#52525b"
                                    fontSize="8"
                                >
                                    {node.type}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </motion.div>
        </div>
    );
}

function getActiveIcon(type) {
    switch (type) {
        case 'SCHEMA': return <Database size={12} />;
        case 'METRIC': return <Activity size={12} />;
        case 'POLICY': return <Shield size={12} />;
        case 'EVENT': return <Share2 size={12} />;
        case 'DATASET': return <Hash size={12} />;
        default: return <Server size={12} />;
    }
}
