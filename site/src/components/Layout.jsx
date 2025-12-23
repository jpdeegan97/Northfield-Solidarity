import React from "react";
import Header from "./Header.jsx";
import { FlowerOfLife } from "./SacredGeometry.jsx";

export default function Layout({ children, brand, nav }) {
    return (
        <div className="siteLayout" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <FlowerOfLife opacity={0.03} />
            <Header brand={brand} nav={nav} />

            <main className="siteMain" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </main>

            <footer className="siteFooter">
                <div className="footerInner">
                    {brand?.footerLine && <div className="footerLine">{brand.footerLine}</div>}
                    {brand?.footerNote && <div className="footerNote">{brand.footerNote}</div>}
                </div>
            </footer>
        </div>
    );
}