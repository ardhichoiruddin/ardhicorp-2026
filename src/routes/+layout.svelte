<script lang="ts">
	import './layout.css';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { repositoryName } from '$lib/prismicio';
	import Sidebar from '$lib/components/globals/sidebar.svelte';
	import Footer from '$lib/components/globals/footer.svelte';
	import { SvelteKitTopLoader } from 'sveltekit-top-loader';
	import { PUBLIC_GAID } from '$env/static/public';
	import GoogleAnalytic from '$lib/components/globals/google-analytic.svelte';
	import configurations from '$lib/configurations/config';

	let { children } = $props();
</script>

<GoogleAnalytic gaId={PUBLIC_GAID} />
<SvelteKitTopLoader color="#1c1c1c" showSpinner={false} />
<Sidebar
	name={configurations.nav.texts.title}
	title={configurations.nav.texts.description}
	menus={configurations.nav.items}
/>
<main class="w-full max-w-max-width-content mx-auto px-6 py-12">
	{@render children()}
	<PrismicPreview {repositoryName} />
</main>
<Footer
	quote={configurations.footer.quote}
	text={configurations.footer.text}
	items={configurations.footer.items}
/>
