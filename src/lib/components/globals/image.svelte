<script lang="ts">
	// Mendefinisikan tipe props
	interface Props {
		src: string;
		alt: string;
		width?: number | string;
		height?: number | string;
		priority?: boolean;
		blurDataURL?: string;
		sizes?: string;
		class?: string;
		[key: string]: any; // Untuk atribut img standar lainnya
	}

	// Menggunakan rune $props() di Svelte 5
	let {
		src,
		alt,
		width,
		height,
		priority = false,
		blurDataURL,
		sizes = '100vw',
		class: className = '',
		...rest
	}: Props = $props();

	// Menggunakan rune $state() untuk melacak status loading
	let isLoaded = $state(false);

	// Fungsi yang dipanggil saat gambar asli selesai dimuat
	function handleLoad() {
		isLoaded = true;
	}
</script>

<div
	class="image-wrapper {className}"
	style="aspect-ratio: {width && height ? `${width} / ${height}` : 'auto'};"
>
	{#if blurDataURL && !isLoaded}
		<img src={blurDataURL} alt="placeholder" aria-hidden="true" class="placeholder" />
	{/if}

	<img
		{src}
		{alt}
		{width}
		{height}
		{sizes}
		loading={priority ? 'eager' : 'lazy'}
		decoding="async"
		onload={handleLoad}
		class="main-image"
		class:loaded={isLoaded}
		{...rest}
	/>
</div>

<style>
	.image-wrapper {
		position: relative;
		overflow: hidden;
		background-color: #f3f4f6; /* Warna skeleton/abu-abu saat kosong */
		width: 100%;
		height: 100%;
		display: block;
	}

	/* Memastikan gambar memenuhi kontainer secara proporsional */
	.placeholder,
	.main-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	/* Efek untuk gambar blur */
	.placeholder {
		filter: blur(20px);
		transform: scale(1.1); /* Mencegah tepi blur yang jelek */
	}

	/* Transisi gambar utama */
	.main-image {
		opacity: 0;
		transition: opacity 0.4s ease-in-out;
	}

	.main-image.loaded {
		opacity: 1;
	}
</style>
