import type { PageServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const page = await client.getSingle('privacy_policy');

	return { page };
};
