"use client";

import { extend, useFrame, Canvas, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// GLSL shader
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 st = vUv * 40.0; // increased grid density
    
    // Add mouse influence
    float distToMouse = distance(vUv, uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, distToMouse);
    
    // Animate based on time and mouse
    float noise = random(floor(st + uTime * 0.5));
    noise = mix(noise, 1.0, mouseInfluence * 0.5);
    
    gl_FragColor = vec4(vec3(noise), 0.06);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Create the shader material directly using Three.js
class CustomShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    customShaderMaterial: any;
  }
}

// Register the material with React Three Fiber
extend({ CustomShaderMaterial });

function ShaderPlane() {
  const materialRef = useRef<CustomShaderMaterial>(null);
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.x = event.clientX / size.width;
        materialRef.current.uniforms.uMouse.value.y = 1 - (event.clientY / size.height);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <customShaderMaterial ref={materialRef} />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <Canvas
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <ShaderPlane />
    </Canvas>
  );
}
