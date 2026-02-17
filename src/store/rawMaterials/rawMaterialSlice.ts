import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { AxiosError } from "axios";
import type { RawMaterial } from "../../types/RawMaterial";

interface RawMaterialsState {
  data: RawMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: RawMaterialsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchRawMaterials = createAsyncThunk(
  "rawMaterial/fetchRawMaterials",
  async () => {
    const response = await api.get("/raw-materials");

    return response.data.data.map((rawMaterial: RawMaterial) => ({
      ...rawMaterial,
      quantity_stock: Number(rawMaterial.quantity_stock),
    }));
  },
);

export const createRawMaterial = createAsyncThunk<
  RawMaterial,
  Omit<RawMaterial, "id">,
  { rejectValue: string }
>(
  "rawMaterial/createRawMaterial",
  async (newRawMaterialData, { rejectWithValue }) => {
    try {
      const response = await api.post("/raw-materials", newRawMaterialData);

      return {
        ...response.data,
        quantity_stock: Number(response.data.quantity_stock),
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message || "Erro ao criar rawMaterial",
      );
    }
  },
);

export const deleteRawMaterial = createAsyncThunk(
  "rawMaterial/deleteRawMaterial",
  async (RawMaterialId: string) => {
    await api.delete(`/raw-materials/${RawMaterialId}`);

    return RawMaterialId;
  },
);

export const updateRawMaterial = createAsyncThunk(
  "rawMaterial/updateRawMaterial",
  async (updatedRawMaterial: RawMaterial) => {
    const response = await api.put(
      `/raw-materials/${updatedRawMaterial.id}`,
      updatedRawMaterial,
    );

    return {
      ...response.data,
      quantity_stock: Number(response.data.quantity_stock),
    };
  },
);

const rawMaterialSlice = createSlice({
  name: "rawMaterial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar rawMaterials";
      })

      .addCase(createRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Erro ao criar rawMaterial";
      })
      .addCase(deleteRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(deleteRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao deletar rawMaterial";
      })
      .addCase(updateRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.data.findIndex(
          (product) => product.id === action.payload.id,
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao atualizar rawMaterial";
      });
  },
});

export default rawMaterialSlice.reducer;
