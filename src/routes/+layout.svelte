<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { repositoryName } from '$lib/prismicio';
	import Sidebar, { type SidebarMenu } from '$lib/components/globals/sidebar.svelte';
	import Footer from '$lib/components/globals/footer.svelte';
	import { SvelteKitTopLoader } from 'sveltekit-top-loader';

	let { children } = $props();

	const menus: SidebarMenu[] = [
		{
			label: 'Home',
			icon: 'icon-roofing-outline',
			newPage: false,
			link: '/'
		},
		{
			label: 'Experience',
			icon: 'icon-work-outline',
			newPage: false,
			link: '/#experience'
		},
		{
			label: 'Portfolio',
			icon: 'icon-architecture-outline',
			newPage: false,
			link: '/#portfolio'
		},
		{
			label: 'Skill & Technology',
			icon: 'icon-psychology-outline',
			newPage: false,
			link: '/#skills'
		}
	];
</script>

<SvelteKitTopLoader color="#1c1c1c" showSpinner={false} />
<Sidebar name="Ardhi Cho" title="Fullstack Developer" {menus} />
<main class="w-full max-w-max-width-content mx-auto px-6 py-12">
	{@render children()}
	<PrismicPreview {repositoryName} />
</main>
<Footer />
