import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight,
    Shield,
    FileText,
    Layers,
    Cpu,
    Globe
} from 'lucide-react';

export default function Footer({ brand }) {
    const location = useLocation();

    // Brand logic (mirrored from Sidebar but simplified for footer context)
    const activeBrand = brand || {
        title: "Northfield Solidarity",
        tagline: "Systems that flow."
    };

    // Theme logic
    const isGreen = location.pathname.startsWith("/southlawn");
    const isGold = location.pathname.startsWith("/wsp");

    const themeColor = isGreen ? "text-green-500" : isGold ? "text-amber-500" : "text-brand";
    const themeHover = isGreen ? "hover:text-green-400" : isGold ? "hover:text-amber-400" : "hover:text-brand";
    const buttonBg = isGreen ? "bg-green-600 hover:bg-green-500" : isGold ? "bg-amber-600 hover:bg-amber-500" : "bg-brand hover:bg-brand/90";

    const FOOTER_LINKS = [
        {
            title: "Platform",
            links: [
                { label: "Engine Architecture", to: "/system" },
                { label: "Marketplace", to: "/marketplace" },
                { label: "Documentation", to: "/docs" },
                { label: "Status", to: "/status" }, // Placeholder
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", to: "/about" }, // Placeholder
                { label: "Ascension (Careers)", to: "/careers" },
                { label: "Contact", to: "/contact" },
                { label: "Investors", to: "/investors" },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
                { label: "Security", to: "/security" },
            ]
        }
    ];

    return (
        <footer className="border-t border-white/10 bg-[#0f172a] pt-16 pb-8 relative overflow-hidden">
            {/* Ambient Background */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] rounded-[100%] blur-[120px] opacity-5 pointer-events-none ${isGreen ? 'bg-green-500' : isGold ? 'bg-amber-500' : 'bg-blue-500'}`} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="inline-block group">
                            <h2 className={`text-2xl font-bold tracking-tight ${themeColor}`}>
                                {activeBrand.title.toUpperCase()}
                            </h2>
                            <p className="text-sm text-slate-400 font-medium tracking-wide mt-1 group-hover:text-white transition-colors">
                                {activeBrand.tagline}
                            </p>
                        </Link>

                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            Building the operating system for the next generation of cooperative enterprise.
                            Scalable, secure, and sovereign.
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-4">
                            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title} className="lg:col-span-1">
                            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{group.title}</h3>
                            <ul className="space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className={`text-sm text-slate-500 transition-colors ${themeHover}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Stay Synced</h3>
                        <div className="flex flex-col gap-4">
                            <p className="text-xs text-slate-500">
                                Get system updates and intelligence reports directly to your inbox.
                            </p>
                            <form className="relative" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/20 transition-all"
                                />
                                <button
                                    type="submit"
                                    className={`absolute right-1 top-1 p-1.5 rounded-md text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${buttonBg}`}
                                >
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-6">
                        <span>&copy; {new Date().getFullYear()} Northfield Solidarity LLC. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-6 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-slate-500">SYSTEM NORMAL</span>
                        </div>
                        <span>v2.4.0-alpha</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
