<script lang="ts">
	import type { PortfolioDocument } from '../../../../../prismicio-types';
	import PortfolioCard from '$lib/components/globals/portfolio-card.svelte';

	interface Props {
		data: PortfolioDocument<string>[];
	}

	let { data: portfolios }: Props = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
	{#each portfolios as item (item.uid)}
		<PortfolioCard
			uid={item.uid || ''}
			title={item.data.title || ''}
			shortDescription={item.data.short_description || ''}
			imageUrl={item.data.image.url || ''}
			projectNow={item.data.project_now || 'Not Started'}
		/>
	{/each}
</div>
