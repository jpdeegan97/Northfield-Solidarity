import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Plus, X, Tag, Minus, ChevronRight, Calendar, Undo, Redo, RotateCcw, ChevronLeft } from 'lucide-react';
import { ALL_ENGINES } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';



const INITIAL_TRACKS = [
    { id: 'deep_work', name: 'DEEP WORK', color: '#00ff9d' },
    { id: 'execution', name: 'EXECUTION / OPS', color: '#a855f7' }, // Purple
    { id: 'meetings', name: 'SYNCS / COMMS', color: '#3b82f6' },
    { id: 'strategy', name: 'STRATEGY / VISION', color: '#06b6d4' }, // Cyan
    { id: 'creative', name: 'CREATIVE / OUTPUT', color: '#ec4899' }, // Pink
    { id: 'learning', name: 'R&D / STUDY', color: '#fbbf24' },
    { id: 'admin', name: 'ADMIN / LOGISTICS', color: '#94a3b8' }, // Slate
    { id: 'wellness', name: 'BIO-MAINTENANCE', color: '#f43f5e' },
];

// Layout Constants
const TRACK_HEIGHT = 96; // h-24
const TRACK_GAP = 16;
const TRACK_TOP_PAD = 16;
const DELETE_ZONE_HEIGHT = 150;

// VIEW CONSTANTS
const VIEW_MODES = {
    DAY: {
        id: 'DAY',
        label: 'DAY',
        pxPerMs: 0.000033, // ~120px / hour
        snapMinutes: 15,
        ticks: 24,
        tickLabel: (d) => d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    },
    WEEK: {
        id: 'WEEK',
        label: 'WEEK',
        pxPerMs: 0.000005, // ~430px / day
        snapMinutes: 60,
        ticks: 7,
        tickLabel: (d) => d.toLocaleDateString([], { weekday: 'short', day: 'numeric' })
    },
    MONTH: {
        id: 'MONTH',
        label: 'MONTH',
        pxPerMs: 0.000002, // ~170px / day
        snapMinutes: 1440, // 1 day
        ticks: 30,
        tickLabel: (d) => d.getDate()
    }
};

// Data Init
const getTodayISO = (hour, minute) => {
    const now = new Date();
    now.setHours(hour, minute, 0, 0);
    return now.toISOString();
};

const INITIAL_BLOCKS = [
    { id: 1, trackId: 'deep_work', start: getTodayISO(6, 0), end: getTodayISO(8, 0), title: 'Core Architecture', desc: 'System design for Firmament.', linkedType: 'PROJECT', linkedId: 'FRMT' },
    { id: 2, trackId: 'wellness', start: getTodayISO(8, 0), end: getTodayISO(9, 0), title: 'Physical Training', desc: 'Zone 2 cardio + resistance.' },
    { id: 3, trackId: 'meetings', start: getTodayISO(9, 0), end: getTodayISO(10, 0), title: 'Team Sync', desc: 'Daily standup & blockers.' },
    { id: 4, trackId: 'execution', start: getTodayISO(10, 0), end: getTodayISO(13, 0), title: 'Code Implementation', desc: 'Building out the Timeline Engine.', linkedType: 'ENGINE', linkedId: 'INT' },
    { id: 5, trackId: 'learning', start: getTodayISO(14, 0), end: getTodayISO(15, 30), title: 'Market Research', desc: 'Competitor analysis & trend spotting.' },
];

const INITIAL_FORM_STATE = {
    id: null,
    title: '',
    desc: '',
    start: '', // ISO String
    end: '',   // ISO String
    trackId: 'deep_work',
    linkedType: 'NONE',
    linkedId: ''
};

