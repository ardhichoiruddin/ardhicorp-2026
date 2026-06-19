<script lang="ts">
	interface Props {
		quote: {
			text: string;
			from: string;
		};
		text: string;
		items: {
			label: string;
			link: string;
		}[];
	}
	let { quote, text, items }: Props = $props();
</script>

<footer
	class="w-full max-w-max-width-content mx-auto border-t border-dashed border-outline pt-8 pb-10 px-6 flex flex-col items-start gap-4"
>
	<p class="font-body-lg text-2xl italic text-on-surface-variant">
		"{quote.text}" — {quote.from}
	</p>
	<p class="font-body-lg text-note text-on-surface-variant">
		{text}
		{new Date().getFullYear()}
	</p>
	<div class="flex gap-4">
		{#each items as item, i (i)}
			<a
				class="font-body-lg text-note text-on-surface-variant hover:text-primary underline"
				href={item.link}>{item.label}</a
			>
		{/each}
	</div>
</footer>
