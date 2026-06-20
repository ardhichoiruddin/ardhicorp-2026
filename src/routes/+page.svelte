<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import configurations from '$lib/configurations/config';

	const { data }: PageProps = $props();
	const metadata = $derived(data.page.data);
</script>

<Seo
	title={(metadata.meta_title as string) || configurations.seo.home.title}
	description={(metadata.meta_description as string) || configurations.seo.home.description}
	images={[
		{
			url: metadata?.meta_image?.url || configurations.seo.home.image,
			width: 800,
			height: 800,
			alt: configurations.seo.home.title
		}
	]}
	twitter={{
		card: 'summary_large_image',
		site: 'https://ardhicorp.com',
		title: metadata.meta_title as string,
		description: metadata.meta_description as string,
		image: metadata?.meta_image?.url || configurations.seo.home.image
	}}
/>
<SliceZone slices={data.page.data.slices} {components} />
