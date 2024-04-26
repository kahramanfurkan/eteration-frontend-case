import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/commonTypes";

type DataStore = {
  loading: boolean;
  initialBrands: string[];
  brands: string[];
  initialModels: string[];
  models: string[];
  products: Product[];
  searchResults: Product[];
  searchResultsTotal: number;
  limit?: number;
  initialTotal: number;
  total: number;
  currentPage: number;
  selectedSort: string;
  selectedBrands: string[];
  selectedModels: string[];
  searchValue: string;
  getInitialData: () => void;
  searchProduct: (searchProduct: string) => void;
  getFilteredData: () => void;
  getPage: (page: number) => void;
  getSortedData: (sortOrder: string) => void;
  getDataByBrands: (brands: string[]) => void;
  getDataByModels: (models: string[]) => void;
  filterDataManually: () => void;
};

const baseUrl = "https://5fc9346b2af77700165ae514.mockapi.io/products";

export const dataStore = create<DataStore>((set, get) => ({
  loading: true,
  initialBrands: [],
  brands: [],
  initialModels: [],
  models: [],
  products: [],
  searchResults: [],
  searchResultsTotal: 0,
  limit: 12,
  initialTotal: 0,
  total: 0,
  currentPage: 1,
  selectedSort: "createdAt&asc",
  selectedBrands: [],
  selectedModels: [],
  searchValue: "",
  getInitialData: async () => {
    //brands,models için ayrı api olmadığı için clientte oluşturuyorum.
    set({ loading: true });
    const sortParams: string[] = get().selectedSort.split("&");
    const { data } = await axios.get(baseUrl, {
      params: {
        sortBy: sortParams[0],
        order: sortParams[1],
      },
    });

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
      set({
        //api total data count dönmediği için ilk requestte page limit yollamadım full data length alıp paginationa gönderiyorum,
        products: data.slice(0, 12),
        initialBrands: brandsData,
        brands: brandsData,
        initialModels: modelsData,
        models: modelsData,
        initialTotal: data.length,
        total: data.length,
        currentPage: 1,
      });
    }
    set({ loading: false });
  },
  getPage: (page) => {
    set({ currentPage: page });
    get().getFilteredData();
  },
  getSortedData: (sortOrder) => {
    if (get().searchValue) {
      set({ selectedSort: sortOrder });
      get().filterDataManually();
      return;
    }
    set({ selectedSort: sortOrder });
    get().getFilteredData();
  },
  getDataByBrands: (brands) => {
    if (get().searchValue) {
      set({ selectedBrands: brands });
      get().filterDataManually();
      return;
    }
    set({ selectedBrands: brands, currentPage: 1 });
    get().getFilteredData();
  },
  getDataByModels: (models) => {
    if (get().searchValue) {
      set({ selectedModels: models });
      get().filterDataManually();
      return;
    }
    set({ selectedModels: models, currentPage: 1 });
    get().getFilteredData();
  },
  getFilteredData: async () => {
    set({ loading: true });
    const sortParams: string[] = get().selectedSort.split("&");
    const brandParam: string | undefined =
      get().selectedBrands.join("|") || undefined;
    const modelParam: string | undefined =
      get().selectedModels.join("|") || undefined;
    if (!get().searchValue) set({ limit: 12 });
    await axios
      .get(baseUrl, {
        params: {
          page: get().currentPage,
          limit: get().limit,
          sortBy: sortParams[0],
          order: sortParams[1],
          brand: brandParam,
          model: modelParam,
          search: get().searchValue || undefined,
        },
      })
      .then((response) => {
        if (response.data && response.data?.length > 0) {
          if (get().searchValue) {
            set({ searchResultsTotal: response.data.length });
            response.data = response.data.slice(0, 12);
            const brandsData: string[] = [];
            const modelsData: string[] = [];
            response.data.forEach((product: Product) => {
              //bu blokta search sonucundan dönen brand ve modelleri ayıklıyorum.
              if (!brandsData.includes(product.brand)) {
                brandsData.push(product.brand);
              }

              if (!modelsData.includes(product.model)) {
                modelsData.push(product.model);
              }
              set({
                models: modelsData,
                brands: brandsData,
                searchResults: response.data,
              });
            });
          }
          set({
            products: response.data,
            total: get().searchValue
              ? get().searchResultsTotal
              : response.data.length,
          });
          if (!brandParam && !modelParam && !get().searchValue) {
            set({
              total: get().initialTotal,
              brands: get().initialBrands,
              models: get().initialModels,
            });
          }
        } else {
          set({ products: [], total: 0, brands: [], models: [] });
        }
      })
      .catch((error) => {
        set({ products: [], total: 0, brands: [], models: [] });
      });
    set({ loading: false });
  },
  searchProduct: async (searchValue) => {
    set({
      searchValue: searchValue,
      currentPage: 1,
      limit: undefined,
      selectedBrands: [],
      selectedModels: [],
      selectedSort: "createdAt&asc",
    });
    get().getFilteredData();
  },
  filterDataManually: () => {
    //Mockapi search ile beraber diğer parametreleri senkron çalıştırmadığı için search sonucunu filtrelemeleyi bu fonksiyonda simule ediyorum.Normalde servisten dönmeli.
    const sortParams = get().selectedSort.split("&");
    let filteredProducts: Product[] = get().searchResults;

    if (get().selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        get().selectedBrands.includes(product.brand)
      );
    }
    if (get().selectedModels.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        get().selectedModels.includes(product.model)
      );
    }
    if (sortParams[0] === "createdAt") {
      sortParams[1] === "desc"
        ? (filteredProducts = filteredProducts.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ))
        : (filteredProducts = filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
    }

    if (sortParams[0] === "price") {
      sortParams[1] === "asc"
        ? (filteredProducts = filteredProducts.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          ))
        : (filteredProducts = filteredProducts.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          ));
    }

    if (get().selectedBrands.length < 1 && get().selectedModels.length < 1) {
      set({ products: get().searchResults });
      return;
    }

    set({ products: filteredProducts });
  },
}));
