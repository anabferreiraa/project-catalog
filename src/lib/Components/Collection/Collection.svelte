<script>
	import ProductCard from '../ProductCard/ProductCard.svelte';
	const { titleCollection = 'coleção', products = [{}] } = $props();
	import { onMount } from 'svelte';
	const ir = '>'
	const voltar = '<'
     let carousel; // referência da div
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

<section class=" bg-gray-50/30 py-10">
	<div class="flex flex-col gap-6 pl-6" >
		<div>
			<h2 class="text-2xl font-bold">
				{titleCollection}
			</h2>
		</div>
		
           <div class="flex pb-3 snap-x snap-mandatory gap-6 overflow-x-auto no-scrollbar scroll-smooth " bind:this={carousel}>
			{#each products as { sku, images, name, description, variation, price }}
				<div class="shrink-0 snap-center snap-normal">
					<ProductCard {sku} {images} {name} {description} {variation} {price} />
				</div>
			{/each}
		</div>
		<div class=" flex gap-3 items-center px-10 ">
			<div class="w-full h-px rounded-full bg-gray-600"></div>
			<div class="lg:flex gap-3 hidden ">
				<button class=" w-9 h-9 rounded-full bg-white shadow-md cursor-pointer "on:click={prev} > {voltar} </button>
				<button class=" w-9 h-9 rounded-full bg-white shadow-md cursor-pointer " on:click={next}> {ir}</button>
			</div>
		</div>
		</div>
 

</section>
