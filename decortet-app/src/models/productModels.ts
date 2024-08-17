export interface Product {
    id?: number;
    name?: string;
    price?: number;
    underheader?: string | null;
    description?: string | null;
    photoLinks?: string[];
    available?: boolean;
}

export interface ProductCreate {
    name?: string;
    price?: number;
    underheader?: string | null;
    description?: string | null;
    photos?: FileList | null;
    available?: boolean;
}

export interface ProductWithCount{
    product: Product,
    quantity: number
  }