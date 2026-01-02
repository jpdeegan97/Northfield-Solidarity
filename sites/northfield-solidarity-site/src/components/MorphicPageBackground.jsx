import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ theme }) {
    const sphereRef = useRef();

    useFrame((state) => {
        if (sphereRef.current) {
            // Slow rotation for extra movement
            sphereRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    // Dark/Muted colors for background
    const color = theme === 'green' ? '#022c22' : (theme === 'gold' ? '#451a03' : '#0f172a');

    return (
        <Sphere ref={sphereRef} args={[1, 64, 64]} scale={[2, 2, 2]}> {/* Normalized scale, camera zoom handles size */}
            <MeshDistortMaterial
                color={color}
                envMapIntensity={0.4}
                clearcoat={0.3}
                clearcoatRoughness={0.5}
                metalness={0.2}
                roughness={0.4}
                distort={0.4}      // Rippling liquid effect
                speed={1.5}        // Speed of the morph
                side={THREE.DoubleSide}
            />
        </Sphere>
    );
}

export default function MorphicPageBackground({ theme = 'water' }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0, // Behind content (Layout has content at z-index 1)
            pointerEvents: 'none', // Allow clicking through
            opacity: 0.6 // Subtle blend
        }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme === 'green' ? '#22c55e' : '#38bdf8'} />

                <AnimatedSphere theme={theme} />
            </Canvas>
        </div>
    );
}
