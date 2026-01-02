import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'; // Removed useFrame
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { generateSMBPoints } from '../data/smbGenerator';

// Helper to convert Lat/Lng to Vector3 on Sphere
const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
};

// Instanced Mesh for High Performance (10k+ points)
const SMBPointCloud = ({ points, onHover }) => {
    const meshRef = useRef();
    const radius = 5.05; // Slightly above surface

    // Stable objects for transformation
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const color = useMemo(() => new THREE.Color(), []);

    useEffect(() => {
        if (!meshRef.current) return;

        // Update Instance Matrix
        points.forEach((point, i) => {
            const pos = latLngToVector3(point.lat, point.lng, radius);
            tempObject.position.copy(pos);
            tempObject.lookAt(0, 0, 0);
            tempObject.scale.set(1, 1, 1);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            // Set Color based on type (simplified)
            if (point.type === 'Dentist') color.setHex(0xef4444); // Red
            else if (point.type === 'Bakery') color.setHex(0xfbbf24); // Amber
            else if (point.type === 'HVAC') color.setHex(0x3b82f6); // Blue
            else color.setHex(0x10b981); // Emerald

            meshRef.current.setColorAt(i, color);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [points, tempObject, color]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, points.length]}
            onClick={(e) => {
                e.stopPropagation();
                // Get the instance ID
                const instanceId = e.instanceId;
                if (instanceId !== undefined && points[instanceId]) {
                    onHover(points[instanceId]);
                }
            }}
        >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial />
        </instancedMesh>
    );
};

export default function WorldMapProjection({ subSector, searchFilter, isExpanded, onClose }) {
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Generate Data Once
    const allPoints = useMemo(() => generateSMBPoints(8000), []);

    // Filter points
    const filteredPoints = useMemo(() => {
        return allPoints.filter(p => {
            // Sector/Subsector Filter
            if (subSector && subSector !== 'All' && !p.type.includes(subSector)) {
                // Loose mapping
                const map = { 'Dentistry': 'Dentist', 'Bakery': 'Bakery' };
                if (map[subSector] && p.type !== map[subSector]) return false;
            }

            // Search Filter
            if (searchFilter) {
                const search = searchFilter.toLowerCase();
                return p.type.toLowerCase().includes(search);
            }

            return true;
        });
    }, [subSector, searchFilter, allPoints]);

    return (
        <div style={{
            width: '100%',
            height: isExpanded ? '100vh' : '500px',
            position: isExpanded ? 'fixed' : 'relative',
            top: isExpanded ? 0 : 'auto',
            left: isExpanded ? 0 : 'auto',
            zIndex: isExpanded ? 9999 : 1,
            background: '#020617',
            border: isExpanded ? 'none' : '1px solid var(--c-border)',
            borderRadius: isExpanded ? 0 : '12px',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
        }}>
            {isExpanded && (
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '20px', right: '20px', zIndex: 1001,
                        background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer'
                    }}
                >
                    ×
                </button>
            )}

            {/* HUD Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, pointerEvents: 'none' }}>
                <div style={{
                    background: 'rgba(15, 23, 42, 0.9)', padding: '1rem', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', maxWidth: '300px'
                }}>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>Global SMB Index</h3>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                        Displaying: <strong style={{ color: '#3b82f6' }}>{searchFilter || subSector || 'All Sectors'}</strong>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                        {filteredPoints.length.toLocaleString()} <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'normal' }}>active nodes</span>
                    </div>
                </div>
            </div>

            {/* Selected Node Details */}
            {selectedPoint && (
                <div style={{
                    position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 1000, background: 'rgba(15, 23, 42, 0.95)', padding: '1.5rem', borderRadius: '12px',
                    border: '1px solid #3b82f6', backdropFilter: 'blur(10px)', display: 'flex', gap: '1.5rem', alignItems: 'center', minWidth: '400px'
                }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        🏢
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedPoint.type} Business #{selectedPoint.id}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Est. Rev: ${(selectedPoint.revenue / 1000000).toFixed(1)}M • Pain Point: {selectedPoint.painPoint}</div>
                        <div style={{ marginTop: '0.5rem' }}>
                            <button style={{ padding: '4px 8px', background: '#10b981', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                ANALYZE SOLUTION
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Base Earth */}
                <mesh>
                    <sphereGeometry args={[5, 64, 64]} />
                    <meshPhongMaterial color="#0f172a" emissive="#020617" specular="#111111" shininess={10} />
                </mesh>
                <mesh>
                    <sphereGeometry args={[5.01, 32, 32]} />
                    <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.2} />
                </mesh>

                <SMBPointCloud points={filteredPoints} onHover={setSelectedPoint} />

                <OrbitControls enablePan={true} enableZoom={true} minDistance={6} maxDistance={20} autoRotate={!selectedPoint} autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
