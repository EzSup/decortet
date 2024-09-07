import axios, { AxiosResponse } from "axios";
import { Product } from "../models/productModels";
import { ShowSnackbar } from "../components/Snackbar";

const apiLink = "https://localhost:5000";
const cartLocalStorageName = "cart";

interface ProductWithCount {
	product: Product;
	quantity: number;
}

export async function GetMarketItems(): Promise<Product[]> {
	axios
		.get(`${apiLink}/User/Get`)
		.then((response: AxiosResponse<Product[]>) => {
			return response.data;
		});
	return [];
}

export function setCart(products: Product[], quantities?: number[]): void;
export function setCart(productsWithCount: ProductWithCount[]): void;

export function setCart(
	arg1: ProductWithCount[] | Product[],
	arg2?: number[]
): void {
	if (Array.isArray(arg1) && arg2) {
		const products = arg1 as Product[];
		const quantities = arg2;
		const values = convertToProductWithCount(products, quantities);
		localStorage.setItem(cartLocalStorageName, JSON.stringify(values));
	} else if (Array.isArray(arg1) && !arg2) {
		const productsWithCount = arg1 as ProductWithCount[];
		localStorage.setItem(
			cartLocalStorageName,
			JSON.stringify(productsWithCount)
		);
	}
}

export function addToCart(product: Product) {
	let cart = getCart();
	let item = cart.find((x) => x.product.id == product.id);
	if (item) {
		item.quantity++;
	} else {
		cart.push({ product, quantity: 1 });
	}
	setCart(cart);
	ShowSnackbar(`Товар "${product.name}" додано до корзини!`, true);
}

export function increaseQuantity(product: Product) {
	let cart = getCart();
	let item = cart.find((x) => x.product.id == product.id);
	if (item) {
		item.quantity++;
		setCart(cart);
	} else {
		return;
	}
}

export function decreaseQuantity(product: Product) {
	let cart = getCart();
	let item = cart.find((x) => x.product.id == product.id);
	if (item) {
		item.quantity--;
		setCart(cart);
	} else {
		return;
	}
}

export function removeFromCart(id: number) {
	let cart = getCart();
	cart = cart.filter((x) => x.product.id != id);
	setCart(cart);
}

export function getCart(): ProductWithCount[] {
	try {
		return JSON.parse(localStorage.getItem(cartLocalStorageName) || "") || [];
	} catch {
		return [];
	}
}

export function getCartItemsCount(): number {
	return getCart().length;
}

export function removeItem(id: number) {
	const newCart = getCart().filter((item) => item.product.id != id);
	setCart(newCart);
	ShowSnackbar(`Товар видалено з корзини!`, false);
}

function convertToProductWithCount(
	products: Product[],
	quantities: number[] = []
): ProductWithCount[] {
	return products.map((product, index) => ({
		product: product,
		quantity: quantities[index] ?? 1,
	}));
}

export function clearCart() {
	localStorage.removeItem(cartLocalStorageName);
}
