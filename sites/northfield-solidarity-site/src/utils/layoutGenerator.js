
export function generateHologramLayout(nodes) {
    const layout = {};
    const layer1 = [];
    const layer2 = [];
    const layer3 = [];
    const layerOthers = [];

    // 1. Categorize Nodes
    nodes.forEach(node => {
        const code = node.code.toUpperCase();
        const cat = (node.category || "").toUpperCase();

        if (code === 'GGP') {
            layout[code] = [0, 0, 0];
            return;
        }

        // Layer 1: Foundation / Core / Security / Identity
        if (['IDN', 'INT', 'APM', 'AEGIS', 'MT', 'LUM', 'CON', 'DEP', 'RL', 'RELAY'].includes(code) ||
            ['INFRASTRUCTURE', 'SECURITY', 'IDENTITY', 'CORE', 'INTEGRATION', 'SYSTEM'].includes(cat)) {
            layer1.push(code);
            return;
        }

        // Layer 2: Functional Engines (Research, Finance, Sim, Ops)
        if (['DRE', 'PIE', 'SIG', 'SIM', 'FLO', 'DAT', 'BCP', 'RESILIENCE', 'OBSERVABILITY', 'FINANCE', 'RESEARCH', 'SIMULATION', 'OPERATIONS'].includes(cat)) {
            layer2.push(code);
            return;
        }

        // Layer 3: Projects / Experimental
        layer3.push(code);
    });

    // 2. Distribute Layers (Spherical Fibonacci or simple Rings)

    // Helper: Distribute points on a sphere shell
    const distributeOnSphere = (items, radius) => {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        items.forEach((code, i) => {
            const y = 1 - (i / (items.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y

            const theta = phi * i; // Golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            layout[code] = [x * radius, y * radius, z * radius];
        });
    };

    // Helper: Distribute on a Ring (Flat Plane) - maybe better for readability?
    // Let's stick to Sphere for "Hologram" feel, but maybe flattened slightly?
    // Actually, mixing rings and spheres is nice.
    // Let's try "Orbit Rings" with slight vertical variation.

    const distributeOnRing = (items, radius, yBase = 0, yVar = 0) => {
        const step = (Math.PI * 2) / items.length;
        items.forEach((code, i) => {
            const angle = step * i;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = yBase + Math.sin(angle * 2) * yVar; // Wave effect
            layout[code] = [x, y, z];
        });
    }

    // Layer 1: Inner Orbit (Radius 5)
    distributeOnRing(layer1, 6, 0, 2);

    // Layer 2: Mid Orbit (Radius 10)
    distributeOnRing(layer2, 11, 0, 3);

    // Layer 3: Outer Orbit (Radius 16) - More scattered
    // Using Sphere distribution for outer layer to make it look like a cloud around the core
    if (layer3.length > 0) {
        const phi = Math.PI * (3 - Math.sqrt(5));
        layer3.forEach((code, i) => {
            // Semi-random sphere distribution but deterministic
            // Distribute broadly
            const y = 1 - (i / (layer3.length > 0 ? layer3.length : 1)) * 2;
            const rLocal = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const R = 18;
            layout[code] = [
                Math.cos(theta) * rLocal * R,
                y * R * 0.6, // Flatten the sphere slightly vertically
                Math.sin(theta) * rLocal * R
            ];
        });
    }

    return layout;
}
