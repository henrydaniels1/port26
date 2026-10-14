'use client';

import type { CSSProperties } from 'react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import '../styles/ProjectsPreview.css';

/** Matches the --ease token used in ProjectsPreview.css / ViewProjectsButton.css. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProjectsPreviewProps {
  eyebrow?: string;
  title?: string;
  lede?: string;
  /** How many of the newest projects to show. */
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
        {/* {repoUrl && (
          <a
            className='project-card__action'
            href={repoUrl}
            target='_blank'
            rel='noreferrer noopener'>
            Source
            <CodeIcon />
          </a>
        )} */}
      </div>
    </motion.article>
  );
}

const BUBBLE_CONFIG = [
  { size: 18, x: 8,  y: 5  },
  { size: 32, x: 15, y: 18 },
  { size: 12, x: 25, y: 30 },
  { size: 48, x: 78, y: 8  },
  { size: 22, x: 88, y: 22 },
  { size: 10, x: 60, y: 38 },
  { size: 36, x: 50, y: 12 },
  { size: 14, x: 92, y: 45 },
  { size: 26, x: 38, y: 55 },
  { size: 42, x: 5,  y: 48 },
  { size: 16, x: 70, y: 60 },
  { size: 8,  x: 45, y: 68 },
  { size: 54, x: 82, y: 72 },
  { size: 20, x: 20, y: 78 },
  { size: 30, x: 55, y: 82 },
  { size: 24, x: 3,  y: 88 },
  { size: 40, x: 65, y: 92 },
  { size: 14, x: 33, y: 95 },
  { size: 28, x: 90, y: 85 },
  { size: 10, x: 48, y: 42 },
];

/** Generates an array of random offsets to animate through, then loops */
function randomWaypoints(count: number, spread: number): number[] {
  return Array.from({ length: count }, () => (Math.random() - 0.5) * spread * 2);
}

function Bubble({ size, x, y, mouseX, mouseY, seed }: {
  size: number; x: number; y: number; seed: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const repelX = useSpring(0, { stiffness: 90, damping: 20 });
  const repelY = useSpring(0, { stiffness: 90, damping: 20 });

  const dur = 10 + (seed * 7.3) % 18;
  const wxPoints = randomWaypoints(5, 28);
  const wyPoints = randomWaypoints(5, 28);
  const wxLoop = [...wxPoints, wxPoints[0]];
  const wyLoop = [...wyPoints, wyPoints[0]];

  useEffect(() => {
    return mouseX.on('change', () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX.get();
      const dy = cy - mouseY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 140;
      if (dist < radius) {
        const force = (1 - dist / radius) * 55;
        repelX.set((dx / dist) * force);
        repelY.set((dy / dist) * force);
      } else {
        repelX.set(0);
        repelY.set(0);
      }
    });
  }, [mouseX, mouseY, repelX, repelY]);

  // Outer motion.div drifts randomly, inner motion.div handles mouse repel
  return (
    <motion.div
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}
      animate={{ x: wxLoop, y: wyLoop }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: (seed * 1.3) % 5 }}>
      <motion.div
        ref={ref}
        className='bubble'
        style={{ width: size, height: size, x: repelX, y: repelY }}
      />
    </motion.div>
  );
}

function Bubbles() {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <div className='bubbles' aria-hidden='true'>
      {BUBBLE_CONFIG.map((b, i) => (
        <Bubble key={i} {...b} seed={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

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
