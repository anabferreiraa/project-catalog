<script lang="ts">
	import IconeChevronleft from '../Icons/IconeChevronleft.svelte';
	import IconeChevronRight from '../Icons/IconeChevronRight.svelte';
	import ProductCard from '../ProductCard/ProductCard.svelte';
	import { onMount } from 'svelte';

	const { titleCollection = 'coleção', products = [{}] } = $props();

	let carousel: HTMLDivElement;
	let scrollAmount = 0;
	let progress = $state(0);

	function updateProgress() {
		if (!carousel) return;
		const { scrollLeft, scrollWidth, clientWidth } = carousel;
		const maxScroll = scrollWidth - clientWidth;
		progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
	}

	onMount(() => {
		const card = carousel?.querySelector<HTMLElement>('.carousel-item');
		if (card) {
			scrollAmount = card.offsetWidth + 16;
		}
		updateProgress();
	});

	function next() {
		carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	}

	function prev() {
		carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	}
</script>

<section class="bg-gray-50/70 py-10">
	<!-- Header com título e setas -->
	<div class="flex items-center justify-between px-6 pb-6 lg:px-15">
		<h2 class="text-2xl font-bold">{titleCollection}</h2>
		<div class="hidden gap-3 lg:flex">
			<button
				class="h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md transition-colors hover:bg-gray-100"
				onclick={prev}
				aria-label="Anterior"
			>
				<IconeChevronleft class="text-black/80" />
			</button>
			<button
				class="h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md transition-colors hover:bg-gray-100"
				onclick={next}
				aria-label="Próximo"
			>
				<IconeChevronRight class="text-black/80" />
			</button>
		</div>
	</div>

	<!-- Carrossel sem clipping -->
	<div
		class="carousel-track flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4"
		bind:this={carousel}
		onscroll={updateProgress}
	>
		{#each products as { sku, images, name, description, variation, price }, i (i)}
			<div class="carousel-item shrink-0 snap-start {i === 0 ? 'pl-6 lg:pl-15' : ''}">
				<div class="pr-4">
					<ProductCard {sku} {images} {name} {description} {variation} {price} />
				</div>
			</div>
		{/each}
		<!-- Espaçador final para o último card não colar na borda -->
		<div class="w-6 shrink-0 lg:w-15">&nbsp;</div>
	</div>

	<!-- Barra de progresso -->
	<div class="mx-6 mt-6 lg:mx-15">
		<div class="h-1 w-full rounded-full bg-gray-200">
			<div
				class="h-1 rounded-full bg-gray-600 transition-all duration-300 ease-out"
				style="width: {progress}%"
			></div>
		</div>
	</div>
</section>

<style>
	.carousel-track {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.carousel-track::-webkit-scrollbar {
		display: none;
	}
</style>
