import React, { useState } from 'react';
import { DREAMS_DATA } from '../../data/dreamsRegistry';
import { Camera, Globe, RefreshCw, Terminal, AlertTriangle, CheckCircle } from 'lucide-react';

// Mock Data: SOPs
const PROCEDURES = [
    { id: 'SOP-001', name: 'New Entity Formation', type: 'LEGAL', status: 'ACTIVE', progress: 45, assignee: 'C. Legal' },
    { id: 'SOP-012', name: 'Emergency Key Rotation', type: 'SECURITY', status: 'READY', progress: 0, assignee: 'SecOps' },
    { id: 'CWP-SCRAPE', name: 'Asset Scraper (Dream Catcher)', type: 'CRAWLER', status: 'IDLE', progress: 0, assignee: 'CWP Bot' },
    { id: 'SOP-044', name: 'Monthly Treasury Audit', type: 'FINANCE', status: 'DUE', progress: 0, assignee: 'Finance Bot' },
    { id: 'SOP-102', name: 'Incident Response: L1', type: 'OPS', status: 'DRAFT', progress: 0, assignee: 'J. Deegan' },
];

const CHECKLIST_STEPS = [
    { id: 1, text: 'Verify jurisdictions availability', checked: true },
    { id: 2, text: 'Reserve entity name with Secretary of State', checked: true },
    { id: 3, text: 'Draft Operating Agreement (v2.1)', checked: false },
    { id: 4, text: 'Obtain EIN from IRS', checked: false },
    { id: 5, text: 'Open Bank Account (Mercury/Brex)', checked: false },
];

