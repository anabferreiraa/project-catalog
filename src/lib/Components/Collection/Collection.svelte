<!--
  Collection.svelte — Seção de coleção com carrossel de produtos

  Exibe um título de coleção e um carrossel horizontal de ProductCards.
  Funcionalidades:
  - Scroll horizontal nativo (sem biblioteca externa)
  - Setas de navegação (visíveis em desktop)
  - Barra de progresso reativa ao scroll
  - Sem clipping nas laterais (padding interno no primeiro/último item)
  - Scrollbar escondida para visual limpo
-->
<script lang="ts">
	import IconeChevronleft from '../Icons/IconeChevronleft.svelte';
	import IconeChevronRight from '../Icons/IconeChevronRight.svelte';
	import ProductCard from '../ProductCard/ProductCard.svelte';
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';

	// Props tipadas com valores padrão
	interface Props {
		titleCollection?: string; // título da coleção exibido acima do carrossel
		products?: Product[]; // lista de produtos a exibir
	}

	const { titleCollection = 'Coleção', products = [] }: Props = $props();

	// Referência ao elemento DOM do carrossel (usado para scroll programático)
	let carousel: HTMLDivElement;

	// Quanto scrollar a cada clique nas setas (calculado no onMount)
	let scrollAmount = 0;

	// Percentual de progresso do scroll (0 a 100) — alimenta a barra de progresso
	let progress = $state(0);

	/**
	 * Calcula o progresso do scroll como percentual.
	 * scrollLeft / (scrollWidth - clientWidth) = posição relativa (0 a 1)
	 */
	function updateProgress() {
		if (!carousel) return;
		const { scrollLeft, scrollWidth, clientWidth } = carousel;
		const maxScroll = scrollWidth - clientWidth;
		progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
	}

	onMount(() => {
		// Calcula a largura de um card + gap para o scroll das setas
		const card = carousel?.querySelector<HTMLElement>('.carousel-item');
		if (card) {
			scrollAmount = card.offsetWidth + 16; // 16px = gap entre cards
		}
		updateProgress();
	});

	/** Avança o carrossel para a direita */
	function next() {
		carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	}

	/** Volta o carrossel para a esquerda */
	function prev() {
		carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	}
</script>

<section class="bg-gray-50/70 py-10">
	<!-- Header: título da coleção + setas de navegação (desktop) -->
	<div class="flex items-center justify-between px-6 pb-6 lg:px-15">
		<h2 class="text-2xl font-bold">{titleCollection}</h2>

		<!-- Setas de navegação — visíveis apenas em telas grandes (lg+) -->
		<div class="hidden gap-3 lg:flex">
			<button
				class="h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md transition-colors hover:bg-gray-100"
				onclick={prev}
				aria-label="Anterior"
			>
				<IconeChevronleft class="text-black/80" />
			</button>
			<button
				class="h-12 w-12 cursor-pointer rounded-full bg-white px-2 text-center shadow-md transition-colors hover:bg-gray-100"
				onclick={next}
				aria-label="Próximo"
			>
				<IconeChevronRight class="text-black/80" />
			</button>
		</div>
	</div>

	<!--
		Carrossel horizontal:
		- overflow-x-auto: permite scroll horizontal
		- snap-x snap-mandatory: snap points para alinhamento suave
		- pb-4: espaço para sombra dos cards não ser cortada
		- O padding lateral é aplicado DENTRO do scroll (no primeiro item e no espaçador final)
		  para evitar clipping nas bordas
	-->
	<div
		class="carousel-track flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4"
		bind:this={carousel}
		onscroll={updateProgress}
	>
		<!-- Cada produto é renderizado como um card dentro do carrossel -->
		{#each products as product, i (product.id)}
			<div class="carousel-item shrink-0 snap-start {i === 0 ? 'pl-6 lg:pl-15' : ''}">
				<!-- pr-4: espaçamento entre os cards -->
				<div class="pr-4">
					<ProductCard {product} />
				</div>
			</div>
		{/each}

		<!-- Espaçador final: garante que o último card não cole na borda direita -->
		<div class="w-6 shrink-0 lg:w-15">&nbsp;</div>
	</div>

	<!-- Barra de progresso — indica a posição do scroll -->
	<div class="mx-6 mt-6 lg:mx-15">
		<div class="h-1 w-full rounded-full bg-gray-200">
			<!-- Largura dinâmica baseada no percentual de progresso do scroll -->
			<div
				class="h-1 rounded-full bg-gray-600 transition-all duration-300 ease-out"
				style="width: {progress}%"
			></div>
		</div>
	</div>
</section>

<!-- Estilos para esconder a scrollbar nativa do navegador -->
<style>
	.carousel-track {
		-ms-overflow-style: none; /* IE/Edge */
		scrollbar-width: none; /* Firefox */
	}
	.carousel-track::-webkit-scrollbar {
		display: none; /* Chrome/Safari/Opera */
	}
</style>
