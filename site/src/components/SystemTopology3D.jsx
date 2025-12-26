import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// --- Visual Constants ---
const ORBIT_SPEED = 0.1;
const COLORS = {
    brand: '#38bdf8',
    core: '#f472b6',
    active: '#ffff00',
    dim: 'rgba(255,255,255,0.1)'
};

// --- Helper: Calculate Orbital Positions ---
// We ignore the passed explicit coords and calculate rings based on category
const getOrbitalPosition = (index, total, radius, variance = 0) => {
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 2) * variance; // Wave motion
    return [x, y, z];
};

function OrbitalNode({ code, label, position, isActive, isConnected, onClick, type }) {
    const mesh = useRef();
    const glow = useRef();

    // Pulse animation
    useFrame(({ clock }) => {
        if (!mesh.current) return;

        // Rotation
        mesh.current.rotation.x = clock.getElapsedTime() * 0.5;
        mesh.current.rotation.y = clock.getElapsedTime() * 0.3;

        // Pulse scale
        const t = clock.getElapsedTime();
        const baseScale = isActive ? 1.5 : (isConnected ? 1.1 : 1);
        const pulse = 1 + Math.sin(t * 3) * 0.1;
        mesh.current.scale.setScalar(baseScale * pulse);

        if (glow.current) {
            glow.current.scale.setScalar(1.2 + Math.sin(t * 2) * 0.2);
            glow.current.rotation.z -= 0.02;
        }
    });

    const isCore = type === 'CORE';
    const color = isActive ? COLORS.active : (isCore ? COLORS.core : COLORS.brand);

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Hit Box */}
                <mesh
                    visible={false}
                    onClick={(e) => { e.stopPropagation(); onClick(code); }}
                    onPointerOver={() => document.body.style.cursor = 'pointer'}
                    onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                    <sphereGeometry args={[1.5, 16, 16]} />
                </mesh>

                {/* Main Node Geometry */}
                <mesh ref={mesh} onClick={(e) => { e.stopPropagation(); onClick(code); }}>
                    {isCore ? <octahedronGeometry args={[0.8, 0]} /> : <icosahedronGeometry args={[0.5, 1]} />}
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={isActive ? 2 : 0.8}
                        roughness={0.2}
                        metalness={0.8}
                        wireframe={!isActive && !isCore}
                    />
                </mesh>

                {/* Glow Shell */}
                {(isActive || isCore) && (
                    <mesh ref={glow}>
                        <sphereGeometry args={[isCore ? 1 : 0.7, 16, 16]} />
                        <meshBasicMaterial
                            color={color}
                            transparent
                            opacity={0.15}
                            wireframe
                        />
                    </mesh>
                )}

                {/* Label */}
                <Text
                    position={[0, isCore ? 1.5 : 1, 0]}
                    fontSize={isActive ? 0.4 : 0.25}
                    color="white"
                    anchorY="bottom"
                    outlineWidth={0.02}
                    outlineColor="#000"
                >
                    {code}
                </Text>
                {isActive && (
                    <Text
                        position={[0, -1, 0]}
                        fontSize={0.15}
                        color="#aaa"
                        anchorY="top"
                    >
                        {label}
                    </Text>
                )}
            </Float>
        </group>
    );
}

function Connections({ links, nodePosMap, activeEngine }) {
    // We only render connections relevant to the active engine to reduce clutter
    // OR render all of them faintly

    return (
        <group>
            {links.map(([start, end], i) => {
                const sPos = nodePosMap[start];
                const ePos = nodePosMap[end];
                if (!sPos || !ePos) return null;

                const isActive = start === activeEngine || end === activeEngine;

                // Don't render inactive links in this new clean view, or make them very faint
                const opacity = isActive ? 0.6 : 0.05;
                const width = isActive ? 2 : 0.5;

                return (
                    <Line
                        key={i}
                        points={[sPos, ePos]}
                        color={isActive ? COLORS.active : COLORS.brand}
                        transparent
                        opacity={opacity}
                        lineWidth={width}
                    />
                );
            })}
        </group>
    );
}

function OrbitalScene({ nodes, connections, activeEngine, setActiveEngine }) {
    const groupRef = useRef();

    // 1. Process Nodes into Orbital Layout
    // Core: Governance, Identity
    // Inner Ring: System, Research, Execution
    // Outer Ring: All others

    const { processedNodes, nodePosMap } = useMemo(() => {
        const pNodes = [];
        const posMap = {};

        const core = nodes.filter(n => ['Governance', 'Identity'].includes(n.label));
        const inner = nodes.filter(n => ['System', 'Research', 'Execution'].includes(n.label));
        const outer = nodes.filter(n => !['Governance', 'Identity', 'System', 'Research', 'Execution'].includes(n.label));

        // Place Core - Stacked vertically in center
        core.forEach((n, i) => {
            const y = (i - (core.length - 1) / 2) * 2;
            const pos = [0, y, 0];
            pNodes.push({ ...n, pos, type: 'CORE' });
            posMap[n.code] = new THREE.Vector3(...pos);
        });

        // Place Inner Ring
        inner.forEach((n, i) => {
            const pos = getOrbitalPosition(i, inner.length, 6, 2);
            pNodes.push({ ...n, pos, type: 'INNER' });
            posMap[n.code] = new THREE.Vector3(...pos);
        });

        // Place Outer Ring
        outer.forEach((n, i) => {
            const pos = getOrbitalPosition(i, outer.length, 12, -3);
            pNodes.push({ ...n, pos, type: 'OUTER' });
            posMap[n.code] = new THREE.Vector3(...pos);
        });

        return { processedNodes: pNodes, nodePosMap: posMap };
    }, [nodes]);

    // Slowly rotate the entire system
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
            <pointLight position={[0, -10, 0]} intensity={0.5} color={COLORS.brand} />

            {/* Starfield Background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Connections
                links={connections}
                nodePosMap={nodePosMap}
                activeEngine={activeEngine}
            />

            {processedNodes.map((node) => (
                <OrbitalNode
                    key={node.code}
                    code={node.code}
                    label={node.label}
                    position={node.pos}
                    type={node.type}
                    isActive={activeEngine === node.code}
                    isConnected={connections.some(([s, e]) =>
                        (s === activeEngine && e === node.code) ||
                        (e === activeEngine && s === node.code)
                    )}
                    onClick={setActiveEngine}
                />
            ))}

            {/* Visual Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[5.9, 6.0, 64]} />
                <meshBasicMaterial color={COLORS.brand} transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[11.9, 12.0, 64]} />
                <meshBasicMaterial color={COLORS.brand} transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

export default function SystemTopology3D({ nodes, connections, activeEngine, setActiveEngine, background = '#000' }) {
    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background }}>
            <Canvas camera={{ position: [0, 10, 25], fov: 45 }}>
                <OrbitControls
                    enablePan={false}
                    minDistance={5}
                    maxDistance={40}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
                <OrbitalScene
                    nodes={nodes}
                    connections={connections}
                    activeEngine={activeEngine}
                    setActiveEngine={setActiveEngine}
                />
            </Canvas>
        </div>
    );
}
