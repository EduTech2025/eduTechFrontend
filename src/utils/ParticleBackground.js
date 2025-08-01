'use client';

import { useEffect, useRef } from 'react';

export default function SmogBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('SmogBackground: Canvas ref is NULL');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('SmogBackground: Failed to get 2D context');
      return;
    }

    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Smoke particle class with purple shades
    class SmokeParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 20; // Size: 20-70px
        this.speedY = Math.random() * 0.5 + 0.2; // Upward speed
        this.opacity = Math.random() * 0.15 + 0.05; // Opacity: 0.05-0.2
        this.alphaChange = Math.random() * 0.002 - 0.001; // Subtle variation
      }

      update() {
        this.y -= this.speedY;
        this.opacity = Math.max(0.05, Math.min(0.2, this.opacity + this.alphaChange));
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size
        );
        gradient.addColorStop(0, `rgba(180, 120, 255, ${this.opacity * 0.4})`); // Light purple
        gradient.addColorStop(1, `rgba(80, 0, 150, ${this.opacity * 0.8})`);    // Dark purple
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const smokeParticles = Array.from({ length: 30 }, () => new SmokeParticle());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.79)'; // Background blackish
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      smokeParticles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <div
          className="fixed top-0 left-0 w-[100vw] h-[100vh]"
          style={{ zIndex: -1000, background: 'black' }}
      >
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-[100vw] h-[100vh]"
            style={{ background: 'transparent', zIndex: -800 }}
        />
      </div>
  );
}
