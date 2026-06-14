<script lang="ts">
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';
	import PrivacyPolicy from '$lib/components/pages/privacy-policy/index.svelte';

	const { data }: PageProps = $props();
	const privacyPolicy = $derived(data.page.data);
</script>

<PrivacyPolicy data={privacyPolicy} />
<SliceZone slices={data.page.data.slices} {components} />
