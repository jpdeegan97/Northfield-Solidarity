import React, { useState } from 'react';
import {
    Mail,
    Inbox,
    Send,
    Archive,
    Star,
    AlertCircle,
    Search,
    Plus,
    MoreVertical,
    Users,
    Settings,
    X,
    Check,
    Server,
    Shield,
    ChevronDown,
    ChevronRight,
    Wifi
} from 'lucide-react';


import Layout from '../../components/Layout';

const ACCOUNTS = [
    { id: '1', name: 'Fast Mail', email: 'me@sanctum.os', color: 'bg-purple-500', status: 'connected' },
    { id: '2', name: 'Work', email: 'dev@northfield.com', color: 'bg-blue-500', status: 'connected' },
];

const MOCK_SERVERS = [
    { id: 's1', type: 'IMAP', host: 'imap.sanctum.os', port: 993, status: 'stable', latency: '45ms' },
    { id: 's2', type: 'SMTP', host: 'smtp.sanctum.os', port: 587, status: 'stable', latency: '42ms' },
    { id: 's3', type: 'IMAP', host: 'imap.northfield.com', port: 993, status: 'stable', latency: '120ms' },
    { id: 's4', type: 'SMTP', host: 'smtp.northfield.com', port: 587, status: 'warning', latency: '480ms' },
];

const MOCK_EMAILS = [
    { id: 1, accountId: '1', from: "System", subject: "Protocol Update v2.4", preview: "The new governance modules have been deployed to GGP...", time: "10:42 AM", read: false, starred: true },
    { id: 2, accountId: '1', from: "Investments", subject: "Q4 Distribution Report", preview: "Attached is the preliminary distribution schedule for...", time: "Yesterday", read: true, starred: false },
    { id: 3, accountId: '1', from: "Security", subject: "New Login Detected", preview: "A new login was detected from IP 192.168.1.1...", time: "Yesterday", read: true, starred: false },
    { id: 4, accountId: '2', from: "Alex Sterling", subject: "RE: Northfield Acquisition", preview: "Let's proceed with the due diligence phase...", time: "Mon", read: true, starred: true },
    { id: 5, accountId: '2', from: "Ops Team", subject: "Maintenance Ticket #9482", preview: "Resolved: HVAC unit in Building 4 has been...", time: "Sun", read: true, starred: false },
    { id: 6, accountId: '2', from: "HR", subject: "Onboarding Docs", preview: "Please sign the attached documents...", time: "Last Week", read: true, starred: false },
];

