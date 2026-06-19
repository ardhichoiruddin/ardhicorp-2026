<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import configurations from '$lib/configurations/config';

	const { data }: PageProps = $props();
</script>

<Seo
	title={configurations.seo.home.title}
	description={configurations.seo.home.description}
	images={[
		{
			url: configurations.seo.home.image,
			width: 800,
			height: 800,
			alt: configurations.seo.home.title
		}
	]}
	twitter={{
		card: 'summary_large_image',
		site: 'https://ardhicorp.com',
		title: configurations.seo.home.title,
		description: configurations.seo.home.description,
		image: configurations.seo.home.image
	}}
/>
<SliceZone slices={data.page.data.slices} {components} />
