const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../site/public/assets/marketplace');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const ASSETS = [
    // NS ENGINES
    { code: 'GGP', color: '#3b82f6', type: 'CORE' },
    { code: 'MINT', color: '#3b82f6', type: 'CORE' },
    { code: 'PIE', color: '#3b82f6', type: 'CORE' },
    { code: 'DAT', color: '#3b82f6', type: 'CORE' },
    { code: 'MUX', color: '#3b82f6', type: 'CORE' },
    { code: 'SIG', color: '#3b82f6', type: 'CORE' },
    { code: 'SIM', color: '#3b82f6', type: 'CORE' },
    { code: 'IDN', color: '#3b82f6', type: 'CORE' },
    { code: 'FLO', color: '#3b82f6', type: 'CORE' },
    { code: 'DRE', color: '#3b82f6', type: 'CORE' },
    { code: 'INT', color: '#3b82f6', type: 'CORE' },
    { code: 'CWP', color: '#3b82f6', type: 'CORE' },
    { code: 'BCP', color: '#3b82f6', type: 'CORE' },
    { code: 'LUM', color: '#3b82f6', type: 'CORE' },
    { code: 'FRK', color: '#3b82f6', type: 'EXP' },
    { code: 'INC', color: '#3b82f6', type: 'EXP' },
    { code: 'CRN', color: '#3b82f6', type: 'CORE' },
    { code: 'QRT', color: '#3b82f6', type: 'CORE' },

    // NS BMP
    { code: 'LVCC', color: '#3b82f6', type: 'BMP' },
    { code: 'CYP', color: '#3b82f6', type: 'BMP' },
    { code: 'DTP', color: '#3b82f6', type: 'BMP' },

    // NS PROJECTS
    { code: 'FRMT', color: '#3b82f6', type: 'PROJ' },
    { code: 'MT', color: '#3b82f6', type: 'PROJ' },
    { code: 'OS', color: '#3b82f6', type: 'PROJ' },
    { code: 'RELAY', color: '#3b82f6', type: 'PROJ' },
    { code: 'AEGIS', color: '#3b82f6', type: 'PROJ' },
    { code: 'WSP', color: '#3b82f6', type: 'PROJ' },

    // SL ENGINES
    { code: 'MRFPE', color: '#22c55e', type: 'SL' },
    { code: 'PECA', color: '#22c55e', type: 'SL' },
    { code: 'PTE', color: '#22c55e', type: 'SL' },

    // WSP MOCK
    { code: 'wsp1', name: 'ArbBot', color: '#d97706', type: 'WSP' },
    { code: 'wsp2', name: 'MacroVol', color: '#d97706', type: 'WSP' },
    { code: 'wsp3', name: 'OptEngine', color: '#d97706', type: 'WSP' },
];

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function generateSVG(asset) {
    const seedStr = asset.code;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
        seed += seedStr.charCodeAt(i);
    }

    const rnd = () => {
        seed++;
        return random(seed);
    };

    const color = asset.color;
    // Generate darker/lighter variants
    const bg = '#050505';

    // Procedural shapes
    let shapes = '';
    const numShapes = Math.floor(rnd() * 5) + 3;

    for (let i = 0; i < numShapes; i++) {
        const type = rnd() > 0.5 ? 'circle' : 'rect';
        const opacity = (rnd() * 0.3 + 0.1).toFixed(2);
        const x = Math.floor(rnd() * 400);
        const y = Math.floor(rnd() * 300);
        const size = Math.floor(rnd() * 100) + 20;

        if (type === 'circle') {
            shapes += `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" fill-opacity="${opacity}" />`;
        } else {
            shapes += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" fill-opacity="${opacity}" transform="rotate(${Math.floor(rnd() * 90)} ${x + size / 2} ${y + size / 2})" />`;
        }
    }

    // Grid lines/Tech look
    let lines = '';
    for (let i = 0; i < 5; i++) {
        const y = Math.floor(rnd() * 300);
        lines += `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="${color}" stroke-opacity="0.2" stroke-width="1" />`;
    }
    for (let i = 0; i < 5; i++) {
        const x = Math.floor(rnd() * 400);
        lines += `<line x1="${x}" y1="0" x2="${x}" y2="300" stroke="${color}" stroke-opacity="0.2" stroke-width="1" />`;
    }

    // Central Code Text
    const text = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="48" fill="white" style="text-shadow: 0 0 20px ${color}">${asset.code.toUpperCase()}</text>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
        <rect width="100%" height="100%" fill="${bg}"/>
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        ${lines}
        <g filter="url(#glow)">
            ${shapes}
        </g>
        <rect width="100%" height="100%" fill="url(#grad)" fill-opacity="0.2"/>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
        </linearGradient>
        ${text}
    </svg>`;
}

ASSETS.forEach(asset => {
    const svgContent = generateSVG(asset);
    const fileName = `${asset.code}.svg`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), svgContent);
    console.log(`Generated ${fileName}`);
});