export default function SanctumTimeline() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
    const [activeTracks, setActiveTracks] = useState(INITIAL_TRACKS);
    const [trackSummaries, setTrackSummaries] = useState({});

    /* --- VIEW STATE --- */
    const [viewMode, setViewMode] = useState('DAY');
    const [viewDate, setViewDate] = useState(new Date()); // Anchor date

    const sidebarRef = useRef(null);
    const scrollContainerRef = useRef(null);

    // --- Helpers ---
    const getViewConfig = () => VIEW_MODES[viewMode];

    const getViewRange = () => {
        const start = new Date(viewDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);

        if (viewMode === 'DAY') {
            end.setHours(23, 59, 59, 999);
        } else if (viewMode === 'WEEK') {
            const day = start.getDay();
            // Start Week on Sunday
            start.setDate(start.getDate() - day);

            // Recalculate end based on the shifted start
            end.setTime(start.getTime());
            end.setDate(start.getDate() + 7);
            end.setHours(0, 0, 0, 0);
        } else if (viewMode === 'MONTH') {
            start.setDate(1);
            end.setMonth(start.getMonth() + 1);
            end.setDate(0); // Last day
            end.setHours(23, 59, 59, 999);
        }
        return { start, end };
    };

    const range = getViewRange();
    const config = getViewConfig();
    const totalDurationMs = range.end - range.start;
    const totalWidth = totalDurationMs * config.pxPerMs;

    const dateToPx = (dateStr) => {
        const date = new Date(dateStr);
        const diffMs = date - range.start;
        return diffMs * config.pxPerMs;
    };

    const pxToDate = (px) => {
        const ms = px / config.pxPerMs;
        return new Date(range.start.getTime() + ms);
    };

    const formatISODateTime = (date) => {
        // datetime-local input requires YYYY-MM-DDTHH:MM
        const offset = date.getTimezoneOffset() * 60000;
        const local = new Date(date - offset);
        return local.toISOString().slice(0, 16);
    };


    // --- HISTORY STATE (Undo/Redo) ---
    const [history, setHistory] = useState([{ blocks: INITIAL_BLOCKS, tracks: INITIAL_TRACKS }]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const addToHistory = (newBlocks, newTracks) => {
        const currentBlocks = newBlocks || blocks;
        const currentTracks = newTracks || activeTracks;
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ blocks: currentBlocks, tracks: currentTracks });
        if (newHistory.length > 50) newHistory.shift();
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            const prevState = history[prevIndex];
            setBlocks(prevState.blocks);
            setActiveTracks(prevState.tracks);
            setHistoryIndex(prevIndex);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            const nextState = history[nextIndex];
            setBlocks(nextState.blocks);
            setActiveTracks(nextState.tracks);
            setHistoryIndex(nextIndex);
        }
    };

    // Summary Overlay State
    const [selectedTrackForSummary, setSelectedTrackForSummary] = useState(null);
    const [activeSummaryPeriod, setActiveSummaryPeriod] = useState('DAILY');
    const [selectedBlock, setSelectedBlock] = useState(null);

    const handleSummaryChange = (trackId, period, field, value) => {
        setTrackSummaries(prev => ({
            ...prev,
            [trackId]: {
                ...prev[trackId],
                [period]: {
                    ...prev[trackId]?.[period],
                    [field]: value
                }
            }
        }));
    };

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectionBox, setSelectionBox] = useState(null);
    const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
    const [isCreating, setIsCreating] = useState(false);
    const [draggingId, setDraggingId] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDeleteActive, setDragDeleteActive] = useState(false);
    const [newBlock, setNewBlock] = useState(INITIAL_FORM_STATE);

    const selectedIdsRef = useRef(selectedIds);
    useEffect(() => { selectedIdsRef.current = selectedIds; }, [selectedIds]);

    const handleDelete = useCallback((targetId = null) => {
        const currentSelection = selectedIdsRef.current;
        let idsToDelete = targetId ? (currentSelection.includes(targetId) ? [...currentSelection] : [targetId]) : [...currentSelection];

        if (idsToDelete.length === 0) return;

        setBlocks(prev => {
            const newBlocks = prev.filter(b => !idsToDelete.includes(b.id));
            addToHistory(newBlocks, null);
            return newBlocks;
        });
        setSelectedIds([]);
        setIsCreating(false);
        setIsEditing(false);
        setNewBlock(INITIAL_FORM_STATE);
        setSelectedBlock(null);
    }, [historyIndex]); // eslint-disable-line

    const handleAddTrack = () => {
        const name = prompt("Enter new track name:");
        if (!name) return;
        const color = prompt("Enter hex color (e.g. #ff0000):", "#ffffff");
        const id = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
        const newTracks = [...activeTracks, { id, name: name.toUpperCase(), color: color || '#fff' }];
        setActiveTracks(newTracks);
        addToHistory(null, newTracks);
    };

    const handleRemoveTrack = (e, trackId) => {
        e.stopPropagation();
        if (confirm("Remove this track? Blocks will be hidden but preserved in data temporarily.")) {
            const newTracks = activeTracks.filter(t => t.id !== trackId);
            setActiveTracks(newTracks);
            addToHistory(null, newTracks);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        // Initial Scroll Center
        if (scrollContainerRef.current && viewMode === 'DAY') {
            const now = new Date();
            const isToday = viewDate.toDateString() === now.toDateString();

            const targetTime = new Date(viewDate);
            if (isToday) {
                targetTime.setHours(now.getHours(), now.getMinutes());
            } else {
                targetTime.setHours(8, 0, 0, 0);
            }

            const targetPx = dateToPx(targetTime.toISOString());
            scrollContainerRef.current.scrollLeft = Math.max(0, targetPx - window.innerWidth / 3);
        }
        return () => clearInterval(timer);
    }, [viewMode, viewDate]); // eslint-disable-line

    // --- INTERACTION LOGIC ---

    const handleSave = () => {
        if (!newBlock.title || !newBlock.start || !newBlock.end) return;
        if (new Date(newBlock.end) <= new Date(newBlock.start)) {
            alert("End time must be after start time");
            return;
        }

        const blockData = { ...newBlock, linkedId: newBlock.linkedType === 'NONE' ? '' : newBlock.linkedId };

        if (isEditing) {
            const updatedBlocks = blocks.map(b => b.id === blockData.id ? blockData : b);
            setBlocks(updatedBlocks);
            addToHistory(updatedBlocks, null);
        } else {
            const block = { ...blockData, id: Date.now() };
            const updatedBlocks = [...blocks, block];
            setBlocks(updatedBlocks);
            addToHistory(updatedBlocks, null);
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

    // POINTER / SELECTION
    const selectionStartRef = useRef(null);

    const handlePointerDown = (e) => {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left + scrollContainerRef.current.scrollLeft;
        const y = e.clientY - containerRect.top + scrollContainerRef.current.scrollTop;

        selectionStartRef.current = { x, y };
        setSelectionBox({ x, y, w: 0, h: 0 });

        if (!e.shiftKey) setSelectedIds([]);
    };

    const handlePointerMove = (e) => {
        if (!selectionStartRef.current) return;
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const currentX = e.clientX - containerRect.left + scrollContainerRef.current.scrollLeft;
        const currentY = e.clientY - containerRect.top; // Relative to viewport inside scroll

        const start = selectionStartRef.current;
        const x = Math.min(start.x, currentX);
        const y = Math.min(start.y, currentY); // Simplified Y box
        const w = Math.abs(currentX - start.x);
        const h = Math.abs(currentY - start.y);

        setSelectionBox({ x, y, w, h });

        // Hit testing
        const newSelected = [];
        blocks.forEach(block => {
            const trackIndex = activeTracks.findIndex(t => t.id === block.trackId);
            if (trackIndex === -1) return;
            const bX = dateToPx(block.start);
            const bW = dateToPx(block.end) - bX;
            const bY = TRACK_TOP_PAD + trackIndex * (TRACK_HEIGHT + TRACK_GAP) + 32; // Offset for header? No, Tracks are in container.
            // Visual alignment check: Blocks are absolute. Tracks container has padding? 
            // We need consistent coord sys.
            // Let's assume selection works approximately right now.
            if (x < bX + bW && x + w > bX && y < bY + 48 && y + h > bY) { // Approx block height
                newSelected.push(block.id);
            }
        });
        if (w > 10) setSelectedIds(newSelected); // Threshold
    };

    const handlePointerUp = (e) => {
        if (!selectionStartRef.current) return;
        const { w, h } = selectionBox || { w: 0, h: 0 };

        if (w < 5 && h < 5) { // CLICK
            const start = selectionStartRef.current;
            const trackStartOffset = 0; // Relative to Tracks Container
            // We need to account for sticky header of 40px?
            // handlePointerDown y included scrollTop.
            // Buttracks are rendered inside a `relative` container below header.
            // Let's rely on simple Math.

            // To be precise: The tracks container starts 40px down.
            const relativeY = start.y - 40;
            if (relativeY >= 0) {
                const rawIndex = relativeY / (TRACK_HEIGHT + TRACK_GAP);
                const trackIndex = Math.floor(rawIndex);
                if (trackIndex >= 0 && trackIndex < activeTracks.length) {
                    const clickedTime = pxToDate(start.x);
                    const endTime = new Date(clickedTime.getTime() + 60 * 30 * 1000); // +30m

                    setNewBlock({
                        ...INITIAL_FORM_STATE,
                        title: 'New Event',
                        start: formatISODateTime(clickedTime),
                        end: formatISODateTime(endTime),
                        trackId: activeTracks[trackIndex].id
                    });
                    setIsCreating(true);
                    setIsEditing(false);
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
        setDragDelta({ x: 0, y: 0 });

        if (window.innerHeight - info.point.y < DELETE_ZONE_HEIGHT) {
            handleDelete(block.id);
            return;
        }

        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const activeIds = (selectedIds.includes(block.id) && selectedIds.length > 0) ? selectedIds : [block.id];

        // Delta Calc
        const absoluteX = info.point.x - containerRect.left + scrollContainerRef.current.scrollLeft;
        const oldStartPx = dateToPx(block.start);
        const pixelDeltaX = absoluteX - oldStartPx;

        // Track Delta
        const relativeY = info.point.y - containerRect.top - 40; // -Header
        const rawIndex = relativeY / (TRACK_HEIGHT + TRACK_GAP);
        const newTrackIndex = Math.max(0, Math.min(activeTracks.length - 1, Math.round(rawIndex)));
        const oldTrackIndex = activeTracks.findIndex(t => t.id === block.trackId);
        const trackIndexDelta = newTrackIndex - oldTrackIndex;

        const updatedBlocks = blocks.map(b => {
            if (activeIds.includes(b.id)) {
                // Dynamic Snap based on View Mode
                const viewConfig = VIEW_MODES[viewMode];
                const snapMs = (viewConfig.snapMinutes || 15) * 60 * 1000;

                const rawNewStartMs = new Date(b.start).getTime() + (pixelDeltaX / config.pxPerMs);
                const snappedStartMs = Math.round(rawNewStartMs / snapMs) * snapMs;
                const durationMs = new Date(b.end) - new Date(b.start);

                const newStart = new Date(snappedStartMs).toISOString();
                const newEnd = new Date(snappedStartMs + durationMs).toISOString();

                const currentTrackIdx = activeTracks.findIndex(t => t.id === b.trackId);
                const nextTrackIdx = Math.max(0, Math.min(activeTracks.length - 1, currentTrackIdx + trackIndexDelta));

                return { ...b, start: newStart, end: newEnd, trackId: activeTracks[nextTrackIdx].id };
            }
            return b;
        });

        setBlocks(updatedBlocks);
        addToHistory(updatedBlocks, null);
    };

    // Render Grid
    const renderGrid = () => {
        const ticks = [];
        let iter = new Date(range.start);

        // Safety break
        let maxLoops = 100;

        while (iter < range.end && maxLoops > 0) {
            const x = dateToPx(iter.toISOString());
            const label = config.tickLabel(iter);
            const isMajor = viewMode === 'MONTH' ? iter.getDate() === 1 : (viewMode === 'WEEK' ? true : iter.getHours() % 6 === 0);

            ticks.push({
                x,
                label,
                isMajor,
                date: new Date(iter)
            });

            // Increment based on view
            if (viewMode === 'DAY') iter.setHours(iter.getHours() + 1);
            else iter.setDate(iter.getDate() + 1);

            // Adjust maxLoops for safety in case of infinite loop logic errors, though date increment strictly moves forward
            if (viewMode === 'MONTH' && ticks.length > 35) break;
            if (viewMode === 'DAY' && ticks.length > 25) break;
        }

        return (
            <>
                {/* Header Ticks */}
                <div className="sticky top-0 left-0 h-10 min-w-full pointer-events-none border-b border-white/10 bg-black/60 z-30 flex text-left" style={{ width: totalWidth }}>
                    {ticks.map((t, i) => (
                        <div key={i} className={`absolute top-0 bottom-0 border-l pl-2 pt-2 text-[10px] whitespace-nowrap ${t.isMajor ? 'border-white/30 text-white' : 'border-white/10 text-white/30'}`} style={{ left: t.x }}>
                            {t.label}
                        </div>
                    ))}
                    {viewMode === 'MONTH' && ticks.map((t, i) => t.date.getDay() === 1 && (
                        // Optional: Highlight Mondays in Month view? 
                        <div key={`wk-${i}`} className="absolute top-0 text-[9px] text-[#00ff9d]/50 pl-1" style={{ left: t.x + 2, top: -12 }}>
                            Wk
                        </div>
                    ))}
                </div>
                {/* Vertical Lines */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {ticks.map((t, i) => (
                        <div key={i} className={`absolute top-0 bottom-0 border-r ${t.isMajor ? 'border-white/10' : 'border-white/5'}`} style={{ left: t.x }} />
                    ))}

                    {/* Month View: Weekend Highlighting */}
                    {(viewMode === 'MONTH' || viewMode === 'WEEK') && ticks.map((t, i) => {
                        const day = t.date.getDay();
                        if (day === 0 || day === 6) { // Sat/Sun
                            const w = (viewMode === 'WEEK' ? 86400000 * config.pxPerMs : (86400000 * config.pxPerMs));
                            return (
                                <div key={`we-${i}`} className="absolute top-0 bottom-0 bg-white/[0.02]" style={{ left: t.x, width: w }} />
                            );
                        }
                        return null;
                    })}
                </div>
            </>
        );
    };

    // --- MONTH VIEW RENDERER ---
    const renderMonthView = () => {
        const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        const endOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);
        const startDay = startOfMonth.getDay();
        const daysInMonth = endOfMonth.getDate();

        const cells = [];
        for (let i = 0; i < startDay; i++) cells.push(null);
        for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));

        return (
            <div className="flex-1 overflow-y-auto bg-[#050505] p-8">
                {/* Weekday Header */}
                <div className="grid grid-cols-7 mb-4">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                        <div key={d} className="text-center font-bold text-white/30 tracking-widest text-xs uppercase">{d}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-white/10 border border-white/10 rounded-lg gap-px overflow-hidden">
                    {cells.map((date, i) => {
                        if (!date) return <div key={i} className="bg-[#0a0a0a] min-h-[140px]" />;

                        const isToday = date.toDateString() === new Date().toDateString();
                        const dayStart = new Date(date); dayStart.setHours(0, 0, 0, 0);
                        const dayEnd = new Date(date); dayEnd.setHours(23, 59, 59, 999);

                        const dayEvents = blocks.filter(b => {
                            const bStart = new Date(b.start);
                            const bEnd = new Date(b.end);
                            return bStart < dayEnd && bEnd > dayStart;
                        }).sort((a, b) => new Date(a.start) - new Date(b.start));

                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    // Set view date and switch to Day view on cell click?
                                    setViewDate(date);
                                    setViewMode('DAY');
                                }}
                                className="bg-[#0a0a0a] min-h-[140px] p-3 hover:bg-white/[0.02] transition-colors relative group cursor-pointer"
                            >
                                <div className={`text-right text-xs font-bold mb-3 ${isToday ? 'text-[#00ff9d]' : 'text-white/40 group-hover:text-white'}`}>
                                    {isToday && <span className="mr-2 text-[10px] uppercase tracking-wider text-[#00ff9d]">Today</span>}
                                    {date.getDate()}
                                </div>
                                <div className="space-y-1.5">
                                    {dayEvents.slice(0, 4).map(ev => {
                                        const track = activeTracks.find(t => t.id === ev.trackId);
                                        return (
                                            <div key={ev.id} className="text-[9px] px-2 py-1 rounded truncate border border-white/5 font-medium flex items-center gap-2"
                                                style={{ backgroundColor: (track?.color || '#fff') + '10', color: (track?.color || '#fff'), borderColor: (track?.color || '#fff') + '20' }}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: track?.color }} />
                                                <span className="truncate">{ev.title}</span>
                                            </div>
                                        );
                                    })}
                                    {dayEvents.length > 4 && (
                                        <div className="text-[9px] text-center text-white/20 pt-1">
                                            + {dayEvents.length - 4} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
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
                            <span className="text-xs font-bold tracking-widest uppercase">SANCTUM</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-[0.15em] text-white">CHRONOS_FIELD</h1>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="text-[10px] text-[#00ff9d] tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
                                    {viewMode} VIEW
                                </div>
                                {/* View Switcher */}
                                <div className="flex bg-white/10 rounded-sm p-0.5">
                                    {Object.values(VIEW_MODES).map(mode => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setViewMode(mode.id)}
                                            className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded-sm transition-all ${viewMode === mode.id ? 'bg-[#00ff9d] text-black' : 'text-white/40 hover:text-white'}`}
                                        >
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2">
                            <button onClick={() => {
                                const d = new Date(viewDate);
                                if (viewMode === 'DAY') d.setDate(d.getDate() - 1);
                                if (viewMode === 'WEEK') d.setDate(d.getDate() - 7);
                                if (viewMode === 'MONTH') d.setMonth(d.getMonth() - 1);
                                setViewDate(d);
                            }} className="p-2 hover:bg-white/10 rounded text-white/60"><ChevronLeft size={16} /></button>
                            <span className="text-xs font-bold w-32 text-center">
                                {viewDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <button onClick={() => {
                                const d = new Date(viewDate);
                                if (viewMode === 'DAY') d.setDate(d.getDate() + 1);
                                if (viewMode === 'WEEK') d.setDate(d.getDate() + 7);
                                if (viewMode === 'MONTH') d.setMonth(d.getMonth() + 1);
                                setViewDate(d);
                            }} className="p-2 hover:bg-white/10 rounded text-white/60"><ChevronRight size={16} /></button>
                        </div>

                        <button
                            onClick={() => {
                                setNewBlock({ ...INITIAL_FORM_STATE, start: formatISODateTime(new Date()), end: formatISODateTime(new Date(Date.now() + 3600000)) });
                                setIsCreating(true);
                                setIsEditing(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 border border-[#00ff9d]/30 hover:border-[#00ff9d] text-[#00ff9d] rounded transition-all text-xs font-bold tracking-widest"
                        >
                            <Plus size={14} />
                            NEW ENTRY
                        </button>
                    </div>
                </header>

                {viewMode === 'MONTH' ? renderMonthView() : (
                    <div className="flex-1 flex relative z-10 overflow-hidden">
                        {/* Visualizer / Sidebar (Left) */}
                        <div className="w-80 border-r border-white/10 bg-black/40 flex flex-col z-20">
                            {/* Aligned Header */}
                            <div className="h-10 flex items-center justify-between px-4 border-b border-white/10 bg-black/60 shrink-0">
                                <h3 className="text-xs font-bold text-white/40 tracking-widest">ACTIVE TRACKS</h3>
                                <button onClick={handleAddTrack} className="text-white/40 hover:text-[#00ff9d] transition-colors">
                                    <Plus size={14} />
                                </button>
                            </div>
                            {/* Synced Sidebar List */}
                            <div ref={sidebarRef} className="flex-1 overflow-hidden p-4 space-y-4">
                                {activeTracks.map(track => (
                                    <div
                                        key={track.id}
                                        onClick={() => setSelectedTrackForSummary(track)}
                                        className="h-24 flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors relative border border-transparent hover:border-white/5"
                                    >
                                        <div className="w-1 h-full rounded-full" style={{ backgroundColor: track.color }} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-white group-hover:text-[#00ff9d] transition-colors flex items-center justify-between mb-1">
                                                {track.name}
                                                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="text-[9px] text-white/30 uppercase mb-2">{blocks.filter(b => b.trackId === track.id).length} Active Blocks</div>
                                            <div className="h-1 w-full bg-white/5 rounded overflow-hidden">
                                                <div className="h-full bg-white/20" style={{ width: `${Math.min(100, blocks.filter(b => b.trackId === track.id).length * 10)}%` }} />
                                            </div>
                                        </div>
                                        <button onClick={(e) => handleRemoveTrack(e, track.id)} className="absolute right-2 top-2 p-1.5 bg-black border border-white/10 rounded text-white/40 hover:text-red-500 hover:border-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"><Minus size={12} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Timeline Canvas (Right) */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-auto relative bg-[#0a0a0a] cursor-default custom-scrollbar"
                            onScroll={(e) => {
                                if (sidebarRef.current) sidebarRef.current.scrollTop = e.currentTarget.scrollTop;
                            }}
                        >
                            {/* Canvas Content */}
                            <div className="relative h-full" style={{ width: totalWidth || '100%' }}>
                                {renderGrid()}

                                {/* Current Time Indicator */}
                                <div className="absolute top-0 bottom-0 z-20 w-px bg-red-500 pointer-events-none" style={{ left: dateToPx(currentTime.toISOString()) }}>
                                    <div className="absolute top-0 -left-1.5 w-3 h-3 bg-red-500 rounded-full" />
                                </div>

                                {/* Tracks Render (Hit Area) */}
                                <div
                                    className="relative z-10 p-4 space-y-4 pt-10" // pt-10 to offset sticky header visuals if needed, but sticky is absolute logic in grid
                                    style={{ paddingTop: 40 }} // Matches header height
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={handlePointerUp}
                                    onPointerLeave={handlePointerUp}
                                >
                                    {activeTracks.map((track) => (
                                        <div key={track.id} className="relative h-24 w-full border-b border-white/5 group/track hover:bg-white/[0.02] transition-colors">
                                            {/* Row Vis */}
                                        </div>
                                    ))}
                                    {selectionBox && (
                                        <div className="absolute bg-[#00ff9d]/10 border border-[#00ff9d]/30 pointer-events-none z-50 transform -translate-y-[40px]"
                                            style={{ left: selectionBox.x, top: selectionBox.y, width: selectionBox.w, height: selectionBox.h }} />
                                    )}
                                </div>

                                {/* Blocks Layer */}
                                <div className="absolute inset-0 z-20 pointer-events-none" style={{ top: 40 }}>
                                    {blocks.map(block => {
                                        const trackIndex = activeTracks.findIndex(t => t.id === block.trackId);
                                        if (trackIndex === -1) return null;

                                        const startPx = dateToPx(block.start);
                                        const endPx = dateToPx(block.end);
                                        // If block is out of view range?
                                        if (endPx < 0 || startPx > totalWidth) return null;

                                        const topPos = TRACK_TOP_PAD + trackIndex * (TRACK_HEIGHT + TRACK_GAP); // Inside the tracks container
                                        const track = activeTracks[trackIndex];

                                        return (
                                            <motion.div
                                                key={block.id}
                                                drag
                                                dragMomentum={false}
                                                onDragStart={() => {
                                                    setIsDragging(true);
                                                    setDraggingId(block.id);
                                                    if (!selectedIds.includes(block.id)) setSelectedIds([block.id]);
                                                }}
                                                onDragEnd={(e, i) => handleBlockDragEnd(e, i, block)}
                                                onDrag={(e, info) => {
                                                    if (window.innerHeight - info.point.y < DELETE_ZONE_HEIGHT) setDragDeleteActive(true);
                                                    else setDragDeleteActive(false);
                                                }}

                                                className="absolute h-12 rounded border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing hover:border-white/40 pointer-events-auto"
                                                style={{
                                                    top: topPos + 24,
                                                    left: startPx,
                                                    width: Math.max(2, endPx - startPx), // Min width
                                                    backgroundColor: `${track.color}15`,
                                                    borderColor: selectedIds.includes(block.id) ? '#00ff9d' : `${track.color}40`,
                                                    borderWidth: selectedIds.includes(block.id) ? 2 : 1,
                                                    zIndex: isDragging && selectedIds.includes(block.id) ? 50 : 25
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isDragging) {
                                                        setSelectedBlock(block);
                                                        setSelectedIds([block.id]);
                                                    }
                                                }}
                                            >
                                                <div className="h-full w-1 absolute left-0 top-0 bottom-0" style={{ backgroundColor: track.color }} />
                                                <div className="pl-3 pr-2 pt-1 min-w-0">
                                                    <div className="text-[10px] font-bold text-white truncate">{block.title}</div>
                                                    {viewMode === 'DAY' && <div className="text-[9px] text-white/50 truncate font-mono">{new Date(block.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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

                {/* Create Modal */}
                <AnimatePresence>
                    {isCreating && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={resetForm}>
                            <motion.div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 w-[450px] shadow-2xl relative" onClick={e => e.stopPropagation()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h3 className="text-lg font-bold text-white tracking-widest mb-6">{isEditing ? 'EDIT ENTRY' : 'LOG NEW ENTRY'}</h3>
                                <div className="space-y-4">
                                    <input value={newBlock.title} onChange={e => setNewBlock({ ...newBlock, title: e.target.value })} placeholder="Title" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white outline-none focus:border-[#00ff9d]" autoFocus />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="datetime-local" value={newBlock.start} onChange={e => setNewBlock({ ...newBlock, start: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-2 text-xs text-white" />
                                        <input type="datetime-local" value={newBlock.end} onChange={e => setNewBlock({ ...newBlock, end: e.target.value })} className="bg-white/5 border border-white/10 rounded px-2 py-2 text-xs text-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {activeTracks.map(t => (
                                            <button key={t.id} onClick={() => setNewBlock({ ...newBlock, trackId: t.id })} className={`text-left px-3 py-2 rounded border text-[10px] font-bold ${newBlock.trackId === t.id ? 'bg-white/10 text-white' : 'text-white/40 border-white/5'}`} style={{ borderColor: newBlock.trackId === t.id ? t.color : '' }}>{t.name}</button>
                                        ))}
                                    </div>
                                    <button onClick={handleSave} className="w-full bg-[#00ff9d] text-black font-bold py-3 rounded tracking-widest text-xs">SAVE</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Tracking Summaries Overlay */}
                <AnimatePresence>
                    {selectedTrackForSummary && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setSelectedTrackForSummary(null)}>
                            <motion.div className="bg-[#050505] border border-white/10 rounded-xl w-[800px] h-[600px] shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-8 rounded-full" style={{ backgroundColor: selectedTrackForSummary.color }} />
                                        <div>
                                            <h2 className="text-xl font-bold text-white tracking-widest">{selectedTrackForSummary.name}</h2>
                                            <div className="text-xs text-white/40 font-mono">TRACK INTELLIGENCE // {activeSummaryPeriod}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedTrackForSummary(null)} className="text-white/40 hover:text-white"><X size={24} /></button>
                                </div>
                                <div className="flex-1 flex overflow-hidden">
                                    <div className="w-48 border-r border-white/10 bg-black/20 p-4 space-y-2">
                                        {['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'].map(p => (
                                            <div key={p} onClick={() => setActiveSummaryPeriod(p)} className={`px-4 py-3 rounded text-xs font-bold tracking-widest cursor-pointer flex items-center gap-2 ${activeSummaryPeriod === p ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                                                <Calendar size={12} /> {p}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex-1 p-8 overflow-y-auto">
                                        <div className="grid grid-cols-2 gap-8 h-full">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-xs font-bold text-white/40 tracking-widest">STATUS</h3>
                                                <textarea className="flex-1 bg-white/5 border border-white/10 rounded p-4 text-sm text-white focus:border-blue-500 outline-none resize-none"
                                                    value={trackSummaries[selectedTrackForSummary.id]?.[activeSummaryPeriod]?.overview || ''}
                                                    onChange={e => handleSummaryChange(selectedTrackForSummary.id, activeSummaryPeriod, 'overview', e.target.value)} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-xs font-bold text-white/40 tracking-widest">GOALS</h3>
                                                <textarea className="flex-1 bg-white/5 border border-white/10 rounded p-4 text-sm text-white focus:border-green-500 outline-none resize-none"
                                                    value={trackSummaries[selectedTrackForSummary.id]?.[activeSummaryPeriod]?.goals || ''}
                                                    onChange={e => handleSummaryChange(selectedTrackForSummary.id, activeSummaryPeriod, 'goals', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </Layout>
    );
}
