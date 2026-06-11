
import { env } from "$env/dynamic/private";

/** Resend REST endpoint - used over HTTPS since Railway blocks outbound SMTP. */
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export function validateMailFields({ name, email, message }: { name?: string, email?: string, message?: string }) {
	if (!name || !email || !message) {
		return { valid: false, error: 'Missing required fields' };
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return { valid: false, error: 'Invalid email format' };
	}
	return { valid: true };
}

export function isMailConfigured() {
	return !!(env.RESEND_API_KEY && env.MAIL_TO);
}

export function logMailFallback({ name, email, subject, message }: { name: string, email: string, subject?: string, message: string }) {
	console.log('📧 Contact Form Submission (Resend not configured):');
	console.log(`From: ${name} <${email}>`);
	console.log(`Subject: ${subject || 'No subject'}`);
	console.log(`Message: ${message}`);
	console.log('---');
	console.log('⚠️ Set RESEND_API_KEY and MAIL_TO env vars to enable email sending.');
}

/**
 * Send the contact form via Resend's HTTPS API.
 * @throws when Resend returns a non-2xx response.
 */
export async function sendContactMail({ name, email, subject, message }: { name: string, email: string, subject?: string, message: string }) {
	const res = await fetch(RESEND_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: env.MAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
			to: env.MAIL_TO,
			reply_to: email,
			subject: subject || `Portfolio Contact from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
				<p><strong>Subject:</strong> ${subject || 'No subject'}</p>
				<hr />
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
			`
		})
	});

	if (!res.ok) {
		const detail = await res.text();
		throw new Error(`Resend API error ${res.status}: ${detail}`);
	}
}
