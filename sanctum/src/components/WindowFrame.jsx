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
    pan = { x: 0, y: 0 },
    isActive,
    onClose,
    onFocus,
    onMove,
    isPinned = false,
    onTogglePin,
    onPopOut,
    onToggleFullScreen,
    onActivity,
    isFullScreen, // Added
    children
}) {
    const [isDragging, setIsDragging] = useState(false);
    // dragOffset stores the distance from the mouse to the window's top-left corner (in LOCAL unscaled coordinates)
    const [dragAnchor, setDragAnchor] = useState({ mouseX: 0, mouseY: 0, initialWinX: 0, initialWinY: 0 });
    const windowRef = useRef(null);

    // Initial focus on mount
    useEffect(() => {
        if (onFocus) onFocus(id);
    }, []);

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

    // --- Fullscreen Split Logic ---
    // User Request: "Elements go where they should be... background 100% opaque" (interpreted as transparent to see firmament).
    // The split layout was confusing, reverting to standard layout but transparent background.

    const containerStyle = isFullScreen
        ? {
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // Override
            background: 'transparent',
            borderRadius: 0,
            border: 'none',
            boxShadow: 'none'
        }
        : {
            left: x,
            top: y,
            width: width,
            height: height,
            zIndex: z,
            borderColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isActive ? '0 0 50px rgba(0,0,0,0.8)' : '0 0 20px rgba(0,0,0,0.5)',
        };

    return (
        <div
            ref={windowRef}
            className={`absolute flex flex-col overflow-hidden transition-all duration-500 pointer-events-auto
                ${!isFullScreen ? 'bg-[#0a0a0a]/90 backdrop-blur-3xl border rounded-xl' : ''}
            `}
            style={containerStyle}
            onMouseDown={() => !isActive && onFocus && onFocus(id)}
        >
            {/* Window Header / Drag Handle */}
            <div
                className={`h-10 flex items-center justify-between px-4 select-none cursor-grab active:cursor-grabbing border-b border-white/5 
                ${isActive && !isFullScreen ? 'bg-white/5' : 'bg-transparent'}
                ${isFullScreen ? 'opacity-0 hover:opacity-100 transition-opacity absolute top-0 w-full z-50 bg-black/50 backdrop-blur-md' : ''}
                `}
                onMouseDown={!isFullScreen ? handleMouseDown : undefined}
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
                className={`flex-1 relative overflow-auto custom-scrollbar 
                    ${isFullScreen ? 'px-8 pt-12 pb-8' : 'bg-black/20'}
                `}
                onMouseMove={() => onActivity && onActivity(id)}
                onClick={() => onActivity && onActivity(id)}
                onKeyDown={() => onActivity && onActivity(id)}
                onWheel={() => onActivity && onActivity(id)}
            >
                {/* 
                   Standard Layout.
                */}
                <div className="w-full h-full">
                    {children}
                </div>

                {/* Overlay to catch clicks when inactive to focus window */}
                {!isActive && !isFullScreen && (
                    <div
                        className="absolute inset-0 z-50 bg-transparent"
                        onMouseDown={() => onFocus(id)}
                    />
                )}
            </div>
        </div>
    );
}
