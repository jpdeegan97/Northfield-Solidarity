import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

export default function NSHaloLanding() {
    return (
        <Layout>
            <div className="fade-in">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden border-b border-[var(--c-border)] bg-[var(--c-surface)]">
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--c-brand)]/30 bg-[var(--c-brand)]/5 text-[var(--c-brand)] text-xs font-mono uppercase tracking-wider mb-6">
                            <span>System Security & Resilience</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[var(--c-text)]">
                            NS Halo
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--c-text-sub)] max-w-3xl mx-auto mb-10 leading-relaxed">
                            The protective ring around your digital estate. Continuous surveillance, threat isolation, and resilience orchestration.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="http://localhost:5174/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-[var(--c-brand)] text-black font-bold rounded hover:bg-[var(--c-brand)]/90 transition-all flex items-center gap-2"
                            >
                                <span>View Documentation (Sanctum)</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--c-brand)]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
                </section>

                {/* Features Grid */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 border border-[var(--c-border)] rounded-lg bg-[var(--c-item-bg)]/30 hover:bg-[var(--c-item-bg)]/50 transition-colors">
                                <div className="w-12 h-12 rounded bg-[var(--c-brand)]/10 text-[var(--c-brand)] flex items-center justify-center mb-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--c-text)]">Active Defense</h3>
                                <p className="text-[var(--c-text-sub)]">
                                    Halo actively monitors system perimeters, identifying anomalous signals and neutralizing potential threats before they execute.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-8 border border-[var(--c-border)] rounded-lg bg-[var(--c-item-bg)]/30 hover:bg-[var(--c-item-bg)]/50 transition-colors">
                                <div className="w-12 h-12 rounded bg-[var(--c-brand)]/10 text-[var(--c-brand)] flex items-center justify-center mb-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--c-text)]">Global Resilience</h3>
                                <p className="text-[var(--c-text-sub)]">
                                    Distributed state management ensures that your digital estate remains operational even during partial system failures.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-8 border border-[var(--c-border)] rounded-lg bg-[var(--c-item-bg)]/30 hover:bg-[var(--c-item-bg)]/50 transition-colors">
                                <div className="w-12 h-12 rounded bg-[var(--c-brand)]/10 text-[var(--c-brand)] flex items-center justify-center mb-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M2 12h20"></path>
                                        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
                                        <path d="M12 8V2"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--c-text)]">Isolation Protocols</h3>
                                <p className="text-[var(--c-text-sub)]">
                                    Rapidly quarantine compromised vectors or suspicious entities to protect the core integrity of the network.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
