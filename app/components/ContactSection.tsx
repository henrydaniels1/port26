'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactSection.css';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'sending' | 'success' | 'error';

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

/** Decorative glowing markers dotted over the map (positions are aesthetic). */
const PINS = [
  { left: 24, top: 38, delay: 0 },
  { left: 51, top: 33, delay: 0.8 },
  { left: 75, top: 52, delay: 1.6 },
];

export function ContactSection({
  eyebrow = 'Get In Touch',
  title = 'Contact Me',
  lede = 'Have a project in mind, a role to fill, or just a quick question? Send a message below — it lands straight in my inbox, and I usually reply within a day.',
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden from humans
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [banner, setBanner] = useState<string | null>(null);

  const sending = status === 'sending';

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email address.';
    if (message.trim().length < 10)
      next.message = 'A little more detail, please (10+ characters).';
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      setBanner(null);
      return;
    }

    setStatus('sending');
    setBanner(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setStatus('error');
        setBanner(data?.error ?? 'Something went wrong. Please try again.');
        if (data?.errors) setErrors(data.errors);
        return;
      }

      setStatus('success');
      setBanner('Message sent — thanks! I will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch {
      setStatus('error');
      setBanner('Network error — please check your connection and try again.');
    }
  }

  return (
    <section id='contact' className='contact' aria-labelledby='contact-heading'>
      <div className='contact__inner'>
        <motion.div
          className='contact__head'
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}>
          <span className='contact__eyebrow'>{eyebrow}</span>
          <h2 id='contact-heading' className='contact__title big-shoulders-inline-bold'>
            {title}
          </h2>
          <p className='contact__lede'>{lede}</p>
        </motion.div>

        <div className='contact__grid'>
          <motion.form
            className='contact__form'
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: EASE }}>
            {/* Spam trap — never rendered for humans. */}
            <div className='contact__hp' aria-hidden='true'>
              <label htmlFor='website'>Do not fill this out</label>
              <input
                id='website'
                name='website'
                type='text'
                tabIndex={-1}
                autoComplete='off'
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='contact-name'>
                Name
              </label>
              <input
                id='contact-name'
                className='field__input'
                type='text'
                name='name'
                placeholder='Your name'
                autoComplete='name'
                maxLength={120}
                value={name}
                onChange={e => setName(e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <span className='field__error' id='contact-name-error'>
                  {errors.name}
                </span>
              )}
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='contact-email'>
                Email
              </label>
              <input
                id='contact-email'
                className='field__input'
                type='email'
                name='email'
                placeholder='you@example.com'
                autoComplete='email'
                maxLength={254}
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <span className='field__error' id='contact-email-error'>
                  {errors.email}
                </span>
              )}
            </div>

            <div className='field'>
              <label className='field__label' htmlFor='contact-message'>
                Message
              </label>
              <textarea
                id='contact-message'
                className='field__input'
                name='message'
                placeholder='Tell me a little about your project, timeline and budget…'
                maxLength={5000}
                value={message}
                onChange={e => setMessage(e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <span className='field__error' id='contact-message-error'>
                  {errors.message}
                </span>
              )}
            </div>

            <div className='contact__foot'>
              <button className='contact__submit' type='submit' disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
              </button>
              <span className='contact__note'>Direct to my inbox — no spam, ever.</span>
            </div>

            {banner && (
              <p
                className={`contact__banner ${
                  status === 'success' ? 'contact__banner--ok' : 'contact__banner--err'
                }`}
                role='status'>
                {banner}
              </p>
            )}
          </motion.form>

          <motion.div
            className='contact__visual'
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}>
            <div className='world' aria-hidden='true'>
              {/* The map itself is /public/world.svg used as a CSS mask over a
                  theme-aware gradient, with a radar sweep lit from inside. */}
              <div className='world__map'>
                <span className='world__sweep' />
              </div>
              {PINS.map((pin, i) => (
                <span
                  key={i}
                  className='world__pin'
                  style={
                    {
                      left: `${pin.left}%`,
                      top: `${pin.top}%`,
                      '--d': `${pin.delay}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <p className='world__caption'>
              Drop a message — it lands straight in my inbox, wherever I am on the map.
            </p>
            <a
              className='world__credit'
              href='https://simplemaps.com'
              target='_blank'
              rel='noreferrer noopener'>
              World map © Simplemaps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}