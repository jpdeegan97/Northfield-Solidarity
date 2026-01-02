import React, { useState } from 'react';

const ProposalModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Proposal Submitted! The GGP Committee will review your submission.");
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--c-text-sub)',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>

                <h3 style={{ marginBottom: '0.5rem', color: 'var(--c-text)' }}>Submit Engine Proposal</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--c-text-sub)', fontSize: '0.9rem' }}>
                    Share your concept with the GGP Committee. Confidentiality guaranteed.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Proposal Title</label>
                        <input type="text" required placeholder="e.g. Decentralized Energy Grid" style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)'
                        }} />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Target Tier</label>
                        <select style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)'
                        }}>
                            <option>Tier 1: The Spark (Idea)</option>
                            <option>Tier 2: The Blueprint (Spec)</option>
                            <option>Tier 3: The Architect (Advisory)</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Abstract / Description</label>
                        <textarea required rows="4" placeholder="Describe the core mechanism and value proposition..." style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: 'var(--c-bg)',
                            border: '1px solid var(--c-border)',
                            borderRadius: '4px',
                            color: 'var(--c-text)',
                            resize: 'vertical'
                        }}></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: '1px solid var(--c-border)',
                            color: 'var(--c-text-sub)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>Cancel</button>
                        <button type="submit" className="btn" style={{ padding: '0.75rem 1.5rem' }}>Submit Proposal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PartnerRoyaltyView = () => {
    const [isProposalModalOpen, setProposalModalOpen] = useState(false);
    return (
        <div className="tab-content fade-in">
            <ProposalModal isOpen={isProposalModalOpen} onClose={() => setProposalModalOpen(false)} />
            <section className="ir-section highlight-bg">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="badge ir-badge">Genesis Partners Program</div>
                    <h2 className="deal-title">Turn Ideas Into Perpetual Income</h2>
                    <p className="deal-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        Partners who submit Engine blueprints or Project sparks that are accepted by Northfield Solidarity receive a <strong>perpetual royalty</strong> on the net cash flow generated by that entity.
                    </p>
                </div>

                <div className="metrics-grid" style={{ marginBottom: '3rem' }}>
                    {/* TIER 1 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--c-text-sub)' }}></div>
                        <h3 className="section-label" style={{ color: 'var(--c-text)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 1: The Spark</h3>
                        <div className="metric-value">1.0% - 2.5%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You provide a high-level concept or specific problem/solution set. We do the research, spec, build, and operations.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> Validated Idea / Problem</li>
                            <li><strong>Effort:</strong> Low (One-off submission)</li>
                            <li><strong>Vesting:</strong> Immediate upon Mainnet</li>
                        </ul>
                    </div>

                    {/* TIER 2 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden', borderColor: 'var(--c-brand)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--c-brand)' }}></div>
                        <h3 className="section-label" style={{ color: 'var(--c-brand)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 2: The Blueprint</h3>
                        <div className="metric-value" style={{ color: 'var(--c-brand)' }}>2.5% - 5.0%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You deliver a detailed spec, market analysis, or initial architecture. You help shape the MVP but don't operate it.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> Full Spec / Architecture</li>
                            <li><strong>Effort:</strong> Medium (Workshops / Docs)</li>
                            <li><strong>Vesting:</strong> Immediate upon Mainnet</li>
                        </ul>
                    </div>

                    {/* TIER 3 */}
                    <div className="metric-card" style={{ position: 'relative', overflow: 'hidden', borderColor: '#a855f7' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: '#a855f7' }}></div>
                        <h3 className="section-label" style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tier 3: The Architect</h3>
                        <div className="metric-value" style={{ color: '#a855f7' }}>5.0% - 10.0%</div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            You bring critical IP, key relationships, or ongoing advisory. You are a pseudo-founder for this specific engine.
                        </p>
                        <ul className="terms-list">
                            <li><strong>Input:</strong> IP / Network / Advisory</li>
                            <li><strong>Effort:</strong> High (Ongoing Monthly)</li>
                            <li><strong>Vesting:</strong> 1 Year Cliff / 4 Year Vest</li>
                        </ul>
                    </div>
                </div>

                <div style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                    <h3 className="section-label">Program Terms & Governance</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <ul className="terms-list">
                            <li><strong>Royalty Base:</strong> Net Distributable Cash Flow (post-OpEx/CapEx).</li>
                            <li><strong>Payment Frequency:</strong> Quarterly distributions via USDC or FIAT.</li>
                            <li><strong>Cap:</strong> Uncapped earnings upside.</li>
                        </ul>
                        <ul className="terms-list">
                            <li><strong>Buyout Option:</strong> NS retains right to buy out royalty at 10x ARR after Year 5.</li>
                            <li><strong>Governance:</strong> Economic interest only. No voting rights or control.</li>
                            <li><strong>Transferability:</strong> Assignable to trusts/entities with approval.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button className="btn" style={{ fontSize: '1rem', padding: '1rem 2rem' }} onClick={() => setProposalModalOpen(true)}>
                        Submit Engine Proposal
                    </button>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>
                        Proposals are reviewed by the GGP Committee weekly. Acceptance rate is currently ~4%.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PartnerRoyaltyView;
