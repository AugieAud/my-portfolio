"use client";

import { motion } from 'framer-motion';

export default function Home() {
  const waves = [
    { y: 20, opacity: 0.2, blur: 10 },
    { y: 35, opacity: 0.3, blur: 20 },
    { y: 50, opacity: 0.4, blur: 30 }
  ];

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Waves */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {waves.map((wave, i) => (
          <motion.div
            key={i}
            className="absolute w-[200%] h-[50vh] -translate-x-1/4"
            style={{
              y: wave.y,
              filter: `blur(${wave.blur}px)`,
              opacity: wave.opacity,
              background: `linear-gradient(90deg, transparent 0%, rgba(79, 70, 229, 0.15) 25%, rgba(99, 102, 241, 0.15) 50%, rgba(79, 70, 229, 0.15) 75%, transparent 100%)`
            }}
            animate={{
              x: ["-25%", "-75%"],
              y: [wave.y - 10, wave.y + 10]
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 20 + i * 5,
                ease: "linear"
              },
              y: {
                repeat: Infinity,
                duration: 5 + i * 2,
                yoyo: true,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center space-y-12 px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Software
            </motion.span>
            <motion.span
              className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              reimagined
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Where creativity meets functionality, and every line of code tells a story.
            Building digital experiences that inspire and delight.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
