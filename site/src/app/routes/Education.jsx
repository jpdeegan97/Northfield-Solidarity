import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import { GraduationCap, Shield, ExternalLink, School, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education() {
    return (
        <div data-theme="water">
            <Layout>
                <div className="section" style={{ maxWidth: '1000px', width: '100%', alignItems: 'stretch' }}>

                    {/* Header with Stats */}
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: 'inline-flex',
                                padding: 'var(--space-4)',
                                background: 'var(--c-brand-light)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-4)',
                                boxShadow: '0 0 15px rgba(59,130,246,0.2)'
                            }}
                        >
                            <GraduationCap size={48} style={{ color: 'var(--c-brand)' }} />
                        </motion.div>
                        <h1 className="h1" style={{ marginBottom: 'var(--space-2)' }}>Education Protocols</h1>
                        <p className="lead" style={{ maxWidth: '700px', margin: '0 auto var(--space-6)' }}>
                            Knowledge transmission vectors and academic reinforcement services designed for the next generation of intelligence.
                        </p>

                        {/* Stats Ticker */}
                        <div className="card" style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 'var(--space-4)',
                            background: 'var(--c-surface)',
                            border: '1px solid var(--c-border)'
                        }}>
                            {[
                                { label: "Active Nodes", value: "1", color: "#22c55e" },
                                { label: "Curriculum Vectors", value: "3", color: "var(--c-brand)" },
                                { label: "Global Reach", value: "Pending", color: "#f59e0b" }
                            ].map((stat, i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: stat.color }}>{stat.value}</span>
                                    <span className="eyebrow" style={{ fontSize: '0.7rem', color: 'var(--c-text-sub)', marginBottom: 0 }}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ventures Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

                        {/* More Than Enough Tutors */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card"
                            style={{
                                flexDirection: 'row',
                                overflow: 'hidden',
                                padding: 0,
                                border: '1px solid var(--c-border)',
                                textAlign: 'left',
                                alignItems: 'stretch'
                            }}
                        >
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
                                {/* Thumbnail (Mobile/Small Screen - usually displayed here? layout implies side-by-side) */}
                                {/* Let's keep side-by-side but Responsive? The original was flex-col md:flex-row. We'll use flex-wrap or media query simulation with flex-basis. */}

                                <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                                    {/* Image Side */}
                                    <div style={{
                                        flex: '1 1 300px',
                                        minHeight: '200px',
                                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8))',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid var(--c-border)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundImage: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
                                            backgroundSize: '20px 20px',
                                            maskImage: 'linear-gradient(to bottom, white, transparent)'
                                        }} />
                                        <School size={64} style={{ color: 'var(--c-brand)', position: 'relative', zIndex: 10 }} />
                                    </div>

                                    {/* Content Side */}
                                    <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                            <h2 className="h2" style={{ fontSize: '1.8rem', marginBottom: 0, textAlign: 'left' }}>More Than Enough Tutors</h2>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '99px',
                                                background: 'var(--c-brand-light)',
                                                color: 'var(--c-brand)',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                border: '1px solid currentColor',
                                                textTransform: 'uppercase'
                                            }}>
                                                Re-registering
                                            </span>
                                        </div>
                                        <p style={{ color: 'var(--c-text-sub)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                            Premium academic reinforcement and specialized tutoring services.
                                            Delivering high-efficacy learning outcomes through personalized instruction.
                                        </p>

                                        {/* Liability Shield Notice */}
                                        <div style={{
                                            padding: 'var(--space-4)',
                                            background: 'var(--c-bg)',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--c-border)',
                                            display: 'flex',
                                            gap: 'var(--space-3)',
                                            marginBottom: 'var(--space-4)',
                                            alignItems: 'flex-start'
                                        }}>
                                            <div style={{ padding: '6px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '6px', color: '#22c55e' }}>
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--c-text)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    Entity Isolation Protocol
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                                                </h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--c-text-sub)', lineHeight: 1.5 }}>
                                                    Operated as a legally distinct entity under <strong style={{ color: 'var(--c-text)' }}>NSDC Education Services LLC</strong>.
                                                    This structure ensures strict liability segregation, protecting core assets.
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--c-border)' }}>
                                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--c-text-sub)' }}>STATUS: PENDING STATE APPROVAL</span>
                                            <Link to="/mte" className="btn ghost" style={{
                                                fontSize: '0.85rem',
                                                padding: '8px 16px',
                                                gap: '8px',
                                                textDecoration: 'none'
                                            }}>
                                                Launch MTE Platform <ExternalLink size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Future Initiatives Grid */}
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="card"
                                style={{ alignItems: 'flex-start', padding: 'var(--space-5)', textAlign: 'left', background: 'var(--c-surface)' }}
                            >
                                <div style={{ padding: 'var(--space-2)', background: 'rgba(168, 85, 247, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
                                    <BookOpen size={24} style={{ color: '#a855f7' }} />
                                </div>
                                <h3 className="h3" style={{ marginBottom: 'var(--space-2)', fontSize: '1.1rem' }}>Curriculum Synthesis</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                                    AI-driven curriculum generation based on real-time industry demands and skill gap analysis.
                                </p>
                                <div style={{ width: '100%', background: 'var(--c-border)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '25%', height: '100%', background: '#a855f7', borderRadius: '3px' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#a855f7', marginTop: '8px', fontWeight: '600' }}>25% Development</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="card"
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 'var(--space-5)',
                                    border: '1px dashed var(--c-border)',
                                    background: 'transparent',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ padding: 'var(--space-2)', background: 'var(--c-surface)', borderRadius: '50%', marginBottom: 'var(--space-3)' }}>
                                    <AlertTriangle size={24} style={{ color: 'var(--c-text-sub)' }} />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--c-text-sub)', marginBottom: 'var(--space-1)' }}>Restricted Sector</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)', maxWidth: '200px' }}>
                                    Additional educational vectors classify as Level 5 cognitohazards. Access restricted.
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    );
}
