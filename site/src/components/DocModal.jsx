import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../context/AuthContext';
import { useDocs } from '../context/DocsContext';
import { Edit2, Save, X } from 'lucide-react';

export default function DocModal({ activeDocModal, setActiveDocModal }) {
    const { hasPermission } = useAuth();
    const { updateDoc } = useDocs();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editTitle, setEditTitle] = useState('');

    const canEdit = hasPermission('builder'); // Allow builders/admins to edit

    const activeItem = activeDocModal.activeItem;

    // Sync state when active item changes
    useEffect(() => {
        if (activeItem) {
            setEditContent(activeItem.content || '');
            setEditTitle(activeItem.title || '');
            setIsEditing(false);
        }
    }, [activeItem]);

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
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Sidebar */}
                <div className="modal-sidebar">
                    <div className="modal-sidebar-header">
                        <h3>{activeDocModal.category.category}</h3>
                    </div>
                    <div className="modal-nav">
                        {activeDocModal.category.items.map(item => (
                            <button
                                key={item.id}
                                className={`modal-nav-item ${activeItem.id === item.id ? 'active' : ''}`}
                                onClick={() => setActiveDocModal({ ...activeDocModal, activeItem: item })}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                        {canEdit && !isEditing && (
                            <button
                                className="btn sm outline full-width flex items-center justify-center gap-2"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 size={14} /> Edit Page
                            </button>
                        )}
                        {canEdit && isEditing && (
                            <div className="flex gap-2">
                                <button
                                    className="btn sm primary flex-1 flex items-center justify-center gap-1"
                                    onClick={handleSave}
                                >
                                    <Save size={14} /> Save
                                </button>
                                <button
                                    className="btn sm ghost flex-1 flex items-center justify-center gap-1"
                                    onClick={() => setIsEditing(false)}
                                >
                                    <X size={14} /> Cancel
                                </button>
                            </div>
                        )}
                        <button className="btn sm ghost full-width" onClick={handleClose}>Close</button>
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {isEditing ? (
                        <div className="edit-form flex flex-col h-full gap-4">
                            <div>
                                <label className="text-xs uppercase text-secondary font-bold mb-1 block">Title</label>
                                <input
                                    type="text"
                                    className="input full-width"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="text-xs uppercase text-secondary font-bold mb-1 block">Content (Markdown)</label>
                                <textarea
                                    className="input full-width"
                                    style={{ flex: 1, fontFamily: 'monospace', lineHeight: '1.5', resize: 'none' }}
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="mb-4">{activeItem.title}</h2>
                            <div className="markdown-content prose" style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {activeItem.content || "Content coming soon..."}
                                </ReactMarkdown>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                .input {
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    color: var(--c-text);
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 0.9rem;
                }
                .input:focus {
                    outline: none;
                    border-color: var(--c-brand);
                }
            `}</style>
        </div>
    );
}
