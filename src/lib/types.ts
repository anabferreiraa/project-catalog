/**
 * types.ts — Tipos compartilhados do catálogo de produtos
 *
 * Este arquivo centraliza todas as interfaces TypeScript usadas
 * nos componentes, stores e rotas do projeto.
 * Quando os dados vierem do PageCMS, eles devem seguir estas interfaces.
 *
 * NOTA: Não há campo `id` nos produtos. O identificador único é o
 * índice do produto no array da coleção (posição 0, 1, 2...).
 * Isso evita problemas de IDs duplicados gerenciados manualmente.
 */

/**
 * Imagem do produto — cada produto pode ter múltiplas imagens.
 *
 * Use os campos opcionais `webp`, `jpg` e `png` para fornecer fontes
 * em diferentes formatos. O navegador escolhe a melhor opção via
 * `<picture>` + `<source>`. O campo `dir` serve como fallback obrigatório
 * (usado no `<img>` dentro do `<picture>`).
 */
export interface ProductImage {
	dir: string;   // caminho/URL de fallback da imagem (ex: .jpg ou .png)
	alt: string;   // texto alternativo para acessibilidade
	webp?: string; // caminho/URL em formato WebP
	jpg?: string;  // caminho/URL em formato JPEG
	png?: string;  // caminho/URL em formato PNG
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
 * Armazena o produto junto com a quantidade e variações selecionadas.
 * O `productIndex` identifica o produto pelo índice no array do CMS.
 */
export interface CartItem {
	product: Product; // referência ao produto completo
	productIndex: number; // índice do produto no array do CMS (identificador único)
	quantity: number; // quantidade selecionada
	selectedColor?: string; // cor escolhida pelo usuário (opcional)
	selectedSize?: string; // tamanho escolhido pelo usuário (opcional)
}
