/**
 * +page.ts — Loader da página dinâmica do produto
 *
 * SvelteKit chama esta função antes de renderizar a página /product/[uuid].
 * O parâmetro `uuid` da URL é usado para buscar o produto no JSON do CMS.
 *
 * Se o produto não for encontrado, retorna erro 404.
 */
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import exemploData from '$cms/exemplo.json';

export const load: PageLoad = ({ params }) => {
	// Busca o produto no array do CMS pelo campo `id`
	// O `params.uuid` vem da URL: /product/[uuid]
	const product = exemploData.products.find((p) => p.id === params.uuid);

	// Se não encontrar o produto, retorna 404
	if (!product) {
		error(404, 'Produto não encontrado');
	}

	// Retorna o produto para ser usado no +page.svelte
	return { product };
};