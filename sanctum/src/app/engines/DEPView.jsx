import React, { useState, useEffect } from 'react';
import { GitBranch, FolderGit, Activity, ShieldCheck, Database, Server, Terminal, Lock } from 'lucide-react';
import EngineHeader from '../../components/EngineHeader';

// MOCK DATA: Asset Inventory
const MOCK_ASSETS = [
    { id: 'ast-1', code: 'NS-TOK-001', name: 'Sanctum Membership Token', type: 'ERC-721', supply: '1,000', value: 'Ξ 0.00', status: 'Deployed' },
    { id: 'ast-2', code: 'NS-TOK-002', name: 'Research Access Pass', type: 'ERC-1155', supply: '500', value: 'Ξ 0.05', status: 'Active' },
    { id: 'ast-3', code: 'NS-LIQ-001', name: 'Initial Liquidity Pool', type: 'Uniswap V3', supply: '-', value: '$50,000', status: 'Pending' }
];

// MOCK DATA: Repository Branches
const MOCK_REPOS = [
    { id: 'repo-1', name: 'northfield-solidarity-web', branch: 'main', status: 'Healthy', lastCommit: '2h ago' },
    { id: 'repo-2', name: 'firmament-engine-core', branch: 'develop', status: 'Building...', lastCommit: '5m ago' },
    { id: 'repo-3', name: 'ns-smart-contracts', branch: 'audit/v1', status: 'Locked', lastCommit: '1d ago' }
];

