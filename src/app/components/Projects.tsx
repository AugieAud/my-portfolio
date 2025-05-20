"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of project 1. Replace this with your actual project description.",
    imageUrl: "/project1.jpg" // Add your actual image path
  },
  {
    title: "Project 2",
    description: "Description of project 2. Replace this with your actual project description.",
    imageUrl: "/project2.jpg" // Add your actual image path
  }
];

export default function Projects() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isScrolling, setIsScrolling] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    if (isScrolling) return;
    setIsScrolling(true);
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < projects.length) {
      setPage([nextIndex, newDirection]);
    }
  }, [currentIndex, isScrolling]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, isScrolling, paginate]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsScrolling(false)}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 gap-8"
        >
          <div className="md:w-1/2 h-full flex items-center justify-center">
            <motion.img
              src={projects[currentIndex].imageUrl}
              alt={projects[currentIndex].title}
              className="w-full h-[400px] object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <motion.h3
              className="text-3xl font-semibold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {projects[currentIndex].title}
            </motion.h3>
            <motion.p
              className="text-gray-600 text-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {projects[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gray-800 w-4' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
