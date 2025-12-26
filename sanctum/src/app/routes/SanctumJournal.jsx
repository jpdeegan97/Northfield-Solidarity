import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useJournal } from '../../context/JournalContext';
import { Lock, Unlock, Save, FileText, AlertTriangle, Shield, Check } from 'lucide-react';

export default function SanctumJournal() {
    const { isLocked, hasVault, status, journalData, createVault, unlockVault, saveJournal, lockVault } = useJournal();
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    // Sync content when specific journalData loads
    useEffect(() => {
        if (!isLocked) {
            setContent(journalData);
        }
    }, [journalData, isLocked]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!password) return;
        await createVault(password);
        setPassword('');
    };

    const handleUnlock = async (e) => {
        e.preventDefault();
        if (!password) return;
        await unlockVault(password);
        setPassword('');
    };

    const handleSave = async () => {
        setIsSaving(true);
        await saveJournal(content);
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 800);
    };

    // Auto-save debounced (optional/advanced, stick to manual first for clarity or secure feeling)
    // For "rotate constantly", let's do manual or on-blur to show the effect.

    if (isLocked) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[80vh] font-mono text-white p-6 relative overflow-hidden">
                    {/* Background Matrix/Cipher effect could go here */}
                    <div className="absolute inset-0 bg-[#050505] z-0" />
                    <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.1),transparent_70%)]" />

                    <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-xl shadow-2xl">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group animate-pulse-slow">
                                <Lock size={32} className="text-white/50 group-hover:text-[#00ff9d] transition-colors" />
                            </div>
                        </div>

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
            <div className="flex flex-col h-screen bg-[#050505] text-white font-mono">
                {/* Journal Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <FileText size={20} className="text-[#00ff9d]" />
                        <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white/90">SECURE JOURNAL</h1>
                        <span className="text-[10px] px-2 py-0.5 border border-[#00ff9d]/30 text-[#00ff9d] rounded bg-[#00ff9d]/5 tracking-widest">
                            ENCRYPTED
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Status Indicators */}
                        <div className="flex flex-col items-end mr-4">
                            <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                                <Shield size={10} /> Rotational Cryptography Active
                            </div>
                            {lastSaved && (
                                <div className="text-[10px] text-white/30">
                                    LAST ENCRYPTION: {lastSaved.toLocaleTimeString()}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
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
                <div className="flex-1 relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full bg-[#0a0a0a] text-white/80 p-8 resize-none focus:outline-none focus:bg-[#0c0c0c] transition-colors leading-relaxed placeholder-white/10 text-sm font-mono custom-scrollbar"
                        placeholder="ENTER SECURE DATA..."
                        spellCheck="false"
                    />

                    {/* Visual Cipher "Noise" (Optional flair) */}
                    <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                        <Shield size={64} strokeWidth={1} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
