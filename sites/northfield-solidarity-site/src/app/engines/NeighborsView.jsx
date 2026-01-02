import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, FileText, Send, Inbox,
    CheckCircle2, Clock, ArrowRight, Plus,
    LayoutDashboard, Settings, Search, MessageSquare,
    Briefcase, FileCheck, Star, Filter, MoreVertical,
    Download, Bell, Trash2, Archive, X, ChevronDown
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_ORGS = [
    { id: 'o1', name: 'Acme Corp', industry: 'Manufacturing', status: 'Open for Proposals', avatar: 'AC' },
    { id: 'o2', name: 'Globex Inc', industry: 'Logistics', status: 'Partner Network', avatar: 'GL' },
    { id: 'o3', name: 'Soylent Corp', industry: 'Food Tech', status: 'Restricted', avatar: 'SC' },
    { id: 'o4', name: 'Massive Dynamic', industry: 'R&D', status: 'Open for Proposals', avatar: 'MD' },
    { id: 'o5', name: 'Veidt Enterprises', industry: 'Conglomerate', status: 'Partner Network', avatar: 'VE' },
];

const MOCK_PROPOSALS = [
    { id: 'p1', title: 'Supply Chain Optimization', from: 'Globex Inc', to: 'Acme Corp', status: 'Pending Review', date: '2025-12-10' },
    { id: 'p2', title: 'Joint R&D Initiative', from: 'Massive Dynamic', to: 'Northfield Solidarity', status: 'Active', date: '2025-12-15' },
    { id: 'p3', title: 'Campaign Partnership', from: 'Veidt Enterprises', to: 'Northfield Solidarity', status: 'Draft', date: '2025-12-20' },
];

const MOCK_WORKSPACE_TASKS = [
    { id: 't1', title: 'Draft MOU', status: 'Done', assignee: 'Alice', priority: 'High' },
    { id: 't2', title: 'Review Technical Specs', status: 'In Progress', assignee: 'Bob', priority: 'Medium' },
    { id: 't3', title: 'Finalize Budget', status: 'Todo', assignee: 'Charlie', priority: 'Low' },
];

const MOCK_MESSAGES = [
    { id: 'm1', sender: 'Alice', text: 'Did you see the new proposal from Massive Dynamic?', time: '10:30 AM' },
    { id: 'm2', sender: 'Bob', text: 'Yes, reviewing it now. Looks promising.', time: '10:32 AM' },
];

// --- SUB-COMPONENTS ---

