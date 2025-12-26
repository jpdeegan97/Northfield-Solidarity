import React, { useState } from 'react';

// Mock Data: Identities
const ADAMS_ENTITIES = [
    { id: 'USR-001', name: 'J. Deegan', type: 'HUMAN', role: 'ROOT_ADMIN', status: 'ACTIVE', lastSeen: 'Now' },
    { id: 'SVC-042', name: 'GGP_Orchestrator', type: 'SERVICE', role: 'SYSTEM_WRITE', status: 'ACTIVE', lastSeen: '0s ago' },
    { id: 'BOT-991', name: 'Arb_Sentinel_v4', type: 'BOT', role: 'EXECUTION', status: 'PAUSED', lastSeen: '4h ago' },
    { id: 'USR-004', name: 'Guest_Auditor', type: 'HUMAN', role: 'READ_ONLY', status: 'IDLE', lastSeen: '2d ago' },
];

const PERMISSIONS = [
    { scope: 'firmament.core.*', level: 'WRITE', grantedBy: 'System' },
    { scope: 'dat.execute', level: 'EXECUTE', grantedBy: 'USR-001' },
    { scope: 'idn.identity.read', level: 'READ', grantedBy: 'Policy_A' },
];

export default function IDNView({ engine }) {
    const [selectedEntity, setSelectedEntity] = useState(ADAMS_ENTITIES[0]);

    // Theme: Fuchsia/Pink for Identity/Bio/Fingerprint
    const THEME = {
        primary: 'text-fuchsia-400',
        bg: 'bg-fuchsia-500',
        border: 'border-fuchsia-500/50',
        hoverBorder: 'hover:border-fuchsia-500/50',
        glow: 'shadow-[0_0_15px_rgba(192,38,211,0.2)]',
        bgSoft: 'bg-fuchsia-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Entity Registry */}
            <div className="pointer-events-auto flex flex-col gap-4 w-72">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Directory
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">4 Total</span>
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                        {ADAMS_ENTITIES.map((ent) => {
                            const isSelected = selectedEntity.id === ent.id;
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

                    <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-all border border-white/5">
                        REGISTRY SEARCH
                    </button>
                </div>
            </div>

            {/* CENTER: Identity Graph (Placeholder) */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-40">
                {/* 3D Node Map would act here */}
            </div>

            {/* RIGHT: Profile & Permissions */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">

                {/* Top: Identity Card */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 p-2 opacity-20 ${THEME.primary}`}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Entity Profile</h3>
                    <p className={`text-[10px] font-mono mb-6 ${THEME.primary}`}>{selectedEntity.id}</p>

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
                        {PERMISSIONS.map((perm, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5">
                                <div>
                                    <div className="text-xs text-white/90 font-mono">{perm.scope}</div>
                                    <div className="text-[9px] text-white/30">Grant: {perm.grantedBy}</div>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${perm.level === 'WRITE' ? 'bg-fuchsia-500/20 text-fuchsia-300' : 'bg-white/10 text-white/60'}`}>
                                    {perm.level}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
