import React, { useState } from 'react';
import Layout from "../../../components/Layout.jsx";
import {
    School,
    BarChart3,
    Map,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    LayoutDashboard,
    History,
    FileText,
    Library,
    Brain,
    Home,
    Search,
    Target
} from "lucide-react";

export default function StudentAnalyzer() {
    // Simulating logged-in state. In production, check auth context.
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [view, setView] = useState('profile'); // 'profile' or 'search'
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    // Mock User Data
    const STUDENT_PROFILE = {
        name: "Alex Sterling",
        id: "MTE-8842",
        district: "Northfield Public Schools",
        grade: "11th",
        stats: {
            math: 88, // Student score
            reading: 92,
            readiness: 85
        },
        districtStats: {
            spendingPerStudent: 16200,
            nationalAverage: 12600,
            proficiencyMath: 48, // District avg
            proficiencyReading: 52,
            mteGap: "High"
        }
    };

    const handleAnalyze = (e) => {
        e.preventDefault();
        setAnalyzing(true);
        // Mock analysis delay
        setTimeout(() => {
            setAnalyzing(false);
            setSearchResult({
                district: selectedDistrict || "Searched District",
                state: "Minnesota",
                spendingPerStudent: 15500,
                nationalAverage: 12600,
                spendingGrade: "B+",
                proficiencyMath: 55,
                proficiencyReading: 60,
                collegeReadiness: 48,
                mteGap: "Moderate",
                realEstateValue: "+5.2% YoY",
                incomeMedian: 68000
            });
        }, 1500);
    };

    return (
        <div data-theme="amethyst">
            <Layout
                brand={{
                    title: "More Than Enough",
                    tagline: "Education for abundance.",
                    footerLine: "MTE • Educational Systems",
                    footerNote: "Abundance is a system.",
                }}
                nav={[
                    { label: "Dashboard", to: "/mte", icon: LayoutDashboard },
                    { label: "Student Analyzer", to: "/mte/analyzer", icon: School, active: true },
                    { label: "Session Log", to: "/mte/history", icon: History },
                    { type: "divider" },
                    { label: "The Codex", to: "/mte/codex", icon: Library },
                    { label: "Blueprints", to: "/mte/blueprints", icon: FileText },
                    { type: "divider" },
                    { label: "Cognition Status", to: "/mte/status", icon: Brain },
                    { type: "divider" },
                    { label: "Northfield Solidarity", to: "/" },
                    { label: "South Lawn", to: "/southlawn" },
                    { label: "Wall Street Pro", to: "/wsp" },
                    { label: "More Than Enough", to: "/mte" },
                    { label: "Iron Logic", to: "/iron" },
                ]}
            >
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <header className="mb-8 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 text-[#d8b4fe] mb-2 uppercase tracking-widest text-sm font-mono font-bold">
                                <School size={16} />
                                <span>Contextual Intelligence</span>
                            </div>
                            <h1 className="text-4xl font-black text-white mb-2">Student Analyzer</h1>
                            <p className="text-[#d8b4fe]/60 text-lg max-w-2xl">
                                {view === 'profile'
                                    ? `Welcome back, ${STUDENT_PROFILE.name}. Here is your environmental baseline.`
                                    : "Compare your local educational inputs against global standards."}
                            </p>
                        </div>

                        {/* View Toggles */}
                        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => setView('profile')}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'profile' ? 'bg-[#c084fc] text-black shadow-lg shadow-[#c084fc]/20' : 'text-white/60 hover:text-white'}`}
                            >
                                My Profile
                            </button>
                            <button
                                onClick={() => setView('search')}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'search' ? 'bg-[#c084fc] text-black shadow-lg shadow-[#c084fc]/20' : 'text-white/60 hover:text-white'}`}
                            >
                                District Search
                            </button>
                        </div>
                    </header>

                    {view === 'profile' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Profile Header Card */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-[#c084fc]/20 flex items-center justify-center border-2 border-[#c084fc]">
                                        <span className="text-3xl font-black text-[#c084fc]">AS</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{STUDENT_PROFILE.name}</h2>
                                        <div className="flex items-center gap-2 text-white/50 font-mono text-sm">
                                            <span>{STUDENT_PROFILE.id}</span>
                                            <span>•</span>
                                            <span>{STUDENT_PROFILE.district}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white/40 uppercase tracking-widest mb-1">MTE Status</div>
                                    <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full">
                                        <CheckCircle2 size={16} /> Active Scholar
                                    </div>
                                </div>
                            </div>

                            {/* Personal Stats Grid */}
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    {/* Personal vs District Chart */}
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white mb-6">Local vs. Personal Performance</h3>
                                        <div className="space-y-8">
                                            {[
                                                { label: "Math Proficiency", student: STUDENT_PROFILE.stats.math, district: STUDENT_PROFILE.districtStats.proficiencyMath },
                                                { label: "Reading Proficiency", student: STUDENT_PROFILE.stats.reading, district: STUDENT_PROFILE.districtStats.proficiencyReading },
                                            ].map(stat => (
                                                <div key={stat.label}>
                                                    <div className="flex justify-between text-sm mb-3">
                                                        <span className="text-white/70 font-bold">{stat.label}</span>
                                                    </div>

                                                    {/* District Bar */}
                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs text-white/40 mb-1">
                                                            <span>District Avg</span>
                                                            <span>{stat.district}%</span>
                                                        </div>
                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-white/30" style={{ width: `${stat.district}%` }}></div>
                                                        </div>
                                                    </div>

                                                    {/* Student Bar */}
                                                    <div>
                                                        <div className="flex justify-between text-xs text-[#c084fc] mb-1 font-bold">
                                                            <span>Your Score</span>
                                                            <span>{stat.student}%</span>
                                                        </div>
                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-[#c084fc]" style={{ width: `${stat.student}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Environmental Context */}
                                    <div className="p-8 bg-[#c084fc]/5 border border-[#c084fc]/20 rounded-2xl relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-white mb-2">Environmental Drag</h3>
                                            <p className="text-white/60 text-sm mb-6">
                                                Your district spends <span className="text-white font-bold">${STUDENT_PROFILE.districtStats.spendingPerStudent.toLocaleString()}</span> per student, yet achieves only <span className="text-white font-bold">{STUDENT_PROFILE.districtStats.proficiencyMath}%</span> math proficiency.
                                            </p>
                                            <div className="flex items-start gap-4 p-4 bg-black/20 rounded-xl border border-[#c084fc]/20">
                                                <Target className="text-[#c084fc] shrink-0" size={24} />
                                                <div>
                                                    <h4 className="font-bold text-white text-sm">Outperformance Detected</h4>
                                                    <p className="text-xs text-white/50 mt-1">
                                                        You are outperforming your local environment by <span className="text-[#c084fc] font-bold">+{STUDENT_PROFILE.stats.math - STUDENT_PROFILE.districtStats.proficiencyMath}%</span>. Maintain MTE protocol to prevent regression to the mean.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Benchmarks */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
                                            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">System Rank</div>
                                            <div className="text-4xl font-black text-white">Top 5%</div>
                                        </div>
                                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
                                            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Cognitive Leverage</div>
                                            <div className="text-4xl font-black text-[#c084fc]">3.2x</div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white mb-4">Recommended Actions</h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4 text-white/70 bg-black/20 p-4 rounded-lg border border-white/5 hover:border-[#c084fc]/50 transition-colors cursor-pointer group">
                                                <div className="p-2 bg-white/5 rounded group-hover:bg-[#c084fc] group-hover:text-black transition-colors">
                                                    <Search size={16} />
                                                </div>
                                                <span className="text-sm">Explore neighboring district efficiently metrics</span>
                                            </li>
                                            <li className="flex items-center gap-4 text-white/70 bg-black/20 p-4 rounded-lg border border-white/5 hover:border-[#c084fc]/50 transition-colors cursor-pointer group">
                                                <div className="p-2 bg-white/5 rounded group-hover:bg-[#c084fc] group-hover:text-black transition-colors">
                                                    <Brain size={16} />
                                                </div>
                                                <span className="text-sm">Complete "Game Theory" module to increase leverage</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* SEARCH VIEW */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Input Section */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
                                <form onSubmit={handleAnalyze} className="max-w-2xl">
                                    <label className="block text-sm font-medium text-white/80 mb-3">
                                        Enter School District or Zip Code
                                    </label>
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. 55057 or Northfield"
                                                value={selectedDistrict}
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#c084fc] transition-colors"
                                            />
                                            <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={20} />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={analyzing}
                                            className="px-8 py-4 bg-[#c084fc] text-black font-bold rounded-xl hover:bg-[#b45309] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {analyzing ? (
                                                <>
                                                    <span className="animate-spin">⟳</span> Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Search size={20} /> Run Analysis
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Results Section (Same as before, mapped to searchResult) */}
                            {searchResult && (
                                <div className="space-y-8">
                                    {/* High Level Stats for Search */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-[#c084fc]/10 border border-[#c084fc]/30 rounded-xl">
                                            <div className="flex items-center gap-3 mb-2 text-[#c084fc]">
                                                <Target size={20} />
                                                <span className="font-mono text-sm uppercase tracking-wide">MTE GAP</span>
                                            </div>
                                            <div className="text-4xl font-black text-white mb-1">{searchResult.mteGap.toUpperCase()}</div>
                                            <p className="text-xs text-white/50">
                                                Significant disparity between local outputs and MTE capability targets.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="flex items-center gap-3 mb-2 text-white/60">
                                                <TrendingUp size={20} />
                                                <span className="font-mono text-sm uppercase tracking-wide">Investment</span>
                                            </div>
                                            <div className="text-4xl font-black text-white mb-1">${searchResult.spendingPerStudent.toLocaleString()}</div>
                                            <p className="text-xs text-white/50">
                                                Per pupil spending. {((searchResult.spendingPerStudent - searchResult.nationalAverage) / searchResult.nationalAverage * 100).toFixed(1)}% vs National Avg.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="flex items-center gap-3 mb-2 text-white/60">
                                                <BarChart3 size={20} />
                                                <span className="font-mono text-sm uppercase tracking-wide">Proficiency</span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <div className="text-4xl font-black text-white mb-1">{searchResult.proficiencyMath}%</div>
                                                <span className="text-sm text-white/40">Math</span>
                                            </div>
                                            <p className="text-xs text-white/50">
                                                District math proficiency rate.
                                            </p>
                                        </div>
                                    </div>
                                    {/* ... Detailed Search Analysis ... */}
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                                        <h3 className="text-xl font-bold text-white mb-6">Strategic Analysis for {searchResult.district}</h3>
                                        <div className="space-y-4">
                                            <div className="flex gap-4 items-start">
                                                <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0 mt-1">
                                                    <AlertTriangle size={16} className="text-yellow-500" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">Output Mismatch</h4>
                                                    <p className="text-white/60 text-sm mt-1">
                                                        While spending is rated {searchResult.spendingGrade}, academic yields are disproportionately lower.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
