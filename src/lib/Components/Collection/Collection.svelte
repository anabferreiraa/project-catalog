<script>
	import ProductCard from '../ProductCard/ProductCard.svelte';

	const { titleCollection = 'coleção', products = [{}] } = $props();
</script>

<section class=" bg-gray-50/30 py-10">
	<div class="container mx-auto flex flex-col gap-6" >
		<div>
			<h2 class="text-2xl font-bold">
				{titleCollection}
			</h2>
		</div>
		<div class="flex pb-3 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth ">
			{#each products as { sku, images, name, description, variation, price }}
				<div class="shrink-0 snap-center snap-always">
					<ProductCard {sku} {images} {name} {description} {variation} {price} />
				</div>
			{/each}
		</div>
		<hr>
	</div>
</section>
