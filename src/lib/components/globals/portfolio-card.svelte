<script lang="ts">
	import Image from '$lib/components/globals/image.svelte';
	interface Props {
		uid: string;
		projectNow: 'Not Started' | 'Live' | 'Building';
		imageUrl: string;
		title: string;
		shortDescription: string;
	}

	let { uid, projectNow, imageUrl, title, shortDescription }: Props = $props();
</script>

<div
	class="bg-surface-container-lowest p-4 sketch-border border-dashed relative hover:shadow-lg transition-all duration-300 group"
>
	<div
		class="absolute -top-3 -right-2 bg-primary text-on-primary px-2 py-1 text-xs -rotate-2 font-note italic sketch-border"
	>
		{projectNow}
	</div>
	<div
		class="w-full aspect-video mb-4 sketch-border border-dashed overflow-hidden bg-surface-container"
	>
		<div class="w-full h-full flex items-center justify-center text-on-surface-variant">
			<Image
				alt={title}
				src={imageUrl}
				class="grayscale group-hover:grayscale-0 transition-all duration-700"
			/>
		</div>
	</div>
	<h3 class="font-h3 text-h3 text-primary mb-1 text-nowrap truncate">
		{title}
	</h3>
	<p class="font-body-md text-on-surface-variant mb-4 line-clamp-2">
		{shortDescription}
	</p>
	<div class="flex items-center justify-between">
		<div></div>
		<a class="font-note text-note text-primary underline" href={`/portfolio/${uid}`}
			>View Project →</a
		>
	</div>
</div>
