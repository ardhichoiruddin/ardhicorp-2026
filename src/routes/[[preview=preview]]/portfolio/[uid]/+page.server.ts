import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { createClient } from '$lib/prismicio';
import { env } from '$env/dynamic/private';

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch, cookies, setHeaders }) => {
	try {
		const PRISMIC_ACCESS_TOKEN = env.PRISMIC_ACCESS_TOKEN;
		const client = createClient({ fetch, cookies, accessToken: PRISMIC_ACCESS_TOKEN });
		const page = await client.getByUID('portfolio', params.uid);

		setHeaders({
			'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=20'
		});

		return { page };
	} catch (err) {
		error(404, {
			message: `Portfolio dengan slug "${params.uid}" tidak ditemukan.`
		});
	}
};
