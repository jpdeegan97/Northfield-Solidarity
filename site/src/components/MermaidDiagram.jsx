import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-mono)", // Attempt to match site font
    suppressErrorRendering: true, // Prevent mermaid from inserting error text into DOM
});

export default function MermaidDiagram({ code, enableZoom = false }) {
    const containerRef = useRef(null);
    const [svgContent, setSvgContent] = useState("");
    const [error, setError] = useState(null);

    // Zoom/Pan State
    const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                setSvgContent("");
                setError(null);
                const { svg } = await mermaid.render(id, code);
                setSvgContent(svg);
                // Reset zoom on new render
                setTransform({ x: 0, y: 0, k: 1 });
            } catch (err) {
                console.error("Mermaid render error:", err);
                setError("Failed to render diagram.");
            }
        };

        renderDiagram();
    }, [code]);

    // Handlers
    const handleWheel = (e) => {
        if (!enableZoom) return;
        // e.preventDefault(); // Optional: prevent page scroll if strictly desired, but usually annoying
        const scaleAmount = -e.deltaY * 0.001;
        const newScale = Math.min(Math.max(0.5, transform.k + scaleAmount), 4);

        setTransform(prev => ({
            ...prev,
            k: newScale
        }));
    };

    const handleMouseDown = (e) => {
        if (!enableZoom) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !enableZoom) return;
        e.preventDefault();
        setTransform(prev => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Zoom Controls
    const zoomIn = () => setTransform(p => ({ ...p, k: Math.min(p.k + 0.2, 4) }));
    const zoomOut = () => setTransform(p => ({ ...p, k: Math.max(p.k - 0.2, 0.5) }));
    const resetZoom = () => setTransform({ x: 0, y: 0, k: 1 });

    if (error) return <div className="text-red-500 text-sm p-4 border border-red-500 rounded">{error}</div>;

    const contentStyle = enableZoom ? {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`,
        transformOrigin: 'center center',
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        cursor: isDragging ? 'grabbing' : 'grab',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    } : {
        width: '100%',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        opacity: svgContent ? 1 : 0.5,
        transition: 'opacity 0.3s ease'
    };

    return (
        <div
            className="mermaid-wrapper"
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: enableZoom ? 'hidden' : 'visible'
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={contentStyle}
            />

            {enableZoom && (
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    zIndex: 10
                }}>
                    <button onClick={zoomIn} style={btnStyle}>+</button>
                    <button onClick={zoomOut} style={btnStyle}>-</button>
                    <button onClick={resetZoom} style={btnStyle} title="Recenter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

const btnStyle = {
    background: 'var(--c-surface)',
    border: '1px solid var(--c-border)',
    color: 'var(--c-text)',
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
};
