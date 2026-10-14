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
    slug: "ched-port",
    title: "Ched-Port",
    tagline:
      "My personal portfolio — an animated hero, an AI assistant trained on my profile, and a fully responsive interface built from scratch.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    accent: "linear-gradient(135deg, #491498, #6366f1)",
    liveUrl: "https://ched-port.vercel.app",
    featured: true,
  },
  {
    slug: "project-two",
    title: "RealEstate",
    tagline:
      "A modern real-estate platform for browsing, listing, and managing properties — featuring real-time search filters, interactive maps, and a clean agent dashboard.",
    year: "2025",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/hero.jpg",
    accent: "linear-gradient(135deg, #0e7490, #6366f1)",
    liveUrl: "https://ched-real-estate.vercel.app/",
    repoUrl: "#",
  },
  // TODO: replace with a real project (or delete this entry).
  {
    slug: "project-three",
    title: "ChedChurch",
    tagline:
      "One-line summary of what this project does, who it is for, and the problem it solves.",
    year: "2025",
    tags: ["Next.js", "REST APIs", "Three.js"],
     image: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg",
    accent: "linear-gradient(135deg, #7c3aed, #db2777)",
    liveUrl: "https://ched-peacechapel.vercel.app/",
    repoUrl: "#",
  },
];
