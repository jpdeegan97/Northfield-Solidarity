import React from "react";

export const FlowerOfLife = ({ opacity = 0.05, color = "currentColor", className = "" }) => (
    <div className={`sacred-geo-bg ${className}`} style={{
        position: 'absolute',
        top: '-50%', left: '-50%', right: '-50%', bottom: '-50%', // Expand to cover rotation edges
        width: '200%', height: '200%', // Oversize to avoid corners showing during rotation
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ animation: 'spinBackground 300s linear infinite' }}>
            <defs>
                <pattern id="flowerGrid" width="20" height="34.6" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                    <circle cx="10" cy="10" r="10" fill="none" stroke={color} strokeWidth="0.2" />
                    <circle cx="10" cy="27.3" r="10" fill="none" stroke={color} strokeWidth="0.2" />
                    <circle cx="0" cy="18.6" r="10" fill="none" stroke={color} strokeWidth="0.2" />
                    <circle cx="20" cy="18.6" r="10" fill="none" stroke={color} strokeWidth="0.2" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#flowerGrid)" />
        </svg>
        <style>{`
            @keyframes spinBackground { 
                from { transform: rotate(0deg); } 
                to { transform: rotate(360deg); } 
            }
        `}</style>
    </div>
);

export const MetatronCube = ({ opacity = 0.05, color = "currentColor", className = "" }) => (
    <div className={`sacred-geo-bg ${className}`} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '80vh', height: '80vh',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity
    }}>
        <svg viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="0.5" style={{ animation: 'spinSlow 120s linear infinite' }}>
            {/* Outline Hexagon */}
            <polygon points="100,10 178,55 178,145 100,190 22,145 22,55" />

            {/* Inner Triangle Up */}
            <polygon points="100,10 178,145 22,145" />
            {/* Inner Triangle Down */}
            <polygon points="100,190 22,55 178,55" />

            {/* Center Lines */}
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="178" y1="55" x2="22" y2="145" />
            <line x1="178" y1="145" x2="22" y2="55" />

            {/* Circles (simplified) */}
            <circle cx="100" cy="100" r="15" />
            <circle cx="100" cy="40" r="10" />
            <circle cx="100" cy="160" r="10" />
            <circle cx="48" cy="70" r="10" />
            <circle cx="152" cy="70" r="10" />
            <circle cx="48" cy="130" r="10" />
            <circle cx="152" cy="130" r="10" />
        </svg>
        <style>{`
            @keyframes spinSlow { to { transform: translate(-50%, -50%) rotate(360deg); } }
        `}</style>
    </div>
);

export const GoldenSpiral = ({ opacity = 0.05, color = "currentColor" }) => (
    <div style={{
        position: 'absolute', bottom: -100, right: -100, width: '600px', height: '600px',
        opacity: opacity, pointerEvents: 'none', zIndex: 0
    }}>
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="0.5">
            <path d="M100,0 A100,100 0 0,1 0,100" />
            <path d="M0,100 A100,100 0 0,1 100,100" transform="scale(0.618) translate(61.8, 0)" />
        </svg>
    </div>
);

export const MerkabahLoader = ({ size = 40, color = "currentColor", className = "" }) => (
    <div className={`merkabah-loader ${className}`} style={{
        width: size, height: size,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
        <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2" style={{ animation: 'spinMerkabah 3s linear infinite' }}>
            {/* Upward Triangle (Male) */}
            <polygon points="50,15 85,75 15,75" fill="none" />
            {/* Downward Triangle (Female) */}
            <polygon points="50,85 85,25 15,25" fill="none" style={{ animation: 'counterSpin 3s linear infinite', transformOrigin: 'center' }} />

            {/* Connection lines simulating 3D depth */}
            <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.5" opacity="0.5" />
            <line x1="15" y1="25" x2="85" y2="75" strokeWidth="0.5" opacity="0.5" />
            <line x1="85" y1="25" x2="15" y2="75" strokeWidth="0.5" opacity="0.5" />
        </svg>
        <style>{`
            @keyframes spinMerkabah { 
                0% { transform: rotate(0deg); } 
                100% { transform: rotate(360deg); } 
            }
            @keyframes counterSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(-360deg); }
            }
        `}</style>
    </div>
);


/*
TODO: Sacred Geometry Future Implementations
1. Golden Ratio Typography: Enforce Phi (1.618) ratios for all heading sizes.
2. Constellation Layouts: Arrange System nodes in Kabbalistic Tree of Life on /system.
3. Metatron's Cube Hero: Use rotating vector cube behind South Lawn hero.
*/
