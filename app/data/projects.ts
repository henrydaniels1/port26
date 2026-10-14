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
    title: "Ched-Port",
    tagline: "My personal portfolio — an animated hero, an AI assistant trained on my profile, and a fully responsive interface built from scratch.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    accent: "linear-gradient(135deg, #491498, #6366f1)",
    liveUrl: "https://ched-port.vercel.app",
    featured: true,
  },
  {
    slug: "project-two",
    title: "RealEstate",
    tagline: "A modern real-estate platform for browsing, listing, and managing properties — featuring real-time search filters, interactive maps, and a clean agent dashboard.",
    year: "2025",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/hero.jpg",
    accent: "linear-gradient(135deg, #0e7490, #6366f1)",
    liveUrl: "https://ched-real-estate.vercel.app/",
  },
  {
    slug: "project-three",
    title: "ChedChurch",
    tagline: "A modern church website with service schedules, sermon archives, and an online giving portal.",
    year: "2025",
    tags: ["Next.js", "REST APIs", "Three.js"],
    image: "https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg",
    accent: "linear-gradient(135deg, #7c3aed, #db2777)",
    liveUrl: "https://ched-peacechapel.vercel.app/",
  },
];

export const clientProjects: Project[] = [
  {
    slug: "bih",
    title: "Blockchain Innovation Hub",
    tagline: "Join our advanced software development training for the professional growth you desire!",
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
    tagline: "Send & Receive Money Globally — Global USD & EUR accounts, global payout for freelancers, creators, importers and global teams.",
    year: "2026",
    tags: ["Next.js"],
    image: "/upesa.png",
    accent: "linear-gradient(135deg, #064e3b, #10b981)",
    liveUrl: "https://upesa.app/",
    featured: true,
  },
];
