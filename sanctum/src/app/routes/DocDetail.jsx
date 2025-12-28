import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from "../../components/Layout.jsx";
import { useDocs } from "../../context/DocsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Edit2, Save, X, ChevronRight, Clock, User } from 'lucide-react';

export default function DocDetail() {
    const { docId } = useParams();
    const { docsRegistry, updateDoc } = useDocs();
    const { hasPermission } = useAuth();

    // Find doc in registry (with overrides)
    let doc = null;
    if (docsRegistry) {
        for (const cat of docsRegistry) {
            const found = cat.items.find(item => item.id === docId);
            if (found) {
                doc = found;
                break;
            }
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        if (doc) {
            setEditContent(doc.content || '');
            setEditTitle(doc.title || '');
        }
    }, [doc]);

    const handleSave = () => {
        updateDoc(docId, {
            content: editContent,
            title: editTitle
        });
        setIsEditing(false);
    };

    if (!doc) {
        return (
            <div data-theme="water" className="min-h-screen bg-bg text-text">
                <Layout>
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        <div className="text-6xl mb-4">🤷‍♂️</div>
                        <h1 className="text-3xl font-bold mb-2">Document Not Found</h1>
                        <p className="text-text-sub mb-8">We couldn't find a document with ID: <span className="font-mono bg-surface px-2 py-1 rounded">{docId}</span></p>
                        <Link to="/docs" className="px-6 py-2 bg-brand text-white rounded-full font-bold hover:bg-brand-light transition-colors">
                            ← Back to Knowledge Base
                        </Link>
                    </div>
                </Layout>
            </div>
        );
    }

    const canEdit = hasPermission('builder');

    return (
        <div data-theme="water" className="min-h-screen bg-bg text-text">
            <Layout>
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-text-sub mb-6">
                        <Link to="/docs" className="hover:text-brand transition-colors">Documentation</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className="text-text font-medium truncate">{doc.title}</span>
                    </nav>

                    {/* Header Region */}
                    <div className="mb-8 border-b border-border/50 pb-8">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="text-4xl font-extrabold bg-transparent border-b-2 border-brand/50 focus:border-brand outline-none w-full py-2 placeholder-white/20"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Document Title"
                                />
                            ) : (
                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                    {doc.title}
                                </h1>
                            )}

                            {canEdit && !isEditing && (
                                <button
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface hover:bg-white/10 text-sm font-medium border border-white/10 hover:border-white/20 transition-all flex-shrink-0"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit2 size={14} /> Edit
                                </button>
                            )}
                            {canEdit && isEditing && (
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-light text-white text-sm font-bold shadow-lg shadow-brand/20 transition-all"
                                        onClick={handleSave}
                                    >
                                        <Save size={14} /> Save
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface hover:bg-white/10 text-sm font-medium border border-white/10 transition-all"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-lg text-text-sub leading-relaxed max-w-2xl">
                            {doc.desc}
                        </p>

                        <div className="flex items-center gap-4 mt-6 text-xs text-text-sub uppercase tracking-wider font-semibold">
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} />
                                <span>Last Updated: {new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="w-px h-3 bg-white/20"></div>
                            <div className="flex items-center gap-1.5">
                                <User size={14} />
                                <span>Author: System</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Region */}
                    <div className={`
                        min-h-[50vh] rounded-2xl border border-border/50
                        ${isEditing ? 'bg-black/30 p-4 ring-2 ring-brand/20' : 'bg-surface/30 backdrop-blur-md p-8 lg:p-12 shadow-xl'}
                    `}>
                        {isEditing ? (
                            <textarea
                                className="w-full h-[60vh] bg-transparent border-none text-text font-mono text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="# Start writing..."
                                spellCheck={false}
                            />
                        ) : (
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {doc.content || ''}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
