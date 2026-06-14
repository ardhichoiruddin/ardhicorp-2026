<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import type { PrivacyPolicyDocumentData } from '../../../../../prismicio-types';

	interface Props {
		data: PrivacyPolicyDocumentData;
	}

	let { data }: Props = $props();
	const title = $derived(data.title);
	const content = $derived(data.content);
</script>

<div class="mb-12">
	<h1 class="font-h1 text-h1 wavy-underline inline-block mb-2">{title}</h1>
</div>
<div
	class={[
		'[&>p]:text-body-lg [&>p]:text-on-surface [&>p]:leading-relaxed',
		'[&>h1]:text-4xl [&>h1]:font-body-lg [&>h1]:text-on-surface [&>h1]:leading-relaxed',
		'[&>h2]:text-3xl [&>h2]:font-body-lg [&>h2]:text-on-surface [&>h2]:leading-relaxed',
		'[&>h3]:text-2xl [&>h3]:font-body-lg [&>h3]:text-on-surface [&>h3]:leading-relaxed',
		'[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-2',
		'[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-2',
		'[&_li]:text-body-lg [&_li]:text-on-surface [&_li]:leading-relaxed',
		'[&_iframe]:w-full [&_iframe]:h-100 [&_iframe]:aspect-video [&_iframe]:rounded-md',
		'[&_a]:underline'
	]}
>
	<PrismicRichText field={content} />
</div>
