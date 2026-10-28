'use client';

import { useRef, useEffect } from 'react';
import '../styles/ProjectsPreview.css';

const BUBBLE_SIZES = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 42, 48, 54, 28, 10];

const INITIAL_BUBBLE_STATE = BUBBLE_SIZES.map((size, i) => ({
  size,
  x: 5 + (i / BUBBLE_SIZES.length) * 88,
  y: 2 + (i * 4.85) % 94,
  vx: (Math.random() - 0.5) * 0.7,
  vy: (Math.random() - 0.5) * 0.7,
  el: null as HTMLDivElement | null,
}));

export function Bubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const stateRef = useRef(INITIAL_BUBBLE_STATE);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll<HTMLDivElement>('.bubble');
    els.forEach((el, i) => { stateRef.current[i].el = el; });

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;

    const tick = () => {
      const W = container.offsetWidth;
      const H = container.offsetHeight;
      if (W === 0 || H === 0) { raf = requestAnimationFrame(tick); return; }

      stateRef.current.forEach(b => {
        if (!b.el) return;

        const bx = (b.x / 100) * W + b.size / 2;
        const by = (b.y / 100) * H + b.size / 2;
        const rect = container.getBoundingClientRect();
        const mx = mouseRef.current.x - rect.left;
        const my = mouseRef.current.y - rect.top;
        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const REPEL_R = 140;
        if (dist < REPEL_R && dist > 0) {
          const force = ((REPEL_R - dist) / REPEL_R) * 0.6;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }

        if (Math.random() < 0.005) {
          b.vx += (Math.random() - 0.5) * 0.5;
          b.vy += (Math.random() - 0.5) * 0.5;
        }

        b.vx *= 0.983;
        b.vy *= 0.983;
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const MAX_SPEED = 2.0;
        if (speed > MAX_SPEED) {
          b.vx = (b.vx / speed) * MAX_SPEED;
          b.vy = (b.vy / speed) * MAX_SPEED;
        }

        b.x += (b.vx / W) * 100;
        b.y += (b.vy / H) * 100;

        const rw = (b.size / W) * 100;
        const rh = (b.size / H) * 100;
        if (b.x < 0)        { b.x = 0;        b.vx =  Math.abs(b.vx); }
        if (b.x > 100 - rw) { b.x = 100 - rw; b.vx = -Math.abs(b.vx); }
        if (b.y < 0)        { b.y = 0;        b.vy =  Math.abs(b.vy); }
        if (b.y > 100 - rh) { b.y = 100 - rh; b.vy = -Math.abs(b.vy); }

        b.el.style.left = `${b.x}%`;
        b.el.style.top  = `${b.y}%`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className='bubbles' aria-hidden='true'>
      {BUBBLE_SIZES.map((size, i) => (
        <div key={i} className='bubble' style={{ width: size, height: size }} />
      ))}
    </div>
  );
}
