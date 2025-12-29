import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { useJournal } from '../../context/JournalContext';
import { Lock, Unlock, Save, FileText, AlertTriangle, Shield, Check, Plus, Trash2, Clock, ChevronRight, LayoutList, Heading1, Heading2, Heading3, List } from 'lucide-react';

export default function SanctumJournal() {
    const { isLocked, hasVault, status, journalData, createVault, unlockVault, recoverVault, saveJournal, lockVault } = useJournal();
    const [password, setPassword] = useState('');

    // Multi-page State
    const [pages, setPages] = useState([]);
    const [activePageId, setActivePageId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTocOpen, setIsTocOpen] = useState(false);
    const textareaRef = useRef(null);

    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    // New State for Recovery Features
    const [recoveryCode, setRecoveryCode] = useState(null);
    const [isRecovering, setIsRecovering] = useState(false);
    const [recoveryInput, setRecoveryInput] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const hasLoadedRef = useRef(false);

    // Sync content when specific journalData loads
    useEffect(() => {
        if (!isLocked && !hasLoadedRef.current) {
            try {
                // Attempt to parse existing data as JSON (New Format)
                const parsed = JSON.parse(journalData);
                if (parsed.pages && Array.isArray(parsed.pages)) {
                    setPages(parsed.pages);
                    setActivePageId(parsed.activePageId || parsed.pages[0]?.id);
                } else {
                    throw new Error("Invalid structure");
                }
            } catch (e) {
                // Fallback: Treat as Legacy String Data (Old Format)
                // If it's just a string or empty, migrate it to a first page
                const initialContent = journalData || '';
                const legacyPage = {
                    id: Date.now().toString(),
                    title: 'General Log',
                    content: initialContent,
                    timestamp: new Date().toISOString()
                };
                setPages([legacyPage]);
                setActivePageId(legacyPage.id);
            }
            hasLoadedRef.current = true;
        } else if (isLocked) {
            hasLoadedRef.current = false;
            setPages([]);
            setActivePageId(null);
        }
    }, [journalData, isLocked]);

    const activePage = pages.find(p => p.id === activePageId) || pages[0];

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!password) return;
        const code = await createVault(password);
        if (code) {
            setRecoveryCode(code);
            setPassword('');
        }
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        if (!password) return;
        await unlockVault(password);
        setPassword('');
    };

    const handleRecovery = async (e) => {
        e.preventDefault();
        if (!recoveryInput || !newPassword) return;
        const success = await recoverVault(recoveryInput, newPassword);
        if (success) {
            setIsRecovering(false);
            setRecoveryInput('');
            setNewPassword('');
        }
    };

    const closeRecoveryModal = () => {
        setRecoveryCode(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Serialize the entire pages structure
        const dataToSave = JSON.stringify({
            pages: pages,
            activePageId: activePageId
        });
        await saveJournal(dataToSave);
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 800);
    };

    // --- PAGE OPERATIONS ---
    const createNewPage = () => {
        const newPage = {
            id: Date.now().toString(),
            title: `Entry ${new Date().toLocaleDateString()}`,
            content: '',
            timestamp: new Date().toISOString()
        };
        const newPages = [newPage, ...pages];
        setPages(newPages);
        setActivePageId(newPage.id);
        // Auto-save on creation? Maybe wait for user to hit save.
    };

    const updateActivePageContent = (newContent) => {
        setPages(prev => prev.map(p =>
            p.id === activePageId ? { ...p, content: newContent, timestamp: new Date().toISOString() } : p
        ));
    };

    const updateActivePageTitle = (newTitle) => {
        setPages(prev => prev.map(p =>
            p.id === activePageId ? { ...p, title: newTitle } : p
        ));
    };

    const deletePage = (id, e) => {
        e.stopPropagation();
        if (window.confirm("Permanently delete this entry?")) {
            const newPages = pages.filter(p => p.id !== id);
            setPages(newPages);
            if (activePageId === id) {
                setActivePageId(newPages[0]?.id || null);
            }
        }
    };

    // --- FORMATTING & TOC ---
    const insertHeader = (level) => {
        if (!textareaRef.current || !activePage) return;

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const content = activePage.content;

        const prefix = '\n' + '#'.repeat(level) + ' ';
        const newContent = content.substring(0, start) + prefix + content.substring(end);

        updateActivePageContent(newContent);

        // Restore focus after React render cycle
        setTimeout(() => {
            if (textareaRef.current) {
                const newCursorPos = start + prefix.length;
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const getToc = () => {
        if (!activePage?.content) return [];
        const lines = activePage.content.split('\n');
        const headers = [];
        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,3})\s+(.*)/);
            if (match) {
                headers.push({ level: match[1].length, text: match[2], lineIndex: index });
            }
        });
        return headers;
    };

    const scrollToSection = (lineIndex) => {
        if (!textareaRef.current || !activePage) return;

        const lines = activePage.content.split('\n');
        let charIndex = 0;
        for (let i = 0; i < lineIndex; i++) {
            charIndex += lines[i].length + 1; // +1 for newline
        }

        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(charIndex, charIndex);
        textareaRef.current.blur();
        textareaRef.current.focus();
    };

    if (isLocked) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[80vh] font-mono text-white p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#050505] z-0" />
                    <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.1),transparent_70%)]" />

                    {/* RECOVERY CODE DISPLAY MODAL (On Creation) */}
                    {recoveryCode && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
                            <div className="bg-[#111] border border-red-500/30 p-8 rounded-lg max-w-lg w-full text-center shadow-2xl relative">
                                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4 animate-pulse" />
                                <h2 className="text-2xl font-bold text-white mb-2 tracking-widest uppercase text-red-500">Security Alert</h2>
                                <p className="text-white/60 text-sm mb-6">
                                    Your vault has been initialized. This is your <span className="text-white font-bold">Master Recovery Code</span>.
                                    <br /><br />
                                    It is the ONLY way to restore access if you lose your password.
                                    We cannot recover it for you.
                                </p>
                                <div className="bg-black border border-white/20 p-4 rounded mb-8">
                                    <code className="text-xl text-[#00ff9d] font-bold tracking-wider select-all">
                                        {recoveryCode}
                                    </code>
                                </div>
                                <button
                                    onClick={closeRecoveryModal}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded uppercase tracking-widest transition-colors"
                                >
                                    I Have Saved This Code
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-xl shadow-2xl">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group animate-pulse-slow">
                                <Lock size={32} className="text-white/50 group-hover:text-[#00ff9d] transition-colors" />
                            </div>
                        </div>

                        {/* MODE: RECOVERY */}
                        {isRecovering ? (
                            <>
                                <h2 className="text-xl font-bold text-center mb-2 tracking-[0.2em] uppercase text-red-400">
                                    Emergency Recovery
                                </h2>
                                <p className="text-center text-xs text-white/40 mb-8 uppercase tracking-widest">
                                    Enter recovery code to reset access.
                                </p>
                                <form onSubmit={handleRecovery} className="space-y-4">
                                    <input
                                        type="text"
                                        value={recoveryInput}
                                        onChange={(e) => setRecoveryInput(e.target.value)}
                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                        className="w-full bg-black/50 border border-white/20 text-center text-white py-3 px-6 rounded focus:outline-none focus:border-red-500 tracking-widest"
                                        autoFocus
                                    />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="NEW PASSWORD"
                                        className="w-full bg-black/50 border border-white/20 text-center text-white py-3 px-6 rounded focus:outline-none focus:border-[#00ff9d] tracking-widest"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-red-500/20 border border-red-500/50 text-red-500 font-bold py-3 rounded uppercase tracking-[0.2em] hover:bg-red-500/30 transition-colors"
                                    >
                                        RESTORE ACCESS
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsRecovering(false)}
                                        className="w-full text-xs text-white/30 hover:text-white uppercase tracking-widest mt-4"
                                    >
                                        Cancel Recovery
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* MODE: UNLOCK / CREATE */
                            <>
                                <h2 className="text-2xl font-bold text-center mb-2 tracking-[0.2em] uppercase">
                                    {hasVault ? "Neural Archive Locked" : "Initialize Secure Vault"}
                                </h2>
                                <p className="text-center text-xs text-white/40 mb-8 uppercase tracking-widest">
                                    {hasVault ? "Enter decryption key to access." : "Set a master key. Irrecoverable if lost."}
                                </p>

                                <form onSubmit={hasVault ? handleUnlock : handleCreate} className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={hasVault ? "ENTER ACCESS KEY" : "CREATE NEW ACCESS KEY"}
                                            className="w-full bg-black/50 border border-white/20 text-center text-white py-4 px-6 rounded focus:outline-none focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] tracking-widest transition-all placeholder-white/20"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!password || status === 'DECRYPTING' || status === 'ENCRYPTING'}
                                        className="w-full bg-[#00ff9d] text-black font-bold py-4 rounded uppercase tracking-[0.2em] hover:bg-[#00cc7d] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed text-sm"
                                    >
                                        {status === 'DECRYPTING' ? 'DECRYPTING...' :
                                            status === 'ENCRYPTING' ? 'ENCRYPTING...' :
                                                hasVault ? 'ACCESS ARCHIVE' : 'INITIALIZE PROTOCOL'}
                                    </button>

                                    {status === 'ERROR' && (
                                        <div className="text-red-500 text-xs text-center font-bold tracking-widest flex items-center justify-center gap-2 animate-shake">
                                            <AlertTriangle size={12} /> INVALID KEY OR DATA CORRUPTION
                                        </div>
                                    )}
                                </form>

                                {hasVault && (
                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={() => setIsRecovering(true)}
                                            className="text-[10px] text-white/20 hover:text-white/50 uppercase tracking-widest underline decoration-white/10 hover:decoration-white/30 transition-all"
                                        >
                                            Lost Key? Recover Vault
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>


                    <div className="mt-12 text-center opacity-30 text-[10px] uppercase tracking-[0.3em]">
                        AES-256-GCM // PBKDF2-SHA256 // DYNAMIC IV ROTATION
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex w-full h-screen bg-[#050505] text-white font-mono overflow-hidden">

                {/* --- LEFT SIDEBAR (HISTORY / PAGES) --- */}
                <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} flex-shrink-0 border-r border-white/10 bg-black/40 backdrop-blur transition-all duration-300 overflow-hidden flex flex-col`}>
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-bold text-white/60 tracking-widest uppercase flex items-center gap-2">
                            <LayoutList size={14} /> JOURNAL HISTORY
                        </span>
                        <button onClick={createNewPage} className="p-1 hover:bg-white/10 rounded text-[#00ff9d]">
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {pages.length === 0 && (
                            <div className="text-center p-8 text-white/20 text-xs italic">
                                No entries found.
                            </div>
                        )}
                        {pages.map((page) => (
                            <div
                                key={page.id}
                                onClick={() => setActivePageId(page.id)}
                                className={`group flex items-center justify-between p-3 rounded cursor-pointer border transition-all ${activePageId === page.id
                                    ? 'bg-[#00ff9d]/10 border-[#00ff9d]/30 text-white'
                                    : 'bg-transparent border-transparent hover:bg-white/5 text-white/60 hover:text-white'
                                    }`}
                            >
                                <div className="flex flex-col truncate min-w-0">
                                    <span className="text-xs font-bold truncate pr-2">{page.title || 'Untitled'}</span>
                                    <span className="text-[10px] text-white/30 flex items-center gap-1">
                                        {new Date(page.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => deletePage(page.id, e)}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-white/20 hover:text-red-500 rounded transition-all"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-20">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="mr-2 text-white/40 hover:text-white transition-colors"
                            >
                                <ChevronRight size={20} className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            <FileText size={20} className="text-[#00ff9d]" />
                            {activePage && (
                                <input
                                    type="text"
                                    value={activePage.title}
                                    onChange={(e) => updateActivePageTitle(e.target.value)}
                                    className="bg-transparent text-xl font-bold tracking-[0.2em] uppercase text-white/90 focus:outline-none focus:border-b border-[#00ff9d]/50 w-64 sm:w-96"
                                    placeholder="ENTRY TITLE"
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Status Indicators */}
                            <div className="flex flex-col items-end mr-4 hidden sm:flex">
                                <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                                    <Shield size={10} /> Rotational Cryptography Active
                                </div>
                                {lastSaved && (
                                    <div className="text-[10px] text-white/30">
                                        SAVED: {lastSaved.toLocaleTimeString()}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={isSaving || !activePage}
                                className={`flex items-center gap-2 px-6 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all ${isSaving
                                    ? 'bg-white/10 text-white cursor-wait'
                                    : 'bg-[#00ff9d] text-black hover:bg-[#00cc7d]'
                                    }`}
                            >
                                {isSaving ? (
                                    <>ROTATING KEYS...</>
                                ) : (
                                    <><Save size={14} /> SAVE & ENCRYPT</>
                                )}
                            </button>

                            <button
                                onClick={lockVault}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded text-white/60 hover:text-white transition-colors"
                                title="Lock Vault"
                            >
                                <Lock size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 flex flex-col relative overflow-hidden">

                        {/* Formatting Toolbar */}
                        {activePage && (
                            <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-black/40 backdrop-blur z-10">
                                <button
                                    onClick={() => insertHeader(1)}
                                    className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                                    title="Heading 1"
                                >
                                    <Heading1 size={16} />
                                </button>
                                <button
                                    onClick={() => insertHeader(2)}
                                    className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                                    title="Heading 2"
                                >
                                    <Heading2 size={16} />
                                </button>
                                <button
                                    onClick={() => insertHeader(3)}
                                    className="p-1.5 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                                    title="Heading 3"
                                >
                                    <Heading3 size={16} />
                                </button>

                                <div className="w-px h-4 bg-white/10 mx-2" />

                                <button
                                    onClick={() => setIsTocOpen(!isTocOpen)}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${isTocOpen ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <List size={16} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Contents</span>
                                </button>
                            </div>
                        )}

                        <div className="flex-1 flex relative overflow-hidden">
                            {activePage ? (
                                <textarea
                                    ref={textareaRef}
                                    value={activePage.content}
                                    onChange={(e) => updateActivePageContent(e.target.value)}
                                    className="flex-1 w-full h-full bg-[#0a0a0a] text-white/80 p-8 resize-none focus:outline-none focus:bg-[#0c0c0c] transition-colors leading-relaxed placeholder-white/10 text-sm font-mono custom-scrollbar"
                                    placeholder="ENTER SECURE DATA..."
                                    spellCheck="false"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                                    <FileText size={48} className="mb-4 opacity-50" />
                                    <p className="uppercase tracking-widest text-xs">No Page Selected</p>
                                    <button
                                        onClick={createNewPage}
                                        className="mt-4 text-[#00ff9d] hover:underline"
                                    >
                                        Create New Entry
                                    </button>
                                </div>
                            )}

                            {/* TOC Sidebar */}
                            <div className={`${isTocOpen && activePage ? 'w-64 border-l border-white/10' : 'w-0'} bg-black/60 backdrop-blur transition-all duration-300 overflow-hidden flex flex-col`}>
                                <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 sticky top-0 bg-transparent">Table of Contents</h3>
                                    <div className="space-y-1">
                                        {getToc().map((h, i) => (
                                            <div
                                                key={i}
                                                onClick={() => scrollToSection(h.lineIndex)}
                                                className="cursor-pointer hover:bg-white/5 text-white/60 hover:text-[#00ff9d] text-xs truncate py-1.5 px-2 rounded transition-colors border-l-2 border-transparent hover:border-[#00ff9d]/50"
                                                style={{ paddingLeft: `${(h.level) * 0.75}rem` }}
                                            >
                                                {h.text || <span className="italic opacity-50">Untitled Section</span>}
                                            </div>
                                        ))}
                                        {getToc().length === 0 && <div className="text-[10px] text-white/20 italic p-2">No headers found. Use H1-H3 to generate structure.</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Visual Cipher "Noise" - Positioned absolutely within the editor container */}
                            {!isTocOpen && (
                                <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                                    <Shield size={64} strokeWidth={1} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
