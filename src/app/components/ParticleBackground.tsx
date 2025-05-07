"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const flockConfig = {
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
        value: 100,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#2a2a2a",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: {
          enable: true,
          speed: 0.2,
          minimumValue: 0.3,
        },
      },
      size: {
        value: 2,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        random: false,
        straight: false,
        outModes: {
          default: "out" as const,
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      links: {
        enable: true,
        distance: 80,
        color: "#2a2a2a",
        opacity: 0.2,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  const sandConfig = {
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
        value: 160,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#d4a373",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.4,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom" as const,
        random: true,
        straight: false,
        outModes: {
          default: "out" as const,
        },
        gravity: {
          enable: true,
          acceleration: 0.1,
        },
        drift: {
          enable: true,
          factor: 0.5,
        },
      },
      links: {
        enable: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  // Choose which config to use (flockConfig or sandConfig)
  const activeConfig = flockConfig;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={activeConfig}
    />
  );
}
