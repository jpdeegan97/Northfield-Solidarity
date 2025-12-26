import React, { useState } from 'react';

// Mock Data: Ledgers & Transactions
const LEDGERS = [
    { id: 'L-001', name: 'Treasury Main', type: 'ASSET', balance: '$4,250,500.00', change: '+2.4%' },
    { id: 'L-004', name: 'Ops Expenses', type: 'EXPENSE', balance: '$12,400.00', change: '+0.5%' },
    { id: 'L-009', name: 'Yield Farming', type: 'INVESTMENT', balance: '$850,000.00', change: '+5.2%' },
];

const TRANSACTIONS = [
    { id: 'TX-9901', to: 'Payroll_Settlement', amount: '-$42,000.00', asset: 'USDC', status: 'CLEARED', time: '10m ago' },
    { id: 'TX-9900', to: 'Treasury_Inbound', amount: '+$1,250.00', asset: 'ETH', status: 'CLEARED', time: '45m ago' },
    { id: 'TX-9899', to: 'Vendor_AWS', amount: '-$540.00', asset: 'USDC', status: 'PENDING', time: '1h ago' },
    { id: 'TX-9898', to: 'Rebalance_Auto', amount: 'N/A', asset: 'Internal', status: 'FLAGGED', time: '2h ago' },
];

export default function FLOView({ engine }) {
    const [selectedLedger, setSelectedLedger] = useState(LEDGERS[0]);

    // Theme: Yellow/Gold for Finance/Wealth/Ledger
    const THEME = {
        primary: 'text-yellow-400',
        bg: 'bg-yellow-500',
        border: 'border-yellow-500/50',
        hoverBorder: 'hover:border-yellow-500/50',
        glow: 'shadow-[0_0_15px_rgba(234,179,8,0.2)]',
        bgSoft: 'bg-yellow-900/20'
    };

    return (
        <div className="absolute inset-0 w-full h-full flex justify-between px-8 pt-20 pb-24 pointer-events-none">

            {/* LEFT: Ledger Accounts */}
            <div className="pointer-events-auto flex flex-col gap-4 w-80">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 flex flex-col max-h-[65vh]">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <h3 className={`text-xs font-bold ${THEME.primary} tracking-widest uppercase flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${THEME.bg} animate-pulse`} />
                            Active Ledgers
                        </h3>
                        <span className="text-[10px] text-white/40 font-mono">Total: $5.1M</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                        {LEDGERS.map((ledger) => {
                            const isSelected = selectedLedger.id === ledger.id;
                            const isPositive = ledger.change.startsWith('+');

                            return (
                                <div
                                    key={ledger.id}
                                    onClick={() => setSelectedLedger(ledger)}
                                    className={`
                                        p-3 rounded border cursor-pointer transition-all group
                                        ${isSelected
                                            ? `${THEME.bgSoft} ${THEME.border} ${THEME.glow}`
                                            : `bg-white/5 border-transparent ${THEME.hoverBorder}`}
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-mono text-white/40">{ledger.id}</span>
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold bg-white/5 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {ledger.change}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1 group-hover:text-yellow-200">{ledger.name}</h4>
                                    <div className="text-lg font-mono font-medium text-white/90">{ledger.balance}</div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[9px] text-white/40 uppercase bg-white/5 px-1 rounded">{ledger.type}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CENTER: Flow Visualization (Placeholder for Sankey Diagram) */}
            <div className="flex-1 flex flex-col items-center justify-center pointer-events-none opacity-40">
                {/* 3D Flow lines would appear here */}
            </div>

            {/* RIGHT: Transaction Log */}
            <div className="pointer-events-auto flex flex-col gap-4 w-96">

                {/* Top: Ledger Detail */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Ledger Context</h3>
                    <p className={`text-[10px] font-mono mb-4 ${THEME.primary}`}>{selectedLedger.id}</p>

                    <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white/40 uppercase block mb-1">Safe Addr</span>
                            <span className="text-white font-mono text-[10px] block truncate">0x44a...99b</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded border border-white/5">
                            <span className="text-[9px] text-white/40 uppercase block mb-1">Signers</span>
                            <span className="text-white font-mono text-xs">2 / 3</span>
                        </div>
                    </div>
                </div>

                {/* Bottom: Recent Transactions */}
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-5 flex-1 max-h-[50vh] flex flex-col">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Recent Flow</h3>
                    <div className="space-y-2 overflow-y-auto pr-1">
                        {TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="flex flex-col p-2.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-mono text-white/40">{tx.time}</span>
                                    <span className={`text-[9px] font-bold ${tx.status === 'CLEARED' ? 'text-emerald-400' : tx.status === 'PENDING' ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {tx.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-white/90 truncate max-w-[120px]">{tx.to}</span>
                                    <span className={`text-sm font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                                        {tx.amount}
                                    </span>
                                </div>
                                <div className="text-[9px] text-white/30 text-right mt-0.5">{tx.asset}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
