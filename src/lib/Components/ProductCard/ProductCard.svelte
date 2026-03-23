<!--
  ProductCard.svelte — Card de produto para o carrossel

  Recebe um objeto `product` completo (tipado com interface Product)
  e exibe: imagem, nome, preço formatado em BRL, cores, tamanhos.

  - O card inteiro é um link para a página do produto (/product/{id})
  - O botão "Adicionar ao carrinho" intercepta o clique para não navegar
  - Preços são formatados com toLocaleString para exibir em Real (R$)
-->
<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/store/cart.svelte';

	// Props tipadas — recebe apenas o objeto completo do produto
	interface Props {
		product: Product;
	}

	const { product }: Props = $props();

	/**
	 * Adiciona o produto ao carrinho sem navegar para a página do produto.
	 * - preventDefault: impede o link <a> de navegar
	 * - stopPropagation: impede o evento de subir para o <a> pai
	 */
	function handleAddToCart(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		cart.addToCart(product);
	}
</script>

<!-- Link para a página dinâmica do produto usando o ID -->
<a href="/product/{product.id}" class="block">
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
			<!-- SKU (só exibe se tiver valor) -->
			{#if product.sku}
				<span class="text-sm text-gray-500">{product.sku}</span>
			{/if}

			<!-- Nome do produto -->
			<h2 class="text-xl font-bold">{product.name}</h2>

			<!-- Preços formatados em BRL -->
			<div class="flex flex-col">
				<!-- Valor da parcela -->
				<span class="text-2xl font-semibold">
					{product.price.installment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</span>
				<!-- Preço à vista -->
				<span class="text-sm text-gray-600">
					ou {product.price.default.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à vista
				</span>
			</div>

			<!-- Bolinhas de cores disponíveis -->
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

			<!-- Tamanhos disponíveis -->
			{#if product.variation.size.length > 0}
				<div class="flex items-center gap-2">
					<p class="text-sm">Tamanhos:</p>
					{#each product.variation.size as size (size)}
						<span class="text-sm">{size}</span>
					{/each}
				</div>
			{/if}

			<!-- Botão de adicionar ao carrinho (intercepta clique do link) -->
			<button
				class="w-full cursor-pointer rounded-full bg-green-600 py-2 text-[#F6ECC9] transition-colors hover:bg-green-700"
				onclick={handleAddToCart}
			>
				Adicionar ao carrinho
			</button>
		</div>
	</div>
</a>
