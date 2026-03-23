<!--
  +page.svelte — Página do produto individual

  Rota: /product/[uuid] (uuid = índice do produto no array do CMS)
  Passa o produto e o índice para o componente Produc.
-->
<script lang="ts">
	import type { PageProps } from './$types';
	import Produc from '$lib/Components/Produc/Produc.svelte';

	// Dados carregados pela load function em +page.ts
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.product.name}</title>
</svelte:head>

<!-- Componente de detalhes — recebe produto e índice -->
<Produc product={data.product} productIndex={data.productIndex} />