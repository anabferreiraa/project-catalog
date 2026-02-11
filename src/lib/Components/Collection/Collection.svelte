<script>
	import ProductCard from '../ProductCard/ProductCard.svelte';

	const { titleCollection = 'coleção' , products=[{}] } = $props();
</script>

<section>
	<div class="container">
		<div>
			<h2>
				{titleCollection}
			</h2>
		</div>
		<div class="flex gap-6 px-6 overflow-x-auto snap-x snap-mandatory scroll-smooth">
	{#each products as { sku, images, name, description, variation, price }}
		<div class="snap-center shrink-0 snap-always">
			<ProductCard
				sku={sku}
				{images}
				name={name}
				description={description}
				{variation}
				{price}
			/>
		</div>
	{/each}
</div>
	</div>
</section>
