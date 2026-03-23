<!--
  Produc.svelte — Página completa de detalhes do produto

  Exibe todas as informações do produto:
  - Galeria de imagens
  - Nome, SKU e descrição
  - Preço com cálculo de desconto
  - Seletor interativo de cor e tamanho
  - Botão de adicionar ao carrinho (com variação selecionada)

  Este componente é renderizado pela rota /product/[uuid]/+page.svelte
-->
<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/store/cart.svelte';

	// Recebe o produto completo carregado pela rota
	interface Props {
		product: Product;
	}

	const { product }: Props = $props();

	// Estado local — cor e tamanho selecionados (inicializa com a primeira opção)
	let selectedColor = $state(product.variation.color[0] ?? '');
	let selectedSize = $state(product.variation.size[0] ?? '');

	/** Adiciona o produto ao carrinho com a variação selecionada */
	function handleAddToCart() {
		cart.addToCart(product, selectedColor, selectedSize);
	}

	/**
	 * Preço final com desconto aplicado.
	 * Se discount > 0, calcula: preço × (1 - desconto/100)
	 * Se discount = 0, retorna o preço cheio.
	 */
	const finalPrice = $derived(
		product.price.discount > 0
			? product.price.default * (1 - product.price.discount / 100)
			: product.price.default
	);
</script>

<section class="py-10">
	<!-- Layout 2 colunas: imagens à esquerda, detalhes à direita (em desktop) -->
	<div class="grid grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:px-15">
		<!-- Galeria de imagens — exibe todas as imagens do produto -->
		<div class="flex flex-col gap-4">
			{#each product.images as { dir, alt }, i (i)}
				<img
					class="w-full rounded-2xl object-cover"
					src={dir}
					alt={alt || product.name}
				/>
			{/each}
		</div>

		<!-- Detalhes do produto -->
		<div class="flex flex-col gap-6">
			<!-- SKU (só aparece se tiver valor) -->
			{#if product.sku}
				<span class="text-sm text-gray-500">SKU: {product.sku}</span>
			{/if}

			<!-- Nome do produto -->
			<h1 class="text-3xl font-bold">{product.name}</h1>

			<!-- Descrição -->
			<p class="text-gray-600">{product.description}</p>

			<!-- Bloco de preço -->
			<div class="flex flex-col gap-1">
				<!-- Preço original riscado (só aparece se tiver desconto) -->
				{#if product.price.discount > 0}
					<span class="text-sm text-gray-400 line-through">
						{product.price.default.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
					</span>
				{/if}
				<!-- Preço final (com ou sem desconto) -->
				<span class="text-3xl font-bold text-green-700">
					{finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</span>
				<!-- Valor da parcela -->
				<span class="text-sm text-gray-600">
					ou {product.price.installment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /mês
				</span>
			</div>

			<!-- Seletor de cores — botões com borda destacada para a cor ativa -->
			{#if product.variation.color.length > 0}
				<div class="flex flex-col gap-2">
					<p class="text-sm font-medium">Cor:</p>
					<div class="flex gap-2">
						{#each product.variation.color as color (color)}
							<button
								class="h-8 w-8 cursor-pointer rounded-full border-2 transition-all {selectedColor === color
									? 'border-gray-800 scale-110'
									: 'border-gray-300 hover:border-gray-500'}"
								style="background-color: {color}"
								onclick={() => (selectedColor = color)}
								aria-label="Cor {color}"
							></button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Seletor de tamanhos — botões com fundo escuro para o tamanho ativo -->
			{#if product.variation.size.length > 0}
				<div class="flex flex-col gap-2">
					<p class="text-sm font-medium">Tamanho:</p>
					<div class="flex gap-2">
						{#each product.variation.size as size (size)}
							<button
								class="cursor-pointer rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all {selectedSize === size
									? 'border-gray-800 bg-gray-800 text-white'
									: 'border-gray-300 hover:border-gray-500'}"
								onclick={() => (selectedSize = size)}
							>
								{size}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Botão de adicionar ao carrinho — envia produto + variações selecionadas -->
			<button
				class="w-full cursor-pointer rounded-full bg-green-600 py-3 text-lg font-semibold text-[#F6ECC9] transition-colors hover:bg-green-700"
				onclick={handleAddToCart}
			>
				Adicionar ao carrinho
			</button>
		</div>
	</div>
</section>
