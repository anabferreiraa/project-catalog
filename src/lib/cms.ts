import type { Product, Collection } from '$lib/types';

// O import.meta.glob com '?raw' traz o conteúdo dos arquivos como string
const productFiles = import.meta.glob('/src/content/products.json/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const collectionFiles = import.meta.glob('/src/content/collections/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// Ordenamos as chaves para que tenhamos um array previsível sempre
const sortedProductPaths = Object.keys(productFiles).sort();
const sortedCollectionPaths = Object.keys(collectionFiles).sort();

/**
 * Mapeia o JSON bruto (no formato salvo em /content/products.json/)
 * para a interface `Product` utilizada pelos componentes.
 */
function mapCmsProduct(raw: string, index: number): Product | null {
	try {
		const parsed = JSON.parse(raw);
		
		return {
			globalIndex: index, // O índice global para URLs estáticas
			sku: parsed.sku || '',
			images:
				parsed.imagens?.src?.map((src: string) => ({
					dir: src,
					alt: parsed.name
				})) || [],
			name: parsed.name,
			description: parsed.description,
			variation: {
				color: parsed.variations?.color || [],
				size: parsed.variations?.size || []
			},
			price: {
				default: parsed.price?.default || 0,
				// Verifica se há a propriedade promotion.discount, caso contrário pega discount raiz se existir
				discount: parsed.price?.promotion?.discount || parsed.price?.discount || 0,
				installment: parsed.price?.installment || 0
			}
		};
	} catch (e) {
		console.error('Falha ao processar produto do CMS:', e);
		return null;
	}
}

// 1. Instanciamos a lista global de produtos
export const allProducts: Product[] = sortedProductPaths.map((path, index) => {
	const rawContent = productFiles[path] as string;
	return mapCmsProduct(rawContent, index);
}).filter((p): p is Product => p !== null);

// Retorna produto pelo seu índice exato
export function getProductByIndex(index: number): Product | undefined {
	return allProducts[index];
}

// 2. Instanciamos as coleções
export const allCollections: Collection[] = sortedCollectionPaths.map((path) => {
	try {
		const rawContent = collectionFiles[path] as string;
		const parsed = JSON.parse(rawContent);

		// Os produtos vêm num array "produts" (ou "products") contendo as strings dos paths
		const productPaths = parsed.produts || parsed.products || [];
		
		const mappedProducts = productPaths.map((prodPath: string) => {
			// CMS guarda o path como `src/content/products.json/nome.md`
			// O import.meta.glob retorna com a barra inicial `/src/content/...`
			const normalizedPath = prodPath.startsWith('/') ? prodPath : '/' + prodPath;
			
			// Procura qual o global index desse path
			const globalIndex = sortedProductPaths.indexOf(normalizedPath);
			if (globalIndex !== -1) {
				return allProducts[globalIndex];
			}
			return null;
		}).filter(Boolean);

		return {
			id: parsed.id,
			nameCollection: parsed.title,
			products: mappedProducts
		};
	} catch (e) {
		console.error('Falha ao processar coleção do CMS do path:', path, e);
		return null;
	}
}).filter((c): c is Collection => c !== null);
