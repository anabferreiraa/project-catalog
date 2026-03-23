<!--
  +page.svelte — Página do produto individual

  Rota: /product/[uuid]

  Recebe os dados do produto via load function (+page.ts)
  e renderiza o componente Produc com todas as informações.
  O título da página é dinâmico (nome do produto).
-->
<script lang="ts">
	import type { PageProps } from './$types';
	import Produc from '$lib/Components/Produc/Produc.svelte';

	// Dados carregados pela load function em +page.ts
	let { data }: PageProps = $props();
</script>

<!-- Título dinâmico da página no navegador -->
<svelte:head>
	<title>{data.product.name}</title>
</svelte:head>

<!-- Componente de detalhes do produto -->
<Produc product={data.product} />