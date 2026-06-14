<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.SkillsSlice>;

	const { slice }: Props = $props();
	const data = $derived(slice.primary);
	const title = $derived(data.title);
	const skills = $derived(data.skills);
</script>

{#snippet card(item: (typeof skills)[number])}
	<span
		class="sketch-border px-4 py-2 font-label text-label text-on-surface-variant bg-surface-container-lowest first:rotate-0 rotate-2 even:-rotate-2 hover:bg-surface-container transition-all cursor-default"
		>{item.name}</span
	>
{/snippet}

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="my-10"
	id="skills"
>
	<h2 class="font-h2 text-h2 text-primary wavy-underline mb-8">
		{title}
	</h2>
	<div class="flex flex-wrap gap-4">
		{#each skills as item, i (i)}
			{@render card(item)}
		{/each}
	</div>
</section>
