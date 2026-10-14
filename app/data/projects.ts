export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  image?: string;
  accent?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "ched-port",
    title: "Reine",
    tagline: "A luxury e-commerce store for branded designer clothing.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Supabase"],
    image: "/reinee.jpg",
    accent: "linear-gradient(135deg, #491498, #6366f1)",
    liveUrl: "https://reine-mocha.vercel.app/",
    featured: true,
  },
  {
    slug: "project-two",
    title: "RealEstate",
    tagline: "Browse, list, and manage properties with live search and maps.",
    year: "2025",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/hero.jpg",
    accent: "linear-gradient(135deg, #0e7490, #6366f1)",
    liveUrl: "https://ched-real-estate.vercel.app/",
  },
  {
    slug: "project-three",
    title: "ChedChurch",
    tagline: "A church website with service times, sermons, and online giving.",
    year: "2025",
    tags: ["Next.js", "REST APIs", "Supabase"],
    image: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg",
    accent: "linear-gradient(135deg, #7c3aed, #db2777)",
    liveUrl: "https://ched-peacechapel.vercel.app/",
  },
];

export const clientProjects: Project[] = [
  {
    slug: "bih",
    title: "Blockchain Innovation Hub",
    tagline: "Advanced software development training for career growth.",
    year: "2023",
    tags: ["React"],
    image: "/bih.png",
    accent: "linear-gradient(135deg, #0f172a, #1d4ed8)",
    liveUrl: "https://bih.com.ng/",
    featured: true,
  },
  {
    slug: "upesa",
    title: "Upesa",
    tagline: "Send and receive money globally with USD and EUR accounts.",
    year: "2026",
    tags: ["Next.js"],
    image: "/upesa.png",
    accent: "linear-gradient(135deg, #064e3b, #10b981)",
    liveUrl: "https://upesa.app/",
    featured: true,
  },
];