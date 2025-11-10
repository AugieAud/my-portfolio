"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

// Define video paths and fallback images
const ButlerBurgers = "/media/Butlerburger.mov";
const ButteredBread = "/media/Buttered Bread Demo.mp4";
const Buzzly = "/media/Buzzly Survey.mp4";

// Fallback images in case videos fail to load
const fallbackImages = {
  "Buttered Bread": "/media/Car Insurance.png",
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
    title: "Butler Burgers",
    description: "Designed and built for an American based burger restaurant. I worked closely with the client, communicating across timezones, to create a website that reflected their vision. I created the logo using Inkscape and was resposible for the planning, development, revisions and deployment on Netlify. Built using Javascript, HTML and Bootstrap.",
    mediaUrl: ButlerBurgers,
    type: "video",
    fallbackImage: fallbackImages["Placeholder Title Buzzly Survey"],
  },
  {
    title: "Buzzly Sponsor Dashboard",
    description: "This was for my internship at Buzzly, a New Zealand based company. I was responsible for creating part of the sponsor dashboard, building user authentication and creating a survey builder. Built using React, Typescript, AWS and Strapi CMS.",
    mediaUrl: Buzzly,
    type: "video",
    fallbackImage: fallbackImages["Placeholder Title Buzzly Survey"],
  },
  {
    title: "Buttered Bread",
    description: "My first ever coding project, a website dedicated to my love of sourdough bread. Built using HTML, CSS and vanilla JavaScript. Lot's of room for growth and improvement here but I love the vibe I was going for and it's a great starting point for my journey into web development",
    mediaUrl: ButteredBread,
    type: "video",
    fallbackImage: fallbackImages["Buttered Bread"],
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
  const totalSlides = projects.length + 1; // extra slide for GitHub CTA

  // Navigation handlers
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    setPage([nextIndex, 1]);
  }, [currentIndex, totalSlides]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    setPage([prevIndex, -1]);
  }, [currentIndex, totalSlides]);

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
        setIsPlaying((prev) => {
          const newIsPlaying = [...prev];
          newIsPlaying[currentIndex] = false;
          return newIsPlaying;
        });
      }
    }
  };

  useEffect(() => {
    setVideoError(false);
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.pause();
        setIsPlaying((prev) => {
          const copy = [...prev];
          copy[index] = false;
          return copy;
        });
      }
    });

    if (currentIndex < projects.length) {
      setVideoLoaded((prev) => {
        const copy = [...prev];
        copy[currentIndex] = false;
        return copy;
      });
    }
  }, [currentIndex, projects.length]);

  // Attempt to autoplay when the current project changes and the video is ready
  useEffect(() => {
    if (currentIndex >= projects.length) return;
    const video = videoRefs.current[currentIndex];
    if (!video) return;
    if (video.readyState >= 3) {
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    }
  }, [currentIndex]);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isScrolling) return;
      setIsScrolling(true);
      const nextIndex = currentIndex + newDirection;
      if (nextIndex >= 0 && nextIndex < totalSlides) {
        setPage([nextIndex, newDirection]);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else {
        setIsScrolling(false);
      }
    },
    [currentIndex, isScrolling, totalSlides]
  );

  // Use paginate in the keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

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
      {/* Navigation Arrows (show only on hover over side zones) */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <button
          onClick={goToPrev}
          className="group absolute left-0 top-0 h-full w-1/4 flex items-center pl-2 pointer-events-auto"
          aria-label="Previous project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-foreground stroke-current opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="group absolute right-0 top-0 h-full w-1/4 flex items-center justify-end pr-4 pointer-events-auto"
          aria-label="Next project"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-foreground stroke-current opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

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
            className="absolute inset-0 p-6"
          >
            <div className="mx-auto max-w-5xl h-full flex flex-col md:flex-row items-center justify-center gap-6">
            {currentIndex < projects.length ? (
              <>
                <div className="md:w-3/5 h-full flex items-center justify-center">
                  {projects[currentIndex].type === "video" && !useFallback[currentIndex] ? (
                    <button
                      className="relative w-full flex justify-center items-center min-h-[400px] max-h-[600px] group"
                      onClick={handlePlayPause}
                    >
                      <motion.video
                        key={`video-${currentIndex}-${projects[currentIndex].mediaUrl}`}
                        ref={el => { videoRefs.current[currentIndex] = el; }}
                        src={projects[currentIndex].mediaUrl}
                        className="rounded-lg shadow-lg w-full h-auto object-contain max-h-[480px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onError={() => {
                          setVideoError(true);
                          setUseFallback((prev) => {
                            const newUseFallback = [...prev];
                            newUseFallback[currentIndex] = true;
                            return newUseFallback;
                          });
                        }}
                        onCanPlay={() => {
                          setVideoError(false);
                          setVideoLoaded((prev) => {
                            const newVideoLoaded = [...prev];
                            newVideoLoaded[currentIndex] = true;
                            return newVideoLoaded;
                          });
                          // Always try to autoplay the current slide when it can play
                          const video = videoRefs.current[currentIndex];
                          if (video) {
                            setTimeout(() => {
                              video.play().catch(() => {});
                            }, 100);
                          }
                        }}
                        onPlay={() => {
                          setIsPlaying((prev) => {
                            const newIsPlaying = [...prev];
                            newIsPlaying[currentIndex] = true;
                            return newIsPlaying;
                          });
                        }}
                        onPause={() => {
                          setIsPlaying((prev) => {
                            const newIsPlaying = [...prev];
                            newIsPlaying[currentIndex] = false;
                            return newIsPlaying;
                          });
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
                      className="rounded-lg shadow-lg w-full h-auto object-contain max-h-[520px]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </div>
                <div className="md:w-2/5 flex flex-col justify-center space-y-4 text-center md:text-left">
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
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <motion.h3
                  className="text-3xl font-semibold mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  See what else I&apos;ve been up to on GitHub
                </motion.h3>
                <motion.a
                  href="https://github.com/AugieAud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-white text-black font-medium shadow hover:shadow-lg transition"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Visit my GitHub
                </motion.a>
              </div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dots indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
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
            aria-label={index < projects.length ? `Go to project ${index + 1}` : "Go to GitHub slide"}
          />
        ))}
      </div>
    </div>
  );
}