import type { PageServerLoad } from './$types';
import { createClient } from '$lib/prismicio';
import { env } from '$env/dynamic/private';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch, cookies, url, setHeaders }) => {
	const PRISMIC_ACCESS_TOKEN = env.PRISMIC_ACCESS_TOKEN;
	const client = createClient({ fetch, cookies, accessToken: PRISMIC_ACCESS_TOKEN });

	const pageQuery = url.searchParams.get('page') || '1';
	const currentPage = parseInt(pageQuery, 10) || 1;

	const pageSize = 10;

	try {
		const response = await client.getByType('portfolio', {
			page: currentPage,
			pageSize: pageSize,
			// Opsional: Urutkan berdasarkan tanggal rilis terbaru
			orderings: {
				field: 'my.portfolio.year',
				direction: 'desc'
			}
		});

		setHeaders({
			'Cache-Control': 'public, max-age=10, s-maxage=10, stale-while-revalidate=20'
		});

		return {
			portfolios: response.results, // Array data portfolio
			totalPages: response.total_pages, // Total seluruh halaman yang tersedia
			currentPage: response.page // Halaman aktif saat ini
		};
	} catch (err) {
		console.error('Gagal mengambil daftar portfolio:', err);
		return {
			portfolios: [],
			totalPages: 1,
			currentPage: 1
		};
	}
};
