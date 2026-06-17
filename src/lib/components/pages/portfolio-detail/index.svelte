<script lang="ts">
	import { PrismicRichText } from '@prismicio/svelte';
	import type { PortfolioDocumentData } from '../../../../../prismicio-types';

	interface Props {
		data: PortfolioDocumentData;
	}

	let { data }: Props = $props();
	const title = $derived(data.title);
	const image = $derived(data.image);
	const projectNow = $derived(data.project_now);
	const techStacks = $derived(data.tech_stacks);
	const description = $derived(data.decription);
	const link = $derived(data.link);
	const year = $derived(data.year);
</script>

<a
	class="inline-flex items-center gap-2 font-label text-label text-on-surface-variant hover:text-primary mb-8 group"
	href="/portfolio"
>
	<span class="transition-transform group-hover:-translate-x-1 icon-arrow-back"></span>
	<span>Back to Portfolio</span>
</a>
<!-- Page Title -->
<div class="mb-12">
	<h1 class="font-h1 text-h1 wavy-underline inline-block mb-2">{title}</h1>
</div>
<!-- Hero Section -->
<section class="relative mb-16">
	<!-- Tape effect decoration -->
	<div
		class="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 tape-effect z-10 flex items-center justify-center text-2xl"
	>
		{year}
	</div>
	<div
		class="relative sketch-border bg-white overflow-hidden shadow-[4px_4px_0px_rgba(28,27,27,0.1)]"
	>
		<img
			alt={image.alt}
			class="w-full aspect-video object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
			src={image.url}
		/>
		<!-- Status Badge -->
		<div class="absolute top-4 right-4 ink-splatter px-6 py-2 rotate-3 shadow-lg">
			<span class="font-h3 text-h3 tracking-tighter">{projectNow}</span>
		</div>
	</div>
</section>
<!-- Metadata / Tech Stack -->
<section class="mb-12">
	<div class="flex flex-wrap gap-4">
		{#each techStacks as item, i (i)}
			<div
				class="px-4 py-1 border-2 border-dashed border-outline rotate-1 hover:rotate-0 transition-transform cursor-default bg-surface-container-low font-label text-label"
			>
				{item.name}
			</div>
		{/each}
	</div>
</section>
<article class="space-y-6 mb-16">
	<div
		class={[
			'[&>p]:text-body-lg [&>p]:text-on-surface [&>p]:leading-relaxed [&>p]:my-2 [&>p]:first:mt-0 [&>p]:last:mb-0',
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
		<PrismicRichText field={description} />
	</div>
</article>
{#if link}
	<section class="flex flex-col sm:flex-row gap-6">
		<a
			class="jitter px-10 py-4 sketch-border bg-primary text-on-primary font-h3 text-h3 flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
			href={link.text}
			target="_blank"
		>
			Live Demo
			<span class="icon-launch-outline"></span>
		</a>
	</section>
{/if}
