import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../context/AuthContext';
import { useDocs } from '../context/DocsContext';
import { Edit2, Save, X, FileText, ChevronRight, Share2 } from 'lucide-react';
import WPVView from '../app/engines/WPVView';

export default function DocModal({ activeDocModal, setActiveDocModal }) {
    const { hasPermission } = useAuth();
    const { updateDoc } = useDocs();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [viewMode, setViewMode] = useState('text'); // 'text' | 'visual'

    const canEdit = hasPermission('builder');

    const activeItem = activeDocModal.activeItem;

    // Sync state when active item changes
    useEffect(() => {
        if (activeItem) {
            setEditContent(activeItem.content || '');
            setEditTitle(activeItem.title || '');
            setIsEditing(false);
            setViewMode('text'); // Reset to text
        }
    }, [activeItem?.id]);

    const handleSave = () => {
        updateDoc(activeItem.id, {
            content: editContent,
            title: editTitle
        });
        setIsEditing(false);
        // Update the local modal state to reflect changes immediately
        setActiveDocModal(prev => ({
            ...prev,
            activeItem: {
                ...prev.activeItem,
                content: editContent,
                title: editTitle
            }
        }));
    };

    const handleClose = () => setActiveDocModal(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" onClick={handleClose}>
            <div
                className="bg-bg w-full max-w-7xl h-[90vh] rounded-2xl border border-border shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Sidebar */}
                <div className="w-64 md:w-72 bg-surface border-r border-border flex flex-col flex-shrink-0">
                    <div className="p-4 border-b border-border bg-surface/50">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-text-sub truncate">
                            {activeDocModal.category.category}
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {activeDocModal.category.items.map(item => (
                            <button
                                key={item.id}
                                className={`
                                    w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2
                                    ${activeItem.id === item.id
                                        ? 'bg-brand/10 text-brand font-medium'
                                        : 'text-text-sub hover:bg-white/5 hover:text-text'}
                                `}
                                onClick={() => setActiveDocModal({ ...activeDocModal, activeItem: item })}
                            >
                                <FileText size={14} className={activeItem.id === item.id ? 'opacity-100' : 'opacity-50'} />
                                <span className="truncate">{item.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 border-t border-border bg-surface/50 flex flex-col gap-2">
                        {/* VIEW MODE TOGGLE */}
                        <div className="flex bg-black/20 p-1 rounded-lg mb-2">
                            <button
                                onClick={() => setViewMode('text')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-2 ${viewMode === 'text' ? 'bg-white/10 text-white' : 'text-text-sub hover:text-white'}`}
                            >
                                <FileText size={12} /> Text
                            </button>
                            <button
                                onClick={() => setViewMode('visual')}
                                className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-2 ${viewMode === 'visual' ? 'bg-brand text-black' : 'text-text-sub hover:text-white'}`}
                            >
                                <Share2 size={12} /> Visual
                            </button>
                        </div>

                        {canEdit && !isEditing && (
                            <button
                                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg border border-border hover:bg-white/5 text-sm font-medium transition-colors"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 size={14} /> Edit Page
                            </button>
                        )}
                        {canEdit && isEditing && (
                            <div className="flex gap-2">
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-brand hover:bg-brand-light text-white text-sm font-bold shadow-lg shadow-brand/20 transition-all"
                                    onClick={handleSave}
                                >
                                    <Save size={14} /> Save
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-border hover:bg-white/5 text-sm font-medium transition-colors"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <X size={14} /> Cancel
                                </button>
                            </div>
                        )}
                        <button
                            className="w-full py-2 px-3 rounded-lg text-text-sub hover:bg-white/5 text-sm transition-colors"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col bg-bg min-w-0">
                    {/* Header */}
                    <div className="h-14 border-b border-border flex items-center px-6 md:px-8 justify-between bg-bg/50 backdrop-blur-sm sticky top-0 z-10">
                        {isEditing ? (
                            <input
                                type="text"
                                className="text-lg font-bold bg-transparent border-b border-brand/50 focus:border-brand outline-none w-full py-1"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Document Title"
                            />
                        ) : (
                            <div className="flex items-center gap-2 overflow-hidden">
                                <h2 className="text-lg font-bold truncate">{activeItem.title}</h2>
                                {activeItem.desc && <span className="text-text-sub hidden md:inline-block text-sm truncate max-w-md border-l border-border pl-2 ml-2">{activeItem.desc}</span>}
                            </div>
                        )}
                        <button onClick={handleClose} className="md:hidden p-2 -mr-2 text-text-sub hover:text-text"><X size={20} /></button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-0 md:p-0 custom-scrollbar h-full">
                        {isEditing ? (
                            <div className="h-full flex flex-col p-6">
                                <textarea
                                    className="flex-1 w-full bg-surface/50 rounded-xl border border-border p-4 text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all custom-scrollbar"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="# Start writing..."
                                />
                            </div>
                        ) : (
                            viewMode === 'visual' ? (
                                <WPVView title={activeItem.title} content={activeItem.content} />
                            ) : (
                                <div className="max-w-4xl mx-auto p-6 md:p-12">
                                    <div className="prose prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {activeItem.content || "Content coming soon..."}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
