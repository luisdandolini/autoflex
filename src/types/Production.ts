interface ProductionSuggestion {
  product_id: string;
  product_code: string;
  product_name: string;
  quantity_possible: number;
  unit_value: number;
  total_value: number;
}

export interface ProductionResponse {
  suggestions: ProductionSuggestion[];
  total_production_value: number;
  products_analyzedL: number;
}
