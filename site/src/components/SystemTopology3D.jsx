import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// Node Component
function TopologyNode({ position, code, label, isActive, onClick, color = "#38bdf8" }) {
    const group = useRef();
    const shellRef = useRef();

    const activeScale = 1.4;
    const baseScale = 1;

    // Animation: Rotate the wireframe shell
    useFrame((state, delta) => {
        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.5;
            shellRef.current.rotation.z += delta * 0.2;
        }
        // Gentle pulse for active node
        if (isActive && group.current) {
            group.current.scale.lerp(new THREE.Vector3(activeScale, activeScale, activeScale), 0.1);
        } else if (group.current) {
            group.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1);
        }
    });

    return (
        <group position={position}>
            {/* Hover/Click Hit Area */}
            <mesh
                visible={false}
                onClick={(e) => { e.stopPropagation(); onClick(code); }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <sphereGeometry args={[1.2, 16, 16]} />
            </mesh>

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={group}>
                    {/* Inner Core: Crystal */}
                    <mesh onClick={(e) => { e.stopPropagation(); onClick(code); }}>
                        <octahedronGeometry args={[0.7, 0]} />
                        <meshStandardMaterial
                            color={isActive ? "#ffff00" : color}
                            emissive={isActive ? "#ffff00" : color}
                            emissiveIntensity={isActive ? 0.8 : 0.2}
                            roughness={0.1}
                            metalness={0.9}
                        />
                    </mesh>

                    {/* Outer Shell: Tech Wireframe */}
                    <mesh ref={shellRef} scale={1.1}>
                        <icosahedronGeometry args={[0.8, 0]} />
                        <meshStandardMaterial
                            color={isActive ? "#ffffff" : color}
                            wireframe={true}
                            transparent
                            opacity={0.15}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    {/* Active State Rings */}
                    {isActive && (
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1.3, 0.02, 16, 50]} />
                            <meshBasicMaterial color="#ffff00" transparent opacity={0.6} />
                        </mesh>
                    )}
                </group>

                {/* Label - Floating slightly above */}
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.35}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                    font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Optional: clearer font
                >
                    {code}
                </Text>
            </Float>
        </group>
    );
}

// Connections Component
function TopologyConnections({ connections, coords, color = "#38bdf8" }) {
    // Flatten points for the Line segment
    // connections is [[start, end], [start, end]]
    // Line takes points={[v1, v2, v3, v4]} for a continuous line, or segments for disconnected
    // We'll map each connection to a separate Line or use generic segments if possible.
    // Drei Line supports `segments` prop for independent lines if using THREE.LineSegments, but simpler to just map.

    return (
        <group>
            {connections.map(([start, end], i) => {
                const startPos = new THREE.Vector3(...coords[start]);
                const endPos = new THREE.Vector3(...coords[end]);
                return (
                    <Line
                        key={i}
                        points={[startPos, endPos]}
                        color={color}
                        lineWidth={1}
                        transparent
                        opacity={0.3}
                    />
                );
            })}
        </group>
    );
}

// Scene Setup
function Scene({ nodes, connections, nodeCoords, activeEngine, setActiveEngine, primaryColor }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={primaryColor} />

            <TopologyConnections
                connections={connections}
                coords={nodeCoords}
                color={primaryColor}
            />

            {nodes.map(node => (
                <TopologyNode
                    key={node.code}
                    position={nodeCoords[node.code]} // Expecting [x, y, z] array
                    code={node.code}
                    label={node.label}
                    isActive={activeEngine === node.code}
                    onClick={setActiveEngine}
                    color={primaryColor}
                />
            ))}

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                minDistance={5}
                maxDistance={20}
                autoRotate={true}
                autoRotateSpeed={0.5}
            />
        </>
    );
}

export default function SystemTopology3D({ nodes, connections, nodeCoords, activeEngine, setActiveEngine, theme = "water" }) {
    // Convert coord objects {x,y,z} to arrays [x,y,z] and scale down if necessary
    // The previous CSS coords were pixels (hundreds). Three.js works better with smaller units.
    // Let's scale by 0.02
    const scale = 0.02;
    const scaledCoords = useMemo(() => {
        const newCoords = {};
        Object.keys(nodeCoords).forEach(key => {
            const { x, y, z } = nodeCoords[key];
            newCoords[key] = [x * scale, -y * scale, z * scale]; // Flip Y for 3D logic usually matches screen better
        });
        return newCoords;
    }, [nodeCoords]);

    const primaryColor = theme === "green" ? "#22c55e" : "#38bdf8";

    return (
        <div style={{ width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <color attach="background" args={['#0f172a']} />
                {/* Background stars or particles could be nice */}
                <Scene
                    nodes={nodes}
                    connections={connections}
                    nodeCoords={scaledCoords}
                    activeEngine={activeEngine}
                    setActiveEngine={setActiveEngine}
                    primaryColor={primaryColor}
                />
            </Canvas>
        </div>
    );
}
