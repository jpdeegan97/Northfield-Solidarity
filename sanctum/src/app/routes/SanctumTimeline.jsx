import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Plus, X, Tag } from 'lucide-react';
import { ALL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import SanctumVisualizer from '../../components/SanctumVisualizer';


const TRACKS = [
    { id: 'deep_work', name: 'DEEP WORK', color: '#00ff9d' },
    { id: 'meetings', name: 'SYNCS / COMMS', color: '#3b82f6' },
    { id: 'wellness', name: 'BIO-MAINTENANCE', color: '#f43f5e' },
    { id: 'learning', name: 'R&D / STUDY', color: '#fbbf24' },
];

// Layout Constants
const TRACK_HEIGHT = 96; // h-24 = 6rem = 96px
const TRACK_GAP = 16; // space-y-4 = 1rem = 16px
const TRACK_TOP_PAD = 16; // p-4 = 1rem = 16px in container
const DELETE_ZONE_HEIGHT = 150;

const INITIAL_BLOCKS = [
    { id: 1, trackId: 'deep_work', start: '06:00', end: '08:00', title: 'Core Architecture', desc: 'System design for Firmament.', linkedType: 'PROJECT', linkedId: 'FRMT' },
    { id: 2, trackId: 'wellness', start: '08:00', end: '09:00', title: 'Physical Training', desc: 'Zone 2 cardio + resistance.' },
    { id: 3, trackId: 'meetings', start: '09:00', end: '10:00', title: 'Team Sync', desc: 'Daily standup & blockers.' },
    { id: 4, trackId: 'deep_work', start: '10:00', end: '13:00', title: 'Code Implementation', desc: 'Building out the Timeline Engine.', linkedType: 'ENGINE', linkedId: 'INT' },
    { id: 5, trackId: 'learning', start: '14:00', end: '15:30', title: 'Market Research', desc: 'Competitor analysis & trend spotting.' },
];

// Helper to convert time "HH:MM" to pixels
const timeToPx = (time) => {
    const [h, m] = time.split(':').map(Number);
    return (h * 60 + m) * 2; // 2px per minute
};

// Helper: Pixels to "HH:MM"
const pxToTime = (px) => {
    const minutes = Math.floor(px / 2);
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    // Clamp to 24h
    const safeH = Math.max(0, Math.min(23, h));
    const safeM = Math.max(0, Math.min(59, m));
    return `${String(safeH).padStart(2, '0')}:${String(safeM).padStart(2, '0')}`;
};

// Helper: Add minutes to "HH:MM"
const addMinutes = (time, minsToAdd) => {
    const [h, m] = time.split(':').map(Number);
    const totalMinutes = h * 60 + m + minsToAdd;
    const newH = Math.floor(totalMinutes / 60) % 24;
    const newM = totalMinutes % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
};

// Helper to get entity name
const getEntityLabel = (type, id) => {
    if (type === 'ENGINE') {
        const engine = ALL_ENGINES.find(e => e.code === id);
        return engine ? `[${engine.code}] ${engine.name}` : id;
    }
    if (type === 'PROJECT') {
        const project = NS_PROJECTS.find(p => p.code === id);
        return project ? `(PROJ) ${project.name}` : id;
    }
    return null;
};



const INITIAL_FORM_STATE = {
    id: null,
    title: '',
    desc: '',
    start: '09:00',
    end: '10:00',
    trackId: 'deep_work',
    linkedType: 'NONE', // NONE, ENGINE, PROJECT
    linkedId: ''
};

export default function SanctumTimeline() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]); // Multi-select IDs
    const [selectionBox, setSelectionBox] = useState(null); // { x, y, w, h }
    const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 }); // Visual delta for group drag
    const [isCreating, setIsCreating] = useState(false);
    const [draggingId, setDraggingId] = useState(null);
    const scrollContainerRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDeleteActive, setDragDeleteActive] = useState(false);
    const [newBlock, setNewBlock] = useState(INITIAL_FORM_STATE);


    // Refs for state access in event listeners
    const blocksRef = useRef(blocks);
    const selectedIdsRef = useRef(selectedIds);
    // keep refs synced
    useEffect(() => { blocksRef.current = blocks; }, [blocks]);
    useEffect(() => { selectedIdsRef.current = selectedIds; }, [selectedIds]);

    // Movement Loop State
    const movementLoopRef = useRef(null);
    const movementStartTimeRef = useRef(0);
    const movementAccumulatorRef = useRef(0);

    const handleDelete = useCallback((targetId = null) => {
        // Use Ref for latest selection state to avoid stale closures
        const currentSelection = selectedIdsRef.current;

        let idsToDelete = [];
        if (targetId) {
            if (currentSelection.includes(targetId)) {
                idsToDelete = [...currentSelection];
            } else {
                idsToDelete = [targetId];
            }
        } else {
            idsToDelete = [...currentSelection];
        }

        if (idsToDelete.length === 0) return;

        setBlocks(prev => prev.filter(b => !idsToDelete.includes(b.id)));
        setSelectedIds([]);

        // Reset UI
        setIsCreating(false);
        setIsEditing(false);
        setNewBlock(INITIAL_FORM_STATE);
        setSelectedBlock(null);
    }, []);






    // Update current time line
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);

        // Initial scroll to rough current time
        if (scrollContainerRef.current) {
            const nowPx = timeToPx("08:00");
            scrollContainerRef.current.scrollLeft = nowPx - 100;
        }

        // Prevent white background during overscroll
        const originalBg = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#050505';

        return () => {
            clearInterval(timer);
            document.body.style.backgroundColor = originalBg;
        };
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const stopMovement = () => {
            if (movementLoopRef.current) {
                cancelAnimationFrame(movementLoopRef.current);
                movementLoopRef.current = null;
            }
            movementStartTimeRef.current = 0;
            movementAccumulatorRef.current = 0;
        };

        const handleKeyDown = (e) => {
            // Delete Key
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (isCreating) return;

                // If we have a selection, delete it
                if (selectedIdsRef.current.length > 0) {
                    e.preventDefault();
                    handleDelete(null);
                }
                return;
            }

            // Arrow Keys Scrolling / Moving
            if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !isCreating) {
                if (movementLoopRef.current) return; // Already running

                movementStartTimeRef.current = Date.now();
                const direction = e.key === 'ArrowRight' ? 1 : -1;

                const loop = () => {
                    const now = Date.now();
                    const duration = now - movementStartTimeRef.current;

                    const hasSelection = selectedIdsRef.current.length > 0;
                    let factor = 1;

                    // Acceleration Curve
                    if (duration > 2000) factor = 8; // Very fast
                    else if (duration > 1000) factor = 4; // Fast
                    else if (duration > 300) factor = 2; // Moderate

                    if (hasSelection) {
                        // Move Blocks Logic
                        const baseSpeed = 0.3; // 1 min approx every 3-4 frames base
                        movementAccumulatorRef.current += (baseSpeed * factor);

                        const wholeMinutes = Math.floor(movementAccumulatorRef.current);
                        if (wholeMinutes >= 1) {
                            movementAccumulatorRef.current -= wholeMinutes;
                            const deltaMins = wholeMinutes * direction;

                            setBlocks(currentBlocks => {
                                const selected = selectedIdsRef.current;
                                return currentBlocks.map(b => {
                                    if (selected.includes(b.id)) {
                                        const newStart = addMinutes(b.start, deltaMins);
                                        const newEnd = addMinutes(b.end, deltaMins);
                                        return { ...b, start: newStart, end: newEnd };
                                    }
                                    return b;
                                });
                            });
                        }
                    } else {
                        // Scroll View Logic
                        const baseScroll = 6;
                        const scrollAmount = baseScroll * factor * direction;
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollLeft += scrollAmount;
                        }
                    }

                    movementLoopRef.current = requestAnimationFrame(loop);
                };

                movementLoopRef.current = requestAnimationFrame(loop);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                stopMovement();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            stopMovement();
        };
    }, [isCreating, handleDelete]); // Minimal deps

    const getCurrentTimePx = () => {
        const now = currentTime;
        return (now.getHours() * 60 + now.getMinutes()) * 2;
    };

    const handleSave = () => {
        if (!newBlock.title || !newBlock.start || !newBlock.end) return;

        // Validation: End time after start time
        if (newBlock.end <= newBlock.start) {
            alert("End time must be after start time");
            return;
        }

        // Clean up linkedId if Type is NONE
        const blockData = { ...newBlock };
        if (blockData.linkedType === 'NONE') {
            blockData.linkedId = '';
        }

        if (isEditing) {
            setBlocks(blocks.map(b => b.id === blockData.id ? blockData : b));
        } else {
            const block = {
                ...blockData,
                id: Date.now(),
            };
            setBlocks([...blocks, block]);
        }

        resetForm();
    };





    const resetForm = () => {
        setIsCreating(false);
        setIsEditing(false);
        setNewBlock(INITIAL_FORM_STATE);
        setSelectedBlock(null);
    };

    const openEdit = (block) => {
        setNewBlock(block);
        setIsEditing(true);
        setIsCreating(true);
        setSelectedBlock(null);
    };

    // --- SELECTION & POINTER LOGIC ---
    const selectionStartRef = useRef(null);

    const handlePointerDown = (e) => {
        // If clicking a block (handled by block's onDrag/onClick), we ignore unless we are starting a drag?
        // Actually block events stop propagation usually.
        // If we are here, we clicked Empty Space (Track).

        // Capture start pos relative to container
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        // Adjust for scroll? 
        // We want coordinates relative to the "Tracks Rendering Container" (the content div).
        // The content div is line 339: `div className="pt-2..."`.
        // Let's rely on nativeEvent.offsetX / Y if target is correct, but target might be nested grid lines.
        // Safe bet: e.clientX/Y - containerRect.left/top + scrollLeft/scrollTop.

        const x = e.clientX - containerRect.left + scrollContainerRef.current.scrollLeft;
        const y = e.clientY - containerRect.top + scrollContainerRef.current.scrollTop; // scrollTop usually 0

        selectionStartRef.current = { x, y, startScroll: scrollContainerRef.current.scrollLeft };
        setSelectionBox({ x, y, w: 0, h: 0 });

        // Clear selection if not holding Shift (standard behavior)? 
        // User asked "start click off of any item". implied new selection.
        if (!e.shiftKey) {
            setSelectedIds([]);
        }
    };

    const handlePointerMove = (e) => {
        if (!selectionStartRef.current) return;

        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const currentX = e.clientX - containerRect.left + scrollContainerRef.current.scrollLeft;
        const currentY = e.clientY - containerRect.top; // No scrollTop for tracks container usually

        const start = selectionStartRef.current;

        // Calc Rect
        const x = Math.min(start.x, currentX);
        const y = Math.min(start.y, currentY);
        const w = Math.abs(currentX - start.x);
        const h = Math.abs(currentY - start.y);

        setSelectionBox({ x, y, w, h });

        // Calc Intersections
        // We need block rects:
        // X = timeToPx(start)
        // Y = TRACK_TOP_PAD + trackIndex * (TRACK_HEIGHT + TRACK_GAP) + 32
        // W = timeToPx(end) - X
        // H = 48 (h-12)

        const newSelected = [];

        blocks.forEach(block => {
            const trackIndex = TRACKS.findIndex(t => t.id === block.trackId);
            if (trackIndex === -1) return;

            const bX = timeToPx(block.start);
            const bY = TRACK_TOP_PAD + trackIndex * (TRACK_HEIGHT + TRACK_GAP) + 32;
            const bW = timeToPx(block.end) - bX;
            const bH = 48;

            // AABB Intersection
            if (x < bX + bW && x + w > bX && y < bY + bH && y + h > bY) {
                newSelected.push(block.id);
            }
        });

        // If Shift held, merge? Simplified: just replace for now or better user exp
        setSelectedIds(newSelected);
    };

    const handlePointerUp = (e) => {
        if (!selectionStartRef.current) return;

        const { w, h } = selectionBox || { w: 0, h: 0 };
        const isClick = w < 5 && h < 5;

        if (isClick) {
            // It was a click!
            // Execute Create Block Logic (originally handleTrackClick)
            // We need to calc track from Y
            const start = selectionStartRef.current;
            // The Y includes the sticky header offset and padding if we used clientY relative to container top?
            // handlePointerDown used `e.clientY - containerRect.top`.
            // containerRect.top is viewport top of ScrollContainer.
            // Inside ScrollContainer:
            // Header (40px)
            // pt-2 (8px)
            // Tracks Container p-4 (16px) -> Start of first track.

            const trackStartOffset = 40 + 8 + 16;
            const relativeY = start.y - trackStartOffset; // start.y was relative to Container Top

            if (relativeY >= 0) {
                const rawIndex = relativeY / (TRACK_HEIGHT + TRACK_GAP);
                // Check if we clicked "in" a track row (height 96). Gap is 16.
                // localIndex = rawIndex % 1. 
                // Actually rawIndex floor is index.
                const trackIndex = Math.floor(rawIndex);
                const offsetInTrack = relativeY - trackIndex * (TRACK_HEIGHT + TRACK_GAP);

                if (trackIndex >= 0 && trackIndex < TRACKS.length && offsetInTrack <= TRACK_HEIGHT) {
                    // Clicked valid track area
                    const clickedTime = pxToTime(start.x);
                    const endTime = addMinutes(clickedTime, 30);

                    setNewBlock({
                        ...INITIAL_FORM_STATE,
                        title: 'New Block',
                        start: clickedTime,
                        end: endTime,
                        trackId: TRACKS[trackIndex].id
                    });
                    setIsCreating(true);
                    setIsEditing(false);
                    // Clear selection if click create
                    setSelectedIds([]);
                }
            }
        }

        setSelectionBox(null);
        selectionStartRef.current = null;
    };

    const handleBlockDragEnd = (event, info, block) => {
        setIsDragging(false);
        setDragDeleteActive(false);
        setDragDelta({ x: 0, y: 0 }); // Reset visual delta

        // DELETE CHECK
        if (window.innerHeight - info.point.y < DELETE_ZONE_HEIGHT) {
            handleDelete(block.id);
            return;
        }

        // TIME / TRACK CALCULATION
        const containerRect = scrollContainerRef.current.getBoundingClientRect();

        // Existing logic for SINGLE drag (if not selected or only one selected)
        // If the dragged block is NOT in the selection, simpler to just select it and move it?
        // Or if it IS in selection, we move the whole group.

        const activeIds = (selectedIds.includes(block.id) && selectedIds.length > 0) ? selectedIds : [block.id];

        // We calculate the delta applied to the DRAGGED block.
        // Old Start
        const oldStartPx = timeToPx(block.start);

        // New Absolute X
        const absoluteX = info.point.x - containerRect.left + scrollContainerRef.current.scrollLeft;
        const snappedX = Math.round(absoluteX / 30) * 30; // Snap 15m

        // Delta X (Pixels)
        const pixelDeltaX = snappedX - oldStartPx;

        // New Track Index
        const relativeY = info.point.y - containerRect.top;
        const trackStartOffset = 40 + 8 + 16;
        const rawIndex = (relativeY - trackStartOffset) / (TRACK_HEIGHT + TRACK_GAP);
        const newTrackIndex = Math.max(0, Math.min(TRACKS.length - 1, Math.round(rawIndex)));

        const oldTrackIndex = TRACKS.findIndex(t => t.id === block.trackId);
        const trackIndexDelta = newTrackIndex - oldTrackIndex;

        // Apply to ALL active blocks
        const updatedBlocks = blocks.map(b => {
            if (activeIds.includes(b.id)) {
                // Apply Delta
                // Time
                const bStartPx = timeToPx(b.start);
                const bEndPx = timeToPx(b.end);
                const duration = bEndPx - bStartPx;

                const newBStartPx = Math.max(0, bStartPx + pixelDeltaX);
                const newBStart = pxToTime(newBStartPx);

                // Re-calc end to maintain duration exact
                // (Using pxToTime might introduce rounding errors if not careful, but aligned to 15m snap usually ok)
                const newBEnd = pxToTime(newBStartPx + duration);

                // Track
                const currentTrackIdx = TRACKS.findIndex(t => t.id === b.trackId);
                const nextTrackIdx = Math.max(0, Math.min(TRACKS.length - 1, currentTrackIdx + trackIndexDelta));

                return {
                    ...b,
                    start: newBStart,
                    end: newBEnd,
                    trackId: TRACKS[nextTrackIdx].id
                };
            }
            return b;
        });

        setBlocks(updatedBlocks);
    };

    return (
        <Layout>
            <div className="flex flex-col font-mono relative h-full bg-[#050505] text-white overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
                {/* Ambient Background */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,255,157,0.05)_100%)] opacity-30 pointer-events-none" />
                <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

                {/* Header */}
                <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/80 backdrop-blur-md">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 group text-white/60 hover:text-[#00ff9d] transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs font-bold tracking-widest uppercase">SANCTUM</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-[0.15em] text-white">CHRONOS_FIELD</h1>
                            <div className="text-[10px] text-[#00ff9d] tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
                                TEMPORAL ORGANIZER // v1.0
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => {
                                setNewBlock(INITIAL_FORM_STATE);
                                setIsCreating(true);
                                setIsEditing(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 border border-[#00ff9d]/30 hover:border-[#00ff9d] text-[#00ff9d] rounded transition-all text-xs font-bold tracking-widest"
                        >
                            <Plus size={14} />
                            NEW ENTRY
                        </button>

                        <div className="text-right border-l border-white/10 pl-8">
                            <div className="text-3xl font-bold text-white tracking-widest leading-none">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">
                                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex relative z-10 overflow-hidden">
                    {/* Visualizer / Sidebar (Left) */}
                    <div className="w-80 border-r border-white/10 bg-black/40 flex flex-col z-20">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xs font-bold text-white/40 mb-4 tracking-widest">ACTIVE TRACKS</h3>
                            <div className="flex flex-col gap-3">
                                {TRACKS.map(track => (
                                    <div key={track.id} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: track.color }} />
                                        <div>
                                            <div className="text-xs font-bold text-white group-hover:text-[#00ff9d] transition-colors">{track.name}</div>
                                            <div className="text-[9px] text-white/30 uppercase">{blocks.filter(b => b.trackId === track.id).length} Active Blocks</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative border-t border-white/10">
                            <SanctumVisualizer />
                        </div>
                    </div>


                    {/* Timeline Canvas (Right) */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-x-auto overflow-y-hidden relative bg-[#0a0a0a] cursor-default custom-scrollbar"
                    >
                        {/* Time Scale Overlay (Sticky Header) */}
                        <div className="sticky top-0 left-0 h-10 min-w-full flex pointer-events-none border-b border-white/10 bg-black/60 z-30" style={{ width: `${24 * 60 * 2}px` }}>
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="flex-shrink-0 relative" style={{ width: `${60 * 2}px` }}> {/* 60 mins * 2px/min */}
                                    <span className="absolute left-1 top-2 text-[10px] text-white/30 font-bold">{String(i).padStart(2, '0')}:00</span>
                                    <div className="absolute left-0 bottom-0 h-2 w-px bg-white/20" />
                                    <div className="absolute left-1/2 bottom-0 h-1 w-px bg-white/10" />
                                </div>
                            ))}
                        </div>

                        {/* Tracks Rendering Container */}
                        <div className="pt-2 h-full relative" style={{ width: `${24 * 60 * 2}px` }}>
                            {/* Current Time Indicator */}
                            <div
                                className="absolute top-0 bottom-0 z-20 w-px bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] pointer-events-none"
                                style={{ left: getCurrentTimePx() }}
                            >
                                <div className="absolute top-0 -left-1.5 w-3 h-3 bg-red-500 rounded-full" />
                            </div>

                            {/* Grid Lines */}
                            <div className="absolute inset-0 z-0 pointer-events-none flex">
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className="flex-shrink-0 border-l border-white/5 h-full" style={{ width: `${60 * 2}px` }} />
                                ))}
                            </div>

                            {/* BLOCKS LAYER (Overlaid) */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                {blocks.map(block => {
                                    const trackIndex = TRACKS.findIndex(t => t.id === block.trackId);
                                    if (trackIndex === -1) return null;

                                    // Calc top position
                                    // p-4 (16) + index * (96 + 16)
                                    // Note: This is inside the pt-2 div. 
                                    // The Tracks container has p-4.
                                    const topPos = TRACK_TOP_PAD + trackIndex * (TRACK_HEIGHT + TRACK_GAP); // 16 pad, 96 height, 16 gap
                                    const startPx = timeToPx(block.start);
                                    const widthPx = timeToPx(block.end) - startPx;
                                    const entityLabel = getEntityLabel(block.linkedType, block.linkedId);
                                    const track = TRACKS[trackIndex];

                                    return (
                                        <motion.div
                                            key={block.id}
                                            drag={true}
                                            dragMomentum={false}
                                            onDragStart={() => {
                                                setIsDragging(true);
                                                setDraggingId(block.id);
                                                // Auto-select if not already selected
                                                if (!selectedIds.includes(block.id)) {
                                                    setSelectedIds([block.id]);
                                                }
                                            }}
                                            onDrag={(e, info) => {
                                                if (window.innerHeight - info.point.y < DELETE_ZONE_HEIGHT) {
                                                    setDragDeleteActive(true);
                                                } else {
                                                    setDragDeleteActive(false);
                                                }
                                                // Update visual delta for group
                                                if (selectedIds.includes(block.id)) {
                                                    setDragDelta({ x: info.offset.x, y: info.offset.y });
                                                }
                                            }}

                                            onDragEnd={(e, info) => handleBlockDragEnd(e, info, block)}
                                            className="absolute h-12 rounded border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing hover:border-white/40 hover:z-30 transition-shadow shadow-sm flex flex-col justify-between pointer-events-auto"
                                            onClick={(e) => {
                                                e.stopPropagation(); // prevent unselect
                                                if (!isDragging) {
                                                    // Toggle Select with CMD/Shift?
                                                    if (e.metaKey || e.shiftKey) {
                                                        if (selectedIds.includes(block.id)) {
                                                            setSelectedIds(selectedIds.filter(id => id !== block.id));
                                                        } else {
                                                            setSelectedIds([...selectedIds, block.id]);
                                                        }
                                                    } else {
                                                        setSelectedBlock(block);
                                                        if (!selectedIds.includes(block.id)) {
                                                            setSelectedIds([block.id]);
                                                        }
                                                    }
                                                }
                                            }}
                                            style={{
                                                top: topPos + 32, // Offset within the track (previous top-8 = 32px)
                                                left: startPx,
                                                width: widthPx,
                                                backgroundColor: `${track.color}15`,
                                                borderColor: selectedIds.includes(block.id) ? '#00ff9d' : `${track.color}40`,
                                                borderWidth: selectedIds.includes(block.id) ? 2 : 1,
                                                zIndex: 25,
                                                transform: (selectedIds.includes(block.id) && isDragging && draggingId !== block.id)
                                                    ? `translate(${dragDelta.x}px, ${dragDelta.y}px)`
                                                    : undefined
                                                // Note: We use 'draggingId' to prevent double transform on the primary dragged element.
                                                // Framer applies transform to the DRAGGED element automatically.
                                                // We need to apply transform to OTHER selected elements manually using style.
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileDrag={{ scale: 1.05, zIndex: 100, opacity: 0.8 }}

                                        >
                                            <div className="h-full w-1 absolute left-0 top-0 bottom-0" style={{ backgroundColor: track.color }} />
                                            <div className="pl-3 pr-2 pt-1 min-w-0 pointer-events-none">
                                                <div className="text-[10px] font-bold text-white truncate flex items-center gap-1">
                                                    {block.title}
                                                </div>
                                                <div className="text-[9px] text-white/50 truncate font-mono">{block.start} - {block.end}</div>
                                            </div>
                                            {entityLabel && (
                                                <div className="px-2 pb-1 min-w-0 pointer-events-none">
                                                    <span className="text-[8px] bg-white/10 px-1 py-0.5 rounded text-white/70 truncate block">
                                                        {entityLabel}
                                                    </span>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Tracks Render (Visuals + Click Handler Only) */}
                            <div
                                className="relative z-10 p-4 space-y-4"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerLeave={handlePointerUp}
                            >
                                {TRACKS.map((track) => (
                                    <div
                                        key={track.id}
                                        className="relative h-24 w-full border-b border-white/5 group/track hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className="absolute left-2 top-2 text-[10px] text-white/20 font-bold uppercase tracking-widest group-hover/track:text-white/40 pointer-events-none">{track.name}</div>
                                    </div>
                                ))}

                                {/* Selection Box Overlay */}
                                {selectionBox && (
                                    <div
                                        className="absolute bg-[#00ff9d]/10 border border-[#00ff9d]/30 pointer-events-none z-50"
                                        style={{
                                            left: selectionBox.x,
                                            top: selectionBox.y, // Relative to Tracks Container?
                                            // The handlePointerDown calc: y = clientY - containerTop
                                            // Container is the ScrollContainer.
                                            // The Tracks Container is inside the pt-2 div.
                                            // This div `relative` (z-10 p-4 space-y-4).
                                            // We need coords relative to THIS div.
                                            // But selectionBox x/y are relative to scrollContainer (mostly).
                                            // y is e.clientY - containerRect.top
                                            // Tracks Container is offset by 40 (header) + 8 (pt-2).
                                            // So we need to subtract 48 from y?
                                            // handlePointerDown uses clientY - containerRect.top.
                                            // This div (Tracks Render) is rendered inside div (pt-2) which is below Header (h-10).
                                            // Yes, so y needs -48 locally.
                                            // BUT wait, selectionBox.x includes scrollLeft.
                                            // If we render absolute inside this relative div...
                                            // This div width = 24*60*2 (Line 339 parent has width).
                                            // This div takes full width.
                                            // So left: selectionBox.x works.
                                            // top: selectionBox.y - 48 (approx).
                                            transform: `translateY(-48px)`,
                                            width: selectionBox.w,
                                            height: selectionBox.h
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Drag Delete Zone */}
                <AnimatePresence>
                    {isDragging && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center border-t border-white/10 backdrop-blur-md transition-colors pointer-events-none ${dragDeleteActive ? 'bg-red-500/20 border-red-500' : 'bg-black/80'}`}
                            style={{ height: 150 }}
                        >
                            <div className={`text-sm font-bold tracking-widest flex items-center gap-2 ${dragDeleteActive ? 'text-red-500' : 'text-white/40'}`}>
                                <X size={20} />
                                {dragDeleteActive ? 'RELEASE TO DELETE' : 'DRAG HERE TO DELETE'}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Create Block Modal */}
                <AnimatePresence>
                    {isCreating && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={resetForm}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 w-[450px] shadow-2xl relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white tracking-widest">{isEditing ? 'EDIT ENTRY' : 'LOG NEW ENTRY'}</h3>
                                    <button onClick={resetForm} className="text-white/40 hover:text-white">
                                        <X size={16} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Input fields... */}
                                    <div>
                                        <label className="text-[10px] text-white/40 uppercase mb-1 block">Title</label>
                                        <input
                                            type="text"
                                            value={newBlock.title}
                                            onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#00ff9d] outline-none"
                                            placeholder="Enter task name..."
                                            autoFocus
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] text-white/40 uppercase mb-1 block">Start Time</label>
                                            <input
                                                type="time"
                                                value={newBlock.start}
                                                onChange={e => setNewBlock({ ...newBlock, start: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#00ff9d] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-white/40 uppercase mb-1 block">End Time</label>
                                            <input
                                                type="time"
                                                value={newBlock.end}
                                                onChange={e => setNewBlock({ ...newBlock, end: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#00ff9d] outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="border border-white/10 rounded p-3 bg-white/5">
                                        <label className="text-[10px] text-white/40 uppercase mb-2 block flex items-center gap-1">
                                            <Tag size={10} /> LINKED ENTITY (OPTIONAL)
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                value={newBlock.linkedType}
                                                onChange={e => setNewBlock({ ...newBlock, linkedType: e.target.value, linkedId: '' })}
                                                className="bg-[#050505] border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#00ff9d]"
                                            >
                                                <option value="NONE">No Link</option>
                                                <option value="ENGINE">Engine</option>
                                                <option value="PROJECT">Project</option>
                                            </select>

                                            {newBlock.linkedType !== 'NONE' && (
                                                <select
                                                    value={newBlock.linkedId}
                                                    onChange={e => setNewBlock({ ...newBlock, linkedId: e.target.value })}
                                                    className="flex-1 bg-[#050505] border border-white/10 rounded px-2 py-1.5 text-xs text-white outline-none focus:border-[#00ff9d]"
                                                >
                                                    <option value="">Select Target...</option>
                                                    {newBlock.linkedType === 'ENGINE' && ALL_ENGINES.map(e => (
                                                        <option key={e.code} value={e.code}>[{e.code}] {e.name}</option>
                                                    ))}
                                                    {newBlock.linkedType === 'PROJECT' && NS_PROJECTS.map(p => (
                                                        <option key={p.code} value={p.code}>{p.name}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] text-white/40 uppercase mb-1 block">Track / Category</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {TRACKS.map(track => (
                                                <button
                                                    key={track.id}
                                                    onClick={() => setNewBlock({ ...newBlock, trackId: track.id })}
                                                    className={`text-left px-3 py-2 rounded border text-[10px] font-bold transition-all ${newBlock.trackId === track.id
                                                        ? 'bg-white/10 text-white'
                                                        : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5'
                                                        }`}
                                                    style={{ borderColor: newBlock.trackId === track.id ? track.color : 'rgba(255,255,255,0.1)' }}
                                                >
                                                    {track.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] text-white/40 uppercase mb-1 block">Description</label>
                                        <textarea
                                            value={newBlock.desc}
                                            onChange={e => setNewBlock({ ...newBlock, desc: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#00ff9d] outline-none h-20 resize-none"
                                            placeholder="Optional details..."
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-2">
                                        {isEditing && (
                                            <button
                                                onClick={() => handleDelete(newBlock.id)}
                                                className="flex-1 bg-red-500/10 text-red-500 border border-red-500/30 font-bold py-3 rounded hover:bg-red-500/20 transition-colors tracking-widest text-xs"
                                            >
                                                DELETE
                                            </button>
                                        )}
                                        <button
                                            onClick={handleSave}
                                            className={`bg-[#00ff9d] text-black font-bold py-3 rounded hover:bg-[#00ff9d]/90 transition-colors tracking-widest text-xs ${isEditing ? 'flex-[2]' : 'w-full'}`}
                                        >
                                            {isEditing ? 'SAVE CHANGES' : 'COMMIT TO CHRONOS'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Block Detail Modal */}
                <AnimatePresence>
                    {selectedBlock && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBlock(null)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 w-96 shadow-2xl relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: TRACKS.find(t => t.id === selectedBlock.trackId)?.color }} />
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{selectedBlock.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-white/40 font-mono tracking-widest uppercase">
                                                {TRACKS.find(t => t.id === selectedBlock.trackId)?.name}
                                            </span>
                                            {selectedBlock.linkedType && selectedBlock.linkedType !== 'NONE' && (
                                                <span className="text-[10px] bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 px-2 py-0.5 rounded">
                                                    {getEntityLabel(selectedBlock.linkedType, selectedBlock.linkedId)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 p-2 rounded border border-white/5">
                                        <label className="text-[9px] text-white/40 uppercase">Start Time</label>
                                        <div className="text-sm font-mono text-white">{selectedBlock.start}</div>
                                    </div>
                                    <div className="bg-white/5 p-2 rounded border border-white/5">
                                        <label className="text-[9px] text-white/40 uppercase">End Time</label>
                                        <div className="text-sm font-mono text-white">{selectedBlock.end}</div>
                                    </div>
                                </div>

                                <div className="mb-6 bg-white/5 p-3 rounded border border-white/5">
                                    <label className="text-[9px] text-white/40 uppercase mb-1 block">Description</label>
                                    <p className="text-sm text-white/80 leading-relaxed">{selectedBlock.desc}</p>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setSelectedBlock(null)} className="px-4 py-2 text-xs text-white/40 hover:text-white transition-colors">CLOSE</button>
                                    <button
                                        onClick={() => openEdit(selectedBlock)}
                                        className="px-4 py-2 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 rounded text-xs font-bold hover:bg-[#00ff9d]/20 transition-all"
                                    >
                                        EDIT BLOCK
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}
