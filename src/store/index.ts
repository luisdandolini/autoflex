import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productSlice";
import rawMaterialsReducer from "./rawMaterials/rawMaterialSlice.ts";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