export default function SanctumMail() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [filter, setFilter] = useState('inbox'); // 'inbox' | 'sent' | 'starred'
    const [activeAccountId, setActiveAccountId] = useState('1');
    const [showConfig, setShowConfig] = useState(false);
    const [isAccountsOpen, setIsAccountsOpen] = useState(true);
    const [isServersOpen, setIsServersOpen] = useState(false);
    const [integrationForm, setIntegrationForm] = useState({
        name: '',
        email: '',
        imapHost: '',
        imapPort: '993',
        smtpHost: '',
        smtpPort: '587',
        username: '',
        password: '',
        ssl: true
    });

    // Email State
    const [emails, setEmails] = useState(MOCK_EMAILS);
    const [emailMenuOpen, setEmailMenuOpen] = useState(false);

    // Compose State
    const [showCompose, setShowCompose] = useState(false);
    const [composeForm, setComposeForm] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const handleSendEmail = (e) => {
        e.preventDefault();
        alert(`Email sent to ${composeForm.to}! (Mock)`);
        setShowCompose(false);
        setComposeForm({ to: '', subject: '', body: '' });
    };

    const toggleStar = (e, emailId) => {
        e.stopPropagation();
        setEmails(prev => prev.map(email => {
            if (email.id === emailId) {
                const updated = { ...email, starred: !email.starred };
                if (selectedEmail?.id === emailId) {
                    setSelectedEmail(updated);
                }
                return updated;
            }
            return email;
        }));
    };

    const deleteEmail = () => {
        if (!selectedEmail) return;
        setEmails(prev => prev.filter(e => e.id !== selectedEmail.id));
        setSelectedEmail(null);
        setEmailMenuOpen(false);
    };

    const toggleRead = () => {
        if (!selectedEmail) return;
        setEmails(prev => prev.map(email => {
            if (email.id === selectedEmail.id) {
                const updated = { ...email, read: !email.read };
                setSelectedEmail(updated);
                return updated;
            }
            return email;
        }));
        setEmailMenuOpen(false);
    };

    const filteredEmails = emails.filter(e => {
        if (e.accountId !== activeAccountId) return false;
        if (filter === 'starred') return e.starred;
        return true;
    });

    // const activeAccount = ACCOUNTS.find(a => a.id === activeAccountId);

    const handleConfigSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would validate and test connections
        alert(`Configuration for ${integrationForm.email} saved! (Mock)`);
        setShowConfig(false);
    };

    return (
        <Layout>
            <div className="flex w-full h-[calc(100vh-theme(spacing.16))] lg:h-[100vh] bg-[#0a0a0a] text-white overflow-hidden border border-white/10 relative">

                {/* Configuration Modal */}
                {showConfig && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-[#0f172a] w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div>
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Server size={18} className="text-purple-400" />
                                        Configure Mail Server
                                    </h2>
                                    <p className="text-xs text-white/50">Setup IMAP/SMTP settings for your integration.</p>
                                </div>
                                <button onClick={() => setShowConfig(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <form className="space-y-6" onSubmit={handleConfigSubmit}>
                                    {/* Identity */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Identity</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-white/60">Display Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="e.g. Work Email"
                                                    value={integrationForm.name}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-white/60">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="user@example.com"
                                                    value={integrationForm.email}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Incoming Server */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Incoming Server (IMAP)</h3>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-8 space-y-1">
                                                <label className="text-xs text-white/60">Hostname</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="imap.example.com"
                                                    value={integrationForm.imapHost}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, imapHost: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-4 space-y-1">
                                                <label className="text-xs text-white/60">Port</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                                                    value={integrationForm.imapPort}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, imapPort: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Outgoing Server */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Outgoing Server (SMTP)</h3>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-8 space-y-1">
                                                <label className="text-xs text-white/60">Hostname</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="smtp.example.com"
                                                    value={integrationForm.smtpHost}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, smtpHost: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-4 space-y-1">
                                                <label className="text-xs text-white/60">Port</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                                                    value={integrationForm.smtpPort}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, smtpPort: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Auth */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Authentication</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs text-white/60">Username</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="Username"
                                                    value={integrationForm.username}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, username: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-white/60">Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                                                    placeholder="••••••••••••"
                                                    value={integrationForm.password}
                                                    onChange={e => setIntegrationForm({ ...integrationForm, password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <div className="w-4 h-4 rounded border border-white/30 bg-purple-500 flex items-center justify-center">
                                                <Check size={10} className="text-white" />
                                            </div>
                                            <span className="text-xs text-white/80">Use SSL/TLS for all connections</span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-between items-center">
                                <span className="text-[10px] text-white/30 flex items-center gap-2">
                                    <Shield size={10} /> Credentials are encrypted locally.
                                </span>
                                <div className="flex gap-3">
                                    <button onClick={() => setShowConfig(false)} className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
                                        CANCEL
                                    </button>
                                    <button onClick={handleConfigSubmit} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2">
                                        <Check size={14} /> SAVE CONFIGURATION
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Compose Modal */}
                {showCompose && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-[#0f172a] w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Plus size={16} className="text-purple-400" />
                                    New Message
                                </h2>
                                <button onClick={() => setShowCompose(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSendEmail} className="space-y-4">
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="To"
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-purple-500 outline-none placeholder-white/30"
                                            value={composeForm.to}
                                            onChange={e => setComposeForm({ ...composeForm, to: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-white focus:border-purple-500 outline-none placeholder-white/30 font-medium"
                                            value={composeForm.subject}
                                            onChange={e => setComposeForm({ ...composeForm, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <textarea
                                            placeholder="Write something..."
                                            className="w-full h-64 bg-transparent resize-none text-sm text-white/80 outline-none placeholder-white/20 custom-scrollbar"
                                            value={composeForm.body}
                                            onChange={e => setComposeForm({ ...composeForm, body: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-white/10">
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowCompose(false)}
                                                className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
                                            >
                                                DISCARD
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2"
                                            >
                                                <Send size={14} /> SEND MESSAGE
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mail Navigation */}
                <div className="w-64 bg-[#111] border-r border-white/5 flex flex-col">
                    {/* Account Switcher Header */}
                    <div className="border-b border-white/5">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none"
                            onClick={() => setIsAccountsOpen(!isAccountsOpen)}
                        >
                            <span className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                                {isAccountsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                Accounts
                            </span>
                            <Settings
                                size={14}
                                className="text-white/30 cursor-pointer hover:text-white"
                                onClick={(e) => { e.stopPropagation(); setShowConfig(true); }}
                            />
                        </div>

                        {isAccountsOpen && (
                            <div className="px-4 pb-4 space-y-2">
                                {ACCOUNTS.map(account => (
                                    <button
                                        key={account.id}
                                        onClick={() => { setActiveAccountId(account.id); setSelectedEmail(null); }}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${activeAccountId === account.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="relative">
                                            <div className={`w-8 h-8 rounded-full ${account.color} flex items-center justify-center text-xs font-bold shadow-lg shadow-black/50`}>
                                                {account.name[0]}
                                            </div>
                                            {/* Status Dot */}
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#111] flex items-center justify-center ${account.status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                                {account.status === 'connected' && <div className="w-1 h-1 bg-white rounded-full opacity-50" />}
                                            </div>
                                        </div>

                                        <div className="text-left min-w-0 flex-1">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm font-medium text-white truncate">{account.name}</div>
                                            </div>
                                            <div className="text-[10px] text-white/40 truncate flex items-center gap-1.5">
                                                {account.email}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowConfig(true)}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors border border-dashed border-white/10 mt-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                        <Plus size={14} />
                                    </div>
                                    <span className="text-xs font-medium">Add Account</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Servers Header */}
                    <div className="border-b border-white/5">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none"
                            onClick={() => setIsServersOpen(!isServersOpen)}
                        >
                            <span className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                                {isServersOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                Server Nodes
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-emerald-500 font-mono">4 ON</span>
                                <Wifi size={14} className="text-white/30" />
                            </div>
                        </div>

                        {isServersOpen && (
                            <div className="px-4 pb-4 space-y-2">
                                {MOCK_SERVERS.map(server => (
                                    <div
                                        key={server.id}
                                        className="w-full flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-white/5"
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/50">
                                                <Server size={14} />
                                            </div>
                                            {/* Status Dot */}
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#111] flex items-center justify-center ${server.status === 'stable' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                                {server.status === 'stable' && <div className="w-1 h-1 bg-white rounded-full opacity-50" />}
                                            </div>
                                        </div>

                                        <div className="text-left min-w-0 flex-1">
                                            <div className="flex justify-between items-center">
                                                <div className="text-[10px] font-bold text-white/70">{server.type}</div>
                                                <div className="text-[9px] font-mono text-white/30">{server.latency}</div>
                                            </div>
                                            <div className="text-[10px] text-white/40 truncate font-mono">
                                                {server.host}:{server.port}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <button
                            onClick={() => setShowCompose(true)}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-900/20"
                        >
                            <Plus size={18} /> Compose
                        </button>
                    </div>
                    <div className="px-2 space-y-1">
                        <MailNavItem icon={Inbox} label="Inbox" count={filteredEmails.filter(e => !e.read).length} isActive={filter === 'inbox'} onClick={() => setFilter('inbox')} />
                        <MailNavItem icon={Star} label="Starred" isActive={filter === 'starred'} onClick={() => setFilter('starred')} />
                        <MailNavItem icon={Send} label="Sent" isActive={filter === 'sent'} onClick={() => setFilter('sent')} />
                        <MailNavItem icon={Archive} label="Archive" isActive={filter === 'archive'} onClick={() => setFilter('archive')} />
                        <MailNavItem icon={AlertCircle} label="Spam" isActive={filter === 'spam'} onClick={() => setFilter('spam')} />
                    </div>
                </div>

                {/* Email List */}
                <div className={`w-80 bg-black/20 border-r border-white/5 flex flex-col ${selectedEmail ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                            <input
                                type="text"
                                placeholder="Search mail..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredEmails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedEmail?.id === email.id ? 'bg-white/5 border-l-2 border-l-purple-500' : 'border-l-2 border-l-transparent'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-sm font-semibold ${!email.read ? 'text-white' : 'text-white/60'}`}>{email.from}</span>
                                    <span className="text-[10px] text-white/30">{email.time}</span>
                                </div>
                                <div className={`text-xs mb-1 ${!email.read ? 'text-white font-medium' : 'text-white/50'}`}>{email.subject}</div>
                                <div className="text-[10px] text-white/30 truncate">{email.preview}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Detail */}
                <div className={`flex-1 bg-[#050505] flex flex-col ${!selectedEmail ? 'hidden md:flex' : 'flex'}`}>
                    {selectedEmail ? (
                        <>
                            <div className="p-6 border-b border-white/5 flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setSelectedEmail(null)} className="md:hidden text-white/50 hover:text-white">Back</button>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">{selectedEmail.subject}</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shadow-inner">
                                                {selectedEmail.from[0]}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{selectedEmail.from}</div>
                                                <div className="text-xs text-white/40">to me</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 relative">
                                    <button
                                        onClick={(e) => toggleStar(e, selectedEmail.id)}
                                        className={`p-2 hover:bg-white/10 rounded transition-colors ${selectedEmail.starred ? 'text-yellow-400 hover:text-yellow-300' : 'text-white/60 hover:text-white'}`}
                                    >
                                        <Star size={18} fill={selectedEmail.starred ? "currentColor" : "none"} />
                                    </button>
                                    <button
                                        onClick={() => setEmailMenuOpen(!emailMenuOpen)}
                                        className={`p-2 hover:bg-white/10 rounded transition-colors ${emailMenuOpen ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {/* Three Dots Menu */}
                                    {emailMenuOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                                            <button
                                                onClick={toggleRead}
                                                className="w-full text-left px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center gap-2"
                                            >
                                                <Mail size={14} /> Mark as {selectedEmail.read ? 'Unread' : 'Read'}
                                            </button>
                                            <button
                                                onClick={() => { alert('Archive Mock'); setEmailMenuOpen(false); }}
                                                className="w-full text-left px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center gap-2"
                                            >
                                                <Archive size={14} /> Archive
                                            </button>
                                            <div className="h-px bg-white/10 my-1"></div>
                                            <button
                                                onClick={deleteEmail}
                                                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                                            >
                                                <X size={14} /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 p-8 overflow-y-auto">
                                <div className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed">
                                    <p>Hi there,</p>
                                    <p>{selectedEmail.preview} We have completed the initial phase of deployment and are now moving into the secondary testing cycle.</p>
                                    <p>Please review the attached documentation and confirm if the projected metrics align with your expectations.</p>
                                    <p>Best,<br />{selectedEmail.from}</p>
                                </div>
                            </div>
                            <div className="p-4 border-t border-white/5">
                                <button className="px-6 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                                    Reply
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                            <Mail size={48} className="mb-4 opacity-50" />

                            <p>Select an email to read</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

function MailNavItem({ icon: Icon, label, count, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/10 text-white font-medium' : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{label}</span>
            </div>
            {count && (
                <span className="text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded-full">{count}</span>
            )}
        </button>
    );
}
