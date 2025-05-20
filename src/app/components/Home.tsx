import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowRef = useRef({ x: 0, y: 0, angle: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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
    window.addEventListener("resize", setCanvasSize);

    // Set initial flow position
    flowRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: 0,
    };

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
        this.radius = Math.random() * 100 + 50; // More consistent clustering
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.0005 + 0.0003; // Even slower, more uniform movement
        this.size = Math.random() * 1.5 + 1.2; // More consistent particle sizes
        this.opacity = Math.random() * 0.15 + 0.1; // More uniform opacity

        // Create initial clusters of particles
        const cluster = Math.floor(Math.random() * 4); // 4 initial clusters
        const clusterSpread = 200; // Spread within each cluster
        const angleSpread = Math.PI / 6; // Angular spread within cluster

        // Position particles in clusters around the screen
        const clusterAngle =
          (cluster * Math.PI) / 2 +
          (Math.random() * angleSpread - angleSpread / 2);
        const clusterDistance = Math.random() * clusterSpread;
        this.x = width / 2 + Math.cos(clusterAngle) * clusterDistance;
        this.y = height / 2 + Math.sin(clusterAngle) * clusterDistance;
      }

      update(time: number) {
        // Create flowing movement with larger patterns
        const timeScale = time * 0.0002; // Slower overall movement

        // Create a moving flow field
        const fieldScale = 0.001; // Scale of the flow field
        const fieldX = Math.sin(timeScale * 0.5) * this.width;
        const fieldY = Math.cos(timeScale * 0.7) * this.height;

        // Individual particle movement within the flow
        const individualFlow = time * this.speed + this.angle;

        // Calculate flow direction based on particle position
        const flowAngle =
          Math.sin(timeScale + (this.x + fieldX) * fieldScale) * Math.PI * 2 +
          Math.cos(timeScale + (this.y + fieldY) * fieldScale) * Math.PI * 2;

        // Create smooth flowing motion
        const flowStrength = 2;
        const flowX = Math.cos(flowAngle) * flowStrength;
        const flowY = Math.sin(flowAngle) * flowStrength;

        // Add some individual variation
        const individualX = Math.sin(individualFlow) * 0.5;
        const individualY = Math.cos(individualFlow) * 0.5;

        // Update position
        this.x += flowX + individualX;
        this.y += flowY + individualY;

        // Wrap around screen edges with smooth transition
        if (this.x < -50) this.x = this.width + 50;
        if (this.x > this.width + 50) this.x = -50;
        if (this.y < -50) this.y = this.height + 50;
        if (this.y > this.height + 50) this.y = -50;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        // Always use rectangles for maximum performance with high particle count
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 50000; // Increased number of particles

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          canvas.getBoundingClientRect().width,
          canvas.getBoundingClientRect().height
        )
      );
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 1;

      particles.forEach((particle) => {
        particle.update(timeRef.current);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
