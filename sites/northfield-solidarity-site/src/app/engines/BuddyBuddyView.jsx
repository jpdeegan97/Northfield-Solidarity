import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Users, Calendar, Filter, Search, Info, ShieldCheck, ShieldAlert, ArrowRight, Play, Pause } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_NODES = [
    { id: 'n1', label: 'Alice Thompson', type: 'person', role: 'Journalist', verified: true },
    { id: 'n2', label: 'Bob Martinez', type: 'person', role: 'Source', verified: true },
    { id: 'n3', label: 'Global News Corp', type: 'org', role: 'Publisher', verified: true },
    { id: 'n4', label: 'Charlie Davids', type: 'person', role: 'Editor', verified: false },
    { id: 'n5', label: 'Project Blue', type: 'project', role: 'Initiative', verified: true },
    { id: 'n6', label: 'Dana Lee', type: 'person', role: 'Researcher', verified: true },
];

const INITIAL_EDGES = [
    { id: 'e1', source: 'n1', target: 'n3', label: 'Employee', start: '2020-01-01', end: null, type: 'employment', confidence: 1.0 },
    { id: 'e2', source: 'n2', target: 'n1', label: 'Source For', start: '2023-05-15', end: '2023-08-01', type: 'collaboration', confidence: 0.8 },
    { id: 'e3', source: 'n4', target: 'n3', label: 'Contractor', start: '2021-06-01', end: null, type: 'employment', confidence: 0.9 },
    { id: 'e4', source: 'n1', target: 'n4', label: 'Co-Author', start: '2022-01-01', end: '2022-03-01', type: 'collaboration', confidence: 1.0 },
    { id: 'e5', source: 'n5', target: 'n3', label: 'Funded By', start: '2022-01-01', end: null, type: 'funding', confidence: 1.0 },
    { id: 'e6', source: 'n6', target: 'n5', label: 'Lead', start: '2022-02-01', end: null, type: 'membership', confidence: 0.95 },
    { id: 'e7', source: 'n6', target: 'n1', label: 'Former College Peer', start: '2015-09-01', end: '2019-05-01', type: 'social', confidence: 0.6 },
];

const TIMELINE_START = new Date('2020-01-01').getTime();
const TIMELINE_END = new Date('2026-01-01').getTime();

// --- COMPONENTS ---

const Node = ({ node, x, y, onSelect, selected }) => (
    <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x, y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={(e) => { e.stopPropagation(); onSelect(node); }}
        style={{ cursor: 'pointer' }}
    >
        <circle
            r={selected ? 24 : 18}
            className={`fill-neutral-900 stroke-2 ${selected ? 'stroke-blue-400' : 'stroke-neutral-600'} hover:stroke-blue-400 transition-colors`}
        />
        <circle r={selected ? 24 : 18} className="fill-white/5" /> {/* Highlight overlay */}

        {/* Icon based on type */}
        <g transform="translate(-10, -10) scale(0.8)">
            {node.type === 'org' ? (
                <Network className="text-purple-400" />
            ) : node.type === 'project' ? (
                <Calendar className="text-green-400" />
            ) : (
                <Users className="text-blue-400" />
            )}
        </g>

        {/* Label */}
        <text
            y={35}
            textAnchor="middle"
            className={`text-[10px] uppercase font-bold tracking-wider fill-neutral-400 select-none ${selected ? 'fill-blue-300' : ''}`}
        >
            {node.label}
        </text>

        {/* Verification Badge */}
        {node.verified && (
            <circle cx={14} cy={-14} r={6} className="fill-green-500/20 stroke-green-500 stroke-1" />
        )}
    </motion.g>
);

const Edge = ({ edge, source, target, onSelect, selected }) => {
    if (!source || !target) return null;

    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;

    return (
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); onSelect(edge); }}
            className="group cursor-pointer"
        >
            <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                className={`stroke-2 ${selected ? 'stroke-blue-500' : 'stroke-neutral-700'} group-hover:stroke-neutral-500 transition-colors`}
                strokeDasharray={edge.confidence < 0.9 ? "4 4" : "0"}
            />
            {selected && (
                <circle cx={midX} cy={midY} r={4} className="fill-blue-500" />
            )}
        </motion.g>
    );
};

