export interface Order {
	id?: number;
	clientName?: string;
	phone?: string;
	email?: string;
	region?: string;
	town?: string;
	address?: string;
	description?: string | null;
	totalSum?: number;
	productsList?: string[];
}
