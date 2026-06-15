<script lang="ts">
	import type { Content } from '@prismicio/client';
	import type { SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.ExperienceSlice>;

	const { slice }: Props = $props();

	const data = $derived(slice.primary);
	const title = $derived(data.title);
	const cards = $derived(data.cards);

	function getMonthAndYear(date: string | null) {
		if (!date) return null;
		const tanggalObj = new Date(date);
		const tahun = tanggalObj.getFullYear();
		const bulan = tanggalObj.toLocaleString('id-ID', { month: 'long' });
		return {
			month: bulan,
			year: tahun,
			formatGabungan: `${bulan} ${tahun}`
		};
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="my-10"
	id="experience"
>
	<h2 class="font-h2 text-h2 text-primary wavy-underline mb-8">
		{title}
	</h2>
	<div class="space-y-6">
		{#each cards as item, i (i)}
			{@const dateFrom = getMonthAndYear(item.from as string)}
			{@const dateTo = getMonthAndYear(item.to as string)}
			{@const present = item.present}
			<div
				class="bg-surface-container-lowest p-4 sketch-border relative even:-rotate-1 odd:rotate-1 first:rotate-0!"
			>
				<div
					class="absolute -top-3 -right-2 bg-surface-container-highest px-2 py-1 text-xs rotate-2 font-note italic sketch-border opacity-80"
				>
					{item.place}
				</div>
				<div class="flex justify-between space-x-4 items-start mb-2">
					<h3 class="font-h3 text-h3 text-primary">
						{item.company_name}
					</h3>
					<span class="font-body-lg text-note text-right text-on-surface-variant"
						>{dateFrom?.month}
						{dateFrom?.year} -
						{#if present}
							Present
						{:else}
							{dateTo?.month} {dateTo?.year}
						{/if}
					</span>
				</div>
				<p class="font-body-md text-on-surface-variant">{item.title}</p>
			</div>
		{/each}
	</div>
</section>
