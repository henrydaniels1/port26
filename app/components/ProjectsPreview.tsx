'use client';

import type { CSSProperties } from 'react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects, clientProjects, type Project } from '../data/projects';
import '../styles/ProjectsPreview.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProjectsPreviewProps {
  eyebrow?: string;
  title?: string;
  lede?: string;
  max?: number;
}

export function ProjectsPreview({
  eyebrow = 'Selected Work',
  title = 'Latest Projects',
  lede = 'A short look at what I have been building lately — full-stack applications, interfaces and experiments, each one focused on speed, motion and clean structure.',
  max = 3,
}: ProjectsPreviewProps) {
  const items = projects.slice(0, max);

  return (
    <section id='projects' className='projects' aria-labelledby='projects-heading'>
      <Bubbles />
      <div className='projects__inner'>
        <motion.div
          className='projects__head'
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <span className='projects__eyebrow'>{eyebrow}</span>
          <h2 id='projects-heading' className='projects__title big-shoulders-inline-bold'>
            {title}
          </h2>
          <p className='projects__lede'>{lede}</p>
        </motion.div>

        <div className='projects__list'>
          {items.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Company websites */}
        <motion.div
          className='projects__head projects__head--client'
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <span className='projects__eyebrow'>Client Work</span>
          <h2 className='projects__title big-shoulders-inline-bold'>Company Websites</h2>
          <p className='projects__lede'>Websites I have built for real businesses and organisations.</p>
        </motion.div>

        <div className='projects__list'>
          {clientProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, tagline, year, tags, image, accent, liveUrl, repoUrl, featured } = project;
  const primaryUrl = liveUrl ?? repoUrl ?? '#projects';

  return (
    <motion.article
      className='project-card'
      style={{ '--card-accent': accent } as CSSProperties}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: EASE }}>
      <a className='project-card__main' href={primaryUrl} target='_blank' rel='noreferrer noopener'>
        <div className='project-card__cover'>
          {featured && <span className='project-card__badge'>Featured</span>}
          {image ? (
            <Image
              className='project-card__media'
              src={image}
              alt={`${title} — project preview`}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          ) : (
            <span className='project-card__monogram' aria-hidden='true'>
              {title.charAt(0)}
            </span>
          )}
        </div>

        <div className='project-card__body'>
          <div className='project-card__meta'>
            <h3 className='project-card__title'>{title}</h3>
            <span className='project-card__year'>{year}</span>
          </div>
          <p className='project-card__tagline'>{tagline}</p>
          <ul className='project-card__tags'>
            {tags.map(tag => (
              <li key={tag} className='project-card__tag'>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </a>

      <div className='project-card__actions'>
        {liveUrl && (
          <a
            className='project-card__action'
            href={liveUrl}
            target='_blank'
            rel='noreferrer noopener'>
            Live demo
            <ArrowUpRight />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ---------- Physics-based Bubbles ----------

const BUBBLE_SIZES = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 42, 48, 54, 28, 10];

const INITIAL_BUBBLE_STATE = BUBBLE_SIZES.map((size, i) => ({
  size,
  x: 5 + (i / BUBBLE_SIZES.length) * 88,
  y: 2 + (i * 4.85) % 94,
  vx: (Math.random() - 0.5) * 0.7,
  vy: (Math.random() - 0.5) * 0.7,
  el: null as HTMLDivElement | null,
}));

function Bubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const stateRef = useRef(INITIAL_BUBBLE_STATE);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wire up DOM elements
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

        // Convert bubble centre to screen px for repel calculation
        const bx = (b.x / 100) * W + b.size / 2;
        const by = (b.y / 100) * H + b.size / 2;
        const rect = container.getBoundingClientRect();
        const mx = mouseRef.current.x - rect.left;
        const my = mouseRef.current.y - rect.top;
        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Push away from cursor
        const REPEL_R = 140;
        if (dist < REPEL_R && dist > 0) {
          const force = ((REPEL_R - dist) / REPEL_R) * 0.6;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }

        // Random nudge so bubbles never fully stop
        if (Math.random() < 0.005) {
          b.vx += (Math.random() - 0.5) * 0.5;
          b.vy += (Math.random() - 0.5) * 0.5;
        }

        // Dampen & cap speed
        b.vx *= 0.983;
        b.vy *= 0.983;
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const MAX_SPEED = 2.0;
        if (speed > MAX_SPEED) {
          b.vx = (b.vx / speed) * MAX_SPEED;
          b.vy = (b.vy / speed) * MAX_SPEED;
        }

        // Advance position (px → %)
        b.x += (b.vx / W) * 100;
        b.y += (b.vy / H) * 100;

        // Bounce off walls
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

// ---------- Icons ----------

function ArrowUpRight() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M7 17 17 7' />
      <path d='M8 7h9v9' />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='m16 18 6-6-6-6' />
      <path d='m8 6-6 6 6 6' />
    </svg>
  );
}
