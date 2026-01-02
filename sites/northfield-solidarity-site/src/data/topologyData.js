import { ALL_ENGINES } from './engineRegistry.js';
import { NS_PROJECTS } from './projectRegistry.js';

// --- MANUAL LAYOUT CONFIG ---
// These are the preferred positions for known key nodes.
const MANUAL_COORDS = {
    // Core Engines
    SIG: { x: -200, y: -250, z: 0 },
    MUX: { x: 200, y: -250, z: 0 },
    DRE: { x: -150, y: -100, z: 50 },
    PIE: { x: 150, y: -100, z: 50 },
    GGP: { x: 0, y: 0, z: 100 },
    IDN: { x: 200, y: 0, z: -50 },
    INT: { x: -200, y: 0, z: -50 },
    SIM: { x: -150, y: 150, z: 50 },
    DAT: { x: 150, y: 150, z: 50 },
    FLO: { x: 0, y: 250, z: 0 },
    BCP: { x: 0, y: -350, z: 0 },

    // Core Projects/Gateways
    MT: { x: 0, y: 0, z: -150 },
    FL: { x: 0, y: 300, z: 100 },
    RL: { x: 0, y: -250, z: 50 },
    APM: { x: 0, y: 0, z: 200 },
    AEGIS: { x: 50, y: -50, z: 120 },
    BOOM: { x: -250, y: -250, z: 100 },
    DT: { x: -100, y: 100, z: 80 },
    INC: { x: 0, y: 100, z: 150 },
    CRN: { x: -100, y: 50, z: 120 },
    INCP: { x: 100, y: 100, z: 80 },
    INV: { x: -150, y: 50, z: 80 },

    // SL
    MRFPE: { x: -200, y: 0, z: 0 },
    PTE: { x: 0, y: 0, z: 50 },
    PECA: { x: 200, y: 0, z: 0 },

    // WSP
    "WSP-1": { x: -100, y: 0, z: 0 },
    "WSP-2": { x: 100, y: 0, z: 0 },
};

// --- MANUAL CONNECTION DEFINITIONS ---
// Defined as logic pairs. Will be filtered if nodes don't exist.
const MANUAL_CONNECTIONS = [
    ["SIG", "DRE"], ["MUX", "PIE"],
    ["DRE", "GGP"], ["PIE", "GGP"],
    ["GGP", "IDN"], ["GGP", "MT"],
    ["GGP", "SIM"], ["GGP", "DAT"],
    ["GGP", "INT"],
    ["INT", "SIM"], ["INT", "DAT"],
    ["SIM", "FLO"], ["DAT", "FLO"],
    ["BCP", "SIG"], ["BCP", "FLO"],
    ["APM", "GGP"], ["APM", "IDN"],
    ["RL", "MUX"], ["RL", "SIG"], ["RL", "GGP"],
    ["FL", "SIM"],
    ["AEGIS", "GGP"], ["AEGIS", "IDN"],
    ["BOOM", "SIG"], ["BOOM", "GGP"],
    ["DT", "DRE"], ["DT", "SIG"],
    ["INC", "GGP"], ["INC", "INT"], ["INC", "DAT"], ["INC", "CRN"],
    ["INCP", "DT"], ["INCP", "INC"], ["INCP", "AEGIS"],
    ["INV", "DT"], ["INV", "DRE"], ["INV", "GGP"],

    // SL
    ["MRFPE", "PTE"], ["PTE", "PECA"],

    // WSP
    ["WSP-1", "WSP-2"]
];

/**
 * Generates a complete, safe topology object synchronized with the registries.
 * @returns { nodes: [], connections: [], nodeCoords: {} }
 */
export function getNSTopology() {
    // 1. GATHER ALL NODES
    // We combine Engines and Projects.
    // Use a Map to deduplicate by 'code'.
    const nodeMap = new Map();

    const addNode = (item, source) => {
        if (!item || !item.code) return;

        const existing = nodeMap.get(item.code);
        if (!existing) {
            nodeMap.set(item.code, {
                code: item.code,
                label: item.name || item.code,
                category: item.category || source
            });
        }
    };

    ALL_ENGINES.forEach(e => addNode(e, 'Engine'));
    NS_PROJECTS.forEach(p => addNode(p, 'Project'));

    // Also explicitly add any SL/WSP nodes if they aren't in the main registries
    // (Assuming they are mostly covered, but adding fallbacks for manual coords keys)
    Object.keys(MANUAL_COORDS).forEach(key => {
        if (!nodeMap.has(key)) {
            nodeMap.set(key, { code: key, label: key, category: 'System' });
        }
    });

    const nodes = Array.from(nodeMap.values());
    const validCodes = new Set(nodes.map(n => n.code));

    // 2. ASSIGN COORDINATES
    // Use Manual config if exists, else auto-layout
    const nodeCoords = {};
    let spiralRadius = 300;
    let spiralAngle = 0;

    nodes.forEach(node => {
        if (MANUAL_COORDS[node.code]) {
            nodeCoords[node.code] = MANUAL_COORDS[node.code];
        } else {
            // Auto-layout for new/dynamic nodes (Spiral outward)
            nodeCoords[node.code] = {
                x: Math.cos(spiralAngle) * spiralRadius,
                y: Math.sin(spiralAngle) * spiralRadius,
                z: (Math.random() - 0.5) * 100 // Slight z-variance
            };
            spiralAngle += 0.5;
            spiralRadius += 10;
        }
    });

    // 3. FILTER CONNECTIONS
    // Only include connections where BOTH ends exist in our node list
    const connections = MANUAL_CONNECTIONS.filter(([start, end]) => {
        return validCodes.has(start) && validCodes.has(end);
    });

    return {
        nodes,
        connections,
        nodeCoords
    };
}

// Keep these for backward compatibility if other components import them directly,
// but they should really use the function.
// For now, we return empty/static arrays to prevent import errors, 
// but the app should switch to getNSTopology().
export const nsGridAreas = [];
export const nsNodeCoords = {};
export const nsConnections3d = [];
