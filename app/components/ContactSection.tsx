"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { motion } from "framer-motion";
import "../styles/ContactSection.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactSectionProps {
  eyebrow?: string;
  title?: string;
  lede?: string;
}

/** Map markers — a "home" pin over Ibadan plus two decorative dots. */
const PINS: { left: number; top: number; delay: number; home?: boolean }[] = [
  { left: 51, top: 46, delay: 0, home: true },
  { left: 24, top: 38, delay: 0.8 },
  { left: 76, top: 55, delay: 1.5 },
];

function IconPin() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function ContactSection({
  eyebrow = "Get In Touch",
  title = "Contact Me",
  lede = "Have a project in mind, a role to fill, or just a quick question? Send a message below.",
}: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // hidden from humans
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<string | null>(null);

  const sending = status === "sending";

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      next.message = "A little more detail, please (10+ characters).";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      setBanner(null);
      return;
    }

    setStatus("sending");
    setBanner(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        errors?: FieldErrors;
      } | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setBanner(data?.error ?? "Something went wrong. Please try again.");
        if (data?.errors) setErrors(data.errors);
        return;
      }

      setStatus("success");
      setBanner("Message sent — thanks! I will get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus("error");
      setBanner("Network error — please check your connection and try again.");
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      {/* The world map as the section's main background. */}
      <div className="contact__map" aria-hidden="true">
        <div className="world__map">
          <span className="world__sweep" />
        </div>
        {PINS.map((pin, i) => (
          <span
            key={i}
            className={`world__pin${pin.home ? " world__pin--home" : ""}`}
            style={
              {
                left: `${pin.left}%`,
                top: `${pin.top}%`,
                "--d": `${pin.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <a
        className="contact__credit"
        href="https://simplemaps.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        World map © Simplemaps
      </a>

      <div className="contact__inner">
        <motion.div
          className="contact__head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="contact__eyebrow">{eyebrow}</span>
          <h2
            id="contact-heading"
            className="contact__title big-shoulders-inline-bold"
          >
            {title}
          </h2>
          <p className="contact__lede">{lede}</p>
        </motion.div>

        <div className="contact__grid">
          <motion.form
            className="contact__form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Spam trap — never rendered for humans. */}
            <div className="contact__hp" aria-hidden="true">
              <label htmlFor="website">Do not fill this out</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                className="field__input"
                type="text"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
              />
              {errors.name && (
                <span className="field__error" id="contact-name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                className="field__input"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />
              {errors.email && (
                <span className="field__error" id="contact-email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="field__input"
                name="message"
                placeholder="Tell me a little about your project, timeline and budget…"
                maxLength={5000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {errors.message && (
                <span className="field__error" id="contact-message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="contact__foot">
              <button
                className="contact__submit"
                type="submit"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </div>

            {banner && (
              <p
                className={`contact__banner ${
                  status === "success"
                    ? "contact__banner--ok"
                    : "contact__banner--err"
                }`}
                role="status"
              >
                {banner}
              </p>
            )}
          </motion.form>

          <motion.aside
            className="contact__info"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          >
            <p className="contact__info-lead">
              I&apos;d love to hear from you! Reach out to me at:
            </p>

            <div className="contact__info-list">
              <div className="contact__info-item">
                <span className="contact__info-icon" aria-hidden="true">
                  <IconPin />
                </span>
                <span className="contact__info-text">
                  <span className="contact__info-label">Location</span>
                  <span className="contact__info-value">Lagos, Nigeria.</span>
                </span>
              </div>

              <div className="contact__info-item">
                <span className="contact__info-icon" aria-hidden="true">
                  <IconPhone />
                </span>
                <span className="contact__info-text">
                  <span className="contact__info-label">Phone</span>
                  <a className="contact__info-phone" href="tel:+2348085833176">
                    08085833176
                  </a>
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
