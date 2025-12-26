import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
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
    Eye
} from "lucide-react";

export default function Sidebar() {
    const location = useLocation();
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

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        { label: "DASHBOARD", to: "/", icon: Home },
        { label: "MARKETPLACE", to: "/marketplace", icon: DollarSign },
        { label: "TIMELINE", to: "/timeline", icon: Clock },
        { label: "VISUALIZER", to: "/visualizer", icon: Eye },
        { label: "DOCUMENTS", to: "/docs", icon: FileText },
    ];

    // Sanctum Styling Constants
    const themeColor = "text-[#00ff9d]";
    const themeBg = "bg-[#00ff9d]/10";
    const themeBorder = "border-[#00ff9d]/20";
    const themeHover = "hover:bg-[#00ff9d]/10 hover:text-[#00ff9d]";

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-white/70 hover:text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                    <span className="font-bold text-white tracking-tight font-mono">SANCTUM</span>
                </div>
                {isAuthenticated && (
                    <div className="w-8 h-8 rounded-full bg-[#00ff9d]/20 border border-[#00ff9d]/50 flex items-center justify-center text-xs font-bold text-[#00ff9d]">
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
                className={`fixed top-0 left-0 h-full w-64 bg-[#050505] border-r ${themeBorder} z-50 flex flex-col shadow-2xl transition-all duration-300 lg:translate-x-0 font-mono`}
                animate={{ x: (isMobile && !isOpen) ? -320 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Brand Header */}
                <div className={`p-6 border-b ${themeBorder}`}>
                    <Link to="/" className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-2xl font-bold tracking-wider mb-1 group-hover:opacity-80 transition-opacity ${themeColor}`}
                        >
                            SANCTUM
                        </motion.div>
                        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                            Operations Interface
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-3 rounded text-xs font-bold tracking-widest transition-all duration-200 group uppercase
                                ${isActive
                                    ? `${themeBg} ${themeColor} border ${themeBorder}`
                                    : `text-white/40 ${themeHover} border border-transparent`
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={16} className={isActive ? "" : "opacity-70 group-hover:opacity-100"} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* User / Footer */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className={`w-8 h-8 rounded bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center text-xs font-bold text-[#00ff9d]`}>
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-white truncate">{user.email}</div>
                                <div className="text-[10px] text-white/40 truncate uppercase tracking-wider">{user.role || 'Member'}</div>
                            </div>
                            <button onClick={logout} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                                <LogOut size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link to="/login" className="flex items-center justify-center px-4 py-2 rounded border border-white/10 text-xs font-bold text-white/60 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider">
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    );
}
