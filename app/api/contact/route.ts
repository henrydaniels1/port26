import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact form → Gmail SMTP.
 *
 * Requires, in .env.local (never commit this file — it is git-ignored):
 *   GMAIL_USER=you@gmail.com
 *   GMAIL_APP_PASSWORD=16-char-app-password   (https://myaccount.google.com/apppasswords)
 *   CONTACT_TO_EMAIL=you@gmail.com            (optional — defaults to GMAIL_USER)
 */
export const runtime = 'nodejs';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? process.env.GMAIL_USER;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error(
    'GMAIL_USER / GMAIL_APP_PASSWORD is not set. Add them to .env.local (and, if deploying, to your host environment variables).'
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Simple in-memory rate limit: 5 messages per IP every 10 minutes.
   NOTE: resets on cold starts — good spam brake, not a hard guarantee. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter(t => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) return true;
  list.push(now);
  hits.set(key, list);
  if (hits.size > 1000) hits.clear(); // safety valve
  return false;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Strip characters that could break email headers. */
const headerSafe = (s: string) => s.replace(/[\r\n"]/g, '').slice(0, 120);

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages from this connection. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const honeypot = String(body.website ?? '').trim();

    // Bot filled the hidden field → pretend success so it moves on quietly.
    if (honeypot) return NextResponse.json({ ok: true });

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = 'Please enter your name.';
    else if (name.length > 120) errors.name = 'Name is too long.';
    if (!EMAIL_RE.test(email) || email.length > 254)
      errors.email = 'Please enter a valid email address.';
    if (message.length < 10)
      errors.message = 'Message is a little short — give me some more detail.';
    else if (message.length > 5000) errors.message = 'Message is too long (5,000 character limit).';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Please fix the highlighted fields.', errors },
        { status: 400 }
      );
    }

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Server is not configured: GMAIL_USER / GMAIL_APP_PASSWORD is missing.' },
        { status: 500 }
      );
    }

    const safeName = headerSafe(name);
    const safeEmail = email.replace(/[\r\n]/g, '').slice(0, 254);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `Portfolio message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#16171f">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${esc(name)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> ${esc(email)}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Could not send your message right now. Please try again later.' },
      { status: 500 }
    );
  }
}