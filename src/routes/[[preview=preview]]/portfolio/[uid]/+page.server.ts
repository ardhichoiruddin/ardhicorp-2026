import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { createClient } from '$lib/prismicio';

export const prerender = false;

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
	try {
		const client = createClient({ fetch, cookies });
		const page = await client.getByUID('portfolio', params.uid);
		return { page };
	} catch (err) {
		error(404, {
			message: `Portfolio dengan slug "${params.uid}" tidak ditemukan.`
		});
	}
};
