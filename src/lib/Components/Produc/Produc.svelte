<script>
	const { products = {} } = $props();
</script>

<section class="bg-gray-50/70 py-10">
	<div id={products.sku} class="grid grid-cols-2 gap-6 px-6 lg:pl-15">
		<div>
			{#each products.images as { dir, alt }}
				<img src={dir} {alt} />
			{/each}
		</div>
		<div>
			<div>
				<h1>{products.name}</h1>
				<p>{products.description}</p>
			</div>
			<div>
				<div class=" flex items-center gap-3">
					<p>Cores:</p>
					{#each products.variation.color ?? [] as color}
						<div class="h-4 w-4 rounded-full" style="background-color: {color}"></div>
					{/each}
				</div>
				<div class=" flex items-center gap-3">
					<p>Tamanhos:</p>
					{#each products.variation.size ?? [] as size}
						<p>
							{size}
						</p>
					{/each}
				</div>
				<div>
					<button>Comprar</button>
				</div>
			</div>
		</div>
	</div>
</section>
