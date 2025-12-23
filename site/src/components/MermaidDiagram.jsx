import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-mono)" // Attempt to match site font
});

export default function MermaidDiagram({ code }) {
    const containerRef = useRef(null);
    const [svgContent, setSvgContent] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code) return;

            try {
                // Unique ID for each render to avoid conflicts
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                // Clear previous content
                setSvgContent("");
                setError(null);

                // Render
                const { svg } = await mermaid.render(id, code);
                setSvgContent(svg);
            } catch (err) {
                console.error("Mermaid render error:", err);
                // Mermaid might leave garbage in the DOM on error, usually requires cleanup?
                // But render() returns a string so it shouldn't be too bad compared to older versions.
                setError("Failed to render diagram.");
            }
        };

        renderDiagram();
    }, [code]);

    if (error) return <div className="text-red-500 text-sm p-4 border border-red-500 rounded">{error}</div>;

    return (
        <div
            ref={containerRef}
            className="mermaid-wrapper"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{
                width: '100%',
                overflowX: 'auto',
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
                opacity: svgContent ? 1 : 0.5,
                transition: 'opacity 0.3s ease'
            }}
        />
    );
}
