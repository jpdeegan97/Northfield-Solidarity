import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Home,
    Layers,
    DollarSign,
    FileText,
    LogOut,
    Clock,
    Eye,
    BookLock,
    Trophy,
    Globe,
    ShieldAlert,
    Cpu,
    Activity,
    Users,
    Settings,
    ChevronDown,
    ChevronUp,
    Sun,
    Moon,
    Mail
} from "lucide-react";
import { useSecurity } from "../context/SecurityContext";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const { activeUsers, alert } = useSecurity();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPersonnelOpen, setIsPersonnelOpen] = useState(false);

    // Responsive check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { label: "DASHBOARD", to: "/", icon: Home },
        { label: "MARKETPLACE", to: "/marketplace", icon: DollarSign },
        { label: "FIRMAMENT", to: "http://localhost:5173/firmament", icon: Globe },
        { label: "ENGINE BUILDER", to: "/builder", icon: Layers },
        { label: "SIMULATION", to: "/sim", icon: Activity },
        { label: "MAIL", to: "/mail", icon: Mail },
        { label: "NS HALO", to: "/os-ideation", icon: Cpu },
        { label: "JOURNAL", to: "/journal", icon: BookLock },
        { label: "TIMELINE", to: "/timeline", icon: Clock },
        { label: "VISUALIZER", to: "/visualizer", icon: Eye },
        { label: "DOCUMENTS", to: "/docs", icon: FileText },
        { label: "INVESTORS", to: "/investors", icon: Layers },
        { label: "DREAMS & NIGHTMARES", to: "/dreams", icon: Trophy },
        { label: "ADMIN PORTAL", to: "/admin", icon: Settings },
        { label: "NORTHFIELD SITE", to: "http://localhost:5173", icon: Globe },
    ];

    // Sanctum Styling Constants - Theme Aware
    const themeColor = "text-brand";
    const themeBg = "bg-brand/10";
    const themeBorder = "border-brand/20";
    const themeHover = "hover:bg-brand/10 hover:text-brand";

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-bg/90 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-text-sub hover:text-text">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                    <span className="font-bold text-text tracking-tight font-mono">SANCTUM</span>
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                className={`fixed top-0 left-0 h-full w-64 bg-bg border-r border-border z-50 flex flex-col shadow-2xl transition-all duration-300 lg:translate-x-0 font-mono`}
                animate={{ x: (isMobile && !isOpen) ? -320 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Brand Header */}
                <div className={`p-6 border-b border-border`}>
                    <Link to="/" className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-2xl font-bold tracking-wider mb-1 group-hover:opacity-80 transition-opacity ${themeColor}`}
                        >
                            SANCTUM
                        </motion.div>
                        <div className="text-[10px] text-text-sub uppercase tracking-[0.2em] group-hover:text-text transition-colors">
                            Operations Interface
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                    {navItems.map((item) => {
                        const isExternal = item.to.startsWith('http');
                        const commonClasses = `
                                flex items-center gap-3 px-3 py-3 rounded text-xs font-bold tracking-widest transition-all duration-200 group uppercase
                                ${item.label === "OS PROSPECTUS"
                                ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 shadow-[0_0_10px_rgba(212,175,55,0.2)] mt-4 mb-2"
                                : item.label === "NORTHFIELD SITE"
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 mt-4"
                                    : `text-text-sub ${themeHover} border border-transparent`
                            }
                            `;

                        if (isExternal) {
                            return (
                                <a
                                    key={item.to}
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={commonClasses}
                                >
                                    <item.icon size={16} className="opacity-70 group-hover:opacity-100" />
                                    <span>{item.label}</span>
                                </a>
                            );
                        }

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-3 rounded text-xs font-bold tracking-widest transition-all duration-200 group uppercase
                                ${item.label === "OS PROSPECTUS"
                                        ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/20 shadow-[0_0_10px_rgba(212,175,55,0.2)] mt-4 mb-2"
                                        : isActive
                                            ? `${themeBg} ${themeColor} border ${themeBorder}`
                                            : `text-text-sub ${themeHover} border border-transparent`
                                    }
                            `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={16} className={isActive ? "" : "opacity-70 group-hover:opacity-100"} />
                                        <span>{item.label}</span>
                                        {isActive && item.label !== "NS HALO" && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="ml-auto w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--c-brand)]"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>



                {/* Security & Presence Widget */}
                <div className="p-4 border-t border-border bg-surface/50">
                    {/* Active Personnel (Ubiquitous) */}
                    <div className="mb-4">
                        <div
                            onClick={() => setIsPersonnelOpen(!isPersonnelOpen)}
                            className="flex items-center justify-between cursor-pointer group mb-2 select-none"
                        >
                            <div className="flex items-center gap-2 text-text-sub group-hover:text-text transition-colors">
                                <Users size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Active Operators</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-brand">{activeUsers.filter(u => u.status === 'ONLINE').length}</span>
                                {isPersonnelOpen ? <ChevronDown size={12} className="text-text-sub" /> : <ChevronUp size={12} className="text-text-sub" />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {isPersonnelOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-1 pl-1 border-l border-border ml-1.5">
                                        {activeUsers.filter(u => u.status === 'ONLINE').map(u => (
                                            <div
                                                key={u.id}
                                                onClick={() => navigate('/engine/IDN')}
                                                className="flex items-center gap-2 p-1.5 rounded hover:bg-brand/10 cursor-pointer group/user transition-colors"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-sm bg-brand shadow-[0_0_5px_var(--c-brand)]" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[10px] font-bold text-text-sub group-hover/user:text-text truncate transition-colors">{u.name}</div>
                                                    <div className="text-[8px] text-text-sub opacity-50 truncate uppercase font-mono">{u.role}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Alert Area */}
                    <AnimatePresence>
                        {alert && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-3 bg-red-500/10 border border-red-500/20 p-2 rounded overflow-hidden"
                            >
                                <div className="flex items-center gap-2 text-red-400 mb-1">
                                    <ShieldAlert size={12} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Security Alert</span>
                                </div>
                                <div className="text-[10px] text-text-sub leading-tight">
                                    {alert.message}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User / Footer */}
                <div className="p-4 border-t border-border bg-surface/30">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3 p-2 rounded hover:bg-brand/10 transition-colors cursor-pointer group">
                            <div className={`w-8 h-8 rounded bg-brand/10 border border-brand/30 flex items-center justify-center text-xs font-bold text-brand`}>
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-text truncate">{user.email}</div>
                                <div className="text-[10px] text-text-sub truncate uppercase tracking-wider">{user.role || 'Member'}</div>
                            </div>
                            <button onClick={logout} className="p-1.5 text-text-sub hover:text-red-400 transition-colors">
                                <LogOut size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link to="/login" className="flex items-center justify-center px-4 py-2 rounded border border-border text-xs font-bold text-text-sub hover:bg-brand/10 hover:text-text hover:border-text transition-all uppercase tracking-wider">
                                Log In
                            </Link>
                        </div>
                    )}
                </div>

                {/* Theme Toggle & Footer */}
                <div className="px-4 pb-4 bg-surface/30 flex justify-center relative z-50">
                    <button
                        onClick={() => {
                            console.log("Toggling theme");
                            toggleTheme();
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface hover:bg-surface/80 text-xs text-text-sub hover:text-text transition-all border border-border hover:border-text-sub/30"
                    >
                        {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </button>
                </div>
            </motion.aside >
        </>
    );
}
