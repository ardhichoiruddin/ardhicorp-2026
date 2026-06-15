<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	interface Props {
		id: string;
		label: string;
		iconClass?: string;
		type?: HTMLInputTypeAttribute;
		placeholder?: string;
		maxlength?: number;
		required?: boolean;
		value?: string;
		inputClass?: string;
		minlength?: number;
		disabled?: boolean;
	}

	let {
		id,
		label,
		iconClass = '',
		type = 'text',
		placeholder = '',
		maxlength = 255,
		required = false,
		value = $bindable(''),
		inputClass,
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
	<input
		class={`hand-input font-body-md text-on-surface py-2 px-1 focus:placeholder:text-transparent ${inputClass}`}
		{id}
		{type}
		{placeholder}
		{maxlength}
		{required}
		bind:value
		name={id}
		{minlength}
		{disabled}
	/>
</div>
