"use client";

import Link from "next/link";
import { FileDown, Code2, ClipboardCheck, Wallet, Users } from "lucide-react";
import "../styles/About.css";
import { Bubbles } from "../components/Bubbles";

const experienceData = [
  {
    period: "Aug 2025 – Present",
    title: "Frontend Developer & QA Engineer",
    place: "Upesa",
    note: "Building and testing financial application interfaces, with a focus on transaction workflows, wallet balances, currency exchange, and reliable user experiences.",
  },
  {
    period: "2023 – 2024",
    title: "Lead Frontend Developer",
    place: "Blockchain Innovation Hub, Ibadan",
    note: "Led frontend development and contributed to reusable UI patterns, code quality, and team delivery.",
  },
  {
    period: "2023 – 2024",
    title: "Frontend Developer (contract)",
    place: "Bricks and Steels",
    note: "Developed responsive, client-facing web interfaces while contributing to frontend projects alongside my work at the hub.",
  },
];

const highlightsData = [
  { title: "3rd place", detail: "Hedera hackathon" },
  { title: "Best Frontend Developer", detail: "Blockchain Innovation Hub, 2023" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* ===================== About Hero ===================== */}
      <section className="about-hero">
        <Bubbles />
        <div className="about-hero__squares" aria-hidden="true">
          {[1,2,3,4,5,6,7,8].map(n => (
            <div key={n} className={`about-sq about-sq-${n}`} />
          ))}
        </div>
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">
            <span className="about-hero__dot"></span>
            About Me
          </p>
          <h1 className="about-hero__title">
            Building digital experiences that <span className="about-hero__title-accent">matter</span>
          </h1>
          <p className="about-hero__lede">
          I'm a Frontend Developer and QA Engineer focused on building responsive, user-friendly web applications with React, Next.js,
           and TypeScript. I work at the intersection of development and quality assurance, turning designs into functional interfaces and testing critical user flows to ensure reliable product experiences. Currently,
           I'm expanding my skills in React Native and mobile application development.
          </p>
          <div className="about-hero__actions">
            <a
              href="/cv/Henry-Daniel_Ezenwa_CV.docx"
              className="about-hero__btn-ghost"
              download
            >
              <FileDown size={18} />
              Download CV
            </a>
            <a href="#experience" className="about-hero__btn-solid">
              Explore Experience
            </a>
          </div>
        </div>
      </section>

      {/* ===================== Profile Snapshot ===================== */}
      <section className="section about-section" id="about">
        <div className="about-section__inner">
          <div className="about-section__head about-section__head--tall">
            <p className="about-section__eyebrow">Profile Snapshot</p>
            <h2 className="about-section__title">A quick snapshot of what I do</h2>
            <p className="about-section__lede">
              I build intuitive interfaces and reliable web applications, combining frontend engineering with a strong focus on product quality.
            </p>
          </div>

          <div className="about-section__grid">
            {[
              {
                icon: Code2,
                label: "Frontend Development",
                text: "Building responsive, accessible interfaces and web applications with React, Next.js, TypeScript, and Tailwind CSS.",
              },
              {
                icon: ClipboardCheck,
                label: "Quality Assurance",
                text: "Testing critical user flows, documenting bugs, validating expected results, and investigating issues across staging environments.",
              },
              {
                icon: Wallet,
                label: "Fintech & Payments",
                text: "Working with financial application interfaces, transaction flows, currency exchange, wallet balances, and virtual accounts.",
              },
              {
                icon: Users,
                label: "Technical Leadership",
                text: "Frontend leadership experience, reusable UI development, collaboration, and maintaining code quality.",
              },
            ].map((item, i) => (
              <div key={i} className="about-card">
                <div className="about-card__emoji">
                  <item.icon size={24} aria-hidden="true" />
                </div>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Experience ===================== */}
      <section className="section about-section about-section--alt" id="experience">
        <div className="about-section__inner">
          <div className="about-section__head">
            <p className="about-section__eyebrow">Experience</p>
            <h2 className="about-section__title">My professional journey</h2>
            <p className="about-section__lede">
              My experience spans frontend development, product quality, and technical leadership across client projects and financial applications.
            </p>
          </div>

          {/* --- React Native --- */}
          <div className="about-card about-card--accent about-card--rn">
            <div className="about-card__header">
              <span className="about-card__tag about-card__tag--rn">React Native</span>
              <h3 className="about-card__title">Expanding into Mobile Development</h3>
            </div>
            <p className="about-card__lede">
              I'm expanding my frontend expertise into mobile development with React Native and TypeScript. My focus is on reusable components, navigation, API integration, and delivering consistent user experiences across iOS and Android.
            </p>
            <ul className="about-card__bullets">
              <li>
                <strong>Focus</strong> — reusable UI components, navigation flows, and API integration.
              </li>
              <li>
                <strong>Quality</strong> — paying attention to layout consistency, navigation, and interactions as I build mobile projects.
              </li>
              <li>
                <strong>Stack</strong> — React Native and TypeScript, with supporting libraries selected to fit each project.
              </li>
            </ul>
          </div>

          {/* --- FX Journey --- */}
          <div className="about-card about-card--accent about-card--fx">
            <div className="about-card__header">
              <span className="about-card__tag about-card__tag--fx">Fintech & Payments</span>
              <h3 className="about-card__title">Building Reliable Financial Experiences</h3>
            </div>
            <p className="about-card__lede">
              Working on financial applications has strengthened my understanding of the importance of accuracy, transparency, and reliability in digital payment experiences. I focus on building clear interfaces and testing transaction flows, balances, exchange rates, and transaction histories to help ensure the product behaves as expected.
            </p>
            <ul className="about-card__bullets">
              <li>
                <strong>USD &amp; EUR accounts</strong> — building dashboards that render balances, rates, and transaction histories with clarity and trust.
              </li>
              <li>
                <strong>Data integrity</strong> — verifying every balance and rate against backend payloads and QA test cases.
              </li>
              <li>
                <strong>Transaction reliability</strong> — checking transaction states, displayed details, and error handling to help users understand what happened.
              </li>
            </ul>
          </div>

          {/* --- Project Lead --- */}
          <div className="about-card about-card--accent about-card--rl">
            <div className="about-card__header">
              <span className="about-card__tag about-card__tag--rl">Project Lead</span>
              <h3 className="about-card__title">Leading from the frontend</h3>
            </div>
            <p className="about-card__lede">
              At Blockchain Innovation Hub in Ibadan, I served as Lead Frontend Developer, contributing to frontend architecture, reusable components, code quality, and team delivery.
            </p>
            <ul className="about-card__bullets">
              <li>
                <strong>Mentorship</strong> — guiding junior developers on code quality, responsive design, and Git workflows.
              </li>
              <li>
                <strong>Frontend leadership</strong> — architecting component libraries, design tokens, and reusable UI patterns.
              </li>
              <li>
                <strong>Collaboration</strong> — working with teammates to maintain consistent UI patterns and deliver frontend features.
              </li>
            </ul>
          </div>

          {/* --- Detailed work history --- */}
          <div className="about-card">
            <h3 className="about-card__title">Full work history</h3>
            <div className="about-card__timeline">
              {experienceData.map((exp, i) => (
                <div key={i} className="about-timeline__item">
                  <div className="about-timeline__mark">
                    <span className="about-timeline__dot" />
                  </div>
                  <div className="about-timeline__content">
                    <div className="about-timeline__top">
                      <span className="about-timeline__meta">
                        <span className="about-timeline__type">{exp.title}</span>
                        <span className="about-timeline__place">{exp.place}</span>
                      </span>
                      <span className="about-timeline__period">{exp.period}</span>
                    </div>
                    <p className="about-timeline__note">{exp.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Highlights ===================== */}
      <section className="section about-section about-section--alt">
        <div className="about-section__inner">
          <div className="about-section__head about-section__head--tall">
            <p className="about-section__eyebrow">Accolades</p>
            <h2 className="about-section__title">Highlights &amp; recognition</h2>
            <p className="about-section__lede">
              A few markers along the path that show where I have been and what
              I am aiming for next.
            </p>
          </div>

          <div className="about-section__grid about-section__grid--highlights">
            {highlightsData.map((h, i) => (
              <div key={i} className="about-card about-card--highlight">
                <span className="about-card__medal">{h.title}</span>
                <span className="about-card__detail">{h.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA / CV Download ===================== */}
      <section className="section about-section about-section--cta">
        <div className="about-section__inner">
          <div className="about-cta">
            <h3 className="about-cta__title">Want to work together?</h3>
            <p className="about-cta__lede">
              I'm open to frontend development opportunities, fintech projects, and collaborations where I can contribute to building reliable, user-friendly digital products. Let's connect.
            </p>
            <div className="about-cta__actions">
              <Link href="/#contact" className="about-cta__btn">
                Say Hello
              </Link>
              <a href="/cv/Henry-Daniel_Ezenwa_CV.docx" className="about-cta__btn-ghost" download>
                <FileDown size={18} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>
          &copy; {new Date().getFullYear()} Ezenwa Henry-Daniel Chibuzor. All rights reserved.
        </p>
        <nav className="about-footer__links">
          <Link href="/">Home</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </footer>
    </main>
  );
}