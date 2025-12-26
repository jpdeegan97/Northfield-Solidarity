import React from "react";
import Sidebar from "./Sidebar.jsx";
import { FlowerOfLife } from "./SacredGeometry.jsx";

export default function Layout({ children, brand, nav }) {
    return (
        <div className="siteLayout min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] font-sans selection:bg-[var(--c-brand)] selection:text-white">
            <FlowerOfLife opacity={0.03} />

            <Sidebar brand={brand} nav={nav} />

            <main className="siteMain relative z-10 lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
                <div className="w-full pt-16 lg:pt-0 flex-1 flex flex-col">
                    {children}
                </div>

                <footer className="siteFooter border-t border-[var(--c-border)] bg-[var(--c-surface)] mt-24 py-12">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        {brand?.footerLine && <div className="font-semibold mb-2">{brand.footerLine}</div>}
                        {brand?.footerNote && <div className="text-sm text-[var(--c-text-sub)]">{brand.footerNote}</div>}
                    </div>
                </footer>
            </main>
        </div>
    );
}