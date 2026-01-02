import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause, Save, FileText, Clock, Archive, MoreHorizontal, CheckCircle, UploadCloud, AlertCircle } from 'lucide-react';

export default function DTView() {
    const [isRecording, setIsRecording] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [sessionState, setSessionState] = useState('IDLE'); // IDLE, RECORDING, PROCESSING, DONE
    const [transcription, setTranscription] = useState([]);

    // Mock transcription stream
    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setTimeLeft(prev => Math.max(0, prev - 1));
                if (Math.random() > 0.7) {
                    setTranscription(prev => [
                        ...prev,
                        { id: Date.now(), text: "Unidentified intent captured... consolidating vector...", color: 'text-amber-500/50' }
                    ]);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleRecording = () => {
        if (!isRecording) {
            setIsRecording(true);
            setSessionState('RECORDING');
        } else {
            setIsRecording(false);
            setSessionState('PROCESSING');
            // Simulate processing
            setTimeout(() => setSessionState('DONE'), 3000);
        }
    };

    const sessions = [
        { id: 'DT-SES-004', date: 'Today, 10:00 AM', duration: '28m', title: 'Northfield Arch Review', status: 'READY' },
        { id: 'DT-SES-003', date: 'Yesterday', duration: '30m', title: 'Revenue Model Brainstorm', status: 'ARCHIVED' },
        { id: 'DT-SES-002', date: 'Dec 28', duration: '15m', title: 'Quick Sync', status: 'ARCHIVED' },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#1c1c1c] text-neutral-200 font-sans overflow-hidden relative selection:bg-orange-500/30">
            {/* Industrial Texture Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10 pointer-events-none mix-blend-overlay" />

            {/* Caution Striping Top */}
            <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#1c1c1c_10px,#1c1c1c_20px)] border-b border-black" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 bg-[#262626] border-b border-[#333] shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#333] rounded-sm flex items-center justify-center border-2 border-[#444] shadow-inner relative overflow-hidden">
                        {/* Tape Effect */}
                        <div className="absolute top-2 -left-2 w-16 h-4 bg-neutral-400/20 rotate-[-15deg] backdrop-blur-sm pointer-events-none" />
                        <Mic size={24} className="text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-widest text-neutral-300 flex items-center gap-3 uppercase">
                            DUCT TAPE
                            <span className="text-[10px] bg-orange-600 text-black px-2 py-0.5 rounded-sm font-bold tracking-wider">BETA</span>
                        </h1>
                        <p className="text-neutral-500 text-xs font-mono uppercase mt-0.5 tracking-tighter">Uninterrupted Intelligence Capture</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Session Timer</span>
                        <div className={`font-mono text-2xl font-bold tracking-widest ${isRecording ? 'text-red-500 animate-pulse' : 'text-neutral-400'}`}>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    <div className="w-px h-8 bg-[#444]" />
                    <button
                        onClick={toggleRecording}
                        className={`flex items-center gap-3 px-6 py-3 rounded-sm font-black text-sm tracking-wide transition-all shadow-lg border-b-4 active:border-b-0 active:translate-y-1 ${isRecording
                            ? 'bg-neutral-800 text-red-500 border-neutral-950 hover:bg-neutral-700'
                            : 'bg-orange-600 text-black border-orange-800 hover:bg-orange-500'
                            }`}
                    >
                        {isRecording ? <Square size={16} fill="currentColor" /> : <Mic size={16} />}
                        {isRecording ? 'STOP CAPTURE' : 'START SESSION'}
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-row min-h-0 relative z-10">
                {/* Sidebar */}
                <div className="w-80 flex-none bg-[#222] border-r border-[#333] flex flex-col">
                    <div className="p-4 border-b border-[#333] bg-[#2a2a2a]">
                        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <Archive size={12} /> Recent Bundles
                        </h2>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {sessions.map(session => (
                            <div key={session.id} className="bg-[#2a2a2a] p-4 rounded-sm border border-[#333] hover:border-orange-500/50 cursor-pointer group transition-all relative overflow-hidden">
                                {session.status === 'READY' && <div className="absolute top-0 right-0 w-2 h-full bg-green-500" />}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-mono text-[10px] text-orange-500/80">{session.id}</span>
                                    <span className="text-[10px] text-neutral-500">{session.date}</span>
                                </div>
                                <h3 className="font-bold text-neutral-300 text-sm group-hover:text-white transition-colors mb-1">{session.title}</h3>
                                <div className="flex items-center gap-3 text-[10px] text-neutral-500">
                                    <span className="flex items-center gap-1"><Clock size={10} /> {session.duration}</span>
                                    {session.status === 'READY' && <span className="flex items-center gap-1 text-green-500 font-bold"><CheckCircle size={10} /> PROCESSED</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-[#333] bg-[#1a1a1a]">
                        <button className="w-full py-2 bg-[#333] hover:bg-[#444] text-neutral-400 text-xs font-bold tracking-widest uppercase rounded-sm transition-all border border-[#444]">
                            View All Archives
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[#1c1c1c] flex flex-col relative overflow-hidden">
                    {/* Visualizer / State Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-12 relative">

                        {sessionState === 'IDLE' && (
                            <div className="text-center opacity-50">
                                <div className="w-32 h-32 rounded-full border-4 border-dashed border-neutral-700 flex items-center justify-center mx-auto mb-6">
                                    <Mic size={48} className="text-neutral-700" />
                                </div>
                                <h2 className="text-xl font-bold text-neutral-500 uppercase tracking-widest">Ready to Capture</h2>
                                <p className="text-neutral-600 text-sm mt-2 max-w-sm mx-auto">Click Start Session. All interruptions blocked. 30 minute hard limit.</p>
                            </div>
                        )}

                        {sessionState === 'RECORDING' && (
                            <div className="w-full max-w-3xl flex flex-col items-center">
                                <div className="w-full h-32 flex items-center justify-center gap-1 mb-12">
                                    {/* Fake Audio Viz */}
                                    {[10, 40, 25, 60, 30, 70, 20, 50, 80, 40, 60, 30, 20, 50, 70, 30, 60, 40, 20, 80].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [10, h, 10] }}
                                            transition={{ repeat: Infinity, duration: 0.5 + (i % 5) * 0.1 }}
                                            className="w-2 bg-orange-600 rounded-full opacity-80"
                                        />
                                    ))}
                                </div>
                                <div className="w-full bg-[#111] p-6 rounded border border-[#333] h-48 overflow-hidden relative font-mono text-sm text-neutral-400">
                                    <div className="absolute top-0 right-0 px-2 py-1 bg-neutral-800 text-[10px] text-white uppercase tracking-wider font-bold">Live Transcript</div>
                                    <div className="space-y-2 opacity-80">
                                        {transcription.map((line, i) => (
                                            <motion.p key={line.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                                <span className="text-neutral-600 mr-2">[{new Date(line.id).toLocaleTimeString([], { second: '2-digit' })}]</span>
                                                {line.text}
                                            </motion.p>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {sessionState === 'PROCESSING' && (
                            <div className="text-center">
                                <UploadCloud size={64} className="text-orange-500 animate-bounce mx-auto mb-6" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Processing Bundle</h2>
                                <p className="text-neutral-500 font-mono">Generative Architecture • Structuring Artifacts • Encrypting</p>
                            </div>
                        )}

                        {sessionState === 'DONE' && (
                            <div className="bg-[#111] border border-green-500/30 p-8 rounded-sm text-center max-w-md w-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-2">Session Complete</h2>
                                <p className="text-neutral-400 text-sm mb-6">Your bundle has been generated and is ready for review.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="py-3 bg-green-600 hover:bg-green-500 text-black font-bold text-xs uppercase tracking-wide rounded-sm transition-all">
                                        Download Bundle
                                    </button>
                                    <button onClick={() => setSessionState('IDLE')} className="py-3 bg-[#222] hover:bg-[#333] text-white font-bold text-xs uppercase tracking-wide rounded-sm transition-all border border-[#333]">
                                        New Session
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Caution Footer */}
            <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#1c1c1c,#1c1c1c_10px,#333_10px,#333_20px)] border-t border-black absolute bottom-0 z-20" />
        </div>
    );
}
