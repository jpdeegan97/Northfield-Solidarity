import React, { useState, useEffect, useRef } from 'react';

export default function WindowFrame({
    id,
    title,
    x,
    y,
    z,
    width = 800,
    height = 600,
    scale = 1,
    isActive,
    onClose,
    onFocus,
    onMove,
    isPinned = false,
    onTogglePin,
    onPopOut,
    onToggleFullScreen,
    onActivity,
    children,
    onToggleEdit,
    isEditing
}) {
    const [isDragging, setIsDragging] = useState(false);
    // dragOffset stores the distance from the mouse to the window's top-left corner (in LOCAL unscaled coordinates)
    const [dragAnchor, setDragAnchor] = useState({ mouseX: 0, mouseY: 0, initialWinX: 0, initialWinY: 0 });
    const windowRef = useRef(null);

    // Initial focus on mount
    useEffect(() => {
        if (onFocus) onFocus(id);
    }, [id, onFocus]);

    const handleMouseDown = (e) => {
        if (onFocus) onFocus(id);
        setIsDragging(true);
        setDragAnchor({
            mouseX: e.clientX,
            mouseY: e.clientY,
            initialWinX: x,
            initialWinY: y
        });
        e.stopPropagation();
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            // Calculate delta in SCREEN pixels
            const deltaX = e.clientX - dragAnchor.mouseX;
            const deltaY = e.clientY - dragAnchor.mouseY;

            // Convert delta to LOCAL canvas units (divide by scale)
            const localDeltaX = deltaX / scale;
            const localDeltaY = deltaY / scale;

            // Apply to initial window position
            onMove(id, dragAnchor.initialWinX + localDeltaX, dragAnchor.initialWinY + localDeltaY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragAnchor, id, onMove, scale]);

    return (
        <div
            ref={windowRef}
            className={`absolute flex flex-col bg-[#0a0a0a]/90 backdrop-blur-3xl border rounded-xl overflow-hidden shadow-2xl transition-shadow duration-200 pointer-events-auto`}
            style={{
                left: x,
                top: y,
                width: width,
                height: height,
                zIndex: z,
                borderColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? '0 0 50px rgba(0,0,0,0.8)' : '0 0 20px rgba(0,0,0,0.5)',
            }}
            onMouseDown={() => !isActive && onFocus && onFocus(id)}
        >
            {/* Window Header / Drag Handle */}
            <div
                className={`h-10 flex items-center justify-between px-4 select-none cursor-grab active:cursor-grabbing border-b border-white/5 ${isActive ? 'bg-white/5' : 'bg-transparent'}`}
                onMouseDown={handleMouseDown}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    if (onToggleFullScreen) onToggleFullScreen(id);
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Window Controls (Mac style) */}
                    <div className="flex gap-1.5 group">
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(id); }}
                            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-black text-[8px] font-bold opacity-60 hover:opacity-100 transition-opacity"
                        >
                        </button>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 opacity-60"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 opacity-60"></div>
                    </div>
                    <span className={`text-xs font-bold tracking-widest uppercase ${isActive ? 'text-white' : 'text-white/40'}`}>
                        {title}
                    </span>
                </div>

                {/* Right side indicators */}
                <div className="flex items-center gap-2">
                    {onPopOut && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onPopOut(id); }}
                            className="text-white/40 hover:text-white transition-colors p-1"
                            title="Open Project in IDE"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </button>
                    )}
                    {onToggleEdit && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleEdit(id); }}
                            className={`text-[8px] font-mono border px-1.5 py-0.5 rounded transition-all mr-2 ${isEditing
                                ? 'border-[#00ff9d] text-black bg-[#00ff9d] font-bold shadow-[0_0_10px_rgba(0,255,157,0.4)]'
                                : 'border-white/20 text-white/40 hover:text-white hover:border-white/50'
                                }`}
                        >
                            {isEditing ? 'MECHANIC' : 'EDITOR'}
                        </button>
                    )}
                    {onTogglePin && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onTogglePin(id); }}
                            className={`text-[8px] font-mono border px-1.5 py-0.5 rounded transition-all ${isPinned
                                ? 'border-[#00ff9d] text-[#00ff9d] bg-[#00ff9d]/10'
                                : 'border-white/20 text-white/40 hover:text-white/80'
                                }`}
                        >
                            {isPinned ? 'PINNED' : 'FLOAT'}
                        </button>
                    )}
                    <span className="text-[9px] font-mono text-white/20">LIVE</span>
                </div>
            </div>

            {/* Window Content */}
            <div
                className="flex-1 relative overflow-auto custom-scrollbar bg-black/20"
                onMouseMove={() => onActivity && onActivity(id)}
                onClick={() => onActivity && onActivity(id)}
                onKeyDown={() => onActivity && onActivity(id)}
                onWheel={(e) => {
                    e.stopPropagation();
                    if (onActivity) onActivity(id);
                }}
            >
                {/* Overlay to catch clicks when inactive to focus window */}
                {!isActive && (
                    <div
                        className="absolute inset-0 z-50 bg-transparent"
                        onMouseDown={() => onFocus(id)}
                    />
                )}
                {children}
            </div>
        </div>
    );
}
