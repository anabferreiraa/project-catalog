import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		produto: {
			sku: "",
			images: [
				{
					"dir": "/images/products/colecao-1.webp",
					"alt": ""
				}
			],
			name: "nome do produto",
			description: "desciçao do produto",
			variation: {
				color: ["#dc2626", "#22c55e"],
				size: ["P", "M", "G"]
			},
			price: {
				"default": 197.0,
				"discount": 0,
				"installment": 15.85
			}
		}
	};
};