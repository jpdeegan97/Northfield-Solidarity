import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import Section from "../../components/Section.jsx";
import { getDoc } from "../../data/docsRegistry.js";


export default function DocDetail() {
    const { docId } = useParams();
    const doc = getDoc(docId);

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

    return (
        <div data-theme="water">
            <Layout>
                <div className="doc-detail-wrapper" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
                    <div className="breadcrumbs" style={{ marginBottom: 'var(--space-4)', fontSize: '0.9rem', color: 'var(--c-text-sub)' }}>
                        <Link to="/docs" style={{ color: 'var(--c-text-sub)', textDecoration: 'none' }}>Documentation</Link> / <span style={{ color: 'var(--c-brand)' }}>{doc.id}</span>
                    </div>

                    <h1 className="h1" style={{ marginBottom: 'var(--space-2)' }}>{doc.title}</h1>
                    <p className="sub" style={{ fontSize: '1.25rem', color: 'var(--c-text-sub)', marginBottom: 'var(--space-6)' }}>
                        {doc.desc}
                    </p>

                    <div className="doc-content prose" style={{
                        background: 'var(--c-surface)',
                        padding: 'var(--space-6)',
                        borderRadius: '16px',
                        border: '1px solid var(--c-border)',
                        lineHeight: '1.6'
                    }}>
                        {/* Simple rendering for now, can be upgraded to ReactMarkdown */}
                        {doc.content.split('\n').map((line, i) => {
                            if (line.startsWith('### ')) return <h3 key={i} className="h3" style={{ marginTop: '1.5em', marginBottom: '0.5em' }}>{line.replace('### ', '')}</h3>
                            if (line.startsWith('## ')) return <h2 key={i} className="h2" style={{ marginTop: '1.5em', marginBottom: '0.5em' }}>{line.replace('## ', '')}</h2>
                            if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: '1.5em', marginBottom: '0.5em' }}>{line.replace('- ', '')}</li>
                            return <p key={i} style={{ marginBottom: '1em' }}>{line}</p>
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
