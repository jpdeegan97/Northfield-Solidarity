import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ brand, nav }) {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const defaultNav = [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Platform", to: "/platform" },
        { label: "System", to: "/system" },
        { label: "Pricing", to: "/pricing" },
        { label: "Investor Relations", to: "/investors" },
        { label: "Documentation", to: "/docs" },
        { label: "Contact", to: "/contact" },
    ];

    // Use provided nav/brand or defaults
    const activeNav = nav || defaultNav;
    const activeBrand = brand || {
        title: "Northfield Solidarity",
        tagline: "Systems that flow. Governance that scales."
    };

    const isNSHome = (item) => item.to === "/" && item.label === "Northfield Solidarity";

    let brandLink = "/";
    if (location.pathname.startsWith("/southlawn")) brandLink = "/southlawn";
    if (location.pathname.startsWith("/wsp")) brandLink = "/wsp";

    return (
        <header className="sticky top-0 z-50 p-0 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                <Link to={brandLink} className="flex flex-col justify-center leading-none no-underline">
                    <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand to-white">{activeBrand.title}</div>
                    <div className="text-xs text-brand/50 font-medium tracking-wide mt-1 opacity-80">{activeBrand.tagline}</div>
                </Link>
                <nav className="flex items-center gap-1">
                    {activeNav.map((item, index) => {
                        if (item.type === "divider") {
                            return <div key={`div-${index}`} className="w-px h-6 bg-white/20 mx-2" />;
                        }
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => {
                                    const baseClass = "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all relative overflow-hidden inline-flex items-center justify-center text-center leading-tight whitespace-nowrap";
                                    const activeClass = "bg-brand/10 text-brand";
                                    const inactiveClass = "text-white/60 hover:bg-white/5 hover:text-white";

                                    if (isNSHome(item)) {
                                        // Active on all NS pages (not starting with /southlawn or /wsp)
                                        return (!location.pathname.startsWith("/southlawn") && !location.pathname.startsWith("/wsp"))
                                            ? `${baseClass} ${activeClass}`
                                            : `${baseClass} ${inactiveClass}`;
                                    }
                                    return isActive ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
                                }}
                                end={isNSHome(item) ? false : item.to === "/"}
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}

                    <div className="w-px h-6 bg-white/20 mx-2" />
                    <div className="flex gap-2 items-center flex-shrink-0">
                        {isAuthenticated ? (
                            <Link to="/account" className="text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md transition-all">Account</Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md transition-all">Log In</Link>
                                <Link to="/signup" className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-brand to-accent rounded-full shadow-lg hover:shadow-brand/30 hover:brightness-110 hover:-translate-y-px transition-all">Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
