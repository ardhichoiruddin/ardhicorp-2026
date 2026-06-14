<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const metadata = {
		title: 'Ardhi Choiruddin',
		desription:
			'Fullstack Developer, Backend & AI Engineer experienced in building systems using Fastify, Svelte.js, Prisma ORM, ClickHouse, Firebase, and Qdrant. Proficient in end-to-end development—from backend architecture and data management to cloud integration and efficient frontend implementation. Specialized in scalable system design, data analytics, and product-driven AI chatbots. Detail-oriented and product-focused, bridging technology, business, and product strategy effectively.',
		image: '/assets/images/ardhicorp-image-home.jpg'
	};
</script>

<Seo
	title={metadata.title}
	description={metadata.desription}
	images={[
		{
			url: metadata.image,
			width: 800,
			height: 800,
			alt: metadata.title
		}
	]}
	twitter={{
		card: 'summary_large_image',
		site: 'https://ardhicorp.com',
		title: metadata.title,
		description: metadata.desription,
		image: metadata.image
	}}
/>
<SliceZone slices={data.page.data.slices} {components} />
