import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { ShoppingCart, ChevronRight, Search, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useOwnership } from '../../context/OwnershipContext.jsx';

const MOCK_ASSETS = [
    { id: 'a1', name: 'Quantum Ledger Core', category: 'INFRASTRUCTURE', group: 'ENGINES', price: 25000, tier: 'HYPER', desc: 'High-throughput consensus engine.' },
    { id: 'a2', name: 'Neural Arb Bot v9', category: 'ALGORITHMS', group: 'ENGINES', price: 12500, tier: 'PERFORMANCE', desc: 'Cross-exchange arbitrage execution.' },
    { id: 'a3', name: 'Global Liquidity Feed', category: 'DATA', group: 'API INTEGRATIONS', price: 5000, tier: 'TUNED', desc: 'Real-time aggregated order book streams.' },
    { id: 'a4', name: 'Zero-Knowledge Auth', category: 'SECURITY', group: 'PROJECTS', price: 8000, tier: 'TUNED', desc: 'Privacy-preserving identity module.' },
    { id: 'a5', name: 'Dark Pool Connector', category: 'INFRASTRUCTURE', group: 'ENGINES', price: 15000, tier: 'PERFORMANCE', desc: 'Direct access to non-displayed liquidity.' },
    { id: 'a6', name: 'Sentient Market Maker', category: 'ALGORITHMS', group: 'ENGINES', price: 50000, tier: 'HYPER', desc: 'Self-learning liquidity provision AI.' },
    { id: 'a7', name: 'Social Sentiment API', category: 'DATA', group: 'API INTEGRATIONS', price: 2000, tier: 'STOCK', desc: 'Twitter/Reddit NLP sentiment analysis.' },
    { id: 'a8', name: 'Secure Enclave Host', category: 'SECURITY', group: 'PROJECTS', price: 10000, tier: 'PERFORMANCE', desc: 'Hardware-level key management hosting.' },
    { id: 'a9', name: 'Cross-Chain Bridge', category: 'INFRASTRUCTURE', group: 'ENGINES', price: 18500, tier: 'HYPER', desc: 'Trustless asset transfer protocol.' },
];

const GROUPS = ['ALL', 'ENGINES', 'PROJECTS', 'API INTEGRATIONS', 'MISC'];

