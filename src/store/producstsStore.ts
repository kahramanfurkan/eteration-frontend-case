import { create } from "zustand";

type ProductsStore = {
  producstLoading: boolean;
  products: [];
  getProducts: () => void;
};

export const productsStore = create<ProductsStore>((set, get) => ({
  producstLoading: false,
  products: [],
  getProducts: async () => {},
}));
