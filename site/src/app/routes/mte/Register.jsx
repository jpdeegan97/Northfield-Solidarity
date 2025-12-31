import React, { useState } from 'react';
import Layout from "../../../components/Layout.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    MapPin,
    School,
    ArrowRight,
    CheckCircle2,
    Target,
    Shield,
    ChevronRight,
    Loader2,
    Brain
} from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        district: '',
        grade: '11th', // Default
        goals: []
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleGoal = (goal) => {
        setFormData(prev => {
            const exists = prev.goals.includes(goal);
            return {
                ...prev,
                goals: exists
                    ? prev.goals.filter(g => g !== goal)
                    : [...prev.goals, goal]
            };
        });
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        // Navigate or show success
        navigate('/mte/status', { state: { justRegistered: true } });
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
                    { label: "Back to Home", to: "/", icon: ArrowRight },
                ]}
            >
                <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl">

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <div
                                className="h-full bg-[#c084fc] transition-all duration-500 ease-out"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex justify-between items-center mb-8 text-xs font-mono uppercase tracking-widest text-white/40">
                            <span>Step {step} of 3</span>
                            <span>{step === 1 ? "Identity" : step === 2 ? "Origin" : "Alignment"}</span>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-white mb-2">Protocol Initialization</h1>
                            <p className="text-[#d8b4fe]/60">Begin your journey towards educational abundance.</p>
                        </div>

                        {/* Form Content */}
                        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

                            {/* STEP 1: IDENTITY */}
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all"
                                                    placeholder="Alex"
                                                    value={formData.firstName}
                                                    onChange={e => handleInputChange('firstName', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-white/60">Last Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all"
                                                    placeholder="Sterling"
                                                    value={formData.lastName}
                                                    onChange={e => handleInputChange('lastName', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/60">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all"
                                                placeholder="alex@example.com"
                                                value={formData.email}
                                                onChange={e => handleInputChange('email', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/60">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                                            <input
                                                type="password"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={e => handleInputChange('password', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: ORIGIN */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="p-6 bg-[#c084fc]/10 rounded-xl border border-[#c084fc]/30 mb-6">
                                        <div className="flex gap-3">
                                            <School className="text-[#c084fc] shrink-0" size={24} />
                                            <div>
                                                <h3 className="text-white font-bold mb-1">Contextual Baseline</h3>
                                                <p className="text-white/60 text-sm">We use your district data to benchmark your performance against environmental averages.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/60">School District / Zip Code</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all"
                                                placeholder="e.g. Northfield Public Schools"
                                                value={formData.district}
                                                onChange={e => handleInputChange('district', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/60">Current Grade Level</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-[#c084fc] focus:bg-white/10 outline-none transition-all appearance-none"
                                            value={formData.grade}
                                            onChange={e => handleInputChange('grade', e.target.value)}
                                        >
                                            <option value="9th">9th Grade (Freshman)</option>
                                            <option value="10th">10th Grade (Sophomore)</option>
                                            <option value="11th">11th Grade (Junior)</option>
                                            <option value="12th">12th Grade (Senior)</option>
                                            <option value="University">University / Collegiate</option>
                                            <option value="Adult">Adult Learner</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: ALIGNMENT */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h3 className="text-white font-bold text-center mb-4">Select Primary Directives</h3>

                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { id: 'financial', label: 'Financial Sovereignty', icon: Target, desc: "Understanding money, debt, and leverage." },
                                            { id: 'systems', label: 'Systems Thinking', icon: Shield, desc: "Learning to map and navigate complex organizations." },
                                            { id: 'leadership', label: 'Executive Function', icon: Brain, desc: "Optimizing personal cognition and decision making." }
                                        ].map(goal => (
                                            <div
                                                key={goal.id}
                                                onClick={() => toggleGoal(goal.id)}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 group ${formData.goals.includes(goal.id)
                                                    ? 'bg-[#c084fc] border-[#c084fc] text-black'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg ${formData.goals.includes(goal.id) ? 'bg-black/20 text-black' : 'bg-white/10 text-white'
                                                    }`}>
                                                    <goal.icon size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold">{goal.label}</h4>
                                                    <p className={`text-xs ${formData.goals.includes(goal.id) ? 'text-black/70' : 'text-white/50'
                                                        }`}>{goal.desc}</p>
                                                </div>
                                                {formData.goals.includes(goal.id) && <CheckCircle2 size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Controls */}
                            <div className="mt-10 flex gap-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex-1 py-4 rounded-xl font-bold bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 rounded-xl font-bold bg-[#c084fc] text-black hover:bg-[#b45309] transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c084fc]/20"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} /> Initializing...
                                        </>
                                    ) : (
                                        step === 3 ? "Initialize Protocol" : <>Next Step <ChevronRight size={18} /></>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
