<script lang="ts">
	import IconeChevronleft from '../Icons/IconeChevronleft.svelte';
	import IconeChevronRight from '../Icons/IconeChevronRight.svelte';
	import ProductCard from '../ProductCard/ProductCard.svelte';
	const { titleCollection = 'coleção', products = [{}] } = $props();
	import { onMount } from 'svelte';
	const ir = '>';
	const voltar = '<';
	let carousel: any;
	let scrollAmount = 0;
	onMount(() => {
		// largura de um card + gap
		const card = carousel?.querySelector('div');
		scrollAmount = card?.offsetWidth + 24; // 24 = gap-6 (6*4px)
	});

	function next() {
		carousel.scrollBy({
			left: scrollAmount,
			behavior: 'smooth'
		});
	}

	function prev() {
		carousel.scrollBy({
			left: -scrollAmount,
			behavior: 'smooth'
		});
	}
</script>

<section class=" bg-gray-50/70 py-10">
	<div class="px-6 lg:pl-15 grid grid-cols-1 gap-6">
		<div>
			<h2 class="text-2xl font-bold">
				{titleCollection}
			</h2>
		</div>

		<div
			class="no-scrollbar flex snap-x snap-mandatory  overflow-x-auto scroll-smooth pb-3"
			bind:this={carousel}
		>
			{#each products as { sku, images, name, description, variation, price }}
				<div class="shrink-0 mr-3 md:mr-6 snap-center snap-normal">
					<ProductCard {sku} {images} {name} {description} {variation} {price} />
				</div>
			{/each}
		</div>
		<div class="flex items-center gap-3 lg:pr-15">
			<div class="h-px w-full lg:w-[80%] rounded-full bg-gray-600"></div>
			<div class="hidden gap-3 lg:flex">
				<button
					class=" h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md"
					onclick={prev}
				>
					<IconeChevronleft class="text-black/80" />
				</button>
				<button
					class=" h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md"
					onclick={next}
				>
					<IconeChevronRight class="text-black/80" />
				</button>
			</div>
		</div>
	</div>
</section>
