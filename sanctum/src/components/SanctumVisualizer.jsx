import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mic, Volume2, Circle, Hexagon, Zap, Globe, Wind, BarChart2, Radio } from 'lucide-react';

// Use a simplified set of icons to ensure no import issues
const VISUALIZATION_MODES = [
    { id: 'spectrum_bars', name: 'Spectrum Bars', type: 'audio', icon: BarChart2 },
    { id: 'circular_eq', name: 'Circular EQ', type: 'audio', icon: Circle },
    { id: 'waveform_tunnel', name: 'Waveform Tunnel', type: 'audio', icon: Radio },
    { id: 'nebula_pulse', name: 'Nebula Pulse', type: 'audio', icon: Wind },
    { id: 'seed_of_life', name: 'Seed of Life', type: 'sacred', icon: Circle },
    { id: 'metatrons_cube', name: 'Metatron\'s Cube', type: 'sacred', icon: Hexagon },
    { id: 'digital_rain', name: 'Matrix Rain', type: 'tech', icon: Zap },
    { id: 'orbital', name: 'Orbital Mechanics', type: 'tech', icon: Globe },
];

export default function SanctumVisualizer() {
    const [mode, setMode] = useState(VISUALIZATION_MODES[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [audioInitialized, setAudioInitialized] = useState(false);
    const [error, setError] = useState(null);
    const [sensitivity, setSensitivity] = useState(1.5);

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Audio Context Refs
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const gainNodeRef = useRef(null);
    const dataArrayRef = useRef(null);

    // --- AUDIO INIT ---
    const initAudio = async () => {
        setError(null);
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Browser API not supported");
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            // Handle suspended state (browser autoplay policy)
            if (ctx.state === 'suspended') await ctx.resume();

            const analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.85;
            analyserRef.current = analyser;

            const gainNode = ctx.createGain();
            gainNode.gain.value = sensitivity;
            gainNodeRef.current = gainNode;

            const source = ctx.createMediaStreamSource(stream);
            source.connect(gainNode);
            gainNode.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            setAudioInitialized(true);
        } catch (err) {
            console.error("Audio Init Failed:", err);
            setError("Microphone access needed.");
        }
    };

    useEffect(() => {
        if (gainNodeRef.current) gainNodeRef.current.gain.value = sensitivity;
    }, [sensitivity]);

    // --- RENDER LOOP ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        const resize = () => {
            if (container) {
                const rect = container.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;

                // Force CSS size to match
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                ctx.scale(dpr, dpr);
            }
        };

        // Initial sizing
        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            const cx = width / 2;
            const cy = height / 2;

            // 1. Clear Canvas
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            // 2. Fetch Audio Data (or generate idle)
            let data = new Uint8Array(128).fill(0);
            if (audioInitialized && analyserRef.current && dataArrayRef.current) {
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                data = dataArrayRef.current;
            } else if (mode.type === 'audio') {
                // Generative Idle State
                for (let i = 0; i < 128; i++) {
                    // Create simulated wave that moves
                    data[i] = 40 + Math.sin(time * 5 + i * 0.1) * 30;
                }
            }

            // 3. Draw Mode
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            switch (mode.id) {
                case 'spectrum_bars':
                    const barW = (width / data.length) * 2.5;
                    let barX = 0;
                    for (let i = 0; i < data.length; i++) {
                        const h = (data[i] / 255) * height * 0.8;
                        const grd = ctx.createLinearGradient(0, height, 0, height - h);
                        grd.addColorStop(0, '#00ff9d');
                        grd.addColorStop(1, '#0088aa');
                        ctx.fillStyle = grd;
                        ctx.fillRect(barX, height - h, barW - 1, h);
                        // Reflection
                        ctx.fillStyle = 'rgba(0,255,157,0.1)';
                        ctx.fillRect(barX, height, barW - 1, h * 0.3);
                        barX += barW;
                    }
                    break;

                case 'circular_eq':
                    const radius = Math.min(width, height) * 0.25;
                    const bars = 64;
                    const step = Math.floor(data.length / bars);
                    ctx.strokeStyle = '#00ff9d';

                    for (let i = 0; i < bars; i++) {
                        const val = data[i * step] || 10;
                        const angle = (i / bars) * Math.PI * 2 + time * 0.2;
                        const ext = (val / 255) * 100;
                        const x1 = cx + Math.cos(angle) * radius;
                        const y1 = cy + Math.sin(angle) * radius;
                        const x2 = cx + Math.cos(angle) * (radius + ext);
                        const y2 = cy + Math.sin(angle) * (radius + ext);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                    // Center Pulse
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius * 0.9 + (data[4] / 255) * 20, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(0, 255, 157, 0.5)';
                    ctx.stroke();
                    break;

                case 'waveform_tunnel':
                    const rings = 12;
                    const maxR = Math.min(width, height) * 0.6;
                    for (let r = 0; r < rings; r++) {
                        const depth = (time + r) % rings;
                        const scale = depth / rings; // 0 to 1
                        const ringR = Math.pow(scale, 2) * maxR;
                        if (ringR < 5) continue;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 157, ${1 - scale})`; // Fade out as it gets close or far? fade out close
                        // Actually fade out far (center)
                        ctx.strokeStyle = `rgba(0, 255, 157, ${scale})`;

                        for (let i = 0; i < 32; i++) {
                            const a = (i / 32) * Math.PI * 2;
                            const val = data[Math.floor((i / 32) * data.length)] || 0;
                            const distort = (val / 255) * 40 * scale;
                            const rx = cx + Math.cos(a + time) * (ringR + distort);
                            const ry = cy + Math.sin(a + time) * (ringR + distort);
                            if (i === 0) ctx.moveTo(rx, ry);
                            else ctx.lineTo(rx, ry);
                        }
                        ctx.closePath();
                        ctx.stroke();
                    }
                    break;

                case 'nebula_pulse':
                    const bass = data.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
                    ctx.fillStyle = `rgba(0,255,157, ${0.05 + (bass / 2000)})`;
                    ctx.fillRect(0, 0, width, height); // Flash bg

                    for (let i = 0; i < 50; i++) {
                        const a = i * 0.5 + time;
                        const d = i * 5 + Math.sin(time * 2 + i) * 10;
                        const sx = cx + Math.cos(a) * d;
                        const sy = cy + Math.sin(a) * d;
                        ctx.beginPath();
                        ctx.arc(sx, sy, 2 + (data[i % 20] / 255) * 5, 0, Math.PI * 2);
                        ctx.fillStyle = '#fff';
                        ctx.fill();
                    }
                    break;

                // Legacy Draw Calls
                case 'seed_of_life':
                    drawSacred(ctx, cx, cy, time, 'seed');
                    break;
                case 'metatrons_cube':
                    drawSacred(ctx, cx, cy, time, 'metatron');
                    break;
                case 'digital_rain':
                    drawMatrix(ctx, width, height, time);
                    break;
                case 'orbital':
                    drawOrbital(ctx, cx, cy, time);
                    break;
            }

            time += 0.01;
            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [mode, audioInitialized]);

    // Helper Draw functions for cleanliness
    const drawSacred = (ctx, cx, cy, t, type) => {
        ctx.strokeStyle = '#00ff9d';
        ctx.fillStyle = 'rgba(0,255,157,0.1)';
        const r = 60 + Math.sin(t) * 10;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();

        if (type === 'seed') {
            for (let i = 0; i < 6; i++) {
                const a = i * (Math.PI / 3);
                ctx.beginPath();
                ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r, 0, Math.PI * 2);
                ctx.stroke();
            }
        } else {
            ctx.translate(cx, cy);
            ctx.rotate(t * 0.5);
            ctx.strokeRect(-r / 2, -r / 2, r, r);
            ctx.rotate(-t * 0.5);
            ctx.translate(-cx, -cy);
        }
    };

    const drawMatrix = (ctx, w, h, t) => {
        ctx.fillStyle = '#00ff9d';
        ctx.font = '14px monospace';
        for (let i = 0; i < w / 20; i++) {
            const y = (t * 80 + i * 50) % h;
            ctx.fillText(String.fromCharCode(0x30A0 + i % 64), i * 20, y);
        }
    };

    const drawOrbital = (ctx, cx, cy, t) => {
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        for (let i = 1; i < 6; i++) {
            ctx.beginPath(); ctx.arc(cx, cy, i * 30, 0, Math.PI * 2); ctx.stroke();
            const x = cx + Math.cos(t / i) * i * 30;
            const y = cy + Math.sin(t / i) * i * 30;
            ctx.fillStyle = '#00ff9d';
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        }
    };

    return (
        <div className="relative w-full h-full bg-black/80 flex flex-col" ref={containerRef}>
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Control Overlay */}
            <div className="flex-1 w-full h-full relative z-10 flex flex-col justify-end p-6 pointer-events-none">

                {mode.type === 'audio' && !audioInitialized && !error && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto text-center">
                        <button onClick={initAudio} className="bg-[#00ff9d] text-black font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
                            <Mic /> ACTIVATE AUDIO
                        </button>
                    </div>
                )}

                {error && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-red-900/80 text-white px-4 py-2 rounded">
                        {error} <button onClick={initAudio} className="underline ml-2">Retry</button>
                    </div>
                )}

                <div className="max-w-md w-full mx-auto pointer-events-auto flex flex-col gap-2">
                    {/* Mode Selector */}
                    <div className="relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-full bg-black/60 border border-white/10 text-white px-4 py-3 rounded flex items-center justify-between hover:bg-white/5 backdrop-blur-md transition-colors">
                            <div className="flex items-center gap-3">
                                {React.createElement(mode.icon, { size: 16, className: "text-[#00ff9d]" })}
                                <span className="text-sm font-bold uppercase tracking-widest">{mode.name}</span>
                            </div>
                            <ChevronDown size={16} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full left-0 right-0 mb-2 bg-[#0a0a0a] border border-white/10 rounded overflow-hidden max-h-80 overflow-y-auto"
                                >
                                    {VISUALIZATION_MODES.map(m => (
                                        <button key={m.id} onClick={() => { setMode(m); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 flex items-center gap-2 border-b border-white/5 last:border-0">
                                            <m.icon size={12} /> {m.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {audioInitialized && mode.type === 'audio' && (
                        <div className="bg-black/40 backdrop-blur px-3 py-2 rounded flex items-center gap-3 border border-white/5">
                            <Volume2 size={16} className="text-[#00ff9d]" />
                            <input
                                type="range" min="0.5" max="3" step="0.1" value={sensitivity}
                                onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded accent-[#00ff9d] cursor-pointer"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
