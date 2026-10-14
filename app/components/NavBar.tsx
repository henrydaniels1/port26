"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChedLogo } from "./ChedLogo";
import { ThemeToggle } from "./ThemeToggle";
import "../styles/Nav.css";
import "../styles/ThemeToggle.css";

const links = ["About Me", "Projects", "Contact"];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <motion.nav
      className={`nav-bar fixed top-4 left-0 right-0 md:left-4 md:right-4 z-100 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300 rounded-3xl ${
        scrolled ? "nav-scrolled" : ""
      } ${isOpen ? "nav-menu-open" : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <a href="#" onClick={close} className="nav-logo">
        <ChedLogo title="CHED — home" />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex nav-links-desktop nav-font items-center gap-8">
        {links.map((text, i) => (
          <a
            key={i}
            href={`#${text.toLowerCase().replace(" ", "")}`}
            className="nav-link hvr-underline-from-center text-[0.95rem] tracking-wider uppercase text-white font-semibold"
          >
            {text}
          </a>
        ))}
      </div>

      {/* Right controls: theme toggle + hamburger */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden text-white focus:outline-none relative z-110 flex flex-col justify-center gap-1.25 w-7"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-hamburger-line"
          />
          <motion.span
            animate={
              isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
            className="nav-hamburger-line"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-hamburger-line"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-105 flex flex-col items-center h-screen justify-center nav-mobile-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <nav className="flex flex-col items-center gap-10 nav-links-mobile nav-font">
              {links.map((text, i) => (
                <motion.a
                  key={i}
                  href={`#${text.toLowerCase().replace(" ", "")}`}
                  className="nav-link hvr-underline-from-center text-2xl tracking-widest uppercase font-semibold"
                  onClick={close}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  {text}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
