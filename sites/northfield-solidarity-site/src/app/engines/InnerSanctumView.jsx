import React, { useState } from 'react';
// ... imports
import {
    Mail,
    Inbox,
    Send,
    Archive,
    FileText,
    PenTool,
    Search,
    Plus,
    MoreVertical,
    Star,
    AlertCircle,
    User
} from 'lucide-react';
import { INNER_SANCTUM_EMAILS } from '@shared/data/mock/innerSanctumData';

// ... (imports remain)
export default function InnerSanctumView({ engine }) {
    const [activeTab, setActiveTab] = useState('mail'); // 'mail' | 'journal'

    return (
        <div className="flex h-full w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-16 flex flex-col items-center py-6 border-r border-white/10 bg-black/50">
                <div className="mb-8 p-2 bg-purple-500/20 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-purple-500 animate-pulse" />
                </div>

                <nav className="flex flex-col gap-4 w-full px-2">
                    <NavIcon
                        icon={Mail}
                        isActive={activeTab === 'mail'}
                        onClick={() => setActiveTab('mail')}
                        label="Mail"
                    />
                    <NavIcon
                        icon={FileText}
                        isActive={activeTab === 'journal'}
                        onClick={() => setActiveTab('journal')}
                        label="Journal"
                    />
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {activeTab === 'mail' ? <EmailClient /> : <JournalInterface />}
            </div>
        </div>
    );
}

// --- HELPER COMPONENTS ---

function NavIcon({ icon: Icon, isActive, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            title={label}
        >
            <Icon size={20} strokeWidth={1.5} />
        </button>
    );
}

function EmailClient() {
    const [selectedMailId, setSelectedMailId] = useState(null);
    const [currentFolder, setCurrentFolder] = useState('inbox'); // 'inbox' | 'drafts' | 'sent'
    const [isComposing, setIsComposing] = useState(false);

    // Filter emails based on current folder
    const folderEmails = INNER_SANCTUM_EMAILS.filter(m => {
        if (!m.folder) return currentFolder === 'inbox'; // Default to inbox if undefined
        return m.folder === currentFolder;
    });

    const selectedMail = INNER_SANCTUM_EMAILS.find(m => m.id === selectedMailId);

    const handleComposeClick = () => {
        setIsComposing(true);
        setSelectedMailId(null);
    };

    const handleBackToMail = () => {
        setIsComposing(false);
    };

    return (
        <div className="flex h-full w-full">
            {/* Mail Sidebar / List */}
            <div className="w-80 border-r border-white/10 flex flex-col bg-black/20">
                {/* Header / Folder Switcher */}
                <div className="p-4 border-b border-white/10 flex flex-col gap-4 bg-white/5">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentFolder('inbox')}
                                className={`p-2 rounded transition-colors ${currentFolder === 'inbox' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/50'}`}
                                title="Inbox"
                            >
                                <Inbox size={18} />
                            </button>
                            <button
                                onClick={() => setCurrentFolder('drafts')}
                                className={`p-2 rounded transition-colors ${currentFolder === 'drafts' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/50'}`}
                                title="Drafts"
                            >
                                <PenTool size={18} />
                            </button>
                            <button
                                onClick={() => setCurrentFolder('sent')}
                                className={`p-2 rounded transition-colors ${currentFolder === 'sent' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/50'}`}
                                title="Sent"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors">
                                <MoreVertical size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
                        />
                        <Search size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto">
                    {folderEmails.length === 0 ? (
                        <div className="p-8 text-center text-white/20 text-xs">No messages</div>
                    ) : (
                        folderEmails.map(mail => (
                            <div
                                key={mail.id}
                                onClick={() => {
                                    setSelectedMailId(mail.id);
                                    setIsComposing(false);
                                }}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedMailId === mail.id && !isComposing ? 'bg-white/5 border-l-2 border-purple-500' : 'border-l-2 border-transparent'}`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className={`text-xs font-bold ${selectedMailId === mail.id ? 'text-white' : 'text-white/70'}`}>
                                        {mail.sender}
                                    </span>
                                    <span className="text-[10px] text-white/30">{mail.time}</span>
                                </div>
                                <div className="text-sm text-white/90 truncate mb-1">
                                    {mail.subject}
                                </div>
                                <div className="text-xs text-white/40 truncate">
                                    {mail.snippet}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-3 border-t border-white/10">
                    <button
                        onClick={handleComposeClick}
                        className={`w-full py-2 border rounded text-xs font-bold flex items-center justify-center gap-2 transition-all ${isComposing
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-300'}`}
                    >
                        <Plus size={14} />
                        COMPOSE
                    </button>
                </div>
            </div>

            {/* Mail Content Area */}
            <div className="flex-1 bg-[#0c0c0c] flex flex-col">
                {isComposing ? (
                    <ComposeView onDiscard={handleBackToMail} />
                ) : selectedMail ? (
                    <MessageView mail={selectedMail} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                        <Inbox size={48} className="mb-4 opacity-50" />
                        <p className="text-sm">Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ComposeView({ onDiscard }) {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    return (
        <div className="flex flex-col h-full bg-[#0c0c0c]">
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                <span className="text-sm font-bold text-white">New Message</span>
                <button onClick={onDiscard} className="text-white/50 hover:text-white text-xs">
                    DISCARD
                </button>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="To: (e.g., @TheArchitect)"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-white/30 focus:outline-none focus:border-purple-500"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white font-bold placeholder-white/30 focus:outline-none focus:border-purple-500"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                    className="flex-1 bg-transparent resize-none focus:outline-none text-white/90 leading-relaxed mt-4"
                    placeholder="Write your secure message..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-white/5">
                <button
                    onClick={onDiscard} // Ideally this would simulate prompt "Save to drafts?"
                    className="px-4 py-2 rounded text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                    SAVE DRAFT
                </button>
                <button className="px-6 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold transition-colors flex items-center gap-2">
                    SEND <Send size={12} />
                </button>
            </div>
        </div>
    );
}

function MessageView({ mail }) {
    return (
        <>
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                <div className="flex items-center gap-4">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: mail.avatarColor }}
                    >
                        {mail.avatarInitials}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">{mail.sender}</div>
                        <div className="text-xs text-white/50">to me</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded text-white/50 hover:text-white">
                        <Star size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded text-white/50 hover:text-white">
                        <Archive size={18} />
                    </button>
                </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-xl font-bold text-white mb-6">{mail.subject}</h1>
                <div className="space-y-4 text-sm text-white/80 leading-relaxed max-w-2xl whitespace-pre-wrap font-sans">
                    {mail.body}
                </div>
            </div>
        </>
    );
}

// --- JOURNAL INTERFACE (Placeholder) ---

function JournalInterface() {
    const [entry, setEntry] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col bg-[#0c0c0c] p-8">
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <PenTool size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">New Entry</h2>
                        <p className="text-xs text-white/40">Encrypted Storage</p>
                    </div>
                </div>

                <textarea
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg p-6 text-white text-base focus:outline-none focus:border-purple-500/50 resize-none font-sans leading-relaxed"
                    placeholder="Log your thoughts..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />

                <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-white/30">
                        All entries are locally encrypted before storage.
                    </p>
                    <button
                        onClick={handleSave}
                        className={`px-6 py-2 rounded font-bold text-sm transition-all ${saved
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                            : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50'
                            }`}
                    >
                        {saved ? 'ENCRYPTED & SAVED' : 'SAVE LOG'}
                    </button>
                </div>
            </div>
        </div>
    );
}
