'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import '../styles/SkillsTree.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Branch {
  label: string;
  /** Accent colour for the node border and skill dots. */
  color: string;
  skills: string[];
}

const BRANCHES: Branch[] = [
  {
    label: 'Frontend',
    color: '#6366f1',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend & Data',
    color: '#a855f7',
    skills: ['Node.js', 'REST APIs', 'Firebase', 'Firestore', 'OpenAI / AI', 'Authentication'],
  },
  {
    label: 'Tools & More',
    color: '#38bdf8',
    skills: ['Git', 'GitHub', 'UI / UX', 'Responsive Design', 'Flutter (learning)', 'Smart Contracts'],
  },
];

interface SkillsTreeProps {
  eyebrow?: string;
  title?: string;
  lede?: string;
  root?: string;
}

export function SkillsTree({
  eyebrow = 'My Toolkit',
  title = 'Skills Tree',
  lede = 'A living map of the technologies I grow with — roots in core web fundamentals, branching up through the frontend, backend and the tools I reach for every day.',
  root = 'Full-Stack Developer',
}: SkillsTreeProps) {
  return (
    <section id='skills' className='skills' aria-labelledby='skills-heading'>
      <div className='skills__inner'>
        <motion.div
          className='skills__head'
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <span className='skills__eyebrow'>{eyebrow}</span>
          <h2 id='skills-heading' className='skills__title big-shoulders-inline-bold'>
            {title}
          </h2>
          <p className='skills__lede'>{lede}</p>
        </motion.div>

        <motion.div
          className='skills-tree'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <div className='tree-branches'>
            {BRANCHES.map((branch, i) => (
              <motion.div
                key={branch.label}
                className='tree-branch'
                style={{ '--cat': branch.color } as CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}>
                <span className='tree-branch__node'>{branch.label}</span>
                <ul className='tree-branch__skills'>
                  {branch.skills.map(skill => (
                    <li key={skill} className='tree-branch__skill'>
                      <span className='tree-branch__dot' aria-hidden='true' />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className='tree-trunk' aria-hidden='true' />

          <div className='tree-root'>
            <span className='tree-root__glow' aria-hidden='true' />
            {root}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
