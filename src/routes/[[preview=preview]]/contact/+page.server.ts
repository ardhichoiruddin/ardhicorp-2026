import type { PageServerLoad } from './$types';
import { createClient } from '$lib/prismicio';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ fetch, cookies, setHeaders }) => {
	const PRISMIC_ACCESS_TOKEN = env.PRISMIC_ACCESS_TOKEN;
	const client = createClient({ fetch, cookies, accessToken: PRISMIC_ACCESS_TOKEN });
	const page = await client.getSingle('contact');

	setHeaders({
		'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=20'
	});

	return { page };
};
