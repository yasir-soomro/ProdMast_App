import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, TorusKnot, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Custom function to generate points in a sphere to avoid NaN issues from external libs
const generateSpherePoints = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Uniform point distribution in a sphere
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random()) * radius; // Cubic root for uniform density
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

const ParticleField = (props: any) => {
  const ref = useRef<any>(null);
  // Use useMemo to generate points once
  const sphere = useMemo(() => generateSpherePoints(5000, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00C9A7"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const AnimatedSphere = () => {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
       if(meshRef.current) {
           const time = state.clock.getElapsedTime();
           meshRef.current.rotation.x = time * 0.2;
           meshRef.current.rotation.y = time * 0.3;
       }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={0.8}>
                <MeshDistortMaterial
                    color="#00C9A7"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
};

// New Component for the Welcome Screen
export const Intro3D = ({ exiting }: { exiting: boolean }) => {
  const groupRef = useRef<any>(null);
  const materialRef = useRef<any>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate core
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.5;

      // Exit animation: "Warp Speed" effect
      if (exiting) {
        groupRef.current.position.z += delta * 15; // Fly towards camera
        groupRef.current.rotation.z += delta * 2;
        if(materialRef.current) {
            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, 2.0, delta * 2);
            materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0, delta * 5);
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot args={[1, 0.3, 128, 16]} scale={1.2}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#00C9A7"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive="#004d40"
            emissiveIntensity={0.5}
            transparent={true}
            opacity={1}
          />
        </TorusKnot>
      </Float>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Outer Ring Particles */}
      <Points positions={useMemo(() => generateSpherePoints(1000, 3), [])} stride={3}>
         <PointMaterial transparent color="#38BDF8" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00C9A7" />
        <ParticleField />
        <group position={[0, 0, 0]}>
             <AnimatedSphere />
        </group>
      </Canvas>
    </div>
  );
};