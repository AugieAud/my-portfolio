"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
const ButteredBread = "/media/Buttered Bread Demo.mov";

interface Project {
  title: string;
  description: string;
  mediaUrl: string;
  type: "video" | "image";
}

const projects: Project[] = [
  {
    title: "Buttered Bread",
    description:
      "My first ever coding project, a website dedicated to my love of sourdough bread. Built using HTML, CSS and vanilla JavaScript. Lot's of room for growth and improvement here but I love the vibe I was going for and it's a great starting point for my journey into web development",
    mediaUrl: ButteredBread,
    type: "video",
  },
  {
    title: "Placeholder Title 2D Game",
    description: "Placeholder description for 2D Game. Please replace.",
    mediaUrl: "/media/2D game.mov",
    type: "video",
  },
  {
    title: "Placeholder Title Buzzly Survey",
    description: "Placeholder description for Buzzly Survey. Please replace.",
    mediaUrl: "/media/Buzzly Survey.mov",
    type: "video",
  },
  {
    title: "Placeholder Title CLI Tool",
    description: "Placeholder description for CLI Tool. Please replace.",
    mediaUrl: "/media/CLI tool.png",
    type: "image",
  },
  {
    title: "Placeholder Title Car ID App",
    description: "Placeholder description for Car ID App. Please replace.",
    mediaUrl: "/media/Car ID app.png",
    type: "image",
  },
  {
    title: "Placeholder Title Car Insurance",
    description: "Placeholder description for Car Insurance. Please replace.",
    mediaUrl: "/media/Car Insurance.png",
    type: "image",
  },
  {
    title: "Placeholder Title Marketing Association NZ",
    description: "Placeholder description for Marketing Association NZ. Please replace.",
    mediaUrl: "/media/Marketing Association NZ.png",
    type: "image",
  },
  {
    title: "Placeholder Title Mock Job Interview",
    description: "Placeholder description for Mock Job Interview. Please replace.",
    mediaUrl: "/media/Mock job Interview.png",
    type: "image",
  },
];

export default function Projects() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isScrolling) return;
      setIsScrolling(true);
      const nextIndex = currentIndex + newDirection;
      if (nextIndex >= 0 && nextIndex < projects.length) {
        setPage([nextIndex, newDirection]);
        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else {
        // Reset scrolling state if we can't move in that direction
        setIsScrolling(false);
      }
    },
    [currentIndex, isScrolling]
  );

  // Pause video when switching projects
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isScrolling, paginate]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={() => setIsScrolling(false)}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 gap-8"
        >
          <div className="md:w-2/3 h-full flex items-center justify-center">
            {projects[currentIndex].type === "video" ? (
              <button 
                className="relative w-full flex justify-center items-center min-h-[400px] max-h-[600px] group"
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                      setIsPlaying(true);
                    } else {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                  }
                }}
              >
                <motion.video
                  ref={videoRef}
                  src={projects[currentIndex].mediaUrl}
                  className="rounded-lg shadow-lg w-full h-auto object-contain max-h-[600px]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  loop
                  muted
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-70 transition-opacity duration-200">
                    {!isPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-16 h-16"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-16 h-16"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <motion.img
                src={projects[currentIndex].mediaUrl}
                alt={projects[currentIndex].title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </div>
          <div className="md:w-1/3 flex flex-col justify-center space-y-4 text-center md:text-left">
            <motion.h3
              className="text-3xl font-semibold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {projects[currentIndex].title}
            </motion.h3>
            <motion.p
              className="text-foreground text-xl"
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-foreground w-4"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
