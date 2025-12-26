import React, { useState } from 'react';

// Mock Data: Sub-Portfolios & Properties
const PORTFOLIOS = [
    { id: 'creative', name: 'Creative Studios', icon: '🎨', color: 'text-purple-400', border: 'border-purple-500/30' },
    { id: 'financial', name: 'Trading Floors', icon: '📈', color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { id: 'residential', name: 'Residential', icon: '🏠', color: 'text-teal-400', border: 'border-teal-500/30' },
    { id: 'industrial', name: 'Industrial', icon: '🏭', color: 'text-orange-400', border: 'border-orange-500/30' },
];

const PROPERTIES = [
    // Creative Studios
    { id: 'PROP-101', type: 'creative', name: 'Neon Works', address: '404 Arts District', units: 8, status: 'STABILIZED', occupancy: '100%' },
    { id: 'PROP-102', type: 'creative', name: 'SoundLogix A', address: '12 Echo Blvd', units: 4, status: 'RENOVATION', occupancy: '50%' },

    // Trading Floors
    { id: 'PROP-201', type: 'financial', name: 'Quant Base Alpha', address: '10 Financial Sq', units: 1, status: 'ACTIVE', occupancy: '100%' },

    // Residential
    { id: 'PROP-301', type: 'residential', name: 'The Foundry Lofts', address: '120 S Main St', units: 12, status: 'STABILIZED', occupancy: '92%' },
    { id: 'PROP-302', type: 'residential', name: 'Highland Triplex', address: '445 Highland Ave', units: 3, status: 'RENOVATION', occupancy: '0%' },
];

const UNIT_STATUS = [
    { unit: '101', tenant: 'A. Smith', leaseEnd: '2025-08-01', status: 'OCCUPIED', rent: '$1,250' },
    { unit: '102', tenant: '-', leaseEnd: '-', status: 'VACANT', rent: '$1,300 (Market)' },
    { unit: '201', tenant: 'B. Jones', leaseEnd: '2025-12-15', status: 'OCCUPIED', rent: '$1,250' },
    { unit: '202', tenant: 'C. Doe', leaseEnd: '2026-02-01', status: 'OCCUPIED', rent: '$1,400' },
];

const MAINTENANCE_LOG = [
    { id: 'M-104', type: 'HVAC', desc: 'Unit 201 Annual Service', date: '2024-12-10', status: 'COMPLETED' },
    { id: 'M-105', type: 'PLUMBING', desc: 'Unit 102 Sink Leak', date: '2024-12-22', status: 'OPEN' },
];

export default function PTEView({ engine }) {
    const [selectedPortfolio, setSelectedPortfolio] = useState(PORTFOLIOS[0]);
    const [selectedProp, setSelectedProp] = useState(null);

    // Filter properties based on selected portfolio
    const visibleProperties = PROPERTIES.filter(p => p.type === selectedPortfolio.id);

    // Auto-select first property when switching portfolios
    React.useEffect(() => {
        if (visibleProperties.length > 0) {
            setSelectedProp(visibleProperties[0]);
        } else {
            setSelectedProp(null);
        }
    }, [selectedPortfolio]);

    // Theme Helpers
    const getTheme = (pf) => ({
        text: pf.color,
        border: pf.border,
        bgSoft: `bg-${pf.color.split('-')[1]}-950/40`,
        // Use inline style for complex dynamic shadow to avoid build errors with Tailwind compiler
        glowStyle: { boxShadow: `0 0 15px rgba(var(--color-${pf.color.split('-')[1]}-400),0.2)` }
    });

    const theme = getTheme(selectedPortfolio);

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Portfolio & Asset Selection */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">

                {/* 1. Portfolio Selector (Idea Categories) */}
                <div className="grid grid-cols-4 gap-2 mb-2">
                    {PORTFOLIOS.map(pf => (
                        <button
                            key={pf.id}
                            onClick={() => setSelectedPortfolio(pf)}
                            className={`
                                flex flex-col items-center justify-center p-2 rounded border transition-all
                                ${selectedPortfolio.id === pf.id
                                    ? `bg-white/10 border-white/40 ${pf.color}`
                                    : 'bg-black/40 border-white/5 text-white/30 hover:bg-white/5 hover:text-white/60'
                                }
                            `}
                            title={pf.name}
                        >
                            <span className="text-xl mb-1">{pf.icon}</span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between px-1 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>
                        {selectedPortfolio.name}
                    </span>
                    <span className="text-[9px] text-white/30 font-mono">
                        {visibleProperties.length} ASSETS
                    </span>
                </div>

                {/* 2. Asset List */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[60vh] overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {visibleProperties.map((prop) => {
                            const isSelected = selectedProp?.id === prop.id;
                            return (
                                <div
                                    key={prop.id}
                                    onClick={() => setSelectedProp(prop)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `bg-white/10 border-white/30`
                                            : `bg-white/5 border-transparent hover:border-white/20`
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-white/70'} group-hover:text-white`}>
                                            {prop.name}
                                        </h4>
                                        <span className={`text-[9px] font-mono px-1 rounded ${prop.status === 'STABILIZED' || prop.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                            {prop.status}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-white/50 mb-2 truncate">{prop.address}</div>
                                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/40 border-t border-white/5 pt-2">
                                        <span>Units: {prop.units}</span>
                                        <span>Occ: <span className="text-white">{prop.occupancy}</span></span>
                                    </div>
                                </div>
                            );
                        })}
                        {visibleProperties.length === 0 && (
                            <div className="text-center py-8 text-white/20 italic text-xs">
                                No assets in this portfolio yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CENTER: Digital Twin / KPI Viewer Placeholder */}
            {selectedProp && (
                <div className="flex-1 flex flex-col items-center justify-center opacity-60 pointer-events-none">
                    <div className={`relative w-96 h-64 border rounded bg-black/40 flex items-center justify-center ${theme.border}`}>
                        <div className={`font-mono text-xs tracking-widest text-center ${theme.text}`}>
                            <div>DIGITAL TWIN RENDER</div>
                            <div className="text-[10px] mt-1 opacity-50">{selectedProp.name}</div>
                            <div className="mt-4 text-[9px] text-white/40 uppercase border-t border-white/10 pt-2">
                                {selectedPortfolio.name} Division
                            </div>
                        </div>

                        {/* Corner accents */}
                        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${theme.border}`} />
                        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${theme.border}`} />
                        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${theme.border}`} />
                        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${theme.border}`} />
                    </div>
                </div>
            )}

            {/* RIGHT: Operational Details */}
            {selectedProp && (
                <div className="pointer-events-auto flex flex-col gap-4 w-96">

                    {/* Rent Roll */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 max-h-[40vh] flex flex-col">
                        <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Rent Roll</h3>
                        <div className="space-y-2 overflow-y-auto pr-1">
                            {UNIT_STATUS.map((u, i) => (
                                <div key={i} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5 text-[10px]">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold w-8 ${theme.text}`}>#{u.unit}</span>
                                        <span className={`px-1 rounded text-[8px] ${u.status === 'OCCUPIED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {u.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white">{u.rent}</div>
                                        <div className="text-white/30">{u.leaseEnd}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance */}
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Maintenance</h3>
                        <div className="space-y-2">
                            {MAINTENANCE_LOG.map((ticket) => (
                                <div key={ticket.id} className="p-2 border-l-2 border-orange-500 bg-white/5 pl-3">
                                    <div className="flex justify-between text-[9px] text-white/40 mb-1">
                                        <span>{ticket.id} • {ticket.type}</span>
                                        <span>{ticket.date}</span>
                                    </div>
                                    <div className="text-xs text-white">{ticket.desc}</div>
                                </div>
                            ))}
                        </div>
                        <button className={`mt-4 w-full py-2 border bg-white/5 hover:bg-white/10 rounded font-bold text-xs transition-all uppercase ${theme.border} ${theme.text}`}>
                            Create Ticket
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}
