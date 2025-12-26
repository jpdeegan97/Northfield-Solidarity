import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { useDocs } from "../../context/DocsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Edit2, Save, X } from 'lucide-react';

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
            <div data-theme="water">
                <Layout>
                    <Section
                        eyebrow="404"
                        title="Document Not Found"
                        subtitle={`We couldn't find a document with ID: ${docId}`}
                    >
                        <p><Link to="/docs" className="highlight-link">← Back to Knowledge Base</Link></p>
                    </Section>
                </Layout>
            </div>
        );
    }

    const canEdit = hasPermission('builder');

    return (
        <div data-theme="water">
            <Layout>
                <div className="doc-detail-wrapper" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
                    <div className="breadcrumbs" style={{ marginBottom: 'var(--space-4)', fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>
                        <Link to="/docs" style={{ color: 'var(--c-text-sub)', textDecoration: 'none' }}>Documentation</Link> / <span style={{ color: 'var(--c-brand)' }}>{doc.id}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                        {isEditing ? (
                            <input
                                type="text"
                                className="h1 input"
                                style={{ background: 'transparent', border: '1px solid var(--c-border)', color: 'var(--c-text)', width: '100%' }}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        ) : (
                            <h1 className="h1" style={{ marginBottom: 0 }}>{doc.title}</h1>
                        )}

                        {canEdit && !isEditing && (
                            <button className="btn sm ghost" onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} /> Edit
                            </button>
                        )}
                        {canEdit && isEditing && (
                            <div className="flex gap-2">
                                <button className="btn sm primary" onClick={handleSave}><Save size={16} /> Save</button>
                                <button className="btn sm ghost" onClick={() => setIsEditing(false)}><X size={16} /> Cancel</button>
                            </div>
                        )}
                    </div>

                    <p className="sub" style={{ fontSize: '1.25rem', color: 'var(--c-text-sub)', marginBottom: 'var(--space-6)' }}>
                        {doc.desc}
                    </p>

                    <div className="doc-content" style={{
                        background: 'var(--c-surface)',
                        padding: 'var(--space-6)',
                        borderRadius: '16px',
                        border: '1px solid var(--c-border)',
                        minHeight: '20vh'
                    }}>
                        {isEditing ? (
                            <textarea
                                className="input full-width"
                                style={{
                                    width: '100%',
                                    minHeight: '500px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--c-text)',
                                    fontFamily: 'monospace',
                                    resize: 'vertical',
                                    outline: 'none',
                                    lineHeight: '1.6'
                                }}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        ) : (
                            <div className="prose">
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
