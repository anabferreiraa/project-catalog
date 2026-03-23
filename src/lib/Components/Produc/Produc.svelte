<!--
  Produc.svelte — Página completa de detalhes do produto

  Recebe o produto e seu `productIndex` (posição no array do CMS)
  para identificar o item no carrinho.
-->
<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/store/cart.svelte';

	interface Props {
		product: Product;
		productIndex: number; // índice do produto no array do CMS
	}

	const { product, productIndex }: Props = $props();

	// Índice da imagem principal exibida
	let selectedImageIndex = $state(0);

	// Estado local — cor e tamanho selecionados
	let selectedColor = $state('');
	let selectedSize = $state('');

	$effect(() => {
		selectedColor = product.variation.color[0] ?? '';
		selectedSize = product.variation.size[0] ?? '';
		selectedImageIndex = 0;
	});

	/** Adiciona o produto ao carrinho com a variação selecionada */
	function handleAddToCart() {
		cart.addToCart(product, productIndex, selectedColor, selectedSize);
	}

	/** Preço final com desconto aplicado */
	const finalPrice = $derived(
		product.price.discount > 0
			? product.price.default * (1 - product.price.discount / 100)
			: product.price.default
	);

	/** Imagem principal selecionada */
	const mainImage = $derived(product.images[selectedImageIndex]);
</script>

<section class="py-10">
	<!-- Botão voltar -->
	<div class="px-6 pb-6 lg:px-15">
		<a
			href="/"
			class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-800"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			Voltar à página inicial
		</a>
	</div>

	<div class="grid grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:px-15">
		<!-- Galeria de imagens -->
		<div class="flex flex-col gap-3">
			<!-- Imagem principal -->
			{#if mainImage}
				<div class="overflow-hidden border-radius">
					<picture>
						{#if mainImage.webp}<source srcset={mainImage.webp} type="image/webp" />{/if}
						{#if mainImage.jpg}<source srcset={mainImage.jpg} type="image/jpeg" />{/if}
						{#if mainImage.png}<source srcset={mainImage.png} type="image/png" />{/if}
						<img
							class="aspect-square w-full object-cover lg:max-h-[560px]"
							src={mainImage.dir}
							alt={mainImage.alt || product.name}
						/>
					</picture>
				</div>
			{/if}

			<!-- Thumbnails / Mini slider -->
			{#if product.images.length > 1}
				<div class="flex gap-3 overflow-x-auto pb-2">
					{#each product.images as img, i (i)}
						<button
							class="h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all
								{selectedImageIndex === i
								? 'border-lusta-950 '
								: 'border-lusta-100 hover:border-lusta-200'}"
							onclick={() => (selectedImageIndex = i)}
							aria-label="Ver imagem {i + 1}"
						>
							<picture>
								{#if img.webp}<source srcset={img.webp} type="image/webp" />{/if}
								{#if img.jpg}<source srcset={img.jpg} type="image/jpeg" />{/if}
								{#if img.png}<source srcset={img.png} type="image/png" />{/if}
								<img
									class="h-full w-full object-cover"
									src={img.dir}
									alt={img.alt || `${product.name} - imagem ${i + 1}`}
								/>
							</picture>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Detalhes do produto -->
		<div class="flex flex-col gap-6">
			{#if product.sku}
				<span class="text-sm text-gray-500">SKU: {product.sku}</span>
			{/if}

			<h1>{product.name}</h1>
			<p class="text-gray-600">{product.description}</p>

			<!-- Preço -->
			<div class="flex flex-col gap-1">
				{#if product.price.discount > 0}
					<span class=" text-gray-400 line-through">
						{product.price.default.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
					</span>
				{/if}
				<span class="text-3xl font-bold text-green-700">
					{finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</span>
				<span class="text-sm text-gray-600">
					ou {product.price.installment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} /mês
				</span>
			</div>

			<!-- Seletor de cores -->
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

			<!-- Seletor de tamanhos -->
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

			<button
				class="w-full cursor-pointer rounded-full bg-green-600 py-3 text-lg font-semibold text-lusta-100 transition-colors hover:bg-green-700"
				onclick={handleAddToCart}
			>
				Adicionar ao carrinho
			</button>
		</div>
	</div>
</section>
