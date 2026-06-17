<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import PortfolioCard from '$lib/components/globals/portfolio-card.svelte';

	type Props = SliceComponentProps<Content.PortfolioSlice>;

	const { slice }: Props = $props();
	const data = $derived(slice.primary);
	const title = $derived(data.title);
	const portfolio = $derived(data.portfolio);
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="my-10"
	id="portfolio"
>
	<h2 class="font-h2 text-h2 text-primary wavy-underline mb-8">
		{title}
	</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each portfolio as item, i (i)}
			{#if item.product_link.link_type === 'Document'}
				<PortfolioCard
					uid={item.product_link.uid || ''}
					title={item.product_link.data?.title || ''}
					shortDescription={item.product_link.data?.short_description || ''}
					imageUrl={item.product_link.data?.image.url || ''}
					projectNow={item.product_link.data?.project_now || 'Not Started'}
					year={item.product_link.data?.year || ''}
				/>
			{/if}
		{/each}
	</div>
	<div class="mt-10 flex justify-center">
		<a
			href="/portfolio"
			class="sketch-border px-8 py-3 font-bold hover:bg-surface-container-high transition-all active:translate-y-0.5 active:translate-x-0.5"
		>
			View All Portfolio
		</a>
	</div>
</section>