export default function CWPView({ engine }) {
    const [selectedSOP, setSelectedSOP] = useState(PROCEDURES[2]); // Default to Scraper for Demo
    const [logs, setLogs] = useState([]);
    const [scraperStatus, setScraperStatus] = useState('IDLE');

    // Identify targets
    const missingImages = DREAMS_DATA.filter(d => !d.image || d.image === '');

    const addLog = (msg, type = 'INFO') => {
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
    };

    const runScraper = () => {
        if (missingImages.length === 0) {
            addLog('No missing assets detected.', 'SUCCESS');
            return;
        }

        setScraperStatus('CONNECTING');
        addLog('Initializing MCP Connection to [cwp-crawler-01]...');

        setTimeout(() => {
            setScraperStatus('RUNNING');
            addLog('MCP Connection Established.', 'SUCCESS');
            addLog(`Identified ${missingImages.length} targets with missing visual assets.`);

            missingImages.forEach((item, i) => {
                setTimeout(() => {
                    addLog(`[Target ${i + 1}] Searching visual database for: "${item.title}"...`);
                }, 1000 + (i * 1500));

                setTimeout(() => {
                    addLog(`[Target ${i + 1}] Candidate found. Confidence: 98%.`);
                    addLog(`[Target ${i + 1}] Asset acquired: ${item.title}.jpg`, 'SUCCESS');
                }, 2000 + (i * 1500));
            });

            setTimeout(() => {
                setScraperStatus('COMPLETE');
                addLog('Batch scraping complete. Assets staged for review.', 'SUCCESS');
            }, 2000 + (missingImages.length * 1500));

        }, 1500);
    };

    // Theme: Slate/Blue-Grey for "Procedure/Industrial/Stable"
    const THEME = {
        primary: 'text-slate-400',
        bg: 'bg-slate-500',
        border: 'border-slate-500/50',
        hoverBorder: 'hover:border-slate-500/50',
        glow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]',
        bgSoft: 'bg-slate-800/40' // Darker back for industrial feel
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Procedure Library */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-sm ${THEME.bg}`} />
                            Standard Procedures
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">LIB: v2.5</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                        {PROCEDURES.map((sop) => {
                            const isSelected = selectedSOP.id === sop.id;

                            return (
                                <div
                                    key={sop.id}
                                    onClick={() => setSelectedSOP(sop)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] font-mono text-white/30">{sop.id}</span>
                                        <span className={`text-[9px] px-1 rounded bg-white/5 ${sop.status === 'ACTIVE' ? 'text-blue-400 animate-pulse' : sop.status === 'IDLE' ? 'text-yellow-400' : 'text-white/40'}`}>
                                            {sop.status}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-medium text-white group-hover:text-slate-200">{sop.name}</h4>

                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-400" style={{ width: `${sop.progress}%` }} />
                                        </div>
                                        <span className="text-[9px] font-mono text-white/40">{sop.progress}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Process Visualization (Scraper UI or Flowchart) */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-auto px-12">
                {selectedSOP.type === 'CRAWLER' ? (
                    <div className="w-full max-w-2xl bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Globe className="text-[#00ff9d]" size={18} />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">CWP Crawler Interface</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${scraperStatus === 'RUNNING' ? 'bg-[#00ff9d] animate-pulse' : scraperStatus === 'COMPLETE' ? 'bg-blue-400' : 'bg-white/20'}`} />
                                <span className="text-[10px] font-mono uppercase text-white/60">{scraperStatus}</span>
                            </div>
                        </div>

                        {/* Targets */}
                        <div className="p-6 border-b border-white/5 bg-black/40">
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Identified Targets (Missing Assets)</h4>
                            {missingImages.length > 0 ? (
                                <div className="space-y-2">
                                    {missingImages.map(img => (
                                        <div key={img.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <AlertTriangle size={14} className="text-yellow-400" />
                                                <span className="text-sm text-white font-mono">{img.title}</span>
                                            </div>
                                            <span className="text-[10px] text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded">MISSING_IMG</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-white/30 italic text-sm flex items-center gap-2">
                                    <CheckCircle size={14} className="text-green-500" /> All assets accounted for.
                                </div>
                            )}
                        </div>

                        {/* Terminal / Logs */}
                        <div className="h-64 bg-black p-4 font-mono text-xs overflow-y-auto border-b border-white/10">
                            {logs.length === 0 && <div className="text-white/20 text-center mt-20">Initialize crawler to begin.</div>}
                            {logs.map((log, i) => (
                                <div key={i} className="mb-1">
                                    <span className="text-white/30 mr-2">[{log.time}]</span>
                                    <span className={log.type === 'SUCCESS' ? 'text-[#00ff9d]' : 'text-white/70'}>{log.msg}</span>
                                </div>
                            ))}
                            {scraperStatus === 'RUNNING' && <div className="animate-pulse text-[#00ff9d] mt-2">_</div>}
                        </div>

                        {/* Controls */}
                        <div className="p-4 bg-white/5 flex gap-4">
                            <button
                                onClick={runScraper}
                                disabled={scraperStatus === 'RUNNING' || missingImages.length === 0}
                                className="flex-1 py-3 bg-[#00ff9d] text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-[#00ff9d]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={14} className={scraperStatus === 'RUNNING' ? 'animate-spin' : ''} />
                                {scraperStatus === 'RUNNING' ? 'Crawling...' : 'Engage Scraper'}
                            </button>
                            <button className="px-6 py-3 border border-white/10 text-white/60 font-bold uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-all">
                                Settings
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-white/20 text-lg font-mono">Select a procedure to view active run.</div>
                )}
            </div>

            {/* RIGHT: Active Worksheet (Original) */}
            <div className={`pointer-events-auto flex flex-col gap-4 w-96 ${selectedSOP.type === 'CRAWLER' ? 'opacity-50 pointer-events-none' : ''}`}>

                {/* Top: Metadata */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Active Run</h3>
                    <p className={`text-[10px] font-mono mb-4 text-white/40`}>Started by {selectedSOP.assignee}</p>

                    <div className="p-3 bg-slate-900/50 rounded border border-white/5 text-[10px] text-white/60 font-mono">
                        Standard Operating Procedure context would appear here.
                    </div>
                </div>

                {/* Bottom: Checklist */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1 max-h-[45vh] flex flex-col">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Steps</h3>
                    <div className="space-y-1 overflow-y-auto pr-1">
                        {CHECKLIST_STEPS.map((step) => (
                            <div key={step.id} className={`flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors ${step.checked ? 'opacity-50' : 'opacity-100'}`}>
                                <div className={`mt-0.5 w-4 h-4 border rounded flex items-center justify-center flex-shrink-0
                                    ${step.checked ? 'bg-slate-500 border-slate-500' : 'border-white/30'}
                                `}>
                                    {step.checked && <span className="text-white text-xs">✓</span>}
                                </div>
                                <span className={`text-sm ${step.checked ? 'text-white/50 line-through' : 'text-white'}`}>
                                    {step.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 w-full py-2 border border-slate-500/50 text-slate-400 bg-slate-500/10 hover:bg-slate-500/20 rounded font-bold text-xs transition-all">
                        ADVANCE TO NEXT STEP
                    </button>
                </div>

            </div>

        </div>
    );
}
