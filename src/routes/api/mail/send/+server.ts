import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateMailFields, isSmtpConfigured, logMailFallback, sendContactMail } from '$lib/server/mail';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate fields
    const validation = validateMailFields({ name, email, message });
    if (!validation.valid) {
      return json({ error: validation.error }, { status: 400 });
    }

    // Check if SMTP is configured
    if (!isSmtpConfigured()) {
      logMailFallback({ name, email, subject, message });
      return json({ success: true, note: 'Email logged (SMTP not configured)' });
    }

    // Send email
    await sendContactMail({ name, email, subject, message });
    return json({ success: true });

  } catch (err) {
    console.error('Mail send error:', err);
    return json({ error: 'Failed to send message' }, { status: 500 });
  }
};