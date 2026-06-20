<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import Contact from '$lib/components/pages/contact/index.svelte';

	const { data }: PageProps = $props();
	const contactData = $derived(data.page.data);
	const metadata = $derived(data.page.data);
</script>

<Seo
	title={metadata.meta_title || contactData.title || ''}
	description={metadata.meta_description || contactData.sub_title || ''}
/>

<Contact data={contactData} />
<SliceZone slices={data.page.data.slices} {components} />
