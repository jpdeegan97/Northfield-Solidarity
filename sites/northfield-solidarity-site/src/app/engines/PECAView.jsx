import React, { useState } from 'react';

// Mock Data: Active Entity Formations
const FORMATIONS = [
    { id: 'ENT-2024-08', name: 'Riverfront Holdings LLC', status: 'IN_PROGRESS', step: 3, totalSteps: 5, jurisdiction: 'Delaware' },
    { id: 'ENT-2024-09', name: 'Highland Prop Co. LLC', status: 'PENDING_SIG', step: 4, totalSteps: 5, jurisdiction: 'Wyoming' },
    { id: 'ENT-2024-10', name: 'Northfield Ops Sub-1', status: 'DRAFT', step: 1, totalSteps: 5, jurisdiction: 'Delaware' },
];

const CHECKLIST = [
    { id: 'D-01', name: 'Articles of Organization', status: 'FILED', date: '2024-12-01' },
    { id: 'D-02', name: 'Operating Agreement', status: 'DRAFTING', date: '-' },
    { id: 'D-03', name: 'EIN Application (SS-4)', status: 'WAITING', date: '-' },
    { id: 'D-04', name: 'Bank Account Open', status: 'LOCKED', date: '-' },
];

export default function PECAView() {
    const [selectedEntity, setSelectedEntity] = useState(FORMATIONS[0]);

    // Theme: "Legal/Structure" - Indigo/Slate
    const THEME = {
        primary: 'text-indigo-400',
        sec: 'text-amber-400',
        bg: 'bg-indigo-950/40',
        border: 'border-indigo-500/30',
        highlight: 'bg-indigo-500/10'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Entity Pipeline */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[70vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                            Formations
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">ACTIVE</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {FORMATIONS.map((ent) => {
                            const isSelected = selectedEntity.id === ent.id;
                            const progress = (ent.step / ent.totalSteps) * 100;

                            return (
                                <div
                                    key={ent.id}
                                    onClick={() => setSelectedEntity(ent)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group relative overflow-hidden
                                        ${isSelected
                                            ? `${THEME.highlight} ${THEME.border} shadow-[0_0_15px_rgba(129,140,248,0.1)]`
                                            : `bg-white/5 border-transparent hover:border-white/20`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1 relative z-10">
                                        <h4 className="text-sm font-bold text-white truncate w-2/3">{ent.name}</h4>
                                        <span className={`text-[9px] font-mono px-1 rounded bg-white/10 text-white/60`}>
                                            {ent.jurisdiction}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-white/50 relative z-10 mb-1">
                                        <span className={ent.status === 'IN_PROGRESS' ? 'text-indigo-300' : 'text-amber-300'}>
                                            {ent.status.replace('_', ' ')}
                                        </span>
                                        <span>Step {ent.step}/{ent.totalSteps}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1 relative z-10">
                                        <div
                                            className="h-full bg-indigo-500 transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="mt-4 w-full py-2 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 rounded text-[10px] font-bold uppercase transition-all">
                        + New Entity
                    </button>
                </div>
            </div>

            {/* CENTER: Workflow Builder Placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-80">
                <div className="relative w-[500px] h-[300px] border border-indigo-500/20 rounded bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center">

                    {/* Flowchart Nodes */}
                    <div className="flex items-center gap-4 opacity-50 mb-6">
                        <div className="w-16 h-10 border border-white/20 rounded flex items-center justify-center text-[8px] text-white/60">INIT</div>
                        <div className="w-8 h-[1px] bg-white/20" />
                        <div className="w-16 h-10 border border-indigo-500 rounded bg-indigo-500/20 flex items-center justify-center text-[8px] text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.3)]">SETUP</div>
                        <div className="w-8 h-[1px] bg-white/20" />
                        <div className="w-16 h-10 border border-dashed border-white/20 rounded flex items-center justify-center text-[8px] text-white/40">FILE</div>
                    </div>

                    <div className="text-center">
                        <div className="text-[10px] text-indigo-400 font-mono tracking-widest mb-1">WORKFLOW ENGINE</div>
                        <div className="text-xl font-bold text-white mb-1">Entity Formation</div>
                        <div className="text-xs text-white/50">{selectedEntity.name}</div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Compliance Checklist */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">

                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className={`text-xs font-bold ${THEME.sec} uppercase tracking-widest mb-4 flex items-center gap-2`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                        Required Documents
                    </h3>

                    <div className="flex flex-col gap-2">
                        {CHECKLIST.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${item.status === 'FILED' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-500' :
                                            item.status === 'LOCKED' ? 'border-white/10 bg-white/5 text-white/20' :
                                                'border-amber-500 bg-amber-500/20 text-amber-500'
                                        }`}>
                                        {item.status === 'FILED' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                                        {item.status === 'LOCKED' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                                    </div>
                                    <span className={`text-[10px] font-medium ${item.status === 'LOCKED' ? 'text-white/30' : 'text-white'}`}>
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-[9px] text-white/30 font-mono tracking-wide">
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition-all shadow-lg shadow-indigo-500/20">
                        Generate Missing Docs
                    </button>
                </div>

            </div>

        </div>
    );
}
