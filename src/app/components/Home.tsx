import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const timeRef = useRef(0);

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

    // Track mouse movement and state
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleClick = () => {
      mouseRef.current.isActive = !mouseRef.current.isActive;
    };

    // Set initial mouse state
    mouseRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      isActive: false
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
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
        this.radius = Math.random() * 200 + 50; // Even wider spread
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.003 + 0.001; // Varied speeds
        this.size = Math.random() * 1 + 0.2; // Even smaller particles
        this.opacity = Math.random() * 0.12 + 0.03; // More transparent
        
        // Distribute particles across the screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      update(targetX: number, targetY: number, time: number, isMouseActive: boolean) {
        if (isMouseActive) {
          // Mouse-following behavior
          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const speedMultiplier = Math.min(distance / 200, 2);
          const moveX = dx * this.speed * speedMultiplier;
          const moveY = dy * this.speed * speedMultiplier;
          
          this.x += moveX;
          this.y += moveY;
        } else {
          // Autonomous swirling behavior
          const noiseScale = 0.002;
          const swirl = time * 0.0001;
          
          this.x += Math.sin(time * this.speed + this.angle) * 2;
          this.y += Math.cos(time * this.speed + this.angle) * 2;
          
          // Add circular motion
          const circleX = this.width / 2 + Math.cos(swirl + this.angle) * this.radius;
          const circleY = this.height / 2 + Math.sin(swirl + this.angle) * this.radius;
          
          this.x += (circleX - this.x) * 0.005;
          this.y += (circleY - this.y) * 0.005;
        }
        
        // Keep particles within bounds
        this.x = (this.x + this.width) % this.width;
        this.y = (this.y + this.height) % this.height;
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
    const particleCount = 3500; // Increased number of particles

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height));
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 1;
      
      particles.forEach(particle => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y,
          timeRef.current,
          mouseRef.current.isActive
        );
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
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
