import axios, { AxiosResponse } from "axios";

import { Product, ProductCreate } from "../models/productModels";
import { Order } from "../models/orderModels";

const apiLink = "https://localhost:5000";

export async function PostProduct(object: ProductCreate) {
	var data = new FormData();
	data.append("name", object.name?.toString() ?? "");
	data.append("price", object.price?.toString() ?? "");
	data.append("underheader", object.underheader?.toString() ?? "");
	data.append("description", object.description?.toString() ?? "");
	data.append("available", object.available?.toString() ?? "");
	if (object.photos && object.photos.length > 0) {
		for (let i = 0; i < object.photos.length; i++) {
			const photo = object.photos.item(i);
			if (photo) {
				data.append("photos", photo);
			}
		}
	}

	axios.post(`${apiLink}/Admin/CreateProduct`, data, {
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
		},
		withCredentials: true,
	});
}

export async function PutProduct(object: Product) {
	const response = axios.put(`${apiLink}/Admin/UpdateProduct`, object);
	console.log((await response).status);
}

export async function GetProducts(): Promise<Product[]> {
	const response = axios.get(`${apiLink}/Admin/GetAllProducts`);
	return (await response).data;
}

export async function GetOrders(): Promise<Order[]> {
	const response = axios.get(`${apiLink}/Admin/GetAllOrders`);
	return (await response).data;
}
