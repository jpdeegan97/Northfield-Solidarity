import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";

export default function Header({ brand, nav }) {
    const location = useLocation();

    const defaultNav = [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { type: "divider" },
        { label: "Documentation", to: "/docs" },
        { label: "Pricing", to: "/pricing" },
        { label: "System", to: "/system" },
        { label: "Investor Relations", to: "/investors" },
    ];

    // Use provided nav/brand or defaults
    const activeNav = nav || defaultNav;
    const activeBrand = brand || {
        title: "Northfield Solidarity",
        tagline: "Systems that flow. Governance that scales."
    };

    const isNSHome = (item) => item.to === "/" && item.label === "Northfield Solidarity";
    const brandLink = location.pathname.startsWith("/southlawn") ? "/southlawn" : "/";

    return (
        <header className="siteHeader">
            <div className="headerInner">
                <Link to={brandLink} className="brandArea" style={{ textDecoration: 'none' }}>
                    <div className="brandTitle">{activeBrand.title}</div>
                    <div className="brandTagline">{activeBrand.tagline}</div>
                </Link>
                <nav className="siteNav">
                    {activeNav.map((item, index) => {
                        if (item.type === "divider") {
                            return <div key={`div-${index}`} className="navDivider" />;
                        }
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => {
                                    if (isNSHome(item)) {
                                        // Active on all NS pages (not starting with /southlawn)
                                        return !location.pathname.startsWith("/southlawn") ? "navLink active" : "navLink";
                                    }
                                    return isActive ? "navLink active" : "navLink";
                                }}
                                // Do not use 'end' for NS Home so it matches sub-routes, 
                                // but use 'end' for other root links if any (unlikely).
                                end={isNSHome(item) ? false : item.to === "/"}
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