export default function DEPView({ engine }) {
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [assets] = useState(MOCK_ASSETS);
    const [selectedRepo, setSelectedRepo] = useState(null);

    // Simulated "Liveness"
    const [blockHeight, setBlockHeight] = useState(19482012);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlockHeight(prev => prev + 1);
        }, 12000); // 12s block time
        return () => clearInterval(interval);
    }, []);

    const renderDashboard = () => (
        <div className="grid grid-cols-3 gap-4 h-full">
            {/* Asset Value Card */}
            <div className="col-span-1 bg-black/40 border border-purple-500/20 rounded-lg p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Total Asset Value</h3>
                    <div className="text-3xl font-mono text-white mt-2">$0.00 <span className="text-sm text-white/30">USD</span></div>
                </div>
                <div className="flex gap-2 text-[10px] items-center text-purple-300/60 mt-4">
                    <Activity size={12} />
                    <span>Real-time Oracle: Inactive</span>
                </div>
            </div>

            {/* Network Stats */}
            <div className="col-span-1 bg-black/40 border border-purple-500/20 rounded-lg p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Network Status</h3>
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex justify-between items-center text-xs text-white/70">
                            <span>Mainnet (ETH)</span>
                            <span className="text-emerald-400 font-mono flex items-center gap-1">● Synced</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/70">
                            <span>Testnet (Sepolia)</span>
                            <span className="text-emerald-400 font-mono flex items-center gap-1">● Synced</span>
                        </div>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-white/30 mt-2">Current Block: #{blockHeight.toLocaleString()}</div>
            </div>

            {/* Security Status */}
            <div className="col-span-1 bg-black/40 border border-purple-500/20 rounded-lg p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Security Posture</h3>
                    <div className="mt-2 text-xs text-white/60">
                        <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Audit Status</span>
                            <span className="text-purple-300">Self-Certified</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                            <span>Multisig</span>
                            <span className="text-purple-300">2/3 Signers</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <ShieldCheck size={16} className="text-purple-500" />
                </div>
            </div>

            {/* Main Asset Table */}
            <div className="col-span-3 bg-black/40 border border-purple-500/20 rounded-lg flex flex-col flex-1 overflow-hidden mt-2">
                <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Database size={12} className="text-purple-400" />
                        Asset Inventory
                    </h3>
                    <button className="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[10px] font-bold rounded uppercase transition-colors">
                        Deploy New Asset
                    </button>
                </div>
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-xs text-white/70">
                        <thead className="bg-black/40 text-white/40 font-mono text-[10px] uppercase sticky top-0">
                            <tr>
                                <th className="p-3 font-medium">Code</th>
                                <th className="p-3 font-medium">Name</th>
                                <th className="p-3 font-medium">Type</th>
                                <th className="p-3 font-medium text-right">Supply</th>
                                <th className="p-3 font-medium text-right">Est. Value</th>
                                <th className="p-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                            {assets.map(asset => (
                                <tr key={asset.id} className="hover:bg-purple-500/5 transition-colors group cursor-pointer">
                                    <td className="p-3 text-purple-300">{asset.code}</td>
                                    <td className="p-3 font-sans font-bold text-white">{asset.name}</td>
                                    <td className="p-3 opacity-60">{asset.type}</td>
                                    <td className="p-3 text-right">{asset.supply}</td>
                                    <td className="p-3 text-right">{asset.value}</td>
                                    <td className="p-3 text-right">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${asset.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/50'}`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderRepos = () => (
        <div className="h-full flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2">
                {MOCK_REPOS.map(repo => (
                    <div
                        key={repo.id}
                        onClick={() => setSelectedRepo(repo.id)}
                        className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer transition-all ${selectedRepo === repo.id
                            ? 'bg-purple-500/10 border-purple-500/50'
                            : 'bg-black/40 border-white/10 hover:border-purple-500/30'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-black rounded border border-white/10">
                                <FolderGit size={18} className="text-purple-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{repo.name}</div>
                                <div className="text-xs text-white/40 font-mono flex items-center gap-2 mt-1">
                                    <GitBranch size={10} />
                                    {repo.branch}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${repo.status === 'Healthy' ? 'text-emerald-400' :
                                repo.status === 'Locked' ? 'text-red-400' : 'text-yellow-400'
                                }`}>
                                {repo.status}
                            </div>
                            <div className="text-[10px] text-white/30 font-mono">Last commit: {repo.lastCommit}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Repo Detail View (Placeholder for interactivity) */}
            <div className="flex-1 bg-black/60 border border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                {selectedRepo ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <Terminal size={48} className="text-purple-500/20 mb-4 mx-auto" />
                        <h3 className="text-white font-bold mb-2">CI/CD Pipeline Visualization</h3>
                        <p className="text-white/40 text-xs max-w-sm mx-auto">
                            Pipeline details for <span className="text-purple-400 font-mono">{MOCK_REPOS.find(r => r.id === selectedRepo)?.name}</span> would render here, showing build stages, test coverage, and deployment gates.
                        </p>
                    </div>
                ) : (
                    <div className="text-white/20 flex flex-col items-center">
                        <FolderGit size={32} className="mb-2 opacity-50" />
                        <span className="text-xs font-mono uppercase">Select a repository to view details</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="relative w-full h-full bg-[#09090b] text-white overflow-hidden flex flex-col font-sans">
            {/* Header */}
            <EngineHeader
                icon={() => <span className="font-bold text-white text-xs">DEP</span>}
                title={engine?.name || 'DEPENDENCY ENGINE'}
                subtitle="Asset & Code Governance"
                color="purple"
                actions={
                    <div className="flex bg-black/40 p-1 rounded border border-white/10">
                        {['DASHBOARD', 'REPOSITORIES', 'SETTINGS'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all ${activeTab === tab
                                    ? 'bg-purple-500 text-white shadow-md'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                }
            />

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                {activeTab === 'DASHBOARD' && renderDashboard()}
                {activeTab === 'REPOSITORIES' && renderRepos()}
                {activeTab === 'SETTINGS' && (
                    <div className="h-full flex items-center justify-center text-white/30">
                        <div className="text-center">
                            <Lock size={32} className="mx-auto mb-2 opacity-50" />
                            <span className="text-xs uppercase tracking-widest">Configuration Locked by Admin</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
