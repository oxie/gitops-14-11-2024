import React, { useEffect, useRef, useCallback, memo } from 'react';
import { useThrottledCallback } from '../hooks/useThrottledCallback';

const PERFORMANCE_MODE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

const PARTICLE_CONFIG = {
  particleCount: PERFORMANCE_MODE ? 30 : (IS_MOBILE ? 50 : 150),
  connectionDistance: IS_MOBILE ? 80 : 120,
  mouseRadius: IS_MOBILE ? 140 : 200,
  mouseForce: IS_MOBILE ? 0.3 : 0.5,
  baseSpeed: IS_MOBILE ? 0.3 : 0.5,
  friction: 0.97,
  particleAlpha: IS_MOBILE ? 0.25 : 0.35,
  connectionAlpha: IS_MOBILE ? 0.15 : 0.2,
  maxSpeed: IS_MOBILE ? 4 : 6,
  naturalMovement: IS_MOBILE ? 0.03 : 0.05,
  bufferZone: 50
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const isVisibleRef = useRef(true);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 2 : 3);
    const { innerWidth, innerHeight } = window;
    
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;
    
    ctx.scale(dpr, dpr);
    contextRef.current = ctx;
  }, []);

  const createParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const { width, height } = canvasRef.current;
    particlesRef.current = Array.from({ length: PARTICLE_CONFIG.particleCount }, () => {
      const baseRadius = Math.random() * 1.5 + 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed,
        vy: (Math.random() - 0.5) * PARTICLE_CONFIG.baseSpeed,
        radius: baseRadius,
        baseRadius
      };
    });
  }, []);

  const updateParticle = useCallback((particle: Particle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = mouseRef.current.x - particle.x;
    const dy = mouseRef.current.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PARTICLE_CONFIG.mouseRadius) {
      const force = (PARTICLE_CONFIG.mouseRadius - distance) / PARTICLE_CONFIG.mouseRadius;
      const angle = Math.atan2(dy, dx);
      const easing = force * force;
      
      particle.vx += Math.cos(angle) * easing * PARTICLE_CONFIG.mouseForce;
      particle.vy += Math.sin(angle) * easing * PARTICLE_CONFIG.mouseForce;
    }

    particle.vx += (Math.random() - 0.5) * PARTICLE_CONFIG.naturalMovement;
    particle.vy += (Math.random() - 0.5) * PARTICLE_CONFIG.naturalMovement;
    particle.vx *= PARTICLE_CONFIG.friction;
    particle.vy *= PARTICLE_CONFIG.friction;

    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
    if (speed > PARTICLE_CONFIG.maxSpeed) {
      const scale = PARTICLE_CONFIG.maxSpeed / speed;
      particle.vx *= scale;
      particle.vy *= scale;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;

    const { width, height } = canvas;
    if (particle.x < -PARTICLE_CONFIG.bufferZone) particle.x = width + PARTICLE_CONFIG.bufferZone;
    if (particle.x > width + PARTICLE_CONFIG.bufferZone) particle.x = -PARTICLE_CONFIG.bufferZone;
    if (particle.y < -PARTICLE_CONFIG.bufferZone) particle.y = height + PARTICLE_CONFIG.bufferZone;
    if (particle.y > height + PARTICLE_CONFIG.bufferZone) particle.y = -PARTICLE_CONFIG.bufferZone;
  }, []);

  const drawParticles = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 0.5;

    const particles = particlesRef.current;
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const particle = particles[i];
      
      for (let j = i + 1; j < len; j++) {
        const other = particles[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PARTICLE_CONFIG.connectionDistance) {
          const opacity = (1 - distance / PARTICLE_CONFIG.connectionDistance) * PARTICLE_CONFIG.connectionAlpha;
          ctx.strokeStyle = `rgba(250, 189, 0, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(250, 189, 0, ${PARTICLE_CONFIG.particleAlpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const animate = useCallback(() => {
    if (!isVisibleRef.current) return;
    
    const particles = particlesRef.current;
    const len = particles.length;
    
    for (let i = 0; i < len; i++) {
      updateParticle(particles[i]);
    }
    
    drawParticles();
    rafRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticles]);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mouseRef.current = {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr
    };
  }, 16);

  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
    if (isVisibleRef.current && !rafRef.current) {
      animate();
    }
  }, [animate]);

  const handleResize = useThrottledCallback(() => {
    setupCanvas();
    createParticles();
  }, 250);

  useEffect(() => {
    setupCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [setupCanvas, createParticles, animate, handleResize, handleMouseMove, handleVisibilityChange]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        opacity: 0.6,
        touchAction: 'none',
        pointerEvents: 'none',
        zIndex: 1
      }}
      aria-hidden="true"
    />
  );
}

export default memo(ParticleBackground);