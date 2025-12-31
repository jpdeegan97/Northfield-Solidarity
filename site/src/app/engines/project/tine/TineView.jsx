import React, { useState } from "react";
import { Clock, ShoppingCart, ChefHat, Search, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

export default function TineView() {
    const [duration, setDuration] = useState("7");
    const [healthiness, setHealthiness] = useState(50);
    const [view, setView] = useState("planning"); // planning, processing, results

    // Simulated Processing
    const handleGenerate = () => {
        setView("processing");
        setTimeout(() => setView("results"), 1500);
    };

    // LOADING STATE
    if (view === "processing") {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF9F6] text-neutral-800 p-8 text-center">
                <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingCart size={20} className="text-orange-500/50" />
                    </div>
                </div>
                <h3 className="text-xl font-black mb-2 tracking-tight">Optimizing Procurement</h3>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-wider animate-pulse">
                    Querying 14 Local Inventories...
                </p>
            </div>
        );
    }

    // RESULTS STATE
    if (view === "results") {
        return (
            <div className="w-full h-full bg-[#FAF9F6] text-neutral-800 flex flex-col font-sans overflow-hidden">
                {/* Header */}
                <div className="flex-none p-4 border-b border-neutral-200 bg-white shadow-sm z-10 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-black text-neutral-900 leading-none flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-500" />
                            Weekly Plan Generated
                        </h2>
                        <p className="text-[10px] font-bold text-neutral-400 mt-1 uppercase tracking-wide">
                            {duration} Days • {Number(duration) * 3} Meals • {healthiness}% Health Score
                        </p>
                    </div>
                    <button
                        onClick={() => setView("planning")}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-400 hover:text-orange-600"
                        title="Reset Plan"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {/* CART OPTIONS - Responsive Grid */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 pl-1">Procurement Strategy</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <CartResultCard
                                title="Cheapest"
                                price="$84.20"
                                stores={['Walmart', 'Aldi']}
                                tags={['Split Cart', 'Generic Brands']}
                                color="border-green-500 bg-green-50"
                                btn="bg-green-600"
                                isBest
                            />
                            <CartResultCard
                                title="Fastest"
                                price="$112.50"
                                stores={['Whole Foods']}
                                tags={['Single Trip', 'Organic']}
                                color="border-blue-500 bg-blue-50"
                                btn="bg-blue-600"
                            />
                            <CartResultCard
                                title="Balanced"
                                price="$96.10"
                                stores={['Kroger', 'Aldi']}
                                tags={['Quality Mix', '2 Stops']}
                                color="border-orange-500 bg-orange-50"
                                btn="bg-orange-600"
                            />
                        </div>
                    </div>

                    {/* MENU PREVIEW */}
                    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Menu Preview</h3>
                            <button className="text-[10px] font-bold text-orange-600 uppercase hover:underline">Edit Preferences</button>
                        </div>
                        <div className="space-y-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                                <div key={day} className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100 group cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-[10px] font-black text-neutral-400 group-hover:bg-white group-hover:text-orange-500 shadow-sm transition-colors">
                                        {day}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-neutral-700 truncate">
                                            {['Roasted Salmon with Quinoa', 'Pesto Chicken Pasta', 'Tofu Stir Fry', 'Beef Tacos', 'Grilled Veggie Wrap'][i]}
                                        </div>
                                        <div className="text-[10px] text-neutral-400 flex gap-2">
                                            <span>450kcal</span>
                                            <span>•</span>
                                            <span>30m Prep</span>
                                        </div>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Search size={14} className="text-neutral-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // PLANNING STATE (Default)
    return (
        <div className="w-full h-full bg-[#FAF9F6] text-neutral-800 flex flex-col font-sans overflow-hidden relative">

            {/* Main Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase">TINE Protocol v0.1</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                        Intent <span className="text-neutral-300">/</span> Plan <span className="text-neutral-300">/</span> Cart
                    </h1>
                    <p className="text-sm text-neutral-500 max-w-md">
                        Configure your meal parameters. TINE will deduce the optimal procurement strategy across local inventories.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Card 1: Duration */}
                    <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            <Clock size={14} /> Duration
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {['3', '7', '14'].map(d => (
                                <button
                                    key={d}
                                    onClick={() => setDuration(d)}
                                    className={`py-3 rounded-lg border text-sm font-bold transition-all relative overflow-hidden ${duration === d ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-inner' : 'border-neutral-100 bg-neutral-50 hover:bg-white hover:border-orange-200 text-neutral-500'}`}
                                >
                                    {d} Days
                                    {duration === d && <div className="absolute inset-0 border-2 border-orange-500 rounded-lg pointer-events-none opacity-20" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card 2: Optimization */}
                    <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            <ChefHat size={14} /> Optimization Goal
                        </label>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={healthiness}
                                onChange={(e) => setHealthiness(e.target.value)}
                                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-neutral-400 mt-2">
                            <span className={healthiness < 30 ? "text-orange-500" : ""}>Max Flavor</span>
                            <span className={healthiness >= 30 && healthiness <= 70 ? "text-orange-500" : ""}>Balanced</span>
                            <span className={healthiness > 70 ? "text-orange-500" : ""}>Max Health</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="flex-none p-6 bg-white border-t border-neutral-100 shadow-[0_-5px_20px_rgba(0,0,0,0.02)] z-10">
                <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl shadow-lg hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-3 group"
                >
                    <span>Generate Optimized Plan</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}

function CartResultCard({ title, price, stores, tags, color, btn, isBest }) {
    return (
        <div className={`p-4 rounded-xl border ${color} bg-opacity-30 flex flex-col h-full relative overflow-hidden transition-all hover:scale-[1.02] cursor-pointer group`}>
            {isBest && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
                    RECOMMENDED
                </div>
            )}

            <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
                    {title}
                </span>
            </div>

            <div className="text-xl font-black text-neutral-900 mb-3 tracking-tight">{price}</div>

            <div className="space-y-1 mb-4 flex-1">
                {stores.map(s => (
                    <div key={s} className="text-[10px] font-medium text-neutral-600 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-neutral-400" /> {s}
                    </div>
                ))}
            </div>

            <button className={`w-full py-2 ${btn} text-white font-bold text-[10px] rounded uppercase tracking-wide opacity-90 hover:opacity-100 shadow-sm`}>
                Select
            </button>
        </div>
    );
}
