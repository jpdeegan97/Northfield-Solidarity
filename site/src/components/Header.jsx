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

    let brandLink = "/";
    if (location.pathname.startsWith("/southlawn")) brandLink = "/southlawn";
    if (location.pathname.startsWith("/wsp")) brandLink = "/wsp";

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
                                        // Active on all NS pages (not starting with /southlawn or /wsp)
                                        return (!location.pathname.startsWith("/southlawn") && !location.pathname.startsWith("/wsp")) ? "navLink active" : "navLink";
                                    }
                                    return isActive ? "navLink active" : "navLink";
                                }}
                                end={isNSHome(item) ? false : item.to === "/"}
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}

                    <div className="navDivider" />
                    <div className="auth-buttons">
                        {isAuthenticated ? (
                            <Link to="/account" className="btn-login" style={{ fontWeight: 600 }}>Account</Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn-login">Log In</Link>
                                <Link to="/signup" className="btn-signup">Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
