/**
 * +page.ts — Loader da página dinâmica do produto
 *
 * O parâmetro `uuid` da URL é o ÍNDICE do produto no array do CMS.
 * Exemplo: /product/0 → primeiro produto, /product/3 → quarto produto.
 *
 * Isso elimina a necessidade de IDs manuais no JSON do CMS.
 */
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductByIndex, allProducts } from '$lib/cms';

export const load: PageLoad = ({ params }) => {
	// Converte o parâmetro da URL para número (índice do array)
	const index = parseInt(params.uuid, 10);

	// Valida: deve ser um número válido e estar dentro do range do array
	if (isNaN(index) || index < 0 || index >= allProducts.length) {
		error(404, 'Produto não encontrado');
	}

	// Busca o produto pelo índice no array
	const product = getProductByIndex(index);

	if (!product) {
		error(404, 'Produto não encontrado');
	}

	// Retorna o produto e o índice para uso no +page.svelte
	return { product, productIndex: index };
};