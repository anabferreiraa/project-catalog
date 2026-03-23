<!--
  +layout.svelte — Layout principal do app

  Este componente envolve todas as páginas e contém:
  - Barra de anúncios (topo)
  - Barra da marca / logo
  - Botão flutuante do carrinho (canto superior direito) com badge de quantidade
  - Drawer do carrinho (Cart.svelte) — sempre presente, só visível quando aberto
  - Footer
  - Conteúdo da página ({@render children()})
-->
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AnnouncementBar from '$lib/Components/AnnouncementBar/AnnouncementBar.svelte';
	import AnnouncementData from '$cms/announcement-bar.json';
	import BrandBar from '$lib/Components/BrandBar/BrandBar.svelte';
	import GeneralConfigurationData from '$cms/general-configuration.json';
	import Footer from '$lib/Section/Footer/Footer.svelte';
	import Cart from '$lib/Components/Cart/Cart.svelte';
	import { cart } from '$lib/store/cart.svelte';

	// Slot de conteúdo — renderiza a página atual
	let { children } = $props();
</script>

<!-- Favicon da página -->
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Barra de anúncios (ex: frete grátis, promoções) -->
<AnnouncementBar messages={AnnouncementData.announcementBar} />

<div class="relative">
	<!-- Barra da marca / logo da empresa -->
	<BrandBar
		images={{
			name: GeneralConfigurationData.companyInformation.companyBrand.brand,
			alt: `Logo marca da empresa ${GeneralConfigurationData.companyInformation.companyName}`
		}}
	/>

	<!--
		Botão flutuante do carrinho:
		- Posição fixa no canto superior direito (z-30 para ficar acima do conteúdo)
		- Abre/fecha o drawer do carrinho ao clicar
		- Badge vermelho com contagem de itens (só aparece se > 0)
	-->
	<button
		class="fixed right-4 top-4 z-30 flex cursor-pointer items-center justify-center rounded-full bg-green-600 p-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-700"
		onclick={() => cart.toggle()}
		aria-label="Abrir carrinho"
	>
		<!-- Ícone do carrinho de compras -->
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
		</svg>

		<!-- Badge de quantidade (visível apenas quando há itens no carrinho) -->
		{#if cart.totalItems > 0}
			<span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
				{cart.totalItems}
			</span>
		{/if}
	</button>
</div>

<!-- Conteúdo da página atual (renderizado pelo SvelteKit) -->
{@render children()}

<!-- Footer com informações da empresa -->
<Footer company={GeneralConfigurationData.companyInformation} />

<!-- Drawer do carrinho — sempre montado, visibilidade controlada pelo cart.isOpen -->
<Cart />