import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Text, Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- HYPNOSIS EASTER EGG SHADER ---
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

// Earth Grid (Latitude/Longitude Lines)
function EarthGrid({ radius = 2.5, projection = 'sphere' }) {
    const color = ensureVisible("#0044aa");

    // Sphere Grid
    const sphereGeo = useMemo(() => {
        // Create simple ring geometries for lat/long
        // This is a simplified visual rep using a wireframe sphere
        return new THREE.WireframeGeometry(new THREE.SphereGeometry(radius, 24, 24));
    }, [radius]);

    // Flat Grid
    const flatGeo = useMemo(() => {
        // Plane with grid segments
        return new THREE.WireframeGeometry(new THREE.PlaneGeometry(radius * 3, radius * 1.5, 24, 12));
    }, [radius]);

    if (projection === 'sphere') {
        return (
            <lineSegments geometry={sphereGeo}>
                <lineBasicMaterial color={color} transparent opacity={0.2} />
            </lineSegments>
        );
    } else {
        return (
            <lineSegments geometry={flatGeo}>
                <lineBasicMaterial color={color} transparent opacity={0.2} />
            </lineSegments>
        );
    }
}

// Helper for Entities to switch projections
function EntityCloud({ count, radius, projection, width, height, color = "#00ff9d" }) {
    const points = useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const u = Math.random();
            const v = Math.random();

            if (projection === 'sphere') {
                const theta = 2 * Math.PI * u;
                const phi = Math.acos(2 * v - 1);
                return new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi)
                );
            } else {
                // Flat mapping (Equirectangular-ish)
                const x = (u - 0.5) * width;
                const y = (v - 0.5) * height;
                return new THREE.Vector3(x, y, 0);
            }
        });
    }, [count, radius, projection, width, height]);

    return (
        <group>
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <boxGeometry args={[0.08, 0.08, 0.08]} />
                    <meshStandardMaterial color={color} emissive={color} />
                </mesh>
            ))}
        </group>
    );
}

function FirmamentGlobe({ activeLayers = {}, showStars = true, enableRotation = true, isWarping = false }) {
    const meshRef = useRef();
    const coreRef = useRef();

    // Basic rotation
    useFrame((state, delta) => {
        if (meshRef.current && enableRotation && !isWarping) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Core Globe */}
            <Float speed={enableRotation ? 1 : 0} rotationIntensity={enableRotation ? 0.2 : 0} floatIntensity={enableRotation ? 0.5 : 0}>
                <group>
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
                    {/* Earth Outline Layer */}
                    <EarthGrid radius={2.51} projection="sphere" />
                </group>
            </Float>

            {/* Entities */}
            {activeLayers.entities && (
                <group>
                    {!isWarping && <Constellation radius={2.6} color="#ff0055" count={40} />}
                    <EntityCloud count={40} radius={2.6} projection="sphere" color="#00ff9d" />
                </group>
            )}

            {/* Events Feed (New Layer) */}
            {activeLayers.events && (
                <group rotation={[0, 0, Math.PI / 4]}>
                    {/* Warmer color, slightly offset */}
                    <EntityCloud count={30} radius={2.7} projection="sphere" color="#ffaa00" />
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

            {/* Risk Perimeter (New Layer) */}
            {activeLayers.risks && (
                <Sphere args={[3.0, 24, 24]}>
                    <meshBasicMaterial
                        color="#ff0000"
                        wireframe
                        transparent
                        opacity={0.15}
                    />
                </Sphere>
            )}
        </group>
    );
}

// Flat Projection
function FirmamentFlat({ activeLayers = {}, enableRotation = true }) {
    // A flat map version
    // 2:1 aspect ratio roughly
    const mapWidth = 8;
    const mapHeight = 4;

    return (
        <group>
            {/* Base Plane */}
            <mesh>
                <planeGeometry args={[mapWidth, mapHeight]} />
                <meshStandardMaterial
                    color="#001a10"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                    emissive="#001a10"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Grid Overlay */}
            <group position={[0, 0, 0.01]}>
                <EarthGrid radius={2.5} projection="flat" />
            </group>

            {/* Entities Flattened */}
            {activeLayers.entities && (
                <group position={[0, 0, 0.1]}>
                    <EntityCloud count={40} radius={2.6} projection="flat" width={mapWidth} height={mapHeight} color="#00ff9d" />
                </group>
            )}

            {/* Events Flattened */}
            {activeLayers.events && (
                <group position={[0, 0, 0.15]}>
                    <EntityCloud count={30} radius={2.7} projection="flat" width={mapWidth} height={mapHeight} color="#ffaa00" />
                </group>
            )}

            {/* Sectors (Hex Grid Flat) */}
            {activeLayers.sectors && (
                <group position={[0, 0, 0.05]}>
                    <mesh>
                        <planeGeometry args={[mapWidth, mapHeight, 16, 8]} />
                        <meshBasicMaterial color="#00aaff" wireframe transparent opacity={0.3} />
                    </mesh>
                </group>
            )}

            {/* Risk Perimeter Flattened (Border) */}
            {activeLayers.risks && (
                <group position={[0, 0, 0.02]}>
                    <mesh>
                        <planeGeometry args={[mapWidth + 0.5, mapHeight + 0.5]} />
                        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.3} />
                    </mesh>
                </group>
            )}
        </group>
    );
}



// Dummy Engine Object specific visualization
function EngineObject({ code, enableRotation }) {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current && enableRotation) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <group ref={mesh}>
            <MeshDistortMaterial
                color="#00aaff"
                speed={2}
                distort={0.4}
                radius={1}
                transparent
                opacity={0.6}
            />
            <Icosahedron args={[1.5, 1]} />
            <Text
                position={[0, 0, 2]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {code}
            </Text>
        </group>
    )
}

export default function HolographicScene({ activeCode, activeLayers, scale = 1, showStars = true, enableRotation = true, isWarping = false, projection = 'sphere' }) {
    return (
        <group scale={[scale, scale, scale]}>
            {activeCode === 'FIRMAMENT' ? (
                projection === 'flat' ? (
                    <FirmamentFlat activeLayers={activeLayers} enableRotation={enableRotation} />
                ) : (
                    <FirmamentGlobe activeLayers={activeLayers} showStars={showStars} enableRotation={enableRotation} isWarping={isWarping} />
                )
            ) : (
                <EngineObject code={activeCode} enableRotation={enableRotation} />
            )}
            {/* Warp Effects layer can persist globally if needed, or inside Globe */}
            {isWarping ? <WarpStars /> : (showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />)}
        </group>
    );
}
