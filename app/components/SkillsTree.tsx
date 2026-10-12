"use client";

import {
  Fragment,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import "../styles/SkillsTree.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Skill depth on a 1–5 scale — drawn as the thin underline inside each pill. */
type Level = 1 | 2 | 3 | 4 | 5;

const LEVEL_LABEL: Record<Level, string> = {
  1: "Beginning",
  2: "Exploring",
  3: "Working",
  4: "Advanced",
  5: "Expert",
};

interface Skill {
  name: string;
  level: Level;
  /** Node centre, in percent of the constellation panel. */
  x: number;
  y: number;
}

interface Cluster {
  label: string;
  /** Accent colour for the hub, its links and its skill dots. */
  color: string;
  icon: ReactNode;
  /** Hub centre, in percent of the constellation panel. */
  x: number;
  y: number;
  skills: Skill[];
}

/* ------------------------------------------------------------------ icons */

function IconStar() {
  return (
    <svg
      className="node__icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5 14.4 9.6 21.5 12 14.4 14.4 12 21.5 9.6 14.4 2.5 12 9.6 9.6Z" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg
      className="node__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </svg>
  );
}

function IconLayout() {
  return (
    <svg
      className="node__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
    </svg>
  );
}

function IconData() {
  return (
    <svg
      className="node__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  );
}

function IconTools() {
  return (
    <svg
      className="node__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------- data */

/** The north star every branch hangs from — % of the constellation panel. */
const ROOT = { x: 50, y: 11 };

const CLUSTERS: Cluster[] = [
  {
    label: "Core Languages",
    color: "#6366f1",
    icon: <IconCode />,
    x: 12,
    y: 38,
    skills: [
      { name: "HTML5", level: 5, x: 6.5, y: 55 },
      { name: "CSS3", level: 5, x: 15.5, y: 52 },
      { name: "JavaScript", level: 5, x: 7.5, y: 71 },
      { name: "TypeScript", level: 4, x: 19, y: 65 },
    ],
  },
  {
    label: "Frontend & UI",
    color: "#38bdf8",
    icon: <IconLayout />,
    x: 37,
    y: 38,
    skills: [
      { name: "React", level: 5, x: 29.5, y: 56 },
      { name: "Next.js", level: 5, x: 39.5, y: 53 },
      { name: "Tailwind CSS", level: 5, x: 31.5, y: 70 },
      { name: "Framer Motion", level: 4, x: 45, y: 66 },
      { name: "UI / UX", level: 4, x: 30, y: 90 },
      { name: "Responsive Design", level: 5, x: 43.5, y: 86 },
    ],
  },
  {
    label: "Backend & Data",
    color: "#a855f7",
    icon: <IconData />,
    x: 62,
    y: 38,
    skills: [
      { name: "Node.js", level: 4, x: 54.5, y: 55 },
      { name: "REST APIs", level: 4, x: 66, y: 52 },
      { name: "Firebase", level: 4, x: 56, y: 72 },
      { name: "Firestore", level: 4, x: 66.5, y: 69 },
      { name: "Authentication", level: 4, x: 58.5, y: 91 },
      { name: "OpenAI / AI", level: 4, x: 71.5, y: 87 },
    ],
  },
  {
    label: "Tools & Exploring",
    color: "#34d399",
    icon: <IconTools />,
    x: 86,
    y: 38,
    skills: [
      { name: "Git", level: 4, x: 80, y: 56 },
      { name: "GitHub", level: 4, x: 89.5, y: 53 },
      { name: "Flutter", level: 2, x: 82, y: 71 },
      { name: "Smart Contracts", level: 2, x: 87, y: 88 },
    ],
  },
];

/** Running offset so every skill gets a unique, ordered entrance delay. */
const SKILL_OFFSETS: number[] = (() => {
  const offsets: number[] = [];
  let acc = 0;
  for (const cluster of CLUSTERS) {
    offsets.push(acc);
    acc += cluster.skills.length;
  }
  return offsets;
})();

/**
 * A gentle top-to-bottom S-curve between two nodes — every constellation link
 * flows downwards (root → hub → skills), so control points only need Y.
 */
function curve(x1: number, y1: number, x2: number, y2: number): string {
  const dy = y2 - y1;
  return `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.45} ${x2} ${y2 - dy * 0.45} ${x2} ${y2}`;
}

interface LinkDef {
  key: string;
  d: string;
  color: string;
  cat: string;
  /** True for the four root → hub links (these pulse continuously). */
  core: boolean;
  delay: number;
}

const LINKS: LinkDef[] = CLUSTERS.flatMap((cluster, ci) => [
  {
    key: `core-${ci}`,
    d: curve(ROOT.x, ROOT.y, cluster.x, cluster.y),
    color: cluster.color,
    cat: cluster.label,
    core: true,
    delay: 0.18 + ci * 0.07,
  },
  ...cluster.skills.map(
    (skill, si): LinkDef => ({
      key: `skill-${ci}-${si}`,
      d: curve(cluster.x, cluster.y, skill.x, skill.y),
      color: cluster.color,
      cat: cluster.label,
      core: false,
      delay: 0.55 + (SKILL_OFFSETS[ci] + si) * 0.04,
    }),
  ),
]);

/** Decorative "feature stars" scattered through the gaps of the map. */
const STARS = [
  { x: 8, y: 8, size: 2, delay: 0 },
  { x: 26, y: 14, size: 2.5, delay: 0.6 },
  { x: 36, y: 7, size: 2, delay: 1.35 },
  { x: 47, y: 27, size: 2, delay: 1.2 },
  { x: 66, y: 9, size: 3, delay: 0.3 },
  { x: 92, y: 22, size: 2, delay: 1.5 },
  { x: 94, y: 61, size: 2.5, delay: 0.9 },
  { x: 6, y: 45, size: 2, delay: 1.8 },
  { x: 21, y: 84, size: 2.5, delay: 0.45 },
  { x: 48, y: 79, size: 2, delay: 1.05 },
  { x: 75, y: 95, size: 2, delay: 0.75 },
];

/* -------------------------------------------------------------- component */

interface SkillsTreeProps {
  eyebrow?: string;
  title?: string;
  lede?: string;
  root?: string;
}

export function SkillsTree({
  eyebrow = "My Toolkit",
  title = "Skills Constellation",
  lede = "A living map of the technologies I work with.",
  root = "Full-Stack Developer",
}: SkillsTreeProps) {
  const [active, setActive] = useState<string | null>(null);
  const clearRef = useRef<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  // Highlight a cluster on hover; a short grace period keeps the map from
  // flickering while the pointer travels between a hub and its skill pills.
  const enter = (label: string) => {
    if (clearRef.current !== null) {
      window.clearTimeout(clearRef.current);
      clearRef.current = null;
    }
    setActive(label);
  };
  const leave = () => {
    if (clearRef.current !== null) window.clearTimeout(clearRef.current);
    clearRef.current = window.setTimeout(() => setActive(null), 90);
  };

  const stateOf = (label: string) =>
    active === label ? " is-active" : active ? " is-dim" : "";

  const containerVariants = { hidden: {}, visible: {} };

  const nodeVariants = {
    hidden: reduce ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.65 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.55, delay, ease: EASE },
    }),
  };

  const linkVariants = {
    hidden: { pathLength: reduce ? 1 : 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.8, delay, ease: EASE },
    }),
  };

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="skills__inner">
        <motion.div
          className="skills__head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="skills__eyebrow">{eyebrow}</span>
          <h2
            id="skills-heading"
            className="skills__title big-shoulders-inline-bold"
          >
            {title}
          </h2>
          <p className="skills__lede">{lede}</p>
        </motion.div>

        <motion.div
          className="constellation"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Decorative sky: faint grid + twinkling feature stars. */}
          <span className="constellation__sky" aria-hidden="true">
            {STARS.map((star, i) => (
              <span
                key={i}
                className="sky-star"
                style={
                  {
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: star.size,
                    height: star.size,
                    animationDelay: `${star.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </span>

          {/* Links: base strokes draw in on scroll; pulses ride along them. */}
          <svg
            className="constellation__links"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {LINKS.map((link) => (
              <Fragment key={link.key}>
                <motion.path
                  className={`link${stateOf(link.cat)}`}
                  style={{ "--cat": link.color } as CSSProperties}
                  d={link.d}
                  variants={linkVariants}
                  custom={link.delay}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className={`link link--pulse${link.core ? " link--pulse--core" : ""}${stateOf(link.cat)}`}
                  style={{ "--cat": link.color } as CSSProperties}
                  d={link.d}
                  vectorEffect="non-scaling-stroke"
                />
              </Fragment>
            ))}
          </svg>

          {/* The north star. */}
          <motion.div
            className={`node node--root${active ? " is-quiet" : ""}`}
            style={{ "--x": ROOT.x, "--y": ROOT.y } as CSSProperties}
            variants={nodeVariants}
            custom={0}
          >
            <IconStar />
            <span className="node__label">{root}</span>
          </motion.div>

          {CLUSTERS.map((cluster, ci) => (
            <div
              className="cluster"
              key={cluster.label}
              style={{ "--cat": cluster.color } as CSSProperties}
            >
              <motion.div
                className={`node node--hub${stateOf(cluster.label)}`}
                style={
                  {
                    "--x": cluster.x,
                    "--y": cluster.y,
                    "--cat": cluster.color,
                  } as CSSProperties
                }
                variants={nodeVariants}
                custom={0.3 + ci * 0.08}
                onMouseEnter={() => enter(cluster.label)}
                onMouseLeave={leave}
              >
                {cluster.icon}
                <span className="node__label">{cluster.label}</span>
                <span className="node__count">{cluster.skills.length}</span>
              </motion.div>

              {cluster.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  className={`node node--skill${stateOf(cluster.label)}`}
                  style={
                    {
                      "--x": skill.x,
                      "--y": skill.y,
                      "--cat": cluster.color,
                      "--lvl": skill.level,
                    } as CSSProperties
                  }
                  variants={nodeVariants}
                  custom={0.5 + (SKILL_OFFSETS[ci] + si) * 0.04}
                  title={`${skill.name} · ${LEVEL_LABEL[skill.level]}`}
                  onMouseEnter={() => enter(cluster.label)}
                  onMouseLeave={leave}
                >
                  <span className="node__dot" aria-hidden="true" />
                  <span className="node__name">{skill.name}</span>
                  <span className="node__bar" aria-hidden="true" />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
        {/* 
        <div className='skills__legend'>
          <span className='skills__legend-title'>Skill depth</span>
          <span className='legend-item'>
            <i className='legend-bar' style={{ '--lvl': 5 } as CSSProperties} aria-hidden='true' />
            Expert
          </span>
          <span className='legend-item'>
            <i className='legend-bar' style={{ '--lvl': 4 } as CSSProperties} aria-hidden='true' />
            Advanced
          </span>
          <span className='legend-item'>
            <i className='legend-bar' style={{ '--lvl': 2 } as CSSProperties} aria-hidden='true' />
            Exploring
          </span>
          <span className='skills__legend-hint'>Hover a cluster to trace its links</span>
        </div> */}
      </div>
    </section>
  );
}
