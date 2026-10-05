'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
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
            <img
              className='project-card__media'
              src={image}
              alt={`${title} — project preview`}
              loading='lazy'
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
        {repoUrl && (
          <a
            className='project-card__action'
            href={repoUrl}
            target='_blank'
            rel='noreferrer noopener'>
            Source
            <CodeIcon />
          </a>
        )}
      </div>
    </motion.article>
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
