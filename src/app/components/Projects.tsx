"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

// Define video paths and fallback images
const ButteredBread = "/media/Buttered Bread Demo.mp4";
const PhaserGame = "/media/2D game.mp4";
const Buzzly = "/media/Buzzly Survey.mp4";

// Fallback images in case videos fail to load
const fallbackImages = {
  "Buttered Bread": "/media/Car Insurance.png",
  "Placeholder Title 2D Game": "/media/CLI tool.png",
  "Placeholder Title Buzzly Survey": "/media/Car ID app.png"
};

interface Project {
  title: string;
  description: string;
  mediaUrl: string;
  type: "video" | "image";
  fallbackImage?: string;
}

const projects: Project[] = [
  {
    title: "Buttered Bread",
    description: "My first ever coding project, a website dedicated to my love of sourdough bread. Built using HTML, CSS and vanilla JavaScript. Lot's of room for growth and improvement here but I love the vibe I was going for and it's a great starting point for my journey into web development",
    mediaUrl: ButteredBread,
    type: "video",
    fallbackImage: fallbackImages["Buttered Bread"],
  },
  {
    title: "Placeholder Title 2D Game",
    description: "Placeholder description for 2D Game. Please replace.",
    mediaUrl: PhaserGame,
    type: "video",
    fallbackImage: fallbackImages["Placeholder Title 2D Game"],
  },
  {
    title: "Placeholder Title Buzzly Survey",
    description: "Placeholder description for Buzzly Survey. Please replace.",
    mediaUrl: Buzzly,
    type: "video",
    fallbackImage: fallbackImages["Placeholder Title Buzzly Survey"],
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
  const [isPlaying, setIsPlaying] = useState<boolean[]>(projects.map(() => false));
  const [videoError, setVideoError] = useState(false);
  const [useFallback, setUseFallback] = useState<boolean[]>(projects.map(() => false));
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>(projects.map(() => false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(projects.map(() => null));

  // Navigation handlers
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % projects.length;
    setPage([nextIndex, 1]);
  }, [currentIndex]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setPage([prevIndex, -1]);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const handlePlayPause = () => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;
    
    if (videoLoaded[currentIndex]) {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            const newIsPlaying = [...isPlaying];
            newIsPlaying[currentIndex] = true;
            setIsPlaying(newIsPlaying);
          }).catch(() => {
            setVideoError(true);
            const newUseFallback = [...useFallback];
            newUseFallback[currentIndex] = true;
            setUseFallback(newUseFallback);
          });
        }
      } else {
        video.pause();
        const newIsPlaying = [...isPlaying];
        newIsPlaying[currentIndex] = false;
        setIsPlaying(newIsPlaying);
      }
    }
  };

  useEffect(() => {
    setVideoError(false);
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.pause();
        const newIsPlaying = [...isPlaying];
        newIsPlaying[index] = false;
        setIsPlaying(newIsPlaying);
      }
    });

    const newVideoLoaded = [...videoLoaded];
    newVideoLoaded[currentIndex] = false;
    setVideoLoaded(newVideoLoaded);
  }, [currentIndex]);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isScrolling) return;
      setIsScrolling(true);
      const nextIndex = currentIndex + newDirection;
      if (nextIndex >= 0 && nextIndex < projects.length) {
        setPage([nextIndex, newDirection]);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else {
        setIsScrolling(false);
      }
    },
    [currentIndex, isScrolling]
  );

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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Previous project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Next project"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <motion.div
        className="h-full w-full"
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
              {projects[currentIndex].type === "video" && !useFallback[currentIndex] ? (
                <button
                  className="relative w-full flex justify-center items-center min-h-[400px] max-h-[600px] group"
                  onClick={handlePlayPause}
                >
                  <motion.video
                    key={`video-${currentIndex}-${projects[currentIndex].mediaUrl}`}
                    ref={el => { videoRefs.current[currentIndex] = el; }}
                    src={projects[currentIndex].mediaUrl}
                    className="rounded-lg shadow-lg w-full h-auto object-contain max-h-[600px]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onError={() => {
                      setVideoError(true);
                      const newUseFallback = [...useFallback];
                      newUseFallback[currentIndex] = true;
                      setUseFallback(newUseFallback);
                    }}
                    onCanPlay={() => {
                      setVideoError(false);
                      const newVideoLoaded = [...videoLoaded];
                      newVideoLoaded[currentIndex] = true;
                      setVideoLoaded(newVideoLoaded);
                      
                      if (currentIndex === 0 && !isPlaying.some(playing => playing)) {
                        const video = videoRefs.current[currentIndex];
                        if (video) {
                          setTimeout(() => {
                            video.play().catch(() => {});
                          }, 100);
                        }
                      }
                    }}
                    onPlay={() => {
                      const newIsPlaying = [...isPlaying];
                      newIsPlaying[currentIndex] = true;
                      setIsPlaying(newIsPlaying);
                    }}
                    onPause={() => {
                      const newIsPlaying = [...isPlaying];
                      newIsPlaying[currentIndex] = false;
                      setIsPlaying(newIsPlaying);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {videoError ? (
                      <div className="bg-black bg-opacity-70 p-4 rounded-lg text-white">
                        Error loading video. Switching to fallback image...
                      </div>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-70 transition-opacity duration-200">
                        {!isPlaying[currentIndex] ? (
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
                    )}
                  </div>
                </button>
              ) : (
                <motion.img
                  src={projects[currentIndex].type === "video" && useFallback[currentIndex] && projects[currentIndex].fallbackImage 
                    ? projects[currentIndex].fallbackImage 
                    : projects[currentIndex].mediaUrl}
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
      </motion.div>

      {/* Dots indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setPage([index, index > currentIndex ? 1 : -1]);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-gray-400 hover:bg-gray-200"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}