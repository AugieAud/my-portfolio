"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <motion.div
      className="flex h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1"></div> {/* This will push content to the right */}
      <div className="flex items-center justify-center w-full max-w-4xl px-8">
        <div className="space-y-6 w-full">
        <motion.h1
          className="text-6xl md:text-8xl font-sans font-bold text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
        
        </motion.h1>
        <motion.div
          className="text-2xl md:text-3xl text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "Creative Problem Solver",
              2000,
              "Avid Runner and Sourdough Baker",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>
          <motion.p
            className="text-lg text-foreground opacity-80 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
