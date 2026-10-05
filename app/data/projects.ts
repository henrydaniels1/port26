export interface Project {
  /** Stable id — used as the React key. */
  slug: string;
  title: string;
  /** One-line description shown on the preview card. */
  tagline: string;
  year: string;
  tags: string[];
  /** Optional screenshot in /public, e.g. '/projects/ched-port.png'. */
  image?: string;
  /** CSS gradient used for the card accent + monogram fallback. */
  accent?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Marked with a "Featured" badge on the card. */
  featured?: boolean;
}

/**
 * Newest first — the home page renders these as the "Latest Projects" preview.
 *
 * NOTE: `project-two` and `project-three` are placeholders. Swap them for real
 * work (or delete them) — the grid re-flows automatically for any number of
 * entries, and a card without an `image` falls back to a gradient monogram.
 */
export const projects: Project[] = [
  {
    slug: 'ched-port',
    title: 'Ched-Port',
    tagline:
      'My personal portfolio — an animated hero, an AI assistant trained on my profile, and a fully responsive interface built from scratch.',
    year: '2026',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'OpenAI'],
    accent: 'linear-gradient(135deg, #491498, #6366f1)',
    liveUrl: 'https://ched-port.vercel.app',
    featured: true,
  },
  // TODO: replace with a real project (or delete this entry).
  {
    slug: 'project-two',
    title: 'Project Two',
    tagline:
      'One-line summary of what this project does, who it is for, and the problem it solves.',
    year: '2025',
    tags: ['React', 'Tailwind CSS', 'Firebase'],
    accent: 'linear-gradient(135deg, #0e7490, #6366f1)',
    liveUrl: '#',
    repoUrl: '#',
  },
  // TODO: replace with a real project (or delete this entry).
  {
    slug: 'project-three',
    title: 'Project Three',
    tagline:
      'One-line summary of what this project does, who it is for, and the problem it solves.',
    year: '2025',
    tags: ['Next.js', 'REST APIs', 'Three.js'],
    accent: 'linear-gradient(135deg, #7c3aed, #db2777)',
    liveUrl: '#',
    repoUrl: '#',
  },
];
