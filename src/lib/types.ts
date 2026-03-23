/**
 * types.ts — Tipos compartilhados do catálogo de produtos
 *
 * Este arquivo centraliza todas as interfaces TypeScript usadas
 * nos componentes, stores e rotas do projeto.
 * Quando os dados vierem do PageCMS, eles devem seguir estas interfaces.
 */

/** Imagem do produto — cada produto pode ter múltiplas imagens */
export interface ProductImage {
	dir: string; // caminho/URL da imagem
	alt: string; // texto alternativo para acessibilidade
}

/** Variações disponíveis do produto */
export interface ProductVariation {
	color: string[]; // array de cores em formato hex (ex: "#dc2626")
	size: string[]; // array de tamanhos (ex: "P", "M", "G")
}

/** Informações de preço do produto */
export interface ProductPrice {
	default: number; // preço cheio do produto
	discount: number; // percentual de desconto (0 = sem desconto)
	installment: number; // valor da parcela
}

/** Produto completo — corresponde à estrutura de cada item no CMS */
export interface Product {
	id: string; // identificador único — usado na URL (/product/[id])
	sku: string; // código do produto (opcional, pode ser vazio)
	images: ProductImage[]; // lista de imagens do produto
	name: string; // nome do produto
	description: string; // descrição detalhada
	variation: ProductVariation; // cores e tamanhos disponíveis
	price: ProductPrice; // informações de preço
}

/** Coleção de produtos — corresponde à estrutura do JSON do CMS */
export interface Collection {
	id: string; // identificador da coleção
	nameCollection: string; // nome/título da coleção
	products: Product[]; // lista de produtos desta coleção
}

/**
 * Item do carrinho de compras
 * Armazena o produto junto com a quantidade e variações selecionadas
 */
export interface CartItem {
	product: Product; // referência ao produto completo
	quantity: number; // quantidade selecionada
	selectedColor?: string; // cor escolhida pelo usuário (opcional)
	selectedSize?: string; // tamanho escolhido pelo usuário (opcional)
}
