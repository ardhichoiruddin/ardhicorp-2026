import type { PageServerLoad } from './$types';
import { createClient } from '$lib/prismicio';

export const load: PageServerLoad = async ({ fetch, cookies, url }) => {
	const client = createClient({ fetch, cookies });

	const pageQuery = url.searchParams.get('page') || '1';
	const currentPage = parseInt(pageQuery, 10) || 1;

	const pageSize = 10;

	try {
		const response = await client.getByType('portfolio', {
			page: currentPage,
			pageSize: pageSize,
			// Opsional: Urutkan berdasarkan tanggal rilis terbaru
			orderings: {
				field: 'document.first_publication_date',
				direction: 'desc'
			}
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
