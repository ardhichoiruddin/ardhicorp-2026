import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { type } from 'arktype'; // 1. Import ArkType
import { env } from '$env/dynamic/private';

// 2. Definisikan Skema Validasi ArkType
// Aturan: min length 10 untuk semua, dan max length sesuai variabel Anda sebelumnya
const contactSchema = type({
	name: '3 <= string <= 100',
	email: '3 <= string.email <= 255',
	subject: '10 <= string <= 150',
	message: '10 <= string <= 2500'
});

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

export const POST: RequestHandler = async ({ request }) => {
	const RESEND_API_KEY = env.RESEND_API_KEY;
	const CONTACT_FROM_EMAIL = env.CONTACT_FROM_EMAIL;
	const CONTACT_TO_EMAIL = env.CONTACT_TO_EMAIL;

	try {
		const resend = new Resend(RESEND_API_KEY);
		const body = await request.json();

		// Trim string secara manual sebelum divalidasi oleh ArkType
		const sanitizedBody = {
			name: typeof body.name === 'string' ? body.name.trim() : '',
			email: typeof body.email === 'string' ? body.email.trim() : '',
			subject: typeof body.subject === 'string' ? body.subject.trim() : '',
			message: typeof body.message === 'string' ? body.message.trim() : ''
		};

		// 3. Jalankan Validasi ArkType
		const out = contactSchema(sanitizedBody);

		// Jika validasi gagal, kembalikan pesan error pertama yang ditemukan
		if (out instanceof type.errors) {
			// .summary menggabungkan semua error menjadi string terbaca, atau ambil error pertama
			const firstError = out[0]?.message || 'Data tidak valid.';
			return json({ success: false, error: firstError }, { status: 400 });
		}

		// Jika sukses, 'out' berisi data yang sudah ter-vaildasi dengan type-safe
		const { name, email, subject, message } = out;

		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safeSubject = escapeHtml(subject);
		const safeMessage = escapeHtml(message).replaceAll('\n', '<br>');

		const { data, error } = await resend.emails.send({
			from: `Ardhicorp Contact <${CONTACT_FROM_EMAIL}>`,
			to: [CONTACT_TO_EMAIL],
			subject: `[Ardhicorp Contact] ${subject}`,
			html: `
				<h2>Pesan baru dari contact form ardhicorp.com</h2>
				<p><strong>Nama:</strong> ${safeName}</p>
				<p><strong>Email:</strong> ${safeEmail}</p>
				<p><strong>Subjek:</strong> ${safeSubject}</p>
				<p><strong>Pesan:</strong><br>${safeMessage}</p>
			`,
			text: `
				Pesan baru dari contact form

				Nama: ${name}
				Email: ${email}
				Subjek: ${subject}

				Pesan:
				${message}
        `.trim()
		});

		if (error) {
			return json({ success: false, error: error.message }, { status: 500 });
		}

		return json(
			{
				success: true,
				message: 'Pesan berhasil dikirim.',
				id: data?.id
			},
			{ status: 200 }
		);
	} catch (err) {
		// Menangani jika request body bukan JSON yang valid
		return json({ success: false, error: 'Format request tidak valid.' }, { status: 400 });
	}
};
