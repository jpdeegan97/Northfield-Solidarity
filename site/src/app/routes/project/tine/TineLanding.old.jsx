import React, { useState } from "react";
import Layout from "../../../../components/Layout.jsx";
import { Link } from "react-router-dom";
import {
    Clock,
    ShoppingCart,
    ChefHat,
    Search,
    Utensils,
    Calendar,
    ArrowRight,
    Filter,
    CheckCircle2
} from "lucide-react";

export default function TineLanding() {
    const [duration, setDuration] = useState("7");
    const [mealsPerDay, setMealsPerDay] = useState("3");
    const [healthiness, setHealthiness] = useState(50);
    const [activeTab, setActiveTab] = useState("plan");

    return (
        <Layout>
            <div data-theme="tine" className="bg-[#FAF9F6] min-h-screen text-neutral-800 font-sans">
                {/* TINE: Meal Planning & Procurement Engine */}

                {/* HEADER / HERO SECTION */}
                <div className="bg-white border-b border-neutral-200">
                    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase mb-6">
                                <Utensils size={14} />
                                <span>NS TINE Protocol</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-neutral-900 leading-tight">
                                Meals, planned.<br />
                                <span className="text-orange-500">Carts, optimized.</span>
                            </h1>
                            <p className="text-xl text-neutral-500 mb-8 leading-relaxed max-w-lg">
                                Stop asking "what should I eat?" TINE turns your intent into a curated menu, optimized grocery carts, and optional chef execution.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-2">
                                    Start Planning <ArrowRight size={18} />
                                </button>
                                <button className="px-8 py-4 bg-white border border-neutral-200 text-neutral-600 font-bold rounded-lg hover:border-orange-200 hover:text-orange-600 transition-all flex items-center gap-2">
                                    Browse Chefs <ChefHat size={18} />
                                </button>
                            </div>
                        </div>

                        {/* INTERACTIVE DEMO CARD */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-200 rounded-2xl rotate-3 opacity-20 transform scale-105" />
                            <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 relative overflow-hidden">
                                <div className="flex border-b border-neutral-100 mb-6">
                                    {['Intent', 'Plan', 'Cart'].map((step, i) => (
                                        <div key={step} className={`flex-1 pb-4 text-center text-sm font-bold uppercase tracking-wider relative ${i === 0 ? 'text-orange-500' : 'text-neutral-300'}`}>
                                            {step}
                                            {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Duration</label>
                                        <div className="flex gap-2">
                                            {['3 Days', '7 Days', '14 Days'].map(d => (
                                                <button
                                                    key={d}
                                                    onClick={() => setDuration(d.split(' ')[0])}
                                                    className={`flex-1 py-3 rounded-lg border text-sm font-bold transition-all ${duration === d.split(' ')[0] ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-neutral-200 hover:border-orange-200'}`}
                                                >
                                                    {d}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Health / Indulgence Balance</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={healthiness}
                                            onChange={(e) => setHealthiness(e.target.value)}
                                            className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <div className="flex justify-between text-xs font-bold text-neutral-400 mt-1">
                                            <span>Max Flavor</span>
                                            <span>Max Health</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-100">
                                        <div className="flex justify-between items-center bg-neutral-50 p-4 rounded-lg border border-neutral-100 mb-4">
                                            <div className="text-sm font-bold text-neutral-600">Generated Plan Estimate</div>
                                            <div className="text-lg font-black text-neutral-900">$142<span className="text-xs text-neutral-400 font-normal">.50</span></div>
                                        </div>
                                        <button className="w-full py-4 bg-neutral-900 text-white font-bold rounded-lg hover:bg-black transition-all flex justify-center items-center gap-2">
                                            Generate Menu <Search size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURES SECTION */}
                <div className="py-24 px-6 bg-[#FAF9F6]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-black text-neutral-900 mb-4">The Meal OS Stack</h2>
                            <p className="text-neutral-500">From faint idea to full fridge in three steps. TINE handles the logistics so you just handle the eating.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={Calendar}
                                title="Curated Planning"
                                desc="Algorithmic menu generation based on your diet, allergies, goals, and budget constraints."
                                color="text-blue-500"
                                bg="bg-blue-50"
                            />
                            <FeatureCard
                                icon={ShoppingCart}
                                title="Multi-Store Cart"
                                desc="We act as a meta-layer over grocery stores, finding the cheapest or fastest combination of items."
                                color="text-green-500"
                                bg="bg-green-50"
                            />
                            <FeatureCard
                                icon={ChefHat}
                                title="Chef Execution"
                                desc="Don't want to cook? Dispatch a vetted professional to your kitchen to prep your plan."
                                color="text-orange-500"
                                bg="bg-orange-50"
                            />
                        </div>
                    </div>
                </div>

                {/* HOW IT WORKS / PROOF */}
                <div className="py-24 px-6 bg-white border-y border-neutral-100">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            {/* Abstract UI Mockup for Cart Optimization */}
                            <div className="bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden max-w-md mx-auto transform rotate-[-2deg]">
                                <div className="bg-neutral-50 border-b border-neutral-100 p-4 flex justify-between items-center">
                                    <div className="font-bold text-neutral-700">Cart Optimizer</div>
                                    <div className="text-xs font-mono text-neutral-400">ID: CN-9921</div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <CartOption label="Cheapest Strategy" price="$84.20" stores={['Walmart', 'Aldi']} selected />
                                    <CartOption label="Fastest Strategy" price="$112.50" stores={['Whole Foods']} />
                                    <CartOption label="Single Store" price="$96.10" stores={['Kroger']} />
                                </div>
                                <div className="bg-neutral-50 p-4 border-t border-neutral-100 text-center">
                                    <button className="text-xs font-bold text-orange-600 uppercase tracking-widest">Analyze More Options</button>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-3xl font-black text-neutral-900 mb-6">Price arbitrage for your pantry.</h3>
                            <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
                                Grocery prices fluctuate. TINE checks inventory and pricing across multiple local providers to build the optimal cart for your specific menu.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Automatic ingredient normalization (oz -> grams)",
                                    "Pantry deduction (don't buy what you have)",
                                    "Brand vs. Generic toggles",
                                    "Split-cart logistics handling"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                        <span className="font-medium text-neutral-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

function FeatureCard({ icon: Icon, title, desc, color, bg }) {
    return (
        <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg ${bg} ${color} flex items-center justify-center mb-6`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
            <p className="text-neutral-500 leading-relaxed text-sm">{desc}</p>
        </div>
    );
}

function CartOption({ label, price, stores, selected }) {
    return (
        <div className={`flex justify-between items-center p-4 rounded-lg border transition-all cursor-pointer ${selected ? 'border-orange-500 bg-orange-50' : 'border-neutral-100 hover:border-orange-200'}`}>
            <div>
                <div className={`font-bold text-sm ${selected ? 'text-orange-900' : 'text-neutral-700'}`}>{label}</div>
                <div className="text-xs text-neutral-400 mt-1 flex gap-2">
                    {stores.map(s => <span key={s} className="bg-white border border-neutral-200 px-1 rounded">{s}</span>)}
                </div>
            </div>
            <div className={`font-black tracking-tight ${selected ? 'text-orange-600' : 'text-neutral-900'}`}>{price}</div>
        </div>
    );
}
