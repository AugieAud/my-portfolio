"use client";

import { useEffect, useRef } from "react";

export default function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function generateNoise(context: CanvasRenderingContext2D) {
      const imageData = context.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] =
          (255 << 24) | // Alpha
          ((Math.random() * 255) << 16) | // Red
          ((Math.random() * 255) << 8) | // Green
          (Math.random() * 255); // Blue
      }
      context.putImageData(imageData, 0, 0);
    }

    let frame: number;
    const render = () => {
      generateNoise(ctx);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none"
    />
  );
}
