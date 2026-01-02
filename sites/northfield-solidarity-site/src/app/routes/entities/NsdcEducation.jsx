import React from 'react';
import Layout from '../../../components/Layout.jsx';
import { GraduationCap, BookOpen, Video } from 'lucide-react';

export default function NsdcEducation() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%' }}>

                    {/* Header */}
                    <div style={{ paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--c-border)', marginBottom: 'var(--space-8)' }}>
                        <div className="eyebrow" style={{ color: 'var(--c-text-sub)' }}>Northfield Solidarity Ecosystem</div>
                        <h1 className="h1" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>NSDC Educational Services LLC</h1>
                        <p className="lead" style={{ maxWidth: '700px' }}>
                            The dedicated education and training arm of Northfield. Responsible for curriculum development,
                            certification programs, and the operation of the "More Than Enough Tutors" platform.
                        </p>
                    </div>

                    {/* Key Functions */}
                    <div className="grid">
                        <div className="card">
                            <GraduationCap size={32} style={{ color: '#00ff9d', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Certification</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Issuance of professional certifications and skill validation for the Northfield ecosystem.
                            </p>
                        </div>
                        <div className="card">
                            <Video size={32} style={{ color: '#d97706', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Content Delivery</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Production and distribution of educational media, workshops, and seminars.
                            </p>
                        </div>
                        <div className="card">
                            <BookOpen size={32} style={{ color: '#3b82f6', marginBottom: 'var(--space-4)' }} />
                            <h3 className="h3" style={{ fontSize: '1.25rem' }}>Curriculum R&D</h3>
                            <p style={{ color: 'var(--c-text-sub)' }}>
                                Researches and develops new learning methodologies and knowledge graphs.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-6)', background: 'var(--c-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <h3 className="h3">Strategic Assets</h3>
                        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: 'var(--c-text-sub)' }}>
                            <li>More Than Enough Tutors (Platform)</li>
                            <li>Northfield Certified Developer Program</li>
                            <li>Cognitive Enhancement Protocols</li>
                        </ul>
                    </div>

                </div>
            </Layout>
        </div>
    );
}
