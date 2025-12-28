import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trophy, Car, MapPin, DollarSign, Star, TrendingUp, Activity, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Layout from '../../components/Layout';

import { DREAMS_DATA } from '../../data/dreamsRegistry';

export default function Dreams() {
    // Initial mock data based on user request
    const [dreams, setDreams] = useState(DREAMS_DATA);

    // Calculate total value
    const totalValue = dreams.reduce((acc, dream) => acc + dream.price, 0);

    const categories = ["All", "Real Estate", "Vehicles", "Yachts", "Watches", "Memberships", "Lifestyle"];
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMarketData, setShowMarketData] = useState(false);

    // Mock Market Data
    const marketData = {
        "All": {
            trend: "positive",
            index: "High Net Worth Global Index",
            change: "+12.4%",
            volume: "$420B",
            notes: "Luxury asset classes outperforming traditional equities in Q3 and Q4."
        },
        "Real Estate": {
            trend: "positive",
            index: "Prime Global Cities Index",
            change: "+4.2%",
            volume: "$1.2B (Weekly)",
            notes: "New York and London super-prime markets seeing renewed velocity.",
            comparables: [
                { name: "432 Park Ave #79", price: "$59M", date: "Oct 2024" },
                { name: "Central Park Tower pH", price: "$115M", date: "Sep 2024" }
            ]
        },
        "Vehicles": {
            trend: "stable",
            index: "HAGI Top Index",
            change: "+1.8%",
            volume: "N/A",
            notes: "Hypercar values holding steady; vintage Ferrari slightly down.",
            comparables: [
                { name: "Chiron Pur Sport", price: "$5.1M", date: "Nov 2024" },
                { name: "McLaren F1", price: "$20M", date: "Aug 2024" }
            ]
        },
        "Yachts": {
            trend: "negative",
            index: "Superyacht Market Index",
            change: "-2.5%",
            volume: "Low",
            notes: "Inventory building up in the 40-60m range; buyer's market.",
            comparables: [
                { name: "Riva 110 'Dolcevita'", price: "$12M", date: "Dec 2024" },
                { name: "Sanlorenzo 52Steel", price: "$34M", date: "Oct 2024" }
            ]
        },
        "Watches": {
            trend: "positive",
            index: "Subdial50 Index",
            change: "+3.1%",
            volume: "Moderate",
            notes: "Independent watchmaking (fp journe, rexhep rexhepi) surging.",
            comparables: [
                { name: "Patek 5711 Tiffany", price: "$2.5M", date: "Nov 2024" },
                { name: "FP Journe Chronometre", price: "$120k", date: "Oct 2024" }
            ]
        },
        "Memberships": {
            trend: "positive",
            index: "Privé Access Index",
            change: "+15%",
            volume: "Tight",
            notes: "Waitlists extending for top-tier clubs; initiation fees rising.",
            comparables: [
                { name: "Zero Bond", price: "$50k", date: "2025 Rates" },
                { name: "Annabel's", price: "£250k (Lifetime)", date: "2025 Rates" }
            ]
        },
        "Lifestyle": {
            trend: "positive",
            index: "Luxury Goods Bucket",
            change: "+8.9%",
            volume: "High",
            notes: "Watches and Art continuing to separate from general retail.",
            comparables: []
        }
    };

    const currentMarketData = marketData[activeCategory] || marketData["All"];

    const filteredDreams = activeCategory === "All"
        ? dreams
        : dreams.filter(d => d.category === activeCategory);

    return (
        <Layout>
            <div className="flex flex-col h-full text-white overflow-y-auto custom-scrollbar font-mono relative">
                {/* Background Ambience */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.1),transparent_70%)]" />

                {/* Header */}
                <div className="relative z-10 p-8 border-b border-white/10 flex items-end justify-between bg-black/50 backdrop-blur-md sticky top-0">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <Trophy className="text-[#00ff9d]" size={24} />
                            <h1 className="text-3xl font-bold tracking-tight text-white">DREAMS & NIGHTMARES</h1>
                        </motion.div>
                        <p className="text-white/40 text-sm max-w-xl">
                            Visualizing the target state. Cataloging the physical manifestations of success.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Total Target Value</div>
                        <div className="text-4xl font-bold text-[#00ff9d] tracking-tighter">
                            ${totalValue.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Market Intelligence Panel */}
                <AnimatePresence>
                    {showMarketData && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-[#00ff9d]/5 border-b border-[#00ff9d]/20 overflow-hidden"
                        >
                            <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {/* Main Stat */}
                                <div className="lg:col-span-1">
                                    <div className="text-[10px] uppercase tracking-widest text-[#00ff9d] mb-2 flex items-center gap-2">
                                        <Activity size={12} /> Market Pulse
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">{currentMarketData.index}</div>
                                    <div className={`text-sm font-bold flex items-center gap-1 ${currentMarketData.trend === 'positive' ? 'text-green-400' : currentMarketData.trend === 'negative' ? 'text-red-400' : 'text-yellow-400'}`}>
                                        {currentMarketData.trend === 'positive' ? <ArrowUpRight size={16} /> : currentMarketData.trend === 'negative' ? <ArrowDownRight size={16} /> : <Activity size={16} />}
                                        {currentMarketData.change}
                                    </div>
                                </div>

                                {/* Analysis */}
                                <div className="lg:col-span-1">
                                    <div className="text-[10px] uppercase tracking-widest text-[#00ff9d] mb-2 flex items-center gap-2">
                                        <Globe size={12} /> Global Analysis
                                    </div>
                                    <p className="text-sm text-white/70 leading-relaxed border-l-2 border-[#00ff9d]/30 pl-3">
                                        {currentMarketData.notes}
                                    </p>
                                </div>

                                {/* Comparables */}
                                <div className="lg:col-span-2">
                                    <div className="text-[10px] uppercase tracking-widest text-[#00ff9d] mb-2 flex items-center gap-2">
                                        <TrendingUp size={12} /> Recent Comparables
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {currentMarketData.comparables && currentMarketData.comparables.map((comp, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm p-2 bg-black/20 rounded border border-white/5">
                                                <span className="text-white/60">{comp.name}</span>
                                                <span className="font-bold text-white">{comp.price}</span>
                                            </div>
                                        ))}
                                        {(!currentMarketData.comparables || currentMarketData.comparables.length === 0) && (
                                            <div className="text-white/20 text-xs italic">Insufficient recent data for this class.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="relative z-10 px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all ${activeCategory === cat
                                    ? 'bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30'
                                    : 'text-white/40 hover:text-white border border-transparent hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowMarketData(!showMarketData)}
                            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase rounded transition-colors border ${showMarketData ? 'bg-[#00ff9d]/20 text-[#00ff9d] border-[#00ff9d]/50' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                        >
                            <Activity size={14} />
                            <span>Market Intel</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#00ff9d] text-black text-xs font-bold tracking-widest uppercase rounded hover:bg-[#00ff9d]/90 transition-colors">
                            <Plus size={16} />
                            <span>Add Item</span>
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDreams.map((dream, index) => (
                        <motion.div
                            key={dream.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-[#00ff9d]/30 transition-all cursor-pointer"
                        >
                            {/* Image Overlay */}
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur text-white/60 text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wider flex items-center gap-1">
                                    {dream.status === 'LOCKED' && <Star size={10} />}
                                    {dream.status}
                                </div>
                                <img
                                    src={dream.image}
                                    alt={dream.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-10 -mt-20">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[#00ff9d] text-[10px] font-bold uppercase tracking-widest py-1 px-2 bg-[#00ff9d]/10 rounded border border-[#00ff9d]/20">
                                        {dream.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#00ff9d] transition-colors">
                                    {dream.title}
                                </h3>
                                <div className="flex items-center gap-2 text-white/60 mb-4 font-sans text-sm">
                                    <DollarSign size={14} className="text-[#00ff9d]" />
                                    <span className="font-bold tracking-wide text-white">{dream.price.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-white/40 leading-relaxed font-sans mb-6">
                                    {dream.description}
                                </p>

                                {/* Action Line */}
                                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">Target Acquisition</span>
                                    <div className="h-1 w-12 bg-white/10 rounded overflow-hidden">
                                        <div className="h-full bg-[#00ff9d] w-1/4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </Layout >
    );
}
