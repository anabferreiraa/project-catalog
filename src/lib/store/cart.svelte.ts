/**
 * cart.svelte.ts — Store global do carrinho de compras
 *
 * Utiliza Svelte 5 runes ($state) no nível de módulo para criar
 * um estado reativo que pode ser importado em qualquer componente.
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
	if (!browser) return []; // não executa no servidor
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
	 * Se o mesmo produto (com mesma cor e tamanho) já existe, incrementa a quantidade.
	 * Caso contrário, cria um novo item com quantidade 1.
	 */
	addToCart(product: Product, selectedColor?: string, selectedSize?: string) {
		// Busca se já existe esse produto com a mesma variação no carrinho
		const existingIndex = items.findIndex(
			(item) =>
				item.product.id === product.id &&
				item.selectedColor === selectedColor &&
				item.selectedSize === selectedSize
		);

		if (existingIndex >= 0) {
			// Produto já existe → incrementa quantidade
			items[existingIndex].quantity += 1;
			items = [...items]; // força reatividade
		} else {
			// Produto novo → adiciona ao array
			items = [...items, { product, quantity: 1, selectedColor, selectedSize }];
		}
		saveToStorage(items);
	},

	/**
	 * Remove um item específico do carrinho.
	 * Identifica o item pelo ID do produto + variação selecionada.
	 */
	removeFromCart(productId: string, selectedColor?: string, selectedSize?: string) {
		items = items.filter(
			(item) =>
				!(
					item.product.id === productId &&
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
	updateQuantity(productId: string, quantity: number, selectedColor?: string, selectedSize?: string) {
		if (quantity <= 0) {
			this.removeFromCart(productId, selectedColor, selectedSize);
			return;
		}
		const index = items.findIndex(
			(item) =>
				item.product.id === productId &&
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
