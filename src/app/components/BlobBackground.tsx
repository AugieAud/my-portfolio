"use client";

import { motion } from "framer-motion";

export default function BlobBackground() {
  return (
    <motion.svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className="fixed top-[-200px] left-[-200px] z-0 w-[800px] h-[800px] opacity-20"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity }}
    >
      <motion.path
        fill="#000000"
        animate={{
          d: [
            "M438.5,307Q400,364,339,388.5Q278,413,212.5,384Q147,355,117.5,297.5Q88,240,125,182.5Q162,125,223,91Q284,57,341.5,95.5Q399,134,439,187Q479,240,438.5,307Z",
            "M428.5,296Q383,352,326,390Q269,428,202,390Q135,352,115.5,296Q96,240,129,176.5Q162,113,224.5,82Q287,51,336.5,93.5Q386,136,428.5,188Q471,240,428.5,296Z",
            "M438.5,307Q400,364,339,388.5Q278,413,212.5,384Q147,355,117.5,297.5Q88,240,125,182.5Q162,125,223,91Q284,57,341.5,95.5Q399,134,439,187Q479,240,438.5,307Z",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}
