<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		gaId: string;
	}

	let { gaId }: Props = $props();

	onMount(() => {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function (...args: any[]) {
			window.dataLayer.push(arguments);
		};
		window.gtag('js', new Date());
		window.gtag('config', gaId);
	});
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={gaId}"></script>
</svelte:head>
