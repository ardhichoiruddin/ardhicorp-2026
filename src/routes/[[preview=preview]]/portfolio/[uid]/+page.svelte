<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import PortfolioDetail from '$lib/components/pages/portfolio-detail/index.svelte';

	const { data }: PageProps = $props();
	const pageData = $derived(data.page.data);
	const metadata = $derived(data.page.data);
</script>

<Seo
	title={metadata.meta_title || pageData.title || ''}
	description={metadata.meta_description || pageData.short_description || ''}
	keywords={`website portfolio ${pageData.tech_stacks.join(',')}`}
	images={[
		{
			url: pageData.image.url || '',
			width: 800,
			height: 800,
			alt: pageData.title || ''
		}
	]}
	twitter={{
		card: 'summary_large_image',
		site: `https://ardhicorp.com/portfolio/${data.page.uid}`,
		title: metadata.meta_title || pageData.title || '',
		description: metadata.meta_description || pageData.short_description || '',
		image: pageData.image.url || ''
	}}
/>
<PortfolioDetail data={pageData} />
<SliceZone slices={data.page.data.slices} {components} />
