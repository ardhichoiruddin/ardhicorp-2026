import type { PageServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const load: PageServerLoad = async ({ fetch, cookies, setHeaders }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getSingle('contact');

	setHeaders({
		'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=20'
	});

	return { page };
};
