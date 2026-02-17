export interface RawMaterial {
  id: string;
  code: string;
  name: string;
  quantity_stock: number;
  created_at?: string;
  updated_at?: string;
}

export type CreateRawMaterial = Omit<RawMaterial, "id">;
