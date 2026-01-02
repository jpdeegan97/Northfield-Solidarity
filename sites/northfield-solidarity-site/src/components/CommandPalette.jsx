import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, FileText, LayoutDashboard, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    // Toggle with Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Navigation Commands
    const commands = [
        { id: 'mk', icon: <LayoutDashboard />, label: 'Go to Marketplace', sub: 'Acquire assets & engines', action: () => navigate('/marketplace') },
        { id: 'flo', icon: <Zap />, label: 'Open FLO Engine', sub: 'Financial Logic Operator', action: () => navigate('/engines/flo') },
        { id: 'crn', icon: <FileText />, label: 'Open Chronicle', sub: 'Journal & Daily Brief', action: () => navigate('/engines/crn') },
        { id: 'sim', icon: <Settings />, label: 'System Sim', sub: 'Traffic & Load Simulation', action: () => navigate('/simulation') },
        { id: 'doc', icon: <FileText />, label: 'Documentation Hub', sub: 'Read runbooks & guides', action: () => navigate('/docs') },
        // Mock Actions
        { id: 'clr', icon: <Command />, label: 'Clear System Cache', sub: 'Action', action: () => alert('Cache cleared') },
        { id: 'thm', icon: <Settings />, label: 'Toggle Dark Mode', sub: 'Appearance', action: () => alert('Theme toggled') },
    ];

    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.sub.toLowerCase().includes(query.toLowerCase())
    );

    const execute = (cmd) => {
        cmd.action();
        setIsOpen(false);
        setQuery('');
    };

    // Keyboard navigation within list
    useEffect(() => {
        const handleNav = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowDown') {
                setActiveIndex(i => (i + 1) % filtered.length);
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(i => (i - 1 + filtered.length) % filtered.length);
            } else if (e.key === 'Enter') {
                if (filtered[activeIndex]) execute(filtered[activeIndex]);
            }
        };
        window.addEventListener('keydown', handleNav);
        return () => window.removeEventListener('keydown', handleNav);
    }, [isOpen, filtered, activeIndex]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl z-[1000] overflow-hidden flex flex-col font-sans"
                    >
                        {/* Input */}
                        <div className="flex items-center gap-3 p-4 border-b border-white/10">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                autoFocus
                                value={query}
                                onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-white/20"
                            />
                            <div className="flex gap-1">
                                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/40 font-mono">ESC</span>
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filtered.map((cmd, i) => (
                                <div
                                    key={cmd.id}
                                    onClick={() => execute(cmd)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                                        ${i === activeIndex ? 'bg-white/10' : 'hover:bg-white/5'}
                                    `}
                                >
                                    <div className={`p-2 rounded ${i === activeIndex ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40'}`}>
                                        {cmd.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`text-sm font-medium ${i === activeIndex ? 'text-white' : 'text-white/70'}`}>
                                            {cmd.label}
                                        </div>
                                        <div className="text-xs text-white/30">{cmd.sub}</div>
                                    </div>
                                    {i === activeIndex && <ArrowRight className="w-4 h-4 text-white/40" />}
                                </div>
                            ))}
                            {filtered.length === 0 && (
                                <div className="p-8 text-center text-white/30 text-sm italic">
                                    No commands found.
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-white/5 p-2 px-4 flex justify-between items-center text-[10px] text-white/20 border-t border-white/5">
                            <span>Open Palette</span>
                            <span className="font-mono">⌘ K</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
