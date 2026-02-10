<script lang="ts">
	interface ProductCollection {
		collection: {
			id: string;
			nameCollection: string;
			products: [
				{
					sku: string;
					images: [
						{
							dir: string;
							alt: string;
						}
					];
					name: string;
					description: string;
					variation: {
						color: string[];
						size: string[];
					};
					price: {
						default: number;
						discount: number;
						number_installment: number;
						installment_value: number;
						real_value: number;
					};
				}
			];
		};
	}

	interface Props {
		productCollection?: ProductCollection[];
	}

	const {
		productCollection = [
			{
				collection: {
					id: '',
					nameCollection: 'Coleção',
					products: [
						{
							sku: '',
							images: [
								{
									dir: '/images/products/colecao-1.webp',
									alt: ''
								}
							],
							name: 'nome do produto',
							description: 'desciçao do produto',
							variation: {
								color: ['#dc2626', '#22c55e'],
								size: ['P', 'M', 'G']
							},
							price: {
								default: 197.0,
								discount: 0,
								number_installment: 12,
								installment_value: 15.85,
								real_value: 157.9
							}
						}
					]
				}
			}
		]
	}: Props = $props();
</script>

<section class="p-10">
	<div>
		{#each productCollection as { collection }}
			<h1>{collection.nameCollection}</h1>
			<div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
				{#each collection.products as product}
					<div class="grid gap-4 border">
						<div>
							{#each product.images as image}
								<img src={image.dir} alt={image.alt} />
							{/each}
						</div>

						<div class="space-y-2 p-2">
							<h2 class="text-2xl font-bold">{product.name}</h2>

							<div class="flex flex-col space-y-0 lg:space-y-2">
								<span class=" text-lg font-bold lg:text-2xl">
									{product.price.number_installment + 'X'}
									<span class="text-2xl lg:text-3xl"
										>{product.price.installment_value.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL'
										})}
									</span>
								</span>
								<span class="text-md">
									ou R$ {product.price.real_value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL'
									})} á vista</span
								>
							</div>
							<div class=" flex items-center gap-3">
								<p>Cores:</p>
								{#each product.variation.color ?? [] as color}
									<div class="h-4 w-4 rounded-full" style="background-color: {color}"></div>
								{/each}
							</div>
							<div class=" flex items-center gap-3">
								<p>Tamanhos:</p>
								{#each product.variation.size as size}
									<p>
										{size}
									</p>
								{/each}
							</div>

							<button class=" w-full rounded-full bg-green-600 py-2 text-[#F6ECC9]"
								>Adicionar ao carrinho
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>
