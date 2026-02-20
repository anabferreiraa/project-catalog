<script>
    const {
        sku= 'x',
        images= [
			{
			 dir: '/images/products/colecao-1.webp',
			 alt: ''
			}
			],
        name= 'nome',
        description= 'dddd',
        variation= {
            color: ['#dc2626', '#22c55e'],
            size: ['P', 'M', 'G'],
        },
        price= {
			value: 197.0,
			discount: 0,
			installment: 15.85
		}
    } = $props()
</script>
  <div class="rounded-2xl overflow-hidden shadow-md">
<div class="h-auto w-75 ">
		{#each images as image}
			<img src={image.dir} alt={image.alt} />
		{/each}
	</div>
	<div class="space-y-2 bg-gray-100 p-2  ">
        <span class="text-sm">{sku}</span>
		<h2 class="text-xl font-bold">{name}</h2>

		<div class="flex flex-col space-y-0">
			<span class="text-2xl"
				>{price.installment}
			</span>

			<span class="text-md"> ou R${price.value} á vista</span>
		</div>
		<div class=" flex items-center gap-3">
			<p>Cores:</p>
			{#each variation.color ?? [] as color}
				<div class="h-4 w-4 rounded-full" style="background-color: {color}"></div>
			{/each}
		</div>
		<div class=" flex items-center gap-3">
			<p>Tamanhos:</p>
			{#each variation.size ?? [] as size}
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
	

