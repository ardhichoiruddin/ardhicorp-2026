<script lang="ts">
	// Menggunakan Runes $props() untuk Svelte 5 dengan TypeScript
	interface Props {
		id: string;
		label: string;
		iconClass?: string;
		placeholder?: string;
		rows?: number | null | undefined;
		maxlength?: number;
		minlength?: number;
		required?: boolean;
		value?: string;
		textareaClass?: string;
		disabled?: boolean;
	}

	// Menentukan nilai default langsung saat destructuring
	let {
		id,
		label,
		iconClass = '',
		placeholder = '',
		rows = 5,
		maxlength = 2500,
		required = false,
		value = $bindable(''),
		textareaClass,
		minlength,
		disabled
	}: Props = $props();
</script>

<div class="flex flex-col gap-2">
	<label
		class="font-label text-label text-on-surface-variant flex items-center text-lg uppercase tracking-wider"
		for={id}
	>
		{#if iconClass}
			<span class="text-[16px] mr-1 {iconClass}"></span>
		{/if}
		{label}
	</label>
	<textarea
		class={`hand-input font-body-md text-on-surface py-2 px-1 focus:placeholder:text-transparent text-lg resize-none sm:text-xl ${textareaClass}`}
		{id}
		name={id}
		{placeholder}
		{rows}
		{maxlength}
		{required}
		bind:value
		{minlength}
		{disabled}
	></textarea>
</div>
