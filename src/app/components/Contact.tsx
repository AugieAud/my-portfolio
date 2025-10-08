"use client";

import { motion } from 'framer-motion';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="p-8 max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl font-semibold mb-4"
        variants={itemVariants}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        className="text-foreground opacity-80 mb-4"
        variants={itemVariants}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        I&apos;m always open to new opportunities and collaborations.
      </motion.p>
      <motion.div
        className="space-y-2"
        variants={itemVariants}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.p
          className="flex items-center"
          variants={itemVariants}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="font-medium mr-2">Email:</span>
          <a
            href="mailto:ajschnello@gmail.com"
            className="text-blue-600 hover:underline"
          >
            ajschnello@gmail.com
          </a>
        </motion.p>
        <motion.p
          className="flex items-center"
          variants={itemVariants}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="font-medium mr-2">LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/augie-schnell-067980342/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/augie-schnell-067980342/
          </a>
        </motion.p>
        <motion.p
          className="flex items-center"
          variants={itemVariants}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="font-medium mr-2">Github:</span>
          <a
            href="https://github.com/AugieAud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/AugieAud
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
