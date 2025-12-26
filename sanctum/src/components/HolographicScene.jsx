import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Utility: Enforce contrast against black background (0x000000)
// Ensures that any user-provided color has a minimum lightness [0-1] of 0.6
const ensureVisible = (colorHex) => {
    const c = new THREE.Color(colorHex);
    const hsl = {};
    c.getHSL(hsl);

    // If lightness is below threshold, boost it
    if (hsl.l < 0.6) {
        c.setHSL(hsl.h, Math.min(hsl.s, 1.0), 0.6);
    }
    return "#" + c.getHexString();
};

// Reusable Constellation Field (connected network of lines)
function Constellation({ radius = 3, color = "white", count = 30 }) {
    const safeColor = useMemo(() => ensureVisible(color), [color]);

    const geometry = useMemo(() => {
        const points = [];
        // Generate random points on sphere surface
        for (let i = 0; i < count; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            points.push(new THREE.Vector3(x, y, z));
        }

        const linePoints = [];
        // Connect points to their nearest neighbors
        for (let i = 0; i < points.length; i++) {
            const others = points.map((p, idx) => ({ p, idx, dist: p.distanceTo(points[i]) }))
                .filter(o => o.idx !== i)
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 2);

            others.forEach(o => {
                linePoints.push(points[i]);
                linePoints.push(o.p);
            });
        }

        return new THREE.BufferGeometry().setFromPoints(linePoints);
    }, [radius, count]);

    return (
        <group>
            <lineSegments geometry={geometry}>
                <lineBasicMaterial color={safeColor} transparent opacity={0.6} linewidth={1} />
            </lineSegments>
            <points>
                <bufferGeometry attach="geometry" attributes-position={geometry.attributes.position} />
                <pointsMaterial size={0.06} color={safeColor} transparent opacity={0.8} />
            </points>
        </group>
    );
}

function FirmamentGlobe({ activeLayers = {}, showStars = true, enableRotation = true }) {
    const meshRef = useRef();

    // Use useMemo for static positions to avoid render jitter, using spherical coords
    const entityPositions = useMemo(() => {
        return Array.from({ length: 40 }).map(() => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 2.6; // Strictly surface level

            return [
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ];
        });
    }, []);

    const eventPositions = useMemo(() => {
        return Array.from({ length: 8 }).map(() => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 3.2 + (Math.random() * 0.5); // Orbiting shell

            return [
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ];
        });
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current && enableRotation) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Core Globe */}
            <Float speed={enableRotation ? 1 : 0} rotationIntensity={enableRotation ? 0.2 : 0} floatIntensity={enableRotation ? 0.5 : 0}>
                <Sphere args={[2.5, 32, 32]}>
                    <meshStandardMaterial
                        color={ensureVisible("#001a10")}
                        wireframe
                        transparent
                        opacity={0.3}
                        emissive="#00ff9d"
                        emissiveIntensity={0.2}
                    />
                </Sphere>
            </Float>

            {/* Entities */}
            {activeLayers.entities && (
                <group>
                    <Constellation radius={2.6} color="#ff0055" count={40} />
                    {entityPositions.map((pos, i) => (
                        <mesh key={i} position={pos}>
                            <boxGeometry args={[0.08, 0.08, 0.08]} />
                            <meshStandardMaterial color={ensureVisible("#00ff9d")} emissive={ensureVisible("#00ff9d")} />
                        </mesh>
                    ))}
                </group>
            )}

            {/* Sectors */}
            {activeLayers.sectors && (
                <Icosahedron args={[2.62, 1]}>
                    <meshStandardMaterial
                        color={ensureVisible("#00aaff")}
                        wireframe
                        transparent
                        opacity={0.5}
                        emissive={ensureVisible("#00aaff")}
                        emissiveIntensity={0.5}
                    />
                </Icosahedron>
            )}

            {/* Events */}
            {activeLayers.events && (
                <group>
                    <Constellation radius={3.4} color="#0099ff" count={30} />
                    {eventPositions.map((pos, i) => (
                        <mesh key={`evt-${i}`} position={pos}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshStandardMaterial color={ensureVisible("#ffaa00")} emissive={ensureVisible("#ff0000")} emissiveIntensity={3} toneMapped={false} />
                        </mesh>
                    ))}
                </group>
            )}

            {/* Risks */}
            {activeLayers.risks && (
                <Sphere args={[2.8, 32, 32]}>
                    <MeshDistortMaterial
                        color={ensureVisible("#ff0000")}
                        wireframe
                        transparent
                        opacity={0.6}
                        distort={0.4}
                        speed={enableRotation ? 5 : 0}
                    />
                </Sphere>
            )}

            {showStars && <Stars />}
        </group>
    );
}

function EngineObject({ code, enableRotation = true }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current && enableRotation) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    const color = useMemo(() => {
        const colors = ['#00ff9d', '#00aaff', '#ff00aa', '#ffaa00', '#aa00ff'];
        let hash = 0;
        for (let i = 0; i < code.length; i++) hash += code.charCodeAt(i);
        return ensureVisible(colors[hash % colors.length]);
    }, [code]);

    return (
        <Float speed={enableRotation ? 2 : 0} rotationIntensity={enableRotation ? 0.5 : 0} floatIntensity={enableRotation ? 1 : 0}>
            <Icosahedron args={[2, 0]} ref={meshRef}>
                <MeshDistortMaterial
                    color={color}
                    wireframe={true}
                    speed={enableRotation ? 2 : 0}
                    distort={0.4}
                    transparent
                    opacity={0.8}
                />
            </Icosahedron>
            <Text
                position={[0, 0, 0]}
                fontSize={0.8}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.woff" // Ensure this or fallback default
            >
                {code}
            </Text>
        </Float>
    );
}

function Stars() {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            p.push(x, y, z);
        }
        return new Float32Array(p);
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} />
        </points>
    );
}

export default function HolographicScene({ activeCode, activeLayers, scale = 1, showStars = true, enableRotation = true }) {
    return (
        <group scale={[scale, scale, scale]}>
            {activeCode === 'FIRMAMENT' ? (
                <FirmamentGlobe activeLayers={activeLayers} showStars={showStars} enableRotation={enableRotation} />
            ) : (
                <EngineObject code={activeCode} enableRotation={enableRotation} />
            )}
        </group>
    );
}
