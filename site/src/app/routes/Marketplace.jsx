import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout.jsx';
import { NS_ENGINES, SL_ENGINES, NS_BMP } from '../../data/engineRegistry.js';
import { NS_PROJECTS } from '../../data/projectRegistry.js';
import { ShoppingCart, X, Trash2, CreditCard, ChevronRight } from 'lucide-react';

// --- Data Transformation ---
const transformToAsset = (item, type = 'ENGINE') => {
    let group = 'MISC';
    const cat = item.category?.toUpperCase() || 'SYSTEM';

    if (type === 'PROJECT' || cat === 'BMP' || cat === 'FOOD') {
        group = 'PROJECTS';
    } else if (cat === 'INTEGRATION' || item.code === 'CON' || item.code === 'MUX') {
        group = 'API INTEGRATIONS';
    } else if (type === 'ENGINE') {
        group = 'ENGINES';
    }

    return {
        id: item.code,
        name: item.name,
        category: cat,
        group: group,
        price: (Math.floor(Math.random() * 50) + 10) * 1000, // Mock price 10k-60k
        tier: ['STOCK', 'TUNED', 'PERFORMANCE', 'HYPER'][Math.floor(Math.random() * 4)], // Mock tier
        desc: item.oneLiner || item.description || 'No description available.'
    };
};

// Map Real Data
const NS_ASSETS = [
    ...NS_ENGINES.map(e => transformToAsset(e, 'ENGINE')),
    ...NS_BMP.map(e => transformToAsset(e, 'ENGINE')),
    ...NS_PROJECTS.map(p => transformToAsset(p, 'PROJECT'))
];

const SL_ASSETS = [
    ...SL_ENGINES.map(e => transformToAsset(e, 'ENGINE'))
];

// WSP Mock
const WSP_ASSETS = [
    { id: 'wsp1', name: 'High-Freq Arb Bot', category: 'ALGORITHMS', group: 'ENGINES', price: 50000, tier: 'HYPER', desc: 'Sub-ms latency exchange arbitrage.' },
    { id: 'wsp2', name: 'Macro Volatility Index', category: 'DATA', group: 'ENGINES', price: 10000, tier: 'TUNED', desc: 'Aggregated cross-asset fear gauge.' },
    { id: 'wsp3', name: 'Options Pricing Engine', category: 'ANALYTICS', group: 'ENGINES', price: 20000, tier: 'PERFORMANCE', desc: 'Black-Scholes-Merton on steroids.' },
];

const PROVIDERS = {
    NS: {
        id: 'NS',
        name: 'Northfield Solidarity',
        desc: 'Core infrastructure, engines, and venture projects.',
        color: '#3b82f6', // Blue
        subColor: 'rgba(59, 130, 246, 0.1)',
        assets: NS_ASSETS
    },
    SL: {
        id: 'SL',
        name: 'South Lawn',
        desc: 'Real estate assets, lease templates, and tenant data feeds.',
        color: '#22c55e', // Green
        subColor: 'rgba(34, 197, 94, 0.1)',
        assets: SL_ASSETS
    },
    WSP: {
        id: 'WSP',
        name: 'Wall Street Pro',
        desc: 'Financial models, arbitrage algorithms, and market signals.',
        color: '#d97706', // Mustard/Amber
        subColor: 'rgba(217, 119, 6, 0.1)',
        assets: WSP_ASSETS
    }
};

