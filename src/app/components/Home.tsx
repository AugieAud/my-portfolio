"use client";

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export default function Home() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    });
  }, [controls]);

  // Create an array of particles with pre-defined paths
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    path: `M${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}`,
    delay: i * 0.1
  }));

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Flowing Background */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {particles.map((particle) => (
          <motion.path
            key={particle.id}
            d={particle.path}
            stroke="url(#gradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.4, 0],
              pathOffset: [0, 1]
            }}
            transition={{
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
          >
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.svg
                width="600"
                height="200"
                viewBox="0 0 600 200"
                className="transform scale-75 md:scale-100"
              >
                <motion.path
                  d="M20 100 Q 300 20, 580 100"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={controls}
                />
                <motion.text
                  x="300"
                  y="100"
                  textAnchor="middle"
                  className="text-5xl md:text-7xl font-bold tracking-wider"
                  fill="white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  PORTFOLIO
                </motion.text>
              </motion.svg>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Creating digital experiences where innovation meets elegance.
            Every pixel, every interaction, crafted with purpose.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
