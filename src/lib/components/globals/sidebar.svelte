<script lang="ts" module>
	export type SidebarMenu = {
		label: string;
		icon: string;
		link: string;
		newPage: boolean;
	};
</script>

<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		name: string;
		title: string;
		menus: SidebarMenu[];
	}

	let { name, title, menus = [] }: Props = $props();

	const pathname = $derived(page.url.pathname);
	const pathHash = $derived(page.url.hash);

	let isMobileNavbarActive = $state(false);

	const cleanUrl = (url: string) => url.replace(/\/+(?=#|$)/, '').replace(/\/$/, '');

	function isItemActive(menuLink: string) {
		const currentActiveUrl = pathname + pathHash;
		return cleanUrl(currentActiveUrl) === cleanUrl(menuLink);
	}

	function toogleMobileNavbar() {
		isMobileNavbarActive = !isMobileNavbarActive;
	}
</script>

<!-- TopNavBar (Mobile) -->
<nav class="xl:hidden block w-full sticky top-0 z-50 bg-surface border-b-2 border-primary">
	<div class="flex justify-between items-center px-6 py-4 max-w-max-width-content mx-auto">
		<a href="/">
			<span class="font-h1-mobile text-h1-mobile text-on-surface">{name}</span>
		</a>
		<div class="flex gap-4">
			<button onclick={toogleMobileNavbar} aria-label="mobile menu">
				{#if isMobileNavbarActive}
					<span class="icon-close text-2xl"></span>
				{:else}
					<span class="icon-menu text-2xl"></span>
				{/if}
			</button>
		</div>
	</div>
</nav>
<!-- SideNavBar (Desktop) -->
<nav
	data-navbarMobileActive={isMobileNavbarActive}
	class={[
		'z-40 flex-col justify-between py-10 px-4 h-[calc(100%-71.59px)] xl:h-full fixed bottom-0 xl:top-0 right-0 w-sidebar-width border-l-2 border-dashed border-outline bg-surface-container',
		'hidden data-[navbarMobileActive=true]:flex xl:flex'
	]}
>
	<div class="flex-1 min-h-0 overflow-y-auto">
		<div class="mb-8 hidden xl:block">
			<a href="/">
				<span class="font-h2 text-h2 text-on-surface">{name}</span>
				<p class="font-body-lg text-note text-on-surface-variant italic">
					{title}
				</p>
			</a>
		</div>
		<ul class="space-y-4 pt-4 xl:pt-0">
			{#each menus as item, i (i)}
				<li>
					<a
						data-active={isItemActive(item.link)}
						class={[
							'flex items-center gap-2 text-primary font-bold hover:bg-surface-container-high transition-all duration-150 p-2',
							'data-[active=true]:rotate-2  data-[active=true]:border-2 rounded-md data-[active=true]:decoration-wavy data-[active=true]:underline'
						]}
						href={item.link}
						target={item.newPage ? '_blank' : undefined}
					>
						<span class={`${item.icon} text-xl`}></span>
						<span class="font-label text-label">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="shrink-0 flex flex-col gap-4">
		<a
			class="sketch-border px-4 py-2 text-primary font-bold hover:bg-surface-container-high transition-all duration-150 active:translate-y-0.5 active:translate-x-0.5"
			href="/contact"
		>
			Contact Me
		</a>
	</div>
</nav>
