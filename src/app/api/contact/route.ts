import { NextResponse } from 'next/server';
import * as yup from 'yup';
import { Resend } from 'resend';
import { createHash, randomUUID } from 'node:crypto';

import { siteConfig } from '@/data/siteConfig';

export const runtime = 'nodejs';

const contactSchema = yup
  .object({
    name: yup.string().trim().max(100).required(),
    email: yup.string().trim().email().max(254).required(),
    company: yup.string().trim().max(200).required(),
    message: yup.string().trim().max(4000).required(),
    budget: yup.string().oneOf(['Not specified', 'Under ₹10k', '₹10k-25k', '₹25k-50k', '₹50k-1L', '₹1L+']).required(),
    services: yup.array().max(8).of(yup.string().oneOf(['Meta Ads', 'Google Ads', 'Ad Creatives', 'AI UGC-Style Videos', 'Website Development', 'SEO & Local SEO', 'Apps, MVPs & Automation', 'Not sure yet']).required()).default([]).required(),
    website: yup.string().max(0).default(''),
  })
  .required();

// ponytail: per-instance limits reset on cold starts; use a shared edge limiter if traffic scales.
const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 10 * 60 * 1000;

export async function POST(request: Request) {
  const requestId = randomUUID();
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Please use the contact form on this website.' }, { status: 403 });
  }
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return NextResponse.json({ error: 'Please send a JSON enquiry.' }, { status: 415 });
  }
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('contact_send_failed', { requestId, reason: 'not_configured' });
    return NextResponse.json(
      { error: 'The form is temporarily unavailable. Please email us or use WhatsApp.', requestId },
      { status: 503 }
    );
  }

  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: 'An enquiry is required.' }, { status: 400 });
    const decoder = new TextDecoder();
    let bytes = 0;
    let json = '';
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 24 * 1024) {
          await reader.cancel();
          return NextResponse.json({ error: 'Your enquiry is too large. Please shorten it.' }, { status: 413 });
        }
        json += decoder.decode(value, { stream: true });
      }
      json += decoder.decode();
    } finally {
      reader.releaseLock();
    }
    const body = JSON.parse(json);
    const payload = await contactSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const now = Date.now();
    for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
    // Only trust Vercel's overwritten client-IP header. Other hosts share the conservative bucket.
    const ip = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for') || 'unknown' : 'unknown';
    const clientKey = createHash('sha256').update(ip.slice(0, 255)).digest('hex');
    const limits = [['all', 20], [clientKey, 3]] as const;
    for (const [key, limit] of limits) {
      const bucket = attempts.get(key);
      if (bucket && bucket.count >= limit) {
        return NextResponse.json({ error: 'Too many enquiries. Please try again later or contact us directly.' }, {
          status: 429, headers: { 'Retry-After': String(Math.ceil((bucket.resetAt - now) / 1000)) },
        });
      }
    }
    for (const [key] of limits) {
      const bucket = attempts.get(key) || { count: 0, resetAt: now + windowMs };
      bucket.count++;
      attempts.set(key, bucket);
    }

    const resend = new Resend(resendApiKey);

    const selectedServices = payload.services.length
      ? payload.services.join(', ')
      : 'Not selected';

    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'Reddystack <hello@reddystack.com>';

    const subject = `New Reddystack inquiry from ${payload.name}`;
    const text = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Budget: ${payload.budget}`,
      `Services: ${selectedServices}`,
      '',
      'Message:',
      payload.message,
    ].join('\n');

    const html = `
      <div>
        <h2>New Reddystack inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(payload.budget)}</p>
        <p><strong>Services:</strong> ${escapeHtml(selectedServices)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('contact_send_failed', { requestId, reason: error.name });
      return NextResponse.json(
        { error: 'Unable to send right now. Your form is unchanged; retry or contact us directly.', requestId },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof yup.ValidationError || error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Please complete all required fields correctly.' },
        { status: 400 }
      );
    }

    console.error('contact_send_failed', { requestId, reason: 'transport_or_internal_error' });
    return NextResponse.json(
      { error: 'Unable to send right now. Your form is unchanged; retry or contact us directly.', requestId },
      { status: 502 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
