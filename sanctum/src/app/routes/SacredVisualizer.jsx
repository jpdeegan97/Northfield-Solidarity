import React from 'react';
import SanctumVisualizer from '../../components/SanctumVisualizer';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';

export default function SacredVisualizer() {
    return (
        <Layout>
            <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
                {/* Header Overlay */}
                <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-none">
                    <div className="flex items-center gap-6 pointer-events-auto">
                        <Link to="/" className="flex items-center gap-2 group text-white/60 hover:text-[#00ff9d] transition-colors">
                            <span className="text-xs font-bold tracking-widest uppercase">SANCTUM // VISUALIZER</span>
                        </Link>
                    </div>
                </header>

                {/* Main Visualizer Area */}
                <div className="flex-1 w-full h-full">
                    <SanctumVisualizer />
                </div>
            </div>
        </Layout>
    );
}