const OrgCard = ({ org, isFavorite, onToggleFavorite, onClick }) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group relative">
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(org.id); }}
                className={`p-1.5 rounded-full hover:bg-white/10 ${isFavorite ? 'text-yellow-400' : 'text-neutral-400 hover:text-white'}`}
            >
                <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white">
                <MoreVertical size={16} />
            </button>
        </div>
        <div className="flex items-center gap-3 mb-3" onClick={onClick}>
            <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
                {org.avatar}
            </div>
            <div>
                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{org.name}</h3>
                <div className="text-xs text-neutral-500">{org.industry}</div>
            </div>
        </div>
        <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${org.status.includes('Open') ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                org.status.includes('Restricted') ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                    'border-blue-500/30 text-blue-400 bg-blue-500/10'
                }`}>
                {org.status}
            </span>
            <button className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white">
                <Send size={14} />
            </button>
        </div>
    </div>
);

const ProposalRow = ({ proposal }) => (
    <div className="flex items-center justify-between p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer last:border-0">
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${proposal.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                proposal.status === 'Draft' ? 'bg-neutral-500/20 text-neutral-400' :
                    'bg-amber-500/20 text-amber-400'
                }`}>
                <FileText size={18} />
            </div>
            <div>
                <div className="font-medium text-white">{proposal.title}</div>
                <div className="text-xs text-neutral-500 flex items-center gap-2">
                    <span>{proposal.from}</span>
                    <ArrowRight size={10} />
                    <span>{proposal.to}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 mx-1" />
                    <span>{proposal.date}</span>
                </div>
            </div>
        </div>
        <div className="text-xs font-mono opacity-60">
            {proposal.status}
        </div>
    </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick, count, hasBadge }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-2.5 mb-1 rounded-lg text-sm font-medium transition-all ${active
            ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
            : 'text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} />
            <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {hasBadge && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            {count !== undefined && (
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-300">
                    {count}
                </span>
            )}
        </div>
    </button>
);

// --- MAIN COMPONENT ---

export default function NeighborsView() {
    // Top-level State
    const [activeTab, setActiveTab] = useState('directory'); // directory, proposals, workspace, messages
    const [showSettings, setShowSettings] = useState(false);
    const [showNewProposal, setShowNewProposal] = useState(false);
    const [showOrgDetail, setShowOrgDetail] = useState(null); // org object

    // Directory State
    const [searchQuery, setSearchQuery] = useState('');
    const [filterIndustry, setFilterIndustry] = useState('All');
    const [sortBy, setSortBy] = useState('Name'); // Name, Status
    const [favorites, setFavorites] = useState(new Set());

    // Proposal State
    const [proposalFilter, setProposalFilter] = useState('All');

    // Workspace/Task State
    const [tasks, setTasks] = useState(MOCK_WORKSPACE_TASKS);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [activeProject, setActiveProject] = useState('Joint R&D Initiative');
    const [activityFilter, setActivityFilter] = useState('All');

    // Messages State
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    // --- HANDLES ---

    // Directory
    const handleToggleFavorite = (id) => {
        const next = new Set(favorites);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setFavorites(next);
    };

    const filteredOrgs = useMemo(() => {
        let res = MOCK_ORGS.filter(o =>
            o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.industry.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filterIndustry !== 'All') res = res.filter(o => o.industry === filterIndustry);
        if (sortBy === 'Name') res.sort((a, b) => a.name.localeCompare(b.name));
        if (sortBy === 'Status') res.sort((a, b) => a.status.localeCompare(b.status));
        return res;
    }, [searchQuery, filterIndustry, sortBy]);

    // Proposals
    const filteredProposals = useMemo(() => {
        if (proposalFilter === 'All') return MOCK_PROPOSALS;
        if (proposalFilter === 'Unread') return MOCK_PROPOSALS.filter(p => p.status === 'Pending Review'); // mock logic for unread
        return MOCK_PROPOSALS.filter(p => p.status === proposalFilter); // Active, Draft
    }, [proposalFilter]);

    // Tasks
    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' } : t));
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask = {
            id: `t${Date.now()}`,
            title: newTaskTitle,
            status: 'Todo',
            assignee: 'Me',
            priority: 'Medium'
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };

    // Messages
    const sendMessage = () => {
        if (!messageInput.trim()) return;
        setMessages([...messages, { id: `m${Date.now()}`, sender: 'Me', text: messageInput, time: 'Now' }]);
        setMessageInput('');
    };

    // Export
    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredOrgs));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "directory_export.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="flex h-screen w-full bg-[#0a0a0a] text-neutral-200 font-sans overflow-hidden">

            {/* --- SIDEBAR --- */}
            <div className="w-64 border-r border-white/10 p-4 flex flex-col bg-[#111]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-lg">
                        <Building2 size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white leading-none">NEIGHBORS</h1>
                        <span className="text-[10px] text-neutral-500">Corporate Collaboration</span>
                    </div>
                </div>

                {/* Nav */}
                <div className="space-y-6 flex-1">
                    <div>
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 px-2">Network</div>
                        <SidebarItem icon={Search} label="Directory" active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} />
                        <SidebarItem icon={Star} label="Favorites" active={false} onClick={() => { setFilterIndustry('All'); setSearchQuery(''); /* quick filter link logic could go here */ }} count={favorites.size} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 px-2">In/Out</div>
                        <SidebarItem icon={Inbox} label="Inbox" active={activeTab === 'proposals'} onClick={() => setActiveTab('proposals')} count={3} hasBadge={true} />
                        <SidebarItem icon={Send} label="Sent" active={false} onClick={() => { }} />
                        <SidebarItem icon={FileText} label="Drafts" active={false} onClick={() => { }} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 px-2">Workspaces</div>
                        <SidebarItem icon={Briefcase} label="Active Projects" active={activeTab === 'workspace'} onClick={() => setActiveTab('workspace')} count={2} />
                        <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
                    </div>
                </div>

                {/* User Info */}
                <div className="pt-4 border-t border-white/10">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer w-full text-left"
                    >
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black text-xs">
                            NS
                        </div>
                        <div className="overflow-hidden flex-1">
                            <div className="text-sm font-bold text-white truncate">Northfield Sol.</div>
                            <div className="text-[10px] text-neutral-500">Business Profile</div>
                        </div>
                        <Settings size={14} className="text-neutral-500" />
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 overflow-hidden flex flex-col relative">

                {/* Topbar */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0f0f0f]/50 backdrop-blur-sm z-10">
                    <h2 className="text-lg font-bold text-white">
                        {activeTab === 'directory' ? 'Organization Directory' :
                            activeTab === 'proposals' ? 'Proposals & Requests' :
                                activeTab === 'messages' ? 'Direct Messages' : 'Workspace Dashboard'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                        <button
                            onClick={() => setShowNewProposal(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-medium transition-colors"
                        >
                            <Plus size={16} /> New Proposal
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    <AnimatePresence mode="wait">

                        {/* VIEW: DIRECTORY */}
                        {activeTab === 'directory' && (
                            <motion.div key="dir" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="max-w-6xl mx-auto">
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search organizations..."
                                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="relative group">
                                                <button className="h-full px-4 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
                                                    <Filter size={16} /> {filterIndustry}
                                                </button>
                                                {/* Simple Dropdown Mock */}
                                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl hidden group-hover:block z-20">
                                                    {['All', 'Manufacturing', 'Logistics', 'R&D'].map(i => (
                                                        <div key={i} onClick={() => setFilterIndustry(i)} className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm text-neutral-300">{i}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button onClick={() => setSortBy(sortBy === 'Name' ? 'Status' : 'Name')} className="h-full px-4 rounded-lg bg-[#1a1a1a] border border-white/10 flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
                                                {sortBy === 'Name' ? 'Sort: Name' : 'Sort: Status'}
                                            </button>
                                            <button onClick={handleExport} className="h-full px-3 rounded-lg bg-[#1a1a1a] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5" title="Export Data">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredOrgs.map(org => (
                                            <OrgCard
                                                key={org.id}
                                                org={org}
                                                isFavorite={favorites.has(org.id)}
                                                onToggleFavorite={handleToggleFavorite}
                                                onClick={() => setShowOrgDetail(org)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW: PROPOSALS */}
                        {activeTab === 'proposals' && (
                            <motion.div key="prop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="max-w-4xl mx-auto bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                    <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm font-medium text-neutral-400">
                                            {['All', 'Pending Review', 'Active', 'Draft'].map(filter => (
                                                <button
                                                    key={filter}
                                                    onClick={() => setProposalFilter(filter)}
                                                    className={`hover:text-white px-2 py-1 ${proposalFilter === filter ? 'text-white border-b-2 border-blue-500' : ''}`}
                                                >
                                                    {filter === 'Pending Review' ? 'Unread' : filter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        {filteredProposals.length === 0 ? (
                                            <div className="p-8 text-center text-neutral-500 italic">No proposals found.</div>
                                        ) : (
                                            filteredProposals.map(p => <ProposalRow key={p.id} proposal={p} />)
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW: WORKSPACE */}
                        {activeTab === 'workspace' && (
                            <motion.div key="work" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Main Workspace Feed */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Project Switcher & Status */}
                                        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 relative">
                                            <div className="absolute top-4 right-4 text-neutral-500 cursor-pointer hover:text-white">
                                                <ChevronDown size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{activeProject}</h3>
                                            <p className="text-neutral-400 text-sm mb-4">with Massive Dynamic</p>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                                                <div className="h-full bg-blue-500 w-2/3" />
                                            </div>
                                        </div>

                                        {/* Activity Feed */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Activity</h4>
                                                <select
                                                    value={activityFilter}
                                                    onChange={(e) => setActivityFilter(e.target.value)}
                                                    className="bg-transparent text-xs text-neutral-400 border border-white/10 rounded px-2 py-1"
                                                >
                                                    <option value="All">All Types</option>
                                                    <option value="Files">Files</option>
                                                    <option value="Comments">Comments</option>
                                                </select>
                                            </div>

                                            <div className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><FileCheck size={16} /></div>
                                                <div>
                                                    <div className="text-sm text-white"><span className="font-bold">Massive Dynamic</span> uploaded signed MOU.</div>
                                                    <div className="text-xs text-neutral-500 mt-1">2 hours ago</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0"><MessageSquare size={16} /></div>
                                                <div>
                                                    <div className="text-sm text-white"><span className="font-bold">Alice (NS)</span> commented on "Budget Draft v2"</div>
                                                    <div className="text-xs text-neutral-500 mt-1">Yesterday</div>
                                                    <div className="mt-2 p-2 bg-black/40 rounded text-sm text-neutral-300 italic border-l-2 border-white/20">"Looks good..."</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tasks */}
                                    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 h-full flex flex-col">
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-blue-500" /> Tasks
                                        </h4>
                                        <div className="space-y-2 flex-1 overflow-y-auto mb-4 custom-scrollbar">
                                            {tasks.map(task => (
                                                <div key={task.id} onClick={() => toggleTask(task.id)} className="p-3 bg-white/5 rounded border border-white/5 flex items-start gap-3 hover:border-white/20 cursor-pointer group">
                                                    <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${task.status === 'Done' ? 'bg-green-500 border-green-500' : 'border-neutral-500'}`}>
                                                        {task.status === 'Done' && <CheckCircle2 size={10} className="text-black" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={`text-sm ${task.status === 'Done' ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>{task.title}</div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                                            <span className="text-[10px] text-neutral-500">{task.assignee}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                                placeholder="Add new task..."
                                                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                                                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <button onClick={addTask} className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"><Plus size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* VIEW: MESSAGES (NEW) */}
                        {activeTab === 'messages' && (
                            <motion.div key="msgs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col">
                                <div className="max-w-4xl mx-auto w-full flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col">
                                    <div className="p-4 border-b border-white/10 bg-white/5 font-bold text-white flex justify-between items-center">
                                        <span>Team Chat: Joint R&D</span>
                                        <Users size={16} className="text-neutral-500" />
                                    </div>
                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#111]">
                                        {messages.map(m => (
                                            <div key={m.id} className={`flex flex-col ${m.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                                                <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${m.sender === 'Me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-neutral-200 rounded-bl-none'}`}>
                                                    {m.text}
                                                </div>
                                                <span className="text-[10px] text-neutral-600 mt-1">{m.sender} • {m.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                                        <input
                                            value={messageInput}
                                            onChange={e => setMessageInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                        />
                                        <button onClick={sendMessage} className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"><Send size={18} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>

            {/* --- MODALS --- */}
            <AnimatePresence>
                {/* Org Detail Modal */}
                {showOrgDetail && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowOrgDetail(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-lg overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 bg-gradient-to-r from-blue-900/40 to-black">
                                <h2 className="text-2xl font-bold text-white mb-1">{showOrgDetail.name}</h2>
                                <p className="text-blue-400 text-sm">{showOrgDetail.industry}</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="text-sm text-neutral-300">
                                    <p className="mb-2"><strong className="text-white">Status:</strong> {showOrgDetail.status}</p>
                                    <p>Contact information and detailed capabilities would appear here.</p>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={() => setShowOrgDetail(null)} className="px-4 py-2 rounded bg-white/5 hover:bg-white/10 text-neutral-300">Close</button>
                                    <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white">Start Proposal</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* New Proposal Modal */}
                {showNewProposal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-md p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">New Proposal</h3>
                            <input className="w-full bg-black/30 border border-white/10 rounded mb-3 p-3 text-white" placeholder="Title" />
                            <select className="w-full bg-black/30 border border-white/10 rounded mb-3 p-3 text-white">
                                <option>Select Recipient...</option>
                                <option>Acme Corp</option>
                                <option>Globex Inc</option>
                            </select>
                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setShowNewProposal(false)} className="px-4 py-2 text-neutral-400 hover:text-white">Cancel</button>
                                <button onClick={() => setShowNewProposal(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Create Draft</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Settings Modal */}
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-sm p-6 relative">
                            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-neutral-500 hover:text-white"><X size={20} /></button>
                            <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between text-sm text-neutral-300 bg-white/5 p-3 rounded cursor-pointer">
                                    <span>Notifications</span>
                                    <input type="checkbox" defaultChecked className="accent-blue-500" />
                                </label>
                                <label className="flex items-center justify-between text-sm text-neutral-300 bg-white/5 p-3 rounded cursor-pointer">
                                    <span>Dark Mode</span>
                                    <input type="checkbox" defaultChecked disabled className="accent-blue-500" />
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
