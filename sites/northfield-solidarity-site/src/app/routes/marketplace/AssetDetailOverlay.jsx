import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Shield, Zap, Box, Activity, Plus } from 'lucide-react';

export default function AssetDetailOverlay({ asset, onClose, onAddToCart, accentColor, scaleConfig }) {
    const [selectedOptions, setSelectedOptions] = useState(['core']);

    // Base price scaled
    const basePrice = Math.floor(asset.basePrice * scaleConfig.val);

    // Generate Options
    const options = useMemo(() => {
        return [
            {
                id: 'core',
                title: 'Core System',
                desc: 'Source code, documentation, and standard license.',
                price: 0, // Included in base
                icon: Box,
                mandatory: true
            },
            {
                id: 'firmament',
                title: 'Firmament Module',
                desc: 'Pre-configured 3D visualization node and UI controls.',
                price: Math.floor(basePrice * 0.25),
                icon: Activity,
                mandatory: false
            },
            {
                id: 'api',
                title: 'API Gateway',
                desc: 'Headless access (REST/GraphQL) with 50k req/mo.',
                price: Math.floor(basePrice * 0.15),
                icon: Zap,
                mandatory: false
            },
            {
                id: 'sla',
                title: 'Enterprise SLA',
                desc: '99.9% Uptime guarantee & 24/7 priority support.',
                price: Math.floor(basePrice * 0.40),
                icon: Shield,
                mandatory: false
            }
        ];
    }, [basePrice]);

    const toggleOption = (id) => {
        if (id === 'core') return;
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(o => o !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const totalPrice = useMemo(() => {
        return options.reduce((sum, opt) => {
            if (selectedOptions.includes(opt.id)) {
                return sum + opt.price;
            }
            return sum;
        }, basePrice);
    }, [options, selectedOptions, basePrice]);

    const handleAdd = () => {
        // Construct the cart item with options
        const finalItem = {
            ...asset,
            selectedOptions: options.filter(o => selectedOptions.includes(o.id)),
            finalPrice: totalPrice,
            // Override basePrice for cart calculation logic in parent or handle it there?
            // Parent uses: cartTotal = cart.reduce((sum, item) => sum + getFinalPrice(item.basePrice), 0);
            // We need to match parent expectation OR change parent logic.
            // EASIEST: Update parent to look for 'finalPrice' override.
        };
        onAddToCart(finalItem);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#111] border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                style={{ boxShadow: `0 0 50px ${accentColor}20` }}
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span
                                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                                style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
                            >
                                {asset.category}
                            </span>
                            <span className="text-white/40 text-xs font-mono">{asset.tier} TIER</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-wide">{asset.name.toUpperCase()}</h2>
                        <p className="text-white/60 text-sm mt-1 max-w-md">{asset.desc}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">

                    <div>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Configure Deployment</h3>
                        <div className="space-y-3">
                            {options.map((opt) => {
                                const isSelected = selectedOptions.includes(opt.id);
                                const isMandatory = opt.mandatory;

                                return (
                                    <div
                                        key={opt.id}
                                        onClick={() => !isMandatory && toggleOption(opt.id)}
                                        className={`
                                            group flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer
                                            ${isSelected
                                                ? 'bg-white/10 border-white/30'
                                                : 'bg-black/40 border-white/5 hover:bg-white/5 hover:border-white/10'}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>
                                                <opt.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-white/60'}`}>
                                                        {opt.title}
                                                    </h4>
                                                    {isMandatory && <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/40 uppercase">Required</span>}
                                                </div>
                                                <p className="text-xs text-white/40 mt-0.5">{opt.desc}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className={`text-sm font-mono ${isSelected ? 'text-white' : 'text-white/30'}`}>
                                                {opt.price === 0 ? 'INCLUDED' : `+$${opt.price.toLocaleString()}`}
                                            </div>
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-green-500 border-green-500 text-black' : 'border-white/20'}`}>
                                                {isSelected && <Check size={14} strokeWidth={4} />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[#151515] flex items-center justify-between">
                    <div>
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Total Configuration</div>
                        <div className="text-3xl font-black font-mono text-white tracking-tighter">
                            ${totalPrice.toLocaleString()} <span className="text-lg text-white/30 font-normal">USD</span>
                        </div>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="px-8 py-4 bg-white text-black font-bold tracking-widest uppercase rounded hover:bg-white/90 transition-transform active:scale-95 flex items-center gap-2"
                    >
                        <span>Add To Cart</span>
                        <Plus size={18} />
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
