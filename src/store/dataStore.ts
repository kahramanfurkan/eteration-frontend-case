import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/commonTypes";

type DataStore = {
  loading: boolean;
  brands: string[];
  models: string[];
  products: Product[];
  getData: () => void;
};

export const dataStore = create<DataStore>((set, get) => ({
  loading: false,
  brands: [],
  models: [],
  products: [],
  getData: async () => {
    set({ loading: true });
    const { data } = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );

    if (data && data?.length > 0) {
      const brandsData: string[] = [];
      const modelsData: string[] = [];
      data.forEach((product: Product) => {
        if (!brandsData.includes(product.brand)) {
          brandsData.push(product.brand);
        }

        if (!modelsData.includes(product.model)) {
          modelsData.push(product.model);
        }
      });
      set({ products: data, brands: brandsData, models: modelsData });
    }
    set({ loading: false });
  },
}));
