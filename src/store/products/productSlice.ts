import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Product } from "../../types/Product";
import type { AxiosError } from "axios";

interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.get("/products");

    return response.data.data.map((product: Product) => ({
      ...product,
      value: Number(product.value),
    }));
  },
);

export const createProduct = createAsyncThunk<
  Product,
  Omit<Product, "id">,
  { rejectValue: string }
>("products/createProduct", async (newProductData, { rejectWithValue }) => {
  try {
    const response = await api.post("/products", newProductData);

    return {
      ...response.data,
      value: Number(response.data.value),
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message || "Erro ao criar produto",
    );
  }
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await api.delete(`/products/${productId}`);

    return productId;
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct: Product) => {
    const response = await api.put(
      `/products/${updatedProduct.id}`,
      updatedProduct,
    );

    return {
      ...response.data,
      value: Number(response.data.value),
    };
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar produtos";
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Erro ao criar produto";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao deletar produto";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.data.findIndex(
          (product) => product.id === action.payload.id,
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao atualizar produto";
      });
  },
});

export default productsSlice.reducer;