// Simple force-directed layout helpers
const simpleLayout = (nodes, width, height) => {
    // Deterministic placement for POC based on ID hash or simple index
    // In a real app, use d3-force
    const newNodes = [...nodes];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    newNodes.forEach((node, i) => {
        const angle = (i / newNodes.length) * 2 * Math.PI;
        node.x = centerX + radius * Math.cos(angle);
        node.y = centerY + radius * Math.sin(angle);

        // Add some "jitter" based on ID to make it look less perfect
        const jitter = (node.id.charCodeAt(0) % 10) * 10;
        node.x += jitter;
        node.y -= jitter;
    });
    return newNodes;
}


export default function BuddyBuddyView() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    // Layout State
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
    const [nodes, setNodes] = useState([]);

    // Initialization
    useEffect(() => {
        // Initial layout
        const layoutNodes = simpleLayout(INITIAL_NODES, dimensions.width, dimensions.height);
        setNodes(layoutNodes);
    }, [dimensions]);

    // Handle Resize
    useEffect(() => {
        const updateDim = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', updateDim);
        updateDim();
        return () => window.removeEventListener('resize', updateDim);
    }, []);

    // Time Playback
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    const next = prev + (1000 * 60 * 60 * 24 * 7 * playbackSpeed); // 1 week per tick
                    if (next > TIMELINE_END) {
                        setIsPlaying(false);
                        return TIMELINE_END;
                    }
                    return next;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed]);

    // Filtering Logic
    const visibleEdges = useMemo(() => {
        return INITIAL_EDGES.filter(edge => {
            const start = new Date(edge.start).getTime();
            const end = edge.end ? new Date(edge.end).getTime() : Infinity;
            return currentTime >= start && currentTime <= end;
        });
    }, [currentTime]);

    const visibleNodes = useMemo(() => {
        // Show nodes that have at least one visible edge, or just show all for POC context
        // Better: Show nodes that are active in this timeframe (if nodes had start/end dates)
        // For now, show all nodes, but maybe dim the unconnected ones?
        return nodes;
    }, [nodes]);

    const formatDate = (ts) => new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });


    // Zoom & Pan State
    const [viewTransform, setViewTransform] = useState({ x: 0, y: 0, k: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleWheel = (e) => {
        e.preventDefault(); // Stop page scroll
        const scaleAmount = -e.deltaY * 0.001;
        const newScale = Math.min(Math.max(0.1, viewTransform.k + scaleAmount), 5); // Limit zoom 0.1x to 5x

        // Simple zoom to center (can be improved to zoom to mouse)
        setViewTransform(prev => ({
            ...prev,
            k: newScale
        }));
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - viewTransform.x, y: e.clientY - viewTransform.y });
        setSelectedItem(null); // Click background clears selection
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setViewTransform(prev => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden relative">

            {/* === MAIN BOARD === */}
            <div
                className="flex-1 relative cursor-grab active:cursor-grabbing w-full h-full"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >

                {/* Background Grid - Panning Version */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                        backgroundSize: `${40 * viewTransform.k}px ${40 * viewTransform.k}px`,
                        backgroundPosition: `${viewTransform.x}px ${viewTransform.y}px`
                    }}
                />

                {/* Title / Header */}
                <div className="absolute top-6 left-6 pointer-events-none z-10">
                    <h1 className="text-3xl font-black tracking-tight text-white mb-1">BUDDY BUDDY</h1>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">NS-BB</span>
                        <span>RELATIONSHIP ATLAS v0.1</span>
                    </div>
                </div>

                {/* SVG Graph Layer */}
                <svg className="w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                    <g
                        className="pointer-events-auto transition-transform duration-75 ease-out"
                        style={{ transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.k})` }}
                    >
                        {/* Edges */}
                        <AnimatePresence>
                            {visibleEdges.map(edge => {
                                const source = visibleNodes.find(n => n.id === edge.source);
                                const target = visibleNodes.find(n => n.id === edge.target);
                                return (
                                    <Edge
                                        key={edge.id}
                                        edge={edge}
                                        source={source}
                                        target={target}
                                        selected={selectedItem?.id === edge.id}
                                        onSelect={setSelectedItem}
                                    />
                                );
                            })}
                        </AnimatePresence>

                        {/* Nodes */}
                        {visibleNodes.map(node => (
                            <Node
                                key={node.id}
                                node={node}
                                x={node.x}
                                y={node.y}
                                selected={selectedItem?.id === node.id}
                                onSelect={setSelectedItem}
                            />
                        ))}
                    </g>
                </svg>

                {/* Time Controls (Bottom Center) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#111] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md z-20">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-transform"
                            >
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                            </button>
                            <div>
                                <div className="text-xs text-neutral-400 uppercase tracking-wider font-bold">Current Date</div>
                                <div className="text-lg font-mono text-blue-400">{formatDate(currentTime)}</div>
                            </div>
                        </div>
                    </div>

                    <input
                        type="range"
                        min={TIMELINE_START}
                        max={TIMELINE_END}
                        value={currentTime}
                        onChange={(e) => {
                            setCurrentTime(parseInt(e.target.value));
                            setIsPlaying(false);
                        }}
                        className="w-full h-1 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                    />

                    <div className="flex justify-between mt-2 text-[10px] text-neutral-600 font-mono">
                        <span>{formatDate(TIMELINE_START)}</span>
                        <span>{formatDate(TIMELINE_END)}</span>
                    </div>
                </div>

                {/* Legend / Filters (Top Right) */}
                <div className="absolute top-6 right-6 flex gap-2 z-20">
                    <div className="bg-[#111] border border-white/10 p-2 rounded-lg flex flex-col gap-2">
                        <button className="p-2 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors" title="Filter">
                            <Filter size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors" title="Search">
                            <Search size={18} />
                        </button>
                        <div className="h-px bg-white/10 my-1" />
                        <button className="p-2 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors" title="Info">
                            <Info size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* === SIDEBAR DETAILS PANEL === */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-80 h-full bg-[#111] border-l border-white/10 z-30 p-6 flex flex-col shadow-2xl relative"
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
                                {selectedItem.source ? 'Relationship' : selectedItem.type}
                            </div>
                            <h2 className="text-2xl font-bold text-white leading-tight">
                                {selectedItem.label}
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto space-y-6">

                            {/* Properties Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-[10px] text-neutral-500 uppercase">Status</div>
                                    <div className="text-sm font-medium text-white flex items-center gap-1.5 mt-1">
                                        {(selectedItem.verified || selectedItem.confidence > 0.8) ? (
                                            <>
                                                <ShieldCheck size={14} className="text-green-500" /> Verified
                                            </>
                                        ) : (
                                            <>
                                                <ShieldAlert size={14} className="text-amber-500" /> Unverified
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="text-[10px] text-neutral-500 uppercase">Confidence</div>
                                    <div className="text-sm font-medium text-white mt-1">
                                        {selectedItem.confidence ? `${Math.round(selectedItem.confidence * 100)}%` : 'N/A'}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2">Details</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {selectedItem.source
                                        ? `This relationship represents a "${selectedItem.label}" connection between the entities. It was active from ${selectedItem.start ? formatDate(selectedItem.start) : 'Unknown'} to ${selectedItem.end ? formatDate(selectedItem.end) : 'Present'}.`
                                        : `Entity record for ${selectedItem.label}. This node is part of the graph and has recorded interactions with other entities.`
                                    }
                                </p>
                            </div>

                            {/* Mock Provenance */}
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                    Provenance <span className="text-[10px] font-normal text-neutral-500 px-1.5 py-0.5 bg-neutral-800 rounded">2 Sources</span>
                                </h3>
                                <div className="space-y-2">
                                    <div className="text-xs bg-neutral-900 border-l-2 border-blue-500 p-2 text-neutral-400">
                                        Extracted from "Q1 Report.pdf" (Page 43)
                                    </div>
                                    <div className="text-xs bg-neutral-900 border-l-2 border-purple-500 p-2 text-neutral-400">
                                        User Manual Entry by @admin
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded shadow-lg transition-colors flex items-center justify-center gap-2">
                                    Inspect Full Record <ArrowRight size={14} />
                                </button>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
