import React, { useState, useEffect } from 'react';
import { Flame, Target, Shield, FileText, CheckCircle, AlertTriangle, Users, MessageSquare, ArrowRight, Activity, Globe, Lock, Brain, Zap, TrendingUp, Search, X, Plus, PieChart, Layers } from 'lucide-react';

const Sparkline = ({ data, color = "#f97316" }) => {
    const max = Math.max(...data);
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 60},${20 - (d / max) * 20}`).join(' ');

    return (
        <svg width="60" height="20" className="overflow-visible">
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="60" cy={20 - (data[data.length - 1] / max) * 20} r="2" fill={color} className="animate-pulse" />
        </svg>
    );
};

// --- ENHANCEMENT: Scoring Logic Viz ---
const ScoreBreakdownPie = ({ score }) => {
    // Deterministic breakdown based on the score to keep it consistent but dynamic
    const marketFit = Math.min(40, Math.floor(score * 0.45));
    const intent = Math.min(30, Math.floor(score * 0.35));
    const urgency = score - marketFit - intent;

    // Calculations for dash arrays (circumference approx 251 for r=40)
    // using viewBox 0 0 100 100, r=40, C=251.3
    const C = 251.2;
    const off1 = 0; // Start
    const off2 = C * (marketFit / 100);
    const off3 = C * ((marketFit + intent) / 100);

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Rotating Outer Ring for aesthetic */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] border-t-orange-500/30"></div>

            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background Circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="10" opacity="0.2" />

                {/* Segments */}
                {/* Market Fit - Blue */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="10"
                    strokeDasharray={`${C * (marketFit / 100)} ${C}`} strokeDashoffset={0}
                    className="transition-all duration-1000 ease-out" />

                {/* Intent - Orange */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="10"
                    strokeDasharray={`${C * (intent / 100)} ${C}`} strokeDashoffset={-off2}
                    className="transition-all duration-1000 ease-out" />

                {/* Urgency - Green */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10"
                    strokeDasharray={`${C * (urgency / 100)} ${C}`} strokeDashoffset={-off3}
                    className="transition-all duration-1000 ease-out" />
            </svg>

            {/* Center Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white tracking-tighter">{score}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Total Score</span>
            </div>

            {/* Floating Labels (Visual only) */}
            <div className="absolute -right-4 top-10 flex flex-col items-start">
                <div className="h-[1px] w-8 bg-blue-500 mb-1"></div>
                <span className="text-[10px] text-blue-400 font-bold uppercase">Market Fit {marketFit}%</span>
            </div>
            <div className="absolute -left-4 bottom-10 flex flex-col items-end">
                <div className="h-[1px] w-8 bg-orange-500 mb-1"></div>
                <span className="text-[10px] text-orange-400 font-bold uppercase">Intent {intent}%</span>
            </div>
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 flex flex-col items-center">
                <div className="h-4 w-[1px] bg-emerald-500 mb-1"></div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Urgency {urgency}%</span>
            </div>
        </div>
    );
};

export default function HPView() {
    // Lead Data State
    const [leads, setLeads] = useState([
        {
            id: 1,
            name: 'Apex Logistics',
            industry: 'Supply Chain',
            signal: 'Expansion + Hiring',
            score: 92,
            status: 'HOT',
            history: [40, 50, 65, 80, 85, 92],
            competitors: ['DHL', 'FedEx', 'Maersk'],
            news: ['Q3 Revenue up 15%', 'New hub opening in Denver', 'CTO stepped down'],
            decisionMakers: [
                { name: 'Sarah Jenkins', role: 'VP Ops', type: 'Economic Buyer', strength: 80 },
                { name: 'Mike Ross', role: 'Dir. Logistics', type: 'Champion', strength: 95 }
            ]
        },
        {
            id: 2,
            name: 'Novus Health',
            industry: 'MedTech',
            signal: 'Series B Funding',
            score: 88,
            status: 'WARM',
            history: [60, 62, 58, 70, 82, 88],
            competitors: ['UnitedHealth', 'Oscar', 'Clover'],
            news: ['Raised $40M Series B', 'FDA approval pending', 'Hiring Head of Sales'],
            decisionMakers: [
                { name: 'Dr. A. Patel', role: 'CMO', type: 'Technical Buyer', strength: 40 },
                { name: 'Lisa Wu', role: 'CEO', type: 'Economic Buyer', strength: 60 }
            ]
        },
        {
            id: 3,
            name: 'Terra Construction',
            industry: 'Real Estate',
            signal: 'New Permit Filing',
            score: 76,
            status: 'COLD',
            history: [70, 72, 72, 74, 75, 76],
            competitors: ['Bechtel', 'Fluor', 'Turner'],
            news: ['Permit filed for 50-story tower', 'Union negotiations ongoing'],
            decisionMakers: [
                { name: 'Tom Hardy', role: 'Proj. Mgr', type: 'User', strength: 20 }
            ]
        },
    ]);

    const [selectedLeadId, setSelectedLeadId] = useState(1);
    const [viewMode, setViewMode] = useState('BRIEF'); // BRIEF | CWP
    const [generatedIcebreakers, setGeneratedIcebreakers] = useState(null);
    const [notes, setNotes] = useState("");

    // Hover State for Overlay Analysis
    const [hoveredLeadId, setHoveredLeadId] = useState(null);

    // Ingest Modal State
    const [isIngestOpen, setIsIngestOpen] = useState(false);
    const [newLeadData, setNewLeadData] = useState({ name: '', industry: '', signal: '' });

    const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];
    const hoveredLead = leads.find(l => l.id === hoveredLeadId);

    useEffect(() => {
        document.title = "Hot Potato | Intel";
    }, []);

    // Logic
    const generateIcebreakers = () => {
        setGeneratedIcebreakers([
            { type: "Flattery", text: `Huge congrats on the Q3 numbers, ${activeLead.name} is consistently outpacing...` },
            { type: "Observation", text: `I noticed the new hub in Denver; typically that signals a need for...` },
            { type: "Challenge", text: `Curious how you're handling the capacity crunch given the recent expansion?` }
        ]);
    };

    const handleSelectLead = (id) => {
        setSelectedLeadId(id);
        setGeneratedIcebreakers(null);
        setNotes("");
    }

    const handleIngest = (e) => {
        e.preventDefault();
        console.log("Submitting new ingest...");

        const generateTrend = () => {
            const arr = [40 + Math.random() * 20];
            for (let i = 0; i < 5; i++) {
                arr.push(arr[i] + Math.random() * 15 - 2);
            }
            return arr;
        };

        const newLead = {
            id: leads.length + 1,
            name: newLeadData.name,
            industry: newLeadData.industry,
            signal: newLeadData.signal,
            score: Math.floor(Math.random() * (99 - 70) + 70),
            status: 'NEW',
            history: generateTrend(),
            competitors: ['Incumbent Corp', 'Global Dynamics', 'Acme Systems'],
            news: [
                `Speculation about acquisition by ${newLeadData.industry} giant`,
                'Internal memo leaked regarding restructuring',
                'Stock price up 5% following announcement'
            ],
            decisionMakers: [
                { name: 'Unknown User', role: 'Director', type: 'Champion', strength: 50 }
            ]
        };
        setLeads([...leads, newLead]);
        setNewLeadData({ name: '', industry: '', signal: '' });
        setIsIngestOpen(false);
        handleSelectLead(newLead.id);
    };

    return (
        <div className="h-full w-full bg-[#0f0a05] text-[#e0deda] p-8 font-sans flex flex-col overflow-hidden relative">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-orange-500/20 pb-6 shrink-0 z-[60] relative pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    {/* Header content interacting normally */}
                    <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                        <Flame className="text-orange-500" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">HOT POTATO</h1>
                        <p className="text-xs text-orange-400/60 uppercase tracking-widest mt-1 flex items-center gap-2">
                            <Brain size={12} /> AI-Powered Lead Intelligence
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-6 pointer-events-auto">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white flex items-center justify-end gap-2">
                            <Activity size={18} className="text-emerald-500" /> 95%
                        </div>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider">Validity Score</div>
                    </div>
                    <button
                        onClick={() => setIsIngestOpen(true)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase rounded shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all flex items-center gap-2"
                    >
                        <Plus size={14} /> New Ingest
                    </button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-12 gap-8 min-h-0 overflow-hidden relative z-0">

                {/* LEFT: Lead Queue (Z-Index Elevated to float above overlay) */}
                <div className="col-span-3 bg-[#1a1510] border border-white/5 rounded-xl overflow-hidden flex flex-col min-h-0 relative z-[70] shadow-2xl">
                    <div className="p-4 border-b border-white/5 bg-white/[0.02] shrink-0">
                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                            <Target size={14} /> Lead Queue
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto min-h-0 p-2 space-y-1">
                        {leads.map(lead => (
                            <div
                                key={lead.id}
                                onClick={() => handleSelectLead(lead.id)}
                                onMouseEnter={() => setHoveredLeadId(lead.id)}
                                onMouseLeave={() => setHoveredLeadId(null)}
                                className={`p-4 border-b border-white/5 rounded cursor-pointer transition-colors duration-200 group relative overflow-hidden
                                    ${selectedLeadId === lead.id ? 'bg-orange-500/10 border-l-2 border-orange-500' : 'border-l-2 border-transparent hover:bg-white/5'}
                                    ${hoveredLeadId && hoveredLeadId !== lead.id ? 'opacity-30 blur-[1px]' : 'opacity-100'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className={`text-sm font-bold ${selectedLeadId === lead.id ? 'text-white' : 'text-white/70'}`}>{lead.name}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${lead.score > 90 ? 'bg-orange-500/20 text-orange-400' : 'bg-white/10 text-white/40'}`}>
                                        {lead.score}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end relative z-10">
                                    <div className="text-xs text-white/40">{lead.industry}</div>
                                    <Sparkline data={lead.history} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- FULL PAGE ANALYTICS OVERLAY --- */}
                {hoveredLead && (
                    <div className="absolute inset-0 z-[60] bg-[#050505]/95 backdrop-blur-2xl animate-in fade-in duration-300 pointer-events-none flex items-center justify-center pl-[25%]">
                        <div className="w-full max-w-6xl p-12 grid grid-cols-12 gap-12 items-center">

                            {/* CENTER PIECE: THE SCORE PIE */}
                            <div className="col-span-5 flex flex-col items-center justify-center">
                                <div className="scale-150 mb-12">
                                    <ScoreBreakdownPie score={hoveredLead.score} />
                                </div>
                                <div className="text-center space-y-4">
                                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{hoveredLead.name}</h2>
                                    <div className="flex justify-center gap-4">
                                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 font-mono">
                                            Signal: {hoveredLead.signal}
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-xs text-orange-400 font-bold animate-pulse">
                                            {hoveredLead.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: DEEP INFO GRID */}
                            <div className="col-span-7 grid grid-cols-2 gap-6">
                                {/* Card 1: Calculations */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <h4 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                                        <PieChart size={14} /> Score Composition
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-400 font-bold">Market Fit</span>
                                            <span className="text-white font-mono">45%</span>
                                        </div>
                                        <div className="text-[10px] text-white/40 leading-tight">
                                            High alignment with our ideal customer profile based on industry ({hoveredLead.industry}) and size.
                                        </div>

                                        <div className="h-[1px] bg-white/5 w-full"></div>

                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-orange-400 font-bold">Intent Signal</span>
                                            <span className="text-white font-mono">35%</span>
                                        </div>
                                        <div className="text-[10px] text-white/40 leading-tight">
                                            Detected key buying signals: "{hoveredLead.signal}" verified via news sources.
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: AI Insight */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                                    <h4 className="text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-2">
                                        <Brain size={14} /> Tactical Analysis
                                    </h4>
                                    <p className="text-sm text-white/80 leading-relaxed italic">
                                        "Competitor presence is low. The recent exec shuffle suggests a vulnerability in their current vendor relationships. Strike now."
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 flex-wrap">
                                        {['Exec Hire', 'Expansion', 'Budget Open'].map((tag, i) => (
                                            <span key={i} className="text-[9px] px-2 py-1 rounded border border-white/10 bg-black/20 text-white/50">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Card 3: Velocity */}
                                <div className="col-span-2 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 p-6 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-orange-400 uppercase mb-1">Deal Velocity</h4>
                                        <p className="text-2xl font-black text-white">72 <span className="text-sm font-normal text-white/50">Hours to Close Window</span></p>
                                    </div>
                                    <div className="h-12 w-[1px] bg-orange-500/30"></div>
                                    <div className="text-right">
                                        <h4 className="text-xs font-bold text-emerald-400 uppercase mb-1">Win Probability</h4>
                                        <p className="text-2xl font-black text-white">84%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* CENTER: Main Workbench (Lower Z-Index so it gets covered) */}
                <div className="col-span-6 flex flex-col gap-6 min-h-0 relative z-0">
                    {/* Tabs */}
                    <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-max shrink-0">
                        <button onClick={() => setViewMode('BRIEF')} className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all flex items-center gap-2 ${viewMode === 'BRIEF' ? 'bg-orange-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                            <Globe size={14} /> Intel Brief
                        </button>
                        <button onClick={() => setViewMode('CWP')} className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all flex items-center gap-2 ${viewMode === 'CWP' ? 'bg-orange-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                            <Zap size={14} /> CWP Playbook
                        </button>
                    </div>

                    <div className="flex-1 bg-[#1a1510] border border-white/5 rounded-xl p-6 overflow-y-auto min-h-0 relative">
                        {viewMode === 'BRIEF' ? (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">{activeLead.name}</h2>
                                        <p className="text-sm text-white/50">HQ: Austin, TX • 50-200 Employees</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="bg-emerald-900/20 border border-emerald-500/20 px-3 py-1 rounded text-[10px] text-emerald-400 font-mono flex items-center gap-2">
                                            <Shield size={12} /> VERIFIED
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-lg p-4">
                                    <h4 className="text-xs font-bold text-orange-300 uppercase mb-2 flex items-center gap-2">
                                        <Brain size={14} /> AI Synthesis
                                    </h4>
                                    <p className="text-sm text-white/80 leading-relaxed italic">
                                        "{activeLead.name} is entering a critical growth phase represented by their recent {activeLead.signal}. This signals a high probability of needing scalable infrastructure solutions within the next 30-60 days."
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <h4 className="text-xs font-bold text-white/50 uppercase mb-3 flex items-center gap-2">
                                            <Target size={14} /> Competitive Radar
                                        </h4>
                                        <ul className="space-y-2">
                                            {activeLead.competitors.map((comp, i) => (
                                                <li key={i} className="text-xs text-white/70 flex justify-between">
                                                    <span>{comp}</span>
                                                    <span className="text-white/30 text-[10px]">Tier 1</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                        <h4 className="text-xs font-bold text-white/50 uppercase mb-3 flex items-center gap-2">
                                            <FileText size={14} /> Latest Signals
                                        </h4>
                                        <ul className="space-y-2">
                                            {activeLead.news.map((news, i) => (
                                                <li key={i} className="text-[10px] text-white/60 truncate border-b border-dashed border-white/10 pb-1">
                                                    • {news}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                                    <h4 className="text-xs font-bold text-blue-400 uppercase mb-3 flex items-center gap-2">
                                        <Users size={14} /> Decision Matrix
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {activeLead.decisionMakers.length > 0 ? activeLead.decisionMakers.map((dm, i) => (
                                            <div key={i} className="p-3 bg-black/40 rounded border border-white/5 relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <div className="text-xs font-bold text-white">{dm.name}</div>
                                                    <div className="text-[10px] text-white/40">{dm.role}</div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">{dm.type}</span>
                                                        <span className="text-[9px] font-mono text-white/30">{dm.strength}% Rel.</span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 h-1 bg-blue-500/50 transition-all duration-1000" style={{ width: `${dm.strength}%` }} />
                                            </div>
                                        )) : (
                                            <div className="col-span-2 text-xs text-white/30 italic text-center py-4">No decision makers identified yet.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <TrendingUp size={16} /> Conversion Workflow Playbook
                                    </h3>
                                    <span className="text-[10px] font-mono text-white/30">CWP-ID: {activeLead.id}-XJ9</span>
                                </div>

                                <div className="bg-[#0a0a0a] border border-orange-500/30 p-4 rounded-lg mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-xs font-bold text-orange-400 flex items-center gap-2">
                                            <Zap size={14} /> Opening Hooks
                                        </h4>
                                        <button onClick={generateIcebreakers} className="text-[10px] bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 px-2 py-1 rounded transition-colors uppercase">
                                            Generate Options
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {generatedIcebreakers ? (
                                            generatedIcebreakers.map((opt, i) => (
                                                <div key={i} className="text-xs text-white/70 p-2 border border-white/5 rounded hover:bg-white/5 cursor-pointer flex gap-3">
                                                    <span className="text-[9px] font-bold text-white/30 uppercase w-16 shrink-0">{opt.type}:</span>
                                                    <span>"{opt.text}"</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-white/30 italic text-center py-2">Click generate to view AI-crafted openers based on intent data.</div>
                                        )}
                                    </div>
                                </div>

                                <div className="relative border-l border-white/10 ml-3 space-y-8 py-2">
                                    {[
                                        { day: 'Day 1', type: 'Email', title: 'Value-First Intro', status: 'DRAFT', tone: 'Helpful' },
                                        { day: 'Day 3', type: 'LinkedIn', title: 'Connection Request', status: 'LOCKED', tone: 'Casual' },
                                        { day: 'Day 5', type: 'Call', title: 'Discovery Validation', status: 'LOCKED', tone: 'Direct' },
                                    ].map((step, i) => (
                                        <div key={i} className="relative pl-8 group cursor-pointer">
                                            <div className={`absolute -left-[10px] top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${i === 0 ? 'bg-orange-500 border-orange-500 text-black' : 'bg-[#1a1510] border-white/20 text-white/30'}`}>
                                                {step.type === 'Email' ? <FileText size={10} /> : step.type === 'Call' ? <MessageSquare size={10} /> : <Globe size={10} />}
                                            </div>

                                            <div className="bg-white/5 border border-white/5 rounded p-3 hover:bg-white/10 hover:border-white/10 transition-all">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-mono text-white/50">{step.day} • {step.type}</span>
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${step.status === 'DRAFT' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-white/20'}`}>{step.status}</span>
                                                </div>
                                                <div className="text-sm font-bold text-white mb-2">
                                                    {step.title}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Action & Compliance */}
                <div className="col-span-3 flex flex-col gap-6 min-h-0 overflow-y-auto relative z-0">
                    <div className="bg-[#1a1510] border border-white/5 rounded-xl p-6">
                        <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-wider flex items-center gap-2">
                            <Lock size={14} /> Evidence Locker
                        </h4>
                        <div className="space-y-1">
                            {['SEC Filings (10-K)', 'LinkedIn Job Posts (4)', 'Press Release Archive'].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs p-2 bg-white/5 rounded border border-transparent hover:border-white/20 cursor-pointer group">
                                    <span className="text-white/70 group-hover:text-white transition-colors">{item}</span>
                                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-orange-400" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/70">Opt-Out Scrub</span>
                                <CheckCircle size={14} className="text-emerald-500" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-orange-400 bg-orange-500/10 p-2 rounded border border-orange-500/20">
                                <AlertTriangle size={14} />
                                <span>Risk: Medium (Sector Volatility)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1510] border border-white/5 rounded-xl p-4 flex flex-col">
                        <h4 className="text-xs font-bold text-white/50 uppercase mb-2 tracking-wider flex items-center gap-2">
                            <FileText size={14} /> Analyst Notes
                        </h4>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded p-2 text-xs text-white placeholder-white/20 outline-none focus:border-orange-500/50 min-h-[80px]"
                            placeholder="Add persistent session notes here..."
                        />
                    </div>

                    <div className="bg-[#1a1510] border border-white/5 rounded-xl p-6 flex flex-col justify-end">
                        <h4 className="text-xs font-bold text-white/50 uppercase mb-4 tracking-wider">Next Action</h4>
                        <p className="text-sm text-white/80 mb-6 leading-relaxed">
                            {viewMode === 'BRIEF'
                                ? "Brief is ready for review. Confirm evidence citations to generate CWP."
                                : "Step 1 (Email) draft requires approval before queuing."}
                        </p>

                        <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            {viewMode === 'BRIEF' ? <>Generate CWP <ArrowRight size={14} /></> : "Approve & Queue"}
                        </button>
                    </div>
                </div>

                {/* NEW INGEST MODAL */}
                {isIngestOpen && (
                    <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="w-full max-w-md bg-[#1a1510] border border-orange-500/30 rounded-xl shadow-[0_0_50px_rgba(234,88,12,0.15)] overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <Search size={16} className="text-orange-500" /> New Lead Ingest
                                </h3>
                                <button onClick={() => setIsIngestOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleIngest} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5">Company Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        required
                                        value={newLeadData.name}
                                        onChange={e => setNewLeadData({ ...newLeadData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded px-3 py-2 text-sm text-white placeholder-white/20 outline-none transition-all"
                                        placeholder="e.g. Acme Corp"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5">Industry Sector</label>
                                    <input
                                        type="text"
                                        required
                                        value={newLeadData.industry}
                                        onChange={e => setNewLeadData({ ...newLeadData, industry: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded px-3 py-2 text-sm text-white placeholder-white/20 outline-none transition-all"
                                        placeholder="e.g. Manufacturing"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5">Primary Signal</label>
                                    <input
                                        type="text"
                                        required
                                        value={newLeadData.signal}
                                        onChange={e => setNewLeadData({ ...newLeadData, signal: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded px-3 py-2 text-sm text-white placeholder-white/20 outline-none transition-all"
                                        placeholder="e.g. New CTO Hired"
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsIngestOpen(false)}
                                        className="flex-1 py-2.5 text-xs font-bold uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/30 rounded transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase rounded shadow-lg shadow-orange-900/20 transition-all"
                                    >
                                        Running Analysis...
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
