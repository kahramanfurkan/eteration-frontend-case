import { Product } from "@/types/commonTypes";
import { create } from "zustand";

type CartStore = {
  cartItems: Product[];
  cartTotal: number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  updateCartItem: (item: Product) => void;
  syncStorage: () => void;
  checkInCartStatus: (item: Product) => undefined | Product;
  getTotalPrice: () => number;
  initCart: () => void;
};

export const cartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  cartTotal: 0,
  addToCart: (item) => {
    const newItem = Object.assign({ cartCount: 1 }, item);
    set({ cartItems: [...get().cartItems, newItem] });
    get().syncStorage();
  },
  removeFromCart: (item) => {
    set({
      cartItems: get().cartItems.filter((cartItem) => cartItem.id !== item.id),
    });
    get().syncStorage();
  },
  updateCartItem: (item) => {
    const newCartItems: Product[] = get().cartItems.map((cartItem: Product) => {
      if (cartItem.id === item.id) {
        cartItem = item;
      }
      return cartItem;
    });
    set({ cartItems: newCartItems });
    get().syncStorage();
  },
  syncStorage: () => {
    localStorage.setItem("cartItems", JSON.stringify(get().cartItems));
  },

  checkInCartStatus: (item) => {
    return get().cartItems.find((cartItem: Product) => cartItem.id === item.id);
  },
  getTotalPrice: () => {
    let totalPrice: number = 0;
    get().cartItems.forEach(
      (cartItem: Product) =>
        (totalPrice += parseFloat(cartItem.price) * (cartItem.cartCount || 1))
    );
    return totalPrice;
  },
  initCart: () => {
    let cartStorage: any = localStorage.getItem("cartItems");
    if (cartStorage) {
      cartStorage = JSON.parse(cartStorage);
      set({ cartItems: cartStorage });
    }
  },
}));
