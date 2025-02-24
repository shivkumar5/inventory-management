import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

interface InventoryState {
  products: Product[];
}

const initialState: InventoryState = { products: [] };

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    disableProduct: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, disableProduct } =
  inventorySlice.actions;
export default inventorySlice.reducer;
