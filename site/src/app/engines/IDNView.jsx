import React, { useState, useEffect } from 'react';
import { idnService } from '../../services/mock/MockIdnService';

export default function IDNView({ engine }) {
    const [entities, setEntities] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [newEntity, setNewEntity] = useState({ name: '', type: 'HUMAN', role: 'READ_ONLY' });

    // UI State
    const [activeTab, setActiveTab] = useState('DIRECTORY'); // DIRECTORY | CAPABILITIES
    const [showGraph, setShowGraph] = useState(false);
    const [activePersona, setActivePersona] = useState('OPERATOR'); // For Persona Switcher

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await idnService.getEntities();
            setEntities(data);
            if (!selectedEntity && data.length > 0) setSelectedEntity(data[0]);
        } catch (error) {
            console.error("Failed to load IDN data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newEntity.name) return;
        try {
            const created = await idnService.addEntity(newEntity);
            setEntities(prev => [...prev, created]);
            setSelectedEntity(created);
            setIsCreating(false);
            setNewEntity({ name: '', type: 'HUMAN', role: 'READ_ONLY' });
        } catch (e) {
            console.error(e);
        }
    };

    const toggleStatus = async (entity) => {
        const newStatus = entity.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        try {
            const updated = await idnService.updateStatus(entity.id, newStatus);
            setEntities(prev => prev.map(e => e.id === entity.id ? updated : e));
            if (selectedEntity.id === entity.id) setSelectedEntity(updated);
        } catch (e) {
            console.error(e);
        }
    };

    // Theme: Fuchsia/Pink for Identity/Bio/Fingerprint
    const THEME = {
        primary: 'text-fuchsia-400',
        bg: 'bg-fuchsia-500',
        border: 'border-fuchsia-500/50',
        hoverBorder: 'hover:border-fuchsia-500/50',
        glow: 'shadow-[0_0_15px_rgba(192,38,211,0.2)]',
        bgSoft: 'bg-fuchsia-900/20'
    };

    if (isLoading && entities.length === 0) {
        return <div className="flex items-center justify-center h-full text-fuchsia-500 animate-pulse font-mono text-xs">INITIALIZING IDN UPLINK...</div>;
    }

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Entity Registry */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            IDN CORE
                        </h3>
                        <div className="flex gap-2">
                            <button onClick={() => setActiveTab('DIRECTORY')} className={`text-[9px] font-bold ${activeTab === 'DIRECTORY' ? 'text-white' : 'text-white/40'} hover:text-white transition-colors`}>DIR</button>
                            <button onClick={() => setActiveTab('CAPABILITIES')} className={`text-[9px] font-bold ${activeTab === 'CAPABILITIES' ? 'text-white' : 'text-white/40'} hover:text-white transition-colors`}>CAPS</button>
                        </div>
                    </div>

                    {activeTab === 'DIRECTORY' ? (
                        <>
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-[10px] text-white/40 font-mono">ENTITIES ({entities.length})</span>
                                <button onClick={() => setShowGraph(!showGraph)} className="text-[9px] text-fuchsia-400 hover:text-white transition-colors uppercase">
                                    {showGraph ? 'List View' : 'Graph View'}
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 overflow-y-auto pr-2 flex-1">
                                {entities.map((ent) => {
                                    const isSelected = selectedEntity?.id === ent.id;
                                    const typeColor = ent.type === 'HUMAN' ? 'text-blue-300' :
                                        ent.type === 'SERVICE' ? 'text-emerald-300' : 'text-amber-300';

                                    return (
                                        <div
                                            key={ent.id}
                                            onClick={() => setSelectedEntity(ent)}
                                            className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                                    ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                                    : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-[9px] font-bold ${typeColor} bg-white/5 px-1.5 py-0.5 rounded`}>{ent.type}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${ent.status === 'ACTIVE' ? 'bg-fuchsia-500' : 'bg-white/20'}`} />
                                                    <span className="text-[9px] font-mono text-white/30">{ent.status}</span>
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-bold text-white group-hover:text-fuchsia-200">{ent.name}</h4>
                                            <div className="text-[10px] text-white/40 font-mono mt-1 flex justify-between">
                                                <span>{ent.id}</span>
                                                <span>{ent.lastSeen}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {isCreating ? (
                                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded animate-fade-in-up">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Entity Name"
                                        value={newEntity.name}
                                        onChange={e => setNewEntity({ ...newEntity, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/20 rounded px-2 py-1 text-xs text-white mb-2 focus:border-fuchsia-500 outline-none"
                                    />
                                    <div className="flex gap-2 mb-2">
                                        {['HUMAN', 'SERVICE', 'BOT'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setNewEntity({ ...newEntity, type: t })}
                                                className={`flex-1 text-[8px] py-1 rounded border ${newEntity.type === t ? 'bg-fuchsia-500/20 border-fuchsia-500 text-white' : 'border-white/10 text-white/50'}`}
                                            >
                                                {t[0]}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleCreate} className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-[10px] py-1 rounded">CREATE</button>
                                        <button onClick={() => setIsCreating(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] py-1 rounded">CANCEL</button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all border border-white/5"
                                >
                                    + NEW IDENTITY
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="overflow-y-auto pr-2 flex-1 space-y-4">
                            {engine?.capabilities ? engine.capabilities.map((cap, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-2 rounded hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500/50 group-hover:bg-fuchsia-400" />
                                        <span className="text-[10px] font-bold text-white/70 group-hover:text-white">{cap}</span>
                                    </div>
                                    <div className="text-[9px] text-white/30 pl-3.5">
                                        Status: <span className="text-emerald-400">PLANNED</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center text-white/30 text-[10px] italic">No capabilities listed.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* CENTER: Identity Graph (Visual Org Graph) */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none">
                {showGraph || activeTab === 'CAPABILITIES' ? (
                    <div className="relative w-full h-full flex items-center justify-center opacity-80">
                        {/* Placeholder for the Visual Org Graph Component */}
                        <div className="w-[400px] h-[400px] border border-fuchsia-500/30 rounded-full animate-spin-slow absolute" style={{ animationDuration: '60s' }} />
                        <div className="w-[300px] h-[300px] border border-dashed border-fuchsia-500/20 rounded-full animate-spin-reverse-slow absolute" />
                        <div className="w-[100px] h-[100px] bg-fuchsia-500/10 rounded-full blur-xl absolute" />
                        <div className="text-[10px] text-fuchsia-300 font-mono bg-black/50 px-3 py-1 rounded backdrop-blur border border-fuchsia-500/30">
                            VISUAL ORG GRAPH :: ACTIVE
                        </div>
                    </div>
                ) : (
                    <div className="opacity-40 text-center">
                        <span className="text-white/10 text-6xl font-black">IDN</span>
                    </div>
                )}
            </div>

            {/* RIGHT: Profile & Permissions */}
            {selectedEntity && (
                <div className="pointer-events-auto flex flex-col gap-4 w-96">

                    {/* Top: Identity Card */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-2 opacity-20 ${THEME.primary}`}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>

                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Entity Profile</h3>
                                <p className={`text-[10px] font-mono mb-6 ${THEME.primary}`}>{selectedEntity.id}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleStatus(selectedEntity)}
                                    className={`text-[9px] px-2 py-1 rounded border ${selectedEntity.status === 'ACTIVE' ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'} hover:bg-white/5 transition-colors`}
                                >
                                    {selectedEntity.status === 'ACTIVE' ? 'PAUSE' : 'ACTIVATE'}
                                </button>
                            </div>
                        </div>

                        {/* Persona Switcher */}
                        <div className="mt-4 mb-4 flex bg-white/5 rounded p-1 gap-1">
                            {['OPERATOR', 'INVESTOR', 'ANON'].map(persona => (
                                <button
                                    key={persona}
                                    onClick={() => setActivePersona(persona)}
                                    className={`flex-1 text-[8px] font-bold py-1 rounded transition-all ${activePersona === persona ? 'bg-fuchsia-500 text-white shadow-sm' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                                >
                                    {persona}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded bg-gradient-to-br from-fuchsia-500/20 to-purple-900/40 border border-fuchsia-500/30 flex items-center justify-center text-xl font-bold text-white">
                                {selectedEntity.name[0]}
                            </div>
                            <div>
                                <div className="text-lg font-bold text-white leading-none mb-1">{selectedEntity.name}</div>
                                <div className="text-xs text-white/50 font-mono">{selectedEntity.role}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-2 bg-white/5 rounded border border-white/5">
                                <span className="text-[9px] text-white/40 uppercase block mb-1">Public Key</span>
                                <span className="text-white font-mono text-[10px] break-all">0x71a...9b4</span>
                            </div>
                            <div className="p-2 bg-white/5 rounded border border-white/5">
                                <span className="text-[9px] text-white/40 uppercase block mb-1">MFA Status</span>
                                <span className="text-emerald-400 font-bold">ENFORCED</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Access Matrix */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1 max-h-[40vh] overflow-hidden flex flex-col">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Active Permissions</h3>
                        <div className="overflow-y-auto space-y-2 pr-1">
                            <div className="p-4 text-center text-white/20 text-xs italic">
                                Access matrix connecting...
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}
