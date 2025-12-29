import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, TrendingUp, DollarSign, Calendar, MapPin, Shield, Star, Activity } from 'lucide-react';

export default function DreamDetailOverlay({ dream, onClose, accentColor = '#00ff9d' }) {
    if (!dream) return null;

    // Mock additional stats for the overlay
    const stats = {
        appreciation: "+12% / yr",
        maintenance: "$85k / yr",
        insurance: "$42k / yr",
        liquidity: "Moderate",
        lastSold: "2021",
        location: dream.category === 'Real Estate' ? 'New York, NY' :
            dream.category === 'Yachts' ? 'Monaco' :
                dream.category === 'Vehicles' ? 'Molsheim, France' : 'Global'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Visual Side (Left/Top) */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-[#050505]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img
                        src={dream.image}
                        alt={dream.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'; }} // Fallback
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="bg-black/60 backdrop-blur border border-white/10 text-white/80 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            {dream.category}
                        </span>
                    </div>
                </div>

                {/* Content Side (Right/Bottom) */}
                <div className="w-full md:w-1/2 flex flex-col bg-[#0a0a0a] border-l border-white/10">
                    {/* Header */}
                    <div className="p-8 border-b border-white/10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${dream.status === 'LOCKED' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                                    {dream.status}
                                </span>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Target ID: #{dream.id.toString().padStart(3, '0')}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white leading-tight mb-2">{dream.title}</h2>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-[#00ff9d]">
                                    <DollarSign size={16} />
                                    <span className="font-bold text-lg">{dream.price.toLocaleString()}</span>
                                </div>
                                <div className="text-white/40 flex items-center gap-1">
                                    <MapPin size={12} /> {stats.location}
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">

                        {/* Description */}
                        <div>
                            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Activity size={12} /> Description
                            </h3>
                            <p className="text-white/70 leading-relaxed text-sm">
                                {dream.description}
                                <br /><br />
                                This asset represents a tier-1 acquisition target within the {dream.category} class.
                                Procurement strategy requires liquidity event triggers and verified broker connectivity.
                            </p>
                        </div>

                        {/* Asset Stats Grid */}
                        <div>
                            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <TrendingUp size={12} /> Asset Intelligence
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <StatBox label="Proj. Appreciation" value={stats.appreciation} highlight />
                                <StatBox label="Est. Maintenance" value={stats.maintenance} />
                                <StatBox label="Insurance Premium" value={stats.insurance} />
                                <StatBox label="Market Liquidity" value={stats.liquidity} />
                            </div>
                        </div>

                        {/* Acquisition Path */}
                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                                <Shield size={12} className="text-[#00ff9d]" /> Acquisition Protocol
                            </h4>
                            <div className="space-y-3">
                                <Step number="01" text="Establish contact with primary broker" done />
                                <Step number="02" text="Verify asset provenance and title" />
                                <Step number="03" text="Execute purchase agreement" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/10 bg-[#0f0f0f] flex gap-3">
                        <button className="flex-1 py-3 bg-[#00ff9d] text-black font-bold uppercase tracking-widest text-xs rounded hover:brightness-110 transition-all flex items-center justify-center gap-2">
                            <ExternalLink size={14} /> Contact Broker
                        </button>
                        <button className="flex-1 py-3 bg-white/5 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2">
                            <Calendar size={14} /> Schedule View
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

const StatBox = ({ label, value, highlight }) => (
    <div className="bg-[#111] p-3 rounded border border-white/5">
        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{label}</div>
        <div className={`font-mono font-bold ${highlight ? 'text-[#00ff9d]' : 'text-white'}`}>{value}</div>
    </div>
);

const Step = ({ number, text, done }) => (
    <div className={`flex items-center gap-3 text-xs ${done ? 'text-white' : 'text-white/40'}`}>
        <span className={`font-mono font-bold ${done ? 'text-[#00ff9d]' : 'text-white/20'}`}>{number}</span>
        <span className={done ? 'line-through decoration-[#00ff9d]/50' : ''}>{text}</span>
    </div>
);
