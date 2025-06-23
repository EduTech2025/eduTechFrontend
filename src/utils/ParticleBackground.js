'use client';

import { useEffect, useRef } from 'react';

export default function SmogBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('SmogBackground: STARTED');

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

    console.log('SmogBackground: Canvas and context OK');

    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('SmogBackground: Canvas size:', canvas.width, 'x', canvas.height);
    };
    try {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    } catch (err) {
      console.error('SmogBackground: Resize error:', err);
    }

    // Smoke particle class
    class SmokeParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 20; // Smoke patches (20-70px)
        this.speedY = Math.random() * 0.5 + 0.2; // Slow upward (0.2-0.7px/frame)
        this.opacity = Math.random() * 0.15 + 0.05; // Darker, subtle (0.05-0.2)
        this.alphaChange = Math.random() * 0.002 - 0.001; // Slower opacity variation
        console.log('SmogBackground: Smoke created: x=', this.x, 'y=', this.y, 'size=', this.size);
      }

      update() {
        this.y -= this.speedY; // Move upward
        this.opacity = Math.max(0.05, Math.min(0.2, this.opacity + this.alphaChange)); // Fade within range
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
          console.log('SmogBackground: Smoke respawned: x=', this.x, 'y=', this.y);
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
        gradient.addColorStop(0, `rgba(200, 200, 200, ${this.opacity*0.2})`); // Light gray center
        gradient.addColorStop(1, `rgba(100, 100, 100, ${this.opacity * 0.7})`); // Darker gray edge
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        console.log('SmogBackground: Smoke drawn: x=', this.x, 'y=', this.y, 'size=', this.size);
      }
    }

    // Create smoke particles
    const smokeParticles = Array.from({ length: 30 }, () => new SmokeParticle());
    console.log('SmogBackground: Smoke particles created:', smokeParticles.length);

    // Animation loop
    const animate = () => {
      try {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.79)'; // Solid black background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        smokeParticles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
        console.log('SmogBackground: Frame rendered');
        animationFrameId = requestAnimationFrame(animate);
      } catch (err) {
        console.error('SmogBackground: Animation error:', err);
      }
    };
    animate();

    // Cleanup
    return () => {
      console.log('SmogBackground: Cleaning up');
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-[100vw] h-[100vh]"
      style={{ zIndex: -1000, background: 'black' }}
    >
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center text-gray-500 text-4xl font-bold z-[-900]">
        SMOG BACKGROUND
      </div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-[100vw] h-[100vh]"
        style={{ background: 'transparent', zIndex: -800 }}
      />
    </div>
  );
}