<!--
  Cart.svelte — Drawer lateral do carrinho de compras

  Usa `productIndex` (posição no array do CMS) em vez de IDs manuais
  para identificar itens no carrinho.
-->
<script lang="ts">
	import { cart } from '$lib/store/cart.svelte';

	function handleOverlayClick() {
		cart.close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') cart.close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Overlay escuro -->
{#if cart.isOpen}
	<div
		class="fixed inset-0 z-40 bg-black/50 transition-opacity"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
		role="button"
		tabindex="-1"
		aria-label="Fechar carrinho"
	></div>
{/if}

<!-- Drawer -->
<aside
	class="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 {cart.isOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
	aria-label="Carrinho de compras"
>
	<!-- Header -->
	<div class="flex items-center justify-between border-b border-gray-200 p-4">
		<h2 class="text-xl font-bold">Carrinho ({cart.totalItems})</h2>
		<button
			class="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
			onclick={() => cart.close()}
			aria-label="Fechar carrinho"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<!-- Itens -->
	<div class="flex-1 overflow-y-auto p-4">
		{#if cart.items.length === 0}
			<div class="flex h-full flex-col items-center justify-center gap-4 text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
				</svg>
				<p class="text-lg">Seu carrinho está vazio</p>
			</div>
		{:else}
			<ul class="flex flex-col gap-4">
				<!-- Chave: índice do produto + variações para unicidade -->
				{#each cart.items as item (item.productIndex + '-' + (item.selectedColor ?? '') + '-' + (item.selectedSize ?? ''))}
					<li class="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
						{#if item.product.images.length > 0}
							{@const img = item.product.images[0]}
							<picture>
								{#if img.webp}<source srcset={img.webp} type="image/webp" />{/if}
								{#if img.jpg}<source srcset={img.jpg} type="image/jpeg" />{/if}
								{#if img.png}<source srcset={img.png} type="image/png" />{/if}
								<img
									class="h-20 w-20 shrink-0 rounded-lg object-cover"
									src={img.dir}
									alt={img.alt || item.product.name}
								/>
							</picture>
						{/if}

						<div class="flex flex-1 flex-col gap-1">
							<h3 class="text-sm font-semibold leading-tight">{item.product.name}</h3>

							<div class="flex items-center gap-2 text-xs text-gray-500">
								{#if item.selectedColor}
									<div
										class="h-3 w-3 rounded-full border border-gray-300"
										style="background-color: {item.selectedColor}"
									></div>
								{/if}
								{#if item.selectedSize}
									<span>{item.selectedSize}</span>
								{/if}
							</div>

							<span class="text-sm font-bold text-green-700">
								{item.product.price.default.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
							</span>

							<!-- Controles de quantidade — usa productIndex -->
							<div class="flex items-center gap-2">
								<button
									class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-bold transition hover:bg-gray-300"
									onclick={() => cart.updateQuantity(item.productIndex, item.quantity - 1, item.selectedColor, item.selectedSize)}
								>
									−
								</button>
								<span class="w-6 text-center text-sm font-medium">{item.quantity}</span>
								<button
									class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-bold transition hover:bg-gray-300"
									onclick={() => cart.updateQuantity(item.productIndex, item.quantity + 1, item.selectedColor, item.selectedSize)}
								>
									+
								</button>
								<button
									class="ml-auto cursor-pointer text-xs text-red-500 transition hover:text-red-700"
									onclick={() => cart.removeFromCart(item.productIndex, item.selectedColor, item.selectedSize)}
								>
									Remover
								</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Footer com total -->
	{#if cart.items.length > 0}
		<div class="border-t border-gray-200 p-4">
			<div class="mb-4 flex items-center justify-between">
				<span class="text-lg font-semibold">Total:</span>
				<span class="text-2xl font-bold text-green-700">
					{cart.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
				</span>
			</div>
			<button
				class="w-full cursor-pointer rounded-full bg-green-600 py-3 text-lg font-semibold text-[#F6ECC9] transition-colors hover:bg-green-700"
			>
				Finalizar pedido
			</button>
			<button
				class="mt-2 w-full cursor-pointer rounded-full border border-gray-300 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
				onclick={() => cart.clearCart()}
			>
				Limpar carrinho
			</button>
		</div>
	{/if}
</aside>
