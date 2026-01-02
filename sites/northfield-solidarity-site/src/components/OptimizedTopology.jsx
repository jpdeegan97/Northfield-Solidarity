import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Instances, Instance, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- VISUAL CONSTANTS ---
const NODE_SIZE = 1.0;
const ACTIVE_NODE_SIZE = 1.6;
const THEME_COLOR = "#00ff9d"; // Brand Cyan/Green

/**
 * Connection Lines with Type Coloring
 */
function ConnectionLines({ connections, nodeCoords, nodes }) {
    const { enginePts, projectPts, hybridPts } = useMemo(() => {
        // Map Codes to Types
        const isProject = {};
        nodes.forEach(n => {
            if (n.category === 'Project') isProject[n.code] = true;
        });

        const ePts = [];
        const pPts = [];
        const hPts = [];

        connections.forEach(([start, end]) => {
            const startPos = nodeCoords[start];
            const endPos = nodeCoords[end];

            if (startPos && endPos) {
                const p1 = new THREE.Vector3(...startPos);
                const p2 = new THREE.Vector3(...endPos);

                const startIsProj = isProject[start];
                const endIsProj = isProject[end];

                if (startIsProj && endIsProj) {
                    pPts.push(p1, p2);
                } else if (!startIsProj && !endIsProj) {
                    ePts.push(p1, p2);
                } else {
                    hPts.push(p1, p2);
                }
            }
        });
        return { enginePts: ePts, projectPts: pPts, hybridPts: hPts };
    }, [connections, nodeCoords, nodes]);

    return (
        <>
            {/* Engine-Engine (Base Infrastructure) */}
            {enginePts.length > 0 && (
                <Line
                    points={enginePts}
                    color="#00ff9d"
                    lineWidth={2}
                    transparent
                    opacity={0.15}
                    segments
                />
            )}

            {/* Project-Project (Overlay Network) */}
            {projectPts.length > 0 && (
                <Line
                    points={projectPts}
                    color="#a855f7"
                    lineWidth={3}
                    transparent
                    opacity={0.4}
                    segments
                />
            )}

            {/* Hybrid (Integration) */}
            {hybridPts.length > 0 && (
                <Line
                    points={hybridPts}
                    color="white"
                    lineWidth={1.5}
                    transparent
                    opacity={0.1}
                    segments
                />
            )}
        </>
    );
}

/**
 * Instanced Nodes
 */
function NodeField({ nodes, nodeCoords, activeEngine, setActiveEngine, onItemHover }) {
    // Separate active node from the rest
    const inactiveNodes = useMemo(() => nodes.filter(n => n.code !== activeEngine), [nodes, activeEngine]);
    const activeNodeData = useMemo(() => nodes.find(n => n.code === activeEngine), [nodes, activeEngine]);

    return (
        <>
            <Instances range={inactiveNodes.length}>
                <sphereGeometry args={[NODE_SIZE, 16, 16]} />
                <meshStandardMaterial
                    color="#1e293b"
                    emissive={THEME_COLOR}
                    emissiveIntensity={0.2}
                    roughness={0.1}
                    metalness={0.8}
                />
                {inactiveNodes.map((node) => {
                    const pos = nodeCoords[node.code];
                    if (!pos) return null;
                    return (
                        <InteractiveInstance
                            key={node.code}
                            position={pos}
                            node={node}
                            onClick={() => setActiveEngine(node.code)}
                            onHover={onItemHover}
                        />
                    );
                })}
            </Instances>

            {/* ACTIVE NODE */}
            {activeNodeData && nodeCoords[activeNodeData.code] && (
                <ActiveNode
                    position={nodeCoords[activeNodeData.code]}
                    label={activeNodeData.label}
                    code={activeNodeData.code}
                />
            )}
        </>
    );
}

function InteractiveInstance({ position, node, onClick, onHover }) {
    const ref = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
        const targetScale = hovered ? 1.5 : 1;
        ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <Instance
            ref={ref}
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); onHover(node); }}
            onPointerOut={() => { setHover(false); onHover(null); }}
            color={hovered ? "white" : undefined}
        />
    );
}

function ActiveNode({ position, label, code }) {
    const mesh = useRef();
    const ring = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.5;
            mesh.current.rotation.y += delta * 0.2;
        }
        if (ring.current) {
            ring.current.rotation.z -= delta * 0.2;
            ring.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
        }
    });

    return (
        <group position={position}>
            <mesh ref={mesh}>
                <icosahedronGeometry args={[ACTIVE_NODE_SIZE, 1]} />
                <meshStandardMaterial
                    color={THEME_COLOR}
                    emissive={THEME_COLOR}
                    emissiveIntensity={2}
                    wireframe
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[ACTIVE_NODE_SIZE * 0.6, 16, 16]} />
                <meshBasicMaterial color={THEME_COLOR} transparent opacity={0.5} />
            </mesh>
            <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[ACTIVE_NODE_SIZE * 1.5, 0.05, 16, 100]} />
                <meshBasicMaterial color="white" transparent opacity={0.3} />
            </mesh>
            <Html position={[0, ACTIVE_NODE_SIZE + 0.5, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
                <div className="flex flex-col items-center whitespace-nowrap">
                    <div className="bg-black/80 border border-[#00ff9d] px-3 py-1 rounded text-xs font-bold text-[#00ff9d] backdrop-blur-md">
                        {code}
                    </div>
                </div>
            </Html>
        </group>
    );
}

/**
 * Main Component
 */
export default function OptimizedTopology({ nodes, connections, nodeCoords, activeEngine, setActiveEngine }) {
    const processedCoords = useMemo(() => {
        const newCoords = {};
        const scale = 0.04;
        Object.keys(nodeCoords).forEach(key => {
            const c = nodeCoords[key];
            if (!c) return;
            if (Array.isArray(c)) newCoords[key] = [c[0] * scale, c[1] * scale, c[2] * scale];
            else newCoords[key] = [c.x * scale, -c.y * scale, c.z * scale];
        });
        return newCoords;
    }, [nodeCoords]);

    const [hoveredNode, setHoveredNode] = useState(null);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
                <color attach="background" args={['#050a10']} />
                <fog attach="fog" args={['#050a10', 10, 150]} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color={THEME_COLOR} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />

                <group>
                    <ConnectionLines
                        connections={connections}
                        nodeCoords={processedCoords}
                        nodes={nodes}
                    />

                    <NodeField
                        nodes={nodes}
                        nodeCoords={processedCoords}
                        activeEngine={activeEngine}
                        setActiveEngine={setActiveEngine}
                        onItemHover={setHoveredNode}
                    />
                </group>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    minDistance={1}
                    maxDistance={100}
                    autoRotate={!activeEngine}
                    autoRotateSpeed={0.3}
                />
            </Canvas>

            {hoveredNode && !activeEngine && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none md:top-auto md:bottom-24 z-50">
                    <div className="bg-black/60 border border-white/10 backdrop-blur px-4 py-2 rounded text-center">
                        <div className="text-[#00ff9d] font-bold text-sm tracking-wider">{hoveredNode.label}</div>
                        <div className="text-xs text-white/50 font-mono">{hoveredNode.category}</div>
                    </div>
                </div>
            )}


        </div>
    );
}
