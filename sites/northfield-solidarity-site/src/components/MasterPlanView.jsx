import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Globe, ChevronRight, MapPin, Activity } from 'lucide-react';
import WorldMapProjection from './WorldMapProjection';

// Mock Master Plan Data (Sectors -> Sub-Sectors)
const SECTOR_MAP = {
    'Healthcare': {
        icon: '🏥',
        subSectors: ['Dentistry', 'Primary Care', 'Specialty Clinics', 'Veterinary']
    },
    'Food & Beverage': {
        icon: '🥐',
        subSectors: ['Bakery', 'Fine Dining', 'Fast Casual', 'Beverage / Café']
    },
    'Technology': {
        icon: '💻',
        subSectors: ['SaaS', 'Hardware', 'Cybersecurity', 'AI Infrastructure']
    },
    'Real Estate': {
        icon: '🏢',
        subSectors: ['Residential', 'Commercial', 'Industrial', 'Land']
    }
};

const LOCATIONS = [
    'West Orange, NJ',
    'Washington, DC',
    'New York, NY',
    'San Francisco, CA',
    'London, UK'
];

export default function MasterPlanView() {
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSubSector, setSelectedSubSector] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    const handleSubSelect = (sector, sub) => {
        setSelectedSector(sector);
        setSelectedSubSector(sub);
    };

    return (
        <div className="tab-content fade-in">
            <section className="ir-section">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="section-label">Master Plan Execution</h3>
                        <p className="lead ir-subtitle" style={{ marginBottom: '0' }}>
                            Global industry mapping and granular market penetration strategy.
                        </p>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Controls & Navigation */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Semantic Search */}
                        <div className="bg-[#1e293b]/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="text-xl">🔍</span> Market Scout
                            </h4>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="e.g. 'Underperforming Bakeries in Ohio'"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-slate-300 focus:outline-none focus:border-emerald-500 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute left-3 top-3.5 text-slate-500">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {['Plumbers', 'HVAC', 'Dentists', 'Bakeries'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSearchQuery(tag)}
                                        className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selector Panel */}
                        <div className="bg-[#1e293b]/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Activity size={16} className="text-emerald-400" /> Market Focus
                            </h4>

                            {/* Sector List */}
                            <div className="space-y-4">
                                {Object.entries(SECTOR_MAP).map(([sector, data]) => (
                                    <div key={sector} className="group">
                                        <div
                                            className={`p-3 rounded-lg border transition-all cursor-pointer flex justify-between items-center
                                                ${selectedSector === sector
                                                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                                }`}
                                            onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
                                        >
                                            <span className="font-semibold flex items-center gap-2">
                                                <span>{data.icon}</span> {sector}
                                            </span>
                                            <ChevronRight size={14} className={`transform transition-transform ${selectedSector === sector ? 'rotate-90' : ''}`} />
                                        </div>

                                        {/* Sub-Sectors Expansion */}
                                        <AnimatePresence>
                                            {selectedSector === sector && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pl-4 pt-2 space-y-1 border-l border-white/10 ml-4 mt-2">
                                                        {data.subSectors.map(sub => (
                                                            <div
                                                                key={sub}
                                                                onClick={() => handleSubSelect(sector, sub)}
                                                                className={`px-3 py-1.5 rounded text-sm cursor-pointer transition-colors
                                                                    ${selectedSubSector === sub
                                                                        ? 'bg-emerald-500/20 text-emerald-300'
                                                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                                                    }`}
                                                            >
                                                                {sub}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Analysis / Opportunity Panel (Only shows if subsector is selected) */}
                        {selectedSubSector && (
                            <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
                                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                    Why This Matters
                                </h4>
                                <h3 className="text-white font-bold text-lg mb-2">High Fragmentation Opportunity</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    The {selectedSubSector} sector is characterized by 85% independent ownership with low technology penetration. <br /><br />
                                    <strong>Opportunity:</strong> Consolidate back-office operations and introduce automated scheduling engines.
                                </p>
                                <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-sm transition shadow-lg shadow-emerald-900/20">
                                    Initialize Campaign
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Col: Map Projection */}
                    <div className="lg:col-span-2">
                        <div className="relative group">
                            {/* Map Header Controls */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                        <Globe size={18} className="text-blue-400" /> Global Projection Layer
                                    </h4>
                                    <p className="text-xs text-slate-500 font-mono mt-1">
                                        LIVE • GRANULARITY: {selectedSubSector ? 'HIGH' : 'LOW'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsMapExpanded(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs uppercase font-bold hover:bg-blue-500/20 transition-all"
                                >
                                    <Maximize size={14} /> Expand View
                                </button>
                            </div>

                            {/* The Map Component */}
                            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                                <WorldMapProjection
                                    sector={selectedSector}
                                    subSector={selectedSubSector}
                                    searchFilter={searchQuery}
                                    isExpanded={isMapExpanded}
                                    onClose={() => setIsMapExpanded(false)}
                                />

                                {/* Status Overlay (if strictly non-expanded) */}
                                {!isMapExpanded && (
                                    <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500 bg-black/80 px-2 py-1 rounded border border-white/5">
                                        PROJECTION MODE: ORBITAL
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contextual Data / Stats below map */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-[#1e293b]/20 p-4 rounded-lg border border-white/5">
                                <div className="text-slate-500 text-xs uppercase font-bold mb-1">Total Addressable Market</div>
                                <div className="text-2xl font-mono text-white">$4.2T</div>
                                <div className="text-emerald-500 text-xs mt-1">+12% YoY</div>
                            </div>
                            <div className="bg-[#1e293b]/20 p-4 rounded-lg border border-white/5">
                                <div className="text-slate-500 text-xs uppercase font-bold mb-1">Active Nodes</div>
                                <div className="text-2xl font-mono text-white">
                                    {selectedSubSector ? '487' : '14,203'}
                                </div>
                                <div className="text-blue-500 text-xs mt-1">Live Tracking</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
