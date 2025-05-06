"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#000000",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 1,
          },
          size: {
            value: 3,
            random: false,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
            },
            attract: {
              enable: true,
              rotateX: 300,
              rotateY: 300,
            },
          },
          links: {
            enable: true,
            distance: 60,
            color: "#000000",
            opacity: 0.3,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "attract",
            },
            resize: true,
          },
          modes: {
            attract: {
              distance: 150,
              duration: 0.4,
              speed: 1.2,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
