import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Set initial mouse position to center
    mouseRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };

    window.addEventListener('mousemove', handleMouseMove);
    setCanvasSize();

    class Particle {
      x: number;
      y: number;
      size: number;
      angle: number;
      speed: number;
      opacity: number;
      width: number;
      height: number;
      centerX: number;
      centerY: number;
      radius: number;

      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.radius = Math.random() * 150 + 50; // Wider spread
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.002 + 0.001; // Varied speeds for flowing effect
        this.size = Math.random() * 1.2 + 0.3; // Smaller particles
        this.opacity = Math.random() * 0.15 + 0.05; // More transparent
        
        // Distribute particles across the screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      update(targetX: number, targetY: number) {
        // Calculate distance to target
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Adjust speed based on distance (particles further away move faster)
        const speedMultiplier = Math.min(distance / 200, 2);
        
        // Calculate movement with inertia
        const moveX = dx * this.speed * speedMultiplier;
        const moveY = dy * this.speed * speedMultiplier;
        
        // Update position with smooth following
        this.x += moveX;
        this.y += moveY;
        
        // Add flowing movement
        this.x += Math.sin(Date.now() * 0.001 + this.angle) * 0.3;
        this.y += Math.cos(Date.now() * 0.001 + this.angle) * 0.3;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 2000; // Increased number of particles

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height));
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const phrases = [
    "Software should be",
    "playful and creative,",
    "just like the people",
    "who build it."
  ];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 }}
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-2xl text-center">
          {phrases.map((phrase, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl md:text-5xl font-light mb-2 tracking-wide"
            >
              {phrase}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
