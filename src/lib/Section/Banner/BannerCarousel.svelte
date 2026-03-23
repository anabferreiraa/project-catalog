<script lang="ts">
	import { onMount } from 'svelte';

	interface Banner {
		link?: string;
		blank: boolean;
		desktopImage: {
			src: string;
			alt: string;
		};
		mobileImage: {
			src: string;
			alt: string;
		};
	}

	interface Props {
		banners?: Banner[];
		interval?: number;
	}

	let {
		banners = [
			{
				link: '',
				blank: false,
				desktopImage: { src: 'test', alt: 'test' },
				mobileImage: { src: 'test', alt: 'test' }
			}
		],
		interval = 5000
	}: Props = $props();

	let current = $state(0);
	let paused = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	const total = $derived(banners.length);

	function goTo(index: number) {
		current = ((index % total) + total) % total;
	}

	function next() {
		goTo(current + 1);
	}

	function startAutoplay() {
		stopAutoplay();
		timer = setInterval(() => {
			if (!paused) next();
		}, interval);
	}

	function stopAutoplay() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	onMount(() => {
		startAutoplay();
		return () => stopAutoplay();
	});
</script>

<section
	aria-label="Banner carousel"
	class="relative w-full overflow-hidden"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
>
	<!-- Slides -->
	<div
		class="flex transition-transform duration-700 ease-in-out"
		style="transform: translateX(-{current * 100}%)"
	>
		{#each banners as { link, blank, desktopImage, mobileImage }, i (i)}
			<div class="w-full flex-shrink-0">
				{#if link && link !== ''}
					<a href={link} target={blank ? '_blank' : '_self'}>
						<img
							class="hidden h-auto w-full object-cover lg:block"
							src={desktopImage.src}
							alt={desktopImage.alt}
						/>
						<img
							class="h-auto w-full object-cover lg:hidden"
							src={mobileImage.src}
							alt={mobileImage.alt}
						/>
					</a>
				{:else}
					<img
						class="hidden h-auto w-full object-cover lg:block"
						src={desktopImage.src}
						alt={desktopImage.alt}
					/>
					<img
						class="h-auto w-full object-cover lg:hidden"
						src={mobileImage.src}
						alt={mobileImage.alt}
					/>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Setas de navegação -->
	{#if total > 1}
		<button
			class="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
			onclick={() => goTo(current - 1)}
			aria-label="Slide anterior"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			class="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
			onclick={() => goTo(current + 1)}
			aria-label="Próximo slide"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

	<!-- Dots indicadores -->
	{#if total > 1}
		<div class="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
			{#each banners as _, index (index)}
				<button
					class="h-3 w-3 rounded-full border-2 border-white transition-all duration-300 {index === current
						? 'scale-110 bg-white'
						: 'bg-white/40 hover:bg-white/70'}"
					onclick={() => goTo(index)}
					aria-label="Ir para slide {index + 1}"
				></button>
			{/each}
		</div>
	{/if}
</section>
