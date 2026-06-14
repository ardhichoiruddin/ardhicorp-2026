<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import Portfolio from '$lib/components/pages/portfolio/index.svelte';

	let { data } = $props();
	const portfolios = $derived(data.portfolios);
</script>

<Seo title="Portfolio" description="Ardhi Choiruddin Portfolio" />
<section>
	<h1 class="font-h1 text-h1 wavy-underline inline-block mb-6">Portfolio</h1>
</section>
<section>
	<Portfolio data={portfolios} />
</section>
<section>
	{#if data.totalPages > 1}
		<div class="flex justify-center items-center gap-4 mt-12">
			{#if data.currentPage > 1}
				<a
					href="?page={data.currentPage - 1}"
					class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
				>
					← Sebelumnya
				</a>
			{:else}
				<span class="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed">
					← Sebelumnya
				</span>
			{/if}

			<span class="text-sm font-medium text-gray-600">
				Halaman {data.currentPage} dari {data.totalPages}
			</span>

			{#if data.currentPage < data.totalPages}
				<a
					href="?page={data.currentPage + 1}"
					class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
				>
					Selanjutnya →
				</a>
			{:else}
				<span class="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed">
					Selanjutnya →
				</span>
			{/if}
		</div>
	{/if}
</section>