export default function Marketplace() {
    const [selectedProviderId, setSelectedProviderId] = useState('NS');
    const [selectedGroup, setSelectedGroup] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [credits, setCredits] = useState(84000);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    const provider = PROVIDERS[selectedProviderId];
    const accentColor = provider.color;

    // --- GROUP CONFIGURATION ---
    const GROUPS = ['ALL', 'ENGINES', 'PROJECTS', 'API INTEGRATIONS', 'MISC'];

    // Derive categories dynamically from current provider's assets and filtered by selectedGroup
    const categories = useMemo(() => {
        const cats = new Set(['ALL']);
        provider.assets.forEach(a => {
            if (selectedGroup === 'ALL' || a.group === selectedGroup) {
                cats.add(a.category);
            }
        });
        return Array.from(cats).sort();
    }, [provider, selectedGroup]);

    // Reset selection when provider changes
    React.useEffect(() => {
        setSelectedGroup('ALL');
        setSelectedCategory('ALL');
    }, [selectedProviderId]);

    // Reset category when group changes
    React.useEffect(() => {
        setSelectedCategory('ALL');
    }, [selectedGroup]);

    const filteredAssets = provider.assets.filter(asset =>
        (selectedGroup === 'ALL' || asset.group === selectedGroup) &&
        (selectedCategory === 'ALL' || asset.category === selectedCategory) &&
        (asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const addToCart = (asset) => {
        if (cart.some(item => item.id === asset.id)) {
            showNotification('error', 'ALREADY IN CART', `${asset.name} is selected.`);
            return;
        }
        setCart([...cart, asset]);
        showNotification('success', 'ADDED TO CART', asset.name);
        setIsCartOpen(true);
    };

    const removeFromCart = (assetId) => {
        setCart(cart.filter(item => item.id !== assetId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + parseInt(item.price, 10), 0);

    const handleCheckout = () => {
        if (credits >= cartTotal) {
            setCredits(prev => prev - cartTotal);
            setCart([]);
            setIsCartOpen(false);
            showNotification('success', 'ACQUISITION COMPLETE', `-${cartTotal.toLocaleString()} CR`);
        } else {
            showNotification('error', 'INSUFFICIENT CREDITS', 'Transaction Failed');
        }
    };

    const showNotification = (type, title, msg) => {
        setNotification({ type, title, msg });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <Layout>
            <div className="flex flex-col h-[calc(100vh-80px)] bg-[#050505] text-white font-mono relative overflow-hidden">
                {/* Background Ambience Dynamic */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-10 transition-colors duration-1000"
                    style={{ background: `radial-gradient(ellipse at bottom left, ${accentColor} 0%, transparent 60%)` }}
                />

                {/* Notification Toast */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, x: '-50%' }}
                            animate={{ opacity: 1, y: 20, x: '-50%' }}
                            exit={{ opacity: 0, y: -50, x: '-50%' }}
                            className="fixed top-24 left-1/2 z-[60] flex items-center gap-4 px-6 py-3 rounded border bg-[#111] shadow-2xl backdrop-blur-md"
                            style={{
                                borderColor: notification.type === 'success' ? '#00ff9d' : '#ef4444',
                                boxShadow: `0 0 30px ${notification.type === 'success' ? 'rgba(0,255,157,0.2)' : 'rgba(239,68,68,0.2)'}`
                            }}
                        >
                            <div className={`w-3 h-3 rounded-full ${notification.type === 'success' ? 'bg-[#00ff9d]' : 'bg-[#ef4444]'}`} />
                            <div>
                                <div className="font-bold text-sm tracking-widest">{notification.title}</div>
                                <div className="text-xs opacity-60 font-mono">{notification.msg}</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cart Drawer */}
                <AnimatePresence>
                    {isCartOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCartOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 right-0 w-96 bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
                            >
                                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111]">
                                    <h2 className="font-bold tracking-widest flex items-center gap-2">
                                        <ShoppingCart size={18} className="text-white/50" />
                                        ACQUISITION CART
                                    </h2>
                                    <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {cart.length === 0 ? (
                                        <div className="text-center text-white/30 py-12 flex flex-col items-center gap-4">
                                            <ShoppingCart size={48} className="opacity-20" />
                                            <p>NO ASSETS SELECTED</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="bg-white/5 border border-white/5 rounded p-3 flex gap-3 group relative">
                                                <div className="w-16 h-16 bg-black rounded border border-white/5 overflow-hidden flex-shrink-0">
                                                    <img src={`/assets/marketplace/${item.id}.svg`} alt="" className="w-full h-full object-cover opacity-80" />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                                    <div className="text-[10px] text-white/50 mt-1">{item.category}</div>
                                                    <div className="text-xs font-mono mt-1" style={{ color: accentColor }}>{item.price.toLocaleString()} CR</div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="absolute top-2 right-2 p-1 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="p-6 bg-[#111] border-t border-white/10 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-white/40">TOTAL COST</span>
                                        <span className={`text-xl font-bold font-mono ${credits < cartTotal ? 'text-red-500' : 'text-white'}`}>
                                            {cartTotal.toLocaleString()} CR
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-white/40 border-t border-white/5 pt-2">
                                        <span>AVAILABLE</span>
                                        <span className={credits < cartTotal ? 'text-red-500' : ''}>{credits.toLocaleString()} CR</span>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        disabled={cart.length === 0 || credits < cartTotal}
                                        className={`w-full py-3 px-4 rounded font-bold tracking-widest text-sm flex items-center justify-center gap-2 transition-all
                                            ${cart.length === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' :
                                                credits < cartTotal ? 'bg-red-500/20 text-red-500 border border-red-500/50 cursor-not-allowed' :
                                                    `bg-white text-black hover:bg-white/90`
                                            }
                                        `}
                                    >
                                        <CreditCard size={16} />
                                        {credits < cartTotal ? 'INSUFFICIENT FUNDS' : 'CONFIRM ACQUISITION'}
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Marketplace Toolbar (Sub-Header) */}
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-white/10 bg-black/60 backdrop-blur-sm">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold tracking-[0.1em] text-white flex items-center gap-3">
                            ASSET EXCHANGE
                            <span className="text-xs px-2 py-1 rounded border border-white/20 text-white/50">v2.1</span>
                        </h2>
                        <div className="flex gap-4 mt-2">
                            {Object.values(PROVIDERS).map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => { setSelectedProviderId(p.id); setSelectedGroup('ALL'); }}
                                    className={`text-xs font-bold px-3 py-1 rounded transition-all duration-300 border ${selectedProviderId === p.id
                                        ? 'text-white'
                                        : 'bg-transparent text-white/40 border-transparent hover:text-white hover:bg-white/5'
                                        }`}
                                    style={selectedProviderId === p.id ? { borderColor: p.color, backgroundColor: p.subColor, boxShadow: `0 0 10px ${p.subColor}` } : {}}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        {/* Search & Credits */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded px-4 py-2 w-64">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search assets..."
                                    className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-white/30"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col items-end hidden md:flex">
                                <span className="text-[10px] text-white/40 tracking-widest">CREDITS</span>
                                <span className="text-lg font-bold font-mono" style={{ color: accentColor }}>
                                    ∞ {credits.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Cart Trigger */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-white/5 rounded transition-colors group"
                        >
                            <ShoppingCart size={24} className="text-white/70 group-hover:text-white transition-colors" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-black transform translate-x-1/4 -translate-y-1/4">
                                    {cart.length}
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
                            <h4 className="text-xs font-bold mb-1" style={{ color: accentColor }}>STATUS</h4>
                            <div className="text-[10px] text-white/30 italic leading-tight">
                                {provider.desc}
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="flex-1 p-8 overflow-y-auto bg-black/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                            <AnimatePresence mode='wait'>
                                {filteredAssets.map((asset) => (
                                    <AssetCard key={asset.id} asset={asset} accentColor={accentColor} onAdd={() => addToCart(asset)} />
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
            </div>
        </Layout>
    );
}

function AssetCard({ asset, accentColor, onAdd }) {
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
            style={{ '--hover-color': accentColor }}
            onClick={onAdd}
        >
            <div className="p-1 absolute top-0 right-0 z-20">
                <span
                    className="text-[9px] font-bold px-2 py-1 border rounded"
                    style={{ color: tierColor.text, backgroundColor: tierColor.bg, borderColor: tierColor.border }}
                >
                    {asset.tier}
                </span>
            </div>

            {/* Asset Image */}
            <div className="h-32 w-full bg-[#050505] border-b border-white/5 relative overflow-hidden group-hover:brightness-110 transition-all">
                <img
                    src={`/assets/marketplace/${asset.id}.svg`}
                    alt={asset.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-50"></div>
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
            <div
                className="absolute inset-x-0 bottom-0 h-0 transition-all duration-300 flex items-center justify-center overflow-hidden group-hover:h-8"
                style={{ backgroundColor: accentColor }}
            >
                <span className="text-black font-bold text-xs tracking-widest flex items-center gap-1">
                    <ShoppingCart size={12} className="text-black" /> ADD TO CART
                </span>
            </div>
        </motion.div>
    );
}
