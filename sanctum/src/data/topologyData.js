
// Topological Definitions for 3D System View

// NS Topology
export const nsGridAreas = [
    { code: "SIG", label: "Inputs" },
    { code: "MUX", label: "Inputs" },
    { code: "DRE", label: "Research" },
    { code: "PIE", label: "Research" },
    { code: "GGP", label: "Nucleus" },
    { code: "IDN", label: "Nucleus" },
    { code: "INT", label: "State" },
    { code: "SIM", label: "Simulation" },
    { code: "DAT", label: "Execution" },
    { code: "FLO", label: "Finance" },
    { code: "BCP", label: "Blockchain" },
    { code: "MTR", label: "Tracer" },
    { code: "APM", label: "Gateway" },
];

export const nsNodeCoords = {
    SIG: { x: -200, y: -250, z: 0 },
    MUX: { x: 200, y: -250, z: 0 },
    DRE: { x: -150, y: -100, z: 50 },
    PIE: { x: 150, y: -100, z: 50 },
    GGP: { x: 0, y: 0, z: 100 }, // Nucleus high
    IDN: { x: 200, y: 0, z: -50 },
    INT: { x: -200, y: 0, z: -50 },
    SIM: { x: -150, y: 150, z: 50 },
    DAT: { x: 150, y: 150, z: 50 },
    FLO: { x: 0, y: 250, z: 0 },
    BCP: { x: 0, y: -350, z: 0 },
    MTR: { x: 0, y: 0, z: -150 },
    APM: { x: 0, y: 0, z: 200 }, // Gateway front and center
};

export const nsConnections3d = [
    ["SIG", "DRE"], ["MUX", "PIE"],
    ["DRE", "GGP"], ["PIE", "GGP"],
    ["GGP", "IDN"], ["GGP", "MTR"],
    ["GGP", "SIM"], ["GGP", "DAT"],
    ["GGP", "INT"],
    ["INT", "SIM"], ["INT", "DAT"],
    ["SIM", "FLO"], ["DAT", "FLO"],
    ["SIM", "FLO"], ["DAT", "FLO"],
    ["BCP", "SIG"], ["BCP", "FLO"],
    ["APM", "GGP"], ["APM", "IDN"]
];

// SL Topology
export const slGridAreas = [
    { code: "MRFPE", label: "Feasibility" },
    { code: "PTE", label: "Portfolio" },
    { code: "PECA", label: "Structuring" },
];

export const slNodeCoords = {
    MRFPE: { x: -200, y: 0, z: 0 },
    PTE: { x: 0, y: 0, z: 50 },
    PECA: { x: 200, y: 0, z: 0 },
};

export const slConnections3d = [
    ["MRFPE", "PTE"],
    ["PTE", "PECA"]
];

// WSP Topology
export const wspGridAreas = [
    { code: "WSP-1", label: "Formation" },
    { code: "WSP-2", label: "Deployment" },
];

export const wspNodeCoords = {
    "WSP-1": { x: -100, y: 0, z: 0 },
    "WSP-2": { x: 100, y: 0, z: 0 },
};

export const wspConnections3d = [
    ["WSP-1", "WSP-2"]
];
