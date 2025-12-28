import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useOwnership } from '../../context/OwnershipContext.jsx';
import Layout from '../../components/Layout.jsx';
import { ShieldCheck, Cpu, Database, ChevronLeft, CreditCard } from 'lucide-react';

export default function SanctumCheckout() {
    const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
    const { addPurchasedAssets } = useOwnership();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // If empty
    if (cart.items.length === 0 && !isComplete) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                    <h1 className="text-2xl font-bold text-white mb-4 tracking-widest uppercase">Acquisition Queue Empty</h1>
                    <p className="text-white/40 mb-8 max-w-md">
                        Select assets from the marketplace to initialize transfer protocols.
                    </p>
                    <Link to="/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff9d] text-black font-bold rounded-full hover:scale-105 transition-transform">
                        <ChevronLeft size={16} /> RETURN TO MARKETPLACE
                    </Link>
                </div>
            </Layout>
        );
    }

    const handleTransfer = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            addPurchasedAssets(cart.items);
            setIsProcessing(false);
            setIsComplete(true);
            clearCart();
        }, 2000);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#050505] text-white font-mono p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/marketplace" className="text-white/40 hover:text-white transition-colors">
                                <ChevronLeft size={24} />
                            </Link>
                            <h1 className="text-3xl font-bold tracking-[0.2em] uppercase">Transfer Authorization</h1>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-white/40 tracking-widest uppercase">Secure Channel</div>
                            <div className="text-[#00ff9d] text-xs font-bold">TLS-1.3 // ENCRYPTED</div>
                        </div>
                    </div>

                    {isComplete ? (
                        <div className="flex flex-col items-center justify-center py-20 border border-white/10 bg-white/5 rounded-lg animate-fade-in">
                            <div className="w-20 h-20 bg-[#00ff9d]/20 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck size={40} className="text-[#00ff9d]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">TRANSFER COMPLETE</h2>
                            <p className="text-white/50 mb-8">Assets have been provisioned to your account.</p>
                            <Link to="/marketplace" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded tracking-widest transition-colors">
                                CONTINUE
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-8">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                        <Cpu size={18} className="text-[#00ff9d]" /> Authorization Details
                                    </h3>

                                    <form onSubmit={handleTransfer} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs text-white/40 font-bold uppercase">Operator ID</label>
                                                <input type="text" defaultValue="OP-4921" readOnly className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white/60 focus:outline-none focus:border-[#00ff9d]/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-white/40 font-bold uppercase">Auth Key</label>
                                                <input type="password" value="****************" readOnly className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white/60 focus:outline-none focus:border-[#00ff9d]/50" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs text-white/40 font-bold uppercase">Credit Allocation Source</label>
                                            <select className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#00ff9d]/50 appearance-none">
                                                <option>Main Liquidity Pool ($ 84,000.00)</option>
                                                <option>Reserve Fund ($ 12,000.00)</option>
                                            </select>
                                        </div>

                                        <div className="pt-6 border-t border-white/10">
                                            <button
                                                type="submit"
                                                disabled={isProcessing}
                                                className="w-full bg-[#00ff9d] text-black font-bold py-4 rounded hover:bg-[#00cc7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                            >
                                                {isProcessing ? (
                                                    <span className="animate-pulse">PROCESSING TRANSFER...</span>
                                                ) : (
                                                    <>
                                                        INITIALIZE TRANSFER <span className="bg-black/20 px-2 py-0.5 rounded text-xs ml-2">${getCartTotal().toLocaleString()}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 sticky top-24">
                                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                        <Database size={16} className="text-[#00ff9d]" /> Manifest
                                    </h3>

                                    <div className="space-y-4 mb-6">
                                        {cart.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-start text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                                <div>
                                                    <div className="text-white font-medium">{item.name}</div>
                                                    <div className="text-[10px] text-white/40 mt-1 uppercase">{item.category}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[#00ff9d] font-bold">${item.price.toLocaleString()}</div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-500 hover:text-red-400 mt-1 uppercase">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <span className="text-white/40 text-xs font-bold uppercase">Total Required</span>
                                        <span className="text-xl font-bold text-[#00ff9d]">${getCartTotal().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
