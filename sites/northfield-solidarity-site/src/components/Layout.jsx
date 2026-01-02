import React from "react";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import { FlowerOfLife } from "./SacredGeometry.jsx";
import CommandPalette from "./CommandPalette.jsx";

export default function Layout({ children, brand, nav }) {
    return (
        <div className="siteLayout min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] font-sans selection:bg-[var(--c-brand)] selection:text-white">
            <CommandPalette />
            <FlowerOfLife opacity={0.03} />

            <Sidebar brand={brand} nav={nav} />

            <main className="siteMain relative z-10 lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
                <div className="w-full pt-16 lg:pt-0 flex-1 flex flex-col">
                    {children}
                </div>

                <Footer brand={brand} />
            </main>
        </div>
    );
}