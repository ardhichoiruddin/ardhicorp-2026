<script lang="ts">
	import SvelteSeo from 'svelte-seo';

	interface Props {
		title: string;
		description: string;
		canonical?: string;
		keywords?: string;
		images?: {
			url: string;
			width: number;
			height: number;
			alt: string;
		}[];
		twitter?: {
			card?: 'summary' | 'summary_large_image' | 'player' | 'app';
			site: string;
			title: string;
			description: string;
			image: string;
		};
		facebook?: {
			appId: string;
		};
	}

	let { title, description, canonical, keywords, images, twitter, facebook }: Props = $props();
</script>

<SvelteSeo
	{title}
	{description}
	{canonical}
	{keywords}
	openGraph={{
		title,
		description,
		images
	}}
	{twitter}
	{facebook}
/>
