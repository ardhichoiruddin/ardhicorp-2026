<script lang="ts">
	import Seo from '$lib/components/globals/seo.svelte';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<Seo
	title="Ardhi Choiruddin"
	description="Fullstack Developer, Backend & AI Engineer experienced in building systems using Fastify, Svelte.js, Prisma ORM, ClickHouse, Firebase, and Qdrant. Proficient in end-to-end development—from backend architecture and data management to cloud integration and efficient frontend implementation. Specialized in scalable system design, data analytics, and product-driven AI chatbots. Detail-oriented and product-focused, bridging technology, business, and product strategy effectively."
/>
<SliceZone slices={data.page.data.slices} {components} />
