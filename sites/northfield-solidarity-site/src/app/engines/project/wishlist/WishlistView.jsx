import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Truck, DollarSign, Award, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistView() {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('IDLE'); // IDLE, RESEARCHING, ANALYZING, READY
    const [results, setResults] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setStatus('RESEARCHING');

        // Simulate Agentic Research Flow
        setTimeout(() => setStatus('ANALYZING'), 1500);
        setTimeout(() => {
            setStatus('READY');
            setResults(MOCK_RESULTS);
        }, 3000);
    };

    return (
        <div className="w-full h-full bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
            {/* Header */}
            <div className="flex-none p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center border border-pink-500/50">
                        <ShoppingBag size={18} className="text-pink-500" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">WISHLIST</h1>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Buying Decision Copilot</div>
                    </div>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-[10px] text-white/50 font-mono">
                    v0.1.0 POC
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto relative">

                {/* IDLE STATE */}
                {status === 'IDLE' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                                What do you want to buy?
                            </h2>
                            <p className="text-white/60 text-lg">
                                Stop tab-switching. Wishlist compiles research, availability, and trusted rankings in seconds.
                            </p>

                            <form onSubmit={handleSearch} className="relative w-full group">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative flex items-center bg-[#111] border border-white/10 rounded-xl p-2 focus-within:border-pink-500/50 transition-colors">
                                    <Search className="ml-4 text-white/40" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="e.g. Best noise cancelling headphones under $300..."
                                        className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 text-white placeholder-white/20"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={!query.trim()}
                                        className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-pink-500 hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black"
                                    >
                                        Research
                                    </button>
                                </div>
                            </form>

                            <div className="flex justify-center gap-4 text-xs text-white/30 font-mono uppercase tracking-widest">
                                <span>Powered by DRE</span>
                                <span>•</span>
                                <span>Live Availability</span>
                                <span>•</span>
                                <span>Trust Scoring</span>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* LOADING STATES */}
                {(status === 'RESEARCHING' || status === 'ANALYZING') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full animate-ping" />
                            <div className="absolute inset-0 border-4 border-t-pink-500 border-r-pink-500/50 border-b-purple-500/50 border-l-transparent rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles size={32} className="text-white animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                            {status === 'RESEARCHING' ? 'Scouring the Web...' : 'Synthesizing Decision Matrix...'}
                        </h3>
                        <div className="flex flex-col gap-2 items-center text-sm text-white/50 font-mono">
                            <AgentStep label="Identified product category: Consumer Electronics" done={true} />
                            <AgentStep label="Aggregating reviews (rtings, reddit, youtube)..." done={status === 'ANALYZING'} />
                            <AgentStep label="Checking inventory at 14 major retailers..." done={status === 'ANALYZING'} />
                            <AgentStep label="Filtering for scams and fake listings..." done={status === 'ANALYZING'} />
                        </div>
                    </div>
                )}

                {/* RESULTS STATE */}
                {status === 'READY' && results && (
                    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        {/* Canonical Product Identity */}
                        <div className="flex items-start gap-6 pb-8 border-b border-white/10">
                            <div className="w-32 h-32 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                <img src="https://placehold.co/200x200/111/pink?text=Headphones" alt="Product" className="rounded-lg opacity-80" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 text-[10px] font-bold uppercase tracking-wider border border-pink-500/20">
                                        Consensus Top Pick
                                    </span>
                                    <span className="text-white/40 text-xs font-mono">Confidence: 98.4%</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mb-2">Sony WH-1000XM5</h2>
                                <p className="text-white/60 max-w-2xl leading-relaxed">
                                    The current market leader for noise cancellation. While the older XM4 represents better value for some, the XM5 offers superior ANC, call quality, and comfort.
                                </p>
                            </div>
                        </div>

                        {/* Decision Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Option 1: Best Value */}
                            <ResultCard
                                badge="Best Overall Value"
                                badgeColor="bg-green-500"
                                price="$298.00"
                                merchant="Amazon (Official)"
                                eta="Tomorrow, Jan 2"
                                condition="New"
                                pros={['Lowest historical price', 'Prime shipping', 'Official warranty']}
                                cons={['Silver color only at this price']}
                                highlight
                            />

                            {/* Option 2: Fastest */}
                            <ResultCard
                                badge="Fastest (Local Pickup)"
                                badgeColor="bg-blue-500"
                                price="$329.99"
                                merchant="Best Buy (Northfield)"
                                eta="Pickup in 1hr"
                                condition="New"
                                pros={['Instant gratification', 'Easy local returns']}
                                cons={['$32 premium over Amazon']}
                            />

                            {/* Option 3: Budget */}
                            <ResultCard
                                badge="Budget Alternate"
                                badgeColor="bg-orange-500"
                                price="$199.00"
                                merchant="eBay (Refurbished)"
                                eta="Delivery Jan 5-7"
                                condition="Certified Refurbished"
                                subtext="Sony WH-1000XM4"
                                pros={['$100 savings', '2 year Allstate warranty']}
                                cons={['Previous gen model', 'Slower shipping']}
                            />
                        </div>

                        {/* Research Summary */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                                <ShieldCheck size={16} /> Research Notes
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/70">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Why we ranked this way:</h4>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li>Amazon is currently matching a flash sale from B&H, making it the price floor.</li>
                                        <li>Best Buy has stock locally (verified 12 mins ago).</li>
                                        <li>Avoided 3 listings on 'DailyDeals' due to suspicious seller ratings.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Watch outs:</h4>
                                    <ul className="space-y-2 list-disc list-inside text-red-300/80">
                                        <li>International version (no US warranty) is floating around for $270. We filtered this out.</li>
                                        <li>New model rumors are weak; safe to buy now.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

function AgentStep({ label, done }) {
    return (
        <div className={`flex items-center gap-3 transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-2 h-2 rounded-full ${done ? 'bg-pink-500' : 'bg-white/20'}`} />
            <span>{label}</span>
        </div>
    );
}

function ResultCard({ badge, badgeColor, price, merchant, eta, condition, pros, cons, highlight, subtext }) {
    return (
        <div className={`
            relative p-6 rounded-xl border flex flex-col h-full transition-all group hover:scale-[1.02]
            ${highlight ? 'bg-white/10 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}
        `}>
            <div className={`
                absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl text-white
                ${badgeColor}
            `}>
                {badge}
            </div>

            <div className="mb-4 pt-2">
                {subtext && <div className="text-xs font-bold text-white/50 mb-1">{subtext}</div>}
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">{price}</span>
                </div>
                <div className="text-sm font-medium text-white/90 flex items-center gap-2 mt-1">
                    <ShoppingBag size={14} className="text-pink-500" />
                    {merchant}
                </div>
            </div>

            <div className="space-y-3 mb-6 flex-1 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                    <Truck size={14} />
                    <span>{eta}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                    <Award size={14} />
                    <span>{condition}</span>
                </div>
            </div>

            <div className="space-y-2 mb-6">
                {pros.map(p => (
                    <div key={p} className="flex items-start gap-2 text-xs text-green-300/80">
                        <ArrowRight size={12} className="mt-0.5 shrink-0" />
                        {p}
                    </div>
                ))}
            </div>

            <button className={`
                w-full py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2
                ${highlight ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}
            `}>
                View Offer
            </button>
        </div>
    );
}

const MOCK_RESULTS = {
    // populated inside renders directly for MVP speed
    found: true
};
