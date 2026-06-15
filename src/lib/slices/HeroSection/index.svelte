<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';
	import Image from '$lib/components/globals/image.svelte';

	type Props = SliceComponentProps<Content.HeroSectionSlice>;

	const { slice }: Props = $props();

	const hero = $derived(slice.primary);
	const photoProfil = $derived(hero.photo_profile);
	const primaryButton = $derived(hero.primary_button[0]);
	const secondaryButton = $derived(hero.secondary_button[0]);
	const socialMedias = $derived(hero.social_media);

	function generateUrlLinkEmail({ type, link }: { type?: 'link' | 'email'; link?: string }) {
		if (!type) return link;
		switch (type) {
			case 'link':
				return link;
			case 'email':
				return `mailto:${link}`;
			default:
				return link;
		}
	}
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="mb-10">
	<div class="flex flex-col space-y-3">
		<div class="flex items-start gap-6">
			<div
				class="w-24 h-24 rounded-full sketch-border overflow-hidden bg-surface-container-highest shrink-0 relative"
			>
				<Image
					class="w-full h-full object-cover"
					src={photoProfil.url || ''}
					alt={photoProfil.alt || ''}
				/>
			</div>
			<div>
				<h1 class="font-h1 text-h1 text-primary mb-2 leading-11">
					{hero.name}
				</h1>
				<p class="font-body-lg text-body-lg text-on-surface-variant mb-4">
					{hero.title}
				</p>
			</div>
		</div>
		<div>
			<span class="font-body-lg text-body-lg text-on-surface-variant">{hero.sort_introducing}</span>
		</div>
		<div class="flex flex-wrap gap-4">
			<a
				class="sketch-border px-6 py-2 bg-primary text-on-primary font-bold hover:opacity-90 active:translate-y-0.5 active:translate-x-0.5 transition-all"
				href={generateUrlLinkEmail({
					type: primaryButton?.type || undefined,
					link: primaryButton?.link || undefined
				})}
				target={primaryButton?.new_page ? '_blank' : undefined}
			>
				{primaryButton?.label}
			</a>
			<a
				class="sketch-border px-6 py-2 bg-surface text-primary font-bold hover:bg-surface-container-high active:translate-y-0.5 active:translate-x-0.5 transition-all"
				href={generateUrlLinkEmail({
					type: secondaryButton?.type || undefined,
					link: secondaryButton?.link || undefined
				})}
				target={secondaryButton?.new_page ? '_blank' : undefined}
			>
				{secondaryButton?.label}
			</a>
		</div>
		<div class="flex flex-wrap gap-3 mt-2">
			{#each socialMedias as sc (sc.label)}
				<a
					class="sketch-border border-dashed px-3 py-1 font-label text-label text-on-surface-variant cursor-pointer hover:bg-surface-container"
					href={sc.link.text || '#'}
					target={sc.new_page ? '_blank' : undefined}>{sc.label}</a
				>
			{/each}
		</div>
	</div>
</section>
