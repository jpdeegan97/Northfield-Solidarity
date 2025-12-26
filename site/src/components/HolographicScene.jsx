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

// Simple Spaceship Mesh
// Spaceship component removed - transformed globe acts as ship


// Warp Speed Stars
// Warp Speed Stars (Streaks)
function WarpStars() {
    const count = 2000;
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Initial state
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 150;
            const y = (Math.random() - 0.5) * 150;
            const z = (Math.random() - 0.5) * 600 - 300;
            const speed = 1 + Math.random();
            temp.push({ x, y, z, speed });
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Speed multiplier (Hyperspace speed!)
        const warpFactor = 800 * delta;

        particles.forEach((p, i) => {
            p.z += p.speed * warpFactor;

            // Loop functionality
            if (p.z > 20) {
                p.z = -600;
                p.x = (Math.random() - 0.5) * 150;
                p.y = (Math.random() - 0.5) * 150;
            }

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(1, 1, 30 + p.speed * 20); // Stretch Z based on speed
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <boxGeometry args={[0.08, 0.08, 1]} />
            <meshBasicMaterial color="#aaddff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
}

function FirmamentGlobe({ activeLayers = {}, showStars = true, enableRotation = true, isWarping = false }) {
    const meshRef = useRef();
    const coreRef = useRef();
    const sectorsRef = useRef();
    const risksRef = useRef();
    const entityRefs = useRef([]);

    // Reset entity refs array
    useEffect(() => {
        entityRefs.current = entityRefs.current.slice(0, 40);
    }, []);

    const entityPositions = useMemo(() => {
        return Array.from({ length: 40 }).map(() => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 2.6;
            return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)];
        });
    }, []);

    const eventPositions = useMemo(() => {
        return Array.from({ length: 8 }).map(() => {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 3.2 + (Math.random() * 0.5);
            return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)];
        });
    }, []);

    useFrame((state, delta) => {
        // 1. ROTATION (Normal)
        if (meshRef.current && enableRotation && !isWarping) {
            meshRef.current.rotation.y += delta * 0.1;

            // Revert transforms
            if (sectorsRef.current) sectorsRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 2);
            if (coreRef.current) coreRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 2);
            if (risksRef.current) {
                risksRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 2);
                risksRef.current.position.lerp(new THREE.Vector3(0, 0, 0), delta * 2);
            }
            entityRefs.current.forEach((ref, i) => {
                if (ref && entityPositions[i]) {
                    ref.position.lerp(new THREE.Vector3(...entityPositions[i]), delta * 2);
                }
            });
        }

        // 2. TRANSFORM & WARP
        if (isWarping && meshRef.current) {
            // Stay in frame but shake violently
            meshRef.current.position.x = (Math.random() - 0.5) * 0.2;
            meshRef.current.position.y = (Math.random() - 0.5) * 0.2;

            if (sectorsRef.current) {
                // Sleek Fuselage (Blackbird style)
                sectorsRef.current.scale.lerp(new THREE.Vector3(0.8, 0.2, 5), delta * 4);
                sectorsRef.current.rotation.set(0, 0, 0); // Stabilize
            }
            if (coreRef.current) {
                // Cockpit / Nose
                coreRef.current.scale.lerp(new THREE.Vector3(0.5, 0.4, 2), delta * 4);
                coreRef.current.position.lerp(new THREE.Vector3(0, 0.5, 3), delta * 4);
            }
            if (risksRef.current) {
                // Rear Engine Block
                risksRef.current.scale.lerp(new THREE.Vector3(2.5, 0.5, 1), delta * 4);
                risksRef.current.position.lerp(new THREE.Vector3(0, 0, -3), delta * 4);
            }

            // Move entities to Delta Wing formation
            entityRefs.current.forEach((ref, i) => {
                if (ref) {
                    const side = i % 2 === 0 ? 1 : -1;
                    const idx = Math.floor(i / 2);

                    // Sweep back delta wing
                    const span = 1 + idx * 0.3; // Width
                    const sweep = span * 1.2;   // Angle back

                    const x = side * span;
                    const y = (Math.random() - 0.5) * 0.1; // Slight flutter
                    const z = -sweep;

                    ref.position.lerp(new THREE.Vector3(x, y, z), delta * 3);
                    ref.rotation.set(0, 0, side * 0.1); // Slight bank
                }
            });
        }
    });

    useEffect(() => {
        if (!isWarping && meshRef.current) {
            meshRef.current.position.set(0, 0, 0);
            meshRef.current.rotation.set(0, 0, 0);
        }
    }, [isWarping]);

    return (
        <group>
            <group ref={meshRef}>
                {/* Core Globe */}
                <Float speed={enableRotation ? 1 : 0} rotationIntensity={enableRotation ? 0.2 : 0} floatIntensity={enableRotation ? 0.5 : 0}>
                    <Sphere args={[2.5, 32, 32]} ref={coreRef}>
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

                {activeLayers.entities && (
                    <group>
                        {!isWarping && <Constellation radius={2.6} color="#ff0055" count={40} />}
                        {entityPositions.map((pos, i) => (
                            <mesh key={i} position={pos} ref={el => entityRefs.current[i] = el}>
                                <boxGeometry args={[0.08, 0.08, 0.08]} />
                                <meshStandardMaterial color={ensureVisible("#00ff9d")} emissive={ensureVisible("#00ff9d")} />
                            </mesh>
                        ))}
                    </group>
                )}

                {/* Sectors */}
                {activeLayers.sectors && (
                    <Icosahedron args={[2.62, 1]} ref={sectorsRef}>
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
            </group>

            {/* Warp Effects */}
            {isWarping ? (
                <>
                    <WarpStars />
                </>
            ) : (
                showStars && <Stars />
            )}
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

export default function HolographicScene({ activeCode, activeLayers, scale = 1, showStars = true, enableRotation = true, isWarping = false }) {
    return (
        <group scale={[scale, scale, scale]}>
            {activeCode === 'FIRMAMENT' ? (
                <FirmamentGlobe activeLayers={activeLayers} showStars={showStars} enableRotation={enableRotation} isWarping={isWarping} />
            ) : (
                <EngineObject code={activeCode} enableRotation={enableRotation} />
            )}
        </group>
    );
}
