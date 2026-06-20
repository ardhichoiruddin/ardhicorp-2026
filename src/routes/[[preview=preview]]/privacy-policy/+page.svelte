<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import PrivacyPolicy from '$lib/components/pages/privacy-policy/index.svelte';

	const { data }: PageProps = $props();
	const privacyPolicy = $derived(data.page.data);
	const metadata = $derived(data.page.data);
</script>

<Seo title={metadata.meta_title as string} description={metadata.meta_description as string} />
<PrivacyPolicy data={privacyPolicy} />
<SliceZone slices={data.page.data.slices} {components} />
