/**
 * cart.svelte.ts — Store global do carrinho de compras
 *
 * Utiliza Svelte 5 runes ($state) no nível de módulo para criar
 * um estado reativo que pode ser importado em qualquer componente.
 *
 * Identificação dos itens:
 * Usa `productIndex` (posição no array do CMS) em vez de IDs manuais.
 * Isso garante unicidade sem necessidade de gerenciamento manual.
 *
 * Funcionalidades:
 * - Adicionar, remover e atualizar quantidade de itens
 * - Cálculo automático de total de itens e preço
 * - Persistência em localStorage (sobrevive a recarregamentos)
 * - Controle de abertura/fechamento do drawer do carrinho
 * - SSR-safe (não acessa localStorage no servidor)
 */
import type { CartItem, Product } from '$lib/types';
import { browser } from '$app/environment';

// Chave usada no localStorage para salvar o carrinho
const STORAGE_KEY = 'project-catalog-cart';

/**
 * Carrega os itens do carrinho salvos no localStorage.
 * Retorna array vazio se estiver no servidor (SSR) ou se houver erro.
 */
function loadFromStorage(): CartItem[] {
	if (!browser) return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

/**
 * Salva os itens do carrinho no localStorage.
 * Falha silenciosamente se o localStorage não estiver disponível.
 */
function saveToStorage(items: CartItem[]) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		// falha silenciosa (ex: localStorage cheio)
	}
}

// Estado reativo do carrinho — inicializa com dados do localStorage
let items = $state<CartItem[]>(loadFromStorage());

// Controla se o drawer do carrinho está aberto ou fechado
let isOpen = $state(false);

/**
 * Objeto exportado com todas as operações do carrinho.
 * Usar como: import { cart } from '$lib/store/cart.svelte';
 */
export const cart = {
	/** Lista de itens no carrinho (reativo) */
	get items() {
		return items;
	},

	/** Se o drawer do carrinho está aberto */
	get isOpen() {
		return isOpen;
	},

	/** Quantidade total de itens (soma de todas as quantidades) */
	get totalItems(): number {
		return items.reduce((sum, item) => sum + item.quantity, 0);
	},

	/** Preço total do carrinho (preço unitário × quantidade de cada item) */
	get totalPrice(): number {
		return items.reduce((sum, item) => sum + item.product.price.default * item.quantity, 0);
	},

	/** Abre o drawer do carrinho */
	open() {
		isOpen = true;
	},

	/** Fecha o drawer do carrinho */
	close() {
		isOpen = false;
	},

	/** Alterna entre aberto e fechado */
	toggle() {
		isOpen = !isOpen;
	},

	/**
	 * Adiciona um produto ao carrinho.
	 * Usa `productIndex` (posição no array do CMS) para identificar o produto.
	 * Se o mesmo produto (com mesma variação) já existe, incrementa a quantidade.
	 */
	addToCart(product: Product, productIndex: number, selectedColor?: string, selectedSize?: string) {
		// Busca se já existe esse produto com a mesma variação no carrinho
		const existingIdx = items.findIndex(
			(item) =>
				item.productIndex === productIndex &&
				item.selectedColor === selectedColor &&
				item.selectedSize === selectedSize
		);

		if (existingIdx >= 0) {
			// Produto já existe → incrementa quantidade
			items[existingIdx].quantity += 1;
			items = [...items]; // força reatividade
		} else {
			// Produto novo → adiciona ao array
			items = [...items, { product, productIndex, quantity: 1, selectedColor, selectedSize }];
		}
		saveToStorage(items);
	},

	/**
	 * Remove um item específico do carrinho.
	 * Identifica o item pelo índice do produto + variação selecionada.
	 */
	removeFromCart(productIndex: number, selectedColor?: string, selectedSize?: string) {
		items = items.filter(
			(item) =>
				!(
					item.productIndex === productIndex &&
					item.selectedColor === selectedColor &&
					item.selectedSize === selectedSize
				)
		);
		saveToStorage(items);
	},

	/**
	 * Atualiza a quantidade de um item no carrinho.
	 * Se a quantidade for 0 ou menor, remove o item.
	 */
	updateQuantity(productIndex: number, quantity: number, selectedColor?: string, selectedSize?: string) {
		if (quantity <= 0) {
			this.removeFromCart(productIndex, selectedColor, selectedSize);
			return;
		}
		const index = items.findIndex(
			(item) =>
				item.productIndex === productIndex &&
				item.selectedColor === selectedColor &&
				item.selectedSize === selectedSize
		);
		if (index >= 0) {
			items[index].quantity = quantity;
			items = [...items]; // força reatividade
			saveToStorage(items);
		}
	},

	/** Remove todos os itens do carrinho */
	clearCart() {
		items = [];
		saveToStorage(items);
	}
};
