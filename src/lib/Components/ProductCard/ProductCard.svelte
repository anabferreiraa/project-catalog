<!--
  ProductCard.svelte — Card de produto para o carrossel

  Recebe o objeto `product` e seu `index` (posição no array do CMS).
  O index é usado como identificador único para:
  - Gerar a URL dinâmica (/product/{index})
  - Identificar o produto no carrinho
-->
<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/store/cart.svelte';

	// Props tipadas
	interface Props {
		product: Product; // dados do produto
		index: number; // posição no array do CMS (identificador único)
	}

	const { product, index }: Props = $props();

	/**
	 * Adiciona o produto ao carrinho sem navegar para a página do produto.
	 * - preventDefault: impede o link <a> de navegar
	 * - stopPropagation: impede o evento de subir para o <a> pai
	 */
	function handleAddToCart(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		cart.addToCart(product, index);
	}
</script>

<!-- Link para a página dinâmica do produto usando o índice -->
<a href="/product/{index}" class="block">
	<div class="rounded-2xl overflow-hidden shadow-md w-75">
		<!-- Imagem principal do produto (primeira do array) -->
		<div class="h-auto">
			{#if product.images.length > 0}
				<img
					class="h-auto w-full object-cover"
					src={product.images[0].dir}
					alt={product.images[0].alt}
				/>
			{/if}
		</div>

		<!-- Informações do produto -->
		<div class="space-y-2 bg-gray-100 p-3">
			{#if product.sku}
				<span class="text-sm text-gray-500">{product.sku}</span>
			{/if}

			<h2 class="text-xl font-bold">{product.name}</h2>

			<div class="flex flex-col">
				<span class="text-2xl font-semibold">
					{product.price.installment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</span>
				<span class="text-sm text-gray-600">
					ou {product.price.default.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à vista
				</span>
			</div>

			{#if product.variation.color.length > 0}
				<div class="flex items-center gap-2">
					<p class="text-sm">Cores:</p>
					{#each product.variation.color as color (color)}
						<div
							class="h-4 w-4 rounded-full border border-gray-300"
							style="background-color: {color}"
						></div>
					{/each}
				</div>
			{/if}

			{#if product.variation.size.length > 0}
				<div class="flex items-center gap-2">
					<p class="text-sm">Tamanhos:</p>
					{#each product.variation.size as size (size)}
						<span class="text-sm">{size}</span>
					{/each}
				</div>
			{/if}

			<button
				class="w-full cursor-pointer rounded-full bg-green-600 py-2 text-[#F6ECC9] transition-colors hover:bg-green-700"
				onclick={handleAddToCart}
			>
				Adicionar ao carrinho
			</button>
		</div>
	</div>
</a>
