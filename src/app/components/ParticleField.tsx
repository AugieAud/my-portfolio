"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleProps {
  count: number;
  mouse: React.MutableRefObject<[number, number]>;
  isMouseDown: React.MutableRefObject<boolean>;
  isMouseInCanvas: React.MutableRefObject<boolean>;
}

function ParticleSystem({
  count,
  mouse,
  isMouseDown,
  isMouseInCanvas,
}: ParticleProps) {
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
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      // Pure black with minimal variation
      const t = Math.random() * 0.03; // Tiny variation for depth
      const baseColor = 0.05; // Very dark base
      colors[i * 3] = baseColor + t; // R
      colors[i * 3 + 1] = baseColor + t; // G
      colors[i * 3 + 2] = baseColor + t; // B
    }

    return {
      positions,
      velocities,
      colors,
    };
  }, [count]);

  const { positions, velocities, colors } = particleData;

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  // Animation loop
  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    const positionsAttr = mesh.current.geometry.attributes.position;
    const positionsArray = positionsAttr.array as Float32Array;
    const mouseX = (mouse.current[0] / window.innerWidth) * 2 - 1;
    const mouseY = -(mouse.current[1] / window.innerHeight) * 2 + 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Current position
      const x = positionsArray[i3];
      const y = positionsArray[i3 + 1];
      const z = positionsArray[i3 + 2];

      // Create flowing streams
      const streamFreq = 0.15;
      const streamSpeed = 0.15;
      
      // Each particle follows a unique flowing path
      const particleOffset = i * 0.1;
      const flowX = Math.sin(time * streamSpeed + particleOffset) * 2;
      const flowY = Math.cos(time * streamSpeed * 0.5 + particleOffset) * 2;
      
      // Add some vertical wave motion
      const waveY = Math.sin(x * streamFreq + time) * 0.5;
      
      // Target position (where particles want to go)
      let targetX, targetY, targetZ;

      if (isMouseDown.current || !isMouseInCanvas.current) {
        // Gentle dispersion
        const dispersionAngle = i * 1234.5678;
        targetX = x + Math.sin(dispersionAngle + time) * 0.1;
        targetY = y + Math.cos(dispersionAngle + time) * 0.1;
        targetZ = z + Math.sin(dispersionAngle * 0.5 + time) * 0.1;
      } else {
        // Flow mode with subtle mouse influence
        const distToMouse = Math.hypot(x - mouseX * 2, y - mouseY * 2);
        const mouseInfluence = Math.max(0, 1 - distToMouse * 0.8) * 0.015;
        
        // Combine flow and mouse influence
        targetX = x + (flowX - x) * 0.01 + (mouseX * 2 - x) * mouseInfluence;
        targetY = y + (flowY + waveY - y) * 0.01 + (mouseY * 2 - y) * mouseInfluence;
        targetZ = z + (Math.sin(time + particleOffset) * 0.1 - z) * 0.01;
      }

      // Update velocities with momentum
      const momentum = 0.98;
      const acceleration = 0.015;
      
      velocities[i3] = velocities[i3] * momentum + (targetX - x) * acceleration;
      velocities[i3 + 1] = velocities[i3 + 1] * momentum + (targetY - y) * acceleration;
      velocities[i3 + 2] = velocities[i3 + 2] * momentum + (targetZ - z) * acceleration;
      
      // Limit speed to prevent particles from moving too fast
      const maxSpeed = 0.03;
      const speed = Math.sqrt(
        velocities[i3] * velocities[i3] + 
        velocities[i3 + 1] * velocities[i3 + 1] + 
        velocities[i3 + 2] * velocities[i3 + 2]
      );
      
      if (speed > maxSpeed) {
        velocities[i3] *= maxSpeed / speed;
        velocities[i3 + 1] *= maxSpeed / speed;
        velocities[i3 + 2] *= maxSpeed / speed;
      }

      // Update positions
      positionsArray[i3] += velocities[i3];
      positionsArray[i3 + 1] += velocities[i3 + 1];
      positionsArray[i3 + 2] += velocities[i3 + 2];
    }

    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.NormalBlending}
        sizeAttenuation={true}
        depthWrite={false}
        map={useMemo(() => {
          try {
            if (typeof window === 'undefined') return null;
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext('2d');
            if (!context) return null;
            
            const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
            
            return new THREE.CanvasTexture(canvas);
          } catch (error) {
            console.error('Error creating particle texture:', error);
            return null;
          }
        }, [])}
      />
    </points>
  );
}

export default function ParticleFieldScene() {
  const mouse = useRef<[number, number]>([0, 0]);
  const isMouseDown = useRef(false);
  const isMouseInCanvas = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = [event.clientX, event.clientY];
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      if (isMouseDown.current !== undefined) {
        isMouseDown.current = true;
      }
    };

    const handleMouseUp = () => {
      if (isMouseDown.current !== undefined) {
        isMouseDown.current = false;
      }
    };

    const handleMouseEnter = () => {
      if (isMouseInCanvas.current !== undefined) {
        isMouseInCanvas.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (isMouseInCanvas.current !== undefined) {
        isMouseInCanvas.current = false;
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleSystem
          count={2000}
          mouse={mouse}
          isMouseDown={isMouseDown}
          isMouseInCanvas={isMouseInCanvas}
        />
      </Canvas>
    </div>
  );
}
