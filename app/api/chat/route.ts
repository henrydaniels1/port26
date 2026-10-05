import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import aboutMe from '@/app/context/about-me';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is not set. Add it to .env.local (and, if deploying, to your host environment variables).');
}

const client = new OpenAI({ apiKey: apiKey ?? 'missing-key' });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server is not configured: OPENAI_API_KEY is missing.' },
        { status: 500 }
      );
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 512,
      messages: [{ role: 'system', content: aboutMe }, ...messages],
    });

    const reply = response.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
