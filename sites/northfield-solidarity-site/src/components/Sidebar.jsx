import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Home,
    Layers,
    Activity,
    DollarSign,
    FileText,
    Cpu,
    Box,
    ExternalLink,
    LogOut,
    UserCircle,
    Building2,
    Database,
    Landmark,
    Zap,
    GraduationCap,
    Globe,
    Folder,
    ArrowUpCircle,
    Code
} from "lucide-react";

export default function Sidebar({ brand, nav }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close on route change on mobile
    useEffect(() => {
        if (isMobile) setIsOpen(false);
    }, [location, isMobile]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const defaultNav = [
        { label: "Home", to: "/", icon: Home },
        { label: "South Lawn", to: "/southlawn", icon: Building2 },
        { label: "Wall Street Pro", to: "/wsp", icon: Landmark },
        { label: "More Than Enough", to: "/mte", icon: GraduationCap },
        { type: "divider" },
        { label: "Firmament", to: "/firmament", icon: MonitorPlay },
        { label: "Projects", to: "/projects", icon: Folder },
        { label: "Marketplace", to: "/marketplace", icon: Zap },
        { label: "System", to: "/system", icon: Cpu },
        { label: "Features", to: "/features", icon: Box },
        { label: "API Integration", to: "/api", icon: Globe },
        { label: "Education", to: "/education", icon: GraduationCap },
        { label: "Consulting", to: "/consulting", icon: Zap },
        { label: "Pricing", to: "/pricing", icon: DollarSign },
        { label: "Investors", to: "/investors", icon: Activity },
        { label: "Ascension", to: "/careers", icon: ArrowUpCircle },
        { label: "Developers", to: "/developers", icon: Code },
        { label: "NS Halo", to: "/ns-halo-landing", icon: Cpu },
        { label: "Docs", to: "/docs", icon: FileText },
        { label: "Contact", to: "/contact", icon: UserCircle },
    ];

    const activeNav = nav || defaultNav;

    // Brand logic
    const activeBrand = brand || {
        title: "Northfield Solidarity",
        tagline: "Systems that flow."
    };

    let brandLink = "/";
    if (location.pathname.startsWith("/southlawn")) brandLink = "/southlawn";
    if (location.pathname.startsWith("/wsp")) brandLink = "/wsp";

    // Sidebar Variations based on theme/context
    const isWater = !location.pathname.startsWith("/southlawn") && !location.pathname.startsWith("/wsp") && !location.pathname.startsWith("/mte");
    const isGreen = location.pathname.startsWith("/southlawn");
    const isGold = location.pathname.startsWith("/wsp");
    const isPurple = location.pathname.startsWith("/mte");

    const themeColor = isGreen ? "text-green-500" : isGold ? "text-amber-500" : isPurple ? "text-purple-400" : "text-brand";
    const themeBg = isGreen ? "bg-green-500/10" : isGold ? "bg-amber-500/10" : isPurple ? "bg-purple-500/10" : "bg-brand/10";
    const themeBorder = isGreen ? "border-green-500/20" : isGold ? "border-amber-500/20" : isPurple ? "border-purple-500/20" : "border-brand/20";
    const themeHover = isGreen ? "hover:bg-green-500/10 hover:text-green-400" : isGold ? "hover:bg-amber-500/10 hover:text-amber-400" : isPurple ? "hover:bg-purple-500/10 hover:text-purple-400" : "hover:bg-brand/10 hover:text-brand";

    // Icon helper if nav items pass strings or components
    const getIcon = (item) => {
        if (item.icon) return <item.icon size={18} />;
        if (item.label === "Home" || item.label === "Northfield Solidarity") return <Home size={18} />;
        if (item.label === "South Lawn") return <Building2 size={18} />;
        if (item.label === "WSP" || item.label === "Wall Street Pro") return <Landmark size={18} />;
        if (item.label === "Platform") return <Layers size={18} />;
        if (item.label === "Projects") return <Folder size={18} />;
        if (item.label === "Marketplace") return <Zap size={18} />;
        if (item.label === "System") return <Cpu size={18} />;
        if (item.label === "Features") return <Box size={18} />;
        if (item.label === "API Integration") return <Globe size={18} />;
        if (item.label === "Education") return <GraduationCap size={18} />;
        if (item.label === "Pricing") return <DollarSign size={18} />;
        if (item.label === "Investment" || item.label === "Investors") return <Activity size={18} />;
        if (item.label === "Ascension") return <ArrowUpCircle size={18} />;
        if (item.label === "Documentation" || item.label === "Docs") return <FileText size={18} />;
        if (item.label === "Contact") return <UserCircle size={18} />;
        return <ExternalLink size={18} />;
    };

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-white/70 hover:text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                    <span className="font-bold text-white tracking-tight">{activeBrand.title}</span>
                </div>
                {isAuthenticated && (
                    <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/50 flex items-center justify-center text-xs font-bold text-brand">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Backdrop for mobile */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                className={`fixed top-0 left-0 h-full w-72 bg-[#0f172a] border-r ${themeBorder} z-50 flex flex-col shadow-2xl transition-all duration-300 lg:translate-x-0`}
                animate={{ x: (isMobile && !isOpen) ? -320 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Brand Header */}
                <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <Link to={brandLink} className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-xl font-bold tracking-tight mb-1 group-hover:opacity-100 transition-opacity ${themeColor}`}
                        >
                            {activeBrand.title}
                        </motion.div>
                        <div className="text-xs text-slate-400 font-medium tracking-wide opacity-70 group-hover:text-white transition-colors">
                            {activeBrand.tagline}
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    {activeNav.map((item, index) => {
                        if (item.type === "divider") {
                            return <div key={`div-${index}`} className="h-px bg-white/10 my-4 mx-2" />;
                        }

                        // Determine active state manually for stricter control or rely on NavLink
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                                    ${isActive
                                        ? `${themeBg} ${themeColor} shadow-inner`
                                        : `text-slate-400 hover:text-slate-100 hover:bg-white/5`
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`opacity-70 group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`}>
                                            {getIcon(item)}
                                        </span>
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className={`ml-auto w-1.5 h-1.5 rounded-full ${isGreen ? 'bg-green-500' : isGold ? 'bg-amber-500' : isPurple ? 'bg-purple-500' : 'bg-brand'}`}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                {/* User / Footer */}
                <div className="p-4 border-t border-white/5 bg-slate-900/50">
                    {isAuthenticated ? (
                        <div
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                            onClick={() => navigate('/account')}
                        >
                            <div className={`w-10 h-10 rounded-full ${themeBg} border ${themeBorder} flex items-center justify-center text-sm font-bold ${themeColor}`}>
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{user.email}</div>
                                <div className="text-xs text-slate-500 truncate capitalize">{user.role || 'Member'}</div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); logout(); }}
                                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <Link to="/login" className="flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-white/10">
                                Log In
                            </Link>
                            <Link to="/signup" className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110 ${isGreen ? 'bg-green-600' : isGold ? 'bg-amber-600' : isPurple ? 'bg-purple-600' : 'bg-brand'}`}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    );
}

// Simple Icon Placeholder if Lucide fails or for custom needs
function MonitorPlay({ size }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
            <polygon points="12 15 17 21 7 21 12 15"></polygon>
        </svg>
    )
}
