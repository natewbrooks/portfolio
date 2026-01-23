
import nodemailer from 'nodemailer';
import { env } from "$env/dynamic/private";

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

export function isSmtpConfigured() {
	return !!(env.SMTP_USER && env.SMTP_PASS);
}

export function logMailFallback({ name, email, subject, message }: { name: string, email: string, subject?: string, message: string }) {
	console.log('📧 Contact Form Submission (SMTP not configured):');
	console.log(`From: ${name} <${email}>`);
	console.log(`Subject: ${subject || 'No subject'}`);
	console.log(`Message: ${message}`);
	console.log('---');
	console.log('⚠️ Set SMTP_USER and SMTP_PASS env vars to enable email sending.');
}

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS
	}
});

export async function sendContactMail({ name, email, subject, message }: { name: string, email: string, subject?: string, message: string }) {
	return transporter.sendMail({
        from: `Portfolio Contact - ${name} <${email}>`,
		to: env.SMTP_USER,
		replyTo: email,
		subject: subject || `Portfolio Contact from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
		html: `
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> <a href=\"mailto:${email}\">${email}</a></p>
			<p><strong>Subject:</strong> ${subject || 'No subject'}</p>
			<hr />
			<p><strong>Message:</strong></p>
			<p>${message.replace(/\n/g, '<br>')}</p>
		`
	});
}
