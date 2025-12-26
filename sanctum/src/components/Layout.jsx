import React from "react";
import Sidebar from "./Sidebar.jsx";
import { FlowerOfLife } from "./SacredGeometry.jsx";

export default function Layout({ children }) {
    return (
        <div className="siteLayout min-h-screen bg-[#050505] text-white font-mono selection:bg-[#00ff9d] selection:text-black">
            <FlowerOfLife opacity={0.03} />

            <Sidebar />

            <main className="siteMain relative z-10 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <div className="w-full pt-16 lg:pt-0 flex-1 flex flex-col">
                    {children}
                </div>

                <footer className="siteFooter border-t border-white/10 bg-black/20 mt-24 py-12">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <div className="font-bold tracking-widest text-[#00ff9d] mb-2 uppercase text-xs">Sanctum Operations</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider">Internal Use Only // Access Level 5</div>
                    </div>
                </footer>
            </main>
        </div>
    );
}