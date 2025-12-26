import React, { useState } from 'react';
import { Map, ArrowLeft, Navigation, Grid, Home } from 'lucide-react';

// MOCK DATA STRUCTURE
const GEO_DATA = {
    'USA': {
        name: 'United States',
        type: 'NATIONAL',
        children: ['NY', 'TX', 'CA', 'FL', 'IL']
    },
    'NY': {
        name: 'New York',
        type: 'STATE',
        children: ['New York County', 'Kings County', 'Queens County', 'Westchester', 'Nassau']
    },
    'TX': { name: 'Texas', type: 'STATE', children: ['Travis', 'Dallas', 'Harris'] },
    'CA': { name: 'California', type: 'STATE', children: ['Los Angeles', 'San Francisco', 'San Diego'] },
    'FL': { name: 'Florida', type: 'STATE', children: ['Miami-Dade', 'Broward', 'Palm Beach'] },
    'IL': { name: 'Illinois', type: 'STATE', children: ['Cook', 'DuPage'] },

    // NY Counties
    'New York County': { name: 'Manhattan', type: 'COUNTY', children: ['Upper East Side', 'Midtown', 'SoHo', 'Tribeca', 'Financial District'] },
    'Kings County': { name: 'Brooklyn', type: 'COUNTY', children: ['Williamsburg', 'DUMBO', 'Park Slope'] },

    // Manhattan Towns/Neighborhoods
    'Financial District': { name: 'Financial District', type: 'TOWN', children: ['Wall St', 'Seaport', 'Battery Park'] },
    'Tribeca': { name: 'Tribeca', type: 'TOWN', children: ['North', 'South'] },

    // Neighborhood Level
    'Wall St': { name: 'Wall Street Core', type: 'HOOD', children: [] }
};

export default function FlatMap({ onSelectNode }) {
    const [path, setPath] = useState(['USA']); // Stack of IDs
    const currentId = path[path.length - 1];
    const data = GEO_DATA[currentId] || { name: currentId, type: 'UNKNOWN', children: [] };

    const handleDrillDown = (childId) => {
        // In a real app, we'd fetch data here
        if (!GEO_DATA[childId] && !data.children.includes(childId)) return;
        setPath([...path, childId]);
    };

    const handleGoBack = () => {
        if (path.length > 1) {
            setPath(path.slice(0, -1));
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'NATIONAL': return <Map size={16} />;
            case 'STATE': return <Grid size={16} />;
            case 'COUNTY': return <Navigation size={16} />;
            case 'TOWN': return <Home size={16} />;
            default: return <Map size={16} />;
        }
    };

    return (
        <div className="w-[600px] h-[400px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">

            {/* Header / Nav */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                    {path.length > 1 ? (
                        <button
                            onClick={handleGoBack}
                            className="p-1 hover:bg-white/10 rounded transition-colors text-white/60 hover:text-white"
                        >
                            <ArrowLeft size={16} />
                        </button>
                    ) : (
                        <div className="w-6" /> // spacer
                    )}
                    <h3 className="font-mono font-bold text-white tracking-widest uppercase text-sm flex items-center gap-2">
                        {getIcon(data.type)}
                        {data.name}
                    </h3>
                </div>
                <div className="text-[10px] font-mono text-brand/80 px-2 py-1 bg-brand/10 rounded border border-brand/20">
                    LIVE FEED
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="px-4 py-2 flex items-center gap-1 overflow-x-auto text-[10px] font-mono text-white/40 border-b border-white/5 no-scrollbar">
                {path.map((id, i) => (
                    <React.Fragment key={id}>
                        {i > 0 && <span>/</span>}
                        <button
                            onClick={() => setPath(path.slice(0, i + 1))}
                            className="hover:text-brand transition-colors whitespace-nowrap"
                        >
                            {GEO_DATA[id]?.name || id}
                        </button>
                    </React.Fragment>
                ))}
            </div>

            {/* Grid Content */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {data.children && data.children.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                        {data.children.map((childId) => {
                            const childData = GEO_DATA[childId] || { name: childId, type: 'UNKNOWN' };
                            return (
                                <button
                                    key={childId}
                                    onClick={() => handleDrillDown(childId)}
                                    className="group flex flex-col gap-2 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-brand/50 hover:shadow-[0_0_15px_rgba(0,255,157,0.1)] transition-all text-left"
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-white group-hover:text-brand transition-colors">{childData.name}</span>
                                        {/* Mock Status Dot */}
                                        <div className={`w-1.5 h-1.5 rounded-full ${Math.random() > 0.8 ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                                    </div>
                                    <div className="text-[9px] text-white/40 font-mono uppercase">{childData.type || 'REGION'}</div>

                                    {/* Mock Mini-Vis */}
                                    <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-white/30 group-hover:bg-brand transition-colors" style={{ width: `${Math.random() * 100}%` }} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-white/30">
                        <Map size={48} className="mb-4 opacity-50" />
                        <p className="text-xs font-mono uppercase tracking-widest">End of Line</p>
                        <p className="text-[10px] mt-2 max-w-[200px] text-center">Data scraping required for neighborhood density.</p>
                    </div>
                )}
            </div>

            {/* Overlay Grid Lines (Decoration) */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}
