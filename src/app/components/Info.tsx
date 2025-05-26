"use client";

import { motion } from 'framer-motion';

export default function Info() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-8 max-w-2xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-semibold mb-4"
      >
        About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 leading-relaxed"
      >
        I am a full stack developer passionate about building beautiful and
        functional web experiences. With expertise in modern web technologies, I
        focus on creating intuitive interfaces and meaningful interactions.
        <br />
        <br />
        Born in Rotorua Aotearoa and currently living in Wellington, I enjoy
        running, cooking and walking my dog in my free time. Also I wont shut up
        about the time I walked Te Araroa.
      </motion.p>
    </motion.div>
  );
}
