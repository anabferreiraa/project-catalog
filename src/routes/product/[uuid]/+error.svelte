<!--
  +error.svelte — Página de erro personalizada para a rota /product/[uuid]

  Exibida quando o produto não é encontrado (404) ou outro erro ocorre.
  Mostra uma mensagem amigável e um botão para voltar à página principal.
-->
<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Produto não encontrado</title>
</svelte:head>

<section class="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
	<!-- Ilustração / Ícone -->
	<div class="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
		</svg>
	</div>

	<!-- Código do erro -->
	<span class="text-6xl font-bold text-gray-300">{page.status}</span>

	<!-- Mensagem de erro -->
	<h1 class="text-2xl font-bold text-gray-800">
		{page.error?.message || 'Produto não encontrado'}
	</h1>

	<p class="max-w-md text-gray-500">
		O produto que você procura não existe ou foi removido do catálogo.
		Verifique o endereço ou volte à página inicial para continuar navegando.
	</p>

	<!-- Botão para voltar à página principal -->
	<a
		href="/"
		class="rounded-full bg-green-600 px-8 py-3 text-lg font-semibold text-[#F6ECC9] transition-colors hover:bg-green-700"
	>
		Voltar à página inicial
	</a>
</section>
