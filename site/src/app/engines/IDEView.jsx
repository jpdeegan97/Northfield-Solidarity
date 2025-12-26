import React, { useState } from 'react';

export default function IDEView({ engine }) {
    const [projectName, setProjectName] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('project') || 'MAIN';
    });

    const [activeFile, setActiveFile] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const file = params.get('file');
        const proj = params.get('project');
        if (file) return file;
        return proj ? `${proj}_Main.jsx` : 'ProductCanvas.jsx';
    });

    const [code, setCode] = useState(`// ProductCanvas.jsx
import React from 'react';
// ... loading system core ...
`);

    const openInNewWindow = (file) => {
        const projParam = projectName && projectName !== 'MAIN' ? `&project=${projectName}` : '';
        window.open(`/ide?file=${file}${projParam}`, '_blank');
    };

    const FILES = [
        { name: 'ProductCanvas.jsx', type: 'jsx' },
        { name: 'global.css', type: 'css' },
        { name: 'engineRegistry.js', type: 'js' },
        { name: 'NS-CRNCL-001.md', type: 'md' },
        ...(projectName && projectName !== 'MAIN' ? [{ name: `${projectName}_Main.jsx`, type: 'jsx' }] : [])
    ];

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs pointer-events-auto">
            {/* Top Bar */}
            <div className="h-10 bg-[#252526] flex items-center px-4 border-b border-black">
                <span className="font-bold text-white mr-4">NORTHFIELD IDE</span>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#3c3c3c] rounded text-white cursor-pointer">Start</span>
                    <span className="px-2 py-1 hover:bg-[#3c3c3c] rounded cursor-pointer">Debug</span>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* File Tree */}
                <div className="w-48 bg-[#252526] border-r border-black flex flex-col">
                    <div className="p-2 text-[10px] font-bold uppercase tracking-widest text-[#6f6f6f]">Explorer</div>
                    {FILES.map(f => (
                        <div
                            key={f.name}
                            onClick={() => setActiveFile(f.name)}
                            className={`px-4 py-1 cursor-pointer flex items-center gap-2 hover:bg-[#2a2d2e] ${activeFile === f.name ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'}`}
                        >
                            <span className={`w-2 h-2 rounded-full ${f.type === 'jsx' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                            {f.name}
                        </div>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    {/* Tabs */}
                    <div className="flex bg-[#2d2d2d] overflow-x-auto no-scrollbar">
                        <div className="px-3 py-2 bg-[#1e1e1e] text-white border-t-2 border-blue-400 flex items-center gap-2 min-w-fit">
                            <span>{activeFile}</span>
                            <div className="flex items-center gap-1 ml-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); openInNewWindow(activeFile); }}
                                    className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors"
                                    title="Open in New Window"
                                >
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </button>
                                <span className="hover:bg-white/10 rounded px-1 cursor-pointer text-white/50 hover:text-white">×</span>
                            </div>
                        </div>
                    </div>
                    {/* Code Content */}
                    <div className="flex-1 p-4 overflow-auto">
                        <textarea
                            className="w-full h-full bg-transparent resize-none focus:outline-none font-mono leading-relaxed text-[#9cdcfe]"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] text-white flex items-center px-4 justify-between text-[10px]">
                <div className="flex gap-4">
                    <span>{projectName}*</span>
                    <span>0 errors</span>
                </div>
                <div>Ln 12, Col 4</div>
            </div>
        </div>
    );
}
