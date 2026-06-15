const turnstileUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
export async function turnstileValidateServer({
	token,
	secretKey
}: {
	secretKey: string;
	token: string;
}) {
	const formData = new URLSearchParams();
	formData.append('secret', secretKey);
	formData.append('response', token);
	const response = await fetch(turnstileUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formData
	});
	const result = await response.json();
	return result.success as boolean;
}
