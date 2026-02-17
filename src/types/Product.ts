export interface Product {
  id: string;
  code: string;
  name: string;
  value: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateProduct = Omit<Product, "id">;