export default function SanctumMarketplace() {
    const [selectedGroup, setSelectedGroup] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'ACTIVE', 'AVAILABLE'
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { cart, addToCart: contextAddToCart, removeFromCart, getCartTotal } = useCart();
    const { isOwned } = useOwnership();
    const navigate = useNavigate();

    const accentColor = '#00ff9d';

    // Derive categories dynamically from filtered assets
    const categories = useMemo(() => {
        const cats = new Set(['ALL']);
        MOCK_ASSETS.forEach(a => {
            if (selectedGroup === 'ALL' || a.group === selectedGroup) {
                cats.add(a.category);
            }
        });
        return Array.from(cats).sort();
    }, [selectedGroup]);

    // Reset category when group changes
    React.useEffect(() => {
        setSelectedCategory('ALL');
    }, [selectedGroup]);

    const filteredAssets = MOCK_ASSETS.filter(asset => {
        const owned = isOwned(asset.id);
        const statusMatch =
            statusFilter === 'ALL' ? true :
                statusFilter === 'ACTIVE' ? owned :
                    statusFilter === 'AVAILABLE' ? !owned : true;

        return (
            (selectedGroup === 'ALL' || asset.group === selectedGroup) &&
            (selectedCategory === 'ALL' || asset.category === selectedCategory) &&
            statusMatch &&
            (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const addToCart = (asset) => {
        contextAddToCart(asset);
        setIsCartOpen(true);
    };

    const currentItems = cart.items || [];
    const currentTotal = getCartTotal();

    return (
        <Layout>
            <div className="flex flex-col font-mono relative h-full">
                {/* Background Ambience */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,100,255,0.15),transparent_60%)]" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group text-white/60 hover:text-[#00ff9d] transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs font-bold tracking-widest uppercase">Sanctum</span>
                        </Link>
                        <h1 className="text-2xl font-bold tracking-[0.1em] text-white">ASSET EXCHANGE</h1>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded px-4 py-2 w-96">
                        <Search size={16} className="text-white/50" />
                        <input
                            type="text"
                            placeholder="SEARCH ASSETS..."
                            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-white/40 tracking-widest">AVAILABLE CREDITS</span>
                            <span className="text-lg font-bold text-[#00ff9d]">∞ 84,000.00</span>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-full transition-all group"
                        >
                            <ShoppingCart size={20} className="text-white group-hover:text-[#00ff9d] transition-colors" />
                            {currentItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#00ff9d] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {currentItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 relative z-10 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-white/10 flex flex-col bg-black/40 overflow-hidden hidden md:flex">

                        {/* Groups (Top Level) */}
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h3 className="text-[10px] font-bold text-white/40 mb-3 tracking-widest uppercase">Asset Status</h3>
                            <div className="flex bg-black/40 rounded p-1 mb-6 border border-white/5">
                                {['ALL', 'ACTIVE', 'AVAILABLE'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setStatusFilter(filter)}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded transition-all ${statusFilter === filter ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-[10px] font-bold text-white/40 mb-3 tracking-widest uppercase">Market Sectors</h3>
                            <div className="flex flex-col gap-1">
                                {GROUPS.map(group => (
                                    <button
                                        key={group}
                                        onClick={() => setSelectedGroup(group)}
                                        className={`text-left px-3 py-2 rounded text-xs font-bold tracking-wide transition-all flex justify-between items-center ${selectedGroup === group
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {group}
                                        {selectedGroup === group && <ChevronRight size={12} strokeWidth={3} style={{ color: accentColor }} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories (Sub Level) */}
                        <div className="p-4 flex-1 overflow-y-auto">
                            <h3 className="text-[10px] font-bold text-white/40 mb-3 tracking-widest uppercase">
                                {selectedGroup === 'ALL' ? 'All Categories' : `${selectedGroup} Categories`}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left px-3 py-2 rounded text-xs transition-all border-l ${selectedCategory === cat
                                            ? 'text-white border-white'
                                            : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white'
                                            }`}
                                        style={selectedCategory === cat ? { borderColor: accentColor, color: accentColor } : {}}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto p-4 border-t border-white/10 bg-[#0a0a0a]">
                            <h4 className="text-xs font-bold mb-1" style={{ color: accentColor }}>SYSTEM STATUS</h4>
                            <div className="text-[10px] text-white/30 italic leading-tight">
                                Sanctum marketplace operational.
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="flex-1 p-8 overflow-y-auto bg-black/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                            <AnimatePresence mode='wait'>
                                {filteredAssets.map((asset) => (
                                    <AssetCard
                                        key={asset.id}
                                        asset={asset}
                                        accentColor={accentColor}
                                        isOwned={isOwned(asset.id)}
                                        onAdd={() => !isOwned(asset.id) && addToCart(asset)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        {filteredAssets.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-white/40">
                                <p>NO ASSETS FOUND IN SELECTION</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Cart Drawer Overlay */}
                <AnimatePresence>
                    {isCartOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCartOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute right-0 top-0 bottom-0 w-96 bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
                            >
                                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <h2 className="text-lg font-bold tracking-widest text-[#00ff9d]">ACQUISITION CART</h2>
                                    <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                <div className="p-6 border-b border-white/10 bg-white/5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-white/50 text-xs tracking-widest uppercase">Total Required Credits</span>
                                        <span className="text-xl font-bold text-[#00ff9d]">{currentTotal.toLocaleString()} CR</span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/marketplace/checkout')}
                                        className="w-full bg-[#00ff9d] text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-[#00cc7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={currentItems.length === 0}
                                    >
                                        Initialize Transfer
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {currentItems.length === 0 ? (
                                        <div className="text-center text-white/30 py-10 italic">
                                            Cart is empty.
                                        </div>
                                    ) : (
                                        currentItems.map(item => (
                                            <div key={item.id} className="bg-white/5 border border-white/10 rounded p-3 flex justify-between items-start group">
                                                <div>
                                                    <div className="text-white font-bold text-sm">{item.name}</div>
                                                    <div className="text-[10px] text-white/40 mt-1 uppercase">{item.category}</div>
                                                    <div className="text-[#00ff9d] text-xs font-bold mt-2">{item.price.toLocaleString()} CR</div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-white/20 hover:text-red-400 transition-colors p-1"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
}

function AssetCard({ asset, accentColor, onAdd, isOwned }) {
    const tierColor = {
        'HYPER': { text: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.4)' }, // Amber-400
        'PERFORMANCE': { text: '#c084fc', bg: 'rgba(192, 132, 252, 0.1)', border: 'rgba(192, 132, 252, 0.4)' }, // Purple-400
        'TUNED': { text: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.4)' }, // Blue-400
        'STOCK': { text: '#9ca3af', bg: 'rgba(156, 163, 175, 0.1)', border: 'rgba(156, 163, 175, 0.4)' }, // Gray-400
    }[asset.tier] || { text: 'white', bg: 'white', border: 'white' };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            className="bg-[#111] border border-white/10 group cursor-pointer relative overflow-hidden flex flex-col h-64 rounded-md transition-colors duration-300 shadow-lg"
            style={{ '--hover-color': accentColor, opacity: isOwned ? 0.8 : 1 }}
            onClick={onAdd}
        >
            {/* Status Decoration if Owned */}
            {isOwned && (
                <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur border border-[#00ff9d]/30 px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} className="text-[#00ff9d]" />
                    <span className="text-[8px] font-bold text-[#00ff9d] tracking-widest">ACTIVE</span>
                </div>
            )}

            <div className="p-1 absolute top-0 right-0 z-20">
                <span
                    className="text-[9px] font-bold px-2 py-1 border rounded"
                    style={{ color: tierColor.text, backgroundColor: tierColor.bg, borderColor: tierColor.border }}
                >
                    {asset.tier}
                </span>
            </div>

            {/* Asset Image / Placeholder */}
            <div className="h-32 w-full bg-[#050505] border-b border-white/5 relative overflow-hidden group-hover:brightness-110 transition-all flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50 z-10"></div>
                {/* Icon Placeholder since we don't have images */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 group-hover:text-[#00ff9d] transition-colors duration-500 relative z-0 transform group-hover:scale-110">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h4
                        className="text-white font-bold text-sm mb-1 truncate transition-colors"
                        onMouseEnter={(e) => e.target.style.color = accentColor}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                    >
                        {asset.name}
                    </h4>
                    <p className="text-white/40 text-[10px] leading-tight line-clamp-2">{asset.desc}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-white/20">{asset.category}</span>
                    <span className="font-bold text-sm" style={{ color: accentColor }}>{asset.price.toLocaleString()} CR</span>
                </div>
            </div>

            {/* Hover overlay for 'ADD TO CART' */}
            {!isOwned && (
                <div
                    className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 flex items-center justify-center overflow-hidden group-hover:h-8"
                    style={{ backgroundColor: accentColor }}
                >
                    <span className="text-black font-bold text-xs tracking-widest flex items-center gap-1">
                        <ShoppingCart size={12} className="text-black" /> ADD TO CART
                    </span>
                </div>
            )}
            {/* Hover overlay for 'OWNED' */}
            {isOwned && (
                <div
                    className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 flex items-center justify-center overflow-hidden group-hover:h-8 bg-white/5 backdrop-blur-sm border-t border-white/10"
                >
                    <span className="text-white/50 font-bold text-[10px] tracking-widest flex items-center gap-1">
                        ASSET ACTIVE
                    </span>
                </div>
            )}
        </motion.div>
    );
}
