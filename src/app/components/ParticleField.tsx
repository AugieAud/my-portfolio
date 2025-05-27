"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleProps {
  count: number;
  mouse: React.MutableRefObject<[number, number]>;
}

function ParticleSystem({ count, mouse }: ParticleProps) {
  const mesh = useRef<THREE.Points>(null);
  const hover = useRef(false);

  // Create particles
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = Math.random() * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      // Black chrome effect with subtle variations
      const t = Math.random() * 0.15; // Subtle metallic variation
      colors[i * 3] = 0.1 + t;     // R: dark with slight variation
      colors[i * 3 + 1] = 0.1 + t;  // G: match R for grayscale
      colors[i * 3 + 2] = 0.12 + t;  // B: slightly higher for chrome effect
    }

    return {
      positions,
      velocities,
      colors
    };
  }, [count]);

  const { positions, velocities, colors } = particleData;

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Animation loop
  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position;
    const mouseX = (mouse.current[0] / window.innerWidth) * 2 - 1;
    const mouseY = -(mouse.current[1] / window.innerHeight) * 2 + 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Current position
      const x = positions.array[i3];
      const y = positions.array[i3 + 1];
      const z = positions.array[i3 + 2];

      // Force fields
      const angle = time * 0.5 + i * 0.02;
      const forcefield1 = new THREE.Vector3(
        Math.sin(angle) * 2,
        Math.cos(angle) * 2,
        Math.sin(time * 0.3) * 2
      );

      const forcefield2 = new THREE.Vector3(
        mouseX * 3,
        mouseY * 3,
        0
      );

      // Calculate forces
      const distanceToField1 = forcefield1.distanceTo(new THREE.Vector3(x, y, z));
      const distanceToField2 = forcefield2.distanceTo(new THREE.Vector3(x, y, z));

      // Apply forces
      const force1 = forcefield1.sub(new THREE.Vector3(x, y, z)).multiplyScalar(0.0001 / distanceToField1);
      const force2 = forcefield2.sub(new THREE.Vector3(x, y, z)).multiplyScalar(0.0002 / distanceToField2);

      // Update velocities
      velocities[i3] += force1.x + force2.x;
      velocities[i3 + 1] += force1.y + force2.y;
      velocities[i3 + 2] += force1.z + force2.z;

      // Apply damping
      velocities[i3] *= 0.99;
      velocities[i3 + 1] *= 0.99;
      velocities[i3 + 2] *= 0.99;

      // Update positions
      positions.array[i3] += velocities[i3];
      positions.array[i3 + 1] += velocities[i3 + 1];
      positions.array[i3 + 2] += velocities[i3 + 2];

      // Keep particles within bounds
      const bound = 3;
      if (Math.abs(positions.array[i3]) > bound) positions.array[i3] *= 0.95;
      if (Math.abs(positions.array[i3 + 1]) > bound) positions.array[i3 + 1] *= 0.95;
      if (Math.abs(positions.array[i3 + 2]) > bound) positions.array[i3 + 2] *= 0.95;
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleFieldScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = [event.clientX, event.clientY];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleSystem count={2000} mouse={mouse} />
      </Canvas>
    </div>
  );
}
