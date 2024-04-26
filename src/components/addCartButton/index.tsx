"use client";

import { Product } from "@/types/commonTypes";
import { Button } from "antd";
import { cartStore } from "@/store/cartStore";

export default function AddCartButton(product: Product) {
  const { checkInCartStatus, addToCart, removeFromCart } = cartStore();
  return (
    <Button
      className="addCartButton"
      type="primary"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        checkInCartStatus(product)
          ? removeFromCart(product)
          : addToCart(product);
      }}
    >
      {checkInCartStatus(product) ? (
        <span className="remove">Remove from Cart</span>
      ) : (
        <span className="add">Add to Cart</span>
      )}
    </Button>
  );
}
